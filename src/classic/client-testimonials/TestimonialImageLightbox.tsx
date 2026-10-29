import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface TestimonialImageLightboxProps {
  imageSrc: string | null;
  title: string | null;
  subtitle?: string | null;
  onClose: () => void;
}

export const TestimonialImageLightbox: React.FC<TestimonialImageLightboxProps> = ({
  imageSrc,
  title,
  subtitle,
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-4xl bg-white rounded-2xl overflow-hidden shadow-2xl z-10 flex flex-col border border-slate-200">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-[#FBFBFB]">
          <div>
            <h3 className="font-bold text-doff-navy text-sm sm:text-base">
              {title || 'Bukti Ulasan Autentik'}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {subtitle || 'Tangkapan layar ulasan terverifikasi pembeli'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/60 transition-colors"
            aria-label="Tutup pratinjau ulasan"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 sm:p-6 overflow-auto flex items-center justify-center bg-slate-100/60 max-h-[75vh]">
          <img
            src={imageSrc}
            alt={title || 'Bukti Ulasan Pelanggan Sevine'}
            width={900}
            height={280}
            decoding="async"
            className="w-full h-auto max-h-[70vh] object-contain rounded-xl shadow-xs border border-slate-200 bg-white"
          />
        </div>
      </div>
    </div>
  );
};
