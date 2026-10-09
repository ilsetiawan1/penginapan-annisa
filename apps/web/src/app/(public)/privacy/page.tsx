import {
  ArrowLeft,
  Cookie,
  Database,
  HelpCircle,
  Lock,
  Phone,
  Scale,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Kebijakan Privasi | Penginapan Annisa Ambon",
  description:
    "Kebijakan privasi dan komitmen pelindungan data pribadi (UU No. 27/2022) tamu di Penginapan Annisa dekat Bandara Pattimura Ambon.",
};

export default function PrivacyPage() {
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
            <ShieldCheck className="w-3.5 h-3.5 text-[#3c315b]" />
            <span>Kepatuhan UU PDP No. 27/2022</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-normal text-[#1c1c1c] tracking-[-0.025em] leading-tight">
            Kebijakan Privasi
          </h1>
          <p className="text-xs sm:text-sm text-[#86848d] mt-2 leading-relaxed">
            Terakhir diperbarui: 9 Oktober 2026 · Komitmen kami dalam menjaga dan melindungi privasi
            data pribadi tamu Penginapan Annisa.
          </p>
        </header>

        {/* Main Content Sections */}
        <div className="space-y-8 sm:space-y-10 text-[#1c1c1c] leading-relaxed text-sm sm:text-base">
          {/* 1. Komitmen & Landasan Hukum */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-medium text-[#1c1c1c] tracking-tight flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#3c315b] text-white text-xs font-normal">
                1
              </span>
              Landasan Hukum &amp; Komitmen Kami
            </h2>
            <div className="space-y-2.5 text-zinc-600 pl-8 text-xs sm:text-sm">
              <p>
                <strong>Penginapan Annisa</strong> menghormati hak privasi setiap tamu dan
                pengunjung website kami. Kebijakan ini disusun sebagai wujud kepatuhan terhadap{" "}
                <strong>
                  Undang-Undang Republik Indonesia Nomor 27 Tahun 2022 tentang Pelindungan Data
                  Pribadi (UU PDP)
                </strong>{" "}
                serta regulasi terkait transaksi elektronik.
              </p>
              <p>
                Dokumen ini menerangkan bagaimana kami mengumpulkan, menggunakan, menyimpan, dan
                menjaga informasi yang Anda berikan saat berinteraksi dengan layanan kami.
              </p>
            </div>
          </section>

          {/* 2. Jenis Data yang Dikumpulkan */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-medium text-[#1c1c1c] tracking-tight flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#3c315b] text-white text-xs font-normal">
                2
              </span>
              Data Pribadi yang Kami Kumpulkan
            </h2>
            <div className="pl-8 text-xs sm:text-sm text-zinc-600 space-y-3">
              <p>
                Kami hanya mengumpulkan data yang bersifat umum dan relevan untuk keperluan
                operasional penginapan transit:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="bg-[#f4f2f4]/80 p-3.5 rounded-2xl border border-[#e9e8ea]">
                  <div className="flex items-center gap-1.5 text-[#3c315b] font-medium text-xs mb-1">
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>Identitas Kontak Dasar</span>
                  </div>
                  <p className="text-xs text-zinc-700 font-normal">
                    Nama tamu dan nomor telepon aktif / nomor WhatsApp untuk komunikasi langsung
                    saat kedatangan.
                  </p>
                </div>
                <div className="bg-[#f4f2f4]/80 p-3.5 rounded-2xl border border-[#e9e8ea]">
                  <div className="flex items-center gap-1.5 text-[#3c315b] font-medium text-xs mb-1">
                    <Phone className="w-3.5 h-3.5" />
                    <span>Informasi Kunjungan Transit</span>
                  </div>
                  <p className="text-xs text-zinc-700 font-normal">
                    Tanggal check-in, estimasi jam tiba dari Bandara Pattimura, tipe kamar yang
                    dipilih, dan pesanan oleh-oleh (bila ada).
                  </p>
                </div>
              </div>
              <p className="text-zinc-500 text-[11px] sm:text-xs">
                Kami <strong>tidak pernah meminta atau mengumpulkan</strong> data finansial sensitif
                seperti nomor kartu kredit, PIN, atau kata sandi rekening bank Anda.
              </p>
            </div>
          </section>

          {/* 3. Tujuan & Alur Pemrosesan Data */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-medium text-[#1c1c1c] tracking-tight flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#3c315b] text-white text-xs font-normal">
                3
              </span>
              Tujuan &amp; Alur Penggunaan Data
            </h2>
            <div className="pl-8 text-xs sm:text-sm text-zinc-600 space-y-2.5">
              <p>Seluruh data yang Anda sampaikan digunakan semata-mata untuk tujuan:</p>
              <ul className="list-disc pl-4 space-y-1.5 text-zinc-600">
                <li>
                  <strong>Validasi Reservasi:</strong> Memastikan kamar transit Anda telah disiapkan
                  bersih dan pendingin ruangan siap pakai sebelum Anda tiba di penginapan.
                </li>
                <li>
                  <strong>Komunikasi Kedatangan:</strong> Memudahkan koordinasi penjemputan atau
                  petunjuk arah jalan dari Bandara Pattimura Ambon (jarak 2-3 menit perjalanan).
                </li>
                <li>
                  <strong>Penyiapan Oleh-oleh:</strong> Menyiapkan paket minyak kayu putih, minyak
                  cengkeh, atau camilan khas yang Anda pesan agar siap diserahkan saat check-in.
                </li>
                <li>
                  <strong>Pencatatan &amp; Pembukuan Internal:</strong> Staf administrasi mencatat
                  rekap data tamu ke database sistem operasional internal untuk laporan berkala dan
                  pembukuan resmi penginapan.
                </li>
              </ul>
            </div>
          </section>

          {/* 4. Jaminan Tanpa Pihak Ketiga */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-medium text-[#1c1c1c] tracking-tight flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#3c315b] text-white text-xs font-normal">
                4
              </span>
              Jaminan Keamanan &amp; Tidak Ada Penjualan Data
            </h2>
            <div className="pl-8 text-xs sm:text-sm text-zinc-600 space-y-2.5">
              <div className="bg-emerald-50 border border-emerald-200/80 rounded-2xl p-4 text-emerald-950 space-y-1.5">
                <div className="flex items-center gap-2 font-medium text-xs sm:text-sm text-emerald-900">
                  <Lock className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Jaminan Privasi Penginapan Annisa</span>
                </div>
                <p className="text-xs leading-relaxed text-emerald-900/90">
                  Kami{" "}
                  <strong>
                    menjamin tidak akan pernah menjual, menyewakan, membagikan, atau menyebarluaskan
                  </strong>{" "}
                  nama maupun nomor WhatsApp Anda kepada pihak ketiga mana pun untuk keperluan
                  periklanan, spam, pinjaman, atau telemarketing.
                </p>
              </div>
              <p>
                Data hanya diakses oleh pemilik dan staf administrasi operasional Penginapan Annisa
                yang terikat tugas pelayanan tamu.
              </p>
            </div>
          </section>

          {/* 5. Penyimpanan Lokal & Cookies */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-medium text-[#1c1c1c] tracking-tight flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#3c315b] text-white text-xs font-normal">
                5
              </span>
              Penggunaan Cookies &amp; Penyimpanan Lokal
            </h2>
            <div className="pl-8 text-xs sm:text-sm text-zinc-600 space-y-2">
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5 text-[#1c1c1c] font-medium text-xs sm:text-sm">
                  <Cookie className="w-4 h-4 text-[#3c315b] shrink-0" />
                  <span>Hanya Kebutuhan Fungsional Esensial</span>
                </div>
                <p>
                  Website ini tidak menggunakan <em>tracking cookies</em> lintas situs atau pelacak
                  pihak ketiga. Penggunaan penyimpanan lokal peramban (<em>local storage</em>)
                  semata-mata untuk:
                </p>
                <ul className="list-disc pl-4 space-y-1.5">
                  <li>
                    Menyimpan produk oleh-oleh di keranjang belanja saat Anda menjelajahi website.
                  </li>
                  <li>
                    Kebutuhan otentikasi login aman bagi staf admin di portal manajemen kamar
                    internal.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* 6. Hak Anda atas Data Pribadi */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-medium text-[#1c1c1c] tracking-tight flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#3c315b] text-white text-xs font-normal">
                6
              </span>
              Hak Subjek Data Pribadi (UU PDP)
            </h2>
            <div className="pl-8 text-xs sm:text-sm text-zinc-600 space-y-2">
              <p>Sesuai hak yang dijamin dalam UU PDP No. 27/2022, Anda berhak:</p>
              <ul className="list-disc pl-4 space-y-1.5">
                <li>Mengetahui kejelasan identitas data yang kami simpan.</li>
                <li>Meminta perbaikan data kontak Anda bila terdapat kekeliruan pencatatan.</li>
                <li>
                  Mengajukan permohonan penghapusan riwayat nomor kontak Anda dari daftar
                  operasional kami setelah proses menginap dan kewajiban administrasi selesai.
                </li>
              </ul>
            </div>
          </section>

          {/* Hubungi Bantuan */}
          <section className="pt-4 border-t border-[#e9e8ea]">
            <div className="bg-[#f4f2f4] rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-medium text-[#3c315b]">
                  <Scale className="w-4 h-4 text-[#3c315b]" />
                  <span>Klarifikasi Terkait Pelindungan Data?</span>
                </div>
                <p className="text-xs text-zinc-600">
                  Untuk permintaan perubahan atau penghapusan data, silakan hubungi admin kami
                  melalui kontak resmi.
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
