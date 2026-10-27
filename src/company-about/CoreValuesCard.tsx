import React from "react";
import { CoreValue } from "../types/CompanyProfileTypes";

interface CoreValuesCardProps {
  values: CoreValue[];
}

export const CoreValuesCard: React.FC<CoreValuesCardProps> = ({ values }) => {
  return (
    <div className="space-y-4 pt-2">
      <div className="flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-doff-terracotta" />
        <span className="text-xs font-bold text-doff-terracotta uppercase tracking-wider">
          Fondasi Nilai Perusahaan
        </span>
      </div>
      <h3 className="text-xl sm:text-2xl font-bold text-doff-navy tracking-tight">
        Nilai Inti Sevine
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
        {values.map((item) => (
          <div
            key={item.letter}
            className="bg-white rounded-xl p-6 border border-slate-200/90 shadow-md hover:shadow-lg flex flex-col justify-between relative overflow-hidden transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl font-black text-doff-navy tracking-tighter">
                  {item.letter}
                </span>
                <span className="text-[10px] font-semibold tracking-widest uppercase px-2.5 py-0.5 rounded bg-slate-100 text-slate-600">
                  Pilar {item.letter}
                </span>
              </div>
              <div className="font-bold text-doff-navy text-base">
                {item.name}
              </div>
              <div className="text-xs font-semibold text-doff-terracotta mt-0.5">
                {item.subtitle}
              </div>
              <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
