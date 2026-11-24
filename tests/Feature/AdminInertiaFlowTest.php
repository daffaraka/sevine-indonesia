<?php

namespace Tests\Feature;

use App\Models\Product;
use App\Models\User;
use Database\Seeders\DatabaseSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class AdminInertiaFlowTest extends TestCase
{
    use RefreshDatabase;

    public function test_guest_is_redirected_from_admin_to_login(): void
    {
        $this->get('/admin')->assertRedirect('/login');
    }

    public function test_admin_can_login_access_dashboard_crud_product_and_logout(): void
    {
        $this->seed(DatabaseSeeder::class);

        // 1. Login via Email + Password standar Laravel
        $this->post('/login', [
            'email'    => 'admin@sevine.co.id',
            'password' => 'password',
            'remember' => true,
        ])->assertRedirect('/admin');

        $admin = User::where('email', 'admin@sevine.co.id')->firstOrFail();
        $this->assertTrue($admin->hasRole('admin'));

        // 2. Akses Dashboard & seluruh 9 halaman Inertia terpisah per modul
        $expectedPages = [
            '/admin'                => 'Admin/Overview',
            '/admin/monitoring'     => 'Admin/Monitoring',
            '/admin/products'       => 'Admin/Products',
            '/admin/categories'     => 'Admin/Categories',
            '/admin/brands'         => 'Admin/Brands',
            '/admin/careers'        => 'Admin/Careers',
            '/admin/events'         => 'Admin/Events',
            '/admin/collaborations' => 'Admin/Collaborations',
            '/admin/access'         => 'Admin/Access',
        ];

        foreach ($expectedPages as $url => $component) {
            $this->get($url)
                ->assertOk()
                ->assertInertia(fn (Assert $page) => $page
                    ->component($component)
                    ->has('adminShell.menuCounts')
                    ->has('adminShell.roles'));
        }

        // 3. Tambah produk via endpoint Inertia CRUD
        $this->post('/admin/products', [
            'sku'         => 'SVN-TEST-999',
            'name'        => 'Backpack Uji Integrasi Inertia',
            'brand'       => 'SEVINE',
            'category'    => 'Tas Harian (Backpack)',
            'capacity'    => '500 pcs/bln',
            'status'      => 'Produksi Aktif',
            'description' => 'Produk uji otomatis PHPUnit',
            'swatches'    => [['name' => 'Navy Doff', 'hex' => '#1B2E4B']],
            'images'      => ['/assets/brands/logo-sevine-1.webp'],
        ])->assertSessionHas('success');

        $created = Product::where('sku', 'SVN-TEST-999')->first();
        $this->assertNotNull($created);

        // 4. Hapus produk (soft delete)
        $this->delete("/admin/products/{$created->id}")->assertSessionHas('warning');
        $this->assertSoftDeleted('products', ['id' => $created->id]);

        // 5. Logout
        $this->post('/logout')->assertRedirect('/login');
        $this->assertGuest();
    }

    public function test_public_visit_records_internal_daily_telemetry(): void
    {
        $this->seed(DatabaseSeeder::class);

        $this->get('/')->assertOk();
        $this->get('/catalog')->assertOk();

        $this->assertDatabaseCount('visitor_sessions', 1);
    }
}
