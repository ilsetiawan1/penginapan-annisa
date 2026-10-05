"use client";

import { ImageUpload, uploadBase64ToR2 } from "@/components/ui/image-upload";
import type { Souvenir, SouvenirCategory } from "@annisa/types";
import { Package, Save, X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface SouvenirFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingItem: Souvenir | null;
  categories?: SouvenirCategory[];
  onSubmit: (data: {
    name: string;
    categoryId: string;
    price: number;
    stock: number;
    description: string;
    imageUrl: string;
  }) => Promise<void>;
}

export function SouvenirFormModal({
  isOpen,
  onClose,
  editingItem,
  categories,
  onSubmit,
}: SouvenirFormModalProps) {
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [price, setPrice] = useState<number>(50000);
  const [stock, setStock] = useState<number>(20);
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    if (editingItem) {
      setName(editingItem.name);
      setCategoryId(editingItem.categoryId);
      setPrice(editingItem.price);
      setStock(editingItem.stock);
      setDescription(editingItem.description || "");
      setImageUrl(editingItem.imageUrl || "");
    } else {
      setName("");
      setCategoryId(categories?.[0]?.id || "");
      setPrice(50000);
      setStock(20);
      setDescription("");
      setImageUrl("");
    }
  }, [editingItem, categories, isOpen]);

  // Handle Escape key to close modal
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

      await onSubmit({
        name,
        categoryId,
        price,
        stock,
        description,
        imageUrl: finalImageUrl,
      });

      onClose();
    } catch {
      // Error handled by caller
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentCategoryName =
    categories?.find((c) => c.id === categoryId)?.name ||
    editingItem?.category?.name ||
    "Katalog Oleh-Oleh";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto !m-0 m-0 animate-in fade-in duration-200">
      <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl border border-slate-200/80 p-6 my-auto space-y-5 animate-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-3.5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-800 border border-slate-200/80 flex items-center justify-center font-bold text-xs shrink-0">
              <Package className="w-4 h-4 text-slate-700" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 leading-snug">
                {editingItem ? `Edit ${editingItem.name}` : "Tambah Produk Baru"}
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                {currentCategoryName} • Etalase &amp; POS Kasir
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup modal"
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body - 2 Kolom Compact Persis Edit Kamar */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {/* Kolom Kiri: Unggah & Preview Foto */}
            <div className="space-y-3">
              <p className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
                Foto Produk (Cloudflare R2)
              </p>
              <ImageUpload
                value={imageUrl}
                onChange={setImageUrl}
                folder="/souvenirs"
                label="Upload Foto Produk"
                autoUpload={false}
              />
            </div>

            {/* Kolom Kanan: Rincian Data Produk */}
            <div className="space-y-3.5">
              {/* Nama Produk */}
              <div>
                <label
                  htmlFor="modal-souvenir-name"
                  className="text-xs font-semibold text-slate-700 mb-1.5 block"
                >
                  Nama Produk Oleh-Oleh <span className="text-rose-500">*</span>
                </label>
                <input
                  id="modal-souvenir-name"
                  type="text"
                  required
                  placeholder="Contoh: Minyak Kayu Putih Asli Namlea 100ml"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 focus:bg-white focus:border-slate-900 focus:ring-1 focus:ring-slate-900/10 rounded-xl text-xs font-medium text-slate-900 placeholder:text-slate-400 outline-none transition"
                />
              </div>

              {/* Kategori */}
              <div>
                <label
                  htmlFor="modal-souvenir-category"
                  className="text-xs font-semibold text-slate-700 mb-1.5 block"
                >
                  Kategori <span className="text-rose-500">*</span>
                </label>
                <select
                  id="modal-souvenir-category"
                  required
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 focus:bg-white focus:border-slate-900 focus:ring-1 focus:ring-slate-900/10 rounded-xl text-xs font-medium text-slate-700 outline-none cursor-pointer transition"
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

              {/* Harga & Stok (Grid 2 Kolom) */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="modal-souvenir-price"
                    className="text-xs font-semibold text-slate-700 mb-1.5 block"
                  >
                    Harga Jual (Rp) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="modal-souvenir-price"
                    type="number"
                    required
                    min={0}
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 focus:bg-white focus:border-slate-900 focus:ring-1 focus:ring-slate-900/10 rounded-xl text-xs font-medium text-slate-900 outline-none transition"
                  />
                </div>

                <div>
                  <label
                    htmlFor="modal-souvenir-stock"
                    className="text-xs font-semibold text-slate-700 mb-1.5 block"
                  >
                    Stok Fisik POS <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="modal-souvenir-stock"
                    type="number"
                    required
                    min={0}
                    value={stock}
                    onChange={(e) => setStock(Number(e.target.value))}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 focus:bg-white focus:border-slate-900 focus:ring-1 focus:ring-slate-900/10 rounded-xl text-xs font-medium text-slate-900 outline-none transition"
                  />
                </div>
              </div>

              {/* Deskripsi Ringkas */}
              <div>
                <label
                  htmlFor="modal-souvenir-desc"
                  className="text-xs font-semibold text-slate-700 mb-1.5 block"
                >
                  Deskripsi Ringkas
                </label>
                <textarea
                  id="modal-souvenir-desc"
                  rows={4}
                  placeholder="Rincian khasiat, rasa, atau kemasan oleh-oleh..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 focus:bg-white focus:border-slate-900 focus:ring-1 focus:ring-slate-900/10 rounded-xl text-xs font-medium text-slate-900 placeholder:text-slate-400 outline-none resize-y min-h-[90px] transition leading-relaxed"
                />
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl h-9 px-4 text-xs font-semibold text-slate-700 border border-slate-200/80 bg-white hover:bg-slate-50 transition cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs h-9 px-5 shadow-xs cursor-pointer flex items-center gap-1.5 transition disabled:opacity-60"
            >
              <Save className="w-3.5 h-3.5" />
              <span>
                {isSubmitting
                  ? "Menyimpan..."
                  : editingItem
                    ? "Simpan Perubahan Produk"
                    : "Simpan Produk Baru"}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
