import {
  CatalogBrand,
  CatalogCategory,
  CatalogFilterState,
  CatalogSortOption,
  ServiceFilterState,
  ShippingOrigin,
} from '../types/ProductCatalogTypes';

export const INITIAL_SERVICE_FILTERS: ServiceFilterState = {
  freeShipping: false,
  cod: false,
  readyStock: false,
  b2bWholesale: false,
  officialStore: false,
};

export const INITIAL_CATALOG_FILTER_STATE: CatalogFilterState = {
  searchQuery: '',
  selectedCategories: [],
  selectedBrands: [],
  minPrice: null,
  maxPrice: null,
  shippingOrigins: [],
  services: INITIAL_SERVICE_FILTERS,
  minRating: null,
};

export const CATALOG_CATEGORY_OPTIONS: Array<{ id: CatalogCategory; label: string }> = [
  { id: 'all', label: 'Semua Kategori' },
  { id: 'tas-backpack', label: 'Tas Ransel & Laptop' },
  { id: 'tas-sling', label: 'Tas Slempang & Pouch' },
  { id: 'tas-wanita', label: 'Koleksi Tas Wanita' },
  { id: 'apparel', label: 'Pakaian Basic & Timeless' },
  { id: 'muslim-pria', label: 'Busana Muslim Pria' },
  { id: 'muslim-wanita', label: 'Busana Muslim Perempuan' },
];

export const CATALOG_BRAND_OPTIONS: Array<{ id: CatalogBrand; name: string; subtitle: string }> = [
  { id: 'SEVINE', name: 'SEVINE', subtitle: 'Tas Kasual & Fungsional' },
  { id: 'klou', name: 'klou', subtitle: 'Pakaian Basic Timeless' },
  { id: 'LALUNA', name: 'LALUNA', subtitle: 'Tas Wanita Elegan' },
  { id: 'ASSAIF', name: 'ASSAIF', subtitle: 'Busana Muslim Pria' },
  { id: 'NABIRA', name: 'NABIRA', subtitle: 'Busana Muslimah' },
];

export const SHIPPING_ORIGIN_OPTIONS: Array<{ id: ShippingOrigin; label: string }> = [
  { id: 'ngawi', label: 'Pabrik Ngawi, Jatim (Pusat)' },
  { id: 'jakarta', label: 'DKI Jakarta (Hub Logistik)' },
  { id: 'solo', label: 'Solo / D.I. Yogyakarta' },
];

export const SERVICE_FILTER_OPTIONS: Array<{
  key: keyof ServiceFilterState;
  label: string;
  chipToneClass: string;
}> = [
  { key: 'officialStore', label: 'Official Store Sevine', chipToneClass: 'bg-doff-terracotta/10 text-doff-terracotta font-bold' },
  { key: 'cod', label: 'COD (Bayar di Tempat)', chipToneClass: 'bg-slate-200/80 text-doff-navy font-medium' },
  { key: 'readyStock', label: 'Ready Stock Pabrik', chipToneClass: 'bg-slate-200/80 text-doff-navy font-medium' },
  { key: 'b2bWholesale', label: 'Grosir & B2B Ready', chipToneClass: 'bg-blue-100 text-blue-800 font-bold' },
];

export const CATALOG_SORT_TABS: Array<{ id: CatalogSortOption; label: string }> = [
  { id: 'relevance', label: 'Terkait' },
  { id: 'top_sales', label: 'Terlaris' },
  { id: 'newest', label: 'Terbaru' },
  { id: 'price_asc', label: 'Harga Terendah' },
  { id: 'price_desc', label: 'Harga Tertinggi' },
];
