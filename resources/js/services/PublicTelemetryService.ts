import { formatRupiah } from '../classic/product-catalog/hooks/ProductCatalogFilterUtils';
import { CatalogProductItem } from '../classic/product-catalog/types/ProductCatalogTypes';

export type PublicTelemetryClickType = 'shopee' | 'whatsapp' | 'career';

interface TelemetryClickMeta {
  productId?: number;
  careerId?: number;
}

const WHATSAPP_B2B_NUMBER = '6281398205665';

function getXsrfToken(): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(/(?:^|;\s*)XSRF-TOKEN=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : null;
}

export function recordPublicClick(
  type: PublicTelemetryClickType,
  meta: TelemetryClickMeta = {},
): void {
  if (typeof window === 'undefined' || typeof fetch === 'undefined') return;

  const payload: Record<string, string | number> = { type };
  if (typeof meta.productId === 'number' && Number.isFinite(meta.productId) && meta.productId > 0) {
    payload.productId = meta.productId;
  }
  if (typeof meta.careerId === 'number' && Number.isFinite(meta.careerId) && meta.careerId > 0) {
    payload.careerId = meta.careerId;
  }

  const xsrfToken = getXsrfToken();
  try {
    void fetch('/telemetry/click', {
      method: 'POST',
      keepalive: true,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...(xsrfToken ? { 'X-XSRF-TOKEN': xsrfToken } : {}),
      },
      body: JSON.stringify(payload),
    });
  } catch {
    // Telemetry bersifat non-blocking agar tidak mengganggu navigasi pengguna
  }
}

export function getProductDetailPath(sku: string): string {
  return `/catalog/${encodeURIComponent(sku)}`;
}

export function buildProductWhatsAppUrl(
  product: CatalogProductItem,
  selectedSwatchName?: string,
): string {
  const lines = [
    'Halo Tim CV. SEVINE INDONESIA,',
    'Saya tertarik dengan produk katalog:',
    `*Nama Produk:* ${product.title}`,
    `*SKU:* ${product.sku}`,
    `*Brand:* ${product.brand}`,
    ...(selectedSwatchName ? [`*Pilihan Warna:* ${selectedSwatchName}`] : []),
    `*Harga Ritel:* ${formatRupiah(product.price)}`,
    ...(product.isB2BReady
      ? [`*Harga Grosir:* ${formatRupiah(product.wholesalePrice)} (Min. ${product.minWholesaleQty} pcs)`]
      : []),
    '',
    'Mohon info ketersediaan stok & prosedur pemesanan / sampel. Terima kasih!',
  ];
  return `https://wa.me/${WHATSAPP_B2B_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;
}
