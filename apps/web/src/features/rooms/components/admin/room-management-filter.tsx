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
      dot: null,
    },
    {
      id: "A" as const,
      label: "Bangunan A",
      badge: "4 Kamar • 2 AC • 2 Kipas",
      dot: "bg-purple-600",
    },
    {
      id: "B" as const,
      label: "Bangunan B",
      badge: "4 Kamar • 2 AC • 2 Kipas",
      dot: "bg-indigo-600",
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
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              isActive
                ? "bg-purple-700 text-white shadow-2xs font-extrabold"
                : "bg-white text-slate-700 hover:bg-purple-50 border border-purple-100"
            }`}
          >
            {opt.dot && <span className={`w-2 h-2 rounded-full ${opt.dot}`} />}
            <span>{opt.label}</span>
            <span
              className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                isActive
                  ? "bg-white/25 text-white"
                  : "bg-slate-100 text-slate-600"
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
