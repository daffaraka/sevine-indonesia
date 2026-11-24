import React from 'react';
import { Link } from '@inertiajs/react';
import {
  Activity,
  Briefcase,
  Camera,
  Handshake,
  Layers,
  LayoutDashboard,
  LucideIcon,
  Package,
  ShieldCheck,
  Store,
} from 'lucide-react';
import { AdminMenuKey, AdminMenuMeta } from '../../types/AdminDashboardTypes';
import { ADMIN_ROUTE_BY_MENU } from '../../services/AdminInertiaBridge';

const MENU_ICONS: Record<AdminMenuKey, LucideIcon> = {
  overview: LayoutDashboard,
  monitoring: Activity,
  products: Package,
  categories: Layers,
  brands: Store,
  careers: Briefcase,
  events: Camera,
  collaborations: Handshake,
  access: ShieldCheck,
};

interface AdminSidebarNavGroupProps {
  group: string;
  items: AdminMenuMeta[];
  activeMenu: AdminMenuKey;
  isCollapsed: boolean;
  menuCounts: Partial<Record<AdminMenuKey, string>>;
  onNavigateItem?: () => void;
  onCloseMobile: () => void;
}

export const AdminSidebarNavGroup: React.FC<AdminSidebarNavGroupProps> = ({
  group,
  items,
  activeMenu,
  isCollapsed,
  menuCounts,
  onNavigateItem,
  onCloseMobile,
}) => {
  return (
    <div>
      {!isCollapsed && (
        <p className="px-2 text-[10px] font-mono tracking-widest text-slate-400 uppercase mb-1.5 font-semibold">
          {group}
        </p>
      )}
      <ul className="space-y-0.5">
        {items.map((item) => {
          const isActive = activeMenu === item.key;
          const Icon = MENU_ICONS[item.key];
          const count = menuCounts[item.key];
          const href = ADMIN_ROUTE_BY_MENU[item.key];

          return (
            <li key={item.key}>
              <Link
                href={href}
                prefetch
                onClick={() => {
                  onNavigateItem?.();
                  onCloseMobile();
                }}
                title={isCollapsed ? item.label : undefined}
                aria-current={isActive ? 'page' : undefined}
                className={`w-full flex items-center ${
                  isCollapsed ? 'justify-center px-2' : 'justify-between px-2.5'
                } py-2 rounded-lg text-left transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white font-semibold shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <Icon
                    className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`}
                  />
                  {!isCollapsed && <span className="truncate">{item.label}</span>}
                </div>
                {!isCollapsed && count && (
                  <span
                    className={`font-mono text-[10px] px-1.5 py-0.2 rounded-md border shadow-2xs ${
                      isActive
                        ? 'bg-white/20 border-white/40 text-white font-bold'
                        : 'bg-[#132238] border-slate-700 text-slate-300'
                    }`}
                  >
                    {count}
                  </span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
