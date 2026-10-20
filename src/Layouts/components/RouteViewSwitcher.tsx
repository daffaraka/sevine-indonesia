import React from 'react';

export type AppRouteMode = 'classic' | 'editorial';

interface RouteViewSwitcherProps {
  currentRoute: AppRouteMode;
  onSwitchRoute: (route: AppRouteMode) => void;
}

export const RouteViewSwitcher: React.FC<RouteViewSwitcherProps> = ({
  currentRoute,
  onSwitchRoute
}) => {
  return (
    <div
      className="fixed bottom-5 left-5 z-50 flex items-center p-1 rounded-full bg-[#171715]/95 text-[#F6F4F0] border border-[#D8D3C8]/25 shadow-lg backdrop-blur-md"
      role="navigation"
      aria-label="Pilih Tampilan Route"
    >
      <span className="hidden sm:inline-block pl-3 pr-2 font-mono text-[10px] tracking-[0.2em] uppercase text-[#DFDBD2]/70">
        Route
      </span>

      <button
        type="button"
        onClick={() => onSwitchRoute('classic')}
        className={`px-3.5 py-1.5 rounded-full text-[11px] font-medium tracking-wide transition-all ${
          currentRoute === 'classic'
            ? 'bg-[#F6F4F0] text-[#171715] font-semibold'
            : 'text-[#DFDBD2]/80 hover:text-white'
        }`}
      >
        /classic
      </button>

      <button
        type="button"
        onClick={() => onSwitchRoute('editorial')}
        className={`px-3.5 py-1.5 rounded-full text-[11px] font-medium tracking-wide transition-all ${
          currentRoute === 'editorial'
            ? 'bg-[#9E4738] text-[#F6F4F0] font-semibold'
            : 'text-[#DFDBD2]/80 hover:text-white'
        }`}
      >
        /editorial
      </button>
    </div>
  );
};
