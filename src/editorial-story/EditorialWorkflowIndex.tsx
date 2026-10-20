import React, { useState } from 'react';
import { CompanyProfileService } from '../services/CompanyProfileService';

export const EditorialWorkflowIndex: React.FC = () => {
  const workflowSteps = CompanyProfileService.getWorkflowSteps();
  const advantages = CompanyProfileService.getAdvantages();
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  return (
    <div className="pt-8 border-t border-white/10 space-y-16">
      {/* 7-Step In-House Production Ledger */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-4 space-y-4">
          <span className="font-mono text-[10px] tracking-[0.28em] uppercase text-[#C27B66] block">
            ALUR MANUFAKTUR • 07 TAHAP
          </span>
          <h3 className="font-serif text-3xl sm:text-4xl text-white leading-tight">
            Dari Riset Pola Hingga Pengiriman Akhir.
          </h3>
          <p className="text-xs sm:text-sm text-[#CBD5E1] leading-relaxed">
            Setiap produk melewati protokol standar kualitas in-house tanpa sub-kontrak acak,
            menjamin ketepatan jadwal dan presisi jahitan.
          </p>

          {/* Highlighted Active Stage Preview Box with shadow-md */}
          <div className="mt-6 p-6 rounded-2xl bg-[#1B2E4B] border border-white/10 shadow-md space-y-2 text-white">
            <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.22em] uppercase text-[#C27B66]">
              <span>TAHAP AKTIF 0{workflowSteps[activeStepIndex].step}</span>
              <span>{workflowSteps[activeStepIndex].category}</span>
            </div>
            <div className="font-serif text-2xl italic text-white">
              {workflowSteps[activeStepIndex].title}
            </div>
            <p className="text-xs text-[#CBD5E1] leading-relaxed">
              {workflowSteps[activeStepIndex].description}
            </p>
          </div>
        </div>

        {/* Interactive Swiss Typographic Table */}
        <div className="lg:col-span-8 divide-y divide-white/10 border-y border-white/10 rounded-2xl overflow-hidden bg-[#1B2E4B]/50 shadow-md">
          {workflowSteps.map((item, idx) => {
            const isSelected = activeStepIndex === idx;
            return (
              <div
                key={item.step}
                onMouseEnter={() => setActiveStepIndex(idx)}
                onClick={() => setActiveStepIndex(idx)}
                className={`py-4 sm:py-5 px-4 sm:px-6 transition-colors cursor-pointer grid grid-cols-12 items-baseline gap-4 ${
                  isSelected ? 'bg-[#1B2E4B] text-white' : 'hover:bg-[#1B2E4B]/40 text-[#CBD5E1]'
                }`}
              >
                <span className="col-span-2 sm:col-span-1 font-mono text-xs text-[#C27B66] font-semibold">
                  0{item.step}
                </span>
                <div className="col-span-10 sm:col-span-4">
                  <span className="font-sans text-sm sm:text-base font-semibold text-white block">
                    {item.title}
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-[#94A3B8]">
                    {item.category}
                  </span>
                </div>
                <p className="col-span-12 sm:col-span-7 text-xs text-[#CBD5E1] leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5 Key Factory Advantages Strip with shadow-md */}
      <div className="space-y-6">
        <div className="font-mono text-[10px] tracking-[0.26em] uppercase text-[#94A3B8]">
          05 KEUNGGULAN KOMPETITIF PABRIK MANDIRI
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {advantages.map((adv) => (
            <div
              key={adv.id}
              className="p-5 rounded-2xl bg-[#1B2E4B] border border-white/10 shadow-md hover:shadow-lg transition-shadow flex flex-col justify-between space-y-4"
            >
              <span className="font-mono text-[11px] tracking-[0.2em] text-[#C27B66] font-semibold">
                / 0{adv.id}
              </span>
              <div className="space-y-1.5">
                <h4 className="font-sans text-sm font-semibold text-white">
                  {adv.title}
                </h4>
                <p className="text-xs text-[#CBD5E1] leading-relaxed">
                  {adv.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
