import React from 'react';
import { CatalogProductItem } from '../product-catalog/types/ProductCatalogTypes';

interface ProductDetailSpecsCardProps {
  product: CatalogProductItem;
}

export const ProductDetailSpecsCard: React.FC<ProductDetailSpecsCardProps> = ({ product }) => (
  <section className="bg-white rounded-lg border border-slate-200/90 shadow-doff-sm p-5 sm:p-6 space-y-5">
    <div className="space-y-2">
      <h2 className="text-sm sm:text-base font-bold text-doff-navy pb-2 border-b border-slate-100">
        Deskripsi &amp; Keunggulan Produk
      </h2>
      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
        {product.description || 'Produk diproduksi secara mandiri oleh lini manufaktur CV. Sevine Indonesia dengan standar kontrol kualitas ketat.'}
      </p>
    </div>

    {product.features.length > 0 && (
      <div className="space-y-2.5">
        <h3 className="text-xs sm:text-sm font-bold text-doff-navy">Spesifikasi Material &amp; Fitur</h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {product.features.map((feat, idx) => (
            <li
              key={`${feat}-${idx}`}
              className="text-xs text-slate-700 bg-slate-50 border border-slate-200/70 rounded-md px-3 py-2 flex items-start gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-doff-terracotta mt-1.5 shrink-0" />
              <span>{feat}</span>
            </li>
          ))}
        </ul>
      </div>
    )}

    <dl className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-100 text-xs">
      <div className="p-3 rounded-md bg-doff-subtle/60 border border-slate-200/60">
        <dt className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Asal Pengiriman</dt>
        <dd className="font-bold text-doff-navy mt-0.5">{product.shippingOriginLabel}</dd>
      </div>
      <div className="p-3 rounded-md bg-doff-subtle/60 border border-slate-200/60">
        <dt className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Ketersediaan</dt>
        <dd className="font-bold text-emerald-700 mt-0.5">
          {product.isReadyStock ? 'Produksi Aktif / Ready' : 'Pre-Order Pabrik'}
        </dd>
      </div>
      <div className="p-3 rounded-md bg-doff-subtle/60 border border-slate-200/60">
        <dt className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Layanan B2B</dt>
        <dd className="font-bold text-doff-navy mt-0.5">
          {product.isB2BReady ? 'Reseller & Custom Maklon' : 'Ritel Resmi'}
        </dd>
      </div>
    </dl>
  </section>
);
