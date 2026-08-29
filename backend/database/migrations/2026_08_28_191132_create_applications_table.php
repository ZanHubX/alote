<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('applications', function (Blueprint $table) {
    $table->id();

    $table->foreignId('job_post_id')
        ->constrained('job_posts')
        ->cascadeOnDelete();

    $table->foreignId('job_seeker_id')
        ->constrained('job_seekers')
        ->cascadeOnDelete();

    $table->text('cover_letter')->nullable();
    $table->string('resume_path')->nullable();

    $table->string('status')->default('submitted');
    // submitted, reviewing, shortlisted, rejected, hired

    $table->timestamp('applied_at')->nullable();

    $table->timestamps();
});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('applications');
    }
};
