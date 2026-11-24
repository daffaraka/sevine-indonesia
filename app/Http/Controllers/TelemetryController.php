<?php

namespace App\Http\Controllers;

use App\Models\Career;
use App\Models\DailyVisitorMetric;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class TelemetryController extends Controller
{
    public function trackClick(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'type'     => ['required', Rule::in(['whatsapp', 'shopee', 'career'])],
            'careerId' => ['nullable', 'integer', 'exists:careers,id'],
        ]);

        $column = match ($validated['type']) {
            'whatsapp' => 'whatsapp_b2b_clicks',
            'shopee'   => 'shopee_store_clicks',
            'career'   => 'career_form_clicks',
        };

        DailyVisitorMetric::upsert(
            [
                'metric_date' => now()->toDateString(),
                $column       => 1,
                'created_at'  => now(),
                'updated_at'  => now(),
            ],
            ['metric_date'],
            [
                $column      => DB::raw("{$column} + 1"),
                'updated_at' => now(),
            ],
        );

        if ($validated['type'] === 'career' && ! empty($validated['careerId'])) {
            Career::whereKey($validated['careerId'])->increment('apply_clicks_count');
        }

        return response()->json(['recorded' => true]);
    }
}
