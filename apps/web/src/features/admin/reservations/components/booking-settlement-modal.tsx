"use client";

import { CheckCircle2, DollarSign, User, X } from "lucide-react";
import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { Button } from "../../../../components/ui/button";
import type { RoomItem } from "../../rooms/components/room-card";

interface BookingSettlementModalProps {
  isOpen: boolean;
  onClose: () => void;
  room: RoomItem;
  onConfirmSettlement: (roomCode: string, paymentMethod: string) => void;
}

export function BookingSettlementModal({
  isOpen,
  onClose,
  room,
  onConfirmSettlement,
}: BookingSettlementModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<string>("tunai");

  if (!isOpen) return null;

  const total = room.totalAmount || room.price;
  const dp = room.dpPaid || Math.round(total * 0.5);
  const remaining = room.remainingAmount !== undefined ? room.remainingAmount : total - dp;

  const handleConfirm = () => {
    onConfirmSettlement(room.code, paymentMethod);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[999] bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-lg overflow-hidden flex flex-col justify-between">
        {/* Header Modal */}
        <div className="bg-purple-700 text-white p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center font-black text-sm">
              #{room.code}
            </div>
            <div>
              <span className="text-[10px] font-bold text-purple-200 uppercase tracking-wider block">
                Tamu Tiba di Meja Resepsionis
              </span>
              <h3 className="text-base sm:text-lg font-black leading-tight">
                Pelunasan &amp; Check-In Kamar #{room.code}
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup modal"
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body Modal */}
        <div className="p-4 sm:p-5 space-y-3.5 text-left">
          {/* Data Tamu Booking */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3 space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">Nama Tamu Pemesan:</span>
              <strong className="text-slate-900 font-black">{room.guestName || "Hendra Pratama"}</strong>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">No. WhatsApp:</span>
              <strong className="text-slate-900 font-bold">{room.guestPhone || "081399881122"}</strong>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">Tipe Kamar &amp; Durasi:</span>
              <strong className="text-purple-950 font-bold">
                {room.typeName} • {room.totalNights || 1} Malam
              </strong>
            </div>
          </div>

          {/* Rincian Finansial & DP */}
          <div className="bg-purple-50/70 border border-purple-100 rounded-2xl p-3 space-y-1.5 text-xs">
            <div className="flex items-center justify-between text-slate-600">
              <span>Total Tarif Sewa:</span>
              <span className="font-bold text-slate-900">Rp {total.toLocaleString("id-ID")}</span>
            </div>
            <div className="flex items-center justify-between text-emerald-800">
              <span>DP 50% yang Sudah Masuk (Transfer WA):</span>
              <strong className="font-black text-emerald-700">- Rp {dp.toLocaleString("id-ID")}</strong>
            </div>

            <div className="pt-2 border-t border-purple-200 flex items-center justify-between text-sm">
              <span className="font-black text-purple-950">SISA WAJIB DIBAYAR SEKARANG:</span>
              <strong className="text-base font-black text-purple-900">
                Rp {remaining.toLocaleString("id-ID")}
              </strong>
            </div>
          </div>

          {/* Pilihan Metode Pelunasan */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-black text-slate-700 uppercase tracking-wider block">
              Metode Pembayaran Sisa Pelunasan:
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setPaymentMethod("tunai")}
                className={`py-2 rounded-xl border text-xs font-black transition cursor-pointer ${
                  paymentMethod === "tunai"
                    ? "bg-purple-700 text-white border-purple-700 shadow-xs"
                    : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
                }`}
              >
                💵 Tunai
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod("qris")}
                className={`py-2 rounded-xl border text-xs font-black transition cursor-pointer ${
                  paymentMethod === "qris"
                    ? "bg-purple-700 text-white border-purple-700 shadow-xs"
                    : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
                }`}
              >
                📱 QRIS
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod("transfer")}
                className={`py-2 rounded-xl border text-xs font-black transition cursor-pointer ${
                  paymentMethod === "transfer"
                    ? "bg-purple-700 text-white border-purple-700 shadow-xs"
                    : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
                }`}
              >
                🏦 Transfer
              </button>
            </div>
          </div>
        </div>

        {/* Footer Tombol Aksi */}
        <div className="p-4 sm:p-5 pt-0 flex items-center justify-end gap-2 border-t border-slate-100 mt-2">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="rounded-xl text-xs font-bold h-10 px-4 cursor-pointer"
          >
            Batal
          </Button>

          <Button
            type="button"
            onClick={handleConfirm}
            className="rounded-xl bg-purple-700 hover:bg-purple-800 text-white text-xs sm:text-sm font-black h-10 px-5 gap-1.5 shadow-md cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Terima Pelunasan &amp; Serahkan Kunci</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
