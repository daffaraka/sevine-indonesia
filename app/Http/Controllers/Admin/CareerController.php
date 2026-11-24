<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ActivityLog;
use App\Models\Career;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class CareerController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $validated = $this->validateCareer($request);

        $career = Career::create([
            'slug'                  => Str::slug($validated['title']) . '-' . Str::lower(Str::random(4)),
            'title'                 => $validated['title'],
            'division'              => $validated['division'],
            'location'              => $validated['location'],
            'employment_type'       => $validated['employmentType'],
            'qualifications_html'   => $this->sanitizeHtml($validated['qualifications']),
            'responsibilities_html' => $this->sanitizeHtml($validated['responsibilities']),
            'google_form_url'       => $validated['googleFormUrl'],
            'is_active'             => $validated['isActive'] ?? true,
        ]);

        ActivityLog::record('Lowongan Kerja', 'create', $career->title);

        return back()->with('success', "Lowongan \"{$career->title}\" berhasil dipublikasikan.");
    }

    public function update(Request $request, Career $career): RedirectResponse
    {
        $validated = $this->validateCareer($request);

        $career->update([
            'title'                 => $validated['title'],
            'division'              => $validated['division'],
            'location'              => $validated['location'],
            'employment_type'       => $validated['employmentType'],
            'qualifications_html'   => $this->sanitizeHtml($validated['qualifications']),
            'responsibilities_html' => $this->sanitizeHtml($validated['responsibilities']),
            'google_form_url'       => $validated['googleFormUrl'],
            'is_active'             => $validated['isActive'] ?? $career->is_active,
        ]);

        ActivityLog::record('Lowongan Kerja', 'update', $career->title);

        return back()->with('success', "Lowongan \"{$career->title}\" berhasil diperbarui.");
    }

    public function toggleStatus(Career $career): RedirectResponse
    {
        $career->update(['is_active' => ! $career->is_active]);
        $statusLabel = $career->is_active ? 'Aktif' : 'Ditutup';
        ActivityLog::record('Lowongan Kerja', 'update', "{$career->title} ({$statusLabel})");

        return back()->with('info', "Status lowongan \"{$career->title}\" diubah menjadi {$statusLabel}.");
    }

    public function destroy(Career $career): RedirectResponse
    {
        $title = $career->title;
        $career->delete();
        ActivityLog::record('Lowongan Kerja', 'delete', $title);

        return back()->with('warning', "Lowongan \"{$title}\" berhasil dihapus.");
    }

    private function validateCareer(Request $request): array
    {
        return $request->validate([
            'title'            => ['required', 'string', 'max:255'],
            'division'         => ['required', 'string', 'max:120'],
            'location'         => ['required', Rule::in(['Ngawi', 'Malang', 'Remote'])],
            'employmentType'   => ['required', Rule::in(['Full-time', 'Part-time', 'Magang'])],
            'qualifications'   => ['required', 'string'],
            'responsibilities' => ['required', 'string'],
            'googleFormUrl'    => ['required', 'url', 'max:500'],
            'isActive'         => ['boolean'],
        ]);
    }

    private function sanitizeHtml(string $html): string
    {
        return strip_tags($html, '<p><br><ul><ol><li><strong><em><b><i><h3><h4>');
    }
}
