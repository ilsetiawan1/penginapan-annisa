// ==========================================
// INTERFACES & CONSTANTS FOR ADVANCE BOOKING
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

export interface RoomOption {
  code: string;
  building: string;
  name: string;
  price: number;
}

export const ROOM_OPTIONS: RoomOption[] = [
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

export const CALENDAR_DAYS_HEADER = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

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
