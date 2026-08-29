<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Application;
use App\Models\JobPost;
use App\Models\JobSubmission;

class AdminDashboardController extends Controller
{
    public function index()
    {
        $totalJobs =
            JobPost::count();

        $activeJobs =
            JobPost::where(
                'is_active',
                true
            )->count();

        $pendingSubmissions =
            JobSubmission::where(
                'status',
                'pending'
            )->count();

        $totalApplications =
            Application::count();

        $newApplications =
            Application::where(
                'status',
                'pending'
            )->count();

        $hiredApplications =
            Application::where(
                'status',
                'hired'
            )->count();


        $recentPendingSubmissions =
            JobSubmission::with([
                'employer',
                'category'
            ])
            ->where(
                'status',
                'pending'
            )
            ->latest()
            ->take(3)
            ->get();


        $recentApplications =
            Application::with([
                'jobPost.employer',
                'jobSeeker'
            ])
            ->latest('applied_at')
            ->take(4)
            ->get();


        return response()->json([
            'data' => [

                'total_jobs' =>
                $totalJobs,

                'active_jobs' =>
                $activeJobs,

                'pending_submissions' =>
                $pendingSubmissions,

                'total_applications' =>
                $totalApplications,

                'new_applications' =>
                $newApplications,

                'hired_applications' =>
                $hiredApplications,

                'recent_pending_submissions' =>
                $recentPendingSubmissions,

                'recent_applications' =>
                $recentApplications

            ]
        ]);
    }
}
