import { Head } from '@inertiajs/react';
import { AdminCategoryItem, AdminProductItem } from '../../types/AdminDashboardTypes';
import { renderAdminPersistentLayout } from '../../Layouts/AdminInertiaShell';
import { useAdminShell } from '../../Layouts/AdminShellContext';
import { submitInertiaMutation } from '../../services/AdminInertiaBridge';
import { AdminCategoriesSection } from '../../admin/admin-categories/AdminCategoriesSection';

interface CategoriesPageProps {
  categories: AdminCategoryItem[];
  products: AdminProductItem[];
}

function CategoriesPage({ categories, products }: CategoriesPageProps) {
  const { showAlert } = useAdminShell();
  const handleError = (message: string) => showAlert(message, 'warning');

  const handleSaveCategory = (payload: Omit<AdminCategoryItem, 'id'>, editId?: string) => {
    if (editId) {
      submitInertiaMutation('put', `/admin/categories/${editId}`, payload, handleError);
      return;
    }
    submitInertiaMutation('post', '/admin/categories', payload, handleError);
  };

  const handleDeleteCategory = (id: string) => {
    submitInertiaMutation('delete', `/admin/categories/${id}`, undefined, handleError);
  };

  return (
    <>
      <Head title="Kategori Produk" />
      <AdminCategoriesSection
        categories={categories}
        products={products}
        onSaveCategory={handleSaveCategory}
        onDeleteCategory={handleDeleteCategory}
      />
    </>
  );
}

CategoriesPage.layout = renderAdminPersistentLayout;

export default CategoriesPage;
