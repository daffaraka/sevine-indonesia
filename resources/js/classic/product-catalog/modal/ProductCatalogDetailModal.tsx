import React, { useEffect, useState } from 'react';
import { ExternalLink, MessageCircle, X } from 'lucide-react';
import { formatRupiah } from '../hooks/ProductCatalogFilterUtils';
import { CatalogProductItem } from '../types/ProductCatalogTypes';
import { ProductCatalogModalGallery } from './ProductCatalogModalGallery';
import { ProductCatalogModalSpecs } from './ProductCatalogModalSpecs';

interface ProductCatalogDetailModalProps {
  product: CatalogProductItem | null;
  onClose: () => void;
}

const openWhatsAppInquiry = (product: CatalogProductItem, selectedColor: string) => {
  const message = [
    'Halo Tim CV. SEVINE INDONESIA,',
    'Saya tertarik dengan produk katalog:',
    `*Nama Produk:* ${product.title}`,
    `*SKU:* ${product.sku}`,
    `*Brand:* ${product.brand}`,
    `*Pilihan Warna:* ${selectedColor || 'Default'}`,
    `*Harga Ritel:* ${formatRupiah(product.price)}`,
    `*Harga Grosir:* ${formatRupiah(product.wholesalePrice)} (Min. ${product.minWholesaleQty} pcs)`,
    '',
    'Mohon info ketersediaan stok & prosedur pemesanan / sampel. Terima kasih!',
  ].join('\n');
  window.open(`https://wa.me/6281398205665?text=${encodeURIComponent(message)}`, '_blank');
};

export const ProductCatalogDetailModal: React.FC<ProductCatalogDetailModalProps> = ({ product, onClose }) => {
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [selectedColor, setSelectedColor] = useState<string>('');

  useEffect(() => {
    if (product) {
      setActiveImageIndex(0);
      setSelectedColor(product.swatches[0]?.name || '');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    const handleKeyDown = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [product, onClose]);

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs" onClick={onClose} />
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl z-10 overflow-hidden flex flex-col max-h-[92vh]">
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-doff-terracotta text-white uppercase">{product.brand}</span>
            <span className="text-xs font-semibold text-slate-500">SKU: {product.sku}</span>
          </div>
          <button type="button" onClick={onClose} aria-label="Tutup dialog" className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/60 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 sm:p-7">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProductCatalogModalGallery product={product} activeImageIndex={activeImageIndex} onSelectImage={setActiveImageIndex} />
            <ProductCatalogModalSpecs product={product} selectedColor={selectedColor} onSelectColor={setSelectedColor} />
          </div>
        </div>

        <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50 flex flex-col sm:flex-row items-center gap-3">
          <a href={product.shopeeUrl} target="_blank" rel="noopener noreferrer" className="w-full sm:flex-1 py-2.5 px-4 bg-doff-terracotta hover:bg-[#A86450] text-white text-xs font-bold rounded-xl shadow-xs flex items-center justify-center gap-2 transition-colors">
            <span>Beli di Shopee Official Store</span>
            <ExternalLink className="w-4 h-4" />
          </a>
          <button type="button" onClick={() => openWhatsAppInquiry(product, selectedColor)} className="w-full sm:flex-1 py-2.5 px-4 bg-doff-navy hover:bg-doff-navydark text-white text-xs font-bold rounded-xl shadow-xs flex items-center justify-center gap-2 transition-colors">
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>Tanya Admin / Pesan B2B (WA)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
