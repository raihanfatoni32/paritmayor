/* =========================================================
   DASHBOARD ADMIN — Kelurahan Parit Mayor
   Sistem Administrasi Terintegrasi dengan proteksi rute
   Stack: Next.js (App Router) + Tailwind CSS + useState/useEffect
   ========================================================= */

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

/* ══════════════════════════════════════════════════════════
   IKON SVG — Komponen Atom
   ══════════════════════════════════════════════════════════ */

function IconDashboard() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
    </svg>
  );
}

function IconNews() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" />
    </svg>
  );
}

function IconChart() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
    </svg>
  );
}

function IconForm() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
    </svg>
  );
}

function IconSettings() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>
  );
}

function IconLogout() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
    </svg>
  );
}

function IconSave() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 3.75H6.912a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859M12 3v8.25m0 0-3-3m3 3 3-3" />
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════
   NAVIGASI SIDEBAR — Item Menu
   ══════════════════════════════════════════════════════════ */
const navItems = [
  { id: "dashboard", label: "Dashboard", icon: <IconDashboard /> },
  { id: "berita",    label: "Kelola Berita", icon: <IconNews /> },
  { id: "infografis",label: "Data Infografis", icon: <IconChart /> },
  { id: "layanan",   label: "Formulir Layanan", icon: <IconForm /> },
];

/* ══════════════════════════════════════════════════════════
   KOMPONEN: Input Field Admin
   ══════════════════════════════════════════════════════════ */
function AdminInput({ id, label, value, onChange, type = "text", prefix, suffix, helpText }) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
        {label}
      </label>
      <div className="relative flex items-center">
        {prefix && (
          <div className="absolute left-3 pointer-events-none text-gray-400">
            {prefix}
          </div>
        )}
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          className={`w-full py-2.5 text-sm text-gray-900 bg-white border border-gray-200 rounded-xl focus:outline-none transition-all ${prefix ? "pl-9 pr-4" : "px-4"}`}
          onFocus={(e) => {
            e.target.style.boxShadow = "0 0 0 3px rgba(10,88,202,0.12)";
            e.target.style.borderColor = "#0A58CA";
          }}
          onBlur={(e) => {
            e.target.style.boxShadow = "";
            e.target.style.borderColor = "";
          }}
        />
        {suffix && (
          <span className="ml-2 text-xs text-gray-400 whitespace-nowrap">{suffix}</span>
        )}
      </div>
      {helpText && (
        <p className="text-xs text-gray-400 mt-1">{helpText}</p>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   KOMPONEN: Section Header
   ══════════════════════════════════════════════════════════ */
function SectionHeader({ icon, title, subtitle }) {
  return (
    <div className="flex items-start gap-3 mb-5">
      <div className="flex-shrink-0 mt-0.5 text-gray-600">{icon}</div>
      <div>
        <h3 className="text-gray-900 font-bold text-base">{title}</h3>
        {subtitle && <p className="text-gray-500 text-xs mt-0.5">{subtitle}</p>}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   KOMPONEN UTAMA — AdminDashboardPage
   ══════════════════════════════════════════════════════════ */
export default function AdminDashboardPage() {
  const router = useRouter();

  /* ── State: Navigasi & Tab ───────────────────────────── */
  const [activeNav,  setActiveNav]  = useState("infografis");
  const [activeTab,  setActiveTab]  = useState("demografi");

  /* ── State: Proteksi & Loading ───────────────────────── */
  const [isAuthed,   setIsAuthed]   = useState(false);
  const [authLoading,setAuthLoading]= useState(true);

  /* ────────────────────────────────────────────────────────
     KELOMPOK A — Data Demografi
     ──────────────────────────────────────────────────────── */
  const [totalPenduduk, setTotalPenduduk] = useState("12450");
  const [jumlahKK,      setJumlahKK]      = useState("3820");
  const [jumlahRT,      setJumlahRT]      = useState("28");
  const [jumlahRW,      setJumlahRW]      = useState("7");

  /* ────────────────────────────────────────────────────────
     KELOMPOK B — Konten Portal Publik
     ──────────────────────────────────────────────────────── */
  const [nilaiIKM,     setNilaiIKM]    = useState("98.750");
  const [predikatIKM,  setPredikatIKM] = useState("A");
  const [nomorWA,      setNomorWA]     = useState("085732973097");
  const [bannerText,   setBannerText]  = useState("Selamat Datang di Portal Resmi Kelurahan Parit Mayor — Melayani dengan Profesional, Transparan, dan Sepenuh Hati.");

  /* ── useEffect: Proteksi Rute ────────────────────────── */
  useEffect(() => {
    const loggedIn = localStorage.getItem("adminLoggedIn");
    if (loggedIn !== "true") {
      // Belum login → tendang ke halaman login
      router.push("/admin/login");
    } else {
      setIsAuthed(true);
      setAuthLoading(false);
    }
  }, [router]);

  /* ── Handler: Simpan Perubahan ───────────────────────── */
  const handleSimpan = () => {
    // Simpan ke localStorage sebagai simulasi persistensi
    const dataKelurahan = {
      totalPenduduk, jumlahKK, jumlahRT, jumlahRW,
      nilaiIKM, predikatIKM, nomorWA, bannerText,
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem("dataKelurahan", JSON.stringify(dataKelurahan));
    alert("✅ Data Kelurahan Berhasil Diperbarui!");
  };

  /* ── Handler: Logout ─────────────────────────────────── */
  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    localStorage.removeItem("adminLoginTime");
    router.push("/admin/login");
  };

  /* ── Loading state selama cek auth ──────────────────── */
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#F1F5F9" }}>
        <div className="flex flex-col items-center gap-3">
          <svg className="animate-spin w-10 h-10" style={{ color: "#0A58CA" }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <p className="text-gray-500 text-sm">Memverifikasi sesi admin...</p>
        </div>
      </div>
    );
  }

  /* ── Guard: Jika tidak terautentikasi ────────────────── */
  if (!isAuthed) return null;

  /* ── Render Dashboard ────────────────────────────────── */
  return (
    <div className="flex min-h-screen" style={{ backgroundColor: "#F1F5F9" }}>

      {/* ════════════════════════════════════════════════════
          SIDEBAR NAVIGASI
          ════════════════════════════════════════════════════ */}
      <aside
        className="w-56 flex-shrink-0 flex flex-col shadow-xl"
        style={{ backgroundColor: "#0D1B2A" }}
      >
        {/* Logo / Brand */}
        <div className="px-5 py-6 border-b border-white/10">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-extrabold text-sm flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #198754, #0d6832)" }}>
              KP
            </div>
            <div>
              <p className="text-white font-bold text-sm leading-tight">Kelurahan</p>
              <p className="text-white font-bold text-sm leading-tight">Parit Mayor</p>
            </div>
          </div>
          <p className="text-blue-400 text-xs mt-2">Admin Dashboard</p>
        </div>

        {/* Menu Navigasi */}
        <nav className="flex-1 px-3 py-4 space-y-1" aria-label="Admin Navigation">
          {navItems.map((item) => {
            const isActive = activeNav === item.id;
            return (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => setActiveNav(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 text-left ${
                  isActive
                    ? "text-white"
                    : "text-blue-300 hover:text-white hover:bg-white/10"
                }`}
                style={isActive ? { backgroundColor: "#198754" } : {}}
              >
                {item.icon}
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Bagian bawah sidebar */}
        <div className="px-3 pb-5 space-y-1 border-t border-white/10 pt-4">
          <button
            id="nav-pengaturan"
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-blue-300 hover:text-white hover:bg-white/10 transition-all text-left"
          >
            <IconSettings />
            Pengaturan
          </button>
          <button
            id="btn-admin-logout"
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:text-red-200 hover:bg-red-900/30 transition-all text-left"
          >
            <IconLogout />
            Keluar
          </button>
        </div>
      </aside>

      {/* ════════════════════════════════════════════════════
          KONTEN UTAMA
          ════════════════════════════════════════════════════ */}
      <main className="flex-1 flex flex-col min-w-0">

        {/* ── Topbar ───────────────────────────────────── */}
        <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between flex-shrink-0">
          <h2 className="text-gray-900 font-bold text-base">Parit Mayor Admin</h2>
          <div className="flex items-center gap-3">
            {/* Ikon Bell */}
            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all" aria-label="Notifikasi">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
              </svg>
            </button>
            {/* Ikon Bantuan */}
            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all" aria-label="Bantuan">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
              </svg>
            </button>
            {/* Avatar Admin */}
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
              style={{ background: "linear-gradient(135deg, #0A58CA, #052c65)" }}>
              A
            </div>
          </div>
        </header>

        {/* ── Body Konten ──────────────────────────────── */}
        <div className="flex-1 overflow-y-auto px-8 py-8">

          {/* ── Heading + Tombol Simpan ─────────────────── */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-extrabold text-gray-900 leading-tight">
                Pembaruan Data Angka Statistik Kelurahan
              </h1>
              <p className="text-gray-500 text-sm mt-1 max-w-xl">
                Perbarui data infografis demografi Kelurahan Parit Mayor secara real-time. Data ini akan ditampilkan langsung pada halaman utama portal publik.
              </p>
            </div>
            <button
              id="btn-simpan-perubahan"
              onClick={handleSimpan}
              className="flex-shrink-0 flex items-center gap-2 text-white font-bold text-sm px-5 py-3 rounded-xl shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
              style={{ background: "linear-gradient(135deg, #198754, #0d6832)" }}
            >
              <IconSave />
              Simpan Perubahan
            </button>
          </div>

          {/* ── Tab Pilihan ──────────────────────────────── */}
          <div className="flex gap-1 bg-gray-100 p-1 rounded-xl mb-6 w-fit">
            {[
              { key: "demografi", label: "Data Demografi" },
              { key: "portal",    label: "Konten Portal Publik" },
            ].map(({ key, label }) => (
              <button
                key={key}
                id={`tab-${key}`}
                onClick={() => setActiveTab(key)}
                className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-150 ${
                  activeTab === key
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* ════════════════════════════════════════════
              TAB A — DATA DEMOGRAFI
              ════════════════════════════════════════════ */}
          {activeTab === "demografi" && (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
              <SectionHeader
                icon={<IconChart />}
                title="Data Demografi"
                subtitle="Perbarui data kependudukan yang tampil di halaman publik Kelurahan Parit Mayor."
              />
              <div className="border-t border-gray-100 pt-6">

                {/* Grid 2 kolom — Penduduk & KK */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                  <AdminInput
                    id="input-total-penduduk"
                    label="Input Total Penduduk"
                    value={totalPenduduk}
                    onChange={(e) => setTotalPenduduk(e.target.value)}
                    type="number"
                    prefix={
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                      </svg>
                    }
                    helpText="Format angka (tanpa titik koma)"
                  />
                  <AdminInput
                    id="input-kepala-keluarga"
                    label="Input Kepala Keluarga"
                    value={jumlahKK}
                    onChange={(e) => setJumlahKK(e.target.value)}
                    type="number"
                    prefix={
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                      </svg>
                    }
                  />
                </div>

                {/* Grid 2 kolom — RT & RW */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
                  <AdminInput
                    id="input-jumlah-rt"
                    label="Input Jumlah RT"
                    value={jumlahRT}
                    onChange={(e) => setJumlahRT(e.target.value)}
                    type="number"
                    prefix={
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                      </svg>
                    }
                  />
                  <AdminInput
                    id="input-jumlah-rw"
                    label="Input Jumlah RW"
                    value={jumlahRW}
                    onChange={(e) => setJumlahRW(e.target.value)}
                    type="number"
                    prefix={
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m2.25-18v18m13.5-18v18m2.25-18v18M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
                      </svg>
                    }
                  />
                </div>

                {/* Info Box */}
                <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-xl p-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                  </svg>
                  <div>
                    <p className="text-blue-800 text-xs font-bold mb-0.5">Informasi Pembaruan</p>
                    <p className="text-blue-600 text-xs leading-relaxed">
                      Terakhir diperbarui: {new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })} oleh Admin Utama.
                      Pastikan data yang dimasukkan telah diverifikasi dengan catatan pencatatan sipil kelurahan terbaru sebelum menyimpan perubahan.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ════════════════════════════════════════════
              TAB B — KONTEN PORTAL PUBLIK
              ════════════════════════════════════════════ */}
          {activeTab === "portal" && (
            <div className="space-y-6">

              {/* Card 1 — IKM */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
                <SectionHeader
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                    </svg>
                  }
                  title="Nilai Indeks Kepuasan Masyarakat (IKM)"
                  subtitle="Data ini tampil di kartu sorot IKM pada halaman Beranda."
                />
                <div className="border-t border-gray-100 pt-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <AdminInput
                    id="input-nilai-ikm"
                    label="Nilai IKM Terbaru"
                    value={nilaiIKM}
                    onChange={(e) => setNilaiIKM(e.target.value)}
                    type="text"
                    helpText="Contoh: 98.750 (gunakan titik sebagai pemisah desimal)"
                  />
                  <div>
                    <label htmlFor="input-predikat-ikm" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                      Predikat IKM
                    </label>
                    <select
                      id="input-predikat-ikm"
                      value={predikatIKM}
                      onChange={(e) => setPredikatIKM(e.target.value)}
                      className="w-full px-4 py-2.5 text-sm text-gray-900 bg-white border border-gray-200 rounded-xl focus:outline-none transition-all"
                      onFocus={(e) => {
                        e.target.style.boxShadow = "0 0 0 3px rgba(10,88,202,0.12)";
                        e.target.style.borderColor = "#0A58CA";
                      }}
                      onBlur={(e) => {
                        e.target.style.boxShadow = "";
                        e.target.style.borderColor = "";
                      }}
                    >
                      <option value="A">A — Sangat Memuaskan (≥ 88.31)</option>
                      <option value="B">B — Memuaskan (76.61 – 88.30)</option>
                      <option value="C">C — Cukup (65.00 – 76.60)</option>
                      <option value="D">D — Tidak Memuaskan (≤ 64.99)</option>
                    </select>
                    <p className="text-xs text-gray-400 mt-1">Pilih predikat sesuai nilai IKM yang ditetapkan</p>
                  </div>
                </div>
                {/* Preview IKM Card */}
                <div className="mt-5 rounded-xl p-4 flex items-center justify-between gap-4"
                  style={{ background: "linear-gradient(135deg, #052c65, #0A58CA)" }}>
                  <div>
                    <p className="text-blue-300 text-xs font-semibold uppercase tracking-wider mb-1">Indeks Kepuasan Masyarakat (IKM)</p>
                    <p className="text-white text-2xl font-extrabold">{nilaiIKM || "—"}</p>
                    <p className="text-blue-200 text-xs mt-0.5">Preview tampilan publik</p>
                  </div>
                  <span className="inline-block bg-green-400 text-green-900 font-extrabold text-sm px-4 py-2 rounded-xl">
                    PREDIKAT {predikatIKM}
                  </span>
                </div>
              </div>

              {/* Card 2 — WhatsApp Hotline */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
                <SectionHeader
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                    </svg>
                  }
                  title="Nomor WhatsApp Hotline Pengaduan"
                  subtitle="Nomor ini tampil di halaman Kontak dan tombol WhatsApp pengaduan warga."
                />
                <div className="border-t border-gray-100 pt-5">
                  <AdminInput
                    id="input-nomor-wa"
                    label="Nomor WhatsApp Hotline"
                    value={nomorWA}
                    onChange={(e) => setNomorWA(e.target.value)}
                    type="tel"
                    prefix={
                      <span className="text-xs font-bold text-gray-500">+62</span>
                    }
                    helpText="Masukkan nomor tanpa awalan 0 atau +62. Contoh: 085732973097"
                  />
                  {/* Preview link WA */}
                  <div className="mt-4 flex items-center gap-2 bg-green-50 border border-green-100 rounded-xl px-4 py-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.558 4.115 1.533 5.835L.057 23.5l5.835-1.53A11.943 11.943 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.905 0-3.68-.517-5.2-1.415l-.372-.22-3.863 1.013 1.031-3.77-.241-.388A9.958 9.958 0 0 1 2 12c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10z"/>
                    </svg>
                    <p className="text-green-700 text-xs font-medium">
                      Link aktif: <span className="font-bold">https://wa.me/{nomorWA}</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 3 — Banner Pengumuman */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
                <SectionHeader
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 1 1 0-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 0 1-1.44-4.282m3.102.069a18.03 18.03 0 0 1-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 0 1 8.835 2.535M10.34 6.66a23.847 23.847 0 0 0 8.835-2.535m0 0A23.74 23.74 0 0 0 18.795 3m.38 1.125a23.91 23.91 0 0 1 1.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 0 0 1.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 0 1 0 3.46" />
                    </svg>
                  }
                  title="Teks Banner Pengumuman Beranda"
                  subtitle="Teks ini tampil sebagai running text atau banner utama di halaman depan portal publik."
                />
                <div className="border-t border-gray-100 pt-5">
                  <label htmlFor="input-banner-text" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                    Teks Pengumuman Utama
                  </label>
                  <textarea
                    id="input-banner-text"
                    rows={3}
                    value={bannerText}
                    onChange={(e) => setBannerText(e.target.value)}
                    className="w-full px-4 py-3 text-sm text-gray-900 bg-white border border-gray-200 rounded-xl focus:outline-none transition-all resize-none"
                    placeholder="Ketikkan teks banner pengumuman di sini..."
                    onFocus={(e) => {
                      e.target.style.boxShadow = "0 0 0 3px rgba(10,88,202,0.12)";
                      e.target.style.borderColor = "#0A58CA";
                    }}
                    onBlur={(e) => {
                      e.target.style.boxShadow = "";
                      e.target.style.borderColor = "";
                    }}
                  />
                  <p className="text-xs text-gray-400 mt-1">{bannerText.length} karakter terpisa. Disarankan maks. 200 karakter.</p>
                  {/* Preview Banner */}
                  <div className="mt-4 rounded-xl overflow-hidden">
                    <div className="flex items-center gap-2 px-4 py-2.5"
                      style={{ background: "linear-gradient(90deg, #052c65 0%, #0A58CA 100%)" }}>
                      <span className="flex-shrink-0 bg-white/20 text-white text-xs font-bold px-2 py-0.5 rounded-md">PENGUMUMAN</span>
                      <p className="text-white text-xs truncate">{bannerText || "—"}</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* ── Tombol Simpan Bawah (duplikat untuk kenyamanan) */}
          <div className="mt-8 flex justify-end">
            <button
              id="btn-simpan-bawah"
              onClick={handleSimpan}
              className="flex items-center gap-2 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
              style={{ background: "linear-gradient(135deg, #198754, #0d6832)" }}
            >
              <IconSave />
              Simpan Semua Perubahan
            </button>
          </div>

        </div>
        {/* ── End Body Konten ────────────────────────── */}
      </main>
      {/* ── End Main ─────────────────────────────────── */}
    </div>
  );
}
