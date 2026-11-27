import React from 'react';
import { scrollToSmoothTarget } from '../../hooks/useSmoothScroll';
import { ProductCatalogPagination } from './cards/ProductCatalogPagination';
import { ProductCatalogResultsGrid } from './cards/ProductCatalogResultsGrid';
import { SEVINE_CATALOG_PRODUCTS } from './data/ProductCatalogData';
import { ProductCatalogActiveFilters } from './filters/ProductCatalogActiveFilters';
import {
  ProductCatalogFilterDrawer,
  ProductCatalogFilterSidebar,
} from './filters/ProductCatalogFilterContainers';
import { ProductCatalogTopToolbar } from './filters/ProductCatalogTopToolbar';
import { useProductCatalogFilter } from './hooks/useProductCatalogFilter';
import { ProductCatalogDetailModal } from './modal/ProductCatalogDetailModal';
import { CatalogBrand, CatalogCategory, CatalogProductItem } from './types/ProductCatalogTypes';

interface ProductCatalogInteractiveViewProps {
  products?: CatalogProductItem[];
  categoryOptions?: Array<{ id: CatalogCategory; label: string }>;
  brandOptions?: Array<{ id: CatalogBrand; name: string; subtitle: string }>;
  syncWithUrl?: boolean;
}

export const ProductCatalogInteractiveView: React.FC<ProductCatalogInteractiveViewProps> = ({
  products = SEVINE_CATALOG_PRODUCTS,
  categoryOptions,
  brandOptions,
  syncWithUrl = true,
}) => {
  const catalog = useProductCatalogFilter(products, syncWithUrl);

  const handlePageChange = (page: number) => {
    catalog.goToPage(page);
    scrollToSmoothTarget('catalog-toolbar-anchor');
  };

  const sharedFilterProps = {
    filterState: catalog.filterState,
    activeFilterCount: catalog.activeFilterCount,
    categoryOptions,
    brandOptions,
    onToggleCategory: catalog.toggleCategory,
    onToggleBrand: catalog.toggleBrand,
    onToggleShippingOrigin: catalog.toggleShippingOrigin,
    onToggleService: catalog.toggleService,
    onSetPriceRange: catalog.setPriceRange,
    onSetMinRating: catalog.setMinRating,
    onResetAllFilters: catalog.resetAllFilters,
  };

  return (
    <div id="catalog-toolbar-anchor" className="space-y-4">
      <ProductCatalogTopToolbar
        searchQuery={catalog.filterState.searchQuery}
        onSearchChange={catalog.setSearchQuery}
        sortOption={catalog.sortOption}
        onSortChange={catalog.setSortOption}
        viewMode={catalog.viewMode}
        onViewModeChange={catalog.setViewMode}
        onOpenMobileFilter={() => catalog.setIsMobileFilterOpen(true)}
        activeFilterCount={catalog.activeFilterCount}
        filteredCount={catalog.filteredCount}
      />

      <ProductCatalogActiveFilters
        filterState={catalog.filterState}
        activeFilterCount={catalog.activeFilterCount}
        categoryOptions={categoryOptions}
        onRemoveCategory={catalog.toggleCategory}
        onRemoveBrand={catalog.toggleBrand}
        onRemoveShippingOrigin={catalog.toggleShippingOrigin}
        onToggleService={catalog.toggleService}
        onClearPriceRange={() => catalog.setPriceRange(null, null)}
        onClearMinRating={() => catalog.setMinRating(null)}
        onClearSearchQuery={() => catalog.setSearchQuery('')}
        onResetAllFilters={catalog.resetAllFilters}
      />

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start pt-2">
        <div className="hidden lg:block">
          <ProductCatalogFilterSidebar {...sharedFilterProps} />
        </div>
        <div className="flex-1 w-full min-w-0 space-y-5">
          <ProductCatalogResultsGrid
            isFiltering={catalog.isFiltering}
            viewMode={catalog.viewMode}
            products={catalog.paginatedProducts}
            onResetFilters={catalog.resetAllFilters}
            onSelectProduct={catalog.setSelectedProductModal}
          />
          {!catalog.isFiltering && (
            <ProductCatalogPagination
              totalItems={catalog.filteredCount}
              rangeStart={catalog.rangeStart}
              rangeEnd={catalog.rangeEnd}
              currentPage={catalog.currentPage}
              totalPages={catalog.totalPages}
              pageSize={catalog.pageSize}
              remainingCount={catalog.remainingCount}
              onPageChange={handlePageChange}
              onPageSizeChange={catalog.setPageSize}
              onLoadMore={catalog.loadMoreProducts}
            />
          )}
        </div>
      </div>

      <ProductCatalogFilterDrawer
        isOpen={catalog.isMobileFilterOpen}
        onClose={() => catalog.setIsMobileFilterOpen(false)}
        filteredCount={catalog.filteredCount}
        {...sharedFilterProps}
      />

      <ProductCatalogDetailModal
        product={catalog.selectedProductModal}
        onClose={() => catalog.setSelectedProductModal(null)}
      />
    </div>
  );
};
