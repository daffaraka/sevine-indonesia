import React, { useState } from 'react';
import { AdminSidebar } from './components/AdminSidebar';
import { AdminHeader } from './components/AdminHeader';
import {
  AdminMenuKey,
  AdminMenuMeta,
  AdminRoleItem,
} from '../types/AdminDashboardTypes';

interface AdminDashboardLayoutProps {
  children: React.ReactNode;
  activeMenuTitle?: string;
  activeMenuKey: AdminMenuKey;
  menuItems: AdminMenuMeta[];
  menuCounts: Partial<Record<AdminMenuKey, string>>;
  roles: AdminRoleItem[];
  activeRole: AdminRoleItem;
  searchQuery: string;
  sessionChangeCount?: number;
  lastUpdatedAt?: string;
  liveOnlineVisitors?: number;
  userName?: string;
  onSearchChange: (query: string) => void;
  onSwitchRole: (roleId: string) => void;
  onNavigateItem?: () => void;
  onLogout?: () => void;
}

export const AdminDashboardLayout: React.FC<AdminDashboardLayoutProps> = ({
  children,
  activeMenuTitle = 'Ringkasan Utama',
  activeMenuKey,
  menuItems,
  menuCounts,
  roles,
  activeRole,
  searchQuery,
  sessionChangeCount,
  lastUpdatedAt,
  liveOnlineVisitors,
  userName,
  onSearchChange,
  onSwitchRole,
  onNavigateItem,
  onLogout,
}) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);

  return (
    <div className="flex min-h-screen bg-doff-linen text-doff-navy font-sans antialiased overflow-hidden">
      <AdminSidebar
        isCollapsed={isCollapsed}
        isMobileOpen={isMobileOpen}
        activeMenu={activeMenuKey}
        menuItems={menuItems}
        menuCounts={menuCounts}
        activeRoleName={activeRole.name}
        userName={userName}
        onToggleCollapse={() => setIsCollapsed((prev) => !prev)}
        onCloseMobile={() => setIsMobileOpen(false)}
        onNavigateItem={onNavigateItem}
        onLogout={onLogout}
      />

      <div className="flex-1 flex flex-col min-w-0 bg-doff-linen">
        <AdminHeader
          activeMenuKey={activeMenuKey}
          activeMenuTitle={activeMenuTitle}
          onOpenMobileSidebar={() => setIsMobileOpen(true)}
          searchQuery={searchQuery}
          onSearchChange={onSearchChange}
          roles={roles}
          activeRoleId={activeRole.id}
          onSwitchRole={onSwitchRole}
          sessionChangeCount={sessionChangeCount}
          lastUpdatedAt={lastUpdatedAt}
          liveOnlineVisitors={liveOnlineVisitors}
          canOpenMonitoring={menuItems.some((m) => m.key === 'monitoring')}
        />
        <main className="flex-1 min-w-0 w-full overflow-y-auto p-3 sm:p-5 md:p-6 xl:px-8 2xl:px-10 bg-gray-300/10">
          <div className="w-full max-w-[1680px] 2xl:max-w-[1920px] mx-auto space-y-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
