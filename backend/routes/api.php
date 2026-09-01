<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\JobSubmissionController;
use App\Http\Controllers\Api\AdminJobSubmissionController;
use App\Http\Controllers\Api\AdminJobPostController;
use App\Http\Controllers\Api\JobPostController;
use App\Http\Controllers\Api\ApplicationController;
use App\Http\Controllers\Api\AdminApplicationController;
use App\Http\Controllers\Api\AdminDashboardController;
use App\Http\Controllers\Api\WebsiteVisitController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\AdminAuthController;


/* ==================================================
   ADMIN AUTH — PUBLIC LOGIN
================================================== */

Route::post(
    '/admin/login',
    [AdminAuthController::class, 'login']
)->middleware('throttle:5,1');


/* ==================================================
   EMPLOYER JOB SUBMISSION
================================================== */

Route::post(
    '/job-submissions',
    [JobSubmissionController::class, 'store']
)->middleware('throttle:10,1');


/* ==================================================
   PUBLIC JOBS
================================================== */

Route::get(
    '/jobs',
    [JobPostController::class, 'index']
);

Route::get(
    '/jobs/{publicId}',
    [JobPostController::class, 'show']
);


/* ==================================================
   PUBLIC APPLICATION SUBMISSION
================================================== */

Route::post(
    '/applications',
    [ApplicationController::class, 'store']
)->middleware('throttle:10,1');


/* ==================================================
   WEBSITE VISITS
================================================== */

Route::post(
    '/website-visits',
    [WebsiteVisitController::class, 'store']
);


/* ==================================================
   CATEGORIES
================================================== */

Route::get(
    '/categories',
    [CategoryController::class, 'index']
);


/* ==================================================
   PROTECTED ADMIN API
================================================== */

Route::middleware('auth:sanctum')
    ->prefix('admin')
    ->group(function () {

        /* ==========================================
           ADMIN AUTH
        ========================================== */

        Route::get(
            '/me',
            [AdminAuthController::class, 'me']
        );

        Route::post(
            '/logout',
            [AdminAuthController::class, 'logout']
        );


        /* ==========================================
           ADMIN DASHBOARD
        ========================================== */

        Route::get(
            '/dashboard',
            [AdminDashboardController::class, 'index']
        );


        /* ==========================================
           ADMIN JOB SUBMISSIONS
        ========================================== */

        Route::get(
            '/job-submissions',
            [AdminJobSubmissionController::class, 'index']
        );

        Route::post(
            '/job-submissions/{id}/approve',
            [AdminJobSubmissionController::class, 'approve']
        );

        Route::post(
            '/job-submissions/{id}/reject',
            [AdminJobSubmissionController::class, 'reject']
        );


        /* ==========================================
           PAYMENT APPROVAL
        ========================================== */

        Route::post(
            '/job-submissions/{id}/payment/approve',
            [AdminJobSubmissionController::class, 'approvePayment']
        );


        /* ==========================================
           ADMIN PUBLISHED JOBS
        ========================================== */

        Route::get(
            '/jobs',
            [AdminJobPostController::class, 'index']
        );

        Route::post(
            '/jobs/{id}/close',
            [AdminJobPostController::class, 'close']
        );

        Route::delete(
            '/jobs/{id}',
            [AdminJobPostController::class, 'destroy']
        );


        /* ==========================================
           ADMIN APPLICATIONS
        ========================================== */

        Route::get(
            '/applications',
            [AdminApplicationController::class, 'index']
        );

        Route::get(
            '/applications/{id}/resume',
            [AdminApplicationController::class, 'resume']
        );

        Route::patch(
            '/applications/{id}/status',
            [AdminApplicationController::class, 'updateStatus']
        );

        Route::delete(
            '/applications/{id}',
            [AdminApplicationController::class, 'destroy']
        );
    });
