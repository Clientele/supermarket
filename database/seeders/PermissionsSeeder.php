<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class PermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        #User
        Permission::create(['name' => 'Create Users', "guard_name"=> "api"]);
        Permission::create(['name' => 'View Users', "guard_name"=> "api"]);
        Permission::create(['name' => 'Update Users', "guard_name"=> "api"]);
        Permission::create(['name' => 'Delete Users', "guard_name"=> "api"]);

    }
}
