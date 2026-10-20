import React from 'react';
import { PartnerCategoryCard } from './PartnerCategoryCard';
import { CompanyProfileService } from '../services/CompanyProfileService';

export const ClientPartnershipSection: React.FC = () => {
  const groups = CompanyProfileService.getClientPartnerGroups();

  return (
    <section id="partners" className="py-16 md:py-24 bg-white border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header Seksi */}
        <div className="max-w-2xl space-y-3">
          <div className="text-xs font-bold text-doff-terracotta uppercase tracking-wider">
            Kolaborasi & Kepercayaan
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-doff-navy tracking-tight">
            Klien & Rekan Kemitraan
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed font-normal">
            Sevine telah dipercaya oleh berbagai entitas korporasi, restoran terkemuka, brand kecantikan ternama, dan komunitas kreatif nasional.
          </p>
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
