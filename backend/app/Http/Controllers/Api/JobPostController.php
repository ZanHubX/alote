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

    public function show($id)
    {
        $job = JobPost::with([
            'employer',
            'category'
        ])
            ->where('is_active', true)
            ->findOrFail($id);

        return response()->json([
            'data' => $job
        ]);
    }
}
