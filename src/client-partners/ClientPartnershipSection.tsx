import React from 'react';
import { PartnerCategoryCard } from './PartnerCategoryCard';
import { CompanyProfileService } from '../services/CompanyProfileService';
import { EditorialPartnerCarousel } from '../editorial-portfolio/EditorialPartnerCarousel';

interface ClientPartnershipSectionProps {
  id?: string;
}

export const ClientPartnershipSection: React.FC<ClientPartnershipSectionProps> = ({ id = 'partners' }) => {
  const groups = CompanyProfileService.getClientPartnerGroups();
  const allBrands = CompanyProfileService.getAllPartnerBrands();

  return (
    <section id={id} className="py-16 md:py-24 bg-white border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header Seksi */}
        <div className="max-w-2xl space-y-3">
          <div className="text-xs font-bold text-doff-terracotta uppercase tracking-wider">
            Kolaborasi & Kepercayaan
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-doff-navy tracking-tight">
            Dipercaya Berbagai Institusi & Brand
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed font-normal">
            Sevine telah dipercaya oleh berbagai entitas korporasi, restoran terkemuka, brand kecantikan ternama, dan komunitas kreatif nasional.
          </p>
        </div>

        {/* 3-Row Running Brand Carousel */}
        <div className="bg-[#F8F9FA] rounded-2xl p-4 sm:p-6 border border-slate-200/80 overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/80 pb-3 mb-2">
            <span className="text-xs font-mono uppercase tracking-wider text-doff-terracotta font-semibold">
              Institusi & Brand Partner
            </span>
            <span className="text-xs font-mono text-slate-500">
              17 Logo Brand Terverifikasi
            </span>
          </div>
          <EditorialPartnerCarousel brands={allBrands} />
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
