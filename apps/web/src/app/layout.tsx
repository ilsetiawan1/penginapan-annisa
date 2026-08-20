import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Penginapan Annisa — Penginapan Transit 750m dari Bandara Pattimura Ambon",
  description:
    "Penginapan transit nyaman, bersih, dan hemat hanya 750 meter dari Bandara Internasional Pattimura Ambon. Dilengkapi AC/Kipas, WiFi gratis, kamar mandi dalam, dan etalase oleh-oleh khas Maluku.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${plusJakarta.variable} ${outfit.variable}`}>
      <body
        className={`${plusJakarta.className} antialiased bg-[#faf9fc] text-slate-900 selection:bg-purple-200 selection:text-purple-900`}
      >
        {children}
      </body>
    </html>
  );
}
