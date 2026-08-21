import { MessageSquare, PhoneCall } from "lucide-react";

export function ContactHero() {
  return (
    <section className="relative w-full bg-gradient-to-b from-[#faf9fc] via-[#f1eaff] to-[#faf9fc] pt-28 sm:pt-32 pb-10 sm:pb-14 px-4 text-center">
      <div className="max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-[10px] sm:text-xs font-bold shadow-2xs">
          <PhoneCall className="w-3.5 h-3.5 text-purple-700" />
          <span>LAYANAN BANTUAN &amp; RESERVASI 24 JAM</span>
        </div>

        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
          Hubungi Penginapan Annisa
        </h1>

        <p className="text-xs sm:text-sm md:text-base text-slate-600 font-normal max-w-xl mx-auto leading-relaxed">
          Punya pertanyaan seputar ketersediaan kamar, penjemputan bandara, atau oleh-oleh khas
          Maluku? Staf resepsionis kami siap melayani Anda.
        </p>
      </div>
    </section>
  );
}
