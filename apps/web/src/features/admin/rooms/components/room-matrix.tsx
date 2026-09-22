"use client";

import { Calendar, Plus, RotateCw } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../../../../components/ui/button";
import {
  AdvanceBookingData,
  AdvanceBookingModal,
} from "../../reservations/components/advance-booking-modal";
import { BookingSettlementModal } from "../../reservations/components/booking-settlement-modal";
import {
  CheckInFormData,
  CheckInModal,
} from "../../reservations/components/checkin-modal";
import { CheckOutModal } from "../../reservations/components/checkout-modal";
import { ReceiptModal } from "../../reservations/components/receipt-modal";
import { RoomCard, RoomItem } from "./room-card";
import { RoomDetailModal } from "./room-detail-modal";

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
  const [filterStatus, setFilterStatus] = useState<string>("all");

  // Modal State
  const [checkInModalData, setCheckInModalData] = useState<RoomItem | null>(
    null,
  );
  const [checkOutModalData, setCheckOutModalData] = useState<RoomItem | null>(
    null,
  );
  const [receiptModalData, setReceiptModalData] = useState<RoomItem | null>(
    null,
  );
  const [settlementModalData, setSettlementModalData] =
    useState<RoomItem | null>(null);
  const [detailModalData, setDetailModalData] = useState<RoomItem | null>(null);
  const [isAdvanceBookingOpen, setIsAdvanceBookingOpen] =
    useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  // Pisahkan Kamar Bangunan A & Bangunan B dengan Filter
  const filteredRooms =
    filterStatus === "all"
      ? rooms
      : rooms.filter((r) => r.status === filterStatus);
  const roomsA = filteredRooms.filter((r) => r.building === "A");
  const roomsB = filteredRooms.filter((r) => r.building === "B");

  // Reset / Refresh Data Kamar ke kondisi awal
  const handleResetRooms = () => {
    setIsRefreshing(true);
    setRooms(INITIAL_ROOMS);
    toast.success("Data status 8 kamar telah di-refresh ke kondisi awal!");
    setTimeout(() => setIsRefreshing(false), 300);
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
    toast.success(
      `Pelunasan Berhasil (${paymentMethod.toUpperCase()})! Kamar #${roomCode} kini Lunas 100% dan Siap Ditempati.`,
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
    toast.info(
      `Check-Out Berhasil! Kamar #${checkOutModalData.code} kini masuk status Perlu Bersih.`,
    );
  };

  // Handle Tandai Kamar Bersih (Housekeeping Selesai)
  const handleMarkClean = (roomCode: string) => {
    setRooms((prev) =>
      prev.map((r) => (r.code === roomCode ? { ...r, status: "ready" } : r)),
    );
    toast.success(
      `Kamar #${roomCode} telah bersih dan siap disewakan kembali! 🟢`,
    );
  };

  // Handle Selesai Perbaikan
  const handleFinishMaintenance = (roomCode: string) => {
    setRooms((prev) =>
      prev.map((r) => (r.code === roomCode ? { ...r, status: "ready" } : r)),
    );
    toast.success(
      `Kamar #${roomCode} telah selesai perbaikan dan Siap Pakai! 🟢`,
    );
  };

  // Handle Simpan Advance Booking WA
  const handleConfirmAdvanceBooking = (data: AdvanceBookingData) => {
    toast.success(
      `Jadwal Booking Disimpan! Kamar #${data.roomCode} untuk ${data.guestName} (${data.checkInDate}). DP Rp ${data.dpPaid.toLocaleString("id-ID")}`,
    );
  };

  return (
    <div className="space-y-6">
      {/* 1. HEADER SECTION: Editorial Georgia + Aksi Cepat */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif font-black text-slate-900 tracking-tight leading-tight">
            Status 8 Kamar Transit
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
            Matriks ketersediaan kamar Bangunan A (Kiri) &amp; Bangunan B
            (Kanan).
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <Button
            onClick={() => setIsAdvanceBookingOpen(true)}
            className="rounded-full bg-purple-700 hover:bg-purple-800 text-white font-extrabold text-xs h-10 px-4 gap-1.5 shadow-md shadow-purple-900/20 cursor-pointer shrink-0"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>+ Catat Booking WA</span>
          </Button>

          <button
            type="button"
            onClick={handleResetRooms}
            title="Refresh Data Kamar"
            className="w-10 h-10 rounded-full border border-purple-100 bg-white hover:bg-purple-50 text-purple-700 flex items-center justify-center transition cursor-pointer shadow-2xs shrink-0"
          >
            <RotateCw
              className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* 2. CAPSULE FILTER BAR (Tri-Color dengan Micro Dot) */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        <button
          type="button"
          onClick={() => setFilterStatus("all")}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
            filterStatus === "all"
              ? "bg-purple-700 text-white shadow-2xs font-extrabold"
              : "bg-white text-slate-600 hover:bg-purple-50 border border-purple-100"
          }`}
        >
          Semua (8 Kamar)
        </button>

        <button
          type="button"
          onClick={() => setFilterStatus("ready")}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
            filterStatus === "ready"
              ? "bg-purple-700 text-white shadow-2xs font-extrabold"
              : "bg-white text-slate-700 hover:bg-purple-50 border border-purple-100"
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>Tersedia ({readyCount})</span>
        </button>

        <button
          type="button"
          onClick={() => setFilterStatus("booked")}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
            filterStatus === "booked"
              ? "bg-purple-700 text-white shadow-2xs font-extrabold"
              : "bg-white text-slate-700 hover:bg-purple-50 border border-purple-100"
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-purple-600" />
          <span>Booking WA ({bookedCount})</span>
        </button>

        <button
          type="button"
          onClick={() => setFilterStatus("occupied")}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
            filterStatus === "occupied"
              ? "bg-purple-700 text-white shadow-2xs font-extrabold"
              : "bg-white text-slate-700 hover:bg-purple-50 border border-purple-100"
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-blue-500" />
          <span>Terisi ({occupiedCount})</span>
        </button>

        <button
          type="button"
          onClick={() => setFilterStatus("dirty")}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
            filterStatus === "dirty"
              ? "bg-purple-700 text-white shadow-2xs font-extrabold"
              : "bg-white text-slate-700 hover:bg-purple-50 border border-purple-100"
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-amber-500" />
          <span>Perlu Bersih ({dirtyCount})</span>
        </button>
      </div>

      {/* 3. GRID 2 BANGUNAN DENGAN KARTU TRI-COLOR ELEGAN */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* ====================================================
            BANGUNAN A (4 KAMAR: #A1 s/d #A4)
            ==================================================== */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-700" />
              <h3 className="font-extrabold text-sm sm:text-base text-slate-900 tracking-tight">
                Bangunan A (Sisi Kiri)
              </h3>
            </div>
            <span className="text-[11px] font-bold text-slate-400">
              2 AC • 2 Kipas
            </span>
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

        {/* ====================================================
            BANGUNAN B (4 KAMAR: #B1 s/d #B4)
            ==================================================== */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-700" />
              <h3 className="font-extrabold text-sm sm:text-base text-slate-900 tracking-tight">
                Bangunan B (Sisi Kanan)
              </h3>
            </div>
            <span className="text-[11px] font-bold text-slate-400">
              2 AC • 2 Kipas
            </span>
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

      {/* ====================================================
          MODAL-MODAL INTERAKTIF OPERASIONAL
          ==================================================== */}
      {checkInModalData && (
        <CheckInModal
          isOpen={!!checkInModalData}
          onClose={() => setCheckInModalData(null)}
          onConfirm={handleConfirmCheckIn}
          roomNumber={checkInModalData.code}
          roomPrice={checkInModalData.price}
          roomTypeName={checkInModalData.typeName}
        />
      )}

      {checkOutModalData && (
        <CheckOutModal
          isOpen={!!checkOutModalData}
          onClose={() => setCheckOutModalData(null)}
          onConfirm={handleConfirmCheckOut}
          roomCode={checkOutModalData.code}
          guestName={checkOutModalData.guestName || "Tamu"}
          remainingPayment={checkOutModalData.remainingAmount || 0}
        />
      )}

      {receiptModalData && (
        <ReceiptModal
          isOpen={!!receiptModalData}
          onClose={() => setReceiptModalData(null)}
          transaction={{
            id: `REC-${receiptModalData.code}-${Date.now().toString().slice(-4)}`,
            guestName: receiptModalData.guestName || "Tamu",
            roomNumber: receiptModalData.code,
            roomType: receiptModalData.typeName,
            checkInDate: receiptModalData.checkInDate || "22 Agu 2026",
            checkOutDate: receiptModalData.checkOutDate || "23 Agu 2026",
            durationNights: receiptModalData.totalNights || 1,
            ratePerNight: receiptModalData.price,
            totalPayment:
              receiptModalData.totalAmount || receiptModalData.price,
            paymentMethod: "Tunai / QRIS",
            createdAt: "22 Agu 2026, 14:00 WIT",
          }}
        />
      )}

      {settlementModalData && (
        <BookingSettlementModal
          isOpen={!!settlementModalData}
          onClose={() => setSettlementModalData(null)}
          onConfirm={handleConfirmSettlement}
          booking={{
            roomCode: settlementModalData.code,
            guestName: settlementModalData.guestName || "Tamu",
            guestPhone: settlementModalData.guestPhone || "081234567890",
            checkInDate: settlementModalData.checkInDate || "22 Agu 2026",
            totalAmount:
              settlementModalData.totalAmount || settlementModalData.price,
            dpPaid: settlementModalData.dpPaid || settlementModalData.price / 2,
            remainingAmount:
              settlementModalData.remainingAmount ||
              settlementModalData.price / 2,
          }}
        />
      )}

      {detailModalData && (
        <RoomDetailModal
          isOpen={!!detailModalData}
          onClose={() => setDetailModalData(null)}
          room={detailModalData}
          onCheckIn={(room) => {
            setDetailModalData(null);
            setCheckInModalData(room);
          }}
          onCheckOut={(room) => {
            setDetailModalData(null);
            setCheckOutModalData(room);
          }}
          onPrintReceipt={(room) => {
            setDetailModalData(null);
            setReceiptModalData(room);
          }}
          onMarkClean={(roomCode) => {
            setDetailModalData(null);
            handleMarkClean(roomCode);
          }}
          onFinishMaintenance={(roomCode) => {
            setDetailModalData(null);
            handleFinishMaintenance(roomCode);
          }}
        />
      )}

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
