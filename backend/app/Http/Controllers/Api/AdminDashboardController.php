<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Application;
use App\Models\JobPost;
use App\Models\JobSubmission;
use App\Models\WebsiteVisit;

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


        // ==========================================
        // WEBSITE VISITOR STATISTICS
        // ==========================================

        $todayVisitors =
            WebsiteVisit::whereDate(
                'visited_at',
                today()
            )
            ->distinct('visitor_id')
            ->count('visitor_id');


        $totalVisitors =
            WebsiteVisit::distinct(
                'visitor_id'
            )
            ->count('visitor_id');


        $totalPageViews =
            WebsiteVisit::count();


        // ==========================================
        // RECENT PENDING JOB SUBMISSIONS
        // ==========================================

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


        // ==========================================
        // RECENT APPLICATIONS
        // ==========================================

        $recentApplications =
            Application::with([
                'jobPost.employer',
                'jobSeeker'
            ])
            ->latest('applied_at')
            ->take(4)
            ->get();


        // ==========================================
        // RESPONSE
        // ==========================================

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

                'today_visitors' =>
                $todayVisitors,

                'total_visitors' =>
                $totalVisitors,

                'total_page_views' =>
                $totalPageViews,

                'recent_pending_submissions' =>
                $recentPendingSubmissions,

                'recent_applications' =>
                $recentApplications

            ]
        ]);
    }
}
