"use client";

import type { SaleRecord } from "../../../hooks/use-pos-register";

const METHOD_LABEL: Record<SaleRecord["paymentMethod"], string> = {
  cash: "Tunai",
  transfer: "Transfer",
  qris: "QRIS",
};

export function PosSalesHistory({ sales }: { sales: SaleRecord[] }) {
  if (sales.length === 0) return null;

  return (
    <section className="bg-white rounded-2xl border border-slate-200/80 px-4 sm:px-5 py-4">
      <h3 className="text-sm font-semibold text-slate-900">Transaksi Shift Ini</h3>
      <ul className="mt-2 divide-y divide-slate-100">
        {sales.map((sale) => (
          <li key={sale.receiptNumber} className="py-2.5 flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-xs font-semibold text-slate-900 truncate">{sale.receiptNumber}</p>
              <p className="text-[11px] text-slate-500 tabular-nums">
                {sale.time} WIT · {sale.itemCount} item · {METHOD_LABEL[sale.paymentMethod]}
              </p>
            </div>
            <span className="text-xs font-semibold text-slate-900 tabular-nums shrink-0">
              Rp {sale.total.toLocaleString("id-ID")}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
