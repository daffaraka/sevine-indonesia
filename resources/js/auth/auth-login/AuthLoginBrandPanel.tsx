import React from 'react';

interface BrandLineItem {
  name: string;
  accentHex: string;
}

const SEVINE_BRAND_LINES: BrandLineItem[] = [
  { name: 'SEVINE', accentHex: '#C5A880' },
  { name: 'klou', accentHex: '#5B6B58' },
  { name: 'LALUNA', accentHex: '#8F3B4A' },
  { name: 'ASSAIF', accentHex: '#8A5B38' },
  { name: 'NABIRA', accentHex: '#8B6E8C' },
];

export const AuthLoginBrandPanel: React.FC = () => {
  return (
    <>
      {/* Compact Mobile & Tablet Brand Strip (< 1024px) */}
      <header className="lg:hidden bg-[#071c3b] text-white px-5 py-4 border-b border-slate-800/80 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <img
            src="/assets/brands/logo-sevine-white.webp"
            alt="CV. Sevine Indonesia"
            className="h-7 w-auto object-contain shrink-0"
          />
          <div className="min-w-0 border-l border-slate-700/80 pl-3">
            <p className="text-[11px] font-mono tracking-wider uppercase text-slate-300 truncate">
              Backoffice Portal
            </p>
            <p className="text-xs font-medium text-white truncate">
              CV. Sevine Indonesia
            </p>
          </div>
        </div>
        <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-1 rounded-md bg-white/10 text-slate-200 shrink-0">
          Internal
        </span>
      </header>

      {/* Desktop Asymmetric Brand Canvas (>= 1024px) */}
      <aside className="hidden lg:flex lg:w-[54%] xl:w-[55%] relative overflow-hidden bg-gradient-to-br from-[#071c3b] via-[#0e2240] to-[#132238] text-white flex-col justify-between p-10 xl:p-14 2xl:p-16 border-r border-slate-800/80">
        {/* Subtle Textile Surface Layer */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-center opacity-[0.07] mix-blend-luminosity pointer-events-none"
          style={{
            backgroundImage: "url('/assets/backgrounds/sevine-textile-texture-bg.webp')",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(197,168,128,0.12),transparent_48%),radial-gradient(circle_at_85%_85%,rgba(194,123,102,0.10),transparent_45%)] pointer-events-none"
        />

        {/* Top Brand Identity */}
        <div className="relative z-10 flex items-center justify-between gap-4">
          <img
            src="/assets/brands/logo-sevine-white.webp"
            alt="Logo CV. Sevine Indonesia"
            className="h-9 xl:h-10 w-auto object-contain"
          />
          <span className="text-[11px] font-mono tracking-[0.18em] uppercase text-slate-300/90 px-2.5 py-1 rounded-md border border-white/15 bg-white/[0.04]">
            Backoffice &amp; CMS
          </span>
        </div>

        {/* Center Editorial Statement */}
        <div className="relative z-10 max-w-xl my-auto py-10 space-y-7">
          <div className="space-y-4">
            <p className="text-xs font-mono uppercase tracking-[0.22em] text-doff-gold">
              Sistem Operasional Terpusat
            </p>
            <h2 className="font-serif text-4xl xl:text-[44px] 2xl:text-5xl font-medium leading-[1.15] tracking-tight text-white">
              Satu kendali untuk ekosistem manufaktur dan katalog Sevine.
            </h2>
            <p className="text-sm xl:text-[15px] leading-relaxed text-slate-300 max-w-md">
              Kelola katalog produk lintas brand, lowongan kerja, dokumentasi pameran, serta data kolaborasi mitra B2B dalam satu ruang kerja.
            </p>
          </div>

          <div className="pt-6 border-t border-white/10 space-y-3">
            <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-slate-400">
              Lini Brand Naungan
            </p>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2.5">
              {SEVINE_BRAND_LINES.map((brand) => (
                <span
                  key={brand.name}
                  className="inline-flex items-center gap-2 text-xs font-mono tracking-wider text-slate-200"
                >
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: brand.accentHex }}
                    aria-hidden="true"
                  />
                  <span>{brand.name}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Architectural Footer */}
        <div className="relative z-10 pt-6 border-t border-white/10 flex items-center justify-between gap-4 text-xs text-slate-400">
          <span className="font-mono tracking-wide">
            Ngawi &middot; Malang &middot; B2B Apparel &amp; Bag
          </span>
          <span>&copy; 2026 CV. Sevine Indonesia</span>
        </div>
      </aside>
    </>
  );
};
