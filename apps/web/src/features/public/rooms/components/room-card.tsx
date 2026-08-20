import Image from "next/image";
import { Check, CheckCircle2, Clock, Phone } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import { Card } from "../../../../components/ui/card";
import {
  getRoomAvailabilityInquiryUrl,
  getRoomBookingWhatsAppUrl,
} from "../../../../lib/whatsapp";

export interface RoomItem {
  number: string;
  name: string;
  type: "ac" | "kipas";
  status: "tersedia" | "terisi";
  price: string;
  dp: string;
  bed: string;
  capacity: string;
  facilities: string[];
  image: string;
}

interface RoomCardProps {
  room: RoomItem;
}

export function RoomCard({ room }: RoomCardProps) {
  const isAvailable = room.status === "tersedia";

  return (
    <Card className="overflow-hidden p-0 rounded-2xl bg-[#f4effe] hover:bg-[#f1eaff] border border-purple-200/90 hover:border-purple-300 hover:shadow-md transition-all flex flex-col justify-between">
      <div>
        <div className="relative h-44 sm:h-48 w-full bg-slate-100 overflow-hidden">
          <Image
            src={room.image}
            alt={room.name}
            fill
            className={`object-cover transition duration-300 ${
              isAvailable ? "hover:scale-105" : "grayscale-[20%] opacity-90"
            }`}
          />
          {/* 2 Status Badge: 🟢 Tersedia / 🔵 Terisi */}
          <div className="absolute top-3 left-3">
            {isAvailable ? (
              <span className="bg-emerald-600/95 text-white px-2.5 py-0.5 rounded-full text-[10px] font-bold shadow-xs flex items-center gap-1">
                <Check className="w-3 h-3" />
                <span>Tersedia</span>
              </span>
            ) : (
              <span className="bg-blue-600/95 text-white px-2.5 py-0.5 rounded-full text-[10px] font-bold shadow-xs flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>Terisi</span>
              </span>
            )}
          </div>
          {/* Room Number Badge */}
          <div className="absolute top-3 right-3">
            <span className="bg-purple-700 text-white px-2.5 py-0.5 rounded-full text-[10px] font-bold shadow-xs">
              #{room.number}
            </span>
          </div>
        </div>

        <div className="p-4 sm:p-5 space-y-3">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-extrabold text-sm sm:text-base text-slate-900 leading-snug">
                {room.name}
              </h3>
              <p className="text-xs text-purple-700 font-semibold mt-0.5">
                {room.bed}
              </p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-sm sm:text-base font-black text-purple-700">
                Rp {room.price}
              </p>
              <span className="text-[10px] text-slate-500 font-medium block">
                / malam
              </span>
            </div>
          </div>

          {/* Key Facilities Tags */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {room.facilities.slice(0, 4).map((f) => (
              <span
                key={f}
                className="text-[10px] font-semibold text-purple-900 bg-white/85 border border-purple-100/80 px-2 py-0.5 rounded-md"
              >
                ✓ {f}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom WhatsApp Booking CTA */}
      <div className="p-4 sm:p-5 pt-0">
        {isAvailable ? (
          <Button
            asChild
            variant="primary"
            className="w-full rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold gap-2 text-xs h-10 shadow-xs cursor-pointer"
          >
            <a
              href={getRoomBookingWhatsAppUrl({
                roomNumber: room.number,
                roomName: room.name,
                price: room.price,
              })}
              target="_blank"
              rel="noreferrer"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Pesan via WhatsApp</span>
            </a>
          </Button>
        ) : (
          <Button
            asChild
            variant="outline"
            className="w-full rounded-xl border-slate-300 text-slate-700 hover:bg-slate-50 font-bold gap-2 text-xs h-10 shadow-2xs cursor-pointer"
          >
            <a
              href={getRoomAvailabilityInquiryUrl(room.number, room.name)}
              target="_blank"
              rel="noreferrer"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Tanya Jadwal Kosong</span>
            </a>
          </Button>
        )}
      </div>
    </Card>
  );
}
