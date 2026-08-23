import { Clock, MapPin, ShieldCheck, Sparkles } from "lucide-react";

export function ValuesSection() {
  const values = [
    {
      icon: MapPin,
      badge: "750m Bandara",
      title: "Bebas Risiko Terlambat",
      desc: "Hanya 2–3 menit ke terminal Bandara Pattimura, bebas macet.",
    },
    {
      icon: Clock,
      badge: "06:00–22:00 WIT",
      title: "Check-In Fleksibel",
      desc: "Mendarat pagi bisa langsung istirahat jika unit telah siap.",
    },
    {
      icon: ShieldCheck,
      badge: "100% Privat",
      title: "Kamar Mandi Dalam",
      desc: "Setiap kamar dilengkapi toilet privat, kasur besar, TV, & WiFi.",
    },
    {
      icon: Sparkles,
      badge: "DP 50%",
      title: "Pemesanan Aman via WA",
      desc: "Kunci kamar cukup transfer DP 50%, pelunasan saat tiba di lokasi.",
    },
  ];

  return (
    <div className="mb-6 sm:mb-8 bg-white/70 backdrop-blur-md rounded-3xl p-4 sm:p-5 border border-purple-100/90 shadow-2xs">
      {/* Section Header */}
      <div className="flex items-center justify-between gap-2 mb-3.5 pb-2.5 border-b border-purple-100/80">
        <div className="text-left">
          <span className="text-[10px] font-extrabold text-purple-700 tracking-wider uppercase block">
            KEUNGGULAN
          </span>
          <h2 className="text-sm sm:text-lg font-serif font-black text-slate-900 leading-tight">
            Kenapa Memilih Penginapan Annisa?
          </h2>
        </div>
        <span className="text-[10px] bg-purple-100 text-purple-800 font-bold px-2.5 py-0.5 rounded-full hidden sm:inline-block">
          Standar Layanan Transit Resmi
        </span>
      </div>

      {/* 4 Minimalist Feature Columns */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 divide-y sm:divide-y-0 sm:divide-x divide-purple-100/70 text-left">
        {values.map((v, idx) => {
          const IconComponent = v.icon;
          return (
            <div
              key={v.title}
              className={`flex items-start gap-2.5 sm:gap-3 ${
                idx > 0 ? "pt-2.5 sm:pt-0 sm:pl-3 lg:pl-4" : ""
              }`}
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0 shadow-2xs">
                <IconComponent className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
                  <h3 className="font-extrabold text-xs sm:text-sm text-slate-900 leading-tight">
                    {v.title}
                  </h3>
                </div>
                <p className="text-[10px] sm:text-[11px] text-slate-600 leading-snug line-clamp-2">
                  {v.desc}
                </p>
                <span className="inline-block mt-1 text-[9px] font-bold text-purple-700 bg-purple-50 px-1.5 py-0.2 rounded border border-purple-100/80">
                  {v.badge}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
