/* =========================================================
   HALAMAN PROFIL — Portal Resmi Kelurahan Parit Mayor
   Sliced dari Figma Frame 2
   Mencakup: Sub-Hero, Visi Misi, Geografis, Struktur Organisasi
   ========================================================= */

import Link from "next/link";

/* ── Metadata Halaman ────────────────────────────────────── */
export const metadata = {
  title: "Profil Kelurahan",
  description:
    "Profil lengkap Kelurahan Parit Mayor: sejarah, visi misi, batas wilayah geografis, dan struktur organisasi aparatur kelurahan.",
};

/* ── Data Bagan Struktur Organisasi ──────────────────────── */
const strukturOrganisasi = {
  lurah: {
    nama: "Erlin Agustningsih, S.Sos.",
    jabatan: "Lurah Parit Mayor",
    foto: null,
  },
  sekretaris: {
    nama: "Nama Sekretaris",
    jabatan: "Sekretaris Kelurahan",
    foto: null,
  },
  kasi: [
    {
      id: "kasi-a",
      nama: "Kepala Seksi A",
      jabatan: "Kasi Pemerintahan",
    },
    {
      id: "kasi-b",
      nama: "Kepala Seksi B",
      jabatan: "Kasi Pemberdayaan Masyarakat",
    },
    {
      id: "kasi-c",
      nama: "Kepala Seksi C",
      jabatan: "Kasi Ketenteraman & Ketertiban",
    },
  ],
};

/* ── Komponen Kartu Organisasi ───────────────────────────── */
function KartuOrg({ nama, jabatan, isLurah = false }) {
  return (
    <div
      className={`
        flex flex-col items-center text-center px-4 py-5 rounded-xl border shadow-sm
        ${isLurah
          ? "border-blue-300 bg-blue-50"
          : "border-gray-200 bg-white"
        }
      `}
    >
      {/* Avatar */}
      <div
        className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 ${isLurah ? "text-white" : "text-gray-500"}`}
        style={{ backgroundColor: isLurah ? "#0A58CA" : "#E5E7EB" }}
        aria-hidden="true"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
        </svg>
      </div>
      <p className={`font-semibold text-sm ${isLurah ? "text-blue-900" : "text-gray-800"}`}>{nama}</p>
      <p className="text-gray-500 text-xs mt-0.5">{jabatan}</p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   HALAMAN PROFIL — Main Component
   ═══════════════════════════════════════════════════════════ */
export default function ProfilPage() {
  return (
    <div className="flex flex-col">

      {/* ════════════════════════════════════════════════════
          1. SUB-HERO BANNER — Hijau, Profil & Sejarah
          ════════════════════════════════════════════════════ */}
      <section
        id="hero-profil"
        aria-label="Profil & Sejarah Kelurahan Parit Mayor"
        className="relative overflow-hidden py-16 md:py-24"
        style={{ background: "linear-gradient(135deg, #052c65 0%, #0A58CA 100%)" }}
      >
        {/* Dekoratif grid */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "repeating-linear-gradient(0deg,#fff,#fff 1px,transparent 1px,transparent 50px),repeating-linear-gradient(90deg,#fff,#fff 1px,transparent 1px,transparent 50px)" }}
          aria-hidden="true" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

            {/* Teks */}
            <div>
              {/* Breadcrumb */}
              <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-blue-300 text-xs mb-4">
                <Link href="/" className="hover:text-white transition-colors">Beranda</Link>
                <span aria-hidden="true">/</span>
                <span className="text-white font-medium">Profil Kelurahan</span>
              </nav>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 leading-tight">
                Profil & Sejarah Parit Mayor
              </h1>
              <p className="text-blue-200 text-sm sm:text-base leading-relaxed max-w-lg">
                Mengenal lebih dekat perjalanan panjang dan perkembangan Kelurahan Parit Mayor,
                dari masa pembentukannya hingga menjadi komunitas yang dinamis dan berbudaya seperti saat ini.
              </p>
            </div>

            {/* Gambar/Ilustrasi — aerial sungai */}
            <div className="hidden md:flex justify-end">
              <div className="relative w-full max-w-sm h-56 rounded-2xl overflow-hidden shadow-2xl"
                style={{ background: "linear-gradient(135deg, #064e3b, #065f46, #047857)" }}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-20 h-20 text-white/30" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z"/>
                  </svg>
                </div>
                <div className="absolute bottom-4 left-4 right-4 bg-black/40 backdrop-blur-sm rounded-lg px-3 py-2">
                  <p className="text-white text-xs font-medium">Foto Aerial Sungai Kapuas — Parit Mayor</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          2. SEJARAH PEMBENTUKAN — Teks panjang 2 blok
          ════════════════════════════════════════════════════ */}
      <section id="sejarah-pembentukan" aria-labelledby="heading-sejarah" className="bg-white py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 id="heading-sejarah" className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">
              Sejarah Pembentukan
            </h2>
            <div className="w-12 h-1.5 rounded-full mb-6" style={{ backgroundColor: "#198754" }} aria-hidden="true" />

            <div className="space-y-4 text-gray-600 text-sm sm:text-base leading-relaxed">
              <p>
                Kelurahan Parit Mayor merupakan salah satu kelurahan yang berada dalam wilayah
                administratif Kecamatan Pontianak Timur, Kota Pontianak, Kalimantan Barat. Nama
                <em> "Parit Mayor"</em> berasal dari sebuah parit besar yang dibangun pada masa
                kolonial oleh seorang tokoh Tionghoa berpengaruh, membuatnya memiliki peran
                strategis dalam perekayasaan wilayah setempat.
              </p>
              <p>
                Seiring berjalannya waktu dan pertumbuhan penduduk, wilayah ini berkembang pesat
                dengan berbagai fasilitas publik, infrastruktur, dan layanan masyarakat yang terus
                ditingkatkan dari tahun ke tahun. Kelurahan ini dikenal memiliki karakteristik
                penduduk yang heterogen — memadukan berbagai latar belakang etnis, budaya, dan
                profesi dalam satu komunitas yang harmonis.
              </p>
              <p>
                Transformasi nyata terjadi ketika Kelurahan Parit Mayor menjadikan pelayanan
                publik digital sebagai prioritas, mendekatkan pemerintah dengan warga melalui
                berbagai inovasi berbasis teknologi informasi yang mudah diakses dan transparan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          3. KOLAM SUSU — Cagar Budaya Highlight
          ════════════════════════════════════════════════════ */}
      <section id="kolam-susu" aria-labelledby="heading-kolam" className="py-16 md:py-20" style={{ backgroundColor: "#F8F9FA" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{ background: "linear-gradient(135deg, #064e3b 0%, #065f46 50%, #047857 100%)", minHeight: "280px" }}
          >
            {/* Dekoratif */}
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: "radial-gradient(circle at 20% 50%, #fff 0%, transparent 50%)",
            }} aria-hidden="true" />

            <div className="relative p-8 md:p-12 flex flex-col justify-end h-full min-h-[280px]">
              <span className="inline-block bg-green-700 text-white text-xs font-bold px-3 py-1 rounded-full mb-4 w-fit">
                Situs Sejarah
              </span>
              <h2 id="heading-kolam" className="text-white text-2xl sm:text-3xl font-extrabold mb-3">
                Kolam Susu (Kolam Teduh)
              </h2>
              <p className="text-green-100 text-sm sm:text-base leading-relaxed max-w-2xl">
                Dahulu bernama Kolam Susu, kini dikenal sebagai Kolam Teduh, kawasan ini menjadi
                salah satu destinasi sejarah paling ikonik di Parit Mayor. Di dalamnya terdapat
                warisan budaya yang mencerminkan nilai luhur masyarakat — taman interaktif,
                pohon-pohon tua bersejarah, dan ruang terbuka publik yang hijau. Kawasan ini telah
                mendapat perhatian khusus dari pemerintah daerah untuk dilestarikan sebagai aset
                budaya dan kebanggaan masyarakat setempat.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          4. VISI & MISI — Kartu berdampingan
          ════════════════════════════════════════════════════ */}
      <section id="visi-misi" aria-labelledby="heading-visi-misi" className="bg-white py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-10">
            <h2 id="heading-visi-misi" className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">
              Visi & Misi Kelurahan
            </h2>
            <p className="text-gray-500 text-sm">Arah pembangunan dan komitmen pelayanan kami.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Visi */}
            <div className="rounded-2xl p-6 sm:p-8 border-l-4" style={{ backgroundColor: "#EBF2FF", borderColor: "#0A58CA" }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white" style={{ backgroundColor: "#0A58CA" }} aria-hidden="true">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>
                </div>
                <h3 className="font-extrabold text-lg" style={{ color: "#052c65" }}>VISI</h3>
              </div>
              <blockquote className="text-gray-800 text-sm sm:text-base leading-relaxed italic font-medium">
                &ldquo;Mewujudkan Kelurahan Parit Mayor yang Maju, Sejahtera, dan Berbudaya
                melalui Tata Kelola Pemerintahan yang Transparan, Inovatif, dan Partisipatif.&rdquo;
              </blockquote>
            </div>

            {/* Misi */}
            <div className="rounded-2xl p-6 sm:p-8 border-l-4" style={{ backgroundColor: "#D1F5E0", borderColor: "#198754" }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white" style={{ backgroundColor: "#198754" }} aria-hidden="true">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                </div>
                <h3 className="font-extrabold text-lg" style={{ color: "#064e3b" }}>MISI</h3>
              </div>
              <ol className="space-y-2.5 text-gray-700 text-sm">
                {[
                  "Meningkatkan kualitas pelayanan publik yang cepat, mudah, dan bebas pungli.",
                  "Mendorong pemberdayaan masyarakat dan ekonomi lokal berbasis potensi wilayah.",
                  "Memperkuat kerukunan dan ketertiban sosial antar warga lintas etnis dan budaya.",
                  "Mengembangkan infrastruktur dan lingkungan hidup yang bersih dan berkelanjutan.",
                  "Meningkatkan transparansi dan akuntabilitas melalui digitalisasi pemerintahan.",
                ].map((misi, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full text-white flex items-center justify-center text-xs font-bold"
                      style={{ backgroundColor: "#198754" }} aria-hidden="true">{i + 1}</span>
                    <span>{misi}</span>
                  </li>
                ))}
              </ol>
            </div>

          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          5. BLOK GEOGRAFIS — Batas wilayah 4 arah
          ════════════════════════════════════════════════════ */}
      <section id="batas-wilayah" aria-labelledby="heading-geo" className="py-16 md:py-20" style={{ backgroundColor: "#F8F9FA" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-10">
            <h2 id="heading-geo" className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">
              Batas Wilayah Geografis
            </h2>
            <p className="text-gray-500 text-sm">Batas administrasi 4 penjuru Kelurahan Parit Mayor.</p>
          </div>

          {/* Grid 4 kartu batas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                arah: "Utara",
                emoji: "⬆️",
                deskripsi: "Kelurahan Saigon",
                detail: "Kecamatan Pontianak Timur",
                color: "#0A58CA",
                bg: "#EBF2FF",
              },
              {
                arah: "Selatan",
                emoji: "⬇️",
                deskripsi: "Kecamatan Pontianak Tenggara",
                detail: "Kota Pontianak",
                color: "#198754",
                bg: "#D1F5E0",
              },
              {
                arah: "Barat",
                emoji: "⬅️",
                deskripsi: "Kel. Banjar Serasan & Sungai Kapuas",
                detail: "Pontianak Timur",
                color: "#7C3AED",
                bg: "#EDE9FE",
              },
              {
                arah: "Timur",
                emoji: "➡️",
                deskripsi: "Kabupaten Kubu Raya",
                detail: "Kalimantan Barat",
                color: "#DC6803",
                bg: "#FEF3C7",
              },
            ].map((b) => (
              <div key={b.arah} id={`batas-${b.arah.toLowerCase()}`}
                className="rounded-2xl p-5 text-center flex flex-col items-center gap-2 shadow-sm border border-white"
                style={{ backgroundColor: b.bg }}>
                <span className="text-2xl" aria-hidden="true">{b.emoji}</span>
                <p className="text-xs font-bold tracking-widest uppercase" style={{ color: b.color }}>{b.arah}</p>
                <p className="font-bold text-gray-900 text-sm leading-snug">{b.deskripsi}</p>
                <p className="text-gray-500 text-xs">{b.detail}</p>
              </div>
            ))}
          </div>

          {/* Info tambahan luas wilayah */}
          <div className="mt-6 rounded-xl p-5 border text-center" style={{ backgroundColor: "#EBF2FF", borderColor: "#BFDBFE" }}>
            <p className="text-gray-700 text-sm">
              Luas total wilayah Kelurahan Parit Mayor:{" "}
              <strong style={{ color: "#0A58CA" }}>5.42 km²</strong>, meliputi{" "}
              <strong>28 RT</strong> dan <strong>7 RW</strong> dengan total{" "}
              <strong>12.450 penduduk</strong>.
            </p>
          </div>

        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          6. BAGAN STRUKTUR ORGANISASI VERTIKAL
          ════════════════════════════════════════════════════ */}
      <section id="struktur-organisasi" aria-labelledby="heading-struktur" className="bg-white py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-10">
            <h2 id="heading-struktur" className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">
              Struktur Organisasi
            </h2>
            <p className="text-gray-500 text-sm">Aparatur pelaksana kelurahan Parit Mayor.</p>
          </div>

          {/* Hierarki Visual */}
          <div className="flex flex-col items-center gap-0 max-w-2xl mx-auto">

            {/* Lurah — Level 1 */}
            <div className="w-64">
              <KartuOrg
                nama={strukturOrganisasi.lurah.nama}
                jabatan={strukturOrganisasi.lurah.jabatan}
                isLurah={true}
              />
            </div>

            {/* Connector */}
            <div className="w-0.5 h-8 bg-gray-300" aria-hidden="true" />

            {/* Sekretaris — Level 2 */}
            <div className="w-56">
              <KartuOrg
                nama={strukturOrganisasi.sekretaris.nama}
                jabatan={strukturOrganisasi.sekretaris.jabatan}
              />
            </div>

            {/* Connector horizontal */}
            <div className="w-0.5 h-8 bg-gray-300" aria-hidden="true" />

            {/* Garis horizontal penghubung Kasi */}
            <div className="w-full relative flex items-center justify-center" aria-hidden="true">
              <div className="absolute top-0 left-1/4 right-1/4 h-0.5 bg-gray-300" />
            </div>

            {/* Kasi — Level 3 — Grid 3 kolom */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4 mt-0">
              {strukturOrganisasi.kasi.map((k) => (
                <div key={k.id} className="flex flex-col items-center gap-0">
                  <div className="w-0.5 h-6 bg-gray-300" aria-hidden="true" />
                  <KartuOrg nama={k.nama} jabatan={k.jabatan} />
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
