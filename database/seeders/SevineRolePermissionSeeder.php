<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class SevineRolePermissionSeeder extends Seeder
{
    public function run(): void
    {
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        $modulePermissions = [
            'overview',
            'monitoring',
            'products',
            'categories',
            'brands',
            'careers',
            'events',
            'collaborations',
            'access',
        ];

        foreach ($modulePermissions as $permissionName) {
            Permission::firstOrCreate([
                'name'       => $permissionName,
                'guard_name' => 'web',
            ]);
        }

        // Default awal hanya membuat 1 role: "admin" sesuai kebutuhan klien saat ini.
        $adminRole = Role::firstOrCreate(
            ['name' => 'admin', 'guard_name' => 'web'],
            [
                'description' => 'Akses penuh ke seluruh modul operasional, katalog, dan monitoring Sevine.',
                'is_system'   => true,
            ]
        );

        $adminRole->syncPermissions($modulePermissions);

        $defaultAdmin = User::firstOrCreate(
            ['email' => 'admin@sevine.co.id'],
            [
                'name'              => 'Admin CV. Sevine Indonesia',
                'password'          => Hash::make('password'),
                'email_verified_at' => now(),
                'is_active'         => true,
            ]
        );

        $defaultAdmin->assignRole($adminRole);
    }
}
