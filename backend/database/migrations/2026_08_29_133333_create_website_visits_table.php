<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('website_visits', function (Blueprint $table) {
            $table->id();

            $table->string('visitor_id');

            $table->string('page')->nullable();

            $table->string('ip_address')->nullable();

            $table->text('user_agent')->nullable();

            $table->timestamp('visited_at');

            $table->timestamps();

            $table->index('visitor_id');
            $table->index('visited_at');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('website_visits');
    }
};