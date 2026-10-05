"use client";

import type { CreateUserInput, UpdateUserInput, User, UserRole } from "@annisa/types";
import { Loader2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { toast } from "sonner";

interface StaffFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    id?: string;
    createInput?: CreateUserInput;
    updateInput?: UpdateUserInput;
  }) => Promise<void>;
  initialData?: User | null;
  isSubmitting?: boolean;
}

export function StaffFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isSubmitting = false,
}: StaffFormModalProps) {
  const [mounted, setMounted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("staff");

  useEffect(() => {
    setMounted(true);
  }, []);

  // Reset & sinkronkan state setiap kali modal dibuka atau initialData berubah
  useEffect(() => {
    if (!isOpen) return;

    if (initialData) {
      setName(initialData.name);
      setEmail(initialData.email);
      setPassword("");
      setRole((initialData.role as UserRole) || "staff");
    } else {
      setName("");
      setEmail("");
      setPassword("");
      setRole("staff");
    }
  }, [initialData, isOpen]);

  // Tutup dengan tombol Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, onClose]);

  if (!isOpen || !mounted) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      toast.error("Nama lengkap dan email wajib diisi.");
      return;
    }

    if (!initialData && (!password || password.length < 6)) {
      toast.error("Kata sandi wajib diisi minimal 6 karakter untuk akun baru.");
      return;
    }

    if (initialData && password && password.length < 6) {
      toast.error("Kata sandi baru minimal 6 karakter.");
      return;
    }

    try {
      if (initialData) {
        const updateInput: UpdateUserInput = {
          name: name.trim(),
          email: email.trim().toLowerCase(),
          role,
          ...(password ? { password } : {}),
        };
        await onSubmit({ id: initialData.id, updateInput });
      } else {
        const createInput: CreateUserInput = {
          name: name.trim(),
          email: email.trim().toLowerCase(),
          password,
          role,
        };
        await onSubmit({ createInput });
      }
      onClose();
    } catch {
      // Error toast ditangani oleh mutation handler
    }
  };

  const modalContent = (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      {/* Backdrop overlay */}
      <div
        className="fixed inset-0 -z-10"
        onClick={onClose}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") onClose();
        }}
      />

      {/* Modal Dialog Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header Modal */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              {initialData ? "Edit Akun Pengguna" : "Tambah Pengguna Baru"}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {initialData
                ? "Perbarui informasi akun, email login, atau izin akses."
                : "Daftarkan akun staf meja depan atau manajer baru."}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Form */}
        <form
          onSubmit={handleSubmit}
          autoComplete="off"
          className="flex-1 overflow-y-auto p-6 space-y-4"
        >
          {/* Nama Lengkap */}
          <div>
            <label htmlFor="staff-name" className="text-xs font-semibold text-slate-800 mb-1 block">
              Nama Lengkap <span className="text-rose-500">*</span>
            </label>
            <input
              id="staff-name"
              name="staff_full_name"
              type="text"
              required
              autoComplete="off"
              placeholder="Contoh: Rian Saputra"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-300 transition-all"
            />
          </div>

          {/* Email Login */}
          <div>
            <label
              htmlFor="staff-email"
              className="text-xs font-semibold text-slate-800 mb-1 block"
            >
              Email Login <span className="text-rose-500">*</span>
            </label>
            <input
              id="staff-email"
              name="staff_login_email"
              type="email"
              required
              autoComplete="new-email"
              placeholder="nama@penginapan-annisa.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-300 transition-all"
            />
          </div>

          {/* Kata Sandi */}
          <div>
            <label
              htmlFor="staff-password"
              className="text-xs font-semibold text-slate-800 mb-1 block"
            >
              Kata Sandi {!initialData && <span className="text-rose-500">*</span>}
            </label>
            <input
              id="staff-password"
              name="staff_new_password"
              type="password"
              required={!initialData}
              autoComplete="new-password"
              placeholder={
                initialData
                  ? "Kosongkan jika tidak ingin mengubah kata sandi"
                  : "Minimal 6 karakter"
              }
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-300 transition-all"
            />
            {initialData && (
              <p className="text-[11px] text-slate-400 mt-1">
                Isi kolom kata sandi hanya jika Anda ingin mereset password akun ini.
              </p>
            )}
          </div>

          {/* Pilihan Role */}
          <div>
            <label htmlFor="staff-role" className="text-xs font-semibold text-slate-800 mb-1 block">
              Peran & Hak Akses <span className="text-rose-500">*</span>
            </label>
            <select
              id="staff-role"
              name="staff_user_role"
              value={role}
              onChange={(e) => setRole(e.target.value as UserRole)}
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-300 transition-all cursor-pointer"
            >
              <option value="staff">Staf Resepsionis (Operasional Kamar & POS Kasir)</option>
              <option value="owner">Owner / Manajer (Akses Penuh Seluruh Sistem)</option>
            </select>
          </div>

          {/* Tombol Footer */}
          <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 rounded-xl h-9 px-4 text-xs font-semibold transition cursor-pointer disabled:opacity-50"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-slate-900 hover:bg-slate-800 text-white rounded-xl h-9 px-4 text-xs font-semibold shadow-xs transition cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
            >
              {isSubmitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              <span>{initialData ? "Simpan Perubahan" : "Simpan Akun"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
