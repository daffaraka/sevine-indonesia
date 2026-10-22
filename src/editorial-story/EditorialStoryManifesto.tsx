import React from 'react';
import { CompanyProfileService } from '../services/CompanyProfileService';
import { EditorialWorkflowIndex } from './EditorialWorkflowIndex';

interface EditorialStoryManifestoProps {
  id?: string;
}

export const EditorialStoryManifesto: React.FC<EditorialStoryManifestoProps> = ({
  id = 'ed-story'
}) => {
  const coreValues = CompanyProfileService.getCoreValues();
  const { vision, missions } = CompanyProfileService.getVisionMission();

  return (
    <section id={id} className="py-16 sm:py-24 bg-[#132238] border-b border-white/10 text-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 space-y-20">
        {/* Part 1: Two-Column Asymmetric Magazine Spread (Vision & Mission) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div className="lg:col-span-5 space-y-5">
            <span className="font-mono text-[10px] tracking-[0.28em] uppercase text-[#C27B66] block">
              MANIFESTO PERUSAHAAN • SEJAK 2019
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal leading-[1.12] text-white">
              Kemandirian Produksi Sebagai Fondasi Kepercayaan.
            </h2>
            <p className="text-xs sm:text-sm text-[#CBD5E1] leading-relaxed">
              Berangkat dari fasilitas manufaktur di Ngawi dan pusat kreatif di Kota Malang, CV.
              Sevine Indonesia mengintegrasikan riset tren, pembuatan pola, penjahitan massal,
              hingga distribusi ritel dan B2B tanpa perantara.
            </p>
          </div>

          <div className="lg:col-span-7 bg-[#1B2E4B] p-7 sm:p-10 border border-white/10 rounded-2xl shadow-md space-y-8">
            <div className="space-y-3 pb-6 border-b border-white/10">
              <span className="font-mono text-[10px] tracking-[0.24em] uppercase text-[#94A3B8]">
                01 / {vision.title}
              </span>
              <blockquote className="font-serif italic text-xl sm:text-2xl text-white leading-relaxed">
                “{vision.statement}”
              </blockquote>
            </div>

            <div className="space-y-4">
              <span className="font-mono text-[10px] tracking-[0.24em] uppercase text-[#94A3B8] block">
                02 / Misi Strategis Manufaktur &amp; Kemitraan
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                {missions.map((mission, idx) => (
                  <div key={idx} className="flex items-baseline gap-3 text-xs text-[#CBD5E1] leading-relaxed">
                    <span className="font-mono text-[10px] text-[#C27B66] font-semibold shrink-0">
                      0{idx + 1}.
                    </span>
                    <span>{mission}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Part 2: S - V - N Core Values Using Giant Display Serif Initials with shadow-md */}
        <div className="space-y-6">
          <div className="flex items-baseline justify-between border-b border-white/10 pb-3">
            <span className="font-mono text-[10px] tracking-[0.26em] uppercase text-[#C27B66]">
              FILOSOFI INTI • S — V — N
            </span>
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#94A3B8]">
              PRINSIP KERJA HARIAN
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {coreValues.map((val) => (
              <article
                key={val.letter}
                id={`core-value-${val.letter.toLowerCase()}`}
                className="bg-[#1B2E4B] border border-white/10 rounded-2xl p-7 sm:p-8 flex flex-col justify-between space-y-8 shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <span className="font-serif text-6xl sm:text-7xl leading-none text-[#C27B66]/40">
                    {val.letter}
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#C27B66] px-2.5 py-1 rounded bg-[#132238] border border-white/10">
                    {val.subtitle}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="font-sans text-lg font-semibold text-white tracking-tight">
                    {val.name}
                  </h3>
                  <p className="text-xs text-[#CBD5E1] leading-relaxed">
                    {val.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Part 3: 7-Step Production Workflow & 5 Factory Advantages */}
        <EditorialWorkflowIndex />
      </div>
    </section>
  );
};
