import { useMemo } from 'react';
import { Head } from '@inertiajs/react';
import { ProductDetailPage } from '../../classic/product-detail/ProductDetailPage';
import {
  BackendProduct,
  mapRelatedProductsFromDb,
  mapSingleProductFromDb,
} from '../../services/PublicSyncMapper';

interface ProductDetailProps {
  product: BackendProduct;
  relatedProducts?: BackendProduct[];
}

export default function ProductDetail({
  product: dbProduct,
  relatedProducts: dbRelatedProducts,
}: ProductDetailProps) {
  const product = useMemo(() => mapSingleProductFromDb(dbProduct), [dbProduct]);
  const relatedProducts = useMemo(
    () => mapRelatedProductsFromDb(dbRelatedProducts),
    [dbRelatedProducts],
  );

  const metaDescription = product.description
    ? product.description.slice(0, 155)
    : `${product.title} (${product.sku}) dari ${product.brand} — CV. Sevine Indonesia.`;

  const productJsonLd = useMemo(
    () =>
      JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.title,
        sku: product.sku,
        image: product.gallery,
        description: metaDescription,
        brand: {
          '@type': 'Brand',
          name: product.brand,
        },
        offers: {
          '@type': 'Offer',
          priceCurrency: 'IDR',
          price: product.price,
          availability: product.isReadyStock
            ? 'https://schema.org/InStock'
            : 'https://schema.org/PreOrder',
          url: product.shopeeUrl,
        },
      }),
    [product, metaDescription],
  );

  return (
    <>
      <Head title={`${product.title} (${product.sku}) - Katalog`}>
        <meta name="description" content={metaDescription} />
        <meta property="og:title" content={`${product.title} - ${product.brand}`} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={product.image} />
        <script type="application/ld+json">{productJsonLd}</script>
      </Head>
      <ProductDetailPage
        id="product-detail-view"
        product={product}
        relatedProducts={relatedProducts}
      />
    </>
  );
}
