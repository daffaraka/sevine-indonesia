import React from 'react';
import { TestimonialCardItem } from './TestimonialCardItem';
import { CompanyProfileService } from '../services/CompanyProfileService';

export const CustomerTestimonialSlider: React.FC = () => {
  const testimonials = CompanyProfileService.getTestimonials();

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-[#F8F9FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header Seksi */}
        <div className="max-w-2xl space-y-3">
          <div className="text-xs font-bold text-doff-terracotta uppercase tracking-wider">
            Suara Kepuasan Pelanggan
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-doff-navy tracking-tight">
            Testimoni & Pengalaman Nyata
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed font-normal">
            Apresiasi autentik dari para pengguna produk Sevine terhadap kenyamanan desain, kapasitas tas, dan ketahanan material tahan air.
          </p>
        </div>

        {/* Grid 4 Testimoni */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testi) => (
            <TestimonialCardItem key={testi.id} item={testi} />
          ))}
        </div>
      </div>
    </section>
  );
};
