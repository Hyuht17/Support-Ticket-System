<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LabelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $labels = [
            ['name' => 'bug'],
            ['name' => 'question'],
            ['name' => 'enhancement'],
        ];

        foreach ($labels as $label) {
            \App\Models\Label::create($label);
        }
    }
}
