import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#7e22ce",
};

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
    <html lang="id" className={poppins.variable}>
      <body
        className={`${poppins.className} antialiased bg-[#faf9fc] text-slate-900 selection:bg-purple-200 selection:text-purple-900`}
      >
        {children}
      </body>
    </html>
  );
}
