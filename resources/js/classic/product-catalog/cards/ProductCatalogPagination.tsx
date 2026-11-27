import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CatalogPageSizeOption } from '../hooks/useProductCatalogFilter';

interface ProductCatalogPaginationProps {
  totalItems: number;
  rangeStart: number;
  rangeEnd: number;
  currentPage: number;
  totalPages: number;
  pageSize: CatalogPageSizeOption;
  remainingCount: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: CatalogPageSizeOption) => void;
  onLoadMore: () => void;
}

const PAGE_SIZE_CHOICES: Array<{ value: CatalogPageSizeOption; label: string }> = [
  { value: 8, label: '8' },
  { value: 12, label: '12' },
  { value: 24, label: '24' },
  { value: 0, label: 'Semua' },
];

const buildPageNumbers = (current: number, total: number): Array<number | 'ellipsis'> => {
  if (total <= 5) return Array.from({ length: total }, (_, idx) => idx + 1);
  if (current <= 3) return [1, 2, 3, 4, 'ellipsis', total];
  if (current >= total - 2) return [1, 'ellipsis', total - 3, total - 2, total - 1, total];
  return [1, 'ellipsis', current - 1, current, current + 1, 'ellipsis', total];
};

export const ProductCatalogPagination: React.FC<ProductCatalogPaginationProps> = ({
  totalItems,
  rangeStart,
  rangeEnd,
  currentPage,
  totalPages,
  pageSize,
  remainingCount,
  onPageChange,
  onPageSizeChange,
  onLoadMore,
}) => {
  if (totalItems === 0) return null;
  const pageNumbers = buildPageNumbers(currentPage, totalPages);
  const nextBatchCount = pageSize === 0 ? 0 : Math.min(pageSize, remainingCount);

  return (
    <div className="pt-4 space-y-4">
      {remainingCount > 0 && (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={onLoadMore}
            className="w-full sm:w-auto min-h-[44px] px-6 py-2.5 rounded-lg bg-white hover:bg-doff-navy text-doff-navy hover:text-white border border-slate-300 text-xs font-bold shadow-doff-sm transition-colors cursor-pointer"
          >
            Muat {nextBatchCount} Produk Lainnya ({remainingCount} tersisa)
          </button>
        </div>
      )}

      <div className="bg-white rounded-lg border border-slate-200/90 px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-doff-sm">
        <div className="text-xs text-slate-600">
          Menampilkan <strong className="text-doff-navy font-mono">{rangeStart}–{rangeEnd}</strong> dari{' '}
          <strong className="text-doff-navy font-mono">{totalItems}</strong> produk
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <div className="inline-flex items-center gap-1.5 text-xs text-slate-500">
            <span>Tampilkan:</span>
            <div className="inline-flex rounded-md border border-slate-200 bg-slate-50 p-0.5">
              {PAGE_SIZE_CHOICES.map((opt) => (
                <button
                  key={opt.label}
                  type="button"
                  onClick={() => onPageSizeChange(opt.value)}
                  className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-colors ${
                    pageSize === opt.value
                      ? 'bg-doff-navy text-white'
                      : 'text-slate-600 hover:text-doff-navy'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {totalPages > 1 && (
            <nav aria-label="Paginasi katalog" className="inline-flex items-center gap-1">
              <button
                type="button"
                disabled={currentPage <= 1}
                onClick={() => onPageChange(currentPage - 1)}
                aria-label="Halaman sebelumnya"
                className="min-w-[36px] min-h-[36px] inline-flex items-center justify-center rounded-md border border-slate-200 text-doff-navy hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {pageNumbers.map((item, idx) =>
                item === 'ellipsis' ? (
                  <span key={`el-${idx}`} className="px-1.5 text-xs text-slate-400">
                    &hellip;
                  </span>
                ) : (
                  <button
                    key={item}
                    type="button"
                    onClick={() => onPageChange(item)}
                    aria-current={item === currentPage ? 'page' : undefined}
                    className={`min-w-[36px] min-h-[36px] px-2 rounded-md text-xs font-mono font-bold transition-colors ${
                      item === currentPage
                        ? 'bg-doff-navy text-white border border-doff-navy'
                        : 'bg-white text-slate-600 border border-slate-200 hover:border-doff-navy hover:text-doff-navy'
                    }`}
                  >
                    {item}
                  </button>
                ),
              )}

              <button
                type="button"
                disabled={currentPage >= totalPages}
                onClick={() => onPageChange(currentPage + 1)}
                aria-label="Halaman berikutnya"
                className="min-w-[36px] min-h-[36px] inline-flex items-center justify-center rounded-md border border-slate-200 text-doff-navy hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </nav>
          )}
        </div>
      </div>
    </div>
  );
};
