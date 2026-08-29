<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\JobSubmissionController;
use App\Http\Controllers\Api\AdminJobSubmissionController;

Route::get('/test', function () {
    return response()->json([
        'message' => 'ALote API is working!'
    ]);
});

Route::post('/job-submissions', [JobSubmissionController::class, 'store']);
Route::get('/admin/job-submissions', [AdminJobSubmissionController::class, 'index']);