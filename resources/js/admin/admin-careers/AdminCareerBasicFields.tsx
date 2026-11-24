import React from 'react';
import {
  CareerEmploymentType,
  CareerLocation,
} from '../../types/AdminDashboardTypes';

export interface CareerBasicFormValues {
  title: string;
  division: string;
  location: CareerLocation;
  employmentType: CareerEmploymentType;
  googleFormUrl: string;
  isActive: boolean;
}

interface AdminCareerBasicFieldsProps {
  values: CareerBasicFormValues;
  onChange: <K extends keyof CareerBasicFormValues>(
    field: K,
    value: CareerBasicFormValues[K],
  ) => void;
}

export const AdminCareerBasicFields: React.FC<AdminCareerBasicFieldsProps> = ({
  values,
  onChange,
}) => (
  <>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div>
        <label className="block font-semibold text-doff-navy mb-1">Posisi / Judul Lowongan *</label>
        <input
          type="text"
          value={values.title}
          onChange={(e) => onChange('title', e.target.value)}
          placeholder="Mis. Staff Quality Control"
          className="w-full px-3 py-2 border border-doff-border rounded-md focus:outline-none focus:border-doff-navy"
        />
      </div>
      <div>
        <label className="block font-semibold text-doff-navy mb-1">Divisi</label>
        <input
          type="text"
          value={values.division}
          onChange={(e) => onChange('division', e.target.value)}
          placeholder="Mis. Kreatif & Branding"
          className="w-full px-3 py-2 border border-doff-border rounded-md focus:outline-none focus:border-doff-navy"
        />
      </div>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div>
        <label className="block font-semibold text-doff-navy mb-1">Lokasi Penempatan</label>
        <select
          value={values.location}
          onChange={(e) => onChange('location', e.target.value as CareerLocation)}
          className="w-full px-3 py-2 border border-doff-border rounded-md focus:outline-none focus:border-doff-navy bg-white"
        >
          <option value="Ngawi">Ngawi (Pabrik Pusat)</option>
          <option value="Malang">Malang (Kantor Digital & Kreatif)</option>
          <option value="Remote">Remote</option>
        </select>
      </div>
      <div>
        <label className="block font-semibold text-doff-navy mb-1">Tipe Kerja</label>
        <select
          value={values.employmentType}
          onChange={(e) => onChange('employmentType', e.target.value as CareerEmploymentType)}
          className="w-full px-3 py-2 border border-doff-border rounded-md focus:outline-none focus:border-doff-navy bg-white"
        >
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Magang">Magang</option>
        </select>
      </div>
    </div>

    <div>
      <label className="block font-semibold text-doff-navy mb-1">Tautan Google Form Pendaftaran *</label>
      <input
        type="url"
        value={values.googleFormUrl}
        onChange={(e) => onChange('googleFormUrl', e.target.value)}
        placeholder="https://forms.gle/..."
        className="w-full px-3 py-2 border border-doff-border rounded-md focus:outline-none focus:border-doff-navy font-mono"
      />
    </div>
  </>
);
