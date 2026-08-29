<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class JobSubmission extends Model
{
    protected $fillable = [
        'employer_id',
        'category_id',
        'title',
        'description',
        'location',
        'work_mode',
        'job_type',
        'salary_min',
        'salary_max',
        'salary_text',
        'currency',
        'requirements',
        'responsibilities',
        'apply_email',
        'apply_link',
        'deadline',
        'status',
        'rejection_reason',
    ];

    protected $casts = [
        'requirements' => 'array',
        'responsibilities' => 'array',
    ];

    public function employer(): BelongsTo
    {
        return $this->belongsTo(Employer::class);
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function payment(): HasOne
    {
        return $this->hasOne(Payment::class);
    }

    public function jobPost(): HasOne
    {
        return $this->hasOne(JobPost::class);
    }
}
