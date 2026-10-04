"use client";

import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/components/ui/image-upload";
import { Check, CheckCircle2, Cloud, Plus, RotateCw, Save, Trash2, X } from "lucide-react";
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
  if (!editingRoom) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[92vh] overflow-y-auto border border-purple-100 shadow-2xl p-5 sm:p-7 space-y-5 animate-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center font-black text-sm">
              #{editingRoom.code}
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-slate-900">
                Edit Spesifikasi Kamar #{editingRoom.code}
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                {editingRoom.buildingName} • {editingRoom.typeName}
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

        {/* Modal Body */}
        <div className="space-y-4">
          {/* Nama / Judul Kamar */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              Nama / Label Kamar
            </label>
            <input
              type="text"
              value={editingRoom.name}
              onChange={(e) => setEditingRoom({ ...editingRoom, name: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-800 outline-none focus:border-purple-600 focus:bg-white transition"
              placeholder="Contoh: Kamar #A1 (AC Superior)"
            />
          </div>

          {/* Upload Foto Kamar ke Cloudflare R2 */}
          <div className="space-y-3">
            <ImageUpload
              value={editingRoom.imageUrl}
              onChange={(newUrl) =>
                setEditingRoom((prev) =>
                  prev ? { ...prev, imageUrl: cleanImageUrl(newUrl) } : null,
                )
              }
              autoUpload={false}
              folder="/rooms"
              label={`Foto Utama Kamar #${editingRoom.code} (Cloudflare R2)`}
              description="Upload foto asli kamar untuk disimpan ke Cloudflare R2 atau pilih dari foto yang sudah terunggah."
            />

            {/* Galeri Foto dari Cloudflare R2 */}
            <div className="space-y-2 p-3 bg-purple-50/50 rounded-2xl border border-purple-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                  <Cloud className="w-3.5 h-3.5 text-purple-600" />
                  <span>Foto Tersedia di Cloudflare R2 ({r2Gallery.length})</span>
                </div>
                <button
                  type="button"
                  onClick={fetchR2Gallery}
                  className="text-[11px] text-purple-700 hover:text-purple-900 font-bold flex items-center gap-1 cursor-pointer"
                >
                  <RotateCw className={`w-3 h-3 ${isLoadingR2 ? "animate-spin" : ""}`} />
                  <span>Refresh R2</span>
                </button>
              </div>

              {isLoadingR2 ? (
                <div className="py-2 text-center text-xs text-purple-600 font-medium">
                  Memuat daftar foto dari Cloudflare R2...
                </div>
              ) : r2Gallery.length > 0 ? (
                <div className="space-y-1.5">
                  <p className="text-[10px] text-slate-500">
                    Klik salah satu foto di bawah untuk langsung dipasangkan pada Kamar #
                    {editingRoom.code}:
                  </p>
                  <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 max-h-32 overflow-y-auto p-1 bg-white rounded-xl border border-slate-200">
                    {r2Gallery.map((file) => {
                      const isSelected = editingRoom.imageUrl === file.url;
                      return (
                        <button
                          key={file.key}
                          type="button"
                          onClick={() => setEditingRoom({ ...editingRoom, imageUrl: file.url })}
                          className={`relative aspect-square rounded-lg overflow-hidden border-2 transition cursor-pointer group ${
                            isSelected
                              ? "border-purple-600 ring-2 ring-purple-600/30"
                              : "border-slate-200 hover:border-purple-300"
                          }`}
                          title={file.name}
                        >
                          <img
                            src={file.url}
                            alt={file.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition"
                          />
                          {isSelected && (
                            <div className="absolute inset-0 bg-purple-900/50 flex items-center justify-center">
                              <CheckCircle2 className="w-4 h-4 text-white" />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <p className="text-[10px] text-slate-400 italic">
                  Belum ada foto kamar di Cloudflare R2. Silakan upload menggunakan tombol di atas.
                </p>
              )}

              {editingRoom.imageUrl && (
                <div className="pt-1 flex items-center justify-between border-t border-purple-100">
                  <span className="text-[10px] text-slate-500">
                    Status: <strong className="text-emerald-700">Foto Terpasang</strong>
                  </span>
                  <button
                    type="button"
                    onClick={() => setEditingRoom({ ...editingRoom, imageUrl: "" })}
                    className="text-[11px] font-bold text-red-600 hover:text-red-700 flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Hapus Foto (Jadikan Kosong)</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Tarif Sewa per Malam */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              Tarif Sewa per Malam (Rp)
            </label>
            <div className="flex items-center gap-2 bg-slate-50 border-2 border-slate-200 focus-within:border-purple-600 rounded-2xl px-4 py-2.5">
              <span className="text-sm font-black text-slate-500">Rp</span>
              <input
                type="number"
                value={editingRoom.price}
                onChange={(e) =>
                  setEditingRoom({
                    ...editingRoom,
                    price: Number(e.target.value),
                  })
                }
                className="w-full bg-transparent text-base sm:text-lg font-black text-purple-700 outline-none"
              />
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-500 px-1">
              <span>
                DP Otomatis 50%:{" "}
                <strong className="text-purple-700 font-bold">
                  Rp {(editingRoom.price * 0.5).toLocaleString("id-ID")}
                </strong>
              </span>
              <span>Kapasitas: {editingRoom.capacity} Orang</span>
            </div>
          </div>

          {/* Deskripsi Kamar */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              Deskripsi Kamar
            </label>
            <textarea
              rows={3}
              value={editingRoom.description}
              onChange={(e) =>
                setEditingRoom({
                  ...editingRoom,
                  description: e.target.value,
                })
              }
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-medium text-slate-800 outline-none focus:border-purple-600 focus:bg-white transition"
              placeholder="Tuliskan deskripsi keunggulan kamar..."
            />
          </div>

          {/* Fasilitas Kamar */}
          <div className="space-y-2 pt-1 border-t border-slate-100">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              Fasilitas Kamar Termasuk:
            </label>
            <div className="flex flex-wrap gap-1.5">
              {editingRoom.facilities.map((fac) => (
                <span
                  key={fac}
                  className="bg-purple-50 text-purple-900 border border-purple-200/80 text-[11px] font-bold px-2.5 py-1 rounded-lg flex items-center gap-1.5"
                >
                  <Check className="w-3 h-3 text-purple-700 shrink-0" />
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
            <div className="flex gap-2 pt-1">
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
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 outline-none focus:border-purple-600 focus:bg-white transition"
              />
              <button
                type="button"
                onClick={handleAddFacility}
                className="px-3.5 py-2 bg-purple-100 hover:bg-purple-200 text-purple-900 rounded-xl text-xs font-bold transition flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tambah</span>
              </button>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-slate-100">
          <Button
            type="button"
            variant="outline"
            onClick={() => setEditingRoom(null)}
            className="rounded-2xl text-xs font-bold h-10 px-5"
          >
            Batal
          </Button>
          <Button
            type="button"
            onClick={handleSaveEdit}
            className="rounded-2xl bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold h-10 px-6 gap-2 shadow-md cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Simpan Perubahan Kamar</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
