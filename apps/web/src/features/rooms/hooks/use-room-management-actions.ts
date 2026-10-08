"use client";

import { uploadBase64ToR2 } from "@/components/ui/image-upload";
import type { MasterRoomItem } from "@/features/rooms/components/admin/management/room-master-card";
import {
  useRoomTypes,
  useRooms,
  useUpdateRoomImage,
  useUpdateRoomRate,
} from "@/features/rooms/hooks/use-rooms";
import { apiClient } from "@/lib/api/client";
import { cleanImageUrl, generateSlug } from "@/lib/string";
import type { Room, RoomType } from "@annisa/types";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

const LOCAL_STORAGE_KEY = "annisa_master_rooms_v3";

function mapRoomToMasterItem(sr: Room, serverTypes?: RoomType[]): MasterRoomItem {
  const code = sr.roomNumber.toUpperCase();
  const building = (sr.building || (code.startsWith("A") ? "A" : "B")) as "A" | "B";
  const buildingName = building === "A" ? "Bangunan A" : "Bangunan B";

  const matchedType =
    sr.roomType ||
    serverTypes?.find((st) =>
      code.endsWith("3") || code.endsWith("4") ? st.slug.includes("kipas") : st.slug.includes("ac"),
    );

  const isAc = matchedType?.slug
    ? matchedType.slug.includes("ac")
    : !code.endsWith("3") && !code.endsWith("4");
  const type = isAc ? "ac" : "kipas";
  const typeName = matchedType?.name || (isAc ? "Kamar Tipe AC" : "Kamar Tipe Kipas");
  const price = matchedType?.basePrice || (isAc ? 275000 : 200000);

  const rawFacilities = matchedType?.facilities;
  const facilities = Array.isArray(rawFacilities)
    ? rawFacilities
    : typeof rawFacilities === "string"
      ? (() => {
          try {
            return JSON.parse(rawFacilities);
          } catch {
            return [];
          }
        })()
      : [];

  return {
    id: sr.id || `room-${code.toLowerCase()}`,
    code,
    name: `Kamar #${code} (${isAc ? "AC" : "Kipas"})`,
    building,
    buildingName,
    type,
    typeName,
    price,
    imageUrl: cleanImageUrl(sr.imageUrl),
    description:
      matchedType?.description ||
      (isAc
        ? "Kamar berpendingin AC sejuk dan tenang, cocok untuk transit penerbangan Bandara Pattimura Ambon."
        : "Kamar hemat dengan sirkulasi udara alami dan kipas angin dinding, bersih dan higienis."),
    facilities,
    capacity: matchedType?.capacity || 2,
    bedType: matchedType?.bedType || (isAc ? "Queen Bed" : "Double Bed / 2 Single Bed"),
  };
}

export function useRoomManagementActions() {
  const {
    data: serverTypes,
    isLoading: isLoadingTypes,
    isFetching: isFetchingTypes,
    refetch: refetchTypes,
  } = useRoomTypes();
  const {
    data: serverRooms,
    isLoading: isLoadingRooms,
    isFetching: isFetchingRooms,
    refetch: refetchRooms,
  } = useRooms();
  const updateRoomRateMutation = useUpdateRoomRate();
  const updateRoomImageMutation = useUpdateRoomImage();

  const isRefreshing = isFetchingRooms || isFetchingTypes;

  const handleRefresh = async () => {
    try {
      await Promise.all([refetchRooms(), refetchTypes()]);
      toast.success("Data 8 kamar berhasil diperbarui!");
    } catch {
      toast.error("Gagal memuat ulang data kamar.");
    }
  };

  const [rooms, setRooms] = useState<MasterRoomItem[]>([]);
  const [editingRoom, setEditingRoom] = useState<MasterRoomItem | null>(null);
  const [newFacilityInput, setNewFacilityInput] = useState<string>("");
  const [filterBuilding, setFilterBuilding] = useState<"all" | "A" | "B">("all");
  const [r2Gallery, setR2Gallery] = useState<
    Array<{ key: string; name: string; url: string; size?: number }>
  >([]);
  const [isLoadingR2, setIsLoadingR2] = useState<boolean>(false);

  const fetchR2Gallery = useCallback(async () => {
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
  }, []);

  // Sync state dari backend PostgreSQL (Single Source of Truth)
  useEffect(() => {
    if (serverRooms && serverRooms.length > 0) {
      const liveRooms = serverRooms.map((sr) => mapRoomToMasterItem(sr, serverTypes));
      setRooms(liveRooms);
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(liveRooms));
      } catch {
        // ignore
      }
    } else {
      // Fallback jika localStorage pernah menyimpan data sebelumnya
      try {
        const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setRooms(parsed);
          }
        }
      } catch {
        // ignore
      }
    }
  }, [serverRooms, serverTypes]);

  useEffect(() => {
    fetchR2Gallery();
  }, [fetchR2Gallery]);

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
      } catch (error: unknown) {
        const errorMsg = error instanceof Error ? error.message : "Terjadi kesalahan";
        toast.error(`Gagal mengunggah foto: ${errorMsg}`, {
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

  const filteredRooms =
    filterBuilding === "all" ? rooms : rooms.filter((r) => r.building === filterBuilding);

  const roomsA = filteredRooms.filter((r) => r.building === "A");
  const roomsB = filteredRooms.filter((r) => r.building === "B");

  return {
    rooms,
    filteredRooms,
    roomsA,
    roomsB,
    isLoading: (isLoadingRooms || isLoadingTypes) && rooms.length === 0,
    isRefreshing,
    filterBuilding,
    setFilterBuilding,
    editingRoom,
    setEditingRoom,
    newFacilityInput,
    setNewFacilityInput,
    r2Gallery,
    isLoadingR2,
    fetchR2Gallery,
    handlers: {
      handleOpenEdit,
      handleSaveEdit,
      handleAddFacility,
      handleRemoveFacility,
      handleRefresh,
    },
  };
}
