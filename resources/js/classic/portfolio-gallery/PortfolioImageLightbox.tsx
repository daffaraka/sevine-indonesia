import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface PortfolioImageLightboxProps {
  imageSrc: string | null;
  imageTitle: string | null;
  onClose: () => void;
}

export const PortfolioImageLightbox: React.FC<PortfolioImageLightboxProps> = ({
  imageSrc,
  imageTitle,
  onClose
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (imageSrc) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [imageSrc, onClose]);

  if (!imageSrc) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-slate-900/80 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />
      <div className="relative max-w-4xl max-h-[85vh] bg-white rounded-2xl overflow-hidden shadow-2xl z-10 flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-white">
          <span className="font-bold text-doff-navy text-sm">{imageTitle || 'Preview Portofolio'}</span>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
            aria-label="Tutup pratinjau gambar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-2 overflow-auto flex items-center justify-center bg-slate-50">
          <img
            src={imageSrc}
            alt={imageTitle || 'Portofolio Sevine'}
            width={800}
            height={600}
            decoding="async"
            className="max-h-[70vh] w-auto object-contain rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};
