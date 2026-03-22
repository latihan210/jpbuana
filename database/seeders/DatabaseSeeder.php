<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::create([
            'username' => 'masteradmin',
            'name'     => 'Yosep Solahudin',
            'email'    => 'masteradmin@example.com',
            'password' => Hash::make('21042002'), // Password Anda nanti
            'area_id'  => 1, // Pastikan tabel areas sudah ada isinya
        ]);
    }
}
