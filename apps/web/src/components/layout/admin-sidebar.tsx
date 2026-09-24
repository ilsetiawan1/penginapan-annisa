"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bed,
  Calendar,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Gift,
  Home,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
  Settings,
  SlidersHorizontal,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import { useAuth } from "@/features/auth/hooks/use-auth";

export type AdminRole = "owner" | "staff";

interface AdminSidebarProps {
  currentRole: AdminRole;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export function AdminSidebar({
  currentRole,
  isMobileOpen,
  onCloseMobile,
}: AdminSidebarProps) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  // Load user preference from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("annisa_sidebar_collapsed");
      if (saved !== null) {
        setIsCollapsed(saved === "true");
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  const toggleCollapse = () => {
    setIsCollapsed((prev) => {
      const nextState = !prev;
      try {
        localStorage.setItem("annisa_sidebar_collapsed", String(nextState));
      } catch {
        // Ignore
      }
      return nextState;
    });
  };

  const navSections = [
    {
      title: "OPERASIONAL PMS",
      items: [
        {
          href: "/admin/dashboard",
          label: "Dashboard Ringkasan",
          icon: Home,
          roles: ["owner", "staff"],
        },
        {
          href: "/admin/rooms",
          label: "Matriks 8 Kamar",
          icon: Bed,
          roles: ["owner", "staff"],
        },
        {
          href: "/admin/reservations",
          label: "Jadwal Booking WA",
          icon: Calendar,
          roles: ["owner", "staff"],
        },
        {
          href: "/admin/pos",
          label: "Kasir Oleh-Oleh",
          icon: Gift,
          roles: ["owner", "staff"],
        },
        {
          href: "/admin/reports",
          label: "Laporan Omzet",
          icon: TrendingUp,
          roles: ["owner"],
        },
      ],
    },
    {
      title: "PENGATURAN MASTER",
      items: [
        {
          href: "/admin/staff",
          label: "Kelola Akun Staf",
          icon: Users,
          roles: ["owner"],
        },
        {
          href: "/admin/settings",
          label: "Pengaturan Sistem",
          icon: Settings,
          roles: ["owner", "staff"],
        },
      ],
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          role="presentation"
          aria-hidden="true"
          onClick={onCloseMobile}
          className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs z-50 md:hidden transition-opacity"
        />
      )}

      {/* 1. DESKTOP & TABLET SIDEBAR: Collapsible Modern Dock */}
      <aside
        className={`hidden md:flex flex-col justify-between shrink-0 bg-white rounded-3xl border border-purple-100/90 shadow-xl shadow-purple-950/5 p-3.5 sm:p-4 sticky top-4 max-h-[calc(100vh-2rem)] transition-all duration-300 ease-in-out z-40 ${
          isCollapsed ? "w-[72px]" : "w-64"
        }`}
      >
        {/* TOP: Brand Header & Collapse Toggle */}
        <div className="space-y-4">
          <div
            className={`flex items-center pb-3 border-b border-purple-100/70 ${
              isCollapsed ? "justify-center" : "justify-between"
            }`}
          >
            <Link
              href="/admin/dashboard"
              className={`flex items-center gap-2.5 min-w-0 ${isCollapsed ? "hidden" : "flex"}`}
            >
              <div className="relative w-9 h-9 rounded-2xl bg-purple-50 p-1 border border-purple-200/80 shrink-0 shadow-2xs">
                <Image
                  src="/logo-penginapan-annisa.png"
                  alt="Logo Penginapan Annisa"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="min-w-0">
                <h1 className="font-extrabold text-xs sm:text-sm text-slate-900 tracking-tight leading-tight truncate">
                  Penginapan Annisa
                </h1>
                <span className="text-[10px] text-purple-700 font-bold uppercase block leading-none truncate">
                  PMS Resepsionis
                </span>
              </div>
            </Link>

            {/* Collapse / Expand Toggle Button */}
            <button
              type="button"
              onClick={toggleCollapse}
              title={isCollapsed ? "Buka Sidebar" : "Sembunyikan Sidebar"}
              aria-label={isCollapsed ? "Buka Sidebar" : "Sembunyikan Sidebar"}
              className="w-8 h-8 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-800 flex items-center justify-center border border-purple-200/70 transition-all cursor-pointer shrink-0 shadow-2xs hover:scale-105 active:scale-95"
            >
              {isCollapsed ? (
                <PanelLeftOpen className="w-4 h-4" />
              ) : (
                <PanelLeftClose className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Navigation Links Grouped */}
          <nav className="space-y-4 overflow-y-auto max-h-[calc(100vh-14rem)] pr-0.5">
            {navSections.map((sec) => {
              const visibleItems = sec.items.filter((item) =>
                item.roles.includes(currentRole),
              );
              if (visibleItems.length === 0) return null;

              return (
                <div key={sec.title} className="space-y-1">
                  {!isCollapsed && (
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 px-2.5 mb-1.5 block">
                      {sec.title}
                    </span>
                  )}

                  <div className="space-y-1">
                    {visibleItems.map((item) => {
                      const Icon = item.icon;
                      const isActive =
                        pathname === item.href ||
                        (item.href !== "/admin/dashboard" &&
                          pathname.startsWith(item.href));

                      return (
                        <div key={item.href} className="relative group">
                          <Link
                            href={item.href}
                            className={`flex items-center gap-3 rounded-2xl text-xs font-bold transition-all ${
                              isCollapsed
                                ? "w-10 h-10 mx-auto justify-center p-0"
                                : "px-3.5 py-2.5 w-full"
                            } ${
                              isActive
                                ? "bg-purple-700 text-white shadow-md shadow-purple-900/20"
                                : "text-slate-600 hover:text-purple-900 hover:bg-purple-50/80"
                            }`}
                          >
                            <Icon
                              className={`shrink-0 ${
                                isCollapsed ? "w-4.5 h-4.5" : "w-4 h-4"
                              } ${isActive ? "text-white" : "text-slate-400 group-hover:text-purple-700"}`}
                            />
                            {!isCollapsed && (
                              <span className="truncate">{item.label}</span>
                            )}
                          </Link>

                          {/* Tooltip on Collapsed Mode */}
                          {isCollapsed && (
                            <div className="absolute left-14 top-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-xl text-slate-900 border border-purple-200/90 shadow-2xl px-3 py-1.5 rounded-2xl whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-200 z-[100] flex items-center scale-95 group-hover:scale-100 group-hover:translate-x-1">
                              <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white border-l border-b border-purple-200/90 rotate-45" />
                              <span className="relative z-10 text-xs font-black text-slate-900 tracking-tight">
                                {item.label}
                              </span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </nav>
        </div>

        {/* BOTTOM: Website Tamu Link & User Profile Card */}
        <div className="pt-3 border-t border-purple-100/70 space-y-2">
          {/* Link Web Tamu */}
          <div className="relative group">
            <Link
              href="/"
              target="_blank"
              className={`flex items-center gap-2 rounded-2xl bg-purple-50/70 hover:bg-purple-100 text-purple-900 text-xs font-bold transition-all ${
                isCollapsed
                  ? "w-10 h-10 mx-auto justify-center p-0"
                  : "px-3 py-2 w-full justify-between"
              }`}
            >
              <div className="flex items-center gap-2 min-w-0">
                <ExternalLink className="w-3.5 h-3.5 shrink-0 text-purple-700" />
                {!isCollapsed && <span className="truncate">Web Tamu</span>}
              </div>
              {!isCollapsed && (
                <span className="text-[9px] bg-white px-1.5 py-0.5 rounded-md text-purple-800 font-extrabold border border-purple-200/60">
                  Lihat
                </span>
              )}
            </Link>

            {isCollapsed && (
              <div className="absolute left-14 top-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-xl text-slate-900 border border-purple-200/90 shadow-2xl px-3 py-1.5 rounded-2xl whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-200 z-[100] flex items-center scale-95 group-hover:scale-100 group-hover:translate-x-1">
                <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white border-l border-b border-purple-200/90 rotate-45" />
                <span className="relative z-10 text-xs font-black text-slate-900 tracking-tight">
                  Lihat Website Tamu
                </span>
              </div>
            )}
          </div>

          {/* User Profile Bar & Logout */}
          <div
            className={`flex items-center justify-between rounded-2xl bg-slate-50 border border-slate-200/80 ${
              isCollapsed ? "p-1 justify-center" : "p-2"
            }`}
          >
            <div className={`flex items-center gap-2 min-w-0 ${isCollapsed ? "hidden" : "flex"}`}>
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-700 to-indigo-800 text-white flex items-center justify-center font-black text-xs shrink-0 shadow-xs">
                {currentRole === "owner" ? "👑" : "🛎️"}
              </div>
              <div className="min-w-0">
                <span className="text-xs font-bold text-slate-900 block truncate leading-tight">
                  {user?.name || (currentRole === "owner" ? "Owner" : "Staf")}
                </span>
                <span className="text-[10px] text-purple-700 font-semibold uppercase tracking-wider block leading-none">
                  {currentRole}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => logout()}
              title="Keluar dari PMS"
              aria-label="Logout"
              className="w-8 h-8 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 flex items-center justify-center transition cursor-pointer shrink-0"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* 2. MOBILE DRAWER: Slide-over */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 bg-white border-r border-purple-100 w-72 flex flex-col justify-between p-5 transition-transform duration-300 ease-in-out md:hidden shadow-2xl ${
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

          <nav className="space-y-4">
            {navSections.map((sec) => {
              const visibleItems = sec.items.filter((item) =>
                item.roles.includes(currentRole),
              );
              if (visibleItems.length === 0) return null;

              return (
                <div key={sec.title} className="space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 px-2 block">
                    {sec.title}
                  </span>
                  <div className="space-y-1">
                    {visibleItems.map((item) => {
                      const Icon = item.icon;
                      const isActive = pathname === item.href;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={onCloseMobile}
                          className={`flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                            isActive
                              ? "bg-purple-700 text-white shadow-md shadow-purple-900/20"
                              : "text-slate-600 hover:bg-purple-50 hover:text-purple-900"
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          <span>{item.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </nav>
        </div>

        <div className="pt-4 border-t border-purple-50 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-2xl bg-purple-50 text-purple-900 font-bold text-xs hover:bg-purple-100 transition"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Lihat Website Tamu</span>
          </Link>
          <button
            type="button"
            onClick={() => logout()}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-2xl text-red-600 hover:bg-red-50 text-xs font-bold transition"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Keluar dari PMS</span>
          </button>
        </div>
      </aside>
    </>
  );
}
