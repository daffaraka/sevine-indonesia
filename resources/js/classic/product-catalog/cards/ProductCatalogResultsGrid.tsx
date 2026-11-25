import React from 'react';
import { Package } from 'lucide-react';
import { CatalogProductItem, CatalogViewMode } from '../types/ProductCatalogTypes';
import { ProductCatalogGridItem } from './ProductCatalogGridItem';
import { ProductCatalogListItem } from './ProductCatalogListItem';

const CatalogSkeleton: React.FC<{ viewMode: CatalogViewMode }> = ({ viewMode }) => {
  if (viewMode === 'column') {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-5 animate-pulse">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div key={idx} className="bg-white rounded-lg border border-slate-200/80 p-3 space-y-3 shadow-doff-sm">
            <div className="aspect-square w-full rounded-md bg-slate-200/80" />
            <div className="h-2.5 w-1/3 bg-slate-200 rounded" />
            <div className="h-3.5 w-4/5 bg-slate-200 rounded" />
            <div className="h-4 w-1/2 bg-slate-300 rounded" />
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="space-y-4 animate-pulse">
      {Array.from({ length: 4 }).map((_, idx) => (
        <div key={idx} className="bg-white rounded-lg border border-slate-200/80 p-4 flex flex-col md:flex-row gap-4 shadow-doff-sm">
          <div className="w-full md:w-52 h-44 bg-slate-200/80 rounded-md shrink-0" />
          <div className="flex-1 space-y-3 py-1">
            <div className="h-3 w-1/4 bg-slate-200 rounded" />
            <div className="h-4 w-3/4 bg-slate-200 rounded" />
            <div className="h-3 w-full bg-slate-100 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
};

const CatalogEmptyState: React.FC<{ onReset: () => void }> = ({ onReset }) => (
  <div className="bg-white rounded-lg border border-slate-200/90 p-12 text-center space-y-4 shadow-doff-sm">
    <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
      <Package className="w-6 h-6" />
    </div>
    <div className="space-y-1">
      <h4 className="text-base font-bold text-doff-navy">Tidak ada produk yang cocok</h4>
      <p className="text-xs text-slate-500 max-w-sm mx-auto">
        Coba sesuaikan kata kunci pencarian atau reset filter untuk melihat koleksi produk lainnya.
      </p>
    </div>
    <button type="button" onClick={onReset} className="px-4 py-2 text-xs font-bold bg-doff-navy text-white rounded-md hover:bg-doff-navydark transition-colors">
      Reset Semua Filter
    </button>
  </div>
);

interface ProductCatalogResultsGridProps {
  isFiltering: boolean;
  viewMode: CatalogViewMode;
  products: CatalogProductItem[];
  onResetFilters: () => void;
  onSelectProduct: (product: CatalogProductItem) => void;
}

export const ProductCatalogResultsGrid: React.FC<ProductCatalogResultsGridProps> = ({
  isFiltering,
  viewMode,
  products,
  onResetFilters,
  onSelectProduct,
}) => {
  if (isFiltering) return <CatalogSkeleton viewMode={viewMode} />;
  if (products.length === 0) return <CatalogEmptyState onReset={onResetFilters} />;

  if (viewMode === 'column') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 sm:gap-5 transition-opacity duration-300">
        {products.map((product) => (
          <ProductCatalogGridItem key={product.id} product={product} onSelect={onSelectProduct} />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4 transition-opacity duration-300">
      {products.map((product) => (
        <ProductCatalogListItem key={product.id} product={product} onSelect={onSelectProduct} />
      ))}
    </div>
  );
};
