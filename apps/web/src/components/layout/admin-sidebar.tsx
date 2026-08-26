"use client";

import {
  Bed,
  Calendar,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Gift,
  Home,
  LayoutDashboard,
  LogOut,
  Sparkles,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

export type AdminRole = "owner" | "staff";

interface AdminSidebarProps {
  currentRole: AdminRole;
  activeTab: string;
  onTabChange: (tab: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export function AdminSidebar({
  currentRole,
  activeTab,
  onTabChange,
  isCollapsed,
  onToggleCollapse,
  isMobileOpen,
  onCloseMobile,
}: AdminSidebarProps) {
  // Menu Operasional & Manajemen (Palet Tri-Color: Purple, Lavender, White)
  const generalMenu = [
    { id: "dashboard", label: "Dashboard", icon: Home, roles: ["owner", "staff"] },
    { id: "matrix", label: "Status Kamar", icon: Bed, roles: ["owner", "staff"] },
    { id: "bookings", label: "Jadwal Booking WA", icon: Calendar, roles: ["owner", "staff"] },
    { id: "pos", label: "Kasir Oleh-Oleh", icon: Gift, roles: ["owner", "staff"] },
    { id: "rooms", label: "Pengaturan Tarif", icon: LayoutDashboard, roles: ["owner"] },
  ];

  const managementMenu = [
    { id: "reports", label: "Laporan Omzet", icon: TrendingUp, roles: ["owner"] },
    { id: "staff", label: "Kelola Staf", icon: Users, roles: ["owner"] },
  ];

  const visibleGeneral = generalMenu.filter((m) => m.roles.includes(currentRole));
  const visibleManagement = managementMenu.filter((m) => m.roles.includes(currentRole));

  return (
    <>
      {/* Overlay Layar Sentuh Tablet / HP */}
      {isMobileOpen && (
        <div
          role="presentation"
          aria-hidden="true"
          onClick={onCloseMobile}
          className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs z-40 lg:hidden transition-opacity"
        />
      )}

      {/* Kontainer Sidebar (Clean White & Lavender Accent) */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 bg-white border-r border-purple-100/90 flex flex-col justify-between transition-all duration-300 ease-in-out shadow-xs ${
          isMobileOpen ? "translate-x-0 w-72 shadow-2xl" : "-translate-x-full lg:translate-x-0"
        } ${isCollapsed ? "lg:w-20" : "lg:w-64"}`}
      >
        {/* Bagian Atas: Header & Menu */}
        <div>
          {/* Header Brand & Logo */}
          <div className="relative">
            <div
              className={`h-16 flex items-center border-b border-purple-50 transition-all ${
                isCollapsed ? "justify-center px-0" : "justify-between px-5"
              }`}
            >
              <div
                className={`flex items-center gap-3 overflow-hidden ${isCollapsed ? "justify-center" : ""}`}
              >
                <div className="relative w-9 h-9 rounded-2xl bg-purple-50 p-1.5 border border-purple-200/80 shrink-0 shadow-2xs">
                  <Image
                    src="/logo-penginapan-annisa.png"
                    alt="Logo Penginapan Annisa"
                    fill
                    className="object-contain"
                  />
                </div>
                {!isCollapsed && (
                  <div className="overflow-hidden">
                    <h1 className="font-extrabold text-sm text-slate-900 leading-tight truncate">
                      Penginapan Annisa
                    </h1>
                    <span className="text-[10px] font-bold text-purple-700 uppercase tracking-wider block">
                      Sistem Resepsionis
                    </span>
                  </div>
                )}
              </div>

              {/* Tombol Collapse Desktop */}
              {!isCollapsed && (
                <button
                  type="button"
                  onClick={onToggleCollapse}
                  aria-label="Sembunyikan bilah menu"
                  className="hidden lg:flex w-7 h-7 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-800 items-center justify-center transition cursor-pointer border border-purple-100/60"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
              )}

              {/* Tombol Tutup di Tampilan Mobile/Tablet */}
              <button
                type="button"
                onClick={onCloseMobile}
                aria-label="Tutup menu"
                className="lg:hidden p-1.5 rounded-xl text-slate-500 hover:bg-purple-50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tombol Floating Expand Saat Sidebar Terlipat (Collapsed) */}
            {isCollapsed && (
              <button
                type="button"
                onClick={onToggleCollapse}
                aria-label="Buka bilah menu"
                className="hidden lg:flex absolute -right-3 top-5 z-50 w-6 h-6 rounded-full bg-white border border-purple-200 shadow-md items-center justify-center text-purple-700 hover:bg-purple-50 transition cursor-pointer"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Navigasi Menu Items */}
          <nav className="p-3 space-y-5 overflow-y-auto max-h-[calc(100vh-14rem)] no-scrollbar">
            {/* Kelompok Menu Utama */}
            <div className="space-y-1">
              {!isCollapsed && (
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 px-3 block mb-2">
                  Operasional
                </span>
              )}
              {visibleGeneral.map((item) => {
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
                    title={isCollapsed ? item.label : undefined}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                      isActive
                        ? "bg-purple-700 text-white shadow-md shadow-purple-900/20"
                        : "text-slate-600 hover:text-purple-900 hover:bg-purple-50/80"
                    } ${isCollapsed ? "justify-center px-0" : ""}`}
                  >
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-white" : "text-purple-600"}`} />
                    {!isCollapsed && <span>{item.label}</span>}
                  </button>
                );
              })}
            </div>

            {/* Kelompok Menu Pemilik (Owner) */}
            {visibleManagement.length > 0 && (
              <div className="space-y-1 pt-3 border-t border-purple-50">
                {!isCollapsed && (
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 px-3 block mb-2">
                    Manajemen
                  </span>
                )}
                {visibleManagement.map((item) => {
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
                      title={isCollapsed ? item.label : undefined}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                        isActive
                          ? "bg-purple-700 text-white shadow-md shadow-purple-900/20"
                          : "text-slate-600 hover:text-purple-900 hover:bg-purple-50/80"
                      } ${isCollapsed ? "justify-center px-0" : ""}`}
                    >
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-white" : "text-purple-600"}`} />
                      {!isCollapsed && <span>{item.label}</span>}
                    </button>
                  );
                })}
              </div>
            )}
          </nav>
        </div>

        {/* Bagian Bawah: Buka Web Publik & Status Mode */}
        <div className="p-3 border-t border-purple-50 space-y-2">
          {/* Tombol Menuju Halaman Web Tamu */}
          <Button
            asChild
            variant="outline"
            className={`w-full rounded-2xl border border-purple-100 bg-purple-50/50 hover:bg-purple-100/70 text-purple-900 font-bold text-xs h-10 gap-2 transition cursor-pointer ${
              isCollapsed ? "px-0 justify-center" : ""
            }`}
          >
            <Link href="/" target="_blank" title="Buka Website Tamu">
              <ExternalLink className="w-3.5 h-3.5 text-purple-700 shrink-0" />
              {!isCollapsed && <span>Lihat Web Tamu</span>}
            </Link>
          </Button>

          {/* Kartu Status Ringkas Pengguna */}
          {!isCollapsed && (
            <div className="p-2.5 bg-purple-50/60 rounded-2xl border border-purple-100/80 flex items-center justify-between text-[11px]">
              <div>
                <span className="font-extrabold text-purple-950 block">
                  {currentRole === "owner" ? "Pemilik (Owner)" : "Staf Resepsionis"}
                </span>
                <span className="text-[10px] text-purple-600 font-semibold">8 Kamar Terpantau</span>
              </div>
              <div className="w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-purple-100" />
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
