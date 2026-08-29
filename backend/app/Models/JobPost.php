<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class JobPost extends Model
{
    protected $fillable = [
        'employer_id',
        'category_id',
        'job_submission_id',
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
        'is_active',
        'published_at',
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

    public function jobSubmission(): BelongsTo
    {
        return $this->belongsTo(JobSubmission::class);
    }

    public function applications(): HasMany
    {
        return $this->hasMany(Application::class);
    }
}
