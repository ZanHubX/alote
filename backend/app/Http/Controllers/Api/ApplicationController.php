<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Application;
use App\Models\JobPost;
use App\Models\JobSeeker;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ApplicationController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'job_post_id' => [
                'required',
                'integer',
                'exists:job_posts,id'
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
            'id',
            $validated['job_post_id']
        )
            ->where(
                'is_active',
                true
            )
            ->firstOrFail();


        $application = DB::transaction(
            function () use (
                $request,
                $validated,
                $job
            ) {

                $resumePath =
                    $request
                    ->file('resume')
                    ->store(
                        'resumes',
                        'public'
                    );


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


        return response()->json([
            'message' =>
            'Application submitted successfully.',

            'data' =>
            $application
        ], 201);
    }
}
