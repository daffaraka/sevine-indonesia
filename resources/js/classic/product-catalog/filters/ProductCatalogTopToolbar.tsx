import React from 'react';
import { LayoutGrid, List, Search, SlidersHorizontal } from 'lucide-react';
import { CATALOG_SORT_TABS } from '../data/ProductCatalogOptions';
import { CatalogSortOption, CatalogViewMode } from '../types/ProductCatalogTypes';

interface ProductCatalogTopToolbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortOption: CatalogSortOption;
  onSortChange: (option: CatalogSortOption) => void;
  viewMode: CatalogViewMode;
  onViewModeChange: (mode: CatalogViewMode) => void;
  onOpenMobileFilter: () => void;
  activeFilterCount: number;
  filteredCount: number;
}

const VIEW_MODES: Array<{ mode: CatalogViewMode; title: string; Icon: React.FC<{ className?: string }> }> = [
  { mode: 'column', title: 'Tampilan Kolom Grid', Icon: LayoutGrid },
  { mode: 'list', title: 'Tampilan Baris List', Icon: List },
];

export const ProductCatalogTopToolbar: React.FC<ProductCatalogTopToolbarProps> = ({
  searchQuery,
  onSearchChange,
  sortOption,
  onSortChange,
  viewMode,
  onViewModeChange,
  onOpenMobileFilter,
  activeFilterCount,
  filteredCount,
}) => (
  <div className="bg-slate-100/90 p-3 sm:p-4 rounded-xl border border-slate-200/90 space-y-3">
    <div className="flex items-center gap-3">
      <div className="relative flex-1">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Cari model tas, baju basic, kurta, abaya..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-9 pr-8 py-2 bg-white text-xs text-doff-navy rounded-lg border border-slate-200 focus:outline-none focus:border-doff-navy transition-colors placeholder:text-slate-400"
        />
        {searchQuery && (
          <button type="button" onClick={() => onSearchChange('')} aria-label="Hapus pencarian" className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600">
            ✕
          </button>
        )}
      </div>

      <button type="button" onClick={onOpenMobileFilter} className="lg:hidden flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200 text-doff-navy rounded-lg text-xs font-bold shrink-0 hover:bg-slate-50 transition-colors">
        <SlidersHorizontal className="w-3.5 h-3.5 text-doff-terracotta" />
        <span>Filter</span>
        {activeFilterCount > 0 && (
          <span className="w-4 h-4 rounded-full bg-doff-terracotta text-white text-[10px] flex items-center justify-center">{activeFilterCount}</span>
        )}
      </button>

      <div className="inline-flex bg-white rounded-lg p-0.5 border border-slate-200 shrink-0">
        {VIEW_MODES.map(({ mode, title, Icon }) => (
          <button
            key={mode}
            type="button"
            onClick={() => onViewModeChange(mode)}
            title={title}
            aria-label={title}
            className={`p-1.5 rounded-md transition-colors ${viewMode === mode ? 'bg-doff-navy text-white shadow-xs' : 'text-slate-500 hover:text-doff-navy'}`}
          >
            <Icon className="w-4 h-4" />
          </button>
        ))}
      </div>
    </div>

    <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-slate-200/60">
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="text-xs text-slate-500 font-semibold mr-1 hidden sm:inline">Urutkan:</span>
        {CATALOG_SORT_TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => onSortChange(tab.id)}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              sortOption === tab.id ? 'bg-doff-navy text-white shadow-xs font-semibold' : 'bg-white text-slate-600 hover:text-doff-navy border border-slate-200/80 hover:bg-slate-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="text-xs text-slate-500 font-medium">
        Ditemukan <span className="font-bold text-doff-navy">{filteredCount}</span> produk
      </div>
    </div>
  </div>
);
