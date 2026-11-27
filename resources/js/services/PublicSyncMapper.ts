import { SEVINE_CATALOG_PRODUCTS } from '../classic/product-catalog/data/ProductCatalogData';
import {
  CATALOG_BRAND_OPTIONS,
  CATALOG_CATEGORY_OPTIONS,
} from '../classic/product-catalog/data/ProductCatalogOptions';
import {
  CatalogBrand,
  CatalogCategory,
  CatalogProductItem,
  ShippingOrigin,
} from '../classic/product-catalog/types/ProductCatalogTypes';
import {
  ALL_PARTNER_BRANDS,
  BRAND_ITEMS,
  CLIENT_PARTNER_GROUPS,
  FAQ_ITEMS,
  OFFLINE_EVENTS,
  TESTIMONIALS_LIST,
} from '../data/SevineProfileData';
import {
  BrandItem,
  CareerPublicItem,
  ClientPartnerGroup,
  FaqItem,
  OfflineEvent,
  PartnerBrandItem,
  TestimonialItem,
} from '../types/CompanyProfileTypes';

export interface BackendBrand {
  id: number | string;
  key: string;
  name: string;
  category: 'bag' | 'apparel' | 'muslim-wear';
  tagline: string;
  description: string;
  target_market: string;
  highlight_points?: string[] | null;
  badge_color?: string | null;
  logo_path?: string | null;
  shopee_url?: string | null;
}

export interface BackendCategory {
  id: number | string;
  slug: string;
  name: string;
  description?: string | null;
  is_active?: boolean;
}

export interface BackendProduct {
  id: number | string;
  sku: string;
  name: string;
  capacity?: string | null;
  price?: number | null;
  status: string;
  description?: string | null;
  features?: string[] | null;
  shipping_origin?: ShippingOrigin | null;
  is_b2b_ready?: boolean;
  shopee_url?: string | null;
  views_count?: number | null;
  brand?: {
    id: number | string;
    key: string;
    name: string;
    shopee_url?: string | null;
  } | null;
  category?: {
    id: number | string;
    slug: string;
    name: string;
  } | null;
  swatches?: Array<{ name: string; hex_code: string }> | null;
  images?: Array<{ image_path: string; is_primary?: boolean }> | null;
}

export interface BackendEvent {
  id: number | string;
  slug?: string;
  title: string;
  location: string;
  year_label: string;
  description: string;
  images?: Array<{ image_path: string; is_cover?: boolean; caption?: string | null }> | null;
}

export interface BackendPartner {
  id: number | string;
  name: string;
  category: string;
  category_label: string;
  logo_path?: string | null;
  role_scope?: string | null;
  status?: string;
}

export interface BackendCareer {
  id: number | string;
  slug: string;
  title: string;
  division: string;
  location: string;
  employment_type: string;
  qualifications_html: string;
  responsibilities_html: string;
  google_form_url: string;
  updated_at?: string | null;
}

export interface BackendTestimonial {
  id: number | string;
  author: string;
  review_date_label: string;
  rating: number;
  content: string;
  highlight_aspect: string;
  screenshot_image?: string | null;
  buyer_photos?: string[] | null;
  platform?: string | null;
}

export interface BackendFaq {
  id: number | string;
  question: string;
  answer: string;
  category: 'maklon' | 'reseller' | 'umum';
}

const SHIPPING_ORIGIN_LABEL_MAP: Record<ShippingOrigin, { location: string; label: string }> = {
  ngawi: { location: 'Kab. Ngawi', label: 'Pabrik Pusat Ngawi' },
  jakarta: { location: 'DKI Jakarta', label: 'Hub Logistik Jakarta' },
  solo: { location: 'Solo / DIY', label: 'Hub Solo & Yogyakarta' },
};

const STATIC_PRODUCT_BY_SKU = new Map(
  SEVINE_CATALOG_PRODUCTS.map((item) => [item.sku.toUpperCase(), item]),
);

const STATIC_BRAND_BY_KEY = new Map(
  BRAND_ITEMS.map((item) => [item.id.toUpperCase(), item]),
);

export function mapBrandsFromDb(rows?: BackendBrand[]): BrandItem[] {
  if (!rows || rows.length === 0) return BRAND_ITEMS;
  return rows.map((row) => {
    const fallback = STATIC_BRAND_BY_KEY.get((row.key || '').toUpperCase());
    return {
      id: row.key || String(row.id),
      key: row.key,
      name: row.name,
      category: row.category || 'bag',
      tagline: row.tagline,
      description: row.description,
      highlightPoints:
        row.highlight_points && row.highlight_points.length > 0
          ? row.highlight_points
          : fallback?.highlightPoints ?? [],
      badgeColor: row.badge_color || fallback?.badgeColor || 'bg-doff-navy text-white',
      targetMarket: row.target_market || fallback?.targetMarket || '',
      imageUrl: row.logo_path || fallback?.imageUrl || '/assets/brands/logo-sevine-1.webp',
      imageAlt: `${row.name} — ${row.tagline}`,
      shopeeUrl: row.shopee_url || fallback?.shopeeUrl,
    };
  });
}

export function mapCatalogBrandOptionsFromDb(
  rows?: BackendBrand[],
): Array<{ id: CatalogBrand; name: string; subtitle: string }> {
  if (!rows || rows.length === 0) return CATALOG_BRAND_OPTIONS;
  return rows.map((row) => ({
    id: row.key as CatalogBrand,
    name: row.name,
    subtitle: row.tagline,
  }));
}

export function mapCatalogCategoryOptionsFromDb(
  rows?: BackendCategory[],
): Array<{ id: CatalogCategory; label: string }> {
  if (!rows || rows.length === 0) return CATALOG_CATEGORY_OPTIONS;
  return [
    { id: 'all', label: 'Semua Kategori' },
    ...rows.map((row) => ({
      id: (row.slug || row.name) as CatalogCategory,
      label: row.name,
    })),
  ];
}

function parseSoldCountFromText(text?: string | null): number | null {
  if (!text) return null;
  const normalized = text.toLowerCase().replace(/\s+/g, '');
  const rbMatch = normalized.match(/(\d+(?:[.,]\d+)?)rb/);
  if (rbMatch) {
    return Math.round(parseFloat(rbMatch[1].replace(',', '.')) * 1000);
  }
  const numMatch = normalized.match(/(\d+(?:[.,]\d+)?)/);
  if (!numMatch) return null;
  return parseInt(numMatch[1].replace(/[.,]/g, ''), 10) || null;
}

function formatSoldLabel(capacity?: string | null): string {
  if (!capacity || capacity === '-') return 'Ready Produksi';
  return /terjual/i.test(capacity) ? capacity : `Kapasitas ${capacity}`;
}

export function mapSingleProductFromDb(row: BackendProduct): CatalogProductItem {
  const staticMatch = STATIC_PRODUCT_BY_SKU.get((row.sku || '').toUpperCase());
  const origin: ShippingOrigin = row.shipping_origin || staticMatch?.shippingOrigin || 'ngawi';
  const originMeta = SHIPPING_ORIGIN_LABEL_MAP[origin] || SHIPPING_ORIGIN_LABEL_MAP.ngawi;
  const gallery =
    row.images && row.images.length > 0
      ? row.images.map((img) => img.image_path)
      : staticMatch?.gallery ?? ['/assets/brands/logo-sevine-1.webp'];
  const primaryImage =
    row.images?.find((img) => img.is_primary)?.image_path || gallery[0];

  const swatches =
    row.swatches && row.swatches.length > 0
      ? row.swatches.map((s) => ({ name: s.name, hex: s.hex_code }))
      : staticMatch?.swatches ?? [];

  const features =
    row.features && row.features.length > 0
      ? row.features
      : staticMatch?.features ?? (row.capacity ? [`Kapasitas ${row.capacity}`] : []);

  const hasDbPrice = typeof row.price === 'number' && row.price > 0;
  const resolvedPrice = hasDbPrice ? row.price! : (staticMatch?.price ?? 149000);
  const resolvedOriginalPrice = hasDbPrice
    ? resolvedPrice
    : (staticMatch?.originalPrice ?? 189000);
  const resolvedDiscount = hasDbPrice ? 0 : (staticMatch?.discountPercentage ?? 21);
  const parsedSoldCount = parseSoldCountFromText(row.capacity);
  const parsedNumericId = Number(row.id);

  return {
    id: `db-prod-${row.id}`,
    numericId: Number.isFinite(parsedNumericId) && parsedNumericId > 0 ? parsedNumericId : undefined,
    sku: row.sku,
    title: row.name,
    brand: (row.brand?.key || staticMatch?.brand || 'SEVINE') as CatalogBrand,
    category: (row.category?.slug || staticMatch?.category || 'all') as CatalogCategory,
    categoryLabel: row.category?.name || staticMatch?.categoryLabel || 'Produk Sevine',
    price: resolvedPrice,
    originalPrice: resolvedOriginalPrice,
    discountPercentage: resolvedDiscount,
    rating: staticMatch?.rating ?? 4.9,
    ratingCount: staticMatch?.ratingCount ?? 120,
    soldCount: parsedSoldCount ?? staticMatch?.soldCount ?? 500,
    soldLabel: staticMatch?.soldLabel ?? formatSoldLabel(row.capacity),
    location: originMeta.location,
    shippingOrigin: origin,
    shippingOriginLabel: originMeta.label,
    image: primaryImage,
    gallery,
    description: row.description || staticMatch?.description || '',
    features,
    swatches,
    isOfficial: true,
    isFreeShipping: true,
    isCod: true,
    isReadyStock: row.status === 'Produksi Aktif',
    isB2BReady: row.is_b2b_ready ?? true,
    wholesalePrice: hasDbPrice
      ? Math.round((resolvedPrice * 0.8) / 100) * 100
      : (staticMatch?.wholesalePrice ?? 115000),
    minWholesaleQty: staticMatch?.minWholesaleQty ?? 12,
    shopeeUrl: row.shopee_url || row.brand?.shopee_url || staticMatch?.shopeeUrl || 'https://shopee.co.id/sevine.id',
    viewsCount: typeof row.views_count === 'number' ? row.views_count : undefined,
  };
}

export function mapProductsFromDb(rows?: BackendProduct[]): CatalogProductItem[] {
  if (!rows || rows.length === 0) return SEVINE_CATALOG_PRODUCTS;
  return rows.map(mapSingleProductFromDb);
}

export function mapRelatedProductsFromDb(rows?: BackendProduct[]): CatalogProductItem[] {
  if (!rows || rows.length === 0) return [];
  return rows.map(mapSingleProductFromDb);
}

const FALLBACK_EVENT_GALLERY = [
  'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?w=800&auto=format&fit=crop&q=80',
];

export function mapEventsFromDb(rows?: BackendEvent[]): OfflineEvent[] {
  if (!rows || rows.length === 0) return OFFLINE_EVENTS;
  return rows.map((row) => {
    const orderedImages = [...(row.images ?? [])].sort((a, b) => Number(Boolean(b.is_cover)) - Number(Boolean(a.is_cover)));
    const validPaths = orderedImages
      .map((img) => img.image_path)
      .filter((path): path is string => Boolean(path) && !path.startsWith('blob:'));

    const gallery = validPaths.length > 0 ? validPaths : FALLBACK_EVENT_GALLERY;
    const cover = gallery[0];

    return {
      id: String(row.id),
      title: row.title,
      location: row.location,
      year: row.year_label,
      image: cover,
      gallery,
      imageAlt: `${row.title} — ${row.location}`,
      description: row.description,
    };
  });
}

const STATIC_PARTNER_BY_NAME = new Map(
  ALL_PARTNER_BRANDS.map((item) => [item.name.toLowerCase(), item]),
);

export function mapPartnersFromDb(rows?: BackendPartner[]): {
  allBrands: PartnerBrandItem[];
  groups: ClientPartnerGroup[];
} {
  if (!rows || rows.length === 0) {
    return { allBrands: ALL_PARTNER_BRANDS, groups: CLIENT_PARTNER_GROUPS };
  }

  const allBrands: PartnerBrandItem[] = rows.map((row) => {
    const staticMatch = STATIC_PARTNER_BY_NAME.get((row.name || '').toLowerCase());
    return {
      id: staticMatch?.id || `db-partner-${row.id}`,
      name: row.name,
      category: row.category,
      categoryLabel: row.category_label,
      logo: row.logo_path || staticMatch?.logo || '/assets/brands/logo-wardah.webp',
      imageAlt: staticMatch?.imageAlt || `Logo Mitra ${row.name}`,
      role: row.role_scope || staticMatch?.role || 'Mitra Kolaborasi Sevine',
    };
  });

  const groupedMap = new Map<string, ClientPartnerGroup>();
  allBrands.forEach((partner) => {
    const key = partner.categoryLabel || partner.category;
    const existing = groupedMap.get(key);
    const item = {
      id: partner.id,
      name: partner.name,
      logo: partner.logo,
      imageAlt: partner.imageAlt,
      role: partner.role,
    };

    if (existing) {
      existing.clients.push(partner.name);
      existing.partnerItems?.push(item);
    } else {
      groupedMap.set(key, {
        category: key,
        subtitle: `Mitra ${key} Terverifikasi`,
        clients: [partner.name],
        partnerItems: [item],
      });
    }
  });

  return {
    allBrands,
    groups: Array.from(groupedMap.values()),
  };
}

export function mapCareerFromDb(row: BackendCareer): CareerPublicItem {
  return {
    id: String(row.id),
    slug: row.slug,
    title: row.title,
    division: row.division,
    location: row.location,
    employmentType: row.employment_type,
    qualificationsHtml: row.qualifications_html,
    responsibilitiesHtml: row.responsibilities_html,
    googleFormUrl: row.google_form_url,
    updatedAt: row.updated_at ? new Date(row.updated_at).toLocaleDateString('id-ID') : undefined,
  };
}

export function mapCareersFromDb(rows?: BackendCareer[]): CareerPublicItem[] {
  if (!rows) return [];
  return rows.map(mapCareerFromDb);
}

export function mapTestimonialsFromDb(rows?: BackendTestimonial[]): TestimonialItem[] {
  if (!rows || rows.length === 0) return TESTIMONIALS_LIST;
  return rows.map((row) => ({
    id: String(row.id),
    author: row.author,
    date: row.review_date_label,
    rating: row.rating,
    content: row.content,
    highlightAspect: row.highlight_aspect,
    screenshotImage: row.screenshot_image || '',
    imageAlt: `Tangkapan layar ulasan dari ${row.author}`,
    buyerPhotos: row.buyer_photos || undefined,
    platform: row.platform || 'Shopee Official Shop',
  }));
}

export function mapFaqsFromDb(rows?: BackendFaq[]): FaqItem[] {
  if (!rows || rows.length === 0) return FAQ_ITEMS;
  return rows.map((row) => ({
    id: String(row.id),
    question: row.question,
    answer: row.answer,
    category: row.category || 'umum',
  }));
}
