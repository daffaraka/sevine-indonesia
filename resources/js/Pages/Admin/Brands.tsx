import { Head } from '@inertiajs/react';
import { AdminBrandItem, AdminProductItem } from '../../types/AdminDashboardTypes';
import { renderAdminPersistentLayout } from '../../Layouts/AdminInertiaShell';
import { useAdminShell } from '../../Layouts/AdminShellContext';
import { submitInertiaMutation } from '../../services/AdminInertiaBridge';
import { AdminBrandsSection } from '../../admin/admin-brands/AdminBrandsSection';

interface BrandsPageProps {
  brands: AdminBrandItem[];
  products: AdminProductItem[];
}

function BrandsPage({ brands, products }: BrandsPageProps) {
  const { showAlert } = useAdminShell();
  const handleError = (message: string) => showAlert(message, 'warning');

  const handleUpdateBrand = (updated: AdminBrandItem) => {
    submitInertiaMutation(
      'put',
      `/admin/brands/${updated.id}`,
      {
        name: updated.name,
        tagline: updated.tagline,
        description: updated.description,
        targetMarket: updated.targetMarket,
        shopeeUrl: updated.shopeeUrl,
      },
      handleError,
    );
  };

  return (
    <>
      <Head title="Profil & Manajemen Brand" />
      <AdminBrandsSection
        brands={brands}
        products={products}
        onUpdateBrand={handleUpdateBrand}
      />
    </>
  );
}

BrandsPage.layout = renderAdminPersistentLayout;

export default BrandsPage;
