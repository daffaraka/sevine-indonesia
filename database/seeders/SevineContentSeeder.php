<?php

namespace Database\Seeders;

use App\Models\ActivityLog;
use App\Models\Brand;
use App\Models\Career;
use App\Models\DailyVisitorMetric;
use App\Models\Event;
use App\Models\Faq;
use App\Models\Partner;
use App\Models\Product;
use App\Models\ProductCategory;
use App\Models\Testimonial;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class SevineContentSeeder extends Seeder
{
    public function run(): void
    {
        $brands = $this->seedBrands();
        $categories = $this->seedCategories();
        $this->seedProducts($brands, $categories);
        $this->seedCareers();
        $this->seedEvents();
        $this->seedPartners();
        $this->seedTestimonialsAndFaqs();
        $this->seedTelemetryAndLogs();
    }

    /** @return array<string, Brand> */
    private function seedBrands(): array
    {
        $items = [
            [
                'key'              => 'SEVINE',
                'name'             => 'SEVINE',
                'category'         => 'bag',
                'tagline'          => 'Tas Stylish & Fungsional',
                'description'      => 'Tas stylish dan fungsional untuk mobilitas harian dengan material tahan air dan jahitan bar-tack kuat.',
                'target_market'    => 'Aktivitas kampus, kerja harian, dan gaya kasual modern',
                'highlight_points' => ['Waterproof Fabric', 'Multi-compartment', 'Jahitan Bar-tack Kuat'],
                'badge_color'      => 'bg-doff-navy text-white',
                'logo_path'        => '/assets/brands/logo-sevine-1.webp',
                'shopee_url'       => 'https://shopee.co.id/sevine.id',
                'sort_order'       => 1,
            ],
            [
                'key'              => 'klou',
                'name'             => 'klou',
                'category'         => 'apparel',
                'tagline'          => 'Pakaian Basic & Timeless',
                'description'      => 'Pakaian basic berbahan katun premium breathable dengan siluet timeless dan warna earth tone.',
                'target_market'    => 'Pencinta busana kasual minimalis & santai',
                'highlight_points' => ['Katun Premium Breathable', 'Jahitan Rantai Ekspor', 'Warna Earth Tone'],
                'badge_color'      => 'bg-[#5B6B58] text-white',
                'logo_path'        => '/assets/brands/logo-brand-klou.webp',
                'shopee_url'       => 'https://shopee.co.id/klou.official',
                'sort_order'       => 2,
            ],
            [
                'key'              => 'LALUNA',
                'name'             => 'LALUNA INDONESIA',
                'category'         => 'bag',
                'tagline'          => 'Tas Elegan & Praktis',
                'description'      => 'Koleksi tas wanita elegan berbahan kulit sintetis matte lembut dengan aksen hardware gold redup.',
                'target_market'    => 'Wanita karier, acara semi-formal, dan gaya feminin berkelas',
                'highlight_points' => ['Kulit Sintetis Lembut', 'Hardware Gold Redup', 'Ergonomis Ringan'],
                'badge_color'      => 'bg-[#8F3B4A] text-white',
                'logo_path'        => '/assets/brands/logo-brand-laluna.webp',
                'shopee_url'       => 'https://shopee.co.id/laluna.indonesia',
                'sort_order'       => 3,
            ],
            [
                'key'              => 'ASSAIF',
                'name'             => 'ASSAIF MUSLIM MENSWEAR',
                'category'         => 'muslim-wear',
                'tagline'          => 'Busana Muslim Pria Modern',
                'description'      => 'Busana muslim pria modern regular-fit yang rapi dan adem untuk ibadah harian maupun acara spesial.',
                'target_market'    => 'Pria muslim modern untuk ibadah harian dan perayaan',
                'highlight_points' => ['Material Toyobo Adem', 'Potongan Regular-Fit', 'Kerah Shanghai Presisi'],
                'badge_color'      => 'bg-[#8A5B38] text-white',
                'logo_path'        => '/assets/brands/logo-brand-assaif.webp',
                'shopee_url'       => 'https://shopee.co.id/assaif.official',
                'sort_order'       => 4,
            ],
            [
                'key'              => 'NABIRA',
                'name'             => 'NABIRA',
                'category'         => 'muslim-wear',
                'tagline'          => 'Busana Muslim Wanita Kontemporer',
                'description'      => 'Abaya, gamis, dan tunik muslimah berbahan crinkle airflow ringan dengan bukaan wudhu-friendly.',
                'target_market'    => 'Muslimah modern untuk aktivitas harian hingga perayaan',
                'highlight_points' => ['Crinkle Airflow Ironless', 'Wudhu-Friendly', 'Potongan Flowy'],
                'badge_color'      => 'bg-[#8B6E8C] text-white',
                'logo_path'        => '/assets/brands/logo-brand-nabira.webp',
                'shopee_url'       => 'https://shopee.co.id/nabira.official',
                'sort_order'       => 5,
            ],
        ];

        $map = [];
        foreach ($items as $data) {
            $map[$data['key']] = Brand::updateOrCreate(['key' => $data['key']], $data);
        }
        return $map;
    }

    /** @return array<string, ProductCategory> */
    private function seedCategories(): array
    {
        $items = [
            ['name' => 'Tas Harian (Backpack)', 'description' => 'Tas punggung tahan air dan fungsional untuk kampus & kerja.', 'sort_order' => 1],
            ['name' => 'Tas Harian (Crossbody)', 'description' => 'Sling bag dan messenger compact dengan jahitan bar-tack.', 'sort_order' => 2],
            ['name' => 'Tas Wanita (Satchel)', 'description' => 'Koleksi tas wanita elegan berbahan kulit sintetis matte.', 'sort_order' => 3],
            ['name' => 'Apparel Basic Timeless', 'description' => 'Pakaian basic berbahan katun breathable potongan timeless.', 'sort_order' => 4],
            ['name' => 'Busana Muslim Pria', 'description' => 'Kurta, koko modern, dan busana ibadah pria regular-fit.', 'sort_order' => 5],
            ['name' => 'Busana Muslim Wanita', 'description' => 'Abaya, gamis, dan tunik muslimah wudhu-friendly.', 'sort_order' => 6],
        ];

        $map = [];
        foreach ($items as $data) {
            $map[$data['name']] = ProductCategory::updateOrCreate(
                ['slug' => Str::slug($data['name'])],
                [...$data, 'is_active' => true],
            );
        }
        return $map;
    }

    /**
     * @param array<string, Brand> $brands
     * @param array<string, ProductCategory> $categories
     */
    private function seedProducts(array $brands, array $categories): void
    {
        $items = [
            [
                'sku'         => 'SVN-BAG-091',
                'name'        => 'Nomad Waterproof Roll-Top 28L',
                'brand'       => 'SEVINE',
                'category'    => 'Tas Harian (Backpack)',
                'capacity'    => '1.200 pcs/bln',
                'status'      => 'Produksi Aktif',
                'description' => 'Backpack roll-top berbahan Cordura 1000D dengan kompartemen laptop 16 inci.',
                'swatches'    => [['Navy Doff', '#1B2E4B'], ['Slate Grey', '#475569'], ['Midnight', '#132238']],
                'images'      => ['/assets/brands/logo-sevine-1.webp'],
            ],
            [
                'sku'         => 'KLU-APP-014',
                'name'        => 'Raw Textured Heavy Cotton Overshirt',
                'brand'       => 'klou',
                'category'    => 'Apparel Basic Timeless',
                'capacity'    => '2.500 pcs/bln',
                'status'      => 'Produksi Aktif',
                'description' => 'Overshirt katun bio-wash 24s dengan siluet boxy modern.',
                'swatches'    => [['Broken White', '#F8FAFC'], ['Cool Mist', '#CBD5E1'], ['Navy Doff', '#1B2E4B']],
                'images'      => ['/assets/brands/logo-brand-klou.webp'],
            ],
            [
                'sku'         => 'LLN-BAG-033',
                'name'        => 'Aura Structured Minimalist Satchel',
                'brand'       => 'LALUNA',
                'category'    => 'Tas Wanita (Satchel)',
                'capacity'    => '900 pcs/bln',
                'status'      => 'Review QC',
                'description' => 'Satchel kulit vegan matte dengan hardware gold redup.',
                'swatches'    => [['Wine Rose', '#8F3B4A'], ['Pearl', '#E2E8F0'], ['Warm Sand', '#C5A880']],
                'images'      => ['/assets/brands/logo-brand-laluna.webp'],
            ],
            [
                'sku'         => 'ASF-MSL-008',
                'name'        => 'Signature Shanghai Linen Kurta Top',
                'brand'       => 'ASSAIF',
                'category'    => 'Busana Muslim Pria',
                'capacity'    => '1.500 pcs/bln',
                'status'      => 'Produksi Aktif',
                'description' => 'Kurta kerah shanghai berbahan Toyobo Fodu adem tidak mudah kusut.',
                'swatches'    => [['Teak Brown', '#8A5B38'], ['Charcoal Slate', '#475569'], ['Soft Linen', '#EEF2F6']],
                'images'      => ['/assets/brands/logo-brand-assaif.webp'],
            ],
            [
                'sku'         => 'NBR-MSL-021',
                'name'        => 'Flowy Voile Tiered Abaya Dress',
                'brand'       => 'NABIRA',
                'category'    => 'Busana Muslim Wanita',
                'capacity'    => '800 pcs/bln',
                'status'      => 'Draft Sampling',
                'description' => 'Abaya crinkle airflow ironless dengan bukaan lengan wudhu-friendly.',
                'swatches'    => [['Dusty Plum', '#8B6E8C'], ['Navy Doff', '#1B2E4B'], ['Silver Mist', '#CBD5E1']],
                'images'      => ['/assets/brands/logo-brand-nabira.webp'],
            ],
            [
                'sku'         => 'SVN-BAG-105',
                'name'        => 'Compact Bar-Tack Cordura Sling Pack',
                'brand'       => 'SEVINE',
                'category'    => 'Tas Harian (Crossbody)',
                'capacity'    => '3.000 pcs/bln',
                'status'      => 'Produksi Aktif',
                'description' => 'Sling pack harian ringkas dengan resleting water-repellent.',
                'swatches'    => [['Navy Doff', '#1B2E4B'], ['Terracotta', '#C27B66'], ['Slate Grey', '#475569']],
                'images'      => ['/assets/brands/logo-sevine-2.webp'],
            ],
        ];

        foreach ($items as $data) {
            $product = Product::updateOrCreate(
                ['sku' => $data['sku']],
                [
                    'name'        => $data['name'],
                    'brand_id'    => $brands[$data['brand']]->id,
                    'category_id' => $categories[$data['category']]->id,
                    'capacity'    => $data['capacity'],
                    'status'      => $data['status'],
                    'description' => $data['description'],
                ],
            );

            $product->swatches()->delete();
            foreach ($data['swatches'] as $idx => [$name, $hex]) {
                $product->swatches()->create([
                    'name'       => $name,
                    'hex_code'   => $hex,
                    'sort_order' => $idx + 1,
                ]);
            }

            $product->images()->delete();
            foreach ($data['images'] as $idx => $path) {
                $product->images()->create([
                    'image_path' => $path,
                    'alt_text'   => $data['name'],
                    'is_primary' => $idx === 0,
                    'sort_order' => $idx + 1,
                ]);
            }
        }
    }

    private function seedCareers(): void
    {
        $items = [
            [
                'title'                 => 'Operator Jahit Bar-tack & High Speed',
                'division'              => 'Produksi Manufaktur',
                'location'              => 'Ngawi',
                'employment_type'       => 'Full-time',
                'qualifications_html'   => '<ul><li>Pengalaman minimal <strong>1 tahun</strong> di garment/konveksi tas atau apparel.</li><li>Teliti, disiplin, dan siap bekerja dengan target tim produksi.</li></ul>',
                'responsibilities_html' => '<ul><li>Menjahit komponen tas dan apparel sesuai standar QC Sevine.</li><li>Melakukan perawatan ringan mesin jahit harian.</li></ul>',
                'google_form_url'       => 'https://forms.gle/sevine-karir-produksi',
                'is_active'             => true,
            ],
            [
                'title'                 => 'Fashion & Product Graphic Designer',
                'division'              => 'Kreatif & Branding',
                'location'              => 'Malang',
                'employment_type'       => 'Full-time',
                'qualifications_html'   => '<ul><li>Menguasai <strong>Adobe Illustrator / Figma</strong>.</li><li>Memiliki portofolio lookbook/katalog fashion.</li></ul>',
                'responsibilities_html' => '<ul><li>Merancang materi visual katalog dan kemasan untuk brand SEVINE, klou, dan LALUNA.</li><li>Menyiapkan aset desain kampanye digital.</li></ul>',
                'google_form_url'       => 'https://forms.gle/sevine-karir-desain',
                'is_active'             => true,
            ],
            [
                'title'                 => 'Staff Quality Control & Packaging',
                'division'              => 'Quality Assurance',
                'location'              => 'Ngawi',
                'employment_type'       => 'Full-time',
                'qualifications_html'   => '<ul><li>Teliti memeriksa detail jahitan, kesesuaian pola, serta kelengkapan hangtag.</li></ul>',
                'responsibilities_html' => '<ul><li>Melakukan sortir mutu akhir pada setiap batch produksi sebelum dikirim ke gudang.</li></ul>',
                'google_form_url'       => 'https://forms.gle/sevine-karir-qc',
                'is_active'             => true,
            ],
            [
                'title'                 => 'Social Media & Live Commerce Host',
                'division'              => 'Digital Marketing',
                'location'              => 'Malang',
                'employment_type'       => 'Part-time',
                'qualifications_html'   => '<ul><li>Komunikatif dan terbiasa memandu sesi live <strong>TikTok / Shopee</strong>.</li></ul>',
                'responsibilities_html' => '<ul><li>Membawakan sesi live commerce harian untuk katalog brand Sevine.</li></ul>',
                'google_form_url'       => 'https://forms.gle/sevine-karir-live',
                'is_active'             => false,
            ],
        ];

        foreach ($items as $data) {
            Career::updateOrCreate(['slug' => Str::slug($data['title'])], $data);
        }
    }

    private function seedEvents(): void
    {
        $items = [
            ['title' => 'Hello Market Solo #37', 'location' => 'Solo Paragon Mall', 'year_label' => '2025', 'description' => 'Partisipasi pameran ritel produk lokal dan showcase koleksi SEVINE & LALUNA.', 'image' => '/assets/events/event-hello-market-solo.webp'],
            ['title' => 'JakCloth Year End Sale', 'location' => 'Jakarta', 'year_label' => '2024', 'description' => 'Pameran brand lokal nasional menampilkan lini apparel klou dan tas harian SEVINE.', 'image' => '/assets/events/event-jakcloth.webp'],
            ['title' => 'INACRAFT Exhibition', 'location' => 'JCC Senayan, Jakarta', 'year_label' => '2024', 'description' => 'Showcase manufaktur tas dan tekstil lokal kepada buyer B2B dan korporasi.', 'image' => '/assets/events/event-inacraft.webp'],
        ];

        foreach ($items as $idx => $data) {
            $event = Event::updateOrCreate(
                ['slug' => Str::slug($data['title'])],
                [
                    'title'        => $data['title'],
                    'location'     => $data['location'],
                    'year_label'   => $data['year_label'],
                    'description'  => $data['description'],
                    'is_published' => true,
                    'sort_order'   => $idx + 1,
                ],
            );
            $event->images()->delete();
            $event->images()->create([
                'image_path' => $data['image'],
                'caption'    => $data['title'],
                'is_cover'   => true,
                'sort_order' => 1,
            ]);
        }
    }

    private function seedPartners(): void
    {
        $items = [
            ['name' => 'Bank BRI', 'category' => 'perbankan', 'category_label' => 'Perbankan & Keuangan', 'logo_path' => '/assets/partners/logo-bri.webp', 'role_scope' => 'Pengadaan Tas & Merchandise Korporat'],
            ['name' => 'Universitas Brawijaya', 'category' => 'pendidikan', 'category_label' => 'Institusi Pendidikan', 'logo_path' => '/assets/partners/logo-ub.webp', 'role_scope' => 'Custom Tas Seminar & Apparel Fakultas'],
            ['name' => 'Telkomsel', 'category' => 'korporasi', 'category_label' => 'Korporasi & Telekomunikasi', 'logo_path' => '/assets/partners/logo-telkomsel.webp', 'role_scope' => 'Merchandise Event & Starter Kit Tim'],
            ['name' => 'Pemerintah Kab. Ngawi', 'category' => 'pemerintahan', 'category_label' => 'Instansi Pemerintahan', 'logo_path' => '/assets/partners/logo-ngawi.webp', 'role_scope' => 'Produksi Seragam & Tas Kegiatan Resmi'],
        ];

        foreach ($items as $idx => $data) {
            Partner::updateOrCreate(
                ['name' => $data['name']],
                [...$data, 'status' => 'Mitra Aktif', 'sort_order' => $idx + 1],
            );
        }
    }

    private function seedTestimonialsAndFaqs(): void
    {
        Testimonial::updateOrCreate(
            ['author' => 'Rina Kartika'],
            [
                'review_date_label' => 'Okt 2026',
                'rating'            => 5,
                'content'           => 'Jahitan tas rapi, bahan waterproof benar-benar tahan gerimis, pengiriman dari pabrik Ngawi juga cepat.',
                'highlight_aspect'  => 'Kualitas Jahitan & Bahan',
                'platform'          => 'Shopee',
                'is_active'         => true,
            ],
        );

        $faqs = [
            ['question' => 'Berapa minimal pemesanan (MOQ) untuk custom maklon korporasi?', 'answer' => 'Minimal pemesanan custom order mulai dari 50 pcs per model dengan pilihan sablon atau bordir logo instansi.', 'category' => 'maklon'],
            ['question' => 'Bagaimana cara bergabung menjadi reseller resmi brand Sevine?', 'answer' => 'Hubungi hotline reseller kami melalui formulir kemitraan untuk mendapatkan daftar harga grosir dan katalog terbaru.', 'category' => 'reseller'],
        ];
        foreach ($faqs as $idx => $data) {
            Faq::updateOrCreate(['question' => $data['question']], [...$data, 'sort_order' => $idx + 1, 'is_active' => true]);
        }
    }

    private function seedTelemetryAndLogs(): void
    {
        $pattern = [
            [312, 824, 215, 18, 64, 9],
            [348, 912, 244, 21, 72, 11],
            [295, 780, 198, 15, 58, 7],
            [410, 1090, 302, 27, 89, 14],
            [438, 1185, 329, 31, 96, 16],
            [382, 1010, 274, 24, 83, 12],
            [465, 1260, 356, 34, 108, 19],
            [428, 1140, 318, 28, 92, 13],
            [492, 1345, 384, 39, 116, 21],
            [518, 1420, 412, 42, 124, 18],
            [476, 1290, 365, 35, 109, 15],
            [544, 1510, 446, 46, 138, 22],
            [589, 1640, 492, 51, 152, 24],
            [624, 1735, 528, 56, 167, 27],
        ];

        $total = count($pattern);
        foreach ($pattern as $index => [$uv, $pv, $cat, $wa, $shp, $car]) {
            $date = now()->subDays($total - 1 - $index)->toDateString();
            DailyVisitorMetric::updateOrCreate(
                ['metric_date' => $date],
                [
                    'unique_visitors'     => $uv,
                    'page_views'          => $pv,
                    'catalog_views'       => $cat,
                    'whatsapp_b2b_clicks' => $wa,
                    'shopee_store_clicks' => $shp,
                    'career_form_clicks'  => $car,
                    'device_breakdown'    => ['Mobile' => 68, 'Desktop' => 26, 'Tablet' => 6],
                    'referrer_breakdown'  => ['Direct' => 38, 'Instagram' => 29, 'Google' => 19, 'TikTok' => 14],
                ],
            );
        }

        if (ActivityLog::count() === 0) {
            ActivityLog::record('Monitoring & Trafik', 'health_check', 'Inisialisasi data awal database Sevine');
            ActivityLog::record('Katalog Produk', 'create', '6 SKU katalog awal 5 brand ekosistem');
        }
    }
}
