<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\WebsiteVisit;
use Illuminate\Http\Request;

class WebsiteVisitController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'visitor_id' => [
                'required',
                'string',
                'max:255'
            ],

            'page' => [
                'nullable',
                'string',
                'max:255'
            ],
        ]);

        $visit = WebsiteVisit::create([
            'visitor_id' =>
            $validated['visitor_id'],

            'page' =>
            $validated['page'] ?? null,

            'ip_address' =>
            $request->ip(),

            'user_agent' =>
            $request->userAgent(),

            'visited_at' =>
            now(),
        ]);

        return response()->json([
            'message' =>
            'Visit recorded successfully.',

            'data' =>
            $visit
        ], 201);
    }
}
