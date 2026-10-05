import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen w-full bg-slate-50/60 flex flex-col justify-between items-center p-6 sm:p-10">
      {/* Header Atas */}
      <header className="flex flex-col items-center">
        <Image
          src="/images/branding/logo.png"
          alt="Logo Penginapan Annisa"
          width={36}
          height={36}
          priority
          className="rounded-xl shadow-2xs mb-2"
        />
        <span className="text-xs font-semibold text-slate-800 tracking-tight">
          Penginapan Annisa
        </span>
      </header>

      {/* Konten Tengah (Wadah Card Bersih) */}
      <div className="max-w-md w-full bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-10 text-center shadow-xl shadow-slate-100 my-auto">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold uppercase tracking-wider mb-6">
          404 • Halaman Tidak Ditemukan
        </span>

        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
          Halaman tidak ditemukan
        </h1>

        <p className="text-xs sm:text-sm text-slate-500 mt-2 mb-8 leading-relaxed">
          Tautan yang Anda tuju mungkin salah, telah dihapus, atau dipindahkan ke alamat lain.
        </p>

        <Link
          href="/"
          className="h-11 px-6 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm transition-all shadow-xs inline-flex items-center justify-center gap-2 w-full"
        >
          Kembali ke Beranda
        </Link>
      </div>

      {/* Footer Bawah */}
      <footer className="text-center">
        <p className="text-[11px] text-slate-400">
          © Penginapan Annisa Ambon • Layanan Tamu &amp; Reservasi
        </p>
      </footer>
    </main>
  );
}
