import React, { useState } from 'react';
import { CompanyProfileService } from '../../services/CompanyProfileService';
import { FaqAccordionItem } from './FaqAccordionItem';

interface FaqAccordionSectionProps {
  id?: string;
}

export const FaqAccordionSection: React.FC<FaqAccordionSectionProps> = ({ id = 'faq' }) => {
  const faqItems = CompanyProfileService.getFaqItems();
  const [openFaqId, setOpenFaqId] = useState<string | null>(faqItems[0]?.id ?? null);

  const handleToggleFaq = (faqId: string) => {
    setOpenFaqId((prevId) => (prevId === faqId ? null : faqId));
  };

  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="relative py-16 md:py-24 bg-warm-linen border-t border-slate-200/80 overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="space-y-3 text-center max-w-2xl mx-auto">
          <div className="text-xs font-bold text-doff-terracotta uppercase tracking-wider">
            Informasi Kemitraan &amp; Produksi
          </div>
          <h2
            id={`${id}-heading`}
            className="text-2xl sm:text-4xl font-extrabold text-doff-navy tracking-tight"
          >
            Pertanyaan yang Sering Diajukan (FAQ)
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            Panduan ringkas mengenai kuantitas pesanan minimum (MOQ) maklon custom, estimasi
            pembuatan sampel prototipe, hingga prosedur pendaftaran reseller resmi.
          </p>
        </div>

        <div className="space-y-3.5">
          {faqItems.map((item) => (
            <FaqAccordionItem
              key={item.id}
              item={item}
              isOpen={openFaqId === item.id}
              onToggle={() => handleToggleFaq(item.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
