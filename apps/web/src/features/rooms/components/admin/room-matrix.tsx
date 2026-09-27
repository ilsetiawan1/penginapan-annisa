"use client";

import type { AdvanceBookingData } from "@/features/reservations/components/admin/advance-booking-modal";
import type { CheckInFormData } from "@/features/reservations/components/admin/checkin-modal";
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
              status: matched.status as RoomItem["status"],
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

  // Handle Check-In Tamu Walk-In
  const handleConfirmCheckIn = (data: CheckInFormData) => {
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
    updateStatusMutation.mutate({
      roomNumber: data.roomNumber,
      input: { status: "occupied" },
    });
    toast.success(
      `Check-In Berhasil! Kamar #${data.roomNumber} kini Terisi untuk ${data.guestName}.`,
    );
  };

  // Handle Pelunasan & Check-In Tamu Booking WA yang Baru Saja Tiba di Resepsionis
  const handleConfirmSettlement = (roomCode: string, paymentMethod: string) => {
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
    updateStatusMutation.mutate({
      roomNumber: roomCode,
      input: { status: "occupied" },
    });
    toast.success(
      `Pelunasan Berhasil (${paymentMethod.toUpperCase()})! Kamar #${roomCode} kini Lunas 100% dan Siap Ditempati.`,
    );
  };

  // Handle Check-Out Tamu
  const handleConfirmCheckOut = () => {
    if (!checkOutModalData) return;
    const roomCode = checkOutModalData.code;
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
          };
        }
        return r;
      }),
    );
    updateStatusMutation.mutate({
      roomNumber: roomCode,
      input: { status: "dirty" },
    });
    toast.info(`Check-Out Berhasil! Kamar #${roomCode} kini masuk status Perlu Bersih.`);
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
    <div className="space-y-6">
      {/* 1. HEADER SECTION: Editorial Georgia + Aksi Cepat */}
      <RoomMatrixHeader
        onOpenAdvanceBooking={() => setIsAdvanceBookingOpen(true)}
        onRefresh={handleResetRooms}
        isRefreshing={isRefreshing}
      />

      {/* 2. CAPSULE FILTER BAR */}
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

      {/* 3. GRID 2 BANGUNAN DENGAN KARTU TRI-COLOR ELEGAN */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* BANGUNAN A (4 KAMAR: #A1 s/d #A4) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-700" />
              <h3 className="font-extrabold text-sm sm:text-base text-slate-900 tracking-tight">
                Bangunan A (Sisi Kiri)
              </h3>
            </div>
            <span className="text-[11px] font-bold text-slate-400">2 AC • 2 Kipas</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-700" />
              <h3 className="font-extrabold text-sm sm:text-base text-slate-900 tracking-tight">
                Bangunan B (Sisi Kanan)
              </h3>
            </div>
            <span className="text-[11px] font-bold text-slate-400">2 AC • 2 Kipas</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

      {/* 4. MODALS & DIALOGS */}
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
