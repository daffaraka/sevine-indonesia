import React, { useEffect, useState } from 'react';
import { AdminBrandItem } from '../../types/AdminDashboardTypes';
import { AdminModal } from '../admin-shared/AdminModal';
import { AdminButton } from '../admin-datatable/AdminButton';

interface AdminBrandFormModalProps {
  brand: AdminBrandItem | null;
  onClose: () => void;
  onSave: (updated: AdminBrandItem) => void;
}

export const AdminBrandFormModal: React.FC<AdminBrandFormModalProps> = ({
  brand,
  onClose,
  onSave,
}) => {
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [targetMarket, setTargetMarket] = useState('');
  const [shopeeUrl, setShopeeUrl] = useState('');

  useEffect(() => {
    if (!brand) return;
    setTagline(brand.tagline);
    setDescription(brand.description);
    setTargetMarket(brand.targetMarket);
    setShopeeUrl(brand.shopeeUrl);
  }, [brand]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!brand) return;
    onSave({
      ...brand,
      tagline: tagline.trim() || brand.tagline,
      description: description.trim() || brand.description,
      targetMarket: targetMarket.trim() || brand.targetMarket,
      shopeeUrl: shopeeUrl.trim() || brand.shopeeUrl,
    });
    onClose();
  };

  return (
    <AdminModal
      isOpen={Boolean(brand)}
      title={`Edit Profil Brand: ${brand?.name || ''}`}
      subtitle="Perbarui tagline, segmen target pasar, dan tautan etalase resmi brand."
      maxWidthClass="max-w-lg"
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div>
          <label className="block font-semibold text-doff-navy mb-1">Tagline</label>
          <input
            type="text"
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            className="w-full px-3 py-2 border border-doff-border rounded-md focus:outline-none focus:border-doff-navy"
          />
        </div>
        <div>
          <label className="block font-semibold text-doff-navy mb-1">Deskripsi Singkat</label>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-doff-border rounded-md focus:outline-none focus:border-doff-navy"
          />
        </div>
        <div>
          <label className="block font-semibold text-doff-navy mb-1">Target Pasar Utama</label>
          <input
            type="text"
            value={targetMarket}
            onChange={(e) => setTargetMarket(e.target.value)}
            className="w-full px-3 py-2 border border-doff-border rounded-md focus:outline-none focus:border-doff-navy"
          />
        </div>
        <div>
          <label className="block font-semibold text-doff-navy mb-1">URL Etalase Shopee Resmi</label>
          <input
            type="url"
            value={shopeeUrl}
            onChange={(e) => setShopeeUrl(e.target.value)}
            placeholder="https://shopee.co.id/..."
            className="w-full px-3 py-2 border border-doff-border rounded-md focus:outline-none focus:border-doff-navy font-mono"
          />
        </div>

        <div className="pt-3 border-t border-doff-border flex items-center justify-end gap-2">
          <AdminButton variant="secondary" onClick={onClose}>
            Batal
          </AdminButton>
          <AdminButton type="submit" variant="primary">
            Simpan Perubahan
          </AdminButton>
        </div>
      </form>
    </AdminModal>
  );
};
