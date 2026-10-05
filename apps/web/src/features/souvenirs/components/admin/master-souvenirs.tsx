"use client";

import {
  useCreateSouvenir,
  useDeleteSouvenir,
  useForceDeleteSouvenir,
  useRestoreSouvenir,
  useSouvenirCategories,
  useSouvenirFilterState,
  useSouvenirs,
  useUpdateSouvenir,
} from "@/features/souvenirs/hooks/use-souvenirs";
import type { Souvenir } from "@annisa/types";
import { useMemo, useState } from "react";
import { SouvenirDeleteModal } from "./souvenir-delete-modal";
import { SouvenirFilter } from "./souvenir-filter";
import { SouvenirFormModal } from "./souvenir-form-modal";
import { SouvenirHeader } from "./souvenir-header";
import { SouvenirTable, cleanImageUrl } from "./souvenir-table";

export {
  cleanImageUrl,
  SouvenirDeleteModal,
  SouvenirFilter,
  SouvenirFormModal,
  SouvenirHeader,
  SouvenirTable,
};

const ITEMS_PER_PAGE = 8;

export function MasterSouvenirs() {
  const { data: categories } = useSouvenirCategories();
  const createMutation = useCreateSouvenir();
  const updateMutation = useUpdateSouvenir();
  const deleteMutation = useDeleteSouvenir();
  const restoreMutation = useRestoreSouvenir();
  const forceDeleteMutation = useForceDeleteSouvenir();

  // State filter dikelola via hook
  const {
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
  } = useSouvenirFilterState();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Souvenir | null>(null);

  // State produk yang akan dihapus (soft delete / permanent delete)
  const [deletingItem, setDeletingItem] = useState<{
    item: Souvenir;
    isPermanent: boolean;
  } | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);

  // Query produk aktif dan produk sampah secara terpisah sesuai parameter API backend
  const {
    data: activeProducts = [],
    isLoading: isActiveLoading,
    isFetching: isActiveFetching,
    refetch: refetchActive,
  } = useSouvenirs({ status: "active" });

  const {
    data: trashProducts = [],
    isLoading: isTrashLoading,
    isFetching: isTrashFetching,
    refetch: refetchTrash,
  } = useSouvenirs({ status: "trash" });

  const isLoading = activeTab === "active" ? isActiveLoading : isTrashLoading;
  const isFetching = activeTab === "active" ? isActiveFetching : isTrashFetching;
  const refetch = () => {
    refetchActive();
    refetchTrash();
  };

  const handleOpenAdd = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: Souvenir) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (formData: {
    name: string;
    categoryId: string;
    price: number;
    stock: number;
    description: string;
    imageUrl: string;
  }) => {
    if (editingItem) {
      await updateMutation.mutateAsync({
        id: editingItem.id,
        input: formData,
      });
    } else {
      await createMutation.mutateAsync({
        ...formData,
        isAvailable: true,
      });
    }
  };

  // Soft Delete Handler (Buka modal konfirmasi terpusat)
  const handleSoftDelete = (item: Souvenir) => {
    setDeletingItem({ item, isPermanent: false });
  };

  // Restore Handler
  const handleRestore = (item: Souvenir) => {
    restoreMutation.mutate(item.id);
  };

  // Force Delete Handler (Buka modal konfirmasi terpusat)
  const handleForceDelete = (item: Souvenir) => {
    setDeletingItem({ item, isPermanent: true });
  };

  // Eksekusi Konfirmasi Hapus dari Modal
  const handleConfirmDelete = async () => {
    if (!deletingItem) return;
    try {
      if (deletingItem.isPermanent) {
        await forceDeleteMutation.mutateAsync(deletingItem.item.id);
      } else {
        await deleteMutation.mutateAsync({ id: deletingItem.item.id, permanent: false });
      }
    } finally {
      setDeletingItem(null);
    }
  };

  // Filter items berdasarkan tab aktif, pencarian & kategori
  const sourceList = activeTab === "active" ? activeProducts : trashProducts;

  const filteredItems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return sourceList.filter((item) => {
      const matchesSearch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        Boolean(item.description?.toLowerCase().includes(query));
      const matchesCategory =
        !selectedCategory || selectedCategory === "all" || item.category?.slug === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [sourceList, searchQuery, selectedCategory]);

  // Pagination logic
  const totalPages = Math.max(1, Math.ceil(filteredItems.length / ITEMS_PER_PAGE));
  const paginatedItems = useMemo(() => {
    return filteredItems.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
  }, [filteredItems, currentPage]);

  return (
    <div className="w-full space-y-6">
      {/* Header Halaman */}
      <SouvenirHeader
        onRefresh={() => refetch()}
        isRefreshing={isFetching}
        onAddProduct={handleOpenAdd}
      />

      {/* Filter, Tabs, Pencarian & Kategori (Pure Presentation) */}
      <SouvenirFilter
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          setCurrentPage(1);
        }}
        activeCount={activeProducts.length}
        trashCount={trashProducts.length}
        searchQuery={searchQuery}
        onSearchChange={(q) => {
          setSearchQuery(q);
          setCurrentPage(1);
        }}
        selectedCategory={selectedCategory}
        onCategoryChange={(c) => {
          setSelectedCategory(c);
          setCurrentPage(1);
        }}
        categories={categories}
      />

      {/* Tabel Produk */}
      <SouvenirTable
        items={paginatedItems}
        isLoading={isLoading}
        activeTab={activeTab}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        onEdit={handleOpenEdit}
        onSoftDelete={handleSoftDelete}
        onRestore={handleRestore}
        onForceDelete={handleForceDelete}
      />

      {/* Modal Dialog Form Tambah / Edit */}
      <SouvenirFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        editingItem={editingItem}
        categories={categories}
        onSubmit={handleFormSubmit}
      />

      {/* Modal Dialog Konfirmasi Hapus Terpusat */}
      <SouvenirDeleteModal
        isOpen={Boolean(deletingItem)}
        onClose={() => setDeletingItem(null)}
        product={deletingItem?.item || null}
        isPermanent={deletingItem?.isPermanent || false}
        isDeleting={deleteMutation.isPending || forceDeleteMutation.isPending}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
