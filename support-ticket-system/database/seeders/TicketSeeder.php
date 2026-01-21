<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TicketSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('tickets')->insert([
            [
                'title' => 'Loi trang dang nhap',
                'description' => 'Bi loi khi dang nhap voi tai khoan hop le',
                'user_id' => 1,
                'status' => 'open',
                'priority' => 'high',
            ],
        ]);
    }
}
