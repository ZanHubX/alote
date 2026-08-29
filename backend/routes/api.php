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

Route::get('/test', function () {
    return response()->json([
        'message' => 'ALote API is working!'
    ]);
});

Route::post('/job-submissions', [JobSubmissionController::class, 'store']);
Route::get('/admin/job-submissions', [AdminJobSubmissionController::class, 'index']);
Route::post(
    '/admin/job-submissions/{id}/approve',
    [AdminJobSubmissionController::class, 'approve']
);
Route::post(
    '/admin/job-submissions/{id}/reject',
    [AdminJobSubmissionController::class, 'reject']
);
Route::get(
    '/admin/jobs',
    [AdminJobPostController::class, 'index']
);
Route::post('/admin/jobs/{id}/close', [AdminJobPostController::class, 'close']);
Route::get('/jobs', [JobPostController::class, 'index']);
Route::get('/jobs/{id}', [JobPostController::class, 'show']);
Route::post('/applications', [ApplicationController::class, 'store']);
Route::get('/admin/applications', [AdminApplicationController::class, 'index']);
Route::patch('/admin/applications/{id}/status', [AdminApplicationController::class, 'updateStatus']);
Route::get('/admin/dashboard', [AdminDashboardController::class, 'index']);
Route::post('/website-visits', [WebsiteVisitController::class, 'store']);
Route::get('/categories', [CategoryController::class, 'index']);




