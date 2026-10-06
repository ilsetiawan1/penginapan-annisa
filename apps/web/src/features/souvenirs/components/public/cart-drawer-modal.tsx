"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { useCart } from "@/features/souvenirs/hooks/use-cart";
import { ANNISA_WA_NUMBER } from "@/lib/whatsapp";
import { Calendar, Clock, Minus, Plus, ShoppingBag, Store, Trash2, User } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { toast } from "sonner";

interface CartDrawerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawerModal({ isOpen, onClose }: CartDrawerModalProps) {
  const { items, totalPrice, totalItemsCount, updateQuantity, removeItem, clearCart } = useCart();

  const [guestName, setGuestName] = useState<string>("");
  const [guestPhone, setGuestPhone] = useState<string>("");
  const [pickupDate, setPickupDate] = useState<string>(() => {
    return new Date().toISOString().split("T")[0];
  });
  const [pickupTime, setPickupTime] = useState<string>("14:00");

  const formattedPickupDate = pickupDate
    ? new Date(`${pickupDate}T00:00:00`).toLocaleDateString("id-ID", {
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
- Nama Pemesan: *${guestName.trim()}*
- No. WhatsApp: *${guestPhone.trim()}*
- *Estimasi Waktu Ambil:* *${effectivePickupSchedule}*

*Lokasi Pengambilan:* Meja Resepsionis Penginapan Annisa (750m Bandara Pattimura).
Pesanan disiapkan untuk diambil dan dibayar langsung saat tiba di penginapan. Terima kasih.`;

    const waUrl = `https://wa.me/${ANNISA_WA_NUMBER}?text=${encodeURIComponent(waMessage)}`;

    window.open(waUrl, "_blank");
    clearCart();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md max-h-[88dvh] overflow-y-auto p-0 rounded-3xl border border-[#e9e8ea] shadow-2xl bg-white flex flex-col">
        <DialogTitle className="sr-only">Keranjang Titip Ambil</DialogTitle>
        <DialogDescription className="sr-only">
          Daftar belanja produk oleh-oleh khas Maluku untuk titip ambil di meja resepsionis
        </DialogDescription>

        {/* Header Visual Bar */}
        <div className="bg-[#3c315b] text-white py-3.5 px-4 sm:px-5 pr-12 rounded-t-3xl relative overflow-hidden shrink-0 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-white/15 border border-white/20 flex items-center justify-center shrink-0">
              <ShoppingBag className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-medium text-white leading-tight">
                Keranjang Titip Ambil
              </h2>
              <span className="text-[10px] sm:text-[11px] text-white/80 font-normal">
                {totalItemsCount} produk dipilih
              </span>
            </div>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-4 sm:p-5 space-y-3 text-left">
          {items.length === 0 ? (
            <div className="py-8 text-center text-[#86848d]">
              <ShoppingBag className="w-8 h-8 mx-auto mb-2 text-[#86848d]" />
              <p className="text-xs font-medium text-[#1c1c1c]">Keranjang belanja masih kosong</p>
              <p className="text-[11px] text-[#86848d] mt-0.5">
                Pilih produk oleh-oleh khas Maluku untuk ditambahkan.
              </p>
            </div>
          ) : (
            <>
              {/* Header List & Kosongkan Keranjang Action */}
              <div className="flex items-center justify-between px-1">
                <span className="text-[11px] font-medium uppercase tracking-wider text-[#1c1c1c]">
                  Daftar Pesanan ({totalItemsCount} unit)
                </span>
                <button
                  type="button"
                  onClick={clearCart}
                  className="text-[11px] font-normal text-rose-500 hover:text-rose-700 transition cursor-pointer"
                >
                  Kosongkan
                </button>
              </div>

              {/* Daftar Item di Keranjang */}
              <div className="space-y-2 max-h-40 sm:max-h-48 overflow-y-auto pr-0.5">
                {items.map((it) => (
                  <div
                    key={it.id}
                    className="p-2.5 rounded-2xl bg-[#f4f2f4]/60 border border-[#e9e8ea] flex items-center justify-between gap-2"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="relative w-11 h-11 rounded-xl overflow-hidden bg-white shrink-0 border border-[#e9e8ea]">
                        <Image
                          src={it.image}
                          alt={it.name}
                          fill
                          unoptimized
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-xs font-medium text-[#1c1c1c] truncate">{it.name}</h4>
                        <span className="text-xs font-semibold text-[#3c315b] block">
                          Rp {(it.price * it.quantity).toLocaleString("id-ID")}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <div className="flex items-center gap-1 bg-white p-0.5 rounded-full border border-[#e9e8ea] shadow-2xs">
                        <button
                          type="button"
                          aria-label="Kurangi jumlah pesanan"
                          onClick={() => updateQuantity(it.id, it.quantity - 1)}
                          className="w-5 h-5 rounded-full bg-[#f4f2f4] hover:bg-[#e9e8ea] text-[#1c1c1c] flex items-center justify-center font-bold text-xs transition cursor-pointer"
                        >
                          <Minus className="w-2.5 h-2.5" />
                        </button>
                        <span className="text-xs font-semibold text-[#1c1c1c] w-4 text-center">
                          {it.quantity}
                        </span>
                        <button
                          type="button"
                          aria-label="Tambah jumlah pesanan"
                          onClick={() => updateQuantity(it.id, it.quantity + 1)}
                          className="w-5 h-5 rounded-full bg-[#3c315b] hover:bg-[#2d2445] text-white flex items-center justify-center font-bold text-xs transition cursor-pointer"
                        >
                          <Plus className="w-2.5 h-2.5" />
                        </button>
                      </div>

                      <button
                        type="button"
                        aria-label="Hapus produk dari keranjang"
                        onClick={() => removeItem(it.id)}
                        className="w-6 h-6 rounded-full text-[#86848d] hover:text-rose-500 hover:bg-rose-50 flex items-center justify-center transition cursor-pointer"
                        title="Hapus"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Formulir Identitas & Pengambilan */}
              <div className="space-y-2.5 bg-[#f4f2f4]/60 p-3 sm:p-3.5 rounded-2xl border border-[#e9e8ea]">
                <h3 className="text-[10px] font-medium uppercase tracking-wider text-[#1c1c1c] flex items-center gap-1.5">
                  <User className="w-3 h-3 text-[#3c315b]" />
                  <span>Identitas &amp; Jadwal Ambil</span>
                </h3>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label
                      htmlFor="cart-guest-name"
                      className="text-[10px] font-normal text-[#86848d] block mb-1"
                    >
                      Nama <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="cart-guest-name"
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
                      htmlFor="cart-guest-phone"
                      className="text-[10px] font-normal text-[#86848d] block mb-1"
                    >
                      No. WhatsApp <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="cart-guest-phone"
                      type="tel"
                      aria-label="Nomor WhatsApp"
                      placeholder="081234567890"
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      className="w-full h-9 bg-white border border-[#e9e8ea] rounded-xl px-2.5 py-1 text-xs font-normal text-[#1c1c1c] outline-none focus:border-[#3c315b] transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label
                      htmlFor="cart-pickup-date"
                      className="text-[10px] font-normal text-[#86848d] flex items-center gap-1 mb-1"
                    >
                      <Calendar className="w-2.5 h-2.5 text-[#3c315b]" />
                      <span>
                        Tgl Ambil <span className="text-rose-500">*</span>
                      </span>
                    </label>
                    <input
                      id="cart-pickup-date"
                      type="date"
                      aria-label="Tanggal Ambil"
                      value={pickupDate}
                      onChange={(e) => setPickupDate(e.target.value)}
                      className="w-full h-9 bg-white border border-[#e9e8ea] rounded-xl px-2.5 py-1 text-xs font-normal text-[#1c1c1c] outline-none focus:border-[#3c315b] transition cursor-pointer"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="cart-pickup-time"
                      className="text-[10px] font-normal text-[#86848d] flex items-center gap-1 mb-1"
                    >
                      <Clock className="w-2.5 h-2.5 text-[#3c315b]" />
                      <span>
                        Jam WIT <span className="text-rose-500">*</span>
                      </span>
                    </label>
                    <input
                      id="cart-pickup-time"
                      type="time"
                      aria-label="Jam Pengambilan WIT"
                      value={pickupTime}
                      onChange={(e) => setPickupTime(e.target.value)}
                      className="w-full h-9 bg-white border border-[#e9e8ea] rounded-xl px-2.5 py-1 text-xs font-normal text-[#1c1c1c] outline-none focus:border-[#3c315b] transition cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Catatan Konsep Layanan */}
              <div className="bg-[#f4f2f4] px-3 py-2 rounded-2xl border border-[#e9e8ea] flex items-center gap-2 text-left">
                <Store className="w-3.5 h-3.5 text-[#3c315b] shrink-0" />
                <p className="text-[10px] text-[#3c315b] font-normal leading-tight">
                  <strong>Titip Ambil:</strong> Disiapkan di meja resepsionis untuk diambil &amp;
                  dibayar langsung saat tiba di penginapan.
                </p>
              </div>

              {/* Total & Checkout Button */}
              <div className="pt-1 space-y-2.5">
                <div className="flex items-center justify-between px-1">
                  <span className="text-xs text-[#86848d] font-normal">
                    Total Tagihan ({totalItemsCount} item):
                  </span>
                  <strong className="text-base font-semibold text-[#1c1c1c]">
                    Rp {totalPrice.toLocaleString("id-ID")}
                  </strong>
                </div>

                <Button
                  onClick={handleCheckout}
                  className="w-full py-3 rounded-full bg-[#3c315b] hover:bg-[#2d2445] text-white font-medium text-sm gap-2 shadow-sm transition cursor-pointer active:scale-95 h-11"
                >
                  <FaWhatsapp className="w-4 h-4 text-emerald-400" />
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
