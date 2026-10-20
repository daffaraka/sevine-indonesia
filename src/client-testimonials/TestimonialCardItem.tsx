import React from 'react';
import { TestimonialItem } from '../types/CompanyProfileTypes';

interface TestimonialCardItemProps {
  item: TestimonialItem;
}

export const TestimonialCardItem: React.FC<TestimonialCardItemProps> = ({ item }) => {
  return (
    <div className="bg-white rounded-xl p-6 border border-slate-200/90 shadow-md hover:shadow-lg flex flex-col justify-between hover:border-slate-300 transition-all">
      <div className="space-y-3">
        <div className="flex items-center justify-between text-[11px] text-slate-400 pb-2.5 border-b border-slate-100 font-mono">
          <span>{item.date}</span>
          <span className="text-doff-terracotta font-semibold font-sans">{item.highlightAspect}</span>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed italic">
          "{item.content}"
        </p>
      </div>

      <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
        <span className="font-bold text-doff-navy">{item.author}</span>
        <span className="text-[10px] text-slate-500 font-medium px-2 py-0.5 rounded bg-slate-100">
          Ulasan Terverifikasi
        </span>
      </div>
    </div>
  );
};
