"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import type { SouvenirProduct } from "@/features/souvenirs/data";
import { cartStore } from "@/features/souvenirs/hooks/use-cart";
import { ANNISA_WA_NUMBER } from "@/lib/whatsapp";
import { Calendar, Clock, Minus, Plus, Store, Tag, User } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { toast } from "sonner";

interface SouvenirOrderModalProps {
  item: SouvenirProduct | null;
  isOpen: boolean;
  onClose: () => void;
}

export function SouvenirOrderModal({ item, isOpen, onClose }: SouvenirOrderModalProps) {
  const [quantity, setQuantity] = useState<number>(1);
  const [guestName, setGuestName] = useState<string>("");
  const [guestPhone, setGuestPhone] = useState<string>("");
  const [pickupDate, setPickupDate] = useState<string>(() => {
    return new Date().toISOString().split("T")[0];
  });
  const [pickupTime, setPickupTime] = useState<string>("14:00");

  if (!item) return null;

  const unitPrice = item.priceNum;
  const totalPrice = unitPrice * quantity;

  // Format tanggal ke Bahasa Indonesia (Contoh: 23 September 2026, 14:00 WIT)
  const formattedPickupDate = pickupDate
    ? new Date(`${pickupDate}T00:00:00`).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Hari Ini";

  const effectivePickupSchedule = `${formattedPickupDate}, ${pickupTime || "14:00"} WIT`;

  const handleSendOrder = () => {
    if (!guestName.trim()) {
      toast.error("Nama pemesan wajib diisi.");
      return;
    }

    if (!guestPhone.trim()) {
      toast.error("Nomor WhatsApp wajib diisi.");
      return;
    }

    if (!pickupDate || !pickupTime) {
      toast.error("Tanggal dan jam pengambilan wajib dipilih.");
      return;
    }

    const waMessage = `*Halo Resepsionis Penginapan Annisa, saya ingin Titip Ambil Oleh-Oleh:*

*Detail Produk:*
- Nama Produk: *${item.name}*
- Kategori: *${item.categoryLabel}*
- Jumlah: *${quantity} pcs*
- Harga Satuan: *${item.price}*
- *Total Tagihan: Rp ${totalPrice.toLocaleString("id-ID")}*

*Identitas Pemesan:*
- Nama Pemesan: *${guestName.trim()}*
- No. WhatsApp: *${guestPhone.trim()}*
- *Estimasi Waktu Ambil:* *${effectivePickupSchedule}*

*Lokasi Pengambilan:* Meja Resepsionis Penginapan Annisa (750m Bandara Pattimura).
Pesanan disiapkan untuk diambil dan dibayar langsung saat tiba di penginapan. Terima kasih.`;

    const waUrl = `https://wa.me/${ANNISA_WA_NUMBER}?text=${encodeURIComponent(waMessage)}`;

    window.open(waUrl, "_blank");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md max-h-[88dvh] overflow-y-auto p-0 rounded-3xl border border-[#e9e8ea] shadow-2xl bg-white flex flex-col">
        <DialogTitle className="sr-only">Pesan {item.name}</DialogTitle>
        <DialogDescription className="sr-only">
          Formulir pemesanan titip ambil {item.name} di Resepsionis Penginapan Annisa
        </DialogDescription>

        {/* Header Visual Bar */}
        <div className="bg-[#3c315b] text-white py-3.5 px-4 sm:px-5 pr-12 rounded-t-3xl relative overflow-hidden shrink-0">
          <div className="relative z-10 flex items-center gap-3">
            {/* Foto Thumbnail Produk */}
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl overflow-hidden border border-white/20 shrink-0 bg-[#2d2445] shadow-md">
              <Image src={item.image} alt={item.name} fill unoptimized className="object-cover" />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-1 text-white/80 text-[10px] font-medium uppercase tracking-wider mb-0.5">
                <Tag className="w-2.5 h-2.5 text-white/70" />
                <span>{item.categoryLabel}</span>
              </div>
              <h2 className="text-sm sm:text-base font-medium text-white leading-tight line-clamp-1">
                {item.name}
              </h2>
              <span className="text-xs sm:text-sm font-semibold text-amber-300 mt-0.5 block">
                {item.price} <span className="text-[10px] text-white/70 font-normal">/ unit</span>
              </span>
            </div>
          </div>
        </div>

        {/* Modal Form Body */}
        <div className="p-4 sm:p-5 space-y-3 text-left">
          {/* 1. Atur Jumlah Unit */}
          <div className="bg-[#f4f2f4]/60 p-3 rounded-2xl border border-[#e9e8ea] flex items-center justify-between">
            <div>
              <span className="text-xs font-medium text-[#1c1c1c] block">Jumlah Pesanan</span>
              <span className="text-[10px] text-[#86848d]">Pilih kuantiti yang disiapkan</span>
            </div>

            <div className="flex items-center gap-2 bg-white p-1 rounded-full border border-[#e9e8ea] shadow-2xs">
              <button
                type="button"
                aria-label="Kurangi jumlah pesanan"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-6 h-6 rounded-full bg-[#f4f2f4] hover:bg-[#e9e8ea] text-[#1c1c1c] flex items-center justify-center font-bold text-xs transition cursor-pointer"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="text-xs font-semibold text-[#1c1c1c] w-5 text-center">
                {quantity}
              </span>
              <button
                type="button"
                aria-label="Tambah jumlah pesanan"
                onClick={() => setQuantity((q) => Math.min(20, q + 1))}
                className="w-6 h-6 rounded-full bg-[#3c315b] hover:bg-[#2d2445] text-white flex items-center justify-center font-bold text-xs transition cursor-pointer"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* 2. Formulir Identitas & Jadwal */}
          <div className="space-y-2.5 bg-[#f4f2f4]/60 p-3 sm:p-3.5 rounded-2xl border border-[#e9e8ea]">
            <h3 className="text-[10px] font-medium uppercase tracking-wider text-[#1c1c1c] flex items-center gap-1.5">
              <User className="w-3 h-3 text-[#3c315b]" />
              <span>Identitas &amp; Jadwal Ambil</span>
            </h3>

            {/* Nama & WA Bersisian */}
            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label
                  htmlFor="order-guest-name"
                  className="text-[10px] font-normal text-[#86848d] block mb-1"
                >
                  Nama <span className="text-rose-500">*</span>
                </label>
                <input
                  id="order-guest-name"
                  type="text"
                  aria-label="Nama Pemesan"
                  placeholder="Nama Pemesan"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full h-9 bg-white border border-[#e9e8ea] rounded-xl px-2.5 py-1 text-xs font-normal text-[#1c1c1c] outline-none focus:border-[#3c315b] transition"
                />
              </div>

              <div>
                <label
                  htmlFor="order-guest-phone"
                  className="text-[10px] font-normal text-[#86848d] block mb-1"
                >
                  No. WhatsApp <span className="text-rose-500">*</span>
                </label>
                <input
                  id="order-guest-phone"
                  type="tel"
                  aria-label="Nomor WhatsApp"
                  placeholder="081234567890"
                  value={guestPhone}
                  onChange={(e) => setGuestPhone(e.target.value)}
                  className="w-full h-9 bg-white border border-[#e9e8ea] rounded-xl px-2.5 py-1 text-xs font-normal text-[#1c1c1c] outline-none focus:border-[#3c315b] transition"
                />
              </div>
            </div>

            {/* Tanggal & Jam Pengambilan */}
            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label
                  htmlFor="order-pickup-date"
                  className="text-[10px] font-normal text-[#86848d] flex items-center gap-1 mb-1"
                >
                  <Calendar className="w-2.5 h-2.5 text-[#3c315b]" />
                  <span>
                    Tgl Ambil <span className="text-rose-500">*</span>
                  </span>
                </label>
                <input
                  id="order-pickup-date"
                  type="date"
                  aria-label="Tanggal Ambil"
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  className="w-full h-9 bg-white border border-[#e9e8ea] rounded-xl px-2.5 py-1 text-xs font-normal text-[#1c1c1c] outline-none focus:border-[#3c315b] transition cursor-pointer"
                />
              </div>

              <div>
                <label
                  htmlFor="order-pickup-time"
                  className="text-[10px] font-normal text-[#86848d] flex items-center gap-1 mb-1"
                >
                  <Clock className="w-2.5 h-2.5 text-[#3c315b]" />
                  <span>
                    Jam WIT <span className="text-rose-500">*</span>
                  </span>
                </label>
                <input
                  id="order-pickup-time"
                  type="time"
                  aria-label="Jam Pengambilan WIT"
                  value={pickupTime}
                  onChange={(e) => setPickupTime(e.target.value)}
                  className="w-full h-9 bg-white border border-[#e9e8ea] rounded-xl px-2.5 py-1 text-xs font-normal text-[#1c1c1c] outline-none focus:border-[#3c315b] transition cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* 3. Catatan Layanan */}
          <div className="bg-[#f4f2f4] px-3 py-2 rounded-2xl border border-[#e9e8ea] flex items-center gap-2 text-left">
            <Store className="w-3.5 h-3.5 text-[#3c315b] shrink-0" />
            <p className="text-[10px] text-[#3c315b] font-normal leading-tight">
              <strong>Titip Ambil:</strong> Disiapkan di meja resepsionis untuk diambil &amp;
              dibayar langsung saat tiba di penginapan.
            </p>
          </div>

          {/* 4. Total & Tombol Aksi */}
          <div className="pt-1 space-y-2.5">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs text-[#86848d] font-normal">
                Total Tagihan ({quantity} unit):
              </span>
              <strong className="text-base font-semibold text-[#1c1c1c]">
                Rp {totalPrice.toLocaleString("id-ID")}
              </strong>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  cartStore.addItem(item, quantity);
                  toast.success(`${quantity}x ${item.name} ditambahkan ke keranjang.`);
                  onClose();
                }}
                className="w-full h-10 rounded-full border-[#e9e8ea] hover:bg-[#f4f2f4] text-[#3c315b] font-normal text-xs gap-1.5 transition cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Keranjang</span>
              </Button>

              <Button
                onClick={handleSendOrder}
                className="w-full h-10 rounded-full bg-[#3c315b] hover:bg-[#2d2445] text-white font-medium text-xs sm:text-sm gap-1.5 shadow-sm transition cursor-pointer active:scale-95"
              >
                <FaWhatsapp className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
                <span>Pesan WhatsApp</span>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
