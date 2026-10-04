"use client";

import type { AdvanceBookingData } from "@/features/reservations/components/admin/advance-booking-modal";
import type { CheckInFormData } from "@/features/reservations/components/admin/checkin-modal";
import {
  useCheckIn,
  useCheckOut,
  useCreateWalkInBooking,
} from "@/features/reservations/hooks/use-reservations";
import type { RoomItem, RoomStatus } from "@/features/rooms/components/admin/matrix/room-card";
import { useRooms, useUpdateRoomStatus } from "@/features/rooms/hooks/use-rooms";
import type { Room } from "@annisa/types";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function mapDbRoomToRoomItem(dbRoom: Room): RoomItem {
  const code = dbRoom.roomNumber.toUpperCase();
  const building = (dbRoom.building || (code.startsWith("A") ? "A" : "B")) as "A" | "B";
  const isKipas =
    dbRoom.roomType?.slug === "kamar-kipas" || code.endsWith("3") || code.endsWith("4");
  const type = isKipas ? "kipas" : "ac";
  const typeName = dbRoom.roomType?.name || (isKipas ? "Kamar Tipe Kipas" : "Kamar Tipe AC");
  const price = dbRoom.roomType?.basePrice || (isKipas ? 200000 : 275000);

  const rawFacilities = dbRoom.roomType?.facilities;
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

  const isAvailable = dbRoom.status === "ready";

  return {
    id: dbRoom.id,
    code,
    building,
    type,
    typeName,
    price,
    status: (dbRoom.status as RoomStatus) || "ready",
    facilities,
    capacity: dbRoom.roomType?.capacity ?? 3,
    bedType:
      dbRoom.roomType?.bedType ??
      (isKipas ? "1 Double Bed / 2 Single Bed" : "1 Queen Bed (Bisa + Extra Bed)"),
    description: dbRoom.roomType?.description ?? "",
    guestName: isAvailable ? undefined : dbRoom.guestName,
    guestPhone: isAvailable ? undefined : dbRoom.guestPhone,
    checkInDate: isAvailable || !dbRoom.checkInDate ? undefined : String(dbRoom.checkInDate),
    checkOutDate: isAvailable || !dbRoom.checkOutDate ? undefined : String(dbRoom.checkOutDate),
    totalNights: isAvailable ? undefined : dbRoom.totalNights,
    totalAmount: isAvailable ? undefined : dbRoom.totalAmount,
    dpPaid: isAvailable ? undefined : dbRoom.dpPaid,
    remainingAmount: isAvailable ? undefined : dbRoom.remainingAmount,
    reservationId: isAvailable ? undefined : dbRoom.reservationId,
    reservationCode: isAvailable ? undefined : dbRoom.reservationCode,
    notes: isAvailable ? undefined : (dbRoom.notes ?? undefined),
  };
}

export function useRoomMatrixActions() {
  const queryClient = useQueryClient();
  const { data: dbRooms, isLoading, isError } = useRooms();

  const [rooms, setRooms] = useState<RoomItem[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>("all");

  // Modal States
  const [checkInModalData, setCheckInModalData] = useState<RoomItem | null>(null);
  const [checkOutModalData, setCheckOutModalData] = useState<RoomItem | null>(null);
  const [receiptModalData, setReceiptModalData] = useState<RoomItem | null>(null);
  const [settlementModalData, setSettlementModalData] = useState<RoomItem | null>(null);
  const [detailModalData, setDetailModalData] = useState<RoomItem | null>(null);
  const [isAdvanceBookingOpen, setIsAdvanceBookingOpen] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  // Mutations
  const updateStatusMutation = useUpdateRoomStatus();
  const createWalkInMutation = useCreateWalkInBooking();
  const checkInMutation = useCheckIn();
  const checkOutMutation = useCheckOut();

  // Sync state dari data live database (PostgreSQL)
  useEffect(() => {
    if (dbRooms && dbRooms.length > 0) {
      setRooms(dbRooms.map(mapDbRoomToRoomItem));
    }
  }, [dbRooms]);

  // Reset / Refresh Data Kamar ke kondisi awal
  const handleResetRooms = async () => {
    setIsRefreshing(true);
    await queryClient.invalidateQueries();
    toast.success("Data status 8 kamar telah di-refresh!");
    setIsRefreshing(false);
  };

  // Handle Check-In Tamu Walk-In
  const handleConfirmCheckIn = async (data: CheckInFormData) => {
    setRooms((prev) =>
      prev.map((r) => {
        if (r.code === data.roomNumber) {
          return {
            ...r,
            status: "occupied",
            guestName: data.guestName,
            guestPhone: data.guestPhone,
            checkInDate: data.checkInDate,
            checkOutDate: data.checkOutDate,
            totalNights: data.totalNights,
            totalAmount: data.totalAmount,
            dpPaid: data.dpPaid,
            remainingAmount: data.remainingAmount,
          };
        }
        return r;
      }),
    );

    const matchedRoom = dbRooms?.find(
      (dbR) => dbR.roomNumber.toUpperCase() === data.roomNumber.toUpperCase(),
    );
    const targetRoomId = data.roomId || matchedRoom?.id || data.roomNumber;

    try {
      await createWalkInMutation.mutateAsync({
        roomId: targetRoomId,
        guestName: data.guestName,
        guestPhone: data.guestPhone || "081200000000",
        totalNights: data.totalNights || 1,
        paymentMethod: data.paymentMethod || "cash",
        isFullPayment: true,
      });
    } catch (err) {
      console.error("Gagal check-in walk-in:", err);
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
    }
  };

  // Handle Pelunasan & Check-In Tamu Booking WA
  const handleConfirmSettlement = async (roomCode: string, paymentMethod: string) => {
    const targetRoom = rooms.find((r) => r.code === roomCode);
    const resvId = targetRoom?.reservationId;

    setRooms((prev) =>
      prev.map((r) => {
        if (r.code === roomCode) {
          return {
            ...r,
            status: "occupied",
            dpPaid: r.totalAmount || r.price,
            remainingAmount: 0,
          };
        }
        return r;
      }),
    );

    const mappedPayment =
      paymentMethod === "tunai" ? "cash" : paymentMethod === "qris" ? "qris" : "transfer";

    try {
      if (resvId) {
        await checkInMutation.mutateAsync({
          id: resvId,
          input: {
            paymentMethod: mappedPayment,
          },
        });
      } else {
        await updateStatusMutation.mutateAsync({
          roomNumber: roomCode,
          input: { status: "occupied" },
        });
        toast.success(
          `Pelunasan Berhasil (${paymentMethod.toUpperCase()})! Kamar #${roomCode} kini Lunas 100% dan Siap Ditempati.`,
        );
      }
    } catch (err) {
      console.error("Gagal pelunasan check-in:", err);
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
    }
  };

  // Handle Check-Out Tamu
  const handleConfirmCheckOut = async (_paymentMethod: "cash" | "qris" | "transfer" = "cash") => {
    if (!checkOutModalData) return;
    const roomCode = checkOutModalData.code;
    const resvId = checkOutModalData.reservationId;

    setRooms((prev) =>
      prev.map((r) => {
        if (r.code === roomCode) {
          return {
            ...r,
            status: "dirty",
            guestName: undefined,
            guestPhone: undefined,
            checkInDate: undefined,
            checkOutDate: undefined,
            totalNights: undefined,
            totalAmount: undefined,
            dpPaid: undefined,
            remainingAmount: undefined,
            reservationId: undefined,
            reservationCode: undefined,
          };
        }
        return r;
      }),
    );

    try {
      if (resvId) {
        await checkOutMutation.mutateAsync({
          id: resvId,
          input: {
            markAsDirty: true,
          },
        });
      } else {
        await updateStatusMutation.mutateAsync({
          roomNumber: roomCode,
          input: { status: "dirty" },
        });
        toast.info(`Check-Out Berhasil! Kamar #${roomCode} kini masuk status Perlu Bersih.`);
      }
    } catch (err) {
      console.error("Gagal check-out:", err);
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
    }
  };

  // Handle Tandai Kamar Bersih
  const handleMarkClean = (roomCode: string) => {
    setRooms((prev) => prev.map((r) => (r.code === roomCode ? { ...r, status: "ready" } : r)));
    updateStatusMutation.mutate({
      roomNumber: roomCode,
      input: { status: "ready" },
    });
    toast.success(`Kamar #${roomCode} telah bersih dan siap disewakan kembali! 🟢`);
  };

  // Handle Selesai Perbaikan
  const handleFinishMaintenance = (roomCode: string) => {
    setRooms((prev) => prev.map((r) => (r.code === roomCode ? { ...r, status: "ready" } : r)));
    updateStatusMutation.mutate({
      roomNumber: roomCode,
      input: { status: "ready" },
    });
    toast.success(`Kamar #${roomCode} telah selesai perbaikan dan Siap Pakai! 🟢`);
  };

  // Handle Simpan Advance Booking WA
  const handleConfirmAdvanceBooking = (data: AdvanceBookingData) => {
    const now = new Date();
    const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;

    const isLiveStay =
      data.checkInDate <= todayStr || data.checkInDate.includes(now.getDate().toString());
    const isOccupied = data.remainingAmount === 0 || data.checkInDate < todayStr;

    if (isLiveStay) {
      setRooms((prev) =>
        prev.map((r) => {
          if (r.code === data.roomCode) {
            return {
              ...r,
              status: isOccupied ? "occupied" : "booked",
              guestName: data.guestName,
              guestPhone: data.guestPhone,
              checkInDate: data.checkInDate,
              checkOutDate: data.checkOutDate,
              totalNights: data.nights,
              totalAmount: data.totalAmount,
              dpPaid: data.dpPaid,
              remainingAmount: data.remainingAmount,
            };
          }
          return r;
        }),
      );
    }
  };

  // Filtered rooms
  const filteredRooms =
    filterStatus === "all" ? rooms : rooms.filter((r) => r.status === filterStatus);
  const roomsA = filteredRooms.filter((r) => r.building === "A");
  const roomsB = filteredRooms.filter((r) => r.building === "B");

  // Summary counts
  const readyCount = rooms.filter((r) => r.status === "ready").length;
  const occupiedCount = rooms.filter((r) => r.status === "occupied").length;
  const bookedCount = rooms.filter((r) => r.status === "booked").length;
  const dirtyCount = rooms.filter((r) => r.status === "dirty").length;

  return {
    rooms,
    filteredRooms,
    roomsA,
    roomsB,
    isLoading: isLoading && rooms.length === 0,
    isError,
    filterStatus,
    setFilterStatus,
    counts: {
      ready: readyCount,
      booked: bookedCount,
      occupied: occupiedCount,
      dirty: dirtyCount,
      total: rooms.length,
    },
    modals: {
      checkInModalData,
      setCheckInModalData,
      checkOutModalData,
      setCheckOutModalData,
      receiptModalData,
      setReceiptModalData,
      settlementModalData,
      setSettlementModalData,
      detailModalData,
      setDetailModalData,
      isAdvanceBookingOpen,
      setIsAdvanceBookingOpen,
      isRefreshing,
    },
    handlers: {
      handleResetRooms,
      handleConfirmCheckIn,
      handleConfirmSettlement,
      handleConfirmCheckOut,
      handleMarkClean,
      handleFinishMaintenance,
      handleConfirmAdvanceBooking,
    },
  };
}
