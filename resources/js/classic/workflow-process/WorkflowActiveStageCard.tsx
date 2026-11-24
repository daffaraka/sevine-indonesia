import React from 'react';
import { WorkflowStep } from '../../types/CompanyProfileTypes';

interface WorkflowActiveStageCardProps {
  id?: string;
  activeStep: WorkflowStep;
  totalSteps: number;
}

export const WorkflowActiveStageCard: React.FC<WorkflowActiveStageCardProps> = ({
  id = 'workflow-active-stage',
  activeStep,
  totalSteps
}) => {
  return (
    <div
      id={id}
      className="p-5 sm:p-6 rounded-2xl bg-[#1B2E4B] border border-white/10 shadow-xl border-l-4 border-doff-terracotta space-y-3 transition-all duration-300 text-white"
    >
      {/* Top Meta Indicator */}
      <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.22em] uppercase text-doff-terracotta">
        <span className="font-bold">TAHAP AKTIF 0{activeStep.step}</span>
        <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-slate-200 border border-white/10 font-sans font-medium text-[10px]">
          {activeStep.category}
        </span>
      </div>

      {/* Title */}
      <div className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">
        {activeStep.title}
      </div>

      {/* Description */}
      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
        {activeStep.description}
      </p>

      {/* Mini Stepper Progress Dots */}
      <div className="pt-3 flex items-center justify-between border-t border-white/10">
        <span className="font-mono text-[10px] text-slate-400">
          Progres Tahap {activeStep.step} dari {totalSteps}
        </span>
        <div className="flex items-center gap-1.5" aria-hidden="true">
          {Array.from({ length: totalSteps }).map((_, idx) => (
            <span
              key={idx}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx + 1 === activeStep.step
                  ? 'w-5 bg-doff-terracotta shadow-xs'
                  : idx + 1 < activeStep.step
                  ? 'w-2 bg-white/70'
                  : 'w-1.5 bg-white/20'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
