"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Edit2,
  Package,
  Plus,
  RotateCw,
  Search,
  Tag,
  Trash2,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ImageUpload, uploadBase64ToR2 } from "@/components/ui/image-upload";
import {
  useCreateSouvenir,
  useDeleteSouvenir,
  useSouvenirCategories,
  useSouvenirs,
  useUpdateSouvenir,
} from "@/features/souvenirs/hooks/use-souvenirs";
import type { Souvenir } from "@annisa/types";

export function MasterSouvenirs() {
  const { data: products, isLoading, refetch } = useSouvenirs();
  const { data: categories } = useSouvenirCategories();
  const createMutation = useCreateSouvenir();
  const updateMutation = useUpdateSouvenir();
  const deleteMutation = useDeleteSouvenir();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingItem, setEditingItem] = useState<Souvenir | null>(null);

  // Form states
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [price, setPrice] = useState<number>(50000);
  const [stock, setStock] = useState<number>(20);
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

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

      // Jika URL adalah DataURL (Base64), artinya foto baru saja dipilih dan belum diupload
      if (finalImageUrl.startsWith("data:")) {
        toast.loading("Mengunggah foto ke Cloudflare R2...", { id: "upload-toast" });
        try {
          const generateSlug = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
          const slugPrefix = generateSlug(name);
          
          finalImageUrl = await uploadBase64ToR2(
            finalImageUrl,
            `souvenir-${Date.now()}.jpg`,
            "/souvenirs",
            slugPrefix
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
            imageUrl: finalImageUrl || undefined,
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
          imageUrl: finalImageUrl || undefined,
        });
      }

      setIsModalOpen(false);
    } catch (error) {
      // Error handled by mutation
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string, itemName: string) => {
    if (confirm(`Yakin ingin menghapus produk "${itemName}"?`)) {
      await deleteMutation.mutateAsync(id);
    }
  };

  const filteredProducts = (products || []).filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCat =
      selectedCategory === "all" || p.categoryId === selectedCategory;
    return matchSearch && matchCat;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header Info */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 sm:p-5 rounded-3xl border border-slate-200 shadow-2xs">
        <div>
          <span className="bg-purple-100 text-purple-800 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            Master Data Etalase
          </span>
          <h2 className="text-base sm:text-lg font-black text-slate-900 leading-tight mt-1">
            Kelola Produk Oleh-Oleh Khas Maluku
          </h2>
          <p className="text-xs text-slate-500">
            Atur stok fisik POS kasir, harga jual, dan upload foto produk asli ke ImageKit CDN.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => refetch()}
            title="Refresh Data"
            className="p-2 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-purple-50 text-slate-600 hover:text-purple-700 transition cursor-pointer shadow-2xs flex items-center gap-1.5"
          >
            <RotateCw
              className={`w-4 h-4 ${isLoading ? "animate-spin text-purple-700" : ""}`}
            />
            <span className="text-xs font-black hidden sm:inline">Refresh</span>
          </button>

          <Button
            type="button"
            onClick={handleOpenAdd}
            className="rounded-2xl bg-purple-700 hover:bg-purple-800 text-white font-black text-xs sm:text-sm h-11 px-5 gap-2 shadow-md cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Produk</span>
          </Button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari nama produk oleh-oleh..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 outline-none focus:border-purple-600 focus:bg-white transition"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto">
          <button
            type="button"
            onClick={() => setSelectedCategory("all")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              selectedCategory === "all"
                ? "bg-purple-700 text-white shadow-xs"
                : "bg-slate-100 text-slate-600 hover:bg-purple-50 hover:text-purple-900"
            }`}
          >
            Semua
          </button>
          {categories?.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap ${
                selectedCategory === cat.id
                  ? "bg-purple-700 text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-purple-50 hover:text-purple-900"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Grid List Produk */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl border border-slate-200 p-4 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-3"
          >
            <div className="space-y-2.5">
              <div className="relative h-40 w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-100">
                {item.imageUrl ? (
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                ) : (
                  <div className="h-full flex items-center justify-center text-slate-400">
                    <Package className="w-10 h-10" />
                  </div>
                )}
                <span className="absolute top-2.5 left-2.5 bg-slate-950/80 backdrop-blur-md text-purple-200 text-[10px] font-black px-2.5 py-0.5 rounded-md uppercase">
                  {item.category?.name || "Oleh-oleh"}
                </span>
              </div>

              <div>
                <h3 className="font-extrabold text-sm text-slate-900 line-clamp-1">
                  {item.name}
                </h3>
                <p className="text-[11px] text-slate-400 line-clamp-2 mt-0.5">
                  {item.description || "Produk oleh-oleh asli khas Ambon Maluku."}
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-xs font-black text-purple-700 block">
                  Rp {item.price.toLocaleString("id-ID")}
                </span>
                <span className="text-[10px] text-slate-500 font-semibold">
                  Stok: <strong className="text-slate-800">{item.stock} pcs</strong>
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => handleOpenEdit(item)}
                  className="p-2 rounded-xl bg-purple-50 text-purple-800 hover:bg-purple-100 transition cursor-pointer"
                  title="Edit Produk"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(item.id, item.name)}
                  className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition cursor-pointer"
                  title="Hapus Produk"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Form Tambah / Edit Produk */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-md max-h-[90dvh] overflow-y-auto p-5 rounded-3xl bg-white border-0 shadow-2xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-base font-black text-slate-900">
              {editingItem ? "Edit Produk Oleh-Oleh" : "Tambah Produk Baru"}
            </h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5 text-left pt-1">
            <ImageUpload
              value={imageUrl}
              onChange={setImageUrl}
              folder="/souvenirs"
              autoUpload={false}
              label="Foto Produk (Cloudflare R2)"
              description="Upload foto produk untuk etalase publik dan kasir."
            />

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Nama Produk <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Contoh: Minyak Kayu Putih Namlea (100ml)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#faf9fd] border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 outline-none focus:border-purple-600 focus:bg-white transition"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Kategori Produk <span className="text-red-500">*</span>
              </label>
              <select
                required
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full bg-[#faf9fd] border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 outline-none focus:border-purple-600 focus:bg-white transition cursor-pointer"
              >
                <option value="" disabled>Pilih Kategori</option>
                {categories?.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Harga Jual (Rp) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  required
                  min={1000}
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full bg-[#faf9fd] border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 outline-none focus:border-purple-600 focus:bg-white transition"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Stok Fisik POS <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  required
                  min={0}
                  value={stock}
                  onChange={(e) => setStock(Number(e.target.value))}
                  className="w-full bg-[#faf9fd] border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 outline-none focus:border-purple-600 focus:bg-white transition"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Deskripsi Singkat
              </label>
              <textarea
                rows={2}
                placeholder="Khasiat atau informasi rasa produk..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-[#faf9fd] border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 outline-none focus:border-purple-600 focus:bg-white transition resize-none"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsModalOpen(false)}
                className="rounded-xl border-slate-200 text-xs font-bold"
              >
                Batal
              </Button>
              <Button
                type="submit"
                disabled={createMutation.isPending || updateMutation.isPending || isSubmitting}
                className="rounded-xl bg-purple-700 hover:bg-purple-800 text-white text-xs font-extrabold px-5 shadow-xs"
              >
                {(createMutation.isPending || updateMutation.isPending || isSubmitting) && (
                  <RotateCw className="w-4 h-4 mr-2 animate-spin" />
                )}
                {editingItem ? "Simpan Perubahan" : "Tambah Produk"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
