import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { ProductSwatch } from '../../types/AdminDashboardTypes';

interface AdminProductSwatchEditorProps {
  swatches: ProductSwatch[];
  images: string[];
  onChangeSwatches: (swatches: ProductSwatch[]) => void;
  onChangeImages: (images: string[]) => void;
}

export const AdminProductSwatchEditor: React.FC<AdminProductSwatchEditorProps> = ({
  swatches,
  images,
  onChangeSwatches,
  onChangeImages,
}) => {
  const [swatchName, setSwatchName] = useState('');
  const [swatchHex, setSwatchHex] = useState('#1B2E4B');
  const [imageUrlInput, setImageUrlInput] = useState('');

  const handleAddSwatch = () => {
    if (!swatchName.trim()) return;
    onChangeSwatches([...swatches, { name: swatchName.trim(), hex: swatchHex }]);
    setSwatchName('');
  };

  const handleAddImageUrl = () => {
    if (!imageUrlInput.trim()) return;
    onChangeImages([...images, imageUrlInput.trim()]);
    setImageUrlInput('');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const urls = Array.from(files).map((file) => URL.createObjectURL(file));
    onChangeImages([...images, ...urls]);
    e.target.value = '';
  };

  return (
    <div className="space-y-4">
      {/* Swatches Section */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold text-doff-navy">
          Variasi Swatch Warna
        </label>
        <div className="flex flex-wrap gap-1.5">
          {swatches.map((sw, idx) => (
            <span
              key={`${sw.hex}-${idx}`}
              className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-doff-subtle border border-doff-border text-[11px] font-mono text-doff-navy"
            >
              <span
                className="w-3 h-3 rounded-full border border-slate-300"
                style={{ backgroundColor: sw.hex }}
              />
              <span>{sw.name}</span>
              <button
                type="button"
                onClick={() => onChangeSwatches(swatches.filter((_, i) => i !== idx))}
                className="text-slate-400 hover:text-red-600 cursor-pointer"
                aria-label={`Hapus warna ${sw.name}`}
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={swatchHex}
            onChange={(e) => setSwatchHex(e.target.value)}
            className="w-8 h-8 rounded border border-doff-border cursor-pointer p-0.5 bg-white"
            aria-label="Pilih kode warna"
          />
          <input
            type="text"
            value={swatchName}
            onChange={(e) => setSwatchName(e.target.value)}
            placeholder="Nama warna (mis. Navy Doff)"
            className="flex-1 px-2.5 py-1.5 text-xs border border-doff-border rounded focus:outline-none focus:border-doff-navy"
          />
          <button
            type="button"
            onClick={handleAddSwatch}
            className="px-2.5 py-1.5 bg-doff-subtle hover:bg-slate-200 text-doff-navy rounded border border-doff-border text-xs font-semibold flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            Tambah
          </button>
        </div>
      </div>

      {/* Multi-foto Section */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold text-doff-navy">
          Galeri Foto Produk (Multi-Foto)
        </label>
        {images.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {images.map((img, idx) => (
              <div
                key={`${img}-${idx}`}
                className="relative w-14 h-14 rounded-lg border border-doff-border bg-doff-subtle overflow-hidden group"
              >
                <img src={img} alt={`Foto ${idx + 1}`} className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => onChangeImages(images.filter((_, i) => i !== idx))}
                  className="absolute top-0.5 right-0.5 p-0.5 bg-white/90 text-red-600 rounded shadow cursor-pointer"
                  aria-label="Hapus foto"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}
        <div className="flex flex-wrap items-center gap-2">
          <input
            type="text"
            value={imageUrlInput}
            onChange={(e) => setImageUrlInput(e.target.value)}
            placeholder="Tempel URL foto produk..."
            className="flex-1 min-w-[180px] px-2.5 py-1.5 text-xs border border-doff-border rounded focus:outline-none focus:border-doff-navy"
          />
          <button
            type="button"
            onClick={handleAddImageUrl}
            className="px-2.5 py-1.5 bg-doff-subtle hover:bg-slate-200 text-doff-navy rounded border border-doff-border text-xs font-semibold cursor-pointer"
          >
            + URL
          </button>
          <label className="px-2.5 py-1.5 bg-white hover:bg-doff-subtle text-doff-navy rounded border border-doff-border text-xs font-semibold cursor-pointer">
            Upload File
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>
    </div>
  );
};
