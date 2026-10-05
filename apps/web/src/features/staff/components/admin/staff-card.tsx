"use client";

import type { User } from "@annisa/types";
import { Edit2, Power, Trash2, UserCheck } from "lucide-react";

interface StaffCardProps {
  staff: User;
  isCurrentUser: boolean;
  onEdit: (staff: User) => void;
  onToggleActive: (staff: User) => void;
  onDelete: (staff: User) => void;
}

export function StaffCard({
  staff,
  isCurrentUser,
  onEdit,
  onToggleActive,
  onDelete,
}: StaffCardProps) {
  // Ambil inisial 1 atau 2 huruf
  const initials = staff.name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const isOwner = staff.role === "owner";

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between gap-4">
      {/* Bagian Atas: Avatar, Nama, Email */}
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 text-slate-700 font-bold flex items-center justify-center shrink-0 text-sm tracking-wider">
          {initials || "U"}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-sm text-slate-900 leading-snug truncate">{staff.name}</h3>
          <p className="text-xs text-slate-500 truncate mt-0.5" title={staff.email}>
            {staff.email}
          </p>
        </div>
      </div>

      {/* Bagian Tengah: Badges Role & Status */}
      <div className="flex items-center gap-2 pt-1">
        {/* Badge Role */}
        <span
          className={`px-2.5 py-0.5 rounded-md text-[11px] font-semibold border ${
            isOwner
              ? "bg-purple-50 text-purple-700 border-purple-200"
              : "bg-slate-100 text-slate-700 border-slate-200"
          }`}
        >
          {isOwner ? "Owner" : "Staf Resepsionis"}
        </span>

        {/* Badge Status Keaktifan */}
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium border ${
            staff.isActive
              ? "bg-emerald-50 text-emerald-700 border-emerald-200/80"
              : "bg-slate-50 text-slate-600 border-slate-200"
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
              staff.isActive ? "bg-emerald-500" : "bg-slate-400"
            }`}
          />
          {staff.isActive ? "Aktif" : "Nonaktif"}
        </span>
      </div>

      {/* Bagian Footer: Aksi */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 mt-auto">
        {isCurrentUser ? (
          <div className="flex items-center justify-between w-full gap-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 bg-slate-50 border border-slate-200/80 px-2.5 py-1.5 rounded-lg">
              <UserCheck className="w-3.5 h-3.5 text-slate-600 shrink-0" />
              <span>(Akun Anda / Sedang Digunakan)</span>
            </span>
            <button
              type="button"
              onClick={() => onEdit(staff)}
              className="h-8 px-3 text-xs font-medium border border-slate-200/80 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 rounded-lg transition-colors inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span>Edit</span>
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between w-full gap-2">
            <button
              type="button"
              onClick={() => onEdit(staff)}
              className="h-8 px-3 text-xs font-medium border border-slate-200/80 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 rounded-lg transition-colors inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span>Edit</span>
            </button>

            <div className="flex items-center gap-1.5 shrink-0">
              {/* Tombol Nonaktifkan / Aktifkan */}
              <button
                type="button"
                onClick={() => onToggleActive(staff)}
                title={staff.isActive ? "Nonaktifkan Akun" : "Aktifkan Akun"}
                className={`h-8 px-3 text-xs font-medium border border-slate-200/80 bg-white text-slate-600 rounded-lg transition-colors inline-flex items-center gap-1.5 cursor-pointer ${
                  staff.isActive
                    ? "hover:bg-amber-50 hover:text-amber-700 hover:border-amber-200"
                    : "hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200"
                }`}
              >
                <Power className="w-3.5 h-3.5" />
                <span>{staff.isActive ? "Nonaktifkan" : "Aktifkan"}</span>
              </button>

              {/* Tombol Hapus */}
              <button
                type="button"
                onClick={() => onDelete(staff)}
                title="Hapus Akun Pengguna"
                className="h-8 w-8 rounded-lg border border-slate-200/80 bg-white text-slate-400 hover:text-rose-600 hover:bg-rose-50 hover:border-rose-200 flex items-center justify-center transition-colors cursor-pointer shrink-0"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
