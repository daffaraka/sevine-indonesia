<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ActivityLog;
use App\Models\Brand;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class BrandController extends Controller
{
    public function update(Request $request, Brand $brand): RedirectResponse
    {
        $validated = $request->validate([
            'name'         => ['required', 'string', 'max:120'],
            'tagline'      => ['required', 'string', 'max:255'],
            'description'  => ['required', 'string'],
            'targetMarket' => ['required', 'string', 'max:255'],
            'shopeeUrl'    => ['required', 'url', 'max:255'],
        ]);

        $brand->update([
            'name'          => $validated['name'],
            'tagline'       => $validated['tagline'],
            'description'   => $validated['description'],
            'target_market' => $validated['targetMarket'],
            'shopee_url'    => $validated['shopeeUrl'],
        ]);

        ActivityLog::record('5 Brand Ekosistem', 'update', $brand->name);

        return back()->with('success', "Profil brand \"{$brand->name}\" berhasil diperbarui.");
    }
}
