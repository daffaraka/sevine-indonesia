import React from 'react';

interface EditorialHeroCoverProps {
  id?: string;
  onNavigate: (sectionId: string) => void;
}

export const EditorialHeroCover: React.FC<EditorialHeroCoverProps> = ({
  id = 'ed-hero',
  onNavigate
}) => {
  return (
    <section
      id={id}
      className="relative overflow-hidden bg-[#132238] border-b border-[#F6F4F0]/10 pt-8 pb-14 sm:pt-12 sm:pb-20 text-[#F6F4F0]"
    >
      {/* Layer 0: Organic Flowing Ribbon Wave (Ref Image 2 "JENA ARA" Background Curve) */}
      <svg
        className="pointer-events-none absolute inset-0 w-full h-full object-cover opacity-60"
        viewBox="0 0 1440 760"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M-80 540 C 260 220, 560 190, 820 410 C 1080 630, 1290 430, 1540 120"
          stroke="#1E3352"
          strokeWidth="68"
          strokeLinecap="round"
        />
        <path
          d="M-120 680 C 310 380, 680 350, 990 530 C 1220 660, 1360 520, 1560 310"
          stroke="#274269"
          strokeWidth="28"
          strokeLinecap="round"
        />
      </svg>

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-8">
        {/* Top Editorial Meta Strip */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#F6F4F0]/15 font-mono text-[10px] tracking-[0.24em] uppercase text-[#94A3B8]">
          <span>ISSUE NO. 07 • CV. SEVINE INDONESIA ARCHIVE</span>
          <span className="hidden md:inline">5 IN-HOUSE BRANDS • 30,000+ PCS MONTHLY</span>
          <span>NGAWI FACTORY &amp; MALANG STUDIO</span>
        </div>

        {/* Main Depth-Layered Stage (Ref Image 2 "JENA ARA" + Image 1 "AERIS") */}
        <div className="relative mt-8 sm:mt-12 min-h-[480px] sm:min-h-[580px] lg:min-h-[640px] flex flex-col justify-between">
          {/* Layer 1 (Back Plane): Giant Display Serif Wordmark Behind Subject */}
          <div
            className="pointer-events-none select-none inset-x-0 top-10 sm:top-14 lg:top-12 flex justify-center z-10"
            aria-hidden="true"
          >
            <span className="font-serif font-normal text-[21vw] sm:text-[18.5vw] lg:text-[16.2vw] xl:text-[225px] leading-[0.82] tracking-[0.06em] text-[#F6F4F0]/[0.08] uppercase">
              SEVINE
            </span>
          </div>

          {/* Layer 2 (Middle Foreground Plane): Overlapping Model & Product Composition */}
          <div className="relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end -mt-10 sm:-mt-24 lg:-mt-36">
            {/* Left Editorial Statement (Ref Image 1 "СТИЛЬ. УВЕРЕННОСТЬ. ТЫ.") */}
            <div className="lg:col-span-4 space-y-5 order-2 lg:order-1 pb-2">
              <div className="font-mono text-[10px] tracking-[0.28em] uppercase text-[#C27B66]">
                KOLEKSI &amp; MANUFAKTUR MANDIRI
              </div>
              <h1 className="font-sans text-3xl sm:text-4xl xl:text-[42px] font-light tracking-tight leading-[1.08] text-[#F6F4F0] uppercase">
                SILUET. <br />
                <span className="font-serif italic font-normal capitalize text-[#C27B66]">
                  Ketangguhan.
                </span>{' '}
                <br />
                IDENTITAS.
              </h1>
              <p className="text-xs sm:text-sm text-[#CBD5E1] leading-relaxed max-w-sm">
                Dirancang dan dijahit secara mandiri untuk ritme hidup modern. Menaungi 5 lini brand
                tas fungsional, pakaian basic timeless, dan busana muslim kontemporer.
              </p>

              {/* Pill CTA & Secondary Link (Ref Image 2 "Shop Now" Pill) with shadow-md */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => onNavigate('ed-brands')}
                  className="px-7 py-3 rounded-full bg-[#C27B66] text-white text-xs font-medium tracking-[0.14em] uppercase hover:bg-[#A86452] transition-colors shadow-md"
                >
                  Eksplorasi 5 Brand
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('ed-contact')}
                  className="px-5 py-3 text-xs font-mono uppercase tracking-[0.18em] text-[#F6F4F0] border-b border-[#F6F4F0]/50 hover:text-[#C27B66] hover:border-[#C27B66] transition-colors"
                >
                  Kemitraan B2B →
                </button>
              </div>
            </div>

            {/* Center Cutout Portrait Overlapping the "SEVINE" Title with shadow-md */}
            <div className="lg:col-span-4 flex justify-center order-1 lg:order-2">
              <div className="relative w-64 sm:w-80 lg:w-[350px] aspect-[3/4] rounded-t-[180px] rounded-b-[24px] overflow-hidden bg-[#1B2E4B] border border-white/15 shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=1000&auto=format&fit=crop&q=85"
                  alt="Editorial Modest & Apparel Showcase Sevine"
                  className="w-full h-full object-cover object-top scale-105 hover:scale-100 transition-transform duration-700"
                />
                {/* Soft Bottom Fade */}
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#132238]/90 via-[#132238]/35 to-transparent flex items-end justify-between p-5 text-[#F6F4F0]">
                  <div>
                    <span className="font-mono text-[9px] tracking-[0.24em] uppercase block text-[#CBD5E1]">
                      LOOK 01 / NABIRA &amp; LALUNA
                    </span>
                    <span className="font-serif text-lg italic">Modest Contemporary</span>
                  </div>
                  <span className="font-mono text-[10px] tracking-[0.2em] text-[#94A3B8]">2026</span>
                </div>
              </div>
            </div>

            {/* Right Secondary Lookbook Frame & Editorial Caption with shadow-md */}
            <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-between gap-6 order-3 pb-2">
              <div className="w-full sm:w-64 rounded-[20px] overflow-hidden bg-[#1B2E4B] border border-white/15 p-3 shadow-md">
                <div className="aspect-[4/3] rounded-[14px] overflow-hidden bg-[#132238]">
                  <img
                    src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&auto=format&fit=crop&q=80"
                    alt="Sevine Waterproof Craftsmanship"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="pt-2.5 flex items-center justify-between text-[11px]">
                  <span className="font-semibold text-[#F6F4F0]">SEVINE &amp; klou</span>
                  <span className="font-mono text-[10px] text-[#94A3B8]">IN-HOUSE ATELIER</span>
                </div>
              </div>

              <div className="lg:text-right max-w-xs space-y-1">
                <p className="font-serif italic text-base sm:text-lg text-[#F6F4F0] leading-snug">
                  “Step Into Effortless Elegance &amp; Utility With Sevine Indonesia”
                </p>
                <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#94A3B8]">
                  7+ TAHUN DEDIKASI MANUFAKTUR LOKAL
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
