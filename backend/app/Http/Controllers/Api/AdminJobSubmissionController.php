<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\JobSubmission;

class AdminJobSubmissionController extends Controller
{
    public function index()
    {
        $submissions = JobSubmission::latest()->get();

        return response()->json([
            'data' => $submissions
        ]);
    }
}
