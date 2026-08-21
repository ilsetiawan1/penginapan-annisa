"use client";

import { useState } from "react";
import { type CheckInFormData, CheckInModal } from "../../reservations/components/checkin-modal";
import { CheckOutModal } from "../../reservations/components/checkout-modal";
import { ReceiptModal } from "../../reservations/components/receipt-modal";
import { RoomCard, type RoomItem } from "./room-card";

// 8 UNIT KAMAR RESMI PENGINAPAN ANNISA (SESUAI PRD & TRD)
const INITIAL_ROOMS: RoomItem[] = [
  // BANGUNAN A
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
  // BANGUNAN B
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

  // Ringkasan Status
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
    <div className="space-y-3.5 sm:space-y-4">
      {/* Top Header Strip: Judul + Ringkasan Status 4 Warna Horizontal (Zero Scroll Tablet View) */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 bg-white py-2.5 px-4 rounded-2xl border border-slate-200/80 shadow-2xs">
        <div className="flex items-center gap-2">
          <h2 className="text-base font-black text-slate-900 tracking-tight">Matriks 8 Kamar</h2>
          <span className="bg-purple-100 text-purple-900 text-[11px] font-black px-2 py-0.5 rounded-full">
            8 Unit
          </span>
        </div>

        {/* 4 Status Pills Horizontal (Ramping & Jelas) */}
        <div className="flex items-center gap-2 flex-wrap text-xs font-bold">
          <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-xl flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>
              Siap Pakai: <strong>{readyCount}</strong>
            </span>
          </span>

          <span className="bg-blue-50 text-blue-800 border border-blue-200 px-2.5 py-1 rounded-xl flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-600" />
            <span>
              Terisi: <strong>{occupiedCount}</strong>
            </span>
          </span>

          <span className="bg-amber-50 text-amber-900 border border-amber-200 px-2.5 py-1 rounded-xl flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <span>
              Perlu Bersih: <strong>{dirtyCount}</strong>
            </span>
          </span>

          <span className="bg-rose-50 text-rose-800 border border-rose-200 px-2.5 py-1 rounded-xl flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-500" />
            <span>
              Perbaikan: <strong>{maintenanceCount}</strong>
            </span>
          </span>
        </div>
      </div>

      {/* 8 ROOMS GRID (Tepat 4 Kolom x 2 Baris: Muat 1 Layar Tablet Penuh Tanpa Scroll) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-3.5">
        {rooms.map((room) => (
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
