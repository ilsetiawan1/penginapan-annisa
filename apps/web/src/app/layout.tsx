import type { Metadata, Viewport } from "next";
import { Outfit, Poppins } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#7a68b7",
};

export const metadata: Metadata = {
  title: "Penginapan Annisa: Penginapan Transit 2-3 Menit dari Bandara Pattimura Ambon",
  description:
    "Penginapan transit nyaman, bersih, dan hemat hanya 2-3 menit dari Bandara Internasional Pattimura Ambon. Dilengkapi AC/Kipas, WiFi gratis, kamar mandi dalam, dan etalase oleh-oleh khas Maluku.",
  icons: {
    icon: [
      { url: "/images/branding/favicon.ico" },
      { url: "/images/branding/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/images/branding/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/images/branding/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${poppins.variable} ${outfit.variable}`}>
      <body
        className={`${poppins.className} antialiased bg-[#faf9fc] text-slate-900 selection:bg-purple-200 selection:text-purple-900`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
