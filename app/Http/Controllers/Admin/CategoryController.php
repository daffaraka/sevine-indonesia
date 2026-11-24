<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ActivityLog;
use App\Models\ProductCategory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class CategoryController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name'        => ['required', 'string', 'max:120', 'unique:product_categories,name'],
            'description' => ['nullable', 'string'],
            'isActive'    => ['boolean'],
        ]);

        $category = ProductCategory::create([
            'slug'        => Str::slug($validated['name']),
            'name'        => $validated['name'],
            'description' => $validated['description'] ?? '',
            'is_active'   => $validated['isActive'] ?? true,
        ]);

        ActivityLog::record('Kategori Produk', 'create', $category->name);

        return back()->with('success', "Kategori \"{$category->name}\" berhasil ditambahkan.");
    }

    public function update(Request $request, ProductCategory $category): RedirectResponse
    {
        $validated = $request->validate([
            'name'        => ['required', 'string', 'max:120', Rule::unique('product_categories', 'name')->ignore($category->id)],
            'description' => ['nullable', 'string'],
            'isActive'    => ['boolean'],
        ]);

        $category->update([
            'slug'        => Str::slug($validated['name']),
            'name'        => $validated['name'],
            'description' => $validated['description'] ?? '',
            'is_active'   => $validated['isActive'] ?? $category->is_active,
        ]);

        ActivityLog::record('Kategori Produk', 'update', $category->name);

        return back()->with('success', "Kategori \"{$category->name}\" berhasil diperbarui.");
    }

    public function destroy(ProductCategory $category): RedirectResponse
    {
        $linkedCount = $category->products()->count();
        if ($linkedCount > 0) {
            return back()->with('warning', "Kategori \"{$category->name}\" masih dipakai {$linkedCount} produk.");
        }

        $name = $category->name;
        $category->delete();
        ActivityLog::record('Kategori Produk', 'delete', $name);

        return back()->with('warning', "Kategori \"{$name}\" berhasil dihapus.");
    }
}
