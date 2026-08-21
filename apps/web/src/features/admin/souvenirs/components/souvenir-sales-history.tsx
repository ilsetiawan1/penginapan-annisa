"use client";

export interface SaleRecord {
  id: string;
  name: string;
  qty: number;
  total: number;
  time: string;
}

interface SouvenirSalesHistoryProps {
  sales: SaleRecord[];
}

export function SouvenirSalesHistory({ sales }: SouvenirSalesHistoryProps) {
  if (sales.length === 0) return null;

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-4 sm:p-5 shadow-2xs space-y-3">
      <h3 className="font-black text-xs uppercase tracking-wider text-slate-900">
        Riwayat Penjualan Shift Ini
      </h3>
      <div className="divide-y divide-slate-100 text-xs">
        {sales.map((sale) => (
          <div key={sale.id} className="py-2.5 flex items-center justify-between">
            <div>
              <strong className="text-slate-900 font-bold">{sale.name}</strong>
              <span className="text-slate-400 text-[11px] ml-2">({sale.time} WIT)</span>
            </div>
            <span className="font-black text-purple-700">
              + Rp {sale.total.toLocaleString("id-ID")}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
