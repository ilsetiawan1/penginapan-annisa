import { Check, CheckCircle2, Clock, Phone } from "lucide-react";
import Image from "next/image";
import { Button } from "../../../../components/ui/button";
import { Card } from "../../../../components/ui/card";
import { ANNISA_WA_NUMBER } from "../../../../lib/whatsapp";

export interface RoomItem {
  number: string;
  name: string;
  type: "ac" | "kipas";
  status: "tersedia" | "terisi";
  price: string; // e.g. "275.000"
  dp: string;
  bed: string;
  capacity: string;
  facilities: string[];
  image: string;
}

interface RoomCardProps {
  room: RoomItem;
  checkInDate?: string;
  nights?: number;
}

export function RoomCard({ room, checkInDate, nights = 1 }: RoomCardProps) {
  const isAvailable = room.status === "tersedia";
  const numericPrice = Number(room.price.replace(/\./g, ""));
  const totalPrice = numericPrice * nights;
  const dpPrice = Math.round(totalPrice * 0.5);

  const formattedDateStr = checkInDate
    ? new Date(checkInDate).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "Hari Ini";

  // URL WhatsApp dengan Draf Pesan Lengkap Otomatis
  const waMessage = `*Halo Penginapan Annisa, saya ingin reservasi kamar:*
• Tipe: *${room.name}*
• Tgl Check-In: *${formattedDateStr}*
• Durasi: *${nights} Malam*
• Estimasi Total: *Rp ${totalPrice.toLocaleString("id-ID")}*
• DP 50%: *Rp ${dpPrice.toLocaleString("id-ID")}*

Apakah kamar ini tersedia di tanggal tersebut? Terima kasih! 🙏`;

  const waUrl = `https://wa.me/${ANNISA_WA_NUMBER}?text=${encodeURIComponent(waMessage)}`;

  return (
    <Card className="overflow-hidden p-0 rounded-3xl bg-white hover:shadow-xl border border-slate-200/90 hover:border-purple-300 transition-all duration-300 flex flex-col justify-between group">
      <div>
        <div className="relative h-48 sm:h-52 w-full bg-slate-100 overflow-hidden">
          <Image
            src={room.image}
            alt={room.name}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
          />
          {/* Status Badge */}
          <div className="absolute top-3 left-3">
            {isAvailable ? (
              <span className="bg-emerald-600/95 text-white px-2.5 py-0.5 rounded-full text-[10px] font-bold shadow-xs flex items-center gap-1 backdrop-blur-xs">
                <Check className="w-3 h-3" />
                <span>Buka Reservasi</span>
              </span>
            ) : (
              <span className="bg-blue-600/95 text-white px-2.5 py-0.5 rounded-full text-[10px] font-bold shadow-xs flex items-center gap-1 backdrop-blur-xs">
                <Clock className="w-3 h-3" />
                <span>Terisi Hari Ini</span>
              </span>
            )}
          </div>
          {/* Room Number Badge */}
          <div className="absolute top-3 right-3">
            <span className="bg-purple-700 text-white px-2.5 py-0.5 rounded-full text-[10px] font-black shadow-xs">
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
              <p className="text-xs text-purple-700 font-bold mt-0.5">{room.bed}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-base sm:text-lg font-black text-purple-700">
                Rp {totalPrice.toLocaleString("id-ID")}
              </p>
              <span className="text-[10px] text-slate-500 font-medium block">
                {nights > 1 ? `untuk ${nights} malam` : "per malam"}
              </span>
            </div>
          </div>

          {/* Key Facilities Tags */}
          <div className="flex flex-wrap gap-1.5 pt-0.5">
            {room.facilities.slice(0, 4).map((f) => (
              <span
                key={f}
                className="text-[10px] font-bold text-slate-700 bg-slate-100/90 border border-slate-200/80 px-2 py-0.5 rounded-md"
              >
                ✓ {f}
              </span>
            ))}
          </div>

          {/* Estimasi DP Box */}
          <div className="bg-purple-50/70 border border-purple-100 rounded-xl p-2 flex items-center justify-between text-[11px]">
            <span className="text-slate-600 font-medium">Ketentuan DP 50%:</span>
            <strong className="text-purple-900 font-black">
              Rp {dpPrice.toLocaleString("id-ID")}
            </strong>
          </div>
        </div>
      </div>

      {/* Bottom WhatsApp Booking CTA */}
      <div className="p-4 sm:p-5 pt-0">
        <Button
          asChild
          className="w-full rounded-2xl bg-purple-700 hover:bg-purple-800 text-white font-extrabold gap-2 text-xs sm:text-sm h-11 shadow-md hover:shadow-lg transition-all cursor-pointer"
        >
          <a href={waUrl} target="_blank" rel="noreferrer">
            <Phone className="w-3.5 h-3.5" />
            <span>Pesan via WhatsApp</span>
          </a>
        </Button>
      </div>
    </Card>
  );
}
