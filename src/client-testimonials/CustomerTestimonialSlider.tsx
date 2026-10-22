import React, { useState } from 'react';
import { TestimonialCardItem } from './TestimonialCardItem';
import { TestimonialImageLightbox } from './TestimonialImageLightbox';
import { CompanyProfileService } from '../services/CompanyProfileService';

interface CustomerTestimonialSliderProps {
  id?: string;
}

interface ActiveLightboxData {
  src: string;
  title: string;
  subtitle?: string;
}

export const CustomerTestimonialSlider: React.FC<CustomerTestimonialSliderProps> = ({
  id = 'testimonials'
}) => {
  const testimonials = CompanyProfileService.getTestimonials();
  const [lightboxData, setLightboxData] = useState<ActiveLightboxData | null>(null);

  const handleOpenLightbox = (src: string, title: string, subtitle?: string) => {
    setLightboxData({ src, title, subtitle });
  };

  const handleCloseLightbox = () => {
    setLightboxData(null);
  };

  return (
    <section id={id} className="py-16 md:py-24 bg-[#F8F9FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        {/* Header Seksi */}
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="max-w-2xl space-y-2.5">
            <div className="text-xs font-bold text-doff-terracotta uppercase tracking-wider">
              Suara Kepuasan Pelanggan
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-doff-navy tracking-tight">
              Testimoni & Pengalaman Nyata
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              Apresiasi autentik dari para pengguna produk Sevine terhadap kenyamanan desain, kapasitas tas, dan ketahanan material tahan air disertai bukti tangkapan layar review asli.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 self-start md:self-auto px-3 py-1 rounded-full bg-white border border-slate-200/90 shadow-2xs text-[11px] text-slate-600 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Tangkapan Layar & Foto Asli Shopee</span>
          </div>
        </div>

        {/* Layout Testimoni: 2 Kolom Ringkas (Ukuran Semula) */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
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
