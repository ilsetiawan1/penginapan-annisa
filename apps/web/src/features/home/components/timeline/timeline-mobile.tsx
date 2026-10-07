"use client";

import { GlassIcon } from "@/components/ui/glass-icons";
import { Bed, KeyRound } from "lucide-react";
import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa6";

const STEPS = [
  {
    id: 1,
    title: "Pilih Tipe Kamar",
    icon: Bed,
    color: "brand",
  },
  {
    id: 2,
    title: "Chat WhatsApp",
    icon: FaWhatsapp,
    color: "brand",
  },
  {
    id: 3,
    title: "DP & Siap Istirahat",
    icon: KeyRound,
    color: "brand",
  },
];

const AUTO_PLAY_INTERVAL = 3600;

export function TimelineMobile() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-step rotation
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % STEPS.length);
    }, AUTO_PLAY_INTERVAL);

    return () => clearInterval(timer);
  }, [isPaused]);

  const handleSelect = (index: number) => {
    setActiveIndex(index);
    setIsPaused(true);
    const resumeTimer = setTimeout(() => setIsPaused(false), 6000);
    return () => clearTimeout(resumeTimer);
  };

  const handleNext = () => {
    handleSelect((activeIndex + 1) % STEPS.length);
  };

  const currentStep = STEPS[activeIndex];
  const CurrentIcon = currentStep.icon;

  return (
    <div
      className="block sm:hidden w-full max-w-xs mx-auto px-2 py-3 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* 1. Step Progress Indicators (3 Connected Segment Pills) */}
      <div className="flex items-center justify-between gap-2.5 mb-8 px-1">
        {STEPS.map((step, index) => {
          const isActive = index === activeIndex;
          const isPassed = index < activeIndex;

          return (
            <button
              key={step.id}
              type="button"
              onClick={() => handleSelect(index)}
              className="flex-1 group py-1 focus:outline-none cursor-pointer"
              aria-label={`Pilih langkah ${step.id}: ${step.title}`}
            >
              {/* Step Number Label */}
              <div className="flex items-center justify-center mb-1.5">
                <span
                  className={`text-[11px] font-medium transition-colors duration-200 ${
                    isActive ? "text-[#3c315b]" : isPassed ? "text-[#7a68b7]" : "text-[#86848d]"
                  }`}
                >
                  0{step.id}
                </span>
              </div>

              {/* Progress Bar Track */}
              <div className="h-1.5 w-full bg-[#e9e8ea] rounded-full overflow-hidden relative">
                {isActive ? (
                  <div
                    key={`active-${activeIndex}-${isPaused}`}
                    className={`h-full bg-[#3c315b] rounded-full ${
                      isPaused ? "w-full" : "w-full animate-[progress_3.6s_linear]"
                    }`}
                  />
                ) : isPassed ? (
                  <div className="h-full w-full bg-[#7a68b7] rounded-full" />
                ) : (
                  <div className="h-full w-0 bg-transparent rounded-full" />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* 2. Standalone 3D Glass Icon Card & Title */}
      <button
        key={currentStep.id}
        type="button"
        onClick={handleNext}
        aria-label={`Langkah aktif: ${currentStep.title}. Klik untuk lanjut.`}
        className="w-full flex flex-col items-center text-center cursor-pointer group focus:outline-none bg-transparent border-none p-0 pt-1"
      >
        <div className="relative mb-3.5 pt-1 flex items-center justify-center">
          {/* Subtle Ambient Glow */}
          <div className="absolute inset-0 bg-[#e2dffe]/50 rounded-2xl blur-lg scale-90 pointer-events-none" />

          {/* 3D Glass Icon Card */}
          <GlassIcon
            icon={<CurrentIcon className="w-6 h-6 text-white" />}
            color={currentStep.color}
            className="animate-spring-bounce"
          />
        </div>

        {/* Title */}
        <h3 className="text-sm font-medium text-[#1c1c1c] leading-tight tracking-tight">
          {currentStep.title}
        </h3>
      </button>
    </div>
  );
}
