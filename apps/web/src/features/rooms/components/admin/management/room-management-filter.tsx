"use client";

interface RoomManagementFilterProps {
  filterBuilding: "all" | "A" | "B";
  setFilterBuilding: (val: "all" | "A" | "B") => void;
}

export function RoomManagementFilter({
  filterBuilding,
  setFilterBuilding,
}: RoomManagementFilterProps) {
  const options = [
    {
      id: "all" as const,
      label: "Semua Kamar",
      badge: "8 Unit",
    },
    {
      id: "A" as const,
      label: "Bangunan A",
      badge: "4 Kamar · 2 AC · 2 Kipas",
    },
    {
      id: "B" as const,
      label: "Bangunan B",
      badge: "4 Kamar · 2 AC · 2 Kipas",
    },
  ];

  return (
    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
      {options.map((opt) => {
        const isActive = filterBuilding === opt.id;
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => setFilterBuilding(opt.id)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              isActive
                ? "bg-slate-900 text-white shadow-xs"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200/80"
            }`}
          >
            <span>{opt.label}</span>
            <span
              className={`text-[10px] font-semibold px-2 py-0.5 rounded-full tabular-nums ${
                isActive
                  ? "bg-white/20 text-white"
                  : "bg-white text-slate-600 border border-slate-200/60"
              }`}
            >
              {opt.badge}
            </span>
          </button>
        );
      })}
    </div>
  );
}
