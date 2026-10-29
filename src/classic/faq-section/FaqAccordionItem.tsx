import React from 'react';
import { ChevronDown } from 'lucide-react';
import { FaqItem } from '../../types/CompanyProfileTypes';

interface FaqAccordionItemProps {
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
}

const CATEGORY_BADGE_LABELS: Record<FaqItem['category'], string> = {
  maklon: 'Maklon & B2B',
  reseller: 'Kemitraan Reseller',
  umum: 'Operasional & Lokasi'
};

export const FaqAccordionItem: React.FC<FaqAccordionItemProps> = ({
  item,
  isOpen,
  onToggle
}) => {
  const answerId = `${item.id}-answer`;

  return (
    <article className="doff-card rounded-xl border border-slate-200/90 overflow-hidden transition-colors hover:border-slate-300">
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={answerId}
          className="w-full flex items-start justify-between gap-4 p-5 sm:p-6 text-left focus:outline-none"
        >
          <div className="space-y-1.5 pr-2">
            <span className="inline-block text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-doff-terracotta">
              {CATEGORY_BADGE_LABELS[item.category]}
            </span>
            <span className="block font-bold text-doff-navy text-sm sm:text-base leading-snug">
              {item.question}
            </span>
          </div>
          <span
            className={`mt-1 p-1.5 rounded-lg bg-slate-50 border border-slate-200 text-doff-navy shrink-0 transition-transform duration-200 ${
              isOpen ? 'rotate-180 bg-slate-100' : ''
            }`}
            aria-hidden="true"
          >
            <ChevronDown className="w-4 h-4" />
          </span>
        </button>
      </h3>

      {isOpen && (
        <div
          id={answerId}
          className="px-5 sm:px-6 pb-5 sm:pb-6 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100"
        >
          {item.answer}
        </div>
      )}
    </article>
  );
};
