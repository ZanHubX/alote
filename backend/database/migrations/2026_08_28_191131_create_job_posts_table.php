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
        Schema::create('job_posts', function (Blueprint $table) {
            $table->id();

            $table->foreignId('employer_id')
                ->constrained('employers')
                ->cascadeOnDelete();

            $table->foreignId('category_id')
                ->constrained('categories');

            $table->foreignId('job_submission_id')
                ->nullable()
                ->unique()
                ->constrained('job_submissions')
                ->nullOnDelete();

            $table->string('title');
            $table->text('description');

            $table->string('location')->nullable();
            $table->string('work_mode'); // WFH, ONSITE, HYBRID
            $table->string('job_type');  // FULL_TIME, PART_TIME, INTERNSHIP, CONTRACT

            $table->decimal('salary_min', 12, 2)->nullable();
            $table->decimal('salary_max', 12, 2)->nullable();
            $table->string('currency', 10)->default('MMK');

            $table->string('apply_email')->nullable();
            $table->string('apply_link')->nullable();
            $table->date('deadline')->nullable();

            $table->boolean('is_active')->default(true);
            $table->timestamp('published_at')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('job_posts');
    }
};
