import React from 'react';
import { Link } from '@inertiajs/react';
import { ExternalLink, MapPin } from 'lucide-react';
import {
  getProductDetailPath,
  recordPublicClick,
} from '../../../services/PublicTelemetryService';
import { formatRupiah } from '../hooks/ProductCatalogFilterUtils';
import { CatalogProductItem } from '../types/ProductCatalogTypes';
import {
  ProductRatingMeta,
  ProductThumbnailBox,
} from './ProductCatalogCardParts';

interface ProductCatalogGridItemProps {
  product: CatalogProductItem;
  onSelect: (product: CatalogProductItem) => void;
}

export const ProductCatalogGridItem: React.FC<ProductCatalogGridItemProps> = ({
  product,
  onSelect,
}) => (
  <article
    onClick={() => onSelect(product)}
    className="group bg-white rounded-lg border border-slate-200/90 shadow-doff-sm doff-card-hover flex flex-col justify-between overflow-hidden cursor-pointer"
  >
    <div>
      <ProductThumbnailBox product={product} className="aspect-square w-full" showHoverOverlay />
      <div className="p-3.5 space-y-2">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-doff-terracotta">
            {product.brand}
          </span>
          <span className="text-[10px] font-mono text-slate-400 truncate">
            {product.sku}
          </span>
        </div>
        <h3 className="text-xs sm:text-sm font-semibold text-doff-navy line-clamp-2 leading-snug">
          <Link
            href={getProductDetailPath(product.sku)}
            onClick={(e) => e.stopPropagation()}
            className="hover:text-doff-terracotta transition-colors"
          >
            {product.title}
          </Link>
        </h3>
        <div className="pt-0.5">
          <div className="text-sm sm:text-base font-extrabold text-doff-navy">
            {formatRupiah(product.price)}
          </div>
          {product.originalPrice > product.price && (
            <div className="text-[10px] text-slate-400 line-through">
              {formatRupiah(product.originalPrice)}
            </div>
          )}
        </div>
      </div>
    </div>

    <div className="p-3.5 pt-0 space-y-2">
      <div className="flex items-center justify-between pt-1 border-t border-slate-100">
        <ProductRatingMeta product={product} />
        <div className="flex items-center gap-0.5 text-slate-400 text-[10px]">
          <MapPin className="w-3 h-3 shrink-0" />
          <span className="truncate max-w-[80px]">{product.location}</span>
        </div>
      </div>
      <a
        href={product.shopeeUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => {
          e.stopPropagation();
          recordPublicClick('shopee', { productId: product.numericId });
        }}
        className="w-full py-1.5 px-2 bg-slate-50 hover:bg-doff-navy hover:text-white text-doff-navy text-[11px] font-bold rounded-md border border-slate-200 flex items-center justify-center gap-1.5 sevine-btn-motion"
      >
        <span>Beli di Shopee</span>
        <ExternalLink className="w-3 h-3 sevine-arrow-shift" />
      </a>
    </div>
  </article>
);
