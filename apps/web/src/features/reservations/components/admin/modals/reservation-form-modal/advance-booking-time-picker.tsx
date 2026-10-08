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
        className="text-xs font-semibold text-slate-800 flex items-center gap-1.5"
      >
        <span>Estimasi Jam Tiba</span>
        <span className="text-slate-400 font-normal">- WIT</span>
      </label>
      <input
        id="adv-landing-time"
        type="time"
        required
        value={landingTime}
        onChange={(e) => setLandingTime(e.target.value)}
        className="w-full bg-slate-50 border border-slate-200 focus:border-slate-400 focus:bg-white rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-900 outline-none transition shadow-2xs cursor-pointer"
      />
    </div>
  );
}
