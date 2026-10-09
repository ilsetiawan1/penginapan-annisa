"use client";

import {
  Building2,
  Clock,
  HelpCircle,
  Loader2,
  MapPin,
  Pencil,
  Percent,
  RotateCcw,
  Save,
} from "lucide-react";
import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { toast } from "sonner";

interface SettingsGeneralFormProps {
  waNumber: string;
  onWaNumberChange: (value: string) => void;
  lodgingName: string;
  onLodgingNameChange: (value: string) => void;
  distanceText: string;
  onDistanceTextChange: (value: string) => void;
  checkinTime: string;
  onCheckinTimeChange: (value: string) => void;
  checkoutTime: string;
  onCheckoutTimeChange: (value: string) => void;
  minDpPercent: string;
  onMinDpPercentChange: (value: string) => void;
  onSave: () => Promise<void>;
  onReset: () => void;
  isSaving?: boolean;
}

function InfoTooltip({ content }: { content: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative inline-flex items-center"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setIsOpen(false)}
        className="text-slate-400 hover:text-slate-700 transition-colors p-0.5 rounded cursor-pointer inline-flex items-center justify-center"
        aria-label="Informasi parameter"
      >
        <HelpCircle className="w-3.5 h-3.5" />
      </button>

      {isOpen && (
        <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 z-30 w-56 sm:w-64 p-2.5 bg-slate-900 text-white text-[11px] leading-relaxed rounded-xl shadow-xl border border-slate-800 animate-in fade-in zoom-in-95 duration-150 pointer-events-none">
          {content}
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-slate-900" />
        </div>
      )}
    </div>
  );
}

export function SettingsGeneralForm({
  waNumber,
  onWaNumberChange,
  lodgingName,
  onLodgingNameChange,
  distanceText,
  onDistanceTextChange,
  checkinTime,
  onCheckinTimeChange,
  checkoutTime,
  onCheckoutTimeChange,
  minDpPercent,
  onMinDpPercentChange,
  onSave,
  onReset,
  isSaving = false,
}: SettingsGeneralFormProps) {
  const [isEditing, setIsEditing] = useState(false);

  const handleResetClick = () => {
    onReset();
    toast.info("Parameter dikembalikan ke nilai awal database.");
  };

  const handleCancelClick = () => {
    onReset();
    setIsEditing(false);
  };

  const handleSaveClick = async () => {
    try {
      await onSave();
      setIsEditing(false);
    } catch {
      // Error toast ditangani oleh mutation hook
    }
  };

  const inputBaseWithIcon = isEditing
    ? "w-full h-10 pl-10 pr-3.5 text-sm bg-white border border-slate-900/30 focus:border-slate-900 focus:ring-1 focus:ring-slate-900/10 text-slate-900 shadow-2xs outline-none transition-all placeholder:text-slate-400"
    : "w-full h-10 pl-10 pr-3.5 text-sm bg-slate-50/70 border border-slate-200/60 text-slate-800 shadow-2xs outline-none cursor-not-allowed transition-all";

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-6">
      {/* Header Kartu dengan Aksi Mode View/Edit */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-3">
        <div>
          <span className="text-[11px] font-medium uppercase tracking-wider text-slate-400 block">
            Parameter Properti &amp; Operasional
          </span>
          <div className="flex items-center gap-1.5 mt-0.5">
            <h2 className="text-base font-semibold text-slate-900">
              Identitas Kontak &amp; Aturan Menginap
            </h2>
            <InfoTooltip content="Parameter operasional dan data kontak resmi yang langsung terhubung ke website publik tamu Penginapan Annisa." />
          </div>
        </div>

        {!isEditing ? (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="h-8 px-3 text-xs font-medium rounded-lg border border-slate-200/80 bg-white hover:bg-slate-50 text-slate-700 inline-flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs shrink-0 self-start sm:self-auto"
          >
            <Pencil className="w-3.5 h-3.5 text-slate-500" />
            <span>Edit Parameter</span>
          </button>
        ) : (
          <div className="flex items-center gap-2 shrink-0 flex-wrap">
            <button
              type="button"
              onClick={handleResetClick}
              disabled={isSaving}
              className="h-8 px-3 text-xs font-medium rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition-colors cursor-pointer disabled:opacity-50 inline-flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Semula</span>
            </button>
            <button
              type="button"
              onClick={handleCancelClick}
              disabled={isSaving}
              className="h-8 px-3 text-xs font-medium rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer disabled:opacity-50"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={handleSaveClick}
              disabled={isSaving}
              className="h-8 px-4 text-xs font-medium rounded-lg bg-slate-900 hover:bg-slate-800 text-white inline-flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer disabled:opacity-60"
            >
              {isSaving ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Save className="w-3.5 h-3.5" />
              )}
              <span>Simpan Perubahan</span>
            </button>
          </div>
        )}
      </div>

      {/* Section 1: Kontak & Lokasi Publik */}
      <div className="space-y-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 block">
          Kontak &amp; Lokasi Publik
        </span>

        {/* Nomor WhatsApp */}
        <div>
          <label
            htmlFor="settings-wa"
            className="text-xs font-medium text-slate-700 mb-1.5 inline-flex items-center gap-1.5"
          >
            <span>Nomor WhatsApp Booking &amp; Titip Ambil</span>
            <InfoTooltip content="Nomor tujuan saat tamu mengklik tombol 'Pesan via WhatsApp' di beranda publik, detail kamar, dan titip oleh-oleh." />
          </label>
          <div className="relative flex items-center">
            <div
              className={`absolute left-3.5 ${
                isEditing ? "text-emerald-600" : "text-emerald-700/60"
              }`}
            >
              <FaWhatsapp className="w-4 h-4" />
            </div>
            <input
              id="settings-wa"
              type="text"
              disabled={!isEditing}
              value={waNumber}
              onChange={(e) => onWaNumberChange(e.target.value)}
              placeholder="6281242163116"
              className={inputBaseWithIcon}
            />
          </div>
        </div>

        {/* Nama Usaha Penginapan */}
        <div>
          <label
            htmlFor="settings-lodging-name"
            className="text-xs font-medium text-slate-700 mb-1.5 inline-flex items-center gap-1.5"
          >
            <span>Nama Usaha Penginapan</span>
            <InfoTooltip content="Identitas nama properti yang tampil di navbar situs web tamu, invoice, dan footer halaman." />
          </label>
          <div className="relative flex items-center">
            <div className="absolute left-3.5 text-slate-400">
              <Building2 className="w-4 h-4" />
            </div>
            <input
              id="settings-lodging-name"
              type="text"
              disabled={!isEditing}
              value={lodgingName}
              onChange={(e) => onLodgingNameChange(e.target.value)}
              placeholder="Penginapan Annisa"
              className={inputBaseWithIcon}
            />
          </div>
        </div>

        {/* Keterangan Jarak & Lokasi Bandara */}
        <div>
          <label
            htmlFor="settings-distance"
            className="text-xs font-medium text-slate-700 mb-1.5 inline-flex items-center gap-1.5"
          >
            <span>Keterangan Jarak &amp; Lokasi Bandara</span>
            <InfoTooltip content="Informasi jarak transit yang ditampilkan pada kartu lokasi beranda publik untuk menarik tamu penerbangan pagi." />
          </label>
          <div className="relative flex items-center">
            <div className="absolute left-3.5 text-slate-400">
              <MapPin className="w-4 h-4" />
            </div>
            <input
              id="settings-distance"
              type="text"
              disabled={!isEditing}
              value={distanceText}
              onChange={(e) => onDistanceTextChange(e.target.value)}
              placeholder="2-3 Menit dari Bandara Pattimura"
              className={inputBaseWithIcon}
            />
          </div>
        </div>
      </div>

      {/* Divider Pemisah */}
      <div className="border-t border-slate-100 my-4" />

      {/* Section 2: Waktu Operasional & Reservasi */}
      <div className="space-y-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 block">
          Waktu Operasional &amp; Reservasi
        </span>

        {/* Grid Check-In & Check-Out */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="settings-checkin"
              className="text-xs font-medium text-slate-700 mb-1.5 inline-flex items-center gap-1.5"
            >
              <span>Jam Standar Check-In</span>
              <InfoTooltip content="Waktu default yang otomatis dicantumkan pada format pesan WhatsApp konfirmasi reservasi tamu." />
            </label>
            <div className="relative flex items-center">
              <div className="absolute left-3.5 text-slate-400">
                <Clock className="w-4 h-4" />
              </div>
              <input
                id="settings-checkin"
                type="text"
                disabled={!isEditing}
                value={checkinTime}
                onChange={(e) => onCheckinTimeChange(e.target.value)}
                placeholder="14:00 WIT"
                className={inputBaseWithIcon}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="settings-checkout"
              className="text-xs font-medium text-slate-700 mb-1.5 inline-flex items-center gap-1.5"
            >
              <span>Jam Standar Check-Out</span>
              <InfoTooltip content="Waktu default yang otomatis dicantumkan pada format pesan WhatsApp konfirmasi reservasi tamu." />
            </label>
            <div className="relative flex items-center">
              <div className="absolute left-3.5 text-slate-400">
                <Clock className="w-4 h-4" />
              </div>
              <input
                id="settings-checkout"
                type="text"
                disabled={!isEditing}
                value={checkoutTime}
                onChange={(e) => onCheckoutTimeChange(e.target.value)}
                placeholder="12:00 WIT"
                className={inputBaseWithIcon}
              />
            </div>
          </div>
        </div>

        {/* Minimal DP Reservasi */}
        <div>
          <label
            htmlFor="settings-dp"
            className="text-xs font-medium text-slate-700 mb-1.5 inline-flex items-center gap-1.5"
          >
            <span>Minimal DP Reservasi Online</span>
            <InfoTooltip content="Ketentuan persentase uang muka resmi yang tertera pada draf rincian pembayaran pemesanan kamar." />
          </label>
          <div className="relative flex items-center">
            <div className="absolute left-3.5 text-slate-400">
              <Percent className="w-4 h-4" />
            </div>
            <input
              id="settings-dp"
              type="text"
              disabled={!isEditing}
              value={minDpPercent}
              onChange={(e) => onMinDpPercentChange(e.target.value)}
              placeholder="50%"
              className={inputBaseWithIcon}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
