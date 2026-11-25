import React from 'react';
import { PartnerCategoryCard } from './PartnerCategoryCard';
import { CompanyProfileService } from '../../services/CompanyProfileService';
import { EditorialPartnerCarousel } from '../../editorial/editorial-portfolio/EditorialPartnerCarousel';

import { ClientPartnerGroup, PartnerBrandItem } from '../../types/CompanyProfileTypes';

interface ClientPartnershipSectionProps {
  id?: string;
  allBrands?: PartnerBrandItem[];
  groups?: ClientPartnerGroup[];
}

export const ClientPartnershipSection: React.FC<ClientPartnershipSectionProps> = ({
  id = 'partners',
  allBrands: propAllBrands,
  groups: propGroups,
}) => {
  const groups = propGroups ?? CompanyProfileService.getClientPartnerGroups();
  const allBrands = propAllBrands ?? CompanyProfileService.getAllPartnerBrands();

  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="relative py-16 md:py-24 bg-[#132238] text-white overflow-hidden">
      {/* Top and Bottom Subtle Fades */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-[#132238] to-transparent z-10" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#0E1A2C] to-transparent z-10" />
      <div className="w-full max-w-7xl 2xl:max-w-[1680px] mx-auto px-3.5 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 space-y-12">
        {/* Header Seksi */}
        <div className="max-w-2xl space-y-3">
          <div className="text-xs font-bold text-[#E5A894] uppercase tracking-wider">
            Kolaborasi & Kepercayaan
          </div>
          <h2 id={`${id}-heading`} className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Dipercaya Berbagai Institusi & Brand
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed font-normal">
            Sevine telah dipercaya oleh berbagai entitas korporasi, restoran terkemuka, brand kecantikan ternama, dan komunitas kreatif nasional.
          </p>
        </div>

        {/* 3-Row Running Brand Carousel */}
        <div className="bg-[#0F1B2C] rounded-xl p-4 sm:p-6 border border-white/10 overflow-hidden shadow-inner">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3 mb-2">
            <span className="text-xs font-mono uppercase tracking-wider text-[#E5A894] font-semibold">
              Institusi & Brand Partner
            </span>
            <span className="text-xs font-mono text-slate-400">
              {allBrands.length} Logo Brand Terverifikasi
            </span>
          </div>
          <EditorialPartnerCarousel brands={allBrands} maskVariant="dark" />
        </div>

        {/* Grid 4 Kategori Partner */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {groups.map((group, idx) => (
            <PartnerCategoryCard key={idx} group={group} />
          ))}
        </div>
      </div>
    </section>
  );
};
