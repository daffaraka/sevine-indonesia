import React from "react";
import { ArrowRight } from "lucide-react";
import { HeroStatCounter } from "./HeroStatCounter";
import { CompanyProfileService } from "../services/CompanyProfileService";

interface HeroBannerProps {
  id?: string;
  onNavigate: (sectionId: string) => void;
}

export const HeroBannerView: React.FC<HeroBannerProps> = ({
  id = "hero",
  onNavigate,
}) => {
  const stats = CompanyProfileService.getMetricStats();

  return (
    <section
      id={id}
      className="relative overflow-hidden pt-14 pb-16 md:pt-20 md:pb-24 bg-blue-mesh-gradient"
    >
      {/* Decorative Sevine Navy Aura Blobs */}
      <div className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#1B2E4B]/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-[#132238]/10 blur-3xl" />

      {/* Bottom Subtle Transition Blur */}
      <div className="section-seam-blur-bottom" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          {/* Authentic Corporate Identifier */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded bg-white border border-slate-200 text-slate-600 text-[11px] font-semibold tracking-wider uppercase shadow-doff-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-doff-terracotta shrink-0" />
            <span>COMPANY PROFILE</span>
          </div>

          {/* Heading Utama Tanpa Gradien AI */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-doff-navy tracking-tight leading-[1.18]">
            Membangun Masa Depan <br className="hidden sm:inline" />
            <span className="text-doff-terracotta font-serif italic font-normal">
              Apparel & Lifestyle
            </span>{" "}
            Indonesia
          </h1>

          {/* Subtitle / Deskripsi */}
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto font-normal">
            Lebih dari 7 tahun dipercaya sebagai produsen tas dan apparel
            terintegrasi. Menaungi 5 brand unggulan dengan proses produksi
            mandiri berstandar tinggi untuk pasar ritel, reseller nasional, dan
            kemitraan korporasi.
          </p>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => onNavigate("contact")}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-doff-navy text-white text-xs font-semibold hover:bg-doff-navydark transition-colors shadow-doff-sm"
            >
              <span>Ajukan Kemitraan & Reseller</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onNavigate("brands")}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-white text-doff-navy border border-slate-300 text-xs font-semibold hover:bg-slate-50 transition-colors shadow-doff-sm"
            >
              <span>Jelajahi 5 Brand Kami</span>
            </button>
          </div>

          {/* Trust Points Tanpa Icon Gimmick */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-3 text-xs text-slate-500 font-medium">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
              Produksi Mandiri (In-House Factory)
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
              Kapasitas Skala Besar 30K+/Bulan
            </span>
          </div>
        </div>

        {/* 3 Metric Stats Counter */}
        <div className="mt-12 lg:mt-16">
          <HeroStatCounter stats={stats} />
        </div>
      </div>
    </section>
  );
};
