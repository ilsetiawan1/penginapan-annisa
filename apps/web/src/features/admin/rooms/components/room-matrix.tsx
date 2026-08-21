"use client";

import { useState } from "react";
import { type CheckInFormData, CheckInModal } from "../../reservations/components/checkin-modal";
import { CheckOutModal } from "../../reservations/components/checkout-modal";
import { ReceiptModal } from "../../reservations/components/receipt-modal";
import { RoomCard, type RoomItem } from "./room-card";

// 8 UNIT KAMAR RESMI PENGINAPAN ANNISA (SESUAI PRD & TRD)
const INITIAL_ROOMS: RoomItem[] = [
  // BANGUNAN A (KIRI): 2 AC (A1, A2) & 2 KIPAS (A3, A4)
  {
    code: "A1",
    building: "A",
    type: "ac",
    typeName: "Tipe AC",
    price: 275000,
    status: "ready",
  },
  {
    code: "A2",
    building: "A",
    type: "ac",
    typeName: "Tipe AC",
    price: 275000,
    status: "occupied",
    guestName: "Budi Santoso",
    guestPhone: "081234567890",
    checkInDate: "21 Agu 2026",
    checkOutDate: "22 Agu 2026",
    totalNights: 1,
    totalAmount: 275000,
    dpPaid: 137500,
    remainingAmount: 137500,
  },
  {
    code: "A3",
    building: "A",
    type: "kipas",
    typeName: "Tipe Kipas",
    price: 200000,
    status: "dirty",
  },
  {
    code: "A4",
    building: "A",
    type: "kipas",
    typeName: "Tipe Kipas",
    price: 200000,
    status: "ready",
  },

  // BANGUNAN B (KANAN): 2 AC (B1, B2) & 2 KIPAS (B3, B4)
  {
    code: "B1",
    building: "B",
    type: "ac",
    typeName: "Tipe AC",
    price: 275000,
    status: "ready",
  },
  {
    code: "B2",
    building: "B",
    type: "ac",
    typeName: "Tipe AC",
    price: 275000,
    status: "ready",
  },
  {
    code: "B3",
    building: "B",
    type: "kipas",
    typeName: "Tipe Kipas",
    price: 200000,
    status: "occupied",
    guestName: "Siti Rahma",
    guestPhone: "085299887766",
    checkInDate: "20 Agu 2026",
    checkOutDate: "22 Agu 2026",
    totalNights: 2,
    totalAmount: 400000,
    dpPaid: 200000,
    remainingAmount: 200000,
  },
  {
    code: "B4",
    building: "B",
    type: "kipas",
    typeName: "Tipe Kipas",
    price: 200000,
    status: "ready",
  },
];

export function RoomMatrix() {
  const [rooms, setRooms] = useState<RoomItem[]>(INITIAL_ROOMS);

  // Modal State
  const [checkInModalData, setCheckInModalData] = useState<RoomItem | null>(null);
  const [checkOutModalData, setCheckOutModalData] = useState<RoomItem | null>(null);
  const [receiptModalData, setReceiptModalData] = useState<RoomItem | null>(null);

  // Pisahkan Kamar Bangunan A & Bangunan B
  const roomsA = rooms.filter((r) => r.building === "A");
  const roomsB = rooms.filter((r) => r.building === "B");

  // Ringkasan Status Keseluruhan
  const readyCount = rooms.filter((r) => r.status === "ready").length;
  const occupiedCount = rooms.filter((r) => r.status === "occupied").length;
  const dirtyCount = rooms.filter((r) => r.status === "dirty").length;
  const maintenanceCount = rooms.filter((r) => r.status === "maintenance").length;

  // Handle Check-In Tamu
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
  };

  // Handle Check-Out Tamu
  const handleConfirmCheckOut = () => {
    if (!checkOutModalData) return;
    setRooms((prev) =>
      prev.map((r) => {
        if (r.code === checkOutModalData.code) {
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
  };

  // Handle Tandai Kamar Bersih (Housekeeping Selesai)
  const handleMarkClean = (roomCode: string) => {
    setRooms((prev) => prev.map((r) => (r.code === roomCode ? { ...r, status: "ready" } : r)));
  };

  // Handle Selesai Perbaikan
  const handleFinishMaintenance = (roomCode: string) => {
    setRooms((prev) => prev.map((r) => (r.code === roomCode ? { ...r, status: "ready" } : r)));
  };

  return (
    <div className="space-y-3 sm:space-y-3.5">
      {/* Top Header Strip: Judul + Ringkasan Status 4 Warna Horizontal */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-white py-2 px-3.5 sm:px-4 rounded-2xl border border-slate-200/80 shadow-2xs">
        <div className="flex items-center gap-2">
          <h2 className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
            Matriks 8 Kamar
          </h2>
          <span className="bg-purple-100 text-purple-900 text-[10px] font-black px-2 py-0.5 rounded-full">
            8 Unit Total
          </span>
        </div>

        {/* 4 Status Pills Horizontal */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap text-xs font-bold">
          <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-lg flex items-center gap-1.5 text-[11px]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>
              Siap: <strong>{readyCount}</strong>
            </span>
          </span>

          <span className="bg-blue-50 text-blue-800 border border-blue-200 px-2 py-0.5 rounded-lg flex items-center gap-1.5 text-[11px]">
            <span className="w-2 h-2 rounded-full bg-blue-600" />
            <span>
              Terisi: <strong>{occupiedCount}</strong>
            </span>
          </span>

          <span className="bg-amber-50 text-amber-900 border border-amber-200 px-2 py-0.5 rounded-lg flex items-center gap-1.5 text-[11px]">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <span>
              Kotor: <strong>{dirtyCount}</strong>
            </span>
          </span>

          <span className="bg-rose-50 text-rose-800 border border-rose-200 px-2 py-0.5 rounded-lg flex items-center gap-1.5 text-[11px]">
            <span className="w-2 h-2 rounded-full bg-rose-500" />
            <span>
              Servis: <strong>{maintenanceCount}</strong>
            </span>
          </span>
        </div>
      </div>

      {/* 2 BANGUNAN BERDAMPINGAN: KIRI (BANGUNAN A) & KANAN (BANGUNAN B) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5 sm:gap-4 relative">
        {/* ====================================================
            BLOK KIRI: BANGUNAN A (4 KAMAR: 2 AC & 2 KIPAS)
            ==================================================== */}
        <div className="bg-[#f4f2f7] rounded-3xl p-3 sm:p-3.5 border border-slate-200/90 shadow-2xs space-y-2.5">
          {/* Header Bangunan A */}
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-700" />
              <h3 className="font-black text-xs sm:text-sm text-slate-900 tracking-tight">
                BANGUNAN A (Lokasi 1)
              </h3>
            </div>
            <span className="text-[10px] font-extrabold text-purple-950 bg-white px-2 py-0.5 rounded-md border border-purple-100 shadow-2xs">
              2 AC (#A1,#A2) • 2 Kipas (#A3,#A4)
            </span>
          </div>

          {/* Grid 2x2 Kamar Bangunan A */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {roomsA.map((room) => (
              <RoomCard
                key={room.code}
                room={room}
                onOpenCheckIn={setCheckInModalData}
                onOpenCheckOut={setCheckOutModalData}
                onOpenReceipt={setReceiptModalData}
                onMarkClean={handleMarkClean}
                onFinishMaintenance={handleFinishMaintenance}
              />
            ))}
          </div>
        </div>

        {/* ====================================================
            BLOK KANAN: BANGUNAN B (4 KAMAR: 2 AC & 2 KIPAS)
            ==================================================== */}
        <div className="bg-[#f4f2f7] rounded-3xl p-3 sm:p-3.5 border border-slate-200/90 shadow-2xs space-y-2.5">
          {/* Header Bangunan B */}
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-700" />
              <h3 className="font-black text-xs sm:text-sm text-slate-900 tracking-tight">
                BANGUNAN B (Lokasi 2)
              </h3>
            </div>
            <span className="text-[10px] font-extrabold text-purple-950 bg-white px-2 py-0.5 rounded-md border border-purple-100 shadow-2xs">
              2 AC (#B1,#B2) • 2 Kipas (#B3,#B4)
            </span>
          </div>

          {/* Grid 2x2 Kamar Bangunan B */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {roomsB.map((room) => (
              <RoomCard
                key={room.code}
                room={room}
                onOpenCheckIn={setCheckInModalData}
                onOpenCheckOut={setCheckOutModalData}
                onOpenReceipt={setReceiptModalData}
                onMarkClean={handleMarkClean}
                onFinishMaintenance={handleFinishMaintenance}
              />
            ))}
          </div>
        </div>
      </div>

      {/* MODAL DIALOGS */}
      {checkInModalData && (
        <CheckInModal
          isOpen={!!checkInModalData}
          onClose={() => setCheckInModalData(null)}
          roomNumber={checkInModalData.code}
          roomPrice={checkInModalData.price}
          roomTypeName={checkInModalData.typeName}
          onConfirm={handleConfirmCheckIn}
        />
      )}

      {checkOutModalData && (
        <CheckOutModal
          isOpen={!!checkOutModalData}
          onClose={() => setCheckOutModalData(null)}
          roomNumber={checkOutModalData.code}
          roomTypeName={checkOutModalData.typeName}
          guestName={checkOutModalData.guestName || "Tamu"}
          guestPhone={checkOutModalData.guestPhone}
          totalNights={checkOutModalData.totalNights || 1}
          totalAmount={checkOutModalData.totalAmount || checkOutModalData.price}
          dpPaid={checkOutModalData.dpPaid || 0}
          remainingAmount={checkOutModalData.remainingAmount || 0}
          onConfirmCheckOut={handleConfirmCheckOut}
        />
      )}

      {receiptModalData && (
        <ReceiptModal
          isOpen={!!receiptModalData}
          onClose={() => setReceiptModalData(null)}
          roomNumber={receiptModalData.code}
          roomTypeName={receiptModalData.typeName}
          guestName={receiptModalData.guestName || "Tamu"}
          guestPhone={receiptModalData.guestPhone || ""}
          checkInDate={receiptModalData.checkInDate || "21 Agu 2026"}
          checkOutDate={receiptModalData.checkOutDate || "22 Agu 2026"}
          totalNights={receiptModalData.totalNights || 1}
          totalAmount={receiptModalData.totalAmount || receiptModalData.price}
          dpPaid={receiptModalData.dpPaid || 0}
          remainingAmount={receiptModalData.remainingAmount || 0}
        />
      )}
    </div>
  );
}
