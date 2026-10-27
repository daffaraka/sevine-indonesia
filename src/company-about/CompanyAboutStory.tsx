import React from 'react';
import { CoreValuesCard } from './CoreValuesCard';
import { VisionMissionSection } from './VisionMissionSection';
import { CompanyProfileService } from '../services/CompanyProfileService';

interface CompanyAboutStoryProps {
  id?: string;
}

export const CompanyAboutStory: React.FC<CompanyAboutStoryProps> = ({ id = 'about' }) => {
  const coreValues = CompanyProfileService.getCoreValues();
  const { vision, missions } = CompanyProfileService.getVisionMission();

  return (
    <section
      id={id}
      className="relative py-16 md:py-24 bg-textile-texture overflow-hidden"
    >
      {/* Top and Bottom Subtle Transition Blurs */}
      <div className="section-seam-blur-top" />
      <div className="section-seam-blur-bottom" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header Seksi */}
        <div className="max-w-3xl space-y-3">
          <div className="text-xs font-bold text-doff-terracotta uppercase tracking-wider">
            Mengenal Lebih Dekat
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-doff-navy tracking-tight">
            Profil CV. SEVINE INDONESIA
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed font-normal">
            Berawal dari komitmen menghadirkan produk tas lokal berkualitas dan berdaya saing, Sevine telah berkembang menjadi entitas manufaktur modern yang menaungi 5 brand apparel & lifestyle. Dengan fasilitas produksi in-house di Ngawi dan sentra bisnis kreatif di Malang, kami memadukan keahlian pengerjaan tangan dengan efisiensi sistemik.
          </p>
        </div>

        {/* Core Values S.V.N */}
        <CoreValuesCard values={coreValues} />

        {/* Visi & Misi */}
        <VisionMissionSection vision={vision} missions={missions} />
      </div>
    </section>
  );
};
