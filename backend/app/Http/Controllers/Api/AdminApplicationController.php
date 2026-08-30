<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

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


    public function destroy($id)
    {
        $application =
            Application::findOrFail($id);

        /*
         * Delete uploaded resume file
         * before deleting the application.
         */
        if (
            $application->resume_path &&
            Storage::disk('public')->exists(
                $application->resume_path
            )
        ) {
            Storage::disk('public')->delete(
                $application->resume_path
            );
        }

        /*
         * Delete application from database.
         */
        $application->delete();

        return response()->json([
            'message' =>
            'Application deleted successfully.'
        ]);
    }
}
