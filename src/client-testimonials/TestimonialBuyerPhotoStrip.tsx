import React from 'react';

interface TestimonialBuyerPhotoStripProps {
  photos: string[];
  author: string;
  onSelectPhoto: (src: string, title: string) => void;
}

export const TestimonialBuyerPhotoStrip: React.FC<TestimonialBuyerPhotoStripProps> = ({
  photos,
  author,
  onSelectPhoto
}) => {
  if (!photos || photos.length === 0) return null;

  return (
    <div className="pt-2">
      <div className="text-[10px] font-semibold tracking-wide text-slate-500 uppercase mb-1 flex items-center gap-1.5">
        <span>Foto Produk Pembeli</span>
        <span className="text-[9px] px-1 py-0.2 bg-slate-100 rounded text-slate-600 font-mono">
          {photos.length}
        </span>
      </div>

      <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 scrollbar-none">
        {photos.map((photo, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => onSelectPhoto(photo, `Foto Produk Pembeli (${author}) - #${idx + 1}`)}
            className="group relative flex-shrink-0 w-10 h-10 rounded-md overflow-hidden border border-slate-200/90 hover:border-doff-terracotta transition-all shadow-2xs"
            title={`Lihat foto ${idx + 1} dari ${author}`}
          >
            <img
              src={photo}
              alt={`Foto produk dari ${author} ${idx + 1}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors" />
          </button>
        ))}
      </div>
    </div>
  );
};
