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
            ['slug' => 'tas-backpack', 'name' => 'Tas Ransel & Laptop', 'description' => 'Tas punggung tahan air dan fungsional untuk kampus & kerja.', 'sort_order' => 1],
            ['slug' => 'tas-sling', 'name' => 'Tas Slempang & Pouch', 'description' => 'Sling bag, tote, dan pouch compact dengan jahitan bar-tack.', 'sort_order' => 2],
            ['slug' => 'tas-wanita', 'name' => 'Koleksi Tas Wanita', 'description' => 'Koleksi tas wanita elegan berbahan kulit sintetis matte.', 'sort_order' => 3],
            ['slug' => 'apparel', 'name' => 'Pakaian Basic & Timeless', 'description' => 'Pakaian basic berbahan katun breathable potongan timeless.', 'sort_order' => 4],
            ['slug' => 'muslim-pria', 'name' => 'Busana Muslim Pria', 'description' => 'Kurta, koko modern, dan busana ibadah pria regular-fit.', 'sort_order' => 5],
            ['slug' => 'muslim-wanita', 'name' => 'Busana Muslim Perempuan', 'description' => 'Abaya, gamis, voal scarf, dan tunik muslimah wudhu-friendly.', 'sort_order' => 6],
        ];

        $map = [];
        foreach ($items as $data) {
            $existing = ProductCategory::withTrashed()
                ->where('slug', $data['slug'])
                ->orWhere('name', $data['name'])
                ->first();

            if ($existing) {
                $existing->fill([...$data, 'is_active' => true, 'deleted_at' => null])->save();
                $map[$data['slug']] = $existing;
            } else {
                $map[$data['slug']] = ProductCategory::create([...$data, 'is_active' => true]);
            }
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
                'sku'             => 'SVN-BAG-091',
                'name'            => 'Nomad Waterproof Roll-Top Backpack 28L',
                'brand'           => 'SEVINE',
                'category'        => 'tas-backpack',
                'capacity'        => '1.850+ terjual',
                'status'          => 'Produksi Aktif',
                'shipping_origin' => 'ngawi',
                'description'     => 'Tas ransel kompartemen ganda dengan material tahan air (waterproof nylon), slot laptop busa peredam getaran hingga 15.6 inch, serta jahitan bar-tack bertulang untuk beban berat.',
                'features'        => ['Waterproof Fabric Nylon', 'Slot Laptop Busa 15.6"', 'Jahitan Bar-tack Presisi', 'Ergonomic Air-mesh Back'],
                'swatches'        => [['Doff Navy', '#1B2E4B'], ['Charcoal Black', '#1E293B'], ['Olive Green', '#4A5B4C']],
                'images'          => [
                    'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80',
                    'https://images.unsplash.com/photo-1546938576-6e6a64f317cc?w=800&auto=format&fit=crop&q=80',
                ],
            ],
            [
                'sku'             => 'SVN-BAG-105',
                'name'            => 'Compact Bar-Tack Cordura Crossbody Sling Pack',
                'brand'           => 'SEVINE',
                'category'        => 'tas-sling',
                'capacity'        => '3.120+ terjual',
                'status'          => 'Produksi Aktif',
                'shipping_origin' => 'ngawi',
                'description'     => 'Sling bag ringkas multifungsi berbahan Cordura 1000D water-repellent dengan resleting YKK reverse zipper dan key-holder interior.',
                'features'        => ['Cordura 1000D Awet', 'Resleting YKK Reverse', 'Akses Cepat Smartphone', 'Strap Lebar Empuk'],
                'swatches'        => [['Matte Black', '#1F2937'], ['Doff Terracotta', '#C27B66'], ['Slate Grey', '#64748B']],
                'images'          => [
                    'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&auto=format&fit=crop&q=80',
                    'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800&auto=format&fit=crop&q=80',
                ],
            ],
            [
                'sku'             => 'KLU-APP-014',
                'name'            => 'Raw Textured Heavy Cotton Overshirt Canvas',
                'brand'           => 'klou',
                'category'        => 'apparel',
                'capacity'        => '940+ terjual',
                'status'          => 'Produksi Aktif',
                'shipping_origin' => 'jakarta',
                'description'     => 'Kemeja luar berpotongan santai dengan tekstur kain katun tebal bernapas, kantong dada ganda, dan kancing matte tortoise.',
                'features'        => ['100% Heavyweight Cotton', 'Jahitan Rantai Standar Ekspor', 'Warna Earth Tone Muted', 'Siluet Boxy Relaxed'],
                'swatches'        => [['Warm Ecru', '#ECE7DE'], ['Muted Khaki', '#A39985'], ['Washed Navy', '#263852']],
                'images'          => [
                    'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&auto=format&fit=crop&q=80',
                    'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80',
                ],
            ],
            [
                'sku'             => 'LLN-BAG-033',
                'name'            => 'Aura Structured Minimalist Satchel Gold Accent',
                'brand'           => 'LALUNA',
                'category'        => 'tas-wanita',
                'capacity'        => '1.420+ terjual',
                'status'          => 'Produksi Aktif',
                'shipping_origin' => 'ngawi',
                'description'     => 'Tas tangan terstruktur dari bahan kulit sintetis microfiber halus dengan aksen kunci putar emas doff dan strap bahu ergonomis yang dapat dilepas.',
                'features'        => ['Premium Microfiber Leather', 'Hardware Gold Doff Anti-karat', 'Double Interior Pocket', 'Strap Tambahan Adjustable'],
                'swatches'        => [['Burgundy Wine', '#8F3B4A'], ['Cream Biscuit', '#E8DEC8'], ['Classic Black', '#1C1917']],
                'images'          => [
                    'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800&auto=format&fit=crop&q=80',
                    'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&auto=format&fit=crop&q=80',
                ],
            ],
            [
                'sku'             => 'ASF-MSL-008',
                'name'            => 'Signature Shanghai Linen Kurta Top Regular Fit',
                'brand'           => 'ASSAIF',
                'category'        => 'muslim-pria',
                'capacity'        => '2.280+ terjual',
                'status'          => 'Produksi Aktif',
                'shipping_origin' => 'ngawi',
                'description'     => 'Kemeja koko kurta pria modern dengan kerah Shanghai tegak presisi, saku paspol rapi di dada kiri, serta bahan katun linen yang sejuk untuk ibadah maupun aktivitas formal.',
                'features'        => ['Katun Toyobo Linen Blend', 'Kerah Shanghai Presisi', 'Placket Kancing Tersembunyi', 'Potongan Modern Regular Fit'],
                'swatches'        => [['Tobacco Brown', '#8A5B38'], ['Silver Mist', '#D1D5DB'], ['Deep Navy', '#1B2E4B']],
                'images'          => [
                    'https://images.unsplash.com/photo-1622445262464-84b14e4b7de7?w=800&auto=format&fit=crop&q=80',
                    'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&auto=format&fit=crop&q=80',
                ],
            ],
            [
                'sku'             => 'NBR-MSL-021',
                'name'            => 'Flowy Voile Tiered Abaya Dress Wudhu Friendly',
                'brand'           => 'NABIRA',
                'category'        => 'muslim-wanita',
                'capacity'        => '1.190+ terjual',
                'status'          => 'Produksi Aktif',
                'shipping_origin' => 'ngawi',
                'description'     => 'Gamis abaya bertingkat dengan detail lipit anggun, siluet jatuh flowy yang sejuk, dan ritsleting tersembunyi pada lengan yang wudhu-friendly.',
                'features'        => ['Bahan Crinkle Voile Lembut', 'Lengan Resleting Wudhu Friendly', 'Kantong Kanan Dalam', 'Desain Anggun Tidak Menerawang'],
                'swatches'        => [['Dusty Lilac', '#8B6E8C'], ['Sage Olive', '#657362'], ['Black Onyx', '#18181B']],
                'images'          => [
                    'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=800&auto=format&fit=crop&q=80',
                    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop&q=80',
                ],
            ],
            [
                'sku'             => 'SVN-BAG-112',
                'name'            => 'Sevine Commuter Daily Laptop Sleeve 14-15.6"',
                'brand'           => 'SEVINE',
                'category'        => 'tas-backpack',
                'capacity'        => '780+ terjual',
                'status'          => 'Produksi Aktif',
                'shipping_origin' => 'solo',
                'description'     => 'Tas pelindung laptop dengan padding tebal memory foam, lapisan beludru lembut anti-gores, dan saku charger eksternal beritsleting.',
                'features'        => ['Busa Memory Foam Tebal', 'Inner Beludru Halus', 'Saku Tambahan Mouse & Charger', 'Pegangan Lipat Rapi'],
                'swatches'        => [['Navy Graphite', '#1B2E4B'], ['Charcoal Grey', '#374151']],
                'images'          => ['https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80'],
            ],
            [
                'sku'             => 'KLU-APP-009',
                'name'            => 'klou Heavy Cotton Boxy Pocket T-Shirt 24s',
                'brand'           => 'klou',
                'category'        => 'apparel',
                'capacity'        => '2.450+ terjual',
                'status'          => 'Produksi Aktif',
                'shipping_origin' => 'ngawi',
                'description'     => 'Kaos berpotongan boxy dengan kantong dada minimalis, rib leher tebal anti-melar, dan bahan katun combed 24s gramasi tinggi.',
                'features'        => ['Katun Combed 24s Preshrunk', 'Rib Leher Tebal 2.5cm', 'Saku Dada Minimalis', 'Pewarna Ramah Lingkungan'],
                'swatches'        => [['Muted White', '#F9FAFB'], ['Olive Heather', '#5B6B58'], ['Terracotta Matte', '#9E4738']],
                'images'          => ['https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80'],
            ],
            [
                'sku'             => 'LLN-BAG-041',
                'name'            => 'Laluna Crescent Baguette Smooth Vegan Shoulder Bag',
                'brand'           => 'LALUNA',
                'category'        => 'tas-wanita',
                'capacity'        => '1.080+ terjual',
                'status'          => 'Produksi Aktif',
                'shipping_origin' => 'ngawi',
                'description'     => 'Tas bahu bentuk sabit dengan sentuhan feminin modern, tali bahu yang nyaman, dan bahan vegan leather tahan percikan air.',
                'features'        => ['Siluet Crescent Ergonomis', 'Bahan Vegan Leather Matte', 'Resleting Halus Berkualitas', 'Kapasitas Muat Dompet & HP'],
                'swatches'        => [['Butter Cream', '#F3E8D6'], ['Dusty Rose', '#BD8B97'], ['Espresso Brown', '#4B3621']],
                'images'          => ['https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&auto=format&fit=crop&q=80'],
            ],
            [
                'sku'             => 'ASF-MSL-015',
                'name'            => 'Assaif Kemeja Koko Modern Slim Fit Toyobo Fodu',
                'brand'           => 'ASSAIF',
                'category'        => 'muslim-pria',
                'capacity'        => '1.650+ terjual',
                'status'          => 'Produksi Aktif',
                'shipping_origin' => 'jakarta',
                'description'     => 'Kemeja koko katun Toyobo Fodu import dengan serat rapat halus, kilau doff alami, serta kancing tersembunyi yang membuat tampilan rapi dan elegan.',
                'features'        => ['Katun Toyobo Fodu Asli', 'Tidak Mudah Kusut', 'Saku Bobok Presisi', 'Cutting Slim-Fit Nyaman'],
                'swatches'        => [['Sage Green', '#7D8C7C'], ['Pure White', '#FFFFFF'], ['Soft Mocca', '#A89279']],
                'images'          => ['https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&auto=format&fit=crop&q=80'],
            ],
            [
                'sku'             => 'NBR-MSL-030',
                'name'            => 'Nabira Signature Voal Scarf Ultrafine Laser Cut',
                'brand'           => 'NABIRA',
                'category'        => 'muslim-wanita',
                'capacity'        => '4.200+ terjual',
                'status'          => 'Produksi Aktif',
                'shipping_origin' => 'ngawi',
                'description'     => 'Hijab segi empat berbahan voal ultrafine grade A yang tegak di dahi, tidak berdengung di telinga, dan berhias tepian laser cut presisi motif eksklusif.',
                'features'        => ['Voal Ultrafine Grade A', 'Tegak Paripurna di Dahi', 'Tepian Laser Cut Eksklusif', 'Ukuran Lebar 115 x 115 cm'],
                'swatches'        => [['Mauve Shadow', '#9B818F'], ['Almond Beige', '#D2BBA0'], ['Dark Slate', '#334155']],
                'images'          => ['https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&auto=format&fit=crop&q=80'],
            ],
            [
                'sku'             => 'SVN-BAG-120',
                'name'            => 'Sevine Heavy Duty Canvas Daily Tote with Tumbler Slot',
                'brand'           => 'SEVINE',
                'category'        => 'tas-sling',
                'capacity'        => '890+ terjual',
                'status'          => 'Produksi Aktif',
                'shipping_origin' => 'ngawi',
                'description'     => 'Tote bag kanvas 14oz tebal dengan resleting utama, saku dalam terorganisir untuk tumbler 1L dan payung lipat, serta strap jinjing ganda.',
                'features'        => ['Kanvas Tebal 14oz Awet', 'Resleting Penutup Utama', 'Slot Khusus Tumbler & Payung', 'Muat Dokumen A4 & Laptop 14"'],
                'swatches'        => [['Raw Natural Canvas', '#EAE5D9'], ['Navy Blue', '#1B2E4B'], ['Forest Olive', '#485747']],
                'images'          => ['https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80'],
            ],
            [
                'sku'             => 'SVN-BAG-135',
                'name'            => 'Sevine Urban Commuter Waterproof Travel Duffel 35L',
                'brand'           => 'SEVINE',
                'category'        => 'tas-backpack',
                'capacity'        => '920+ terjual',
                'status'          => 'Produksi Aktif',
                'shipping_origin' => 'ngawi',
                'description'     => 'Tas travel duffel berkapasitas 35 liter dengan kompartemen sepatu terpisah tahan bau, strap selempang empuk, dan bahan nilon balistik water-repellent.',
                'features'        => ['Nilon Balistik Waterproof', 'Kompartemen Sepatu Khusus', 'Slot Koper Trolley Sleeve', 'Kapasitas Lega 3-4 Hari'],
                'swatches'        => [['Matte Stealth Black', '#111827'], ['Deep Sea Navy', '#1E293B']],
                'images'          => ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80'],
            ],
            [
                'sku'             => 'KLU-APP-022',
                'name'            => 'klou Heavy French Terry Minimalist Crewneck Sweatshirt',
                'brand'           => 'klou',
                'category'        => 'apparel',
                'capacity'        => '1.350+ terjual',
                'status'          => 'Produksi Aktif',
                'shipping_origin' => 'jakarta',
                'description'     => 'Sweatshirt berbahan French Terry katun combed 330gsm yang lembut, menyerap keringat tanpa panas, dengan rib manset bertulang ganda.',
                'features'        => ['100% Cotton French Terry 330gsm', 'Rib Double Stitching', 'Warna Earth Tone Doff', 'Kenyamanan Seharian'],
                'swatches'        => [['Oatmeal Heather', '#DCD6CD'], ['Sage Moss', '#5B6B58'], ['Charcoal Black', '#262626']],
                'images'          => ['https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&auto=format&fit=crop&q=80'],
            ],
            [
                'sku'             => 'LLN-BAG-052',
                'name'            => 'Laluna Pleated Cloud Soft Vegan Leather Clutch',
                'brand'           => 'LALUNA',
                'category'        => 'tas-wanita',
                'capacity'        => '810+ terjual',
                'status'          => 'Produksi Aktif',
                'shipping_origin' => 'ngawi',
                'description'     => 'Tas genggam dan selempang dengan detail lipit awan empuk, bukaan magnetik tersembunyi yang kokoh, dan rantai tipis emas redup.',
                'features'        => ['Sentuhan Awan Super Empuk', 'Kunci Magnet Snap Presisi', 'Tali Rantai Emas Ringan', 'Elegan untuk Pesta & Kasual'],
                'swatches'        => [['Ivory Pearl', '#F9F8F6'], ['Soft Latte', '#CBB49C'], ['Wine Plum', '#58242A']],
                'images'          => ['https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800&auto=format&fit=crop&q=80'],
            ],
            [
                'sku'             => 'ASF-MSL-025',
                'name'            => 'Assaif Kemeja Koko Lengan Panjang Toyobo Embroidery',
                'brand'           => 'ASSAIF',
                'category'        => 'muslim-pria',
                'capacity'        => '1.520+ terjual',
                'status'          => 'Produksi Aktif',
                'shipping_origin' => 'solo',
                'description'     => 'Kemeja koko lengan panjang dengan bordir minimalis monokrom di bagian dada kanan, kancing tertutup, dan material katun toyobo deluxe yang adem.',
                'features'        => ['Katun Toyobo Deluxe Adem', 'Aksen Bordir Minimalis Rapi', 'Manset Kancing Wudhu-friendly', 'Jahitan Rapi Pabrik Mandiri'],
                'swatches'        => [['Pure Snow', '#FFFFFF'], ['Slate Teal', '#3E5C59'], ['Charcoal Navy', '#1C2938']],
                'images'          => ['https://images.unsplash.com/photo-1622445262464-84b14e4b7de7?w=800&auto=format&fit=crop&q=80'],
            ],
            [
                'sku'             => 'NBR-MSL-042',
                'name'            => 'Nabira Pleated Tiered Midi Crinkle Dress Hijab Friendly',
                'brand'           => 'NABIRA',
                'category'        => 'muslim-wanita',
                'capacity'        => '970+ terjual',
                'status'          => 'Produksi Aktif',
                'shipping_origin' => 'ngawi',
                'description'     => 'Midi dress bertingkat berbahan crinkle airflow premium yang tidak perlu disetrika, sejuk, dan memiliki aksen pita pinggang yang dapat diatur.',
                'features'        => ['Crinkle Airflow Ironless', 'Aksen Kerut Bertingkat Cantik', 'Busui Friendly Kancing Depan', 'Lengan Karet Elastis Lembut'],
                'swatches'        => [['Terracotta Blush', '#C27B66'], ['Olive Sage', '#5F6F5E'], ['Midnight Navy', '#162235']],
                'images'          => ['https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=800&auto=format&fit=crop&q=80'],
            ],
            [
                'sku'             => 'SVN-ACC-012',
                'name'            => 'Sevine Minimalist Lanyard ID Card & Coin Wallet Cordura',
                'brand'           => 'SEVINE',
                'category'        => 'tas-sling',
                'capacity'        => '4.600+ terjual',
                'status'          => 'Produksi Aktif',
                'shipping_origin' => 'ngawi',
                'description'     => 'Dompet kartu dan koin gantung leher berbahan Cordura 1000D dengan jendela mika bening untuk kartu akses ID, serta tali lanyard paracord kuat.',
                'features'        => ['Slot Mika Bening ID Card', 'Kantong Koin Ritsleting YKK', 'Lanyard Paracord Halus', 'Kapasitas 6 Slot Kartu'],
                'swatches'        => [['All Black', '#18181B'], ['Army Olive', '#44513E'], ['Doff Terracotta', '#C27B66']],
                'images'          => ['https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&auto=format&fit=crop&q=80'],
            ],
        ];

        foreach ($items as $data) {
            $product = Product::updateOrCreate(
                ['sku' => $data['sku']],
                [
                    'name'            => $data['name'],
                    'brand_id'        => $brands[$data['brand']]->id,
                    'category_id'     => $categories[$data['category']]->id,
                    'capacity'        => $data['capacity'],
                    'status'          => $data['status'],
                    'description'     => $data['description'],
                    'features'        => $data['features'],
                    'shipping_origin' => $data['shipping_origin'],
                    'is_b2b_ready'    => true,
                    'shopee_url'      => 'https://shopee.co.id/sevine.id',
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
        // Hapus placeholder lama yang sempat ter-seed sebelumnya agar tidak duplikat
        Event::whereIn('slug', [
            'hello-market-solo-37',
            'jakcloth-year-end-sale',
            'inacraft-exhibition',
        ])->forceDelete();

        $items = [
            [
                'slug'        => 'event-hms-35',
                'title'       => 'HELLO MARKET SOLO #35',
                'location'    => 'Solo Paragon Mall, Surakarta',
                'year_label'  => 'Official Exhibitor',
                'description' => 'Partisipasi booth eksklusif Sevine menampilkan rilisan tas terbaru dengan antusiasme ribuan pengunjung lokal.',
                'images'      => [
                    'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=80',
                    'https://images.unsplash.com/photo-1556740758-90de374c12ad?w=800&auto=format&fit=crop&q=80',
                    'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&auto=format&fit=crop&q=80',
                ],
            ],
            [
                'slug'        => 'event-project-x',
                'title'       => 'PROJECT X MARKET',
                'location'    => 'Atrium Exhibition Center',
                'year_label'  => 'Featured Creative Brand',
                'description' => 'Eksplorasi aktivasi pop-up store interaktif dan instalasi visual estetis menjangkau audiens muda kreatif.',
                'images'      => [
                    'https://images.unsplash.com/photo-1472653431158-6364773b2a56?w=800&auto=format&fit=crop&q=80',
                    'https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?w=800&auto=format&fit=crop&q=80',
                    'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800&auto=format&fit=crop&q=80',
                ],
            ],
            [
                'slug'        => 'event-hms-36',
                'title'       => 'HELLO MARKET SOLO #36',
                'location'    => 'Solo Square Convention',
                'year_label'  => 'Prime Fashion Booth',
                'description' => 'Kolaborasi peluncuran koleksi spesial multi-brand Sevine bersama rekanan komunitas lokal.',
                'images'      => [
                    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80',
                    'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&auto=format&fit=crop&q=80',
                    'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&auto=format&fit=crop&q=80',
                ],
            ],
            [
                'slug'        => 'event-surabaya-creative-market',
                'title'       => 'SURABAYA CREATIVE MARKET',
                'location'    => 'Tunjungan Plaza Convention, Surabaya',
                'year_label'  => 'Pop-Up Showcase 2025',
                'description' => 'Pameran kolaboratif lintas brand menampilkan tas harian SEVINE, pakaian basic klou, dan koleksi muslimah NABIRA.',
                'images'      => [
                    'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&auto=format&fit=crop&q=80',
                    'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&auto=format&fit=crop&q=80',
                    'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800&auto=format&fit=crop&q=80',
                ],
            ],
            [
                'slug'        => 'event-bandung-popup-exhibition',
                'title'       => 'BANDUNG FASHION & CRAFT EXPO',
                'location'    => 'Trans Studio Mall Atrium, Bandung',
                'year_label'  => 'B2B & Retail Booth',
                'description' => 'Showcase langsung material tekstil waterproof, detail jahitan bar-tack, serta konsultasi kemitraan reseller dan korporasi.',
                'images'      => [
                    'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&auto=format&fit=crop&q=80',
                    'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&auto=format&fit=crop&q=80',
                    'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&auto=format&fit=crop&q=80',
                ],
            ],
        ];

        foreach ($items as $idx => $data) {
            $event = Event::updateOrCreate(
                ['slug' => $data['slug']],
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
            foreach ($data['images'] as $imgIdx => $imagePath) {
                $event->images()->create([
                    'image_path' => $imagePath,
                    'caption'    => $data['title'],
                    'is_cover'   => $imgIdx === 0,
                    'sort_order' => $imgIdx + 1,
                ]);
            }
        }
    }

    private function seedPartners(): void
    {
        // Hapus placeholder lama yang sempat menggantikan 17 brand partner FIXED
        Partner::whereIn('name', [
            'Bank BRI',
            'Universitas Brawijaya',
            'Telkomsel',
            'Pemerintah Kab. Ngawi',
        ])->forceDelete();

        $items = [
            // Beauty & Skincare
            ['name' => 'Wardah Cosmetics', 'category' => 'beauty', 'category_label' => 'Beauty & Skincare', 'logo_path' => '/assets/brands/logo-wardah.webp', 'role_scope' => 'Leading Cosmetics GWP & Bags'],
            ['name' => 'Emina Beauty', 'category' => 'beauty', 'category_label' => 'Beauty & Skincare', 'logo_path' => '/assets/brands/logo-emina.webp', 'role_scope' => 'Youth Skincare Promotional Bags'],
            ['name' => 'Light+ by Wardah', 'category' => 'beauty', 'category_label' => 'Beauty & Skincare', 'logo_path' => '/assets/brands/logo-light-plus-wardah.webp', 'role_scope' => 'Skincare Activation & Exclusive Pouch'],
            ['name' => 'PT Paragon Technology & Innovation', 'category' => 'beauty', 'category_label' => 'Beauty & Skincare', 'logo_path' => '/assets/brands/logo-paragon.webp', 'role_scope' => 'National Beauty FMCG Corporate Partner'],
            // Hospitality & F&B
            ['name' => 'Tomoro Coffee', 'category' => 'hospitality', 'category_label' => 'Hospitality & F&B', 'logo_path' => '/assets/brands/logo-tomoro-coffee.webp', 'role_scope' => 'National Coffee Chain Merchandise'],
            ['name' => 'Moon Cha', 'category' => 'hospitality', 'category_label' => 'Hospitality & F&B', 'logo_path' => '/assets/brands/logo-mooncha.webp', 'role_scope' => 'Artisanal Tea Lifestyle Collaboration'],
            ['name' => 'Hella Coffee', 'category' => 'hospitality', 'category_label' => 'Hospitality & F&B', 'logo_path' => '/assets/brands/logo-hella-coffee.webp', 'role_scope' => 'Specialty Coffee & Roastery Merchandise'],
            ['name' => 'Pleasure Please', 'category' => 'hospitality', 'category_label' => 'Hospitality & F&B', 'logo_path' => '/assets/brands/logo-pleasure-please.webp', 'role_scope' => 'Dining Space & Creative Merchandise'],
            // Retail & Company
            ['name' => 'Yogya Heritage', 'category' => 'retail', 'category_label' => 'Retail & Korporasi', 'logo_path' => '/assets/brands/logo-yogya-heritage.webp', 'role_scope' => 'Retail & Lifestyle Cultural Concept'],
            ['name' => 'MoNic Fashion', 'category' => 'retail', 'category_label' => 'Retail & Korporasi', 'logo_path' => '/assets/brands/logo-monic.webp', 'role_scope' => 'Fashion Apparel & Boutique Network'],
            ['name' => 'Callysta', 'category' => 'retail', 'category_label' => 'Retail & Korporasi', 'logo_path' => '/assets/brands/logo-callysta.webp', 'role_scope' => 'Exclusive Apparel & Lifestyle Partner'],
            // Creative Community & Events
            ['name' => 'Hello Market Solo', 'category' => 'community', 'category_label' => 'Komunitas & Event', 'logo_path' => '/assets/brands/logo-hello-market-solo.webp', 'role_scope' => 'Official Creative Market Partner'],
            ['name' => 'The Buddies in class', 'category' => 'community', 'category_label' => 'Komunitas & Event', 'logo_path' => '/assets/brands/logo-the-buddies-in-class.webp', 'role_scope' => 'Youth Community Collaborative Apparel'],
            ['name' => 'Mula Mula Florist', 'category' => 'community', 'category_label' => 'Komunitas & Event', 'logo_path' => '/assets/brands/logo-mula-mula-florist.webp', 'role_scope' => 'Floral Studio & Lifestyle Hampers'],
            ['name' => 'Aranya Flow', 'category' => 'community', 'category_label' => 'Komunitas & Event', 'logo_path' => '/assets/brands/logo-aranya-flow.webp', 'role_scope' => 'Wellness & Creative Movement Bags'],
            ['name' => 'Bynana Gift', 'category' => 'community', 'category_label' => 'Komunitas & Event', 'logo_path' => '/assets/brands/logo-bynana-gift.webp', 'role_scope' => 'Curated Gift & Souvenir Bags'],
            ['name' => 'Waktu Luang', 'category' => 'community', 'category_label' => 'Komunitas & Event', 'logo_path' => '/assets/brands/logo-waktu-luang.webp', 'role_scope' => 'Creative Platform & Community Space'],
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
        Testimonial::where('author', 'Rina Kartika')->delete();

        $testimonials = [
            [
                'author'            => 'Vina Pratiwi',
                'review_date_label' => '14/09/2026',
                'rating'            => 5,
                'highlight_aspect'  => 'Kapasitas Lega & Fleksibel',
                'content'           => 'Kapasitas tas minimalis, tapi setelah diisi muat hp, make up pouch, dan dompet tebal. Nyaman dipakai, bahannya tebal fleksibel, jahitan rapi banget tanpa benang sisa.',
                'screenshot_image'  => '/assets/testimonials/customer-testimonial-1.webp',
                'buyer_photos'      => [
                    '/assets/testimonials/testi-1-buyer-photo-1.webp',
                    '/assets/testimonials/testi-1-buyer-photo-2.webp',
                    '/assets/testimonials/testi-1-buyer-photo-3.webp',
                ],
                'platform'          => 'Shopee Official Shop',
                'is_active'         => true,
            ],
            [
                'author'            => 'Dinda Rahmadani',
                'review_date_label' => '14/09/2026',
                'rating'            => 5,
                'highlight_aspect'  => 'Desain Imut & Material Tebal',
                'content'           => 'Muat banyak loo walaupun ukurannya tampak mini dari luar. Desainnya lucu banget cantiikkk! Bahannya kokoh dan tidak mudah kusut.',
                'screenshot_image'  => '/assets/testimonials/customer-testimonial-2.webp',
                'buyer_photos'      => [
                    '/assets/testimonials/testi-2-buyer-photo-1.webp',
                    '/assets/testimonials/testi-2-buyer-photo-2.webp',
                    '/assets/testimonials/testi-2-buyer-photo-3.webp',
                    '/assets/testimonials/testi-2-buyer-photo-4.webp',
                    '/assets/testimonials/testi-2-buyer-photo-5.webp',
                ],
                'platform'          => 'Shopee Official Shop',
                'is_active'         => true,
            ],
            [
                'author'            => 'Sarah Amanda',
                'review_date_label' => '13/09/2026',
                'rating'            => 5,
                'highlight_aspect'  => 'Sudah Repeat Order 2 Model',
                'content'           => 'Bagusss pol, suka banget sama tasnya! Ini udah koleksi ke-2 dari toko ini dan tidak pernah mengecewakan. Dipakai kuliah dan nongkrong selalu ada yang nanya beli di mana.',
                'screenshot_image'  => '/assets/testimonials/customer-testimonial-3.webp',
                'buyer_photos'      => null,
                'platform'          => 'Shopee Official Shop',
                'is_active'         => true,
            ],
            [
                'author'            => 'Bramantyo Wardhana',
                'review_date_label' => '13/09/2026',
                'rating'            => 5,
                'highlight_aspect'  => 'Material Tahan Air (Waterproof)',
                'content'           => 'Kapasitas muat banyak dan kuat. Bahannya oke banget, ringan dan sejauh ini sangat awet dipakai harian. Beneran kedap air waktu kehujanan gerimis dan mudah dilap bersih!',
                'screenshot_image'  => '/assets/testimonials/customer-testimonial-4.webp',
                'buyer_photos'      => null,
                'platform'          => 'Shopee Official Shop',
                'is_active'         => true,
            ],
        ];

        foreach ($testimonials as $data) {
            Testimonial::updateOrCreate(['author' => $data['author']], $data);
        }

        $faqs = [
            [
                'question' => 'Berapa jumlah pesanan minimum (MOQ) untuk produksi maklon tas atau pakaian custom B2B?',
                'answer'   => 'Untuk produksi maklon custom korporat, merchandise event, maupun GWP brand, MOQ mulai dari 100 pcs per desain/model. Untuk kebutuhan kuantitas besar hingga puluhan ribu pcs per bulan, pabrik in-house kami di Ngawi memiliki kapasitas produksi rata-rata 30.000+ produk per bulan.',
                'category' => 'maklon',
            ],
            [
                'question' => 'Berapa lama proses pembuatan sampel prototipe (sampling) dan produksi massal di CV. Sevine Indonesia?',
                'answer'   => 'Tahap pembuatan sampel (prototipe pola dan pemilihan material) rata-rata memakan waktu 7–14 hari kerja setelah spesifikasi desain disepakati. Setelah sampel fisik disetujui (approval), produksi massal dan Quality Control (QC) bar-tack memakan waktu sekitar 14–30 hari kerja tergantung kompleksitas dan volume pesanan.',
                'category' => 'maklon',
            ],
            [
                'question' => 'Apakah klien korporat bisa memilih jenis bahan, warna, dan emboss/label brand sendiri?',
                'answer'   => 'Bisa. Layanan maklon dan custom order kami mencakup konsultasi pemilihan kain (waterproof fabric, kanvas, kulit sintetis, katun combed, maupun bahan flowy busana muslim), aksesoris hardware, sablon, bordir, woven label, hingga kemasan khusus sesuai identitas perusahaan Anda.',
                'category' => 'maklon',
            ],
            [
                'question' => 'Bagaimana syarat dan cara bergabung menjadi mitra Reseller atau Distributor resmi 5 brand Sevine?',
                'answer'   => 'Pendaftaran mitra Reseller dan Distributor dapat dilakukan langsung melalui formulir kemitraan di website ini atau menghubungi Hotline Reseller resmi (0813-9820-5665). Mitra mendapatkan akses katalog lengkap 5 brand (SEVINE, klou, LALUNA, ASSAIF, NABIRA), harga grosir tangan pertama langsung pabrik, serta materi foto katalog untuk pemasaran digital.',
                'category' => 'reseller',
            ],
            [
                'question' => 'Di mana lokasi pabrik produksi dan kantor cabang CV. Sevine Indonesia jika ingin berkunjung?',
                'answer'   => 'Fasilitas pabrik utama, riset pola, dan gudang pengiriman kami berlokasi di Sambiroto, Kec. Padas, Kabupaten Ngawi, Jawa Timur (63281). Untuk diskusi bisnis, kemitraan B2B, dan tim kreatif, Anda juga dapat mengunjungi Kantor Cabang kami di Ruko Joyo Agung Greenland Kav. 2, Tlogomas, Kec. Lowokwaru, Kota Malang (61544) dengan janji temu terlebih dahulu.',
                'category' => 'umum',
            ],
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
