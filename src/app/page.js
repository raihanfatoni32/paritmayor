/* =========================================================
   HALAMAN BERANDA — Portal Resmi Kelurahan Parit Mayor
   Sliced dari Figma Frame 1
   Stack: Next.js (App Router) + Tailwind CSS
   ========================================================= */

import Link from "next/link";

/* ── Metadata Halaman ────────────────────────────────────── */
export const metadata = {
  title: "Beranda | Portal Resmi Kelurahan Parit Mayor",
  description:
    "Selamat datang di portal resmi Kelurahan Parit Mayor. Temukan informasi layanan publik, berita, dan program unggulan kelurahan kami.",
};

/* ── Data Statistik Kependudukan ─────────────────────────── */
const statistik = [
  {
    id: "penduduk",
    label: "Total Penduduk",
    value: "12.450",
    unit: "Jiwa",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
      </svg>
    ),
    color: "#0A58CA",
    bg: "#EBF2FF",
  },
  {
    id: "kk",
    label: "Kepala Keluarga",
    value: "3.820",
    unit: "KK",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
    color: "#198754",
    bg: "#D1F5E0",
  },
  {
    id: "luas",
    label: "Luas Wilayah",
    value: "5.42",
    unit: "km²",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z" />
      </svg>
    ),
    color: "#7C3AED",
    bg: "#EDE9FE",
  },
  {
    id: "rtrw",
    label: "RT / RW",
    value: "28 / 07",
    unit: "",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
      </svg>
    ),
    color: "#DC6803",
    bg: "#FEF3C7",
  },
];

/* ── Data Berita Terkini ──────────────────────────────────── */
const beritaList = [
  {
    id: "kerja-bakti",
    kategori: "Kegiatan Warga",
    kategoriColor: "#0A58CA",
    tanggal: "11 Agt 2026",
    judul: "Kerja Bakti Akbar Menyambut HUT Kemerdekaan RI ke-81",
    ringkasan:
      "Seluruh warga Parit Mayor bersatu dalam kegiatan kerja bakti massal membersihkan lingkungan RT/RW sebelum menyambut Hari Kemerdekaan.",
    href: "/berita/kerja-bakti-hut-ri",
    gradient: "from-blue-600 to-blue-800",
  },
  {
    id: "posyandu",
    kategori: "Kesehatan",
    kategoriColor: "#198754",
    tanggal: "03 Agt 2026",
    judul: "Jadwal Kegiatan Posyandu Balita & Lansia Bulan Ini",
    ringkasan:
      "Puskesmas dan kader posyandu mengumumkan jadwal pemeriksaan kesehatan gratis bagi balita dan warga lanjut usia di setiap RW.",
    href: "/berita/posyandu-agustus",
    gradient: "from-green-600 to-green-800",
  },
];

/* ═══════════════════════════════════════════════════════════
   HALAMAN BERANDA — Main Component
   ═══════════════════════════════════════════════════════════ */
export default function BerandaPage() {
  return (
    <div className="flex flex-col">

      {/* ════════════════════════════════════════════════════
          1. HERO SECTION — Background foto kantor kelurahan
          ════════════════════════════════════════════════════ */}
      <section
        id="hero-beranda"
        aria-label="Selamat datang di Kelurahan Parit Mayor"
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #052c65 0%, #0A58CA 60%, #0846a8 100%)",
          minHeight: "520px",
        }}
      >
        {/* Dekoratif: Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg,#fff,#fff 1px,transparent 1px,transparent 60px),repeating-linear-gradient(90deg,#fff,#fff 1px,transparent 1px,transparent 60px)",
          }}
          aria-hidden="true"
        />

        {/* Dekoratif: Lingkaran radial blur */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-20 blur-3xl -translate-y-1/2 translate-x-1/3"
          style={{ backgroundColor: "#198754" }} aria-hidden="true" />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full opacity-20 blur-3xl translate-y-1/2 -translate-x-1/4"
          style={{ backgroundColor: "#0A58CA" }} aria-hidden="true" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          {/* Badge Resmi */}
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6 border border-white/20">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" aria-hidden="true" />
            Portal Resmi Pemerintahan
          </div>

          {/* Headline Utama */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-5 max-w-3xl">
            Selamat Datang di Portal Resmi{" "}
            <span style={{ color: "#6EE7B7" }}>Kelurahan Parit Mayor</span>
          </h1>

          {/* Sub-teks */}
          <p className="text-blue-200 text-base sm:text-lg leading-relaxed mb-9 max-w-2xl">
            Melayani masyarakat dengan transparan, inovatif, dan sepenuh hati. Temukan
            informasi layanan publik, berita, dan program unggulan di kelurahan kami.
          </p>

          {/* CTA Ganda */}
          <div className="flex flex-wrap gap-3">
            <Link
              href="/layanan"
              id="btn-hero-layanan"
              className="inline-flex items-center gap-2 text-white font-semibold text-sm px-6 py-3 rounded-xl shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl"
              style={{ backgroundColor: "#198754" }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25Z" />
              </svg>
              Pusat Layanan
            </Link>
            <Link
              href="/profil"
              id="btn-hero-profil"
              className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 text-white font-semibold text-sm px-6 py-3 rounded-xl border border-white/30 transition-all duration-200 hover:-translate-y-0.5 backdrop-blur-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
              </svg>
              Profil Kelurahan
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          2. SAMBUTAN LURAH — Foto + Teks formal 2 kolom
          ════════════════════════════════════════════════════ */}
      <section
        id="sambutan-lurah"
        aria-labelledby="heading-sambutan"
        className="bg-white py-16 md:py-20"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* Kolom Kiri — Foto Lurah */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/5] max-w-sm mx-auto md:mx-0"
                style={{ background: "linear-gradient(135deg, #0A58CA, #052c65)" }}>
                {/* Placeholder foto Lurah — gradient avatar */}
                <div className="absolute inset-0 flex flex-col items-center justify-end pb-6">
                  <div className="w-32 h-32 rounded-full bg-white/20 border-4 border-white/40 flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-white/80" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                    </svg>
                  </div>
                </div>
                {/* Dekoratif lingkaran */}
                <div className="absolute top-4 right-4 w-24 h-24 rounded-full border-4 border-white/10" aria-hidden="true" />
                <div className="absolute top-8 right-8 w-16 h-16 rounded-full border-4 border-white/10" aria-hidden="true" />
              </div>
              {/* Badge nama Lurah */}
              <div className="absolute -bottom-4 left-1/2 md:left-8 -translate-x-1/2 md:translate-x-0 bg-white rounded-xl shadow-lg px-5 py-3 text-center min-w-[200px]">
                <p className="font-bold text-gray-900 text-sm">Bpk. Ahmad Rival, S.STP</p>
                <p className="text-gray-500 text-xs">Lurah Parit Mayor</p>
              </div>
            </div>

            {/* Kolom Kanan — Teks Sambutan */}
            <div className="pt-8 md:pt-0">
              {/* Quote mark */}
              <div className="text-5xl font-serif mb-2 leading-none" style={{ color: "#0A58CA" }} aria-hidden="true">"</div>
              <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "#198754" }}>
                Sambutan Kepala Kelurahan
              </p>
              <h2 id="heading-sambutan" className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight mb-5">
                Membangun Parit Mayor yang Maju, Sejahtera, dan Berbudaya.
              </h2>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4">
                Assalamualaikum Warahmatullahi Wabarakatuh. Puji syukur kita panjatkan ke
                hadirat Tuhan Yang Maha Esa atas rahmat dan karunianya. Selamat datang di
                portal resmi Kelurahan Parit Mayor.
              </p>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
                Portal ini hadir sebagai wujud komitmen transparansi dan peningkatan kualitas
                pelayanan publik di era digital. Melalui platform ini, kami berharap warga
                dapat mengakses informasi layanan administrasi, program pembangunan, serta
                berbagai fasilitas kelurahan dengan lebih mudah, cepat, dan efisien.
              </p>
              <Link href="/profil" className="inline-flex items-center gap-2 font-semibold text-sm transition-colors hover:underline" style={{ color: "#0A58CA" }}>
                Lihat Profil Lengkap →
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          3. SEKILAS PARIT MAYOR — Cagar budaya Kolam Susu
          ════════════════════════════════════════════════════ */}
      <section
        id="sekilas-parit-mayor"
        aria-labelledby="heading-sekilas"
        className="py-16 md:py-20"
        style={{ backgroundColor: "#F8F9FA" }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* Kolom Kiri — Teks Sejarah */}
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "#198754" }}>
                Sekilas Parit Mayor
              </p>
              <h2 id="heading-sekilas" className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-4">
                Profil & Sejarah Parit Mayor
              </h2>
              <div className="w-12 h-1.5 rounded-full mb-5" style={{ backgroundColor: "#0A58CA" }} aria-hidden="true" />
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4">
                Mengenal lebih dekat perjalanan panjang dan perkembangan Kelurahan Parit Mayor,
                dari masa pembentukannya hingga menjadi komunitas yang dinamis dan berbudaya seperti saat ini.
              </p>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
                Kelurahan Parit Mayor memiliki identitas yang kuat berakar pada warisan sejarah
                setempat. Kawasan ini dikenal memiliki cagar budaya bersejarah berupa{" "}
                <strong>Kolam Susu (Kolam Teduh)</strong> — sebuah kolam bersejarah yang dahulu
                menjadi sumber mata pencaharian dan pusat aktivitas sosial masyarakat.
              </p>
              <Link href="/profil" className="inline-flex items-center gap-2 text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition-all hover:opacity-90" style={{ backgroundColor: "#0A58CA" }}>
                Baca Selengkapnya →
              </Link>
            </div>

            {/* Kolom Kanan — Kolam Susu highlight card */}
            <div className="relative rounded-2xl overflow-hidden shadow-xl"
              style={{ background: "linear-gradient(135deg, #064e3b, #065f46, #047857)", minHeight: "300px" }}>
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <span className="inline-block bg-green-700/80 text-white text-xs font-bold px-3 py-1 rounded-full mb-3 w-fit">
                  Situs Sejarah
                </span>
                <h3 className="text-white text-xl font-bold mb-2">Kolam Susu (Kolam Teduh)</h3>
                <p className="text-green-100 text-sm leading-relaxed">
                  Dahulu bernama Kolam Susu, kini dikenal sebagai Kolam Teduh, sebuah kawasan
                  bersejarah di jantung Kelurahan Parit Mayor yang menjadi identitas budaya dan
                  kebanggaan masyarakat setempat.
                </p>
              </div>
              {/* Dekoratif pohon/alam */}
              <div className="absolute top-6 right-6 opacity-20">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-24 h-24 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17 8C8 10 5.9 16.17 3.82 21h2.41l1-2.5c.27.08.57.12.87.12.9 0 1.71-.34 2.33-.88A3.988 3.988 0 0 0 12 19c.51 0 .99-.1 1.44-.27.62.54 1.43.88 2.33.88.3 0 .6-.04.87-.12l1 2.5h2.41C17.1 16.17 15 10 6 8h11z" />
                </svg>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          4. PARIT MAYOR DALAM ANGKA — Statistik & IKM
          ════════════════════════════════════════════════════ */}
      <section
        id="data-demografi"
        aria-labelledby="heading-statistik"
        className="bg-white py-16 md:py-20"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "#0A58CA" }}>
              Data & Demografi
            </p>
            <h2 id="heading-statistik" className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-3">
              Parit Mayor Dalam Angka
            </h2>
            <p className="text-gray-500 text-sm max-w-lg mx-auto">
              Gambaran ringkas statistik kewilayahan Parit Mayor terkini.
            </p>
          </div>

          {/* Grid 4 kartu statistik utama */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {statistik.map((stat) => (
              <article
                key={stat.id}
                id={`stat-${stat.id}`}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col items-center text-center hover:shadow-md transition-shadow"
              >
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-3"
                  style={{ backgroundColor: stat.bg, color: stat.color }}>
                  {stat.icon}
                </div>
                <p className="text-gray-500 text-xs font-medium uppercase tracking-wide mb-1">{stat.label}</p>
                <p className="text-2xl sm:text-3xl font-extrabold" style={{ color: stat.color }}>{stat.value}</p>
                {stat.unit && <p className="text-gray-400 text-xs mt-0.5">{stat.unit}</p>}
              </article>
            ))}
          </div>

          {/* Kartu Sorot IKM — full width highlight */}
          <div
            id="kartu-ikm"
            className="rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md"
            style={{ background: "linear-gradient(135deg, #052c65, #0A58CA)" }}
          >
            <div>
              <p className="text-blue-300 text-xs font-semibold uppercase tracking-widest mb-1">
                Indeks Kepuasan Masyarakat (IKM)
              </p>
              <h3 className="text-white text-2xl sm:text-3xl font-extrabold mb-1">
                98.750
              </h3>
              <p className="text-blue-200 text-sm">Nilai IKM Tahun 2024</p>
            </div>
            <div className="text-center sm:text-right">
              <span className="inline-block bg-green-400 text-green-900 font-extrabold text-lg px-6 py-2.5 rounded-xl">
                PREDIKAT A
              </span>
              <p className="text-blue-300 text-xs mt-2">Sangat Memuaskan</p>
            </div>
          </div>

        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          5. BERITA & KEGIATAN TERKINI
          ════════════════════════════════════════════════════ */}
      <section
        id="berita-terkini"
        aria-labelledby="heading-berita"
        className="py-16 md:py-20"
        style={{ backgroundColor: "#F8F9FA" }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header baris */}
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase mb-1" style={{ color: "#198754" }}>
                Kabar Terbaru
              </p>
              <h2 id="heading-berita" className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                Berita & Kegiatan Terkini
              </h2>
              <p className="text-gray-500 text-sm mt-1">Berita, pengumuman, dan kegiatan terpopuler Kelurahan Parit Mayor.</p>
            </div>
            <Link href="/berita" className="text-sm font-semibold transition-colors hover:underline flex items-center gap-1" style={{ color: "#0A58CA" }}>
              Lihat Semua Berita →
            </Link>
          </div>

          {/* Grid 2 kartu berita */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {beritaList.map((berita) => (
              <article
                key={berita.id}
                id={`berita-${berita.id}`}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 group"
              >
                {/* Thumbnail gradient */}
                <div className={`relative h-48 bg-gradient-to-br ${berita.gradient} flex items-end p-4`}>
                  <span
                    className="inline-block text-white text-xs font-bold px-3 py-1 rounded-full"
                    style={{ backgroundColor: berita.kategoriColor }}
                  >
                    {berita.kategori}
                  </span>
                </div>

                <div className="p-5">
                  <p className="text-gray-400 text-xs mb-2">{berita.tanggal}</p>
                  <h3 className="font-bold text-gray-900 text-base leading-snug mb-2 group-hover:text-[#0A58CA] transition-colors line-clamp-2">
                    {berita.judul}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">
                    {berita.ringkasan}
                  </p>
                  <Link href={berita.href} className="text-xs font-semibold flex items-center gap-1 transition-colors hover:underline" style={{ color: "#0A58CA" }}>
                    Baca Selengkapnya →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          6. MAKLUMAT PELAYANAN — Blok pernyataan aparatur
          ════════════════════════════════════════════════════ */}
      <section
        id="maklumat-pelayanan"
        aria-labelledby="heading-maklumat"
        className="bg-white py-16 md:py-20"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="rounded-2xl p-8 md:p-12 relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, #F8F9FA, #EBF2FF)" }}
          >
            {/* Dekoratif quote besar */}
            <div className="absolute top-4 left-6 text-9xl font-serif opacity-5 text-blue-900 leading-none select-none" aria-hidden="true">"</div>

            <div className="relative">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm"
                  style={{ backgroundColor: "#0A58CA" }} aria-hidden="true">📜</span>
                <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: "#0A58CA" }}>
                  Maklumat Pelayanan
                </p>
              </div>

              <h2 id="heading-maklumat" className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-6 max-w-2xl">
                Kesanggupan Aparatur Kelurahan Parit Mayor
              </h2>

              <blockquote className="text-gray-700 text-sm sm:text-base leading-relaxed border-l-4 pl-5 italic mb-6"
                style={{ borderColor: "#0A58CA" }}>
                &ldquo;Kami, seluruh aparatur Kelurahan Parit Mayor, dengan ini menyatakan
                SANGGUP untuk menyelenggarakan pelayanan sesuai standar pelayanan yang telah
                ditetapkan, dan apabila tidak menepati janji ini, kami siap menerima sanksi
                sesuai peraturan perundang-undangan yang berlaku.&rdquo;
              </blockquote>

              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" style={{ color: "#198754" }} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clipRule="evenodd" />
                  </svg>
                  <span>Cepat & Tepat Waktu</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" style={{ color: "#198754" }} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clipRule="evenodd" />
                  </svg>
                  <span>Transparan & Akuntabel</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" style={{ color: "#198754" }} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clipRule="evenodd" />
                  </svg>
                  <span>Bebas Pungli & Gratifikasi</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" style={{ color: "#198754" }} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clipRule="evenodd" />
                  </svg>
                  <span>Ramah & Santun</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
