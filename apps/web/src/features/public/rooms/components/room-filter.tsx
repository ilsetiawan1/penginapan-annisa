interface RoomFilterProps {
  activeFilter: "all" | "ac" | "kipas" | "tersedia";
  onFilterChange: (filter: "all" | "ac" | "kipas" | "tersedia") => void;
}

export function RoomFilter({ activeFilter, onFilterChange }: RoomFilterProps) {
  return (
    <section className="relative z-20 -mt-5 sm:-mt-6 max-w-2xl mx-auto px-3 sm:px-4">
      <div className="bg-white/95 backdrop-blur-md rounded-full p-1 sm:p-1.5 shadow-lg border border-slate-200/90 flex items-center justify-center gap-1 sm:gap-1.5 overflow-x-auto no-scrollbar">
        <button
          type="button"
          onClick={() => onFilterChange("all")}
          className={`px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer ${
            activeFilter === "all"
              ? "bg-purple-700 text-white shadow-xs"
              : "text-slate-600 hover:text-purple-700 hover:bg-purple-50/60"
          }`}
        >
          Semua
        </button>
        <button
          type="button"
          onClick={() => onFilterChange("ac")}
          className={`px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer ${
            activeFilter === "ac"
              ? "bg-purple-700 text-white shadow-xs"
              : "text-slate-600 hover:text-purple-700 hover:bg-purple-50/60"
          }`}
        >
          Tipe AC
        </button>
        <button
          type="button"
          onClick={() => onFilterChange("kipas")}
          className={`px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer ${
            activeFilter === "kipas"
              ? "bg-purple-700 text-white shadow-xs"
              : "text-slate-600 hover:text-purple-700 hover:bg-purple-50/60"
          }`}
        >
          Tipe Kipas
        </button>
        <button
          type="button"
          onClick={() => onFilterChange("tersedia")}
          className={`px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer ${
            activeFilter === "tersedia"
              ? "bg-emerald-600 text-white shadow-xs"
              : "text-emerald-700 hover:bg-emerald-50"
          }`}
        >
          🟢 Tersedia
        </button>
      </div>
    </section>
  );
}
