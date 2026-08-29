<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\JobPost;

class AdminJobPostController extends Controller
{
    public function index()
    {
        $jobs = JobPost::with([
            'employer',
            'category'
        ])
            ->latest('published_at')
            ->get();

        return response()->json([
            'data' => $jobs
        ]);
    }

    public function close($id)
    {
        $job = JobPost::findOrFail($id);

        $job->is_active = false;
        $job->save();

        return response()->json([
            'message' => 'Job closed successfully.'
        ]);
    }
}
