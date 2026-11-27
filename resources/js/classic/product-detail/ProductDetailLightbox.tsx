import React, { useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

interface ProductDetailLightboxProps {
  isOpen: boolean;
  photos: string[];
  activeIndex: number;
  sku: string;
  title: string;
  onSelectIndex: (index: number) => void;
  onClose: () => void;
}

export const ProductDetailLightbox: React.FC<ProductDetailLightboxProps> = ({
  isOpen,
  photos,
  activeIndex,
  sku,
  title,
  onSelectIndex,
  onClose,
}) => {
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onSelectIndex((activeIndex + 1) % photos.length);
      if (e.key === 'ArrowLeft') onSelectIndex((activeIndex - 1 + photos.length) % photos.length);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, activeIndex, photos.length, onSelectIndex, onClose]);

  const currentPhoto = photos[activeIndex] || photos[0];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/80 backdrop-blur-xs"
            onClick={onClose}
          />
          <motion.div
            data-lenis-prevent
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            className="relative z-10 max-w-4xl w-full bg-white rounded-xl overflow-hidden shadow-2xl"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
              <span className="text-xs font-mono font-semibold text-doff-navy truncate">
                {sku} &middot; Foto {activeIndex + 1}/{photos.length}
              </span>
              <button
                type="button"
                onClick={onClose}
                aria-label="Tutup pratinjau penuh"
                className="p-1.5 text-slate-500 hover:text-doff-navy rounded-md hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="relative bg-slate-50 flex items-center justify-center p-3 sm:p-5">
              <img src={currentPhoto} alt={title} className="max-h-[75vh] w-auto object-contain rounded-md" />
              {photos.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => onSelectIndex((activeIndex - 1 + photos.length) % photos.length)}
                    aria-label="Foto sebelumnya"
                    className="absolute left-3 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-doff-navy shadow-md flex items-center justify-center"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onSelectIndex((activeIndex + 1) % photos.length)}
                    aria-label="Foto berikutnya"
                    className="absolute right-3 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-doff-navy shadow-md flex items-center justify-center"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
