/* =========================================================
   HALAMAN KONTAK & PENGADUAN — Portal Resmi Kelurahan Parit Mayor
   Sliced dari Figma Frame 6
   Mencakup: Info kontak resmi, Google Maps placeholder,
             Diagram alur pengaduan 5 langkah,
             Formulir pengaduan WhatsApp interaktif
   ========================================================= */
"use client";

import { useState } from "react";
import Link from "next/link";

/* ── Data Informasi Kontak Resmi ─────────────────────────── */
const kontakInfo = [
  {
    id: "wa-hotline",
    label: "WA Hotline",
    value: "085732973097",
    sub: "Senin–Jumat, 08.00–15.30 WIB",
    href: "https://wa.me/6285732973097",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
      </svg>
    ),
    color: "#198754",
    bg: "#D1F5E0",
  },
  {
    id: "email",
    label: "Email Resmi",
    value: "kel.paritmayor@pontianak.go.id",
    sub: "Dibalas dalam 1x24 jam kerja",
    href: "mailto:kel.paritmayor@pontianak.go.id",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
      </svg>
    ),
    color: "#0A58CA",
    bg: "#EBF2FF",
  },
  {
    id: "instagram",
    label: "Instagram",
    value: "@kelurahan.paritmayor",
    sub: "Info kegiatan & pengumuman",
    href: "https://instagram.com/kelurahan.paritmayor",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
    color: "#C2185B",
    bg: "#FCE4EC",
  },
  {
    id: "facebook",
    label: "Facebook",
    value: "Kelurahan Parit Mayor",
    sub: "Halaman resmi Facebook",
    href: "https://facebook.com/kelurahanparitmayor",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
    color: "#1877F2",
    bg: "#E8F0FE",
  },
];

/* ── Langkah Alur Pengaduan ──────────────────────────────── */
const alurPengaduan = [
  { no: 1, label: "Warga Mengisi Formulir", icon: "📝" },
  { no: 2, label: "Laporan Diterima Admin", icon: "📥" },
  { no: 3, label: "Verifikasi & Klasifikasi", icon: "🔍" },
  { no: 4, label: "Tindak Lanjut Instansi", icon: "⚙️" },
  { no: 5, label: "Notifikasi ke Pelapor", icon: "✅" },
];

/* ── Data RT/RW ──────────────────────────────────────────── */
const rtRwOptions = [
  "RT 01 / RW 01", "RT 02 / RW 01", "RT 03 / RW 01",
  "RT 01 / RW 02", "RT 02 / RW 02", "RT 03 / RW 02",
  "RT 01 / RW 03", "RT 02 / RW 03",
  "RT 01 / RW 04", "RT 02 / RW 04",
  "RT 01 / RW 05", "RT 02 / RW 05",
  "RT 01 / RW 06", "RT 02 / RW 06",
  "RT 01 / RW 07", "RT 02 / RW 07",
];

/* ═══════════════════════════════════════════════════════════
   HALAMAN KONTAK — Main Component (Client Component)
   ═══════════════════════════════════════════════════════════ */
export default function KontakPage() {
  /* ── State form pengaduan ─────────────────────────────── */
  const [form, setForm] = useState({ nama: "", nik: "", domisili: "", laporan: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const errs = {};
    if (!form.nama.trim()) errs.nama = "Nama wajib diisi.";
    if (!form.nik.trim()) errs.nik = "NIK wajib diisi.";
    else if (!/^\d{16}$/.test(form.nik)) errs.nik = "NIK harus 16 digit angka.";
    if (!form.domisili) errs.domisili = "Pilih domisili RT/RW.";
    if (!form.laporan.trim()) errs.laporan = "Detail laporan wajib diisi.";
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    /* Buat pesan WA yang rapi dan terformat */
    const pesan = [
      "🏛️ *LAPORAN PENGADUAN WARGA*",
      "Kelurahan Parit Mayor — Pontianak Timur",
      "━━━━━━━━━━━━━━━━━━",
      `👤 *Nama:* ${form.nama}`,
      `🪪 *NIK:* ${form.nik}`,
      `📍 *Domisili:* ${form.domisili}`,
      "━━━━━━━━━━━━━━━━━━",
      `📝 *Isi Laporan:*`,
      form.laporan,
      "━━━━━━━━━━━━━━━━━━",
      "_Dikirim via Portal Parit Mayor_",
    ].join("\n");

    const waUrl = `https://wa.me/6285732973097?text=${encodeURIComponent(pesan)}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");
    setSubmitted(true);
    setForm({ nama: "", nik: "", domisili: "", laporan: "" });
  };

  return (
    <div className="flex flex-col">

      {/* ════════════════════════════════════════════════════
          1. HERO KONTAK
          ════════════════════════════════════════════════════ */}
      <section
        id="hero-kontak"
        aria-label="Kontak & Pengaduan"
        className="relative overflow-hidden py-14 md:py-20"
        style={{ background: "linear-gradient(135deg, #052c65 0%, #0A58CA 100%)" }}
      >
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "repeating-linear-gradient(0deg,#fff,#fff 1px,transparent 1px,transparent 50px),repeating-linear-gradient(90deg,#fff,#fff 1px,transparent 1px,transparent 50px)" }}
          aria-hidden="true" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-blue-300 text-xs mb-4">
            <Link href="/" className="hover:text-white transition-colors">Beranda</Link>
            <span aria-hidden="true">/</span>
            <span className="text-white">Kontak & Pengaduan</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-3 leading-tight">
            Kontak & Pengaduan
          </h1>
          <p className="text-blue-200 text-sm sm:text-base max-w-xl">
            Hubungi kami atau sampaikan pengaduan Anda. Kami siap melayani dengan cepat dan profesional.
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          2. INFO KONTAK + MAPS — 2 kolom
          ════════════════════════════════════════════════════ */}
      <section
        id="info-maps"
        aria-labelledby="heading-kontak-info"
        className="py-12 md:py-16 bg-white"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* ── Kolom Kiri: Informasi Kontak ─────────────── */}
            <div>
              <h2 id="heading-kontak-info" className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-6">
                Informasi Kontak Resmi
              </h2>

              <div className="space-y-4">
                {kontakInfo.map((k) => (
                  <a
                    key={k.id}
                    id={`kontak-${k.id}`}
                    href={k.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-2xl border border-gray-100 hover:shadow-md transition-all duration-200 group"
                    style={{ backgroundColor: k.bg }}
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-white"
                      style={{ backgroundColor: k.color }}
                    >
                      {k.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{k.label}</p>
                      <p className="font-bold text-sm text-gray-900 truncate group-hover:underline" style={{ color: k.color }}>
                        {k.value}
                      </p>
                      <p className="text-gray-400 text-xs">{k.sub}</p>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 flex-shrink-0 text-gray-300 group-hover:text-gray-500 transition-colors" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                  </a>
                ))}
              </div>

              {/* Jam Operasional */}
              <div className="mt-5 p-4 rounded-2xl border" style={{ backgroundColor: "#EBF2FF", borderColor: "#BFDBFE" }}>
                <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "#0A58CA" }}>
                  🕐 Jam Operasional Pelayanan
                </p>
                <p className="text-gray-700 text-sm">
                  <strong>Senin – Jumat</strong>: 08.00 – 15.30 WIB<br />
                  <strong>Sabtu & Minggu</strong>: Tutup
                </p>
              </div>
            </div>

            {/* ── Kolom Kanan: Google Maps Placeholder ──────── */}
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-6">
                Lokasi Kantor
              </h2>

              {/* Maps embed placeholder dengan border melengkung */}
              <div
                className="relative rounded-2xl overflow-hidden border-2 border-gray-200 shadow-md"
                style={{ height: "360px" }}
              >
                {/* Iframe Google Maps — placeholder */}
                <iframe
                  title="Lokasi Kantor Kelurahan Parit Mayor"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.2867!2d109.3800!3d-0.0450!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sKelurahan+Parit+Mayor!5e0!3m2!1sid!2sid!4v1693000000000!5m2!1sid!2sid"
                  className="w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                {/* Overlay label */}
                <div className="absolute top-3 left-3 bg-white shadow-md rounded-xl px-3 py-2 text-sm font-bold text-gray-800 border border-gray-100">
                  📍 Jl. Tanjung Raya II, Parit Mayor
                </div>
              </div>

              <p className="text-gray-500 text-xs mt-3 text-center">
                Jl. Tanjung Raya II, Parit Mayor, Kecamatan Pontianak Timur, Kalimantan Barat 78231
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          3. ALUR PROSES PELAYANAN PENGADUAN — 5 langkah
          ════════════════════════════════════════════════════ */}
      <section
        id="alur-pengaduan"
        aria-labelledby="heading-alur"
        className="py-12 md:py-16"
        style={{ backgroundColor: "#F8F9FA" }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-10">
            <h2 id="heading-alur" className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">
              Alur Proses Pelayanan Pengaduan
            </h2>
            <p className="text-gray-500 text-sm">5 tahap penanganan laporan dari warga.</p>
          </div>

          {/* Langkah horizontal — scroll di mobile */}
          <div className="overflow-x-auto pb-2">
            <div className="flex items-start gap-0 min-w-max mx-auto justify-center">
              {alurPengaduan.map((step, idx) => (
                <div key={step.no} className="flex items-center">
                  {/* Kartu langkah */}
                  <div
                    id={`alur-step-${step.no}`}
                    className="flex flex-col items-center text-center w-32 sm:w-36"
                  >
                    {/* Nomor + ikon */}
                    <div
                      className="relative w-14 h-14 rounded-full flex items-center justify-center mb-3 text-2xl shadow-md"
                      style={{ backgroundColor: "#0A58CA" }}
                      aria-hidden="true"
                    >
                      <span>{step.icon}</span>
                      {/* Badge nomor */}
                      <span
                        className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-white text-xs font-extrabold flex items-center justify-center shadow-sm"
                        style={{ color: "#0A58CA", border: "2px solid #0A58CA" }}
                      >
                        {step.no}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-gray-700 leading-snug px-1">{step.label}</p>
                  </div>

                  {/* Panah penghubung (kecuali setelah step terakhir) */}
                  {idx < alurPengaduan.length - 1 && (
                    <div className="flex items-center mx-1 mb-8" aria-hidden="true">
                      <div className="w-6 sm:w-10 h-0.5 bg-blue-200" />
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 flex-shrink-0 text-blue-300" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
