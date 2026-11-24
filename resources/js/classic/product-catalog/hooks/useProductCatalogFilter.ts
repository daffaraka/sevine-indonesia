import { useEffect, useMemo, useRef, useState } from 'react';
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

const toggleItem = <T,>(list: T[], value: T): T[] =>
  list.includes(value) ? list.filter((item) => item !== value) : [...list, value];

export const useProductCatalogFilter = (products: CatalogProductItem[]) => {
  const [filterState, setFilterState] = useState<CatalogFilterState>(INITIAL_CATALOG_FILTER_STATE);
  const [sortOption, setSortOption] = useState<CatalogSortOption>('relevance');
  const [viewMode, setViewMode] = useState<CatalogViewMode>('column');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);
  const [selectedProductModal, setSelectedProductModal] = useState<CatalogProductItem | null>(null);
  const [isFiltering, setIsFiltering] = useState<boolean>(false);
  const isFirstRenderRef = useRef<boolean>(true);

  const activeFilterCount = useMemo(() => countActiveFilters(filterState), [filterState]);

  useEffect(() => {
    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false;
      return;
    }
    setIsFiltering(true);
    const timer = setTimeout(() => setIsFiltering(false), 300);
    return () => clearTimeout(timer);
  }, [filterState, sortOption]);

  const sortedProducts = useMemo(() => {
    const filtered =
      activeFilterCount === 0 ? products : filterCatalogProducts(products, filterState);
    return sortCatalogProducts(filtered, sortOption);
  }, [products, filterState, activeFilterCount, sortOption]);

  const setSearchQuery = (searchQuery: string) =>
    setFilterState((prev) => ({ ...prev, searchQuery }));

  const toggleCategory = (cat: CatalogCategory) =>
    setFilterState((prev) => ({
      ...prev,
      selectedCategories: cat === 'all' ? [] : toggleItem(prev.selectedCategories, cat),
    }));

  const toggleBrand = (brand: CatalogBrand) =>
    setFilterState((prev) => ({ ...prev, selectedBrands: toggleItem(prev.selectedBrands, brand) }));

  const toggleShippingOrigin = (origin: ShippingOrigin) =>
    setFilterState((prev) => ({
      ...prev,
      shippingOrigins: toggleItem(prev.shippingOrigins, origin),
    }));

  const toggleService = (key: keyof ServiceFilterState) =>
    setFilterState((prev) => ({
      ...prev,
      services: { ...prev.services, [key]: !prev.services[key] },
    }));

  const setPriceRange = (minPrice: number | null, maxPrice: number | null) =>
    setFilterState((prev) => ({ ...prev, minPrice, maxPrice }));

  const setMinRating = (minRating: number | null) =>
    setFilterState((prev) => ({ ...prev, minRating }));

  const resetAllFilters = () => {
    setFilterState(INITIAL_CATALOG_FILTER_STATE);
    setSortOption('relevance');
  };

  return {
    filterState,
    sortOption,
    viewMode,
    isMobileFilterOpen,
    selectedProductModal,
    sortedProducts,
    filteredCount: sortedProducts.length,
    activeFilterCount,
    isFiltering,
    setSortOption,
    setViewMode,
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
