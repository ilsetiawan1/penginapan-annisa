"use client";

import {
  Bed,
  Calendar,
  ExternalLink,
  Gift,
  Home,
  LayoutDashboard,
  LogOut,
  Settings,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export type AdminRole = "owner" | "staff";

interface AdminSidebarProps {
  currentRole: AdminRole;
  activeTab: string;
  onTabChange: (tab: string) => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export function AdminSidebar({
  currentRole,
  activeTab,
  onTabChange,
  isMobileOpen,
  onCloseMobile,
}: AdminSidebarProps) {
  // Navigasi Ikon Dock (Sleek Vertical Dock Ala Referensi Quixotic)
  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard Ringkasan",
      icon: Home,
      roles: ["owner", "staff"],
    },
    {
      id: "matrix",
      label: "Status 8 Kamar",
      icon: Bed,
      roles: ["owner", "staff"],
    },
    {
      id: "bookings",
      label: "Jadwal Booking WA",
      icon: Calendar,
      roles: ["owner", "staff"],
    },
    {
      id: "pos",
      label: "Kasir Oleh-Oleh",
      icon: Gift,
      roles: ["owner", "staff"],
    },
    {
      id: "reports",
      label: "Laporan Omzet & Okupansi",
      icon: TrendingUp,
      roles: ["owner"],
    },
    {
      id: "rooms",
      label: "Pengaturan Tarif Kamar",
      icon: LayoutDashboard,
      roles: ["owner"],
    },
  ].filter((m) => m.roles.includes(currentRole));

  const bottomItems = [
    {
      id: "settings",
      label: "Pengaturan Sistem",
      icon: Settings,
      roles: ["owner", "staff"],
    },
    { id: "staff", label: "Kelola Staf", icon: Users, roles: ["owner"] },
  ].filter((m) => m.roles.includes(currentRole));

  return (
    <>
      {/* Overlay Layar Sentuh Mobile */}
      {isMobileOpen && (
        <div
          role="presentation"
          aria-hidden="true"
          onClick={onCloseMobile}
          className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs z-50 md:hidden transition-opacity"
        />
      )}

      {/* 1. DESKTOP & TABLET VIEW: Natural Flex Dock dengan Bubble Chat Tooltip */}
      <aside className="hidden md:flex flex-col items-center justify-between w-16 shrink-0 bg-white rounded-3xl border border-purple-100/90 shadow-xl shadow-purple-950/5 py-5 self-start sticky top-4 max-h-[calc(100vh-6rem)] z-40">
        {/* Atas: Launcher Icon + Ikon Navigasi */}
        <div className="flex flex-col items-center gap-4 w-full">
          {/* Main App Grid Launcher Active Button */}
          <div className="relative group">
            <button
              type="button"
              onClick={() => onTabChange("dashboard")}
              className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all cursor-pointer ${
                activeTab === "dashboard"
                  ? "bg-purple-700 text-white shadow-lg shadow-purple-900/30 scale-105"
                  : "bg-purple-50 text-purple-700 hover:bg-purple-100"
              }`}
            >
              <div className="grid grid-cols-2 gap-0.5 w-4 h-4">
                <span className="w-1.5 h-1.5 rounded-xs bg-current" />
                <span className="w-1.5 h-1.5 rounded-xs bg-current" />
                <span className="w-1.5 h-1.5 rounded-xs bg-current" />
                <span className="w-1.5 h-1.5 rounded-xs bg-current" />
              </div>
            </button>

            {/* Bubble Chat Tooltip White Blur */}
            <div className="absolute left-14 top-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-xl text-slate-900 border border-purple-200/90 shadow-2xl px-3 py-1.5 rounded-2xl whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-200 z-[100] flex items-center scale-95 group-hover:scale-100 group-hover:translate-x-1">
              <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white border-l border-b border-purple-200/90 rotate-45" />
              <span className="relative z-10 text-xs font-black text-slate-900 tracking-tight">
                Dashboard Ringkasan
              </span>
            </div>
          </div>

          {/* Pemisah Halus */}
          <div className="w-8 h-px bg-purple-100 my-1" />

          {/* Ikon Menu Navigasi */}
          <div className="flex flex-col items-center gap-2.5 w-full px-2">
            {menuItems
              .filter((item) => item.id !== "dashboard")
              .map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <div
                    key={item.id}
                    className="relative group w-full flex justify-center"
                  >
                    <button
                      type="button"
                      onClick={() => onTabChange(item.id)}
                      className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all cursor-pointer ${
                        isActive
                          ? "bg-purple-700 text-white shadow-md shadow-purple-900/20 scale-105"
                          : "text-slate-400 hover:text-purple-900 hover:bg-purple-50"
                      }`}
                    >
                      <Icon className="w-4.5 h-4.5" />
                    </button>

                    {/* Bubble Chat Tooltip White Blur */}
                    <div className="absolute left-14 top-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-xl text-slate-900 border border-purple-200/90 shadow-2xl px-3 py-1.5 rounded-2xl whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-200 z-[100] flex items-center scale-95 group-hover:scale-100 group-hover:translate-x-1">
                      <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white border-l border-b border-purple-200/90 rotate-45" />
                      <span className="relative z-10 text-xs font-black text-slate-900 tracking-tight">
                        {item.label}
                      </span>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Bawah: Menu Pengaturan & Link Web Tamu */}
        <div className="flex flex-col items-center gap-2.5 w-full px-2 pt-3 border-t border-purple-50">
          {bottomItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <div
                key={item.id}
                className="relative group w-full flex justify-center"
              >
                <button
                  type="button"
                  onClick={() => onTabChange(item.id)}
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all cursor-pointer ${
                    isActive
                      ? "bg-purple-700 text-white shadow-md shadow-purple-900/20"
                      : "text-slate-400 hover:text-purple-900 hover:bg-purple-50"
                  }`}
                >
                  <Icon className="w-4.5 h-4.5" />
                </button>

                {/* Bubble Chat Tooltip White Blur */}
                <div className="absolute left-14 top-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-xl text-slate-900 border border-purple-200/90 shadow-2xl px-3 py-1.5 rounded-2xl whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-200 z-[100] flex items-center scale-95 group-hover:scale-100 group-hover:translate-x-1">
                  <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white border-l border-b border-purple-200/90 rotate-45" />
                  <span className="relative z-10 text-xs font-black text-slate-900 tracking-tight">
                    {item.label}
                  </span>
                </div>
              </div>
            );
          })}

          <div className="relative group w-full flex justify-center">
            <Link
              href="/"
              target="_blank"
              className="w-10 h-10 rounded-2xl flex items-center justify-center text-slate-400 hover:text-purple-900 hover:bg-purple-50 transition-all"
            >
              <ExternalLink className="w-4.5 h-4.5" />
            </Link>

            {/* Bubble Chat Tooltip White Blur */}
            <div className="absolute left-14 top-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-xl text-slate-900 border border-purple-200/90 shadow-2xl px-3 py-1.5 rounded-2xl whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-200 z-[100] flex items-center scale-95 group-hover:scale-100 group-hover:translate-x-1">
              <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white border-l border-b border-purple-200/90 rotate-45" />
              <span className="relative z-10 text-xs font-black text-slate-900 tracking-tight">
                Lihat Web Tamu
              </span>
            </div>
          </div>
        </div>
      </aside>

      {/* 2. MOBILE VIEW: Slide-over Drawer Saat Layar HP Dibuka */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 bg-white border-r border-purple-100 w-72 flex flex-col justify-between p-5 transition-all duration-300 ease-in-out md:hidden shadow-2xl ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-purple-50">
            <div className="flex items-center gap-2.5">
              <div className="relative w-8 h-8 rounded-xl bg-purple-50 p-1 border border-purple-200 shrink-0">
                <Image
                  src="/logo-penginapan-annisa.png"
                  alt="Logo Penginapan Annisa"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <h2 className="font-extrabold text-sm text-slate-900 leading-tight">
                  Penginapan Annisa
                </h2>
                <span className="text-[10px] text-purple-700 font-bold uppercase">
                  Sistem Resepsionis
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={onCloseMobile}
              className="p-1.5 rounded-xl text-slate-400 hover:bg-purple-50"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="space-y-1.5">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    onTabChange(item.id);
                    onCloseMobile();
                  }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                    isActive
                      ? "bg-purple-700 text-white shadow-md shadow-purple-900/20"
                      : "text-slate-600 hover:bg-purple-50 hover:text-purple-900"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}

            {bottomItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    onTabChange(item.id);
                    onCloseMobile();
                  }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                    isActive
                      ? "bg-purple-700 text-white shadow-md shadow-purple-900/20"
                      : "text-slate-600 hover:bg-purple-50 hover:text-purple-900"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="pt-4 border-t border-purple-50">
          <Link
            href="/"
            target="_blank"
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-2xl bg-purple-50 text-purple-900 font-bold text-xs hover:bg-purple-100 transition"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Lihat Website Tamu</span>
          </Link>
        </div>
      </aside>
    </>
  );
}
