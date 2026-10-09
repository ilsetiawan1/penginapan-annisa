export function JsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LodgingBusiness",
        "@id": "https://www.penginapanannisa.com/#hotel",
        name: "Penginapan Annisa",
        alternateName: [
          "Penginapan Annisa Ambon",
          "Penginapan Annisa Bandara Pattimura",
          "Hotel Transit Annisa Ambon",
        ],
        description:
          "Penginapan transit nyaman, bersih, dan hemat hanya 2-3 menit dari Bandara Internasional Pattimura Ambon. Dilengkapi kamar AC/Kipas, kamar mandi dalam, WiFi gratis, dan etalase oleh-oleh khas Maluku.",
        url: "https://www.penginapanannisa.com",
        telephone: "+6281242163116",
        priceRange: "Rp 200.000 - Rp 275.000",
        currenciesAccepted: "IDR",
        paymentAccepted: "Cash, Bank Transfer, QRIS",
        checkinTime: "06:00",
        checkoutTime: "12:00",
        image: "https://www.penginapanannisa.com/images/heroes/home-hero.webp",
        logo: "https://www.penginapanannisa.com/images/branding/logo.png",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Jl. Bandara Pattimura, Tawiri",
          addressLocality: "Teluk Ambon",
          addressRegion: "Maluku",
          postalCode: "97237",
          addressCountry: "ID",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: -3.7088,
          longitude: 128.0935,
        },
        hasMap: "https://maps.app.goo.gl/PskXAUZuGD7NeMoL7",
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ],
            opens: "06:00",
            closes: "22:00",
          },
        ],
        amenityFeature: [
          {
            "@type": "LocationFeatureSpecification",
            name: "AC",
            value: true,
          },
          {
            "@type": "LocationFeatureSpecification",
            name: "Kamar Mandi Dalam",
            value: true,
          },
          {
            "@type": "LocationFeatureSpecification",
            name: "WiFi Gratis",
            value: true,
          },
          {
            "@type": "LocationFeatureSpecification",
            name: "TV",
            value: true,
          },
          {
            "@type": "LocationFeatureSpecification",
            name: "Handuk Bersih",
            value: true,
          },
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://www.penginapanannisa.com/#website",
        url: "https://www.penginapanannisa.com",
        name: "Penginapan Annisa",
        description: "Penginapan Transit 2-3 Menit dari Bandara Pattimura Ambon",
        publisher: {
          "@id": "https://www.penginapanannisa.com/#hotel",
        },
        inLanguage: "id-ID",
        hasPart: [
          {
            "@type": "WebPage",
            "@id": "https://www.penginapanannisa.com/rooms",
            name: "Pilihan Kamar",
            description: "Katalog 8 unit kamar transit ber-AC & Kipas dengan kamar mandi dalam",
            url: "https://www.penginapanannisa.com/rooms",
          },
          {
            "@type": "WebPage",
            "@id": "https://www.penginapanannisa.com/souvenirs",
            name: "Oleh-Oleh Khas",
            description: "Minyak kayu putih asli Namlea dan aneka cemilan khas Maluku",
            url: "https://www.penginapanannisa.com/souvenirs",
          },
          {
            "@type": "WebPage",
            "@id": "https://www.penginapanannisa.com/contact",
            name: "Kontak & Peta Lokasi",
            description: "Petunjuk arah jalan dari Bandara Pattimura dan kontak WhatsApp resepsionis",
            url: "https://www.penginapanannisa.com/contact",
          },
          {
            "@type": "WebPage",
            "@id": "https://www.penginapanannisa.com/articles",
            name: "Artikel Wisata",
            description: "Panduan wisata dan tips transit penerbangan di Ambon",
            url: "https://www.penginapanannisa.com/articles",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": "https://www.penginapanannisa.com/#faq",
        name: "Pertanyaan Seputar Transit & Layanan Penginapan Annisa",
        mainEntity: [
          {
            "@type": "Question",
            name: "Berapa jarak dari Bandara Pattimura ke Penginapan Annisa?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Hanya 2-3 menit perjalanan dari Bandara Internasional Pattimura Ambon. Anda bisa jalan kaki santai atau berkendara singkat tanpa khawatir macet atau ketinggalan pesawat.",
            },
          },
          {
            "@type": "Question",
            name: "Bagaimana jika saya check-in pagi hari (misal jam 07:00 WIT)?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Penginapan kami buka melayani tamu dari jam 06:00 pagi hingga 22:00 malam WIT. Jika Anda tiba dengan penerbangan pagi, Anda bisa langsung masuk istirahat jika kamar sudah selesai dibersihkan.",
            },
          },
          {
            "@type": "Question",
            name: "Bagaimana cara pesan kamar dan cara pembayarannya?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Pilih tanggal dan tipe kamar pada formulir, lalu pesan instan via WhatsApp. Untuk mengunci kamar, cukup bayar DP 50% via transfer bank atau QRIS, dan sisa pembayaran dilunasi saat tiba di lokasi.",
            },
          },
          {
            "@type": "Question",
            name: "Apakah seluruh kamar mandi berada di dalam kamar?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Ya, seluruh unit kamar di Penginapan Annisa telah dilengkapi kamar mandi pribadi di dalam kamar.",
            },
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
