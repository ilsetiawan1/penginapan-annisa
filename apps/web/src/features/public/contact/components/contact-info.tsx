import { Clock, Mail, MapPin, Navigation, Phone } from "lucide-react";
import { ANNISA_WA_NUMBER } from "../../../../lib/whatsapp";

export function ContactInfo() {
  return (
    <div className="space-y-4 text-left">
      <div className="bg-white/90 backdrop-blur-md rounded-2xl p-5 border border-purple-100 shadow-2xs">
        <h3 className="font-extrabold text-base text-slate-950 mb-3">
          Informasi Kontak Langsung
        </h3>

        <ul className="space-y-3.5 text-xs text-slate-700">
          <li className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center shrink-0 mt-0.5">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-slate-900">WhatsApp &amp; Telepon</p>
              <a
                href={`https://wa.me/${ANNISA_WA_NUMBER}`}
                target="_blank"
                rel="noreferrer"
                className="text-purple-700 hover:underline font-semibold"
              >
                0812-4216-3116 (+62 812-4216-3116)
              </a>
            </div>
          </li>

          <li className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center shrink-0 mt-0.5">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-slate-900">Alamat Penginapan</p>
              <p className="text-slate-600 leading-relaxed">
                Jl. Bandara Pattimura, Tawiri, Ambon, Maluku (750 meter dari gerbang bandara).
              </p>
            </div>
          </li>

          <li className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center shrink-0 mt-0.5">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-slate-900">Jam Operasional</p>
              <p className="text-slate-600">
                Resepsionis: 06:00 – 22:00 WIT (Setiap Hari)
              </p>
            </div>
          </li>
        </ul>
      </div>

      <div className="bg-purple-50/90 rounded-2xl p-4 border border-purple-100 text-xs text-slate-700">
        <div className="flex items-center gap-2 mb-1.5 text-purple-900 font-bold">
          <Navigation className="w-4 h-4 text-purple-700" />
          <span>Panduan Rute Cepat:</span>
        </div>
        <p className="text-slate-600 leading-relaxed">
          Keluar dari terminal Bandara Pattimura ➔ Jalan lurus 500m ➔ Belok kanan di gapura Tawiri ➔ Penginapan Annisa 250m di sebelah kiri jalan.
        </p>
      </div>
    </div>
  );
}
