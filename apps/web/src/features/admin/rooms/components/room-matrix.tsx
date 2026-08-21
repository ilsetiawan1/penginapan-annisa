"use client";

import { useState } from "react";
import { type CheckInFormData, CheckInModal } from "../../reservations/components/checkin-modal";
import { CheckOutModal } from "../../reservations/components/checkout-modal";
import { ReceiptModal } from "../../reservations/components/receipt-modal";
import { RoomCard, type RoomItem } from "./room-card";
import { RoomFilterBanner } from "./room-filter-banner";

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

  // Filter State
  const [buildingFilter, setBuildingFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Modal State
  const [checkInModalData, setCheckInModalData] = useState<RoomItem | null>(null);
  const [checkOutModalData, setCheckOutModalData] = useState<RoomItem | null>(null);
  const [receiptModalData, setReceiptModalData] = useState<RoomItem | null>(null);

  // Filter Data
  const filteredRooms = rooms.filter((room) => {
    if (buildingFilter !== "all" && room.building !== buildingFilter) return false;
    if (typeFilter !== "all" && room.type !== typeFilter) return false;
    if (statusFilter !== "all" && room.status !== statusFilter) return false;
    return true;
  });

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
    <div className="space-y-6 sm:space-y-8">
      {/* 4 Kartu Metrik Ringkas (Inspirasi FinSet Dashboard) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Siap Pakai */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-4 sm:p-5 shadow-2xs">
          <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-emerald-700 block">
            🟢 Siap Pakai
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl sm:text-3xl font-black text-slate-900">{readyCount}</span>
            <span className="text-xs text-slate-500 font-medium">Kamar Kosong</span>
          </div>
        </div>

        {/* Terisi */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-4 sm:p-5 shadow-2xs">
          <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-blue-700 block">
            🔵 Terisi
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl sm:text-3xl font-black text-slate-900">{occupiedCount}</span>
            <span className="text-xs text-slate-500 font-medium">Tamu Menginap</span>
          </div>
        </div>

        {/* Perlu Bersih */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-4 sm:p-5 shadow-2xs">
          <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-amber-800 block">
            🟡 Perlu Bersih
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl sm:text-3xl font-black text-slate-900">{dirtyCount}</span>
            <span className="text-xs text-slate-500 font-medium">Housekeeping</span>
          </div>
        </div>

        {/* Perbaikan */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-4 sm:p-5 shadow-2xs">
          <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-rose-700 block">
            🔴 Perbaikan
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl sm:text-3xl font-black text-slate-900">
              {maintenanceCount}
            </span>
            <span className="text-xs text-slate-500 font-medium">Servis Teknisi</span>
          </div>
        </div>
      </div>

      {/* 1. Hero Filter Cepat (Tanpa Search Box, Cepat & Jelas) */}
      <RoomFilterBanner
        buildingFilter={buildingFilter}
        onBuildingFilterChange={setBuildingFilter}
        typeFilter={typeFilter}
        onTypeFilterChange={setTypeFilter}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
      />

      {/* 2. Judul Bagian: "Daftar 8 Unit Kamar" + Badge Jumlah */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Matriks 8 Unit Kamar
          </h2>
          <span className="bg-purple-100 text-purple-900 text-xs font-black px-2.5 py-0.5 rounded-full">
            {filteredRooms.length} Kamar
          </span>
        </div>

        <span className="text-xs font-bold text-slate-500 hidden sm:inline">
          Bangunan A: #A1–#A4 • Bangunan B: #B1–#B4
        </span>
      </div>

      {/* 3. Grid 3-Kolom / 2-Kolom Kamar */}
      {filteredRooms.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredRooms.map((room) => (
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
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-2xs space-y-2">
          <p className="text-base font-extrabold text-slate-700">
            Tidak ada kamar dengan filter ini
          </p>
          <p className="text-xs text-slate-500">
            Coba ubah opsi filter pada bilah pilihan di atas.
          </p>
        </div>
      )}

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
