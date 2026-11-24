import { router } from '@inertiajs/react';
import { ProductCatalogPage } from '../../classic/product-catalog/ProductCatalogPage';

export default function ProductCatalog() {
  return (
    <ProductCatalogPage
      id="catalog-view"
      onNavigateHome={() => router.visit('/')}
    />
  );
}
