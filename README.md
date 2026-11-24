# CV. Sevine Indonesia — Company Profile & Admin Backoffice

Website profil perusahaan, katalog produk B2B, dan panel manajemen backoffice (Dashboard Admin) untuk **CV. Sevine Indonesia** — perusahaan manufaktur tas, apparel, dan busana muslim terintegrasi asal Ngawi & Malang, Jawa Timur.

---

## Ringkasan Proyek

| Aspek | Keterangan |
| :--- | :--- |
| **Entitas** | CV. SEVINE INDONESIA |
| **Fokus Industri** | Manufaktur Tas, Apparel & Busana Muslim (*In-House Factory & Multi-Brand Incubator*) |
| **5 Lini Brand** | `SEVINE`, `klou`, `LALUNA INDONESIA`, `ASSAIF MUSLIM MENSWEAR`, `NABIRA` |
| **Fase Proyek** | **Phase 1** (Company Profile Publik — Selesai) • **Phase 2** (Dashboard Admin, 5 Modul Inti, Dynamic RBAC & Monitoring — Aktif) |
| **Stack Utama** | Laravel 13 (PHP 8.3+) + Inertia.js + React 18 (TypeScript) + Vite 5 + Tailwind CSS 3.4 |
| **Library Kunci** | `spatie/laravel-permission` (Dynamic RBAC), `@tiptap/react` (Rich Text), `lucide-react`, `tightenco/ziggy` |

---

## Peta Dokumentasi

Seluruh dokumentasi proyek dikelompokkan secara tematik di folder `docs/`:

| Dokumen | Cakupan Isi |
| :--- | :--- |
| [01 — Profil Perusahaan & Bisnis](docs/01-profil-bisnis.md) | Profil CV. Sevine Indonesia, metrik pencapaian, filosofi S-V-N, visi-misi, 5 lini brand, 5 keunggulan pabrik, 7 tahap manufaktur, 6 divisi, 17 mitra B2B, target audiens, serta kontak & lokasi Ngawi/Malang. |
| [02 — Arsitektur & Spesifikasi Teknis](docs/02-arsitektur-teknis.md) | Stack aktual Laravel 13 + Inertia + React TS, struktur direktori backend & `resources/js/`, rute publik/admin, skema database (15 tabel migrasi), Dynamic RBAC, modul admin Phase 2, dan *service layer*. |
| [03 — Desain UI/UX & Design System](docs/03-desain-ui-ux.md) | Standar Anti-AI Slop, palet warna doff (`doff.*` & `editorial.*`), sistem tipografi trio, utilitas CSS custom, serta tautan & spesifikasi Figma Dashboard Admin. |
| [04 — Perencanaan SEO & Pertumbuhan](docs/04-seo-marketing.md) | Hasil audit SEO, status roadmap Fase 1–4, KPI target, catatan sinkronisasi SEO untuk Laravel Inertia (`app.blade.php` vs `SeoMetaPlugin.ts`), dan keputusan domain/canonical. |
| [05 — Prompt Aset Visual (Nano Banana)](docs/05-prompt-aset-visual.md) | Kumpulan prompt generator gambar doff aesthetic untuk 7 tahap alur kerja manufaktur Sevine + panduan integrasi ke kode React. |

> **Arsip Legal & Administrasi Lokal:** Dokumen kontrak (MoU Phase 1 & 2), SOW Phase 2, faktur tagihan (Invoice), dan panduan penomoran surat disimpan terpisah di `docs/legal/` (di-ignore dari Git karena memuat data administrasi sensitif).

---

## Quick Start (Pengembangan Lokal)

### Prasyarat
- **PHP** `>= 8.3` & **Composer**
- **Node.js** `>= 20` & **npm**
- Database lokal (SQLite default atau MySQL/PostgreSQL via `.env`)

### Instalasi Awal
```bash
# 1. Instal dependensi PHP & JS, salin .env, generate key, dan jalankan migrasi
composer run setup

# 2. Seed role & akun admin default (opsional untuk development)
php artisan db:seed
```

### Menjalankan Server Development
```bash
# Menjalankan Laravel + Vite secara bersamaan
composer run dev

# Atau jalankan terpisah:
php artisan serve
npm run dev
```

### Build Produksi & Pengujian
```bash
# Type-check TypeScript & build aset Vite
npm run build

# Menjalankan test suite Laravel (PHPUnit)
composer run test
```

---

## Ringkasan Fase & Status Proyek

| Fase | Ruang Lingkup Utama | Status |
| :--- | :--- | :--- |
| **Phase 1 — Company Profile** | Website company profile publik, 14 modul konten, katalog 5 brand, marquee 17 mitra, bukti ulasan Shopee, form kemitraan WhatsApp, optimasi WebP & SEO dasar. | Selesai (Deliverables terpenuhi) |
| **Phase 2 — Dashboard Admin & Modul** | Migrasi Laravel 13 + Inertia, Dashboard Admin collapsible, Dynamic RBAC, Modul Produk (zero-price, swatch HEX, CSV import), Kategori, Brand, Lowongan Kerja (Google Form), Event multi-foto, Kolaborasi mitra, dan Visitor Monitoring. | Aktif / Pengembangan |
