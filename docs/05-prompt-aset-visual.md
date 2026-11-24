# 05. Prompt Aset Visual — 7 Tahap Alur Kerja Manufaktur (Nano Banana)

Panduan dan kumpulan prompt siap pakai untuk menghasilkan ilustrasi/foto editorial 7 langkah alur kerja manufaktur CV. Sevine Indonesia menggunakan **Nano Banana (Google Imagen / Gemini Image Generator)**, yang terintegrasi ke komponen [`WorkflowStepCard.tsx`](../resources/js/classic/workflow-process/WorkflowStepCard.tsx).

---

## 1. Parameter Visual Wajib (Doff Aesthetic)

| Elemen Warna | Kode HEX | Penggunaan dalam Scene |
| :--- | :--- | :--- |
| **Doff Navy** | `#1B2E4B` / `#132238` | Produk tas/apparel, label, aksen mesin jahit |
| **Warm Terracotta** | `#C27B66` | Jahitan aksen, benang, stempel QC, kartu checklist |
| **Warm Linen** | `#F8FAFC` / `#F6F4F0` | Meja kerja, latar studio, kain kanvas mentah |
| **Slate & Charcoal** | `#475569` / `#171715` | Alat jahit logam, gunting pola, rangka meja |
| **Muted Sage** | `#536251` | Aksen tanaman studio, swatch palet organik |
| **Warm Gold** | `#C5A880` | Resleting, kancing kuningan redup, penggaris logam |

**Gaya Fotografi:** *Minimalist Scandinavian editorial lookbook*, permukaan *matte/non-glossy*, pencahayaan pagi terdifusi lembut (*soft diffused morning studio light*), lensa `85mm` dengan *shallow depth of field*, bebas neon/glossy.

---

## 2. Prompt per Tahap (Rasio Default `1:1`)

### Tahap 01: Market Analysis (Riset & Data)
```text
Professional editorial photography of a modern fashion market research desk. A sleek minimalist matte laptop displaying clean data trend charts, scattered premium textile fabric swatches, Pantone color swatches, notebook with handwritten fashion trend notes, and ceramic coffee cup. Soft diffused morning window light, shallow depth of field.

Color Palette: Matte Doff Navy (#1B2E4B), Warm Terracotta (#C27B66), Soft Linen (#F8FAFC), and Charcoal Slate (#475569). Minimalist clean aesthetic, no clutter, 8k resolution, photorealistic, 85mm lens portrait, editorial magazine style --ar 1:1 --no neon, glossy, messy, dark shadows
```

### Tahap 02: Concept Planning (Kreatif & Pola)
```text
Top-down flat lay view of a creative fashion design atelier desk. A curated aesthetic moodboard featuring minimalist bag and clothing sketches on textured craft paper, acrylic pattern rulers, color chips in muted earth tones, tailor chalk, and raw fabric swatches.

Color Palette: Deep Doff Navy (#1B2E4B), Muted Terracotta (#C27B66), Off-white Linen background (#F6F4F0), subtle Sage Green (#536251). High craftsmanship, organic materials, soft ambient lighting, clean composition, editorial lookbook aesthetic --ar 1:1 --no shiny plastic, vibrant colors, cluttered mess
```

### Tahap 03: Product Development (R&D & Sampling)
```text
Close-up editorial shot of hands of a skilled artisan tailoring and assembling a prototype tote bag. Precision metal sewing tools, fabric measuring tape draped naturally, textured water-repellent canvas material, clean cut edges, and tailor pins. Focused on meticulous craftsmanship and ergonomic detail.

Color Palette: Doff Navy textile (#1B2E4B), Terracotta thread accents (#C27B66), Natural Warm Linen surface (#F8FAFC), Antique brass hardware details. Cinematic macro photography, natural studio side lighting, high texture detail, 8k --ar 1:1 --no cartoon, 3D render, deformed hands, messy background
```

### Tahap 04: Production (Manufaktur Mandiri)
```text
Interior view of a modern boutique garment production studio. Clean rows of heavy-duty industrial sewing machines, neat stacks of precision-cut fabric parts, organized rolls of navy and earth-tone textiles on steel shelving, warm wooden worktables. Bright, airy, and organized workshop atmosphere.

Color Palette: Industrial Matte Navy (#132238), Linen White walls (#F8FAFC), Terracotta and Muted Slate accents. Architectural editorial photography, symmetrical clean perspective, soft daylight, professional manufacturing standard --ar 1:1 --no dirty factory, dark warehouse, chaotic mess, neon lights
```

### Tahap 05: Evaluation & Revision (Quality Control)
```text
Close-up shot of quality control inspection. Professional hands wearing clean white cotton gloves inspecting the bartack stitching and zipper pull of a finished minimalist navy bag. A neat quality checklist card on textured paper with a subtle checkmark stamp resting beside it.

Color Palette: Deep Navy bag (#1B2E4B), Terracotta checklist details (#C27B66), Warm Linen tabletop (#F8FAFC), Crisp white glove. Extreme macro detail showing clean stitching, immaculate material quality, warm soft ring lighting, professional standard --ar 1:1 --no loose threads, damaged fabric, harsh glare, plastic reflections
```

### Tahap 06: Product Release (Studio & Peluncuran)
```text
High-end commercial studio photography of finished bags and lifestyle apparel displayed on minimalist matte geometric pedestals. A professional cinema camera on a tripod visible slightly in the soft blurred background. Elegant product catalog lookbook setting.

Color Palette: Matte Doff Navy (#1B2E4B) and Terracotta (#C27B66) products against a Warm Cream and Linen backdrop (#F6F4F0). Sculptural soft shadows, directional studio softbox lighting, museum-grade aesthetic, sophisticated and contemporary --ar 1:1 --no oversaturated colors, cheap plastic pedestals, blurry subject
```

### Tahap 07: Delivery (Pengemasan & Logistik)
```text
Still life of premium eco-friendly corporate package delivery. A sturdy kraft cardboard box sealed with minimalist branded paper tape, tied with natural twine, accompanied by a thank-you envelope on textured paper. Positioned on a clean wooden packing bench ready for shipment.

Color Palette: Natural Kraft Paper beige, Matte Doff Navy tape/labels (#1B2E4B), Warm Terracotta seal stamp (#C27B66), Soft Linen background (#F8FAFC). Clean minimalist composition, warm welcoming natural lighting, premium unboxing aesthetic --ar 1:1 --no plastic bubble wrap, damaged box, barcode clutter, neon colors
```

---

## 3. Opsi Banner Infografis Terpadu (`16:9`)

```text
An ultra-wide editorial 3D isometric timeline illustration showing a seamless 7-step fashion manufacturing process journey: 1. Trend research desk, 2. Design sketch moodboard, 3. Prototype sampling, 4. Modern boutique factory production, 5. Quality control station, 6. Photo studio display, and 7. Packaged delivery boxes. Connected by a subtle flowing ribbon curve.

Render Style: Clean minimalist matte clay render, architectural model aesthetic, non-glossy finish.
Color Palette: Doff Navy (#1B2E4B), Warm Terracotta (#C27B66), Cream Linen base (#F8FAFC), and Muted Slate (#475569). Isometric 45-degree angle, soft ambient occlusion, elegant studio lighting, ultra clean, 8k resolution --ar 16:9 --no text, noisy textures, neon glossy reflections
```

---

## 4. Panduan Integrasi ke Kode React Aktual

1. Konversi hasil gambar ke format `.webp` dan simpan di:
   `public/assets/workflow/workflow-step-1.webp` hingga `workflow-step-7.webp`.
2. Daftarkan path gambar (`imageSrc`) pada array `WORKFLOW_STEPS` di [`resources/js/data/SevineProfileData.ts`](../resources/js/data/SevineProfileData.ts).
3. Render gambar pada [`resources/js/classic/workflow-process/WorkflowStepCard.tsx`](../resources/js/classic/workflow-process/WorkflowStepCard.tsx) dengan `width`, `height`, `loading="lazy"`, dan `decoding="async"`.
