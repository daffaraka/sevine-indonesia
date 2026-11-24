import {
  CatalogFilterState,
  CatalogProductItem,
  CatalogSortOption,
  ServiceFilterState,
} from '../types/ProductCatalogTypes';

export const formatRupiah = (amount: number): string =>
  `Rp ${amount.toLocaleString('id-ID')}`;

const matchesSearchQuery = (item: CatalogProductItem, rawQuery: string): boolean => {
  const query = rawQuery.trim().toLowerCase();
  if (!query) return true;
  return (
    item.title.toLowerCase().includes(query) ||
    item.brand.toLowerCase().includes(query) ||
    item.sku.toLowerCase().includes(query) ||
    item.categoryLabel.toLowerCase().includes(query)
  );
};

const matchesServices = (item: CatalogProductItem, services: ServiceFilterState): boolean => {
  const checks: Array<[boolean, boolean]> = [
    [services.freeShipping, item.isFreeShipping],
    [services.cod, item.isCod],
    [services.readyStock, item.isReadyStock],
    [services.b2bWholesale, item.isB2BReady],
    [services.officialStore, item.isOfficial],
  ];
  return checks.every(([enabled, value]) => !enabled || value);
};

export const filterCatalogProducts = (
  products: CatalogProductItem[],
  filterState: CatalogFilterState,
): CatalogProductItem[] =>
  products.filter((item) => {
    if (!matchesSearchQuery(item, filterState.searchQuery)) return false;
    if (
      filterState.selectedCategories.length > 0 &&
      !filterState.selectedCategories.includes(item.category)
    ) {
      return false;
    }
    if (
      filterState.selectedBrands.length > 0 &&
      !filterState.selectedBrands.includes(item.brand)
    ) {
      return false;
    }
    if (filterState.minPrice !== null && item.price < filterState.minPrice) return false;
    if (filterState.maxPrice !== null && item.price > filterState.maxPrice) return false;
    if (
      filterState.shippingOrigins.length > 0 &&
      !filterState.shippingOrigins.includes(item.shippingOrigin)
    ) {
      return false;
    }
    if (!matchesServices(item, filterState.services)) return false;
    if (filterState.minRating !== null && item.rating < filterState.minRating) return false;
    return true;
  });

const SORT_COMPARATORS: Record<
  Exclude<CatalogSortOption, 'relevance'>,
  (a: CatalogProductItem, b: CatalogProductItem) => number
> = {
  top_sales: (a, b) => b.soldCount - a.soldCount,
  newest: (a, b) => b.id.localeCompare(a.id),
  price_asc: (a, b) => a.price - b.price,
  price_desc: (a, b) => b.price - a.price,
  rating_desc: (a, b) => b.rating - a.rating,
};

export const sortCatalogProducts = (
  products: CatalogProductItem[],
  sortOption: CatalogSortOption,
): CatalogProductItem[] => {
  if (sortOption === 'relevance') return [...products];
  return [...products].sort(SORT_COMPARATORS[sortOption]);
};

export const countActiveFilters = (filterState: CatalogFilterState): number => {
  let count = 0;
  if (filterState.searchQuery.trim()) count += 1;
  count += filterState.selectedCategories.length;
  count += filterState.selectedBrands.length;
  count += filterState.shippingOrigins.length;
  if (filterState.minPrice !== null || filterState.maxPrice !== null) count += 1;
  if (filterState.minRating !== null) count += 1;
  count += Object.values(filterState.services).filter(Boolean).length;
  return count;
};
