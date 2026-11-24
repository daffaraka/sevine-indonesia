import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';

interface AdminEventGalleryInputProps {
  images: string[];
  onChangeImages: (next: string[]) => void;
}

export const AdminEventGalleryInput: React.FC<AdminEventGalleryInputProps> = ({
  images,
  onChangeImages,
}) => {
  const [photoInput, setPhotoInput] = useState('');

  const handleAddPhotoUrl = () => {
    if (!photoInput.trim()) return;
    onChangeImages([...images, photoInput.trim()]);
    setPhotoInput('');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const urls = Array.from(files).map((file) => URL.createObjectURL(file));
    onChangeImages([...images, ...urls]);
    e.target.value = '';
  };

  return (
    <div className="space-y-2">
      <label className="block font-semibold text-doff-navy">
        Foto Galeri Event ({images.length} foto)
      </label>
      {images.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {images.map((img, idx) => (
            <div
              key={`${img}-${idx}`}
              className="relative w-16 h-14 rounded-lg border border-doff-border overflow-hidden bg-slate-100"
            >
              <img src={img} alt={`Event ${idx + 1}`} className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => onChangeImages(images.filter((_, i) => i !== idx))}
                className="absolute top-0.5 right-0.5 p-0.5 bg-white/90 text-red-600 rounded shadow cursor-pointer"
                aria-label="Hapus foto event"
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
          value={photoInput}
          onChange={(e) => setPhotoInput(e.target.value)}
          placeholder="Tempel URL foto..."
          className="flex-1 min-w-[180px] px-2.5 py-1.5 border border-doff-border rounded focus:outline-none focus:border-doff-navy"
        />
        <button
          type="button"
          onClick={handleAddPhotoUrl}
          className="px-2.5 py-1.5 bg-doff-subtle hover:bg-slate-200 text-doff-navy rounded border border-doff-border font-semibold cursor-pointer"
        >
          + URL
        </button>
        <label className="px-2.5 py-1.5 bg-white hover:bg-doff-subtle text-doff-navy rounded border border-doff-border font-semibold cursor-pointer">
          Upload Banyak Foto
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
  );
};
