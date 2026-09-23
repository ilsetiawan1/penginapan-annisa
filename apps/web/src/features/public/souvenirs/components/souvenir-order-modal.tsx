"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Clock,
  Info,
  Minus,
  Plus,
  ShoppingBag,
  Store,
  Tag,
  User,
  Phone,
  Calendar,
  CheckCircle2,
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
  const [pickupOption, setPickupOption] = useState<string>(
    "Hari ini saat transit (14:00 WIT)",
  );
  const [customPickup, setCustomPickup] = useState<string>("");
  const [notes, setNotes] = useState<string>("");

  if (!item) return null;

  const unitPrice = item.priceNum;
  const totalPrice = unitPrice * quantity;

  const pickupPresets = [
    "Hari ini saat transit (14:00 WIT)",
    "Besok pagi sebelum flight (06:00 WIT)",
    "Saat Check-In kamar",
    "Lainnya (Tentukan Jam)",
  ];

  const effectivePickupTime =
    pickupOption === "Lainnya (Tentukan Jam)"
      ? customPickup || "Waktu belum ditentukan"
      : pickupOption;

  const handleSendOrder = () => {
    if (!guestName.trim()) {
      toast.error("Mohon masukkan nama lengkap pemesan.");
      return;
    }

    if (
      pickupOption === "Lainnya (Tentukan Jam)" &&
      !customPickup.trim()
    ) {
      toast.error("Mohon isi estimasi jam pengambilan.");
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
• No. WhatsApp: *${guestPhone.trim() || "-"}*
• *Estimasi Waktu Ambil:* *${effectivePickupTime}*
• Catatan Khusus: *${notes.trim() || "-"}*

📍 *Lokasi Pengambilan:* Meja Resepsionis Penginapan Annisa (750m Bandara Pattimura).
Mohon disiapkan & dikemas rapi ya. Terima kasih! 🙏`;

    const waUrl = `https://wa.me/${ANNISA_WA_NUMBER}?text=${encodeURIComponent(
      waMessage,
    )}`;

    window.open(waUrl, "_blank");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-lg max-h-[95dvh] overflow-y-auto p-0 rounded-3xl border-0 shadow-2xl bg-[#faf9fc] flex flex-col">
        {/* Header Visual Bar */}
        <div className="bg-gradient-to-r from-purple-900 to-indigo-950 text-white p-5 sm:p-6 rounded-t-3xl relative overflow-hidden">
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none" />

          <div className="relative z-10 flex items-center gap-3.5">
            {/* Foto Thumbnail Produk */}
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border border-white/20 shrink-0 bg-slate-800 shadow-md">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5 text-purple-200 text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-1">
                <Tag className="w-3 h-3 text-purple-300" />
                <span>{item.categoryLabel}</span>
              </div>
              <h2 className="text-base sm:text-lg font-serif font-black text-white leading-snug line-clamp-2">
                {item.name}
              </h2>
              <span className="text-sm sm:text-base font-black text-amber-400 mt-0.5 block">
                {item.price} <span className="text-[10px] text-purple-200 font-normal">/ unit</span>
              </span>
            </div>
          </div>
        </div>

        {/* Modal Form Body */}
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-5 text-left">
          {/* 1. Atur Jumlah Unit */}
          <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200/90 shadow-2xs flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-800 block">
                Jumlah Pesanan
              </span>
              <span className="text-[11px] text-slate-500 font-medium">
                Pilih kuantiti yang ingin disiapkan
              </span>
            </div>

            <div className="flex items-center gap-3 bg-purple-50 p-1.5 rounded-xl border border-purple-100">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-7 h-7 rounded-lg bg-white hover:bg-purple-100 text-purple-900 flex items-center justify-center font-bold text-xs transition cursor-pointer shadow-2xs"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="text-sm font-black text-purple-950 w-6 text-center">
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

          {/* 2. Formulir Identitas Pemesan */}
          <div className="space-y-3 bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-purple-700" />
              <span>Identitas &amp; Rencana Pengambilan</span>
            </h3>

            {/* Nama Pemesan */}
            <div>
              <label className="text-[11px] font-bold text-slate-700 block mb-1">
                Nama Lengkap Pemesan <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Contoh: Budi Santoso"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                className="w-full bg-[#faf9fd] border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 outline-none focus:border-purple-600 focus:bg-white transition"
              />
            </div>

            {/* No WhatsApp */}
            <div>
              <label className="text-[11px] font-bold text-slate-700 block mb-1">
                Nomor WhatsApp (Opsional)
              </label>
              <input
                type="tel"
                placeholder="Contoh: 081234567890"
                value={guestPhone}
                onChange={(e) => setGuestPhone(e.target.value)}
                className="w-full bg-[#faf9fd] border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 outline-none focus:border-purple-600 focus:bg-white transition"
              />
            </div>

            {/* Pilihan Waktu Pengambilan */}
            <div>
              <label className="text-[11px] font-bold text-slate-700 block mb-1.5">
                Estimasi Waktu Pengambilan di Resepsionis <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {pickupPresets.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setPickupOption(preset)}
                    className={`px-3 py-2 rounded-xl text-[11px] font-bold text-left transition cursor-pointer border ${
                      pickupOption === preset
                        ? "bg-purple-700 text-white border-purple-700 shadow-2xs"
                        : "bg-[#faf9fd] text-slate-700 border-slate-200 hover:bg-purple-50"
                    }`}
                  >
                    {preset}
                  </button>
                ))}
              </div>

              {pickupOption === "Lainnya (Tentukan Jam)" && (
                <input
                  type="text"
                  placeholder="Tuliskan tanggal & jam (Contoh: 24 Sep, 19.30 WIT)"
                  value={customPickup}
                  onChange={(e) => setCustomPickup(e.target.value)}
                  className="w-full mt-2 bg-[#faf9fd] border border-purple-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 outline-none focus:border-purple-600 focus:bg-white transition"
                />
              )}
            </div>

            {/* Catatan Khusus */}
            <div>
              <label className="text-[11px] font-bold text-slate-700 block mb-1">
                Catatan Tambahan (Opsional)
              </label>
              <input
                type="text"
                placeholder="Contoh: Tolong dikemas aman untuk bagasi kabin pesawat"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-[#faf9fd] border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 outline-none focus:border-purple-600 focus:bg-white transition"
              />
            </div>
          </div>

          {/* 3. Catatan Edukasi & Marketing Layanan Titip Ambil */}
          <div className="bg-purple-50/80 p-3.5 sm:p-4 rounded-2xl border border-purple-200/80 flex items-start gap-3 text-left">
            <div className="w-8 h-8 rounded-xl bg-purple-200/80 text-purple-900 flex items-center justify-center shrink-0 mt-0.5">
              <Store className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-extrabold text-purple-950 flex items-center gap-1">
                <span>Konsep Layanan Self Pick-Up Resepsionis</span>
              </h4>
              <p className="text-[11px] text-purple-900/80 leading-relaxed mt-1">
                Layanan <strong>Titip Ambil</strong> ini disiapkan khusus untuk tamu transit agar hemat waktu. Produk pesanan Anda akan langsung <strong>dikemas rapi dan disimpan di Meja Resepsionis Penginapan Annisa (750m dari Bandara Pattimura)</strong>. Anda cukup mengambil dan melakukan pembayaran saat tiba di lokasi.
              </p>
            </div>
          </div>

          {/* 4. Total Kalkulasi & Tombol Eksekusi WA */}
          <div className="pt-2">
            <div className="flex items-center justify-between mb-3 px-1">
              <span className="text-xs font-bold text-slate-600">
                Total Pembayaran ({quantity} item):
              </span>
              <strong className="text-lg sm:text-xl font-black text-purple-800">
                Rp {totalPrice.toLocaleString("id-ID")}
              </strong>
            </div>

            <Button
              onClick={handleSendOrder}
              className="w-full h-11 sm:h-12 rounded-2xl bg-purple-700 hover:bg-purple-800 text-white font-extrabold text-xs sm:text-sm gap-2 shadow-md shadow-purple-900/20 hover:shadow-lg transition cursor-pointer"
            >
              <FaWhatsapp className="w-4 h-4" />
              <span>Kirim Pesanan Titip Ambil ke WhatsApp</span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
