import React from 'react';
import {
  AdminCategoryItem,
  BrandCategory,
  ProductStatus,
} from '../../types/AdminDashboardTypes';

export interface ProductFormValues {
  sku: string;
  name: string;
  brand: BrandCategory;
  category: string;
  capacity: string;
  status: ProductStatus;
  description: string;
}

interface AdminProductFormFieldsProps {
  values: ProductFormValues;
  categories: AdminCategoryItem[];
  onChange: <K extends keyof ProductFormValues>(field: K, value: ProductFormValues[K]) => void;
}

export const AdminProductFormFields: React.FC<AdminProductFormFieldsProps> = ({
  values,
  categories,
  onChange,
}) => (
  <>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div>
        <label className="block font-semibold text-doff-navy mb-1">Kode SKU *</label>
        <input
          type="text"
          value={values.sku}
          onChange={(e) => onChange('sku', e.target.value)}
          placeholder="Mis. SVN-BAG-120"
          className="w-full px-3 py-2 border border-doff-border rounded-md focus:outline-none focus:border-doff-navy font-mono"
        />
      </div>
      <div>
        <label className="block font-semibold text-doff-navy mb-1">Brand Naungan</label>
        <select
          value={values.brand}
          onChange={(e) => onChange('brand', e.target.value as BrandCategory)}
          className="w-full px-3 py-2 border border-doff-border rounded-md focus:outline-none focus:border-doff-navy bg-white"
        >
          <option value="SEVINE">SEVINE</option>
          <option value="klou">klou</option>
          <option value="LALUNA">LALUNA</option>
          <option value="ASSAIF">ASSAIF</option>
          <option value="NABIRA">NABIRA</option>
        </select>
      </div>
    </div>

    <div>
      <label className="block font-semibold text-doff-navy mb-1">Nama Model Produk *</label>
      <input
        type="text"
        value={values.name}
        onChange={(e) => onChange('name', e.target.value)}
        placeholder="Mis. Commuter Waterproof Daypack 24L"
        className="w-full px-3 py-2 border border-doff-border rounded-md focus:outline-none focus:border-doff-navy"
      />
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      <div>
        <label className="block font-semibold text-doff-navy mb-1">Kategori</label>
        <select
          value={values.category}
          onChange={(e) => onChange('category', e.target.value)}
          className="w-full px-3 py-2 border border-doff-border rounded-md focus:outline-none focus:border-doff-navy bg-white"
        >
          {categories.map((c) => (
            <option key={c.id} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block font-semibold text-doff-navy mb-1">Kapasitas Output</label>
        <input
          type="text"
          value={values.capacity}
          onChange={(e) => onChange('capacity', e.target.value)}
          placeholder="1.500 pcs/bln"
          className="w-full px-3 py-2 border border-doff-border rounded-md focus:outline-none focus:border-doff-navy"
        />
      </div>
      <div>
        <label className="block font-semibold text-doff-navy mb-1">Status</label>
        <select
          value={values.status}
          onChange={(e) => onChange('status', e.target.value as ProductStatus)}
          className="w-full px-3 py-2 border border-doff-border rounded-md focus:outline-none focus:border-doff-navy bg-white"
        >
          <option value="Produksi Aktif">Produksi Aktif</option>
          <option value="Review QC">Review QC</option>
          <option value="Draft Sampling">Draft Sampling</option>
        </select>
      </div>
    </div>

    <div>
      <label className="block font-semibold text-doff-navy mb-1">Deskripsi Produk</label>
      <textarea
        rows={2}
        value={values.description}
        onChange={(e) => onChange('description', e.target.value)}
        placeholder="Ringkasan spesifikasi bahan, dimensi, atau fitur utama..."
        className="w-full px-3 py-2 border border-doff-border rounded-md focus:outline-none focus:border-doff-navy"
      />
    </div>
  </>
);
