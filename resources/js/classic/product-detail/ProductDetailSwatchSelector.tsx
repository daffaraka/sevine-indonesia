import React from 'react';
import { ProductColorSwatch } from '../product-catalog/types/ProductCatalogTypes';

interface ProductDetailSwatchSelectorProps {
  swatches: ProductColorSwatch[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}

export const ProductDetailSwatchSelector: React.FC<ProductDetailSwatchSelectorProps> = ({
  swatches,
  selectedIndex,
  onSelect,
}) => {
  if (swatches.length === 0) return null;
  const activeSwatch = swatches[selectedIndex];

  return (
    <div className="space-y-2.5 pt-1 border-t border-slate-100">
      <div className="text-xs font-semibold text-slate-600">
        Pilihan Warna:{' '}
        <strong className="text-doff-navy">{activeSwatch?.name}</strong>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {swatches.map((swatch, idx) => {
          const isSelected = idx === selectedIndex;
          return (
            <button
              key={`${swatch.name}-${swatch.hex}-${idx}`}
              type="button"
              onClick={() => onSelect(idx)}
              aria-pressed={isSelected}
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-xs border transition-colors min-h-[36px] ${
                isSelected
                  ? 'border-doff-navy bg-doff-navy/5 font-bold text-doff-navy'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-slate-400'
              }`}
            >
              <span
                className="w-3.5 h-3.5 rounded-full border border-slate-300 shrink-0"
                style={{ backgroundColor: swatch.hex }}
              />
              <span>{swatch.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
