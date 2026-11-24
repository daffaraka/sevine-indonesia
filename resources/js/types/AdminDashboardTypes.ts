export type AdminMenuKey =
  | 'overview'
  | 'monitoring'
  | 'products'
  | 'categories'
  | 'brands'
  | 'events'
  | 'careers'
  | 'collaborations'
  | 'access';

export type BrandCategory = 'SEVINE' | 'klou' | 'LALUNA' | 'ASSAIF' | 'NABIRA';

export type ProductStatus = 'Produksi Aktif' | 'Review QC' | 'Draft Sampling';

export type MetricColorTheme = 'blue' | 'sky' | 'emerald' | 'amber' | 'rose';

export interface ProductSwatch {
  name: string;
  hex: string;
}

export interface AdminProductItem {
  id: number;
  sku: string;
  name: string;
  brand: BrandCategory;
  category: string;
  swatches: ProductSwatch[];
  capacity: string;
  status: ProductStatus;
  description?: string;
  images?: string[];
}

export interface AdminCategoryItem {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
}

export interface AdminBrandItem {
  id: string;
  key: BrandCategory;
  name: string;
  tagline: string;
  description: string;
  targetMarket: string;
  badgeColor: string;
  shopeeUrl: string;
}

export interface AdminEventItem {
  id: string;
  title: string;
  location: string;
  year: string;
  description: string;
  images: string[];
}

export type CareerLocation = 'Ngawi' | 'Malang' | 'Remote';
export type CareerEmploymentType = 'Full-time' | 'Part-time' | 'Magang';

export interface AdminCareerItem {
  id: string;
  title: string;
  division: string;
  location: CareerLocation;
  employmentType: CareerEmploymentType;
  qualifications: string;
  responsibilities: string;
  googleFormUrl: string;
  isActive: boolean;
  updatedAt: string;
}

export interface AdminPartnerItem {
  id: string;
  name: string;
  category: string;
  categoryLabel: string;
  logo: string;
  role: string;
  status: 'Mitra Aktif' | 'Nonaktif';
}

export interface AdminRoleItem {
  id: string;
  name: string;
  description: string;
  permissions: AdminMenuKey[];
  isSystem?: boolean;
}

export interface MetricStatItem {
  id: string;
  title: string;
  value: string;
  unit: string;
  badgeText: string;
  badgeType: 'positive' | 'warning' | 'neutral' | 'primary';
  colorTheme?: MetricColorTheme;
  description: string;
}

export interface AlertState {
  message: string;
  type: 'info' | 'success' | 'warning';
}

export interface AdminMenuMeta {
  key: AdminMenuKey;
  label: string;
  title: string;
  group: 'OVERVIEW' | 'MASTER DATA' | 'PUBLIKASI & REKRUTMEN' | 'PENGATURAN';
}

export interface DailyVisitorMetricItem {
  date: string;
  label: string;
  uniqueVisitors: number;
  pageViews: number;
  catalogViews: number;
  whatsappClicks: number;
  shopeeClicks: number;
  careerFormClicks: number;
}

export interface SystemHealthServiceItem {
  id: string;
  serviceName: string;
  category: 'Website' | 'Pencatatan' | 'Tautan Toko' | 'Rekrutmen';
  status: 'normal' | 'warning' | 'error';
  latencyMs: number;
  detailText: string;
  lastCheckedAt: string;
}

export interface ActivityLogItem {
  id: string;
  actorRole: string;
  module: string;
  actionLabel: string;
  targetLabel: string;
  timestamp: string;
  tone: 'info' | 'success' | 'warning';
}

export interface DeviceBreakdownItem {
  label: 'Ponsel (HP)' | 'Komputer / Laptop' | 'Tablet';
  percentage: number;
  count: number;
}

export interface TrafficSourceItem {
  source: string;
  visits: number;
  percentage: number;
}

export interface AdminAuthUser {
  id: number;
  name: string;
  email: string;
  roles: string[];
  permissions: AdminMenuKey[];
}

export interface AdminFlashMessages {
  success?: string | null;
  warning?: string | null;
  info?: string | null;
}

export interface AdminMonitoringServerPayload {
  liveOnlineVisitors: number;
  dailyMetrics: DailyVisitorMetricItem[];
  recentActivities: ActivityLogItem[];
  systemHealth: {
    databaseLatencyMs: number;
    appStatus: 'normal' | 'warning' | 'error';
    checkedAt: string;
  };
}

export interface AdminShellSharedProps {
  menuCounts: Partial<Record<AdminMenuKey, string>>;
  roles: AdminRoleItem[];
}

export interface AdminInertiaSharedProps {
  [key: string]: unknown;
  auth?: { user: AdminAuthUser | null };
  flash?: AdminFlashMessages;
  liveOnlineVisitors?: number;
  adminShell?: AdminShellSharedProps | null;
}

export interface AdminDashboardServerProps extends AdminInertiaSharedProps {
  activeMenu?: AdminMenuKey;
  products?: AdminProductItem[];
  categories?: AdminCategoryItem[];
  brands?: AdminBrandItem[];
  careers?: AdminCareerItem[];
  events?: AdminEventItem[];
  partners?: AdminPartnerItem[];
  roles?: AdminRoleItem[];
  monitoring?: AdminMonitoringServerPayload;
}
