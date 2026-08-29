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
        Schema::create('job_submissions', function (Blueprint $table) {
            $table->id();

            $table->foreignId('employer_id')
                ->constrained('employers')
                ->cascadeOnDelete();

            $table->foreignId('category_id')
                ->constrained('categories');

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

            $table->string('status')->default('pending');
            // pending, approved, rejected

            $table->text('rejection_reason')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('job_submissions');
    }
};
