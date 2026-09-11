import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
import { SITE_CONTENT } from "@/content/site";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz", "SOFT", "WONK"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Angles Natural — Ciencia, Innovación y Propósito",
  description: "Plataforma oficial de bienestar y suplementación funcional desarrollada desde Bolivia por Andrea Angles. Ciencia, valor a materias primas y economía circular.",
  metadataBase: new URL("https://angles-natural-plus.vercel.app"),
  keywords: [
    "Angles Natural",
    "Andrea Angles",
    "NutriQ",
    "Suplementación Funcional",
    "Bolivia",
    "Tarwi",
    "Cañahua",
    "Angles Circular",
    "Ciencia y Naturaleza",
    "Sostenibilidad",
  ],
  authors: [{ name: "Andrea Angles" }],
  creator: "Angles Natural",
  publisher: "Angles Natural",
  openGraph: {
    title: "Angles Natural — Ciencia, Innovación y Propósito",
    description: "Plataforma oficial de bienestar y suplementación funcional desarrollada desde Bolivia.",
    url: "https://anglesnatural.com",
    siteName: "Angles Natural",
    locale: "es_BO",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/brand/logo.png",
    apple: "/brand/logo.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#0F3E2E",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${fraunces.variable} ${manrope.variable} scroll-smooth`}>
      <body className="font-sans antialiased bg-brand-paper text-brand-ink min-h-screen flex flex-col selection:bg-brand-emerald selection:text-white">
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}