import { createContext, useContext } from 'react';
import { AdminRoleItem, AlertState } from '../types/AdminDashboardTypes';

export interface AdminShellContextValue {
  headerSearch: string;
  setHeaderSearch: (query: string) => void;
  showAlert: (message: string, type?: AlertState['type']) => void;
  activeRole: AdminRoleItem;
  switchActiveRole: (roleId: string) => void;
}

export const AdminShellContext = createContext<AdminShellContextValue | null>(null);

export function useAdminShell(): AdminShellContextValue {
  const context = useContext(AdminShellContext);
  if (!context) {
    throw new Error('useAdminShell harus digunakan di dalam AdminInertiaShell.');
  }
  return context;
}
