<?php

namespace Database\Seeders;

use App\Models\Area;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AreaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Area::updateOrCreate(
            ['code' => 'W1'],
            ['name' => 'Area 1']
        );
        Area::updateOrCreate(
            ['code' => 'W2'],
            ['name' => 'Area 2']
        );
        Area::updateOrCreate(
            ['code' => 'PST'],
            ['name' => 'Pusat']
        );
    }
}
