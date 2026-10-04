"use client";

import { Button } from "@/components/ui/button";
import {
  Bed,
  Check,
  CheckCircle2,
  Cloud,
  Plus,
  RotateCw,
  Save,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { type MasterRoomItem, cleanImageUrl } from "./room-master-card";

interface RoomEditModalProps {
  editingRoom: MasterRoomItem | null;
  setEditingRoom: React.Dispatch<React.SetStateAction<MasterRoomItem | null>>;
  r2Gallery: { key: string; name: string; url: string }[];
  isLoadingR2: boolean;
  fetchR2Gallery: () => void;
  newFacilityInput: string;
  setNewFacilityInput: (val: string) => void;
  handleAddFacility: () => void;
  handleRemoveFacility: (fac: string) => void;
  handleSaveEdit: () => void;
}

export function RoomEditModal({
  editingRoom,
  setEditingRoom,
  r2Gallery,
  isLoadingR2,
  fetchR2Gallery,
  newFacilityInput,
  setNewFacilityInput,
  handleAddFacility,
  handleRemoveFacility,
  handleSaveEdit,
}: RoomEditModalProps) {
  const [failedImageUrl, setFailedImageUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!editingRoom) return null;

  const imageFailed = Boolean(editingRoom.imageUrl && failedImageUrl === editingRoom.imageUrl);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Ukuran file maksimal 5MB.");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const base64DataUrl = event.target?.result as string;
      if (!base64DataUrl) return;
      setEditingRoom((prev) => (prev ? { ...prev, imageUrl: base64DataUrl } : null));
      setFailedImageUrl(null);
      toast.success("Foto baru berhasil dipilih.");
    };
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto !m-0 m-0 animate-in fade-in duration-200">
      <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl border border-slate-200/80 p-6 my-auto space-y-5 animate-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-3.5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-800 border border-slate-200/80 flex items-center justify-center font-bold text-xs tabular-nums">
              #{editingRoom.code}
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Edit Kamar #{editingRoom.code}</h3>
              <p className="text-xs text-slate-500 font-medium">
                {editingRoom.typeName} • {editingRoom.buildingName}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setEditingRoom(null)}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body - 2 Kolom Compact */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* Kolom Kiri: Preview Foto Utama & Galeri R2 */}
          <div className="space-y-3">
            <div>
              <p className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
                Foto Kamar (Cloudflare R2)
              </p>

              {/* Preview Foto Utama Aspect-Video */}
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/80">
                {editingRoom.imageUrl && !imageFailed ? (
                  <img
                    src={cleanImageUrl(editingRoom.imageUrl)}
                    alt={`Foto Kamar #${editingRoom.code}`}
                    onError={() => setFailedImageUrl(editingRoom.imageUrl)}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 bg-[repeating-linear-gradient(135deg,theme(colors.slate.100)_0_10px,theme(colors.slate.50)_10px_20px)] flex flex-col items-center justify-center gap-1.5 text-slate-400 p-4">
                    <Bed className="w-8 h-8 text-slate-300" strokeWidth={1.5} />
                    <span className="text-xs font-medium text-slate-400">Belum ada foto utama</span>
                  </div>
                )}
              </div>

              {/* Aksi Upload & Hapus Foto */}
              <div className="flex items-center justify-between gap-2 pt-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-xs font-semibold px-3 py-1.5 rounded-xl border border-slate-200/80 bg-white hover:bg-slate-50 text-slate-700 flex items-center gap-1.5 transition cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5 text-slate-600" />
                  <span>Unggah Foto Baru</span>
                </button>

                {editingRoom.imageUrl && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingRoom({ ...editingRoom, imageUrl: "" });
                      setFailedImageUrl(null);
                    }}
                    className="text-[11px] font-semibold text-red-600 hover:text-red-700 flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Hapus Foto</span>
                  </button>
                )}
              </div>
            </div>

            {/* Galeri Cloudflare R2 */}
            <div className="space-y-2 p-3 bg-slate-50/70 rounded-2xl border border-slate-200/80">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                  <Cloud className="w-3.5 h-3.5 text-slate-700" />
                  <span>Pilih dari R2 ({r2Gallery.length})</span>
                </div>
                <button
                  type="button"
                  onClick={fetchR2Gallery}
                  className="text-[11px] text-slate-600 hover:text-slate-900 font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <RotateCw className={`w-3 h-3 ${isLoadingR2 ? "animate-spin" : ""}`} />
                  <span>Refresh</span>
                </button>
              </div>

              {isLoadingR2 ? (
                <div className="py-2.5 text-center text-xs text-slate-500 font-medium">
                  Memuat foto dari Cloudflare R2...
                </div>
              ) : r2Gallery.length > 0 ? (
                <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 max-h-32 overflow-y-auto p-1 bg-white rounded-xl border border-slate-200/80">
                  {r2Gallery.map((file) => {
                    const isSelected = editingRoom.imageUrl === file.url;
                    return (
                      <button
                        key={file.key}
                        type="button"
                        onClick={() => {
                          setEditingRoom({ ...editingRoom, imageUrl: file.url });
                          setFailedImageUrl(null);
                        }}
                        className={`relative aspect-square rounded-lg overflow-hidden border-2 transition cursor-pointer group ${
                          isSelected
                            ? "border-slate-900 ring-2 ring-slate-900/20 ring-offset-1"
                            : "border-slate-200 hover:border-slate-400"
                        }`}
                        title={file.name}
                      >
                        <img
                          src={file.url}
                          alt={file.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition"
                        />
                        {isSelected && (
                          <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center">
                            <CheckCircle2 className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <p className="text-[10px] text-slate-400 italic py-1">
                  Belum ada foto kamar di Cloudflare R2.
                </p>
              )}
            </div>
          </div>

          {/* Kolom Kanan: Form Input Tarif, Deskripsi, Fasilitas */}
          <div className="space-y-4">
            {/* Tarif Sewa per Malam */}
            <div className="space-y-1.5">
              <label
                htmlFor="room-price-input"
                className="text-xs font-bold text-slate-700 uppercase tracking-wider block"
              >
                Tarif Sewa per Malam (Rp)
              </label>
              <div className="flex items-center gap-2 bg-slate-50 border-2 border-slate-200 focus-within:border-slate-900 rounded-2xl px-4 py-2 transition-colors">
                <span className="text-sm font-black text-slate-500">Rp</span>
                <input
                  id="room-price-input"
                  type="number"
                  value={editingRoom.price}
                  onChange={(e) =>
                    setEditingRoom({
                      ...editingRoom,
                      price: Number(e.target.value),
                    })
                  }
                  className="w-full bg-transparent text-base sm:text-lg font-black text-slate-900 outline-none"
                />
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-500 px-0.5">
                <span>
                  DP Otomatis 50%:{" "}
                  <strong className="text-slate-900 font-bold">
                    Rp {(editingRoom.price * 0.5).toLocaleString("id-ID")}
                  </strong>
                </span>
                <span>Kapasitas: {editingRoom.capacity} Orang</span>
              </div>
            </div>

            {/* Deskripsi Kamar */}
            <div className="space-y-1.5">
              <label
                htmlFor="room-desc-input"
                className="text-xs font-bold text-slate-700 uppercase tracking-wider block"
              >
                Deskripsi Kamar
              </label>
              <textarea
                id="room-desc-input"
                rows={4}
                value={editingRoom.description}
                onChange={(e) =>
                  setEditingRoom({
                    ...editingRoom,
                    description: e.target.value,
                  })
                }
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm leading-relaxed text-slate-800 outline-none focus:border-slate-900 focus:bg-white focus:ring-2 focus:ring-slate-900/10 transition min-h-[110px] resize-y"
                placeholder="Tuliskan deskripsi keunggulan kamar..."
              />
            </div>

            {/* Fasilitas Kamar */}
            <div className="space-y-2 pt-1 border-t border-slate-100">
              <p className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Fasilitas Kamar Termasuk:
              </p>
              <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto pr-1">
                {editingRoom.facilities.map((fac) => (
                  <span
                    key={fac}
                    className="bg-slate-100 text-slate-800 border border-slate-200/80 text-xs font-medium px-2.5 py-1 rounded-lg flex items-center gap-1.5"
                  >
                    <Check className="w-3 h-3 text-slate-600 shrink-0" />
                    <span>{fac}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveFacility(fac)}
                      className="text-slate-400 hover:text-red-500 transition cursor-pointer ml-0.5"
                      title="Hapus Fasilitas"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>

              {/* Input Tambah Fasilitas */}
              <div className="flex gap-2 pt-0.5">
                <input
                  type="text"
                  placeholder="Tambah fasilitas baru..."
                  value={newFacilityInput}
                  onChange={(e) => setNewFacilityInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddFacility();
                    }
                  }}
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 outline-none focus:border-slate-900 focus:bg-white transition"
                />
                <button
                  type="button"
                  onClick={handleAddFacility}
                  className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold transition flex items-center gap-1 cursor-pointer shrink-0"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tambah</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-slate-100">
          <Button
            type="button"
            variant="outline"
            onClick={() => setEditingRoom(null)}
            className="rounded-xl border-slate-200/80 text-slate-700 hover:bg-slate-50 text-xs font-semibold h-10 px-5"
          >
            Batal
          </Button>
          <Button
            type="button"
            onClick={handleSaveEdit}
            className="rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold h-10 px-5 gap-2 shadow-xs cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Simpan Perubahan Kamar</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
