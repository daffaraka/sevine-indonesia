import React from 'react';

export type AppRouteMode = 'classic' | 'catalog' | 'admin';

interface RouteViewSwitcherProps {
  id?: string;
  currentRoute: AppRouteMode;
  onSwitchRoute: (route: AppRouteMode) => void;
}

export const RouteViewSwitcher: React.FC<RouteViewSwitcherProps> = ({
  id = 'route-view-switcher',
  currentRoute,
  onSwitchRoute,
}) => {
  return (
    <div
      id={id}
      className="fixed bottom-5 left-5 z-50 flex items-center p-1 rounded-full bg-doff-navy/95 text-white border border-doff-border/30 shadow-lg backdrop-blur-md"
      role="navigation"
      aria-label="Pilih Tampilan Route"
    >
      <span className="hidden sm:inline-block pl-3 pr-2 font-mono text-[10px] tracking-[0.2em] uppercase text-slate-300">
        Route
      </span>

      <button
        type="button"
        onClick={() => onSwitchRoute('classic')}
        className={`px-3 py-1.5 rounded-full text-[11px] font-medium tracking-wide transition-all cursor-pointer ${
          currentRoute === 'classic'
            ? 'bg-white text-doff-navy font-semibold shadow-xs'
            : 'text-slate-300 hover:text-white'
        }`}
      >
        /classic
      </button>

      <button
        type="button"
        onClick={() => onSwitchRoute('catalog')}
        className={`px-3 py-1.5 rounded-full text-[11px] font-medium tracking-wide transition-all cursor-pointer ${
          currentRoute === 'catalog'
            ? 'bg-doff-terracotta text-white font-semibold shadow-xs'
            : 'text-slate-300 hover:text-white'
        }`}
      >
        /catalog
      </button>

      <button
        type="button"
        onClick={() => onSwitchRoute('admin')}
        className={`px-3 py-1.5 rounded-full text-[11px] font-medium tracking-wide transition-all cursor-pointer ${
          currentRoute === 'admin'
            ? 'bg-blue-600 text-white font-semibold shadow-xs'
            : 'text-slate-300 hover:text-white'
        }`}
      >
        /admin
      </button>
    </div>
  );
};
