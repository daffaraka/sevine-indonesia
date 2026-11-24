<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ActivityLog;
use App\Models\Partner;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class PartnerController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $validated = $this->validatePartner($request);

        $partner = Partner::create([
            'name'           => $validated['name'],
            'category'       => $validated['category'],
            'category_label' => $validated['categoryLabel'],
            'logo_path'      => $validated['logo'],
            'role_scope'     => $validated['role'],
            'status'         => $validated['status'],
        ]);

        ActivityLog::record('Mitra Kolaborasi', 'create', $partner->name);

        return back()->with('success', "Mitra \"{$partner->name}\" berhasil ditambahkan.");
    }

    public function update(Request $request, Partner $partner): RedirectResponse
    {
        $validated = $this->validatePartner($request);

        $partner->update([
            'name'           => $validated['name'],
            'category'       => $validated['category'],
            'category_label' => $validated['categoryLabel'],
            'logo_path'      => $validated['logo'],
            'role_scope'     => $validated['role'],
            'status'         => $validated['status'],
        ]);

        ActivityLog::record('Mitra Kolaborasi', 'update', $partner->name);

        return back()->with('success', "Data mitra \"{$partner->name}\" berhasil diperbarui.");
    }

    public function destroy(Partner $partner): RedirectResponse
    {
        $name = $partner->name;
        $partner->delete();
        ActivityLog::record('Mitra Kolaborasi', 'delete', $name);

        return back()->with('warning', "Mitra \"{$name}\" berhasil dihapus.");
    }

    private function validatePartner(Request $request): array
    {
        return $request->validate([
            'name'          => ['required', 'string', 'max:255'],
            'category'      => ['required', 'string', 'max:64'],
            'categoryLabel' => ['required', 'string', 'max:120'],
            'logo'          => ['required', 'string', 'max:500'],
            'role'          => ['required', 'string', 'max:255'],
            'status'        => ['required', Rule::in(['Mitra Aktif', 'Nonaktif'])],
        ]);
    }
}
