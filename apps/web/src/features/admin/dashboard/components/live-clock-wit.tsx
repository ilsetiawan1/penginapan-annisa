"use client";

import { useEffect, useState, memo } from "react";
import { Calendar, Clock } from "lucide-react";

export const LiveClockWIT = memo(function LiveClockWIT() {
  const [timeStr, setTimeStr] = useState<string>("");
  const [dateStr, setDateStr] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeOptions: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Jayapura",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      const dateOptions: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Jayapura",
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
      };
      setTimeStr(
        `${new Intl.DateTimeFormat("id-ID", timeOptions).format(now)} WIT`,
      );
      setDateStr(new Intl.DateTimeFormat("id-ID", dateOptions).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-purple-100/90 shadow-2xs text-xs font-bold text-slate-700">
      <Calendar className="w-3.5 h-3.5 text-purple-700 shrink-0" />
      <span className="text-slate-900 font-extrabold">
        {dateStr || "Hari Ini"}
      </span>
      <span className="text-purple-200 font-bold">•</span>
      <Clock className="w-3.5 h-3.5 text-purple-700 shrink-0" />
      <span className="text-purple-900 font-black">
        {timeStr || "Memuat WIT..."}
      </span>
    </div>
  );
});
