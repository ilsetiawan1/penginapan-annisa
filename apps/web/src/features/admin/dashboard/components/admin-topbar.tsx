"use client";

import {
  Bed,
  Bell,
  Calendar,
  Clock,
  Gift,
  Home,
  Menu,
  ShieldCheck,
  TrendingUp,
  UserCheck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { AdminRole } from "../../../../components/layout/admin-sidebar";

interface AdminTopbarProps {
  currentRole: AdminRole;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onRoleChange: (role: AdminRole) => void;
  onOpenMobileSidebar: () => void;
}

export function AdminTopbar({
  currentRole,
  activeTab,
  onTabChange,
  onRoleChange,
  onOpenMobileSidebar,
}: AdminTopbarProps) {
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

  const navPills = [
    { id: "dashboard", label: "Dashboard", roles: ["owner", "staff"] },
    { id: "matrix", label: "Status Kamar", roles: ["owner", "staff"] },
    { id: "bookings", label: "Booking WA", roles: ["owner", "staff"] },
    { id: "pos", label: "Kasir Oleh-Oleh", roles: ["owner", "staff"] },
    { id: "reports", label: "Laporan Omzet", roles: ["owner"] },
  ].filter((p) => p.roles.includes(currentRole));

  return (
    <header className="w-full bg-white rounded-3xl p-3 sm:p-4 mb-4 sm:mb-6 flex items-center justify-between shadow-xs border border-purple-100/80">
      {/* 1. KIRI: Brand Logo & Identitas (Persis Posisi Logo Quixotic di Referensi) */}
      <div className="flex items-center gap-3 shrink-0">
        {/* Tombol Hamburger di Mobile */}
        <button
          type="button"
          onClick={onOpenMobileSidebar}
          aria-label="Buka menu navigasi"
          className="lg:hidden p-2 rounded-2xl bg-purple-50 text-purple-800 hover:bg-purple-100 border border-purple-200/60 cursor-pointer shrink-0 transition"
        >
          <Menu className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        <Link href="/admin/dashboard" className="flex items-center gap-2.5 group">
          <div className="relative w-9 h-9 rounded-2xl bg-purple-50 p-1.5 border border-purple-200/80 shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
            <Image
              src="/logo-penginapan-annisa.png"
              alt="Logo Penginapan Annisa"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div>
            <h1 className="font-extrabold text-sm sm:text-base text-slate-900 tracking-tight leading-tight group-hover:text-purple-700 transition">
              Penginapan Annisa
            </h1>
            <span className="text-[10px] text-purple-700 font-bold tracking-wider uppercase block leading-none">
              Sistem Resepsionis
            </span>
          </div>
        </Link>
      </div>

      {/* 2. TENGAH: Capsule Navigation Pill Bar (Persis Gaya Pill Tab Menu di Referensi) */}
      <nav className="hidden xl:flex items-center bg-[#f4f2f8] p-1 rounded-full border border-purple-100/70 shadow-inner">
        {navPills.map((pill) => {
          const isActive = activeTab === pill.id;
          return (
            <button
              key={pill.id}
              type="button"
              onClick={() => onTabChange(pill.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                isActive
                  ? "bg-white text-purple-950 shadow-sm font-extrabold"
                  : "text-slate-500 hover:text-purple-900 hover:bg-white/50"
              }`}
            >
              {pill.label}
            </button>
          );
        })}
      </nav>

      {/* 3. KANAN: Jam Real-Time, Role Switcher, Notifikasi & Profil */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Jam Real-time WIT Ambon */}
        <div className="hidden md:flex items-center gap-1.5 bg-purple-50/80 border border-purple-150/80 px-3 py-1.5 rounded-full text-purple-900 text-xs font-bold shadow-2xs">
          <Clock className="w-3.5 h-3.5 text-purple-700" />
          <span>{timeStr || "Memuat WIT..."}</span>
        </div>

        {/* Capsule Role Switcher (Owner <-> Staf) */}
        <div className="flex items-center bg-[#f4f2f8] p-1 rounded-full border border-purple-100/80">
          <button
            type="button"
            onClick={() => onRoleChange("owner")}
            className={`flex items-center gap-1 px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-extrabold transition-all cursor-pointer ${
              currentRole === "owner"
                ? "bg-purple-700 text-white shadow-2xs"
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
                ? "bg-purple-700 text-white shadow-2xs"
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
          className="relative w-9 h-9 rounded-full bg-purple-50/80 hover:bg-purple-100 border border-purple-150/80 flex items-center justify-center text-purple-800 transition cursor-pointer shrink-0 shadow-2xs"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white" />
        </button>

        {/* User Profile Avatar */}
        <div className="flex items-center shrink-0">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-700 to-indigo-800 text-white flex items-center justify-center font-black text-xs shadow-xs ring-2 ring-purple-200">
            {currentRole === "owner" ? "O" : "S"}
          </div>
        </div>
      </div>
    </header>
  );
}
