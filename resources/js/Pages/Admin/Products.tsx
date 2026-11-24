import { Head } from '@inertiajs/react';
import {
  AdminCategoryItem,
  AdminProductItem,
  ProductStatus,
} from '../../types/AdminDashboardTypes';
import { renderAdminPersistentLayout } from '../../Layouts/AdminInertiaShell';
import { useAdminShell } from '../../Layouts/AdminShellContext';
import { submitInertiaMutation } from '../../services/AdminInertiaBridge';
import { AdminProductDatatable } from '../../admin/admin-datatable/AdminProductDatatable';

interface ProductsPageProps {
  products: AdminProductItem[];
  categories: AdminCategoryItem[];
}

function ProductsPage({ products, categories }: ProductsPageProps) {
  const { headerSearch, showAlert } = useAdminShell();
  const handleError = (message: string) => showAlert(message, 'warning');

  const handleSaveProduct = (payload: Omit<AdminProductItem, 'id'>, editId?: number) => {
    if (editId !== undefined) {
      submitInertiaMutation('put', `/admin/products/${editId}`, payload, handleError);
      return;
    }
    submitInertiaMutation('post', '/admin/products', payload, handleError);
  };

  const handleImportProducts = (items: Omit<AdminProductItem, 'id'>[]) => {
    if (items.length === 0) return;
    submitInertiaMutation('post', '/admin/products/import-csv', { items }, handleError);
  };

  const handleDeleteProducts = (ids: number[]) => {
    if (ids.length === 0) return;
    if (ids.length === 1) {
      submitInertiaMutation('delete', `/admin/products/${ids[0]}`, undefined, handleError);
      return;
    }
    submitInertiaMutation('delete', '/admin/products/bulk-delete', { ids }, handleError);
  };

  const handleBulkUpdateStatus = (ids: number[], status: ProductStatus) => {
    if (ids.length === 0) return;
    submitInertiaMutation('patch', '/admin/products/bulk-status', { ids, status }, handleError);
  };

  return (
    <>
      <Head title="Katalog Produk" />
      <AdminProductDatatable
        products={products}
        categories={categories}
        externalSearch={headerSearch}
        onSaveProduct={handleSaveProduct}
        onImportProducts={handleImportProducts}
        onDeleteProducts={handleDeleteProducts}
        onBulkUpdateStatus={handleBulkUpdateStatus}
        onShowAlert={showAlert}
      />
    </>
  );
}

ProductsPage.layout = renderAdminPersistentLayout;

export default ProductsPage;
