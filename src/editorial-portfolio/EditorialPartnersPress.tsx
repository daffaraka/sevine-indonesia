import React from 'react';
import { CompanyProfileService } from '../services/CompanyProfileService';
import { EditorialPartnerCarousel } from './EditorialPartnerCarousel';
import { EditorialPartnerCategoryCard } from './EditorialPartnerCategoryCard';
import { EditorialTestimonialsPress } from './EditorialTestimonialsPress';

interface EditorialPartnersPressProps {
  id?: string;
}

export const EditorialPartnersPress: React.FC<EditorialPartnersPressProps> = ({
  id = 'editorial-partners'
}) => {
  const partnerGroups = CompanyProfileService.getClientPartnerGroups();
  const allBrands = CompanyProfileService.getAllPartnerBrands();
  const testimonials = CompanyProfileService.getTestimonials();

  return (
    <div id={id} className="pt-16 border-t border-slate-200 space-y-20">
      {/* Brand & Institution Showcase */}
      <div className="space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="font-mono text-[10px] tracking-[0.28em] uppercase text-[#C27B66] block">
              JEJARING KOLABORASI • B2B &amp; KOMUNITAS
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl text-[#132238] mt-1">
              Dipercaya Berbagai Institusi &amp; Brand
            </h3>
            <p className="font-sans text-xs sm:text-sm text-slate-600 mt-2 max-w-2xl">
              Portofolio kolaborasi manufaktur apparel, tas promosi kustom, merchandise korporat, dan kampanye produk bersama brand tier-1 nasional.
            </p>
          </div>
          <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-slate-500 shrink-0">
            17+ MITRA STRATEGIS
          </span>
        </div>

        {/* 3-Row Running Brand Carousel (Kanan-Kiri with Priority Brands First) */}
        <EditorialPartnerCarousel brands={allBrands} />

        {/* 4 Category Breakdown Cards with Logo Badges */}
        <div className="pt-4 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#C27B66] font-semibold">
              RINGKASAN SEKTOR KEMITRAAN
            </span>
            <span className="font-mono text-[10px] text-slate-500">
              RETAIL • HOSPITALITY • BEAUTY • CREATIVE
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {partnerGroups.map((group, idx) => (
              <EditorialPartnerCategoryCard key={group.category} group={group} index={idx} />
            ))}
          </div>
        </div>
      </div>

      {/* Editorial Pull-Quote Testimonials with Authentic Asset Screenshots & Lightbox */}
      <EditorialTestimonialsPress testimonials={testimonials} />
    </div>
  );
};
