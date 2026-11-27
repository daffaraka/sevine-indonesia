import React, { useEffect, useState } from 'react';
import { Expand } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { CatalogProductItem } from '../product-catalog/types/ProductCatalogTypes';
import { ProductDetailLightbox } from './ProductDetailLightbox';

interface ProductDetailGalleryProps {
  product: CatalogProductItem;
}

export const ProductDetailGallery: React.FC<ProductDetailGalleryProps> = ({ product }) => {
  const photos = product.gallery.length > 0 ? product.gallery : [product.image];
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);

  useEffect(() => {
    setActiveIndex(0);
    setIsLightboxOpen(false);
  }, [product.id]);

  const currentPhoto = photos[activeIndex] || product.image;

  return (
    <div className="space-y-3 lg:sticky lg:top-24">
      <div className="group relative aspect-square w-full rounded-lg overflow-hidden bg-slate-100 border border-slate-200/90 shadow-doff-sm">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentPhoto}
            src={currentPhoto}
            alt={product.title}
            width={800}
            height={800}
            decoding="async"
            initial={{ opacity: 0.25 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0.25 }}
            transition={{ duration: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
            className="w-full h-full object-cover cursor-zoom-in"
            onClick={() => setIsLightboxOpen(true)}
          />
        </AnimatePresence>

        {product.isOfficial && (
          <span className="absolute top-3 left-3 text-[11px] font-bold px-2.5 py-1 rounded bg-doff-terracotta text-white shadow-xs">
            Official Store
          </span>
        )}
        {product.discountPercentage > 0 && (
          <span className="absolute top-3 right-14 text-[11px] font-extrabold px-2 py-1 rounded bg-amber-500/95 text-white shadow-xs">
            -{product.discountPercentage}%
          </span>
        )}

        <button
          type="button"
          onClick={() => setIsLightboxOpen(true)}
          aria-label="Perbesar foto produk"
          className="absolute top-3 right-3 w-9 h-9 rounded-md bg-white/90 hover:bg-white text-doff-navy border border-slate-200 flex items-center justify-center shadow-xs transition-colors"
        >
          <Expand className="w-4 h-4" />
        </button>
      </div>

      {photos.length > 1 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {photos.map((img, idx) => (
            <button
              key={`${img}-${idx}`}
              type="button"
              onClick={() => setActiveIndex(idx)}
              aria-label={`Foto produk ${idx + 1}`}
              className={`w-16 h-16 shrink-0 rounded-md overflow-hidden border-2 transition-all ${
                activeIndex === idx
                  ? 'border-doff-navy opacity-100 shadow-xs'
                  : 'border-slate-200 opacity-70 hover:opacity-100'
              }`}
            >
              <img src={img} alt={`${product.title} tampilan ${idx + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      <ProductDetailLightbox
        isOpen={isLightboxOpen}
        photos={photos}
        activeIndex={activeIndex}
        sku={product.sku}
        title={product.title}
        onSelectIndex={setActiveIndex}
        onClose={() => setIsLightboxOpen(false)}
      />
    </div>
  );
};
