/* =========================================================
   HALAMAN INFOGRAFIS DATA — Portal Resmi Kelurahan Parit Mayor
   Diagram interaktif dengan Recharts + Framer Motion + Supabase
   ========================================================= */
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from "recharts";
import { motion } from "framer-motion";

/* ── Custom Tooltip Recharts ─────────────────────────────── */
const CustomBarTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-100 shadow-lg rounded-xl px-4 py-3 text-sm">
        <p className="font-bold text-gray-900 mb-1">{label}</p>
        {payload.map((p) => (
          <p key={p.name} style={{ color: p.fill }} className="font-semibold">
            {p.value.toLocaleString("id-ID")} jiwa
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const CustomPieTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-100 shadow-lg rounded-xl px-4 py-3 text-sm">
        <p className="font-bold" style={{ color: payload[0].payload.color }}>{payload[0].name}</p>
        <p className="text-gray-700 font-semibold">{payload[0].value}%</p>
      </div>
    );
  }
  return null;
};

/* ── Animasi Framer Motion ───────────────────────────────── */
const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

/* ══════════════════════════════════════════════════════════
   HALAMAN INFOGRAFIS — Main Component
   ══════════════════════════════════════════════════════════ */
export default function InfografisPage() {
  /* ── State: Data DB ── */
  const [makroStats, setMakroStats] = useState([
    { id: "total-penduduk", label: "Total Penduduk", value: "12,450", icon: "👥", color: "#0A58CA", bg: "#EBF2FF" },
    { id: "kepala-keluarga", label: "Kepala Keluarga", value: "3,820", icon: "🏠", color: "#198754", bg: "#D1F5E0" },
    { id: "luas-wilayah", label: "Luas Wilayah", value: "5.42 km²", icon: "🗺️", color: "#7C3AED", bg: "#EDE9FE" },
    { id: "rt-rw", label: "RT / RW", value: "28 / 07", icon: "🏘️", color: "#DC6803", bg: "#FEF3C7" },
  ]);

  const [genderData, setGenderData] = useState([
    { name: "Laki-laki", jumlah: 6350, color: "#0A58CA" },
    { name: "Perempuan", jumlah: 6100, color: "#198754" },
  ]);

  const [pendidikanData, setPendidikanData] = useState([
    { name: "SD / Sederajat", value: 15, color: "#DC6803" },
    { name: "SMP / Sederajat", value: 35, color: "#198754" },
    { name: "SMA / Sederajat", value: 40, color: "#0A58CA" },
    { name: "Perguruan Tinggi", value: 10, color: "#7C3AED" },
  ]);

  const [pencaharianData, setPencaharianData] = useState([
    { name: "Swasta", value: 45, color: "#0A58CA" },
    { name: "Pedagang", value: 30, color: "#198754" },
    { name: "Buruh", value: 15, color: "#DC6803" },
    { name: "PNS / TNI / Polri", value: 10, color: "#7C3AED" },
  ]);

  /* ── Fetch dari Supabase ── */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from("profil_kelurahan")
          .select("*")
          .eq("id", 1)
          .maybeSingle();

        if (data && !error) {
          // Update makro stats
          setMakroStats(prev => [
            { ...prev[0], value: Number(data.total_penduduk || 0).toLocaleString("en-US") },
            { ...prev[1], value: Number(data.kepala_keluarga || 0).toLocaleString("en-US") },
            { ...prev[2], value: prev[2].value },
            { ...prev[3], value: `${data.jumlah_rt || 0} / ${String(data.jumlah_rw || 0).padStart(2, "0")}` },
          ]);

          // Update gender chart
          if (data.pria_count || data.wanita_count) {
            setGenderData([
              { name: "Laki-laki", jumlah: Number(data.pria_count || 6350), color: "#0A58CA" },
              { name: "Perempuan", jumlah: Number(data.wanita_count || 6100), color: "#198754" },
            ]);
          }

          // Update pendidikan chart
          if (data.pendidikan_sd !== undefined) {
            setPendidikanData([
              { name: "SD / Sederajat", value: Number(data.pendidikan_sd || 15), color: "#DC6803" },
              { name: "SMP / Sederajat", value: Number(data.pendidikan_smp || 35), color: "#198754" },
              { name: "SMA / Sederajat", value: Number(data.pendidikan_sma || 40), color: "#0A58CA" },
              { name: "Perguruan Tinggi", value: Number(data.pendidikan_pt || 10), color: "#7C3AED" },
            ]);
          }

          // Update pencaharian chart
          if (data.pencaharian_swasta !== undefined) {
            setPencaharianData([
              { name: "Swasta", value: Number(data.pencaharian_swasta || 45), color: "#0A58CA" },
              { name: "Pedagang", value: Number(data.pencaharian_pedagang || 30), color: "#198754" },
              { name: "Buruh", value: Number(data.pencaharian_buruh || 15), color: "#DC6803" },
              { name: "PNS / TNI / Polri", value: Number(data.pencaharian_pns || 10), color: "#7C3AED" },
            ]);
          }
        }
      } catch (err) {
        console.error("Gagal menarik data infografis:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col">

      {/* ════════════════════════════════════════════════════
          1. HERO BANNER
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
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-blue-300 text-xs mb-4">
            <Link href="/" className="hover:text-white transition-colors">Beranda</Link>
            <span aria-hidden="true">/</span>
            <span className="text-white">Infografis & Data</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-3 max-w-2xl leading-tight">
            Infografis & Transparansi Data
          </h1>
          <p className="text-blue-200 text-sm sm:text-base max-w-xl leading-relaxed">
            Sajian data statistik kependudukan dan capaian program kerja Kelurahan Parit Mayor secara transparan dan real-time.
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          2. STATISTIK MAKRO — 4 kartu
          ════════════════════════════════════════════════════ */}
      <section id="statistik-makro" className="py-10" style={{ backgroundColor: "#F8F9FA" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {makroStats.map((stat, i) => (
              <motion.div
                key={stat.id}
                id={stat.id}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{stat.label}</p>
                  <p className="text-2xl sm:text-3xl font-extrabold mt-1" style={{ color: stat.color }}>{stat.value}</p>
                </div>
                <div className="ml-auto w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ backgroundColor: stat.bg }} aria-hidden="true">
                  {stat.icon}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          3. CHART: Jenis Kelamin & Tingkat Pendidikan
          ════════════════════════════════════════════════════ */}
      <section id="chart-jk-pendidikan" className="py-10" style={{ backgroundColor: "#F8F9FA" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* ── Bar Chart: Jenis Kelamin ── */}
            <motion.div
              id="chart-gender"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
            >
              <div className="flex items-center gap-2 mb-5">
                <span className="w-1 h-5 rounded-full block" style={{ backgroundColor: "#0A58CA" }} aria-hidden="true" />
                <h2 className="font-extrabold text-gray-900 text-base sm:text-lg">Statistik Jenis Kelamin</h2>
              </div>

              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={genderData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" tick={{ fontSize: 12, fontWeight: 600, fill: "#374151" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "#9CA3AF" }} axisLine={false} tickLine={false}
                    tickFormatter={(v) => v >= 1000 ? `${(v / 1000).toFixed(1)}K` : v} />
                  <Tooltip content={<CustomBarTooltip />} cursor={{ fill: "rgba(10,88,202,0.06)", radius: 8 }} />
                  <Bar dataKey="jumlah" radius={[8, 8, 0, 0]} isAnimationActive animationBegin={300} animationDuration={1200}>
                    {genderData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>

              {/* Legenda ringkasan */}
              <div className="mt-4 grid grid-cols-2 gap-3">
                {genderData.map((d) => {
                  const total = genderData.reduce((a, b) => a + b.jumlah, 0);
                  const pct = total > 0 ? Math.round((d.jumlah / total) * 100) : 0;
                  return (
                    <div key={d.name} className="flex items-center gap-2 p-3 rounded-xl"
                      style={{ backgroundColor: d.color === "#0A58CA" ? "#EBF2FF" : "#D1F5E0" }}>
                      <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: d.color }} aria-hidden="true" />
                      <div>
                        <p className="text-xs font-bold" style={{ color: d.color }}>{d.name}</p>
                        <p className="text-xs text-gray-600">{d.jumlah.toLocaleString("id-ID")} jiwa ({pct}%)</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* ── Pie Chart: Tingkat Pendidikan ── */}
            <motion.div
              id="chart-pendidikan"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
            >
              <div className="flex items-center gap-2 mb-5">
                <span className="w-1 h-5 rounded-full block" style={{ backgroundColor: "#198754" }} aria-hidden="true" />
                <h2 className="font-extrabold text-gray-900 text-base sm:text-lg">Tingkat Pendidikan Warga</h2>
              </div>

              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={pendidikanData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={90}
                    paddingAngle={3}
                    dataKey="value"
                    isAnimationActive
                    animationBegin={200}
                    animationDuration={1400}
                  >
                    {pendidikanData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomPieTooltip />} />
                </PieChart>
              </ResponsiveContainer>

              {/* Legenda */}
              <div className="mt-2 flex flex-col gap-2">
                {pendidikanData.map((d) => (
                  <div key={d.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: d.color }} aria-hidden="true" />
                      <span className="text-sm text-gray-700">{d.name}</span>
                    </div>
                    <span className="text-sm font-bold" style={{ color: d.color }}>{d.value}%</span>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          4. CHART: Mata Pencaharian — Horizontal Bar
          ════════════════════════════════════════════════════ */}
      <section id="chart-pencaharian" className="py-10" style={{ backgroundColor: "#F8F9FA" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            id="chart-pencaharian-card"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
          >
            <div className="flex items-center gap-2 mb-6">
              <span className="w-1 h-5 rounded-full block" style={{ backgroundColor: "#DC6803" }} aria-hidden="true" />
              <h2 className="font-extrabold text-gray-900 text-base sm:text-lg">Mata Pencaharian Utama</h2>
            </div>

            <ResponsiveContainer width="100%" height={220}>
              <BarChart
                data={pencaharianData}
                layout="vertical"
                margin={{ top: 0, right: 30, left: 10, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
                <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11, fill: "#9CA3AF" }}
                  axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 12, fontWeight: 600, fill: "#374151" }}
                  axisLine={false} tickLine={false} width={110} />
                <Tooltip
                  formatter={(value) => [`${value}%`, "Persentase"]}
                  contentStyle={{ borderRadius: "12px", border: "1px solid #E5E7EB", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}
                  cursor={{ fill: "rgba(220,104,3,0.06)" }}
                />
                <Bar dataKey="value" radius={[0, 8, 8, 0]} isAnimationActive animationBegin={400} animationDuration={1200}>
                  {pencaharianData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>

            {/* Legenda kartu ringkas */}
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {pencaharianData.map((d) => (
                <div key={d.name} className="rounded-xl p-3 text-center"
                  style={{ backgroundColor: `${d.color}14`, border: `1px solid ${d.color}30` }}>
                  <p className="text-xl font-extrabold" style={{ color: d.color }}>{d.value}%</p>
                  <p className="text-xs text-gray-600 mt-0.5 leading-tight">{d.name}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          5. UNDUH LAPORAN
          ════════════════════════════════════════════════════ */}
      <section id="unduh-laporan" className="py-8 pb-14" style={{ backgroundColor: "#F8F9FA" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="rounded-2xl p-6 sm:p-8 relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
            style={{ backgroundColor: "#D1F5E0", border: "1px solid #A7F3D0" }}
          >
            <div className="absolute right-6 bottom-0 opacity-10" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-32 h-32 text-green-800" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"/>
              </svg>
            </div>
            <div className="relative">
              <h2 className="text-lg sm:text-xl font-extrabold text-gray-900 mb-2">Butuh Data Lebih Rinci?</h2>
              <p className="text-gray-600 text-sm max-w-md">
                Unduh laporan demografi lengkap Kelurahan Parit Mayor tahun ini dalam format PDF untuk keperluan analisis atau pelaporan.
              </p>
            </div>
            <button
              type="button"
              id="btn-unduh-laporan"
              className="relative flex-shrink-0 flex items-center gap-2.5 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-md hover:opacity-90 hover:shadow-lg transition-all"
              style={{ backgroundColor: "#198754" }}
              onClick={() => alert("Mengunduh Laporan Demografi Parit Mayor 2024.pdf...")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
              Unduh Laporan (PDF)
            </button>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
