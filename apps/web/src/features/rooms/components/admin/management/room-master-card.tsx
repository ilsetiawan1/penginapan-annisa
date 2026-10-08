"use client";

import { cleanImageUrl } from "@/lib/string";
import { Bed, Edit3 } from "lucide-react";
import { useState } from "react";

export { cleanImageUrl };

export interface MasterRoomItem {
  id: string;
  code: string;
  name: string;
  building: "A" | "B";
  buildingName: string;
  type: "ac" | "kipas";
  typeName: string;
  price: number;
  imageUrl: string;
  description: string;
  facilities: string[];
  capacity: number;
  bedType: string;
}

interface RoomMasterCardProps {
  room: MasterRoomItem;
  onEdit: () => void;
}

export function RoomMasterCard({ room, onEdit }: RoomMasterCardProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = Boolean(room.imageUrl) && !imageFailed;

  return (
    <article className="bg-white rounded-2xl border border-slate-200/80 hover:border-slate-300 transition-colors p-3.5 sm:p-4 flex flex-col justify-between h-full group space-y-2.5">
      <div className="space-y-2.5">
        {/* Top: Room Code Badge & Type Name */}
        <div className="flex items-center gap-2.5">
          <span className="w-8 h-8 rounded-xl bg-slate-100 text-slate-800 border border-slate-200/80 font-bold text-xs flex items-center justify-center tabular-nums">
            #{room.code}
          </span>
          <h4 className="text-sm font-semibold text-slate-900 leading-snug">{room.typeName}</h4>
        </div>

        {/* Room Photo Preview or Placeholder */}
        {showImage ? (
          <div className="relative w-full h-32 rounded-lg overflow-hidden shrink-0 my-2 border border-slate-200/80 bg-slate-100">
            <img
              src={cleanImageUrl(room.imageUrl)}
              alt={`Kamar #${room.code}`}
              onError={() => setImageFailed(true)}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="w-full h-32 rounded-lg border border-slate-200/80 bg-slate-50/50 flex flex-col items-center justify-center gap-1.5 select-none shrink-0 my-2 [background-image:repeating-linear-gradient(45deg,transparent,transparent_8px,rgba(226,232,240,0.5)_8px,rgba(226,232,240,0.5)_16px)]">
            <Bed className="w-6 h-6 text-slate-300 stroke-[1.5]" />
            <span className="text-[11px] font-medium text-slate-400">Belum ada foto</span>
          </div>
        )}

        {/* Price & Facilities Preview */}
        <div className="space-y-1">
          <div>
            <span className="text-sm font-semibold text-slate-900 tabular-nums">
              Rp {room.price.toLocaleString("id-ID")}
            </span>{" "}
            <span className="text-xs font-normal text-slate-400">/ malam</span>
          </div>

          {/* Short facilities tags (first 3) */}
          <div className="flex flex-wrap gap-1 min-h-[20px]">
            {room.facilities.slice(0, 3).map((f) => (
              <span
                key={f}
                className="text-[9px] font-medium bg-slate-100 text-slate-600 border border-slate-200/60 px-1.5 py-0.5 rounded-md truncate max-w-[120px]"
              >
                {f}
              </span>
            ))}
            {room.facilities.length > 3 && (
              <span className="text-[9px] font-medium bg-slate-100 text-slate-600 border border-slate-200/60 px-1.5 py-0.5 rounded-md">
                +{room.facilities.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Edit Action Button */}
      <button
        type="button"
        onClick={onEdit}
        className="w-full h-8 py-1 rounded-lg bg-slate-100 text-slate-800 border border-slate-200/90 hover:bg-slate-900 hover:text-white transition-colors text-xs sm:text-sm font-medium flex items-center justify-center gap-1.5 cursor-pointer mt-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
      >
        <Edit3 className="w-3.5 h-3.5" />
        <span>Edit Kamar &amp; Tarif</span>
      </button>
    </article>
  );
}
