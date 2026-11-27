import React from 'react';
import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import { getProductDetailPath } from '../../services/PublicTelemetryService';
import { formatRupiah } from '../product-catalog/hooks/ProductCatalogFilterUtils';
import { CatalogProductItem } from '../product-catalog/types/ProductCatalogTypes';

interface ProductRelatedGridProps {
  products: CatalogProductItem[];
  categorySlug: string;
  categoryLabel: string;
}

export const ProductRelatedGrid: React.FC<ProductRelatedGridProps> = ({
  products,
  categorySlug,
  categoryLabel,
}) => {
  if (products.length === 0) return null;

  return (
    <section aria-labelledby="related-products-heading" className="pt-8 sm:pt-10 border-t border-slate-200/80 space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div className="space-y-1">
          <div className="text-[11px] font-bold uppercase tracking-wider text-doff-terracotta">
            Rekomendasi Katalog
          </div>
          <h2 id="related-products-heading" className="text-lg sm:text-2xl font-extrabold text-doff-navy">
            Produk Sejenis Lainnya
          </h2>
        </div>
        <Link
          href={`/catalog?category=${encodeURIComponent(categorySlug)}`}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-doff-navy hover:text-doff-terracotta transition-colors"
        >
          <span>Lihat Koleksi {categoryLabel}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5">
        {products.map((item) => (
          <Link
            key={item.id}
            href={getProductDetailPath(item.sku)}
            className="group bg-white rounded-lg border border-slate-200/90 shadow-doff-sm doff-card-hover overflow-hidden flex flex-col justify-between"
          >
            <div>
              <div className="aspect-square w-full bg-slate-100 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  width={500}
                  height={500}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover sevine-photo-zoom"
                />
              </div>
              <div className="p-3.5 space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-doff-terracotta">
                    {item.brand}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 truncate">{item.sku}</span>
                </div>
                <h3 className="text-xs sm:text-sm font-semibold text-doff-navy line-clamp-2 leading-snug group-hover:text-doff-terracotta transition-colors">
                  {item.title}
                </h3>
              </div>
            </div>
            <div className="px-3.5 pb-3.5 pt-1 flex items-center justify-between gap-2 border-t border-slate-100">
              <span className="text-sm font-extrabold text-doff-navy">
                {formatRupiah(item.price)}
              </span>
              <span className="text-[11px] font-medium text-slate-500 truncate">
                {item.soldLabel}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
