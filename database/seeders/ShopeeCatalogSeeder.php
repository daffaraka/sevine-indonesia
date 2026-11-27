<?php

namespace Database\Seeders;

use App\Models\Brand;
use App\Models\Product;
use App\Models\ProductCategory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class ShopeeCatalogSeeder extends Seeder
{
    private const MANIFEST_PATH = 'seeders/data/shopee_sevine_catalog.json';

    /** @var array<int, string> */
    private const LEGACY_SEVINE_DUMMY_SKUS = [
        'SVN-BAG-091',
        'SVN-BAG-105',
        'SVN-BAG-112',
        'SVN-BAG-120',
        'SVN-BAG-135',
        'SVN-ACC-012',
    ];

    /** @var array<int, string> */
    private const LEGACY_EMPTY_CATEGORY_SLUGS = [
        'tas-backpack',
        'tas-sling',
        'tas-harian-backpack',
        'tas-harian-crossbody',
        'tas-wanita-satchel',
        'apparel-basic-timeless',
        'busana-muslim-wanita',
    ];

    public function run(): void
    {
        $manifestPath = database_path(self::MANIFEST_PATH);
        if (! File::exists($manifestPath)) {
            $this->command?->error("Manifest Shopee tidak ditemukan di {$manifestPath}");

            return;
        }

        $manifest = json_decode(File::get($manifestPath), true, 512, JSON_THROW_ON_ERROR);
        $brandKey = (string) ($manifest['brand_key'] ?? 'SEVINE');
        $shippingOrigin = (string) ($manifest['shipping_origin'] ?? 'ngawi');

        $brand = Brand::where('key', $brandKey)->firstOrFail();

        DB::transaction(function () use ($manifest, $brand, $shippingOrigin): void {
            $categoryMap = $this->syncCategories($manifest['categories'] ?? []);
            $this->removeLegacySevineDummies();
            $this->deactivateEmptyLegacyCategories();
            $this->syncProducts($manifest['products'] ?? [], $brand, $categoryMap, $shippingOrigin);
        });
    }

    /**
     * @param  array<int, array<string, mixed>>  $categories
     * @return array<string, ProductCategory>
     */
    private function syncCategories(array $categories): array
    {
        $map = [];
        foreach ($categories as $data) {
            $slug = (string) $data['slug'];
            $existing = ProductCategory::withTrashed()
                ->where('slug', $slug)
                ->orWhere('name', (string) $data['name'])
                ->first();

            $payload = [
                'slug'        => $slug,
                'name'        => (string) $data['name'],
                'description' => (string) ($data['description'] ?? ''),
                'sort_order'  => (int) ($data['sort_order'] ?? 0),
                'is_active'   => true,
                'deleted_at'  => null,
            ];

            if ($existing) {
                $existing->fill($payload)->save();
                $map[$slug] = $existing;
            } else {
                $map[$slug] = ProductCategory::create($payload);
            }
        }

        return $map;
    }

    private function removeLegacySevineDummies(): void
    {
        Product::withTrashed()
            ->whereIn('sku', self::LEGACY_SEVINE_DUMMY_SKUS)
            ->forceDelete();
    }

    private function deactivateEmptyLegacyCategories(): void
    {
        ProductCategory::whereIn('slug', self::LEGACY_EMPTY_CATEGORY_SLUGS)
            ->doesntHave('products')
            ->update(['is_active' => false]);
    }

    /**
     * @param  array<int, array<string, mixed>>  $products
     * @param  array<string, ProductCategory>  $categoryMap
     */
    private function syncProducts(
        array $products,
        Brand $brand,
        array $categoryMap,
        string $defaultOrigin,
    ): void {
        foreach ($products as $data) {
            $category = $categoryMap[$data['category_slug']] ?? null;
            if (! $category) {
                continue;
            }

            $product = Product::withTrashed()->updateOrCreate(
                ['sku' => (string) $data['sku']],
                [
                    'name'            => (string) $data['name'],
                    'brand_id'        => $brand->id,
                    'category_id'     => $category->id,
                    'capacity'        => (string) ($data['capacity'] ?? 'Ready Stock'),
                    'price'           => isset($data['price']) ? (int) $data['price'] : null,
                    'status'          => 'Produksi Aktif',
                    'description'     => (string) ($data['description'] ?? ''),
                    'features'        => $data['features'] ?? [],
                    'shipping_origin' => (string) ($data['shipping_origin'] ?? $defaultOrigin),
                    'is_b2b_ready'    => true,
                    'shopee_url'      => (string) ($data['shopee_url'] ?? $brand->shopee_url),
                    'deleted_at'      => null,
                ],
            );

            $this->syncSwatches($product, $data['swatches'] ?? []);
            $this->syncImages($product, $data['images'] ?? [], (string) $data['name']);
        }
    }

    /** @param array<int, array{name: string, hex_code: string}> $swatches */
    private function syncSwatches(Product $product, array $swatches): void
    {
        $product->swatches()->delete();
        foreach ($swatches as $idx => $swatch) {
            $product->swatches()->create([
                'name'       => (string) $swatch['name'],
                'hex_code'   => (string) $swatch['hex_code'],
                'sort_order' => $idx + 1,
            ]);
        }
    }

    /** @param array<int, string> $images */
    private function syncImages(Product $product, array $images, string $altText): void
    {
        $product->images()->delete();
        foreach ($images as $idx => $path) {
            $product->images()->create([
                'image_path' => (string) $path,
                'alt_text'   => $altText,
                'is_primary' => $idx === 0,
                'sort_order' => $idx + 1,
            ]);
        }
    }
}
