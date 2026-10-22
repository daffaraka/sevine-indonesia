import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { BrandItem } from '../types/CompanyProfileTypes';

interface BrandCardItemProps {
  id?: string;
  brand: BrandItem;
  onSelect: (brand: BrandItem) => void;
}

export const BrandCardItem: React.FC<BrandCardItemProps> = ({ id, brand, onSelect }) => {
  const cardId = id || `brand-card-${brand.id}`;

  return (
    <div id={cardId} className="bg-white rounded-xl border border-slate-200/90 shadow-md hover:shadow-lg overflow-hidden flex flex-col justify-between group hover:border-slate-300 transition-all">
      {/* Brand Image Preview */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-50 p-6 flex items-center justify-center">
        <img
          src={brand.imageUrl}
          alt={brand.name}
          className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-3 left-3">
          <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-xs ${brand.badgeColor}`}>
            {brand.name}
          </span>
        </div>
      </div>

      {/* Brand Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <div className="font-bold text-doff-navy text-lg group-hover:text-doff-terracotta transition-colors">
            {brand.name}
          </div>
          <div className="text-xs font-semibold text-slate-500">
            {brand.tagline}
          </div>
          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
            {brand.description}
          </p>
        </div>

        {/* Feature Tags */}
        <div className="space-y-3 pt-2 border-t border-slate-100">
          <div className="flex flex-wrap gap-1.5">
            {brand.highlightPoints.map((point, idx) => (
              <span
                key={idx}
                className="text-[10px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded"
              >
                {point}
              </span>
            ))}
          </div>

          <button
            onClick={() => onSelect(brand)}
            className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-slate-50 hover:bg-slate-100 text-doff-navy text-xs font-semibold transition-colors"
          >
            <span>Lihat Detail Brand</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
