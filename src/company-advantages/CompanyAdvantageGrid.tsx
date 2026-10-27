import React from 'react';
import { AdvantageItemCard } from './AdvantageItemCard';
import { CompanyProfileService } from '../services/CompanyProfileService';

interface CompanyAdvantageGridProps {
  id?: string;
}

export const CompanyAdvantageGrid: React.FC<CompanyAdvantageGridProps> = ({ id = 'advantages' }) => {
  const advantages = CompanyProfileService.getAdvantages();

  return (
    <section id={id} className="relative py-16 md:py-24 bg-blue-diagonal-stripes overflow-hidden">
      {/* Top and Bottom Subtle Transition Blurs */}
      <div className="section-seam-blur-top" />
      <div className="section-seam-blur-bottom" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header Seksi */}
        <div className="max-w-2xl space-y-3">
          <div className="text-xs font-bold text-doff-terracotta uppercase tracking-wider">
            Keunggulan Manufaktur & Bisnis
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-doff-navy tracking-tight">
            5 Keunggulan Kompetitif Sevine
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed font-normal">
            Fondasi manufaktur yang solid dan transparansi alur kerja memberikan kepastian kualitas dan ketenangan pikiran bagi setiap mitra bisnis.
          </p>
        </div>

        {/* Grid 5 Keunggulan */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {advantages.map((item) => (
            <AdvantageItemCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};
