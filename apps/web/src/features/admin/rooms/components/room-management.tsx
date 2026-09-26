"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Bed,
  Check,
  Edit3,
  ImagePlus,
  Plus,
  RotateCw,
  Save,
  Trash2,
  Wind,
  X,
  Sparkles,
  Building,
  CheckCircle2,
  Cloud,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ImageUpload, uploadBase64ToR2 } from "@/components/ui/image-upload";
import {
  useRoomTypes,
  useUpdateRoomRate,
  useRooms,
  useUpdateRoomImage,
} from "@/features/rooms/hooks/use-rooms";
import { apiClient } from "@/lib/api/client";

export interface MasterRoomItem {
  id: string;
  code: string;
  name: string;
  building: "A" | "B";
  buildingName: string;
  type: "ac" | "kipas";
  typeName: string;
  price: number;
  imageUrl: string;
  description: string;
  facilities: string[];
  capacity: number;
  bedType: string;
}

// Fungsi sanitasi: hapus semua foto dummy bawaan dan URL rusak agar benar-benar kosong
export function cleanImageUrl(url?: string): string {
  if (!url) return "";
  const trimmed = url.trim();
  if (
    trimmed.includes("/rooms/room-") ||
    trimmed.startsWith("/images/") ||
    trimmed === "/rooms/room-ac-101.jpg" ||
    trimmed === "/rooms/room-ac-102.jpg" ||
    trimmed === "/rooms/room-kipas-201.jpg" ||
    trimmed === "/rooms/room-kipas-202.jpg"
  ) {
    return "";
  }
  return trimmed;
}

const DEFAULT_MASTER_ROOMS: MasterRoomItem[] = [
  // BANGUNAN A (SISI KIRI) - 2 AC & 2 KIPAS (SEMUA FOTO DUMMY DIHAPUS, BERIKAN KOSONG)
  {
    id: "room-a1",
    code: "A1",
    name: "Kamar #A1 (AC)",
    building: "A",
    buildingName: "Bangunan A (Sisi Kiri)",
    type: "ac",
    typeName: "Kamar Tipe AC",
    price: 275000,
    imageUrl: "",
    description: "Kamar berpendingin AC sejuk dan tenang, cocok untuk transit penerbangan Bandara Pattimura Ambon.",
    facilities: ["AC Split 1 PK", "Kasur Queen 160x200", "Kamar Mandi Dalam", "Shower Air Hangat", "Smart TV & WiFi", "Handuk & Toiletries"],
    capacity: 2,
    bedType: "Queen Bed",
  },
  {
    id: "room-a2",
    code: "A2",
    name: "Kamar #A2 (AC)",
    building: "A",
    buildingName: "Bangunan A (Sisi Kiri)",
    type: "ac",
    typeName: "Kamar Tipe AC",
    price: 275000,
    imageUrl: "",
    description: "Kamar AC nyaman dengan akses cepat ke front desk, fasilitas lengkap untuk istirahat optimal.",
    facilities: ["AC Split 1 PK", "Kasur Queen 160x200", "Kamar Mandi Dalam", "Shower Air Hangat", "Smart TV & WiFi", "Handuk & Toiletries"],
    capacity: 2,
    bedType: "Queen Bed",
  },
  {
    id: "room-a3",
    code: "A3",
    name: "Kamar #A3 (Kipas)",
    building: "A",
    buildingName: "Bangunan A (Sisi Kiri)",
    type: "kipas",
    typeName: "Kamar Tipe Kipas",
    price: 200000,
    imageUrl: "",
    description: "Kamar hemat dengan sirkulasi udara alami dan kipas angin dinding, bersih dan higienis.",
    facilities: ["Kipas Angin Dinding", "Kasur Queen 160x200", "Kamar Mandi Dalam", "Smart TV & WiFi", "Handuk & Toiletries", "Meja & Lemari"],
    capacity: 2,
    bedType: "Queen Bed",
  },
  {
    id: "room-a4",
    code: "A4",
    name: "Kamar #A4 (Kipas)",
    building: "A",
    buildingName: "Bangunan A (Sisi Kiri)",
    type: "kipas",
    typeName: "Kamar Tipe Kipas",
    price: 200000,
    imageUrl: "",
    description: "Pilihan ekonomis transit bandara dengan kasur empuk dan fasilitas kamar mandi dalam.",
    facilities: ["Kipas Angin Dinding", "Kasur Queen 160x200", "Kamar Mandi Dalam", "Smart TV & WiFi", "Handuk & Toiletries", "Meja & Lemari"],
    capacity: 2,
    bedType: "Queen Bed",
  },

  // BANGUNAN B (SISI KANAN) - 2 AC & 2 KIPAS
  {
    id: "room-b1",
    code: "B1",
    name: "Kamar #B1 (AC)",
    building: "B",
    buildingName: "Bangunan B (Sisi Kanan)",
    type: "ac",
    typeName: "Kamar Tipe AC",
    price: 275000,
    imageUrl: "",
    description: "Kamar AC bangunan kanan dengan suasana privat dan hening, dilengkapi kasur premium.",
    facilities: ["AC Split 1 PK", "Kasur Queen 160x200", "Kamar Mandi Dalam", "Shower Air Hangat", "Smart TV & WiFi", "Handuk & Toiletries"],
    capacity: 2,
    bedType: "Queen Bed",
  },
  {
    id: "room-b2",
    code: "B2",
    name: "Kamar #B2 (AC)",
    building: "B",
    buildingName: "Bangunan B (Sisi Kanan)",
    type: "ac",
    typeName: "Kamar Tipe AC",
    price: 275000,
    imageUrl: "",
    description: "Kamar AC bersih dengan ventilasi yang baik, sangat dekat dengan area parkir.",
    facilities: ["AC Split 1 PK", "Kasur Queen 160x200", "Kamar Mandi Dalam", "Shower Air Hangat", "Smart TV & WiFi", "Handuk & Toiletries"],
    capacity: 2,
    bedType: "Queen Bed",
  },
  {
    id: "room-b3",
    code: "B3",
    name: "Kamar #B3 (Kipas)",
    building: "B",
    buildingName: "Bangunan B (Sisi Kanan)",
    type: "kipas",
    typeName: "Kamar Tipe Kipas",
    price: 200000,
    imageUrl: "",
    description: "Kamar kipas angin bangunan kanan yang sejuk, bersih, dan hemat biaya.",
    facilities: ["Kipas Angin Dinding", "Kasur Queen 160x200", "Kamar Mandi Dalam", "Smart TV & WiFi", "Handuk & Toiletries", "Meja & Lemari"],
    capacity: 2,
    bedType: "Queen Bed",
  },
  {
    id: "room-b4",
    code: "B4",
    name: "Kamar #B4 (Kipas)",
    building: "B",
    buildingName: "Bangunan B (Sisi Kanan)",
    type: "kipas",
    typeName: "Kamar Tipe Kipas",
    price: 200000,
    imageUrl: "",
    description: "Pilihan kamar ekonomis bagi backpacker atau transit singkat sebelum penerbangan.",
    facilities: ["Kipas Angin Dinding", "Kasur Queen 160x200", "Kamar Mandi Dalam", "Smart TV & WiFi", "Handuk & Toiletries", "Meja & Lemari"],
    capacity: 2,
    bedType: "Queen Bed",
  },
];

const LOCAL_STORAGE_KEY = "annisa_master_rooms_v3";

export function RoomManagement() {
  const { data: serverTypes, isLoading, refetch } = useRoomTypes();
  const { data: serverRooms } = useRooms();
  const updateRoomRateMutation = useUpdateRoomRate();
  const updateRoomImageMutation = useUpdateRoomImage();

  // Inisialisasi awal langsung membersihkan foto dummy dari localStorage
  const [rooms, setRooms] = useState<MasterRoomItem[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            return parsed.map((r) => ({
              ...r,
              imageUrl: cleanImageUrl(r.imageUrl),
            }));
          }
        }
      } catch {
        // fallback
      }
    }
    return DEFAULT_MASTER_ROOMS;
  });

  const [editingRoom, setEditingRoom] = useState<MasterRoomItem | null>(null);
  const [newFacilityInput, setNewFacilityInput] = useState<string>("");
  const [filterBuilding, setFilterBuilding] = useState<"all" | "A" | "B">("all");
  const [r2Gallery, setR2Gallery] = useState<Array<{ key: string; name: string; url: string; size?: number }>>([]);
  const [isLoadingR2, setIsLoadingR2] = useState<boolean>(false);

  // Ambil galeri foto dari Cloudflare R2 yang tersimpan di bucket
  const fetchR2Gallery = async () => {
    try {
      setIsLoadingR2(true);
      const res = await apiClient.get<Array<{ key: string; name: string; url: string; size?: number }>>(
        "/storage/list?prefix=rooms"
      );
      if (Array.isArray(res)) {
        setR2Gallery(res);
      }
    } catch (e) {
      console.error("Gagal memuat galeri Cloudflare R2:", e);
    } finally {
      setIsLoadingR2(false);
    }
  };

  // Sync with localStorage, server types, and server rooms (database R2 images)
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      let currentRooms = DEFAULT_MASTER_ROOMS;

      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          currentRooms = parsed.map((r) => ({
            ...r,
            imageUrl: cleanImageUrl(r.imageUrl),
          }));
        }
      }

      // Sinkronkan foto langsung dari database server jika ada
      if (serverRooms && serverRooms.length > 0) {
        currentRooms = currentRooms.map((r) => {
          const matchedDb = serverRooms.find(
            (sr: any) => sr.roomNumber?.toUpperCase() === r.code.toUpperCase(),
          );
          if (matchedDb && (matchedDb as any).imageUrl) {
            const dbImg = cleanImageUrl((matchedDb as any).imageUrl);
            if (dbImg) {
              return { ...r, imageUrl: dbImg };
            }
          }
          return r;
        });
      }

      if (serverTypes && serverTypes.length > 0) {
        const acType = serverTypes.find((t) => t.slug.includes("ac"));
        const kipasType = serverTypes.find((t) => !t.slug.includes("ac"));

        currentRooms = currentRooms.map((r) => {
          const matchType = r.type === "ac" ? acType : kipasType;
          if (matchType) {
            return {
              ...r,
              // Only sync price and facilities from server. Leave imageUrl as is!
              price: matchType.basePrice || r.price,
              facilities:
                Array.isArray(matchType.facilities) && matchType.facilities.length > 0
                  ? matchType.facilities
                  : r.facilities,
            };
          }
          return r;
        });
      }

      setRooms(currentRooms);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(currentRooms));
    } catch {
      // fallback
    }
  }, [serverTypes, serverRooms]);


  // Muat galeri R2 saat komponen pertama kali dibuka
  useEffect(() => {
    fetchR2Gallery();
  }, []);

  // Save to local storage whenever rooms state changes
  const saveRoomsLocally = (updatedRooms: MasterRoomItem[]) => {
    const cleaned = updatedRooms.map((r) => ({
      ...r,
      imageUrl: cleanImageUrl(r.imageUrl),
    }));
    setRooms(cleaned);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cleaned));
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("storage"));
      }
    } catch {
      // ignore
    }
  };

  // Open Edit Modal for a specific room
  const handleOpenEdit = (room: MasterRoomItem) => {
    setEditingRoom({ ...room, imageUrl: cleanImageUrl(room.imageUrl) });
    setNewFacilityInput("");
    fetchR2Gallery();
  };

  // Save edited room
  const handleSaveEdit = async () => {
    if (!editingRoom) return;
    
    let finalImageUrl = cleanImageUrl(editingRoom.imageUrl);
    if (finalImageUrl.startsWith("data:")) {
      toast.loading("Mengunggah foto kamar ke Cloudflare R2...", { id: "upload-room-img" });
      try {
        const generateSlug = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        const slugPrefix = generateSlug(editingRoom.typeName);

        finalImageUrl = await uploadBase64ToR2(
          finalImageUrl,
          `room-${Date.now()}.jpg`,
          "/rooms",
          slugPrefix
        );
        toast.success("Foto kamar berhasil diunggah ke Cloudflare R2!", { id: "upload-room-img" });
        fetchR2Gallery();
      } catch (error: any) {
        toast.error("Gagal mengunggah foto: " + error.message, { id: "upload-room-img" });
        return;
      }
    }

    const updatedRooms = rooms.map((r) =>
      r.code === editingRoom.code ? { ...editingRoom, imageUrl: finalImageUrl } : r,
    );
    saveRoomsLocally(updatedRooms);

    // 1. Simpan foto ke database backend (agar tersinkronisasi permanen ke PostgreSQL & Cloudflare R2)
    try {
      await updateRoomImageMutation.mutateAsync({
        roomNumber: editingRoom.code,
        imageUrl: finalImageUrl,
      });
    } catch (e) {
      console.warn("Gagal simpan foto kamar ke database:", e);
    }

    // 2. Sync to backend room rate mutation if type is matched
    try {
      if (serverTypes && serverTypes.length > 0) {
        const targetType = serverTypes.find((st) =>
          editingRoom.type === "ac" ? st.slug.includes("ac") : !st.slug.includes("ac"),
        );
        if (targetType) {
          await updateRoomRateMutation.mutateAsync({
            id: targetType.id,
            input: {
              basePrice: editingRoom.price,
              facilities: editingRoom.facilities,
            },
          });
        }
      }
      toast.success(
        `Spesifikasi & Tarif Kamar #${editingRoom.code} berhasil diperbarui!`,
      );
    } catch {
      toast.success(
        `Spesifikasi Kamar #${editingRoom.code} berhasil disimpan!`,
      );
    }

    setEditingRoom(null);
  };


  // Add facility inside edit modal
  const handleAddFacility = () => {
    if (!editingRoom) return;
    const text = newFacilityInput.trim();
    if (!text) return;
    if (editingRoom.facilities.includes(text)) {
      toast.info("Fasilitas tersebut sudah ada.");
      return;
    }
    setEditingRoom({
      ...editingRoom,
      facilities: [...editingRoom.facilities, text],
    });
    setNewFacilityInput("");
  };

  // Remove facility inside edit modal
  const handleRemoveFacility = (facToRemove: string) => {
    if (!editingRoom) return;
    setEditingRoom({
      ...editingRoom,
      facilities: editingRoom.facilities.filter((f) => f !== facToRemove),
    });
  };

  // Bersihkan semua foto dummy di seluruh kamar
  const handleClearAllDummyImages = () => {
    const cleared = rooms.map((r) => ({
      ...r,
      imageUrl: cleanImageUrl(r.imageUrl),
    }));
    saveRoomsLocally(cleared);
    toast.success("Semua foto dummy telah dibersihkan. Kamar tanpa foto kustom kini berstatus kosong.");
  };

  // Reset to default
  const handleResetDefault = () => {
    saveRoomsLocally(DEFAULT_MASTER_ROOMS);
    refetch();
    toast.success("Data 8 kamar berhasil di-reset ke standar (tanpa foto dummy)!");
  };

  const filteredRooms =
    filterBuilding === "all"
      ? rooms
      : rooms.filter((r) => r.building === filterBuilding);

  const roomsA = filteredRooms.filter((r) => r.building === "A");
  const roomsB = filteredRooms.filter((r) => r.building === "B");

  return (
    <div className="space-y-6">
      {/* 1. Header Info & Aksi Global */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 sm:p-5 rounded-3xl border border-slate-200 shadow-2xs">
        <div>
          <span className="bg-purple-100 text-purple-800 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            Pengaturan Master Tarif, Foto &amp; Kamar
          </span>
          <h2 className="text-base sm:text-lg font-black text-slate-900 leading-tight mt-1">
            Kelola 8 Kamar &amp; Tarif Sewa
          </h2>
          <p className="text-xs text-slate-500">
            Klik tombol <strong>Edit</strong> pada kartu kamar untuk mengubah foto Cloudflare R2, judul, tarif sewa, serta fasilitas kamar.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleClearAllDummyImages}
            title="Kosongkan semua foto dummy kamar"
            className="p-2 sm:px-3 rounded-2xl border border-purple-200 bg-purple-50 hover:bg-purple-100 text-purple-800 transition cursor-pointer shadow-2xs flex items-center gap-1.5"
          >
            <Trash2 className="w-3.5 h-3.5 text-purple-700" />
            <span className="text-xs font-black">Hapus Foto Dummy</span>
          </button>

          <button
            type="button"
            onClick={handleResetDefault}
            title="Reset ke Standar"
            className="p-2 sm:px-3 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition cursor-pointer shadow-2xs flex items-center gap-1.5"
          >
            <RotateCw
              className={`w-3.5 h-3.5 ${isLoading ? "animate-spin text-purple-700" : ""}`}
            />
            <span className="text-xs font-black">Reset Standar</span>
          </button>
        </div>
      </div>


      {/* 2. Filter Bangunan Pill Bar */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
        <button
          type="button"
          onClick={() => setFilterBuilding("all")}
          className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
            filterBuilding === "all"
              ? "bg-purple-700 text-white shadow-2xs font-extrabold"
              : "bg-white text-slate-600 hover:bg-purple-50 border border-purple-100"
          }`}
        >
          Semua Kamar (8 Unit)
        </button>

        <button
          type="button"
          onClick={() => setFilterBuilding("A")}
          className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
            filterBuilding === "A"
              ? "bg-purple-700 text-white shadow-2xs font-extrabold"
              : "bg-white text-slate-700 hover:bg-purple-50 border border-purple-100"
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-purple-600" />
          <span>Bangunan A (4 Kamar: 2 AC • 2 Kipas)</span>
        </button>

        <button
          type="button"
          onClick={() => setFilterBuilding("B")}
          className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
            filterBuilding === "B"
              ? "bg-purple-700 text-white shadow-2xs font-extrabold"
              : "bg-white text-slate-700 hover:bg-purple-50 border border-purple-100"
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-indigo-600" />
          <span>Bangunan B (4 Kamar: 2 AC • 2 Kipas)</span>
        </button>
      </div>

      {/* 3. Grid 8 Kamar Terbagi 2 Bangunan */}
      <div className="space-y-8">
        {/* Bangunan A Section */}
        {(filterBuilding === "all" || filterBuilding === "A") && (
          <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-700" />
                <h3 className="font-extrabold text-sm sm:text-base text-slate-900 tracking-tight">
                  Bangunan A (Sisi Kiri)
                </h3>
              </div>
              <span className="text-xs font-bold text-slate-400">
                2 Kamar AC • 2 Kamar Kipas
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {roomsA.map((room) => (
                <RoomMasterCard
                  key={room.code}
                  room={room}
                  onEdit={() => handleOpenEdit(room)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Bangunan B Section */}
        {(filterBuilding === "all" || filterBuilding === "B") && (
          <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-700" />
                <h3 className="font-extrabold text-sm sm:text-base text-slate-900 tracking-tight">
                  Bangunan B (Sisi Kanan)
                </h3>
              </div>
              <span className="text-xs font-bold text-slate-400">
                2 Kamar AC • 2 Kamar Kipas
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {roomsB.map((room) => (
                <RoomMasterCard
                  key={room.code}
                  room={room}
                  onEdit={() => handleOpenEdit(room)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 4. Modal Edit Spesifikasi, Foto & Tarif Kamar */}
      {editingRoom && (
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
                  onChange={(e) =>
                    setEditingRoom({ ...editingRoom, name: e.target.value })
                  }
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
                        Klik salah satu foto di bawah untuk langsung dipasangkan pada Kamar #{editingRoom.code}:
                      </p>
                      <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 max-h-32 overflow-y-auto p-1 bg-white rounded-xl border border-slate-200">
                        {r2Gallery.map((file) => {
                          const isSelected = editingRoom.imageUrl === file.url;
                          return (
                            <button
                              key={file.key}
                              type="button"
                              onClick={() =>
                                setEditingRoom({ ...editingRoom, imageUrl: file.url })
                              }
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
      )}
    </div>
  );
}

// Subcomponent: Kartu Satuan Kamar Master
function RoomMasterCard({
  room,
  onEdit,
}: {
  room: MasterRoomItem;
  onEdit: () => void;
}) {
  const isAc = room.type === "ac";

  return (
    <div className="bg-white rounded-3xl border-2 border-purple-100 hover:border-purple-300 transition-all p-4 shadow-2xs flex flex-col justify-between group space-y-3">
      {/* Top Code Badge & Building */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-2xl bg-purple-100 text-purple-900 font-black text-xs flex items-center justify-center shadow-2xs">
            #{room.code}
          </div>
          <div>
            <h4 className="text-xs font-black text-slate-900 leading-tight">
              {room.name}
            </h4>
            <span className="text-[10px] text-slate-400 font-bold block">
              {room.buildingName}
            </span>
          </div>
        </div>

        <span
          className={`p-1.5 rounded-xl border flex items-center justify-center ${
            isAc
              ? "bg-purple-50 text-purple-700 border-purple-200"
              : "bg-indigo-50 text-indigo-700 border-indigo-200"
          }`}
          title={room.typeName}
        >
          {isAc ? <Wind className="w-3.5 h-3.5" /> : <Bed className="w-3.5 h-3.5" />}
        </span>
      </div>

      {/* Room Photo Preview */}
      <div className="relative w-full h-32 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-2xs">
        {room.imageUrl ? (
          <img
            src={room.imageUrl}
            alt={room.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-purple-50 via-purple-100/40 to-slate-100 flex flex-col items-center justify-center gap-1.5 text-purple-700/60 p-3">
            {isAc ? <Wind className="w-6 h-6 stroke-[1.5]" /> : <Bed className="w-6 h-6 stroke-[1.5]" />}
            <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
              Kosong (Belum Ada Foto)
            </span>
          </div>
        )}
        <div className="absolute bottom-1.5 left-1.5 bg-slate-950/75 backdrop-blur-xs px-2 py-0.5 rounded-md text-[9px] text-white font-bold">
          {room.typeName}
        </div>
      </div>

      {/* Price & Facilities Preview */}
      <div className="space-y-1.5">
        <div className="flex items-baseline justify-between">
          <span className="text-[10px] text-slate-400 font-bold uppercase">
            Tarif Sewa:
          </span>
          <span className="text-xs font-black text-purple-700">
            Rp {room.price.toLocaleString("id-ID")}{" "}
            <span className="text-[10px] text-slate-400 font-normal">/mlm</span>
          </span>
        </div>

        {/* Short facilities tags (first 3) */}
        <div className="flex flex-wrap gap-1">
          {room.facilities.slice(0, 3).map((f) => (
            <span
              key={f}
              className="text-[9px] font-bold bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded-md truncate max-w-[120px]"
            >
              {f}
            </span>
          ))}
          {room.facilities.length > 3 && (
            <span className="text-[9px] font-bold bg-purple-50 text-purple-700 px-1.5 py-0.5 rounded-md">
              +{room.facilities.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Edit Action Button */}
      <Button
        type="button"
        onClick={onEdit}
        className="w-full rounded-2xl bg-purple-50 hover:bg-purple-700 text-purple-900 hover:text-white border border-purple-200 text-xs font-bold h-9 gap-1.5 transition-colors cursor-pointer mt-1"
      >
        <Edit3 className="w-3.5 h-3.5" />
        <span>Edit Kamar &amp; Tarif</span>
      </Button>
    </div>
  );
}
