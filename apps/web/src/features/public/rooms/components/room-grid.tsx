import { Button } from "../../../../components/ui/button";
import { RoomCard, type RoomItem } from "./room-card";

interface RoomGridProps {
  rooms: RoomItem[];
  searchQuery: string;
  onReset: () => void;
}

export function RoomGrid({ rooms, searchQuery, onReset }: RoomGridProps) {
  return (
    <section className="max-w-6xl mx-auto px-4 pt-2 pb-16 sm:pb-20">
      <div className="flex items-center justify-between mt-10 mb-5 sm:mb-6">
        <h2 className="text-lg sm:text-2xl font-black text-slate-950 tracking-tight">
          Daftar Kamar Transit
        </h2>
        <span className="text-xs text-slate-500 font-medium hidden sm:inline-block">
          Harga transparan &bull; Tanpa biaya tersembunyi
        </span>
      </div>

      {rooms.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-6">
          <p className="text-slate-500 text-sm font-medium">
            Tidak ditemukan unit kamar dengan kata kunci &quot;{searchQuery}&quot;.
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {rooms.map((room) => (
            <RoomCard key={room.number} room={room} />
          ))}
        </div>
      )}
    </section>
  );
}
