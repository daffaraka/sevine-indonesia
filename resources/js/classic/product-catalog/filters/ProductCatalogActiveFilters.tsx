import React, { useState } from 'react';
import { Check, Link2, RotateCcw, X } from 'lucide-react';
import {
  CATALOG_CATEGORY_OPTIONS,
  SERVICE_FILTER_OPTIONS,
  SHIPPING_ORIGIN_OPTIONS,
} from '../data/ProductCatalogOptions';
import { formatRupiah } from '../hooks/ProductCatalogFilterUtils';
import {
  ActiveFilterChip,
  CatalogBrand,
  CatalogCategory,
  CatalogFilterState,
  ServiceFilterState,
  ShippingOrigin,
} from '../types/ProductCatalogTypes';

interface ProductCatalogActiveFiltersProps {
  filterState: CatalogFilterState;
  activeFilterCount: number;
  categoryOptions?: Array<{ id: CatalogCategory; label: string }>;
  onRemoveCategory: (cat: CatalogCategory) => void;
  onRemoveBrand: (brand: CatalogBrand) => void;
  onRemoveShippingOrigin: (origin: ShippingOrigin) => void;
  onToggleService: (key: keyof ServiceFilterState) => void;
  onClearPriceRange: () => void;
  onClearMinRating: () => void;
  onClearSearchQuery: () => void;
  onResetAllFilters: () => void;
}

const buildFilterChips = (props: ProductCatalogActiveFiltersProps): ActiveFilterChip[] => {
  const { filterState, categoryOptions = CATALOG_CATEGORY_OPTIONS } = props;
  const chips: ActiveFilterChip[] = [];

  if (filterState.searchQuery.trim()) {
    chips.push({
      key: 'search',
      label: `Cari: "${filterState.searchQuery}"`,
      toneClass: 'bg-slate-200/80 text-doff-navy font-medium',
      onRemove: props.onClearSearchQuery,
    });
  }

  filterState.selectedCategories.forEach((catId) => {
    const label = categoryOptions.find((c) => c.id === catId)?.label || catId;
    chips.push({ key: `cat-${catId}`, label, toneClass: 'bg-slate-200/80 text-doff-navy font-medium', onRemove: () => props.onRemoveCategory(catId) });
  });

  filterState.selectedBrands.forEach((brandId) => {
    chips.push({ key: `brand-${brandId}`, label: brandId, toneClass: 'bg-doff-navy/10 text-doff-navy font-bold', onRemove: () => props.onRemoveBrand(brandId) });
  });

  if (filterState.minPrice !== null || filterState.maxPrice !== null) {
    const minText = filterState.minPrice !== null ? formatRupiah(filterState.minPrice) : 'Rp 0';
    const maxText = filterState.maxPrice !== null ? formatRupiah(filterState.maxPrice) : '∞';
    chips.push({ key: 'price', label: `${minText} - ${maxText}`, toneClass: 'bg-slate-200/80 text-doff-navy font-medium', onRemove: props.onClearPriceRange });
  }

  filterState.shippingOrigins.forEach((originId) => {
    const label = SHIPPING_ORIGIN_OPTIONS.find((o) => o.id === originId)?.label || originId;
    chips.push({ key: `origin-${originId}`, label, toneClass: 'bg-slate-200/80 text-doff-navy font-medium', onRemove: () => props.onRemoveShippingOrigin(originId) });
  });

  SERVICE_FILTER_OPTIONS.forEach((srv) => {
    if (filterState.services[srv.key]) {
      chips.push({ key: `srv-${srv.key}`, label: srv.label, toneClass: srv.chipToneClass, onRemove: () => props.onToggleService(srv.key) });
    }
  });

  if (filterState.minRating !== null) {
    chips.push({
      key: 'rating',
      label: filterState.minRating === 5 ? '5 Bintang' : `${filterState.minRating}+ Bintang`,
      toneClass: 'bg-amber-100 text-amber-900 font-bold',
      onRemove: props.onClearMinRating,
    });
  }

  return chips;
};

export const ProductCatalogActiveFilters: React.FC<ProductCatalogActiveFiltersProps> = (props) => {
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  if (props.activeFilterCount === 0) return null;
  const chips = buildFilterChips(props);

  const handleCopyFilteredUrl = async () => {
    if (typeof window === 'undefined' || !navigator.clipboard) return;
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      window.setTimeout(() => setCopiedLink(false), 2000);
    } catch {
      // Abaikan bila izin clipboard diblokir browser
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2 pt-1 pb-2">
      <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Filter Aktif:</span>
      {chips.map((chip) => (
        <span key={chip.key} className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs ${chip.toneClass}`}>
          {chip.label}
          <button type="button" onClick={chip.onRemove} aria-label={`Hapus filter ${chip.label}`} className="hover:text-red-500">
            <X className="w-3 h-3" />
          </button>
        </span>
      ))}
      <button type="button" onClick={props.onResetAllFilters} className="text-xs font-semibold text-doff-terracotta hover:underline inline-flex items-center gap-1 ml-1">
        <RotateCcw className="w-3 h-3" />
        <span>Reset Semua</span>
      </button>
      <button
        type="button"
        onClick={handleCopyFilteredUrl}
        className="text-xs font-semibold text-doff-navy hover:text-doff-terracotta inline-flex items-center gap-1 ml-auto px-2.5 py-1 rounded-md bg-white border border-slate-200 transition-colors"
      >
        {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Link2 className="w-3.5 h-3.5" />}
        <span>{copiedLink ? 'Tautan Disalin' : 'Salin Tautan'}</span>
      </button>
    </div>
  );
};
