"use client";

interface RoomMatrixFilterProps {
  filterStatus: string;
  setFilterStatus: (val: string) => void;
  counts: {
    ready: number;
    booked: number;
    occupied: number;
    dirty: number;
    total: number;
  };
}

export function RoomMatrixFilter({ filterStatus, setFilterStatus, counts }: RoomMatrixFilterProps) {
  const filterButtons = [
    {
      id: "all",
      label: "Semua",
      count: counts.total,
      dotColor: null,
    },
    {
      id: "ready",
      label: "Tersedia",
      count: counts.ready,
      dotColor: "bg-emerald-500",
    },
    {
      id: "booked",
      label: "Booking WA",
      count: counts.booked,
      dotColor: "bg-purple-600",
    },
    {
      id: "occupied",
      label: "Terisi",
      count: counts.occupied,
      dotColor: "bg-blue-500",
    },
    {
      id: "dirty",
      label: "Perlu Bersih",
      count: counts.dirty,
      dotColor: "bg-amber-500",
    },
  ];

  return (
    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
      {filterButtons.map((btn) => {
        const isActive = filterStatus === btn.id;

        return (
          <button
            key={btn.id}
            type="button"
            onClick={() => setFilterStatus(btn.id)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              isActive
                ? "bg-purple-700 text-white shadow-2xs font-extrabold"
                : "bg-white text-slate-700 hover:bg-purple-50 border border-purple-100"
            }`}
          >
            {btn.dotColor && <span className={`w-2 h-2 rounded-full ${btn.dotColor}`} />}
            <span>{btn.label}</span>
            <span
              className={`text-[10px] font-black px-1.5 py-0.5 rounded-full min-w-5 text-center leading-none ${
                isActive
                  ? "bg-white/25 text-white"
                  : "bg-slate-100 text-slate-600 group-hover:bg-purple-100"
              }`}
            >
              {btn.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
