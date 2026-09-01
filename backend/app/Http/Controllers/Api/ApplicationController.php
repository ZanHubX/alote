<?php

namespace App\Http\Controllers\Api;

use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use App\Models\Application;
use App\Models\JobPost;
use App\Models\JobSeeker;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

class ApplicationController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([

            'job_public_id' => [
                'required',
                'uuid',
                'exists:job_posts,public_id'
            ],

            'full_name' => [
                'required',
                'string',
                'max:255'
            ],

            'email' => [
                'required',
                'email',
                'max:255'
            ],

            'phone' => [
                'required',
                'string',
                'max:50'
            ],

            'cover_letter' => [
                'nullable',
                'string'
            ],

            'resume' => [
                'required',
                'file',
                'mimes:pdf,doc,docx',
                'max:5120'
            ],
        ]);


        $job = JobPost::where(
            'public_id',
            $validated['job_public_id']
        )
            ->where(
                'is_active',
                true
            )
            ->firstOrFail();


        /*
        |--------------------------------------------------------------------------
        | Upload Resume to Supabase Storage
        |--------------------------------------------------------------------------
        */

        $resume = $request->file('resume');

        $extension =
            $resume->getClientOriginalExtension();

        $fileName =
            Str::uuid()->toString()
            . '.'
            . strtolower($extension);

        $resumePath =
            'applications/'
            . $job->public_id
            . '/'
            . $fileName;


        $supabaseUrl =
            rtrim(
                env('SUPABASE_URL'),
                '/'
            );

        $supabaseSecret =
            env('SUPABASE_SECRET_KEY');

        $bucket =
            env(
                'SUPABASE_BUCKET',
                'resumes'
            );


        if (
            !$supabaseUrl ||
            !$supabaseSecret
        ) {

            return response()->json([
                'message' =>
                'Resume storage is not configured.'
            ], 500);
        }


        $uploadResponse =
            Http::withHeaders([

                'apikey' =>
                $supabaseSecret,

                'Content-Type' =>
                $resume->getMimeType(),

            ])
            ->withBody(
                file_get_contents(
                    $resume->getRealPath()
                ),
                $resume->getMimeType()
            )
            ->post(
                $supabaseUrl
                    . '/storage/v1/object/'
                    . $bucket
                    . '/'
                    . $resumePath
            );


        if (!$uploadResponse->successful()) {

            Log::error(
                'Supabase resume upload failed',
                [
                    'status' => $uploadResponse->status(),
                    'response' => $uploadResponse->body(),
                ]
            );

            return response()->json([
                'message' => 'Resume upload failed.',
                'supabase_status' => $uploadResponse->status(),
                'supabase_error' => $uploadResponse->body(),
            ], 500);
        }


        /*
        |--------------------------------------------------------------------------
        | Save Application
        |--------------------------------------------------------------------------
        */

        try {

            $application =
                DB::transaction(
                    function () use (
                        $validated,
                        $job,
                        $resumePath
                    ) {

                        $jobSeeker =
                            JobSeeker::create([

                                'full_name' =>
                                $validated['full_name'],

                                'email' =>
                                $validated['email'],

                                'phone' =>
                                $validated['phone'],

                                'resume_path' =>
                                $resumePath,
                            ]);


                        return Application::create([

                            'job_post_id' =>
                            $job->id,

                            'job_seeker_id' =>
                            $jobSeeker->id,

                            'cover_letter' =>
                            $validated['cover_letter']
                                ?? null,

                            'resume_path' =>
                            $resumePath,

                            'status' =>
                            'pending',

                            'applied_at' =>
                            now(),
                        ]);
                    }
                );
        } catch (\Throwable $exception) {

            /*
            |--------------------------------------------------------------------------
            | Remove uploaded resume if database save fails
            |--------------------------------------------------------------------------
            */

            Http::withHeaders([

                'apikey' =>
                $supabaseSecret,

            ])->delete(
                $supabaseUrl
                    . '/storage/v1/object/'
                    . $bucket
                    . '/'
                    . $resumePath
            );


            throw $exception;
        }


        return response()->json([

            'message' =>
            'Application submitted successfully.',

            'data' =>
            $application

        ], 201);
    }
}
