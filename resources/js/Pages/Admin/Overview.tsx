import { Head } from '@inertiajs/react';
import {
  AdminBrandItem,
  AdminCareerItem,
  AdminCategoryItem,
  AdminEventItem,
  AdminPartnerItem,
  AdminProductItem,
} from '../../types/AdminDashboardTypes';
import { renderAdminPersistentLayout } from '../../Layouts/AdminInertiaShell';
import { useAdminShell } from '../../Layouts/AdminShellContext';
import { visitAdminMenu } from '../../services/AdminInertiaBridge';
import { AdminOverviewSection } from '../../admin/admin-overview/AdminOverviewSection';

interface OverviewPageProps {
  products: AdminProductItem[];
  categories: AdminCategoryItem[];
  brands: AdminBrandItem[];
  careers: AdminCareerItem[];
  events: AdminEventItem[];
  partners: AdminPartnerItem[];
}

function OverviewPage({
  products,
  categories,
  brands,
  careers,
  events,
  partners,
}: OverviewPageProps) {
  const { activeRole } = useAdminShell();

  return (
    <>
      <Head title="Ringkasan Utama" />
      <AdminOverviewSection
        products={products}
        categories={categories}
        brands={brands}
        careers={careers}
        events={events}
        partners={partners}
        activeRole={activeRole}
        onNavigateMenu={visitAdminMenu}
      />
    </>
  );
}

OverviewPage.layout = renderAdminPersistentLayout;

export default OverviewPage;
