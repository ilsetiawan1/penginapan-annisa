"use client";

import { type AdminRole, AdminSidebar } from "@/components/layout/admin-sidebar";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { Clock, Loader2, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
      router.push("/internal");
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f3f2f7] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 text-purple-700 animate-spin" />
        <p className="text-xs font-semibold text-slate-600">Memverifikasi Sesi...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const currentRole: AdminRole = (user?.role as AdminRole) || "staff";

  // Breadcrumb / Section & Page Generator
  const getBreadcrumb = () => {
    if (pathname.includes("/admin/master-rooms"))
      return { category: "Pengaturan", sub: "Kelola Kamar & Tarif" };
    if (pathname.includes("/admin/master-souvenirs"))
      return { category: "Pengaturan", sub: "Kelola Oleh-Oleh" };
    if (pathname.includes("/admin/master-articles"))
      return { category: "Pengaturan", sub: "Kelola Artikel & SEO" };
    if (pathname.includes("/admin/rooms"))
      return { category: "Operasional", sub: "Status Kamar" };
    if (pathname.includes("/admin/reservations"))
      return { category: "Operasional", sub: "Jadwal Booking WA" };
    if (pathname.includes("/admin/pos"))
      return { category: "Operasional", sub: "Kasir Oleh-Oleh" };
    if (pathname.includes("/admin/reports"))
      return { category: "Operasional", sub: "Laporan Omzet" };
    if (pathname.includes("/admin/staff"))
      return { category: "Pengaturan", sub: "Kelola Akun Staf" };
    if (pathname.includes("/admin/settings"))
      return { category: "Pengaturan", sub: "Pengaturan Sistem" };
    return { category: "Operasional", sub: "Dashboard" };
  };

  const getPageTitle = () => {
    if (pathname.includes("/admin/master-rooms")) return "Kelola Kamar & Tarif";
    if (pathname.includes("/admin/master-souvenirs")) return "Kelola Oleh-Oleh";
    if (pathname.includes("/admin/master-articles")) return "Kelola Artikel & SEO";
    if (pathname.includes("/admin/rooms")) return "Status Kamar";
    if (pathname.includes("/admin/reservations")) return "Jadwal Booking WA";
    if (pathname.includes("/admin/pos")) return "Kasir Oleh-Oleh";
    if (pathname.includes("/admin/reports")) return "Laporan Omzet";
    if (pathname.includes("/admin/staff")) return "Kelola Akun Staf";
    if (pathname.includes("/admin/settings")) return "Pengaturan Sistem";
    return "Dashboard";
  };

  const breadcrumb = getBreadcrumb();

  return (
    <div className="min-h-screen md:h-screen md:max-h-screen md:overflow-hidden bg-[#f3f2f7] text-slate-900 font-sans flex flex-col antialiased p-3 sm:p-4 lg:p-5">
      <div className="w-full flex flex-1 gap-4 lg:gap-5 items-stretch h-full min-h-0">
        {/* Left Collapsible SaaS Sidebar */}
        <AdminSidebar
          currentRole={currentRole}
          isMobileOpen={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
        />

        {/* Right Main Content Canvas */}
        <div className="flex-1 flex flex-col min-w-0 w-full h-full min-h-0 space-y-3 sm:space-y-3.5">
          {/* Top Minimal Header (Clean Whitespace Bar) */}
          <header className="w-full bg-white/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-3 sm:p-3.5 flex items-center justify-between shadow-2xs border border-purple-100/80 shrink-0 z-30">
            {/* Left: Mobile Menu Trigger + Title on top, Breadcrumb below */}
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
                <h1 className="text-sm sm:text-base font-black text-slate-900 truncate leading-tight">
                  {getPageTitle()}
                </h1>
                <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold text-slate-400 leading-none mt-1">
                  <span>{breadcrumb.category}</span>
                  <span className="text-slate-300">/</span>
                  <span className="text-purple-700 font-extrabold">{breadcrumb.sub}</span>
                </div>
              </div>
            </div>

            {/* Right: Real-time Clock WIT (No Notification Bell) */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {currentTime && (
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-50 text-purple-950 text-xs font-bold border border-purple-100/80">
                  <Clock className="w-3.5 h-3.5 text-purple-700" />
                  <span>{currentTime}</span>
                </div>
              )}
            </div>
          </header>

          {/* Main Page Body: Naturally scrollable whenever content exceeds viewport */}
          <main className="flex-1 min-w-0 min-h-0 overflow-y-auto flex flex-col pr-0.5">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
