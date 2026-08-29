<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('job_submissions', function (Blueprint $table) {
            $table
                ->string('salary_text')
                ->nullable();
        });

        Schema::table('job_posts', function (Blueprint $table) {
            $table
                ->string('salary_text')
                ->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('job_submissions', function (Blueprint $table) {
            $table->dropColumn('salary_text');
        });

        Schema::table('job_posts', function (Blueprint $table) {
            $table->dropColumn('salary_text');
        });
    }
};
