import React from 'react';
import { BrandItem } from '../types/CompanyProfileTypes';

interface EditorialSquircleCardProps {
  brand: BrandItem;
  index: number;
  onSelect: (brand: BrandItem) => void;
}

export const EditorialSquircleCard: React.FC<EditorialSquircleCardProps> = ({
  brand,
  index,
  onSelect
}) => {
  return (
    <article
      onClick={() => onSelect(brand)}
      className="group relative rounded-[24px] bg-[#F8F9FA] border border-slate-200/90 shadow-md hover:shadow-lg overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-1 hover:border-slate-300 flex flex-col justify-between"
    >
      {/* Top Minimal Badge (Ref Image 1 "НОВИНКА" Corner Tag) */}
      <div className="p-5 pb-0 flex items-center justify-between z-10">
        <span className="font-mono text-[10px] tracking-[0.22em] uppercase px-2.5 py-1 rounded-full bg-white shadow-sm border border-slate-200 text-[#132238]">
          0{index + 1} • {brand.category.replace('-', ' ')}
        </span>
        <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-slate-500">
          IN-HOUSE
        </span>
      </div>

      {/* Studio Image Container with Soft Fade (Ref Image 2 Squircle Card) */}
      <div className="relative h-72 sm:h-80 w-full overflow-hidden my-2">
        <img
          src={brand.imageUrl}
          alt={brand.name}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
        />
        {/* Soft Bottom Gradient into Card Base */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#F8F9FA] via-[#F8F9FA]/70 to-transparent" />
      </div>

      {/* Bottom Footer Inside Squircle with shadow-md details */}
      <div className="relative z-10 px-6 pb-6 pt-1 flex items-end justify-between gap-4">
        <div className="space-y-1">
          <h3 className="font-sans text-base sm:text-lg font-semibold text-[#132238] tracking-tight group-hover:text-[#9E4738] transition-colors">
            {brand.name}
          </h3>
          <p className="font-serif italic text-sm text-slate-600">
            {brand.tagline}
          </p>
          <p className="font-mono text-[11px] font-semibold text-[#132238] pt-1">
            {brand.highlightPoints[0]}
          </p>
        </div>

        {/* Minimalist Hairline Trigger with subtle shadow */}
        <span
          className="shrink-0 px-3.5 py-2 rounded-full border border-slate-300 bg-white shadow-sm text-[11px] font-mono uppercase tracking-[0.16em] text-[#132238] group-hover:bg-[#132238] group-hover:text-white group-hover:border-[#132238] transition-all"
          aria-label={`Lihat spesifikasi ${brand.name}`}
        >
          Detail +
        </span>
      </div>
    </article>
  );
};
