import React from 'react';
import { MapPin } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { CatalogProductItem } from '../types/ProductCatalogTypes';

interface ProductCatalogModalGalleryProps {
  product: CatalogProductItem;
  activeImageIndex: number;
  onSelectImage: (index: number) => void;
}

export const ProductCatalogModalGallery: React.FC<ProductCatalogModalGalleryProps> = ({
  product,
  activeImageIndex,
  onSelectImage,
}) => {
  const currentPhoto = product.gallery[activeImageIndex] || product.image;

  return (
    <div className="space-y-3">
      <div className="aspect-square w-full rounded-lg overflow-hidden bg-slate-100 border border-slate-200/80 relative">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentPhoto}
            src={currentPhoto}
            alt={product.title}
            width={600}
            height={600}
            decoding="async"
            initial={{ opacity: 0.25 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0.25 }}
            transition={{ duration: 0.22, ease: [0.2, 0.8, 0.2, 1] }}
            className="w-full h-full object-cover"
          />
        </AnimatePresence>
      </div>

      {product.gallery.length > 1 && (
        <div className="flex items-center gap-2">
          {product.gallery.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onSelectImage(idx)}
              className={`w-14 h-14 rounded-md overflow-hidden border-2 transition-all ${
                activeImageIndex === idx
                  ? 'border-doff-navy scale-102 shadow-xs'
                  : 'border-slate-200 opacity-70 hover:opacity-100'
              }`}
            >
              <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 p-2.5 rounded-md border border-slate-200/60">
        <MapPin className="w-4 h-4 text-doff-terracotta shrink-0" />
        <span>
          Dikirim dari: <strong className="text-doff-navy">{product.shippingOriginLabel}</strong>
        </span>
      </div>
    </div>
  );
};
