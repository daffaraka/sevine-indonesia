export type CatalogBrand = 'SEVINE' | 'klou' | 'LALUNA' | 'ASSAIF' | 'NABIRA' | (string & {});

export type CatalogCategory =
  | 'all'
  | 'tas-backpack'
  | 'tas-sling'
  | 'tas-wanita'
  | 'apparel'
  | 'muslim-pria'
  | 'muslim-wanita'
  | (string & {});

export type ShippingOrigin = 'ngawi' | 'jakarta' | 'solo';

export interface ProductColorSwatch {
  name: string;
  hex: string;
}

export interface CatalogProductItem {
  id: string;
  numericId?: number;
  sku: string;
  title: string;
  brand: CatalogBrand;
  category: CatalogCategory;
  categoryLabel: string;
  price: number;
  originalPrice: number;
  discountPercentage: number;
  rating: number;
  ratingCount: number;
  soldCount: number;
  soldLabel: string;
  location: string;
  shippingOrigin: ShippingOrigin;
  shippingOriginLabel: string;
  image: string;
  gallery: string[];
  description: string;
  features: string[];
  swatches: ProductColorSwatch[];
  isOfficial: boolean;
  isFreeShipping: boolean;
  isCod: boolean;
  isReadyStock: boolean;
  isB2BReady: boolean;
  wholesalePrice: number;
  minWholesaleQty: number;
  shopeeUrl: string;
  viewsCount?: number;
}

export interface ServiceFilterState {
  freeShipping: boolean;
  cod: boolean;
  readyStock: boolean;
  b2bWholesale: boolean;
  officialStore: boolean;
}

export interface CatalogFilterState {
  searchQuery: string;
  selectedCategories: CatalogCategory[];
  selectedBrands: CatalogBrand[];
  minPrice: number | null;
  maxPrice: number | null;
  shippingOrigins: ShippingOrigin[];
  services: ServiceFilterState;
  minRating: number | null;
}

export type CatalogSortOption =
  | 'relevance'
  | 'top_sales'
  | 'newest'
  | 'price_asc'
  | 'price_desc'
  | 'rating_desc';

export type CatalogViewMode = 'column' | 'list';

export interface ActiveFilterChip {
  key: string;
  label: string;
  toneClass: string;
  onRemove: () => void;
}
