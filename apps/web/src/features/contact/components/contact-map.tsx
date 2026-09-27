import { MapPin } from "lucide-react";

export function ContactMap() {
  return (
    <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm text-left">
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-1.5">
          <MapPin className="w-4 h-4 text-purple-700" />
          <span className="font-extrabold text-xs text-slate-900">Peta Lokasi Google Maps</span>
        </div>
        <a
          href="https://maps.app.goo.gl/PskXAUZuGD7NeMoL7"
          target="_blank"
          rel="noreferrer"
          className="text-[10px] font-bold text-purple-700 hover:underline"
        >
          Buka Layar Penuh ➔
        </a>
      </div>

      <div className="relative h-64 sm:h-72 w-full rounded-xl overflow-hidden border border-slate-100 shadow-inner">
        <iframe
          title="Peta Lokasi Penginapan Annisa"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3981.654877797746!2d128.0901237758778!3d-3.700344443422477!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2d6ce845b58309df%3A0xe5a3c032a13f7076!2sBandar%20Udara%20Internasional%20Pattimura!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid"
          className="absolute inset-0 w-full h-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
}
