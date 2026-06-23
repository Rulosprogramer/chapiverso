import type { Metadata } from "next";
import { Anton, Barlow } from "next/font/google";
import "./globals.css";
import mainEventData from "@/data/mainEvent.json";

function buildSubEvents() {
  return mainEventData.days.map((day) => ({
    "@type": "Event",
    name: day.label,
    startDate: day.date,
    location: {
      "@type": "Place",
      name: "Sector La Playa — Chapinero Central",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Chapinero",
        addressRegion: "Bogotá",
        addressCountry: "CO",
      },
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "COP",
      availability: "https://schema.org/InStock",
    },
  }));
}

const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://chapiverso.com/#organization",
  name: "Chapiverso",
  description:
    "Chapiverso es una plataforma cultural de Chapinero Central en Bogotá que conecta música, teatro, moda, arte urbano, comunidad y experiencias culturales durante todo el año.",
  url: "https://chapiverso.com",
  logo: "https://chapiverso.com/logo-chapiverso-white.png",
  sameAs: ["https://instagram.com/chapiverso"],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bogotá",
    addressRegion: "Chapinero",
    addressCountry: "CO",
  },
  areaServed: {
    "@type": "City",
    name: "Bogotá",
  },
  knowsAbout: [
    "Música", "Teatro", "Moda", "Arte Urbano",
    "Cultura Comunitaria", "Huertas Urbanas", "Circo",
  ],
};

const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://chapiverso.com/#website",
  name: "Chapiverso",
  url: "https://chapiverso.com",
  inLanguage: "es-CO",
  publisher: { "@id": "https://chapiverso.com/#organization" },
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: "https://chapiverso.com" },
    { "@type": "ListItem", position: 2, name: "Programa", item: "https://chapiverso.com/#programa" },
    { "@type": "ListItem", position: 3, name: "Agenda", item: "https://chapiverso.com/#agenda" },
    { "@type": "ListItem", position: 4, name: "Nosotros", item: "https://chapiverso.com/#nosotros" },
  ],
};

const eventLd = {
  "@context": "https://schema.org",
  "@type": "Festival",
  "@id": "https://chapiverso.com/#festival",
  name: "Chapiverso 2026",
  description:
    "Festival cultural en La Playa, Chapinero Central, Bogotá. Música, teatro, moda, comunidad, huertas, circo y bares.",
  url: "https://chapiverso.com",
  startDate: mainEventData.days[0].date,
  endDate: mainEventData.days[mainEventData.days.length - 1].date,
  location: {
    "@type": "Place",
    name: "Sector La Playa — Chapinero Central",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Sector La Playa, entre Calle 55 y Calle 60",
      addressLocality: "Chapinero",
      addressRegion: "Bogotá",
      addressCountry: "CO",
    },
  },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "COP",
    availability: "https://schema.org/InStock",
  },
  organizer: { "@id": "https://chapiverso.com/#organization" },
  subEvent: buildSubEvents(),
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "¿Qué es Chapiverso?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Chapiverso es una plataforma de articulación cultural en La Playa, Chapinero Central, Bogotá, que reúne música, teatro, moda, comunidad, huertas, circo y bares en un solo territorio.",
      },
    },
    {
      "@type": "Question",
      name: "¿Cuándo es el evento principal?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "El evento principal de Chapiverso se realiza del 4 al 6 de junio de 2026 en el Sector de La Playa, Chapinero Central, Bogotá. Entrada libre en espacio público.",
      },
    },
    {
      "@type": "Question",
      name: "¿La entrada tiene costo?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No, todas las actividades de Chapiverso son de entrada libre. El evento se realiza en espacio público en el Sector de La Playa, Chapinero Central, Bogotá.",
      },
    },
    {
      "@type": "Question",
      name: "¿Dónde queda el Sector de La Playa?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "La Playa está ubicada en Chapinero Central, Bogotá, entre las calles 55 y 60 con carreras 7 y 13. El punto de encuentro principal es el Parque de los Hippies (Calle 60 con Cra 7).",
      },
    },
    {
      "@type": "Question",
      name: "¿Qué actividades hay en Chapiverso?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Chapiverso incluye música en vivo, teatro, pasarelas de moda, talleres de huerta urbana, circo contemporáneo, batallas de freestyle, recorridos artísticos, conversatorios LGBTI+, ferias de diseño y muestras audiovisuales.",
      },
    },
  ],
};

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Chapiverso Bogotá | Agenda Cultural de Chapinero Central",
  description:
    "Chapiverso es una plataforma cultural de Chapinero Central en Bogotá que conecta música, teatro, moda, arte urbano, comunidad y experiencias culturales durante todo el año.",
  keywords: ["cultura", "bogotá", "chapinero", "arte", "música", "teatro", "moda", "LGBTI", "La Playa"],
  metadataBase: new URL("https://chapiverso.com"),
  alternates: {
    canonical: "https://chapiverso.com",
  },
  openGraph: {
    title: "Chapiverso Bogotá | Agenda Cultural de Chapinero Central",
    description:
      "Chapiverso es una plataforma cultural de Chapinero Central en Bogotá que conecta música, teatro, moda, arte urbano, comunidad y experiencias culturales durante todo el año.",
    url: "https://chapiverso.com",
    siteName: "Chapiverso",
    locale: "es_CO",
    type: "website",
    images: [
      {
        url: "/logo-chapiverso-white.png",
        width: 1200,
        height: 1200,
        alt: "Chapiverso Bogotá | Agenda Cultural de Chapinero Central",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chapiverso Bogotá | Agenda Cultural de Chapinero Central",
    description:
      "Chapiverso es una plataforma cultural de Chapinero Central en Bogotá que conecta música, teatro, moda, arte urbano, comunidad y experiencias culturales durante todo el año.",
    images: ["/logo-chapiverso-white.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${anton.variable} ${barlow.variable}`}>
      <body className="bg-[#556EFF] text-white antialiased min-h-screen">
        <JsonLd data={organizationLd} />
        <JsonLd data={websiteLd} />
        <JsonLd data={breadcrumbLd} />
        <JsonLd data={eventLd} />
        <JsonLd data={faqLd} />
        {children}
      </body>
    </html>
  );
}
