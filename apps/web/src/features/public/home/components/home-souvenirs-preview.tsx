import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import { getSouvenirOrderWhatsAppUrl } from "../../../../lib/whatsapp";

export function HomeSouvenirsPreview() {
  const previewSouvenirs = [
    {
      name: "Minyak Kayu Putih Namlea",
      category: "Minyak & Herbal",
      price: "Rp 65.000",
      desc: "Penyulingan murni Pulau Buru Namlea.",
      image:
        "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600&auto=format&fit=crop",
    },
    {
      name: "Minyak Cengkeh Asli Maluku",
      category: "Minyak & Herbal",
      price: "Rp 55.000",
      desc: "Ekstraksi murni bunga cengkeh pilihan.",
      image:
        "https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=600&auto=format&fit=crop",
    },
    {
      name: "Kue Sagu Bagea Kenari",
      category: "Makanan & Camilan",
      price: "Rp 35.000",
      desc: "Kue sagu renyah bertabur kenari gurih.",
      image:
        "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=600&auto=format&fit=crop",
    },
    {
      name: "Roti Kenari Khas Maluku",
      category: "Makanan & Camilan",
      price: "Rp 45.000",
      desc: "Roti panggang manis dengan kenari harum.",
      image:
        "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=600&auto=format&fit=crop",
    },
  ];

  return (
    <div>
      {/* Header with 2-3 words title */}
      <div className="flex items-center justify-between gap-2 mb-2 sm:mb-3">
        <div className="text-left">
          <span className="text-[10px] font-extrabold text-purple-700 tracking-wider uppercase block">
            OLEH-OLEH KHAS
          </span>
          <h2 className="text-xs sm:text-base text-slate-900 leading-tight">
            Katalog di Resepsionis
          </h2>
        </div>
        <Button
          asChild
          variant="outline"
          className="rounded-full border-purple-200 bg-white/90 text-slate-800 hover:bg-white font-bold text-[10px] sm:text-xs gap-1 shrink-0 px-2.5 py-1 h-7"
        >
          <Link href="/oleh-oleh">
            <span>Lihat Semua</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </Button>
      </div>

      {/* 1-Line Horizontal Swipe on Mobile / 4-Col Grid on Desktop */}
      <div className="flex flex-nowrap overflow-x-auto snap-x snap-mandatory gap-2.5 sm:gap-3.5 pb-2 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-4 no-scrollbar">
        {previewSouvenirs.map((item) => (
          <div
            key={item.name}
            className="snap-center min-w-[65vw] sm:min-w-[240px] md:min-w-0 bg-white/95 backdrop-blur-md rounded-2xl border border-purple-200/80 shadow-2xs hover:border-purple-300 transition-all overflow-hidden flex flex-col justify-between flex-shrink-0 md:flex-shrink"
          >
            <div>
              <div className="relative h-24 sm:h-28 w-full bg-slate-100 overflow-hidden">
                <Image src={item.image} alt={item.name} fill className="object-cover" />
                <div className="absolute top-2 left-2">
                  <span className="bg-slate-900/90 text-white px-2 py-0.5 rounded-full text-[8px] font-bold">
                    {item.category}
                  </span>
                </div>
              </div>

              <div className="p-2 sm:p-2.5">
                <h3 className="font-extrabold text-xs text-slate-900 leading-tight mb-0.5 line-clamp-1">
                  {item.name}
                </h3>
                <p className="text-[9px] text-slate-500 line-clamp-1 mb-1">{item.desc}</p>
                <p className="text-xs font-black text-purple-700">{item.price}</p>
              </div>
            </div>

            <div className="p-2 sm:p-2.5 pt-0">
              <Button
                asChild
                className="w-full rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-[10px] h-7 gap-1 shadow-2xs"
              >
                <a
                  href={getSouvenirOrderWhatsAppUrl(item.name, item.price)}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Phone className="w-3 h-3" />
                  <span>Tanya Stok</span>
                </a>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
