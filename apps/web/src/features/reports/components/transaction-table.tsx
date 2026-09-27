"use client";

export interface TransactionRecord {
  id: string;
  date: string;
  room: string;
  guest: string;
  nights: number;
  amount: number;
  status: "DP 50%" | "Lunas";
}

interface TransactionTableProps {
  transactions: TransactionRecord[];
}

export function TransactionTable({ transactions }: TransactionTableProps) {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-4 sm:p-6 shadow-2xs space-y-4">
      <h3 className="font-black text-xs sm:text-sm text-slate-900 uppercase tracking-wider">
        Riwayat Transaksi Reservasi Terakhir
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 text-slate-400 font-extrabold uppercase text-[10px]">
              <th className="pb-3">No. Transaksi</th>
              <th className="pb-3">Tanggal</th>
              <th className="pb-3">Kamar</th>
              <th className="pb-3">Nama Tamu</th>
              <th className="pb-3">Durasi</th>
              <th className="pb-3">Total Nilai</th>
              <th className="pb-3">Status Pembayaran</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
            {transactions.map((trx) => (
              <tr key={trx.id} className="hover:bg-purple-50/40 transition">
                <td className="py-3 font-bold text-slate-900">{trx.id}</td>
                <td className="py-3 text-slate-500">{trx.date}</td>
                <td className="py-3 font-bold text-purple-700">{trx.room}</td>
                <td className="py-3 font-bold text-slate-900">{trx.guest}</td>
                <td className="py-3">{trx.nights} Malam</td>
                <td className="py-3 font-black text-slate-900">
                  Rp {trx.amount.toLocaleString("id-ID")}
                </td>
                <td className="py-3">
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-black ${
                      trx.status === "Lunas"
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-amber-100 text-amber-900"
                    }`}
                  >
                    {trx.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
