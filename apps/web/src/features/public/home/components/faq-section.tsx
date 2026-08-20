import { HelpCircle } from "lucide-react";

export function FaqSection() {
  const faqs = [
    {
      q: "Berapa jarak dari Bandara Pattimura ke Penginapan Annisa?",
      a: "Hanya 750 meter (2–3 menit perjalanan). Anda bisa berjalan santai atau naik kendaraan roda dua/empat dalam waktu kilat.",
    },
    {
      q: "Bagaimana jika saya check-in pagi sekali (misal 08:00 WIT)?",
      a: "Kami memberlakukan aturan check-in fleksibel 24 jam. Jika unit kamar yang Anda tuju telah bersih & siap pakai, Anda bisa langsung masuk tanpa menunggu siang.",
    },
    {
      q: "Bagaimana cara booking dan sistem pembayarannya?",
      a: "Cukup pilih tanggal & kamar, klik kirim WhatsApp. Anda cukup membayar DP 50% via transfer bank/QRIS untuk mengunci kamar. Pelunasan saat tiba di lokasi.",
    },
    {
      q: "Apakah seluruh kamar mandi berada di dalam kamar?",
      a: "Ya, 100% dari 8 unit kamar kami memiliki kamar mandi dalam privat lengkap dengan air bersih, ember/gayung/shower, dan handuk bersih.",
    },
  ];

  return (
    <div>
      <div className="text-left mb-2 sm:mb-3">
        <span className="text-[10px] font-extrabold text-purple-700 tracking-wider uppercase block">
          TANYA JAWAB UMUM
        </span>
        <h2 className="text-xs sm:text-base font-extrabold text-slate-900 leading-tight">
          Informasi Penting Sebelum Menginap
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
        {faqs.map((faq) => (
          <div
            key={faq.q}
            className="p-3 rounded-2xl bg-white/90 backdrop-blur-md border border-purple-200/80 shadow-2xs hover:border-purple-300 transition-all text-left"
          >
            <div className="flex items-start gap-2 mb-1">
              <HelpCircle className="w-3.5 h-3.5 text-purple-700 shrink-0 mt-0.5" />
              <h3 className="font-extrabold text-xs text-slate-900 leading-snug">{faq.q}</h3>
            </div>
            <p className="text-[10px] sm:text-[11px] text-slate-600 leading-relaxed pl-5">
              {faq.a}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
