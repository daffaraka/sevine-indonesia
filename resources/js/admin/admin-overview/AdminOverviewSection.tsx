import React from 'react';
import {
  AdminBrandItem,
  AdminCareerItem,
  AdminCategoryItem,
  AdminEventItem,
  AdminMenuKey,
  AdminPartnerItem,
  AdminProductItem,
  AdminRoleItem,
} from '../../types/AdminDashboardTypes';
import { AdminOverviewKpiStrip } from './AdminOverviewKpiStrip';
import { AdminActionItemsCard } from './AdminActionItemsCard';
import { AdminBrandStatusSummaryCard } from './AdminBrandStatusSummaryCard';

interface AdminOverviewSectionProps {
  products: AdminProductItem[];
  categories: AdminCategoryItem[];
  brands: AdminBrandItem[];
  careers: AdminCareerItem[];
  events: AdminEventItem[];
  partners: AdminPartnerItem[];
  activeRole: AdminRoleItem;
  onNavigateMenu: (key: AdminMenuKey) => void;
}

export const AdminOverviewSection: React.FC<AdminOverviewSectionProps> = ({
  products,
  categories,
  brands,
  careers,
  events,
  partners,
  activeRole,
  onNavigateMenu,
}) => {
  const canOpen = (key: AdminMenuKey) => activeRole.permissions.includes(key);

  return (
    <div className="space-y-5">
      <AdminOverviewKpiStrip
        products={products}
        categories={categories}
        careers={careers}
        events={events}
        partners={partners}
        canOpen={canOpen}
        onNavigateMenu={onNavigateMenu}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">
        <div className="lg:col-span-2">
          <AdminActionItemsCard
            products={products}
            brands={brands}
            careers={careers}
            canOpen={canOpen}
            onNavigateMenu={onNavigateMenu}
          />
        </div>

        <AdminBrandStatusSummaryCard
          brands={brands}
          products={products}
          canOpen={canOpen}
          onNavigateMenu={onNavigateMenu}
        />
      </div>
    </div>
  );
};
