"use client";

interface RevenueStatsCardsProps {
  totalOmzet?: number;
  roomRevenue?: number;
  souvenirOmzet?: number;
  souvenirItems?: number;
  occupancyRate?: number;
  totalGuests?: number;
  monthLabel?: string;
}

export function RevenueStatsCards({
  totalOmzet = 0,
  roomRevenue = 0,
  souvenirOmzet = 0,
  souvenirItems = 0,
  occupancyRate = 0,
  totalGuests = 0,
  monthLabel = "Bulan Ini",
}: RevenueStatsCardsProps) {
  const avgRoomsPerDay = Math.round((occupancyRate / 100) * 8 * 10) / 10;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      {/* 1. Total Pendapatan (Kamar + Souvenir) */}
      <div className="bg-white border border-slate-200/80 p-4 sm:p-5 rounded-2xl flex flex-col justify-between">
        <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
          Total Pendapatan
        </span>
        <p className="text-2xl sm:text-3xl font-bold text-slate-900 tabular-nums mt-1 tracking-tight">
          Rp {totalOmzet.toLocaleString("id-ID")}
        </p>
        <span className="text-xs text-slate-500 font-medium mt-2">
          Kamar &amp; Kasir Oleh-Oleh · {monthLabel}
        </span>
      </div>

      {/* 2. Pendapatan Kamar */}
      <div className="bg-white border border-slate-200/80 p-4 sm:p-5 rounded-2xl flex flex-col justify-between">
        <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
          Pendapatan Kamar
        </span>
        <p className="text-2xl sm:text-3xl font-bold text-slate-900 tabular-nums mt-1 tracking-tight">
          Rp {roomRevenue.toLocaleString("id-ID")}
        </p>
        <span className="text-xs text-slate-500 font-medium mt-2 tabular-nums">
          {totalGuests} Tamu Menginap
        </span>
      </div>

      {/* 3. Penjualan Oleh-Oleh */}
      <div className="bg-white border border-slate-200/80 p-4 sm:p-5 rounded-2xl flex flex-col justify-between">
        <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
          Penjualan Oleh-Oleh
        </span>
        <p className="text-2xl sm:text-3xl font-bold text-slate-900 tabular-nums mt-1 tracking-tight">
          Rp {souvenirOmzet.toLocaleString("id-ID")}
        </p>
        <span className="text-xs text-slate-500 font-medium mt-2 tabular-nums">
          {souvenirItems} Produk Terjual
        </span>
      </div>

      {/* 4. Tingkat Okupansi Kamar */}
      <div className="bg-white border border-slate-200/80 p-4 sm:p-5 rounded-2xl flex flex-col justify-between">
        <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
          Tingkat Okupansi
        </span>
        <p className="text-2xl sm:text-3xl font-bold text-slate-900 tabular-nums mt-1 tracking-tight">
          {occupancyRate}%
        </p>
        <span className="text-xs text-slate-500 font-medium mt-2 tabular-nums">
          Rata-rata {avgRoomsPerDay} dari 8 kamar/hari
        </span>
      </div>
    </div>
  );
}
