import { useEffect, useMemo, useState } from 'react';
import { AdminProductItem, BrandCategory } from '../../types/AdminDashboardTypes';

export function useAdminProductTable(products: AdminProductItem[], externalSearch: string) {
  const [currentBrand, setCurrentBrand] = useState<BrandCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>(externalSearch);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [sortField, setSortField] = useState<'sku' | 'name' | 'capacity'>('sku');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);

  useEffect(() => {
    setSearchQuery(externalSearch);
    setCurrentPage(1);
  }, [externalSearch]);

  const filteredProducts = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return products
      .filter((p) => {
        const matchBrand = currentBrand === 'all' || p.brand === currentBrand;
        const matchSearch =
          p.name.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q);
        const matchCategory = selectedCategory === 'all' || p.category === selectedCategory;
        const matchStatus = selectedStatus === 'all' || p.status === selectedStatus;
        return matchBrand && matchSearch && matchCategory && matchStatus;
      })
      .sort((a, b) => {
        const comp = a[sortField].localeCompare(b[sortField]);
        return sortOrder === 'asc' ? comp : -comp;
      });
  }, [products, currentBrand, searchQuery, selectedCategory, selectedStatus, sortField, sortOrder]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);

  const paginatedProducts = useMemo(() => {
    const start = (safePage - 1) * pageSize;
    return filteredProducts.slice(start, start + pageSize);
  }, [filteredProducts, safePage, pageSize]);

  const handleSort = (field: 'sku' | 'name' | 'capacity') => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
      return;
    }
    setSortField(field);
    setSortOrder('asc');
  };

  const handleToggleSelect = (id: number, checked: boolean) => {
    const next = new Set(selectedIds);
    if (checked) next.add(id);
    else next.delete(id);
    setSelectedIds(next);
  };

  const handleToggleSelectAll = (checked: boolean) => {
    setSelectedIds(checked ? new Set(paginatedProducts.map((p) => p.id)) : new Set());
  };

  return {
    currentBrand,
    searchQuery,
    selectedCategory,
    selectedStatus,
    sortField,
    sortOrder,
    selectedIds,
    safePage,
    pageSize,
    filteredProducts,
    paginatedProducts,
    setCurrentBrand: (b: BrandCategory | 'all') => {
      setCurrentBrand(b);
      setCurrentPage(1);
    },
    setSearchQuery: (q: string) => {
      setSearchQuery(q);
      setCurrentPage(1);
    },
    setSelectedCategory: (c: string) => {
      setSelectedCategory(c);
      setCurrentPage(1);
    },
    setSelectedStatus: (s: string) => {
      setSelectedStatus(s);
      setCurrentPage(1);
    },
    setCurrentPage,
    setPageSize: (size: number) => {
      setPageSize(size);
      setCurrentPage(1);
    },
    setSelectedIds,
    handleSort,
    handleToggleSelect,
    handleToggleSelectAll,
  };
}
