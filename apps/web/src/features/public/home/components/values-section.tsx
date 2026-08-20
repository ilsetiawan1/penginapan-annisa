import { Clock, MapPin, ShieldCheck, Sparkles } from "lucide-react";

export function ValuesSection() {
  const values = [
    {
      icon: MapPin,
      badge: "750m Bandara",
      title: "Bebas Risiko Terlambat",
      desc: "Hanya 2–3 menit ke terminal keberangkatan Bandara Pattimura. Anda bisa istirahat tenang tanpa takut terjebak macet.",
    },
    {
      icon: Clock,
      badge: "07:00–21:00 WIT",
      title: "Check-In Fleksibel",
      desc: "Mendarat dengan pesawat pagi (08:00–09:00 WIT)? Bisa langsung masuk istirahat jika kamar telah siap dan bersih.",
    },
    {
      icon: ShieldCheck,
      badge: "Privasi Terjaga",
      title: "100% Kamar Mandi Dalam",
      desc: "Seluruh 8 kamar kami dilengkapi kamar mandi privat di dalam, kasur besar muat 2–3 orang, TV layar datar, dan WiFi kencang.",
    },
    {
      icon: Sparkles,
      badge: "Cukup DP 50%",
      title: "Pemesanan Aman & Mudah",
      desc: "Kunci kamar cukup transfer DP 50% via WhatsApp. Pelunasan sisa tagihan fleksibel saat tiba di penginapan.",
    },
  ];

  return (
    <div className="mb-4 sm:mb-6">
      {/* Section Header */}
      <div className="text-left mb-2 sm:mb-3">
        <span className="text-[10px] font-extrabold text-purple-700 tracking-wider uppercase block">
          KEUNGGULAN
        </span>
        <h2 className="text-xs sm:text-base text-slate-900 leading-tight">
          Kenapa Memilih Penginapan Annisa?
        </h2>
      </div>

      {/* 4 Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
        {values.map((v) => {
          const IconComponent = v.icon;
          return (
            <div
              key={v.title}
              className="p-3 sm:p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-purple-200/80 shadow-2xs hover:border-purple-300 transition-all text-left flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-purple-100/90 text-purple-700 flex items-center justify-center shrink-0">
                    <IconComponent className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                  <span className="text-[9px] font-bold text-purple-800 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-100">
                    {v.badge}
                  </span>
                </div>
                <h3 className="font-extrabold text-xs sm:text-sm text-slate-900 leading-tight mb-1">
                  {v.title}
                </h3>
                <p className="text-[10px] sm:text-xs text-slate-600 leading-relaxed line-clamp-2 sm:line-clamp-3">
                  {v.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
