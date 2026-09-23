"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Clock,
  Minus,
  Plus,
  Store,
  Tag,
  User,
  Phone,
  Calendar,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ANNISA_WA_NUMBER } from "@/lib/whatsapp";
import type { SouvenirProduct } from "../data";
import { toast } from "sonner";

interface SouvenirOrderModalProps {
  item: SouvenirProduct | null;
  isOpen: boolean;
  onClose: () => void;
}

export function SouvenirOrderModal({
  item,
  isOpen,
  onClose,
}: SouvenirOrderModalProps) {
  const [quantity, setQuantity] = useState<number>(1);
  const [guestName, setGuestName] = useState<string>("");
  const [guestPhone, setGuestPhone] = useState<string>("");
  const [pickupDate, setPickupDate] = useState<string>(() => {
    return new Date().toISOString().split("T")[0];
  });
  const [pickupTime, setPickupTime] = useState<string>("14:00");
  const [notes, setNotes] = useState<string>("");

  if (!item) return null;

  const unitPrice = item.priceNum;
  const totalPrice = unitPrice * quantity;

  // Format tanggal ke Bahasa Indonesia (Contoh: 23 September 2026, 14:00 WIT)
  const formattedPickupDate = pickupDate
    ? new Date(pickupDate + "T00:00:00").toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Hari Ini";

  const effectivePickupSchedule = `${formattedPickupDate}, ${pickupTime || "14:00"} WIT`;

  const handleSendOrder = () => {
    if (!guestName.trim()) {
      toast.error("Mohon masukkan nama lengkap pemesan.");
      return;
    }

    if (!guestPhone.trim()) {
      toast.error("Mohon masukkan nomor WhatsApp aktif Anda.");
      return;
    }

    if (!pickupDate || !pickupTime) {
      toast.error("Mohon tentukan tanggal dan jam pengambilan.");
      return;
    }

    const waMessage = `*Halo Resepsionis Penginapan Annisa, saya ingin Titip Ambil Oleh-Oleh:*

🛍️ *Detail Produk:*
• Nama Produk: *${item.name}*
• Kategori: *${item.categoryLabel}*
• Jumlah: *${quantity} pcs*
• Harga Satuan: *${item.price}*
• *Total Tagihan: Rp ${totalPrice.toLocaleString("id-ID")}*

👤 *Identitas Pemesan:*
• Nama Pemesan: *${guestName.trim()}*
• No. WhatsApp: *${guestPhone.trim()}*
• *Estimasi Waktu Ambil:* *${effectivePickupSchedule}*
• Catatan Khusus: *${notes.trim() || "-"}*

📍 *Lokasi Pengambilan:* Meja Resepsionis Penginapan Annisa (750m Bandara Pattimura).
Mohon disiapkan sebelum kedatangan saya. Terima kasih! 🙏`;

    const waUrl = `https://wa.me/${ANNISA_WA_NUMBER}?text=${encodeURIComponent(
      waMessage,
    )}`;

    window.open(waUrl, "_blank");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md max-h-[92dvh] overflow-y-auto p-0 rounded-3xl border-0 shadow-2xl bg-[#faf9fc] flex flex-col">
        {/* Header Visual Bar */}
        <div className="bg-gradient-to-r from-purple-900 via-purple-950 to-indigo-950 text-white p-4 sm:p-5 rounded-t-3xl relative overflow-hidden shrink-0">
          <div className="absolute -bottom-6 -right-6 w-28 h-28 bg-white/10 rounded-full blur-xl pointer-events-none" />

          <div className="relative z-10 flex items-center gap-3">
            {/* Foto Thumbnail Produk */}
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden border border-white/20 shrink-0 bg-slate-800 shadow-md">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5 text-purple-200 text-[10px] font-bold uppercase tracking-wider mb-0.5">
                <Tag className="w-2.5 h-2.5 text-purple-300" />
                <span>{item.categoryLabel}</span>
              </div>
              <h2 className="text-sm sm:text-base font-serif font-black text-white leading-tight line-clamp-1">
                {item.name}
              </h2>
              <span className="text-xs sm:text-sm font-black text-amber-400 mt-0.5 block">
                {item.price}{" "}
                <span className="text-[10px] text-purple-200 font-normal">
                  / unit
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* Modal Form Body */}
        <div className="p-4 sm:p-5 space-y-3.5 text-left">
          {/* 1. Atur Jumlah Unit */}
          <div className="bg-white p-3 rounded-2xl border border-slate-200/90 shadow-2xs flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-800 block">
                Jumlah Pesanan
              </span>
              <span className="text-[10px] text-slate-400 font-medium">
                Pilih kuantiti yang disiapkan
              </span>
            </div>

            <div className="flex items-center gap-2.5 bg-purple-50 p-1 rounded-xl border border-purple-100">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-7 h-7 rounded-lg bg-white hover:bg-purple-100 text-purple-900 flex items-center justify-center font-bold text-xs transition cursor-pointer shadow-2xs"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="text-xs font-black text-purple-950 w-5 text-center">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.min(20, q + 1))}
                className="w-7 h-7 rounded-lg bg-purple-700 hover:bg-purple-800 text-white flex items-center justify-center font-bold text-xs transition cursor-pointer shadow-2xs"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* 2. Formulir Identitas & Jadwal */}
          <div className="space-y-2.5 bg-white p-3.5 rounded-2xl border border-slate-200/90 shadow-2xs">
            <h3 className="text-[11px] font-black uppercase tracking-wider text-slate-900 flex items-center gap-1.5 mb-1">
              <User className="w-3.5 h-3.5 text-purple-700" />
              <span>Identitas &amp; Jadwal Ambil</span>
            </h3>

            {/* Nama & WA Bersisian */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] font-bold text-slate-700 block mb-1">
                  Nama Pemesan <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Budi Santoso"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full bg-[#faf9fd] border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs font-semibold text-slate-900 outline-none focus:border-purple-600 focus:bg-white transition"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-700 block mb-1">
                  Nomor WhatsApp <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="Contoh: 081234567890"
                  value={guestPhone}
                  onChange={(e) => setGuestPhone(e.target.value)}
                  className="w-full bg-[#faf9fd] border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs font-semibold text-slate-900 outline-none focus:border-purple-600 focus:bg-white transition"
                />
              </div>
            </div>

            {/* Tanggal & Jam Pengambilan (Ramping & Presisi) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-0.5">
              <div>
                <label className="text-[10px] font-bold text-slate-700 flex items-center gap-1 mb-1">
                  <Calendar className="w-3 h-3 text-purple-600" />
                  <span>Tanggal Ambil <span className="text-red-500">*</span></span>
                </label>
                <input
                  type="date"
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  className="w-full bg-[#faf9fd] border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs font-bold text-slate-900 outline-none focus:border-purple-600 focus:bg-white transition"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-700 flex items-center gap-1 mb-1">
                  <Clock className="w-3 h-3 text-purple-600" />
                  <span>Jam Ambil (WIT) <span className="text-red-500">*</span></span>
                </label>
                <input
                  type="time"
                  value={pickupTime}
                  onChange={(e) => setPickupTime(e.target.value)}
                  className="w-full bg-[#faf9fd] border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs font-bold text-slate-900 outline-none focus:border-purple-600 focus:bg-white transition"
                />
              </div>
            </div>

            {/* Catatan Khusus */}
            <div className="pt-0.5">
              <label className="text-[10px] font-bold text-slate-700 block mb-1">
                Catatan Tambahan (Opsional)
              </label>
              <input
                type="text"
                placeholder="Contoh: Tolong dikemas aman bagasi pesawat"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-[#faf9fd] border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs font-semibold text-slate-900 outline-none focus:border-purple-600 focus:bg-white transition"
              />
            </div>
          </div>

          {/* 3. Catatan Ringkas & Padat Konsep Layanan */}
          <div className="bg-purple-50/70 p-2.5 sm:p-3 rounded-2xl border border-purple-200/60 flex items-center gap-2.5 text-left">
            <div className="w-7 h-7 rounded-lg bg-purple-200 text-purple-900 flex items-center justify-center shrink-0">
              <Store className="w-3.5 h-3.5" />
            </div>
            <p className="text-[10px] sm:text-[11px] text-purple-950 font-medium leading-tight">
              <strong>Layanan Titip Ambil (Self Pick-Up):</strong> Pesanan disiapkan di meja resepsionis untuk diambil &amp; dibayar langsung saat tiba di penginapan (tanpa pengiriman kurir).
            </p>
          </div>

          {/* 4. Total & Tombol Kirim WhatsApp */}
          <div className="pt-1">
            <div className="flex items-center justify-between mb-2.5 px-1">
              <span className="text-[11px] font-bold text-slate-500">
                Total Tagihan ({quantity} unit):
              </span>
              <strong className="text-base sm:text-lg font-black text-purple-800">
                Rp {totalPrice.toLocaleString("id-ID")}
              </strong>
            </div>

            <Button
              onClick={handleSendOrder}
              className="w-full h-10 sm:h-11 rounded-2xl bg-purple-700 hover:bg-purple-800 text-white font-extrabold text-xs sm:text-sm gap-2 shadow-md shadow-purple-900/20 hover:shadow-lg transition cursor-pointer"
            >
              <FaWhatsapp className="w-4 h-4" />
              <span>Kirim Pesanan ke WhatsApp Resepsionis</span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
