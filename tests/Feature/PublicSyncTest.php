<?php

namespace Tests\Feature;

use App\Models\Career;
use App\Models\DailyVisitorMetric;
use App\Models\Product;
use Database\Seeders\SevineContentSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class PublicSyncTest extends TestCase
{
    use RefreshDatabase;

    public function test_home_receives_all_synced_dashboard_modules(): void
    {
        $this->seed(SevineContentSeeder::class);

        $this->get('/')
            ->assertStatus(200)
            ->assertInertia(fn (Assert $page) => $page
                ->component('Public/ClassicProfile')
                ->has('brands', 5)
                ->has('categories', 6)
                ->has('products', 18)
                ->has('events', 5)
                ->has('partners', 17)
                ->has('careers', 3)
                ->has('testimonials', 4)
                ->has('faqs', 5)
            );
    }

    public function test_catalog_receives_synced_products_brands_and_categories(): void
    {
        $this->seed(SevineContentSeeder::class);

        $this->get('/catalog')
            ->assertStatus(200)
            ->assertInertia(fn (Assert $page) => $page
                ->component('Public/ProductCatalog')
                ->has('products', 18)
                ->has('brands', 5)
                ->has('categories', 6)
            );
    }

    public function test_career_detail_renders_active_career_and_blocks_inactive(): void
    {
        $this->seed(SevineContentSeeder::class);

        $activeCareer = Career::where('is_active', true)->firstOrFail();
        $inactiveCareer = Career::where('is_active', false)->firstOrFail();

        $this->get("/careers/{$activeCareer->slug}")
            ->assertStatus(200)
            ->assertInertia(fn (Assert $page) => $page
                ->component('Public/CareerDetail')
                ->where('career.slug', $activeCareer->slug)
                ->has('otherCareers', 2)
            );

        $this->get("/careers/{$inactiveCareer->slug}")
            ->assertStatus(404);
    }

    public function test_product_detail_renders_active_product_increments_views_and_blocks_inactive(): void
    {
        $this->seed(SevineContentSeeder::class);

        $activeProduct = Product::where('status', 'Produksi Aktif')->firstOrFail();
        $initialViews = $activeProduct->views_count;

        $this->get('/catalog/' . strtolower($activeProduct->sku))
            ->assertStatus(200)
            ->assertInertia(fn (Assert $page) => $page
                ->component('Public/ProductDetail')
                ->where('product.sku', $activeProduct->sku)
                ->has('relatedProducts')
            );

        $this->assertSame($initialViews + 1, $activeProduct->fresh()->views_count);

        $inactiveProduct = Product::where('status', '!=', 'Produksi Aktif')->first();
        if (! $inactiveProduct) {
            $inactiveProduct = Product::where('status', 'Produksi Aktif')
                ->whereKeyNot($activeProduct->getKey())
                ->firstOrFail();
            $inactiveProduct->update(['status' => 'Draft Sampling']);
        }

        $this->get("/catalog/{$inactiveProduct->sku}")->assertStatus(404);
        $this->get('/catalog/SKU-TIDAK-TERDAFTAR')->assertStatus(404);
    }

    public function test_catalog_telemetry_records_shopee_and_whatsapp_clicks(): void
    {
        $this->seed(SevineContentSeeder::class);

        $product = Product::where('status', 'Produksi Aktif')->firstOrFail();
        $beforeMetric = DailyVisitorMetric::whereDate('metric_date', now()->toDateString())->first();
        $initialShopee = $beforeMetric?->shopee_store_clicks ?? 0;
        $initialWhatsapp = $beforeMetric?->whatsapp_b2b_clicks ?? 0;

        $this->postJson('/telemetry/click', [
            'type'      => 'shopee',
            'productId' => $product->id,
        ])->assertOk()->assertJson(['recorded' => true]);

        $this->postJson('/telemetry/click', [
            'type'      => 'whatsapp',
            'productId' => $product->id,
        ])->assertOk()->assertJson(['recorded' => true]);

        $todayMetric = DailyVisitorMetric::whereDate('metric_date', now()->toDateString())->firstOrFail();
        $this->assertSame($initialShopee + 1, $todayMetric->shopee_store_clicks);
        $this->assertSame($initialWhatsapp + 1, $todayMetric->whatsapp_b2b_clicks);
    }
}
