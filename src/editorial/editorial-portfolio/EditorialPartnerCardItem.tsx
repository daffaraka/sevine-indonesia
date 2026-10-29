import React from 'react';
import { PartnerBrandItem } from '../../types/CompanyProfileTypes';

interface EditorialPartnerCardItemProps {
  brand: PartnerBrandItem;
  isPriority?: boolean;
}

export const EditorialPartnerCardItem: React.FC<EditorialPartnerCardItemProps> = ({
  brand,
  isPriority = false
}) => {
  return (
    <div
      className={`w-[290px] sm:w-[350px] md:w-[380px] shrink-0 rounded-2xl p-4 sm:p-5 border transition-all duration-300 ease-out flex items-center gap-4 sm:gap-4.5 select-none relative cursor-pointer transform hover:scale-[1.03] sm:hover:scale-105 hover:z-20 ${
        isPriority
          ? 'bg-gradient-to-r from-white via-[#F8FAFD] to-[#EFF6FF] border-blue-200 shadow-sm hover:shadow-xl hover:shadow-blue-500/10 hover:border-blue-400'
          : 'bg-gradient-to-r from-white to-[#F5F8FC] border-slate-200/90 shadow-xs hover:shadow-lg hover:shadow-blue-500/10 hover:border-blue-300'
      }`}
    >
      {/* Enlarged Logo Container with Blue Accent Touch */}
      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white p-1.5 sm:p-2 border border-blue-100/90 ring-2 ring-blue-50/80 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:border-blue-300 group-hover:ring-blue-100 transition-all duration-300 shadow-2xs">
        <img
          src={brand.logo}
          alt={brand.imageAlt || `Logo ${brand.name}`}
          width={80}
          height={80}
          decoding="async"
          loading="lazy"
          className="w-full h-full object-contain"
        />
      </div>

      <div className="min-w-0 flex-1 space-y-1">
        {isPriority && (
          <div className="text-[10px] sm:text-[11px] uppercase tracking-wider text-blue-600 font-normal flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
            <span>Featured</span>
          </div>
        )}
        {/* Judul brand BOLD */}
        <h4 className="font-serif text-base sm:text-lg font-bold text-[#132238] truncate group-hover:text-blue-900 transition-colors">
          {brand.name}
        </h4>
        {/* Sisanya teks biasa (font-normal) */}
        <p className="font-sans text-xs sm:text-[13px] font-normal text-slate-500 tracking-normal truncate">
          {brand.role}
        </p>
      </div>
    </div>
  );
};
