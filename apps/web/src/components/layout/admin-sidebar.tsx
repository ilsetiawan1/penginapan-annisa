"use client";

import { useEffect, useState } from "react";
import { type AdminRole, SidebarBrand, SidebarNav, SidebarProfile } from "./sidebar";

export type { AdminRole };

interface AdminSidebarProps {
  currentRole: AdminRole;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export function AdminSidebar({ currentRole, isMobileOpen, onCloseMobile }: AdminSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

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
      const next = !prev;
      try {
        localStorage.setItem("annisa_sidebar_collapsed", String(next));
      } catch {
        // Ignore
      }
      return next;
    });
  };

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

      {/* Desktop & Tablet Collapsible Dock */}
      <aside
        className={`hidden md:flex flex-col justify-between shrink-0 bg-white border-r border-gray-200/80 p-4 sm:p-5 h-screen sticky top-0 transition-all duration-300 ease-in-out z-30 ${
          isCollapsed ? "w-[72px]" : "w-64"
        }`}
      >
        <div className="space-y-4 min-h-0">
          <SidebarBrand isCollapsed={isCollapsed} onToggleCollapse={toggleCollapse} />
          <SidebarNav currentRole={currentRole} isCollapsed={isCollapsed} />
        </div>

        <SidebarProfile currentRole={currentRole} isCollapsed={isCollapsed} />
      </aside>

      {/* Mobile Slide-over Drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 bg-white border-r border-[#e2dcf2] w-72 flex flex-col justify-between p-5 transition-transform duration-300 ease-in-out md:hidden shadow-2xl ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="space-y-5 min-h-0">
          <SidebarBrand isMobile onCloseMobile={onCloseMobile} />
          <SidebarNav currentRole={currentRole} onItemClick={onCloseMobile} />
        </div>

        <SidebarProfile currentRole={currentRole} />
      </aside>
    </>
  );
}
