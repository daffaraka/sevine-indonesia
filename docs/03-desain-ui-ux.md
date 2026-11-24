# 03. Desain UI/UX, Design System & Standar Anti-AI Slop

Dokumen ini mengonsolidasikan panduan visual proyek, token warna & tipografi aktual dari [`tailwind.config.js`](../tailwind.config.js) dan [`resources/css/app.css`](../resources/css/app.css), spesifikasi Figma Dashboard Admin, serta pagar pembatas **Anti-AI Slop**.

---

## 1. Filosofi Desain & Standar Anti-AI Slop

Tujuan utama sistem desain Sevine adalah mencegah antarmuka generik bergaya "cetakan pabrik AI" (gradien ungu/biru SaaS, kartu putih mengambang dengan bayangan berlebihan, inflasi ikon hiasan, dan layout yang rusak pada data nyata).

### Perbandingan Standar
| Area | Dilarang (*AI Slop*) | Wajib (Standar Sevine) |
| :--- | :--- | :--- |
| **Pemisah Konten** | Spam kartu putih melayang dengan `shadow-md` | **Hairline Borders** (`1px` subtle divider) atau ruang kosong (*whitespace*) terukur |
| **Palet Warna** | Gradien neon/ungu, biru cerah generik, hitam `#000` | **Doff / Matte Aesthetic** (navy korporat doff, linen hangat, stone/canvas editorial, terracotta & sage redam) |
| **Ikonografi** | Ikon di setiap judul, label, badge, dan teks | **Restrained Duo-Tone Icons** (`lucide-react` stroke tipis); ikon hanya untuk tombol aksi atau navigasi fungsional |
| **Tipografi** | Satu font datar tanpa hierarki | **Kontras Skala Kuat** (headline serif/display tegas + label mikro `uppercase` + `font-mono` untuk kode/angka) |
| **Ketahanan Data** | Hanya rapi untuk *dummy text* pendek | Wajib tahan **data ekstrem**: judul panjang (`truncate`/`line-clamp`), *zero-state*, *loading skeleton*, dan responsif mobile `320px` hingga FHD `1920px` |
| **Aksesibilitas & Mobile** | Hanya nyaman di layar desktop | **Mobile-First**: area sentuh `>= 44px`, off-canvas drawer di mobile, sidebar collapsible di desktop |

### Jangkar Desain & Tooling Eksternal
- **Figma MCP:** Membaca variabel warna, spacing, dan struktur kanvas Figma sebagai *ground truth* 1:1.
- **Mobbin MCP:** Merujuk pola UI industri nyata (Linear, Stripe, Apple, Airbnb) sebelum merancang layar baru.
- **Browser / DevTools Audit:** Memverifikasi hasil render secara visual untuk mencegah pergeseran layout (*CLS*) dan masalah kontras.

---

## 2. Sistem Palet Warna Aktual (`tailwind.config.js`)

### A. Palet `doff.*` (Mode Classic Corporate — Default `/`)
| Token Tailwind | Kode HEX | Peran Visual |
| :--- | :--- | :--- |
| `doff-navy` | `#1B2E4B` | Warna primer korporat (judul, navbar, tombol utama, progress bar Inertia). |
| `doff-navydark` | `#132238` | State hover tombol primer & latar footer gelap. |
| `doff-linen` | `#F8FAFC` | Latar kanvas utama halaman Classic. |
| `doff-subtle` | `#EEF2F6` | Latar kartu sekunder & badge lembut. |
| `doff-slate` | `#475569` | Teks deskripsi paragraf. |
| `doff-muted` | `#64748B` | Teks caption & sub-label. |
| `doff-terracotta` | `#C27B66` | Aksen hangat untuk highlight & indikator. |
| `doff-gold` | `#C5A880` | Aksen emas sampanye doff untuk rating bintang & detail kartu. |
| `doff-border` | `#E2E8F0` | Garis tepi kartu standar (`.doff-card`). |

### B. Palet `editorial.*` (Editorial Doff & Spesifikasi Figma Dashboard)
| Token Tailwind | Kode HEX | Peran Visual |
| :--- | :--- | :--- |
| `editorial-canvas` | `#F6F4F0` | Kanvas latar matte terinspirasi katun mentah & kertas editorial. |
| `editorial-paper` | `#ECE9E2` | Latar section sekunder, sidebar, kartu metrik, & container datatable. |
| `editorial-taupe` | `#DFDBD2` | Border sekunder, avatar badge, kurva pita, & scrollbar thumb. |
| `editorial-hairline` | `#D8D3C8` | Garis pemisah arsitektural `1px` tanpa drop-shadow. |
| `editorial-charcoal` | `#171715` | Judul utama, monogram brand, & tombol tab aktif. |
| `editorial-ink` | `#2B2A27` | Teks paragraf, isi sel tabel, & status utama. |
| `editorial-muted` | `#6E6B64` | Sub-label, nomor seri mono, & ikon non-aktif. |
| `editorial-terracotta` | `#9E4738` | Aksen primer doff (CTA `+Tambah Produk`, active indicator, focus ring, bulk action bar). |
| `editorial-sage` | `#536251` | Status positif (`Produksi Aktif`, indikator Shift Online). |
| `editorial-ochre` | `#B68642` | Status peringatan (`Review QC`, SPK, aksen kuningan redup). |
| `editorial-wine` | `#4A1E22` | Aksen burgundy gelap untuk aksi hapus massal & overlay badge. |
| `editorial-slate` | `#5C748A` | Aksen biru keabuan redam. |

### C. Aksen Identitas Lini Brand
- `klou`: `#5B6B58` (Sage) • `LALUNA`: `#8F3B4A` (Berry Wine) • `ASSAIF`: `#8A5B38` (Earth Brown) • `NABIRA`: `#8B6E8C` (Dusty Mauve).

---

## 3. Sistem Tipografi Trio

Didefinisikan pada `tailwind.config.js` dan dimuat melalui Google Fonts di [`resources/views/app.blade.php`](../resources/views/app.blade.php):
1. **`font-sans` (`Plus Jakarta Sans`):** Font default untuk navigasi, paragraf, tabel data, formulir, dan tombol aksi.
2. **`font-serif` (`Cormorant Garamond`):** Judul display editorial, pull-quote visi, nama brand, dan inisial filosofi `S — V — N`.
3. **`font-mono` (`Space Grotesk`):** Nomor seri, SKU, kode departemen (`DEPT 01`), indeks section, dan angka tabular.

---

## 4. Utilitas Visual & Efek CSS ([`resources/css/app.css`](../resources/css/app.css))

- **Matte Card (`.doff-card`, `.doff-card-hover`):** Border `#E2E8F0` dengan bayangan sangat tipis (`rgba(27, 46, 75, 0.04)`) dan elevasi halus `-1px` saat hover.
- **Tekstur Latar Khusus Sevine:** `.bg-blue-mesh-gradient`, `.bg-textile-texture` (memakai `/assets/backgrounds/sevine-textile-texture-bg.webp`), `.bg-blue-grid-pattern`, `.bg-blue-diagonal-stripes`, dan `.bg-blue-cross-dots`.
- **Transisi Antar-Section:** `.section-seam-blur-top` dan `.section-seam-blur-bottom` untuk transisi halus antar blok warna.
- **Kinetic Motion Ghost:** `.kinetic-motion-ghost` dan `.kinetic-motion-ghost-dark` untuk efek *shutter-drag* pada kartu potret.
- **Infinite Partner Marquee:** `.animate-marquee-left`, `.animate-marquee-right`, dan `.hover-pause` (durasi `60s linear infinite`, jeda otomatis saat hover).
- **Custom Scrollbar:** `.custom-scrollbar` tipis `4px` berwarna slate lembut.

---

## 5. Spesifikasi Desain Figma — Dashboard Admin Backoffice

- **Tautan Figma Utama:** [Sevine Editorial Doff Dashboard](https://www.figma.com/design/RtWAqWpKNWGDeNjGzdEOZp?node-id=1-3&autoplay-code-preview=1-3)
- **File Key:** `RtWAqWpKNWGDeNjGzdEOZp` • **Node ID:** `1:3` (Kanvas `1512 x 982px`)
- **Komponen Shell & Layout:**
  1. **Top Header Bar (`AdminHeader.tsx`):** Breadcrumb kontekstual, indikator status operasional, dan profil admin.
  2. **Collapsible Sidebar (`AdminSidebar.tsx`):**
     - **Desktop (`>= lg`):** Sticky dan dapat dilipat antara mode penuh dan mode ringkas ikon.
     - **Mobile & Tablet (`< lg`):** Off-canvas drawer dengan backdrop blur.
     - **Active Route Highlight:** Latar blok solid kontras tanpa *border kiri* pada elemen melengkung.
  3. **Metric Stat Cards (`AdminMetricStatGrid.tsx`):** Output manufaktur, total model katalog aktif, batch/event, dan monitoring pengunjung/lowongan.
  4. **Interactive Datatables (`AdminProductDatatable.tsx` & modul lainnya):** Filter 5 brand Sevine, pencarian real-time, dropdown kategori & status, checkbox massal dengan contextual bulk bar, swatch titik warna HEX asli, serta pagination presisi.
  5. **Skala Border Radius Dashboard:** Container/Modal `rounded-xl`, Sidebar item/Input/Tombol utama `rounded-lg`, Aksi tabel/Badge `rounded-md`.

---

## 6. Checklist Cepat Anti-Slop untuk Kontributor / AI

```markdown
- Hindari gradien ungu/neon SaaS, spam kartu putih berbayangan tebal, dan ikon dekoratif.
- Gunakan token warna resmi `doff.*` / `editorial.*` dari tailwind.config.js; hindari warna sembarang.
- Pisahkan komponen yang panjang (>100–200 baris) ke sub-komponen modular di folder modul terkait.
- Uji tampilan pada nama produk panjang, state kosong (empty state), loading skeleton, dan layar mobile 320px.
- Pastikan seluruh komponen interaktif (modal, drawer, filter, dropdown) aksesibel dengan keyboard & sentuhan.
```
