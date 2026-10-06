"use client";

import { ChevronDown, HelpCircle } from "lucide-react";
import { useState } from "react";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // Buka default pertanyaan pertama

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
      a: "Ya, setiap kamar memiliki kamar mandi pribadi di dalam kamar.",
    },
  ];

  const toggleFaq = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <div className="max-w-3xl mx-auto pt-10 sm:pt-16">
      {/* Centered Section Header */}
      <div className="text-center max-w-xl mx-auto mb-6 sm:mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f4f2f4] text-[#3c315b] border border-[#e9e8ea] text-[11px] font-medium tracking-wide mb-2.5">
          <span>TANYA JAWAB</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-normal text-[#1c1c1c] tracking-[-0.025em] leading-tight">
          Pertanyaan Seputar Transit
        </h2>
        <p className="text-xs sm:text-sm text-[#86848d] mt-2 max-w-md mx-auto leading-relaxed font-normal">
          Informasi penting mengenai jam check-in, lokasi, dan kenyamanan kamar.
        </p>
      </div>

      {/* Accordion List (Flex Column 4 Rows Stack) */}
      <div className="flex flex-col gap-2.5 sm:gap-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={faq.q}
              className={`rounded-2xl transition-all overflow-hidden text-left ${
                isOpen
                  ? "border border-[#ded5f2] shadow-[0px_4px_20px_rgba(226,223,254,0.5)] ring-1 ring-[#ede8f8] bg-white"
                  : "border border-[#e9e8ea] hover:border-[#ded5f2] bg-white/95 shadow-xs"
              }`}
            >
              {/* Question Trigger Button */}
              <button
                type="button"
                onClick={() => toggleFaq(idx)}
                className="w-full p-3.5 sm:p-4 flex items-center justify-between gap-3 text-left cursor-pointer transition-colors"
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                      isOpen
                        ? "bg-[#ede8f8] text-[#3c315b] ring-1 ring-[#ded5f2]"
                        : "bg-[#f4f2f4] text-[#7a68b7] border border-[#e9e8ea]"
                    }`}
                  >
                    <HelpCircle className="w-4 h-4" />
                  </div>
                  <h3
                    className={`font-medium text-xs sm:text-sm leading-snug transition-colors ${
                      isOpen ? "text-[#3c315b]" : "text-[#1c1c1c]"
                    }`}
                  >
                    {faq.q}
                  </h3>
                </div>

                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                    isOpen
                      ? "rotate-180 text-[#3c315b] bg-[#ede8f8]"
                      : "text-[#86848d] bg-[#f4f2f4] border border-[#e9e8ea]"
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {/* Collapsible Answer */}
              {isOpen && (
                <div className="px-4 pb-4 pt-0 pl-14 animate-in fade-in slide-in-from-top-1 duration-200">
                  <p className="text-xs sm:text-sm text-[#86848d] leading-relaxed border-t border-[#e9e8ea] pt-2.5">
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
