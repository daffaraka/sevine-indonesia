import React from 'react';
import { ChevronLeft, ChevronRight, LogOut, X } from 'lucide-react';
import { AdminMenuKey, AdminMenuMeta } from '../../types/AdminDashboardTypes';
import { AdminSidebarNavGroup } from './AdminSidebarNavGroup';

interface AdminSidebarProps {
  isCollapsed: boolean;
  isMobileOpen: boolean;
  activeMenu: AdminMenuKey;
  menuItems: AdminMenuMeta[];
  menuCounts: Partial<Record<AdminMenuKey, string>>;
  activeRoleName: string;
  userName?: string;
  onToggleCollapse: () => void;
  onCloseMobile: () => void;
  onNavigateItem?: () => void;
  onLogout?: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  isCollapsed,
  isMobileOpen,
  activeMenu,
  menuItems,
  menuCounts,
  activeRoleName,
  userName = 'Admin Sevine',
  onToggleCollapse,
  onCloseMobile,
  onNavigateItem,
  onLogout,
}) => {
  const groups = Array.from(new Set(menuItems.map((item) => item.group)));
  const initials = userName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || '')
    .join('');

  return (
    <>
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={`fixed lg:static top-0 bottom-0 left-0 z-50 bg-[#071c3b] border-r border-slate-700/60 shadow-md transition-all duration-300 flex flex-col text-slate-100 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } ${isCollapsed ? 'w-16' : 'w-64'}`}
      >
        {/* Brand Header */}
        <div className="h-14 border-b border-slate-700/60 px-4 flex items-center justify-between shrink-0 bg-[#132238]">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-9 h-9 rounded bg-white flex items-center justify-center shrink-0 shadow-sm overflow-hidden p-0.5">
              <img
                src="/assets/brands/logo-cv-sevine-indonesia.png"
                alt="Logo CV. Sevine Indonesia"
                className="w-full h-full object-contain"
              />
            </div>
            {!isCollapsed && (
              <div className="truncate">
                <h1 className="font-bold text-xs tracking-wider text-white uppercase truncate">
                  CV. Sevine Indonesia
                </h1>
                <p className="text-[10px] font-mono text-slate-400 truncate">
                  Backoffice &amp; CMS
                </p>
              </div>
            )}
          </div>
          <button
            type="button"
            className="lg:hidden text-slate-400 hover:text-white cursor-pointer"
            onClick={onCloseMobile}
            aria-label="Tutup Menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-2.5 py-4 space-y-5 text-xs">
          {groups.map((group) => (
            <AdminSidebarNavGroup
              key={group}
              group={group}
              items={menuItems.filter((item) => item.group === group)}
              activeMenu={activeMenu}
              isCollapsed={isCollapsed}
              menuCounts={menuCounts}
              onNavigateItem={onNavigateItem}
              onCloseMobile={onCloseMobile}
            />
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-slate-700/60 shrink-0 flex items-center justify-between gap-2 bg-[#132238]">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-7 h-7 rounded bg-blue-700 border border-blue-500 flex items-center justify-center font-mono text-xs font-semibold text-white shrink-0 shadow-2xs">
              {initials || 'AD'}
            </div>
            {!isCollapsed && (
              <div className="truncate">
                <p className="text-xs font-semibold text-white truncate">{userName}</p>
                <p className="text-[10px] text-slate-400 font-mono truncate">{activeRoleName}</p>
              </div>
            )}
          </div>
          <div className="flex items-center gap-1 shrink-0">
            {onLogout && (
              <button
                type="button"
                onClick={onLogout}
                title="Keluar (Logout)"
                aria-label="Keluar dari Dashboard Admin"
                className="p-1.5 rounded hover:bg-red-500/20 text-slate-400 hover:text-red-300 transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}
            <button
              type="button"
              onClick={onToggleCollapse}
              title={isCollapsed ? 'Perluas Sidebar' : 'Ciutkan Sidebar'}
              className="hidden lg:flex p-1.5 rounded hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              {isCollapsed ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <ChevronLeft className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
