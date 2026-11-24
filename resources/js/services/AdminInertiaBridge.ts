import { router } from '@inertiajs/react';
import { AdminMenuKey } from '../types/AdminDashboardTypes';

type InertiaMethod = 'post' | 'put' | 'patch' | 'delete';
type ErrorHandler = (message: string) => void;

export const ADMIN_ROUTE_BY_MENU: Record<AdminMenuKey, string> = {
  overview: '/admin',
  monitoring: '/admin/monitoring',
  products: '/admin/products',
  categories: '/admin/categories',
  brands: '/admin/brands',
  careers: '/admin/careers',
  events: '/admin/events',
  collaborations: '/admin/collaborations',
  access: '/admin/access',
};

const ROUTE_ENTRIES_BY_SPECIFICITY: [AdminMenuKey, string][] = (
  Object.entries(ADMIN_ROUTE_BY_MENU) as [AdminMenuKey, string][]
).sort((a, b) => b[1].length - a[1].length);

export function getMenuKeyFromUrl(url: string): AdminMenuKey {
  const pathname = url.split('?')[0].split('#')[0].replace(/\/+$/, '') || '/admin';
  for (const [key, routePath] of ROUTE_ENTRIES_BY_SPECIFICITY) {
    if (pathname === routePath || pathname.startsWith(`${routePath}/`)) {
      return key;
    }
  }
  return 'overview';
}

const extractFirstError = (errors: Record<string, string>): string => {
  const firstValue = Object.values(errors)[0];
  return firstValue || 'Validasi gagal. Periksa kembali data yang diinput.';
};

export function visitAdminMenu(menuKey: AdminMenuKey): void {
  router.visit(ADMIN_ROUTE_BY_MENU[menuKey] || '/admin', {
    preserveScroll: false,
  });
}

export function submitInertiaMutation(
  method: InertiaMethod,
  url: string,
  payload?: Record<string, unknown>,
  onError?: ErrorHandler,
): void {
  const options = {
    preserveScroll: true,
    preserveState: true,
    onError: (errors: Record<string, string>) => {
      if (onError) onError(extractFirstError(errors));
    },
  };

  if (method === 'delete') {
    router.delete(url, { ...options, data: payload as never });
    return;
  }

  router[method](url, (payload || {}) as never, options);
}

export function reloadMonitoringPartial(): void {
  router.reload({
    only: ['monitoring', 'liveOnlineVisitors'],
  });
}

export function logoutAdminSession(): void {
  router.post('/logout');
}
