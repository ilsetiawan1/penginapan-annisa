"use client";

import { Clock, ExternalLink, ShieldCheck, UserCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "../../../../components/ui/button";

export type AdminRole = "owner" | "staff";

interface AdminHeaderProps {
  currentRole: AdminRole;
  onRoleChange: (role: AdminRole) => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function AdminHeader({
  currentRole,
  onRoleChange,
  activeTab,
  onTabChange,
}: AdminHeaderProps) {
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
        day: "numeric",
        month: "short",
        year: "numeric",
      };
      setTimeStr(
        `${new Intl.DateTimeFormat("id-ID", options).format(now)} WIT`,
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const navTabs = [
    {
      id: "matrix",
      label: "Matriks 8 Kamar",
      icon: "🛎️",
      roles: ["owner", "staff"],
    },
    {
      id: "pos",
      label: "Kasir Oleh-oleh",
      icon: "🎁",
      roles: ["owner", "staff"],
    },
    { id: "rooms", label: "Tarif & Kamar", icon: "🛏️", roles: ["owner"] },
    { id: "reports", label: "Laporan Omzet", icon: "📊", roles: ["owner"] },
    { id: "staff", label: "Kelola Staf", icon: "👥", roles: ["owner"] },
  ];

  const visibleTabs = navTabs.filter((t) => t.roles.includes(currentRole));

  return (
    <header className="w-full bg-white border-b border-slate-200/90 sticky top-0 z-30 shadow-2xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        {/* Top Row: Brand, Live WIT Time, Role Switcher, & Public Web Link */}
        <div className="py-2.5 sm:py-3 flex flex-wrap items-center justify-between gap-3 border-b border-slate-100">
          {/* Brand & Badge */}
          <div className="flex items-center gap-2.5">
            <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-xl overflow-hidden bg-purple-50 p-1 border border-purple-200 shrink-0">
              <Image
                src="/logo-penginapan-annisa.png"
                alt="Logo Penginapan Annisa"
                fill
                className="object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="font-black text-xs sm:text-sm text-slate-900 leading-tight">
                  Penginapan Annisa
                </h1>
                <span className="bg-purple-100 text-purple-800 text-[9px] font-extrabold px-1.5 py-0.5 rounded uppercase tracking-wider">
                  PMS Portal
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-medium">
                Operasional 8 Kamar Transit Bandara Pattimura
              </p>
            </div>
          </div>

          {/* Right Actions: Live WIT Clock, Role Switcher, View Web */}
          <div className="flex items-center flex-wrap gap-2 sm:gap-3">
            {/* Live Clock Ambon (WIT) */}
            <div className="hidden lg:flex items-center gap-1.5 bg-slate-50 border border-slate-200/80 px-2.5 py-1 rounded-lg text-slate-600 text-xs font-bold">
              <Clock className="w-3.5 h-3.5 text-purple-700" />
              <span>{timeStr || "Memuat WIT..."}</span>
            </div>

            {/* Interactive Role Switcher Toggle */}
            <div className="flex items-center bg-slate-100/90 p-0.5 rounded-xl border border-slate-200">
              <button
                type="button"
                onClick={() => {
                  onRoleChange("owner");
                  if (activeTab === "matrix") onTabChange("matrix");
                }}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-extrabold transition-all cursor-pointer ${
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
                onClick={() => {
                  onRoleChange("staff");
                  // If on owner-only tab, redirect to matrix
                  if (!["matrix", "pos"].includes(activeTab)) {
                    onTabChange("matrix");
                  }
                }}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-extrabold transition-all cursor-pointer ${
                  currentRole === "staff"
                    ? "bg-purple-700 text-white shadow-2xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>Staf</span>
              </button>
            </div>

            {/* Link to Public Website */}
            <Button
              asChild
              variant="outline"
              className="rounded-xl border-purple-200 text-purple-900 hover:bg-purple-50 font-bold text-[11px] h-8 px-2.5 sm:px-3 gap-1 shadow-2xs cursor-pointer"
            >
              <Link href="/" target="_blank">
                <span className="hidden sm:inline">Lihat Web Publik</span>
                <span className="sm:hidden">Web</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Bottom Row: Tablet-Friendly Touch Navigation Tab Bar */}
        <nav className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-2">
          {visibleTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer whitespace-nowrap min-h-[40px] select-none ${
                  isActive
                    ? "bg-purple-700 text-white shadow-sm"
                    : "bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/80"
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
