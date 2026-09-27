import { FloatingWhatsApp } from "@/components/layout/floating-whatsapp";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-[#faf9fc] text-slate-900 font-sans selection:bg-purple-200 selection:text-purple-900">
      <Navbar />
      <main className="flex-1 w-full">{children}</main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
