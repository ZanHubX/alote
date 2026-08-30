<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\JobSubmission;
use App\Models\JobPost;
use Illuminate\Support\Facades\DB;

class AdminJobSubmissionController extends Controller
{
    public function index()
    {
        $submissions = JobSubmission::with([
            'employer',
            'category',
            'payment'
        ])
            ->latest()
            ->get();

        return response()->json([
            'data' => $submissions
        ]);
    }


    /* ==================================================
       APPROVE PAYMENT
    ================================================== */

    public function approvePayment($id)
    {
        $submission = JobSubmission::with('payment')
            ->findOrFail($id);

        if (!$submission->payment) {
            return response()->json([
                'message' => 'Payment record not found.'
            ], 404);
        }

        $payment = $submission->payment;

        $payment->status = 'paid';
        $payment->paid_at = now();
        $payment->save();

        return response()->json([
            'message' => 'Payment approved successfully.',
            'data' => $payment
        ]);
    }


    /* ==================================================
       APPROVE JOB
    ================================================== */

    public function approve($id)
    {
        $submission = JobSubmission::findOrFail($id);

        DB::transaction(function () use ($submission) {

            JobPost::updateOrCreate(
                [
                    'job_submission_id' => $submission->id
                ],
                [
                    'employer_id' => $submission->employer_id,
                    'category_id' => $submission->category_id,

                    'title' => $submission->title,
                    'description' => $submission->description,
                    'location' => $submission->location,

                    'work_mode' => $submission->work_mode,
                    'job_type' => $submission->job_type,

                    'salary_min' => $submission->salary_min,
                    'salary_max' => $submission->salary_max,
                    'salary_text' => $submission->salary_text,
                    'currency' => $submission->currency,

                    'requirements' => $submission->requirements,
                    'responsibilities' => $submission->responsibilities,

                    'apply_email' => $submission->apply_email,
                    'apply_link' => $submission->apply_link,

                    'deadline' => $submission->deadline,

                    'is_active' => true,
                    'published_at' => now(),
                ]
            );

            $submission->status = 'approved';
            $submission->rejection_reason = null;
            $submission->save();
        });

        return response()->json([
            'message' => 'Job approved and published successfully.'
        ]);
    }


    /* ==================================================
       REJECT JOB
    ================================================== */

    public function reject($id)
    {
        $submission = JobSubmission::findOrFail($id);

        $submission->status = 'rejected';
        $submission->rejection_reason = null;
        $submission->save();

        return response()->json([
            'message' => 'Job submission rejected successfully.'
        ]);
    }
}
