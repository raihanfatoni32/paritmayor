/* =========================================================
   HALAMAN LAYANAN & FORMULIR — Portal Resmi Kelurahan Parit Mayor
   Sliced dari Figma Frame 3
   Mencakup: Grid Panduan Administrasi, Unduh Formulir,
             Formulir Pengaduan dengan fungsionalitas WhatsApp
   ========================================================= */
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/utils/supabase";

/* ── Data Daftar Layanan (12 Layanan) ───────────────────── */
const daftarLayanan = [
  {
    id: 1,
    judul: "Surat Pengantar RT/RW",
    deskripsiSingkat: "Dokumen dasar untuk berbagai keperluan administrasi warga.",
    ikon: "📋",
    warna: { color: "#0A58CA", bg: "#EBF2FF" },
    syarat: [
      "Fotokopi KTP Pemohon",
      "Fotokopi KK",
      "Tanda tangan Ketua RT & RW",
    ],
  },
  {
    id: 2,
    judul: "Kartu Keluarga (KK)",
    deskripsiSingkat: "Pembuatan baru, perubahan data, atau penggantian KK hilang.",
    ikon: "🏠",
    warna: { color: "#198754", bg: "#D1F5E0" },
    syarat: [
      "Surat Pengantar RT/RW",
      "Buku Nikah / Akta Cerai",
      "Surat Pindah (jika ada)",
    ],
  },
  {
    id: 3,
    judul: "Kartu Tanda Penduduk (KTP)",
    deskripsiSingkat: "Perekaman e-KTP baru atau penggantian KTP rusak/hilang.",
    ikon: "🪪",
    warna: { color: "#7C3AED", bg: "#EDE9FE" },
    syarat: [
      "Telah berusia 17 tahun",
      "Fotokopi KK",
      "KTP Lama (untuk penggantian)",
    ],
  },
  {
    id: 4,
    judul: "Surat Pengantar Nikah (N1)",
    deskripsiSingkat: "Surat pengantar dari kelurahan sebagai syarat pernikahan resmi.",
    ikon: "💍",
    warna: { color: "#C2410C", bg: "#FFF0EB" },
    syarat: [
      "Surat Keterangan RT",
      "Fotokopi KTP & KK Pemohon",
      "Fotokopi Akta Kelahiran",
      "Fotokopi Akta Kematian/Perceraian (janda/duda)",
      "Surat Keterangan Vihara/Gereja (Non Muslim)",
      "Surat Pernyataan belum menikah bermaterai Rp.10.000 (diketahui ortu & saksi)",
      "Fotokopi KTP ortu/wali",
      "Pas Foto 2x3 (1 lembar)",
    ],
  },
  {
    id: 5,
    judul: "Surat Keterangan Cerai",
    deskripsiSingkat: "Surat keterangan resmi status cerai bagi warga kelurahan.",
    ikon: "📝",
    warna: { color: "#0E7490", bg: "#ECFEFF" },
    syarat: [
      "Surat Keterangan RT",
      "Fotokopi KTP dan KK Pemohon",
      "Surat Pernyataan bermaterai Rp.10.000 dengan 2 saksi keluarga (mengetahui RT)",
      "Fotokopi KTP saksi",
      "Fotokopi surat nikah",
    ],
  },
  {
    id: 6,
    judul: "Surat Keterangan Ahli Waris",
    deskripsiSingkat: "Penetapan ahli waris resmi atas harta peninggalan almarhum.",
    ikon: "⚖️",
    warna: { color: "#B45309", bg: "#FFFBEB" },
    syarat: [
      "Surat Keterangan RT",
      "Fotokopi Akta Kematian Waris",
      "Fotokopi Surat/Itsbaat Nikah",
      "Fotokopi KTP, KK, & Akta Lahir Ahli Waris",
      "Fotokopi KTP 2 saksi (tanpa hubungan keluarga)",
      "Surat Kuasa bermaterai Rp.10.000 (jika dikuasakan)",
      "Materai Rp.10.000 (4 buah)",
    ],
  },
  {
    id: 7,
    judul: "Formulir Pelaporan Kematian",
    deskripsiSingkat: "Pelaporan resmi peristiwa kematian warga kepada kelurahan.",
    ikon: "🕊️",
    warna: { color: "#475569", bg: "#F1F5F9" },
    syarat: [
      "Surat Keterangan RT",
      "Formulir Kematian",
      "Fotokopi KTP 2 Saksi",
      "Fotokopi KK dan KTP yang meninggal",
      "Surat Pernyataan (jika meninggal di rumah)",
    ],
  },
  {
    id: 8,
    judul: "Pernyataan Penghasilan",
    deskripsiSingkat: "Surat pernyataan jaminan penghasilan untuk keperluan LAPAS/RUTAN.",
    ikon: "💼",
    warna: { color: "#0F766E", bg: "#F0FDFA" },
    syarat: [
      "Surat Jaminan Kesanggupan Keluarga oleh LAPAS/RUTAN bermaterai & diketahui RT",
      "Fotokopi KTP penjamin",
      "Fotokopi KK narapidana",
    ],
  },
  {
    id: 9,
    judul: "Surat Keterangan Tidak Mampu",
    deskripsiSingkat: "Bukti resmi kondisi ekonomi kurang mampu untuk akses layanan sosial.",
    ikon: "🤝",
    warna: { color: "#1D4ED8", bg: "#EFF6FF" },
    syarat: [
      "Surat Keterangan RT",
      "Fotokopi KTP dan KK Pemohon",
      "Fotokopi kartu bansos (PKH, BPNT, KIS) atau bukti DTKS",
    ],
  },
  {
    id: 10,
    judul: "Surat Pernyataan Tidak Mampu",
    deskripsiSingkat: "Pernyataan bermaterai mengenai kondisi ekonomi tidak mampu.",
    ikon: "📄",
    warna: { color: "#9333EA", bg: "#F5F3FF" },
    syarat: [
      "Surat Keterangan RT",
      "Fotokopi KTP dan KK",
      "Surat Pernyataan bermaterai Rp.10.000 dengan 2 saksi",
      "Fotokopi KTP saksi",
      "Surat Kuasa (jika dikuasakan)",
      "Foto rumah (depan, tamu, WC)",
    ],
  },
  {
    id: 11,
    judul: "Pendaftaran TNI / POLRI",
    deskripsiSingkat: "Surat keterangan kelurahan untuk pendaftaran seleksi TNI atau POLRI.",
    ikon: "🎖️",
    warna: { color: "#065F46", bg: "#ECFDF5" },
    syarat: [
      "Fotokopi KTP dan KK pemohon",
      "Fotokopi KTP dan KK orang tua/wali",
      "Formulir Pendaftaran TNI/POLRI",
    ],
  },
  {
    id: 12,
    judul: "Pemeriksaan Tanah (Panitia A)",
    deskripsiSingkat: "Proses verifikasi dan pemeriksaan lapangan tanah oleh panitia A BPN.",
    ikon: "🗺️",
    warna: { color: "#92400E", bg: "#FEF3C7" },
    syarat: [
      "Fotokopi KTP dan KK Pemohon",
      "Berita Acara Pemeriksaan Lapangan Panitia A",
      "SK BPN tentang Panitia A",
      "Surat Kuasa (jika dikuasakan)",
      "Fotokopi Sertifikat",
    ],
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

/* ═══════════════════════════════════════════════════════════
   HALAMAN LAYANAN — Main Component (Client Component)
   ═══════════════════════════════════════════════════════════ */
export default function LayananPage() {
  /* ── State Modal Layanan ──────────────────────────────── */
  const [selectedLayanan, setSelectedLayanan] = useState(null);
  const [isModalOpen, setIsModalOpen]         = useState(false);

  const openModal  = (layanan) => { setSelectedLayanan(layanan); setIsModalOpen(true); };
  const closeModal = ()        => { setIsModalOpen(false); setTimeout(() => setSelectedLayanan(null), 300); };

  /* ── State Formulir dari Supabase ────────────────────── */
  const [daftarFormulir, setDaftarFormulir] = useState([]);
  const [loadingFormulir, setLoadingFormulir] = useState(true);
  const [errorFormulir, setErrorFormulir]   = useState(null);

  /* ── Fetch Formulir dari tabel formulir_layanan ──────── */
  const fetchFormulir = async () => {
    setLoadingFormulir(true);
    setErrorFormulir(null);
    try {
      const { data, error } = await supabase
        .from("formulir_layanan")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      setDaftarFormulir(data || []);
    } catch (err) {
      console.error("Gagal memuat formulir:", err);
      setErrorFormulir("Gagal memuat daftar formulir. Silakan refresh halaman.");
    } finally {
      setLoadingFormulir(false);
    }
  };

  useEffect(() => { fetchFormulir(); }, []);

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
          2. DAFTAR LAYANAN — Grid 12 kartu (3 kolom)
          ════════════════════════════════════════════════════ */}
      <section
        id="daftar-layanan"
        aria-labelledby="heading-layanan"
        className="py-12 md:py-16"
        style={{ backgroundColor: "#F8F9FA" }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8">
            <div className="flex items-center gap-3">
              <span className="text-2xl" aria-hidden="true">🗂️</span>
              <div>
                <h2 id="heading-layanan" className="text-xl sm:text-2xl font-extrabold text-gray-900">
                  Daftar Layanan Administrasi
                </h2>
                <p className="text-gray-400 text-xs mt-0.5">Klik "Pelajari Selengkapnya" untuk melihat syarat lengkap.</p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-full">
              <span aria-hidden="true">✅</span> {daftarLayanan.length} Layanan Tersedia
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {daftarLayanan.map((layanan) => (
              <article
                key={layanan.id}
                id={`layanan-${layanan.id}`}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 overflow-hidden group flex flex-col"
              >
                {/* Header kartu */}
                <div className="p-5 pb-3 flex-1">
                  <div className="flex items-start mb-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-sm"
                      style={{ backgroundColor: layanan.warna.bg }}
                      aria-hidden="true"
                    >
                      {layanan.ikon}
                    </div>
                  </div>

                  <h3
                    className="font-bold text-base mb-1.5 leading-snug"
                    style={{ color: layanan.warna.color }}
                  >
                    {layanan.judul}
                  </h3>
                  <p className="text-gray-500 text-xs mb-4 leading-relaxed">
                    {layanan.deskripsiSingkat}
                  </p>

                  {/* Preview 2 syarat pertama */}
                  <ul className="space-y-1.5">
                    {layanan.syarat.slice(0, 2).map((s, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-600 text-xs">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4 h-4 flex-shrink-0 mt-0.5"
                          style={{ color: layanan.warna.color }}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>{s}</span>
                      </li>
                    ))}
                    {layanan.syarat.length > 2 && (
                      <li className="text-gray-400 text-xs pl-6">
                        +{layanan.syarat.length - 2} syarat lainnya...
                      </li>
                    )}
                  </ul>
                </div>

                {/* Footer kartu — tombol modal */}
                <div className="px-5 py-3.5 border-t border-gray-50">
                  <button
                    type="button"
                    id={`btn-modal-layanan-${layanan.id}`}
                    onClick={() => openModal(layanan)}
                    className="text-xs font-semibold flex items-center gap-1.5 transition-all duration-150 hover:gap-2.5"
                    style={{ color: layanan.warna.color }}
                  >
                    Pelajari Selengkapnya
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          MODAL POP-UP — Detail Syarat Layanan
          ════════════════════════════════════════════════════ */}
      {isModalOpen && selectedLayanan && (
        <div
          id="modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-judul"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] flex flex-col overflow-hidden animate-in"
            style={{ animation: "modalSlideIn 0.25s ease-out" }}
          >
            {/* Modal Header */}
            <div
              className="flex items-center justify-between px-6 py-4 border-b border-gray-100"
              style={{ backgroundColor: selectedLayanan.warna.bg }}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl" aria-hidden="true">{selectedLayanan.ikon}</span>
                <h3
                  id="modal-judul"
                  className="font-extrabold text-base leading-snug"
                  style={{ color: selectedLayanan.warna.color }}
                >
                  {selectedLayanan.judul}
                </h3>
              </div>
              <button
                type="button"
                id="btn-tutup-modal"
                onClick={closeModal}
                aria-label="Tutup modal"
                className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:bg-gray-200 hover:text-gray-600 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body — Daftar Syarat */}
            <div className="px-6 py-5 overflow-y-auto flex-1">
              <p className="text-gray-500 text-xs mb-4 leading-relaxed">
                {selectedLayanan.deskripsiSingkat}
              </p>
              <h4 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" style={{ color: selectedLayanan.warna.color }} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-7-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM9 9a.75.75 0 0 0 0 1.5h.253a.25.25 0 0 1 .244.304l-.459 2.066A1.75 1.75 0 0 0 10.747 15H11a.75.75 0 0 0 0-1.5h-.253a.25.25 0 0 1-.244-.304l.459-2.066A1.75 1.75 0 0 0 9.253 9H9Z" clipRule="evenodd" />
                </svg>
                Persyaratan Lengkap ({selectedLayanan.syarat.length} dokumen)
              </h4>
              <ul className="space-y-2.5">
                {selectedLayanan.syarat.map((s, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-bold mt-0.5"
                      style={{ backgroundColor: selectedLayanan.warna.color }}
                      aria-hidden="true"
                    >
                      {i + 1}
                    </span>
                    <span className="text-gray-700 text-sm leading-relaxed">{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-gray-100 bg-gray-50">
              <p className="text-gray-400 text-xs mb-3">
                ⚠️ Pastikan semua dokumen telah disiapkan sebelum datang ke kantor kelurahan.
              </p>
              <button
                type="button"
                id="btn-tutup-modal-bawah"
                onClick={closeModal}
                className="w-full py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90"
                style={{ backgroundColor: selectedLayanan.warna.color }}
              >
                Tutup
              </button>
            </div>
          </div>

          {/* Keyframe animation via style tag */}
          <style>{`
            @keyframes modalSlideIn {
              from { opacity: 0; transform: translateY(-16px) scale(0.97); }
              to   { opacity: 1; transform: translateY(0)   scale(1); }
            }
          `}</style>
        </div>
      )}

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

              {/* List formulir — Scrollable, dinamis dari Supabase */}
              <div className="max-h-[300px] overflow-y-auto pr-1 space-y-3"
                style={{ scrollbarWidth: "thin", scrollbarColor: "#CBD5E1 transparent" }}>

                {/* Loading Skeleton */}
                {loadingFormulir && (
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="bg-white rounded-xl border border-gray-100 px-4 py-3 flex items-center gap-3 animate-pulse">
                        <div className="w-6 h-6 bg-gray-200 rounded-lg flex-shrink-0" />
                        <div className="flex-1 space-y-1.5">
                          <div className="h-3 bg-gray-200 rounded w-3/4" />
                          <div className="h-2.5 bg-gray-100 rounded w-1/3" />
                        </div>
                        <div className="w-14 h-7 bg-gray-200 rounded-lg flex-shrink-0" />
                      </div>
                    ))}
                  </div>
                )}

                {/* Error State */}
                {!loadingFormulir && errorFormulir && (
                  <div className="flex flex-col items-center justify-center py-6 gap-2 text-center">
                    <span className="text-2xl" aria-hidden="true">⚠️</span>
                    <p className="text-red-500 text-xs">{errorFormulir}</p>
                    <button type="button" onClick={fetchFormulir}
                      className="text-xs font-semibold text-blue-600 underline mt-1">Coba lagi</button>
                  </div>
                )}

                {/* Empty State */}
                {!loadingFormulir && !errorFormulir && daftarFormulir.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-8 gap-2 text-center">
                    <span className="text-3xl" aria-hidden="true">📂</span>
                    <p className="text-gray-400 text-sm font-medium">Belum ada formulir tersedia.</p>
                    <p className="text-gray-300 text-xs">Admin belum mengunggah formulir apapun.</p>
                  </div>
                )}

                {/* Daftar Formulir Dinamis */}
                {!loadingFormulir && !errorFormulir && daftarFormulir.map((form) => (
                  <div
                    key={form.id}
                    id={`formulir-${form.id}`}
                    className="bg-white rounded-xl border border-gray-200 flex items-center justify-between px-4 py-3 hover:border-blue-200 hover:shadow-sm transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg" aria-hidden="true">📄</span>
                      <div>
                        <p className="text-sm font-semibold text-gray-800 group-hover:text-blue-700 transition-colors line-clamp-1">
                          {form.judul}
                        </p>
                        <p className="text-xs text-gray-400">PDF • {form.ukuran_file || "—"}</p>
                      </div>
                    </div>
                    <a
                      href={form.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                      id={`btn-unduh-${form.id}`}
                      className="flex-shrink-0 text-xs font-bold text-white px-3 py-1.5 rounded-lg transition-all hover:opacity-90 hover:shadow-sm"
                      style={{ backgroundColor: "#0A58CA" }}
                    >
                      Unduh
                    </a>
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
