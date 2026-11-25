import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { ProductCatalogGridItem } from './cards/ProductCatalogGridItem';
import { SEVINE_CATALOG_PRODUCTS } from './data/ProductCatalogData';
import { ProductCatalogDetailModal } from './modal/ProductCatalogDetailModal';
import { ProductCatalogInteractiveView } from './ProductCatalogInteractiveView';
import { CatalogBrand, CatalogCategory, CatalogProductItem } from './types/ProductCatalogTypes';

interface ProductCatalogSectionProps {
  id?: string;
  showFilters?: boolean;
  maxPreviewCount?: number;
  onViewMoreProducts?: () => void;
  products?: CatalogProductItem[];
  categoryOptions?: Array<{ id: CatalogCategory; label: string }>;
  brandOptions?: Array<{ id: CatalogBrand; name: string; subtitle: string }>;
}

const CatalogSectionHeader: React.FC<{ headingId: string; catalogCount: number; isPreview: boolean }> = ({
  headingId,
  catalogCount,
  isPreview,
}) => (
  <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
    <div className="max-w-2xl space-y-3">
      <div className="text-xs font-bold text-doff-terracotta uppercase tracking-wider">Katalog Terkurasi</div>
      <h2 id={headingId} className="text-2xl sm:text-4xl font-extrabold text-doff-navy tracking-tight">
        Etalase Produk Sevine Indonesia
      </h2>
      <p className="text-sm text-slate-600 leading-relaxed font-normal">
        {isPreview
          ? 'Jelajahi pilihan produk tas & apparel unggulan dari 5 brand resmi CV. Sevine Indonesia untuk kebutuhan ritel maupun grosir B2B langsung dari pabrik.'
          : 'Jelajahi koleksi produk tas & apparel dengan penerapan filter ala Shopee. Belanja ritel resmi via Shopee Official Store atau konsultasi grosir B2B langsung dari pabrik.'}
      </p>
    </div>
    <div className="inline-flex items-center px-3.5 py-2 rounded-lg bg-white border border-slate-200/90 shadow-doff-sm text-xs font-semibold text-doff-navy self-start md:self-auto shrink-0">
      <span>{catalogCount} Produk Terkurasi</span>
    </div>
  </div>
);

export const ProductCatalogSection: React.FC<ProductCatalogSectionProps> = ({
  id = 'portfolio',
  showFilters = true,
  maxPreviewCount,
  onViewMoreProducts,
  products = SEVINE_CATALOG_PRODUCTS,
  categoryOptions,
  brandOptions,
}) => {
  const [selectedProduct, setSelectedProduct] = useState<CatalogProductItem | null>(null);
  const previewProducts = maxPreviewCount ? products.slice(0, maxPreviewCount) : products;

  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="relative py-16 md:py-24 bg-textile-texture overflow-hidden">
      <div className="section-seam-blur-top" />
      <div className="section-seam-blur-bottom" />
      <div className="w-full max-w-7xl 2xl:max-w-[1680px] mx-auto px-3.5 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 space-y-8">
        <CatalogSectionHeader headingId={`${id}-heading`} catalogCount={products.length} isPreview={!showFilters} />
        {showFilters ? (
          <ProductCatalogInteractiveView
            products={products}
            categoryOptions={categoryOptions}
            brandOptions={brandOptions}
          />
        ) : (
          <div className="space-y-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-5">
              {previewProducts.map((product) => (
                <ProductCatalogGridItem key={product.id} product={product} onSelect={setSelectedProduct} />
              ))}
            </div>
            {onViewMoreProducts && (
              <div className="pt-2 flex flex-col items-center gap-3 text-center">
                <p className="text-xs text-slate-500 font-medium">
                  Menampilkan {previewProducts.length} dari {products.length} produk tersedia
                </p>
                <button
                  type="button"
                  onClick={onViewMoreProducts}
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-lg bg-[#9E4738] hover:bg-[#863A2D] text-white text-sm font-bold shadow-doff-lg ring-4 ring-[#C27B66]/25 hover:ring-[#C27B66]/45 transition-all duration-200 cursor-pointer"
                >
                  <span>Lihat produk lainnya</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
            <ProductCatalogDetailModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
          </div>
        )}
      </div>
    </section>
  );
};
