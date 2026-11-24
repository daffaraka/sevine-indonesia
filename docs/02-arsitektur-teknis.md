# 02. Arsitektur & Spesifikasi Teknis — CV. Sevine Indonesia

Dokumen ini merangkum arsitektur teknis aktual (*single source of truth*) yang telah disinkronkan dengan codebase **Laravel 13 + Inertia.js + React 18 TypeScript** serta keputusan final pengembangan **Phase 2**.

---

## 1. Tech Stack Aktual

### Backend
| Komponen | Versi / Package | Peran |
| :--- | :--- | :--- |
| **Runtime & Framework** | PHP `^8.3`, Laravel `^13.17` | Routing, autentikasi sesi, ORM, validasi, dan API/props Inertia. |
| **Inertia Bridge** | `inertiajs/inertia-laravel ^3.7` | *Modern Monolith* tanpa boilerplate REST/JWT terpisah. |
| **Dynamic RBAC** | `spatie/laravel-permission ^8.5` | Manajemen role dan izin akses per modul secara dinamis. |
| **Route Helper** | `tightenco/ziggy ^2.7` | Named routes Laravel tersedia di sisi TypeScript/React. |
| **Testing & Lint** | `phpunit/phpunit ^12.5`, `laravel/pint ^1.27` | Pengujian otomatis dan pemformatan kode PHP. |

### Frontend
| Komponen | Versi / Package | Peran |
| :--- | :--- | :--- |
| **UI & Language** | React `^18.3.1`, TypeScript `^5.5.3` | Komponen modular, strict interfaces, dan type-safety. |
| **Inertia Client** | `@inertiajs/react ^2.3.29` | Navigasi SPA-like terhubung langsung ke controller Laravel. |
| **Bundler & Styling** | Vite `^5.4.2`, `laravel-vite-plugin`, Tailwind CSS `^3.4.10` | Kompilasi cepat dan token warna doff/editorial. |
| **Rich Text & Icons** | `@tiptap/react ^3.34.0`, `lucide-react ^0.441.0` | Editor kualifikasi/deskripsi lowongan dan ikon garis tipis minimalis. |

---

## 2. Mode Booting & Konvensi Kode

- **Dual-Boot Entry ([`resources/js/app.tsx`](../resources/js/app.tsx)):**
  - **Mode Inertia (Utama):** Berjalan saat dirender oleh Blade [`resources/views/app.blade.php`](../resources/views/app.blade.php) (`#app` dengan `data-page`), me-resolve halaman dari `resources/js/Pages/**/*.tsx`.
  - **Mode Fallback Standalone:** Bila `#app` tidak membawa `data-page`, aplikasi fallback ke [`SevineAppRouter.tsx`](../resources/js/SevineAppRouter.tsx) (mendukung preview statis untuk `/`, `/catalog`, `/admin`, `/login`; jalur `/editorial` diarahkan ke `/` Classic).
- **Konvensi File & Clean Code:**
  - Penamaan komponen React menggunakan **PascalCase** di dalam folder modul kebab-case (`folder-modul/NamaModulFunction.tsx`).
  - Komponen shell layout dipisah ke `resources/js/Layouts/components/`.
  - Prinsip **SRP**, strict TypeScript interfaces (tanpa `any`), dan pemecahan komponen bila mendekati 100–200 baris.

---

## 3. Struktur Direktori Aktual

```text
Sevine Company Profile/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── Admin/MonitoringController.php       # Endpoint telemetry & monitoring admin
│   │   │   └── Auth/AuthenticatedSessionController.php
│   │   └── Middleware/TrackPublicVisitorMiddleware.php
│   └── Models/User.php
├── database/
│   ├── migrations/
│   │   ├── 2026_01_01_000001_create_users_and_sessions_tables.php
│   │   ├── 2026_01_01_000002_create_spatie_permission_tables.php
│   │   ├── 2026_01_01_000003_create_catalog_tables.php
│   │   ├── 2026_01_01_000004_create_publications_and_careers_tables.php
│   │   └── 2026_01_01_000005_create_monitoring_and_telemetry_tables.php
│   └── seeders/
│       ├── DatabaseSeeder.php
│       └── SevineRolePermissionSeeder.php           # Seed 9 permission modul & role admin
├── resources/
│   ├── css/app.css                                  # Tailwind directives & custom utilities
│   ├── views/app.blade.php                          # Root template Inertia + fonts + @routes
│   └── js/
│       ├── Layouts/
│       │   ├── AdminDashboardLayout.tsx
│       │   └── components/                          # AdminSidebar, AdminHeader, MainNavbar, MainFooter,
│       │                                            # EditorialHeader/Footer, RouteViewSwitcher, QuickWhatsApp, dll.
│       ├── Pages/
│       │   ├── Public/ClassicProfile.tsx            # Halaman utama profil perusahaan (/)
│       │   ├── Public/ProductCatalog.tsx            # Halaman katalog produk publik (/catalog)
│       │   ├── Auth/Login.tsx                       # Halaman login admin (/login)
│       │   └── Admin/Dashboard.tsx                  # Panel admin backoffice (/admin)
│       ├── admin/                                   # 11 folder modul backoffice
│       │   ├── admin-overview/                      # Ringkasan operasional
│       │   ├── admin-dashboard/                     # Overview, stat cards & state hooks
│       │   ├── admin-monitoring/                    # Visitor chart, live activity feed & system health
│       │   ├── admin-datatable/                     # Master tabel produk, swatch HEX & import CSV
│       │   ├── admin-categories/                    # CRUD kategori produk
│       │   ├── admin-brands/                        # CRUD 5 brand naungan
│       │   ├── admin-careers/                       # CRUD lowker (TipTap rich text + Google Form URL)
│       │   ├── admin-events/                        # CRUD dokumentasi event multi-foto
│       │   ├── admin-collaboration/                 # CRUD mitra kolaborasi B2B
│       │   ├── admin-access/                        # Manajemen Dynamic RBAC & role
│       │   └── admin-shared/                        # Modal, draft persistence, rich text sanitizer
│       ├── classic/                                 # Modul tampilan Classic Corporate & Product Catalog
│       ├── editorial/                               # Modul tampilan Editorial Magazine (arsip komponen)
│       ├── data/SevineProfileData.ts                # Data statis profil, brand, partner, portofolio & kontak
│       ├── services/                                # CompanyProfileService, AdminDashboardService,
│       │                                            # AdminCsvImportService, AdminMonitoringService
│       ├── types/                                   # CompanyProfileTypes.ts, AdminDashboardTypes.ts
│       ├── app.tsx                                  # Entry point Inertia + fallback router
│       └── SevineAppRouter.tsx                      # Router client-side fallback
├── routes/web.php                                   # Definisi rute publik, autentikasi & admin
├── public/                                          # Aset WebP, favicon, og-cover, verifikasi GSC
├── tailwind.config.js                               # Token warna doff & editorial + tipografi trio
└── vite.config.ts                                   # Konfigurasi Laravel Vite + React + alias `@`
```

---

## 4. Rute Aplikasi & Modul Phase 2

### A. Rute Terdaftar Saat Ini ([`routes/web.php`](../routes/web.php))
| Method | Path | Name | Middleware | Target |
| :---: | :--- | :--- | :--- | :--- |
| `GET` | `/` | `public.home` | `TrackPublicVisitorMiddleware` | `Public/ClassicProfile` |
| `GET` | `/catalog` | `public.catalog` | `TrackPublicVisitorMiddleware` | `Public/ProductCatalog` |
| `GET/POST` | `/login` | `login`, `login.store` | `guest` | `AuthenticatedSessionController` |
| `POST` | `/logout` | `logout` | `auth` | `AuthenticatedSessionController@destroy` |
| `GET` | `/admin` | `admin.dashboard` | `auth`, `role:admin` | `Admin/Dashboard` |
| `GET` | `/admin/monitoring` | `admin.monitoring` | `auth`, `role:admin` | `MonitoringController@index` |

### B. Keputusan Desain Final 5 Modul Phase 2 (Disetujui)
1. **Modul Produk & Katalog (`/catalog` / `/katalog`):**
   - **Zero-Price B2B Model** (tanpa harga ritel; fokus spesifikasi, kapasitas, status produksi, dan CTA konsultasi/Shopee).
   - Relasi ke **Brand** (5 lini Sevine) dan **Kategori** dinamis, mendukung **multi-foto** dan **swatch warna HEX**.
   - Dilengkapi fitur **Import CSV massal** (`AdminProductCsvImportModal.tsx`) di sisi admin.
2. **Modul Kategori & Brand:** CRUD master kategori produk dan profil 5 lini brand Sevine.
3. **Modul Lowongan Kerja & Karir (`/karir`):**
   - Mencatat posisi, divisi, lokasi penempatan (`Ngawi`, `Malang`, `Remote`), tipe kerja (`Full-time`, `Part-time`, `Magang`), kualifikasi & tanggung jawab berbasis **TipTap Rich Text HTML**, dan masa berlaku.
   - **Pengajuan lamaran diarahkan ke Google Form resmi** (`google_form_url`) — bebas beban storage upload CV di server, sekaligus mencatat `apply_clicks_count`.
4. **Modul Dokumentasi Event (`/event`):** Relasi *one-to-many* (`events` → `event_images`) untuk galeri pameran offline dengan penampil lightbox layar penuh.
5. **Modul Kolaborasi & Mitra (`/kolaborasi`):** Direktori 17+ mitra lintas industri (logo, sektor, ruang lingkup, status aktif) yang tersinkronisasi ke beranda.
6. **Dynamic RBAC (`spatie/laravel-permission`):**
   - Mendukung pembuatan role kustom dan centang izin granular pada 9 modul permission: `overview`, `monitoring`, `products`, `categories`, `brands`, `careers`, `events`, `collaborations`, `access`.
   - Default seeder (`SevineRolePermissionSeeder`) menyiapkan role sistem `admin` dengan akses penuh.
7. **Internal Visitor Monitoring & Telemetry:**
   - Middleware `TrackPublicVisitorMiddleware` mencatat kunjungan publik secara agregat ke `visitor_sessions` dan `daily_visitor_metrics` untuk grafik harian, aktivitas terbaru, dan indikator *system health* di dashboard admin.

---

## 5. Skema Database Relasional (Migrasi Aktual)

### A. Autentikasi & RBAC
- `users`, `password_reset_tokens`, `sessions` (`2026_01_01_000001`)
- Tabel Spatie Permission (`roles`, `permissions`, `model_has_roles`, `model_has_permissions`, `role_has_permissions`) (`2026_01_01_000002`)

### B. Katalog & Produk (`2026_01_01_000003_create_catalog_tables.php`)
- `brands` — `key` (unik), `name`, `category` (`bag`, `apparel`, `muslim-wear`), `tagline`, `description`, `target_market`, `highlight_points` (JSON), `badge_color`, `logo_path`, `shopee_url`, `sort_order`, `is_active`.
- `product_categories` — `slug`, `name`, `description`, `is_active`, `sort_order`, soft deletes.
- `products` — `sku` (unik), `brand_id`, `category_id`, `name`, `capacity`, `status` (`Produksi Aktif`, `Review QC`, `Draft Sampling`), `description`, `features` (JSON), `shipping_origin` (`ngawi`, `jakarta`, `solo`), `is_b2b_ready`, `shopee_url`, `views_count`, soft deletes.
- `product_swatches` — `product_id`, `name`, `hex_code` (CHAR 7), `sort_order`.
- `product_images` — `product_id`, `image_path`, `alt_text`, `is_primary`, `sort_order`.

### C. Publikasi, Karir & Kemitraan (`2026_01_01_000004_create_publications_and_careers_tables.php`)
- `careers` — `slug`, `title`, `division`, `location` (`Ngawi`, `Malang`, `Remote`), `employment_type`, `qualifications_html`, `responsibilities_html`, `google_form_url`, `is_active`, `apply_clicks_count`, `expires_at`, soft deletes.
- `events` & `event_images` — Relasi *one-to-many* dokumentasi pameran offline (`is_cover`, `caption`, `sort_order`).
- `partners` — `name`, `category`, `category_label`, `logo_path`, `role_scope`, `status` (`Mitra Aktif`, `Nonaktif`), soft deletes.
- `partnership_inquiries` — Leads kemitraan (`reseller`, `corporate_b2b`, `custom_order`, `distributor`) dengan status `Baru`, `Dihubungi`, `Selesai`.
- `testimonials` & `faqs` — Kurasi testimoni pembeli Shopee (`buyer_photos` JSON) dan FAQ per kategori (`maklon`, `reseller`, `umum`).

### D. Monitoring & Telemetri (`2026_01_01_000005_create_monitoring_and_telemetry_tables.php`)
- `visitor_sessions` — Sesi anonim (`visitor_hash`, `current_path`, `device_type`, `referrer_source`, `visited_date`, `last_seen_at`).
- `daily_visitor_metrics` — Agregat harian (`unique_visitors`, `page_views`, `catalog_views`, `whatsapp_b2b_clicks`, `shopee_store_clicks`, `career_form_clicks`, breakdown JSON).
- `activity_logs` — Audit trail aksi admin (`create`, `update`, `delete`, `restore`, `import_csv`, `bulk_status`, `health_check`).

---

## 6. Service Layer & Peta Section ID Publik

Komponen UI profil publik mengakses data melalui [`CompanyProfileService.ts`](../resources/js/services/CompanyProfileService.ts) (didukung kontrak [`CompanyProfileTypes.ts`](../resources/js/types/CompanyProfileTypes.ts) dan data [`SevineProfileData.ts`](../resources/js/data/SevineProfileData.ts)):
- Getter utama: `getMetricStats()`, `getCoreValues()`, `getVisionMission()`, `getBrands(category?)`, `getBrandById(id)`, `getAdvantages()`, `getWorkflowSteps()`, `getDepartments()`, `getPortfolioSamples(filter?)`, `getOfflineEvents()`, `getAllPartnerBrands()`, `getClientPartnerGroups()`, `getTestimonials()`, `getOfficeLocations()`, `getContactInfo()`, serta `generateWhatsAppInquiryUrl(formData)`.

### Peta Anchor `id` Section
- **Mode Classic (Default `/`):** `hero` → `about` → `brands` → `advantages` → `workflow` → `team` → `portfolio` → `partners` → `testimonials` → `contact` (+ FAQ section).
- **Mode Editorial (Komponen di `resources/js/editorial/`):** `ed-hero` → `ed-brands` → `ed-lookbook` → `ed-numbers` → `ed-story` → `ed-capsule` → `ed-contact`.
