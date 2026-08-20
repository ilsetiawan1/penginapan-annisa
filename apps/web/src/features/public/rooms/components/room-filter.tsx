interface RoomFilterProps {
  activeFilter: "all" | "ac" | "kipas" | "tersedia";
  onFilterChange: (filter: "all" | "ac" | "kipas" | "tersedia") => void;
}

export function RoomFilter({ activeFilter, onFilterChange }: RoomFilterProps) {
  return (
    <section className="relative z-20 -mt-5 sm:-mt-6 max-w-3xl mx-auto px-4">
      <div className="bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-full p-1.5 sm:p-2 shadow-lg border border-slate-200/90 flex flex-wrap items-center justify-center gap-1 sm:gap-2">
        <button
          type="button"
          onClick={() => onFilterChange("all")}
          className={`px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeFilter === "all"
              ? "bg-purple-700 text-white shadow-xs"
              : "text-slate-600 hover:text-purple-700 hover:bg-purple-50/60"
          }`}
        >
          Semua Kamar (8)
        </button>
        <button
          type="button"
          onClick={() => onFilterChange("ac")}
          className={`px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeFilter === "ac"
              ? "bg-purple-700 text-white shadow-xs"
              : "text-slate-600 hover:text-purple-700 hover:bg-purple-50/60"
          }`}
        >
          Tipe AC (4)
        </button>
        <button
          type="button"
          onClick={() => onFilterChange("kipas")}
          className={`px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeFilter === "kipas"
              ? "bg-purple-700 text-white shadow-xs"
              : "text-slate-600 hover:text-purple-700 hover:bg-purple-50/60"
          }`}
        >
          Tipe Kipas (4)
        </button>
        <button
          type="button"
          onClick={() => onFilterChange("tersedia")}
          className={`px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeFilter === "tersedia"
              ? "bg-emerald-600 text-white shadow-xs"
              : "text-emerald-700 hover:bg-emerald-50"
          }`}
        >
          🟢 Tersedia Saja
        </button>
      </div>
    </section>
  );
}
