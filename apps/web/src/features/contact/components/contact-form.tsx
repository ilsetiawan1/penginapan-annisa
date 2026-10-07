"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getGeneralContactWhatsAppUrl } from "@/lib/whatsapp";
import { MessageSquare, Send } from "lucide-react";

export function ContactForm() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = (data.get("name") as string)?.trim();
    const phone = (data.get("phone") as string)?.trim();
    const topic = (data.get("topic") as string)?.trim();
    const message = (data.get("message") as string)?.trim();

    const formatted = `Halo Penginapan Annisa, saya ${name || "Tamu"} (${phone || "-"}).\n- Topik: ${topic || "Ketersediaan Kamar Transit"}\n- Pesan: ${message || "Ingin bertanya seputar penginapan transit."}`;
    const url = getGeneralContactWhatsAppUrl(formatted);
    window.open(url, "_blank");
  };

  return (
    <Card className="p-5 sm:p-6 bg-white rounded-2xl border border-slate-200 shadow-sm text-left">
      <div className="flex items-center gap-2 mb-3">
        <span className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
          <MessageSquare className="w-4 h-4" />
        </span>
        <h3 className="font-extrabold text-base text-slate-950">Kirim Pesan Cepat ke WhatsApp</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label htmlFor="contact-name" className="text-[11px] font-bold text-slate-700 block mb-1">
            Nama Anda
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            aria-label="Nama Anda"
            placeholder="Contoh: Rahmat Hidayat"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-900 outline-none focus:border-purple-500 focus:bg-white transition"
          />
        </div>

        <div>
          <label
            htmlFor="contact-phone"
            className="text-[11px] font-bold text-slate-700 block mb-1"
          >
            Nomor WhatsApp Anda
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            aria-label="Nomor WhatsApp Anda"
            placeholder="Contoh: 081234567890"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-900 outline-none focus:border-purple-500 focus:bg-white transition"
          />
        </div>

        <div>
          <label
            htmlFor="contact-topic"
            className="text-[11px] font-bold text-slate-700 block mb-1"
          >
            Topik Pertanyaan
          </label>
          <select
            id="contact-topic"
            name="topic"
            aria-label="Topik Pertanyaan"
            defaultValue="Ketersediaan Kamar Transit"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-900 outline-none focus:border-purple-500 focus:bg-white transition"
          >
            <option value="Ketersediaan Kamar Transit">Ketersediaan Kamar Transit</option>
            <option value="Booking Kamar Tipe AC">Booking Kamar Tipe AC</option>
            <option value="Booking Kamar Tipe Kipas">Booking Kamar Tipe Kipas</option>
            <option value="Pemesanan Oleh-oleh Khas Ambon">Pemesanan Oleh-oleh Khas Ambon</option>
            <option value="Panduan Rute & Antar Jemput">Panduan Rute &amp; Antar Jemput</option>
            <option value="Lainnya">Lainnya</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="contact-message"
            className="text-[11px] font-bold text-slate-700 block mb-1"
          >
            Isi Pesan / Pertanyaan
          </label>
          <textarea
            id="contact-message"
            name="message"
            aria-label="Isi Pesan atau Pertanyaan"
            rows={3}
            placeholder="Tuliskan detail pertanyaan atau tanggal transit Anda..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-900 outline-none focus:border-purple-500 focus:bg-white transition resize-none"
          />
        </div>

        <Button
          type="submit"
          className="w-full rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs h-10 gap-2 shadow-xs cursor-pointer"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Kirimkan ke WhatsApp Resepsionis</span>
        </Button>
      </form>
    </Card>
  );
}
