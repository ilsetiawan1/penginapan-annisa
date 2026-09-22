"use client";

import { useState } from "react";
import { Button } from "../../../../components/ui/button";
import type { StaffMember } from "./staff-card";

interface StaffFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (member: StaffMember) => void;
}

export function StaffFormModal({
  isOpen,
  onClose,
  onSubmit,
}: StaffFormModalProps) {
  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [shift, setShift] = useState<string>("Shift Pagi (06:00 – 14:00 WIT)");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !username) return;

    onSubmit({
      id: String(Date.now()),
      name,
      username,
      phone: phone || "0812-xxxx-xxxx",
      shift,
      isActive: true,
    });

    setName("");
    setUsername("");
    setPhone("");
    onClose();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-3xl border-2 border-purple-300 p-5 sm:p-6 shadow-md space-y-4 animate-in fade-in"
    >
      <h3 className="text-sm font-black text-slate-900">
        Formulir Pendaftaran Staf Baru
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-1">
          <label
            htmlFor="new-staff-name"
            className="text-[11px] font-black text-slate-700 uppercase block"
          >
            Nama Lengkap
          </label>
          <input
            id="new-staff-name"
            type="text"
            required
            placeholder="Contoh: Rian Saputra"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-3 py-2 text-sm font-bold text-slate-900 outline-none focus:border-purple-600"
          />
        </div>
        <div className="space-y-1">
          <label
            htmlFor="new-staff-username"
            className="text-[11px] font-black text-slate-700 uppercase block"
          >
            Username Login
          </label>
          <input
            id="new-staff-username"
            type="text"
            required
            placeholder="Contoh: rian_reception"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-3 py-2 text-sm font-bold text-slate-900 outline-none focus:border-purple-600"
          />
        </div>
        <div className="space-y-1">
          <label
            htmlFor="new-staff-phone"
            className="text-[11px] font-black text-slate-700 uppercase block"
          >
            No. WhatsApp
          </label>
          <input
            id="new-staff-phone"
            type="tel"
            placeholder="0812-xxxx-xxxx"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-3 py-2 text-sm font-bold text-slate-900 outline-none focus:border-purple-600"
          />
        </div>
        <div className="space-y-1">
          <label
            htmlFor="new-staff-shift"
            className="text-[11px] font-black text-slate-700 uppercase block"
          >
            Shift Kerja
          </label>
          <select
            id="new-staff-shift"
            value={shift}
            onChange={(e) => setShift(e.target.value)}
            className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-3 py-2 text-sm font-bold text-slate-900 outline-none focus:border-purple-600"
          >
            <option>Shift Pagi (06:00 – 14:00 WIT)</option>
            <option>Shift Siang/Malam (14:00 – 22:00 WIT)</option>
          </select>
        </div>
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          className="rounded-xl h-10 px-4 text-xs font-bold text-slate-600"
        >
          Batal
        </Button>
        <Button
          type="submit"
          className="rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs h-10 px-5"
        >
          Simpan &amp; Beri Akses
        </Button>
      </div>
    </form>
  );
}
