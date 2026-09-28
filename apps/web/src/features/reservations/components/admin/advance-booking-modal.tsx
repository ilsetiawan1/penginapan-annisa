"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  useCreateAdvanceBooking,
  useReservations,
} from "@/features/reservations/hooks/use-reservations";
import {
  AlertTriangle,
  Banknote,
  Calendar,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Info,
  Landmark,
  Phone,
  QrCode,
  Sparkles,
  User,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

// ==========================================
// DATE HELPER UTILITIES
// ==========================================
export function toIsoDate(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function parseIsoDate(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function addDays(iso: string, days: number): string {
  const d = parseIsoDate(iso);
  d.setDate(d.getDate() + days);
  return toIsoDate(d);
}

export function calcDaysDiff(startIso: string, endIso: string): number {
  const d1 = parseIsoDate(startIso);
  const d2 = parseIsoDate(endIso);
  const diffTime = d2.getTime() - d1.getTime();
  return Math.max(1, Math.round(diffTime / (1000 * 60 * 60 * 24)));
}

export function formatIdDate(isoOrDate: string | Date): string {
  if (!isoOrDate) return "";
  const d =
    typeof isoOrDate === "string"
      ? isoOrDate.includes("T")
        ? new Date(isoOrDate)
        : parseIsoDate(isoOrDate)
      : isoOrDate;
  if (isNaN(d.getTime())) return String(isoOrDate);
  return d.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function extractIsoString(val: string | Date | undefined): string {
  if (!val) return "";
  if (val instanceof Date) return toIsoDate(val);
  if (/^\d{4}-\d{2}-\d{2}/.test(val)) return val.slice(0, 10);
  const d = new Date(val);
  if (!isNaN(d.getTime())) return toIsoDate(d);
  return "";
}

// ==========================================
// INTERFACES & CONSTANTS
// ==========================================
export interface AdvanceBookingData {
  id: string;
  roomCode: string; // "A1" - "B4"
  roomTypeName: string;
  guestName: string;
  guestPhone: string;
  checkInDate: string; // formatted ID string
  checkOutDate: string; // formatted ID string
  checkInIso?: string; // "YYYY-MM-DD"
  checkOutIso?: string; // "YYYY-MM-DD"
  nights: number;
  totalAmount: number;
  dpPaid: number;
  remainingAmount: number;
  paymentMethod: "transfer" | "qris" | "cash";
  notes?: string;
  status: "confirmed" | "checked_in" | "cancelled";
}

interface AdvanceBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: AdvanceBookingData) => void;
  initialDate?: Date | string;
  existingBookings?: AdvanceBookingData[];
}

export const ROOM_OPTIONS = [
  {
    code: "A1",
    building: "A",
    name: "Kamar A1 — Bangunan A • Tipe AC",
    price: 275000,
  },
  {
    code: "A2",
    building: "A",
    name: "Kamar A2 — Bangunan A • Tipe AC",
    price: 275000,
  },
  {
    code: "A3",
    building: "A",
    name: "Kamar A3 — Bangunan A • Tipe Kipas",
    price: 200000,
  },
  {
    code: "A4",
    building: "A",
    name: "Kamar A4 — Bangunan A • Tipe Kipas",
    price: 200000,
  },
  {
    code: "B1",
    building: "B",
    name: "Kamar B1 — Bangunan B • Tipe AC",
    price: 275000,
  },
  {
    code: "B2",
    building: "B",
    name: "Kamar B2 — Bangunan B • Tipe AC",
    price: 275000,
  },
  {
    code: "B3",
    building: "B",
    name: "Kamar B3 — Bangunan B • Tipe Kipas",
    price: 200000,
  },
  {
    code: "B4",
    building: "B",
    name: "Kamar B4 — Bangunan B • Tipe Kipas",
    price: 200000,
  },
];

const CALENDAR_DAYS_HEADER = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

export function AdvanceBookingModal({
  isOpen,
  onClose,
  onConfirm,
  initialDate,
  existingBookings,
}: AdvanceBookingModalProps) {
  const createAdvanceMutation = useCreateAdvanceBooking();
  const { data: dbReservations } = useReservations();

  const todayIso = toIsoDate(new Date());

  // Form State
  const [checkInDate, setCheckInDate] = useState<string>(() =>
    initialDate ? extractIsoString(initialDate) || todayIso : todayIso,
  );
  const [nights, setNights] = useState<number>(1);
  const [checkOutDate, setCheckOutDate] = useState<string>(() => addDays(todayIso, 1));
  const [selectedRoomCode, setSelectedRoomCode] = useState<string>("A1");
  const [guestName, setGuestName] = useState<string>("");
  const [guestPhone, setGuestPhone] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<"transfer" | "qris" | "cash">("transfer");
  const [dpPaid, setDpPaid] = useState<number>(137500);
  const [landingTime, setLandingTime] = useState<string>("14:30");

  // Mini Calendar Navigation State
  const [calendarMonth, setCalendarMonth] = useState<Date>(() =>
    initialDate ? (typeof initialDate === "string" ? parseIsoDate(initialDate) : initialDate) : new Date(),
  );

  // Sync saat modal dibuka
  useEffect(() => {
    if (isOpen) {
      const initIso = initialDate ? extractIsoString(initialDate) || todayIso : todayIso;
      setCheckInDate(initIso);
      setNights(1);
      setCheckOutDate(addDays(initIso, 1));
      setCalendarMonth(parseIsoDate(initIso));
      setGuestName("");
      setGuestPhone("");
      setLandingTime("14:30");
    }
  }, [isOpen, initialDate, todayIso]);

  // Gabungkan daftar reservasi aktif (DB + passed props) untuk deteksi bentrok jadwal
  const activeReservations = useMemo(() => {
    const list: { roomCode: string; inIso: string; outIso: string; status: string }[] = [];

    // Dari database
    if (dbReservations?.items && Array.isArray(dbReservations.items)) {
      for (const r of dbReservations.items) {
        if (r.status !== "cancelled") {
          list.push({
            roomCode: r.room?.roomNumber || "",
            inIso: toIsoDate(new Date(r.checkInDate)),
            outIso: toIsoDate(new Date(r.checkOutDate)),
            status: r.status,
          });
        }
      }
    }

    // Dari props fallback
    if (existingBookings && Array.isArray(existingBookings)) {
      for (const b of existingBookings) {
        if (b.status !== "cancelled") {
          const inIso = b.checkInIso || extractIsoString(b.checkInDate);
          const outIso = b.checkOutIso || extractIsoString(b.checkOutDate);
          if (inIso && outIso && !list.some((item) => item.roomCode === b.roomCode && item.inIso === inIso)) {
            list.push({
              roomCode: b.roomCode,
              inIso,
              outIso,
              status: b.status,
            });
          }
        }
      }
    }

    return list;
  }, [dbReservations, existingBookings]);

  // Fungsi pengecekan ketersediaan kamar pada rentang [checkInDate, checkOutDate)
  const isRoomOccupied = (roomCode: string): boolean => {
    return activeReservations.some((r) => {
      if (r.roomCode !== roomCode) return false;
      // Overlap: r.inIso < checkOutDate && r.outIso > checkInDate
      return r.inIso < checkOutDate && r.outIso > checkInDate;
    });
  };

  // Kamar yang dipilih & perhitungan biaya
  const selectedRoom = ROOM_OPTIONS.find((r) => r.code === selectedRoomCode) || ROOM_OPTIONS[0];
  const isSelectedRoomOccupied = isRoomOccupied(selectedRoomCode);
  const totalAmount = selectedRoom.price * nights;
  const remainingAmount = Math.max(0, totalAmount - dpPaid);

  // Auto-switch ke kamar pertama yang tersedia jika kamar saat ini bentrok
  useEffect(() => {
    if (isSelectedRoomOccupied) {
      const firstAvailable = ROOM_OPTIONS.find((r) => !isRoomOccupied(r.code));
      if (firstAvailable) {
        setSelectedRoomCode(firstAvailable.code);
        setDpPaid(Math.round(firstAvailable.price * nights * 0.5));
      }
    }
  }, [checkInDate, checkOutDate, isSelectedRoomOccupied, nights]);

  // Handler pergantian Check-In
  const handleCheckInChange = (newInIso: string) => {
    if (!newInIso) return;
    setCheckInDate(newInIso);
    const newOut = addDays(newInIso, nights);
    setCheckOutDate(newOut);
  };

  // Handler pergantian Check-Out
  const handleCheckOutChange = (newOutIso: string) => {
    if (!newOutIso) return;
    if (newOutIso <= checkInDate) {
      // Minimal 1 malam
      const fixedOut = addDays(checkInDate, 1);
      setCheckOutDate(fixedOut);
      setNights(1);
      return;
    }
    setCheckOutDate(newOutIso);
    const diff = calcDaysDiff(checkInDate, newOutIso);
    setNights(diff);
  };

  // Handler pergantian Durasi Malam
  const handleNightsChange = (newNights: number) => {
    setNights(newNights);
    const newOut = addDays(checkInDate, newNights);
    setCheckOutDate(newOut);
    setDpPaid(Math.round(selectedRoom.price * newNights * 0.5));
  };

  // Handler klik tanggal di Mini Calendar (Mirip Gambar Refrensi 4)
  const handleCalendarDayClick = (clickedIso: string) => {
    if (clickedIso < todayIso) return; // Tidak boleh pilih tanggal lampau

    // Jika mengklik sebelum check-in saat ini atau check-in sudah lewat
    if (clickedIso < checkInDate || clickedIso === checkOutDate) {
      setCheckInDate(clickedIso);
      setCheckOutDate(addDays(clickedIso, 1));
      setNights(1);
      return;
    }

    if (clickedIso === checkInDate) {
      // Klik tanggal yang sama -> set 1 malam
      setCheckOutDate(addDays(clickedIso, 1));
      setNights(1);
      return;
    }

    // Jika mengklik setelah check-in -> jadikan tanggal check-out
    if (clickedIso > checkInDate) {
      setCheckOutDate(clickedIso);
      const diff = calcDaysDiff(checkInDate, clickedIso);
      setNights(diff);
    }
  };

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) return;
    if (isSelectedRoomOccupied) return;

    try {
      const computedNotes = landingTime.trim()
        ? `Landing ${landingTime.trim().replace(":", ".")} WIT`
        : undefined;

      const res = await createAdvanceMutation.mutateAsync({
        roomCode: selectedRoom.code,
        guestName: guestName.trim(),
        guestPhone: guestPhone.trim(),
        checkInDate,
        nights,
        dpPaid,
        paymentMethod,
        notes: computedNotes,
      });

      onConfirm({
        id: (res as any)?.code || `BK-${Date.now().toString().slice(-4)}`,
        roomCode: selectedRoom.code,
        roomTypeName:
          selectedRoom.code.startsWith("A1") ||
          selectedRoom.code.startsWith("A2") ||
          selectedRoom.code.startsWith("B1") ||
          selectedRoom.code.startsWith("B2")
            ? "Tipe AC"
            : "Tipe Kipas",
        guestName: guestName.trim(),
        guestPhone: guestPhone.trim(),
        checkInDate: formatIdDate(checkInDate),
        checkOutDate: formatIdDate(checkOutDate),
        checkInIso: checkInDate,
        checkOutIso: checkOutDate,
        nights,
        totalAmount,
        dpPaid,
        remainingAmount,
        paymentMethod,
        notes: computedNotes,
        status: "confirmed",
      });

      setGuestName("");
      setGuestPhone("");
      setLandingTime("14:30");
      onClose();
    } catch {
      // Error ditangani hook toast
    }
  };

  // Perhitungan Grid Mini Calendar
  const calYear = calendarMonth.getFullYear();
  const calMonth = calendarMonth.getMonth();
  const calMonthName = calendarMonth.toLocaleDateString("id-ID", {
    month: "long",
    year: "numeric",
  });
  const daysInCalMonth = new Date(calYear, calMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(calYear, calMonth, 1).getDay();
  const prevMonthDays = new Date(calYear, calMonth, 0).getDate();

  const availableRoomsCount = ROOM_OPTIONS.filter((r) => !isRoomOccupied(r.code)).length;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-[96vw] max-h-[94vh] overflow-y-auto bg-white rounded-3xl p-4 sm:p-5 shadow-2xl border border-slate-200 text-slate-900">
        <DialogHeader className="text-left pb-2 border-b border-slate-100 flex flex-row items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-purple-100 text-purple-800 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Booking Mendatang WhatsApp
              </span>
              <span className="text-[11px] font-bold text-slate-500 hidden sm:inline">
                • 750m dari Bandara Pattimura
              </span>
            </div>
            <DialogTitle className="text-base sm:text-lg font-black text-slate-900 leading-tight mt-1">
              Catat Reservasi WhatsApp
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-500 mt-0.5">
              Pilih tanggal menginap & unit kamar. Kamar yang sudah dipesan otomatis terkunci.
            </DialogDescription>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-3 pt-1">
          {/* ====================================================
              2 KOLOM: KIRI (KALENDER & RENTANG TANGGAL) • KANAN (FORM DATA & KAMAR)
              ==================================================== */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            {/* ================================================
                KOLOM KIRI (5/12): JADWAL KALENDER & RINCIAN TANGGAL
                ================================================ */}
            <div className="lg:col-span-5 bg-[#faf8fe] rounded-2xl p-3 sm:p-3.5 border border-purple-100/90 shadow-2xs space-y-2.5">
              {/* Header Mini Calendar */}
              <div className="flex items-center justify-between">
                <h4 className="text-xs sm:text-sm font-black text-slate-900 capitalize tracking-tight flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-purple-700" />
                  <span>{calMonthName}</span>
                </h4>
                <div className="flex items-center gap-1 bg-white p-0.5 rounded-xl border border-slate-200 shadow-2xs">
                  <button
                    type="button"
                    onClick={() =>
                      setCalendarMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))
                    }
                    className="p-1 rounded-lg hover:bg-purple-50 text-slate-600 hover:text-purple-700 transition cursor-pointer"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setCalendarMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))
                    }
                    className="p-1 rounded-lg hover:bg-purple-50 text-slate-600 hover:text-purple-700 transition cursor-pointer"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Hari dalam Minggu */}
              <div className="grid grid-cols-7 gap-1 text-center">
                {CALENDAR_DAYS_HEADER.map((d, idx) => (
                  <span
                    key={d}
                    className={`text-[10px] font-black uppercase ${
                      idx === 0 ? "text-rose-500" : "text-slate-400"
                    }`}
                  >
                    {d}
                  </span>
                ))}
              </div>

              {/* Grid Hari Kalender */}
              <div className="grid grid-cols-7 gap-1">
                {/* Hari padding bulan sebelumnya */}
                {Array.from({ length: firstDayOfWeek }).map((_, i) => {
                  const pDay = prevMonthDays - firstDayOfWeek + i + 1;
                  return (
                    <div
                      key={`p-${pDay}`}
                      className="h-7 sm:h-7.5 flex items-center justify-center text-[10px] text-slate-300 select-none"
                    >
                      {pDay}
                    </div>
                  );
                })}

                {/* Hari bulan berjalan */}
                {Array.from({ length: daysInCalMonth }).map((_, i) => {
                  const dayNum = i + 1;
                  const thisIso = `${calYear}-${String(calMonth + 1).padStart(2, "0")}-${String(dayNum).padStart(2, "0")}`;
                  const isPast = thisIso < todayIso;
                  const isCheckIn = thisIso === checkInDate;
                  const isCheckOut = thisIso === checkOutDate;
                  const isInStayRange = thisIso >= checkInDate && thisIso < checkOutDate;

                  // Styling pita rentang tanggal
                  let dayClass =
                    "h-7 sm:h-7.5 text-xs font-bold transition-all relative flex items-center justify-center cursor-pointer ";

                  if (isPast) {
                    dayClass += "text-slate-300 cursor-not-allowed ";
                  } else if (isCheckIn) {
                    dayClass +=
                      "bg-purple-700 text-white font-black rounded-l-xl z-10 shadow-xs ";
                  } else if (isCheckOut) {
                    dayClass +=
                      "bg-purple-900 text-white font-black rounded-r-xl z-10 shadow-xs ";
                  } else if (isInStayRange) {
                    dayClass += "bg-purple-200/80 text-purple-950 font-black rounded-none ";
                  } else {
                    dayClass += "text-slate-700 hover:bg-purple-100 hover:text-purple-900 rounded-lg ";
                  }

                  return (
                    <button
                      key={`d-${dayNum}`}
                      type="button"
                      disabled={isPast}
                      onClick={() => handleCalendarDayClick(thisIso)}
                      className={dayClass}
                      title={`Klik untuk memilih tanggal ${dayNum} ${calMonthName}`}
                    >
                      <span>{dayNum}</span>
                    </button>
                  );
                })}
              </div>

              {/* Input Tanggal Langsung & Durasi Menginap */}
              <div className="pt-2 border-t border-purple-100/90 space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-0.5">
                    <label
                      htmlFor="adv-in"
                      className="text-[9px] font-black text-slate-700 uppercase tracking-wider block"
                    >
                      Tgl Check-In
                    </label>
                    <input
                      id="adv-in"
                      type="date"
                      required
                      min={todayIso}
                      value={checkInDate}
                      onChange={(e) => handleCheckInChange(e.target.value)}
                      className="w-full bg-white border border-purple-200 focus:border-purple-600 rounded-lg px-2 py-1 text-xs font-black text-slate-900 outline-none"
                    />
                  </div>

                  <div className="space-y-0.5">
                    <label
                      htmlFor="adv-out"
                      className="text-[9px] font-black text-slate-700 uppercase tracking-wider block"
                    >
                      Tgl Check-Out
                    </label>
                    <input
                      id="adv-out"
                      type="date"
                      required
                      min={addDays(checkInDate, 1)}
                      value={checkOutDate}
                      onChange={(e) => handleCheckOutChange(e.target.value)}
                      className="w-full bg-white border border-purple-200 focus:border-purple-600 rounded-lg px-2 py-1 text-xs font-black text-slate-900 outline-none"
                    />
                  </div>
                </div>

                {/* Selector Durasi Malam */}
                <div className="space-y-0.5">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="adv-dur"
                      className="text-[9px] font-black text-slate-700 uppercase tracking-wider block"
                    >
                      Durasi Menginap
                    </label>
                    <span className="text-[10px] font-extrabold text-purple-700 bg-purple-100 px-1.5 py-0.5 rounded">
                      {nights} Malam
                    </span>
                  </div>
                  <select
                    id="adv-dur"
                    value={nights}
                    onChange={(e) => handleNightsChange(Number(e.target.value))}
                    className="w-full bg-white border border-purple-200 focus:border-purple-600 rounded-lg px-2 py-1 text-xs font-bold text-slate-900 outline-none cursor-pointer"
                  >
                    <option value={1}>1 Malam ({formatIdDate(checkInDate)} – {formatIdDate(addDays(checkInDate, 1))})</option>
                    <option value={2}>2 Malam ({formatIdDate(checkInDate)} – {formatIdDate(addDays(checkInDate, 2))})</option>
                    <option value={3}>3 Malam ({formatIdDate(checkInDate)} – {formatIdDate(addDays(checkInDate, 3))})</option>
                    <option value={4}>4 Malam ({formatIdDate(checkInDate)} – {formatIdDate(addDays(checkInDate, 4))})</option>
                    <option value={5}>5 Malam ({formatIdDate(checkInDate)} – {formatIdDate(addDays(checkInDate, 5))})</option>
                    <option value={7}>7 Malam (1 Minggu)</option>
                    <option value={14}>14 Malam (2 Minggu)</option>
                  </select>
                </div>
              </div>

              {/* Rangkuman Biaya & Waktu Check-In/Out */}
              <div className="bg-white p-2.5 rounded-xl border border-purple-200/90 text-xs shadow-2xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[9px] text-slate-500 font-bold block uppercase tracking-wider">
                      Total Tagihan • {nights} Malam
                    </span>
                    <strong className="text-xs sm:text-sm font-black text-purple-950">
                      Rp {totalAmount.toLocaleString("id-ID")}
                    </strong>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] text-slate-500 font-bold block uppercase tracking-wider">
                      Sisa di Lokasi
                    </span>
                    <strong className="text-xs sm:text-sm font-black text-amber-700">
                      Rp {remainingAmount.toLocaleString("id-ID")}
                    </strong>
                  </div>
                </div>
                <div className="pt-1 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
                  <span>Check-in 14:00 WIT</span>
                  <span>•</span>
                  <span>Check-out 12:00 WIT</span>
                </div>
              </div>
            </div>

            {/* ================================================
                KOLOM KANAN (7/12): UNIT KAMAR, DATA TAMU & PEMBAYARAN
                ================================================ */}
            <div className="lg:col-span-7 space-y-3">
              {/* ====================================================
                  PILIHAN UNIT KAMAR (DENGAN DISABLED UNTUK KAMAR PENUH)
                  ==================================================== */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="adv-room"
                    className="text-[10px] font-black text-slate-700 uppercase tracking-wider block"
                  >
                    Pilih Unit Kamar yang Dipesan
                  </label>
                  <span className="text-[10px] font-bold text-slate-500">
                    {availableRoomsCount} dari 8 kamar tersedia
                  </span>
                </div>

                {/* Dropdown Kamar dengan Kondisi Disabled Abu-Abu */}
                <select
                  id="adv-room"
                  value={selectedRoomCode}
                  onChange={(e) => {
                    const code = e.target.value;
                    setSelectedRoomCode(code);
                    const room = ROOM_OPTIONS.find((r) => r.code === code);
                    if (room) setDpPaid(Math.round(room.price * nights * 0.5));
                  }}
                  className={`w-full border-2 rounded-xl px-3 py-1.5 text-xs font-bold outline-none cursor-pointer transition ${
                    isSelectedRoomOccupied
                      ? "border-rose-400 bg-rose-50/50 text-rose-800"
                      : "border-slate-200 focus:border-purple-600 bg-slate-50 text-slate-900"
                  }`}
                >
                  {ROOM_OPTIONS.map((r) => {
                    const occupied = isRoomOccupied(r.code);
                    return (
                      <option
                        key={r.code}
                        value={r.code}
                        disabled={occupied}
                        className={
                          occupied
                            ? "text-slate-400 bg-slate-100 font-normal italic"
                            : "text-slate-900 font-bold"
                        }
                      >
                        {occupied
                          ? `[SUDAH DIBOOKING] Kamar ${r.code} (${r.building === "A" ? "Gedung A" : "Gedung B"} • ${r.code.startsWith("A1") || r.code.startsWith("A2") || r.code.startsWith("B1") || r.code.startsWith("B2") ? "AC" : "Kipas"})`
                          : `✓ ${r.name} — Rp ${r.price.toLocaleString("id-ID")}/malam [Tersedia]`}
                      </option>
                    );
                  })}
                </select>

                {/* Grid Visual Pills 8 Kamar untuk Quick Selection & Status */}
                <div className="grid grid-cols-4 gap-1.5 pt-0.5">
                  {ROOM_OPTIONS.map((r) => {
                    const occupied = isRoomOccupied(r.code);
                    const isSelected = selectedRoomCode === r.code;
                    return (
                      <button
                        key={r.code}
                        type="button"
                        disabled={occupied}
                        onClick={() => {
                          setSelectedRoomCode(r.code);
                          setDpPaid(Math.round(r.price * nights * 0.5));
                        }}
                        className={`px-2 py-1 rounded-xl text-[10px] font-black border transition-all text-center flex flex-col items-center justify-center ${
                          occupied
                            ? "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed line-through opacity-60"
                            : isSelected
                              ? "bg-purple-700 text-white border-purple-700 shadow-xs"
                              : "bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100 cursor-pointer"
                        }`}
                        title={
                          occupied
                            ? `Kamar #${r.code} sudah dibooking pada rentang tanggal ini`
                            : `Kamar #${r.code} tersedia untuk dibooking`
                        }
                      >
                        <span>#{r.code}</span>
                        <span className="text-[8px] font-bold">
                          {occupied ? "Penuh" : isSelected ? "Dipilih" : "Bebas"}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Banner Peringatan jika Kamar yang Dipilih Bentrok */}
                {isSelectedRoomOccupied && (
                  <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
                    <div>
                      <strong className="font-black block">Kamar Terpilih Sudah Di-booking</strong>
                      <p className="text-[11px] leading-tight text-rose-700 mt-0.5">
                        Kamar #{selectedRoomCode} sudah memiliki reservasi aktif di tanggal ini.
                        Silakan klik unit kamar bebas (berwarna hijau) di atas.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Data Tamu: Nama & WhatsApp */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label
                    htmlFor="adv-name"
                    className="text-[10px] font-black text-slate-700 uppercase tracking-wider block"
                  >
                    Nama Lengkap Pemesan
                  </label>
                  <div className="flex items-center gap-2 bg-slate-50 border-2 border-slate-200 focus-within:border-purple-600 rounded-xl px-2.5 py-1.5">
                    <User className="w-3.5 h-3.5 text-purple-700 shrink-0" />
                    <input
                      id="adv-name"
                      type="text"
                      required
                      placeholder="Contoh: Pak Hendra Pratama"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      className="w-full bg-transparent text-xs font-bold text-slate-900 outline-none placeholder:text-slate-400"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label
                    htmlFor="adv-phone"
                    className="text-[10px] font-black text-slate-700 uppercase tracking-wider block"
                  >
                    No. WhatsApp Tamu
                  </label>
                  <div className="flex items-center gap-2 bg-slate-50 border-2 border-slate-200 focus-within:border-purple-600 rounded-xl px-2.5 py-1.5">
                    <Phone className="w-3.5 h-3.5 text-purple-700 shrink-0" />
                    <input
                      id="adv-phone"
                      type="tel"
                      required
                      placeholder="Contoh: 081234567890"
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      className="w-full bg-transparent text-xs font-bold text-slate-900 outline-none placeholder:text-slate-400"
                    />
                  </div>
                </div>
              </div>

              {/* Estimasi Jam Tiba / Jam Landing (WIT) - Time Picker Absolut */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="adv-landing-time"
                    className="text-[10px] font-black text-slate-700 uppercase tracking-wider block"
                  >
                    Estimasi Jam Tiba / Landing (Opsional)
                  </label>
                  <span className="text-[9px] text-purple-700 font-bold bg-purple-50 px-2 py-0.5 rounded-md">
                    {landingTime
                      ? `Landing ${landingTime.replace(":", ".")} WIT`
                      : "Belum Ditentukan (Bebas)"}
                  </span>
                </div>

                <div className="flex items-center gap-2 bg-slate-50 border-2 border-slate-200 focus-within:border-purple-600 rounded-xl px-2.5 py-1.5 transition">
                  <Clock className="w-3.5 h-3.5 text-purple-700 shrink-0" />
                  <input
                    id="adv-landing-time"
                    type="time"
                    value={landingTime}
                    onChange={(e) => setLandingTime(e.target.value)}
                    className="bg-transparent text-xs font-black text-slate-900 outline-none cursor-pointer flex-1"
                  />
                  <span className="text-[10px] font-black text-purple-900 bg-purple-100/90 px-2 py-0.5 rounded-md border border-purple-200 shrink-0">
                    WIT
                  </span>
                  {landingTime && (
                    <button
                      type="button"
                      onClick={() => setLandingTime("")}
                      className="text-[10px] font-black text-slate-400 hover:text-rose-600 px-1 transition cursor-pointer"
                      title="Kosongkan jam tiba (opsional)"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* Preset Pilihan Jam Landing Cepat */}
                <div className="flex flex-wrap items-center gap-1 pt-0.5">
                  <span className="text-[9px] text-slate-400 font-bold shrink-0">Preset Cepat:</span>
                  {[
                    { time: "14:30", label: "14.30 Siang" },
                    { time: "18:00", label: "18.00 Sore" },
                    { time: "21:00", label: "21.00 Malam" },
                    { time: "06:00", label: "06.00 Subuh" },
                  ].map((preset) => (
                    <button
                      key={preset.time}
                      type="button"
                      onClick={() => setLandingTime(preset.time)}
                      className={`text-[9px] font-bold px-2 py-0.5 rounded-md border transition-all cursor-pointer ${
                        landingTime === preset.time
                          ? "bg-purple-700 text-white border-purple-700 shadow-2xs"
                          : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                  {landingTime && (
                    <button
                      type="button"
                      onClick={() => setLandingTime("")}
                      className="text-[9px] font-bold px-1.5 py-0.5 rounded-md text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                    >
                      Hapus Jam
                    </button>
                  )}
                </div>
              </div>

              {/* DP & Pembayaran */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="adv-dp"
                    className="text-[10px] font-black text-slate-700 uppercase tracking-wider block"
                  >
                    Nominal DP Ditransfer
                  </label>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setDpPaid(Math.round(totalAmount * 0.5))}
                      className="text-[9px] font-black px-1.5 py-0.5 rounded bg-purple-100 text-purple-800 hover:bg-purple-200 cursor-pointer"
                    >
                      DP 50%
                    </button>
                    <button
                      type="button"
                      onClick={() => setDpPaid(totalAmount)}
                      className="text-[9px] font-black px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 hover:bg-emerald-200 cursor-pointer"
                    >
                      Lunas 100%
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 items-center">
                  <input
                    id="adv-dp"
                    type="number"
                    value={dpPaid}
                    onChange={(e) => setDpPaid(Number(e.target.value))}
                    className="w-full bg-slate-50 border-2 border-slate-200 focus:border-purple-600 rounded-xl px-2.5 py-1.5 text-xs font-black text-purple-800 outline-none"
                  />

                  {/* Pilihan Metode DP */}
                  <div className="grid grid-cols-3 gap-1">
                    {(["transfer", "qris", "cash"] as const).map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setPaymentMethod(m)}
                        className={`py-1.5 rounded-lg text-[10px] font-black uppercase transition-all cursor-pointer flex items-center justify-center gap-1 ${
                          paymentMethod === m
                            ? "bg-purple-700 text-white shadow-2xs"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        {m === "transfer" && <Landmark className="w-3 h-3 shrink-0" />}
                        {m === "qris" && <QrCode className="w-3 h-3 shrink-0" />}
                        {m === "cash" && <Banknote className="w-3 h-3 shrink-0" />}
                        <span>{m === "transfer" ? "Transfer" : m === "qris" ? "QRIS" : "Tunai"}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tombol Aksi (Batal & Simpan Jadwal) Naik Rapi Sejajar */}
                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onClose}
                    className="rounded-xl h-9 px-4 text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                  >
                    Batal
                  </Button>
                  <Button
                    type="submit"
                    disabled={createAdvanceMutation.isPending || isSelectedRoomOccupied || availableRoomsCount === 0}
                    className="rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-black text-xs sm:text-sm h-9 px-5 gap-1.5 shadow-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {createAdvanceMutation.isPending ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Menyimpan ke DB...</span>
                      </>
                    ) : (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Simpan Jadwal Booking WA</span>
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
