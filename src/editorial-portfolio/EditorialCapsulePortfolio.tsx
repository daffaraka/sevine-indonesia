import React, { useState } from 'react';
import { CompanyProfileService } from '../services/CompanyProfileService';
import { PortfolioImageLightbox } from '../portfolio-gallery/PortfolioImageLightbox';
import { EditorialPartnersPress } from './EditorialPartnersPress';

export const EditorialCapsulePortfolio: React.FC = () => {
  const samples = CompanyProfileService.getPortfolioSamples('all');
  const events = CompanyProfileService.getOfflineEvents();
  const [lightboxImage, setLightboxImage] = useState<{ src: string; title: string } | null>(null);

  return (
    <section id="ed-capsule" className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 space-y-20">
        {/* Part 1: Capsule Collection Strip with shadow-md */}
        <div className="space-y-10">
          <div className="text-center space-y-2">
            <span className="font-mono text-[10px] tracking-[0.28em] uppercase text-[#C27B66] block">
              SEASONAL ARCHIVE • SAMPEL PRODUKSI
            </span>
            <h2 className="font-sans text-2xl sm:text-3xl font-normal uppercase tracking-[0.14em] text-[#132238]">
              KAPSUL PORTOFOLIO
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {samples.map((sample) => (
              <article
                key={sample.id}
                onClick={() => setLightboxImage({ src: sample.image, title: sample.title })}
                className="group relative aspect-[4/5] rounded-2xl bg-slate-100 overflow-hidden cursor-pointer flex flex-col justify-end shadow-md hover:shadow-xl transition-all duration-300 border border-slate-200/80"
              >
                <img
                  src={sample.image}
                  alt={sample.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
                {/* Bottom Left Text Overlay */}
                <div className="relative z-10 p-6 sm:p-7 bg-gradient-to-t from-white via-white/90 to-transparent pt-20 space-y-2 text-[#132238]">
                  <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#C27B66] font-semibold">
                    {sample.brand}
                  </div>
                  <h3 className="font-sans text-sm sm:text-base font-semibold uppercase tracking-wide text-[#132238]">
                    {sample.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed max-w-xs">
                    {sample.description}
                  </p>
                  <div className="pt-2 inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.16em] text-[#132238]">
                    <span>Perbesar</span>
                    <span className="w-6 h-[1px] bg-[#132238] group-hover:w-10 transition-all" />
                    <span>→</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Part 2: Offline Pop-Up & Exhibition Archive with shadow-md */}
        <div className="space-y-8 pt-8 border-t border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="font-mono text-[10px] tracking-[0.28em] uppercase text-[#C27B66] block">
                AKTIVASI OFFLINE • POP-UP EXHIBITION
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl text-[#132238] mt-1">
                Kehadiran Pameran &amp; Pasar Kreatif
              </h3>
            </div>
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-slate-500">
              SURAKARTA • MALANG • JAWA TIMUR
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {events.map((ev, idx) => (
              <article
                key={ev.id}
                onClick={() => setLightboxImage({ src: ev.image, title: ev.title })}
                className="group rounded-2xl bg-white border border-slate-200/90 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer flex flex-col justify-between"
              >
                <div className="aspect-[16/10] overflow-hidden bg-slate-100">
                  <img
                    src={ev.image}
                    alt={ev.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-6 space-y-2">
                  <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.2em] uppercase text-[#C27B66]">
                    <span>EXHIBITION 0{idx + 1}</span>
                    <span>{ev.year}</span>
                  </div>
                  <h4 className="font-sans text-base font-semibold text-[#132238]">
                    {ev.title}
                  </h4>
                  <p className="font-mono text-[11px] text-slate-500">
                    {ev.location}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Part 3: Partners & Testimonials */}
        <EditorialPartnersPress />
      </div>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <PortfolioImageLightbox
          imageSrc={lightboxImage.src}
          imageTitle={lightboxImage.title}
          onClose={() => setLightboxImage(null)}
        />
      )}
    </section>
  );
};
