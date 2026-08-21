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
    <section className="max-w-6xl mx-auto px-4 pt-4 pb-16 sm:pb-20 space-y-6">
      {rooms.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs">
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
