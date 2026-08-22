"use client";

import { Calendar, RotateCw } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  AdvanceBookingData,
  AdvanceBookingModal,
} from "../../reservations/components/advance-booking-modal";
import { BookingSettlementModal } from "../../reservations/components/booking-settlement-modal";
import { CheckInFormData, CheckInModal } from "../../reservations/components/checkin-modal";
import { CheckOutModal } from "../../reservations/components/checkout-modal";
import { ReceiptModal } from "../../reservations/components/receipt-modal";
import { RoomCard, RoomItem } from "./room-card";

// 8 UNIT KAMAR RESMI PENGINAPAN ANNISA DENGAN SKENARIO REALISTIS
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
    status: "occupied",
    guestName: "Budi Santoso",
    guestPhone: "081234567890",
    checkInDate: "22 Agu 2026",
    checkOutDate: "23 Agu 2026",
    totalNights: 1,
    totalAmount: 275000,
    dpPaid: 275000,
    remainingAmount: 0, // Lunas saat Check-in
  },
  {
    code: "A3",
    building: "A",
    type: "kipas",
    typeName: "Kamar Tipe Kipas",
    price: 200000,
    status: "dirty",
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
  // SKENARIO KHUSUS: #B1 TERBOOKING WA HARI INI (SUDAH DP 50%, MENUNGGU PELUNASAN KETIKA TAMU TIBA)
  {
    code: "B1",
    building: "B",
    type: "ac",
    typeName: "Kamar Tipe AC",
    price: 275000,
    status: "booked", // 🟣 Terbooking WA
    guestName: "Hendra Pratama",
    guestPhone: "081399881122",
    checkInDate: "22 Agu 2026",
    checkOutDate: "23 Agu 2026",
    totalNights: 1,
    totalAmount: 275000,
    dpPaid: 137500,
    remainingAmount: 137500,
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
    status: "occupied",
    guestName: "Siti Rahma",
    guestPhone: "085299887766",
    checkInDate: "21 Agu 2026",
    checkOutDate: "23 Agu 2026",
    totalNights: 2,
    totalAmount: 400000,
    dpPaid: 400000,
    remainingAmount: 0, // Lunas
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
  const [rooms, setRooms] = useState<RoomItem[]>(INITIAL_ROOMS);

  // Modal State
  const [checkInModalData, setCheckInModalData] = useState<RoomItem | null>(null);
  const [checkOutModalData, setCheckOutModalData] = useState<RoomItem | null>(null);
  const [receiptModalData, setReceiptModalData] = useState<RoomItem | null>(null);
  const [settlementModalData, setSettlementModalData] = useState<RoomItem | null>(null);
  const [isAdvanceBookingOpen, setIsAdvanceBookingOpen] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  // Pisahkan Kamar Bangunan A & Bangunan B
  const roomsA = rooms.filter((r) => r.building === "A");
  const roomsB = rooms.filter((r) => r.building === "B");

  // Reset / Refresh Data Kamar ke kondisi awal
  const handleResetRooms = () => {
    setIsRefreshing(true);
    setRooms(INITIAL_ROOMS);
    toast.success("Data status 8 kamar telah di-refresh ke kondisi awal!");
    setTimeout(() => setIsRefreshing(false), 500);
  };

  // Ringkasan Status Keseluruhan
  const readyCount = rooms.filter((r) => r.status === "ready").length;
  const occupiedCount = rooms.filter((r) => r.status === "occupied").length;
  const bookedCount = rooms.filter((r) => r.status === "booked").length;
  const dirtyCount = rooms.filter((r) => r.status === "dirty").length;
  const maintenanceCount = rooms.filter((r) => r.status === "maintenance").length;

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
      })
    );
    toast.success(`Check-In Berhasil! Kamar #${data.roomNumber} kini Terisi untuk ${data.guestName}.`);
  };

  // Handle Pelunasan & Check-In Tamu Booking WA yang Baru Saja Tiba di Resepsionis
  const handleConfirmSettlement = (roomCode: string, paymentMethod: string) => {
    setRooms((prev) =>
      prev.map((r) => {
        if (r.code === roomCode) {
          return {
            ...r,
            status: "occupied",
            dpPaid: r.totalAmount || r.price, // Sudah bayar full (DP 50% + Pelunasan 50%)
            remainingAmount: 0, // Sisa Rp 0 (Lunas 100%)
          };
        }
        return r;
      })
    );
    toast.success(
      `Pelunasan Berhasil (${paymentMethod.toUpperCase()})! Kamar #${roomCode} kini Lunas 100% dan Siap Ditempati.`
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
      })
    );
    toast.info(`Check-Out Berhasil! Kamar #${checkOutModalData.code} kini masuk status Perlu Bersih.`);
  };

  // Handle Tandai Kamar Bersih (Housekeeping Selesai)
  const handleMarkClean = (roomCode: string) => {
    setRooms((prev) => prev.map((r) => (r.code === roomCode ? { ...r, status: "ready" } : r)));
    toast.success(`Kamar #${roomCode} telah bersih dan siap disewakan kembali! 🟢`);
  };

  // Handle Selesai Perbaikan
  const handleFinishMaintenance = (roomCode: string) => {
    setRooms((prev) => prev.map((r) => (r.code === roomCode ? { ...r, status: "ready" } : r)));
    toast.success(`Kamar #${roomCode} telah selesai perbaikan dan Siap Pakai! 🟢`);
  };

  // Handle Simpan Advance Booking WA
  const handleConfirmAdvanceBooking = (data: AdvanceBookingData) => {
    toast.success(
      `Jadwal Booking Disimpan! Kamar #${data.roomCode} untuk ${data.guestName} (${data.checkInDate}). DP Rp ${data.dpPaid.toLocaleString("id-ID")}`
    );
  };

  return (
    <div className="space-y-3 sm:space-y-3.5">
      {/* Top Header Strip: Status Kamar + Counter Badges + Tombol Catat Booking WA */}
      <div className="bg-white p-3 sm:py-2 sm:px-4 rounded-2xl border border-slate-200/80 shadow-2xs space-y-2.5 sm:space-y-0 sm:flex sm:items-center sm:justify-between sm:gap-3">
        {/* Baris 1: Judul Status Kamar & Tombol Aksi Cepat */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <h2 className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
              Status Kamar
            </h2>
            <span className="bg-purple-100 text-purple-900 text-[10px] font-black px-2 py-0.5 rounded-full">
              8 Unit Total
            </span>
          </div>

          {/* Tombol Aksi di Mobile (Pindah ke kanan atas) */}
          <div className="flex items-center gap-1.5 sm:hidden">
            <button
              type="button"
              onClick={() => setIsAdvanceBookingOpen(true)}
              className="px-2.5 py-1 rounded-xl bg-purple-700 hover:bg-purple-800 text-white text-[10px] font-black flex items-center gap-1 shadow-xs cursor-pointer transition"
            >
              <Calendar className="w-3 h-3" />
              <span>+ Booking WA</span>
            </button>
            <button
              type="button"
              onClick={handleResetRooms}
              title="Refresh & Reset Data Demo Kamar"
              className="p-1 rounded-xl border border-slate-200 bg-slate-50 hover:bg-purple-50 text-slate-600 hover:text-purple-700 transition cursor-pointer shadow-2xs"
            >
              <RotateCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin text-purple-700" : ""}`} />
            </button>
          </div>
        </div>

        {/* Baris 2: Status Pills Horizontal (Bisa di-scroll halus di mobile tanpa berantakan) */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-0.5 sm:py-0 text-xs font-bold shrink-0">
          <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-lg flex items-center gap-1.5 text-[11px] shrink-0">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>
              Tersedia: <strong>{readyCount}</strong>
            </span>
          </span>

          {bookedCount > 0 && (
            <span className="bg-purple-50 text-purple-900 border border-purple-200 px-2 py-0.5 rounded-lg flex items-center gap-1.5 text-[11px] shrink-0">
              <span className="w-2 h-2 rounded-full bg-purple-700" />
              <span>
                Booking WA: <strong>{bookedCount}</strong>
              </span>
            </span>
          )}

          <span className="bg-blue-50 text-blue-800 border border-blue-200 px-2 py-0.5 rounded-lg flex items-center gap-1.5 text-[11px] shrink-0">
            <span className="w-2 h-2 rounded-full bg-blue-600" />
            <span>
              Terisi: <strong>{occupiedCount}</strong>
            </span>
          </span>

          <span className="bg-amber-50 text-amber-900 border border-amber-200 px-2 py-0.5 rounded-lg flex items-center gap-1.5 text-[11px] shrink-0">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <span>
              Kotor: <strong>{dirtyCount}</strong>
            </span>
          </span>

          <span className="bg-rose-50 text-rose-800 border border-rose-200 px-2 py-0.5 rounded-lg flex items-center gap-1.5 text-[11px] shrink-0">
            <span className="w-2 h-2 rounded-full bg-rose-500" />
            <span>
              Servis: <strong>{maintenanceCount}</strong>
            </span>
          </span>

          {/* Tombol Pintas Desktop Saja */}
          <div className="hidden sm:flex items-center gap-1.5 pl-1">
            <button
              type="button"
              onClick={() => setIsAdvanceBookingOpen(true)}
              className="px-3 py-1 rounded-xl bg-purple-700 hover:bg-purple-800 text-white text-[11px] font-extrabold flex items-center gap-1 shadow-xs cursor-pointer transition"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>+ Booking WA</span>
            </button>

            <button
              type="button"
              onClick={handleResetRooms}
              title="Refresh & Reset Data Demo Kamar"
              className="p-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-purple-50 text-slate-600 hover:text-purple-700 transition cursor-pointer shadow-2xs flex items-center gap-1"
            >
              <RotateCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin text-purple-700" : ""}`} />
              <span className="text-[11px] font-extrabold hidden md:inline">Refresh</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2 BANGUNAN BERDAMPINGAN DENGAN GARIS PEMISAH DASHED LINE ELEMEN DI TENGAH */}
      <div className="bg-white/70 backdrop-blur-md rounded-3xl p-3.5 sm:p-4.5 border border-slate-200/90 shadow-2xs">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-4 lg:gap-6 items-stretch">
          {/* ====================================================
              KIRI: BANGUNAN A (4 KAMAR: #A1 s/d #A4)
              ==================================================== */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 px-1">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-700" />
              <h3 className="font-black text-xs sm:text-sm text-slate-900 tracking-tight">
                BANGUNAN A
              </h3>
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
                  onMarkClean={handleMarkClean}
                  onFinishMaintenance={handleFinishMaintenance}
                />
              ))}
            </div>
          </div>

          {/* ====================================================
              TENGAH: ELEMEN DASHED LINE PEMISAH (100% SIMETRIS RATA TENGAH)
              ==================================================== */}
          <div className="hidden lg:flex items-center justify-center px-1">
            <div className="w-[1px] h-full border-r-2 border-dashed border-slate-300 my-1" />
          </div>

          {/* ====================================================
              KANAN: BANGUNAN B (4 KAMAR: #B1 s/d #B4)
              ==================================================== */}
          <div className="space-y-3 pt-3 border-t-2 border-dashed border-slate-200 lg:border-t-0 lg:pt-0">
            <div className="flex items-center gap-2 px-1">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-700" />
              <h3 className="font-black text-xs sm:text-sm text-slate-900 tracking-tight">
                BANGUNAN B
              </h3>
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
                  onMarkClean={handleMarkClean}
                  onFinishMaintenance={handleFinishMaintenance}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* MODAL CHECK-IN REGULER */}
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

      {/* MODAL PELUNASAN & CHECK-IN KHUSUS TAMU BOOKING WA (HARI H) */}
      {settlementModalData && (
        <BookingSettlementModal
          isOpen={!!settlementModalData}
          onClose={() => setSettlementModalData(null)}
          room={settlementModalData}
          onConfirmSettlement={handleConfirmSettlement}
        />
      )}

      {/* MODAL CHECK-OUT */}
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

      {/* MODAL NOTA DIGITAL WA */}
      {receiptModalData && (
        <ReceiptModal
          isOpen={!!receiptModalData}
          onClose={() => setReceiptModalData(null)}
          roomNumber={receiptModalData.code}
          roomTypeName={receiptModalData.typeName}
          guestName={receiptModalData.guestName || "Tamu"}
          guestPhone={receiptModalData.guestPhone || ""}
          checkInDate={receiptModalData.checkInDate || "22 Agu 2026"}
          checkOutDate={receiptModalData.checkOutDate || "23 Agu 2026"}
          totalNights={receiptModalData.totalNights || 1}
          totalAmount={receiptModalData.totalAmount || receiptModalData.price}
          dpPaid={receiptModalData.dpPaid || 0}
          remainingAmount={receiptModalData.remainingAmount || 0}
        />
      )}

      {/* MODAL BOOKING WA MENDATANG */}
      {isAdvanceBookingOpen && (
        <AdvanceBookingModal
          isOpen={isAdvanceBookingOpen}
          onClose={() => setIsAdvanceBookingOpen(false)}
          onConfirm={handleConfirmAdvanceBooking}
        />
      )}
    </div>
  );
}
