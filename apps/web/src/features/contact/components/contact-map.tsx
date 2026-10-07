import { ExternalLink, Navigation } from "lucide-react";

export function ContactMap() {
  return (
    <div className="rounded-3xl bg-white border border-[#e9e8ea] p-4 sm:p-5 shadow-[0px_8px_30px_rgba(226,223,254,0.45)] flex flex-col h-full justify-between space-y-3">
      {/* Header Peta Minimalis */}
      <div className="flex items-center justify-between gap-2 px-1">
        <div className="flex items-center gap-1.5">
          <Navigation className="w-4 h-4 text-[#3c315b]" />
          <h2 className="text-sm sm:text-base font-medium text-[#1c1c1c] tracking-tight">
            Peta Lokasi Google Maps
          </h2>
        </div>

        <a
          href="https://maps.app.goo.gl/PskXAUZuGD7NeMoL7"
          target="_blank"
          rel="noreferrer"
          className="text-xs font-medium text-[#3c315b] hover:text-[#2d2445] hover:underline flex items-center gap-1 transition-colors shrink-0"
        >
          <span>Petunjuk Arah</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Iframe Peta */}
      <div className="relative w-full h-[340px] sm:h-full min-h-[340px] rounded-2xl overflow-hidden border border-[#e9e8ea] shadow-2xs">
        <iframe
          title="Peta Lokasi Penginapan Annisa Ambon"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4629.6179207921805!2d128.08701762720418!3d-3.7074615396397355!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2d6ce7a259d48e1b%3A0x304cec63773e589e!2sPenginapan%20Annisa!5e0!3m2!1sid!2sid!4v1787323500248!5m2!1sid!2sid"
          className="absolute inset-0 w-full h-full border-0"
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
    </div>
  );
}
