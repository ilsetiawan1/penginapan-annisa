import { ShieldCheck } from "lucide-react";

export function RoomGuideCard() {
  return (
    <section className="max-w-5xl mx-auto px-4 pt-10 sm:pt-14 pb-8">
      <div className="rounded-2xl sm:rounded-3xl bg-white border border-purple-100 shadow-sm p-5 sm:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
          {/* Left Column: Standar Fasilitas */}
          <div className="lg:col-span-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </span>
              <h2 className="text-base sm:text-lg font-extrabold text-slate-950 leading-tight">
                Standar Kenyamanan Penginapan Annisa
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Seluruh 8 unit kamar kami dirancang khusus untuk kenyamanan istirahat transit Anda. Dilengkapi <strong className="text-slate-900 font-bold">1 kasur besar (muat 2–3 orang)</strong>, <strong className="text-slate-900 font-bold">100% kamar mandi dalam pribadi</strong>, TV layar datar, WiFi kencang, handuk bersih, dan air mineral. Pembedanya hanya pada pendingin ruangan (Tipe AC &amp; Tipe Kipas).
            </p>
          </div>

          {/* Right Column: Panduan Booking & Check-In */}
          <div className="lg:col-span-6 lg:border-l lg:border-purple-100 lg:pl-8">
            <span className="text-[10px] sm:text-xs uppercase font-bold tracking-widest text-purple-800 block mb-3">
              PANDUAN BOOKING &amp; CHECK-IN
            </span>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-purple-700 font-bold mt-0.5">✓</span>
                <span>
                  <strong className="text-slate-900">Jarak Kilat 750m</strong> dari pintu gerbang terminal Bandara Pattimura (bebas macet).
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-700 font-bold mt-0.5">✓</span>
                <span>
                  <strong className="text-slate-900">Check-In Fleksibel (06:00 – 22:00 WIT)</strong>, bisa langsung masuk istirahat jika kamar telah selesai dibersihkan.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-700 font-bold mt-0.5">✓</span>
                <span>
                  Kunci jadwal kamar dengan <strong className="text-slate-900">Transfer DP 50% via WhatsApp</strong>, pelunasan saat tiba di lokasi.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
