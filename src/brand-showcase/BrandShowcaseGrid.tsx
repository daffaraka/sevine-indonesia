import React, { useState } from 'react';
import { BrandCardItem } from './BrandCardItem';
import { BrandDetailModal } from './BrandDetailModal';
import { CompanyProfileService } from '../services/CompanyProfileService';
import { BrandItem } from '../types/CompanyProfileTypes';

export const BrandShowcaseGrid: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalBrand, setActiveModalBrand] = useState<BrandItem | null>(null);

  const categories = [
    { id: 'all', label: 'Semua 5 Brand' },
    { id: 'bag', label: 'Koleksi Tas' },
    { id: 'apparel', label: 'Pakaian Basic' },
    { id: 'muslim-wear', label: 'Busana Muslim' }
  ];

  const filteredBrands = CompanyProfileService.getBrands(selectedCategory);

  return (
    <section id="brands" className="py-16 md:py-24 bg-[#F8F9FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="text-xs font-bold text-doff-terracotta uppercase tracking-wider">
              Ekosistem Portofolio
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-doff-navy tracking-tight">
              5 Brand Unggulan Sevine
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Setiap brand dirancang memiliki kepribadian dan segmentasi pasar yang jelas, didukung standar manufaktur in-house yang konsisten.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-doff-navy text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBrands.map((brand) => (
            <BrandCardItem
              key={brand.id}
              brand={brand}
              onSelect={(b) => setActiveModalBrand(b)}
            />
          ))}
        </div>

        {/* Detail Bottom Sheet / Modal */}
        <BrandDetailModal
          brand={activeModalBrand}
          onClose={() => setActiveModalBrand(null)}
        />
      </div>
    </section>
  );
};
