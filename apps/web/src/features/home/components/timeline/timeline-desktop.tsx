import { Bed, KeyRound } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";

const STEPS = [
  {
    step: "1",
    title: "Pilih Tipe Kamar",
    desc: "Pilihan kamar AC atau Kipas sesuai kebutuhan Anda.",
    icon: Bed,
  },
  {
    step: "2",
    title: "Chat WhatsApp",
    desc: "Format otomatis, langsung terhubung ke admin.",
    icon: FaWhatsapp,
  },
  {
    step: "3",
    title: "DP & Siap Istirahat",
    desc: "Kamar aman terisi, siap pakai setiba di penginapan.",
    icon: KeyRound,
  },
];

export function TimelineDesktop() {
  return (
    <div className="hidden sm:block relative max-w-4xl mx-auto pt-6 pb-4">
      {/* Connecting SVG Sinusoidal Curve */}
      <div className="absolute inset-x-0 top-0 h-28 pointer-events-none z-0">
        <svg
          viewBox="0 0 900 110"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="heroCurveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#e2dffe" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#3c315b" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#7a68b7" stopOpacity="0.8" />
            </linearGradient>
            <filter id="heroSoftGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Faint static guide track */}
          <path
            d="M 20 80 C 180 80, 280 22, 450 22 C 620 22, 720 80, 880 80"
            stroke="#e9e8ea"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="4 8"
            fill="none"
            opacity="0.6"
          />

          {/* Animated Glowing Flowing Dots (Left to Right) */}
          <path
            d="M 20 80 C 180 80, 280 22, 450 22 C 620 22, 720 80, 880 80"
            stroke="url(#heroCurveGrad)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeDasharray="6 10"
            className="animate-flow-dash"
            fill="none"
            filter="url(#heroSoftGlow)"
          />
        </svg>
      </div>

      {/* 3 Step Columns with Floating Icon Nodes on Curve */}
      <div className="grid grid-cols-3 gap-8 items-start relative z-10">
        {/* Step 1: Left Node */}
        <div className="flex flex-col items-center text-center pt-8 group relative px-2">
          <span className="absolute -top-4 left-6 text-7xl font-black text-slate-200/40 select-none pointer-events-none -z-10">
            1
          </span>
          <div className="relative mb-3.5">
            <div className="w-14 h-14 rounded-2xl bg-white border border-[#e9e8ea] shadow-sm shadow-[#3c315b]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Bed className="w-6 h-6 text-[#3c315b]" />
            </div>
          </div>
          <h2 className="font-medium text-base text-[#1c1c1c] leading-tight mb-1.5">
            {STEPS[0].title}
          </h2>
          <p className="text-xs text-[#86848d] max-w-[210px] leading-relaxed font-normal">
            {STEPS[0].desc}
          </p>
        </div>

        {/* Step 2: Peak Center Node (Border diselaraskan border-[#e9e8ea]) */}
        <div className="flex flex-col items-center text-center -mt-3 group relative px-2">
          <span className="absolute -top-6 left-12 text-7xl font-black text-[#e2dffe]/60 select-none pointer-events-none -z-10">
            2
          </span>
          <div className="relative mb-3.5">
            <div className="w-16 h-16 rounded-2xl bg-white border border-[#e9e8ea] shadow-sm shadow-[#3c315b]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <FaWhatsapp className="w-8 h-8 text-[#3c315b]" />
            </div>
          </div>
          <h2 className="font-medium text-base text-[#1c1c1c] leading-tight mb-1.5">
            {STEPS[1].title}
          </h2>
          <p className="text-xs text-[#86848d] max-w-[210px] leading-relaxed font-normal">
            {STEPS[1].desc}
          </p>
        </div>

        {/* Step 3: Right Node */}
        <div className="flex flex-col items-center text-center pt-8 group relative px-2">
          <span className="absolute -top-4 right-6 text-7xl font-black text-slate-200/40 select-none pointer-events-none -z-10">
            3
          </span>
          <div className="relative mb-3.5">
            <div className="w-14 h-14 rounded-2xl bg-white border border-[#e9e8ea] shadow-sm shadow-[#3c315b]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <KeyRound className="w-6 h-6 text-[#3c315b]" />
            </div>
          </div>
          <h2 className="font-medium text-base text-[#1c1c1c] leading-tight mb-1.5">
            {STEPS[2].title}
          </h2>
          <p className="text-xs text-[#86848d] max-w-[210px] leading-relaxed font-normal">
            {STEPS[2].desc}
          </p>
        </div>
      </div>
    </div>
  );
}
