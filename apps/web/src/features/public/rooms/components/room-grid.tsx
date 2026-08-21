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
  // Pisahkan Kamar Bangunan A & Bangunan B
  const roomsA = rooms.filter((r) => r.number.startsWith("A"));
  const roomsB = rooms.filter((r) => r.number.startsWith("B"));

  return (
    <section className="max-w-6xl mx-auto px-4 pt-2 pb-16 sm:pb-20 space-y-8">
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
        <>
          {/* BANGUNAN A */}
          {roomsA.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-700" />
                  <h2 className="text-base sm:text-xl font-black text-slate-900 tracking-tight">
                    Bangunan A (Lokasi 1)
                  </h2>
                </div>
                <span className="text-[11px] font-bold text-slate-500 bg-white px-2.5 py-0.5 rounded-lg border border-slate-200">
                  {roomsA.length} Unit Kamar
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                {roomsA.map((room) => (
                  <RoomCard
                    key={room.number}
                    room={room}
                    checkInDate={checkInDate}
                    nights={nights}
                  />
                ))}
              </div>
            </div>
          )}

          {/* BANGUNAN B */}
          {roomsB.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-700" />
                  <h2 className="text-base sm:text-xl font-black text-slate-900 tracking-tight">
                    Bangunan B (Lokasi 2)
                  </h2>
                </div>
                <span className="text-[11px] font-bold text-slate-500 bg-white px-2.5 py-0.5 rounded-lg border border-slate-200">
                  {roomsB.length} Unit Kamar
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                {roomsB.map((room) => (
                  <RoomCard
                    key={room.number}
                    room={room}
                    checkInDate={checkInDate}
                    nights={nights}
                  />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </section>
  );
}
