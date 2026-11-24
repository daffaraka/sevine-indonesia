import React from 'react';

interface AdminDatatablePaginationProps {
  filteredCount: number;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

export const AdminDatatablePagination: React.FC<AdminDatatablePaginationProps> = ({
  filteredCount,
  currentPage,
  pageSize,
  onPageChange,
  onPageSizeChange,
}) => {
  const totalPages = Math.max(1, Math.ceil(filteredCount / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const startItem = filteredCount === 0 ? 0 : (safePage - 1) * pageSize + 1;
  const endItem = Math.min(safePage * pageSize, filteredCount);

  return (
    <div className="p-3.5 bg-white border-t border-doff-border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-doff-muted">
      <div className="flex items-center gap-2">
        <span>
          Menampilkan{' '}
          <strong className="text-doff-navy">
            {startItem} - {endItem}
          </strong>{' '}
          dari <strong className="text-doff-navy">{filteredCount}</strong> produk
        </span>
        <span className="text-doff-border">|</span>
        <div className="flex items-center gap-1.5">
          <span>Per hal:</span>
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="bg-white border border-doff-border rounded px-1.5 py-0.5 text-doff-navy text-xs focus:outline-none focus:border-doff-navy cursor-pointer shadow-sm"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
          </select>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <button
          type="button"
          disabled={safePage <= 1}
          onClick={() => onPageChange(safePage - 1)}
          className="px-2.5 py-1 rounded bg-white border border-doff-border text-doff-slate hover:text-doff-navy disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed shadow-sm"
        >
          Sebelumnya
        </button>
        <span className="px-2.5 py-1 rounded bg-doff-navy text-white font-semibold shadow-sm">
          {safePage} / {totalPages}
        </span>
        <button
          type="button"
          disabled={safePage >= totalPages}
          onClick={() => onPageChange(safePage + 1)}
          className="px-2.5 py-1 rounded bg-white border border-doff-border text-doff-slate hover:text-doff-navy disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed shadow-sm"
        >
          Selanjutnya
        </button>
      </div>
    </div>
  );
};
