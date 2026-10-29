import React from 'react';
import { WorkflowStep } from '../../types/CompanyProfileTypes';

interface WorkflowStepCardProps {
  step: WorkflowStep;
  isSelected: boolean;
  onSelect: () => void;
}

export const WorkflowStepCard: React.FC<WorkflowStepCardProps> = ({
  step,
  isSelected,
  onSelect
}) => {
  return (
    <div
      id={`workflow-step-${step.step}`}
      onMouseEnter={onSelect}
      onClick={onSelect}
      className={`py-4 sm:py-5 px-4 sm:px-6 transition-all duration-200 cursor-pointer grid grid-cols-12 items-baseline gap-3 sm:gap-4 ${
        isSelected
          ? 'bg-[#1B2E4B] border-l-4 border-doff-terracotta text-white -ml-[1px]'
          : 'hover:bg-[#1B2E4B]/40 text-slate-300'
      }`}
    >
      {/* Step Number */}
      <span className="col-span-2 sm:col-span-1 font-mono text-xs sm:text-sm font-bold text-doff-terracotta">
        0{step.step}
      </span>

      {/* Title & Category */}
      <div className="col-span-10 sm:col-span-4 space-y-0.5">
        <span
          className={`font-sans text-sm sm:text-base font-bold block tracking-tight ${
            isSelected ? 'text-white' : 'text-slate-200'
          }`}
        >
          {step.title}
        </span>
        <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-slate-400 block">
          {step.category}
        </span>
      </div>

      {/* Description */}
      <p className="col-span-12 sm:col-span-7 text-xs text-slate-300 leading-relaxed font-normal">
        {step.description}
      </p>
    </div>
  );
};
