"use client";

import type { AdvanceBookingData } from "@/features/reservations/components/admin/advance-booking-modal";
import type { CheckInFormData } from "@/features/reservations/components/admin/checkin-modal";
import {
  useCheckIn,
  useCheckOut,
  useCreateWalkInBooking,
} from "@/features/reservations/hooks/use-reservations";
import { useRooms, useUpdateRoomStatus } from "@/features/rooms/hooks/use-rooms";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { RoomCard, type RoomItem } from "./room-card";
import { RoomMatrixFilter } from "./room-matrix-filter";
import { RoomMatrixHeader } from "./room-matrix-header";
import { RoomMatrixModals } from "./room-matrix-modals";

// 8 UNIT KAMAR RESMI PENGINAPAN ANNISA (SEMUA TERSEDIA / READY)
const INITIAL_ROOMS: RoomItem[] = [
  // BANGUNAN A (KIRI): 2 AC (A1, A2) & 2 KIPAS (A3, A4)
  {
    code: "A1",
    building: "A",
    type: "ac",
    typeName: "Kamar Tipe AC",
    price: 275000,
    status: "ready",
  },
  {
    code: "A2",
    building: "A",
    type: "ac",
    typeName: "Kamar Tipe AC",
    price: 275000,
    status: "ready",
  },
  {
    code: "A3",
    building: "A",
    type: "kipas",
    typeName: "Kamar Tipe Kipas",
    price: 200000,
    status: "ready",
  },
  {
    code: "A4",
    building: "A",
    type: "kipas",
    typeName: "Kamar Tipe Kipas",
    price: 200000,
    status: "ready",
  },

  // BANGUNAN B (KANAN): 2 AC (B1, B2) & 2 KIPAS (B3, B4)
  {
    code: "B1",
    building: "B",
    type: "ac",
    typeName: "Kamar Tipe AC",
    price: 275000,
    status: "ready",
  },
  {
    code: "B2",
    building: "B",
    type: "ac",
    typeName: "Kamar Tipe AC",
    price: 275000,
    status: "ready",
  },
  {
    code: "B3",
    building: "B",
    type: "kipas",
    typeName: "Kamar Tipe Kipas",
    price: 200000,
    status: "ready",
  },
  {
    code: "B4",
    building: "B",
    type: "kipas",
    typeName: "Kamar Tipe Kipas",
    price: 200000,
    status: "ready",
  },
];

export function RoomMatrix() {
  const { data: dbRooms } = useRooms();
  const [rooms, setRooms] = useState<RoomItem[]>(INITIAL_ROOMS);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const queryClient = useQueryClient();
  const updateStatusMutation = useUpdateRoomStatus();
  const createWalkInMutation = useCreateWalkInBooking();
  const checkInMutation = useCheckIn();
  const checkOutMutation = useCheckOut();

  // Sync state dengan data live dari database (DB PostgreSQL)
  useEffect(() => {
    if (dbRooms && dbRooms.length > 0) {
      setRooms((prev) =>
        prev.map((r) => {
          const matched = dbRooms.find(
            (dbR) => dbR.roomNumber.toUpperCase() === r.code.toUpperCase(),
          );
          if (matched && matched.status) {
            const isAvailable = matched.status === "ready";
            return {
              ...r,
              id: matched.id,
              status: matched.status as RoomItem["status"],
              guestName: (matched as any).guestName,
              guestPhone: (matched as any).guestPhone,
              checkInDate: (matched as any).checkInDate ? String((matched as any).checkInDate) : undefined,
              checkOutDate: (matched as any).checkOutDate ? String((matched as any).checkOutDate) : undefined,
              totalNights: (matched as any).totalNights,
              totalAmount: (matched as any).totalAmount,
              dpPaid: (matched as any).dpPaid,
              remainingAmount: (matched as any).remainingAmount,
              paymentStatus: (matched as any).paymentStatus,
              reservationId: (matched as any).reservationId,
              reservationCode: (matched as any).reservationCode,
              notes: (matched as any).notes,
              ...(isAvailable
                ? {
                    guestName: undefined,
                    guestPhone: undefined,
                    checkInDate: undefined,
                    checkOutDate: undefined,
                    totalNights: undefined,
                    totalAmount: undefined,
                    dpPaid: undefined,
                    remainingAmount: undefined,
                    paymentStatus: undefined,
                    reservationId: undefined,
                    reservationCode: undefined,
                    notes: undefined,
                  }
                : {}),
            };
          }
          return r;
        }),
      );
    }
  }, [dbRooms]);

  // Modal States
  const [checkInModalData, setCheckInModalData] = useState<RoomItem | null>(null);
  const [checkOutModalData, setCheckOutModalData] = useState<RoomItem | null>(null);
  const [receiptModalData, setReceiptModalData] = useState<RoomItem | null>(null);
  const [settlementModalData, setSettlementModalData] = useState<RoomItem | null>(null);
  const [detailModalData, setDetailModalData] = useState<RoomItem | null>(null);
  const [isAdvanceBookingOpen, setIsAdvanceBookingOpen] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  // Pisahkan Kamar Bangunan A & Bangunan B dengan Filter
  const filteredRooms =
    filterStatus === "all" ? rooms : rooms.filter((r) => r.status === filterStatus);
  const roomsA = filteredRooms.filter((r) => r.building === "A");
  const roomsB = filteredRooms.filter((r) => r.building === "B");

  // Reset / Refresh Data Kamar ke kondisi awal
  const handleResetRooms = async () => {
    setIsRefreshing(true);
    await queryClient.invalidateQueries();
    toast.success("Data status 8 kamar telah di-refresh!");
    setIsRefreshing(false);
  };

  // Ringkasan Status Keseluruhan
  const readyCount = rooms.filter((r) => r.status === "ready").length;
  const occupiedCount = rooms.filter((r) => r.status === "occupied").length;
  const bookedCount = rooms.filter((r) => r.status === "booked").length;
  const dirtyCount = rooms.filter((r) => r.status === "dirty").length;

  // Handle Check-In Tamu Walk-In (Tersimpan ke Database PostgreSQL)
  const handleConfirmCheckIn = async (data: CheckInFormData) => {
    // 1. Optimistic Update di UI seketika
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

  // Handle Pelunasan & Check-In Tamu Booking WA yang Baru Saja Tiba di Resepsionis
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
  const handleConfirmCheckOut = async (
    paymentMethod: "cash" | "qris" | "transfer" = "cash",
  ) => {
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

  // Handle Tandai Kamar Bersih (Housekeeping Selesai)
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

  // Handle Simpan Advance Booking WA (Sync state if today)
  const handleConfirmAdvanceBooking = (data: AdvanceBookingData) => {
    const now = new Date();
    const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;

    if (data.checkInDate === todayStr || data.checkInDate.includes(now.getDate().toString())) {
      setRooms((prev) =>
        prev.map((r) => {
          if (r.code === data.roomCode) {
            return {
              ...r,
              status: "booked",
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

  return (
    <div className="w-full flex flex-col gap-3 sm:gap-4 pb-4">
      {/* 1. TOP TOOLBAR: Capsule Filters (Left) + Quick Actions (Right) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 shrink-0">
        <RoomMatrixFilter
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          counts={{
            ready: readyCount,
            booked: bookedCount,
            occupied: occupiedCount,
            dirty: dirtyCount,
            total: rooms.length,
          }}
        />

        <RoomMatrixHeader
          onOpenAdvanceBooking={() => setIsAdvanceBookingOpen(true)}
          onRefresh={handleResetRooms}
          isRefreshing={isRefreshing}
        />
      </div>

      {/* 2. GRID 2 BANGUNAN DENGAN KARTU TRI-COLOR ELEGAN */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-3.5 sm:gap-4 items-start">
        {/* BANGUNAN A (4 KAMAR: #A1 s/d #A4) */}
        <div className="flex flex-col space-y-2.5 bg-white/40 p-3 sm:p-3.5 rounded-2xl border border-purple-100/60 shadow-2xs">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-700" />
              <h3 className="font-extrabold text-xs sm:text-sm text-slate-900 tracking-tight">
                Bangunan A (Sisi Kiri)
              </h3>
            </div>
            <span className="text-[10px] font-bold text-slate-400">2 AC • 2 Kipas</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
            {roomsA.map((room) => (
              <RoomCard
                key={room.code}
                room={room}
                onOpenCheckIn={setCheckInModalData}
                onOpenCheckOut={setCheckOutModalData}
                onOpenReceipt={setReceiptModalData}
                onOpenSettlement={setSettlementModalData}
                onOpenDetail={setDetailModalData}
                onMarkClean={handleMarkClean}
                onFinishMaintenance={handleFinishMaintenance}
              />
            ))}
          </div>
        </div>

        {/* BANGUNAN B (4 KAMAR: #B1 s/d #B4) */}
        <div className="flex flex-col space-y-2.5 bg-white/40 p-3 sm:p-3.5 rounded-2xl border border-purple-100/60 shadow-2xs">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-700" />
              <h3 className="font-extrabold text-xs sm:text-sm text-slate-900 tracking-tight">
                Bangunan B (Sisi Kanan)
              </h3>
            </div>
            <span className="text-[10px] font-bold text-slate-400">2 AC • 2 Kipas</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
            {roomsB.map((room) => (
              <RoomCard
                key={room.code}
                room={room}
                onOpenCheckIn={setCheckInModalData}
                onOpenCheckOut={setCheckOutModalData}
                onOpenReceipt={setReceiptModalData}
                onOpenSettlement={setSettlementModalData}
                onOpenDetail={setDetailModalData}
                onMarkClean={handleMarkClean}
                onFinishMaintenance={handleFinishMaintenance}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 3. MODALS & DIALOGS */}
      <RoomMatrixModals
        checkInModalData={checkInModalData}
        setCheckInModalData={setCheckInModalData}
        checkOutModalData={checkOutModalData}
        setCheckOutModalData={setCheckOutModalData}
        receiptModalData={receiptModalData}
        setReceiptModalData={setReceiptModalData}
        settlementModalData={settlementModalData}
        setSettlementModalData={setSettlementModalData}
        detailModalData={detailModalData}
        setDetailModalData={setDetailModalData}
        isAdvanceBookingOpen={isAdvanceBookingOpen}
        setIsAdvanceBookingOpen={setIsAdvanceBookingOpen}
        onConfirmCheckIn={handleConfirmCheckIn}
        onConfirmSettlement={handleConfirmSettlement}
        onConfirmCheckOut={handleConfirmCheckOut}
        onMarkClean={handleMarkClean}
        onFinishMaintenance={handleFinishMaintenance}
        onConfirmAdvanceBooking={handleConfirmAdvanceBooking}
      />
    </div>
  );
}
