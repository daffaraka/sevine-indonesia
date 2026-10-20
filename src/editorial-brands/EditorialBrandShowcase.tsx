import React, { useState } from 'react';
import { CompanyProfileService } from '../services/CompanyProfileService';
import { BrandItem } from '../types/CompanyProfileTypes';
import { EditorialSquircleCard } from './EditorialSquircleCard';
import { BrandDetailModal } from '../brand-showcase/BrandDetailModal';

export const EditorialBrandShowcase: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalBrand, setActiveModalBrand] = useState<BrandItem | null>(null);

  const categories = [
    { id: 'all', label: 'Semua 5 Lini' },
    { id: 'bag', label: 'Koleksi Tas' },
    { id: 'apparel', label: 'Pakaian Basic' },
    { id: 'muslim-wear', label: 'Busana Muslim' }
  ];

  const brands = CompanyProfileService.getBrands(selectedCategory);

  return (
    <section
      id="ed-brands"
      className="relative py-16 sm:py-24 bg-white border-b border-slate-200 overflow-hidden"
    >
      {/* Background Continuous Ribbon Wave (Ref Image 2 Catalog Background Wave) */}
      <svg
        className="pointer-events-none absolute inset-x-0 top-32 w-full h-[520px] opacity-40"
        viewBox="0 0 1440 520"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M-100 220 C 320 40, 740 460, 1540 180"
          stroke="#E2E8F0"
          strokeWidth="56"
          strokeLinecap="round"
        />
      </svg>

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-8 space-y-12">
        {/* Centered Header & Minimalist Text Tabs (Ref Image 1 "НОВИНКИ" & Image 2 "New Arrivals") */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="font-mono text-[10px] tracking-[0.28em] uppercase text-[#9E4738]">
            DIREKTORI EKOSISTEM • 05 ENTITAS
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal tracking-wide text-[#171715]">
            Lini Brand Unggulan
          </h2>
          <p className="text-xs sm:text-sm text-[#6E6B64] leading-relaxed">
            Setiap lini produk dikembangkan untuk menjawab karakter aktivitas harian masyarakat
            Indonesia, dijahit langsung di fasilitas produksi mandiri kami.
          </p>

          {/* Clean Underline Category Tabs (Ref Image 1 "Платья Трикотаж Рубашки...") */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 sm:gap-10 border-b border-[#D8D3C8]/70 pb-3">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`relative pb-2 text-xs sm:text-sm tracking-wide transition-colors ${
                    isActive
                      ? 'text-[#171715] font-semibold after:content-[""] after:absolute after:inset-x-0 after:-bottom-[13px] after:h-[2px] after:bg-[#171715]'
                      : 'text-[#6E6B64] hover:text-[#171715]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Squircle Cards Grid (Ref Image 2 3-Column Squircle Showcase) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {brands.map((brand, idx) => (
            <EditorialSquircleCard
              key={brand.id}
              brand={brand}
              index={idx}
              onSelect={(selected) => setActiveModalBrand(selected)}
            />
          ))}
        </div>

        {/* Bottom Centered Outline Action (Ref Image 1 "Смотреть все новинки" Box Button) */}
        {selectedCategory !== 'all' && (
          <div className="pt-2 flex justify-center">
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className="px-8 py-3 border border-[#171715]/30 text-xs font-mono uppercase tracking-[0.2em] text-[#171715] hover:bg-[#171715] hover:text-[#F6F4F0] transition-colors"
            >
              Tampilkan Semua 5 Brand
            </button>
          </div>
        )}

        {/* Reuse Detail Modal */}
        <BrandDetailModal
          brand={activeModalBrand}
          onClose={() => setActiveModalBrand(null)}
        />
      </div>
    </section>
  );
};
