"use client";

import { useAuth } from "@/features/auth/hooks/use-auth";
import { staffApi } from "@/features/staff/api/staff.api";
import { KeyRound, Loader2, ShieldCheck, UserCheck, X } from "lucide-react";
import { useState } from "react";
import { createPortal } from "react-dom";
import { toast } from "sonner";

export function SettingsProfileCard() {
  const { user } = useAuth();
  const isOwner = user?.role === "owner";

  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  // Inisial nama pengguna
  const initials = user?.name
    ? user.name
        .split(" ")
        .slice(0, 2)
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "U";

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!oldPassword) {
      toast.error("Kata sandi saat ini / lama wajib diisi.");
      return;
    }
    if (!newPassword || newPassword.length < 6) {
      toast.error("Kata sandi baru minimal 6 karakter.");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Konfirmasi kata sandi tidak cocok.");
      return;
    }

    try {
      setIsUpdatingPassword(true);
      if (user?.id) {
        await staffApi.updateStaff(user.id, {
          oldPassword,
          password: newPassword,
        });
        toast.success("Kata sandi berhasil diperbarui!");
        setIsPasswordModalOpen(false);
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal memperbarui kata sandi.";
      toast.error(msg);
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-5">
      {/* Header Kartu */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div>
          <span className="text-[11px] font-medium uppercase tracking-wider text-slate-400 block">
            Profil Pengguna Aktif
          </span>
          <h2 className="text-base font-semibold text-slate-900 mt-0.5">Informasi Sesi Login</h2>
        </div>

        {/* Badge Role Netral */}
        <span
          className={`px-2.5 py-0.5 rounded-md text-xs font-medium border ${
            isOwner
              ? "bg-purple-50 text-purple-700 border-purple-200/80"
              : "bg-slate-100 text-slate-700 border-slate-200/80"
          }`}
        >
          {isOwner ? "Pemilik (Owner)" : "Staf Resepsionis"}
        </span>
      </div>

      {/* Identitas Pengguna */}
      <div className="flex items-center gap-3.5">
        <div className="w-11 h-11 rounded-full bg-slate-100 border border-slate-200/80 text-slate-700 font-semibold flex items-center justify-center text-sm shrink-0 tracking-wider">
          {initials}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-sm text-slate-900 truncate leading-snug">
            {user?.name || "Pengguna Aktif"}
          </h3>
          <p className="text-xs text-slate-500 font-mono truncate mt-0.5" title={user?.email}>
            {user?.email || "Tidak ada email"}
          </p>
        </div>
      </div>

      {/* Box Hak Akses Terverifikasi */}
      <div className="bg-slate-50/70 border border-slate-100 rounded-xl p-3 text-xs text-slate-600 leading-relaxed space-y-1">
        <div className="flex items-center gap-1.5 font-medium text-slate-700">
          {isOwner ? (
            <ShieldCheck className="w-3.5 h-3.5 text-purple-600 shrink-0" />
          ) : (
            <UserCheck className="w-3.5 h-3.5 text-slate-600 shrink-0" />
          )}
          <span>Hak Akses Terverifikasi</span>
        </div>
        <p className="text-[11px] text-slate-500 leading-relaxed">
          {isOwner
            ? "Akses penuh (Owner): Laporan omzet keuangan, tarif kamar, kelola akun staf, dan kontrol sistem."
            : "Akses operasional (Staf): Monitoring 8 unit kamar, check-in/out tamu, dan kasir POS oleh-oleh."}
        </p>
      </div>

      {/* Bagian Bawah: Aksi & Status */}
      <div className="pt-2 border-t border-slate-100 space-y-3">
        <button
          type="button"
          onClick={() => {
            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");
            setIsPasswordModalOpen(true);
          }}
          className="w-full h-9 rounded-xl border border-slate-200/80 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium inline-flex items-center justify-center gap-2 transition cursor-pointer shadow-2xs"
        >
          <KeyRound className="w-3.5 h-3.5 text-slate-500" />
          <span>Ubah Kata Sandi</span>
        </button>

        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-500 text-[11px] font-normal">Status Koneksi Sistem</span>
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            Sistem Aktif &amp; Terhubung
          </span>
        </div>
      </div>

      {/* Modal Dialog Ubah Kata Sandi */}
      {isPasswordModalOpen &&
        typeof document !== "undefined" &&
        createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
            <div
              className="fixed inset-0 -z-10"
              onClick={() => setIsPasswordModalOpen(false)}
              onKeyDown={(e) => {
                if (e.key === "Escape") setIsPasswordModalOpen(false);
              }}
            />
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xl w-full max-w-sm overflow-hidden p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700">
                    <KeyRound className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900">Ubah Kata Sandi</h3>
                    <p className="text-[11px] text-slate-500">Konfirmasi kata sandi saat ini.</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsPasswordModalOpen(false)}
                  className="w-7 h-7 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex items-center justify-center cursor-pointer transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handlePasswordSubmit} className="space-y-3.5">
                {/* Field 1: Kata Sandi Saat Ini / Lama */}
                <div>
                  <label
                    htmlFor="old-pwd"
                    className="text-xs font-medium text-slate-700 mb-1 block"
                  >
                    Kata Sandi Saat Ini / Lama <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="old-pwd"
                    type="password"
                    required
                    placeholder="Masukkan kata sandi lama"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="w-full h-10 px-3.5 text-sm bg-white border border-slate-200/80 rounded-xl focus:border-slate-900 focus:ring-1 focus:ring-slate-900/10 text-slate-900 shadow-2xs outline-none"
                  />
                </div>

                {/* Field 2: Kata Sandi Baru */}
                <div>
                  <label
                    htmlFor="new-pwd"
                    className="text-xs font-medium text-slate-700 mb-1 block"
                  >
                    Kata Sandi Baru <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="new-pwd"
                    type="password"
                    required
                    minLength={6}
                    placeholder="Minimal 6 karakter"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full h-10 px-3.5 text-sm bg-white border border-slate-200/80 rounded-xl focus:border-slate-900 focus:ring-1 focus:ring-slate-900/10 text-slate-900 shadow-2xs outline-none"
                  />
                </div>

                {/* Field 3: Konfirmasi Kata Sandi Baru */}
                <div>
                  <label
                    htmlFor="confirm-pwd"
                    className="text-xs font-medium text-slate-700 mb-1 block"
                  >
                    Konfirmasi Kata Sandi Baru <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="confirm-pwd"
                    type="password"
                    required
                    placeholder="Ketik ulang kata sandi baru"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full h-10 px-3.5 text-sm bg-white border border-slate-200/80 rounded-xl focus:border-slate-900 focus:ring-1 focus:ring-slate-900/10 text-slate-900 shadow-2xs outline-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsPasswordModalOpen(false)}
                    disabled={isUpdatingPassword}
                    className="border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 rounded-xl h-8 px-3 text-xs font-medium transition cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={isUpdatingPassword}
                    className="bg-slate-900 hover:bg-slate-800 text-white rounded-xl h-8 px-3.5 text-xs font-medium transition cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
                  >
                    {isUpdatingPassword && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                    <span>Simpan Sandi</span>
                  </button>
                </div>
              </form>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
