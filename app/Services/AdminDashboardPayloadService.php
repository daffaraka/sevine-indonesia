<?php

namespace App\Services;

use App\Models\ActivityLog;
use App\Models\Brand;
use App\Models\Career;
use App\Models\DailyVisitorMetric;
use App\Models\Event;
use App\Models\Partner;
use App\Models\Product;
use App\Models\ProductCategory;
use App\Models\VisitorSession;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Role;

class AdminDashboardPayloadService
{
    public function buildOverviewProps(): array
    {
        return [
            'products'   => $this->mapProducts(),
            'categories' => $this->mapCategories(),
            'brands'     => $this->mapBrands(),
            'careers'    => $this->mapCareers(),
            'events'     => $this->mapEvents(),
            'partners'   => $this->mapPartners(),
        ];
    }

    public function buildMonitoringPageProps(): array
    {
        return [
            'brands'     => $this->mapBrands(),
            'careers'    => $this->mapCareers(),
            'monitoring' => fn () => $this->buildMonitoringPayload(),
        ];
    }

    public function buildProductsPageProps(): array
    {
        return [
            'products'   => $this->mapProducts(),
            'categories' => $this->mapCategories(),
        ];
    }

    public function buildCategoriesPageProps(): array
    {
        return [
            'categories' => $this->mapCategories(),
            'products'   => $this->mapProducts(),
        ];
    }

    public function buildBrandsPageProps(): array
    {
        return [
            'brands'   => $this->mapBrands(),
            'products' => $this->mapProducts(),
        ];
    }

    public function buildCareersPageProps(): array
    {
        return [
            'careers' => $this->mapCareers(),
        ];
    }

    public function buildEventsPageProps(): array
    {
        return [
            'events' => $this->mapEvents(),
        ];
    }

    public function buildCollaborationsPageProps(): array
    {
        return [
            'partners' => $this->mapPartners(),
        ];
    }

    public function buildAccessPageProps(): array
    {
        return [
            'roles' => $this->mapRoles(),
        ];
    }

    public function buildMonitoringPayload(): array
    {
        $liveWindowStart = now()->subMinutes(5);
        $liveOnlineCount = VisitorSession::where('last_seen_at', '>=', $liveWindowStart)->count();

        $dailyMetrics = DailyVisitorMetric::orderByDesc('metric_date')
            ->limit(14)
            ->get()
            ->reverse()
            ->values()
            ->map(fn (DailyVisitorMetric $m) => [
                'date'             => $m->metric_date->toDateString(),
                'label'            => $m->metric_date->isToday()
                    ? 'Hari Ini'
                    : $m->metric_date->translatedFormat('d M'),
                'uniqueVisitors'   => $m->unique_visitors,
                'pageViews'        => $m->page_views,
                'catalogViews'     => $m->catalog_views,
                'whatsappClicks'   => $m->whatsapp_b2b_clicks,
                'shopeeClicks'     => $m->shopee_store_clicks,
                'careerFormClicks' => $m->career_form_clicks,
            ]);

        $actionLabels = [
            'create'      => 'Menambahkan Data',
            'update'      => 'Memperbarui Data',
            'delete'      => 'Menghapus Data',
            'bulk_status' => 'Mengubah Status Massal',
            'bulk_delete' => 'Menghapus Data Massal',
            'import'      => 'Impor Data Massal',
            'toggle'      => 'Mengubah Status Publikasi',
        ];

        $recentActivities = ActivityLog::orderByDesc('created_at')
            ->limit(20)
            ->get()
            ->map(fn (ActivityLog $log) => [
                'id'          => (string) $log->id,
                'actorRole'   => $log->actor_role,
                'module'      => $log->module,
                'actionLabel' => $actionLabels[$log->action] ?? $log->action,
                'targetLabel' => $log->target_label,
                'timestamp'   => $log->created_at?->diffForHumans() ?? 'Baru saja',
                'tone'        => in_array($log->action, ['delete', 'bulk_delete'], true) ? 'warning' : 'success',
            ]);

        $dbStart = microtime(true);
        DB::select('SELECT 1');
        $dbLatencyMs = (int) round((microtime(true) - $dbStart) * 1000);

        return [
            'liveOnlineVisitors' => $liveOnlineCount,
            'dailyMetrics'       => $dailyMetrics,
            'recentActivities'   => $recentActivities,
            'systemHealth'       => [
                'databaseLatencyMs' => $dbLatencyMs,
                'appStatus'         => 'normal',
                'checkedAt'         => now()->toIso8601String(),
            ],
        ];
    }

    private function mapProducts(): array
    {
        return Product::with(['brand', 'category', 'swatches', 'images'])
            ->latest('id')
            ->get()
            ->map(fn (Product $p) => [
                'id'          => $p->id,
                'sku'         => $p->sku,
                'name'        => $p->name,
                'brand'       => $p->brand?->key ?? 'SEVINE',
                'category'    => $p->category?->name ?? '-',
                'capacity'    => $p->capacity,
                'status'      => $p->status,
                'description' => $p->description ?? '',
                'swatches'    => $p->swatches->map(fn ($s) => [
                    'name' => $s->name,
                    'hex'  => $s->hex_code,
                ])->all(),
                'images'      => $p->images->pluck('image_path')->all(),
            ])
            ->all();
    }

    private function mapCategories(): array
    {
        return ProductCategory::orderBy('sort_order')
            ->orderBy('name')
            ->get()
            ->map(fn (ProductCategory $c) => [
                'id'          => (string) $c->id,
                'name'        => $c->name,
                'description' => $c->description ?? '',
                'isActive'    => $c->is_active,
            ])
            ->all();
    }

    private function mapBrands(): array
    {
        return Brand::orderBy('sort_order')
            ->get()
            ->map(fn (Brand $b) => [
                'id'           => (string) $b->id,
                'key'          => $b->key,
                'name'         => $b->name,
                'tagline'      => $b->tagline,
                'description'  => $b->description,
                'targetMarket' => $b->target_market,
                'badgeColor'   => $b->badge_color,
                'shopeeUrl'    => $b->shopee_url,
            ])
            ->all();
    }

    private function mapCareers(): array
    {
        return Career::latest('updated_at')
            ->get()
            ->map(fn (Career $c) => [
                'id'               => (string) $c->id,
                'title'            => $c->title,
                'division'         => $c->division,
                'location'         => $c->location,
                'employmentType'   => $c->employment_type,
                'qualifications'   => $c->qualifications_html,
                'responsibilities' => $c->responsibilities_html,
                'googleFormUrl'    => $c->google_form_url,
                'isActive'         => $c->is_active,
                'updatedAt'        => $c->updated_at?->translatedFormat('d M Y') ?? '-',
            ])
            ->all();
    }

    private function mapEvents(): array
    {
        return Event::with('images')
            ->orderBy('sort_order')
            ->latest('id')
            ->get()
            ->map(fn (Event $e) => [
                'id'          => (string) $e->id,
                'title'       => $e->title,
                'location'    => $e->location,
                'year'        => $e->year_label,
                'description' => $e->description,
                'images'      => $e->images->pluck('image_path')->all(),
            ])
            ->all();
    }

    private function mapPartners(): array
    {
        return Partner::orderBy('sort_order')
            ->latest('id')
            ->get()
            ->map(fn (Partner $p) => [
                'id'            => (string) $p->id,
                'name'          => $p->name,
                'category'      => $p->category,
                'categoryLabel' => $p->category_label,
                'logo'          => $p->logo_path,
                'role'          => $p->role_scope,
                'status'        => $p->status,
            ])
            ->all();
    }

    private function mapRoles(): array
    {
        return Role::with('permissions')
            ->orderBy('id')
            ->get()
            ->map(fn (Role $role) => [
                'id'          => (string) $role->id,
                'name'        => $role->name,
                'description' => $role->getAttribute('description') ?? 'Role akses Spatie Permission',
                'permissions' => $role->permissions->pluck('name')->values()->all(),
                'isSystem'    => (bool) $role->getAttribute('is_system'),
            ])
            ->all();
    }
}
