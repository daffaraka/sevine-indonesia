<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ActivityLog;
use App\Models\Event;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class EventController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $validated = $this->validateEvent($request);

        DB::transaction(function () use ($validated) {
            $event = Event::create([
                'slug'         => Str::slug($validated['title']) . '-' . Str::lower(Str::random(4)),
                'title'        => $validated['title'],
                'location'     => $validated['location'],
                'year_label'   => $validated['year'],
                'description'  => $validated['description'],
                'is_published' => true,
            ]);

            $this->syncImages($event, $validated['images']);
            ActivityLog::record('Dokumentasi Event', 'create', $event->title);
        });

        return back()->with('success', "Dokumentasi event \"{$validated['title']}\" berhasil ditambahkan.");
    }

    public function update(Request $request, Event $event): RedirectResponse
    {
        $validated = $this->validateEvent($request);

        DB::transaction(function () use ($event, $validated) {
            $event->update([
                'title'       => $validated['title'],
                'location'    => $validated['location'],
                'year_label'  => $validated['year'],
                'description' => $validated['description'],
            ]);

            $this->syncImages($event, $validated['images']);
            ActivityLog::record('Dokumentasi Event', 'update', $event->title);
        });

        return back()->with('success', "Dokumentasi event \"{$event->title}\" berhasil diperbarui.");
    }

    public function destroy(Event $event): RedirectResponse
    {
        $title = $event->title;
        $event->delete();
        ActivityLog::record('Dokumentasi Event', 'delete', $title);

        return back()->with('warning', "Event \"{$title}\" berhasil dihapus.");
    }

    private function validateEvent(Request $request): array
    {
        return $request->validate([
            'title'       => ['required', 'string', 'max:255'],
            'location'    => ['required', 'string', 'max:255'],
            'year'        => ['required', 'string', 'max:64'],
            'description' => ['required', 'string'],
            'images'      => ['required', 'array', 'min:1'],
            'images.*'    => ['string', 'max:500'],
        ]);
    }

    private function syncImages(Event $event, array $images): void
    {
        $event->images()->delete();
        foreach ($images as $idx => $path) {
            $event->images()->create([
                'image_path' => $path,
                'caption'    => $event->title,
                'is_cover'   => $idx === 0,
                'sort_order' => $idx + 1,
            ]);
        }
    }
}
