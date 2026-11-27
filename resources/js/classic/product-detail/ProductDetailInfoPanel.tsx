import React, { useEffect, useState } from 'react';
import { Link } from '@inertiajs/react';
import { Check, ExternalLink, Link2, MapPin, MessageCircle, ShieldCheck, Star } from 'lucide-react';
import {
  buildProductWhatsAppUrl,
  recordPublicClick,
} from '../../services/PublicTelemetryService';
import { formatRupiah } from '../product-catalog/hooks/ProductCatalogFilterUtils';
import { CatalogProductItem } from '../product-catalog/types/ProductCatalogTypes';
import { ProductDetailSwatchSelector } from './ProductDetailSwatchSelector';

interface ProductDetailInfoPanelProps {
  product: CatalogProductItem;
}

export const ProductDetailInfoPanel: React.FC<ProductDetailInfoPanelProps> = ({ product }) => {
  const [selectedSwatchIndex, setSelectedSwatchIndex] = useState<number>(0);
  const [copiedUrl, setCopiedUrl] = useState<boolean>(false);

  useEffect(() => {
    setSelectedSwatchIndex(0);
    setCopiedUrl(false);
  }, [product.id]);

  const activeSwatch = product.swatches[selectedSwatchIndex];

  const handleOpenWhatsApp = () => {
    recordPublicClick('whatsapp', { productId: product.numericId });
    window.open(buildProductWhatsAppUrl(product, activeSwatch?.name), '_blank');
  };

  const handleCopyProductLink = async () => {
    if (typeof window === 'undefined' || !navigator.clipboard) return;
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopiedUrl(true);
      window.setTimeout(() => setCopiedUrl(false), 2000);
    } catch {
      // Abaikan bila akses clipboard tidak diizinkan
    }
  };

  return (
    <section className="bg-white rounded-lg border border-slate-200/90 shadow-doff-sm p-5 sm:p-6 space-y-5">
      <div className="space-y-2.5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded bg-doff-navy text-white uppercase tracking-wider">
              {product.brand}
            </span>
            <Link
              href={`/catalog?category=${encodeURIComponent(product.category)}`}
              className="text-[11px] font-semibold px-2.5 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-doff-navy transition-colors"
            >
              {product.categoryLabel}
            </Link>
            <span className="text-xs font-mono text-slate-500">SKU: {product.sku}</span>
          </div>
          <button
            type="button"
            onClick={handleCopyProductLink}
            className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-doff-navy transition-colors"
          >
            {copiedUrl ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Link2 className="w-3.5 h-3.5" />}
            <span>{copiedUrl ? 'Disalin' : 'Bagikan'}</span>
          </button>
        </div>

        <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-doff-navy tracking-tight leading-snug">
          {product.title}
        </h1>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-slate-500">
          <span className="inline-flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <strong className="text-slate-800">{product.rating}</strong>
            <span>({product.ratingCount} ulasan)</span>
          </span>
          <span>&middot;</span>
          <span className="font-semibold text-doff-navy">{product.soldLabel}</span>
          <span>&middot;</span>
          <span className="inline-flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-doff-terracotta shrink-0" />
            <span>{product.location}</span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/80 space-y-1">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Harga Ritel Resmi</div>
          <div className="flex items-baseline flex-wrap gap-2">
            <span className="text-2xl font-extrabold text-doff-navy">{formatRupiah(product.price)}</span>
            {product.originalPrice > product.price && (
              <span className="text-xs text-slate-400 line-through">{formatRupiah(product.originalPrice)}</span>
            )}
          </div>
        </div>
        {product.isB2BReady && (
          <div className="p-3.5 rounded-lg bg-blue-50/70 border border-blue-100 space-y-1">
            <div className="text-[10px] font-bold uppercase tracking-wider text-doff-navy flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-doff-terracotta" />
              <span>Estimasi Grosir B2B</span>
            </div>
            <div className="text-lg font-extrabold text-doff-navy">
              {formatRupiah(product.wholesalePrice)} <span className="text-xs font-normal text-slate-600">/ pcs</span>
            </div>
            <div className="text-[11px] text-slate-600">Minimum pemesanan {product.minWholesaleQty} pcs</div>
          </div>
        )}
      </div>

      <ProductDetailSwatchSelector
        swatches={product.swatches}
        selectedIndex={selectedSwatchIndex}
        onSelect={setSelectedSwatchIndex}
      />

      <div className="flex flex-col sm:flex-row gap-3 pt-2 border-t border-slate-100">
        <a
          href={product.shopeeUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => recordPublicClick('shopee', { productId: product.numericId })}
          className="w-full sm:flex-1 min-h-[44px] py-3 px-4 rounded-lg bg-[#9E4738] hover:bg-[#863A2D] text-white text-xs sm:text-sm font-bold shadow-doff-sm flex items-center justify-center gap-2 sevine-btn-motion"
        >
          <span>Beli di Shopee Official</span>
          <ExternalLink className="w-4 h-4 sevine-arrow-shift" />
        </a>
        <button
          type="button"
          onClick={handleOpenWhatsApp}
          className="w-full sm:flex-1 min-h-[44px] py-3 px-4 rounded-lg bg-doff-navy hover:bg-doff-navydark text-white text-xs sm:text-sm font-bold shadow-doff-sm flex items-center justify-center gap-2 sevine-btn-motion cursor-pointer"
        >
          <MessageCircle className="w-4 h-4 text-emerald-400" />
          <span>Pesan Grosir / Tanya WA</span>
        </button>
      </div>
    </section>
  );
};
