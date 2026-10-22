import React from 'react';
import { KineticPortraitCard, KineticCardItem } from './KineticPortraitCard';
import { CompanyProfileService } from '../services/CompanyProfileService';

interface KineticNumbersSectionProps {
  id?: string;
}

export const KineticNumbersSection: React.FC<KineticNumbersSectionProps> = ({
  id = 'ed-numbers'
}) => {
  const departments = CompanyProfileService.getDepartments();

  const kineticItems: KineticCardItem[] = [
    {
      id: 'kin-years',
      metricValue: '07+ Thn',
      metricLabel: 'Dedikasi Manufaktur',
      caption: 'Dipercaya sejak 2019 membangun ekosistem tas dan apparel lokal berdaya saing tinggi.',
      imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80',
      bgToneClass: 'bg-[#12090D]',
      washOverlayClass: 'bg-gradient-to-t from-[#1A070E]/90 via-[#9E1F40]/45 to-[#0D0609]/65 mix-blend-multiply',
      ghostMode: 'light'
    },
    {
      id: 'kin-output',
      metricValue: '30.000+',
      metricLabel: 'Produk / Bulan',
      caption: 'Rata-rata volume produksi dan distribusi stabil melalui kanal online maupun kemitraan B2B.',
      imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&auto=format&fit=crop&q=80',
      bgToneClass: 'bg-[#CFC8BE]',
      washOverlayClass: 'bg-gradient-to-t from-[#1F1B18]/85 via-[#4A3F35]/20 to-transparent',
      ghostMode: 'dark'
    },
    {
      id: 'kin-community',
      metricValue: '500K+',
      metricLabel: 'Pengikut Digital',
      caption: 'Komunitas pelanggan aktif dan jaringan reseller yang tersebar di berbagai provinsi.',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80',
      bgToneClass: 'bg-[#DCE3E4]',
      washOverlayClass: 'bg-gradient-to-t from-[#282215]/85 via-[#B68642]/30 to-[#6C8B8E]/20',
      ghostMode: 'dark'
    },
    {
      id: 'kin-brands',
      metricValue: '05 Lini',
      metricLabel: 'Brand & 06 Divisi Inti',
      caption: 'Sinergi tim kreatif, R&D pola, QC bar-tack, hingga distribusi logistik dalam satu atap.',
      imageUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&auto=format&fit=crop&q=80',
      bgToneClass: 'bg-[#C86D1E]',
      washOverlayClass: 'bg-gradient-to-t from-[#3D1408]/90 via-[#D97218]/55 to-[#E08A1E]/40',
      ghostMode: 'light'
    }
  ];

  return (
    <section
      id={id}
      className="relative bg-[#EEF1F5] border-b border-slate-300/80 sm:border-r-[20px] sm:border-r-[#132238]"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 py-16 sm:py-24 space-y-10">
        {/* 4 Tall Rounded Portrait Strip (Ref Image 3 Kinetic Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {kineticItems.map((item, idx) => (
            <KineticPortraitCard
              key={item.id}
              id={`kinetic-card-${item.id}`}
              item={item}
              index={idx}
            />
          ))}
        </div>

        {/* Signature Technical Meta Label (Ref Image 3 "+ BY THE NUMBERS") */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-2 pb-8 border-b border-slate-300">
          <div className="inline-flex items-center gap-2.5">
            <span className="w-4 h-4 bg-[#C27B66] text-white font-mono text-[10px] font-bold flex items-center justify-center leading-none rounded shadow-sm">
              +
            </span>
            <span className="font-mono text-xs font-bold tracking-[0.18em] uppercase text-[#132238]">
              BY THE NUMBERS • SKALA &amp; TALENTA MANUFAKTUR
            </span>
          </div>

          <p className="font-serif italic text-base sm:text-lg text-slate-600 max-w-xl">
            Di balik setiap angka terdapat pergerakan tangan penjahit, pembuat pola, dan tim kreatif
            yang menjaga standar mutu CV. Sevine Indonesia.
          </p>
        </div>

        {/* 6 Core Departments Index with shadow-md cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pt-2">
          {departments.map((dept, index) => (
            <div
              key={dept.id}
              id={`dept-card-${dept.id}`}
              className="space-y-2 bg-white/95 p-6 rounded-2xl border border-slate-200/90 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#C27B66] font-semibold">
                  DEPT 0{index + 1}
                </span>
                <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-slate-500">
                  {dept.scope}
                </span>
              </div>
              <h3 className="font-serif text-xl font-semibold text-[#132238]">
                {dept.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {dept.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
