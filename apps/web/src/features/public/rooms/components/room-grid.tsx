import { Button } from "../../../../components/ui/button";
import { RoomCard, type RoomItem } from "./room-card";

interface RoomGridProps {
  rooms: RoomItem[];
  searchQuery: string;
  checkInDate: string;
  nights: number;
  onReset: () => void;
}

export function RoomGrid({
  rooms,
  searchQuery,
  checkInDate,
  nights,
  onReset,
}: RoomGridProps) {
  return (
    <section className="max-w-6xl mx-auto px-4 pt-2 pb-16 sm:pb-20 space-y-4 sm:space-y-6">
      {/* Section Header Konsisten dengan /oleh-oleh & /artikel */}
      <div className="flex items-center justify-between mt-4 sm:mt-6 mb-2 sm:mb-4">
        <div>
          <h2 className="text-xl sm:text-3xl font-serif font-black text-slate-950 tracking-tight leading-tight">
            Daftar Unit Kamar
          </h2>
          <p className="text-xs text-slate-500 mt-0.5 hidden sm:block">
            Semua kamar dilengkapi kasur besar muat 2–3 tamu, kamar mandi dalam
            pribadi, TV, dan WiFi kencang.
          </p>
        </div>
        <span className="text-[11px] bg-purple-50 text-purple-800 font-bold px-2.5 py-1 rounded-full border border-purple-100 hidden sm:inline-block">
          8 Unit Kamar Resmi
        </span>
      </div>
      {rooms.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs">
          <p className="text-slate-500 text-sm font-medium">
            Tidak ditemukan unit kamar dengan kata kunci &quot;{searchQuery}
            &quot;.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={onReset}
            className="mt-3 rounded-full text-xs font-bold cursor-pointer"
          >
            Reset Filter
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {rooms.map((room) => (
            <RoomCard
              key={room.number}
              room={room}
              checkInDate={checkInDate}
              nights={nights}
            />
          ))}
        </div>
      )}
    </section>
  );
}
