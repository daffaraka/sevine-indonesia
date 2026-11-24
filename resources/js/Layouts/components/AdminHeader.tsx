import React from 'react';
import { Link } from '@inertiajs/react';
import { CheckCircle2, ExternalLink, Menu, Search, Shield, X } from 'lucide-react';
import { AdminMenuKey, AdminRoleItem } from '../../types/AdminDashboardTypes';
import { PUBLIC_URL_BY_MENU } from '../../admin/admin-shared/PublicSyncBadge';
import { ADMIN_ROUTE_BY_MENU } from '../../services/AdminInertiaBridge';

interface AdminHeaderProps {
  onOpenMobileSidebar: () => void;
  activeMenuKey: AdminMenuKey;
  activeMenuTitle?: string;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  roles: AdminRoleItem[];
  activeRoleId: string;
  onSwitchRole: (roleId: string) => void;
  sessionChangeCount?: number;
  lastUpdatedAt?: string;
  liveOnlineVisitors?: number;
  canOpenMonitoring?: boolean;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  onOpenMobileSidebar,
  activeMenuKey,
  activeMenuTitle = 'Ringkasan Utama',
  searchQuery,
  onSearchChange,
  roles,
  activeRoleId,
  onSwitchRole,
  sessionChangeCount = 0,
  lastUpdatedAt = 'Tersinkron',
  liveOnlineVisitors = 0,
  canOpenMonitoring = false,
}) => {
  const publicTarget = PUBLIC_URL_BY_MENU[activeMenuKey] || PUBLIC_URL_BY_MENU.overview;

  return (
    <header className="h-14 border-b border-slate-700/60 bg-[#132238] px-4 sm:px-6 flex items-center justify-between gap-3 shrink-0 shadow-sm z-10 text-white">
      {/* Left: Mobile Toggle & Breadcrumb */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          type="button"
          className="lg:hidden p-1.5 -ml-1 text-slate-300 hover:text-white cursor-pointer transition-colors"
          onClick={onOpenMobileSidebar}
          aria-label="Buka Menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2 text-xs font-mono min-w-0">
          <span className="text-slate-400 font-medium shrink-0">SEVINE</span>
          <span className="text-slate-600 shrink-0">/</span>
          <span className="text-slate-400 hidden sm:inline shrink-0">Backoffice</span>
          <span className="text-slate-600 hidden sm:inline shrink-0">/</span>
          <span className="text-white font-semibold truncate">{activeMenuTitle}</span>
        </div>
      </div>

      {/* Right: Live Visitors, Sync Status, Public Link, Search & Role Switcher */}
      <div className="flex items-center gap-2 shrink-0">
        {canOpenMonitoring && (
          <Link
            href={ADMIN_ROUTE_BY_MENU.monitoring}
            prefetch
            title="Buka Laporan Kunjungan & Kondisi Website"
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-950/60 hover:bg-emerald-900/70 border border-emerald-700/60 text-[11px] font-mono text-emerald-200 transition-colors cursor-pointer"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>{liveOnlineVisitors} Online</span>
          </Link>
        )}

        <div
          className="hidden xl:inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#1B2E4B] border border-slate-700 text-[11px] font-mono text-slate-300"
          title={
            sessionChangeCount > 0
              ? `${sessionChangeCount} perubahan sesi lokal disimpan (${lastUpdatedAt})`
              : 'Seluruh data tersinkron dengan state awal'
          }
        >
          <CheckCircle2
            className={`w-3.5 h-3.5 shrink-0 ${
              sessionChangeCount > 0 ? 'text-amber-400' : 'text-emerald-400'
            }`}
          />
          <span>
            {sessionChangeCount > 0
              ? `${sessionChangeCount} ubah · ${lastUpdatedAt}`
              : 'Tersinkron'}
          </span>
        </div>

        <a
          href={publicTarget.href}
          target="_blank"
          rel="noopener noreferrer"
          title={publicTarget.label}
          className="inline-flex items-center gap-1.5 bg-[#1B2E4B] hover:bg-slate-700 border border-slate-700 px-2.5 py-1 rounded text-[11px] font-medium text-slate-200 hover:text-white transition-colors"
        >
          <span className="hidden sm:inline">{publicTarget.label}</span>
          <ExternalLink className="w-3.5 h-3.5 shrink-0" />
        </a>

        <div className="relative hidden md:flex items-center bg-[#1B2E4B] border border-slate-700 rounded px-2.5 py-1 shadow-sm focus-within:border-slate-500">
          <Search className="w-3.5 h-3.5 text-slate-400 shrink-0 mr-2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Cari data di halaman..."
            aria-label="Cari data"
            className="bg-transparent text-xs text-white placeholder-slate-400 focus:outline-none w-44"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="text-slate-400 hover:text-white ml-1 cursor-pointer"
              aria-label="Bersihkan pencarian"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Role Switcher untuk simulasi RBAC */}
        <label className="flex items-center gap-1.5 bg-[#1B2E4B] border border-slate-700 px-2.5 py-1 rounded text-[11px] font-mono text-slate-200 shadow-sm">
          <Shield className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <select
            value={activeRoleId}
            onChange={(e) => onSwitchRole(e.target.value)}
            aria-label="Simulasi Role Akses"
            className="bg-transparent text-white text-[11px] font-medium focus:outline-none cursor-pointer"
          >
            {roles.map((role) => (
              <option key={role.id} value={role.id} className="bg-[#132238] text-white">
                {role.name}
              </option>
            ))}
          </select>
        </label>
      </div>
    </header>
  );
};
