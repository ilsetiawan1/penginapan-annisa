"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Bell, Clock, Loader2, Menu } from "lucide-react";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { AdminSidebar, type AdminRole } from "@/components/layout/admin-sidebar";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const dateStr = now.toLocaleDateString("id-ID", {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
      });
      const timeStr = now.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      });
      setCurrentTime(`${dateStr} • ${timeStr} WIT`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000 * 30);
    return () => clearInterval(interval);
  }, []);

  // Auth Guard Effect
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/admin/login");
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f3f2f7] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 text-purple-700 animate-spin" />
        <p className="text-xs font-semibold text-slate-600">
          Memverifikasi Sesi PMS...
        </p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const currentRole: AdminRole = (user?.role as AdminRole) || "staff";

  // Breadcrumb / Page Title Generator
  const getPageTitle = () => {
    if (pathname.includes("/admin/rooms")) return "Status 8 Kamar & Master Tarif";
    if (pathname.includes("/admin/reservations")) return "Jadwal Booking WhatsApp";
    if (pathname.includes("/admin/pos")) return "Kasir POS Oleh-Oleh";
    if (pathname.includes("/admin/reports")) return "Laporan Omzet & Keuangan";
    if (pathname.includes("/admin/staff")) return "Kelola Akun Staf Resepsionis";
    if (pathname.includes("/admin/settings")) return "Pengaturan Sistem PMS";
    return "Dashboard Ringkasan Operasional";
  };

  return (
    <div className="min-h-screen bg-[#f3f2f7] text-slate-900 font-sans flex flex-col antialiased p-3 sm:p-4 lg:p-5 items-center">
      <div className="w-full max-w-[1600px] flex flex-1 gap-4 lg:gap-5 items-start">
        {/* Left Collapsible SaaS Sidebar */}
        <AdminSidebar
          currentRole={currentRole}
          isMobileOpen={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
        />

        {/* Right Main Content Canvas */}
        <div className="flex-1 flex flex-col min-w-0 w-full space-y-4">
          {/* Top Minimal Header (Clean Whitespace Bar) */}
          <header className="w-full bg-white/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-3 sm:p-4 flex items-center justify-between shadow-2xs border border-purple-100/80 sticky top-3 sm:top-4 z-30">
            {/* Left: Mobile Menu Trigger + Breadcrumb Title */}
            <div className="flex items-center gap-3 min-w-0">
              <button
                type="button"
                onClick={() => setIsMobileSidebarOpen(true)}
                aria-label="Buka menu navigasi"
                className="md:hidden p-2 rounded-xl bg-purple-50 text-purple-800 hover:bg-purple-100 border border-purple-200/60 cursor-pointer shrink-0 transition"
              >
                <Menu className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              <div className="min-w-0">
                <span className="text-[10px] text-purple-700 font-bold uppercase tracking-wider block leading-none md:hidden">
                  Penginapan Annisa
                </span>
                <h1 className="text-sm sm:text-base font-black text-slate-900 truncate leading-tight mt-0.5">
                  {getPageTitle()}
                </h1>
              </div>
            </div>

            {/* Right: Real-time Clock WIT & Notification Bell */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {currentTime && (
                <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-50 text-purple-950 text-xs font-bold border border-purple-100/80">
                  <Clock className="w-3.5 h-3.5 text-purple-700" />
                  <span>{currentTime}</span>
                </div>
              )}

              {/* Notification Bell */}
              <button
                type="button"
                aria-label="Pemberitahuan masuk"
                className="relative w-9 h-9 rounded-full bg-purple-50/80 hover:bg-purple-100 border border-purple-150/80 flex items-center justify-center text-purple-800 transition cursor-pointer shrink-0 shadow-2xs"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white" />
              </button>
            </div>
          </header>

          {/* Main Page Body */}
          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </div>
    </div>
  );
}
