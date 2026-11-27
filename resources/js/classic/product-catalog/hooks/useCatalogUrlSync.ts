import { useEffect, useRef } from 'react';
import { INITIAL_SERVICE_FILTERS } from '../data/ProductCatalogOptions';
import {
  CatalogBrand,
  CatalogCategory,
  CatalogFilterState,
  CatalogSortOption,
  CatalogViewMode,
  ServiceFilterState,
  ShippingOrigin,
} from '../types/ProductCatalogTypes';

export interface CatalogUrlSyncState {
  filterState: CatalogFilterState;
  sortOption: CatalogSortOption;
  viewMode: CatalogViewMode;
  currentPage: number;
}

const VALID_SORTS: CatalogSortOption[] = [
  'relevance',
  'top_sales',
  'newest',
  'price_asc',
  'price_desc',
  'rating_desc',
];

const VALID_ORIGINS: ShippingOrigin[] = ['ngawi', 'jakarta', 'solo'];
const VALID_SERVICES: Array<keyof ServiceFilterState> = [
  'freeShipping',
  'cod',
  'readyStock',
  'b2bWholesale',
  'officialStore',
];

const splitParam = (value: string | null): string[] =>
  value ? value.split(',').map((item) => item.trim()).filter(Boolean) : [];

const parsePositiveNumber = (value: string | null): number | null => {
  if (!value) return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : null;
};

export function parseCatalogUrlState(search = ''): CatalogUrlSyncState {
  const params = new URLSearchParams(search);
  const serviceKeys = splitParam(params.get('services'));
  const services: ServiceFilterState = { ...INITIAL_SERVICE_FILTERS };
  serviceKeys.forEach((key) => {
    if (VALID_SERVICES.includes(key as keyof ServiceFilterState)) {
      services[key as keyof ServiceFilterState] = true;
    }
  });

  const rawSort = params.get('sort') as CatalogSortOption | null;
  const sortOption: CatalogSortOption =
    rawSort && VALID_SORTS.includes(rawSort) ? rawSort : 'relevance';

  const rawView = params.get('view');
  const viewMode: CatalogViewMode = rawView === 'list' ? 'list' : 'column';

  const rawPage = Number(params.get('page'));
  const currentPage = Number.isInteger(rawPage) && rawPage >= 1 ? rawPage : 1;

  const shippingOrigins = splitParam(params.get('origin')).filter((item): item is ShippingOrigin =>
    VALID_ORIGINS.includes(item as ShippingOrigin),
  );

  return {
    filterState: {
      searchQuery: params.get('q') ?? '',
      selectedCategories: splitParam(params.get('category')) as CatalogCategory[],
      selectedBrands: splitParam(params.get('brand')) as CatalogBrand[],
      minPrice: parsePositiveNumber(params.get('minPrice')),
      maxPrice: parsePositiveNumber(params.get('maxPrice')),
      shippingOrigins,
      services,
      minRating: parsePositiveNumber(params.get('rating')),
    },
    sortOption,
    viewMode,
    currentPage,
  };
}

export function buildCatalogQueryString(state: CatalogUrlSyncState): string {
  const params = new URLSearchParams();
  const { filterState, sortOption, viewMode, currentPage } = state;

  if (filterState.searchQuery.trim()) params.set('q', filterState.searchQuery.trim());
  if (filterState.selectedCategories.length > 0) {
    params.set('category', filterState.selectedCategories.join(','));
  }
  if (filterState.selectedBrands.length > 0) {
    params.set('brand', filterState.selectedBrands.join(','));
  }
  if (filterState.shippingOrigins.length > 0) {
    params.set('origin', filterState.shippingOrigins.join(','));
  }
  if (filterState.minPrice !== null) params.set('minPrice', String(filterState.minPrice));
  if (filterState.maxPrice !== null) params.set('maxPrice', String(filterState.maxPrice));
  if (filterState.minRating !== null) params.set('rating', String(filterState.minRating));

  const enabledServices = VALID_SERVICES.filter((key) => filterState.services[key]);
  if (enabledServices.length > 0) params.set('services', enabledServices.join(','));
  if (sortOption !== 'relevance') params.set('sort', sortOption);
  if (viewMode !== 'column') params.set('view', viewMode);
  if (currentPage > 1) params.set('page', String(currentPage));

  const serialized = params.toString();
  return serialized ? `?${serialized}` : '';
}

export function useCatalogUrlSync(
  enabled: boolean,
  state: CatalogUrlSyncState,
  onExternalStateChange: (nextState: CatalogUrlSyncState) => void,
): void {
  const lastSearchRef = useRef<string>(state.filterState.searchQuery);

  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;
    const isTypingSearch = lastSearchRef.current !== state.filterState.searchQuery;
    lastSearchRef.current = state.filterState.searchQuery;

    const commitUrl = () => {
      const nextQuery = buildCatalogQueryString(state);
      const nextUrl = `${window.location.pathname}${nextQuery}${window.location.hash}`;
      const currentUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`;
      if (nextUrl !== currentUrl) {
        window.history.replaceState(window.history.state, '', nextUrl);
      }
    };

    if (isTypingSearch) {
      const timer = window.setTimeout(commitUrl, 250);
      return () => window.clearTimeout(timer);
    }
    commitUrl();
  }, [enabled, state]);

  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;
    const handlePopState = () => {
      onExternalStateChange(parseCatalogUrlState(window.location.search));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [enabled, onExternalStateChange]);
}
