import React, { useState } from "react";
import { motion } from "motion/react";
import { BrandCardItem } from "./BrandCardItem";
import { BrandDetailModal } from "./BrandDetailModal";
import { CompanyProfileService } from '../../services/CompanyProfileService';
import { BrandItem } from '../../types/CompanyProfileTypes';

interface BrandShowcaseGridProps {
  id?: string;
  brands?: BrandItem[];
}

export const BrandShowcaseGrid: React.FC<BrandShowcaseGridProps> = ({
  id = "brands",
  brands,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeModalBrand, setActiveModalBrand] = useState<BrandItem | null>(
    null,
  );

  const categories = [
    { id: "all", label: "Semua 5 Brand" },
    { id: "bag", label: "Koleksi Tas" },
    { id: "apparel", label: "Pakaian Basic" },
    { id: "muslim-wear", label: "Busana Muslim" },
  ];

  const sourceBrands = brands ?? CompanyProfileService.getBrands("all");
  const filteredBrands =
    selectedCategory === "all"
      ? sourceBrands
      : sourceBrands.filter((brand) => brand.category === selectedCategory);

  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="relative py-16 md:py-24 bg-blue-grid-pattern overflow-hidden">
      {/* Top and Bottom Subtle Transition Blurs */}
      <div className="section-seam-blur-top" />
      <div className="section-seam-blur-bottom" />
      <div className="w-full max-w-7xl 2xl:max-w-[1680px] mx-auto px-3.5 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="text-xs font-bold text-doff-terracotta uppercase tracking-wider">
              Ekosistem Portofolio
            </div>
            <h2 id={`${id}-heading`} className="text-2xl sm:text-4xl font-extrabold text-doff-navy tracking-tight">
              5 Brand Unggulan Sevine
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Setiap brand dirancang memiliki kepribadian dan segmentasi pasar
              yang jelas, didukung standar manufaktur in-house yang konsisten.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`relative px-3.5 py-1.5 rounded-md text-xs font-semibold transition-colors sevine-btn-motion ${
                    isSelected
                      ? "text-white"
                      : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                  }`}
                >
                  {isSelected && (
                    <motion.span
                      layoutId="brand-category-pill"
                      transition={{ duration: 0.24, ease: [0.2, 0.8, 0.2, 1] }}
                      className="absolute inset-0 rounded-md bg-doff-navy shadow-xs"
                    />
                  )}
                  <span className="relative z-10">{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBrands.map((brand) => (
            <BrandCardItem
              key={brand.id}
              id={`brand-card-${brand.id}`}
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
