"use client";

import { Phone, User } from "lucide-react";

interface AdvanceBookingGuestFieldsProps {
  guestName: string;
  setGuestName: (val: string) => void;
  guestPhone: string;
  setGuestPhone: (val: string) => void;
}

export function AdvanceBookingGuestFields({
  guestName,
  setGuestName,
  guestPhone,
  setGuestPhone,
}: AdvanceBookingGuestFieldsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      <div className="space-y-1">
        <label
          htmlFor="adv-name"
          className="text-[10px] font-black text-slate-700 uppercase tracking-wider block"
        >
          Nama Lengkap Pemesan
        </label>
        <div className="flex items-center gap-2 bg-slate-50 border-2 border-slate-200 focus-within:border-purple-600 rounded-xl px-2.5 py-1.5">
          <User className="w-3.5 h-3.5 text-purple-700 shrink-0" />
          <input
            id="adv-name"
            type="text"
            required
            placeholder="Contoh: Pak Hendra Pratama"
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            className="w-full bg-transparent text-xs font-bold text-slate-900 outline-none placeholder:text-slate-400"
          />
        </div>
      </div>

      <div className="space-y-1">
        <label
          htmlFor="adv-phone"
          className="text-[10px] font-black text-slate-700 uppercase tracking-wider block"
        >
          No. WhatsApp Tamu
        </label>
        <div className="flex items-center gap-2 bg-slate-50 border-2 border-slate-200 focus-within:border-purple-600 rounded-xl px-2.5 py-1.5">
          <Phone className="w-3.5 h-3.5 text-purple-700 shrink-0" />
          <input
            id="adv-phone"
            type="tel"
            required
            placeholder="Contoh: 081234567890"
            value={guestPhone}
            onChange={(e) => setGuestPhone(e.target.value)}
            className="w-full bg-transparent text-xs font-bold text-slate-900 outline-none placeholder:text-slate-400"
          />
        </div>
      </div>
    </div>
  );
}
