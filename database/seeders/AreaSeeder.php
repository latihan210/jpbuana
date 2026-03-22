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
        Area::create(['name' => 'Area 1', 'code' => 'W1',]);
        Area::create(['name' => 'Area 2', 'code' => 'W2',]);
        Area::create(['name' => 'Pusat', 'code' => 'PST',]);
    }
}
