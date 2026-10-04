"use client";

export interface TransactionRecord {
  id: string;
  date: string;
  room: string;
  guest: string;
  nights: number;
  amount: number;
  status: "DP 50%" | "Lunas";
  type?: string;
}

interface TransactionTableProps {
  transactions: TransactionRecord[];
}

export function TransactionTable({ transactions }: TransactionTableProps) {
  return (
    <section className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 space-y-4">
      <div>
        <h3 className="text-sm font-semibold text-slate-900">Riwayat Transaksi Reservasi</h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Daftar reservasi terverifikasi pada periode bulan terpilih
        </p>
      </div>

      <div className="overflow-x-auto -mx-4 sm:mx-0">
        <table className="w-full text-left text-xs min-w-[640px]">
          <thead>
            <tr className="border-b border-slate-200/80 text-slate-500 font-semibold uppercase text-[10px] tracking-wider">
              <th className="pb-3 px-4 sm:px-3">No. Transaksi</th>
              <th className="pb-3 px-3">Jenis</th>
              <th className="pb-3 px-3">Tanggal</th>
              <th className="pb-3 px-3">Unit Kamar</th>
              <th className="pb-3 px-3">Nama Tamu</th>
              <th className="pb-3 px-3">Durasi</th>
              <th className="pb-3 px-3 text-right">Total Nilai</th>
              <th className="pb-3 px-4 sm:px-3 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
            {transactions.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-12 text-center text-slate-400 font-medium text-xs">
                  Belum ada riwayat transaksi pada periode ini. Data akan otomatis tercatat saat ada
                  tamu yang check-in atau reservasi terkonfirmasi.
                </td>
              </tr>
            ) : (
              transactions.map((trx) => (
                <tr key={trx.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4 sm:px-3 font-semibold text-slate-900 tabular-nums">
                    {trx.id}
                  </td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200/80 text-[10px] font-semibold">
                      {trx.type ?? "Kamar"}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-slate-500 tabular-nums">{trx.date}</td>
                  <td className="py-3 px-3 font-medium text-slate-800">{trx.room}</td>
                  <td className="py-3 px-3 font-semibold text-slate-900">{trx.guest}</td>
                  <td className="py-3 px-3 tabular-nums">{trx.nights} Malam</td>
                  <td className="py-3 px-3 text-right font-semibold text-slate-900 tabular-nums">
                    Rp {trx.amount.toLocaleString("id-ID")}
                  </td>
                  <td className="py-3 px-4 sm:px-3 text-center">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-md text-[10px] font-semibold border tabular-nums ${
                        trx.status === "Lunas"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200/70"
                          : "bg-amber-50 text-amber-700 border-amber-200/70"
                      }`}
                    >
                      {trx.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
