"use client";

import { useState } from "react";
import { StatsOverview } from "../../dashboard/components/stats-overview";
import { type CheckInFormData, CheckInModal } from "../../reservations/components/checkin-modal";
import { CheckOutModal } from "../../reservations/components/checkout-modal";
import { ReceiptModal } from "../../reservations/components/receipt-modal";
import { RoomCard, type RoomItem } from "./room-card";

const INITIAL_ROOMS: RoomItem[] = [
  {
    number: "101",
    type: "ac",
    typeName: "Kamar AC Superior",
    floor: 1,
    price: 275000,
    status: "ready",
  },
  {
    number: "102",
    type: "ac",
    typeName: "Kamar AC Superior",
    floor: 1,
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
    number: "103",
    type: "ac",
    typeName: "Kamar AC Superior",
    floor: 1,
    price: 275000,
    status: "dirty",
  },
  {
    number: "104",
    type: "ac",
    typeName: "Kamar AC Superior",
    floor: 1,
    price: 275000,
    status: "ready",
  },
  {
    number: "201",
    type: "kipas",
    typeName: "Kamar Kipas Standar",
    floor: 2,
    price: 200000,
    status: "ready",
  },
  {
    number: "202",
    type: "kipas",
    typeName: "Kamar Kipas Standar",
    floor: 2,
    price: 200000,
    status: "ready",
  },
  {
    number: "203",
    type: "kipas",
    typeName: "Kamar Kipas Standar",
    floor: 2,
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
    number: "204",
    type: "kipas",
    typeName: "Kamar Kipas Standar",
    floor: 2,
    price: 200000,
    status: "ready",
  },
];

export function RoomMatrix() {
  const [rooms, setRooms] = useState<RoomItem[]>(INITIAL_ROOMS);
  const [filterStatus, setFilterStatus] = useState<string>("all");

  // Modals state
  const [checkInModalData, setCheckInModalData] = useState<RoomItem | null>(null);
  const [checkOutModalData, setCheckOutModalData] = useState<RoomItem | null>(null);
  const [receiptModalData, setReceiptModalData] = useState<RoomItem | null>(null);

  // Status counts
  const readyCount = rooms.filter((r) => r.status === "ready").length;
  const occupiedCount = rooms.filter((r) => r.status === "occupied").length;
  const dirtyCount = rooms.filter((r) => r.status === "dirty").length;
  const maintenanceCount = rooms.filter((r) => r.status === "maintenance").length;

  const filteredRooms = rooms.filter((room) => {
    if (filterStatus === "all") return true;
    return room.status === filterStatus;
  });

  // Handle Check-In
  const handleConfirmCheckIn = (data: CheckInFormData) => {
    setRooms((prev) =>
      prev.map((r) => {
        if (r.number === data.roomNumber) {
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

  // Handle Check-Out
  const handleConfirmCheckOut = () => {
    if (!checkOutModalData) return;
    setRooms((prev) =>
      prev.map((r) => {
        if (r.number === checkOutModalData.number) {
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

  // Handle Mark Clean (Dirty -> Ready)
  const handleMarkClean = (roomNumber: string) => {
    setRooms((prev) => prev.map((r) => (r.number === roomNumber ? { ...r, status: "ready" } : r)));
  };

  // Handle Finish Maintenance
  const handleFinishMaintenance = (roomNumber: string) => {
    setRooms((prev) => prev.map((r) => (r.number === roomNumber ? { ...r, status: "ready" } : r)));
  };

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* 4 Status Summary Cards Sub-Component */}
      <StatsOverview
        readyCount={readyCount}
        occupiedCount={occupiedCount}
        dirtyCount={dirtyCount}
        maintenanceCount={maintenanceCount}
      />

      {/* Control Bar: Title & Filter Pills */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 sm:p-4 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <h2 className="text-sm sm:text-base font-black text-slate-900 leading-tight">
            Matriks Status 8 Kamar
          </h2>
          <p className="text-[11px] text-slate-500">
            Klik kartu untuk check-in kilat, check-out pelunasan, atau kirim nota WhatsApp.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            type="button"
            onClick={() => setFilterStatus("all")}
            className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
              filterStatus === "all"
                ? "bg-slate-900 text-white shadow-xs"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            Semua ({rooms.length})
          </button>
          <button
            type="button"
            onClick={() => setFilterStatus("ready")}
            className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
              filterStatus === "ready"
                ? "bg-purple-700 text-white shadow-xs"
                : "bg-purple-50 text-purple-800 hover:bg-purple-100 border border-purple-200/60"
            }`}
          >
            Siap Pakai ({readyCount})
          </button>
          <button
            type="button"
            onClick={() => setFilterStatus("occupied")}
            className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
              filterStatus === "occupied"
                ? "bg-blue-700 text-white shadow-xs"
                : "bg-blue-50 text-blue-800 hover:bg-blue-100 border border-blue-200/60"
            }`}
          >
            Terisi ({occupiedCount})
          </button>
          <button
            type="button"
            onClick={() => setFilterStatus("dirty")}
            className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
              filterStatus === "dirty"
                ? "bg-amber-700 text-white shadow-xs"
                : "bg-amber-50 text-amber-900 hover:bg-amber-100 border border-amber-200/60"
            }`}
          >
            Perlu Bersih ({dirtyCount})
          </button>
        </div>
      </div>

      {/* 8 ROOMS GRID (4-Cols on Tablet Landscape/Desktop, 2-Cols on Tablet Portrait, 1-Col Mobile) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
        {filteredRooms.map((room) => (
          <RoomCard
            key={room.number}
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
          roomNumber={checkInModalData.number}
          roomPrice={checkInModalData.price}
          roomTypeName={checkInModalData.typeName}
          onConfirm={handleConfirmCheckIn}
        />
      )}

      {checkOutModalData && (
        <CheckOutModal
          isOpen={!!checkOutModalData}
          onClose={() => setCheckOutModalData(null)}
          roomNumber={checkOutModalData.number}
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
          roomNumber={receiptModalData.number}
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
