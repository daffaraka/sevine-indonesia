import React from 'react';
import { Star, Maximize2 } from 'lucide-react';
import { TestimonialItem } from '../types/CompanyProfileTypes';
import { TestimonialBuyerPhotoStrip } from './TestimonialBuyerPhotoStrip';
import { TestimonialAuthorCard } from './TestimonialAuthorCard';

interface TestimonialCardItemProps {
  item: TestimonialItem;
  onViewProof: (src: string, title: string, subtitle?: string) => void;
}

export const TestimonialCardItem: React.FC<TestimonialCardItemProps> = ({
  item,
  onViewProof
}) => {
  return (
    <div className="bg-white rounded-xl p-5 border border-slate-200/90 shadow-sm hover:shadow-md flex flex-col justify-between hover:border-slate-300 transition-all group">
      <div className="space-y-3">
        {/* Header Meta: Rating & Aspect */}
        <div className="flex items-center justify-between text-[11px] pb-2.5 border-b border-slate-100 font-mono">
          <div className="flex items-center gap-1 text-amber-500">
            {Array.from({ length: item.rating }).map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
            ))}
            <span className="ml-1 text-[10px] font-semibold text-slate-500">
              5.0
            </span>
          </div>
          <span className="text-doff-terracotta font-semibold font-sans text-[11px]">
            {item.highlightAspect}
          </span>
        </div>

        {/* Kutipan Review Pelanggan (Ukuran Asli Ringkas) */}
        <p className="text-xs text-slate-600 leading-relaxed italic">
          "{item.content}"
        </p>

        {/* Foto Screenshot Ulasan dari Asset (Ukuran Banner Kompak) */}
        {item.screenshotImage && (
          <div className="pt-1">
            <button
              type="button"
              onClick={() =>
                onViewProof(
                  item.screenshotImage,
                  `Bukti Ulasan - ${item.author}`,
                  `${item.platform || 'Shopee Official Shop'} • ${item.highlightAspect}`
                )
              }
              className="relative w-full h-18 sm:h-20 rounded-lg overflow-hidden border border-slate-200 bg-white p-1 group/img focus:outline-hidden focus:ring-2 focus:ring-doff-terracotta/40 transition-all text-left flex items-center justify-center shadow-2xs"
              title="Klik untuk memperbesar bukti ulasan dari asset"
            >
              <img
                src={item.screenshotImage}
                alt={`Tangkapan layar ulasan dari ${item.author}`}
                className="w-full h-full object-contain group-hover/img:scale-102 transition-transform duration-200"
                loading="lazy"
              />

              <div className="absolute inset-0 bg-slate-900/0 group-hover/img:bg-slate-900/30 transition-colors flex items-center justify-center">
                <span className="opacity-0 group-hover/img:opacity-100 transition-opacity inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/95 text-slate-800 text-[10px] font-semibold shadow-xs">
                  <Maximize2 className="w-3 h-3 text-doff-terracotta" />
                  Perbesar Bukti
                </span>
              </div>
            </button>
          </div>
        )}

        {/* Foto Produk Pembeli (Jika ada foto produk yang diunggah) */}
        {item.buyerPhotos && (
          <TestimonialBuyerPhotoStrip
            photos={item.buyerPhotos}
            author={item.author}
            onSelectPhoto={(src, title) =>
              onViewProof(src, title, `Dokumentasi produk nyata oleh ${item.author}`)
            }
          />
        )}
      </div>

      {/* Bagian Nama & Tanggal: 1 Card Rounded dengan Border Semi-Bold */}
      <div className="mt-4 pt-3 border-t border-slate-100">
        <TestimonialAuthorCard
          author={item.author}
          date={item.date}
          platform={item.platform}
        />
      </div>
    </div>
  );
};
