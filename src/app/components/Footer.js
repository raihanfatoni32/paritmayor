/* =========================================================
   Komponen Footer — Portal Resmi Kelurahan Parit Mayor
   Footer biru gelap 4 kolom yang konsisten di semua halaman
   ========================================================= */

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/* ── Ikon Instansi ──────────────────────────────────────── */
function BuildingIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M2 22V12L12 2l10 10v10H2zm2-2h5v-5h6v5h5v-9.17L12 4.83 4 12.83V20z"/>
    </svg>
  );
}

/* ── Komponen link sosial media ──────────────────────────── */
function SosmedLink({ href, label }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-300 hover:text-white text-sm transition-colors hover:underline"
    >
      {label}
    </a>
  );
}

/* ══════════════════════════════════════════════════════════
   KOMPONEN UTAMA FOOTER
   ══════════════════════════════════════════════════════════ */
export default function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  return (
    <footer
      aria-label="Footer Kelurahan Parit Mayor"
      style={{ backgroundColor: "#052c65" }}
      className="text-blue-100 mt-auto"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Kolom 1 — Identitas Kelurahan */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <span className="rounded-md p-1.5 flex-shrink-0 text-white" style={{ backgroundColor: "#198754" }} aria-hidden="true">
                <BuildingIcon />
              </span>
              <span className="font-bold text-white text-base">Kelurahan Parit Mayor</span>
            </div>
            <p className="text-blue-300 text-sm leading-relaxed mb-4">
              Melayani masyarakat dengan profesional, transparan, dan sepenuh hati di Kecamatan Pontianak Timur.
            </p>
            {/* Sosial Media */}
            <div className="flex flex-col gap-1.5">
              <SosmedLink href="https://facebook.com" label="📘 Facebook" />
              <SosmedLink href="https://instagram.com" label="📸 Instagram" />
              <SosmedLink href="https://youtube.com"   label="▶️ YouTube" />
            </div>
          </div>

          {/* Kolom 2 — Informasi & Lokasi */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Informasi
            </h3>
            <ul className="space-y-2.5 text-blue-300 text-sm">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 flex-shrink-0" aria-hidden="true">📍</span>
                <span>Jl. Tanjung Raya II, Parit Mayor, Pontianak Timur</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 flex-shrink-0" aria-hidden="true">🕐</span>
                <span>Jam Operasional: 08.00 – 15.30 WIB</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 flex-shrink-0" aria-hidden="true">🏛️</span>
                <span>Pemerintah Kota Pontianak</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 flex-shrink-0" aria-hidden="true">📞</span>
                <a href="tel:+6285732973097" className="hover:text-white transition-colors">
                  085732973097
                </a>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 flex-shrink-0" aria-hidden="true">✉️</span>
                <a href="mailto:kelurahan.paritmayor@pontianak.go.id" className="hover:text-white transition-colors break-all">
                  kel.paritmayor@pontianak.go.id
                </a>
              </li>
            </ul>
          </div>

          {/* Kolom 3 — Navigasi Cepat */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Navigasi
            </h3>
            <ul className="space-y-2">
              {[
                { href: "/",          label: "Beranda" },
                { href: "/profil",    label: "Profil Kelurahan" },
                { href: "/layanan",   label: "Layanan & Formulir" },
                { href: "/infografis",label: "Infografis Data" },
                { href: "/berita",    label: "Berita & Kegiatan" },
                { href: "/kontak",    label: "Kontak & Pengaduan" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-blue-300 hover:text-white text-sm transition-colors hover:underline"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kolom 4 — Tautan Terkait */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Tautan Terkait
            </h3>
            <ul className="space-y-2">
              {[
                { href: "https://pontianak.go.id",      label: "Pemkot Pontianak" },
                { href: "https://kalteng.go.id",         label: "Pemprov Kalbar" },
                { href: "https://dukcapil.go.id",        label: "Dukcapil" },
                { href: "#",                              label: "Portal PPID" },
              ].map(({ href, label }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-300 hover:text-white text-sm transition-colors hover:underline"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-2">
          {/*
            ── SHORTCUT TERSEMBUNYI ADMIN ─────────────────────────────
            Dibungkus Link redup — tampak seperti teks biasa bagi warga.
            Klik untuk masuk ke halaman login admin tanpa diketahui umum.
            ──────────────────────────────────────────────────────────── */}
          <Link
            href="/admin/login"
            id="hidden-admin-shortcut"
            className="text-blue-400/70 hover:text-blue-400 text-xs text-center transition-colors duration-300 cursor-default select-none"
            title=""
            aria-hidden="true"
            tabIndex={-1}
          >
            © 2026 Pemerintah Kelurahan Parit Mayor. Hak Cipta Dilindungi Undang-Undang.
          </Link>
          <div className="flex gap-4">
            <a href="#" className="text-blue-400 hover:text-white text-xs transition-colors">Kebijakan Privasi</a>
            <a href="#" className="text-blue-400 hover:text-white text-xs transition-colors">Syarat &amp; Ketentuan</a>
            <a href="#" className="text-blue-400 hover:text-white text-xs transition-colors">Peta Situs</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
