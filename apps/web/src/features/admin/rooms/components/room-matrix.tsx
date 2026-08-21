"use client";

import { useState } from "react";
import { type CheckInFormData, CheckInModal } from "../../reservations/components/checkin-modal";
import { CheckOutModal } from "../../reservations/components/checkout-modal";
import { ReceiptModal } from "../../reservations/components/receipt-modal";
import { RoomCard, type RoomItem } from "./room-card";
import { RoomFilterBanner } from "./room-filter-banner";

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

  // Filters state
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [floorFilter, setFloorFilter] = useState<string>("all");

  // Modals state
  const [checkInModalData, setCheckInModalData] = useState<RoomItem | null>(null);
  const [checkOutModalData, setCheckOutModalData] = useState<RoomItem | null>(null);
  const [receiptModalData, setReceiptModalData] = useState<RoomItem | null>(null);

  // Filter logic
  const filteredRooms = rooms.filter((room) => {
    if (typeFilter !== "all" && room.type !== typeFilter) return false;
    if (statusFilter !== "all" && room.status !== statusFilter) return false;
    if (floorFilter !== "all" && String(room.floor) !== floorFilter) return false;
    return true;
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
    <div className="space-y-6 sm:space-y-8">
      {/* 1. Hero Filter Banner (Mentalhy Reference Floating Filter) */}
      <RoomFilterBanner
        typeFilter={typeFilter}
        onTypeFilterChange={setTypeFilter}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        floorFilter={floorFilter}
        onFloorFilterChange={setFloorFilter}
        onSearchClick={() => {}}
      />

      {/* 2. Section Header: "Daftar 8 Unit Kamar" + Count Badge (Matching Mentalhy "Best for you [24]") */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Status 8 Unit Kamar
          </h2>
          <span className="bg-slate-200/80 text-slate-700 text-xs font-black px-2.5 py-0.5 rounded-full">
            {filteredRooms.length}
          </span>
        </div>

        <span className="text-xs font-bold text-slate-500">
          🟢 Hijau: Tersedia • 🔵 Biru: Terisi • 🟡 Kuning: Perlu Bersih • 🔴 Merah: Servis
        </span>
      </div>

      {/* 3. 3-Column / 2-Column Cards Grid (Mentalhy Layout) */}
      {filteredRooms.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
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
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-2xs space-y-2">
          <p className="text-base font-extrabold text-slate-700">
            Tidak ada kamar dengan filter ini
          </p>
          <p className="text-xs text-slate-500">
            Coba ubah opsi filter pada kotak pencarian di atas.
          </p>
        </div>
      )}

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
