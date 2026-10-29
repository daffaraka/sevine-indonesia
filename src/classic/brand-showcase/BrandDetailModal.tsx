import React, { useEffect } from 'react';
import { X, MessageCircle, ShoppingBag } from 'lucide-react';
import { BrandItem } from '../../types/CompanyProfileTypes';
import { CONTACT_INFO } from '../../data/SevineProfileData';

interface BrandDetailModalProps {
  brand: BrandItem | null;
  onClose: () => void;
}

export const BrandDetailModal: React.FC<BrandDetailModalProps> = ({ brand, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (brand) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [brand, onClose]);

  if (!brand) return null;

  const whatsappMessage = encodeURIComponent(
    `Halo Tim Sevine, saya tertarik untuk bermitra / membeli katalog produk dari brand ${brand.name}. Mohon informasi lengkapnya.`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog / Mobile Bottom Sheet */}
      <div className="relative w-full max-w-lg bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl p-6 sm:p-8 z-10 max-h-[90vh] overflow-y-auto">
        {/* Header Modal */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${brand.badgeColor}`}>
              {brand.category.toUpperCase()}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-doff-navy mt-1">
              {brand.name}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
            aria-label="Tutup modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Gambar dan Deskripsi */}
        <div className="py-4 space-y-4">
          <div className="h-44 w-full rounded-xl overflow-hidden bg-slate-50 border border-slate-100 p-6 flex items-center justify-center">
            <img
              src={brand.imageUrl}
              alt={brand.imageAlt || brand.name}
              width={300}
              height={300}
              decoding="async"
              className="w-full h-full object-contain mix-blend-multiply"
            />
          </div>

          <div>
            <div className="text-xs font-semibold text-doff-terracotta uppercase tracking-wide">
              {brand.tagline}
            </div>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
              {brand.description}
            </p>
          </div>

          {/* Keunggulan Kunci */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 space-y-2">
            <div className="text-xs font-bold text-doff-navy">Karakteristik & Mutu Produk:</div>
            <div className="space-y-1.5">
              {brand.highlightPoints.map((point, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-slate-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-doff-terracotta shrink-0" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Target Audiens */}
          <div className="text-xs text-slate-500">
            <span className="font-semibold text-slate-700">Target Pasar: </span>
            {brand.targetMarket}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row gap-2">
          <a
            href={`https://wa.me/62${CONTACT_INFO.resellerHotline.replace(/^0/, '')}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-doff-navy text-white text-xs font-semibold hover:bg-doff-navydark transition-colors"
          >
            <MessageCircle className="w-4 h-4 text-white" />
            <span>Tanya Kemitraan {brand.name}</span>
          </a>

          <a
            href="https://shopee.co.id/sevine.id"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-100 text-doff-navy text-xs font-semibold hover:bg-slate-200 transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Lihat di Toko Resmi</span>
          </a>
        </div>
      </div>
    </div>
  );
};
