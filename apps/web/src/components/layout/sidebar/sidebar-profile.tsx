"use client";

import { useAuth } from "@/features/auth/hooks/use-auth";
import { ExternalLink, LogOut } from "lucide-react";
import Link from "next/link";
import type { AdminRole } from "./types";

interface SidebarProfileProps {
  currentRole: AdminRole;
  isCollapsed?: boolean;
}

export function SidebarProfile({ currentRole, isCollapsed = false }: SidebarProfileProps) {
  const { user, logout } = useAuth();

  const roleLabel = currentRole === "owner" ? "Owner & General Mgr" : "Staf Resepsionis";
  const userInitial = user?.name
    ? user.name.slice(0, 2).toUpperCase()
    : currentRole === "owner"
      ? "IA"
      : "ST";

  return (
    <div className="pt-4 border-t border-gray-100 space-y-3">
      <div className="relative group">
        <Link
          href="/"
          target="_blank"
          className={`flex items-center gap-2 rounded-xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200/60 text-slate-600 transition-all text-xs font-medium ${
            isCollapsed
              ? "w-10 h-10 mx-auto justify-center p-0"
              : "px-3 py-2 w-full justify-between"
          }`}
        >
          <div className="flex items-center gap-2 min-w-0">
            <ExternalLink className="w-3.5 h-3.5 shrink-0 text-slate-400" />
            {!isCollapsed && <span className="truncate">Web Tamu / Katalog</span>}
          </div>
          {!isCollapsed && (
            <span className="text-[10px] bg-white border border-slate-200 text-slate-500 px-1.5 py-0.5 rounded font-mono">
              Buka
            </span>
          )}
        </Link>

        {isCollapsed && (
          <div className="absolute left-14 top-1/2 -translate-y-1/2 bg-white text-slate-900 border border-gray-200 shadow-xl px-3 py-1.5 rounded-xl whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-50 flex items-center">
            <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-2 h-2 bg-white border-l border-b border-gray-200 rotate-45" />
            <span className="relative z-10 text-xs font-semibold text-slate-900 tracking-tight">
              Web Tamu
            </span>
          </div>
        )}
      </div>

      <div
        className={`flex items-center justify-between rounded-xl bg-white border border-gray-200/70 shadow-2xs ${
          isCollapsed ? "p-1 justify-center" : "p-2"
        }`}
      >
        <div className={`flex items-center gap-2.5 min-w-0 ${isCollapsed ? "hidden" : "flex"}`}>
          <div className="w-8 h-8 rounded-lg bg-slate-900 text-white font-bold text-xs flex items-center justify-center shrink-0">
            {userInitial}
          </div>
          <div className="min-w-0">
            <span className="text-xs font-semibold text-slate-800 leading-tight block truncate">
              {user?.name || (currentRole === "owner" ? "Ibu Annisa" : "Staf Resepsionis")}
            </span>
            <span className="text-[10px] text-slate-400 leading-tight block truncate mt-0.5">
              {roleLabel}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => logout()}
          title="Keluar Akun"
          aria-label="Logout"
          className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
