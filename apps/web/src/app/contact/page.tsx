import { Navbar } from "../../components/layout/navbar";
import { Footer } from "../../components/layout/footer";
import { ContactHero } from "../../features/public/contact/components/contact-hero";
import { ContactInfo } from "../../features/public/contact/components/contact-info";
import { ContactForm } from "../../features/public/contact/components/contact-form";
import { ContactMap } from "../../features/public/contact/components/contact-map";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#faf9fc] text-slate-900 font-sans selection:bg-purple-200 selection:text-purple-900">
      <Navbar />
      <ContactHero />

      <main className="max-w-6xl mx-auto px-4 py-10 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start mb-10">
          <div className="lg:col-span-6">
            <ContactInfo />
          </div>
          <div className="lg:col-span-6">
            <ContactForm />
          </div>
        </div>

        <ContactMap />
      </main>

      <Footer />
    </div>
  );
}
