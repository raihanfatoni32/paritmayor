/* =========================================================
   Root Layout — Portal Resmi Kelurahan Parit Mayor
   Membungkus Navbar + children + Footer di semua halaman
   ========================================================= */

import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AccessibilityWidget from "./components/AccessibilityWidget";

/* Konfigurasi font Inter dari Google Fonts */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

/* ── SEO Metadata Global ─────────────────────────────────── */
export const metadata = {
  title: {
    default: "Portal Resmi Kelurahan Parit Mayor | Pontianak Timur",
    template: "%s | Kelurahan Parit Mayor",
  },
  description:
    "Pusat informasi, transparansi tata kelola, dan layanan publik digital Kelurahan Parit Mayor, Kecamatan Pontianak Timur. Unduh formulir administrasi kependudukan secara mandiri.",
  keywords: [
    "Kelurahan Parit Mayor",
    "Pontianak Timur",
    "Layanan Publik",
    "Administrasi Kependudukan",
    "Surat Pengantar",
    "KK",
    "KTP",
    "SKTM",
    "Kalimantan Barat",
  ],
  authors: [{ name: "Kelurahan Parit Mayor" }],
  metadataBase: new URL("https://paritmayor.pontianak.go.id"),
};

/* ══════════════════════════════════════════════════════════
   ROOT LAYOUT — membungkus semua halaman
   ══════════════════════════════════════════════════════════ */
export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`${inter.variable} h-full antialiased`}>
      <body className={`${inter.className} min-h-screen flex flex-col bg-[#F8F9FA]`}>

        {/* ── Navbar Sticky ─────────────────────────────── */}
        <Navbar />

        {/* ── Konten Utama Halaman ───────────────────────── */}
        <main className="flex-1">
          {children}
        </main>

        {/* ── Footer Global ─────────────────────────────── */}
        <Footer />

        {/* ── Widget Aksesibilitas Melayang ───────────── */}
        {/* Dipasang di sini agar tersedia di semua halaman */}
        <AccessibilityWidget />

      </body>
    </html>
  );
}
