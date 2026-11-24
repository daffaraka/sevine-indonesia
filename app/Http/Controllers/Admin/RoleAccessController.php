<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ActivityLog;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class RoleAccessController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $validated = $this->validateRole($request);

        $role = Role::create([
            'name'        => $validated['name'],
            'description' => $validated['description'] ?? '',
            'guard_name'  => 'web',
            'is_system'   => false,
        ]);

        $this->syncPermissions($role, $validated['permissions']);
        ActivityLog::record('Hak Akses & Role', 'create', $role->name);

        return back()->with('success', "Role \"{$role->name}\" berhasil dibuat.");
    }

    public function update(Request $request, Role $role): RedirectResponse
    {
        $validated = $this->validateRole($request, $role->id);

        $role->update([
            'name'        => $role->getAttribute('is_system') ? $role->name : $validated['name'],
            'description' => $validated['description'] ?? '',
        ]);

        $this->syncPermissions($role, $validated['permissions']);
        ActivityLog::record('Hak Akses & Role', 'update', $role->name);

        return back()->with('success', "Role \"{$role->name}\" berhasil diperbarui.");
    }

    public function destroy(Role $role): RedirectResponse
    {
        if ($role->getAttribute('is_system')) {
            return back()->with('warning', 'Role sistem default tidak dapat dihapus.');
        }

        $name = $role->name;
        $role->delete();
        app()[PermissionRegistrar::class]->forgetCachedPermissions();
        ActivityLog::record('Hak Akses & Role', 'delete', $name);

        return back()->with('warning', "Role \"{$name}\" berhasil dihapus.");
    }

    private function validateRole(Request $request, ?int $ignoreId = null): array
    {
        return $request->validate([
            'name'          => ['required', 'string', 'max:64', Rule::unique('roles', 'name')->ignore($ignoreId)],
            'description'   => ['nullable', 'string', 'max:255'],
            'permissions'   => ['required', 'array', 'min:1'],
            'permissions.*' => ['string', 'max:64'],
        ]);
    }

    private function syncPermissions(Role $role, array $permissionNames): void
    {
        foreach ($permissionNames as $name) {
            Permission::firstOrCreate(['name' => $name, 'guard_name' => 'web']);
        }
        $role->syncPermissions($permissionNames);
        app()[PermissionRegistrar::class]->forgetCachedPermissions();
    }
}
