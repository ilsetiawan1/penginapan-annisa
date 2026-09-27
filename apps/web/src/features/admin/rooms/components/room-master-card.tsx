"use client";

import { Bed, Edit3, Wind } from "lucide-react";
import { Button } from "@/components/ui/button";

export function cleanImageUrl(url?: string | null): string {
  if (!url) return "";
  return url.replace(/^"+|"+$/g, "").replace(/^'+|'+$/g, "").trim();
}

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
  const isAc = room.type === "ac";

  return (
    <div className="bg-white rounded-3xl border-2 border-purple-100 hover:border-purple-300 transition-all p-4 shadow-2xs flex flex-col justify-between group space-y-3">
      {/* Top Code Badge & Building */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-2xl bg-purple-100 text-purple-900 font-black text-xs flex items-center justify-center shadow-2xs">
            #{room.code}
          </div>
          <div>
            <h4 className="text-xs font-black text-slate-900 leading-tight">
              {room.name}
            </h4>
            <span className="text-[10px] text-slate-400 font-bold block">
              {room.buildingName}
            </span>
          </div>
        </div>

        <span
          className={`p-1.5 rounded-xl border flex items-center justify-center ${
            isAc
              ? "bg-purple-50 text-purple-700 border-purple-200"
              : "bg-indigo-50 text-indigo-700 border-indigo-200"
          }`}
          title={room.typeName}
        >
          {isAc ? (
            <Wind className="w-3.5 h-3.5" />
          ) : (
            <Bed className="w-3.5 h-3.5" />
          )}
        </span>
      </div>

      {/* Room Photo Preview */}
      <div className="relative w-full h-32 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-2xs">
        {room.imageUrl ? (
          <img
            src={cleanImageUrl(room.imageUrl)}
            alt={room.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-purple-50 via-purple-100/40 to-slate-100 flex flex-col items-center justify-center gap-1.5 text-purple-700/60 p-3">
            {isAc ? (
              <Wind className="w-6 h-6 stroke-[1.5]" />
            ) : (
              <Bed className="w-6 h-6 stroke-[1.5]" />
            )}
            <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
              Kosong (Belum Ada Foto)
            </span>
          </div>
        )}
        <div className="absolute bottom-1.5 left-1.5 bg-slate-950/75 backdrop-blur-xs px-2 py-0.5 rounded-md text-[9px] text-white font-bold">
          {room.typeName}
        </div>
      </div>

      {/* Price & Facilities Preview */}
      <div className="space-y-1.5">
        <div className="flex items-baseline justify-between">
          <span className="text-[10px] text-slate-400 font-bold uppercase">
            Tarif Sewa:
          </span>
          <span className="text-xs font-black text-purple-700">
            Rp {room.price.toLocaleString("id-ID")}{" "}
            <span className="text-[10px] text-slate-400 font-normal">/mlm</span>
          </span>
        </div>

        {/* Short facilities tags (first 3) */}
        <div className="flex flex-wrap gap-1">
          {room.facilities.slice(0, 3).map((f) => (
            <span
              key={f}
              className="text-[9px] font-bold bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded-md truncate max-w-[120px]"
            >
              {f}
            </span>
          ))}
          {room.facilities.length > 3 && (
            <span className="text-[9px] font-bold bg-purple-50 text-purple-700 px-1.5 py-0.5 rounded-md">
              +{room.facilities.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Edit Action Button */}
      <Button
        type="button"
        onClick={onEdit}
        className="w-full rounded-2xl bg-purple-50 hover:bg-purple-700 text-purple-900 hover:text-white border border-purple-200 text-xs font-bold h-9 gap-1.5 transition-colors cursor-pointer mt-1"
      >
        <Edit3 className="w-3.5 h-3.5" />
        <span>Edit Kamar &amp; Tarif</span>
      </Button>
    </div>
  );
}
