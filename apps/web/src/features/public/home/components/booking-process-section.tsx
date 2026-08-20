import { Bed, KeyRound } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";

const STEPS = [
  {
    step: "1",
    label: "Langkah 1",
    title: "Pilih Tipe Kamar",
    desc: "Tentukan kamar Tipe AC (Rp 275rb) atau Kipas (Rp 200rb) sesuai kebutuhan transit.",
    icon: Bed,
  },
  {
    step: "2",
    label: "Langkah 2",
    title: "Kirim Data via WhatsApp",
    desc: "1-klik terhubung langsung ke WhatsApp Admin dengan format pesanan otomatis.",
    icon: FaWhatsapp,
  },
  {
    step: "3",
    label: "Langkah 3",
    title: "Transfer DP & Check-In",
    desc: "Kunci kamar aman dengan DP 50%, siap langsung masuk istirahat setiba di Ambon.",
    icon: KeyRound,
  },
];

export function BookingProcessSection() {
  return (
    <section className="relative w-full py-8 sm:py-10 px-4 bg-[#faf9fc] overflow-hidden">
      <div className="max-w-6xl mx-auto w-full">
        {/* Centered Section Header */}
        <div className="text-center max-w-xl mx-auto mb-6 sm:mb-8">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-purple-700 block mb-1">
            ALUR RESERVASI
          </span>
          <h2 className="text-sm sm:text-lg font-bold text-slate-900 leading-tight">
            3 Langkah Mudah Booking Kamar Transit
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Proses kilat tanpa ribet, transparan, dan langsung terhubung dengan resepsionis.
          </p>
        </div>

        {/* Desktop Curved Process Timeline (md & up) */}
        <div className="hidden md:block relative max-w-4xl mx-auto pt-4 pb-2">
          {/* Exact Connecting SVG Sinusoidal Curve */}
          <div className="absolute inset-x-0 top-0 h-28 pointer-events-none z-0">
            <svg
              viewBox="0 0 900 110"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
            >
              <defs>
                <linearGradient id="purpleCurveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#C084FC" stopOpacity="0.5" />
                  <stop offset="50%" stopColor="#7E22CE" stopOpacity="1" />
                  <stop offset="100%" stopColor="#9333EA" stopOpacity="0.7" />
                </linearGradient>
                <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="2.5" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Baseline Wave Passing Under & Through Nodes */}
              <path
                d="M 20 80 C 180 80, 280 22, 450 22 C 620 22, 720 80, 880 80"
                stroke="url(#purpleCurveGrad)"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeDasharray="6 6"
                fill="none"
                filter="url(#softGlow)"
              />
            </svg>
          </div>

          {/* 3 Step Columns with Floating Icon Nodes on Curve */}
          <div className="grid grid-cols-3 gap-6 items-start relative z-10">
            {/* Step 1: Left Node */}
            <div className="flex flex-col items-center text-center pt-8 group relative">
              <span className="absolute -top-4 left-6 text-7xl font-black text-slate-200/50 select-none pointer-events-none -z-10">
                1
              </span>
              <div className="relative mb-3">
                <div className="w-14 h-14 rounded-2xl bg-white border-2 border-purple-200 shadow-lg shadow-purple-500/15 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Bed className="w-6 h-6 text-purple-700" />
                </div>
                <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-purple-700 text-white font-black text-[10px] flex items-center justify-center shadow-xs">
                  1
                </span>
              </div>
              <h3 className="font-extrabold text-sm sm:text-base text-slate-900 leading-tight mb-1">
                {STEPS[0].title}
              </h3>
              <p className="text-xs text-slate-600 max-w-[220px] leading-relaxed">
                {STEPS[0].desc}
              </p>
            </div>

            {/* Step 2: Peak Center Node */}
            <div className="flex flex-col items-center text-center -mt-3 group relative">
              <span className="absolute -top-6 left-12 text-7xl font-black text-purple-200/50 select-none pointer-events-none -z-10">
                2
              </span>
              <div className="relative mb-3">
                <div className="w-16 h-16 rounded-2xl bg-white border-2 border-purple-300 shadow-xl shadow-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ring-4 ring-purple-50">
                  <FaWhatsapp className="w-8 h-8 text-purple-700" />
                </div>
                <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-purple-700 text-white font-black text-[10px] flex items-center justify-center shadow-xs">
                  2
                </span>
              </div>
              <h3 className="font-extrabold text-sm sm:text-base text-slate-900 leading-tight mb-1">
                {STEPS[1].title}
              </h3>
              <p className="text-xs text-slate-600 max-w-[220px] leading-relaxed">
                {STEPS[1].desc}
              </p>
            </div>

            {/* Step 3: Right Node */}
            <div className="flex flex-col items-center text-center pt-8 group relative">
              <span className="absolute -top-4 right-6 text-7xl font-black text-slate-200/50 select-none pointer-events-none -z-10">
                3
              </span>
              <div className="relative mb-3">
                <div className="w-14 h-14 rounded-2xl bg-white border-2 border-purple-200 shadow-lg shadow-purple-500/15 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <KeyRound className="w-6 h-6 text-purple-700" />
                </div>
                <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-purple-700 text-white font-black text-[10px] flex items-center justify-center shadow-xs">
                  3
                </span>
              </div>
              <h3 className="font-extrabold text-sm sm:text-base text-slate-900 leading-tight mb-1">
                {STEPS[2].title}
              </h3>
              <p className="text-xs text-slate-600 max-w-[220px] leading-relaxed">
                {STEPS[2].desc}
              </p>
            </div>
          </div>
        </div>

        {/* Mobile View: Open Connected Timeline (No Card Containers) */}
        <div className="md:hidden relative space-y-6 pl-2 py-2">
          {/* Continuous Vertical Dotted Connecting Line */}
          <div className="absolute left-[29px] top-6 bottom-6 w-0.5 border-l-2 border-dashed border-purple-400 pointer-events-none z-0" />

          {STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.step}
                className="relative z-10 flex items-start gap-4 group"
              >
                {/* Floating Icon Node anchored directly on dotted line */}
                <div className="relative shrink-0">
                  <div className="w-12 h-12 rounded-2xl bg-white border-2 border-purple-200 text-purple-700 shadow-md shadow-purple-500/10 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-purple-700 text-white font-black text-[10px] flex items-center justify-center shadow-xs">
                    {step.step}
                  </span>
                </div>

                {/* Clean Text directly on canvas without card borders */}
                <div className="flex-1 min-w-0 pt-0.5">
                  <h3 className="font-extrabold text-xs sm:text-sm text-slate-900 mb-0.5 leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
