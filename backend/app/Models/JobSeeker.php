<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class JobSeeker extends Model
{
    protected $fillable = [
        'full_name',
        'email',
        'phone',
        'location',
        'resume_path',
    ];

    public function applications(): HasMany
    {
        return $this->hasMany(Application::class);
    }
}