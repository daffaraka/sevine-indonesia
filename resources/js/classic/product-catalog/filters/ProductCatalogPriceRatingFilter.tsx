import React, { useEffect, useState } from 'react';
import { Star } from 'lucide-react';

interface PriceRangeFilterProps {
  minPrice: number | null;
  maxPrice: number | null;
  onApply: (min: number | null, max: number | null) => void;
}

export const PriceRangeFilter: React.FC<PriceRangeFilterProps> = ({ minPrice, maxPrice, onApply }) => {
  const [minInput, setMinInput] = useState<string>(minPrice?.toString() ?? '');
  const [maxInput, setMaxInput] = useState<string>(maxPrice?.toString() ?? '');

  useEffect(() => {
    setMinInput(minPrice?.toString() ?? '');
    setMaxInput(maxPrice?.toString() ?? '');
  }, [minPrice, maxPrice]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const minVal = minInput.trim() ? parseInt(minInput, 10) : null;
    const maxVal = maxInput.trim() ? parseInt(maxInput, 10) : null;
    onApply(Number.isNaN(minVal) ? null : minVal, Number.isNaN(maxVal) ? null : maxVal);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 pt-1">
      <div className="flex items-center gap-2">
        <input
          type="number"
          placeholder="MIN"
          value={minInput}
          onChange={(e) => setMinInput(e.target.value)}
          className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:border-doff-navy"
        />
        <span className="text-slate-400 text-xs">-</span>
        <input
          type="number"
          placeholder="MAKS"
          value={maxInput}
          onChange={(e) => setMaxInput(e.target.value)}
          className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:border-doff-navy"
        />
      </div>
      <button
        type="submit"
        className="w-full py-1.5 text-xs font-bold bg-doff-navy text-white rounded-md hover:bg-doff-navydark transition-colors"
      >
        Terapkan Harga
      </button>
    </form>
  );
};

interface RatingFilterProps {
  minRating: number | null;
  onSelect: (rating: number | null) => void;
}

export const RatingFilter: React.FC<RatingFilterProps> = ({ minRating, onSelect }) => (
  <div className="space-y-1.5 pt-1">
    {[5, 4].map((star) => {
      const isChecked = minRating === star;
      return (
        <button
          key={star}
          type="button"
          onClick={() => onSelect(isChecked ? null : star)}
          className={`w-full flex items-center gap-2 text-xs py-1 px-2 rounded-md transition-colors ${
            isChecked ? 'bg-amber-50 text-amber-900 font-bold' : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <div className="flex items-center text-amber-500">
            {Array.from({ length: 5 }).map((_, idx) => (
              <Star
                key={idx}
                className={`w-3.5 h-3.5 ${idx < star ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`}
              />
            ))}
          </div>
          <span>{star === 5 ? '5 Bintang' : `${star} Bintang ke atas`}</span>
        </button>
      );
    })}
  </div>
);
