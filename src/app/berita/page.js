/* =========================================================
   HALAMAN BERITA & KEGIATAN — Portal Resmi Kelurahan Parit Mayor
   Sliced dari Figma Frame 4
   Mencakup: Hero Featured News, Grid 3 kolom, Pagination
   ========================================================= */

import Link from "next/link";

/* ── Metadata Halaman ────────────────────────────────────── */
export const metadata = {
  title: "Berita & Kegiatan",
  description:
    "Berita terkini, pengumuman resmi, dan liputan kegiatan Kelurahan Parit Mayor, Pontianak Timur.",
};

/* ── Data Berita ─────────────────────────────────────────── */
const beritaFeatured = {
  id: "kerja-bakti-hut-ri",
  kategori: "Kegiatan Warga",
  kategoriColor: "#0A58CA",
  tanggal: "11 Agustus 2026",
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
    tanggal: "03 Agt 2026",
    judul: "Jadwal Kegiatan Posyandu Balita & Lansia Bulan Agustus",
    ringkasan:
      "Puskesmas dan kader posyandu mengumumkan jadwal pemeriksaan kesehatan gratis bagi balita dan warga lanjut usia.",
    gradient: "from-green-600 to-green-800",
  },
  {
    id: "drainase-rw03",
    kategori: "Pemerintahan",
    kategoriColor: "#7C3AED",
    tanggal: "29 Jul 2026",
    judul: "Perbaikan Drainase Lingkungan RW 03 Selesai Dilaksanakan",
    ringkasan:
      "Sebagai bagian dari pencegahan banjir musiman, perbaikan drainase di wilayah RW 03 kini resmi selesai dikerjakan.",
    gradient: "from-violet-600 to-violet-800",
  },
  {
    id: "musrenbang",
    kategori: "Pemerintahan",
    kategoriColor: "#DC6803",
    tanggal: "21 Jul 2026",
    judul: "Musyawarah Perencanaan Pembangunan (Musrenbang) Kelurahan 2026",
    ringkasan:
      "Kelurahan Parit Mayor menggelar Musrenbang tahunan untuk menyusun program prioritas pembangunan tahun anggaran berikutnya.",
    gradient: "from-orange-600 to-orange-800",
  },
  {
    id: "penerimaan-beasiswa",
    kategori: "Pendidikan",
    kategoriColor: "#0891B2",
    tanggal: "15 Jul 2026",
    judul: "Pengumuman Penerimaan Beasiswa Warga Kurang Mampu Tahap II",
    ringkasan:
      "Kelurahan membuka pendaftaran beasiswa pendidikan bagi pelajar berprestasi dari keluarga kurang mampu. Daftar sekarang!",
    gradient: "from-cyan-600 to-cyan-800",
  },
  {
    id: "pemuda-produktif",
    kategori: "Kegiatan Warga",
    kategoriColor: "#0A58CA",
    tanggal: "08 Jul 2026",
    judul: "Program Pemuda Produktif: Pelatihan Keterampilan Digital",
    ringkasan:
      "Karang taruna dan pemerintah kelurahan berkolaborasi menggelar pelatihan desain grafis dan pemasaran digital bagi pemuda.",
    gradient: "from-blue-600 to-indigo-700",
  },
  {
    id: "imunisasi-polio",
    kategori: "Kesehatan",
    kategoriColor: "#198754",
    tanggal: "01 Jul 2026",
    judul: "Sub-PIN Imunisasi Polio Nasional di Kelurahan Parit Mayor",
    ringkasan:
      "Kelurahan bersama Puskesmas mensukseskan program imunisasi polio nasional bagi anak usia 0-7 tahun di seluruh RT.",
    gradient: "from-emerald-600 to-green-700",
  },
];

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
  return (
    <div className="flex flex-col">

      {/* ════════════════════════════════════════════════════
          1. PAGE HEADER — Beranda sub-hero putih
          ════════════════════════════════════════════════════ */}
      <section id="hero-berita" aria-label="Berita & Kegiatan" className="bg-white py-12 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
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
          <article
            className={`relative rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br ${beritaFeatured.gradient} group cursor-pointer hover:shadow-2xl transition-all duration-300`}
            aria-labelledby="heading-featured"
          >
            <div className="relative z-10 p-8 md:p-12" style={{ minHeight: "320px" }}>
              {/* Dekoratif pattern */}
              <div className="absolute inset-0 opacity-10"
                style={{ backgroundImage: "radial-gradient(circle at 80% 20%, #fff 0%, transparent 50%)" }}
                aria-hidden="true" />

              <div className="relative flex flex-col justify-between h-full" style={{ minHeight: "inherit" }}>
                {/* Badge */}
                <div className="flex items-center gap-3 mb-auto">
                  <LabelKategori label={beritaFeatured.kategori} color={beritaFeatured.kategoriColor} />
                  <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full">
                    Featured
                  </span>
                </div>

                {/* Konten teks featured */}
                <div className="mt-16 md:mt-24">
                  <p className="text-blue-200 text-xs mb-2">
                    {beritaFeatured.tanggal} • {beritaFeatured.penulis}
                  </p>
                  <h2 id="heading-featured" className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight mb-4 max-w-2xl">
                    {beritaFeatured.judul}
                  </h2>
                  <p className="text-blue-200 text-sm sm:text-base leading-relaxed max-w-2xl mb-6">
                    {beritaFeatured.ringkasan}
                  </p>
                  <Link
                    href={beritaFeatured.href}
                    className="inline-flex items-center gap-2 bg-white text-blue-900 font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-blue-50 transition-colors"
                  >
                    Baca Selengkapnya →
                  </Link>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          3. GRID BERITA REGULER — 3 kolom
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
            {beritaRegular.map((berita) => (
              <article
                key={berita.id}
                id={`berita-${berita.id}`}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 group flex flex-col"
              >
                {/* Thumbnail gradient */}
                <div className={`h-44 bg-gradient-to-br ${berita.gradient} flex items-end p-4`}>
                  <LabelKategori label={berita.kategori} color={berita.kategoriColor} />
                </div>

                {/* Konten */}
                <div className="p-5 flex flex-col flex-1">
                  <p className="text-gray-400 text-xs mb-2">{berita.tanggal}</p>
                  <h3 className="font-bold text-gray-900 text-sm sm:text-base leading-snug mb-2 group-hover:text-[#0A58CA] transition-colors line-clamp-2 flex-1">
                    {berita.judul}
                  </h3>
                  <p className="text-gray-500 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-2">
                    {berita.ringkasan}
                  </p>
                  <Link
                    href={`/berita/${berita.id}`}
                    className="text-xs font-semibold flex items-center gap-1 mt-auto transition-colors hover:underline"
                    style={{ color: "#0A58CA" }}
                  >
                    Baca Selengkapnya →
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* ── Pagination ─────────────────────────────────── */}
          <nav aria-label="Navigasi halaman berita" className="flex items-center justify-center gap-2">
            {/* Prev */}
            <button
              type="button"
              className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:border-blue-300 hover:text-blue-600 transition-colors"
              aria-label="Halaman sebelumnya"
              disabled
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
              </svg>
            </button>

            {/* Halaman 1 — aktif */}
            <button
              type="button"
              id="pagination-hal-1"
              className="w-9 h-9 flex items-center justify-center rounded-lg text-white text-sm font-bold"
              style={{ backgroundColor: "#0A58CA" }}
              aria-current="page"
              aria-label="Halaman 1"
            >
              1
            </button>

            {/* Halaman 2 */}
            <button
              type="button"
              id="pagination-hal-2"
              className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 text-sm hover:border-blue-300 hover:text-blue-600 transition-colors"
              aria-label="Halaman 2"
            >
              2
            </button>

            {/* Halaman 3 */}
            <button
              type="button"
              id="pagination-hal-3"
              className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 text-sm hover:border-blue-300 hover:text-blue-600 transition-colors"
              aria-label="Halaman 3"
            >
              3
            </button>

            {/* Next */}
            <button
              type="button"
              className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:border-blue-300 hover:text-blue-600 transition-colors"
              aria-label="Halaman berikutnya"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </nav>

        </div>
      </section>

    </div>
  );
}
