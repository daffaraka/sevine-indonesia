import React, { useState } from 'react';
import { CompanyProfileService } from '../../services/CompanyProfileService';

interface EditorialFaqSectionProps {
  id?: string;
}

export const EditorialFaqSection: React.FC<EditorialFaqSectionProps> = ({
  id = 'ed-faq'
}) => {
  const faqItems = CompanyProfileService.getFaqItems();
  const [openFaqId, setOpenFaqId] = useState<string | null>(faqItems[0]?.id ?? null);

  const handleToggleFaq = (faqId: string) => {
    setOpenFaqId((prevId) => (prevId === faqId ? null : faqId));
  };

  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="py-16 sm:py-24 bg-[#F6F4F0] border-b border-slate-300/80 text-[#132238]"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-4 space-y-4">
          <span className="font-mono text-[10px] tracking-[0.28em] uppercase text-[#9E4738] block">
            PANDUAN KEMITRAAN • FAQ
          </span>
          <h2
            id={`${id}-heading`}
            className="font-serif text-3xl sm:text-4xl text-[#132238] leading-tight"
          >
            Pertanyaan Seputar Maklon &amp; Reseller
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Rincian teknis mengenai MOQ produksi kustom B2B, tahapan prototipe sampel di pabrik
            Ngawi, serta akses kemitraan reseller nasional.
          </p>
        </div>

        <div className="lg:col-span-8 divide-y divide-slate-300/80 border-y border-slate-300/80">
          {faqItems.map((item, idx) => {
            const isOpen = openFaqId === item.id;
            const answerId = `ed-${item.id}-answer`;
            return (
              <article key={item.id} className="py-5">
                <h3>
                  <button
                    type="button"
                    onClick={() => handleToggleFaq(item.id)}
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    className="w-full flex items-baseline justify-between gap-4 text-left focus:outline-none group"
                  >
                    <span className="flex items-baseline gap-3 sm:gap-4">
                      <span className="font-mono text-xs text-[#9E4738] font-semibold shrink-0">
                        0{idx + 1}
                      </span>
                      <span className="font-sans text-sm sm:text-base font-semibold text-[#132238] group-hover:text-[#9E4738] transition-colors">
                        {item.question}
                      </span>
                    </span>
                    <span
                      className="font-mono text-sm text-[#9E4738] shrink-0"
                      aria-hidden="true"
                    >
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>
                </h3>

                {isOpen && (
                  <div
                    id={answerId}
                    className="mt-3 pl-7 sm:pl-8 pr-4 text-xs sm:text-sm text-slate-600 leading-relaxed"
                  >
                    {item.answer}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
