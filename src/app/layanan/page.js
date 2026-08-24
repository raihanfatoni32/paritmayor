/* =========================================================
   HALAMAN LAYANAN & FORMULIR — Portal Resmi Kelurahan Parit Mayor
   Sliced dari Figma Frame 3
   Mencakup: Grid Panduan Administrasi, Unduh Formulir,
             Formulir Pengaduan dengan fungsionalitas WhatsApp
   ========================================================= */
"use client";

import { useState } from "react";
import Link from "next/link";

/* ── Data Panduan Administrasi ───────────────────────────── */
const panduanAdm = [
  {
    id: "pengantar-rtrw",
    judul: "Surat Pengantar RT/RW",
    deskripsi: "Dokumen dasar untuk berbagai keperluan administrasi.",
    persyaratan: ["Fotokopi KTP Pemohon", "Fotokopi KK", "Tanda tangan Ketua RT & RW"],
    icon: "📋",
    color: "#0A58CA",
    bg: "#EBF2FF",
  },
  {
    id: "kk",
    judul: "Kartu Keluarga (KK)",
    deskripsi: "Pembuatan baru, perubahan data, atau KK hilang.",
    persyaratan: ["Surat Pengantar RT/RW", "Buku Nikah / Akta Cerai", "Surat Pindah (jika ada)"],
    icon: "🏠",
    color: "#198754",
    bg: "#D1F5E0",
  },
  {
    id: "ktp",
    judul: "Kartu Tanda Penduduk (KTP)",
    deskripsi: "Perekaman e-KTP atau penggantian KTP rusak.",
    persyaratan: ["Telah berusia 17 tahun", "Fotokopi KK", "KTP Lama (untuk penggantian)"],
    icon: "🪪",
    color: "#7C3AED",
    bg: "#EDE9FE",
  },
];

/* ── Data Formulir yang Bisa Diunduh ─────────────────────── */
const formulirList = [
  {
    id: "form-pendaftaran",
    nama: "Form Pendaftaran Penduduk",
    ukuran: "124 KB",
    tipe: "PDF",
    filename: "Form_Pendaftaran_Penduduk.pdf",
  },
  {
    id: "form-sktm",
    nama: "Formulir SKTM (Sosial)",
    ukuran: "98 KB",
    tipe: "PDF",
    filename: "Formulir_SKTM_Kelurahan.pdf",
  },
  {
    id: "form-sku",
    nama: "Formulir Pengajuan SKU",
    ukuran: "112 KB",
    tipe: "PDF",
    filename: "Formulir_SKU_Usaha.pdf",
  },
];

/* ── Data RT/RW untuk select dropdown ───────────────────── */
const rtRwList = [
  "RT 01 / RW 01", "RT 02 / RW 01", "RT 03 / RW 01",
  "RT 01 / RW 02", "RT 02 / RW 02", "RT 03 / RW 02",
  "RT 01 / RW 03", "RT 02 / RW 03",
  "RT 01 / RW 04", "RT 02 / RW 04", "RT 03 / RW 04",
  "RT 01 / RW 05", "RT 02 / RW 05",
  "RT 01 / RW 06", "RT 02 / RW 06",
  "RT 01 / RW 07", "RT 02 / RW 07",
];

/* ── Fungsi simulasi unduh berkas PDF dummy ──────────────── */
function unduhFormulir(filename) {
  /* Buat konten dummy PDF sebagai Blob dan trigger download */
  const dummyContent = `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /Resources << /Font << /F1 << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> >> >> /MediaBox [0 0 612 792] /Contents 4 0 R >>
endobj
4 0 obj
<< /Length 120 >>
stream
BT
/F1 16 Tf
50 750 Td
(Formulir Kelurahan Parit Mayor) Tj
0 -30 Td
/F1 12 Tf
(File: ${filename}) Tj
0 -20 Td
(Pontianak Timur) Tj
ET
endstream
endobj
xref
0 5
0000000000 65535 f
0000000009 00000 n
0000000058 00000 n
0000000115 00000 n
0000000274 00000 n
trailer
<< /Size 5 /Root 1 0 R >>
startxref
445
%%EOF`;

  const blob = new Blob([dummyContent], { type: "application/pdf" });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement("a");
  a.href     = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/* ═══════════════════════════════════════════════════════════
   HALAMAN LAYANAN — Main Component (Client Component)
   ═══════════════════════════════════════════════════════════ */
export default function LayananPage() {
  /* ── State Form Pengaduan ─────────────────────────────── */
  const [formData, setFormData] = useState({
    nama: "",
    nik: "",
    domisili: "",
    laporan: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors]       = useState({});

  /* ── Handler perubahan input ──────────────────────────── */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    /* Hapus error saat user mulai mengetik */
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  /* ── Validasi form sebelum kirim ─────────────────────── */
  const validate = () => {
    const newErrors = {};
    if (!formData.nama.trim())         newErrors.nama     = "Nama wajib diisi.";
    if (!formData.nik.trim())          newErrors.nik      = "NIK wajib diisi.";
    else if (!/^\d{16}$/.test(formData.nik)) newErrors.nik = "NIK harus 16 digit angka.";
    if (!formData.domisili)            newErrors.domisili = "Pilih domisili RT/RW.";
    if (!formData.laporan.trim())      newErrors.laporan  = "Detail laporan wajib diisi.";
    return newErrors;
  };

  /* ── Kirim laporan via WhatsApp ───────────────────────── */
  const handleKirimWA = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    /* Format pesan teks aduan yang rapi */
    const pesan = [
      "🏛️ *LAPORAN PENGADUAN WARGA*",
      "Kelurahan Parit Mayor, Pontianak Timur",
      "━━━━━━━━━━━━━━━━━━━━",
      `👤 *Nama Pelapor:* ${formData.nama}`,
      `🪪 *NIK:* ${formData.nik}`,
      `📍 *Domisili:* ${formData.domisili}`,
      "━━━━━━━━━━━━━━━━━━━━",
      `📝 *Detail Laporan:*`,
      formData.laporan,
      "━━━━━━━━━━━━━━━━━━━━",
      "_Laporan dikirim melalui Portal Resmi Kelurahan Parit Mayor_",
    ].join("\n");

    const nomorWA  = "6285732973097";
    const pesanEnc = encodeURIComponent(pesan);
    const waUrl    = `https://wa.me/${nomorWA}?text=${pesanEnc}`;

    window.open(waUrl, "_blank", "noopener,noreferrer");
    setSubmitted(true);
    setFormData({ nama: "", nik: "", domisili: "", laporan: "" });
  };

  return (
    <div className="flex flex-col">

      {/* ════════════════════════════════════════════════════
          1. HERO — Layanan Publik Header
          ════════════════════════════════════════════════════ */}
      <section
        id="hero-layanan"
        aria-label="Layanan Publik Kelurahan Parit Mayor"
        className="bg-white py-12 md:py-16 border-b border-gray-100"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center justify-center gap-2 text-gray-400 text-xs mb-4">
            <Link href="/" className="hover:text-gray-600 transition-colors">Beranda</Link>
            <span aria-hidden="true">/</span>
            <span className="text-gray-700">Layanan & Formulir</span>
          </nav>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Layanan Publik
          </h1>
          <p className="text-gray-500 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Kami berkomitmen memberikan pelayanan administrasi yang cepat, transparan, dan mudah
            diakses oleh seluruh warga Kelurahan Parit Mayor.
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          2. PANDUAN ADMINISTRASI — Grid 3 kartu atas
          ════════════════════════════════════════════════════ */}
      <section
        id="panduan-administrasi"
        aria-labelledby="heading-panduan"
        className="py-12 md:py-16"
        style={{ backgroundColor: "#F8F9FA" }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex items-center gap-3 mb-8">
            <span className="text-2xl" aria-hidden="true">📋</span>
            <h2 id="heading-panduan" className="text-xl sm:text-2xl font-extrabold text-gray-900">
              Panduan Administrasi
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {panduanAdm.map((item) => (
              <article
                key={item.id}
                id={`panduan-${item.id}`}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden group"
              >
                {/* Header kartu berwarna */}
                <div className="p-5 pb-3">
                  <div className="flex items-start justify-between mb-3">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-xl"
                      style={{ backgroundColor: item.bg }}
                      aria-hidden="true"
                    >
                      {item.icon}
                    </div>
                    {/* Dekoratif gambar outline kanan */}
                    <div className="w-16 h-16 rounded-lg opacity-10" style={{ backgroundColor: item.color }} aria-hidden="true" />
                  </div>

                  <h3 className="font-bold text-base mb-1 group-hover:transition-colors" style={{ color: item.color }}>
                    {item.judul}
                  </h3>
                  <p className="text-gray-500 text-sm mb-3">{item.deskripsi}</p>

                  {/* Persyaratan */}
                  <ul className="space-y-1.5">
                    {item.persyaratan.map((p, i) => (
                      <li key={i} className="flex items-center gap-2 text-gray-600 text-xs">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 flex-shrink-0" style={{ color: item.color }} fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clipRule="evenodd" />
                        </svg>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer kartu */}
                <div className="px-5 py-3 border-t border-gray-50">
                  <button
                    type="button"
                    className="text-xs font-semibold flex items-center gap-1 transition-colors hover:underline"
                    style={{ color: item.color }}
                  >
                    Pelajari Selengkapnya →
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          3. UNDUH FORMULIR + FORM PENGADUAN — 2 kolom
          ════════════════════════════════════════════════════ */}
      <section id="unduh-dan-pengaduan" aria-label="Unduh Formulir dan Pengaduan" className="bg-white py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* ── Kolom Kiri: Unduh Formulir ─────────────── */}
            <div
              id="unduh-formulir"
              className="rounded-2xl border border-gray-100 shadow-sm p-6"
              style={{ backgroundColor: "#F8F9FA" }}
            >
              <div className="flex items-center gap-2.5 mb-2">
                <span className="text-xl" aria-hidden="true">⬇️</span>
                <h2 className="text-lg font-extrabold text-gray-900">Unduh Formulir</h2>
              </div>
              <p className="text-gray-500 text-xs mb-1">
                Berdasarkan SK Walikota No. <strong>1149/2025</strong>
              </p>
              <p className="text-gray-500 text-xs mb-6">
                Unduh dan cetak formulir berikut untuk mempercepat proses di kantor kelurahan.
              </p>

              {/* List formulir */}
              <div className="space-y-3">
                {formulirList.map((form) => (
                  <div
                    key={form.id}
                    id={form.id}
                    className="bg-white rounded-xl border border-gray-200 flex items-center justify-between px-4 py-3 hover:border-blue-200 hover:shadow-sm transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg" aria-hidden="true">📄</span>
                      <div>
                        <p className="text-sm font-semibold text-gray-800 group-hover:text-blue-700 transition-colors">
                          {form.nama}
                        </p>
                        <p className="text-xs text-gray-400">{form.tipe} • {form.ukuran}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      id={`btn-unduh-${form.id}`}
                      onClick={() => unduhFormulir(form.filename)}
                      className="text-xs font-bold text-white px-3 py-1.5 rounded-lg transition-all hover:opacity-90 hover:shadow-sm"
                      style={{ backgroundColor: "#0A58CA" }}
                    >
                      Unduh
                    </button>
                  </div>
                ))}
              </div>

              {/* Catatan */}
              <div className="mt-5 p-3 rounded-lg border border-yellow-100 bg-yellow-50 text-yellow-800 text-xs">
                ⚠️ Pastikan formulir telah diisi lengkap sebelum dibawa ke kantor kelurahan.
                Jam layanan: Senin–Jumat, 08.00–15.30 WIB.
              </div>
            </div>

            {/* ── Kolom Kanan: Form Pengaduan WhatsApp ─────── */}
            <div
              id="form-pengaduan"
              className="rounded-2xl border border-gray-100 shadow-sm p-6 bg-white"
            >
              <div className="flex items-center gap-2.5 mb-2">
                <span className="text-xl" aria-hidden="true">📨</span>
                <h2 className="text-lg font-extrabold text-gray-900">Layanan Pengaduan Masyarakat</h2>
              </div>
              <p className="text-gray-500 text-xs mb-6">
                Sampaikan laporan atau pengaduan Anda. Kami akan menindaklanjuti secepatnya.
              </p>

              {/* Notifikasi sukses */}
              {submitted && (
                <div className="mb-4 p-3 rounded-lg bg-green-50 border border-green-200 text-green-800 text-sm flex items-center gap-2">
                  <span aria-hidden="true">✅</span>
                  Laporan berhasil diarahkan ke WhatsApp! Terima kasih telah melapor.
                </div>
              )}

              <form onSubmit={handleKirimWA} noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  {/* Input Nama */}
                  <div>
                    <label htmlFor="input-nama" className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Nama Lengkap <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="input-nama"
                      type="text"
                      name="nama"
                      value={formData.nama}
                      onChange={handleChange}
                      placeholder="Sesuai KTP"
                      className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition-all focus:ring-2 ${
                        errors.nama ? "border-red-400 focus:ring-red-100" : "border-gray-200 focus:border-blue-400 focus:ring-blue-50"
                      }`}
                    />
                    {errors.nama && <p className="text-red-500 text-xs mt-1">{errors.nama}</p>}
                  </div>

                  {/* Input NIK */}
                  <div>
                    <label htmlFor="input-nik" className="block text-xs font-semibold text-gray-700 mb-1.5">
                      NIK <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="input-nik"
                      type="text"
                      name="nik"
                      value={formData.nik}
                      onChange={handleChange}
                      placeholder="16 Digit NIK"
                      maxLength={16}
                      className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition-all focus:ring-2 ${
                        errors.nik ? "border-red-400 focus:ring-red-100" : "border-gray-200 focus:border-blue-400 focus:ring-blue-50"
                      }`}
                    />
                    {errors.nik && <p className="text-red-500 text-xs mt-1">{errors.nik}</p>}
                  </div>
                </div>

                {/* Select Domisili RT/RW */}
                <div className="mb-4">
                  <label htmlFor="select-domisili" className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Domisili (RT/RW) <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="select-domisili"
                    name="domisili"
                    value={formData.domisili}
                    onChange={handleChange}
                    className={`w-full rounded-lg border px-3 py-2.5 text-sm bg-white outline-none transition-all focus:ring-2 ${
                      errors.domisili ? "border-red-400 focus:ring-red-100" : "border-gray-200 focus:border-blue-400 focus:ring-blue-50"
                    }`}
                  >
                    <option value="">Pilih RT/RW Anda</option>
                    {rtRwList.map((rt) => (
                      <option key={rt} value={rt}>{rt}</option>
                    ))}
                  </select>
                  {errors.domisili && <p className="text-red-500 text-xs mt-1">{errors.domisili}</p>}
                </div>

                {/* Textarea Detail Laporan */}
                <div className="mb-5">
                  <label htmlFor="textarea-laporan" className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Detail Laporan / Aduan <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="textarea-laporan"
                    name="laporan"
                    value={formData.laporan}
                    onChange={handleChange}
                    placeholder="Tuliskan detail laporan Anda dengan jelas..."
                    rows={4}
                    className={`w-full rounded-lg border px-3 py-2.5 text-sm resize-none outline-none transition-all focus:ring-2 ${
                      errors.laporan ? "border-red-400 focus:ring-red-100" : "border-gray-200 focus:border-blue-400 focus:ring-blue-50"
                    }`}
                  />
                  {errors.laporan && <p className="text-red-500 text-xs mt-1">{errors.laporan}</p>}
                </div>

                {/* Tombol Kirim WA */}
                <button
                  type="submit"
                  id="btn-kirim-wa"
                  className="w-full flex items-center justify-center gap-2.5 text-white font-bold text-sm py-3.5 rounded-xl shadow-md transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 hover:shadow-lg"
                  style={{ backgroundColor: "#198754" }}
                >
                  {/* WhatsApp icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                  </svg>
                  Kirim Laporan via WhatsApp
                </button>

                <p className="text-gray-400 text-xs text-center mt-3">
                  Laporan akan diteruskan langsung ke admin Kelurahan melalui WhatsApp.
                </p>
              </form>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
