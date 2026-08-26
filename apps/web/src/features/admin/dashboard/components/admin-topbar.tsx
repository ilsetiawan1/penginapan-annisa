"use client";

import { Bell, Clock, Menu, ShieldCheck, UserCheck } from "lucide-react";
import { useEffect, useState } from "react";
import type { AdminRole } from "../../../../components/layout/admin-sidebar";

interface AdminTopbarProps {
  currentRole: AdminRole;
  onRoleChange: (role: AdminRole) => void;
  onOpenMobileSidebar: () => void;
}

export function AdminTopbar({ currentRole, onRoleChange, onOpenMobileSidebar }: AdminTopbarProps) {
  const [timeStr, setTimeStr] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Jayapura", // UTC+9 WIT
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      setTimeStr(`${new Intl.DateTimeFormat("id-ID", options).format(now)} WIT`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="h-16 w-full flex items-center justify-between px-3.5 sm:px-6 border-b border-purple-100/90 bg-white/95 backdrop-blur-xl sticky top-0 z-30 shrink-0 shadow-2xs">
      {/* Kiri: Hamburger Menu Mobile & Sapaan Admin */}
      <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
        <button
          type="button"
          onClick={onOpenMobileSidebar}
          aria-label="Buka navigasi menu"
          className="lg:hidden p-2 rounded-2xl bg-purple-50 text-purple-800 hover:bg-purple-100 border border-purple-200/60 cursor-pointer shrink-0 transition"
        >
          <Menu className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        <div className="min-w-0">
          <h1 className="text-sm sm:text-base lg:text-lg font-serif font-black text-slate-900 tracking-tight leading-tight truncate">
            {currentRole === "owner" ? (
              <>
                <span className="sm:hidden">Halo, Pemilik!</span>
                <span className="hidden sm:inline">Selamat Datang, Pemilik Penginapan!</span>
              </>
            ) : (
              <>
                <span className="sm:hidden">Halo, Resepsionis!</span>
                <span className="hidden sm:inline">Selamat Datang, Staf Resepsionis!</span>
              </>
            )}
          </h1>
          <p className="text-[10px] sm:text-[11px] text-slate-500 font-medium hidden sm:block">
            Operasional 8 Kamar Transit Bandara Pattimura Ambon (750m)
          </p>
          <span className="text-[9px] font-bold text-purple-700 sm:hidden block leading-none">
            Penginapan Annisa
          </span>
        </div>
      </div>

      {/* Kanan: Jam Real-time WIT, Pilihan Peran, Notifikasi & Profil */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Jam Real-time WIT (Ambon) - Kapsul Lavender Elegan */}
        <div className="hidden md:flex items-center gap-1.5 bg-purple-50/80 border border-purple-150 px-3 py-1.5 rounded-full text-purple-900 text-xs font-bold shadow-2xs">
          <Clock className="w-3.5 h-3.5 text-purple-700" />
          <span>{timeStr || "Memuat WIT..."}</span>
        </div>

        {/* Tombol Alih Peran (Owner <-> Staf) Kapsul Modern */}
        <div className="flex items-center bg-purple-50/90 p-0.5 sm:p-1 rounded-full border border-purple-150">
          <button
            type="button"
            onClick={() => onRoleChange("owner")}
            className={`flex items-center gap-1 px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-extrabold transition-all cursor-pointer ${
              currentRole === "owner"
                ? "bg-purple-700 text-white shadow-xs"
                : "text-slate-600 hover:text-purple-900"
            }`}
          >
            <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span className="hidden xs:inline sm:inline">Owner</span>
          </button>

          <button
            type="button"
            onClick={() => onRoleChange("staff")}
            className={`flex items-center gap-1 px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-extrabold transition-all cursor-pointer ${
              currentRole === "staff"
                ? "bg-purple-700 text-white shadow-xs"
                : "text-slate-600 hover:text-purple-900"
            }`}
          >
            <UserCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span className="hidden xs:inline sm:inline">Staf</span>
          </button>
        </div>

        {/* Lonceng Notifikasi */}
        <button
          type="button"
          aria-label="Pemberitahuan masuk"
          className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-purple-50 hover:bg-purple-100/80 border border-purple-150 flex items-center justify-center text-purple-800 transition cursor-pointer shrink-0"
        >
          <Bell className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white" />
        </button>

        {/* Avatar Profil Modern */}
        <div className="flex items-center shrink-0">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-purple-700 to-indigo-800 text-white flex items-center justify-center font-black text-xs shadow-xs ring-2 ring-purple-200">
            {currentRole === "owner" ? "O" : "S"}
          </div>
        </div>
      </div>
    </header>
  );
}
