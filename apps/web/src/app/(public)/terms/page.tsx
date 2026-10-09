import {
  ArrowLeft,
  CalendarCheck,
  Clock,
  CreditCard,
  FileText,
  HelpCircle,
  Home,
  ShieldAlert,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Syarat & Ketentuan | Penginapan Annisa Ambon",
  description:
    "Syarat dan ketentuan resmi reservasi kamar transit, jam check-in/check-out, kebijakan pembayaran, serta aturan menginap di Penginapan Annisa dekat Bandara Pattimura Ambon.",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
  return (
    <div className="w-full bg-[#fdfcfe] min-h-screen pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Navigation Breadcrumb / Back Link */}
        <div className="mb-6 sm:mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-[#86848d] hover:text-[#3c315b] transition-colors py-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Beranda</span>
          </Link>
        </div>

        {/* Page Header */}
        <header className="border-b border-[#e9e8ea] pb-6 sm:pb-8 mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f4f2f4] border border-[#e9e8ea] text-[#3c315b] text-xs font-normal mb-3 shadow-2xs">
            <FileText className="w-3.5 h-3.5 text-[#3c315b]" />
            <span>Dokumen Operasional Resmi</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-normal text-[#1c1c1c] tracking-[-0.025em] leading-tight">
            Syarat &amp; Ketentuan
          </h1>
          <p className="text-xs sm:text-sm text-[#86848d] mt-2 leading-relaxed">
            Terakhir diperbarui: 9 Oktober 2026 · Berlaku untuk seluruh reservasi kamar dan layanan
            di Penginapan Annisa.
          </p>
        </header>

        {/* Main Content Sections */}
        <div className="space-y-8 sm:space-y-10 text-[#1c1c1c] leading-relaxed text-sm sm:text-base">
          {/* 1. Ruang Lingkup Layanan */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-medium text-[#1c1c1c] tracking-tight flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#3c315b] text-white text-xs font-normal">
                1
              </span>
              Ruang Lingkup Layanan
            </h2>
            <div className="space-y-2.5 text-zinc-600 pl-8 text-xs sm:text-sm">
              <p>
                Website ini berfungsi sebagai media katalog informasi resmi mengenai fasilitas,
                ketersediaan unit kamar, tarif per malam, dan produk oleh-oleh khas Maluku di{" "}
                <strong>Penginapan Annisa</strong> (berlokasi di Tawiri, 2-3 menit dari Bandara
                Internasional Pattimura Ambon).
              </p>
              <p>
                Seluruh transaksi reservasi, negosiasi durasi transit, instruksi pembayaran
                transfer, serta pengiriman bukti bayar diproses secara langsung melalui saluran
                WhatsApp resmi penginapan demi memastikan komunikasi langsung dengan staf
                resepsionis kami.
              </p>
            </div>
          </section>

          {/* 2. Ketentuan Jam Operasional & Check-In / Check-Out */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-medium text-[#1c1c1c] tracking-tight flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#3c315b] text-white text-xs font-normal">
                2
              </span>
              Jam Operasional &amp; Check-In / Check-Out (WIT)
            </h2>
            <div className="pl-8 text-xs sm:text-sm text-zinc-600 space-y-3">
              <p>
                Seluruh aturan waktu operasional mengikuti{" "}
                <strong>Waktu Indonesia Timur (WIT)</strong>:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div className="bg-[#f4f2f4]/80 p-3.5 rounded-2xl border border-[#e9e8ea]">
                  <div className="flex items-center gap-1.5 text-[#3c315b] font-medium text-xs mb-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Layanan Resepsionis</span>
                  </div>
                  <p className="text-xs text-zinc-700 font-normal">
                    Pukul <strong>06:00 – 22:00 WIT</strong> setiap hari.
                  </p>
                </div>
                <div className="bg-[#f4f2f4]/80 p-3.5 rounded-2xl border border-[#e9e8ea]">
                  <div className="flex items-center gap-1.5 text-[#3c315b] font-medium text-xs mb-1">
                    <CalendarCheck className="w-3.5 h-3.5" />
                    <span>Waktu Check-In</span>
                  </div>
                  <p className="text-xs text-zinc-700 font-normal">
                    Mulai pukul <strong>14:00 WIT</strong>.
                  </p>
                </div>
                <div className="bg-[#f4f2f4]/80 p-3.5 rounded-2xl border border-[#e9e8ea]">
                  <div className="flex items-center gap-1.5 text-[#3c315b] font-medium text-xs mb-1">
                    <Home className="w-3.5 h-3.5" />
                    <span>Waktu Check-Out</span>
                  </div>
                  <p className="text-xs text-zinc-700 font-normal">
                    Maksimal pukul <strong>12:00 WIT</strong>.
                  </p>
                </div>
              </div>
              <p className="text-zinc-500 text-[11px] sm:text-xs">
                Permintaan <em>early check-in</em> (kedatangan pesawat dini hari) atau{" "}
                <em>late check-out</em> dapat dilayani berdasarkan ketersediaan kamar pada hari
                tersebut dan wajib dikonfirmasikan terlebih dahulu dengan staf kami.
              </p>
            </div>
          </section>

          {/* 3. Kebijakan Pembayaran & Penguncian Kamar */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-medium text-[#1c1c1c] tracking-tight flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#3c315b] text-white text-xs font-normal">
                3
              </span>
              Kebijakan Pembayaran &amp; Validasi Reservasi
            </h2>
            <div className="pl-8 text-xs sm:text-sm text-zinc-600 space-y-2.5">
              <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-4 text-amber-950 space-y-1.5">
                <div className="flex items-center gap-2 font-medium text-xs sm:text-sm text-amber-900">
                  <CreditCard className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>Klausul Penting: Status Kamar Terkunci</span>
                </div>
                <p className="text-xs leading-relaxed text-amber-900/90">
                  Unit kamar transit <strong>belum terkunci (belum sah terikat)</strong> hanya
                  dengan mengajukan chat reservasi. Status kamar baru dinyatakan terkunci secara
                  resmi setelah <strong>Uang Muka (DP minimal 50%)</strong> atau pelunasan telah
                  masuk ke rekening penginapan dan diverifikasi oleh staf admin kami.
                </p>
              </div>
              <ul className="list-disc pl-4 space-y-1.5 text-zinc-600">
                <li>
                  <strong>Batas Waktu Transfer (Time Limit):</strong> Admin akan memberikan batas
                  waktu pembayaran transfer saat instruksi diberikan via WhatsApp. Apabila hingga
                  batas waktu tersebut berakhir belum ada konfirmasi pembayaran, penginapan berhak
                  mengalihkan unit kamar kepada calon tamu lain atau tamu <em>walk-in</em>.
                </li>
                <li>
                  <strong>Rekening Resmi:</strong> Pembayaran transfer hanya sah apabila dikirimkan
                  ke rekening perbankan resmi yang diinformasikan langsung oleh nomor WhatsApp resmi
                  Penginapan Annisa. Kami tidak bertanggung jawab atas pembayaran ke rekening pihak
                  lain di luar konfirmasi kami.
                </li>
                <li>
                  <strong>Pelunasan:</strong> Sisa pembayaran sewa kamar dilunasi saat tamu
                  melakukan proses check-in di meja resepsionis (bisa tunai atau transfer instan).
                </li>
              </ul>
            </div>
          </section>

          {/* 4. Kebijakan Perubahan Jadwal & Pembatalan */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-medium text-[#1c1c1c] tracking-tight flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#3c315b] text-white text-xs font-normal">
                4
              </span>
              Perubahan Jadwal (Reschedule) &amp; Pembatalan
            </h2>
            <div className="pl-8 text-xs sm:text-sm text-zinc-600 space-y-2">
              <ul className="list-disc pl-4 space-y-1.5">
                <li>
                  <strong>Perubahan Jadwal:</strong> Tamu dapat mengajukan perubahan tanggal
                  kedatangan paling lambat <strong>24 jam sebelum jadwal check-in</strong>,
                  tergantung ketersediaan kamar pada tanggal pengganti.
                </li>
                <li>
                  <strong>Pembatalan Sepihak:</strong> Pembatalan yang dilakukan kurang dari 24 jam
                  sebelum waktu check-in, atau tamu tidak hadir tanpa pemberitahuan (
                  <em>no-show</em>), mengakibatkan uang muka (DP) yang telah dibayarkan{" "}
                  <strong>tidak dapat dikembalikan (non-refundable)</strong> sebagai kompensasi
                  penahanan unit kamar yang telah menolak reservasi tamu lain.
                </li>
                <li>
                  <strong>Kondisi Kahar (Force Majeure):</strong> Pembatalan akibat pembatalan
                  penerbangan maskapai atau bencana alam dapat didiskusikan secara fleksibel bersama
                  staf kami dengan menyertakan bukti kendala resmi dari pihak bandara/maskapai.
                </li>
              </ul>
            </div>
          </section>

          {/* 5. Tata Tertib & Keamanan Menginap */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-medium text-[#1c1c1c] tracking-tight flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#3c315b] text-white text-xs font-normal">
                5
              </span>
              Tata Tertib &amp; Aturan Menginap (House Rules)
            </h2>
            <div className="pl-8 text-xs sm:text-sm text-zinc-600 space-y-2">
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5 text-[#1c1c1c] font-medium text-xs sm:text-sm">
                  <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>Larangan Keras &amp; Ketertiban Umum</span>
                </div>
                <p>
                  Demi kenyamanan dan ketenangan seluruh tamu yang transit untuk penerbangan
                  berikutnya:
                </p>
                <ul className="list-disc pl-4 space-y-1.5">
                  <li>
                    Dilarang keras membawa, menyimpan, atau mengonsumsi narkotika, obat-obatan
                    terlarang, minuman keras berlebihan, senjata tajam, senjata api, atau bahan
                    berbahaya/mudah terbakar di seluruh area penginapan.
                  </li>
                  <li>
                    Tamu wajib menjaga ketenangan dan menghormati waktu istirahat tamu lain,
                    terutama pada jam istirahat malam (22:00 – 06:00 WIT).
                  </li>
                  <li>
                    Dilarang merusak atau membawa pulang perlengkapan kamar (handuk, seprai, remote
                    TV/AC, fasilitas kunci). Kerusakan atau kehilangan fasilitas kamar akibat
                    kelalaian tamu akan dikenakan biaya penggantian wajar.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* 6. Layanan Oleh-oleh Khas */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-medium text-[#1c1c1c] tracking-tight flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#3c315b] text-white text-xs font-normal">
                6
              </span>
              Layanan Pemesanan Oleh-oleh Khas Maluku
            </h2>
            <div className="pl-8 text-xs sm:text-sm text-zinc-600 space-y-2">
              <p>
                Pemesanan produk oleh-oleh (minyak kayu putih asli, minyak cengkeh, camilan khas)
                melalui web menggunakan skema <strong>titip ambil di meja resepsionis</strong>. Tamu
                dapat mengambil pesanan dan melakukan pembayaran langsung saat tiba di penginapan.
              </p>
            </div>
          </section>

          {/* Hubungi Bantuan */}
          <section className="pt-4 border-t border-[#e9e8ea]">
            <div className="bg-[#f4f2f4] rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-medium text-[#3c315b]">
                  <HelpCircle className="w-4 h-4 text-[#3c315b]" />
                  <span>Ada Pertanyaan Seputar Ketentuan?</span>
                </div>
                <p className="text-xs text-zinc-600">
                  Tim resepsionis kami siap membantu konfirmasi dan konsultasi perjalanan transit
                  Anda.
                </p>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-[#3c315b] hover:bg-[#2d2445] text-white text-xs font-normal transition-all active:scale-95 shadow-xs shrink-0"
              >
                Hubungi Penginapan
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
