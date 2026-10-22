import React, { useState } from 'react';
import { PortfolioProductGrid } from './PortfolioProductGrid';
import { PortfolioEventsGrid } from './PortfolioEventsGrid';
import { PortfolioImageLightbox } from './PortfolioImageLightbox';
import { CompanyProfileService } from '../services/CompanyProfileService';

interface PortfolioGalleryTabsProps {
  id?: string;
}

export const PortfolioGalleryTabs: React.FC<PortfolioGalleryTabsProps> = ({ id = 'portfolio' }) => {
  const [activeTab, setActiveTab] = useState<'products' | 'events'>('products');
  const [lightboxData, setLightboxData] = useState<{ src: string | null; title: string | null }>({
    src: null,
    title: null
  });

  const products = CompanyProfileService.getPortfolioSamples();
  const events = CompanyProfileService.getOfflineEvents();

  return (
    <section id={id} className="py-16 md:py-24 bg-[#F8F9FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header Seksi */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="text-xs font-bold text-doff-terracotta uppercase tracking-wider">
              Karya & Pengalaman Nyata
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-doff-navy tracking-tight">
              Portofolio Sevine Indonesia
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed font-normal">
              Eksplorasi kreasi produk apparel kami dan dokumentasi kehadiran di pameran fashion publik terkemuka.
            </p>
          </div>

          {/* Tab Button Switcher */}
          <div className="inline-flex p-1 rounded-xl bg-slate-200/80 border border-slate-300/80 self-start md:self-auto">
            <button
              onClick={() => setActiveTab('products')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'products'
                  ? 'bg-white text-doff-navy shadow-xs'
                  : 'text-slate-600 hover:text-doff-navy'
              }`}
            >
              Sample Products ({products.length})
            </button>
            <button
              onClick={() => setActiveTab('events')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'events'
                  ? 'bg-white text-doff-navy shadow-xs'
                  : 'text-slate-600 hover:text-doff-navy'
              }`}
            >
              Offline Events ({events.length})
            </button>
          </div>
        </div>

        {/* Tab Content Rendering */}
        {activeTab === 'products' ? (
          <PortfolioProductGrid
            products={products}
            onZoom={(src, title) => setLightboxData({ src, title })}
          />
        ) : (
          <PortfolioEventsGrid
            events={events}
            onZoom={(src, title) => setLightboxData({ src, title })}
          />
        )}

        {/* Lightbox Modal */}
        <PortfolioImageLightbox
          imageSrc={lightboxData.src}
          imageTitle={lightboxData.title}
          onClose={() => setLightboxData({ src: null, title: null })}
        />
      </div>
    </section>
  );
};
