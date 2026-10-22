import React from 'react';
import { BrandItem } from '../types/CompanyProfileTypes';

interface BrandQuadrantCellProps {
  brand: BrandItem;
  index: number;
  onSelect: (brand: BrandItem) => void;
}

const BrandQuadrantCell: React.FC<BrandQuadrantCellProps> = ({
  brand,
  index,
  onSelect
}) => {
  return (
    <div
      id={`quadrant-brand-${brand.id}`}
      onClick={() => onSelect(brand)}
      className="group p-5 sm:p-7 flex flex-col justify-between cursor-pointer hover:bg-white/80 transition-all duration-300"
    >
      {/* Top Header Inside Cell */}
      <div className="flex items-center justify-between pb-3">
        <span className="font-mono text-[10px] tracking-[0.22em] uppercase px-3 py-1 rounded-full bg-white shadow-2xs border border-slate-200 text-[#132238]">
          0{index + 1} • {brand.category.replace('-', ' ')}
        </span>
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-slate-500">
          SISTER BRAND
        </span>
      </div>

      {/* Studio Image Container */}
      <div className="relative h-44 sm:h-52 w-full my-2 px-6 py-4 flex items-center justify-center">
        <img
          src={brand.imageUrl}
          alt={brand.name}
          loading="lazy"
          className="max-h-full max-w-full object-contain object-center mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Bottom Info & Trigger */}
      <div className="pt-2 flex items-end justify-between gap-4 border-t border-slate-200/60">
        <div className="space-y-1 min-w-0">
          <h3 className="font-sans text-base sm:text-lg font-semibold text-[#132238] tracking-tight group-hover:text-[#9E4738] transition-colors truncate">
            {brand.name}
          </h3>
          <p className="font-serif italic text-xs sm:text-sm text-slate-600 truncate">
            {brand.tagline}
          </p>
          <p className="font-mono text-[10px] font-semibold text-[#132238] pt-0.5 truncate">
            {brand.highlightPoints[0]}
          </p>
        </div>

        <span
          className="shrink-0 px-3 py-1.5 rounded-full border border-slate-300 bg-white shadow-2xs text-[10px] font-mono uppercase tracking-[0.16em] text-[#132238] group-hover:bg-[#132238] group-hover:text-white group-hover:border-[#132238] transition-all"
          aria-label={`Lihat spesifikasi ${brand.name}`}
        >
          Detail +
        </span>
      </div>
    </div>
  );
};

interface EditorialUnifiedSquareCardProps {
  id?: string;
  brands: BrandItem[];
  onSelect: (brand: BrandItem) => void;
}

export const EditorialUnifiedSquareCard: React.FC<EditorialUnifiedSquareCardProps> = ({
  id = 'ed-unified-square',
  brands,
  onSelect
}) => {
  const row1Brands = brands.slice(0, 2);
  const row2Brands = brands.slice(2, 4);

  return (
    <div id={id} className="relative w-full">
      {/* Garis Aksen Horizontal Arsitektural Menembus ke Kanan dari Garis Pemisah Tengah */}
      <div
        className="hidden md:block absolute top-1/2 left-0 right-[-100vw] h-[1px] bg-gradient-to-r from-transparent via-slate-300 to-slate-200/60 pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* Master 1-Card Persegi Menyatukan Seluruh Brand */}
      <div className="relative z-10 w-full rounded-[28px] lg:rounded-[36px] bg-[#F8F9FA] border border-slate-200/90 shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden divide-y divide-slate-200/80">
        {/* Row 1 (Top Quadrants) */}
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200/80">
          {row1Brands.map((brand, idx) => (
            <BrandQuadrantCell
              key={brand.id}
              brand={brand}
              index={idx}
              onSelect={onSelect}
            />
          ))}
        </div>

        {/* Row 2 (Bottom Quadrants) */}
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200/80">
          {row2Brands.map((brand, idx) => (
            <BrandQuadrantCell
              key={brand.id}
              brand={brand}
              index={idx + 2}
              onSelect={onSelect}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
