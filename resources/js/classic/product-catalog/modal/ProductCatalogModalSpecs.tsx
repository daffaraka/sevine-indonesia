import React from 'react';
import { ShieldCheck, Star } from 'lucide-react';
import { formatRupiah } from '../hooks/ProductCatalogFilterUtils';
import { CatalogProductItem } from '../types/ProductCatalogTypes';

interface ProductCatalogModalSpecsProps {
  product: CatalogProductItem;
  selectedColor: string;
  onSelectColor: (colorName: string) => void;
}

export const ProductCatalogModalSpecs: React.FC<ProductCatalogModalSpecsProps> = ({
  product,
  selectedColor,
  onSelectColor,
}) => (
  <div className="space-y-4">
    <div>
      <h3 className="text-base sm:text-lg font-bold text-doff-navy leading-snug">{product.title}</h3>
      <div className="flex items-center gap-3 pt-1.5 text-xs text-slate-500">
        <div className="flex items-center gap-1">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span className="font-bold text-slate-800">{product.rating}</span>
          <span>({product.ratingCount} Ulasan)</span>
        </div>
        <span>•</span>
        <span className="font-semibold text-doff-navy">{product.soldLabel}</span>
      </div>
    </div>

    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
      <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Harga Ritel Resmi</div>
      <div className="flex items-baseline gap-2 pt-0.5">
        <span className="text-xl sm:text-2xl font-extrabold text-doff-navy">{formatRupiah(product.price)}</span>
        {product.originalPrice > product.price && (
          <span className="text-xs text-slate-400 line-through">{formatRupiah(product.originalPrice)}</span>
        )}
        {product.discountPercentage > 0 && (
          <span className="text-xs font-bold text-amber-600 bg-amber-100 px-1.5 py-0.5 rounded">
            -{product.discountPercentage}%
          </span>
        )}
      </div>
    </div>

    {product.swatches.length > 0 && (
      <div className="space-y-2">
        <div className="text-xs font-bold text-doff-navy">
          Pilihan Warna: <span className="font-normal text-slate-600">{selectedColor}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {product.swatches.map((swatch, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onSelectColor(swatch.name)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 border transition-all ${
                selectedColor === swatch.name
                  ? 'border-doff-navy bg-doff-navy text-white shadow-xs'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span style={{ backgroundColor: swatch.hex }} className="w-3 h-3 rounded-full border border-white/60 shadow-xs" />
              <span>{swatch.name}</span>
            </button>
          ))}
        </div>
      </div>
    )}

    <div className="space-y-1.5">
      <div className="text-xs font-bold text-doff-navy">Deskripsi & Keunggulan</div>
      <p className="text-xs text-slate-600 leading-relaxed">{product.description}</p>
    </div>

    <div className="space-y-1.5">
      <div className="text-xs font-bold text-doff-navy">Spesifikasi Material</div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
        {product.features.map((feat, idx) => (
          <li key={idx} className="text-xs text-slate-600 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-doff-terracotta shrink-0" />
            <span>{feat}</span>
          </li>
        ))}
      </ul>
    </div>

    {product.isB2BReady && (
      <div className="p-3 rounded-xl bg-blue-50/80 border border-blue-100 space-y-1">
        <div className="text-xs font-bold text-doff-navy flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-doff-navy" />
          <span>Pricelist Kemitraan Reseller & B2B</span>
        </div>
        <div className="text-xs text-slate-600">
          Mulai dari <strong className="text-doff-navy">{formatRupiah(product.wholesalePrice)} / pcs</strong> untuk minimum order {product.minWholesaleQty} pcs.
        </div>
      </div>
    )}
  </div>
);
