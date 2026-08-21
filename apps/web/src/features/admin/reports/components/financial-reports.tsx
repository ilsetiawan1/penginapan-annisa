"use client";

import { Check, FileSpreadsheet } from "lucide-react";
import { useState } from "react";
import { Button } from "../../../../components/ui/button";
import { RevenueStatsCards } from "./revenue-stats-cards";
import { type TransactionRecord, TransactionTable } from "./transaction-table";

const RECENT_TRANSACTIONS: TransactionRecord[] = [
  {
    id: "TRX-001",
    date: "21 Agu 2026",
    room: "#102 (AC)",
    guest: "Budi Santoso",
    nights: 1,
    amount: 275000,
    status: "DP 50%",
  },
  {
    id: "TRX-002",
    date: "20 Agu 2026",
    room: "#203 (Kipas)",
    guest: "Siti Rahma",
    nights: 2,
    amount: 400000,
    status: "DP 50%",
  },
  {
    id: "TRX-003",
    date: "20 Agu 2026",
    room: "#101 (AC)",
    guest: "Hendro Wijaya",
    nights: 1,
    amount: 275000,
    status: "Lunas",
  },
  {
    id: "TRX-004",
    date: "19 Agu 2026",
    room: "#104 (AC)",
    guest: "Mega Pratama",
    nights: 1,
    amount: 275000,
    status: "Lunas",
  },
  {
    id: "TRX-005",
    date: "19 Agu 2026",
    room: "#201 (Kipas)",
    guest: "Fajar Nugraha",
    nights: 1,
    amount: 200000,
    status: "Lunas",
  },
];

export function FinancialReports() {
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);

  const handleExport = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Top Banner & Export */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 sm:p-5 rounded-3xl border border-slate-200 shadow-2xs">
        <div>
          <span className="bg-purple-100 text-purple-800 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            Owner Financial Analytics
          </span>
          <h2 className="text-base sm:text-lg font-black text-slate-900 leading-tight mt-1">
            Rekapitulasi Omzet &amp; Okupansi Kamar
          </h2>
          <p className="text-xs text-slate-500">
            Laporan pendapatan sewa 8 kamar transit dan penjualan oleh-oleh khas Maluku.
          </p>
        </div>

        <Button
          type="button"
          onClick={handleExport}
          className="rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm h-11 px-5 gap-2 shadow-md cursor-pointer"
        >
          <FileSpreadsheet className="w-4 h-4" />
          <span>Ekspor Laporan (Excel/CSV)</span>
        </Button>
      </div>

      {downloadSuccess && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 p-4 rounded-2xl flex items-center gap-2.5 text-xs font-bold animate-in fade-in">
          <Check className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>File laporan omzet bulan ini berhasil digenerate dan siap diunduh!</span>
        </div>
      )}

      {/* 4 Financial Stat Cards Sub-Component */}
      <RevenueStatsCards />

      {/* Transactions Table Sub-Component */}
      <TransactionTable transactions={RECENT_TRANSACTIONS} />
    </div>
  );
}
