<?php

namespace Database\Seeders;

use App\Models\Area;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Run area seeder first
        $this->call(AreaSeeder::class);

        // Create master admin user
        $area = Area::where('code', 'PST')->first();

        User::updateOrCreate(
            ['username' => 'masteradmin'],
            [
                'name'     => 'Master Admin',
                'email'    => 'admin@example.com',
                'password' => Hash::make(env('ADMIN_DEFAULT_PASSWORD', 'password')),
                'area_id'  => $area?->id ?? 1,
                'status'   => 'active',
                'phone'    => null,
            ]
        );

        // Uncomment to create test users
        // User::factory(10)->create(['area_id' => $area?->id ?? 1]);
    }
}
