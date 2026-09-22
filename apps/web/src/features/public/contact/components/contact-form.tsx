"use client";

import { MessageSquare, Phone, Send } from "lucide-react";
import { useState } from "react";
import { Button } from "../../../../components/ui/button";
import { Card } from "../../../../components/ui/card";
import { getGeneralContactWhatsAppUrl } from "../../../../lib/whatsapp";

export function ContactForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [topic, setTopic] = useState("Ketersediaan Kamar Transit");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formatted = `Halo Penginapan Annisa, saya ${name || "Tamu"} (${phone || "-"}).\n- Topik: ${topic}\n- Pesan: ${message || "Ingin bertanya seputar penginapan transit."}`;
    const url = getGeneralContactWhatsAppUrl(formatted);
    window.open(url, "_blank");
  };

  return (
    <Card className="p-5 sm:p-6 bg-white rounded-2xl border border-slate-200 shadow-sm text-left">
      <div className="flex items-center gap-2 mb-3">
        <span className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
          <MessageSquare className="w-4 h-4" />
        </span>
        <h3 className="font-extrabold text-base text-slate-950">
          Kirim Pesan Cepat ke WhatsApp
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="text-[11px] font-bold text-slate-700 block mb-1">
            Nama Anda
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Contoh: Rahmat Hidayat"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-900 outline-none focus:border-purple-500 focus:bg-white transition"
          />
        </div>

        <div>
          <label className="text-[11px] font-bold text-slate-700 block mb-1">
            Nomor WhatsApp Anda
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Contoh: 081234567890"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-900 outline-none focus:border-purple-500 focus:bg-white transition"
          />
        </div>

        <div>
          <label className="text-[11px] font-bold text-slate-700 block mb-1">
            Topik Pertanyaan
          </label>
          <select
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-900 outline-none focus:border-purple-500 focus:bg-white transition"
          >
            <option value="Ketersediaan Kamar Transit">
              Ketersediaan Kamar Transit
            </option>
            <option value="Booking Kamar Tipe AC">Booking Kamar Tipe AC</option>
            <option value="Booking Kamar Tipe Kipas">
              Booking Kamar Tipe Kipas
            </option>
            <option value="Pemesanan Oleh-oleh Khas Ambon">
              Pemesanan Oleh-oleh Khas Ambon
            </option>
            <option value="Panduan Rute & Antar Jemput">
              Panduan Rute &amp; Antar Jemput
            </option>
            <option value="Lainnya">Lainnya</option>
          </select>
        </div>

        <div>
          <label className="text-[11px] font-bold text-slate-700 block mb-1">
            Isi Pesan / Pertanyaan
          </label>
          <textarea
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
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
