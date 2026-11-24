<?php

namespace App\Http\Middleware;

use App\Models\Brand;
use App\Models\Career;
use App\Models\Event;
use App\Models\Partner;
use App\Models\Product;
use App\Models\ProductCategory;
use App\Models\VisitorSession;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Spatie\Permission\Models\Role;

/**
 * Middleware standar Inertia.js untuk membagikan props global (auth user,
 * role & permission Spatie, flash alert, dan ringkasan ringan sidebar/header).
 */
class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    public function share(Request $request): array
    {
        $user = $request->user();
        $isAdminRoute = $request->is('admin*');

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $user ? [
                    'id'          => $user->id,
                    'name'        => $user->name,
                    'email'       => $user->email,
                    'roles'       => $user->getRoleNames()->values(),
                    'permissions' => $user->getAllPermissions()->pluck('name')->values(),
                ] : null,
            ],
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'warning' => fn () => $request->session()->get('warning'),
                'info'    => fn () => $request->session()->get('info'),
            ],
            'liveOnlineVisitors' => fn () => $user && $isAdminRoute
                ? VisitorSession::where('last_seen_at', '>=', now()->subMinutes(5))->count()
                : 0,
            'adminShell' => fn () => $user && $isAdminRoute
                ? $this->buildAdminShellProps()
                : null,
        ];
    }

    private function buildAdminShellProps(): array
    {
        $liveCount = VisitorSession::where('last_seen_at', '>=', now()->subMinutes(5))->count();

        return [
            'menuCounts' => [
                'monitoring'     => "{$liveCount} online",
                'products'       => (string) Product::count(),
                'categories'     => (string) ProductCategory::count(),
                'brands'         => (string) Brand::count(),
                'careers'        => (string) Career::where('is_active', true)->count(),
                'events'         => (string) Event::count(),
                'collaborations' => (string) Partner::count(),
                'access'         => (string) Role::count(),
            ],
            'roles' => Role::with('permissions')
                ->orderBy('id')
                ->get()
                ->map(fn (Role $role) => [
                    'id'          => (string) $role->id,
                    'name'        => $role->name,
                    'description' => $role->getAttribute('description') ?? 'Role akses Spatie Permission',
                    'permissions' => $role->permissions->pluck('name')->values()->all(),
                    'isSystem'    => (bool) $role->getAttribute('is_system'),
                ])
                ->all(),
        ];
    }
}
