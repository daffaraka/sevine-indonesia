import React from 'react';
import { Eye, MapPin, Star } from 'lucide-react';
import { CatalogProductItem, ProductColorSwatch } from '../types/ProductCatalogTypes';

interface ThumbnailProps {
  product: CatalogProductItem;
  className: string;
  imageSize?: number;
  showHoverOverlay?: boolean;
}

export const ProductThumbnailBox: React.FC<ThumbnailProps> = ({
  product,
  className,
  imageSize = 600,
  showHoverOverlay = false,
}) => (
  <div className={`relative bg-slate-100 overflow-hidden ${className}`}>
    <img
      src={product.image}
      alt={product.title}
      width={imageSize}
      height={imageSize}
      decoding="async"
      loading="lazy"
      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
    />
    {product.isOfficial && (
      <span className="absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded bg-doff-terracotta text-white shadow-xs tracking-tight">
        Official
      </span>
    )}
    {product.discountPercentage > 0 && (
      <span className="absolute top-2 right-2 text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-amber-500/90 text-white shadow-xs">
        -{product.discountPercentage}%
      </span>
    )}
    {product.isFreeShipping && (
      <span className="absolute bottom-2 left-2 text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-700/90 text-white backdrop-blur-xs">
        Gratis Ongkir Xtra
      </span>
    )}
    {showHoverOverlay && (
      <div className="absolute inset-0 bg-slate-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <span className="px-3 py-1.5 rounded-full bg-white/95 text-doff-navy font-bold text-xs shadow-md flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
          <Eye className="w-3.5 h-3.5" />
          Detail Produk
        </span>
      </div>
    )}
  </div>
);

export const ProductSwatchDots: React.FC<{
  swatches: ProductColorSwatch[];
  maxVisible?: number;
  dotClass?: string;
}> = ({ swatches, maxVisible = swatches.length, dotClass = 'w-2.5 h-2.5' }) => {
  if (!swatches.length) return null;
  return (
    <div className="flex items-center gap-1">
      {swatches.slice(0, maxVisible).map((swatch, idx) => (
        <span
          key={idx}
          title={swatch.name}
          style={{ backgroundColor: swatch.hex }}
          className={`${dotClass} rounded-full border border-white shadow-xs`}
        />
      ))}
      {swatches.length > maxVisible && (
        <span className="text-[9px] text-slate-400">+{swatches.length - maxVisible}</span>
      )}
    </div>
  );
};

export const ProductRatingMeta: React.FC<{
  product: CatalogProductItem;
  showRatingCount?: boolean;
}> = ({ product, showRatingCount = false }) => (
  <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 shrink-0" />
    <span className="font-bold text-slate-700">{product.rating}</span>
    {showRatingCount && <span className="text-slate-400">({product.ratingCount})</span>}
    <span className="text-slate-400">•</span>
    <span className="font-semibold text-doff-navy truncate">{product.soldLabel}</span>
    {showRatingCount && (
      <>
        <span className="text-slate-400">•</span>
        <span className="inline-flex items-center gap-0.5 text-slate-400">
          <MapPin className="w-3 h-3 shrink-0" />
          <span>{product.location}</span>
        </span>
      </>
    )}
  </div>
);
