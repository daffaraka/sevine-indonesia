<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ActivityLog;
use App\Models\Brand;
use App\Models\Product;
use App\Models\ProductCategory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class ProductController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $validated = $this->validateProduct($request);

        DB::transaction(function () use ($validated) {
            $brand = Brand::where('key', $validated['brand'])->firstOrFail();
            $category = ProductCategory::where('name', $validated['category'])->firstOrFail();

            $product = Product::create([
                'sku'         => strtoupper($validated['sku']),
                'name'        => $validated['name'],
                'brand_id'    => $brand->id,
                'category_id' => $category->id,
                'capacity'    => $validated['capacity'] ?? '-',
                'status'      => $validated['status'],
                'description' => $validated['description'] ?? '',
            ]);

            $this->syncRelations($product, $validated['swatches'] ?? [], $validated['images'] ?? []);
            ActivityLog::record('Katalog Produk', 'create', "{$product->sku} · {$product->name}");
        });

        return back()->with('success', "Produk \"{$validated['name']}\" berhasil ditambahkan.");
    }

    public function update(Request $request, Product $product): RedirectResponse
    {
        $validated = $this->validateProduct($request, $product->id);

        DB::transaction(function () use ($product, $validated) {
            $brand = Brand::where('key', $validated['brand'])->firstOrFail();
            $category = ProductCategory::where('name', $validated['category'])->firstOrFail();

            $product->update([
                'sku'         => strtoupper($validated['sku']),
                'name'        => $validated['name'],
                'brand_id'    => $brand->id,
                'category_id' => $category->id,
                'capacity'    => $validated['capacity'] ?? '-',
                'status'      => $validated['status'],
                'description' => $validated['description'] ?? '',
            ]);

            $this->syncRelations($product, $validated['swatches'] ?? [], $validated['images'] ?? []);
            ActivityLog::record('Katalog Produk', 'update', "{$product->sku} · {$product->name}");
        });

        return back()->with('success', "Produk \"{$product->name}\" berhasil diperbarui.");
    }

    public function destroy(Product $product): RedirectResponse
    {
        $label = "{$product->sku} · {$product->name}";
        $product->delete();
        ActivityLog::record('Katalog Produk', 'delete', $label);

        return back()->with('warning', "Produk \"{$label}\" berhasil dihapus.");
    }

    public function bulkStatus(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'ids'    => ['required', 'array', 'min:1'],
            'ids.*'  => ['integer', 'exists:products,id'],
            'status' => ['required', Rule::in(['Produksi Aktif', 'Review QC', 'Draft Sampling'])],
        ]);

        $count = Product::whereIn('id', $validated['ids'])->update(['status' => $validated['status']]);
        ActivityLog::record('Katalog Produk', 'bulk_status', "{$count} SKU diubah ke {$validated['status']}");

        return back()->with('success', "Status {$count} produk diubah menjadi \"{$validated['status']}\".");
    }

    public function bulkDestroy(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'ids'   => ['required', 'array', 'min:1'],
            'ids.*' => ['integer', 'exists:products,id'],
        ]);

        $count = Product::whereIn('id', $validated['ids'])->delete();
        ActivityLog::record('Katalog Produk', 'delete', "Hapus massal {$count} produk");

        return back()->with('warning', "{$count} produk berhasil dihapus dari katalog.");
    }

    public function importCsv(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'items'              => ['required', 'array', 'min:1', 'max:200'],
            'items.*.sku'        => ['required', 'string', 'max:64', 'distinct', 'unique:products,sku'],
            'items.*.name'       => ['required', 'string', 'max:255'],
            'items.*.brand'      => ['required', 'string', 'exists:brands,key'],
            'items.*.category'   => ['required', 'string', 'max:255'],
            'items.*.capacity'   => ['nullable', 'string', 'max:64'],
            'items.*.status'     => ['required', Rule::in(['Produksi Aktif', 'Review QC', 'Draft Sampling'])],
            'items.*.description'=> ['nullable', 'string'],
        ]);

        $brands = Brand::pluck('id', 'key');
        $fallbackCategoryId = ProductCategory::value('id');

        DB::transaction(function () use ($validated, $brands, $fallbackCategoryId) {
            foreach ($validated['items'] as $row) {
                $categoryId = ProductCategory::where('name', $row['category'])->value('id') ?? $fallbackCategoryId;
                $product = Product::create([
                    'sku'         => strtoupper($row['sku']),
                    'name'        => $row['name'],
                    'brand_id'    => $brands[$row['brand']],
                    'category_id' => $categoryId,
                    'capacity'    => $row['capacity'] ?? '1.000 pcs/bln',
                    'status'      => $row['status'],
                    'description' => $row['description'] ?? '',
                ]);
                $product->swatches()->create(['name' => 'Navy Doff', 'hex_code' => '#1B2E4B', 'sort_order' => 1]);
            }
            $total = count($validated['items']);
            ActivityLog::record('Katalog Produk', 'import_csv', "Impor CSV {$total} SKU produk");
        });

        return back()->with('success', count($validated['items']) . ' produk berhasil diimpor ke database.');
    }

    private function validateProduct(Request $request, ?int $ignoreId = null): array
    {
        return $request->validate([
            'sku'            => ['required', 'string', 'max:64', Rule::unique('products', 'sku')->ignore($ignoreId)],
            'name'           => ['required', 'string', 'max:255'],
            'brand'          => ['required', 'string', 'exists:brands,key'],
            'category'       => ['required', 'string', 'exists:product_categories,name'],
            'capacity'       => ['nullable', 'string', 'max:64'],
            'status'         => ['required', Rule::in(['Produksi Aktif', 'Review QC', 'Draft Sampling'])],
            'description'    => ['nullable', 'string'],
            'swatches'       => ['nullable', 'array'],
            'swatches.*.name'=> ['required_with:swatches', 'string', 'max:64'],
            'swatches.*.hex' => ['required_with:swatches', 'regex:/^#[0-9A-Fa-f]{6}$/'],
            'images'         => ['nullable', 'array'],
            'images.*'       => ['string', 'max:500'],
        ]);
    }

    private function syncRelations(Product $product, array $swatches, array $images): void
    {
        $product->swatches()->delete();
        foreach ($swatches as $idx => $swatch) {
            $product->swatches()->create([
                'name'       => $swatch['name'],
                'hex_code'   => $swatch['hex'],
                'sort_order' => $idx + 1,
            ]);
        }

        $product->images()->delete();
        foreach ($images as $idx => $path) {
            $product->images()->create([
                'image_path' => $path,
                'alt_text'   => $product->name,
                'is_primary' => $idx === 0,
                'sort_order' => $idx + 1,
            ]);
        }
    }
}
