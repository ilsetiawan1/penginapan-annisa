"use client";

import { Bed, Check, Plus, RotateCw, Save, Trash2, Wind } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/components/ui/image-upload";
import { useRoomTypes, useUpdateRoomRate } from "@/features/rooms/hooks/use-rooms";

interface LocalRoomTypeState {
  id: string;
  name: string;
  basePrice: number;
  capacity: number;
  bedType: string;
  facilities: string[];
  imageUrl: string;
  roomCodes: string[];
  unitCount: number;
}

export function RoomManagement() {
  const { data: serverTypes, isLoading, refetch } = useRoomTypes();
  const updateRoomRateMutation = useUpdateRoomRate();

  const [types, setTypes] = useState<LocalRoomTypeState[]>([]);
  const [newFacilityInputs, setNewFacilityInputs] = useState<Record<string, string>>({});

  useEffect(() => {
    if (serverTypes && serverTypes.length > 0) {
      setTypes(
        serverTypes.map((st) => {
          const isAc = st.slug.includes("ac");
          const roomCodes = isAc
            ? ["#A1", "#A2", "#B1", "#B2"]
            : ["#A3", "#A4", "#B3", "#B4"];
          const primaryImage =
            st.images && st.images.length > 0
              ? st.images[0].imageUrl
              : isAc
                ? "/images/kamar-ac.png"
                : "/images/kamar-kipas.png";

          return {
            id: st.id,
            name: st.name,
            basePrice: st.basePrice,
            capacity: st.capacity,
            bedType: st.bedType,
            facilities: Array.isArray(st.facilities) ? st.facilities : [],
            imageUrl: primaryImage,
            roomCodes,
            unitCount: 4,
          };
        }),
      );
    }
  }, [serverTypes]);

  const handlePriceChange = (id: string, newPrice: number) => {
    setTypes((prev) =>
      prev.map((t) => (t.id === id ? { ...t, basePrice: newPrice } : t)),
    );
  };

  const handleImageChange = (id: string, newImageUrl: string) => {
    setTypes((prev) =>
      prev.map((t) => (t.id === id ? { ...t, imageUrl: newImageUrl } : t)),
    );
  };

  const handleAddFacility = (id: string) => {
    const text = newFacilityInputs[id]?.trim();
    if (!text) return;

    setTypes((prev) =>
      prev.map((t) =>
        t.id === id && !t.facilities.includes(text)
          ? { ...t, facilities: [...t.facilities, text] }
          : t,
      ),
    );

    setNewFacilityInputs((prev) => ({ ...prev, [id]: "" }));
  };

  const handleRemoveFacility = (id: string, facToRemove: string) => {
    setTypes((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, facilities: t.facilities.filter((f) => f !== facToRemove) }
          : t,
      ),
    );
  };

  const handleSaveAll = async () => {
    try {
      for (const t of types) {
        await updateRoomRateMutation.mutateAsync({
          id: t.id,
          input: {
            basePrice: t.basePrice,
            facilities: t.facilities,
          },
        });
      }
      toast.success("Semua tarif dan spesifikasi kamar berhasil disimpan ke database!");
    } catch {
      toast.error("Gagal menyimpan perubahan ke database.");
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header Info */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 sm:p-5 rounded-3xl border border-slate-200 shadow-2xs">
        <div>
          <span className="bg-purple-100 text-purple-800 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            Pengaturan Master Tarif &amp; Galeri
          </span>
          <h2 className="text-base sm:text-lg font-black text-slate-900 leading-tight mt-1">
            Pengaturan Tarif, Fasilitas &amp; Foto 8 Kamar
          </h2>
          <p className="text-xs text-slate-500">
            Perubahan harga dan foto di sini terhubung langsung ke ImageKit CDN, database PostgreSQL, dan portal publik.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => refetch()}
            title="Refresh Data Tarif"
            className="p-2 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-purple-50 text-slate-600 hover:text-purple-700 transition cursor-pointer shadow-2xs flex items-center gap-1.5"
          >
            <RotateCw
              className={`w-4 h-4 ${isLoading ? "animate-spin text-purple-700" : ""}`}
            />
            <span className="text-xs font-black hidden sm:inline">Refresh</span>
          </button>

          <Button
            type="button"
            disabled={updateRoomRateMutation.isPending}
            onClick={handleSaveAll}
            className="rounded-2xl bg-purple-700 hover:bg-purple-800 text-white font-black text-xs sm:text-sm h-11 px-6 gap-2 shadow-md cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>{updateRoomRateMutation.isPending ? "Menyimpan..." : "Simpan Perubahan"}</span>
          </Button>
        </div>
      </div>

      {/* 2 Tipe Kamar Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {types.map((type) => (
          <div
            key={type.id}
            className="bg-white rounded-3xl border-2 border-purple-200/90 p-5 sm:p-6 shadow-2xs space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded-md">
                    {type.unitCount} Unit Kamar
                  </span>
                  <h3 className="text-base font-black text-slate-900 mt-1">
                    {type.name}
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-700 border border-purple-200 flex items-center justify-center">
                  {type.name.toLowerCase().includes("ac") ? (
                    <Wind className="w-5 h-5" />
                  ) : (
                    <Bed className="w-5 h-5" />
                  )}
                </div>
              </div>

              {/* Upload Foto Kamar ke ImageKit CDN */}
              <div className="pt-1">
                <ImageUpload
                  value={type.imageUrl}
                  onChange={(newUrl) => handleImageChange(type.id, newUrl)}
                  folder="/rooms"
                  label="Foto Utama Kamar (ImageKit CDN)"
                  description="Upload foto asli kamar untuk ditampilkan di website publik."
                />
              </div>

              {/* Daftar Unit Kamar yang Menggunakan Tipe Ini */}
              <div className="space-y-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">
                  Nomor Unit Kamar:
                </span>
                <div className="flex gap-1.5">
                  {type.roomCodes.map((code) => (
                    <span
                      key={code}
                      className="bg-purple-100/70 text-purple-900 text-xs font-black px-2.5 py-1 rounded-xl"
                    >
                      {code}
                    </span>
                  ))}
                </div>
              </div>

              {/* Input Edit Harga */}
              <div className="space-y-1.5 pt-2">
                <label
                  htmlFor={`price-${type.id}`}
                  className="text-[11px] font-black text-slate-700 uppercase tracking-wider block"
                >
                  Tarif Sewa per Malam (Rp)
                </label>
                <div className="flex items-center gap-2 bg-slate-50 border-2 border-slate-200 focus-within:border-purple-600 rounded-2xl px-4 py-2.5">
                  <span className="text-sm font-black text-slate-500">Rp</span>
                  <input
                    id={`price-${type.id}`}
                    type="number"
                    value={type.basePrice}
                    onChange={(e) =>
                      handlePriceChange(type.id, Number(e.target.value))
                    }
                    className="w-full bg-transparent text-lg font-black text-purple-700 outline-none"
                  />
                </div>
                <p className="text-[10px] text-slate-500">
                  DP Otomatis 50%:{" "}
                  <strong className="text-purple-700 font-bold">
                    Rp {(type.basePrice * 0.5).toLocaleString("id-ID")}
                  </strong>
                </p>
              </div>

              {/* Fasilitas Kamar */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <span className="text-[11px] font-black text-slate-700 uppercase tracking-wider block">
                  Fasilitas Kamar Termasuk:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {type.facilities.map((fac) => (
                    <span
                      key={fac}
                      className="bg-purple-50 text-purple-900 border border-purple-100 text-[11px] font-bold px-2.5 py-1 rounded-lg flex items-center gap-1.5"
                    >
                      <Check className="w-3 h-3 text-purple-700 shrink-0" />
                      <span>{fac}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveFacility(type.id, fac)}
                        className="text-slate-400 hover:text-red-500 transition cursor-pointer"
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
                    value={newFacilityInputs[type.id] || ""}
                    onChange={(e) =>
                      setNewFacilityInputs((prev) => ({
                        ...prev,
                        [type.id]: e.target.value,
                      }))
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddFacility(type.id);
                      }
                    }}
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-800 outline-none focus:border-purple-600 focus:bg-white transition"
                  />
                  <button
                    type="button"
                    onClick={() => handleAddFacility(type.id)}
                    className="px-3 py-1.5 bg-purple-100 hover:bg-purple-200 text-purple-900 rounded-xl text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Tambah</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

