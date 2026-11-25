import { useMemo } from 'react';
import { router } from '@inertiajs/react';
import { ProductCatalogPage } from '../../classic/product-catalog/ProductCatalogPage';
import {
  BackendBrand,
  BackendCategory,
  BackendProduct,
  mapCatalogBrandOptionsFromDb,
  mapCatalogCategoryOptionsFromDb,
  mapProductsFromDb,
} from '../../services/PublicSyncMapper';

interface ProductCatalogProps {
  products?: BackendProduct[];
  brands?: BackendBrand[];
  categories?: BackendCategory[];
}

export default function ProductCatalog({
  products: dbProducts,
  brands: dbBrands,
  categories: dbCategories,
}: ProductCatalogProps) {
  const products = useMemo(() => mapProductsFromDb(dbProducts), [dbProducts]);
  const brandOptions = useMemo(() => mapCatalogBrandOptionsFromDb(dbBrands), [dbBrands]);
  const categoryOptions = useMemo(() => mapCatalogCategoryOptionsFromDb(dbCategories), [dbCategories]);

  return (
    <ProductCatalogPage
      id="catalog-view"
      onNavigateHome={() => router.visit('/')}
      products={products}
      brandOptions={brandOptions}
      categoryOptions={categoryOptions}
    />
  );
}
