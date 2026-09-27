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

export function RoomMatrixFilter({
  filterStatus,
  setFilterStatus,
  counts,
}: RoomMatrixFilterProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
      <button
        type="button"
        onClick={() => setFilterStatus("all")}
        className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
          filterStatus === "all"
            ? "bg-purple-700 text-white shadow-2xs font-extrabold"
            : "bg-white text-slate-600 hover:bg-purple-50 border border-purple-100"
        }`}
      >
        Semua ({counts.total} Kamar)
      </button>

      <button
        type="button"
        onClick={() => setFilterStatus("ready")}
        className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
          filterStatus === "ready"
            ? "bg-purple-700 text-white shadow-2xs font-extrabold"
            : "bg-white text-slate-700 hover:bg-purple-50 border border-purple-100"
        }`}
      >
        <span className="w-2 h-2 rounded-full bg-emerald-500" />
        <span>Tersedia ({counts.ready})</span>
      </button>

      <button
        type="button"
        onClick={() => setFilterStatus("booked")}
        className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
          filterStatus === "booked"
            ? "bg-purple-700 text-white shadow-2xs font-extrabold"
            : "bg-white text-slate-700 hover:bg-purple-50 border border-purple-100"
        }`}
      >
        <span className="w-2 h-2 rounded-full bg-purple-600" />
        <span>Booking WA ({counts.booked})</span>
      </button>

      <button
        type="button"
        onClick={() => setFilterStatus("occupied")}
        className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
          filterStatus === "occupied"
            ? "bg-purple-700 text-white shadow-2xs font-extrabold"
            : "bg-white text-slate-700 hover:bg-purple-50 border border-purple-100"
        }`}
      >
        <span className="w-2 h-2 rounded-full bg-blue-500" />
        <span>Terisi ({counts.occupied})</span>
      </button>

      <button
        type="button"
        onClick={() => setFilterStatus("dirty")}
        className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
          filterStatus === "dirty"
            ? "bg-purple-700 text-white shadow-2xs font-extrabold"
            : "bg-white text-slate-700 hover:bg-purple-50 border border-purple-100"
        }`}
      >
        <span className="w-2 h-2 rounded-full bg-amber-500" />
        <span>Perlu Bersih ({counts.dirty})</span>
      </button>
    </div>
  );
}
