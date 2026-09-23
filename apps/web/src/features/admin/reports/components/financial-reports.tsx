"use client";

import { FileSpreadsheet, RotateCw } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../../../../components/ui/button";
import { RevenueStatsCards } from "./revenue-stats-cards";
import { type TransactionRecord, TransactionTable } from "./transaction-table";
import { reportsApi } from "@/lib/api/reports.api";
import { useQueryClient } from "@tanstack/react-query";

const RECENT_TRANSACTIONS: TransactionRecord[] = [
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
];

export function FinancialReports() {
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const blob = await reportsApi.exportReservationsCsv();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `laporan-reservasi-annisa-${new Date().toISOString().split("T")[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast.success(
        "File laporan CSV berhasil digenerate dan diunduh! 📊",
      );
    } catch (err) {
      toast.error("Gagal mengekspor laporan CSV.");
    } finally {
      setIsExporting(false);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await queryClient.invalidateQueries();
    toast.success("Laporan omzet & okupansi kamar telah diperbarui!");
    setIsRefreshing(false);
  };


  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Banner & Ekspor Laporan */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 sm:p-5 rounded-3xl border border-slate-200 shadow-2xs">
        <div>
          <span className="bg-purple-100 text-purple-800 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            Laporan Keuangan Owner
          </span>
          <h2 className="text-base sm:text-lg font-black text-slate-900 leading-tight mt-1">
            Rekapitulasi Pendapatan &amp; Okupansi Kamar
          </h2>
          <p className="text-xs text-slate-500">
            Laporan pendapatan sewa 8 kamar transit dan penjualan oleh-oleh khas
            Maluku.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleRefresh}
            title="Perbarui Data Laporan"
            className="p-2 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-purple-50 text-slate-600 hover:text-purple-700 transition cursor-pointer shadow-2xs flex items-center gap-1.5"
          >
            <RotateCw
              className={`w-4 h-4 ${isRefreshing ? "animate-spin text-purple-700" : ""}`}
            />
            <span className="text-xs font-black hidden sm:inline">Refresh</span>
          </button>

          <Button
            type="button"
            onClick={handleExport}
            className="rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm h-11 px-5 gap-2 shadow-md cursor-pointer"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Ekspor Laporan (Excel / CSV)</span>
          </Button>
        </div>
      </div>

      {/* 4 Kartu Statistik Keuangan */}
      <RevenueStatsCards />

      {/* Tabel Riwayat Transaksi */}
      <TransactionTable transactions={RECENT_TRANSACTIONS} />
    </div>
  );
}
