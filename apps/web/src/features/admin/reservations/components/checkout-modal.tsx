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
      <DialogContent className="max-w-md w-full bg-white rounded-3xl p-5 sm:p-6 shadow-2xl border border-slate-200">
        <DialogHeader className="text-left space-y-1">
          <div className="flex items-center justify-between">
            <span className="bg-amber-100 text-amber-900 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Pelunasan &amp; Check-Out
            </span>
            <span className="text-xs font-extrabold text-slate-500">Kamar #{roomNumber}</span>
          </div>
          <DialogTitle className="text-lg sm:text-xl font-black text-slate-900 leading-tight">
            Check-Out Tamu: {guestName}
          </DialogTitle>
          <DialogDescription className="text-xs text-slate-500">
            {roomTypeName} • Menginap {totalNights} Malam
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          {/* Guest Summary Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-medium">Nama Tamu:</span>
              <strong className="text-slate-900 font-extrabold">{guestName}</strong>
            </div>
            {guestPhone && (
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-medium">No. WhatsApp:</span>
                <span className="text-slate-700 font-bold">{guestPhone}</span>
              </div>
            )}
            <div className="flex items-center justify-between pt-1 border-t border-slate-200/80">
              <span className="text-slate-500 font-medium">Total Tagihan Menginap:</span>
              <span className="text-slate-900 font-black">
                Rp {totalAmount.toLocaleString("id-ID")}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-medium">DP Yang Sudah Dibayar:</span>
              <span className="text-emerald-700 font-bold">
                - Rp {dpPaid.toLocaleString("id-ID")}
              </span>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-sm">
              <span className="font-extrabold text-slate-900">Sisa Pelunasan Wajib:</span>
              <strong className="font-black text-purple-700 text-base">
                Rp {remainingAmount.toLocaleString("id-ID")}
              </strong>
            </div>
          </div>

          {/* Payment Method Selector if remaining balance exists */}
          {remainingAmount > 0 ? (
            <div className="space-y-1.5">
              <span className="text-[11px] font-black text-slate-700 uppercase tracking-wider block">
                Metode Pelunasan Sisa Bayar:
              </span>
              <div className="grid grid-cols-3 gap-2">
                {(["cash", "qris", "transfer"] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setPaymentMethod(m)}
                    className={`py-2.5 rounded-xl text-xs font-extrabold uppercase transition-all cursor-pointer ${
                      paymentMethod === m
                        ? "bg-purple-700 text-white shadow-2xs"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {m === "cash" ? "💵 Tunai" : m === "qris" ? "📱 QRIS" : "🏦 Transfer"}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold p-3 rounded-xl flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Tagihan sudah lunas 100%. Siap diproses keluar.</span>
            </div>
          )}

          <div className="text-[11px] text-amber-800 bg-amber-50 p-2.5 rounded-xl border border-amber-200 font-medium">
            💡 Setelah check-out dikonfirmasi, status Kamar #{roomNumber} akan otomatis menjadi{" "}
            <strong>🟡 Perlu Bersih</strong> untuk housekeeping.
          </div>

          {/* Actions */}
          <DialogFooter className="flex flex-row items-center justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="rounded-xl h-11 px-4 text-xs font-bold text-slate-600"
            >
              Batal
            </Button>
            <Button
              type="submit"
              className="rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-black text-xs sm:text-sm h-11 px-5 gap-1.5 shadow-md cursor-pointer"
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
