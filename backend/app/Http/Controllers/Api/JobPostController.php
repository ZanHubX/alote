<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\JobPost;

class JobPostController extends Controller
{
    public function index()
    {
        $jobs = JobPost::with([
            'employer',
            'category'
        ])
            ->where('is_active', true)
            ->latest('published_at')
            ->get();

        return response()->json([
            'data' => $jobs
        ]);
    }

    public function show($publicId)
    {
        $job = JobPost::with([
            'employer',
            'category'
        ])
            ->where('is_active', true)
            ->where('public_id', $publicId)
            ->firstOrFail();

        return response()->json([
            'data' => $job
        ]);
    }
}