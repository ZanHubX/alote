<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('job_submissions', function (Blueprint $table) {
            $table->json('requirements')->nullable();
            $table->json('responsibilities')->nullable();
        });

        Schema::table('job_posts', function (Blueprint $table) {
            $table->json('requirements')->nullable();
            $table->json('responsibilities')->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('job_submissions', function (Blueprint $table) {
            $table->dropColumn([
                'requirements',
                'responsibilities'
            ]);
        });

        Schema::table('job_posts', function (Blueprint $table) {
            $table->dropColumn([
                'requirements',
                'responsibilities'
            ]);
        });
    }
};
