import React, { useEffect, useState } from 'react';
import { Link } from '@inertiajs/react';
import { ArrowUpRight, ExternalLink, MessageCircle, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import {
  buildProductWhatsAppUrl,
  getProductDetailPath,
  recordPublicClick,
} from '../../../services/PublicTelemetryService';
import { CatalogProductItem } from '../types/ProductCatalogTypes';
import { ProductCatalogModalGallery } from './ProductCatalogModalGallery';
import { ProductCatalogModalSpecs } from './ProductCatalogModalSpecs';

interface ProductCatalogDetailModalProps {
  product: CatalogProductItem | null;
  onClose: () => void;
}

const openWhatsAppInquiry = (product: CatalogProductItem) => {
  recordPublicClick('whatsapp', { productId: product.numericId });
  window.open(buildProductWhatsAppUrl(product), '_blank');
};

export const ProductCatalogDetailModal: React.FC<ProductCatalogDetailModalProps> = ({ product, onClose }) => {
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  useEffect(() => {
    if (product) {
      setActiveImageIndex(0);
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

  return (
    <AnimatePresence>
      {product && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
            onClick={onClose}
          />
          <motion.div
            data-lenis-prevent
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.2, 0.8, 0.2, 1] }}
            className="relative w-full max-w-3xl bg-white rounded-xl shadow-2xl z-10 overflow-hidden flex flex-col max-h-[92vh]"
          >
            <div className="flex items-center justify-between gap-2 px-5 py-3.5 border-b border-slate-100 bg-slate-50/70">
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-doff-terracotta text-white uppercase shrink-0">{product.brand}</span>
                <span className="text-xs font-mono font-semibold text-slate-500 truncate">SKU: {product.sku}</span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Link
                  href={getProductDetailPath(product.sku)}
                  onClick={onClose}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold text-doff-navy bg-white border border-slate-200 hover:border-doff-navy transition-colors"
                >
                  <span>Halaman Penuh</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
                <button type="button" onClick={onClose} aria-label="Tutup dialog" className="p-1 text-slate-400 hover:text-slate-700 rounded-md hover:bg-slate-200/60 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-5 sm:p-7">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ProductCatalogModalGallery product={product} activeImageIndex={activeImageIndex} onSelectImage={setActiveImageIndex} />
                <ProductCatalogModalSpecs product={product} />
              </div>
            </div>

            <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50 flex flex-col sm:flex-row items-center gap-3">
              <a
                href={product.shopeeUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => recordPublicClick('shopee', { productId: product.numericId })}
                className="w-full sm:flex-1 py-2.5 px-4 bg-doff-terracotta hover:bg-[#A86450] text-white text-xs font-bold rounded-lg shadow-xs flex items-center justify-center gap-2 sevine-btn-motion"
              >
                <span>Beli di Shopee Official Store</span>
                <ExternalLink className="w-4 h-4 sevine-arrow-shift" />
              </a>
              <button type="button" onClick={() => openWhatsAppInquiry(product)} className="w-full sm:flex-1 py-2.5 px-4 bg-doff-navy hover:bg-doff-navydark text-white text-xs font-bold rounded-lg shadow-xs flex items-center justify-center gap-2 sevine-btn-motion">
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Tanya Admin / Pesan B2B (WA)</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
