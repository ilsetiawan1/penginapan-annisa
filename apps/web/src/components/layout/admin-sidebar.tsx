"use client";

import {
  Bed,
  Calendar,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Gift,
  LayoutDashboard,
  LogOut,
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
  // Menu Operasional & Manajemen (100% Bahasa Indonesia)
  const generalMenu = [
    { id: "matrix", label: "Status Kamar", icon: LayoutDashboard, roles: ["owner", "staff"] },
    { id: "bookings", label: "Jadwal Booking WA", icon: Calendar, roles: ["owner", "staff"] },
    { id: "pos", label: "Oleh-Oleh", icon: Gift, roles: ["owner", "staff"] },
    { id: "rooms", label: "Pengaturan Tarif", icon: Bed, roles: ["owner"] },
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
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 lg:hidden transition-opacity"
        />
      )}

      {/* Kontainer Sidebar */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-30 bg-[#faf9fc] border-r border-slate-200/80 flex flex-col justify-between transition-all duration-300 ease-in-out ${
          isMobileOpen ? "translate-x-0 w-72" : "-translate-x-full lg:translate-x-0"
        } ${isCollapsed ? "lg:w-20" : "lg:w-64"}`}
      >
        {/* Bagian Atas: Header & Menu */}
        <div>
          {/* Header & Logo Identitas */}
          <div className="relative">
            <div
              className={`h-16 flex items-center border-b border-slate-100 transition-all ${
                isCollapsed ? "justify-center px-0" : "justify-between px-5"
              }`}
            >
              <div
                className={`flex items-center gap-3 overflow-hidden ${isCollapsed ? "justify-center" : ""}`}
              >
                <div className="relative w-9 h-9 rounded-xl bg-purple-50 p-1.5 border border-purple-200 shrink-0 shadow-2xs">
                  <Image
                    src="/logo-penginapan-annisa.png"
                    alt="Logo Penginapan Annisa"
                    fill
                    className="object-contain"
                  />
                </div>
                {!isCollapsed && (
                  <div className="overflow-hidden">
                    <h1 className="font-black text-sm text-slate-900 leading-tight truncate">
                      Penginapan Annisa
                    </h1>
                    <span className="text-[10px] font-bold text-purple-700 uppercase tracking-wider block">
                      Sistem Resepsionis
                    </span>
                  </div>
                )}
              </div>

              {/* Tombol Collapse Desktop Saat Sidebar Terbuka */}
              {!isCollapsed && (
                <button
                  type="button"
                  onClick={onToggleCollapse}
                  aria-label="Sembunyikan bilah menu"
                  className="hidden lg:flex w-7 h-7 rounded-xl bg-purple-100/70 hover:bg-purple-200 text-purple-900 items-center justify-center transition cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
              )}

              {/* Tombol Tutup di Tampilan Mobile/Tablet */}
              <button
                type="button"
                onClick={onCloseMobile}
                aria-label="Tutup menu"
                className="lg:hidden p-1.5 rounded-xl text-slate-500 hover:bg-slate-200"
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
                className="hidden lg:flex absolute -right-3 top-5 z-50 w-6 h-6 rounded-full bg-white border border-slate-300/90 shadow-md items-center justify-center text-slate-600 hover:text-purple-700 hover:border-purple-400 transition cursor-pointer"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Menu Navigasi Utama */}
          <div className="p-3.5 space-y-6 overflow-y-auto">
            {/* Bagian Operasional PMS */}
            <div>
              {!isCollapsed && (
                <p className="px-3 text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2">
                  Operasional Kamar
                </p>
              )}
              <div className="space-y-1">
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
                      className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                        isActive
                          ? "bg-purple-100/80 text-purple-900 font-black shadow-2xs"
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
                      } ${isCollapsed ? "justify-center px-0" : ""}`}
                      title={isCollapsed ? item.label : undefined}
                    >
                      <Icon
                        className={`w-4 h-4 shrink-0 ${isActive ? "text-purple-700" : "text-slate-500"}`}
                      />
                      {!isCollapsed && <span className="truncate">{item.label}</span>}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bagian Manajemen Pengelola (Owner Saja) */}
            {visibleManagement.length > 0 && (
              <div>
                {!isCollapsed && (
                  <p className="px-3 text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2">
                    Manajemen Pengelola
                  </p>
                )}
                <div className="space-y-1">
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
                        className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                          isActive
                            ? "bg-purple-100/80 text-purple-900 font-black shadow-2xs"
                            : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
                        } ${isCollapsed ? "justify-center px-0" : ""}`}
                        title={isCollapsed ? item.label : undefined}
                      >
                        <Icon
                          className={`w-4 h-4 shrink-0 ${isActive ? "text-purple-700" : "text-slate-500"}`}
                        />
                        {!isCollapsed && <span className="truncate">{item.label}</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Sidebar: Lihat Website & Keluar Akun */}
        <div className="p-3.5 border-t border-slate-200/80 space-y-1.5">
          <Button
            asChild
            variant="ghost"
            className={`w-full justify-start rounded-2xl text-xs font-bold text-slate-600 hover:text-purple-900 hover:bg-purple-50 h-10 px-3.5 gap-3 ${
              isCollapsed ? "justify-center px-0" : ""
            }`}
          >
            <Link href="/" target="_blank" title="Buka Halaman Web Tamu">
              <ExternalLink className="w-4 h-4 text-purple-700 shrink-0" />
              {!isCollapsed && <span>Buka Web Tamu</span>}
            </Link>
          </Button>

          <button
            type="button"
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold text-slate-600 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer ${
              isCollapsed ? "justify-center px-0" : ""
            }`}
            title="Keluar Akun"
          >
            <LogOut className="w-4 h-4 text-slate-500 shrink-0" />
            {!isCollapsed && <span>Keluar Akun</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
