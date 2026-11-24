import {
  AdminBrandItem,
  AdminCareerItem,
  AdminCategoryItem,
  AdminEventItem,
  AdminMenuMeta,
  AdminPartnerItem,
  AdminProductItem,
  AdminRoleItem,
} from '../types/AdminDashboardTypes';
import {
  ALL_PARTNER_BRANDS,
  BRAND_ITEMS,
  OFFLINE_EVENTS,
} from '../data/SevineProfileData';

export const ADMIN_MENU_DEFINITIONS: AdminMenuMeta[] = [
  {
    key: 'overview',
    label: 'Ringkasan Utama',
    title: 'Ringkasan Utama & Operasional',
    group: 'OVERVIEW',
  },
  {
    key: 'monitoring',
    label: 'Statistik Kunjungan',
    title: 'Laporan Kunjungan & Kondisi Website',
    group: 'OVERVIEW',
  },
  {
    key: 'products',
    label: 'Katalog Produk',
    title: 'Master Katalog Produk B2B & Ritel',
    group: 'MASTER DATA',
  },
  {
    key: 'categories',
    label: 'Kategori Produk',
    title: 'Manajemen Kategori Produk',
    group: 'MASTER DATA',
  },
  {
    key: 'brands',
    label: '5 Brand Ekosistem',
    title: '5 Brand Ekosistem Sevine',
    group: 'MASTER DATA',
  },
  {
    key: 'careers',
    label: 'Lowongan Kerja',
    title: 'Manajemen Lowongan Kerja',
    group: 'PUBLIKASI & REKRUTMEN',
  },
  {
    key: 'events',
    label: 'Dokumentasi Event',
    title: 'Dokumentasi Pameran & Event Publik',
    group: 'PUBLIKASI & REKRUTMEN',
  },
  {
    key: 'collaborations',
    label: 'Mitra Kolaborasi',
    title: 'Kemitraan & Klien Korporasi (B2B)',
    group: 'PUBLIKASI & REKRUTMEN',
  },
  {
    key: 'access',
    label: 'Hak Akses & Role',
    title: 'Pengaturan Hak Akses Staf (RBAC)',
    group: 'PENGATURAN',
  },
];

export const INITIAL_ADMIN_CATEGORIES: AdminCategoryItem[] = [
  {
    id: 'cat-backpack',
    name: 'Tas Harian (Backpack)',
    description: 'Tas punggung tahan air dan fungsional untuk kampus & kerja.',
    isActive: true,
  },
  {
    id: 'cat-crossbody',
    name: 'Tas Harian (Crossbody)',
    description: 'Sling bag dan messenger compact dengan jahitan bar-tack.',
    isActive: true,
  },
  {
    id: 'cat-satchel',
    name: 'Tas Wanita (Satchel)',
    description: 'Koleksi tas wanita elegan berbahan kulit sintetis matte.',
    isActive: true,
  },
  {
    id: 'cat-apparel',
    name: 'Apparel Basic Timeless',
    description: 'Pakaian basic berbahan katun breathable potongan timeless.',
    isActive: true,
  },
  {
    id: 'cat-muslim-pria',
    name: 'Busana Muslim Pria',
    description: 'Kurta, koko modern, dan busana ibadah pria regular-fit.',
    isActive: true,
  },
  {
    id: 'cat-muslim-wanita',
    name: 'Busana Muslim Wanita',
    description: 'Abaya, gamis, dan tunik muslimah wudhu-friendly.',
    isActive: true,
  },
];

export const INITIAL_ADMIN_PRODUCTS: AdminProductItem[] = [
  {
    id: 1,
    sku: 'SVN-BAG-091',
    name: 'Nomad Waterproof Roll-Top 28L',
    brand: 'SEVINE',
    category: 'Tas Harian (Backpack)',
    swatches: [
      { name: 'Navy Doff', hex: '#1B2E4B' },
      { name: 'Slate Grey', hex: '#475569' },
      { name: 'Midnight', hex: '#132238' },
    ],
    capacity: '1.200 pcs/bln',
    status: 'Produksi Aktif',
    description: 'Backpack roll-top berbahan Cordura 1000D dengan kompartemen laptop 16 inci.',
    images: ['/assets/brands/logo-sevine-1.webp'],
  },
  {
    id: 2,
    sku: 'KLU-APP-014',
    name: 'Raw Textured Heavy Cotton Overshirt',
    brand: 'klou',
    category: 'Apparel Basic Timeless',
    swatches: [
      { name: 'Broken White', hex: '#F8FAFC' },
      { name: 'Cool Mist', hex: '#CBD5E1' },
      { name: 'Navy Doff', hex: '#1B2E4B' },
    ],
    capacity: '2.500 pcs/bln',
    status: 'Produksi Aktif',
    description: 'Overshirt katun bio-wash 24s dengan siluet boxy modern.',
    images: ['/assets/brands/logo-brand-klou.webp'],
  },
  {
    id: 3,
    sku: 'LLN-BAG-033',
    name: 'Aura Structured Minimalist Satchel',
    brand: 'LALUNA',
    category: 'Tas Wanita (Satchel)',
    swatches: [
      { name: 'Wine Rose', hex: '#8F3B4A' },
      { name: 'Pearl', hex: '#E2E8F0' },
      { name: 'Warm Sand', hex: '#C5A880' },
    ],
    capacity: '900 pcs/bln',
    status: 'Review QC',
    description: 'Satchel kulit vegan matte dengan hardware gold redup.',
    images: ['/assets/brands/logo-brand-laluna.webp'],
  },
  {
    id: 4,
    sku: 'ASF-MSL-008',
    name: 'Signature Shanghai Linen Kurta Top',
    brand: 'ASSAIF',
    category: 'Busana Muslim Pria',
    swatches: [
      { name: 'Teak Brown', hex: '#8A5B38' },
      { name: 'Charcoal Slate', hex: '#475569' },
      { name: 'Soft Linen', hex: '#EEF2F6' },
    ],
    capacity: '1.500 pcs/bln',
    status: 'Produksi Aktif',
    description: 'Kurta kerah shanghai berbahan Toyobo Fodu adem tidak mudah kusut.',
    images: ['/assets/brands/logo-brand-assaif.webp'],
  },
  {
    id: 5,
    sku: 'NBR-MSL-021',
    name: 'Flowy Voile Tiered Abaya Dress',
    brand: 'NABIRA',
    category: 'Busana Muslim Wanita',
    swatches: [
      { name: 'Dusty Plum', hex: '#8B6E8C' },
      { name: 'Navy Doff', hex: '#1B2E4B' },
      { name: 'Silver Mist', hex: '#CBD5E1' },
    ],
    capacity: '800 pcs/bln',
    status: 'Draft Sampling',
    description: 'Abaya crinkle airflow ironless dengan bukaan lengan wudhu-friendly.',
    images: ['/assets/brands/logo-brand-nabira.webp'],
  },
  {
    id: 6,
    sku: 'SVN-BAG-105',
    name: 'Compact Bar-Tack Cordura Sling Pack',
    brand: 'SEVINE',
    category: 'Tas Harian (Crossbody)',
    swatches: [
      { name: 'Navy Doff', hex: '#1B2E4B' },
      { name: 'Terracotta', hex: '#C27B66' },
      { name: 'Slate Grey', hex: '#475569' },
    ],
    capacity: '3.000 pcs/bln',
    status: 'Produksi Aktif',
    description: 'Sling pack harian ringkas dengan resleting water-repellent.',
    images: ['/assets/brands/logo-sevine-2.webp'],
  },
];

const BRAND_KEY_MAP: Record<string, AdminBrandItem['key']> = {
  sevine: 'SEVINE',
  klou: 'klou',
  laluna: 'LALUNA',
  assaif: 'ASSAIF',
  nabira: 'NABIRA',
};

const BRAND_SHOPEE_URLS: Record<string, string> = {
  sevine: 'https://shopee.co.id/sevine.id',
  klou: 'https://shopee.co.id/klou.official',
  laluna: 'https://shopee.co.id/laluna.indonesia',
  assaif: 'https://shopee.co.id/assaif.official',
  nabira: 'https://shopee.co.id/nabira.official',
};

export const INITIAL_ADMIN_BRANDS: AdminBrandItem[] = BRAND_ITEMS.map((b) => ({
  id: b.id,
  key: BRAND_KEY_MAP[b.id] || 'SEVINE',
  name: b.name,
  tagline: b.tagline,
  description: b.description,
  targetMarket: b.targetMarket,
  badgeColor: b.badgeColor,
  shopeeUrl: BRAND_SHOPEE_URLS[b.id] || 'https://shopee.co.id/sevine.id',
}));

export const INITIAL_ADMIN_EVENTS: AdminEventItem[] = OFFLINE_EVENTS.map((e) => ({
  id: e.id,
  title: e.title,
  location: e.location,
  year: e.year,
  description: e.description,
  images: [e.image],
}));

export const INITIAL_ADMIN_CAREERS: AdminCareerItem[] = [
  {
    id: 'karir-01',
    title: 'Operator Jahit Bar-tack & High Speed',
    division: 'Produksi Manufaktur',
    location: 'Ngawi',
    employmentType: 'Full-time',
    qualifications:
      '<ul><li>Pengalaman minimal <strong>1 tahun</strong> di garment/konveksi tas atau apparel.</li><li>Teliti, disiplin, dan siap bekerja dengan target tim produksi.</li></ul>',
    responsibilities:
      '<ul><li>Menjahit komponen tas dan apparel sesuai standar QC Sevine.</li><li>Melakukan perawatan ringan mesin jahit harian sebelum dan sesudah shift.</li></ul>',
    googleFormUrl: 'https://forms.gle/sevine-karir-produksi',
    isActive: true,
    updatedAt: '12 Nov 2026',
  },
  {
    id: 'karir-02',
    title: 'Fashion & Product Graphic Designer',
    division: 'Kreatif & Branding',
    location: 'Malang',
    employmentType: 'Full-time',
    qualifications:
      '<ul><li>Menguasai <strong>Adobe Illustrator / Figma</strong>.</li><li>Memahami estetika brand lokal serta memiliki portofolio lookbook/katalog.</li></ul>',
    responsibilities:
      '<ul><li>Merancang materi visual katalog dan kemasan untuk brand SEVINE, klou, dan LALUNA.</li><li>Menyiapkan aset desain kampanye digital bersama tim marketing.</li></ul>',
    googleFormUrl: 'https://forms.gle/sevine-karir-desain',
    isActive: true,
    updatedAt: '10 Nov 2026',
  },
  {
    id: 'karir-03',
    title: 'Staff Quality Control & Packaging',
    division: 'Quality Assurance',
    location: 'Ngawi',
    employmentType: 'Full-time',
    qualifications:
      '<ul><li>Teliti memeriksa detail jahitan, kesesuaian pola, serta kelengkapan hangtag.</li><li>Terbiasa bekerja rapi di lingkungan lini packing pabrik.</li></ul>',
    responsibilities:
      '<ul><li>Melakukan sortir mutu akhir pada setiap batch produksi.</li><li>Mencatat laporan temuan cacat minor sebelum barang dikirim ke gudang.</li></ul>',
    googleFormUrl: 'https://forms.gle/sevine-karir-qc',
    isActive: true,
    updatedAt: '08 Nov 2026',
  },
  {
    id: 'karir-04',
    title: 'Social Media & Live Commerce Host',
    division: 'Digital Marketing',
    location: 'Malang',
    employmentType: 'Part-time',
    qualifications:
      '<ul><li>Komunikatif dan percaya diri di depan kamera.</li><li>Terbiasa memandu sesi live <strong>TikTok / Shopee</strong> dan memahami produk fashion.</li></ul>',
    responsibilities:
      '<ul><li>Membawakan sesi live commerce harian untuk katalog brand Sevine.</li><li>Membantu produksi video pendek pengenalan produk baru.</li></ul>',
    googleFormUrl: 'https://forms.gle/sevine-karir-live',
    isActive: false,
    updatedAt: '02 Nov 2026',
  },
];

export const INITIAL_ADMIN_PARTNERS: AdminPartnerItem[] = ALL_PARTNER_BRANDS.map((p) => ({
  id: p.id,
  name: p.name,
  category: p.category,
  categoryLabel: p.categoryLabel,
  logo: p.logo,
  role: p.role,
  status: 'Mitra Aktif',
}));

export const INITIAL_ADMIN_ROLES: AdminRoleItem[] = [
  {
    id: 'role-admin',
    name: 'Admin',
    description:
      'Role default Spatie Permission dengan akses penuh ke seluruh modul operasional, katalog, publikasi, dan monitoring Sevine.',
    permissions: [
      'overview',
      'monitoring',
      'products',
      'categories',
      'brands',
      'careers',
      'events',
      'collaborations',
      'access',
    ],
    isSystem: true,
  },
];

export function exportRowsToCsv(
  filename: string,
  headers: string[],
  rows: string[][],
): void {
  const escapeCell = (value: string) => `"${value.replace(/"/g, '""')}"`;
  const csvLines = [
    headers.map(escapeCell).join(','),
    ...rows.map((row) => row.map(escapeCell).join(',')),
  ];
  const blob = new Blob(['\uFEFF' + csvLines.join('\n')], {
    type: 'text/csv;charset=utf-8;',
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
