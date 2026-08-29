<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Employer;
use App\Models\JobSubmission;
use Illuminate\Http\Request;

class JobSubmissionController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'company_name' => 'required|string|max:255',
            'company_email' => 'required|email|max:255',
            'company_phone' => 'nullable|string|max:50',
            'company_website' => 'nullable|string|max:255',

            'category' => 'required|string|max:255',

            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'location' => 'nullable|string|max:255',
            'work_mode' => 'required|string|max:50',
            'job_type' => 'required|string|max:50',

            'salary' => 'nullable|string|max:255',
            'deadline' => 'required|date',

            'requirements' => 'nullable|array',
            'responsibilities' => 'nullable|array',

            'apply_email' => 'required|email|max:255',
        ]);

        $category = Category::where(
            'name',
            $validated['category']
        )->first();

        if (!$category) {
            return response()->json([
                'message' => 'Invalid category.'
            ], 422);
        }

        $employer = Employer::updateOrCreate(
            [
                'email' => $validated['company_email']
            ],
            [
                'company_name' => $validated['company_name'],
                'contact_name' => $validated['company_name'],
                'phone' => $validated['company_phone'] ?? null,
                'company_website' => $validated['company_website'] ?? null,
            ]
        );

        $submission = JobSubmission::create([
            'employer_id' => $employer->id,
            'category_id' => $category->id,

            'title' => $validated['title'],
            'description' => $validated['description'],
            'location' => $validated['location'] ?? null,

            'work_mode' => $validated['work_mode'],
            'job_type' => $validated['job_type'],

            'apply_email' => $validated['apply_email'],
            'deadline' => $validated['deadline'],

            'status' => 'pending',
        ]);

        return response()->json([
            'message' => 'Job submitted successfully.',

            'data' => [
                'submission_id' => $submission->id,
                'status' => $submission->status,

                'company' => [
                    'name' => $employer->company_name,
                    'email' => $employer->email,
                    'phone' => $employer->phone,
                ],

                'job' => [
                    'title' => $submission->title,
                    'location' => $submission->location,
                    'workStyle' => $submission->work_mode,
                    'employmentType' => $submission->job_type,
                ],
            ],
        ], 201);
    }
}