import React, { useState } from "react";
import { InquiryFormData } from '../../types/CompanyProfileTypes';
import { CompanyProfileService } from '../../services/CompanyProfileService';

interface EditorialInquiryFormProps {
  id?: string;
}

export const EditorialInquiryForm: React.FC<EditorialInquiryFormProps> = ({
  id = "editorial-inquiry-form",
}) => {
  const [formData, setFormData] = useState<InquiryFormData>({
    fullName: "",
    companyOrStoreName: "",
    whatsappNumber: "",
    partnershipType: "reseller",
    preferredBrand: "Semua Brand",
    messageNotes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.whatsappNumber.trim()) return;
    const whatsappUrl =
      CompanyProfileService.generateWhatsAppInquiryUrl(formData);
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <form
      id={id}
      onSubmit={handleSubmit}
      className="bg-[#1B2E4B] border border-white/10 rounded-2xl p-7 sm:p-10 space-y-7 shadow-md text-white"
    >
      <div className="space-y-2 pb-4 border-b border-white/10">
        <span className="font-mono text-[10px] tracking-[0.26em] uppercase text-[#C27B66] block">
          FORMULIR KEMITRAAN &amp; ORDER KHUSUS
        </span>
        <h3 className="font-serif text-2xl sm:text-3xl text-white">
          Jadwalkan Konsultasi Produksi
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-1.5">
          <label
            htmlFor={`${id}-fullname`}
            className="block font-mono text-[10px] tracking-[0.2em] uppercase text-[#94A3B8]"
          >
            01 / Nama Lengkap *
          </label>
          <input
            id={`${id}-fullname`}
            type="text"
            required
            value={formData.fullName}
            onChange={(e) =>
              setFormData({ ...formData, fullName: e.target.value })
            }
            placeholder="Nama perwakilan atau pemilik"
            className="w-full py-2.5 bg-transparent border-b border-white/20 text-xs sm:text-sm text-white placeholder:text-slate-400 focus:outline-none focus:border-[#C27B66]"
          />
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor={`${id}-company`}
            className="block font-mono text-[10px] tracking-[0.2em] uppercase text-[#94A3B8]"
          >
            02 / Instansi / Nama Toko
          </label>
          <input
            id={`${id}-company`}
            type="text"
            value={formData.companyOrStoreName}
            onChange={(e) =>
              setFormData({ ...formData, companyOrStoreName: e.target.value })
            }
            placeholder="PT / CV / Nama Store"
            className="w-full py-2.5 bg-transparent border-b border-white/20 text-xs sm:text-sm text-white placeholder:text-slate-400 focus:outline-none focus:border-[#C27B66]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="space-y-1.5">
          <label
            htmlFor={`${id}-whatsapp`}
            className="block font-mono text-[10px] tracking-[0.2em] uppercase text-[#94A3B8]"
          >
            03 / Nomor WhatsApp *
          </label>
          <input
            id={`${id}-whatsapp`}
            type="tel"
            required
            value={formData.whatsappNumber}
            onChange={(e) =>
              setFormData({ ...formData, whatsappNumber: e.target.value })
            }
            placeholder="0812xxxxxxxx"
            className="w-full py-2.5 bg-transparent border-b border-white/20 text-xs sm:text-sm text-white placeholder:text-slate-400 focus:outline-none focus:border-[#C27B66]"
          />
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor={`${id}-partnership`}
            className="block font-mono text-[10px] tracking-[0.2em] uppercase text-[#94A3B8]"
          >
            04 / Kategori Kerjasama
          </label>
          <select
            id={`${id}-partnership`}
            value={formData.partnershipType}
            onChange={(e) =>
              setFormData({
                ...formData,
                partnershipType: e.target
                  .value as InquiryFormData["partnershipType"],
              })
            }
            className="w-full py-2.5 bg-transparent border-b border-white/20 text-xs sm:text-sm text-white focus:outline-none focus:border-[#C27B66]"
          >
            <option value="reseller" className="bg-[#1B2E4B] text-white">
              Reseller Resmi
            </option>
            <option value="corporate_b2b" className="bg-[#1B2E4B] text-white">
              Pesanan Korporasi / B2B
            </option>
            <option value="custom_order" className="bg-[#1B2E4B] text-white">
              Custom Merchandise
            </option>
            <option value="distributor" className="bg-[#1B2E4B] text-white">
              Distributor Wilayah
            </option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor={`${id}-brand`}
            className="block font-mono text-[10px] tracking-[0.2em] uppercase text-[#94A3B8]"
          >
            05 / Fokus Lini Brand
          </label>
          <select
            id={`${id}-brand`}
            value={formData.preferredBrand}
            onChange={(e) =>
              setFormData({ ...formData, preferredBrand: e.target.value })
            }
            className="w-full py-2.5 bg-transparent border-b border-white/20 text-xs sm:text-sm text-white focus:outline-none focus:border-[#C27B66]"
          >
            <option value="Semua Brand" className="bg-[#1B2E4B] text-white">
              Semua 5 Lini Brand
            </option>
            <option value="SEVINE (Bags)" className="bg-[#1B2E4B] text-white">
              SEVINE (Tas Fungsional)
            </option>
            <option
              value="klou (Basic Apparel)"
              className="bg-[#1B2E4B] text-white"
            >
              klou (Basic Apparel)
            </option>
            <option
              value="LALUNA (Tas Elegan)"
              className="bg-[#1B2E4B] text-white"
            >
              LALUNA (Tas Elegan)
            </option>
            <option
              value="ASSAIF (Busana Pria)"
              className="bg-[#1B2E4B] text-white"
            >
              ASSAIF (Busana Muslim Pria)
            </option>
            <option
              value="NABIRA (Busana Wanita)"
              className="bg-[#1B2E4B] text-white"
            >
              NABIRA (Busana Muslim Wanita)
            </option>
          </select>
        </div>
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor={`${id}-notes`}
          className="block font-mono text-[10px] tracking-[0.2em] uppercase text-[#94A3B8]"
        >
          06 / Catatan Kebutuhan / Volume Estimasi
        </label>
        <textarea
          id={`${id}-notes`}
          rows={3}
          value={formData.messageNotes}
          onChange={(e) =>
            setFormData({ ...formData, messageNotes: e.target.value })
          }
          placeholder="Misal: Kebutuhan seragam tas 500 pcs untuk kantor, atau pendaftaran reseller area Surabaya..."
          className="w-full py-2.5 bg-transparent border-b border-white/20 text-xs sm:text-sm text-white placeholder:text-slate-400 focus:outline-none focus:border-[#C27B66] resize-none"
        />
      </div>

      <div className="pt-2">
        <button
          type="submit"
          className="w-full py-3.5 rounded-xl bg-[#C27B66] text-white text-xs font-mono uppercase tracking-[0.2em] font-semibold hover:bg-[#A86452] transition-colors shadow-md flex items-center justify-center gap-3"
        >
          <span>Kirim Pengajuan via WhatsApp Resmi</span>
          <span>→</span>
        </button>
      </div>
    </form>
  );
};
