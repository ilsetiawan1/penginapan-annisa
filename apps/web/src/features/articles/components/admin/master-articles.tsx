"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ImageUpload, uploadBase64ToR2 } from "@/components/ui/image-upload";
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
import {
  AlertTriangle,
  ArchiveRestore,
  Edit2,
  Newspaper,
  Plus,
  RotateCcw,
  RotateCw,
  Search,
  Trash2,
  Wand2,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

export function MasterArticles() {
  const { data: articles, isLoading, refetch } = useArticles();
  const { data: categories } = useArticleCategories();
  const createMutation = useCreateArticle();
  const updateMutation = useUpdateArticle();
  const deleteMutation = useDeleteArticle();
  const restoreMutation = useRestoreArticle();
  const forceDeleteMutation = useForceDeleteArticle();
  const scrapeMutation = useScrapeArticle();

  // Tab State: 'active' vs 'trash'
  const [activeTab, setActiveTab] = useState<"active" | "trash">("active");

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingItem, setEditingItem] = useState<Article | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Form states
  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [scrapeUrl, setScrapeUrl] = useState("");

  // Pisahkan artikel aktif vs sampah (soft-deleted)
  const activeArticles = useMemo(() => {
    return (articles || []).filter((item) => !item.deletedAt);
  }, [articles]);

  const trashArticles = useMemo(() => {
    return (articles || []).filter((item) => !!item.deletedAt);
  }, [articles]);

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
    setTitle("");
    setCategoryId(categories?.[0]?.id || "");
    setSummary("");
    setContent("");
    setCoverImage("");
    setScrapeUrl("");
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: Article) => {
    setEditingItem(item);
    setTitle(item.title);
    setCategoryId(item.categoryId);
    setSummary(item.summary || "");
    setContent(item.content || "");
    setCoverImage(item.coverImage || "");
    setScrapeUrl("");
    setIsModalOpen(true);
  };

  const handleScrape = async () => {
    if (!scrapeUrl) {
      toast.error("Silakan masukkan URL berita terlebih dahulu.");
      return;
    }
    toast.loading("Mengekstrak berita...", { id: "scrape" });
    try {
      const data = await scrapeMutation.mutateAsync(scrapeUrl);
      setTitle(data.title);
      setSummary(data.summary);
      setContent(data.content);
      setCoverImage(data.coverImage);
      toast.success("Berita berhasil diekstrak!", { id: "scrape" });
    } catch (err: any) {
      toast.error(err.message || "Gagal scrape berita.", { id: "scrape" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !categoryId || !content.trim()) {
      toast.error("Judul, kategori, dan konten wajib diisi.");
      return;
    }

    try {
      setIsSubmitting(true);
      let finalImageUrl = coverImage;

      // Jika URL adalah DataURL (Base64), artinya foto baru dipilih dari lokal
      if (finalImageUrl.startsWith("data:")) {
        toast.loading("Mengunggah cover artikel ke Cloudflare R2...", { id: "upload-toast" });
        try {
          const generateSlug = (text: string) =>
            text
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/(^-|-$)/g, "");
          const slugPrefix = generateSlug(title);

          finalImageUrl = await uploadBase64ToR2(
            finalImageUrl,
            `article-${Date.now()}.jpg`,
            "/articles",
            slugPrefix,
          );
          toast.success("Cover berhasil diunggah!", { id: "upload-toast" });
        } catch (error: any) {
          toast.error(error.message || "Gagal mengunggah cover.", { id: "upload-toast" });
          setIsSubmitting(false);
          return;
        }
      }

      const payload = {
        title,
        categoryId,
        summary,
        content,
        coverImage: finalImageUrl,
        isPublished: true,
      };

      if (editingItem) {
        await updateMutation.mutateAsync({ id: editingItem.id, input: payload });
        toast.success("Artikel berhasil diperbarui.");
      } else {
        await createMutation.mutateAsync(payload as any);
        toast.success("Artikel berhasil ditambahkan.");
      }

      setIsModalOpen(false);
    } catch (error: any) {
      toast.error(error.message || "Terjadi kesalahan saat menyimpan artikel.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Soft Delete Handler
  const handleSoftDelete = (item: Article) => {
    toast(`Pindahkan '${item.title}' ke Sampah?`, {
      description: "Artikel akan disimpan di sampah selama 30 hari sebelum dihapus permanen.",
      action: {
        label: "Hapus ke Sampah",
        onClick: () => deleteMutation.mutate({ id: item.id, permanent: false }),
      },
    });
  };

  // Restore Handler
  const handleRestore = (item: Article) => {
    restoreMutation.mutate(item.id);
  };

  // Force Delete Handler
  const handleForceDelete = (item: Article) => {
    toast(`Hapus permanen '${item.title}'?`, {
      description: "Data akan dihapus selamanya dari database dan tidak dapat dipulihkan.",
      action: {
        label: "Hapus Permanen",
        onClick: () => forceDeleteMutation.mutate(item.id),
      },
    });
  };

  // Filter items berdasarkan tab aktif, pencarian & kategori
  const sourceList = activeTab === "active" ? activeArticles : trashArticles;

  const filteredArticles = sourceList.filter((item) => {
    const matchSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.summary && item.summary.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchCategory = selectedCategory === "all" || item.categoryId === selectedCategory;
    return matchSearch && matchCategory;
  });

  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);
  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Header CMS Artikel */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 sm:p-6 rounded-3xl border border-slate-200 shadow-2xs">
        <div>
          <span className="bg-purple-100 text-purple-800 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            CMS Marketing &amp; SEO
          </span>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight mt-1">
            Kelola Artikel Wisata &amp; Panduan
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Format tabel terstruktur dengan Auto-Scraper berita dan fitur soft delete retensi 30 hari.
          </p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button
            variant="outline"
            size="sm"
            className="rounded-xl border-slate-200 text-slate-600 hover:text-purple-700 h-9 gap-1.5"
            onClick={() => refetch()}
            disabled={isLoading}
          >
            <RotateCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
            <span className="text-xs font-bold hidden sm:inline">Refresh</span>
          </Button>
          <Button
            className="rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-black text-xs h-9 px-4 gap-1.5 shadow-sm"
            onClick={handleOpenAdd}
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Artikel</span>
          </Button>
        </div>
      </div>

      {/* Tab Switcher: Artikel Aktif vs Sampah 30 Hari */}
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
          <Newspaper className="w-3.5 h-3.5" />
          <span>Artikel Aktif</span>
          <span
            className={`text-[10px] font-black px-1.5 py-0.5 rounded-full ${
              activeTab === "active" ? "bg-white/25 text-white" : "bg-purple-100 text-purple-800"
            }`}
          >
            {activeArticles.length}
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
            {trashArticles.length}
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
              Artikel di bawah ini dapat dipulihkan kembali ke website dalam waktu 30 hari sejak dihapus.
              Setelah melewati 30 hari, sistem otomatis menghapus artikel ini secara permanen dari database.
            </p>
          </div>
        </div>
      )}

      {/* Bar Pencarian & Filter Kategori */}
      <div className="bg-white p-4 rounded-2xl shadow-2xs border border-slate-200 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Cari judul artikel..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-purple-100 transition-all font-medium text-slate-800 outline-none"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-hide">
          <Button
            variant={selectedCategory === "all" ? "primary" : "outline"}
            className={`rounded-full px-4 text-xs h-9 whitespace-nowrap ${
              selectedCategory === "all"
                ? "bg-purple-700 hover:bg-purple-800 font-bold"
                : "border-slate-200 text-slate-600 hover:bg-slate-50 font-medium"
            }`}
            onClick={() => {
              setSelectedCategory("all");
              setCurrentPage(1);
            }}
          >
            Semua
          </Button>
          {categories?.map((cat) => (
            <Button
              key={cat.id}
              variant={selectedCategory === cat.id ? "primary" : "outline"}
              className={`rounded-full px-4 text-xs h-9 whitespace-nowrap ${
                selectedCategory === cat.id
                  ? "bg-purple-700 hover:bg-purple-800 font-bold"
                  : "border-slate-200 text-slate-600 hover:bg-slate-50 font-medium"
              }`}
              onClick={() => {
                setSelectedCategory(cat.id);
                setCurrentPage(1);
              }}
            >
              {cat.name}
            </Button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-16 bg-slate-100 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : filteredArticles.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-4 border border-slate-100">
            {activeTab === "trash" ? (
              <Trash2 className="w-8 h-8 text-slate-400" />
            ) : (
              <Newspaper className="w-8 h-8 text-slate-400" />
            )}
          </div>
          <h3 className="text-base font-black text-slate-800">
            {activeTab === "trash" ? "Tempat Sampah Bersih" : "Belum ada artikel"}
          </h3>
          <p className="text-slate-500 text-xs mt-1 max-w-sm">
            {activeTab === "trash"
              ? "Tidak ada artikel yang sedang dalam masa retensi 30 hari."
              : "Mulai tambahkan artikel wisata untuk menarik pengunjung dari Google."}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs overflow-hidden flex flex-col">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200 uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="px-6 py-4">Foto</th>
                  <th className="px-6 py-4 w-1/3">Judul Artikel</th>
                  <th className="px-6 py-4">Kategori</th>
                  <th className="px-6 py-4 text-center">Views</th>
                  {activeTab === "trash" && (
                    <th className="px-6 py-4 text-center">Sisa Retensi</th>
                  )}
                  <th className="px-6 py-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {paginatedArticles.map((item) => {
                  const remainingDays = getRemainingDays(item.deletedAt);

                  return (
                    <tr
                      key={item.id}
                      className={`hover:bg-slate-50/70 transition-colors group ${
                        activeTab === "trash" ? "bg-rose-50/20" : ""
                      }`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="w-16 h-12 rounded-xl bg-slate-100 overflow-hidden flex items-center justify-center border border-slate-200 relative">
                          {item.coverImage ? (
                            <img
                              src={item.coverImage}
                              alt={item.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <Newspaper className="w-4 h-4 text-slate-400 opacity-50" />
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-bold text-slate-900 line-clamp-2">{item.title}</div>
                        <div className="text-xs text-slate-500 mt-1 line-clamp-1">{item.summary}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-black bg-purple-50 text-purple-700 uppercase tracking-wide border border-purple-200">
                          {item.category?.name || "Uncategorized"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg">
                          {item.views}
                        </span>
                      </td>

                      {/* Kolom Sisa Retensi (Khusus Sampah) */}
                      {activeTab === "trash" && (
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                              remainingDays <= 3
                                ? "bg-rose-100 text-rose-800 border border-rose-300 animate-pulse"
                                : remainingDays <= 7
                                ? "bg-amber-100 text-amber-800 border border-amber-300"
                                : "bg-slate-100 text-slate-700 border border-slate-300"
                            }`}
                          >
                            {remainingDays} hari tersisa
                          </span>
                        </td>
                      )}

                      {/* Tombol Aksi */}
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        {activeTab === "active" ? (
                          <div className="flex justify-end gap-1">
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8 text-slate-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg"
                              onClick={() => handleOpenEdit(item)}
                              title="Edit Artikel"
                            >
                              <Edit2 className="w-4 h-4" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg"
                              onClick={() => handleSoftDelete(item)}
                              title="Pindahkan ke Sampah"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        ) : (
                          <div className="flex justify-end gap-1.5">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleRestore(item)}
                              className="h-8 px-2.5 text-xs font-black text-purple-700 border-purple-200 hover:bg-purple-50 rounded-lg gap-1"
                              title="Pulihkan Artikel"
                            >
                              <RotateCcw className="w-3.5 h-3.5" />
                              <span>Pulihkan</span>
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => handleForceDelete(item)}
                              className="h-8 w-8 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg"
                              title="Hapus Permanen"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
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
            <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50/50">
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

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-0 bg-white border-0 rounded-2xl shadow-xl">
          <div className="p-4 sm:p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-10">
            <h2 className="text-xl font-bold text-slate-800">
              {editingItem ? "Edit Artikel" : "Tambah Artikel Baru"}
            </h2>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full hover:bg-slate-100 text-slate-500"
              onClick={() => setIsModalOpen(false)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-6">
            {/* Auto Scraper Banner */}
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-100 rounded-xl p-4">
              <label className="text-xs font-bold text-purple-700 uppercase tracking-wider mb-2 flex items-center gap-1">
                <Wand2 className="w-3 h-3" /> Auto-Scraper
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  placeholder="Paste URL berita di sini..."
                  className="flex-1 px-4 py-2 rounded-lg border-purple-200 bg-white text-sm focus:ring-2 focus:ring-purple-200 focus:border-purple-400 outline-none transition-all"
                  value={scrapeUrl}
                  onChange={(e) => setScrapeUrl(e.target.value)}
                />
                <Button
                  type="button"
                  className="bg-purple-600 hover:bg-purple-700 text-white rounded-lg shadow-sm"
                  onClick={handleScrape}
                  disabled={scrapeMutation.isPending}
                >
                  {scrapeMutation.isPending ? "Proses..." : "Auto-Isi"}
                </Button>
              </div>
              <p className="text-[11px] text-purple-600/70 mt-2">
                Sistem akan otomatis mengekstrak Judul, Foto, dan Isi Berita. Anda bebas mengedit
                hasilnya nanti.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-bold text-slate-700 mb-1.5 block">
                  Judul Artikel <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-purple-100 focus:border-purple-400 transition-all outline-none font-medium"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-bold text-slate-700 mb-1.5 block">
                    Kategori <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-purple-100 focus:border-purple-400 transition-all outline-none"
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                  >
                    <option value="" disabled>
                      Pilih Kategori
                    </option>
                    {categories?.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-sm font-bold text-slate-700 mb-1.5 block">
                  Cover Artikel (Cloudflare R2)
                </label>
                {/* For scraper, coverImage might be an external URL. ImageUpload component needs to support showing external URLs as preview */}
                <ImageUpload
                  value={coverImage}
                  onChange={setCoverImage}
                  folder="articles"
                  autoUpload={false} // Diupload manual saat form disubmit
                />
              </div>

              <div>
                <label className="text-sm font-bold text-slate-700 mb-1.5 block">
                  Ringkasan (Summary)
                </label>
                <textarea
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-purple-100 focus:border-purple-400 transition-all outline-none resize-none"
                  rows={2}
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm font-bold text-slate-700 mb-1.5 block">
                  Isi Konten Berita <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-purple-100 focus:border-purple-400 transition-all outline-none"
                  rows={12}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-6 border-t border-slate-100 sticky bottom-0 bg-white py-4">
              <Button
                type="button"
                variant="outline"
                className="rounded-xl border-slate-200 text-slate-600 hover:bg-slate-50 px-6"
                onClick={() => setIsModalOpen(false)}
                disabled={isSubmitting}
              >
                Batal
              </Button>
              <Button
                type="submit"
                className="rounded-xl bg-purple-600 hover:bg-purple-700 text-white shadow-md shadow-purple-200 px-8"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Menyimpan..." : "Simpan Artikel"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
