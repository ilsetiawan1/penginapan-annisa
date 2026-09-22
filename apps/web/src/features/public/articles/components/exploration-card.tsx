import { Lightbulb } from "lucide-react";

export function ExplorationCard() {
  return (
    <section className="max-w-5xl mx-auto px-4 pt-10 sm:pt-14 pb-8">
      <div className="rounded-2xl sm:rounded-3xl bg-white border border-purple-100 shadow-sm p-5 sm:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
          {/* Left Column: Eksplorasi Seputar Kota Ambon & Pantai Liang */}
          <div className="lg:col-span-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
                <Lightbulb className="w-4 h-4" />
              </span>
              <h2 className="text-base sm:text-lg font-extrabold text-slate-950 leading-tight">
                Eksplorasi Seputar Kota Ambon &amp; Pantai Liang
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Ambon Manise selalu menawarkan pengalaman liburan dan transit yang
              tak terlupakan. Mulai dari keindahan wisata{" "}
              <strong className="text-slate-900 font-bold">
                pantai pasir putih Liang
              </strong>
              , pesona tebing karang{" "}
              <strong className="text-slate-900 font-bold">Pintu Kota</strong>,
              hingga aneka{" "}
              <strong className="text-slate-900 font-bold">kuliner khas</strong>{" "}
              seperti Rujak Natsepa dan ikan bakar segar. Dapatkan semua
              informasi menarik dan rekomendasi liburan terbaiknya hanya di Blog
              Penginapan Annisa.
            </p>
          </div>

          {/* Right Column: Panduan Liburan & Transit */}
          <div className="lg:col-span-6 lg:border-l lg:border-purple-100 lg:pl-8">
            <span className="text-[10px] sm:text-xs uppercase font-bold tracking-widest text-purple-800 block mb-3">
              PANDUAN LIBURAN &amp; TRANSIT
            </span>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-purple-700 font-bold mt-0.5">✓</span>
                <span>
                  Pilih penginapan transit{" "}
                  <strong className="text-slate-900">
                    750m dari Bandara Pattimura
                  </strong>{" "}
                  untuk kemudahan mobilitas tanpa risiko macet.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-700 font-bold mt-0.5">✓</span>
                <span>
                  Cicipi{" "}
                  <strong className="text-slate-900">
                    Rujak Natsepa &amp; Ikan Bakar
                  </strong>{" "}
                  khas pesisir pantai di sore hari saat matahari terbenam.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-700 font-bold mt-0.5">✓</span>
                <span>
                  Sediakan waktu 45–60 menit dari penginapan menuju{" "}
                  <strong className="text-slate-900">Pantai Liang</strong> untuk
                  sewa perahu &amp; snorkeling.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
