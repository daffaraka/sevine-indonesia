import React from 'react';
import { WorkflowStepCard } from './WorkflowStepCard';
import { CompanyProfileService } from '../services/CompanyProfileService';

export const WorkflowProcessTimeline: React.FC = () => {
  const steps = CompanyProfileService.getWorkflowSteps();

  return (
    <section id="workflow" className="py-16 md:py-24 bg-[#F8F9FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header Seksi */}
        <div className="max-w-2xl space-y-3">
          <div className="text-xs font-bold text-doff-terracotta uppercase tracking-wider">
            Standarisasi Mutu Manufaktur
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-doff-navy tracking-tight">
            Alur Kinerja 7 Tahap Sevine
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed font-normal">
            Dari riset analitik pasar hingga pengemasan aman dan pengiriman tepat waktu, setiap tahapan diawasi secara ketat untuk menjamin produk akhir tanpa cacat.
          </p>
        </div>

        {/* Grid 7 Tahapan */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((step, idx) => (
            <WorkflowStepCard
              key={step.step}
              step={step}
              isLast={idx === steps.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
