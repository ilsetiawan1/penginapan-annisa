"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Calendar,
  Clock,
  Minus,
  Plus,
  ShoppingBag,
  Store,
  Trash2,
  User,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ANNISA_WA_NUMBER } from "@/lib/whatsapp";
import { useCart } from "../hooks/use-cart";
import { toast } from "sonner";

interface CartDrawerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawerModal({ isOpen, onClose }: CartDrawerModalProps) {
  const { items, totalPrice, totalItemsCount, updateQuantity, removeItem, clearCart } =
    useCart();

  const [guestName, setGuestName] = useState<string>("");
  const [guestPhone, setGuestPhone] = useState<string>("");
  const [pickupDate, setPickupDate] = useState<string>(() => {
    return new Date().toISOString().split("T")[0];
  });
  const [pickupTime, setPickupTime] = useState<string>("14:00");

  const formattedPickupDate = pickupDate
    ? new Date(pickupDate + "T00:00:00").toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Hari Ini";

  const effectivePickupSchedule = `${formattedPickupDate}, ${pickupTime || "14:00"} WIT`;

  const handleCheckout = () => {
    if (items.length === 0) {
      toast.error("Keranjang belanja masih kosong.");
      return;
    }

    if (!guestName.trim()) {
      toast.error("Nama pemesan wajib diisi.");
      return;
    }

    if (!guestPhone.trim()) {
      toast.error("Nomor WhatsApp wajib diisi.");
      return;
    }

    const itemsSummary = items
      .map(
        (it, idx) =>
          `${idx + 1}. *${it.name}* (${it.quantity}x @Rp ${it.price.toLocaleString("id-ID")}) = *Rp ${(it.price * it.quantity).toLocaleString("id-ID")}*`,
      )
      .join("\n");

    const waMessage = `*Halo Resepsionis Penginapan Annisa, saya ingin Titip Ambil Paket Oleh-Oleh:*

*Daftar Belanja (${totalItemsCount} item):*
${itemsSummary}
----------------------------------
*TOTAL TAGIHAN: Rp ${totalPrice.toLocaleString("id-ID")}*

*Identitas Pemesan:*
• Nama Pemesan: *${guestName.trim()}*
• No. WhatsApp: *${guestPhone.trim()}*
• *Estimasi Waktu Ambil:* *${effectivePickupSchedule}*

*Lokasi Pengambilan:* Meja Resepsionis Penginapan Annisa (750m Bandara Pattimura).
Pesanan disiapkan untuk diambil dan dibayar langsung saat tiba di penginapan. Terima kasih.`;

    const waUrl = `https://wa.me/${ANNISA_WA_NUMBER}?text=${encodeURIComponent(
      waMessage,
    )}`;

    window.open(waUrl, "_blank");
    clearCart();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md max-h-[88dvh] overflow-y-auto p-0 rounded-2xl sm:rounded-3xl border-0 shadow-2xl bg-[#faf9fc] flex flex-col">
        {/* Header Visual Bar */}
        <div className="bg-gradient-to-r from-purple-900 via-purple-950 to-indigo-950 text-white py-3 px-4 sm:py-3.5 sm:px-5 pr-12 rounded-t-2xl sm:rounded-t-3xl relative overflow-hidden shrink-0 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white/15 border border-white/20 flex items-center justify-center shrink-0">
              <ShoppingBag className="w-3.5 h-3.5 text-purple-200" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-serif font-black text-white leading-tight">
                Keranjang Titip Ambil
              </h2>
              <span className="text-[10px] sm:text-[11px] text-purple-200 font-medium">
                {totalItemsCount} produk dipilih
              </span>
            </div>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-3 sm:p-4 space-y-2.5 text-left">
          {items.length === 0 ? (
            <div className="py-6 text-center text-slate-400">
              <ShoppingBag className="w-8 h-8 mx-auto mb-1.5 text-slate-300" />
              <p className="text-xs font-bold text-slate-600">
                Keranjang belanja masih kosong
              </p>
              <p className="text-[10px] text-slate-400 mt-0.5">
                Pilih produk oleh-oleh khas Maluku untuk ditambahkan.
              </p>
            </div>
          ) : (
            <>
              {/* Header List & Kosongkan Keranjang Action */}
              <div className="flex items-center justify-between px-0.5">
                <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-slate-800">
                  Daftar Pesanan ({totalItemsCount} unit)
                </span>
                <button
                  type="button"
                  onClick={clearCart}
                  className="text-[10px] sm:text-[11px] font-bold text-red-500 hover:text-red-700 transition cursor-pointer"
                >
                  Kosongkan
                </button>
              </div>

              {/* Daftar Item di Keranjang */}
              <div className="space-y-1.5 max-h-36 sm:max-h-44 overflow-y-auto pr-0.5">
                {items.map((it) => (
                  <div
                    key={it.id}
                    className="p-2 sm:p-2.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs flex items-center justify-between gap-2"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-lg overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                        <Image
                          src={it.image}
                          alt={it.name}
                          fill
                          unoptimized
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-slate-900 truncate">
                          {it.name}
                        </h4>
                        <span className="text-[11px] font-extrabold text-purple-700 block">
                          Rp {(it.price * it.quantity).toLocaleString("id-ID")}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <div className="flex items-center gap-1 bg-purple-50 p-0.5 rounded-lg border border-purple-100">
                        <button
                          type="button"
                          onClick={() => updateQuantity(it.id, it.quantity - 1)}
                          className="w-5 h-5 rounded-md bg-white hover:bg-purple-100 text-purple-900 flex items-center justify-center font-bold text-xs transition cursor-pointer shadow-2xs"
                        >
                          <Minus className="w-2.5 h-2.5" />
                        </button>
                        <span className="text-xs font-black text-purple-950 w-4 text-center">
                          {it.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(it.id, it.quantity + 1)}
                          className="w-5 h-5 rounded-md bg-purple-700 hover:bg-purple-800 text-white flex items-center justify-center font-bold text-xs transition cursor-pointer shadow-2xs"
                        >
                          <Plus className="w-2.5 h-2.5" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeItem(it.id)}
                        className="w-6 h-6 rounded-md text-slate-400 hover:text-red-500 hover:bg-red-50 flex items-center justify-center transition cursor-pointer"
                        title="Hapus"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Formulir Identitas & Pengambilan (2 Kolom Ramping) */}
              <div className="space-y-2 bg-white p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-2xs">
                <h3 className="text-[10px] font-black uppercase tracking-wider text-slate-900 flex items-center gap-1">
                  <User className="w-3 h-3 text-purple-700" />
                  <span>Identitas &amp; Jadwal Ambil</span>
                </h3>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] font-semibold text-slate-600 block mb-0.5">
                      Nama <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Nama Pemesan"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      className="w-full h-8 bg-[#faf9fd] border border-slate-200 rounded-lg px-2 py-1 text-xs font-medium text-slate-900 outline-none focus:border-purple-600 focus:bg-white transition"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-semibold text-slate-600 block mb-0.5">
                      No. WhatsApp <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="081234567890"
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      className="w-full h-8 bg-[#faf9fd] border border-slate-200 rounded-lg px-2 py-1 text-xs font-medium text-slate-900 outline-none focus:border-purple-600 focus:bg-white transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] font-semibold text-slate-600 flex items-center gap-1 mb-0.5">
                      <Calendar className="w-2.5 h-2.5 text-purple-600" />
                      <span>Tgl Ambil <span className="text-red-500">*</span></span>
                    </label>
                    <input
                      type="date"
                      value={pickupDate}
                      onChange={(e) => setPickupDate(e.target.value)}
                      className="w-full h-8 bg-[#faf9fd] border border-slate-200 rounded-lg px-2 py-1 text-xs font-semibold text-slate-900 outline-none focus:border-purple-600 focus:bg-white transition"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-semibold text-slate-600 flex items-center gap-1 mb-0.5">
                      <Clock className="w-2.5 h-2.5 text-purple-600" />
                      <span>Jam WIT <span className="text-red-500">*</span></span>
                    </label>
                    <input
                      type="time"
                      value={pickupTime}
                      onChange={(e) => setPickupTime(e.target.value)}
                      className="w-full h-8 bg-[#faf9fd] border border-slate-200 rounded-lg px-2 py-1 text-xs font-semibold text-slate-900 outline-none focus:border-purple-600 focus:bg-white transition"
                    />
                  </div>
                </div>
              </div>

              {/* Catatan Konsep Layanan Ringkas */}
              <div className="bg-purple-50/70 px-2.5 py-1.5 rounded-xl border border-purple-200/60 flex items-center gap-2 text-left">
                <Store className="w-3.5 h-3.5 text-purple-800 shrink-0" />
                <p className="text-[10px] text-purple-950 font-medium leading-tight">
                  <strong>Titip Ambil (Self Pick-Up):</strong> Disiapkan di meja resepsionis untuk diambil &amp; dibayar langsung saat tiba (tanpa kurir).
                </p>
              </div>

              {/* Total & Checkout Button */}
              <div className="pt-0.5">
                <div className="flex items-center justify-between mb-2 px-0.5">
                  <span className="text-[11px] font-bold text-slate-500">
                    Total Tagihan ({totalItemsCount} item):
                  </span>
                  <strong className="text-sm sm:text-base font-black text-purple-800">
                    Rp {totalPrice.toLocaleString("id-ID")}
                  </strong>
                </div>

                <Button
                  onClick={handleCheckout}
                  className="w-full h-9 sm:h-10 rounded-xl sm:rounded-2xl bg-purple-700 hover:bg-purple-800 text-white font-extrabold text-xs sm:text-sm gap-2 shadow-sm shadow-purple-900/20 hover:shadow-md transition cursor-pointer"
                >
                  <FaWhatsapp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>Pesan via WhatsApp</span>
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
