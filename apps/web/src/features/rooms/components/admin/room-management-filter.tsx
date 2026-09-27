"use client";

interface RoomManagementFilterProps {
  filterBuilding: "all" | "A" | "B";
  setFilterBuilding: (val: "all" | "A" | "B") => void;
}

export function RoomManagementFilter({
  filterBuilding,
  setFilterBuilding,
}: RoomManagementFilterProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
      <button
        type="button"
        onClick={() => setFilterBuilding("all")}
        className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
          filterBuilding === "all"
            ? "bg-purple-700 text-white shadow-2xs font-extrabold"
            : "bg-white text-slate-600 hover:bg-purple-50 border border-purple-100"
        }`}
      >
        Semua Kamar (8 Unit)
      </button>

      <button
        type="button"
        onClick={() => setFilterBuilding("A")}
        className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
          filterBuilding === "A"
            ? "bg-purple-700 text-white shadow-2xs font-extrabold"
            : "bg-white text-slate-700 hover:bg-purple-50 border border-purple-100"
        }`}
      >
        <span className="w-2 h-2 rounded-full bg-purple-600" />
        <span>Bangunan A (4 Kamar: 2 AC • 2 Kipas)</span>
      </button>

      <button
        type="button"
        onClick={() => setFilterBuilding("B")}
        className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
          filterBuilding === "B"
            ? "bg-purple-700 text-white shadow-2xs font-extrabold"
            : "bg-white text-slate-700 hover:bg-purple-50 border border-purple-100"
        }`}
      >
        <span className="w-2 h-2 rounded-full bg-indigo-600" />
        <span>Bangunan B (4 Kamar: 2 AC • 2 Kipas)</span>
      </button>
    </div>
  );
}
