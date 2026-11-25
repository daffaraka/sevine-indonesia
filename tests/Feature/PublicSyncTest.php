<?php

namespace Tests\Feature;

use App\Models\Career;
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
}
