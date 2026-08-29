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
        Schema::create('payments', function (Blueprint $table) {
            $table->id();

            $table->foreignId('job_submission_id')
                ->constrained('job_submissions')
                ->cascadeOnDelete();

            $table->decimal('amount', 12, 2);
            $table->string('currency', 10)->default('MMK');

            $table->string('payment_method')->nullable();
            // bank_transfer, kbzpay, wavepay, etc.

            $table->string('transaction_id')->nullable();

            $table->string('status')->default('pending');
            // pending, paid, failed, refunded

            $table->timestamp('paid_at')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
