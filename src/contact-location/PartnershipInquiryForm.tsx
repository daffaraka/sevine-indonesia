import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import { InquiryFormData } from '../types/CompanyProfileTypes';
import { CompanyProfileService } from '../services/CompanyProfileService';

export const PartnershipInquiryForm: React.FC = () => {
  const [formData, setFormData] = useState<InquiryFormData>({
    fullName: '',
    companyOrStoreName: '',
    whatsappNumber: '',
    partnershipType: 'reseller',
    preferredBrand: 'SEVINE',
    messageNotes: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.whatsappNumber) return;

    const waUrl = CompanyProfileService.generateWhatsAppInquiryUrl(formData);
    setSubmitted(true);
    setTimeout(() => {
      window.open(waUrl, '_blank');
      setSubmitted(false);
    }, 400);
  };

  return (
    <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200 shadow-doff-sm">
      <div className="mb-6 space-y-1 pb-4 border-b border-slate-100">
        <h3 className="font-bold text-doff-navy text-lg sm:text-xl">
          Formulir Permohonan Kemitraan
        </h3>
        <p className="text-xs text-slate-500">
          Isi detail kebutuhan Anda untuk terhubung langsung dengan tim PIC resmi Sevine.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Nama Lengkap *</label>
            <input
              type="text"
              required
              placeholder="Contoh: Budi Santoso"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs text-slate-800 focus:outline-none focus:border-doff-navy bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Nomor WhatsApp *</label>
            <input
              type="tel"
              required
              placeholder="Contoh: 08123456789"
              value={formData.whatsappNumber}
              onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs text-slate-800 focus:outline-none focus:border-doff-navy bg-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Instansi / Toko (Opsional)</label>
            <input
              type="text"
              placeholder="Contoh: Toko Berkah / PT Maju"
              value={formData.companyOrStoreName}
              onChange={(e) => setFormData({ ...formData, companyOrStoreName: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs text-slate-800 focus:outline-none focus:border-doff-navy bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Jenis Kemitraan</label>
            <select
              value={formData.partnershipType}
              onChange={(e) => setFormData({ ...formData, partnershipType: e.target.value as InquiryFormData['partnershipType'] })}
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs text-slate-800 focus:outline-none focus:border-doff-navy bg-white"
            >
              <option value="reseller">Mitra Reseller Resmi</option>
              <option value="corporate_b2b">Pesanan Korporasi / B2B</option>
              <option value="custom_order">Custom Merchandise / Maklon</option>
              <option value="distributor">Distributor Wilayah</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Catatan / Estimasi Kebutuhan</label>
          <textarea
            rows={3}
            placeholder="Tuliskan produk yang diminati, estimasi kuantitas, atau pertanyaan khusus..."
            value={formData.messageNotes}
            onChange={(e) => setFormData({ ...formData, messageNotes: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs text-slate-800 focus:outline-none focus:border-doff-navy bg-white resize-none"
          />
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-lg bg-doff-navy text-white text-xs font-semibold hover:bg-doff-navydark transition-colors shadow-doff-sm"
        >
          {submitted ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-white" />
              <span>Membuka WhatsApp...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Kirim Pengajuan via WhatsApp</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};
