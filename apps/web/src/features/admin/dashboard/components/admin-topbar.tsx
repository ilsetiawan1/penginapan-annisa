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
    <header className="h-20 w-full flex items-center justify-between px-4 sm:px-8 border-b border-slate-200/60 bg-white/80 backdrop-blur-md sticky top-0 z-30">
      {/* Left: Mobile Hamburger & Greeting Title */}
      <div className="flex items-center gap-3.5">
        <button
          type="button"
          onClick={onOpenMobileSidebar}
          aria-label="Open navigation menu"
          className="lg:hidden p-2 rounded-2xl bg-slate-100 text-slate-700 hover:bg-slate-200 cursor-pointer"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {currentRole === "owner"
              ? "Selamat Datang, Owner!"
              : "Selamat Datang, Staf Resepsionis!"}
          </h1>
          <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
            Dashboard Operasional 8 Kamar Transit Bandara Pattimura Ambon
          </p>
        </div>
      </div>

      {/* Right: Live WIT Clock, Role Switcher, Notifications, & User Profile (Matching Reference) */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Live Clock Ambon (WIT) */}
        <div className="hidden md:flex items-center gap-1.5 bg-slate-50 border border-slate-200/80 px-3 py-1.5 rounded-xl text-slate-700 text-xs font-bold shadow-2xs">
          <Clock className="w-3.5 h-3.5 text-purple-700" />
          <span>{timeStr || "Memuat WIT..."}</span>
        </div>

        {/* Interactive Role Switcher Toggle */}
        <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200/80">
          <button
            type="button"
            onClick={() => onRoleChange("owner")}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
              currentRole === "owner"
                ? "bg-purple-700 text-white shadow-2xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Owner</span>
          </button>

          <button
            type="button"
            onClick={() => onRoleChange("staff")}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
              currentRole === "staff"
                ? "bg-purple-700 text-white shadow-2xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Staf</span>
          </button>
        </div>

        {/* Notification Bell with Badge Dot (Matching Reference) */}
        <button
          type="button"
          aria-label="Notifikasi"
          className="relative w-10 h-10 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 flex items-center justify-center text-slate-700 transition cursor-pointer"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white" />
        </button>

        {/* User Profile Avatar */}
        <div className="flex items-center gap-2.5 pl-1">
          <div className="w-10 h-10 rounded-2xl bg-purple-700 text-white flex items-center justify-center font-black text-sm shadow-xs border-2 border-purple-200">
            {currentRole === "owner" ? "O" : "S"}
          </div>
        </div>
      </div>
    </header>
  );
}
