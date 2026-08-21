"use client";

import { Check, LogOut } from "lucide-react";
import { useState } from "react";
import { Button } from "../../../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../../components/ui/dialog";

interface CheckOutModalProps {
  isOpen: boolean;
  onClose: () => void;
  roomNumber: string;
  roomTypeName: string;
  guestName: string;
  guestPhone?: string;
  totalNights: number;
  totalAmount: number;
  dpPaid: number;
  remainingAmount: number;
  onConfirmCheckOut: (paymentMethod: "cash" | "qris" | "transfer") => void;
}

export function CheckOutModal({
  isOpen,
  onClose,
  roomNumber,
  roomTypeName,
  guestName,
  guestPhone,
  totalNights,
  totalAmount,
  dpPaid,
  remainingAmount,
  onConfirmCheckOut,
}: CheckOutModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "qris" | "transfer">("cash");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirmCheckOut(paymentMethod);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl w-[95vw] bg-white rounded-3xl p-4 sm:p-5 shadow-2xl border border-slate-200">
        <DialogHeader className="text-left pb-1 border-b border-slate-100 flex flex-row items-center justify-between">
          <div>
            <span className="bg-amber-100 text-amber-900 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Pelunasan &amp; Check-Out
            </span>
            <DialogTitle className="text-base sm:text-lg font-black text-slate-900 leading-tight mt-0.5">
              Check-Out Kamar #{roomNumber} ({roomTypeName})
            </DialogTitle>
          </div>
          <span className="text-xs font-extrabold text-slate-500">
            Tamu: <strong className="text-slate-900">{guestName}</strong>
          </span>
        </DialogHeader>

        {/* 2 Kolom Landscape */}
        <form onSubmit={handleSubmit} className="space-y-3 pt-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 items-start">
            {/* Kolom Kiri: Rincian Tagihan */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Durasi Menginap:</span>
                <strong className="text-slate-900 font-bold">{totalNights} Malam</strong>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Total Biaya Kamar:</span>
                <strong className="text-slate-900 font-bold">
                  Rp {totalAmount.toLocaleString("id-ID")}
                </strong>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">DP Sudah Dibayar:</span>
                <strong className="text-emerald-700 font-bold">
                  - Rp {dpPaid.toLocaleString("id-ID")}
                </strong>
              </div>
              <div className="flex items-center justify-between pt-1.5 border-t border-slate-200 text-xs">
                <span className="font-extrabold text-slate-700">Sisa Harus Dilunasi:</span>
                <strong className="text-sm font-black text-amber-800">
                  Rp {remainingAmount.toLocaleString("id-ID")}
                </strong>
              </div>
            </div>

            {/* Kolom Kanan: Metode Pelunasan & Aksi */}
            <div className="space-y-3">
              <div className="space-y-1">
                <span className="text-[10px] font-black text-slate-700 uppercase tracking-wider block">
                  Metode Pelunasan Kasir
                </span>
                <div className="grid grid-cols-3 gap-1.5">
                  {(["cash", "qris", "transfer"] as const).map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setPaymentMethod(m)}
                      className={`py-2 rounded-xl text-xs font-extrabold uppercase transition-all cursor-pointer ${
                        paymentMethod === m
                          ? "bg-slate-900 text-white shadow-2xs"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {m === "cash" ? "💵 Tunai" : m === "qris" ? "📱 QRIS" : "🏦 Transfer"}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-2 rounded-xl bg-amber-50/70 border border-amber-200/70 text-[11px] text-amber-900 font-medium">
                Setelah check-out, status kamar otomatis berubah ke 🟡 <strong>Perlu Bersih</strong>{" "}
                untuk housekeeping.
              </div>
            </div>
          </div>

          <DialogFooter className="flex flex-row items-center justify-end gap-2 pt-2 border-t border-slate-100">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="rounded-xl h-9 px-4 text-xs font-bold text-slate-600 cursor-pointer"
            >
              Batal
            </Button>
            <Button
              type="submit"
              className="rounded-xl bg-slate-900 hover:bg-slate-950 text-white font-black text-xs sm:text-sm h-9 px-5 gap-1.5 shadow-md cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Konfirmasi Pelunasan &amp; Check-Out</span>
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
