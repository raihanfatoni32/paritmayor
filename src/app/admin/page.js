/* =========================================================
   DASHBOARD ADMIN — Kelurahan Parit Mayor
   Sistem Administrasi Terintegrasi dengan proteksi rute
   Stack: Next.js (App Router) + Tailwind CSS + useState/useEffect
   ========================================================= */

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/utils/supabase";
import imageCompression from 'browser-image-compression';

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
  { id: "beranda", label: "Kelola Beranda", icon: <IconSettings /> },
  { id: "berita", label: "Kelola Berita", icon: <IconNews /> },
  { id: "infografis", label: "Data Infografis", icon: <IconChart /> },
  { id: "layanan", label: "Formulir Layanan", icon: <IconForm /> },
];

/* ── Default kategori ────────────────────────────────────── */
const KATEGORI_DEFAULT = ["Kegiatan Warga", "Pemerintahan", "Kesehatan", "Pendidikan"];

/* ── Peta warna per kategori ─────────────────────────────── */
const kategoriColorMap = {
  "Kegiatan Warga": { color: "#0A58CA", gradient: "from-blue-600 to-indigo-700" },
  "Pemerintahan": { color: "#7C3AED", gradient: "from-violet-600 to-violet-800" },
  "Kesehatan": { color: "#198754", gradient: "from-green-600 to-green-800" },
  "Pendidikan": { color: "#0891B2", gradient: "from-cyan-600 to-cyan-800" },
};

/* ── Warna fallback untuk kategori kustom ────────────────── */
function getKategoriStyle(kategori) {
  return kategoriColorMap[kategori] ?? { color: "#64748B", gradient: "from-slate-500 to-slate-700" };
}

/* ── Helper: format tanggal YYYY-MM-DD → hari ini ────────── */
function todayISO() {
  return new Date().toISOString().split("T")[0];
}

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
          <div className="absolute left-3 pointer-events-none text-gray-400">{prefix}</div>
        )}
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          className={`w-full py-2.5 text-sm text-gray-900 bg-white border border-gray-200 rounded-xl focus:outline-none transition-all ${prefix ? "pl-9 pr-4" : "px-4"}`}
          onFocus={(e) => { e.target.style.boxShadow = "0 0 0 3px rgba(10,88,202,0.12)"; e.target.style.borderColor = "#0A58CA"; }}
          onBlur={(e) => { e.target.style.boxShadow = ""; e.target.style.borderColor = ""; }}
        />
        {suffix && <span className="ml-2 text-xs text-gray-400 whitespace-nowrap">{suffix}</span>}
      </div>
      {helpText && <p className="text-xs text-gray-400 mt-1">{helpText}</p>}
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
  const [activeNav, setActiveNav] = useState("infografis");
  const [activeTab, setActiveTab] = useState("demografi");

  /* ── State: Proteksi & Loading ───────────────────────── */
  const [isAuthed, setIsAuthed] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  /* ────────────────────────────────────────────────────────
     KELOMPOK A — Data Demografi
     ──────────────────────────────────────────────────────── */
  const [totalPenduduk, setTotalPenduduk] = useState("12450");
  const [jumlahKK, setJumlahKK] = useState("3820");
  const [jumlahRT, setJumlahRT] = useState("28");
  const [jumlahRW, setJumlahRW] = useState("7");

  /* ────────────────────────────────────────────────────────
     KELOMPOK B — Konten Portal Publik
     ──────────────────────────────────────────────────────── */
  const [nilaiIKM, setNilaiIKM] = useState("98.750");
  const [predikatIKM, setPredikatIKM] = useState("A");
  const [nomorWA, setNomorWA] = useState("085732973097");
  const [bannerText, setBannerText] = useState("Selamat Datang di Portal Resmi Kelurahan Parit Mayor — Melayani dengan Profesional, Transparan, dan Sepenuh Hati.");

  /* ────────────────────────────────────────────────────────
     KELOMPOK C — Form Kelola Berita
     ──────────────────────────────────────────────────────── */
  const [tanggalBaru, setTanggalBaru] = useState(todayISO());
  const [judulBaru, setJudulBaru] = useState("");
  const [ringkasanBaru, setRingkasanBaru] = useState("");
  const [kategoriBaru, setKategoriBaru] = useState("Kegiatan Warga");
  const [fotoBaru, setFotoBaru] = useState("");
  const [editId, setEditId] = useState(null);
  const [daftarBerita, setDaftarBerita] = useState([]);

  /* ── State: Kategori Dinamis ─────────────────────────── */
  // Tambahkan baris ini di barisan deklarasi useState bagian atas komponen
  const [daftarKategori, setDaftarKategori] = useState(KATEGORI_DEFAULT);
  const [kategoriKustom, setKategoriKustom] = useState("");
  const [showKategoriBaru, setShowKategoriBaru] = useState(false);

  /* ── State: Sorting Tabel ───────────────────────────── */
  /* ── State tambahan untuk mengunci id baris database ── */
  const [rowId, setRowId] = useState(1);
  const [sortUrutan, setSortUrutan] = useState("terbaru");

  /* ────────────────────────────────────────────────────────
     KELOMPOK D — Form Pengaturan Beranda
     ──────────────────────────────────────────────────────── */
  const [heroImage, setHeroImage] = useState("");
  const [highlightLabel, setHighlightLabel] = useState("Situs Sejarah");
  const [highlightTitle, setHighlightTitle] = useState("Kolam Susu (Kolam Teduh)");
  const [highlightDesc, setHighlightDesc] = useState("");
  const [highlightImage, setHighlightImage] = useState("");
  const [isUploadingHero, setIsUploadingHero] = useState(false);
  const [isUploadingHighlight, setIsUploadingHighlight] = useState(false);
  const [isSavingBeranda, setIsSavingBeranda] = useState(false);


  /* ── useEffect: Load Data dari Supabase (SUDAH DIPERBAIKI) ── */
  /* ── useEffect: Proteksi Rute Berbasis Sesi Supabase Auth (TERKOREKSI) ── */
  useEffect(() => {
    const checkAdminSession = async () => {
      try {
        // Ambil data sesi user yang sedang aktif dari server Supabase
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error || !session) {
          console.log("Sesi tidak ditemukan atau kedaluwarsa. Alihkan ke halaman login.");
          setIsAuthed(false);
          router.push("/admin/login");
        } else {
          // Meloloskan admin masuk jika sesi valid
          setIsAuthed(true);
        }
      } catch (err) {
        console.error("Kesalahan validasi keamanan rute:", err);
        router.push("/admin/login");
      } finally {
        setAuthLoading(false);
      }
    };

    checkAdminSession();
  }, [router]);

  /* ── useEffect: Load Data dari Supabase ── */
  useEffect(() => {
    const loadDataSupabase = async () => {
      try {
        const { data, error } = await supabase
          .from("profil_kelurahan")
          .select("*")
          .eq("id", 1)
          .maybeSingle();

        if (error) {
          console.error("Gagal memuat data dari Supabase:", error);
          return;
        }

        if (data) {
          setRowId(data.id);
          setTotalPenduduk(String(data.total_penduduk || "0"));
          setJumlahKK(String(data.kepala_keluarga || "0"));
          setJumlahRT(String(data.jumlah_rt || "0"));
          setJumlahRW(String(data.jumlah_rw || "0"));
          setNilaiIKM(data.nilai_ikm || "0");
          setPredikatIKM(data.predikat_ikm || "A");
          setNomorWA(data.nomor_wa || "");
          setBannerText(data.banner_text || "");
        }
      } catch (err) {
        console.error("Kesalahan sistem load admin:", err);
      }
    };

    if (isAuthed) {
      loadDataSupabase();
      fetchPengaturanBeranda();
    }
  }, [isAuthed]);

  /* ── useEffect: Load Pengaturan Beranda dari Supabase ── */
  const fetchPengaturanBeranda = async () => {
    const { data } = await supabase
      .from('pengaturan_beranda')
      .select('*')
      .eq('id', 1)
      .maybeSingle();
    if (data) {
      setHeroImage(data.hero_image || "");
      setHighlightLabel(data.highlight_label || "Situs Sejarah");
      setHighlightTitle(data.highlight_title || "Kolam Susu (Kolam Teduh)");
      setHighlightDesc(data.highlight_desc || "");
      setHighlightImage(data.highlight_image || "");
    }
  };


  /* ── fetchBerita: Ambil data dari Supabase ─────────────── */
  const fetchBerita = async () => {
    const { data, error } = await supabase
      .from('berita')
      .select('*')
      .order('tanggal', { ascending: false });
    if (!error && data) setDaftarBerita(data);
    else if (error) console.error("Gagal memuat daftar berita:", error);
  };

  /* ── useEffect: Load Berita dari Supabase + Kategori dari localStorage ── */
  useEffect(() => {
    if (isAuthed) {
      fetchBerita();
    }
    const storedKategori = localStorage.getItem("kategoriData");
    if (storedKategori) {
      try {
        const parsed = JSON.parse(storedKategori);
        if (Array.isArray(parsed) && parsed.length > 0) setDaftarKategori(parsed);
      } catch { }
    }
  }, [isAuthed]);


  /* ── Handler: Perubahan Dropdown Kategori ─────────────── */
  const handleKategoriChange = (e) => {
    const val = e.target.value;
    if (val === "tambah_baru") {
      setShowKategoriBaru(true);
      // Jangan ubah kategoriBaru sampai user ketik
    } else {
      setShowKategoriBaru(false);
      setKategoriBaru(val);
    }
  };

  /* ── Handler: Upload Foto ke Supabase Storage (dengan kompresi) ── */
  const handleFotoUpload = async (e) => {
    const imageFile = e.target.files[0];
    if (!imageFile) return;

    // Opsi kompresi: maks 1MB, lebar maks 1280px agar tetap HD di UI
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1280,
      useWebWorker: true,
    };

    try {
      // 1. Kompres gambar terlebih dahulu
      const compressedFile = await imageCompression(imageFile, options);

      // 2. Siapkan nama dan path file
      const fileExt = compressedFile.name.split('.').pop() || 'jpg';
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `public/${fileName}`;

      // 3. Upload file yang sudah dikompres ke Supabase Storage
      const { error } = await supabase.storage
        .from('foto_berita')
        .upload(filePath, compressedFile);

      if (error) {
        console.error("Gagal upload gambar:", error);
        alert("❌ Gagal upload gambar! " + error.message);
      } else {
        // 4. Ambil URL publik dan simpan ke state
        const { data: publicUrlData } = supabase.storage
          .from('foto_berita')
          .getPublicUrl(filePath);
        setFotoBaru(publicUrlData.publicUrl);
      }
    } catch (err) {
      console.error("Error saat kompresi gambar:", err);
      alert("❌ Gagal memproses gambar!");
    }
  };

  /* ── Helper: Upload gambar ke Storage (reusable) ─────── */
  const uploadImageToStorage = async (imageFile, setLoadingState) => {
    const options = { maxSizeMB: 1, maxWidthOrHeight: 1280, useWebWorker: true };
    setLoadingState(true);
    try {
      const compressedFile = await imageCompression(imageFile, options);
      const fileExt = compressedFile.name.split('.').pop() || 'jpg';
      const fileName = `beranda-${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `public/${fileName}`;
      const { error } = await supabase.storage.from('foto_berita').upload(filePath, compressedFile);
      if (error) { alert("❌ Gagal upload: " + error.message); return null; }
      const { data: pubData } = supabase.storage.from('foto_berita').getPublicUrl(filePath);
      return pubData.publicUrl;
    } catch (err) {
      console.error("Error upload:", err);
      alert("❌ Gagal memproses gambar!");
      return null;
    } finally {
      setLoadingState(false);
    }
  };

  /* ── Handler: Upload Hero Image ─────────────────────── */
  const handleHeroImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = await uploadImageToStorage(file, setIsUploadingHero);
    if (url) setHeroImage(url);
  };

  /* ── Handler: Upload Highlight Image ────────────────── */
  const handleHighlightImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = await uploadImageToStorage(file, setIsUploadingHighlight);
    if (url) setHighlightImage(url);
  };

  /* ── Handler: Simpan Pengaturan Beranda ─────────────── */
  const handleSimpanBeranda = async () => {
    setIsSavingBeranda(true);
    const payload = {
      hero_image: heroImage,
      highlight_label: highlightLabel,
      highlight_title: highlightTitle,
      highlight_desc: highlightDesc,
      highlight_image: highlightImage,
      updated_at: new Date().toISOString(),
    };
    try {
      const { data: existing } = await supabase
        .from('pengaturan_beranda').select('id').eq('id', 1).maybeSingle();
      let err;
      if (existing) {
        const { error } = await supabase.from('pengaturan_beranda').update(payload).eq('id', 1);
        err = error;
      } else {
        const { error } = await supabase.from('pengaturan_beranda').insert({ id: 1, ...payload });
        err = error;
      }
      if (err) alert("❌ Gagal menyimpan: " + err.message);
      else alert("✅ Pengaturan Beranda berhasil disimpan!");
    } catch (e) {
      alert("❌ Kesalahan jaringan: " + e.message);
    } finally {
      setIsSavingBeranda(false);
    }
  };

  /* ── Handler: Reset Form ──────────────────────────────── */
  const resetForm = () => {
    setTanggalBaru(todayISO());
    setJudulBaru("");
    setRingkasanBaru("");
    setKategoriBaru(daftarKategori[0] ?? "Kegiatan Warga");
    setFotoBaru("");
    setEditId(null);
    setKategoriKustom("");
    setShowKategoriBaru(false);
  };

  /* ── Handler: Simpan / Update Berita ke Supabase ────────── */
  const handleTambahBerita = async () => {
    if (!judulBaru || !ringkasanBaru) {
      alert("Judul dan ringkasan wajib diisi!");
      return;
    }

    let kategoriFinal = kategoriBaru;
    if (showKategoriBaru) {
      if (!kategoriKustom) {
        alert("Nama kategori baru tidak boleh kosong!");
        return;
      }
      kategoriFinal = kategoriKustom;
      // Simpan kategori baru ke localStorage agar persisten di dropdown
      if (!daftarKategori.includes(kategoriKustom)) {
        const updatedKategori = [...daftarKategori, kategoriKustom];
        setDaftarKategori(updatedKategori);
        localStorage.setItem("kategoriData", JSON.stringify(updatedKategori));
      }
    }

    const { color, gradient } = getKategoriStyle(kategoriFinal);
    const tanggalFinal = tanggalBaru || todayISO();

    const payload = {
      judul: judulBaru,
      ringkasan: ringkasanBaru,
      kategori: kategoriFinal,
      tanggal: tanggalFinal,
      foto: fotoBaru || "",
      kategoriColor: color,
      gradient: gradient,
    };

    let supabaseError = null;

    if (editId !== null) {
      // Mode Update
      const { error } = await supabase
        .from('berita')
        .update(payload)
        .eq('id', editId);
      supabaseError = error;
    } else {
      // Mode Insert
      const { error } = await supabase
        .from('berita')
        .insert([payload]);
      supabaseError = error;
    }

    if (supabaseError) {
      console.error("Gagal menyimpan berita:", supabaseError);
      alert("❌ Gagal menyimpan berita! " + supabaseError.message);
      return;
    }

    alert("✅ Berita berhasil disimpan!");
    await fetchBerita();

    setJudulBaru("");
    setRingkasanBaru("");
    setKategoriBaru(kategoriFinal);
    setShowKategoriBaru(false);
    setKategoriKustom("");
    setFotoBaru("");
    setEditId(null);
    setTanggalBaru(todayISO());
  };

  /* ── Handler: Edit Berita ─────────────────────────────── */
  const handleEdit = (berita) => {
    setTanggalBaru(berita.tanggal ?? todayISO());
    setJudulBaru(berita.judul);
    setRingkasanBaru(berita.ringkasan);
    setKategoriBaru(berita.kategori);
    setFotoBaru(berita.foto || "");
    setEditId(berita.id);
    setShowKategoriBaru(false);
    setKategoriKustom("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ── Handler: Hapus Berita dari Supabase ─────────────── */
  const handleHapus = async (id) => {
    if (!confirm("Yakin ingin menghapus berita ini?")) return;
    const { error } = await supabase
      .from('berita')
      .delete()
      .eq('id', id);
    if (error) {
      console.error("Gagal menghapus berita:", error);
      alert("❌ Gagal menghapus! " + error.message);
    } else {
      await fetchBerita();
    }
  };

  /* ── Handler: Hapus Kategori Kustom ──────────────────── */
  const handleHapusKategori = () => {
    if (!confirm(`Hapus kategori "${kategoriBaru}"? Berita yang sudah menggunakan kategori ini tidak terpengaruh.`)) return;
    const newList = daftarKategori.filter((k) => k !== kategoriBaru);
    setDaftarKategori(newList);
    localStorage.setItem("kategoriData", JSON.stringify(newList));
    // Reset ke kategori pertama yang tersisa
    setKategoriBaru(newList[0] ?? KATEGORI_DEFAULT[0]);
    setShowKategoriBaru(false);
  };

  /* ── Helper Eksekusi Data ke Supabase ─────────────────────────── */
  const simpanKeSupabase = async (payload) => {
    const targetId = rowId ? Number(rowId) : 1;

    try {
      // Periksa apakah data dengan id ini sudah pernah ada
      const { data: existData } = await supabase
        .from("profil_kelurahan")
        .select("id")
        .eq("id", targetId)
        .maybeSingle();

      let errorEksekusi = null;

      if (existData) {
        // Jika baris sudah terbuat, lakukan UPDATE
        const { error } = await supabase
          .from("profil_kelurahan")
          .update(payload)
          .eq("id", targetId);
        errorEksekusi = error;
      } else {
        // Jika baris kosong, lakukan INSERT data baru
        const { error } = await supabase
          .from("profil_kelurahan")
          .insert({ id: targetId, ...payload });
        errorEksekusi = error;
      }

      if (errorEksekusi) {
        console.error("Supabase menolak data:", errorEksekusi);
        alert(`❌ Gagal menyimpan! Pesan: ${errorEksekusi.message}`);
      } else {
        alert("✅ Data Berhasil Disimpan dan Sinkron ke Supabase!");
      }
    } catch (catchErr) {
      console.error("Kesalahan koneksi:", catchErr);
      alert(`❌ Terjadi kesalahan jaringan: ${catchErr.message}`);
    }
  };

  /* ── Handler: Simpan Semua Data Form Kelurahan (SUDAH DIPERBAIKI) ── */
  const handleSimpan = async () => {
    const payloadDatabase = {
      total_penduduk: totalPenduduk ? Number(totalPenduduk) : 0,
      kepala_keluarga: jumlahKK ? Number(jumlahKK) : 0,
      jumlah_rt: jumlahRT ? Number(jumlahRT) : 0,
      jumlah_rw: jumlahRW ? Number(jumlahRW) : 0,
      nilai_ikm: nilaiIKM || "0",
      predikat_ikm: predikatIKM,
      nomor_wa: nomorWA,
      banner_text: bannerText,
      updated_at: new Date().toISOString(),
    };

    await simpanKeSupabase(payloadDatabase);
  };

  /* ── Handler: Logout ──────────────────────────────────── */
  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.error("Gagal logout:", err);
    }
    localStorage.removeItem("adminLoggedIn");
    localStorage.removeItem("adminLoginTime");
    router.push("/admin/login");
  };

  /* ── Helper: format tanggal ke tampilan Indonesia ───── */
  const formatTanggalDisplay = (tgl) => {
    if (!tgl) return "—";
    if (/^\d{4}-\d{2}-\d{2}$/.test(tgl)) {
      const d = new Date(tgl + "T00:00:00");
      return d.toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" });
    }
    return tgl;
  };

  /* ── Helper: parsing tanggal untuk sorting ────────────── */
  const BULAN_ADMIN = {
    Jan: 0, Feb: 1, Mar: 2, Apr: 3, Mei: 4, Jun: 5,
    Jul: 6, Agt: 7, Agu: 7, Sep: 8, Okt: 9, Nov: 10, Des: 11,
  };
  const parseTanggalAdmin = (str) => {
    if (!str) return new Date(0);
    if (/^\d{4}-\d{2}-\d{2}$/.test(str)) return new Date(str + "T00:00:00");
    const parts = str.trim().split(/\s+/);
    if (parts.length === 3) {
      const day = parseInt(parts[0], 10);
      const mon = BULAN_ADMIN[parts[1]];
      const year = parseInt(parts[2], 10);
      if (!isNaN(day) && mon !== undefined && !isNaN(year)) return new Date(year, mon, day);
    }
    const d = new Date(str);
    return isNaN(d.getTime()) ? new Date(0) : d;
  };

  /* ── Sorted daftar berita ─────────────────────────────── */
  const beritaSorted = [...daftarBerita].sort((a, b) => {
    const diff = parseTanggalAdmin(b.tanggal) - parseTanggalAdmin(a.tanggal);
    return sortUrutan === "terbaru" ? diff : -diff;
  });

  /* ── Loading state ────────────────────────────────────── */
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

  if (!isAuthed) return null;

  /* ══════════════════════════════════════════════════════
     RENDER DASHBOARD
     ══════════════════════════════════════════════════════ */
  return (
    <div className="flex min-h-screen" style={{ backgroundColor: "#F1F5F9" }}>

      {/* ════════════════════════════════════════════════════
          SIDEBAR NAVIGASI
          ════════════════════════════════════════════════════ */}
      <aside className="w-56 flex-shrink-0 flex flex-col shadow-xl" style={{ backgroundColor: "#0D1B2A" }}>
        <div className="px-5 py-6 border-b border-white/10">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-extrabold text-sm flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #198754, #0d6832)" }}>KP</div>
            <div>
              <p className="text-white font-bold text-sm leading-tight">Kelurahan</p>
              <p className="text-white font-bold text-sm leading-tight">Parit Mayor</p>
            </div>
          </div>
          <p className="text-blue-400 text-xs mt-2">Admin Dashboard</p>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1" aria-label="Admin Navigation">
          {navItems.map((item) => {
            const isActive = activeNav === item.id;
            return (
              <button key={item.id} id={`nav-${item.id}`} onClick={() => setActiveNav(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 text-left ${isActive ? "text-white" : "text-blue-300 hover:text-white hover:bg-white/10"}`}
                style={isActive ? { backgroundColor: "#198754" } : {}}>
                {item.icon}{item.label}
              </button>
            );
          })}
        </nav>

        <div className="px-3 pb-5 space-y-1 border-t border-white/10 pt-4">
          <button id="nav-pengaturan" className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-blue-300 hover:text-white hover:bg-white/10 transition-all text-left">
            <IconSettings />Pengaturan
          </button>
          <button id="btn-admin-logout" onClick={handleLogout} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:text-red-200 hover:bg-red-900/30 transition-all text-left">
            <IconLogout />Keluar
          </button>
        </div>
      </aside>

      {/* ════════════════════════════════════════════════════
          KONTEN UTAMA
          ════════════════════════════════════════════════════ */}
      <main className="flex-1 flex flex-col min-w-0">

        {/* ── Topbar ────────────────────────────────────── */}
        <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between flex-shrink-0">
          <h2 className="text-gray-900 font-bold text-base">Parit Mayor Admin</h2>
          <div className="flex items-center gap-3">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all" aria-label="Notifikasi">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
              </svg>
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all" aria-label="Bantuan">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
              </svg>
            </button>
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
              style={{ background: "linear-gradient(135deg, #0A58CA, #052c65)" }}>A</div>
          </div>
        </header>

        {/* ── Body Konten ───────────────────────────────── */}
        <div className="flex-1 overflow-y-auto px-8 py-8">

          {/* ════════════════════════════════════════════
              KONTEN — KELOLA BERANDA
              ════════════════════════════════════════════ */}
          {activeNav === "beranda" && (
            <div className="space-y-8">
              <div>
                <h1 className="text-2xl font-extrabold text-gray-900 leading-tight">Pengaturan Halaman Beranda</h1>
                <p className="text-gray-500 text-sm mt-1 max-w-xl">Ubah Hero Section dan Highlight Card. Perubahan langsung tampil di halaman utama portal.</p>
              </div>

              {/* ── Section Hero ─────────────────────────── */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8 max-w-2xl">
                <SectionHeader
                  icon={<IconSettings />}
                  title="Hero Section"
                  subtitle="Atur foto background yang tampil di bagian paling atas halaman beranda."
                />
                <div className="border-t border-gray-100 pt-6 space-y-5">

                  {/* Preview Hero Image */}
                  {heroImage && (
                    <div className="relative rounded-xl overflow-hidden h-40">
                      <img src={heroImage} alt="Hero Preview" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <span className="text-white text-xs font-semibold bg-black/50 px-3 py-1 rounded-full">Preview Hero</span>
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                      Foto Background Hero
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleHeroImageUpload}
                      disabled={isUploadingHero}
                      className="w-full text-sm text-gray-600 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:text-white file:cursor-pointer cursor-pointer"
                      style={{ '--file-bg': '#0A58CA' }}
                    />
                    {isUploadingHero && <p className="text-xs text-blue-500 mt-1 animate-pulse">⏳ Mengompres &amp; mengupload gambar...</p>}
                    {heroImage && <p className="text-xs text-green-600 mt-1">✅ Foto hero sudah di-upload.</p>}
                    <p className="text-xs text-gray-400 mt-1">Rekomendasi: Foto landscape minimal 1280px. Otomatis dikompres sebelum upload.</p>
                  </div>
                </div>
              </div>

              {/* ── Section Sekilas Parit Mayor ──────────── */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8 max-w-2xl">
                <SectionHeader
                  icon={<IconChart />}
                  title="Sekilas Parit Mayor (Highlight Card)"
                  subtitle="Atur label, judul, deskripsi, dan foto card Sekilas Parit Mayor di beranda."
                />
                <div className="border-t border-gray-100 pt-6 space-y-5">

                  {/* Preview Highlight Image */}
                  {highlightImage && (
                    <div className="relative rounded-xl overflow-hidden h-40">
                      <img src={highlightImage} alt="Highlight Preview" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <span className="text-white text-xs font-semibold bg-black/50 px-3 py-1 rounded-full">Preview Highlight</span>
                      </div>
                    </div>
                  )}

                  <AdminInput
                    id="input-highlight-label"
                    label="Label (misal: Situs Sejarah)"
                    value={highlightLabel}
                    onChange={(e) => setHighlightLabel(e.target.value)}
                  />
                  <AdminInput
                    id="input-highlight-title"
                    label="Judul Card"
                    value={highlightTitle}
                    onChange={(e) => setHighlightTitle(e.target.value)}
                  />
                  <div>
                    <label htmlFor="input-highlight-desc" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                      Deskripsi
                    </label>
                    <textarea
                      id="input-highlight-desc"
                      rows={4}
                      value={highlightDesc}
                      onChange={(e) => setHighlightDesc(e.target.value)}
                      className="w-full px-4 py-2.5 text-sm text-gray-900 bg-white border border-gray-200 rounded-xl focus:outline-none transition-all resize-none"
                      onFocus={(e) => { e.target.style.boxShadow = "0 0 0 3px rgba(10,88,202,0.12)"; e.target.style.borderColor = "#0A58CA"; }}
                      onBlur={(e) => { e.target.style.boxShadow = ""; e.target.style.borderColor = ""; }}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                      Foto Highlight Card
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleHighlightImageUpload}
                      disabled={isUploadingHighlight}
                      className="w-full text-sm text-gray-600 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:text-white file:cursor-pointer cursor-pointer"
                    />
                    {isUploadingHighlight && <p className="text-xs text-blue-500 mt-1 animate-pulse">⏳ Mengompres &amp; mengupload gambar...</p>}
                    {highlightImage && <p className="text-xs text-green-600 mt-1">✅ Foto highlight sudah di-upload.</p>}
                    <p className="text-xs text-gray-400 mt-1">Rekomendasi: Foto portrait atau landscape, minimal 800px.</p>
                  </div>
                </div>
              </div>

              {/* Tombol Simpan */}
              <div className="max-w-2xl">
                <button
                  id="btn-simpan-beranda"
                  onClick={handleSimpanBeranda}
                  disabled={isSavingBeranda}
                  className="w-full flex items-center justify-center gap-2 text-white font-semibold text-sm px-6 py-3.5 rounded-xl shadow-sm transition-all hover:opacity-90 disabled:opacity-60"
                  style={{ backgroundColor: "#198754" }}
                >
                  {isSavingBeranda ? (
                    <><svg className="animate-spin w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4z" /></svg> Menyimpan...</>
                  ) : (
                    <><IconSave /> Simpan Pengaturan Beranda</>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* ════════════════════════════════════════════
              KONTEN — KELOLA BERITA
              ════════════════════════════════════════════ */}
          {activeNav === "berita" && (
            <div className="space-y-8">

              {/* Heading */}
              <div>
                <h1 className="text-2xl font-extrabold text-gray-900 leading-tight">Kelola Berita & Kegiatan</h1>
                <p className="text-gray-500 text-sm mt-1 max-w-xl">Tambah, edit, atau hapus berita. Perubahan langsung tampil di portal publik.</p>
              </div>

              {/* ── Card Form Tambah / Edit Berita ─────── */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8 max-w-2xl">
                <SectionHeader
                  icon={<IconNews />}
                  title={editId ? "Edit Berita" : "Publikasikan Berita Baru"}
                  subtitle={editId ? "Ubah data berita lalu klik Update Berita." : "Isi form di bawah ini untuk menambahkan berita ke portal publik."}
                />

                {/* Banner mode edit */}
                {editId && (
                  <div className="mb-4 flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-amber-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Z" />
                    </svg>
                    <p className="text-amber-700 text-xs font-medium">Mode Edit Aktif.</p>
                    <button onClick={resetForm} className="ml-auto text-xs text-amber-600 font-bold hover:text-amber-800 underline">Batal</button>
                  </div>
                )}

                <div className="border-t border-gray-100 pt-6 space-y-5">

                  {/* ── Input Tanggal ── */}
                  <div>
                    <label htmlFor="input-tanggal-berita" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                      Tanggal Berita
                    </label>
                    <input
                      id="input-tanggal-berita"
                      type="date"
                      value={tanggalBaru}
                      onChange={(e) => setTanggalBaru(e.target.value)}
                      className="w-full px-4 py-2.5 text-sm text-gray-900 bg-white border border-gray-200 rounded-xl focus:outline-none transition-all"
                      onFocus={(e) => { e.target.style.boxShadow = "0 0 0 3px rgba(10,88,202,0.12)"; e.target.style.borderColor = "#0A58CA"; }}
                      onBlur={(e) => { e.target.style.boxShadow = ""; e.target.style.borderColor = ""; }}
                    />
                    <p className="text-xs text-gray-400 mt-1">Tanggal publikasi berita ini.</p>
                  </div>

                  {/* ── Input Judul ── */}
                  <AdminInput
                    id="input-judul-berita"
                    label="Judul Berita"
                    value={judulBaru}
                    onChange={(e) => setJudulBaru(e.target.value)}
                    type="text"
                    helpText="Tulis judul yang singkat, padat, dan informatif."
                  />

                  {/* ── Dropdown Kategori Dinamis ── */}
                  <div>
                    <label htmlFor="input-kategori-berita" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                      Kategori
                    </label>
                    {/* Bungkus select + tombol Hapus Kategori */}
                    <div className="flex gap-2">
                      <select
                        id="input-kategori-berita"
                        value={showKategoriBaru ? "tambah_baru" : kategoriBaru}
                        onChange={handleKategoriChange}
                        className="flex-1 px-4 py-2.5 text-sm text-gray-900 bg-white border border-gray-200 rounded-xl focus:outline-none transition-all"
                        onFocus={(e) => { e.target.style.boxShadow = "0 0 0 3px rgba(10,88,202,0.12)"; e.target.style.borderColor = "#0A58CA"; }}
                        onBlur={(e) => { e.target.style.boxShadow = ""; e.target.style.borderColor = ""; }}
                      >
                        {Array.from(new Set(daftarKategori)).map((kat, index) => (
                          <option key={`${kat}-${index}`} value={kat}>{kat}</option>
                        ))}
                        <option value="tambah_baru">+ Tambah Kategori Baru...</option>
                      </select>
                      {/* Tombol Hapus Kategori — hanya tampil untuk kategori kustom (bukan default) */}
                      {!showKategoriBaru && !KATEGORI_DEFAULT.includes(kategoriBaru) && (
                        <button
                          type="button"
                          onClick={handleHapusKategori}
                          title={`Hapus kategori "${kategoriBaru}"`}
                          className="flex-shrink-0 px-3 py-2 text-sm font-semibold text-red-600 bg-red-50 border border-red-200 rounded-xl hover:bg-red-100 hover:border-red-300 transition-colors"
                        >
                          Hapus
                        </button>
                      )}
                    </div>
                    <p className="text-xs text-gray-400 mt-1">Pilih kategori yang sesuai, atau tambahkan yang baru.</p>

                    {/* ── Input Kategori Kustom (conditional) ── */}
                    {showKategoriBaru && (
                      <div className="mt-3">
                        <input
                          id="input-kategori-kustom"
                          type="text"
                          value={kategoriKustom}
                          onChange={(e) => setKategoriKustom(e.target.value)}
                          placeholder="Ketik nama kategori baru..."
                          className="w-full px-4 py-2.5 text-sm text-gray-900 bg-white border border-blue-300 rounded-xl focus:outline-none transition-all"
                          style={{ boxShadow: "0 0 0 3px rgba(10,88,202,0.08)" }}
                          autoFocus
                        />
                        <p className="text-xs text-blue-500 mt-1">Kategori baru akan disimpan dan tersedia untuk berita berikutnya.</p>
                      </div>
                    )}
                  </div>

                  {/* ── Textarea Ringkasan ── */}
                  <div>
                    <label htmlFor="input-ringkasan-berita" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                      Ringkasan Berita
                    </label>
                    <textarea
                      id="input-ringkasan-berita"
                      rows={4}
                      value={ringkasanBaru}
                      onChange={(e) => setRingkasanBaru(e.target.value)}
                      placeholder="Tulis ringkasan singkat isi berita di sini..."
                      className="w-full px-4 py-3 text-sm text-gray-900 bg-white border border-gray-200 rounded-xl focus:outline-none transition-all resize-none"
                      onFocus={(e) => { e.target.style.boxShadow = "0 0 0 3px rgba(10,88,202,0.12)"; e.target.style.borderColor = "#0A58CA"; }}
                      onBlur={(e) => { e.target.style.boxShadow = ""; e.target.style.borderColor = ""; }}
                    />
                    <p className="text-xs text-gray-400 mt-1">{ringkasanBaru.length} karakter. Disarankan maks. 200 karakter.</p>
                  </div>

                  {/* ── Upload Foto ── */}
                  <div>
                    <label htmlFor="input-foto-berita" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                      Foto Berita (opsional)
                    </label>
                    <div className="flex items-center gap-4">
                      {fotoBaru && (
                        <div className="relative flex-shrink-0">
                          <img src={fotoBaru} alt="Preview foto" className="w-20 h-14 object-cover rounded-xl border border-gray-200 shadow-sm" />
                          <button type="button" onClick={() => setFotoBaru("")}
                            className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold hover:bg-red-600 transition-colors"
                            aria-label="Hapus foto">×</button>
                        </div>
                      )}
                      <label htmlFor="input-foto-berita"
                        className="flex-1 flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-200 rounded-xl py-4 px-3 cursor-pointer hover:border-blue-300 hover:bg-blue-50 transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                        </svg>
                        <span className="text-xs text-gray-500 text-center">{fotoBaru ? "Ganti foto" : "Klik untuk unggah foto"}</span>
                        <input id="input-foto-berita" type="file" accept="image/*" className="hidden" onChange={handleFotoUpload} />
                      </label>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">Disarankan ukuran landscape (16:9). Format: JPG, PNG, WEBP.</p>
                  </div>

                  {/* ── Tombol Aksi ── */}
                  <div className="pt-2 flex items-center gap-3">
                    <button
                      id="btn-publikasikan-berita"
                      type="button"
                      onClick={handleTambahBerita}
                      className="flex items-center gap-2 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                      style={{ background: editId ? "linear-gradient(135deg, #dc6803, #b45309)" : "linear-gradient(135deg, #0A58CA, #052c65)" }}
                    >
                      {editId ? (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                          </svg>
                          Update Berita
                        </>
                      ) : (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                          </svg>
                          Publikasikan Berita
                        </>
                      )}
                    </button>
                    {editId && (
                      <button type="button" onClick={resetForm}
                        className="flex items-center gap-2 text-gray-600 font-semibold text-sm px-5 py-3 rounded-xl border border-gray-200 hover:bg-gray-50 transition-all">
                        Batal
                      </button>
                    )}
                  </div>

                </div>
              </div>

              {/* ════════════════════════════════════════
                  Daftar Berita Terpublikasi
                  ════════════════════════════════════════ */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
                <SectionHeader
                  icon={<IconNews />}
                  title={`Daftar Berita Terpublikasi (${beritaSorted.length})`}
                  subtitle="Klik Edit untuk memperbarui, atau Hapus untuk menghapus berita."
                />

                {/* ── Kontrol Urutan ── */}
                <div className="mb-5 flex items-end gap-3">
                  <div>
                    <label htmlFor="sort-urutan-berita" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                      Urutkan
                    </label>
                    <select
                      id="sort-urutan-berita"
                      value={sortUrutan}
                      onChange={(e) => setSortUrutan(e.target.value)}
                      className="px-4 py-2.5 text-sm text-gray-900 bg-white border border-gray-200 rounded-xl focus:outline-none transition-all"
                      onFocus={(e) => { e.target.style.boxShadow = "0 0 0 3px rgba(10,88,202,0.12)"; e.target.style.borderColor = "#0A58CA"; }}
                      onBlur={(e) => { e.target.style.boxShadow = ""; e.target.style.borderColor = ""; }}
                    >
                      <option value="terbaru">⬇ Paling Baru</option>
                      <option value="terlama">⬆ Paling Lama</option>
                    </select>
                  </div>
                </div>

                {/* ── List Berita ── */}
                {beritaSorted.length === 0 ? (
                  <div className="border-t border-gray-100 pt-6 flex flex-col items-center justify-center py-10 gap-3 text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-gray-200" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" />
                    </svg>
                    <p className="text-gray-400 text-sm font-medium">Belum ada berita yang dipublikasikan.</p>
                    <p className="text-gray-400 text-xs">Gunakan form di atas untuk menambahkan berita baru.</p>
                  </div>
                ) : (
                  <div className="border-t border-gray-100 pt-4 space-y-3">
                    {beritaSorted.map((berita, index) => (
                      <div key={berita.id}
                        className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-all">
                        <span className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-lg bg-gray-100 text-gray-500 text-xs font-bold">
                          {index + 1}
                        </span>
                        <div className={`flex-shrink-0 w-14 h-10 rounded-lg overflow-hidden relative bg-gradient-to-br ${berita.gradient}`}>
                          {berita.foto && <img src={berita.foto} alt={berita.judul} className="absolute inset-0 w-full h-full object-cover" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-gray-900 font-semibold text-sm leading-snug truncate">{berita.judul}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="inline-block text-white text-xs font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: berita.kategoriColor, fontSize: "10px" }}>
                              {berita.kategori}
                            </span>
                            <span className="text-gray-400 text-xs">{formatTanggalDisplay(berita.tanggal)}</span>
                          </div>
                        </div>
                        <div className="flex-shrink-0 flex items-center gap-2">
                          <button type="button" onClick={() => handleEdit(berita)}
                            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition-all">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Z" />
                            </svg>
                            Edit
                          </button>
                          <button type="button" onClick={() => handleHapus(berita.id)}
                            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 hover:border-red-300 transition-all">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                            Hapus
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          )}

          {/* ════════════════════════════════════════════
              KONTEN — INFOGRAFIS / DEMOGRAFI
              ════════════════════════════════════════════ */}
          {activeNav === "infografis" && (
            <>
              {/* ── Heading + Tombol Simpan ── */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
                <div>
                  <h1 className="text-2xl font-extrabold text-gray-900 leading-tight">Pembaruan Data Angka Statistik Kelurahan</h1>
                  <p className="text-gray-500 text-sm mt-1 max-w-xl">Perbarui data infografis demografi secara real-time.</p>
                </div>
                <button id="btn-simpan-perubahan" onClick={handleSimpan}
                  className="flex-shrink-0 flex items-center gap-2 text-white font-bold text-sm px-5 py-3 rounded-xl shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                  style={{ background: "linear-gradient(135deg, #198754, #0d6832)" }}>
                  <IconSave />Simpan Perubahan
                </button>
              </div>

              {/* ── Tab Pilihan ── */}
              <div className="flex gap-1 bg-gray-100 p-1 rounded-xl mb-6 w-fit">
                {[{ key: "demografi", label: "Data Demografi" }, { key: "portal", label: "Konten Portal Publik" }].map(({ key, label }) => (
                  <button key={key} id={`tab-${key}`} onClick={() => setActiveTab(key)}
                    className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-150 ${activeTab === key ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>
                    {label}
                  </button>
                ))}
              </div>

              {/* ── TAB A — DATA DEMOGRAFI ── */}
              {activeTab === "demografi" && (
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
                  <SectionHeader icon={<IconChart />} title="Data Demografi" subtitle="Perbarui data kependudukan yang tampil di halaman publik." />
                  <div className="border-t border-gray-100 pt-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                      <AdminInput id="input-total-penduduk" label="Input Total Penduduk" value={totalPenduduk} onChange={(e) => setTotalPenduduk(e.target.value)} type="number"
                        prefix={<svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" /></svg>}
                        helpText="Format angka (tanpa titik koma)" />
                      <AdminInput id="input-kepala-keluarga" label="Input Kepala Keluarga" value={jumlahKK} onChange={(e) => setJumlahKK(e.target.value)} type="number"
                        prefix={<svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>} />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
                      <AdminInput id="input-jumlah-rt" label="Input Jumlah RT" value={jumlahRT} onChange={(e) => setJumlahRT(e.target.value)} type="number"
                        prefix={<svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" /></svg>} />
                      <AdminInput id="input-jumlah-rw" label="Input Jumlah RW" value={jumlahRW} onChange={(e) => setJumlahRW(e.target.value)} type="number"
                        prefix={<svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m2.25-18v18m13.5-18v18m2.25-18v18M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" /></svg>} />
                    </div>
                    <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-xl p-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                      </svg>
                      <div>
                        <p className="text-blue-800 text-xs font-bold mb-0.5">Informasi Pembaruan</p>
                        <p className="text-blue-600 text-xs leading-relaxed">
                          Terakhir diperbarui: {new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })} oleh Admin Utama.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ── TAB B — KONTEN PORTAL PUBLIK ── */}
              {activeTab === "portal" && (
                <div className="space-y-6">
                  {/* Card IKM */}
                  <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
                    <SectionHeader
                      icon={<svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" /></svg>}
                      title="Nilai Indeks Kepuasan Masyarakat (IKM)" subtitle="Data ini tampil di kartu sorot IKM pada halaman Beranda." />
                    <div className="border-t border-gray-100 pt-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <AdminInput id="input-nilai-ikm" label="Nilai IKM Terbaru" value={nilaiIKM} onChange={(e) => setNilaiIKM(e.target.value)} type="text" helpText="Contoh: 98.750" />
                      <div>
                        <label htmlFor="input-predikat-ikm" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Predikat IKM</label>
                        <select id="input-predikat-ikm" value={predikatIKM} onChange={(e) => setPredikatIKM(e.target.value)}
                          className="w-full px-4 py-2.5 text-sm text-gray-900 bg-white border border-gray-200 rounded-xl focus:outline-none transition-all"
                          onFocus={(e) => { e.target.style.boxShadow = "0 0 0 3px rgba(10,88,202,0.12)"; e.target.style.borderColor = "#0A58CA"; }}
                          onBlur={(e) => { e.target.style.boxShadow = ""; e.target.style.borderColor = ""; }}>
                          <option value="A">A — Sangat Memuaskan (≥ 88.31)</option>
                          <option value="B">B — Memuaskan (76.61 – 88.30)</option>
                          <option value="C">C — Cukup (65.00 – 76.60)</option>
                          <option value="D">D — Tidak Memuaskan (≤ 64.99)</option>
                        </select>
                        <p className="text-xs text-gray-400 mt-1">Pilih predikat sesuai nilai IKM</p>
                      </div>
                    </div>
                    <div className="mt-5 rounded-xl p-4 flex items-center justify-between gap-4" style={{ background: "linear-gradient(135deg, #052c65, #0A58CA)" }}>
                      <div>
                        <p className="text-blue-300 text-xs font-semibold uppercase tracking-wider mb-1">Indeks Kepuasan Masyarakat (IKM)</p>
                        <p className="text-white text-2xl font-extrabold">{nilaiIKM || "—"}</p>
                        <p className="text-blue-200 text-xs mt-0.5">Preview tampilan publik</p>
                      </div>
                      <span className="inline-block bg-green-400 text-green-900 font-extrabold text-sm px-4 py-2 rounded-xl">PREDIKAT {predikatIKM}</span>
                    </div>
                  </div>

                  {/* Card WhatsApp */}
                  <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
                    <SectionHeader
                      icon={<svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" /></svg>}
                      title="Nomor WhatsApp Hotline Pengaduan" subtitle="Nomor ini tampil di halaman Kontak dan tombol WhatsApp pengaduan warga." />
                    <div className="border-t border-gray-100 pt-5">
                      <AdminInput id="input-nomor-wa" label="Nomor WhatsApp Hotline" value={nomorWA} onChange={(e) => setNomorWA(e.target.value)} type="tel"
                        prefix={<span className="text-xs font-bold text-gray-500">+62</span>}
                        helpText="Masukkan nomor tanpa awalan 0 atau +62." />
                      <div className="mt-4 flex items-center gap-2 bg-green-50 border border-green-100 rounded-xl px-4 py-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.558 4.115 1.533 5.835L.057 23.5l5.835-1.53A11.943 11.943 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.905 0-3.68-.517-5.2-1.415l-.372-.22-3.863 1.013 1.031-3.77-.241-.388A9.958 9.958 0 0 1 2 12c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10z" />
                        </svg>
                        <p className="text-green-700 text-xs font-medium">Link aktif: <span className="font-bold">https://wa.me/{nomorWA}</span></p>
                      </div>
                    </div>
                  </div>

                  {/* Card Banner */}
                  <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
                    <SectionHeader
                      icon={<svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 1 1 0-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 0 1-1.44-4.282m3.102.069a18.03 18.03 0 0 1-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 0 1 8.835 2.535M10.34 6.66a23.847 23.847 0 0 0 8.835-2.535m0 0A23.74 23.74 0 0 0 18.795 3m.38 1.125a23.91 23.91 0 0 1 1.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 0 0 1.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 0 1 0 3.46" /></svg>}
                      title="Teks Banner Pengumuman Beranda" subtitle="Tampil sebagai banner utama di halaman depan portal publik." />
                    <div className="border-t border-gray-100 pt-5">
                      <label htmlFor="input-banner-text" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Teks Pengumuman Utama</label>
                      <textarea id="input-banner-text" rows={3} value={bannerText} onChange={(e) => setBannerText(e.target.value)}
                        className="w-full px-4 py-3 text-sm text-gray-900 bg-white border border-gray-200 rounded-xl focus:outline-none transition-all resize-none"
                        placeholder="Ketikkan teks banner pengumuman di sini..."
                        onFocus={(e) => { e.target.style.boxShadow = "0 0 0 3px rgba(10,88,202,0.12)"; e.target.style.borderColor = "#0A58CA"; }}
                        onBlur={(e) => { e.target.style.boxShadow = ""; e.target.style.borderColor = ""; }} />
                      <p className="text-xs text-gray-400 mt-1">{bannerText.length} karakter. Disarankan maks. 200 karakter.</p>
                      <div className="mt-4 rounded-xl overflow-hidden">
                        <div className="flex items-center gap-2 px-4 py-2.5" style={{ background: "linear-gradient(90deg, #052c65 0%, #0A58CA 100%)" }}>
                          <span className="flex-shrink-0 bg-white/20 text-white text-xs font-bold px-2 py-0.5 rounded-md">PENGUMUMAN</span>
                          <p className="text-white text-xs truncate">{bannerText || "—"}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ── Tombol Simpan Bawah ── */}
              <div className="mt-8 flex justify-end">
                <button id="btn-simpan-bawah" onClick={handleSimpan}
                  className="flex items-center gap-2 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                  style={{ background: "linear-gradient(135deg, #198754, #0d6832)" }}>
                  <IconSave />Simpan Semua Perubahan
                </button>
              </div>
            </>
          )}

        </div>
        {/* ── End Body Konten ── */}
      </main>
    </div>
  );
}
