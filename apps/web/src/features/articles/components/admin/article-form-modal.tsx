"use client";

import { ImageUpload, uploadBase64ToR2 } from "@/components/ui/image-upload";
import type { Article, ArticleCategory } from "@annisa/types";
import { Loader2, Wand2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface ArticleFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: {
    title: string;
    categoryId: string;
    summary: string;
    content: string;
    coverImage: string;
  }) => Promise<void>;
  categories: ArticleCategory[];
  initialData?: Article | null;
  onScrape: (url: string) => Promise<{
    title: string;
    coverImage: string;
    summary: string;
    content: string;
  }>;
  isScraping: boolean;
}

export function ArticleFormModal({
  isOpen,
  onClose,
  onSubmit,
  categories,
  initialData,
  onScrape,
  isScraping,
}: ArticleFormModalProps) {
  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [scrapeUrl, setScrapeUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sinkronkan state saat initialData atau modal berubah
  useEffect(() => {
    if (!isOpen) return;

    if (initialData) {
      setTitle(initialData.title);
      setCategoryId(initialData.categoryId);
      setSummary(initialData.summary || "");
      setContent(initialData.content || "");
      setCoverImage(initialData.coverImage || "");
      setScrapeUrl("");
    } else {
      setTitle("");
      setCategoryId(categories?.[0]?.id || "");
      setSummary("");
      setContent("");
      setCoverImage("");
      setScrapeUrl("");
    }
  }, [initialData, categories, isOpen]);

  // Tutup dengan tombol Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleScrapeClick = async () => {
    if (!scrapeUrl.trim()) {
      toast.error("Silakan masukkan URL berita terlebih dahulu.");
      return;
    }
    try {
      const data = await onScrape(scrapeUrl.trim());
      setTitle(data.title);
      setSummary(data.summary);
      setContent(data.content);
      setCoverImage(data.coverImage);
      toast.success("Berita berhasil diekstrak!");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal scrape berita.";
      toast.error(msg);
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

      // Jika URL Base64, upload ke Cloudflare R2
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
        } catch (error: unknown) {
          const msg = error instanceof Error ? error.message : "Gagal mengunggah cover.";
          toast.error(msg, { id: "upload-toast" });
          setIsSubmitting(false);
          return;
        }
      }

      await onSubmit({
        title,
        categoryId,
        summary,
        content,
        coverImage: finalImageUrl,
      });

      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <button
        type="button"
        tabIndex={-1}
        aria-hidden="true"
        onClick={onClose}
        className="fixed inset-0 w-full h-full bg-transparent cursor-default border-none outline-none -z-10"
      />

      <div className="max-w-3xl w-full max-h-[90vh] bg-white rounded-2xl border border-slate-200/80 shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-150">
        {/* Header Modal */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
            {initialData ? "Edit Artikel" : "Tambah Artikel Baru"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="h-8 w-8 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Form Scrollable */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          {/* Auto-Scraper Box (Slate Netral) */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-800">
              <Wand2 className="w-3.5 h-3.5 text-slate-600" />
              <span>Auto-Scraper Berita</span>
            </div>
            <div className="flex gap-2">
              <input
                type="url"
                placeholder="Tempel URL berita online di sini (detik, kompas, dll)..."
                value={scrapeUrl}
                onChange={(e) => setScrapeUrl(e.target.value)}
                className="flex-1 px-3 py-1.5 bg-white border border-slate-200/80 rounded-lg text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-300 transition-all h-9"
              />
              <button
                type="button"
                onClick={handleScrapeClick}
                disabled={isScraping}
                className="bg-slate-900 hover:bg-slate-800 text-white rounded-lg px-3.5 h-9 text-xs font-medium transition cursor-pointer disabled:opacity-60 flex items-center gap-1.5 shrink-0"
              >
                {isScraping && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                <span>{isScraping ? "Mengekstrak..." : "Auto-Isi"}</span>
              </button>
            </div>
            <p className="text-[11px] text-slate-500">
              Sistem akan otomatis mengekstrak Judul, Foto, dan Ringkasan berita ke form di bawah.
            </p>
          </div>

          <div className="space-y-4">
            {/* Judul Artikel */}
            <div>
              <label
                htmlFor="article-title"
                className="text-xs font-semibold text-slate-800 mb-1 block"
              >
                Judul Artikel <span className="text-rose-500">*</span>
              </label>
              <input
                id="article-title"
                type="text"
                required
                placeholder="Contoh: 5 Spot Wisata Terbaik Dekat Bandara Pattimura"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50/50 border border-slate-200/80 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-300 transition-all h-9 font-medium"
              />
            </div>

            {/* Kategori */}
            <div>
              <label
                htmlFor="article-category"
                className="text-xs font-semibold text-slate-800 mb-1 block"
              >
                Kategori <span className="text-rose-500">*</span>
              </label>
              <select
                id="article-category"
                required
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50/50 border border-slate-200/80 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-300 transition-all cursor-pointer h-9"
              >
                <option value="" disabled>
                  Pilih Kategori
                </option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Cover Artikel */}
            <div>
              <label
                htmlFor="article-cover"
                className="text-xs font-semibold text-slate-800 mb-1 block"
              >
                Foto Cover (Cloudflare R2)
              </label>
              <ImageUpload
                value={coverImage}
                onChange={setCoverImage}
                folder="articles"
                autoUpload={false}
              />
            </div>

            {/* Ringkasan */}
            <div>
              <label
                htmlFor="article-summary"
                className="text-xs font-semibold text-slate-800 mb-1 block"
              >
                Ringkasan (Summary)
              </label>
              <textarea
                id="article-summary"
                rows={2}
                placeholder="Ringkasan singkat artikel untuk preview pencarian..."
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50/50 border border-slate-200/80 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-300 transition-all resize-none"
              />
            </div>

            {/* Konten Artikel */}
            <div>
              <label
                htmlFor="article-content"
                className="text-xs font-semibold text-slate-800 mb-1 block"
              >
                Isi Konten Berita <span className="text-rose-500">*</span>
              </label>
              <textarea
                id="article-content"
                required
                rows={10}
                placeholder="Tuliskan isi artikel lengkap di sini..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50/50 border border-slate-200/80 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-300 transition-all font-normal leading-relaxed"
              />
            </div>
          </div>

          {/* Footer Tombol Simpan */}
          <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="border border-slate-200/80 hover:bg-slate-50 text-slate-700 rounded-xl px-4 h-9 text-xs font-medium transition cursor-pointer disabled:opacity-60"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-slate-900 hover:bg-slate-800 text-white rounded-xl px-4 h-9 text-xs font-medium shadow-xs transition cursor-pointer disabled:opacity-60 flex items-center gap-1.5"
            >
              {isSubmitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              <span>{isSubmitting ? "Menyimpan..." : "Simpan Artikel"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
