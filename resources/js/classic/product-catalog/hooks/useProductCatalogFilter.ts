import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { INITIAL_CATALOG_FILTER_STATE } from '../data/ProductCatalogOptions';
import {
  CatalogBrand,
  CatalogCategory,
  CatalogFilterState,
  CatalogProductItem,
  CatalogSortOption,
  CatalogViewMode,
  ServiceFilterState,
  ShippingOrigin,
} from '../types/ProductCatalogTypes';
import {
  countActiveFilters,
  filterCatalogProducts,
  sortCatalogProducts,
} from './ProductCatalogFilterUtils';
import {
  CatalogUrlSyncState,
  parseCatalogUrlState,
  useCatalogUrlSync,
} from './useCatalogUrlSync';

const toggleItem = <T,>(list: T[], value: T): T[] =>
  list.includes(value) ? list.filter((item) => item !== value) : [...list, value];

export type CatalogPageSizeOption = 8 | 12 | 24 | 0;

export const useProductCatalogFilter = (
  products: CatalogProductItem[],
  syncWithUrl = true,
) => {
  const initialUrlState = useMemo(
    () =>
      syncWithUrl && typeof window !== 'undefined'
        ? parseCatalogUrlState(window.location.search)
        : null,
    [syncWithUrl],
  );

  const [filterState, setFilterState] = useState<CatalogFilterState>(
    () => initialUrlState?.filterState ?? INITIAL_CATALOG_FILTER_STATE,
  );
  const [sortOption, setSortOptionState] = useState<CatalogSortOption>(
    () => initialUrlState?.sortOption ?? 'relevance',
  );
  const [viewMode, setViewModeState] = useState<CatalogViewMode>(
    () => initialUrlState?.viewMode ?? 'column',
  );
  const [currentPage, setCurrentPageState] = useState<number>(
    () => initialUrlState?.currentPage ?? 1,
  );
  const [customPageSize, setCustomPageSize] = useState<CatalogPageSizeOption | null>(null);
  const [loadedPagesSpan, setLoadedPagesSpan] = useState<number>(1);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);
  const [selectedProductModal, setSelectedProductModal] = useState<CatalogProductItem | null>(null);
  const [isFiltering, setIsFiltering] = useState<boolean>(false);
  const isFirstRenderRef = useRef<boolean>(true);

  const activeFilterCount = useMemo(() => countActiveFilters(filterState), [filterState]);
  const pageSize: CatalogPageSizeOption = customPageSize ?? (viewMode === 'list' ? 8 : 12);

  useEffect(() => {
    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false;
      return;
    }
    setIsFiltering(true);
    const timer = window.setTimeout(() => setIsFiltering(false), 220);
    return () => window.clearTimeout(timer);
  }, [filterState, sortOption]);

  const sortedProducts = useMemo(() => {
    const filtered =
      activeFilterCount === 0 ? products : filterCatalogProducts(products, filterState);
    return sortCatalogProducts(filtered, sortOption);
  }, [products, filterState, activeFilterCount, sortOption]);

  const totalPages = pageSize === 0 ? 1 : Math.max(1, Math.ceil(sortedProducts.length / pageSize));
  const safePage = Math.min(Math.max(1, currentPage), totalPages);

  const { paginatedProducts, rangeStart, rangeEnd, remainingCount } = useMemo(() => {
    if (sortedProducts.length === 0) {
      return { paginatedProducts: [], rangeStart: 0, rangeEnd: 0, remainingCount: 0 };
    }
    if (pageSize === 0) {
      return {
        paginatedProducts: sortedProducts,
        rangeStart: 1,
        rangeEnd: sortedProducts.length,
        remainingCount: 0,
      };
    }
    const startIdx = (safePage - 1) * pageSize;
    const endIdx = Math.min(startIdx + pageSize * loadedPagesSpan, sortedProducts.length);
    return {
      paginatedProducts: sortedProducts.slice(startIdx, endIdx),
      rangeStart: startIdx + 1,
      rangeEnd: endIdx,
      remainingCount: Math.max(0, sortedProducts.length - endIdx),
    };
  }, [sortedProducts, pageSize, safePage, loadedPagesSpan]);

  const resetPaging = () => {
    setCurrentPageState(1);
    setLoadedPagesSpan(1);
  };

  const applyExternalUrlState = useCallback((next: CatalogUrlSyncState) => {
    setFilterState(next.filterState);
    setSortOptionState(next.sortOption);
    setViewModeState(next.viewMode);
    setCurrentPageState(next.currentPage);
    setLoadedPagesSpan(1);
  }, []);

  const urlSyncState = useMemo(
    () => ({ filterState, sortOption, viewMode, currentPage: safePage }),
    [filterState, sortOption, viewMode, safePage],
  );
  useCatalogUrlSync(syncWithUrl, urlSyncState, applyExternalUrlState);

  const updateFilter = (updater: (prev: CatalogFilterState) => CatalogFilterState) => {
    setFilterState(updater);
    resetPaging();
  };

  const setSearchQuery = (searchQuery: string) =>
    updateFilter((prev) => ({ ...prev, searchQuery }));
  const toggleCategory = (cat: CatalogCategory) =>
    updateFilter((prev) => ({
      ...prev,
      selectedCategories: cat === 'all' ? [] : toggleItem(prev.selectedCategories, cat),
    }));
  const toggleBrand = (brand: CatalogBrand) =>
    updateFilter((prev) => ({ ...prev, selectedBrands: toggleItem(prev.selectedBrands, brand) }));
  const toggleShippingOrigin = (origin: ShippingOrigin) =>
    updateFilter((prev) => ({
      ...prev,
      shippingOrigins: toggleItem(prev.shippingOrigins, origin),
    }));
  const toggleService = (key: keyof ServiceFilterState) =>
    updateFilter((prev) => ({
      ...prev,
      services: { ...prev.services, [key]: !prev.services[key] },
    }));
  const setPriceRange = (minPrice: number | null, maxPrice: number | null) =>
    updateFilter((prev) => ({ ...prev, minPrice, maxPrice }));
  const setMinRating = (minRating: number | null) =>
    updateFilter((prev) => ({ ...prev, minRating }));

  const setSortOption = (option: CatalogSortOption) => {
    setSortOptionState(option);
    resetPaging();
  };
  const setViewMode = (mode: CatalogViewMode) => {
    setViewModeState(mode);
    resetPaging();
  };
  const setPageSize = (size: CatalogPageSizeOption) => {
    setCustomPageSize(size);
    resetPaging();
  };
  const goToPage = (page: number) => {
    setCurrentPageState(Math.min(Math.max(1, page), totalPages));
    setLoadedPagesSpan(1);
  };
  const loadMoreProducts = () => setLoadedPagesSpan((span) => span + 1);
  const resetAllFilters = () => {
    setFilterState(INITIAL_CATALOG_FILTER_STATE);
    setSortOptionState('relevance');
    resetPaging();
  };

  return {
    filterState,
    sortOption,
    viewMode,
    isMobileFilterOpen,
    selectedProductModal,
    sortedProducts,
    paginatedProducts,
    filteredCount: sortedProducts.length,
    activeFilterCount,
    isFiltering,
    currentPage: safePage,
    totalPages,
    pageSize,
    rangeStart,
    rangeEnd,
    remainingCount,
    setSortOption,
    setViewMode,
    setPageSize,
    goToPage,
    loadMoreProducts,
    setIsMobileFilterOpen,
    setSelectedProductModal,
    setSearchQuery,
    toggleCategory,
    toggleBrand,
    toggleShippingOrigin,
    toggleService,
    setPriceRange,
    setMinRating,
    resetAllFilters,
  };
};
