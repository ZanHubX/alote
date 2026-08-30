<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class ProductionAdminSeeder extends Seeder
{
    public function run(): void
    {
        $email = env('ADMIN_EMAIL');
        $password = env('ADMIN_PASSWORD');
        $name = env('ADMIN_NAME', 'ALote Admin');

        if (!$email || !$password) {
            $this->command?->warn(
                'ADMIN_EMAIL or ADMIN_PASSWORD is missing. Admin was not created.'
            );

            return;
        }

        User::firstOrCreate(
            [
                'email' => $email,
            ],
            [
                'name' => $name,
                'password' => Hash::make($password),
            ]
        );

        $this->command?->info(
            'Production admin account is ready.'
        );
    }
}
