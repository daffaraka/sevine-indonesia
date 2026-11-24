import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FilterSectionProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  hasBorder?: boolean;
  children: React.ReactNode;
}

export const FilterSection: React.FC<FilterSectionProps> = ({
  title,
  isOpen,
  onToggle,
  hasBorder = true,
  children,
}) => (
  <div className={hasBorder ? 'border-b border-slate-200/80 pb-5' : ''}>
    <button
      type="button"
      onClick={onToggle}
      className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-doff-navy mb-3"
    >
      <span>{title}</span>
      {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
    </button>
    {isOpen && children}
  </div>
);

export interface FilterCheckboxItem {
  id: string;
  label: string;
  subtitle?: string;
  checked: boolean;
  onChange: () => void;
}

export const CheckboxOptionList: React.FC<{ items: FilterCheckboxItem[]; spacing?: string }> = ({
  items,
  spacing = 'space-y-1.5',
}) => (
  <div className={`${spacing} pt-1`}>
    {items.map((item) => (
      <label
        key={item.id}
        className="flex items-start gap-2.5 text-xs text-slate-600 hover:text-doff-navy cursor-pointer select-none py-0.5"
      >
        <input
          type="checkbox"
          checked={item.checked}
          onChange={item.onChange}
          className="w-3.5 h-3.5 mt-0.5 rounded border-slate-300 text-doff-navy focus:ring-doff-navy/30"
        />
        <div>
          <span className={`block leading-tight ${item.checked ? 'font-semibold text-doff-navy' : 'font-medium'}`}>
            {item.label}
          </span>
          {item.subtitle && <span className="text-[10px] text-slate-400 leading-none">{item.subtitle}</span>}
        </div>
      </label>
    ))}
  </div>
);
