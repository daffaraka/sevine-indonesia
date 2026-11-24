<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use App\Models\Career;
use App\Models\DailyVisitorMetric;
use App\Models\Event;
use App\Models\Faq;
use App\Models\Partner;
use App\Models\PartnershipInquiry;
use App\Models\Product;
use App\Models\Testimonial;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class PublicProfileController extends Controller
{
    public function home(): Response
    {
        return Inertia::render('Public/ClassicProfile', [
            'brands'       => Brand::where('is_active', true)->orderBy('sort_order')->get(),
            'events'       => Event::with('images')->where('is_published', true)->orderBy('sort_order')->get(),
            'partners'     => Partner::where('status', 'Mitra Aktif')->orderBy('sort_order')->get(),
            'careers'      => Career::where('is_active', true)->latest('updated_at')->get(),
            'testimonials' => Testimonial::where('is_active', true)->get(),
            'faqs'         => Faq::where('is_active', true)->orderBy('sort_order')->get(),
        ]);
    }

    public function catalog(): Response
    {
        return Inertia::render('Public/ProductCatalog', [
            'products' => Product::with(['brand', 'category', 'swatches', 'images'])
                ->where('status', 'Produksi Aktif')
                ->latest('id')
                ->get(),
            'brands' => Brand::where('is_active', true)->orderBy('sort_order')->get(),
        ]);
    }

    public function storeInquiry(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'fullName'           => ['required', 'string', 'max:120'],
            'companyOrStoreName' => ['nullable', 'string', 'max:160'],
            'whatsappNumber'     => ['required', 'string', 'max:32'],
            'partnershipType'    => ['required', Rule::in(['reseller', 'corporate_b2b', 'custom_order', 'distributor'])],
            'preferredBrand'     => ['nullable', 'string', 'max:64'],
            'messageNotes'       => ['nullable', 'string', 'max:2000'],
        ]);

        PartnershipInquiry::create([
            'full_name'             => $validated['fullName'],
            'company_or_store_name' => $validated['companyOrStoreName'] ?? null,
            'whatsapp_number'       => $validated['whatsappNumber'],
            'partnership_type'      => $validated['partnershipType'],
            'preferred_brand'       => $validated['preferredBrand'] ?? 'Semua Brand',
            'message_notes'         => $validated['messageNotes'] ?? null,
            'status'                => 'Baru',
        ]);

        DailyVisitorMetric::upsert(
            [
                'metric_date'         => now()->toDateString(),
                'whatsapp_b2b_clicks' => 1,
                'created_at'          => now(),
                'updated_at'          => now(),
            ],
            ['metric_date'],
            [
                'whatsapp_b2b_clicks' => DB::raw('whatsapp_b2b_clicks + 1'),
                'updated_at'          => now(),
            ],
        );

        return back()->with('success', 'Permohonan kemitraan Anda telah tercatat.');
    }
}
