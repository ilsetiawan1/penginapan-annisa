"use client";

import { Button } from "@/components/ui/button";
import { CreateButton } from "@/components/ui/create-button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ImageUpload, uploadBase64ToR2 } from "@/components/ui/image-upload";
import {
  useCreateSouvenir,
  useDeleteSouvenir,
  useForceDeleteSouvenir,
  useRestoreSouvenir,
  useSouvenirCategories,
  useSouvenirs,
  useUpdateSouvenir,
} from "@/features/souvenirs/hooks/use-souvenirs";
import type { Souvenir } from "@annisa/types";
import {
  AlertTriangle,
  ArchiveRestore,
  Edit2,
  Package,
  Plus,
  RotateCcw,
  RotateCw,
  Search,
  Tag,
  Trash2,
  X,
} from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { toast } from "sonner";

export function MasterSouvenirs() {
  const { data: allProducts, isLoading, refetch } = useSouvenirs();
  const { data: categories } = useSouvenirCategories();
  const createMutation = useCreateSouvenir();
  const updateMutation = useUpdateSouvenir();
  const deleteMutation = useDeleteSouvenir();
  const restoreMutation = useRestoreSouvenir();
  const forceDeleteMutation = useForceDeleteSouvenir();

  // Tab State: 'active' vs 'trash'
  const [activeTab, setActiveTab] = useState<"active" | "trash">("active");

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingItem, setEditingItem] = useState<Souvenir | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Form states
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [price, setPrice] = useState<number>(50000);
  const [stock, setStock] = useState<number>(20);
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  // Pisahkan produk aktif vs sampah (soft-deleted)
  const activeProducts = useMemo(() => {
    return (allProducts || []).filter((item) => !item.deletedAt);
  }, [allProducts]);

  const trashProducts = useMemo(() => {
    return (allProducts || []).filter((item) => !!item.deletedAt);
  }, [allProducts]);

  // Hitung sisa hari retensi 30 hari untuk item sampah
  const getRemainingDays = (deletedAtStr: string | Date | null | undefined): number => {
    if (!deletedAtStr) return 30;
    const deletedDate = new Date(deletedAtStr);
    const thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000;
    const expiryDate = new Date(deletedDate.getTime() + thirtyDaysInMs);
    const remainingMs = expiryDate.getTime() - Date.now();
    return Math.max(0, Math.ceil(remainingMs / (1000 * 60 * 60 * 24)));
  };

  const handleOpenAdd = () => {
    setEditingItem(null);
    setName("");
    setCategoryId(categories?.[0]?.id || "");
    setPrice(50000);
    setStock(20);
    setDescription("");
    setImageUrl("");
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: Souvenir) => {
    setEditingItem(item);
    setName(item.name);
    setCategoryId(item.categoryId);
    setPrice(item.price);
    setStock(item.stock);
    setDescription(item.description || "");
    setImageUrl(item.imageUrl || "");
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Nama produk wajib diisi.");
      return;
    }
    if (!categoryId) {
      toast.error("Kategori wajib dipilih.");
      return;
    }

    try {
      setIsSubmitting(true);
      let finalImageUrl = imageUrl;

      // Jika URL adalah DataURL (Base64), upload ke R2
      if (finalImageUrl.startsWith("data:")) {
        toast.loading("Mengunggah foto ke Cloudflare R2...", { id: "upload-toast" });
        try {
          const generateSlug = (text: string) =>
            text
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/(^-|-$)/g, "");
          const slugPrefix = generateSlug(name);

          finalImageUrl = await uploadBase64ToR2(
            finalImageUrl,
            `souvenir-${Date.now()}.jpg`,
            "/souvenirs",
            slugPrefix,
          );
          toast.success("Foto berhasil diunggah!", { id: "upload-toast" });
        } catch (error: any) {
          toast.error(error.message || "Gagal mengunggah foto.", { id: "upload-toast" });
          setIsSubmitting(false);
          return;
        }
      }

      if (editingItem) {
        await updateMutation.mutateAsync({
          id: editingItem.id,
          input: {
            name,
            categoryId,
            price,
            stock,
            description,
            imageUrl: finalImageUrl,
          },
        });
      } else {
        await createMutation.mutateAsync({
          name,
          categoryId,
          price,
          stock,
          isAvailable: true,
          description,
          imageUrl: finalImageUrl,
        });
      }

      setIsModalOpen(false);
    } catch {
      // Error handled by mutation toast
    } finally {
      setIsSubmitting(false);
    }
  };

  // Soft Delete Handler
  const handleSoftDelete = (item: Souvenir) => {
    toast(`Pindahkan '${item.name}' ke Sampah?`, {
      description: "Data akan disimpan di sampah selama 30 hari sebelum dihapus permanen.",
      action: {
        label: "Hapus ke Sampah",
        onClick: () => deleteMutation.mutate({ id: item.id, permanent: false }),
      },
    });
  };

  // Restore Handler
  const handleRestore = (item: Souvenir) => {
    restoreMutation.mutate(item.id);
  };

  // Force Delete Handler
  const handleForceDelete = (item: Souvenir) => {
    toast(`Hapus permanen '${item.name}'?`, {
      description: "Data akan dihapus selamanya dari database dan tidak dapat dipulihkan.",
      action: {
        label: "Hapus Permanen",
        onClick: () => forceDeleteMutation.mutate(item.id),
      },
    });
  };

  // Filter items berdasarkan tab aktif, pencarian & kategori
  const sourceList = activeTab === "active" ? activeProducts : trashProducts;

  const filteredItems = sourceList.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory =
      selectedCategory === "all" || item.category?.slug === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header Halaman Master Oleh-Oleh */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 sm:p-6 rounded-3xl border border-slate-200 shadow-2xs">
        <div>
          <span className="bg-purple-100 text-purple-800 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            Master Data Etalase &amp; POS
          </span>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight mt-1">
            Kelola Produk Oleh-Oleh Khas Maluku
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Format tabel terstruktur untuk memantau stok fisik POS kasir, harga, foto, dan kebijakan retensi sampah 30 hari.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            className="rounded-xl border-slate-200 text-slate-600 hover:text-purple-700 h-9 gap-1.5"
          >
            <RotateCw className="w-4 h-4" />
            <span className="text-xs font-bold hidden sm:inline">Refresh</span>
          </Button>

          <CreateButton onClick={handleOpenAdd}>
            Tambah Produk
          </CreateButton>
        </div>
      </div>

      {/* Tab Switcher: Semua Aktif vs Sampah 30 Hari */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          type="button"
          onClick={() => {
            setActiveTab("active");
            setCurrentPage(1);
          }}
          className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === "active"
              ? "bg-purple-700 text-white shadow-2xs"
              : "bg-white text-slate-600 hover:bg-purple-50 border border-slate-200"
          }`}
        >
          <Package className="w-3.5 h-3.5" />
          <span>Produk Aktif</span>
          <span
            className={`text-[10px] font-black px-1.5 py-0.5 rounded-full ${
              activeTab === "active" ? "bg-white/25 text-white" : "bg-purple-100 text-purple-800"
            }`}
          >
            {activeProducts.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveTab("trash");
            setCurrentPage(1);
          }}
          className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === "trash"
              ? "bg-rose-600 text-white shadow-2xs"
              : "bg-white text-slate-600 hover:bg-rose-50 border border-slate-200"
          }`}
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Sampah / Terhapus</span>
          <span
            className={`text-[10px] font-black px-1.5 py-0.5 rounded-full ${
              activeTab === "trash" ? "bg-white/25 text-white" : "bg-rose-100 text-rose-800"
            }`}
          >
            {trashProducts.length}
          </span>
        </button>
      </div>

      {/* Banner Khusus Tab Sampah */}
      {activeTab === "trash" && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3.5 text-xs text-amber-900 flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <strong className="font-black block">Kebijakan Soft Delete Retensi 30 Hari</strong>
            <p className="text-[11px] text-amber-800 mt-0.5 leading-relaxed">
              Produk di bawah ini dapat dipulihkan kembali ke katalog aktif dalam waktu 30 hari sejak dihapus.
              Setelah melewati 30 hari, sistem akan menghapus data ini secara permanen dari database.
            </p>
          </div>
        </div>
      )}

      {/* Bar Pencarian & Filter Kategori */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="w-full sm:w-80 bg-white rounded-2xl p-2.5 border border-slate-200 shadow-2xs flex items-center gap-2">
          <Search className="w-4 h-4 text-purple-700 shrink-0 ml-1" />
          <input
            type="text"
            placeholder="Cari nama atau deskripsi produk..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent text-xs font-bold text-slate-800 outline-none placeholder:text-slate-400"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="text-xs text-slate-400 hover:text-slate-700 pr-1 font-bold"
            >
              Reset
            </button>
          )}
        </div>

        {/* Filter Kategori Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full sm:w-auto py-1">
          <button
            type="button"
            onClick={() => setSelectedCategory("all")}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              selectedCategory === "all"
                ? "bg-purple-700 text-white font-black shadow-2xs"
                : "bg-white text-slate-600 hover:bg-purple-50 border border-slate-200"
            }`}
          >
            Semua Kategori
          </button>
          {categories?.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.slug)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === cat.slug
                  ? "bg-purple-700 text-white font-black shadow-2xs"
                  : "bg-white text-slate-600 hover:bg-purple-50 border border-slate-200"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* ====================================================
          TABEL PRODUK OLEH-OLEH (SESUAI REQUEST FORMAT TABEL)
          ==================================================== */}
      {isLoading ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-2">
          <div className="w-7 h-7 border-2 border-purple-700 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-bold text-slate-600">Memuat data produk oleh-oleh...</p>
        </div>
      ) : paginatedItems.length === 0 ? (
        <div className="bg-white rounded-3xl p-10 text-center border border-dashed border-purple-200 space-y-2">
          <Package className="w-10 h-10 text-purple-300 mx-auto" />
          <h3 className="text-sm font-black text-slate-800">
            {activeTab === "active" ? "Tidak ada produk aktif" : "Kotak sampah kosong"}
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {activeTab === "active"
              ? "Belum ada produk oleh-oleh yang terdaftar di database."
              : "Tidak ada produk yang sedang dalam masa retensi 30 hari."}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-black text-[11px] uppercase tracking-wider">
                  <th className="px-5 py-3.5 w-16 text-center">Foto</th>
                  <th className="px-5 py-3.5 min-w-[200px]">Produk &amp; Deskripsi</th>
                  <th className="px-5 py-3.5">Kategori</th>
                  <th className="px-5 py-3.5">Harga</th>
                  <th className="px-5 py-3.5 text-center">Stok POS</th>
                  {activeTab === "trash" && <th className="px-5 py-3.5">Sisa Waktu Retensi</th>}
                  <th className="px-5 py-3.5 text-right w-28">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {paginatedItems.map((item) => {
                  const remainingDays = getRemainingDays(item.deletedAt);

                  return (
                    <tr
                      key={item.id}
                      className="hover:bg-purple-50/30 transition-colors group"
                    >
                      {/* Thumbnail Foto */}
                      <td className="px-5 py-3.5 text-center">
                        <div className="w-11 h-11 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden relative mx-auto flex items-center justify-center">
                          {item.imageUrl ? (
                            <Image
                              src={item.imageUrl}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <Package className="w-5 h-5 text-slate-400" />
                          )}
                        </div>
                      </td>

                      {/* Nama Produk & Deskripsi */}
                      <td className="px-5 py-3.5">
                        <strong className="font-extrabold text-slate-900 block leading-tight text-xs sm:text-sm">
                          {item.name}
                        </strong>
                        <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                          {item.description || "Tidak ada deskripsi"}
                        </p>
                      </td>

                      {/* Kategori Badge */}
                      <td className="px-5 py-3.5 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-100">
                          {item.category?.name || "Kategori"}
                        </span>
                      </td>

                      {/* Harga Produk */}
                      <td className="px-5 py-3.5 whitespace-nowrap font-black text-slate-900 text-xs">
                        Rp {item.price.toLocaleString("id-ID")}
                      </td>

                      {/* Stok Fisik POS Kasir */}
                      <td className="px-5 py-3.5 text-center whitespace-nowrap">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black ${
                            item.stock > 10
                              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                              : item.stock > 0
                                ? "bg-amber-50 text-amber-800 border border-amber-200"
                                : "bg-rose-50 text-rose-800 border border-rose-200"
                          }`}
                        >
                          {item.stock} pcs
                        </span>
                      </td>

                      {/* Sisa Waktu Retensi (Hanya di Tab Sampah) */}
                      {activeTab === "trash" && (
                        <td className="px-5 py-3.5 whitespace-nowrap">
                          <div className="space-y-0.5">
                            <span className="inline-flex items-center gap-1 text-[10px] font-black px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 border border-rose-200">
                              <AlertTriangle className="w-3 h-3" />
                              <span>{remainingDays} hari tersisa</span>
                            </span>
                            <p className="text-[9px] text-slate-400">
                              Dihapus: {new Date(item.deletedAt!).toLocaleDateString("id-ID")}
                            </p>
                          </div>
                        </td>
                      )}

                      {/* Tombol Aksi */}
                      <td className="px-5 py-3.5 text-right whitespace-nowrap">
                        {activeTab === "active" ? (
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              type="button"
                              onClick={() => handleOpenEdit(item)}
                              title="Edit Produk"
                              className="p-1.5 rounded-xl border border-slate-200 hover:border-purple-300 bg-white hover:bg-purple-50 text-slate-600 hover:text-purple-700 transition cursor-pointer"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleSoftDelete(item)}
                              title="Pindahkan ke Sampah"
                              className="p-1.5 rounded-xl border border-slate-200 hover:border-rose-300 bg-white hover:bg-rose-50 text-slate-600 hover:text-rose-600 transition cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              type="button"
                              onClick={() => handleRestore(item)}
                              title="Pulihkan Produk ke Aktif"
                              className="px-2.5 py-1 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-[10px] flex items-center gap-1 transition cursor-pointer shadow-2xs"
                            >
                              <RotateCcw className="w-3 h-3" />
                              <span>Pulihkan</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => handleForceDelete(item)}
                              title="Hapus Permanen"
                              className="p-1 rounded-xl border border-rose-200 hover:bg-rose-100 text-rose-600 transition cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-5 py-3.5 border-t border-slate-100 bg-slate-50/50">
              <span className="text-xs text-slate-500 font-medium">
                Halaman <span className="font-bold text-slate-800">{currentPage}</span> dari{" "}
                <span className="font-bold text-slate-800">{totalPages}</span>
              </span>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 text-xs font-semibold rounded-lg bg-white"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  Sebelumnya
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 text-xs font-semibold rounded-lg bg-white"
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  Selanjutnya
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Modal Dialog Form Tambah / Edit Produk */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto p-0 bg-white border-0 rounded-2xl shadow-xl">
          <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white/90 backdrop-blur-md z-10">
            <div>
              <span className="bg-purple-100 text-purple-800 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                {editingItem ? "Edit Data" : "Tambah Baru"}
              </span>
              <h2 className="text-lg font-black text-slate-900 leading-tight mt-0.5">
                {editingItem ? "Edit Produk Oleh-Oleh" : "Tambah Produk Baru"}
              </h2>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full hover:bg-slate-100 text-slate-500"
              onClick={() => setIsModalOpen(false)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="p-4 sm:p-5 space-y-4">
            {/* Unggah Foto Produk */}
            <div>
              <label className="text-xs font-bold text-slate-700 mb-1.5 block">
                Foto Produk (Cloudflare R2)
              </label>
              <ImageUpload
                value={imageUrl}
                onChange={setImageUrl}
                folder="/souvenirs"
                label="Upload Foto Produk"
                autoUpload={false}
              />
            </div>

            {/* Nama Produk */}
            <div>
              <label className="text-xs font-bold text-slate-700 mb-1.5 block">
                Nama Produk Oleh-Oleh <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Contoh: Minyak Kayu Putih Asli Namlea 100ml"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 focus:border-purple-600 rounded-xl text-xs font-bold outline-none"
              />
            </div>

            {/* Kategori */}
            <div>
              <label className="text-xs font-bold text-slate-700 mb-1.5 block">
                Kategori <span className="text-rose-500">*</span>
              </label>
              <select
                required
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 focus:border-purple-600 rounded-xl text-xs font-bold outline-none cursor-pointer"
              >
                <option value="" disabled>
                  Pilih Kategori Produk
                </option>
                {categories?.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Harga & Stok */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700 mb-1.5 block">
                  Harga Jual (Rp) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="number"
                  required
                  min={0}
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 focus:border-purple-600 rounded-xl text-xs font-bold outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 mb-1.5 block">
                  Stok Fisik POS <span className="text-rose-500">*</span>
                </label>
                <input
                  type="number"
                  required
                  min={0}
                  value={stock}
                  onChange={(e) => setStock(Number(e.target.value))}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 focus:border-purple-600 rounded-xl text-xs font-bold outline-none"
                />
              </div>
            </div>

            {/* Deskripsi */}
            <div>
              <label className="text-xs font-bold text-slate-700 mb-1.5 block">
                Deskripsi Ringkas
              </label>
              <textarea
                rows={3}
                placeholder="Rincian khasiat, rasa, atau kemasan oleh-oleh..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 focus:border-purple-600 rounded-xl text-xs font-medium outline-none resize-none"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsModalOpen(false)}
                className="rounded-xl h-9 px-4 text-xs font-bold text-slate-600 cursor-pointer"
              >
                Batal
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-black text-xs h-9 px-5 shadow-md cursor-pointer"
              >
                {isSubmitting ? "Menyimpan..." : editingItem ? "Simpan Perubahan" : "Tambah Produk"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
