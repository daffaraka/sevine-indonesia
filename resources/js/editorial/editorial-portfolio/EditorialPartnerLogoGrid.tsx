import React, { useState, useMemo } from 'react';
import { PartnerBrandItem } from '../../types/CompanyProfileTypes';

interface EditorialPartnerLogoGridProps {
  brands: PartnerBrandItem[];
}

type FilterCategory = 'all' | 'beauty' | 'hospitality' | 'retail' | 'community';

const CATEGORY_TABS: { key: FilterCategory; label: string }[] = [
  { key: 'all', label: 'Semua Brand' },
  { key: 'beauty', label: 'Beauty & Skincare' },
  { key: 'hospitality', label: 'Hospitality & Cafe' },
  { key: 'retail', label: 'Retail & Korporasi' },
  { key: 'community', label: 'Komunitas & Event' }
];

export const EditorialPartnerLogoGrid: React.FC<EditorialPartnerLogoGridProps> = ({ brands }) => {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('all');

  const filteredBrands = useMemo(() => {
    if (activeCategory === 'all') return brands;
    return brands.filter((brand) => brand.category === activeCategory);
  }, [brands, activeCategory]);

  return (
    <div className="space-y-6">
      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2">
        {CATEGORY_TABS.map((tab) => {
          const isActive = activeCategory === tab.key;
          const count =
            tab.key === 'all'
              ? brands.length
              : brands.filter((b) => b.category === tab.key).length;

          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveCategory(tab.key)}
              className={`px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-200 flex items-center gap-1.5 ${
                isActive
                  ? 'bg-[#132238] text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200/90 hover:border-slate-300 hover:text-slate-900'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Grid of Brand Logos */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
        {filteredBrands.map((brand) => (
          <div
            key={brand.id}
            id={`partner-brand-${brand.id}`}
            className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md hover:border-slate-300 transition-all duration-200 flex flex-col items-center justify-between text-center group"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center p-1 rounded-full bg-slate-50/60 border border-slate-100 group-hover:bg-white transition-colors duration-200 mb-3">
              <img
                src={brand.logo}
                alt={`Logo ${brand.name}`}
                loading="lazy"
                className="w-full h-full object-contain filter drop-shadow-xs group-hover:scale-105 transition-transform duration-200"
              />
            </div>

            <div className="w-full space-y-1">
              <h5 className="font-serif text-xs sm:text-sm font-semibold text-[#132238] line-clamp-1">
                {brand.name}
              </h5>
              <p className="font-mono text-[9px] sm:text-[10px] text-slate-500 uppercase tracking-tight line-clamp-1">
                {brand.role}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
