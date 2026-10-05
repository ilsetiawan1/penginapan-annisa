"use client";

import {
  useArticleCategories,
  useArticles,
  useCreateArticle,
  useDeleteArticle,
  useForceDeleteArticle,
  useRestoreArticle,
  useScrapeArticle,
  useUpdateArticle,
} from "@/features/articles/hooks/use-articles";
import type { Article } from "@annisa/types";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { ArticleDeleteModal } from "./article-delete-modal";
import { ArticleFilter } from "./article-filter";
import { ArticleFormModal } from "./article-form-modal";
import { ArticleHeader } from "./article-header";
import { ArticleTable } from "./article-table";

export { ArticleDeleteModal, ArticleFilter, ArticleFormModal, ArticleHeader, ArticleTable };

const ITEMS_PER_PAGE = 8;

export function MasterArticles() {
  const { data: categories = [] } = useArticleCategories();
  const createMutation = useCreateArticle();
  const updateMutation = useUpdateArticle();
  const deleteMutation = useDeleteArticle();
  const restoreMutation = useRestoreArticle();
  const forceDeleteMutation = useForceDeleteArticle();
  const scrapeMutation = useScrapeArticle();

  // Tab State
  const [activeTab, setActiveTab] = useState<"active" | "trash">("active");

  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Modal States
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Article | null>(null);
  const [deletingItem, setDeletingItem] = useState<{
    item: Article;
    isPermanent: boolean;
  } | null>(null);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);

  // Query artikel aktif dan sampah secara terpisah
  const {
    data: activeArticles = [],
    isLoading: isActiveLoading,
    isFetching: isActiveFetching,
    refetch: refetchActive,
  } = useArticles({ status: "active" });

  const {
    data: trashArticles = [],
    isLoading: isTrashLoading,
    isFetching: isTrashFetching,
    refetch: refetchTrash,
  } = useArticles({ status: "trash" });

  const isLoading = activeTab === "active" ? isActiveLoading : isTrashLoading;
  const isFetching = activeTab === "active" ? isActiveFetching : isTrashFetching;
  const refetch = () => {
    refetchActive();
    refetchTrash();
  };

  // Buka Form Tambah
  const handleOpenAdd = () => {
    setEditingItem(null);
    setIsFormModalOpen(true);
  };

  // Buka Form Edit
  const handleOpenEdit = (item: Article) => {
    setEditingItem(item);
    setIsFormModalOpen(true);
  };

  // Submit Form Tambah / Edit
  const handleFormSubmit = async (formData: {
    title: string;
    categoryId: string;
    summary: string;
    content: string;
    coverImage: string;
  }) => {
    if (editingItem) {
      await updateMutation.mutateAsync({
        id: editingItem.id,
        input: {
          ...formData,
          isPublished: true,
        },
      });
    } else {
      await createMutation.mutateAsync({
        ...formData,
        isPublished: true,
      });
    }
  };

  // Handle Scraper
  const handleScrape = async (url: string) => {
    const data = await scrapeMutation.mutateAsync(url);
    return data;
  };

  // Soft Delete Handler (Buka modal konfirmasi terpusat)
  const handleSoftDelete = (item: Article) => {
    setDeletingItem({ item, isPermanent: false });
  };

  // Force Delete Handler (Buka modal konfirmasi terpusat)
  const handleForceDelete = (item: Article) => {
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

  // Restore Handler
  const handleRestore = async (item: Article) => {
    await restoreMutation.mutateAsync(item.id);
  };

  // Filter items berdasarkan tab aktif, pencarian & kategori
  const sourceList = activeTab === "active" ? activeArticles : trashArticles;

  const filteredArticles = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return sourceList.filter((item) => {
      const matchesSearch =
        !query ||
        item.title.toLowerCase().includes(query) ||
        Boolean(item.summary?.toLowerCase().includes(query));
      const matchesCategory =
        !selectedCategory || selectedCategory === "all" || item.categoryId === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [sourceList, searchQuery, selectedCategory]);

  // Pagination logic
  const totalPages = Math.max(1, Math.ceil(filteredArticles.length / ITEMS_PER_PAGE));
  const paginatedArticles = useMemo(() => {
    return filteredArticles.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
  }, [filteredArticles, currentPage]);

  return (
    <div className="w-full space-y-6">
      {/* Header Halaman */}
      <ArticleHeader onRefresh={refetch} isRefreshing={isFetching} onAddArticle={handleOpenAdd} />

      {/* Filter, Tabs, Pencarian & Kategori */}
      <ArticleFilter
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          setCurrentPage(1);
        }}
        activeCount={activeArticles.length}
        trashCount={trashArticles.length}
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

      {/* Tabel Artikel */}
      <ArticleTable
        articles={paginatedArticles}
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
      <ArticleFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSubmit={handleFormSubmit}
        categories={categories}
        initialData={editingItem}
        onScrape={handleScrape}
        isScraping={scrapeMutation.isPending}
      />

      {/* Modal Dialog Konfirmasi Hapus Terpusat */}
      <ArticleDeleteModal
        isOpen={Boolean(deletingItem)}
        onClose={() => setDeletingItem(null)}
        article={deletingItem?.item || null}
        isPermanent={deletingItem?.isPermanent}
        isDeleting={deleteMutation.isPending || forceDeleteMutation.isPending}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
