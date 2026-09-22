import { Lightbulb } from "lucide-react";

export function SouvenirGuideCard() {
  return (
    <section className="max-w-5xl mx-auto px-4 pt-10 sm:pt-14 pb-8">
      <div className="rounded-2xl sm:rounded-3xl bg-white border border-purple-100 shadow-sm p-5 sm:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
          {/* Left Column: Jaminan Keaslian */}
          <div className="lg:col-span-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
                <Lightbulb className="w-4 h-4" />
              </span>
              <h2 className="text-base sm:text-lg font-extrabold text-slate-950 leading-tight">
                Jaminan Produk Otentik Khas Maluku
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Semua produk etalase kami dikurasi langsung dari pengrajin dan
              produsen terpercaya di Maluku. Mulai dari{" "}
              <strong className="text-slate-900 font-bold">
                Minyak Kayu Putih Namlea asli Pulau Buru
              </strong>{" "}
              tanpa campuran, camilan renyah{" "}
              <strong className="text-slate-900 font-bold">
                Bagea &amp; Roti Kenari
              </strong>
              , hingga racikan kopi rempah khas pesisir Ambon.
            </p>
          </div>

          {/* Right Column: Kemudahan Belanja di Penginapan */}
          <div className="lg:col-span-6 lg:border-l lg:border-purple-100 lg:pl-8">
            <span className="text-[10px] sm:text-xs uppercase font-bold tracking-widest text-purple-800 block mb-3">
              KEMUDAHAN BELANJA DI RESEPSIONIS
            </span>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-purple-700 font-bold mt-0.5">✓</span>
                <span>
                  <strong className="text-slate-900">
                    Praktis &amp; Hemat Waktu:
                  </strong>{" "}
                  Tersedia langsung di meja resepsionis tanpa perlu keliling
                  pasar kota.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-700 font-bold mt-0.5">✓</span>
                <span>
                  <strong className="text-slate-900">
                    Kemasan Aman Bagasi:
                  </strong>{" "}
                  Botol dan kotak makanan dikemas rapi &amp; aman untuk
                  penerbangan.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-700 font-bold mt-0.5">✓</span>
                <span>
                  <strong className="text-slate-900">Pesan Awal via WA:</strong>{" "}
                  Bisa titip stok sebelum check-out agar siap saat Anda
                  berangkat ke bandara.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
