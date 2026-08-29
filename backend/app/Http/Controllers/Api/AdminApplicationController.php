<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Application;
use Illuminate\Http\Request;

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
}
