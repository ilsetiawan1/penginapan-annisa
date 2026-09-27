"use client";

import { uploadBase64ToR2 } from "@/components/ui/image-upload";
import {
  useRoomTypes,
  useRooms,
  useUpdateRoomImage,
  useUpdateRoomRate,
} from "@/features/rooms/hooks/use-rooms";
import { apiClient } from "@/lib/api/client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { RoomEditModal } from "./room-edit-modal";
import { RoomManagementFilter } from "./room-management-filter";
import { RoomManagementHeader } from "./room-management-header";
import { type MasterRoomItem, RoomMasterCard, cleanImageUrl } from "./room-master-card";

export { cleanImageUrl, type MasterRoomItem };

const DEFAULT_MASTER_ROOMS: MasterRoomItem[] = [
  // BANGUNAN A (SISI KIRI) - 2 AC & 2 KIPAS
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
    description:
      "Kamar berpendingin AC sejuk dan tenang, cocok untuk transit penerbangan Bandara Pattimura Ambon.",
    facilities: [
      "AC Split 1 PK",
      "Kasur Queen 160x200",
      "Kamar Mandi Dalam",
      "Shower Air Hangat",
      "Smart TV & WiFi",
      "Handuk & Toiletries",
    ],
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
    description:
      "Kamar AC nyaman dengan akses cepat ke front desk, fasilitas lengkap untuk istirahat optimal.",
    facilities: [
      "AC Split 1 PK",
      "Kasur Queen 160x200",
      "Kamar Mandi Dalam",
      "Shower Air Hangat",
      "Smart TV & WiFi",
      "Handuk & Toiletries",
    ],
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
    description:
      "Kamar hemat dengan sirkulasi udara alami dan kipas angin dinding, bersih dan higienis.",
    facilities: [
      "Kipas Angin Dinding",
      "Kasur Queen 160x200",
      "Kamar Mandi Dalam",
      "Smart TV & WiFi",
      "Handuk & Toiletries",
      "Meja & Lemari",
    ],
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
    description:
      "Pilihan ekonomis transit bandara dengan kasur empuk dan fasilitas kamar mandi dalam.",
    facilities: [
      "Kipas Angin Dinding",
      "Kasur Queen 160x200",
      "Kamar Mandi Dalam",
      "Smart TV & WiFi",
      "Handuk & Toiletries",
      "Meja & Lemari",
    ],
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
    description:
      "Kamar AC bangunan kanan dengan suasana privat dan hening, dilengkapi kasur premium.",
    facilities: [
      "AC Split 1 PK",
      "Kasur Queen 160x200",
      "Kamar Mandi Dalam",
      "Shower Air Hangat",
      "Smart TV & WiFi",
      "Handuk & Toiletries",
    ],
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
    facilities: [
      "AC Split 1 PK",
      "Kasur Queen 160x200",
      "Kamar Mandi Dalam",
      "Shower Air Hangat",
      "Smart TV & WiFi",
      "Handuk & Toiletries",
    ],
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
    facilities: [
      "Kipas Angin Dinding",
      "Kasur Queen 160x200",
      "Kamar Mandi Dalam",
      "Smart TV & WiFi",
      "Handuk & Toiletries",
      "Meja & Lemari",
    ],
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
    facilities: [
      "Kipas Angin Dinding",
      "Kasur Queen 160x200",
      "Kamar Mandi Dalam",
      "Smart TV & WiFi",
      "Handuk & Toiletries",
      "Meja & Lemari",
    ],
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
  const [r2Gallery, setR2Gallery] = useState<
    Array<{ key: string; name: string; url: string; size?: number }>
  >([]);
  const [isLoadingR2, setIsLoadingR2] = useState<boolean>(false);

  const fetchR2Gallery = async () => {
    try {
      setIsLoadingR2(true);
      const res = await apiClient.get<
        Array<{ key: string; name: string; url: string; size?: number }>
      >("/storage/list?prefix=rooms");
      if (Array.isArray(res)) {
        setR2Gallery(res);
      }
    } catch (e) {
      console.error("Gagal memuat galeri Cloudflare R2:", e);
    } finally {
      setIsLoadingR2(false);
    }
  };

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

      if (serverRooms && serverRooms.length > 0) {
        currentRooms = currentRooms.map((r) => {
          const matchedDb = serverRooms.find(
            (sr: any) => sr.roomNumber?.toUpperCase() === r.code.toUpperCase(),
          );
          if (matchedDb) {
            const dbImg = cleanImageUrl((matchedDb as any).imageUrl);
            return { ...r, imageUrl: dbImg || "" };
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

  useEffect(() => {
    fetchR2Gallery();
  }, []);

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

  const handleOpenEdit = (room: MasterRoomItem) => {
    setEditingRoom({ ...room, imageUrl: cleanImageUrl(room.imageUrl) });
    setNewFacilityInput("");
    fetchR2Gallery();
  };

  const handleSaveEdit = async () => {
    if (!editingRoom) return;

    let finalImageUrl = cleanImageUrl(editingRoom.imageUrl);
    if (finalImageUrl.startsWith("data:")) {
      toast.loading("Mengunggah foto kamar ke Cloudflare R2...", {
        id: "upload-room-img",
      });
      try {
        const generateSlug = (text: string) =>
          text
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");
        const slugPrefix = generateSlug(editingRoom.typeName);

        finalImageUrl = await uploadBase64ToR2(
          finalImageUrl,
          `room-${Date.now()}.jpg`,
          "/rooms",
          slugPrefix,
        );
        toast.success("Foto kamar berhasil diunggah ke Cloudflare R2!", {
          id: "upload-room-img",
        });
        fetchR2Gallery();
      } catch (error: any) {
        toast.error("Gagal mengunggah foto: " + error.message, {
          id: "upload-room-img",
        });
        return;
      }
    }

    const updatedRooms = rooms.map((r) =>
      r.code === editingRoom.code ? { ...editingRoom, imageUrl: finalImageUrl } : r,
    );
    saveRoomsLocally(updatedRooms);

    try {
      await updateRoomImageMutation.mutateAsync({
        roomNumber: editingRoom.code,
        imageUrl: finalImageUrl,
      });
    } catch (e) {
      console.warn("Gagal simpan foto kamar ke database:", e);
    }

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
      toast.success(`Spesifikasi & Tarif Kamar #${editingRoom.code} berhasil diperbarui!`);
    } catch {
      toast.success(`Spesifikasi Kamar #${editingRoom.code} berhasil disimpan!`);
    }

    setEditingRoom(null);
  };

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

  const handleRemoveFacility = (facToRemove: string) => {
    if (!editingRoom) return;
    setEditingRoom({
      ...editingRoom,
      facilities: editingRoom.facilities.filter((f) => f !== facToRemove),
    });
  };

  const handleClearAllDummyImages = () => {
    const cleared = rooms.map((r) => ({
      ...r,
      imageUrl: cleanImageUrl(r.imageUrl),
    }));
    saveRoomsLocally(cleared);
    toast.success(
      "Semua foto dummy telah dibersihkan. Kamar tanpa foto kustom kini berstatus kosong.",
    );
  };

  const handleResetDefault = () => {
    saveRoomsLocally(DEFAULT_MASTER_ROOMS);
    refetch();
    toast.success("Data 8 kamar berhasil di-reset ke standar (tanpa foto dummy)!");
  };

  const filteredRooms =
    filterBuilding === "all" ? rooms : rooms.filter((r) => r.building === filterBuilding);

  const roomsA = filteredRooms.filter((r) => r.building === "A");
  const roomsB = filteredRooms.filter((r) => r.building === "B");

  return (
    <div className="space-y-6">
      {/* 1. Header Info & Aksi Global */}
      <RoomManagementHeader
        onClearAllDummyImages={handleClearAllDummyImages}
        onResetDefault={handleResetDefault}
        isLoading={isLoading}
      />

      {/* 2. Filter Bangunan Pill Bar */}
      <RoomManagementFilter filterBuilding={filterBuilding} setFilterBuilding={setFilterBuilding} />

      {/* 3. Grid 8 Kamar Terbagi 2 Bangunan */}
      <div className="space-y-8">
        {(filterBuilding === "all" || filterBuilding === "A") && (
          <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-700" />
                <h3 className="font-extrabold text-sm sm:text-base text-slate-900 tracking-tight">
                  Bangunan A (Sisi Kiri)
                </h3>
              </div>
              <span className="text-xs font-bold text-slate-400">2 Kamar AC • 2 Kamar Kipas</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {roomsA.map((room) => (
                <RoomMasterCard key={room.code} room={room} onEdit={() => handleOpenEdit(room)} />
              ))}
            </div>
          </div>
        )}

        {(filterBuilding === "all" || filterBuilding === "B") && (
          <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-700" />
                <h3 className="font-extrabold text-sm sm:text-base text-slate-900 tracking-tight">
                  Bangunan B (Sisi Kanan)
                </h3>
              </div>
              <span className="text-xs font-bold text-slate-400">2 Kamar AC • 2 Kamar Kipas</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {roomsB.map((room) => (
                <RoomMasterCard key={room.code} room={room} onEdit={() => handleOpenEdit(room)} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 4. Modal Edit Spesifikasi, Foto & Tarif Kamar */}
      <RoomEditModal
        editingRoom={editingRoom}
        setEditingRoom={setEditingRoom}
        r2Gallery={r2Gallery}
        isLoadingR2={isLoadingR2}
        fetchR2Gallery={fetchR2Gallery}
        newFacilityInput={newFacilityInput}
        setNewFacilityInput={setNewFacilityInput}
        handleAddFacility={handleAddFacility}
        handleRemoveFacility={handleRemoveFacility}
        handleSaveEdit={handleSaveEdit}
      />
    </div>
  );
}
