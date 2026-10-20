import React from 'react';

interface EditorialBentoLookbookProps {
  onNavigate: (sectionId: string) => void;
}

export const EditorialBentoLookbook: React.FC<EditorialBentoLookbookProps> = ({ onNavigate }) => {
  return (
    <section id="ed-lookbook" className="py-16 sm:py-24 bg-[#132238] border-b border-white/10 text-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 space-y-8">
        {/* Minimal Section Eyebrow */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="font-mono text-[10px] tracking-[0.28em] uppercase text-[#C27B66] block">
              CURATED MOODBOARD • BENTO ARCHIVE
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-white mt-1">
              Eksplorasi Tekstur &amp; Fungsi
            </h2>
          </div>
          <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#94A3B8]">
            IN-HOUSE FABRIC &amp; HARDWARE SELECTION
          </span>
        </div>

        {/* Asymmetric Editorial Bento Grid with shadow-md cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 lg:grid-rows-2 gap-4 sm:gap-5 min-h-[620px]">
          {/* Block 1: Left Tall Portrait with shadow-md */}
          <article
            onClick={() => onNavigate('ed-brands')}
            className="lg:col-span-5 lg:row-span-2 relative min-h-[420px] lg:min-h-full rounded-2xl overflow-hidden bg-[#1B2E4B] shadow-md hover:shadow-xl border border-white/10 group cursor-pointer transition-shadow"
          >
            <img
              src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=1000&auto=format&fit=crop&q=85"
              alt="klou Basic Apparel & Cotton"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#132238]/85 via-[#132238]/30 to-transparent p-7 sm:p-9 flex flex-col justify-between text-[#F6F4F0]">
              <div className="space-y-3 max-w-[230px]">
                <h3 className="font-sans text-xl sm:text-2xl font-normal uppercase tracking-wide leading-snug text-white">
                  KATUN &amp; SILUET ESENSIAL
                </h3>
                <p className="text-xs text-[#CBD5E1] leading-relaxed">
                  Kenyamanan katun breathable oleh lini <strong>klou</strong> untuk kepercayaan diri setiap hari.
                </p>
              </div>

              <div className="inline-flex items-center gap-3 text-xs tracking-wider uppercase font-mono text-white">
                <span>Lihat Lini</span>
                <span className="w-8 h-[1px] bg-[#F6F4F0] group-hover:w-12 transition-all" />
                <span>→</span>
              </div>
            </div>
          </article>

          {/* Block 2: Top Middle Card with shadow-md */}
          <article
            onClick={() => onNavigate('ed-brands')}
            className="lg:col-span-4 relative min-h-[280px] rounded-2xl overflow-hidden bg-[#1B2E4B] shadow-md hover:shadow-xl border border-white/10 group cursor-pointer transition-shadow"
          >
            <img
              src="https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=900&auto=format&fit=crop&q=80"
              alt="Nabira & Assaif Modest Collection"
              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#132238]/80 via-[#132238]/25 to-transparent p-6 sm:p-7 flex flex-col justify-between text-[#F6F4F0]">
              <div className="space-y-2 max-w-[210px]">
                <h3 className="font-sans text-base sm:text-lg font-normal uppercase tracking-wide leading-snug text-white">
                  BUSANA MUSLIM SETIAP HARI
                </h3>
                <p className="text-xs text-[#CBD5E1] leading-relaxed">
                  Keanggunan siluet flowy <strong>NABIRA</strong> &amp; ketegasan <strong>ASSAIF</strong>.
                </p>
              </div>

              <div className="inline-flex items-center gap-3 text-xs tracking-wider uppercase font-mono text-white">
                <span>Eksplorasi</span>
                <span className="w-7 h-[1px] bg-[#F6F4F0] group-hover:w-11 transition-all" />
                <span>→</span>
              </div>
            </div>
          </article>

          {/* Block 3: Top Right Product Card with shadow-md */}
          <article
            onClick={() => onNavigate('ed-brands')}
            className="lg:col-span-3 relative min-h-[280px] rounded-2xl overflow-hidden bg-[#1B2E4B] shadow-md hover:shadow-xl border border-white/10 group cursor-pointer transition-shadow"
          >
            <img
              src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&auto=format&fit=crop&q=80"
              alt="Laluna & Sevine Bag Craftsmanship"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#132238]/90 via-[#132238]/50 to-transparent p-6 sm:p-7 flex flex-col justify-between text-[#F6F4F0]">
              <div className="space-y-2 max-w-[165px]">
                <h3 className="font-sans text-base font-medium uppercase tracking-wide text-white">
                  TAS &amp; KOMPARTEMEN
                </h3>
                <p className="text-xs text-[#CBD5E1] leading-relaxed">
                  Detail jahitan bar-tack <strong>SEVINE</strong> &amp; <strong>LALUNA</strong> yang mempertegas gaya.
                </p>
              </div>

              <div className="inline-flex items-center gap-3 text-xs tracking-wider uppercase font-mono text-white">
                <span>Detail</span>
                <span className="w-6 h-[1px] bg-[#F6F4F0] group-hover:w-10 transition-all" />
                <span>→</span>
              </div>
            </div>
          </article>

          {/* Block 4: Bottom Wide Promotional Callout with shadow-md */}
          <article className="lg:col-span-7 relative min-h-[290px] rounded-2xl overflow-hidden bg-[#1B2E4B] text-[#F6F4F0] grid grid-cols-1 sm:grid-cols-12 shadow-md border border-white/10">
            <div className="sm:col-span-7 p-7 sm:p-9 flex flex-col justify-between z-10">
              <div className="space-y-2">
                <span className="font-mono text-[10px] tracking-[0.24em] uppercase text-[#C27B66]">
                  KAPASITAS PRODUKSI MANDIRI
                </span>
                <div className="font-sans text-3xl sm:text-5xl font-light tracking-tight text-white">
                  30.000+ PCS
                </div>
                <p className="text-xs sm:text-sm text-[#CBD5E1] max-w-xs leading-relaxed pt-1">
                  Melayani pesanan custom korporasi, merchandise B2B, serta kemitraan distributor
                  dan reseller resmi di seluruh Indonesia.
                </p>
              </div>

              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => onNavigate('ed-contact')}
                  className="px-6 py-2.5 rounded-lg bg-[#C27B66] text-white text-xs font-medium tracking-wide hover:bg-[#A86452] transition-colors shadow-md"
                >
                  Ajukan Kemitraan
                </button>
              </div>
            </div>

            <div className="sm:col-span-5 relative min-h-[200px] sm:min-h-full overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?w=800&auto=format&fit=crop&q=80"
                alt="Sevine Production & B2B Line"
                className="w-full h-full object-cover object-center opacity-85"
              />
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};
