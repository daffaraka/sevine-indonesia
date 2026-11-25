import React, { useEffect } from 'react';
import { Filter, RotateCcw, X } from 'lucide-react';
import {
  ProductCatalogFilterPanel,
  ProductCatalogFilterPanelProps,
} from './ProductCatalogFilterPanel';

interface SidebarProps extends ProductCatalogFilterPanelProps {
  activeFilterCount: number;
  onResetAllFilters: () => void;
}

export const ProductCatalogFilterSidebar: React.FC<SidebarProps> = ({
  activeFilterCount,
  onResetAllFilters,
  ...panelProps
}) => (
  <aside className="w-full lg:w-64 xl:w-72 shrink-0 space-y-5 bg-white rounded-xl border border-slate-200/90 shadow-doff-sm p-5">
    <div className="flex items-center justify-between pb-4 border-b border-slate-200">
      <div className="flex items-center gap-2 text-doff-navy font-bold text-sm">
        <Filter className="w-4 h-4 text-doff-terracotta" />
        <span>FILTER PENCARIAN</span>
        {activeFilterCount > 0 && (
          <span className="text-[10px] font-bold px-1.5 py-0.5 bg-doff-terracotta text-white rounded-full">
            {activeFilterCount}
          </span>
        )}
      </div>
      {activeFilterCount > 0 && (
        <button
          type="button"
          onClick={onResetAllFilters}
          className="text-xs text-slate-500 hover:text-doff-terracotta flex items-center gap-1 transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      )}
    </div>
    <ProductCatalogFilterPanel {...panelProps} />
  </aside>
);

interface DrawerProps extends SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  filteredCount: number;
}

export const ProductCatalogFilterDrawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  filteredCount,
  activeFilterCount,
  onResetAllFilters,
  ...panelProps
}) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex lg:hidden">
      <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs" onClick={onClose} />
      <div className="relative ml-auto w-full max-w-xs h-full bg-white shadow-2xl flex flex-col justify-between z-10">
        <div className="flex items-center justify-between p-4 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <span className="font-bold text-doff-navy text-sm">Filter Katalog</span>
            {activeFilterCount > 0 && (
              <span className="text-[10px] font-bold px-1.5 py-0.5 bg-doff-terracotta text-white rounded-full">
                {activeFilterCount}
              </span>
            )}
          </div>
          <button type="button" onClick={onClose} aria-label="Tutup filter" className="p-1 text-slate-400 hover:text-slate-600 rounded-md hover:bg-slate-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <ProductCatalogFilterPanel {...panelProps} />
        </div>

        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center gap-3">
          <button type="button" onClick={onResetAllFilters} className="flex-1 py-2.5 text-xs font-bold text-slate-600 bg-white border border-slate-200 rounded-md hover:bg-slate-100 flex items-center justify-center gap-1.5">
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
          <button type="button" onClick={onClose} className="flex-1 py-2.5 text-xs font-bold text-white bg-doff-navy rounded-md hover:bg-doff-navydark shadow-xs">
            Tampilkan ({filteredCount})
          </button>
        </div>
      </div>
    </div>
  );
};
