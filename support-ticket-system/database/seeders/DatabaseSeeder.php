<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Database\Seeders\CategorySeeder;
use Database\Seeders\TicketSeeder;
use Database\Seeders\TicketCategorySeeder;
use Database\Seeders\RoleSeeder;
use Database\Seeders\LabelSeeder;
use Database\Seeders\AdminUserSeeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Tạo roles trước
        $this->call([
            RoleSeeder::class,
        ]);

        // Tạo users với role_id
        User::factory(10)->create();

        $this->call([
            AdminUserSeeder::class,
            CategorySeeder::class,
            LabelSeeder::class,
            TicketSeeder::class,
            TicketCategorySeeder::class,
        ]);
    }
}
