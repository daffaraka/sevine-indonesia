import {
  AdminCategoryItem,
  AdminProductItem,
  BrandCategory,
  ProductStatus,
} from '../types/AdminDashboardTypes';
import { exportRowsToCsv } from './AdminDashboardService';

export interface ParsedCsvProductRow {
  rowNumber: number;
  sku: string;
  name: string;
  brand: BrandCategory;
  category: string;
  capacity: string;
  status: ProductStatus;
  description: string;
  errors: string[];
  warnings: string[];
  isValid: boolean;
}

export interface CsvImportValidationResult {
  rows: ParsedCsvProductRow[];
  validPayloads: Omit<AdminProductItem, 'id'>[];
  errorCount: number;
  warningCount: number;
}

const VALID_BRANDS: BrandCategory[] = ['SEVINE', 'klou', 'LALUNA', 'ASSAIF', 'NABIRA'];
const VALID_STATUSES: ProductStatus[] = ['Produksi Aktif', 'Review QC', 'Draft Sampling'];

export const PRODUCT_CSV_TEMPLATE_HEADERS = [
  'SKU',
  'Nama Produk',
  'Brand',
  'Kategori',
  'Kapasitas',
  'Status',
  'Deskripsi',
];

export const SAMPLE_PRODUCT_CSV_TEXT = [
  'SKU,Nama Produk,Brand,Kategori,Kapasitas,Status,Deskripsi',
  'SVN-BAG-201,Urban Commuter Sling 8L,SEVINE,Tas Harian (Crossbody),1.200 pcs/bln,Produksi Aktif,Cordura 1000D tahan air ringan',
  'KLU-APP-099,Relaxed Heavyweight Tee 240gsm,klou,Apparel Basic Timeless,2.000 pcs/bln,Review QC,Katun combed 20s bio-wash',
].join('\n');

export function downloadProductCsvTemplate(): void {
  exportRowsToCsv('template-impor-produk-sevine.csv', PRODUCT_CSV_TEMPLATE_HEADERS, [
    [
      'SVN-BAG-201',
      'Urban Commuter Sling 8L',
      'SEVINE',
      'Tas Harian (Crossbody)',
      '1.200 pcs/bln',
      'Produksi Aktif',
      'Cordura 1000D tahan air ringan',
    ],
    [
      'KLU-APP-099',
      'Relaxed Heavyweight Tee 240gsm',
      'klou',
      'Apparel Basic Timeless',
      '2.000 pcs/bln',
      'Review QC',
      'Katun combed 20s bio-wash',
    ],
  ]);
}

export function parseCsvText(rawText: string): string[][] {
  const cleaned = rawText.replace(/^\uFEFF/, '').trim();
  if (!cleaned) return [];

  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentCell = '';
  let inQuotes = false;

  for (let i = 0; i < cleaned.length; i += 1) {
    const ch = cleaned[i];
    const next = cleaned[i + 1];

    if (ch === '"') {
      if (inQuotes && next === '"') {
        currentCell += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (ch === ',' && !inQuotes) {
      currentRow.push(currentCell.trim());
      currentCell = '';
      continue;
    }

    if ((ch === '\n' || ch === '\r') && !inQuotes) {
      if (ch === '\r' && next === '\n') i += 1;
      currentRow.push(currentCell.trim());
      if (currentRow.some((cell) => cell.length > 0)) {
        rows.push(currentRow);
      }
      currentRow = [];
      currentCell = '';
      continue;
    }

    currentCell += ch;
  }

  currentRow.push(currentCell.trim());
  if (currentRow.some((cell) => cell.length > 0)) {
    rows.push(currentRow);
  }

  return rows;
}

const normalizeBrand = (raw: string): BrandCategory | null => {
  const found = VALID_BRANDS.find((b) => b.toLowerCase() === raw.trim().toLowerCase());
  return found || null;
};

const normalizeStatus = (raw: string): ProductStatus | null => {
  if (!raw.trim()) return 'Draft Sampling';
  const found = VALID_STATUSES.find((s) => s.toLowerCase() === raw.trim().toLowerCase());
  return found || null;
};

export function validateProductCsvRows(
  rawRows: string[][],
  existingProducts: AdminProductItem[],
  categories: AdminCategoryItem[],
): CsvImportValidationResult {
  if (rawRows.length === 0) {
    return { rows: [], validPayloads: [], errorCount: 0, warningCount: 0 };
  }

  const firstCell = (rawRows[0][0] || '').toLowerCase();
  const dataRows = firstCell === 'sku' ? rawRows.slice(1) : rawRows;
  const existingSkuSet = new Set(existingProducts.map((p) => p.sku.trim().toUpperCase()));
  const seenBatchSkus = new Set<string>();
  const categoryNames = new Set(categories.map((c) => c.name.toLowerCase()));

  const parsedRows: ParsedCsvProductRow[] = [];
  const validPayloads: Omit<AdminProductItem, 'id'>[] = [];
  let errorCount = 0;
  let warningCount = 0;

  dataRows.forEach((cols, index) => {
    const sku = (cols[0] || '').trim().toUpperCase();
    const name = (cols[1] || '').trim();
    const brandRaw = (cols[2] || '').trim();
    const category = (cols[3] || '').trim() || categories[0]?.name || 'Lainnya';
    const capacity = (cols[4] || '').trim() || '1.000 pcs/bln';
    const statusRaw = (cols[5] || '').trim();
    const description = (cols[6] || '').trim();

    const errors: string[] = [];
    const warnings: string[] = [];

    if (!sku) errors.push('SKU kosong');
    if (!name) errors.push('Nama produk kosong');
    if (sku && existingSkuSet.has(sku)) errors.push('SKU sudah ada');
    if (sku && seenBatchSkus.has(sku)) errors.push('SKU duplikat di file');

    const matchedBrand = normalizeBrand(brandRaw);
    if (!matchedBrand) errors.push(`Brand "${brandRaw || '-'}" tidak valid`);

    const matchedStatus = normalizeStatus(statusRaw);
    if (!matchedStatus) errors.push(`Status "${statusRaw}" tidak dikenal`);

    if (!categoryNames.has(category.toLowerCase())) {
      warnings.push('Kategori baru / belum terdaftar');
    }

    if (sku) seenBatchSkus.add(sku);

    const isValid = errors.length === 0 && matchedBrand !== null && matchedStatus !== null;
    if (!isValid) errorCount += 1;
    if (warnings.length > 0) warningCount += 1;

    parsedRows.push({
      rowNumber: index + 1,
      sku: sku || '-',
      name: name || '-',
      brand: matchedBrand || 'SEVINE',
      category,
      capacity,
      status: matchedStatus || 'Draft Sampling',
      description,
      errors,
      warnings,
      isValid,
    });

    if (isValid && matchedBrand && matchedStatus) {
      validPayloads.push({
        sku,
        name,
        brand: matchedBrand,
        category,
        capacity,
        status: matchedStatus,
        description,
        swatches: [{ name: 'Navy Doff', hex: '#1B2E4B' }],
        images: [],
      });
    }
  });

  return { rows: parsedRows, validPayloads, errorCount, warningCount };
}
