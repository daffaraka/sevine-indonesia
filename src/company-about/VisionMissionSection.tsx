import React from 'react';

interface VisionMissionProps {
  vision: { title: string; statement: string };
  missions: string[];
}

export const VisionMissionSection: React.FC<VisionMissionProps> = ({ vision, missions }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-6">
      {/* Kolom Visi */}
      <div className="lg:col-span-5 bg-doff-navy rounded-xl p-6 sm:p-8 text-white flex flex-col justify-between shadow-doff-sm">
        <div className="space-y-4">
          <div className="text-[11px] font-bold text-doff-gold uppercase tracking-widest">
            {vision.title}
          </div>
          <h4 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
            Brand Apparel & Lifestyle Terpercaya serta Adaptif di Indonesia
          </h4>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
            {vision.statement}
          </p>
        </div>
        <div className="pt-6 border-t border-slate-700/60 mt-6 flex items-center justify-between text-xs text-slate-400">
          <span>Arah Strategis Jangka Panjang</span>
          <span className="font-semibold text-slate-300">Sevine Ecosystem</span>
        </div>
      </div>

      {/* Kolom Misi */}
      <div className="lg:col-span-7 bg-white rounded-xl p-6 sm:p-8 border border-slate-200 shadow-doff-sm flex flex-col justify-between">
        <div>
          <div className="text-xs font-bold text-doff-navy uppercase tracking-wider mb-5 pb-3 border-b border-slate-100 flex items-center justify-between">
            <span>6 Pilar Misi Strategis</span>
            <span className="text-[11px] text-slate-400 font-normal">Komitmen Eksekusi</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
            {missions.map((mission, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <span className="text-xs font-mono font-bold text-doff-terracotta shrink-0 mt-0.5">
                  0{idx + 1}.
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {mission}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
