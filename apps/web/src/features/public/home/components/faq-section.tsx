"use client";

import { ChevronDown, HelpCircle } from "lucide-react";
import { useState } from "react";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: "Berapa jarak dari Bandara Pattimura ke Penginapan Annisa?",
      a: "Hanya 750 meter (sekitar 2–3 menit perjalanan). Anda bisa jalan kaki santai atau naik kendaraan dengan sangat cepat tanpa khawatir macet.",
    },
    {
      q: "Bagaimana jika saya check-in pagi hari (misal jam 07:00 WIT)?",
      a: "Penginapan kami buka melayani tamu dari jam 06:00 pagi hingga 22:00 malam WIT. Jika Anda tiba dengan pesawat pagi, Anda bisa langsung masuk istirahat jika kamar sudah selesai dibersihkan.",
    },
    {
      q: "Bagaimana cara pesan kamar dan cara pembayarannya?",
      a: "Cukup pilih tanggal dan tipe kamar pada formulir di atas, lalu klik tombol Pesan via WhatsApp. Untuk mengunci kamar, cukup bayar DP 50% via transfer bank atau QRIS. Sisanya dibayar saat tiba di lokasi.",
    },
    {
      q: "Apakah seluruh kamar mandi berada di dalam kamar?",
      a: "Ya, seluruh 8 kamar kami memiliki kamar mandi pribadi di dalam kamar, lengkap dengan air bersih, ember/gayung/shower, dan handuk bersih.",
    },
  ];

  const toggleFaq = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <div>
      {/* Centered Section Header */}
      <div className="text-center max-w-xl mx-auto mb-5 sm:mb-6">
        <span className="text-[10px] font-extrabold uppercase tracking-wider text-purple-700 block mb-1">
          TANYA JAWAB
        </span>
        <h2 className="text-sm sm:text-lg font-bold text-slate-900 leading-tight">
          Pertanyaan Seputar Transit
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Informasi penting mengenai jam check-in, lokasi, dan kenyamanan kamar.
        </p>
      </div>

      {/* Accordion List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={faq.q}
              className={`rounded-2xl bg-white/95 border transition-all overflow-hidden text-left ${
                isOpen
                  ? "border-purple-300 shadow-sm"
                  : "border-purple-100/90 hover:border-purple-200 shadow-2xs"
              }`}
            >
              {/* Question Trigger Button */}
              <button
                type="button"
                onClick={() => toggleFaq(idx)}
                className="w-full p-3 sm:p-3.5 flex items-center justify-between gap-2.5 text-left cursor-pointer transition-colors"
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                      isOpen ? "bg-purple-100 text-purple-700" : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                  </div>
                  <h3
                    className={`font-extrabold text-xs leading-snug transition-colors ${
                      isOpen ? "text-purple-900" : "text-slate-900"
                    }`}
                  >
                    {faq.q}
                  </h3>
                </div>

                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                    isOpen ? "rotate-180 text-purple-700 bg-purple-50" : "text-slate-400"
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {/* Collapsible Answer */}
              {isOpen && (
                <div className="px-3 pb-3 sm:px-3.5 sm:pb-3.5 pt-0 pl-11 animate-in fade-in slide-in-from-top-1 duration-200">
                  <p className="text-[10px] sm:text-[11px] text-slate-600 leading-relaxed border-t border-purple-50 pt-2">
                    {faq.a}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
