/* =========================================================
   HALAMAN BERITA & KEGIATAN — Portal Resmi Kelurahan Parit Mayor
   Sliced dari Figma Frame 4
   Mencakup: Hero Featured News, Grid 3 kolom, Pagination, Auto-Sort
   ========================================================= */

"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

/* ── Data Berita ─────────────────────────────────────────── */
const beritaFeatured = {
  id: "kerja-bakti-hut-ri",
  kategori: "Kegiatan Warga",
  kategoriColor: "#0A58CA",
  tanggal: "2026-08-11",
  penulis: "Humas Kelurahan",
  judul: "Kerja Bakti Akbar Menyambut HUT Kemerdekaan RI ke-81",
  ringkasan:
    "Seluruh warga Kelurahan Parit Mayor bersatu dalam semangat gotong royong mengikuti kegiatan kerja bakti massal membersihkan lingkungan RT/RW, drainase, dan ruang publik sebelum menyambut Hari Kemerdekaan Republik Indonesia yang ke-81.",
  href: "/berita/kerja-bakti-hut-ri",
  gradient: "from-blue-800 via-blue-700 to-blue-600",
};

const beritaRegular = [
  {
    id: "posyandu-agustus",
    kategori: "Kesehatan",
    kategoriColor: "#198754",
    tanggal: "2026-08-03",
    judul: "Jadwal Kegiatan Posyandu Balita & Lansia Bulan Agustus",
    ringkasan:
      "Puskesmas dan kader posyandu mengumumkan jadwal pemeriksaan kesehatan gratis bagi balita dan warga lanjut usia.",
    gradient: "from-green-600 to-green-800",
  },
  {
    id: "drainase-rw03",
    kategori: "Pemerintahan",
    kategoriColor: "#7C3AED",
    tanggal: "2026-07-29",
    judul: "Perbaikan Drainase Lingkungan RW 03 Selesai Dilaksanakan",
    ringkasan:
      "Sebagai bagian dari pencegahan banjir musiman, perbaikan drainase di wilayah RW 03 kini resmi selesai dikerjakan.",
    gradient: "from-violet-600 to-violet-800",
  },
  {
    id: "musrenbang",
    kategori: "Pemerintahan",
    kategoriColor: "#DC6803",
    tanggal: "2026-07-21",
    judul: "Musyawarah Perencanaan Pembangunan (Musrenbang) Kelurahan 2026",
    ringkasan:
      "Kelurahan Parit Mayor menggelar Musrenbang tahunan untuk menyusun program prioritas pembangunan tahun anggaran berikutnya.",
    gradient: "from-orange-600 to-orange-800",
  },
  {
    id: "penerimaan-beasiswa",
    kategori: "Pendidikan",
    kategoriColor: "#0891B2",
    tanggal: "2026-07-15",
    judul: "Pengumuman Penerimaan Beasiswa Warga Kurang Mampu Tahap II",
    ringkasan:
      "Kelurahan membuka pendaftaran beasiswa pendidikan bagi pelajar berprestasi dari keluarga kurang mampu. Daftar sekarang!",
    gradient: "from-cyan-600 to-cyan-800",
  },
  {
    id: "pemuda-produktif",
    kategori: "Kegiatan Warga",
    kategoriColor: "#0A58CA",
    tanggal: "2026-07-08",
    judul: "Program Pemuda Produktif: Pelatihan Keterampilan Digital",
    ringkasan:
      "Karang taruna dan pemerintah kelurahan berkolaborasi menggelar pelatihan desain grafis dan pemasaran digital bagi pemuda.",
    gradient: "from-blue-600 to-indigo-700",
  },
  {
    id: "imunisasi-polio",
    kategori: "Kesehatan",
    kategoriColor: "#198754",
    tanggal: "2026-07-01",
    judul: "Sub-PIN Imunisasi Polio Nasional di Kelurahan Parit Mayor",
    ringkasan:
      "Kelurahan bersama Puskesmas mensukseskan program imunisasi polio nasional bagi anak usia 0-7 tahun di seluruh RT.",
    gradient: "from-emerald-600 to-green-700",
  },
];

/* ══════════════════════════════════════════════════════════
   HELPER: Parsing Tanggal ke objek Date yang valid
   Mendukung dua format:
   - ISO:       "YYYY-MM-DD"
   - Indonesia: "03 Agt 2026", "01 Jul 2026", dll.
   ══════════════════════════════════════════════════════════ */
const BULAN_ID = {
  Jan: 0, Feb: 1, Mar: 2, Apr: 3, Mei: 4, Jun: 5,
  Jul: 6, Agt: 7, Agu: 7, Sep: 8, Okt: 9, Nov: 10, Des: 11,
};

function parseTanggal(str) {
  if (!str) return new Date(0);
  // Format ISO: YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(str)) {
    return new Date(str + "T00:00:00");
  }
  // Format Indonesia pendek: "03 Agt 2026"
  const parts = str.trim().split(/\s+/);
  if (parts.length === 3) {
    const day = parseInt(parts[0], 10);
    const mon = BULAN_ID[parts[1]];
    const year = parseInt(parts[2], 10);
    if (!isNaN(day) && mon !== undefined && !isNaN(year)) {
      return new Date(year, mon, day);
    }
  }
  // Format Indonesia panjang: "11 Agustus 2026"
  const d = new Date(str);
  return isNaN(d.getTime()) ? new Date(0) : d;
}

/* ── Helper: Format tanggal untuk tampilan ──────────────── */
function formatTanggal(str) {
  if (!str) return "—";
  const d = parseTanggal(str);
  if (d.getTime() === 0) return str; // fallback ke string asli
  return d.toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" });
}

/* ── Komponen Label Kategori ─────────────────────────────── */
function LabelKategori({ label, color }) {
  return (
    <span
      className="inline-block text-white text-xs font-bold px-2.5 py-1 rounded-full"
      style={{ backgroundColor: color }}
    >
      {label}
    </span>
  );
}

/* ═══════════════════════════════════════════════════════════
   HALAMAN BERITA — Main Component
   ═══════════════════════════════════════════════════════════ */
export default function BeritaPage() {
  const LIMIT = 6;

  const [semuaBerita, setSemuaBerita] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [beritaAktif, setBeritaAktif] = useState(null);

  /* ── Baca localStorage, gabungkan, dan sort descending ── */
  useEffect(() => {
    const stored = localStorage.getItem("beritaData");
    let fromStorage = [];
    if (stored) {
      try {
        fromStorage = JSON.parse(stored);
      } catch {
        fromStorage = [];
      }
    }
    // Gabungkan: berita admin di depan, lalu bawaan
    const gabungan = [...fromStorage, ...beritaRegular];

    // Auto-sort: terbaru (tanggal terbesar) di atas — Descending
    gabungan.sort((a, b) => parseTanggal(b.tanggal) - parseTanggal(a.tanggal));

    setSemuaBerita(gabungan);
  }, []);

  /* ── Logic Paginasi ──────────────────────────────────── */
  const featuredNews = semuaBerita[0];
  const gridBerita = semuaBerita.slice(1);

  const totalHalaman = Math.ceil(gridBerita.length / LIMIT);
  const startIndex = (currentPage - 1) * LIMIT;
  const beritaTampil = gridBerita.slice(startIndex, startIndex + LIMIT);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    const el = document.getElementById("grid-berita");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col">

      {/* ════════════════════════════════════════════════════
          1. PAGE HEADER — Beranda sub-hero putih
          ════════════════════════════════════════════════════ */}
      <section id="hero-berita" aria-label="Berita & Kegiatan" className="bg-white py-12 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-gray-400 text-xs mb-4">
            <Link href="/" className="hover:text-gray-600 transition-colors">Beranda</Link>
            <span aria-hidden="true">/</span>
            <span className="text-gray-700">Berita & Kegiatan</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2">
            Berita & Kegiatan
          </h1>
          <p className="text-gray-500 text-sm sm:text-base">
            Berita, pengumuman, dan kegiatan terpopuler Kelurahan Parit Mayor.
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          2. HERO FEATURED NEWS — Berita besar di atas
          ════════════════════════════════════════════════════ */}
      <section
        id="featured-news"
        aria-labelledby="heading-featured"
        className="py-8 md:py-10"
        style={{ backgroundColor: "#F8F9FA" }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {featuredNews && (
            <article
              className={`relative rounded-2xl overflow-hidden shadow-lg ${!featuredNews.foto ? `bg-gradient-to-br ${featuredNews.gradient || "from-blue-600 to-blue-800"}` : "bg-gray-900"} group cursor-pointer hover:shadow-2xl transition-all duration-300`}
              aria-labelledby="heading-featured"
            >
              {featuredNews.foto && (
                <>
                  <img src={featuredNews.foto} className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-1000 ease-in-out group-hover:scale-105" alt={featuredNews.judul} />
                  {/* Lapisan 1: Dimmer keseluruhan gambar */}
                  <div className="absolute inset-0 z-0 bg-black/25 group-hover:bg-black/40 transition-colors duration-700 pointer-events-none"></div>
                  {/* Lapisan 2: Gradient gelap dari bawah untuk area teks */}
                  <div className="absolute inset-0 z-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent pointer-events-none"></div>
                </>
              )}
              <div className="relative z-10 p-8 md:p-12" style={{ minHeight: "320px" }}>
                <div className="absolute inset-0 opacity-10"
                  style={{ backgroundImage: "radial-gradient(circle at 80% 20%, #fff 0%, transparent 50%)" }}
                  aria-hidden="true" />

                <div className="relative flex flex-col justify-between h-full" style={{ minHeight: "inherit" }}>
                  <div className="flex items-center gap-3 mb-auto">
                    <LabelKategori label={featuredNews.kategori} color={featuredNews.kategoriColor} />
                    <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full">Featured</span>
                  </div>

                  <div className="mt-16 md:mt-24">
                    <p className="text-gray-300 drop-shadow-md text-xs mb-2">
                      {formatTanggal(featuredNews.tanggal)} • {featuredNews.penulis || "Humas Kelurahan"}
                    </p>
                    <h2 id="heading-featured" className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight mb-4 max-w-2xl break-words drop-shadow-xl">
                      {featuredNews.judul}
                    </h2>
                    <p className="text-gray-100 drop-shadow-md text-sm sm:text-base leading-relaxed max-w-2xl mb-6 break-words line-clamp-3">
                      {featuredNews.ringkasan}
                    </p>
                    <button
                      type="button"
                      onClick={() => setBeritaAktif(featuredNews)}
                      className="inline-flex items-center gap-2 bg-white text-blue-900 font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-blue-50 transition-colors"
                    >
                      Baca Selengkapnya →
                    </button>
                  </div>
                </div>
              </div>
            </article>
          )}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          3. GRID BERITA REGULER — 3 kolom (auto-sorted)
          ════════════════════════════════════════════════════ */}
      <section
        id="grid-berita"
        aria-labelledby="heading-berita-reguler"
        className="py-10 md:py-12"
        style={{ backgroundColor: "#F8F9FA" }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          <h2 id="heading-berita-reguler" className="sr-only">Artikel Berita Terkini</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {beritaTampil.map((berita) => (
              <article
                key={berita.id}
                id={`berita-${berita.id}`}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 group flex flex-col"
              >
                {/* ── Thumbnail: foto jika ada, fallback gradient ── */}
                <div
                  className={`relative h-44 overflow-hidden bg-gradient-to-br ${berita.gradient} flex items-end p-4`}
                >
                  {berita.foto && (
                    <img
                      src={berita.foto}
                      alt={berita.judul}
                      className="absolute inset-0 w-full h-full object-cover z-0"
                    />
                  )}
                  {berita.foto && (
                    <div className="absolute inset-0 bg-black/30 z-[1]" aria-hidden="true" />
                  )}
                  <div className="relative z-10">
                    <LabelKategori label={berita.kategori} color={berita.kategoriColor} />
                  </div>
                </div>

                {/* Konten */}
                <div className="p-5 flex flex-col flex-1">
                  <p className="text-gray-400 text-xs mb-2">{formatTanggal(berita.tanggal)}</p>
                  <h3 className="font-bold text-gray-900 text-sm sm:text-base leading-snug mb-2 group-hover:text-[#0A58CA] transition-colors line-clamp-2 flex-1">
                    {berita.judul}
                  </h3>
                  <p className="text-gray-500 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-2">
                    {berita.ringkasan}
                  </p>
                  <button
                    type="button"
                    onClick={() => setBeritaAktif(berita)}
                    className="text-xs font-semibold flex items-center gap-1 mt-auto transition-colors hover:underline"
                    style={{ color: "#0A58CA" }}
                  >
                    Baca Selengkapnya →
                  </button>
                </div>
              </article>
            ))}
          </div>

          {/* ── Pagination Dinamis ────────────────────────────────── */}
          {totalHalaman > 1 && (
            <nav aria-label="Navigasi halaman berita" className="flex items-center justify-center gap-2">
              {/* Tombol Prev */}
              <button
                type="button"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:border-blue-300 hover:text-blue-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label="Halaman sebelumnya"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
              </button>

              {/* Tombol Nomor Halaman */}
              {Array.from({ length: totalHalaman }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  type="button"
                  id={`pagination-hal-${page}`}
                  onClick={() => handlePageChange(page)}
                  className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-bold transition-colors ${currentPage === page
                    ? "text-white"
                    : "border border-gray-200 text-gray-600 hover:border-blue-300 hover:text-blue-600"
                    }`}
                  style={currentPage === page ? { backgroundColor: "#0A58CA" } : {}}
                  aria-current={currentPage === page ? "page" : undefined}
                  aria-label={`Halaman ${page}`}
                >
                  {page}
                </button>
              ))}

              {/* Tombol Next */}
              <button
                type="button"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalHalaman}
                className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:border-blue-300 hover:text-blue-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label="Halaman berikutnya"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </nav>
          )}

        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          MODAL POP-UP BACA BERITA
          ════════════════════════════════════════════════════ */}
      {beritaAktif && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setBeritaAktif(null)}
        >
          <div
            className="relative bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Tombol Close */}
            <button
              onClick={() => setBeritaAktif(null)}
              className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors backdrop-blur-sm"
              aria-label="Tutup Modal"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Gambar Hero Modal */}
            {beritaAktif.foto ? (
              <img
                src={beritaAktif.foto}
                alt={beritaAktif.judul}
                className="w-full h-64 sm:h-80 object-cover flex-shrink-0"
              />
            ) : (
              <div className={`w-full h-48 sm:h-64 flex-shrink-0 relative bg-gradient-to-br ${beritaAktif.gradient || "from-gray-500 to-gray-700"}`}>
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 50% 50%, #fff 0%, transparent 50%)" }} />
              </div>
            )}

            {/* Konten Modal */}
            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-4">
                <LabelKategori label={beritaAktif.kategori} color={beritaAktif.kategoriColor} />
                <span className="text-gray-400 text-sm">{formatTanggal(beritaAktif.tanggal)}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-6 leading-tight break-words">
                {beritaAktif.judul}
              </h2>
              <div className="prose max-w-none text-gray-600">
                <p className="whitespace-pre-wrap leading-relaxed text-[15px] break-words">{beritaAktif.ringkasan}</p>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
