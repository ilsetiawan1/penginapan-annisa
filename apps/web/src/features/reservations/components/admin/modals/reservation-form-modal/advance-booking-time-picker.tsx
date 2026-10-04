"use client";

interface AdvanceBookingTimePickerProps {
  landingTime: string;
  setLandingTime: (val: string) => void;
}

export function AdvanceBookingTimePicker({
  landingTime,
  setLandingTime,
}: AdvanceBookingTimePickerProps) {
  return (
    <div className="space-y-1">
      <label
        htmlFor="adv-landing-time"
        className="text-[10px] font-bold text-slate-700 uppercase tracking-wider block"
      >
        Estimasi Jam Tiba (Opsional)
      </label>
      <input
        id="adv-landing-time"
        type="time"
        value={landingTime}
        onChange={(e) => setLandingTime(e.target.value)}
        className="w-full bg-slate-50 border border-slate-200 focus:border-slate-400 focus:bg-white rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-900 outline-none transition shadow-2xs"
      />
    </div>
  );
}
