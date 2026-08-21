"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { Button } from "../../../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../../components/ui/dialog";

interface ReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  roomNumber: string;
  roomTypeName: string;
  guestName: string;
  guestPhone: string;
  checkInDate: string;
  checkOutDate: string;
  totalNights: number;
  totalAmount: number;
  dpPaid: number;
  remainingAmount: number;
}

export function ReceiptModal({
  isOpen,
  onClose,
  roomNumber,
  roomTypeName,
  guestName,
  guestPhone,
  checkInDate,
  checkOutDate,
  totalNights,
  totalAmount,
  dpPaid,
  remainingAmount,
}: ReceiptModalProps) {
  const [copied, setCopied] = useState<boolean>(false);

  const receiptText = `*🧾 BUKTI TRANSAKSI RESERVASI — PENGINAPAN ANNISA AMBON*
Jl. Bandara Pattimura, Tawiri (750m dari Bandara)
WA: 0812-4216-3116
---------------------------------------------
Halo Bpk/Ibu *${guestName}*, terima kasih telah memilih Penginapan Annisa.

*DETAIL RESERVASI:*
• No. Kamar: *Kamar #${roomNumber}* (${roomTypeName})
• Check-In: *${checkInDate}* (Mulai 06:00 WIT)
• Check-Out: *${checkOutDate}*
• Durasi: *${totalNights} Malam*

*RINCIAN BIAYA:*
• Total Tagihan: *Rp ${totalAmount.toLocaleString("id-ID")}*
• DP Dibayar: *Rp ${dpPaid.toLocaleString("id-ID")}* (LUNAS)
• Sisa Pelunasan: *Rp ${remainingAmount.toLocaleString("id-ID")}* (${remainingAmount === 0 ? "LUNAS 100%" : "Dibayar saat Check-In/Out"})

Fasilitas: 100% Kamar Mandi Dalam Pribadi, AC/Kipas, TV, WiFi Kencang, Handuk & Air Mineral.

Ada pertanyaan atau butuh petunjuk arah dari bandara? Balas pesan ini ya! 🙏✨`;

  const handleCopy = () => {
    navigator.clipboard.writeText(receiptText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendWA = () => {
    let cleanPhone = guestPhone.replace(/[^0-9]/g, "");
    if (cleanPhone.startsWith("0")) {
      cleanPhone = `62${cleanPhone.slice(1)}`;
    }
    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(receiptText)}`;
    window.open(url, "_blank");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg w-full bg-white rounded-3xl p-5 sm:p-6 shadow-2xl border border-slate-200">
        <DialogHeader className="text-left space-y-1">
          <div className="flex items-center justify-between">
            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Nota Digital WhatsApp
            </span>
            <span className="text-xs font-extrabold text-slate-500">Kamar #{roomNumber}</span>
          </div>
          <DialogTitle className="text-lg sm:text-xl font-black text-slate-900 leading-tight">
            Kirim Bukti Reservasi ke Tamu
          </DialogTitle>
          <DialogDescription className="text-xs text-slate-500">
            Tamu: <strong className="text-slate-900">{guestName}</strong> (
            {guestPhone || "Nomor WA belum diisi"})
          </DialogDescription>
        </DialogHeader>

        {/* Receipt Text Preview Box */}
        <div className="relative mt-2">
          <pre className="w-full bg-slate-900 text-purple-100 text-xs font-mono p-4 rounded-2xl overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-64 border border-slate-800 select-all">
            {receiptText}
          </pre>
          <button
            type="button"
            onClick={handleCopy}
            className="absolute top-3 right-3 bg-white/15 hover:bg-white/25 text-white p-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
            <span>{copied ? "Tersalin!" : "Salin"}</span>
          </button>
        </div>

        {/* Dialog Actions */}
        <DialogFooter className="flex flex-row items-center justify-end gap-2 pt-3">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="rounded-xl h-11 px-4 text-xs font-bold text-slate-600"
          >
            Tutup
          </Button>
          <Button
            type="button"
            onClick={handleSendWA}
            className="rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm h-11 px-5 gap-2 shadow-md cursor-pointer"
          >
            <FaWhatsapp className="w-4 h-4" />
            <span>Kirim Langsung ke WhatsApp Tamu</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
