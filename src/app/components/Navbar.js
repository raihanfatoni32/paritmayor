/* =========================================================
   Komponen Navbar — Portal Resmi Kelurahan Parit Mayor
   Sticky, dengan active-state otomatis per halaman
   ========================================================= */
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

/* ── Daftar menu navigasi ──────────────────────────────── */
const navLinks = [
  { href: "/", label: "Beranda" },
  { href: "/profil", label: "Profil" },
  { href: "/layanan", label: "Layanan" },
  { href: "/infografis", label: "Infografis" },
  { href: "/berita", label: "Berita" },
  { href: "/kontak", label: "Kontak" },
];

/* ── Ikon Hamburger ─────────────────────────────────────── */
function IconMenu({ open }) {
  return open ? (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none"
      viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  ) : (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none"
      viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
  );
}



/* ══════════════════════════════════════════════════════════
   KOMPONEN UTAMA NAVBAR
   ══════════════════════════════════════════════════════════ */
export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  if (pathname.startsWith("/admin")) return null;

  /* Tentukan apakah link aktif — exact match untuk beranda,
     prefix match untuk sub-halaman lain */
  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* ── Logo kiri ─────────────────────────────────── */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group"
            aria-label="Beranda Kelurahan Parit Mayor"
          >
            {/* Logo kelurahan — ganti /logo-parit-mayor.svg dengan file logo asli Anda */}
            <Image
              src="/logoparitmayor.png"
              alt="Logo Kelurahan Parit Mayor"
              width={40}
              height={40}
              className="flex-shrink-0 rounded-lg object-contain"
              priority
            />
            <span className="text-[15px] font-bold text-gray-800 leading-tight group-hover:text-[#0A58CA] transition-colors">
              Kelurahan Parit Mayor
            </span>
          </Link>

          {/* ── Menu Desktop ───────────────────────────────── */}
          <nav aria-label="Menu utama" className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`
                    px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150
                    ${active
                      ? "text-[#0A58CA] bg-blue-50 font-semibold"
                      : "text-gray-600 hover:text-[#0A58CA] hover:bg-gray-50"
                    }
                  `}
                >
                  {link.label}
                </Link>
              );
            })}
            {/* ── CTA Button ────────────────────────────────── */}
            <Link
              href="/layanan"
              id="btn-pusat-bantuan-nav"
              className="ml-3 inline-flex items-center gap-1.5 text-white text-sm font-semibold px-4 py-2 rounded-lg shadow-sm transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
              style={{ backgroundColor: "#198754" }}
            >
              Pusat Bantuan
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
              </svg>
            </Link>
          </nav>

          {/* ── Hamburger Mobile ───────────────────────────── */}
          <button
            type="button"
            className="md:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100 transition-colors"
            aria-label={isOpen ? "Tutup menu" : "Buka menu navigasi"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen(!isOpen)}
          >
            <IconMenu open={isOpen} />
          </button>
        </div>
      </div>

      {/* ── Mobile Menu Dropdown ───────────────────────────── */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white shadow-lg">
          <nav aria-label="Menu mobile" className="px-4 py-3 flex flex-col gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`
                    flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                    ${active
                      ? "text-[#0A58CA] bg-blue-50 font-semibold"
                      : "text-gray-700 hover:bg-gray-50 hover:text-[#0A58CA]"
                    }
                  `}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/layanan"
              onClick={() => setIsOpen(false)}
              className="mt-2 flex items-center justify-center gap-2 text-white text-sm font-semibold px-4 py-3 rounded-lg"
              style={{ backgroundColor: "#198754" }}
            >
              Pusat Bantuan
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
