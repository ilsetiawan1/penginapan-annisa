"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Banknote, Landmark, LogOut, QrCode } from "lucide-react";
import { useState } from "react";

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
  totalNights,
  totalAmount,
  dpPaid,
  remainingAmount,
  onConfirmCheckOut,
}: CheckOutModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "qris" | "transfer">("cash");
  const isFullyPaid = remainingAmount <= 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirmCheckOut(paymentMethod);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg w-[95vw] bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-2xl border border-slate-100 text-slate-900">
        {/* Header Modal Clean Minimalist */}
        <DialogHeader className="text-left pb-3 border-b border-slate-100">
          <DialogTitle className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
            Check-Out Kamar #{roomNumber}
          </DialogTitle>
          <DialogDescription className="text-xs sm:text-sm text-slate-500 mt-0.5">
            {roomTypeName} • Tamu:{" "}
            <strong className="text-slate-800 font-semibold">{guestName}</strong>
          </DialogDescription>
        </DialogHeader>

        {/* Content & Form */}
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          {/* Card Rincian Biaya Ringkas */}
          <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-200/70 space-y-2.5 text-xs sm:text-sm">
            <div className="flex items-center justify-between text-slate-600">
              <span>Durasi Menginap</span>
              <span className="font-semibold text-slate-900">{totalNights} Malam</span>
            </div>
            <div className="flex items-center justify-between text-slate-600">
              <span>Total Biaya Kamar</span>
              <span className="font-semibold text-slate-900">
                Rp {totalAmount.toLocaleString("id-ID")}
              </span>
            </div>
            {dpPaid > 0 && !isFullyPaid && (
              <div className="flex items-center justify-between text-slate-600">
                <span>DP Sudah Dibayar</span>
                <span className="font-semibold text-emerald-700">
                  - Rp {dpPaid.toLocaleString("id-ID")}
                </span>
              </div>
            )}
            <div className="pt-2.5 border-t border-slate-200/80 flex items-center justify-between">
              <span className="font-medium text-slate-600">
                {isFullyPaid ? "Status Tagihan" : "Sisa Tagihan"}
              </span>
              <strong
                className={
                  isFullyPaid
                    ? "text-emerald-700 font-bold"
                    : "text-amber-800 font-bold text-sm sm:text-base"
                }
              >
                {isFullyPaid ? "Lunas (Rp 0)" : `Rp ${remainingAmount.toLocaleString("id-ID")}`}
              </strong>
            </div>
          </div>

          {/* Section Pilihan Metode Pelunasan (Hanya Tampil Jika Belum Lunas) */}
          {!isFullyPaid && (
            <div className="space-y-2">
              <span className="text-xs font-semibold text-slate-700 block">
                Metode Pelunasan Kasir
              </span>
              <div className="grid grid-cols-3 gap-2">
                {(
                  [
                    { id: "cash", label: "Tunai", icon: Banknote },
                    { id: "qris", label: "QRIS", icon: QrCode },
                    { id: "transfer", label: "Transfer", icon: Landmark },
                  ] as const
                ).map(({ id, label, icon: Icon }) => {
                  const isActive = paymentMethod === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setPaymentMethod(id)}
                      className={`py-2.5 px-3 rounded-xl text-xs font-medium transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                        isActive
                          ? "bg-[#3c315b] text-white shadow-xs"
                          : "bg-slate-50 border border-slate-200/80 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 shrink-0" />
                      <span>{label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Banner Keterangan Housekeeping */}
          <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200/60 text-xs text-amber-900 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
            <span>
              Setelah check-out, status kamar otomatis beralih ke <strong>Perlu Bersih</strong>{" "}
              untuk housekeeping.
            </span>
          </div>

          {/* Footer Actions */}
          <DialogFooter className="flex flex-row items-center justify-end gap-2 pt-3 border-t border-slate-100">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="rounded-full border border-[#e9e8ea] text-[#1c1c1c] hover:bg-[#f4f2f4] h-11 px-5 text-sm font-medium transition-colors cursor-pointer"
            >
              Batal
            </Button>
            <Button
              type="submit"
              className="bg-[#3c315b] hover:bg-[#2d2445] text-white font-medium rounded-full h-11 px-6 text-sm transition-all shadow-sm flex items-center gap-2 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>{isFullyPaid ? "Konfirmasi Check-Out" : "Lunasi & Check-Out"}</span>
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
