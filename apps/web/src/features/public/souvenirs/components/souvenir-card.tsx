import { Phone } from "lucide-react";
import Image from "next/image";
import { Button } from "../../../../components/ui/button";
import { Card } from "../../../../components/ui/card";
import { getSouvenirOrderWhatsAppUrl } from "../../../../lib/whatsapp";

export interface SouvenirItem {
  name: string;
  category: string;
  price: string;
  desc: string;
  image: string;
  origin: string;
}

interface SouvenirCardProps {
  item: SouvenirItem;
}

export function SouvenirCard({ item }: SouvenirCardProps) {
  return (
    <Card className="overflow-hidden p-0 rounded-2xl bg-white border border-slate-200/90 hover:border-purple-300 hover:shadow-md transition-all flex flex-col justify-between group">
      <div>
        <div className="relative h-48 sm:h-52 w-full bg-slate-100 overflow-hidden">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover group-hover:scale-105 transition duration-300"
          />
          <div className="absolute top-3 left-3">
            <span className="bg-slate-900/90 px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white shadow-xs">
              {item.category}
            </span>
          </div>
        </div>

        <div className="p-4 sm:p-5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 block mb-1">
            📍 {item.origin}
          </span>
          <h3 className="font-serif font-black text-sm sm:text-base text-slate-900 mb-1 leading-snug group-hover:text-purple-700 transition">
            {item.name}
          </h3>
          <p className="text-base sm:text-lg font-black text-purple-700 mb-2">{item.price}</p>
          <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">{item.desc}</p>
        </div>
      </div>

      <div className="p-4 sm:p-5 pt-0">
        <Button
          asChild
          variant="primary"
          size="sm"
          className="w-full justify-center gap-2 rounded-xl font-bold text-xs bg-purple-700 hover:bg-purple-800 text-white shadow-xs h-10 cursor-pointer"
        >
          <a
            href={getSouvenirOrderWhatsAppUrl(item.name, item.price, item.origin)}
            target="_blank"
            rel="noreferrer"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Pesan / Tanya Stok via WA</span>
          </a>
        </Button>
      </div>
    </Card>
  );
}
