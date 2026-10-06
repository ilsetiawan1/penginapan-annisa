import { RoomCard, type RoomItem } from "./room-card";

interface RoomGridProps {
  rooms: RoomItem[];
  searchQuery: string;
  checkInDate: string;
  nights: number;
  activeFilter: "all" | "ac" | "kipas" | "tersedia";
  onFilterChange: (filter: "all" | "ac" | "kipas" | "tersedia") => void;
  onReset: () => void;
}

export function RoomGrid({
  rooms,
  searchQuery,
  checkInDate,
  nights,
  activeFilter,
  onFilterChange,
  onReset,
}: RoomGridProps) {
  const getPillClass = (isActive: boolean) =>
    isActive
      ? "bg-[#3c315b] text-[#fdfcfe] font-medium shadow-xs"
      : "bg-[#f4f2f4] hover:bg-[#e9e8ea] text-[#86848d] hover:text-[#1c1c1c] font-normal";

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      {/* Section Header: Title di atas & Filter Pills di bawahnya */}
      <div className="mb-8 space-y-3.5">
        <div>
          <h2 className="text-2xl font-normal tracking-tight text-[#1c1c1c]">Daftar Unit Kamar</h2>
        </div>

        {/* Filter Kategori Pills (Di bawah title) */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
          <button
            type="button"
            onClick={() => onFilterChange("all")}
            aria-pressed={activeFilter === "all"}
            className={`rounded-full px-4 py-1.5 text-xs transition-all cursor-pointer shrink-0 ${getPillClass(
              activeFilter === "all",
            )}`}
          >
            Semua Kamar
          </button>

          <button
            type="button"
            onClick={() => onFilterChange("ac")}
            aria-pressed={activeFilter === "ac"}
            className={`rounded-full px-4 py-1.5 text-xs transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${getPillClass(
              activeFilter === "ac",
            )}`}
          >
            <span>Tipe AC</span>
            <span className="opacity-80 text-[11px]">Rp 275.000</span>
          </button>

          <button
            type="button"
            onClick={() => onFilterChange("kipas")}
            aria-pressed={activeFilter === "kipas"}
            className={`rounded-full px-4 py-1.5 text-xs transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${getPillClass(
              activeFilter === "kipas",
            )}`}
          >
            <span>Tipe Kipas</span>
            <span className="opacity-80 text-[11px]">Rp 200.000</span>
          </button>

          <button
            type="button"
            onClick={() => onFilterChange("tersedia")}
            aria-pressed={activeFilter === "tersedia"}
            className={`rounded-full px-4 py-1.5 text-xs font-medium shrink-0 transition-all cursor-pointer flex items-center gap-1.5 ${
              activeFilter === "tersedia"
                ? "bg-emerald-600 text-white shadow-xs"
                : "bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100/70"
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
            <span>Tersedia</span>
          </button>
        </div>
      </div>

      {rooms.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-[#e9e8ea] p-8 shadow-[0px_4px_20px_rgba(226,223,254,0.3)]">
          <p className="text-[#86848d] text-sm font-normal">
            Tidak ditemukan unit kamar dengan kata kunci &quot;{searchQuery}&quot;.
          </p>
          <button
            type="button"
            onClick={onReset}
            className="mt-4 px-5 py-2 rounded-full bg-[#3c315b] hover:bg-[#2d2445] text-white text-xs font-normal transition-all active:scale-95 cursor-pointer"
          >
            Reset Filter
          </button>
        </div>
      ) : (
        /* 3 Kolom di desktop agar card luas, proporsional, dan tidak sempit */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <RoomCard key={room.number} room={room} checkInDate={checkInDate} nights={nights} />
          ))}
        </div>
      )}
    </section>
  );
}
