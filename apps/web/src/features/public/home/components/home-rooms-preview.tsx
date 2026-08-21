import { ArrowRight, Bed, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa6";
import { Button } from "../../../../components/ui/button";
import { getRoomBookingWhatsAppUrl } from "../../../../lib/whatsapp";

interface RoomItem {
  id: string;
  number: string;
  name: string;
  type: "ac" | "kipas";
  typeLabel: string;
  price: string;
  dp: string;
  bed: string;
  capacity: string;
  facilities: string[];
  image: string;
}

const FEATURED_ROOMS: RoomItem[] = [
  {
    id: "A1",
    number: "01",
    name: "Kamar A1 — Tipe AC",
    type: "ac",
    typeLabel: "Tipe AC Dingin",
    price: "275.000",
    dp: "137.500",
    bed: "1 Kasur Besar (Muat 2–3 Tamu)",
    capacity: "2–3 Orang",
    facilities: [
      "AC Dingin Nyaman",
      "Kamar Mandi Dalam Pribadi",
      "TV Layar Datar",
      "WiFi Gratis Kencang",
      "Handuk Bersih & Air Mineral",
    ],
    image: "/rooms/room-ac-101.jpg",
  },
  {
    id: "A3",
    number: "02",
    name: "Kamar A3 — Tipe Kipas",
    type: "kipas",
    typeLabel: "Tipe Kipas Hemat",
    price: "200.000",
    dp: "100.000",
    bed: "1 Kasur Besar (Muat 2–3 Tamu)",
    capacity: "2–3 Orang",
    facilities: [
      "Kipas Angin Dinding",
      "Kamar Mandi Dalam Pribadi",
      "TV Layar Datar",
      "WiFi Gratis Kencang",
      "Handuk Bersih & Air Mineral",
    ],
    image: "/rooms/room-kipas-201.jpg",
  },
];

export function HomeRoomsPreview() {
  return (
    <div className="w-full">
      {/* Centered Section Header */}
      <div className="text-center max-w-xl mx-auto mb-6 sm:mb-8">
        <span className="text-[10px] font-extrabold uppercase tracking-wider text-purple-700 block mb-1">
          PILIHAN KAMAR
        </span>
        <h2 className="text-sm sm:text-lg font-bold text-slate-900 leading-tight">
          Unit Kamar Bersih &amp; Terawat
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          100% kamar mandi dalam pribadi, kasur besar muat 2–3 tamu, TV, dan WiFi kencang.
        </p>
      </div>

      {/* 2-Card Grid Layout (Direct 2 Cards on Desktop & Tablet) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 max-w-5xl mx-auto">
        {FEATURED_ROOMS.map((room) => (
          <div
            key={room.id}
            className="bg-[#f4effe] hover:bg-[#f1eaff] rounded-3xl border border-purple-200/90 hover:border-purple-300 shadow-2xs hover:shadow-lg transition-all overflow-hidden flex flex-col justify-between"
          >
            <div>
              {/* Photo Banner */}
              <div className="relative h-48 sm:h-56 w-full bg-slate-100 overflow-hidden">
                <Image
                  src={room.image}
                  alt={room.name}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="bg-purple-700 text-white px-2.5 py-0.5 rounded-full text-xs font-black shadow-xs">
                    #{room.id}
                  </span>
                  <span className="bg-emerald-600/95 text-white px-2.5 py-0.5 rounded-full text-[10px] font-bold shadow-xs flex items-center gap-1">
                    <Check className="w-3 h-3 stroke-[3]" />
                    <span>Tersedia</span>
                  </span>
                </div>

                <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-slate-950 font-black text-xs shadow-xs">
                  Rp {room.price}{" "}
                  <span className="text-[9px] font-medium text-slate-500">/ mlm</span>
                </div>

                <div className="absolute bottom-3 left-3 text-white">
                  <span className="text-[10px] text-purple-200 font-semibold block leading-none mb-0.5">
                    {room.typeLabel}
                  </span>
                  <h3 className="font-extrabold text-base text-white leading-tight drop-shadow-xs">
                    {room.name}
                  </h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 sm:p-5 space-y-3">
                <div className="flex items-center gap-2 text-xs text-purple-900 font-bold bg-white/85 p-2 rounded-xl border border-purple-100">
                  <Bed className="w-4 h-4 text-purple-700 shrink-0" />
                  <span>{room.bed}</span>
                </div>

                {/* Facility Tags */}
                <div className="flex flex-wrap gap-1.5 pt-0.5">
                  {room.facilities.map((fac) => (
                    <span
                      key={fac}
                      className="text-[10px] font-semibold text-purple-900 bg-white/85 border border-purple-100 px-2 py-0.5 rounded-md"
                    >
                      ✓ {fac}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Footer & Action */}
            <div className="p-4 sm:p-5 pt-0 border-t border-purple-100/90 mt-2 flex items-center justify-between gap-3">
              <div>
                <span className="text-xs text-slate-600 font-bold block">
                  DP 50%: <strong className="text-purple-700">Rp {room.dp}</strong>
                </span>
                <span className="text-[10px] text-slate-400 font-medium">Bebas biaya admin</span>
              </div>

              <Button
                asChild
                className="rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs h-9 px-4 gap-1.5 shadow-xs transition-all cursor-pointer"
              >
                <a
                  href={getRoomBookingWhatsAppUrl({
                    roomNumber: room.id,
                    roomName: room.name,
                    price: room.price,
                  })}
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaWhatsapp className="w-3.5 h-3.5" />
                  <span>Pesan via WhatsApp</span>
                </a>
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Link to Full Catalog */}
      <div className="text-center mt-6 sm:mt-8">
        <Link
          href="/kamar"
          className="inline-flex items-center gap-1.5 text-xs font-extrabold text-purple-700 hover:text-purple-900 hover:underline transition"
        >
          <span>Lihat Seluruh 8 Unit Kamar di Halaman Katalog Lengkap</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
