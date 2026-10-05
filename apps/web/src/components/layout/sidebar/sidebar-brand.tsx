"use client";

import { useSettings } from "@/features/settings/hooks/use-settings";
import { PanelLeftClose, PanelLeftOpen, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface SidebarBrandProps {
  isCollapsed?: boolean;
  isMobile?: boolean;
  onToggleCollapse?: () => void;
  onCloseMobile?: () => void;
}

export function SidebarBrand({
  isCollapsed = false,
  isMobile = false,
  onToggleCollapse,
  onCloseMobile,
}: SidebarBrandProps) {
  const { data: settings } = useSettings();
  const lodgingName = settings?.lodging_name || "Penginapan Annisa";

  if (isCollapsed) {
    return (
      <div className="flex flex-col items-center gap-2.5 pb-4 border-b border-gray-100">
        <Link
          href="/admin/dashboard"
          className="relative w-9 h-9 rounded-xl bg-slate-50 p-1 border border-gray-200/80 flex items-center justify-center shrink-0 hover:bg-slate-100 transition-colors"
          title={lodgingName}
        >
          <Image
            src="/images/branding/logo.png"
            alt={`Logo ${lodgingName}`}
            width={28}
            height={28}
            className="object-contain"
            priority
          />
        </Link>
        <button
          type="button"
          onClick={onToggleCollapse}
          title="Perluas Sidebar"
          aria-label="Perluas Sidebar"
          className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer"
        >
          <PanelLeftOpen className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between pb-4 border-b border-gray-100">
      <Link href="/admin/dashboard" className="flex items-center gap-2.5 min-w-0">
        <div className="relative w-9 h-9 rounded-xl bg-slate-50 p-1 border border-gray-200/80 flex items-center justify-center shrink-0">
          <Image
            src="/images/branding/logo.png"
            alt={`Logo ${lodgingName}`}
            width={28}
            height={28}
            className="object-contain"
            priority
          />
        </div>
        <div className="min-w-0">
          <span className="font-bold text-slate-900 text-sm leading-tight block truncate">
            {lodgingName}
          </span>
          <span className="text-[11px] text-slate-400 font-medium tracking-wide block leading-none truncate mt-0.5">
            PMS RESEPSIONIS
          </span>
        </div>
      </Link>

      {isMobile ? (
        <button
          type="button"
          onClick={onCloseMobile}
          aria-label="Tutup Menu"
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      ) : (
        <button
          type="button"
          onClick={onToggleCollapse}
          title="Ciutkan Sidebar"
          aria-label="Ciutkan Sidebar"
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
        >
          <PanelLeftClose className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
