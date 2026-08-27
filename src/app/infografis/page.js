/* =========================================================
   HALAMAN INFOGRAFIS DATA — Portal Resmi Kelurahan Parit Mayor
   Sliced dari Figma Frame 5
   Mencakup: Statistik Jenis Kelamin (Bar Chart),
             Tingkat Pendidikan (Pie Chart CSS),
             Mata Pencaharian (Horizontal Bar),
             Kartu statistik makro kependudukan
   ========================================================= */
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

/* ── Metadata Halaman — didefinisikan di layout karena ini client component ── */
// title: "Infografis & Data | Kelurahan Parit Mayor"

/* ── Data Statistik Makro ────────────────────────────────── */
const defaultMakroStats = [
  {
    id: "total-penduduk",
    label: "Total Penduduk",
    value: "12,450",
    icon: "👥",
    color: "#0A58CA",
    bg: "#EBF2FF",
  },
  {
    id: "kepala-keluarga",
    label: "Kepala Keluarga",
    value: "3,820",
    icon: "🏠",
    color: "#198754",
    bg: "#D1F5E0",
  },
  {
    id: "luas-wilayah",
    label: "Luas Wilayah",
    value: "5.42 km²",
    icon: "🗺️",
    color: "#7C3AED",
    bg: "#EDE9FE",
  },
  {
    id: "rt-rw",
    label: "RT / RW",
    value: "28 / 07",
    icon: "🏘️",
    color: "#DC6803",
    bg: "#FEF3C7",
  },
];

/* ── Data Jenis Kelamin ──────────────────────────────────── */
const dataGender = [
  { label: "Laki-laki", jumlah: 6_350, persen: 51, color: "#0A58CA" },
  { label: "Perempuan", jumlah: 6_100, persen: 49, color: "#198754" },
];
const maxGender = Math.max(...dataGender.map((d) => d.jumlah));

/* ── Data Tingkat Pendidikan ─────────────────────────────── */
const dataPendidikan = [
  { label: "SMA / Sederajat",    persen: 40, color: "#0A58CA" },
  { label: "SMP / Sederajat",    persen: 35, color: "#198754" },
  { label: "SD / Sederajat",     persen: 15, color: "#DC6803" },
  { label: "Perguruan Tinggi",   persen: 10, color: "#7C3AED" },
];

/* ── Data Mata Pencaharian ───────────────────────────────── */
const dataPencaharian = [
  { label: "Swasta",        persen: 45, color: "#0A58CA" },
  { label: "Pedagang",      persen: 30, color: "#198754" },
  { label: "Buruh",         persen: 15, color: "#DC6803" },
  { label: "PNS / TNI / Polri", persen: 10, color: "#7C3AED" },
];

/* ══════════════════════════════════════════════════════════
   HALAMAN INFOGRAFIS — Main Component
   ══════════════════════════════════════════════════════════ */
export default function InfografisPage() {
  const [makroStats, setMakroStats] = useState(defaultMakroStats);

  useEffect(() => {
    const fetchStatistik = async () => {
      try {
        const { data, error } = await supabase
          .from("profil_kelurahan")
          .select("total_penduduk, kepala_keluarga, jumlah_rt, jumlah_rw")
          .eq("id", 1)
          .maybeSingle();

        if (data && !error) {
          setMakroStats(prev => [
            { ...prev[0], value: Number(data.total_penduduk || 0).toLocaleString("en-US") },
            { ...prev[1], value: Number(data.kepala_keluarga || 0).toLocaleString("en-US") },
            { ...prev[2], value: prev[2].value }, // Luas wilayah tetap
            { ...prev[3], value: `${data.jumlah_rt || 0} / ${String(data.jumlah_rw || 0).padStart(2, '0')}` },
          ]);
        }
      } catch (err) {
        console.error("Gagal menarik data statistik:", err);
      }
    };
    fetchStatistik();
  }, []);

  return (
    <div className="flex flex-col">

      {/* ════════════════════════════════════════════════════
          1. HERO BANNER — Biru gelap
          ════════════════════════════════════════════════════ */}
      <section
        id="hero-infografis"
        aria-label="Infografis & Transparansi Data"
        className="relative overflow-hidden py-14 md:py-20"
        style={{ background: "linear-gradient(135deg, #052c65 0%, #0A58CA 100%)" }}
      >
        <div className="absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage: "repeating-linear-gradient(0deg,#fff,#fff 1px,transparent 1px,transparent 50px),repeating-linear-gradient(90deg,#fff,#fff 1px,transparent 1px,transparent 50px)" }}
          aria-hidden="true" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-blue-300 text-xs mb-4">
            <Link href="/" className="hover:text-white transition-colors">Beranda</Link>
            <span aria-hidden="true">/</span>
            <span className="text-white">Infografis & Data</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-3 max-w-2xl leading-tight">
            Infografis & Transparansi Data
          </h1>
          <p className="text-blue-200 text-sm sm:text-base max-w-xl leading-relaxed">
            Sajian data statistik kependudukan dan capaian program kerja Kelurahan Parit Mayor
            secara transparan.
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          2. STATISTIK MAKRO — 4 kartu berjajar
          ════════════════════════════════════════════════════ */}
      <section
        id="statistik-makro"
        aria-labelledby="heading-makro"
        className="py-8"
        style={{ backgroundColor: "#F8F9FA" }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="heading-makro" className="sr-only">Statistik Makro Kelurahan</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {makroStats.map((stat) => (
              <div
                key={stat.id}
                id={stat.id}
                className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{stat.label}</p>
                  <p className="text-2xl sm:text-3xl font-extrabold mt-1" style={{ color: stat.color }}>
                    {stat.value}
                  </p>
                </div>
                <div className="ml-auto w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ backgroundColor: stat.bg }} aria-hidden="true">
                  {stat.icon}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          3. CHART: Jenis Kelamin & Tingkat Pendidikan — 2 kolom
          ════════════════════════════════════════════════════ */}
      <section
        id="chart-jk-pendidikan"
        aria-label="Statistik Jenis Kelamin dan Tingkat Pendidikan"
        className="py-8"
        style={{ backgroundColor: "#F8F9FA" }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* ── Chart Jenis Kelamin — Bar Chart CSS ─────── */}
            <div id="chart-gender" className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center gap-2 mb-5">
                <span className="w-1 h-5 rounded-full block" style={{ backgroundColor: "#0A58CA" }} aria-hidden="true" />
                <h2 className="font-extrabold text-gray-900 text-base sm:text-lg">
                  Statistik Jenis Kelamin
                </h2>
              </div>

              {/* Bar Chart CSS — vertikal */}
              <div className="flex items-end justify-center gap-10 h-48 mb-4 px-4">
                {dataGender.map((d) => {
                  const heightPct = Math.round((d.jumlah / maxGender) * 100);
                  return (
                    <div key={d.label} className="flex flex-col items-center gap-2 flex-1">
                      <span className="text-xs font-bold" style={{ color: d.color }}>
                        {d.persen}%
                      </span>
                      <div className="w-full max-w-[72px] rounded-t-lg transition-all duration-700"
                        style={{
                          height: `${heightPct}%`,
                          backgroundColor: d.color,
                          minHeight: "20px",
                        }}
                        role="img"
                        aria-label={`${d.label}: ${d.jumlah.toLocaleString("id-ID")} jiwa`}
                      />
                    </div>
                  );
                })}
              </div>

              {/* Label X */}
              <div className="flex justify-center gap-10 px-4">
                {dataGender.map((d) => (
                  <div key={d.label} className="flex-1 flex flex-col items-center">
                    <p className="text-xs font-semibold text-gray-700">{d.label}</p>
                    <p className="text-xs text-gray-400">{d.jumlah.toLocaleString("id-ID")}</p>
                  </div>
                ))}
              </div>

              {/* Garis horizontal referensi */}
              <div className="mt-4 grid grid-cols-2 gap-3">
                {dataGender.map((d) => (
                  <div key={d.label} className="flex items-center gap-2 p-3 rounded-xl"
                    style={{ backgroundColor: d.label === "Laki-laki" ? "#EBF2FF" : "#D1F5E0" }}>
                    <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: d.color }} aria-hidden="true" />
                    <div>
                      <p className="text-xs font-bold" style={{ color: d.color }}>{d.label}</p>
                      <p className="text-xs text-gray-600">{d.persen}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Chart Pendidikan — Pie Chart CSS + Legenda ─ */}
            <div id="chart-pendidikan" className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center gap-2 mb-5">
                <span className="w-1 h-5 rounded-full block" style={{ backgroundColor: "#198754" }} aria-hidden="true" />
                <h2 className="font-extrabold text-gray-900 text-base sm:text-lg">
                  Tingkat Pendidikan Warga
                </h2>
              </div>

              {/* Pie Chart menggunakan conic-gradient CSS */}
              <div className="flex flex-col sm:flex-row items-center gap-6">
                {/* Lingkaran pie */}
                <div
                  className="flex-shrink-0 w-36 h-36 rounded-full shadow-inner"
                  role="img"
                  aria-label="Pie chart tingkat pendidikan warga"
                  style={{
                    background: `conic-gradient(
                      ${dataPendidikan[0].color} 0deg ${dataPendidikan[0].persen * 3.6}deg,
                      ${dataPendidikan[1].color} ${dataPendidikan[0].persen * 3.6}deg ${(dataPendidikan[0].persen + dataPendidikan[1].persen) * 3.6}deg,
                      ${dataPendidikan[2].color} ${(dataPendidikan[0].persen + dataPendidikan[1].persen) * 3.6}deg ${(dataPendidikan[0].persen + dataPendidikan[1].persen + dataPendidikan[2].persen) * 3.6}deg,
                      ${dataPendidikan[3].color} ${(dataPendidikan[0].persen + dataPendidikan[1].persen + dataPendidikan[2].persen) * 3.6}deg 360deg
                    )`,
                  }}
                />

                {/* Legenda */}
                <div className="flex flex-col gap-2.5 flex-1">
                  {dataPendidikan.map((d) => (
                    <div key={d.label} className="flex items-center gap-2.5">
                      <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: d.color }} aria-hidden="true" />
                      <span className="text-sm text-gray-700 flex-1">{d.label}</span>
                      <span className="text-sm font-bold" style={{ color: d.color }}>{d.persen}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          4. CHART: Mata Pencaharian — Horizontal Bar
          ════════════════════════════════════════════════════ */}
      <section
        id="chart-pencaharian"
        aria-labelledby="heading-pencaharian"
        className="py-8"
        style={{ backgroundColor: "#F8F9FA" }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">

            <div className="flex items-center gap-2 mb-6">
              <span className="w-1 h-5 rounded-full block" style={{ backgroundColor: "#DC6803" }} aria-hidden="true" />
              <h2 id="heading-pencaharian" className="font-extrabold text-gray-900 text-base sm:text-lg">
                Mata Pencaharian Utama
              </h2>
            </div>

            {/* Horizontal Bar Chart */}
            <div className="space-y-5" role="list" aria-label="Grafik batang horizontal mata pencaharian">
              {dataPencaharian.map((d, idx) => (
                <div key={d.label} role="listitem" id={`bar-${idx}`}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-medium text-gray-700 w-32 flex-shrink-0">{d.label}</span>
                    <span className="text-sm font-bold ml-auto" style={{ color: d.color }}>{d.persen}%</span>
                  </div>
                  {/* Track bar */}
                  <div className="h-8 bg-gray-100 rounded-lg overflow-hidden relative">
                    <div
                      className="h-full rounded-lg flex items-center px-3 transition-all duration-1000"
                      style={{ width: `${d.persen}%`, backgroundColor: d.color }}
                      role="progressbar"
                      aria-valuenow={d.persen}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={`${d.label}: ${d.persen}%`}
                    >
                      <span className="text-white text-xs font-bold">{d.persen}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          5. UNDUH LAPORAN — CTA hijau di bawah
          ════════════════════════════════════════════════════ */}
      <section
        id="unduh-laporan"
        aria-labelledby="heading-unduh-laporan"
        className="py-8 pb-12"
        style={{ backgroundColor: "#F8F9FA" }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="rounded-2xl p-6 sm:p-8 relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
            style={{ backgroundColor: "#D1F5E0", border: "1px solid #A7F3D0" }}
          >
            {/* Dekoratif dokumen */}
            <div className="absolute right-6 bottom-0 opacity-10" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-32 h-32 text-green-800" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"/>
              </svg>
            </div>

            <div className="relative">
              <h2 id="heading-unduh-laporan" className="text-lg sm:text-xl font-extrabold text-gray-900 mb-2">
                Butuh Data Lebih Rinci?
              </h2>
              <p className="text-gray-600 text-sm max-w-md">
                Unduh laporan demografi lengkap Kelurahan Parit Mayor tahun ini dalam format PDF
                untuk keperluan analisis atau pelaporan.
              </p>
            </div>

            <button
              type="button"
              id="btn-unduh-laporan"
              className="relative flex-shrink-0 flex items-center gap-2.5 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-md hover:opacity-90 hover:shadow-lg transition-all"
              style={{ backgroundColor: "#198754" }}
              onClick={() => {
                /* Simulasi download — lihat fungsi serupa di halaman layanan */
                alert("Mengunduh Laporan Demografi Parit Mayor 2024.pdf...");
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
              Unduh Laporan (PDF)
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
