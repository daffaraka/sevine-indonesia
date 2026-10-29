import React, { useState } from 'react';
import { WorkflowStepCard } from './WorkflowStepCard';
import { WorkflowActiveStageCard } from './WorkflowActiveStageCard';
import { CompanyProfileService } from '../../services/CompanyProfileService';

interface WorkflowProcessTimelineProps {
  id?: string;
}

export const WorkflowProcessTimeline: React.FC<WorkflowProcessTimelineProps> = ({
  id = 'workflow'
}) => {
  const steps = CompanyProfileService.getWorkflowSteps();
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  const activeStep = steps[activeStepIndex] ?? steps[0];

  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="relative py-16 md:py-24 bg-[#132238] text-white border-y border-white/10 overflow-hidden"
    >
      {/* Decorative Sevine Navy Aura Glow Blobs */}
      <div className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#1B2E4B]/60 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-[#1B2E4B]/40 blur-3xl" />

      {/* Top and Bottom Transition Seam Blurs */}
      <div className="section-seam-blur-top" />
      <div className="section-seam-blur-bottom" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 12-Column Split-Screen Ledger Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Kolom Kiri: Header & Kotak Tahap Aktif (4 Kolom) */}
          <div className="lg:col-span-4 space-y-4">
            <span className="font-mono text-[10px] tracking-[0.28em] uppercase text-doff-terracotta font-bold block">
              STANDARISASI MUTU • 07 TAHAP
            </span>
            <h2 id={`${id}-heading`} className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Dari Riset Pola Hingga Pengiriman Akhir.
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              Setiap produk melewati 7 protokol ketat manufaktur mandiri tanpa sub-kontrak acak,
              menjamin presisi jahitan, kekuatan material, dan ketepatan jadwal.
            </p>

            {/* Highlighted Active Stage Preview Box */}
            <div className="pt-2">
              <WorkflowActiveStageCard
                id={`${id}-active-preview`}
                activeStep={activeStep}
                totalSteps={steps.length}
              />
            </div>
          </div>

          {/* Kolom Kanan: Tabel Tipografi Swiss Ledger Interaktif (8 Kolom) */}
          <div className="lg:col-span-8 divide-y divide-white/10 rounded-2xl overflow-hidden bg-[#1B2E4B]/50 backdrop-blur-sm border border-white/10 shadow-xl">
            {steps.map((step, idx) => (
              <WorkflowStepCard
                key={step.step}
                step={step}
                isSelected={activeStepIndex === idx}
                onSelect={() => setActiveStepIndex(idx)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
