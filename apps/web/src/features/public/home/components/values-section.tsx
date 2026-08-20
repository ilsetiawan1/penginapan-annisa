import { Clock, MapPin, ShieldCheck, Sparkles, Tv, Wifi } from "lucide-react";

export function ValuesSection() {
  const values = [
    {
      icon: MapPin,
      title: "Hanya 750m dari Bandara",
      desc: "2–3 menit perjalanan kaki / mobil dari Bandara Pattimura Ambon. Bebas macet & bebas stres ketinggalan pesawat.",
    },
    {
      icon: Clock,
      title: "Check-in Fleksibel 24 Jam",
      desc: "Mendarat pagi (08:00–09:00 WIT)? Bisa langsung masuk istirahat jika unit telah siap tanpa nunggu siang.",
    },
    {
      icon: ShieldCheck,
      title: "100% Kamar Mandi Dalam",
      desc: "Seluruh 8 unit kamar dilengkapi toilet privat, kasur besar muat 2–3 orang, TV layar datar, dan handuk bersih.",
    },
    {
      icon: Sparkles,
      title: "Booking Aman DP 50%",
      desc: "Kunci kamar cukup transfer DP 50% via WhatsApp. Pelunasan sisa tagihan fleksibel saat tiba di penginapan.",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 mb-4 sm:mb-6">
      {values.map((v) => {
        const IconComponent = v.icon;
        return (
          <div
            key={v.title}
            className="p-3 sm:p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-purple-200/80 shadow-2xs hover:border-purple-300 transition-all text-left"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-purple-100/90 text-purple-700 flex items-center justify-center mb-2 shrink-0">
              <IconComponent className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
            <h3 className="font-extrabold text-xs sm:text-sm text-slate-900 leading-tight mb-1">
              {v.title}
            </h3>
            <p className="text-[10px] sm:text-xs text-slate-600 leading-relaxed line-clamp-2 sm:line-clamp-3">
              {v.desc}
            </p>
          </div>
        );
      })}
    </div>
  );
}
