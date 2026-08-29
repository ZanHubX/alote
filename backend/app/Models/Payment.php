<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Payment extends Model
{
    protected $fillable = [
        'job_submission_id',
        'amount',
        'currency',
        'payment_method',
        'transaction_id',
        'status',
        'paid_at',
    ];

    public function jobSubmission(): BelongsTo
    {
        return $this->belongsTo(JobSubmission::class);
    }
}
