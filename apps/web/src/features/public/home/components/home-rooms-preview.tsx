import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import { getRoomBookingWhatsAppUrl } from "../../../../lib/whatsapp";

export function HomeRoomsPreview() {
  const previewRooms = [
    {
      id: "A1",
      number: "A1",
      name: "Tipe AC",
      price: "275.000",
      dp: "137.500",
      bed: "1 Kasur Besar (Muat 2–3 Org)",
      highlights: ["AC Dingin", "KM Dalam", "TV", "WiFi"],
      image: "/rooms/room-ac-101.jpg",
    },
    {
      id: "A2",
      number: "A2",
      name: "Tipe AC",
      price: "275.000",
      dp: "137.500",
      bed: "1 Kasur Besar (Muat 2–3 Org)",
      highlights: ["AC Dingin", "KM Dalam", "TV", "WiFi"],
      image: "/rooms/room-ac-102.jpg",
    },
    {
      id: "A3",
      number: "A3",
      name: "Tipe Kipas",
      price: "200.000",
      dp: "100.000",
      bed: "1 Kasur Besar (Muat 2–3 Org)",
      highlights: ["Kipas Angin", "KM Dalam", "TV", "WiFi"],
      image: "/rooms/room-kipas-201.jpg",
    },
    {
      id: "A4",
      number: "A4",
      name: "Tipe Kipas",
      price: "200.000",
      dp: "100.000",
      bed: "1 Kasur Besar (Muat 2–3 Org)",
      highlights: ["Kipas Angin", "KM Dalam", "TV", "WiFi"],
      image: "/rooms/room-kipas-202.jpg",
    },
  ];

  return (
    <div>
      {/* Header bar */}
      <div className="flex items-center justify-between gap-2 mb-2 sm:mb-3">
        <div className="text-left">
          <span className="text-[10px] font-extrabold text-purple-700 tracking-wider uppercase block">
            PILIHAN KAMAR
          </span>
          <h2 className="text-xs sm:text-base  text-slate-900 leading-tight">
            Unit Kamar Bersih &amp; Terawat
          </h2>
        </div>
        <Button
          asChild
          variant="outline"
          className="rounded-full border-purple-200 bg-white/90 text-slate-800 hover:bg-white font-bold text-[10px] sm:text-xs gap-1 shrink-0 px-2.5 py-1 h-7"
        >
          <Link href="/kamar">
            <span>Lihat Semua</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </Button>
      </div>

      {/* 4 Rooms Cards Grid */}
      <div className="flex flex-nowrap overflow-x-auto snap-x snap-mandatory gap-2.5 sm:gap-3.5 pb-2 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-4 no-scrollbar">
        {previewRooms.map((room) => (
          <div
            key={room.id}
            className="snap-center min-w-[76vw] sm:min-w-[260px] md:min-w-0 bg-white/95 backdrop-blur-md rounded-2xl border border-purple-200/80 shadow-2xs hover:border-purple-300 transition-all overflow-hidden flex flex-col justify-between flex-shrink-0 md:flex-shrink"
          >
            <div>
              <div className="relative h-28 sm:h-32 md:h-36 w-full bg-slate-100 overflow-hidden">
                <Image
                  src={room.image}
                  alt={room.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-2 right-2">
                  <span className="bg-purple-700 text-white px-2 py-0.5 rounded-full text-[9px] font-bold shadow-xs">
                    #{room.number}
                  </span>
                </div>
              </div>

              <div className="p-2.5 sm:p-3">
                <div className="flex items-start justify-between gap-1 mb-1">
                  <div>
                    <h3 className="font-extrabold text-xs sm:text-sm text-slate-900 leading-tight">
                      {room.name}
                    </h3>
                    <p className="text-[10px] text-purple-700 font-semibold mt-0.5">{room.bed}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs sm:text-sm font-black text-purple-700">Rp {room.price}</p>
                    <span className="text-[8px] text-slate-500 font-medium">/ malam</span>
                  </div>
                </div>

                {/* Highlights Checklist */}
                <div className="flex flex-wrap gap-1 my-1">
                  {room.highlights.map((h) => (
                    <span
                      key={h}
                      className="text-[8px] sm:text-[9px] font-semibold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded"
                    >
                      ✓ {h}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-2.5 sm:p-3 pt-0 flex items-center justify-between gap-2 border-t border-slate-100 mt-1">
              <span className="text-[10px] font-bold text-slate-800">
                DP: <span className="text-purple-700">Rp {room.dp}</span>
              </span>
              <Button
                asChild
                className="rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-[10px] sm:text-xs h-7 px-3 gap-1 shadow-2xs"
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
                  <Phone className="w-3 h-3" />
                  <span>Pesan</span>
                </a>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
