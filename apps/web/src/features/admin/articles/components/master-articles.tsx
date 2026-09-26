"use client";

import { useState } from "react";
import { Plus, Search, Newspaper, Trash2, Edit2, RotateCw, Wand2, X, ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ImageUpload, uploadBase64ToR2 } from "@/components/ui/image-upload";
import {
  useArticles,
  useArticleCategories,
  useCreateArticle,
  useUpdateArticle,
  useDeleteArticle,
  useScrapeArticle,
} from "@/features/articles/hooks/use-articles";
import type { Article } from "@annisa/types";

export function MasterArticles() {
  const { data: articles, isLoading, refetch } = useArticles();
  const { data: categories } = useArticleCategories();
  const createMutation = useCreateArticle();
  const updateMutation = useUpdateArticle();
  const deleteMutation = useDeleteArticle();
  const scrapeMutation = useScrapeArticle();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingItem, setEditingItem] = useState<Article | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Form states
  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [scrapeUrl, setScrapeUrl] = useState("");

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
      // For cover image, we might receive the kompas URL. 
      // It's not a local file yet. We can preview it.
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
          const generateSlug = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
          const slugPrefix = generateSlug(title);
          
          finalImageUrl = await uploadBase64ToR2(
            finalImageUrl,
            `article-${Date.now()}.jpg`,
            "/articles",
            slugPrefix
          );
          toast.success("Cover berhasil diunggah!", { id: "upload-toast" });
        } catch (error: any) {
          toast.error(error.message || "Gagal mengunggah cover.", { id: "upload-toast" });
          setIsSubmitting(false);
          return;
        }
      } 
      // TODO: Handle remote images (like Kompas CDN) to be downloaded and uploaded to R2

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

  const handleDelete = async (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus artikel ini?")) {
      await deleteMutation.mutateAsync(id);
    }
  };

  const filteredArticles = articles?.filter((item) => {
    const matchSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCategory = selectedCategory === "all" || item.categoryId === selectedCategory;
    return matchSearch && matchCategory;
  }) || [];

  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);
  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 sm:p-6 rounded-2xl border border-slate-100 shadow-sm">
        <div>
          <span className="text-xs font-bold tracking-wider text-purple-600 uppercase mb-1 block">CMS Marketing & SEO</span>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800">
            Kelola Artikel Wisata
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Gunakan fitur Scraper untuk menyedot konten dari portal berita secara instan.
          </p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button
            variant="outline"
            className="rounded-xl flex-1 sm:flex-none border-slate-200 text-slate-600"
            onClick={() => refetch()}
            disabled={isLoading}
          >
            <RotateCw className={`w-4 h-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Button
            className="rounded-xl bg-purple-600 hover:bg-purple-700 text-white flex-1 sm:flex-none shadow-md shadow-purple-200 transition-all"
            onClick={handleOpenAdd}
          >
            <Plus className="w-4 h-4 mr-2" />
            Tambah Artikel
          </Button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Cari judul artikel..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-purple-100 transition-all"
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-hide">
          <Button
            variant={selectedCategory === "all" ? "primary" : "outline"}
            className={`rounded-full px-4 text-xs h-9 whitespace-nowrap ${
              selectedCategory === "all"
                ? "bg-purple-600 hover:bg-purple-700"
                : "border-slate-200 text-slate-600 hover:bg-slate-50"
            }`}
            onClick={() => { setSelectedCategory("all"); setCurrentPage(1); }}
          >
            Semua
          </Button>
          {categories?.map((cat) => (
            <Button
              key={cat.id}
              variant={selectedCategory === cat.id ? "primary" : "outline"}
              className={`rounded-full px-4 text-xs h-9 whitespace-nowrap ${
                selectedCategory === cat.id
                  ? "bg-purple-600 hover:bg-purple-700"
                  : "border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
              onClick={() => { setSelectedCategory(cat.id); setCurrentPage(1); }}
            >
              {cat.name}
            </Button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-2xl h-[300px] animate-pulse border border-slate-100" />
          ))}
        </div>
      ) : filteredArticles.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 p-12 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
            <Newspaper className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-bold text-slate-800">Belum ada artikel</h3>
          <p className="text-slate-500 text-sm mt-1 max-w-sm">
            Mulai tambahkan artikel wisata untuk menarik pengunjung dari Google.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100 uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="px-6 py-4 rounded-tl-2xl">Foto</th>
                  <th className="px-6 py-4 w-1/3">Judul Artikel</th>
                  <th className="px-6 py-4">Kategori</th>
                  <th className="px-6 py-4 text-center">Views</th>
                  <th className="px-6 py-4 text-right rounded-tr-2xl">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {paginatedArticles.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="w-16 h-12 rounded-lg bg-slate-100 overflow-hidden flex items-center justify-center border border-slate-200/50 relative">
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
                      <div className="font-bold text-slate-800 line-clamp-2">{item.title}</div>
                      <div className="text-xs text-slate-500 mt-1 line-clamp-1">{item.summary}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold bg-purple-50 text-purple-700 uppercase tracking-wide border border-purple-100/50">
                        {item.category?.name || "Uncategorized"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg">
                        {item.views}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 text-slate-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg"
                          onClick={() => handleOpenEdit(item)}
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                          onClick={() => handleDelete(item.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50/50">
              <span className="text-xs text-slate-500 font-medium">
                Halaman <span className="font-bold text-slate-800">{currentPage}</span> dari <span className="font-bold text-slate-800">{totalPages}</span>
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
                Sistem akan otomatis mengekstrak Judul, Foto, dan Isi Berita. Anda bebas mengedit hasilnya nanti.
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
                    <option value="" disabled>Pilih Kategori</option>
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
