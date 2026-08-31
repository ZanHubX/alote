<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class AdminApplicationController extends Controller
{
    public function index()
    {
        $applications = Application::with([
            'jobPost.employer',
            'jobSeeker'
        ])
            ->latest('applied_at')
            ->get();

        return response()->json([
            'data' => $applications
        ]);
    }


    public function updateStatus(Request $request, $id)
    {
        $application =
            Application::findOrFail($id);

        $validated =
            $request->validate([
                'status' => [
                    'required',
                    'in:pending,review,shortlisted,interview,hired,rejected'
                ],
            ]);

        $application->status =
            $validated['status'];

        $application->save();

        return response()->json([
            'message' =>
            'Application status updated successfully.',

            'data' =>
            $application
        ]);
    }


    /*
    |--------------------------------------------------------------------------
    | GET PRIVATE RESUME SIGNED URL
    |--------------------------------------------------------------------------
    */

    public function resume($id)
    {
        $application =
            Application::findOrFail($id);


        if (!$application->resume_path) {

            return response()->json([
                'message' =>
                'Resume not available.'
            ], 404);
        }


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


        $response =
            Http::withHeaders([

                'Authorization' =>
                'Bearer ' . $supabaseSecret,

                'apikey' =>
                $supabaseSecret,

                'Content-Type' =>
                'application/json',

            ])->post(

                $supabaseUrl
                    . '/storage/v1/object/sign/'
                    . $bucket
                    . '/'
                    . $application->resume_path,

                [
                    'expiresIn' => 60
                ]

            );


        if (!$response->successful()) {

            return response()->json([
                'message' =>
                'Unable to open resume.'
            ], 500);
        }


        $signedPath =
            $response->json(
                'signedURL'
            )
            ?? $response->json(
                'signedUrl'
            );


        if (!$signedPath) {

            return response()->json([
                'message' =>
                'Unable to create resume URL.'
            ], 500);
        }


        /*
         * Supabase may return a relative signed URL.
         */

        if (
            str_starts_with(
                $signedPath,
                'http://'
            ) ||
            str_starts_with(
                $signedPath,
                'https://'
            )
        ) {

            $signedUrl =
                $signedPath;
        } else {

            $signedUrl =
                $supabaseUrl
                . '/storage/v1'
                . $signedPath;
        }


        return response()->json([
            'url' =>
            $signedUrl,

            'expires_in' =>
            60
        ]);
    }


    /*
    |--------------------------------------------------------------------------
    | DELETE APPLICATION + SUPABASE RESUME
    |--------------------------------------------------------------------------
    */

    public function destroy($id)
    {
        $application =
            Application::findOrFail($id);


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


        /*
         * Delete resume from Supabase Storage
         */

        if (
            $application->resume_path &&
            $supabaseUrl &&
            $supabaseSecret
        ) {

            Http::withHeaders([

                'Authorization' =>
                'Bearer '
                    . $supabaseSecret,

                'apikey' =>
                $supabaseSecret,

            ])->delete(

                $supabaseUrl
                    . '/storage/v1/object/'
                    . $bucket
                    . '/'
                    . $application->resume_path

            );
        }


        /*
         * Delete application from database
         */

        $application->delete();


        return response()->json([
            'message' =>
            'Application deleted successfully.'
        ]);
    }
}
