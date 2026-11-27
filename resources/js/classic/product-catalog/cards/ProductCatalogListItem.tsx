import React from 'react';
import { Link } from '@inertiajs/react';
import { ArrowUpRight, ExternalLink, Eye, ShieldCheck } from 'lucide-react';
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

interface ProductCatalogListItemProps {
  product: CatalogProductItem;
  onSelect: (product: CatalogProductItem) => void;
}

export const ProductCatalogListItem: React.FC<ProductCatalogListItemProps> = ({
  product,
  onSelect,
}) => (
  <article
    onClick={() => onSelect(product)}
    className="group bg-white rounded-lg border border-slate-200/90 shadow-doff-sm hover:border-slate-300 hover:shadow-doff-md transition-all duration-300 p-3 sm:p-4 flex flex-col md:flex-row gap-4 sm:gap-6 cursor-pointer"
  >
    <ProductThumbnailBox product={product} imageSize={400} className="w-full md:w-52 h-48 md:h-full aspect-square shrink-0 rounded-md" />

    <div className="flex-1 space-y-2">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-100 text-doff-navy rounded uppercase tracking-wider">{product.brand}</span>
        <span className="text-[10px] font-mono font-semibold text-slate-500">SKU: {product.sku}</span>
        <span className="text-[10px] text-slate-400">•</span>
        <span className="text-[10px] text-slate-500 font-medium">{product.categoryLabel}</span>
      </div>
      <h3 className="text-sm sm:text-base font-bold text-doff-navy">
        <Link
          href={getProductDetailPath(product.sku)}
          onClick={(e) => e.stopPropagation()}
          className="hover:text-doff-terracotta transition-colors"
        >
          {product.title}
        </Link>
      </h3>
      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{product.description}</p>
      <div className="flex flex-wrap gap-1.5 pt-1">
        {product.features.slice(0, 3).map((feat, idx) => (
          <span key={idx} className="text-[10px] font-medium px-2 py-0.5 bg-slate-50 text-slate-600 rounded border border-slate-200">
            ✓ {feat}
          </span>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-4 pt-2">
        <ProductRatingMeta product={product} showRatingCount />
      </div>
    </div>

    <div className="w-full md:w-56 shrink-0 flex flex-col justify-between border-t md:border-t-0 md:border-l border-slate-100 pt-3 md:pt-0 md:pl-5 space-y-3">
      <div className="space-y-1">
        <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Harga Ritel</div>
        <div className="text-lg sm:text-xl font-extrabold text-doff-navy">{formatRupiah(product.price)}</div>
        {product.originalPrice > product.price && (
          <div className="text-xs text-slate-400 line-through">{formatRupiah(product.originalPrice)}</div>
        )}
        {product.isB2BReady && (
          <div className="p-2 rounded-md bg-slate-50 border border-slate-200/80 mt-2">
            <div className="text-[10px] font-bold text-doff-terracotta flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              <span>Pricelist Grosir B2B</span>
            </div>
            <div className="text-xs font-extrabold text-doff-navy pt-0.5">
              {formatRupiah(product.wholesalePrice)} <span className="text-[10px] font-normal text-slate-500">/pcs</span>
            </div>
            <div className="text-[9px] text-slate-500">Min. {product.minWholesaleQty} pcs</div>
          </div>
        )}
      </div>
      <div className="space-y-2 pt-2">
        <div className="grid grid-cols-2 gap-1.5">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(product);
            }}
            className="py-1.5 px-2 bg-slate-100 hover:bg-slate-200 text-doff-navy text-[11px] font-bold rounded-md flex items-center justify-center gap-1 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
          <Link
            href={getProductDetailPath(product.sku)}
            onClick={(e) => e.stopPropagation()}
            className="py-1.5 px-2 bg-doff-navy hover:bg-doff-navydark text-white text-[11px] font-bold rounded-md shadow-xs flex items-center justify-center gap-1 transition-colors"
          >
            <span>Detail</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <a
          href={product.shopeeUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => {
            e.stopPropagation();
            recordPublicClick('shopee', { productId: product.numericId });
          }}
          className="w-full py-1.5 px-3 bg-slate-50 hover:bg-doff-terracotta hover:text-white text-doff-navy text-xs font-bold rounded-md border border-slate-200 flex items-center justify-center gap-1.5 transition-colors"
        >
          <span>Beli di Shopee</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  </article>
);
