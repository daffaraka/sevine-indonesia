import React from 'react';
import { WorkflowStep } from '../types/CompanyProfileTypes';

interface WorkflowStepCardProps {
  step: WorkflowStep;
  isLast: boolean;
}

export const WorkflowStepCard: React.FC<WorkflowStepCardProps> = ({ step }) => {
  return (
    <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-md hover:shadow-lg flex flex-col justify-between hover:border-slate-300 transition-all">
      <div className="space-y-3">
        <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
          <span className="text-xs font-mono font-bold text-doff-terracotta tracking-wider">
            TAHAP 0{step.step}
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-600">
            {step.category}
          </span>
        </div>

        <div>
          <h4 className="font-bold text-doff-navy text-sm">
            {step.title}
          </h4>
          <p className="text-xs text-slate-600 mt-2 leading-relaxed">
            {step.description}
          </p>
        </div>
      </div>
    </div>
  );
};
