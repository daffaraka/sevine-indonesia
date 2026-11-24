# 04. Perencanaan SEO & Pertumbuhan Organik — CV. Sevine Indonesia

Dokumen ini merangkum hasil audit SEO, progres implementasi Fase 1–4, target KPI, serta **catatan sinkronisasi teknis** pasca migrasi aplikasi ke **Laravel 13 + Inertia.js**.

---

## 1. Status & Catatan Sinkronisasi Arsitektur (Penting)

Saat perencanaan SEO v1 disusun (Oktober 2026), aplikasi berjalan sebagai **React 18 + Vite SPA** dengan `index.html` dan plugin [`vite-plugins/SeoMetaPlugin.ts`](../vite-plugins/SeoMetaPlugin.ts). Setelah migrasi ke **Laravel 13 + Inertia.js**, perhatikan dua hal berikut:

1. **Template HTML Aktif Berpindah ke Blade:** Saat disajikan lewat Laravel, tag `<head>` dirender oleh [`resources/views/app.blade.php`](../resources/views/app.blade.php) (dengan `@inertiaHead`), bukan `index.html`. Meta description, canonical, Open Graph, Twitter Card, dan JSON-LD (`Organization`, `LocalBusiness`, `WebSite`, `FAQPage`) yang sebelumnya dipasang di `index.html` perlu dipastikan ikut terpasang di `app.blade.php` dan/atau komponen `<Head>` Inertia per halaman (`ClassicProfile`, `ProductCatalog`, dll.).
2. **Generate `robots.txt` & `sitemap.xml`:** [`vite.config.ts`](../vite.config.ts) saat ini menggunakan `laravel-vite-plugin` dan belum memanggil `SeoMetaPlugin.ts`. Untuk produksi Laravel, sediakan `public/robots.txt` dan rute dinamis `/sitemap.xml` (atau generate lewat command artisan) agar mencakup rute baru seperti `/` dan `/catalog` (serta `/karir`, `/event`, `/kolaborasi` saat dipublikasikan).

---

## 2. Temuan Audit Awal & Solusi

| # | Temuan Awal | Status Penanganan |
| :-: | :--- | :--- |
| 1 | `<title>` terlalu singkat ("Sevine "), tanpa `og:image`, `robots.txt`, dan `sitemap.xml` | **Selesai di Fase 1** (`og-cover.jpg`, `favicon.svg`, `apple-touch-icon.png`, `SeoMetaPlugin.ts`) — perlu diport ke `app.blade.php` & route Laravel. |
| 2 | Aset `public/assets` berat (±6,8 MB) dengan file duplikat | **Selesai di Fase 2** — dikonversi ke WebP & dibersihkan (turun menjadi **846 KB**, hemat 87,8%). |
| 3 | Alt text generik & gambar tanpa dimensi eksplisit (risiko CLS) | **Selesai di Fase 2** — `imageAlt` deskriptif di `SevineProfileData.ts`, `width`/`height`, `decoding="async"`, `fetchPriority="high"` pada hero. |
| 4 | Duplikasi konten antara `/`, `/classic`, `/editorial` | **Diputuskan** — default `/` adalah **Classic**; `/editorial` diarahkan/canonical ke `/` (satu konten = satu URL). |
| 5 | Konten render 100% client-side JS (risiko preview WA/LinkedIn & bot AI) | **Terbuka** — dengan Inertia.js, meta OG/JSON-LD dapat dirender server-side di Blade (`app.blade.php`), dan opsional mengaktifkan **Inertia SSR** di masa depan. |
| 6 | Foto stok Unsplash pada beberapa slot hero/lookbook/portofolio | **Terbuka** — perlu diganti foto asli pabrik & produk CV. Sevine Indonesia untuk memperkuat sinyal *E-E-A-T* dan Google Images. |

---

## 3. Roadmap Implementasi SEO

### Fase 1 — Quick Wins Teknis (Selesai — 27 Okt 2026)
- [x] Pembaruan `<title>`, meta description, `max-image-preview:large`, dan `theme-color`.
- [x] Aset sosial & ikon: `public/og-cover.jpg` (1200×630), `public/favicon.svg`, `public/apple-touch-icon.png`.
- [x] Schema JSON-LD: `WebSite`, `Organization`, 2 `LocalBusiness` (Ngawi & Malang), `sameAs` (Instagram & Shopee), `parentOrganization`.
- [x] Sentralisasi domain menggunakan konfigurasi URL tunggal (`VITE_SITE_URL` / `APP_URL`).

### Fase 2 — Performa & On-Page (Selesai — 27 Okt 2026)
- [x] Optimasi seluruh gambar ke `.webp` (hemat 87,8% ukuran aset).
- [x] Atribut `width`/`height` eksplisit, `decoding="async"`, dan prioritas loading hero.
- [x] Section **FAQ** interaktif (MOQ maklon, lama sampling, kustomisasi material, syarat reseller, kunjungan pabrik) + skema `FAQPage` JSON-LD.
- [x] Audit semantic HTML (`<main>`, `<section aria-labelledby>`, urutan heading `h1` → `h2` → `h3`).

### Fase 3 — Multi-Halaman & Sinkronisasi Laravel Inertia (Menyesuaikan Phase 2)
- [ ] Porting meta Open Graph, canonical dinamis (`request()->url()`), dan JSON-LD ke `resources/views/app.blade.php` + `<Head>` Inertia di setiap halaman publik.
- [ ] Pembuatan endpoint/berkas `robots.txt` dan `sitemap.xml` dinamis di Laravel mencakup `/` dan `/catalog` (serta `/karir`, `/event`, `/kolaborasi`).
- [ ] Opsional lanjutan: halaman landing khusus per *search intent* bila ekspansi konten disetujui:
  - `/maklon-custom` — *keyword*: maklon tas custom, vendor merchandise perusahaan, konveksi tas Jawa Timur.
  - `/reseller` — *keyword*: reseller tas tangan pertama, distributor busana muslim.
  - `/brand/{slug}` — halaman khusus 5 lini brand dengan JSON-LD `Brand` / `Product`.

### Fase 4 — Off-Page, Lokal & Pengukuran (Berjalan)
- [x] Verifikasi **Google Search Console** via [`public/google30baacf72c7e1eda.html`](../public/google30baacf72c7e1eda.html) & submit sitemap (29 Okt 2026).
- [ ] Import properti ke **Bing Webmaster Tools** (sinkronisasi dari GSC).
- [ ] Integrasi **Google Analytics 4 (GA4)** + sinkronisasi event konversi (`click_whatsapp_b2b`, `click_whatsapp_reseller`, `submit_inquiry_form`) melengkapi telemetri internal `daily_visitor_metrics`.
- [ ] Klaim & optimasi **Google Business Profile** untuk Pabrik Ngawi & Kantor Cabang Malang dengan konsistensi NAP (*Name, Address, Phone*).
- [ ] Backlink kemitraan (Hello Market Solo, Project X Market, mitra korporat) dan direktori bisnis lokal.

---

## 4. Target KPI (3–6 Bulan)

| Metrik | Target |
| :--- | :--- |
| Halaman terindeks (GSC) | `>= 8` halaman (setelah halaman katalog/karir/event publik aktif) |
| Lighthouse SEO / Performance (Mobile) | `>= 95` / `>= 85` |
| Largest Contentful Paint (LCP) Mobile | `< 2,5 detik` |
| Peringkat kata kunci *"CV Sevine Indonesia"* | `#1` |
| Klik organik & lead WhatsApp B2B/Reseller | Tumbuh bertahap & terlacak via GA4 + `daily_visitor_metrics` |

---

## 5. Keputusan SEO yang Berlaku

1. **Domain & Hosting:** Domain final belum ditetapkan secara permanen; domain sementara di Vercel (`https://sevine-indonesia.vercel.app`) dan siap diganti lewat satu konfigurasi environment (`APP_URL` / `VITE_SITE_URL`).
2. **View Default `/`:** Menggunakan tampilan **Classic** (`Public/ClassicProfile`).
3. **Akun Resmi (`sameAs`):** Instagram `https://instagram.com/sevine.id`, Shopee `https://shopee.co.id/sevine.id`, Email `sevine.id@gmail.com`.
