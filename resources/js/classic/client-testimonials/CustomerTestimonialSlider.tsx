import React, { useState } from "react";
import { TestimonialCardItem } from "./TestimonialCardItem";
import { TestimonialImageLightbox } from "./TestimonialImageLightbox";
import { CompanyProfileService } from '../../services/CompanyProfileService';

interface CustomerTestimonialSliderProps {
  id?: string;
}

interface ActiveLightboxData {
  src: string;
  title: string;
  subtitle?: string;
}

export const CustomerTestimonialSlider: React.FC<
  CustomerTestimonialSliderProps
> = ({ id = "testimonials" }) => {
  const testimonials = CompanyProfileService.getTestimonials();
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
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="relative py-16 md:py-24 bg-[#0E1A2C] text-white overflow-hidden"
    >
      {/* Top and Bottom Subtle Seamless Fades */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-[#0E1A2C] to-transparent z-10" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white/70 to-transparent z-10" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        {/* Header Seksi */}
        <div className="max-w-8xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="max-w-2xl space-y-2.5">
            <div className="text-xs font-bold text-[#E5A894] uppercase tracking-wider">
              Suara Kepuasan Pelanggan
            </div>
            <h2 id={`${id}-heading`} className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Testimoni & Pengalaman Nyata
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              Apresiasi autentik dari para pengguna produk Sevine terhadap
              kenyamanan desain, kapasitas tas, dan ketahanan material tahan air
              disertai bukti tangkapan layar review asli.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 self-start md:self-auto px-3.5 py-1.5 rounded-full bg-[#17273F] border border-white/15 text-slate-200 text-[11px] font-medium shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Tangkapan Layar & Foto Asli Shopee</span>
          </div>
        </div>

        {/* Layout Testimoni: 2 Kolom Ringkas (Ukuran Semula) */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {testimonials.map((testi) => (
            <TestimonialCardItem
              key={testi.id}
              item={testi}
              onViewProof={handleOpenLightbox}
            />
          ))}
        </div>
      </div>

      {/* Modal Lightbox Pembesar Bukti Foto Testimoni */}
      <TestimonialImageLightbox
        imageSrc={lightboxData?.src ?? null}
        title={lightboxData?.title ?? null}
        subtitle={lightboxData?.subtitle ?? null}
        onClose={handleCloseLightbox}
      />
    </section>
  );
};
