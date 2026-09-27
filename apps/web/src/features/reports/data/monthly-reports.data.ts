import type { TransactionRecord } from "../components/transaction-table";

export interface MonthReportData {
  id: string;
  label: string;
  totalOmzet: number;
  occupancyRate: number;
  totalGuests: number;
  souvenirOmzet: number;
  souvenirItems: number;
  transactions: TransactionRecord[];
}

export const MONTHLY_REPORTS: Record<string, MonthReportData> = {
  "2026-08": {
    id: "2026-08",
    label: "Agustus 2026",
    totalOmzet: 18425000,
    occupancyRate: 78.5,
    totalGuests: 68,
    souvenirOmzet: 2850000,
    souvenirItems: 54,
    transactions: [
      {
        id: "TRX-001",
        date: "21 Agu 2026",
        room: "#A2 (Tipe AC)",
        guest: "Budi Santoso",
        nights: 1,
        amount: 275000,
        status: "DP 50%",
      },
      {
        id: "TRX-002",
        date: "20 Agu 2026",
        room: "#B3 (Tipe Kipas)",
        guest: "Siti Rahma",
        nights: 2,
        amount: 400000,
        status: "DP 50%",
      },
      {
        id: "TRX-003",
        date: "20 Agu 2026",
        room: "#A1 (Tipe AC)",
        guest: "Hendro Wijaya",
        nights: 1,
        amount: 275000,
        status: "Lunas",
      },
      {
        id: "TRX-004",
        date: "19 Agu 2026",
        room: "#B2 (Tipe AC)",
        guest: "Mega Pratama",
        nights: 1,
        amount: 275000,
        status: "Lunas",
      },
      {
        id: "TRX-005",
        date: "19 Agu 2026",
        room: "#A4 (Tipe Kipas)",
        guest: "Fajar Nugraha",
        nights: 1,
        amount: 200000,
        status: "Lunas",
      },
    ],
  },
  "2026-09": {
    id: "2026-09",
    label: "September 2026",
    totalOmzet: 21650000,
    occupancyRate: 84.2,
    totalGuests: 74,
    souvenirOmzet: 3200000,
    souvenirItems: 62,
    transactions: [
      {
        id: "TRX-006",
        date: "26 Sep 2026",
        room: "#B1 (Tipe AC)",
        guest: "Hendra Pratama",
        nights: 1,
        amount: 275000,
        status: "DP 50%",
      },
      {
        id: "TRX-007",
        date: "25 Sep 2026",
        room: "#A3 (Tipe Kipas)",
        guest: "Dewi Lestari",
        nights: 2,
        amount: 400000,
        status: "Lunas",
      },
      {
        id: "TRX-008",
        date: "24 Sep 2026",
        room: "#A2 (Tipe AC)",
        guest: "Ahmad Dahlan",
        nights: 3,
        amount: 825000,
        status: "Lunas",
      },
      {
        id: "TRX-009",
        date: "22 Sep 2026",
        room: "#B4 (Tipe Kipas)",
        guest: "Rudi Hartono",
        nights: 1,
        amount: 200000,
        status: "Lunas",
      },
      {
        id: "TRX-010",
        date: "20 Sep 2026",
        room: "#A1 (Tipe AC)",
        guest: "Maya Safitri",
        nights: 2,
        amount: 550000,
        status: "Lunas",
      },
    ],
  },
  "2026-07": {
    id: "2026-07",
    label: "Juli 2026",
    totalOmzet: 16200000,
    occupancyRate: 71.0,
    totalGuests: 59,
    souvenirOmzet: 2100000,
    souvenirItems: 40,
    transactions: [
      {
        id: "TRX-011",
        date: "28 Jul 2026",
        room: "#A1 (Tipe AC)",
        guest: "Wahyu Hidayat",
        nights: 1,
        amount: 275000,
        status: "Lunas",
      },
      {
        id: "TRX-012",
        date: "25 Jul 2026",
        room: "#B2 (Tipe AC)",
        guest: "Rina Marlina",
        nights: 2,
        amount: 550000,
        status: "Lunas",
      },
      {
        id: "TRX-013",
        date: "20 Jul 2026",
        room: "#A3 (Tipe Kipas)",
        guest: "Irfan Hakim",
        nights: 1,
        amount: 200000,
        status: "Lunas",
      },
      {
        id: "TRX-014",
        date: "15 Jul 2026",
        room: "#B3 (Tipe Kipas)",
        guest: "Surya Kencana",
        nights: 2,
        amount: 400000,
        status: "DP 50%",
      },
    ],
  },
};
