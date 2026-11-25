import React, { useState } from 'react';
import {
  CATALOG_BRAND_OPTIONS,
  CATALOG_CATEGORY_OPTIONS,
  SERVICE_FILTER_OPTIONS,
  SHIPPING_ORIGIN_OPTIONS,
} from '../data/ProductCatalogOptions';
import {
  CatalogBrand, CatalogCategory, CatalogFilterState, ServiceFilterState, ShippingOrigin,
} from '../types/ProductCatalogTypes';
import { CheckboxOptionList, FilterSection } from './ProductCatalogFilterPrimitives';
import { PriceRangeFilter, RatingFilter } from './ProductCatalogPriceRatingFilter';

export interface ProductCatalogFilterPanelProps {
  filterState: CatalogFilterState;
  categoryOptions?: Array<{ id: CatalogCategory; label: string }>;
  brandOptions?: Array<{ id: CatalogBrand; name: string; subtitle: string }>;
  onToggleCategory: (cat: CatalogCategory) => void;
  onToggleBrand: (brand: CatalogBrand) => void;
  onToggleShippingOrigin: (origin: ShippingOrigin) => void;
  onToggleService: (key: keyof ServiceFilterState) => void;
  onSetPriceRange: (min: number | null, max: number | null) => void;
  onSetMinRating: (rating: number | null) => void;
}

export const ProductCatalogFilterPanel: React.FC<ProductCatalogFilterPanelProps> = ({
  filterState,
  categoryOptions = CATALOG_CATEGORY_OPTIONS,
  brandOptions = CATALOG_BRAND_OPTIONS,
  onToggleCategory,
  onToggleBrand,
  onToggleShippingOrigin,
  onToggleService,
  onSetPriceRange,
  onSetMinRating,
}) => {
  const [open, setOpen] = useState<Record<string, boolean>>({
    category: true, brand: true, price: true, shipping: true, rating: true,
  });
  const toggle = (key: string) => setOpen((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="space-y-5">
      <FilterSection title="Kategori Produk" isOpen={open.category} onToggle={() => toggle('category')}>
        <CheckboxOptionList
          items={categoryOptions.map((cat) => ({
            id: cat.id,
            label: cat.label,
            checked: cat.id === 'all' ? filterState.selectedCategories.length === 0 : filterState.selectedCategories.includes(cat.id),
            onChange: () => onToggleCategory(cat.id),
          }))}
        />
      </FilterSection>

      <FilterSection title="5 Brand Sevine" isOpen={open.brand} onToggle={() => toggle('brand')}>
        <CheckboxOptionList
          spacing="space-y-2"
          items={brandOptions.map((brand) => ({
            id: brand.id,
            label: brand.name,
            subtitle: brand.subtitle,
            checked: filterState.selectedBrands.includes(brand.id),
            onChange: () => onToggleBrand(brand.id),
          }))}
        />
      </FilterSection>

      <FilterSection title="Rentang Harga" isOpen={open.price} onToggle={() => toggle('price')}>
        <PriceRangeFilter minPrice={filterState.minPrice} maxPrice={filterState.maxPrice} onApply={onSetPriceRange} />
      </FilterSection>

      <FilterSection title="Lokasi & Layanan" isOpen={open.shipping} onToggle={() => toggle('shipping')}>
        <div className="space-y-4 pt-1">
          <div>
            <span className="text-[11px] font-semibold text-slate-500 block mb-1">Asal Pengiriman:</span>
            <CheckboxOptionList
              items={SHIPPING_ORIGIN_OPTIONS.map((origin) => ({
                id: origin.id,
                label: origin.label,
                checked: filterState.shippingOrigins.includes(origin.id),
                onChange: () => onToggleShippingOrigin(origin.id),
              }))}
            />
          </div>
          <div className="pt-2 border-t border-slate-100">
            <span className="text-[11px] font-semibold text-slate-500 block mb-1">Layanan Khusus:</span>
            <CheckboxOptionList
              items={SERVICE_FILTER_OPTIONS.map((srv) => ({
                id: srv.key,
                label: srv.label,
                checked: filterState.services[srv.key],
                onChange: () => onToggleService(srv.key),
              }))}
            />
          </div>
        </div>
      </FilterSection>

      <FilterSection title="Penilaian Produk" isOpen={open.rating} onToggle={() => toggle('rating')} hasBorder={false}>
        <RatingFilter minRating={filterState.minRating} onSelect={onSetMinRating} />
      </FilterSection>
    </div>
  );
};
