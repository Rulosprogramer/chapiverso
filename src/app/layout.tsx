import type { Metadata } from "next";
import { Anton, Barlow } from "next/font/google";
import "./globals.css";

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
  title: "Chapiverso — Donde la Cultura se Encuentra",
  description:
    "Plataforma de articulación cultural en La Playa, Chapinero Central, Bogotá. Donde la cultura se encuentra, se transforma y se vive.",
  keywords: ["cultura", "bogotá", "chapinero", "arte", "música", "teatro", "moda", "LGBTI", "La Playa"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${anton.variable} ${barlow.variable}`}>
      <body className="bg-[#556EFF] text-white antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
