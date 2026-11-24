import React from 'react';
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

export const ProductCatalogInteractiveView: React.FC = () => {
  const catalog = useProductCatalogFilter(SEVINE_CATALOG_PRODUCTS);

  const sharedFilterProps = {
    filterState: catalog.filterState,
    activeFilterCount: catalog.activeFilterCount,
    onToggleCategory: catalog.toggleCategory,
    onToggleBrand: catalog.toggleBrand,
    onToggleShippingOrigin: catalog.toggleShippingOrigin,
    onToggleService: catalog.toggleService,
    onSetPriceRange: catalog.setPriceRange,
    onSetMinRating: catalog.setMinRating,
    onResetAllFilters: catalog.resetAllFilters,
  };

  return (
    <div className="space-y-4">
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
        <div className="flex-1 w-full min-w-0">
          <ProductCatalogResultsGrid
            isFiltering={catalog.isFiltering}
            viewMode={catalog.viewMode}
            products={catalog.sortedProducts}
            onResetFilters={catalog.resetAllFilters}
            onSelectProduct={catalog.setSelectedProductModal}
          />
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
