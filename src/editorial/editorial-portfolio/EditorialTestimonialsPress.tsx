import React, { useState } from "react";
import { Star, Maximize2 } from "lucide-react";
import { TestimonialItem } from '../../types/CompanyProfileTypes';
import { TestimonialImageLightbox } from '../../classic/client-testimonials/TestimonialImageLightbox';
import { TestimonialBuyerPhotoStrip } from '../../classic/client-testimonials/TestimonialBuyerPhotoStrip';
import { TestimonialAuthorCard } from '../../classic/client-testimonials/TestimonialAuthorCard';

interface EditorialTestimonialsPressProps {
  testimonials: TestimonialItem[];
}

interface ActiveLightboxData {
  src: string;
  title: string;
  subtitle?: string;
}

export const EditorialTestimonialsPress: React.FC<
  EditorialTestimonialsPressProps
> = ({ testimonials }) => {
  const [lightboxData, setLightboxData] = useState<ActiveLightboxData | null>(
    null,
  );

  const handleOpenLightbox = (
    src: string,
    title: string,
    subtitle?: string,
  ) => {
    setLightboxData({ src, title, subtitle });
  };

  const handleCloseLightbox = () => {
    setLightboxData(null);
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="max-w-8xl mx-auto flex items-baseline justify-between border-b border-slate-200 pb-2.5">
        <span className="font-mono text-[10px] tracking-[0.26em] uppercase text-[#C27B66]">
          TESTIMONI KLIEN &amp; RESELLER
        </span>
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-slate-500">
          BUKTI NYATA &amp; TANGKAPAN LAYAR ASLI
        </span>
      </div>

      {/* Layout 2 Kolom Ringkas (Ukuran Semula) */}
      <div className="max-w-8xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        {testimonials.map((t) => (
          <article
            key={t.id}
            id={`testimonial-${t.id}`}
            className="p-5 rounded-xl bg-[#F8F9FA] border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-3 group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-[#C27B66] font-semibold bg-orange-50/70 border border-orange-200/60 rounded-full px-2 py-0.5">
                  {t.highlightAspect}
                </span>
                <div className="flex items-center gap-0.5 text-amber-500">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-3 h-3 fill-amber-400 text-amber-400"
                    />
                  ))}
                  <span className="ml-1 text-[10px] font-mono font-semibold text-slate-500">
                    5.0
                  </span>
                </div>
              </div>

              <blockquote className="font-serif italic text-xs text-[#132238] leading-relaxed">
                “{t.content}”
              </blockquote>

              {/* Bukti Foto Screenshot Ulasan dari Asset (Ukuran Ringkas) */}
              {t.screenshotImage && (
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() =>
                      handleOpenLightbox(
                        t.screenshotImage,
                        `Bukti Ulasan - ${t.author}`,
                        `${t.platform || "Shopee Official Shop"} • ${t.highlightAspect}`,
                      )
                    }
                    className="relative w-full h-18 sm:h-20 rounded-lg overflow-hidden border border-slate-200 bg-white p-1 group/btn text-left flex items-center justify-center shadow-2xs"
                    title="Klik untuk memperbesar bukti ulasan dari asset"
                  >
                    <img
                      src={t.screenshotImage}
                      alt={t.imageAlt || `Bukti tangkapan layar ulasan ${t.author}`}
                      width={600}
                      height={190}
                      decoding="async"
                      className="w-full h-full object-contain group-hover/btn:scale-102 transition-transform duration-200"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-slate-900/0 group-hover/btn:bg-slate-900/25 transition-colors flex items-center justify-center">
                      <span className="opacity-0 group-hover/btn:opacity-100 transition-opacity inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white text-slate-800 text-[9px] font-semibold shadow-xs">
                        <Maximize2 className="w-2.5 h-2.5 text-doff-terracotta" />
                        Perbesar Bukti
                      </span>
                    </div>
                  </button>
                </div>
              )}

              {/* Thumbnail Foto Produk Pembeli */}
              {t.buyerPhotos && (
                <TestimonialBuyerPhotoStrip
                  photos={t.buyerPhotos}
                  author={t.author}
                  onSelectPhoto={(src, title) =>
                    handleOpenLightbox(
                      src,
                      title,
                      `Dokumentasi produk nyata oleh ${t.author}`,
                    )
                  }
                />
              )}
            </div>

            {/* Bagian Nama & Tanggal: 1 Card Rounded dengan Border Semi-Bold */}
            <div className="mt-4 pt-2.5 border-t border-slate-200">
              <TestimonialAuthorCard
                author={t.author}
                date={t.date}
                platform={t.platform}
              />
            </div>
          </article>
        ))}
      </div>

      <TestimonialImageLightbox
        imageSrc={lightboxData?.src ?? null}
        title={lightboxData?.title ?? null}
        subtitle={lightboxData?.subtitle ?? null}
        onClose={handleCloseLightbox}
      />
    </div>
  );
};
