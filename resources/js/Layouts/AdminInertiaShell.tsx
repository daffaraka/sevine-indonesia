import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { usePage } from '@inertiajs/react';
import {
  AdminInertiaSharedProps,
  AdminMenuKey,
  AdminRoleItem,
  AlertState,
} from '../types/AdminDashboardTypes';
import {
  ADMIN_MENU_DEFINITIONS,
  INITIAL_ADMIN_ROLES,
} from '../services/AdminDashboardService';
import {
  getMenuKeyFromUrl,
  logoutAdminSession,
  visitAdminMenu,
} from '../services/AdminInertiaBridge';
import { AdminDashboardLayout } from './AdminDashboardLayout';
import { AlertBanner } from './components/AlertBanner';
import { AdminShellContext } from './AdminShellContext';

interface AdminInertiaShellProps {
  children: React.ReactNode;
}

export const AdminInertiaShell: React.FC<AdminInertiaShellProps> = ({ children }) => {
  const { url, props } = usePage<AdminInertiaSharedProps>();
  const activeMenuKey = useMemo<AdminMenuKey>(() => getMenuKeyFromUrl(url), [url]);

  const roles = useMemo<AdminRoleItem[]>(() => {
    const serverRoles = props.adminShell?.roles;
    return serverRoles && serverRoles.length > 0 ? serverRoles : INITIAL_ADMIN_ROLES;
  }, [props.adminShell?.roles]);

  const [activeRoleId, setActiveRoleId] = useState<string>(roles[0].id);
  const [headerSearch, setHeaderSearch] = useState<string>('');
  const [alert, setAlert] = useState<AlertState | null>(null);
  const [sessionChangeCount, setSessionChangeCount] = useState<number>(0);
  const [lastUpdatedAt, setLastUpdatedAt] = useState<string>('Tersinkron');
  const alertTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!roles.some((role) => role.id === activeRoleId)) {
      setActiveRoleId(roles[0].id);
    }
  }, [roles, activeRoleId]);

  const showAlert = useCallback((message: string, type: AlertState['type'] = 'info') => {
    setAlert({ message, type });
    if (type === 'success' || (type === 'warning' && message.includes('dihapus'))) {
      setSessionChangeCount((prev) => prev + 1);
      setLastUpdatedAt(
        new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      );
    }
    if (alertTimerRef.current) window.clearTimeout(alertTimerRef.current);
    alertTimerRef.current = window.setTimeout(() => setAlert(null), 4000);
  }, []);

  useEffect(() => {
    return () => {
      if (alertTimerRef.current) window.clearTimeout(alertTimerRef.current);
    };
  }, []);

  useEffect(() => {
    const flash = props.flash;
    if (!flash) return;
    if (flash.success) showAlert(flash.success, 'success');
    else if (flash.warning) showAlert(flash.warning, 'warning');
    else if (flash.info) showAlert(flash.info, 'info');
  }, [props.flash, showAlert]);

  const activeRole = useMemo(
    () => roles.find((role) => role.id === activeRoleId) || roles[0],
    [roles, activeRoleId],
  );

  const allowedMenuKeys = useMemo(
    () => new Set<AdminMenuKey>(activeRole ? activeRole.permissions : ['overview']),
    [activeRole],
  );

  const visibleMenuItems = useMemo(
    () => ADMIN_MENU_DEFINITIONS.filter((item) => allowedMenuKeys.has(item.key)),
    [allowedMenuKeys],
  );

  const activeMenuMeta = useMemo(
    () => ADMIN_MENU_DEFINITIONS.find((item) => item.key === activeMenuKey),
    [activeMenuKey],
  );

  const switchActiveRole = useCallback(
    (roleId: string) => {
      const target = roles.find((role) => role.id === roleId);
      if (!target) return;
      setActiveRoleId(roleId);
      showAlert(`Mode akses dialihkan ke role "${target.name}".`, 'info');
      if (!target.permissions.includes(activeMenuKey)) {
        visitAdminMenu(target.permissions[0] || 'overview');
      }
    },
    [roles, activeMenuKey, showAlert],
  );

  const handleHeaderSearch = useCallback(
    (query: string) => {
      setHeaderSearch(query);
      if (query.trim() && activeMenuKey === 'overview' && allowedMenuKeys.has('products')) {
        visitAdminMenu('products');
      }
    },
    [activeMenuKey, allowedMenuKeys],
  );

  const handleNavClick = useCallback(() => {
    setHeaderSearch('');
  }, []);

  const contextValue = useMemo(
    () => ({
      headerSearch,
      setHeaderSearch,
      showAlert,
      activeRole,
      switchActiveRole,
    }),
    [headerSearch, showAlert, activeRole, switchActiveRole],
  );

  return (
    <AdminShellContext.Provider value={contextValue}>
      <AdminDashboardLayout
        activeMenuTitle={activeMenuMeta?.title || 'Dashboard Admin'}
        activeMenuKey={activeMenuKey}
        menuItems={visibleMenuItems}
        menuCounts={props.adminShell?.menuCounts || {}}
        roles={roles}
        activeRole={activeRole}
        searchQuery={headerSearch}
        sessionChangeCount={sessionChangeCount}
        lastUpdatedAt={lastUpdatedAt}
        liveOnlineVisitors={props.liveOnlineVisitors ?? 0}
        userName={props.auth?.user?.name}
        onSearchChange={handleHeaderSearch}
        onSwitchRole={switchActiveRole}
        onNavigateItem={handleNavClick}
        onLogout={logoutAdminSession}
      >
        {alert && (
          <AlertBanner
            message={alert.message}
            type={alert.type}
            onClose={() => setAlert(null)}
          />
        )}
        {children}
      </AdminDashboardLayout>
    </AdminShellContext.Provider>
  );
};

export function renderAdminPersistentLayout(page: React.ReactNode): React.ReactNode {
  return <AdminInertiaShell>{page}</AdminInertiaShell>;
}
