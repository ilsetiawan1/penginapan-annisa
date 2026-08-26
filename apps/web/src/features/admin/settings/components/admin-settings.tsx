"use client";

import {
  Bell,
  CheckCircle2,
  KeyRound,
  MapPin,
  Moon,
  Phone,
  Save,
  ShieldCheck,
  Smartphone,
  Sparkles,
  UserCheck,
  Users,
} from "lucide-react";
import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { toast } from "sonner";
import type { AdminRole } from "../../../../components/layout/admin-sidebar";
import { Button } from "../../../../components/ui/button";
import { ANNISA_WA_NUMBER } from "../../../../lib/whatsapp";

interface AdminSettingsProps {
  currentRole: AdminRole;
  onRoleChange: (role: AdminRole) => void;
}

export function AdminSettings({ currentRole, onRoleChange }: AdminSettingsProps) {
  const [waNumber, setWaNumber] = useState(ANNISA_WA_NUMBER);
  const [lodgingName, setLodgingName] = useState("Penginapan Annisa");
  const [distanceText, setDistanceText] = useState("750 meter atau 2–3 menit dari Bandara Pattimura");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success("Pengaturan sistem berhasil disimpan!");
    }, 400);
  };

  return (
    <div className="space-y-6">
      {/* 1. Header Pengaturan */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif font-black text-slate-900 tracking-tight leading-tight">
            Pengaturan Sistem &amp; Akun
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
            Kelola peran akses aktif, kontak WhatsApp resmi, dan parameter operasional penginapan.
          </p>
        </div>

        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="rounded-full bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs h-10 px-5 gap-2 shadow-md shadow-purple-900/20 cursor-pointer shrink-0"
        >
          <Save className="w-4 h-4" />
          <span>{isSaving ? "Menyimpan..." : "Simpan Perubahan"}</span>
        </Button>
      </div>

      {/* 2. Grid Kartu Pengaturan (12-Column Modern Spacious Layout) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 items-start">
        {/* KARTU 1: GANTI PERAN AKSES (OWNER VS STAF RESEPSIONIS) */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 border border-purple-100/90 shadow-2xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-purple-50">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                Hak Akses Sistem
              </span>
              <h3 className="text-base font-extrabold text-slate-900">Peran Aktif Pengguna</h3>
            </div>
            <span className="text-xs font-bold text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-100">
              {currentRole === "owner" ? "Mode Owner" : "Mode Staf"}
            </span>
          </div>

          <p className="text-xs text-slate-500 leading-relaxed">
            Pilih peran aktif untuk menguji tampilan dashboard dan batasan fitur menu antara
            Pemilik Penginapan (Owner) dan Staf Resepsionis.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
            {/* Opsi Owner */}
            <div
              onClick={() => {
                onRoleChange("owner");
                toast.success("Beralih ke Peran: Pemilik Penginapan (Owner)");
              }}
              className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                currentRole === "owner"
                  ? "border-purple-700 bg-purple-50/70 shadow-xs"
                  : "border-slate-200/80 bg-white hover:border-purple-200"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl bg-purple-700 text-white flex items-center justify-center shadow-2xs">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                {currentRole === "owner" && (
                  <CheckCircle2 className="w-5 h-5 text-purple-700 shrink-0" />
                )}
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Pemilik (Owner)</h4>
                <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                  Akses penuh: Laporan keuangan, tarif kamar, kelola staf, &amp; operasional.
                </p>
              </div>
            </div>

            {/* Opsi Staf */}
            <div
              onClick={() => {
                onRoleChange("staff");
                toast.success("Beralih ke Peran: Staf Resepsionis");
              }}
              className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                currentRole === "staff"
                  ? "border-purple-700 bg-purple-50/70 shadow-xs"
                  : "border-slate-200/80 bg-white hover:border-purple-200"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center border border-purple-200/60">
                  <UserCheck className="w-5 h-5" />
                </div>
                {currentRole === "staff" && (
                  <CheckCircle2 className="w-5 h-5 text-purple-700 shrink-0" />
                )}
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Staf Resepsionis</h4>
                <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                  Akses operasional: Check-In/Out kamar, Kasir Oleh-Oleh, &amp; Booking WA.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* KARTU 2: KONTAK WHATSAPP RESMI & LOKASI */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 border border-purple-100/90 shadow-2xs space-y-4">
          <div className="pb-3 border-b border-purple-50">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
              Parameter Komunikasi
            </span>
            <h3 className="text-base font-extrabold text-slate-900">Kontak WhatsApp Resepsionis</h3>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Nomor WhatsApp Booking &amp; Titip Ambil
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-3.5 text-purple-700">
                  <FaWhatsapp className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={waNumber}
                  onChange={(e) => setWaNumber(e.target.value)}
                  className="w-full bg-[#f8f7fc] border border-purple-150 rounded-2xl pl-10 pr-4 py-2.5 text-xs sm:text-sm font-bold text-slate-900 outline-none focus:border-purple-600 transition"
                  placeholder="6281242163116"
                />
              </div>
              <span className="text-[10px] text-slate-400 mt-1 block">
                Format: 62812... (Digunakan pada seluruh tombol reservasi dan titip ambil publik).
              </span>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Nama Usaha Penginapan
              </label>
              <input
                type="text"
                value={lodgingName}
                onChange={(e) => setLodgingName(e.target.value)}
                className="w-full bg-[#f8f7fc] border border-purple-150 rounded-2xl px-4 py-2.5 text-xs sm:text-sm font-bold text-slate-900 outline-none focus:border-purple-600 transition"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Keterangan Jarak &amp; Lokasi
              </label>
              <input
                type="text"
                value={distanceText}
                onChange={(e) => setDistanceText(e.target.value)}
                className="w-full bg-[#f8f7fc] border border-purple-150 rounded-2xl px-4 py-2.5 text-xs sm:text-sm font-bold text-slate-900 outline-none focus:border-purple-600 transition"
              />
            </div>
          </div>
        </div>

        {/* KARTU 3: STANDAR OPERASIONAL PROSEDUR (SOP) 8 KAMAR */}
        <div className="lg:col-span-12 bg-white rounded-3xl p-6 border border-purple-100/90 shadow-2xs space-y-4">
          <div className="pb-3 border-b border-purple-50 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                Pedoman Operasional
              </span>
              <h3 className="text-base font-extrabold text-slate-900">
                Standar Operasional Penginapan Annisa
              </h3>
            </div>
            <span className="text-xs font-bold text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-100">
              8 Kamar Resmi
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-purple-50/50 border border-purple-100">
              <h5 className="font-bold text-purple-950 mb-1">1. Jam Check-In &amp; Check-Out</h5>
              <p className="text-slate-600 leading-relaxed">
                Check-in standar mulai 14.00 WIT (fleksibel sesuai jadwal penerbangan transit).
                Batas maksimal check-out pukul 12.00 WIT.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-purple-50/50 border border-purple-100">
              <h5 className="font-bold text-purple-950 mb-1">2. Standar Fasilitas 8 Kamar</h5>
              <p className="text-slate-600 leading-relaxed">
                Semua kamar memiliki fasilitas identik: Kasur besar muat 2–3 tamu, kamar mandi
                dalam pribadi, TV, WiFi, dan handuk bersih (tanpa air mineral gratis).
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-purple-50/50 border border-purple-100">
              <h5 className="font-bold text-purple-950 mb-1">3. Kebijakan DP &amp; Pelunasan</h5>
              <p className="text-slate-600 leading-relaxed">
                Reservasi WA mewajibkan DP 50% (AC: Rp 137.500, Kipas: Rp 100.000). Pelunasan
                dilakukan saat tamu tiba di meja resepsionis.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
