import React, { useState } from 'react';
import { CompanyProfileService } from '../../services/CompanyProfileService';
import { PortfolioEventsGrid } from '../portfolio-gallery/PortfolioEventsGrid';
import { PortfolioImageLightbox } from '../portfolio-gallery/PortfolioImageLightbox';

interface EventDocumentationSectionProps {
  id?: string;
}

/**
 * Standalone section showcasing CV. Sevine Indonesia's offline exhibition and pop-up event documentation.
 */
export const EventDocumentationSection: React.FC<EventDocumentationSectionProps> = ({
  id = 'events',
}) => {
  const [lightboxData, setLightboxData] = useState<{ src: string | null; title: string | null }>({
    src: null,
    title: null,
  });

  const offlineEvents = CompanyProfileService.getOfflineEvents();

  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="relative py-16 md:py-24 bg-blue-grid-pattern border-t border-slate-200/80 overflow-hidden"
    >
      <div className="section-seam-blur-top" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#132238]/70 to-transparent z-10" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="text-xs font-bold text-doff-terracotta uppercase tracking-wider">
              Dokumentasi Event &amp; Pameran
            </div>
            <h2
              id={`${id}-heading`}
              className="text-2xl sm:text-4xl font-extrabold text-doff-navy tracking-tight"
            >
              Kehadiran Pameran &amp; Pasar Kreatif
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed font-normal">
              Rekam jejak partisipasi aktif CV. Sevine Indonesia dalam berbagai pameran fashion,
              pop-up market, dan pasar kreatif publik di berbagai kota.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 self-start md:self-auto px-3.5 py-2 rounded-xl bg-white border border-slate-200/90 shadow-doff-sm text-xs font-semibold text-doff-navy shrink-0">
            <span>{offlineEvents.length} Dokumentasi Pameran</span>
          </div>
        </div>

        <PortfolioEventsGrid
          events={offlineEvents}
          onZoom={(src, title) => setLightboxData({ src, title })}
        />

        <PortfolioImageLightbox
          imageSrc={lightboxData.src}
          imageTitle={lightboxData.title}
          onClose={() => setLightboxData({ src: null, title: null })}
        />
      </div>
    </section>
  );
};
