import React from 'react';

export interface KineticCardItem {
  id: string;
  metricValue: string;
  metricLabel: string;
  caption: string;
  imageUrl: string;
  bgToneClass: string;
  washOverlayClass: string;
  ghostMode: 'light' | 'dark';
}

interface KineticPortraitCardProps {
  id?: string;
  item: KineticCardItem;
  index: number;
}

export const KineticPortraitCard: React.FC<KineticPortraitCardProps> = ({ id, item, index }) => {
  const cardId = id || `kinetic-card-${item.id}`;

  return (
    <article
      id={cardId}
      className={`group relative rounded-[26px] overflow-hidden aspect-[3/4] ${item.bgToneClass} flex flex-col justify-between p-6 select-none shadow-md hover:shadow-xl transition-all duration-300`}
    >
      {/* Base Sharp/Semi-Soft Portrait Layer */}
      <img
        src={item.imageUrl}
        alt={`Potret operasional CV. Sevine Indonesia — ${item.metricValue} ${item.metricLabel}`}
        width={450}
        height={600}
        decoding="async"
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover object-center scale-105 transition-transform duration-700 group-hover:scale-110"
      />

      {/* Second Offset Layer for Authentic Shutter-Drag / Motion-Blur Effect (Ref Image 3) */}
      <img
        src={item.imageUrl}
        alt=""
        aria-hidden="true"
        width={450}
        height={600}
        decoding="async"
        loading="lazy"
        className={`pointer-events-none absolute inset-0 w-full h-full object-cover object-center ${
          item.ghostMode === 'light' ? 'kinetic-motion-ghost' : 'kinetic-motion-ghost-dark'
        }`}
      />

      {/* Emotional Monochromatic Color Wash Overlay (Ref Image 3 Color Blocking) */}
      <div className={`pointer-events-none absolute inset-0 ${item.washOverlayClass}`} />

      {/* Top Index Counter */}
      <div className="relative z-10 flex items-center justify-between font-mono text-[10px] tracking-[0.24em] uppercase text-[#F6F4F0]/85">
        <span>FIG. 0{index + 1}</span>
        <span>SEVINE LAB</span>
      </div>

      {/* Bottom Metric & Editorial Caption */}
      <div className="relative z-10 pt-16 space-y-1.5 text-[#F6F4F0]">
        <div className="font-serif text-4xl sm:text-5xl font-normal tracking-tight leading-none">
          {item.metricValue}
        </div>
        <div className="font-mono text-[11px] tracking-[0.2em] uppercase font-semibold text-[#F6F4F0]/95">
          {item.metricLabel}
        </div>
        <p className="text-xs text-[#F6F4F0]/80 leading-relaxed pt-1">
          {item.caption}
        </p>
      </div>
    </article>
  );
};
