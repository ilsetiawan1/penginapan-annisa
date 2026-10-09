import type { Metadata } from "next";
import { ContactHero, ContactInfo } from "@/features/contact";

export const metadata: Metadata = {
  title: "Kontak & Lokasi Peta",
  description:
    "Lokasi strategis hanya 2-3 menit dari Bandara Pattimura Ambon di Jl. Bandara Pattimura, Tawiri. Hubungi kami via WhatsApp untuk reservasi dan petunjuk arah.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="w-full bg-[#fdfcfe] min-h-screen">
      {/* 1. Hero Section Standar Light Phantom */}
      <ContactHero />

      {/* 2. Main Content Split-Screen Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 mt-8 sm:mt-10 md:mt-12 relative z-20 mb-12 sm:mb-16">
        <ContactInfo />
      </main>
    </div>
  );
}
