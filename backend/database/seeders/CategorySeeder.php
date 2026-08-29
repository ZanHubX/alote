<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            'IT & Software',
            'Data & Analytics',
            'Cybersecurity',
            'Marketing',
            'Design',
            'Media & Communications',
            'Sales',
            'Business Development',
            'Customer Service',
            'Finance & Accounting',
            'Human Resources',
            'Administration',
            'Education',
            'Engineering',
            'Healthcare',
            'Legal',
            'Hospitality & Tourism',
            'Construction',
            'Manufacturing',
            'Logistics & Supply Chain',
        ];

        foreach ($categories as $name) {
            Category::updateOrCreate(
                ['name' => $name],
                [
                    'slug' => Str::slug($name),
                    'description' => null,
                ]
            );
        }
    }
}
