"use client";

import { Phone, PhoneCall, User, Users } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import type { BookingChannel } from "./advance-booking-types";

interface AdvanceBookingGuestFieldsProps {
  guestName: string;
  setGuestName: (val: string) => void;
  guestPhone: string;
  setGuestPhone: (val: string) => void;
  channel: BookingChannel;
  setChannel: (val: BookingChannel) => void;
}

export function AdvanceBookingGuestFields({
  guestName,
  setGuestName,
  guestPhone,
  setGuestPhone,
  channel,
  setChannel,
}: AdvanceBookingGuestFieldsProps) {
  return (
    <div className="space-y-2.5">
      {/* Pilihan Sumber Pemesanan (Channel / Source) */}
      <div className="space-y-1">
        <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wider block">
          Sumber Pemesanan (Channel)
        </span>
        <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200/80">
          <button
            type="button"
            onClick={() => setChannel("whatsapp")}
            className={`py-1.5 px-2 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              channel === "whatsapp"
                ? "bg-white text-emerald-800 shadow-2xs font-bold"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <FaWhatsapp className="w-3.5 h-3.5 text-emerald-600" />
            <span>WhatsApp</span>
          </button>

          <button
            type="button"
            onClick={() => setChannel("walk_in")}
            className={`py-1.5 px-2 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              channel === "walk_in"
                ? "bg-white text-slate-900 shadow-2xs font-bold"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Users className="w-3.5 h-3.5 text-slate-600" />
            <span>Tatap Muka</span>
          </button>

          <button
            type="button"
            onClick={() => setChannel("phone")}
            className={`py-1.5 px-2 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              channel === "phone"
                ? "bg-white text-sky-800 shadow-2xs font-bold"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <PhoneCall className="w-3.5 h-3.5 text-sky-600" />
            <span>Telepon</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <div className="space-y-1">
          <label
            htmlFor="adv-name"
            className="text-[10px] font-bold text-slate-700 uppercase tracking-wider block"
          >
            Nama Lengkap Pemesan
          </label>
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 focus-within:border-slate-900 rounded-xl px-2.5 py-1.5">
            <User className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <input
              id="adv-name"
              type="text"
              required
              placeholder="Contoh: Pak Hendra Pratama"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              className="w-full bg-transparent text-xs font-semibold text-slate-900 outline-none placeholder:text-slate-400"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label
            htmlFor="adv-phone"
            className="text-[10px] font-bold text-slate-700 uppercase tracking-wider block"
          >
            {channel === "whatsapp" ? "No. WhatsApp Tamu" : "No. Telepon / Kontak"}
          </label>
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 focus-within:border-slate-900 rounded-xl px-2.5 py-1.5">
            <Phone className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <input
              id="adv-phone"
              type="tel"
              required={channel === "whatsapp"}
              placeholder="Contoh: 081234567890"
              value={guestPhone}
              onChange={(e) => setGuestPhone(e.target.value)}
              className="w-full bg-transparent text-xs font-semibold text-slate-900 outline-none placeholder:text-slate-400"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
