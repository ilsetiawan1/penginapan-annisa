import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
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
  ];

  return (
    <div className="w-full">
      {/* Centered Section Header */}
      <div className="text-center max-w-xl mx-auto mb-6 sm:mb-8">
        <span className="text-[10px] font-extrabold uppercase tracking-wider text-purple-700 block mb-1">
          OLEH-OLEH KHAS
        </span>
        <h2 className="text-sm sm:text-lg font-bold text-slate-900 leading-tight">
          Katalog di Resepsionis
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Minyak kayu putih Namlea murni, minyak cengkeh, dan camilan khas Maluku tersedia langsung di meja resepsionis.
        </p>
      </div>

      {/* 3-Card Grid Layout (Direct 3 Cards on Desktop & Tablet) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6 max-w-5xl mx-auto">
        {previewSouvenirs.map((item) => (
          <div
            key={item.name}
            className="bg-white/95 backdrop-blur-md rounded-3xl border border-purple-200/80 shadow-2xs hover:border-purple-300 hover:shadow-lg transition-all overflow-hidden flex flex-col justify-between"
          >
            <div>
              <div className="relative h-40 sm:h-44 w-full bg-slate-100 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute top-2.5 left-2.5">
                  <span className="bg-slate-950/80 text-white px-2.5 py-0.5 rounded-full text-[10px] font-bold shadow-xs">
                    {item.category}
                  </span>
                </div>
              </div>

              <div className="p-4 sm:p-5">
                <h3 className="font-extrabold text-sm sm:text-base text-slate-900 leading-tight mb-1">
                  {item.name}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-3">
                  {item.desc}
                </p>
                <p className="text-base font-black text-purple-700">{item.price}</p>
              </div>
            </div>

            <div className="p-4 sm:p-5 pt-0 border-t border-slate-100/90 mt-1 flex items-center justify-between gap-2">
              <span className="text-[10px] text-slate-400 font-medium">
                Ambil di Resepsionis
              </span>
              <Button
                asChild
                className="rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs h-9 px-4 gap-1.5 shadow-2xs transition-all cursor-pointer"
              >
                <a
                  href={getSouvenirOrderWhatsAppUrl({
                    itemName: item.name,
                    price: item.price,
                  })}
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaWhatsapp className="w-3.5 h-3.5" />
                  <span>Tanya Stok</span>
                </a>
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Link to Full Souvenirs Catalog */}
      <div className="text-center mt-6 sm:mt-8">
        <Link
          href="/oleh-oleh"
          className="inline-flex items-center gap-1.5 text-xs font-extrabold text-purple-700 hover:text-purple-900 hover:underline transition"
        >
          <span>Lihat Seluruh Produk Oleh-oleh Khas di Etalase Lengkap</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
