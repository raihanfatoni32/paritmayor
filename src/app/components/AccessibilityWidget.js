/* =========================================================
   AccessibilityWidget — Widget Aksesibilitas Melayang
   Portal Resmi Kelurahan Parit Mayor

   Fitur:
   1. Perbesar Huruf (A+)
   2. Perkecil Huruf (A-)
   3. Mode Kontras Tinggi (High Contrast)
   4. Font Ramah Disleksia
   5. Hentikan Animasi
   6. Garis Pandu Baca (Reading Guide)

   Dipasang di layout.js agar aktif di semua halaman.
   ========================================================= */
"use client";

import { useState, useEffect, useCallback, useRef } from "react";

/* ════════════════════════════════════════════════════════════
   KONSTANTA — kelas CSS yang diterapkan ke <html>
   ════════════════════════════════════════════════════════════ */
const CLS = {
  FONT_LG   : "acc-font-lg",     /* ukuran huruf lebih besar    */
  FONT_XL   : "acc-font-xl",     /* ukuran huruf paling besar   */
  CONTRAST  : "acc-high-contrast",/* mode kontras tinggi         */
  DYSLEXIA  : "acc-dyslexia",    /* font ramah disleksia        */
  NO_ANIM   : "acc-no-anim",     /* matikan semua animasi       */
  GUIDE     : "acc-reading-guide",/* aktifkan garis pandu baca  */
};

/* ── Tingkat ukuran font (siklus: normal → lg → xl → normal) */
const FONT_STEPS = [null, CLS.FONT_LG, CLS.FONT_XL];

/* ════════════════════════════════════════════════════════════
   HOOK — Kelola kelas aksesibilitas di <html>
   ════════════════════════════════════════════════════════════ */
function useHtmlClass() {
  const toggle = useCallback((cls, force) => {
    document.documentElement.classList.toggle(cls, force);
  }, []);
  const has = useCallback(
    (cls) => document.documentElement.classList.contains(cls),
    []
  );
  return { toggle, has };
}

/* ════════════════════════════════════════════════════════════
   SUB-KOMPONEN — Tombol fitur individual di dalam panel
   ════════════════════════════════════════════════════════════ */
function FeatureBtn({ id, icon, label, active, onClick, activeColor = "#198754" }) {
  return (
    <button
      id={id}
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`
        w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-sm
        font-medium transition-all duration-150 border
        ${active
          ? "text-white border-transparent shadow-sm"
          : "text-gray-700 border-gray-100 bg-gray-50 hover:bg-gray-100"
        }
      `}
      style={active ? { backgroundColor: activeColor, borderColor: activeColor } : {}}
    >
      <span className="text-lg flex-shrink-0 w-6 text-center" aria-hidden="true">{icon}</span>
      <span className="flex-1 leading-tight">{label}</span>
      {active && (
        <span className="flex-shrink-0 text-xs bg-white/25 px-1.5 py-0.5 rounded-full font-bold">
          ON
        </span>
      )}
    </button>
  );
}

/* ════════════════════════════════════════════════════════════
   KOMPONEN UTAMA — AccessibilityWidget
   ════════════════════════════════════════════════════════════ */
export default function AccessibilityWidget() {
  /* ── State panel terbuka/tertutup ─────────────────────── */
  const [isOpen, setIsOpen]         = useState(false);

  /* ── State tiap fitur ─────────────────────────────────── */
  const [fontStep, setFontStep]     = useState(0);   /* 0=normal,1=lg,2=xl */
  const [highContrast, setHighContrast] = useState(false);
  const [dyslexia, setDyslexia]     = useState(false);
  const [noAnim, setNoAnim]         = useState(false);
  const [readingGuide, setReadingGuide] = useState(false);

  /* ── State posisi garis pandu baca ────────────────────── */
  const [guideY, setGuideY]         = useState(-100);

  /* ── Ref panel untuk deteksi klik di luar ────────────── */
  const panelRef = useRef(null);

  const { toggle } = useHtmlClass();

  /* ── Sinkronisasi kelas font saat fontStep berubah ────── */
  useEffect(() => {
    // Hapus semua kelas font lama dulu
    document.documentElement.classList.remove(CLS.FONT_LG, CLS.FONT_XL);
    // Terapkan kelas sesuai step saat ini
    if (FONT_STEPS[fontStep]) {
      document.documentElement.classList.add(FONT_STEPS[fontStep]);
    }
  }, [fontStep]);

  /* ── Sinkronisasi kelas fitur lainnya ─────────────────── */
  useEffect(() => { toggle(CLS.CONTRAST, highContrast); }, [highContrast, toggle]);
  useEffect(() => { toggle(CLS.DYSLEXIA, dyslexia);     }, [dyslexia, toggle]);
  useEffect(() => { toggle(CLS.NO_ANIM,  noAnim);       }, [noAnim, toggle]);
  useEffect(() => { toggle(CLS.GUIDE,    readingGuide);  }, [readingGuide, toggle]);

  /* ── Pelacak mouse untuk garis pandu baca ─────────────── */
  useEffect(() => {
    if (!readingGuide) return;

    const onMouseMove = (e) => setGuideY(e.clientY);
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, [readingGuide]);

  /* ── Tutup panel saat klik di luar ───────────────────── */
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen]);

  /* ── Tutup panel dengan Escape ────────────────────────── */
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") setIsOpen(false); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  /* ── Handler: perbesar huruf (siklus maju) ─────────────── */
  const handleFontIncrease = () =>
    setFontStep((s) => Math.min(s + 1, FONT_STEPS.length - 1));

  /* ── Handler: perkecil huruf (siklus mundur) ──────────── */
  const handleFontDecrease = () =>
    setFontStep((s) => Math.max(s - 1, 0));

  /* ── Label ukuran font saat ini ───────────────────────── */
  const fontLabel = ["Normal", "Besar", "Sangat Besar"][fontStep];

  /* ── Hitung apakah ada fitur yang aktif ───────────────── */
  const anyActive = fontStep > 0 || highContrast || dyslexia || noAnim || readingGuide;

  /* ── Handler reset semua fitur ────────────────────────── */
  const handleReset = () => {
    setFontStep(0);
    setHighContrast(false);
    setDyslexia(false);
    setNoAnim(false);
    setReadingGuide(false);
  };

  return (
    <>
      {/* ════════════════════════════════════════════════
          GARIS PANDU BACA — mengikuti kursor mouse
          ════════════════════════════════════════════════ */}
      {readingGuide && (
        <div
          role="presentation"
          aria-hidden="true"
          className="fixed left-0 right-0 pointer-events-none z-[9998]"
          style={{
            top: guideY - 16,
            height: "32px",
            background: "rgba(255, 240, 0, 0.25)",
            borderTop: "2px solid rgba(255, 200, 0, 0.6)",
            borderBottom: "2px solid rgba(255, 200, 0, 0.6)",
          }}
        />
      )}

      {/* ════════════════════════════════════════════════
          WIDGET CONTAINER — pojok kiri bawah
          Sengaja kiri bawah agar tidak menutupi tombol
          WhatsApp/scroll yang biasanya ada di kanan
          ════════════════════════════════════════════════ */}
      <div
        ref={panelRef}
        className="fixed bottom-6 left-4 z-[9999] flex flex-col items-start gap-2"
        aria-label="Widget aksesibilitas"
      >

        {/* ── Panel Kontrol (muncul di atas tombol) ──── */}
        {isOpen && (
          <div
            role="dialog"
            aria-label="Panel kontrol aksesibilitas"
            aria-modal="false"
            className="
              w-72 rounded-2xl shadow-2xl border border-gray-100 overflow-hidden
              animate-fade-in-up
            "
            style={{ backgroundColor: "#fff" }}
          >
            {/* Header panel */}
            <div
              className="flex items-center justify-between px-4 py-3"
              style={{ background: "linear-gradient(135deg, #052c65, #0A58CA)" }}
            >
              <div className="flex items-center gap-2.5">
                <span className="text-xl" aria-hidden="true">♿</span>
                <div>
                  <p className="text-white font-bold text-sm leading-tight">Aksesibilitas</p>
                  <p className="text-blue-200 text-xs">Sesuaikan tampilan web</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Tutup panel aksesibilitas"
                className="w-7 h-7 rounded-lg bg-white/15 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Body panel */}
            <div className="p-3 space-y-1.5">

              {/* ── GRUP: Ukuran Teks ─────────────────── */}
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-1 pt-1">
                Ukuran Teks
              </p>

              {/* Perbesar / Perkecil dalam satu baris */}
              <div className="flex gap-2">
                {/* Perkecil A- */}
                <button
                  id="acc-btn-font-decrease"
                  type="button"
                  onClick={handleFontDecrease}
                  disabled={fontStep === 0}
                  aria-label="Perkecil ukuran huruf"
                  className="
                    flex-1 flex items-center justify-center gap-1.5 px-2 py-2.5 rounded-xl
                    text-sm font-bold border transition-all duration-150
                    disabled:opacity-40 disabled:cursor-not-allowed
                    bg-gray-50 border-gray-100 text-gray-700 hover:bg-gray-100
                  "
                >
                  <span className="text-base" aria-hidden="true">A</span>
                  <span className="text-xs" aria-hidden="true">−</span>
                  <span className="sr-only">Perkecil</span>
                </button>

                {/* Indikator level font */}
                <div className="flex-1 flex items-center justify-center px-2 py-2.5 rounded-xl border border-blue-100 bg-blue-50 text-center">
                  <span className="text-xs font-bold text-blue-700">{fontLabel}</span>
                </div>

                {/* Perbesar A+ */}
                <button
                  id="acc-btn-font-increase"
                  type="button"
                  onClick={handleFontIncrease}
                  disabled={fontStep === FONT_STEPS.length - 1}
                  aria-label="Perbesar ukuran huruf"
                  className="
                    flex-1 flex items-center justify-center gap-1 px-2 py-2.5 rounded-xl
                    text-sm font-bold border transition-all duration-150
                    disabled:opacity-40 disabled:cursor-not-allowed
                  "
                  style={
                    fontStep < FONT_STEPS.length - 1
                      ? { backgroundColor: "#EBF2FF", borderColor: "#BFDBFE", color: "#0A58CA" }
                      : {}
                  }
                >
                  <span className="text-lg leading-none" aria-hidden="true">A</span>
                  <span className="text-xs leading-none" aria-hidden="true">+</span>
                  <span className="sr-only">Perbesar</span>
                </button>
              </div>

              {/* ── GRUP: Penglihatan ─────────────────── */}
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-1 pt-2">
                Penglihatan
              </p>

              <FeatureBtn
                id="acc-btn-contrast"
                icon="🌑"
                label="Kontras Tinggi"
                active={highContrast}
                onClick={() => setHighContrast((v) => !v)}
                activeColor="#1a1a1a"
              />

              {/* ── GRUP: Teks & Baca ─────────────────── */}
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-1 pt-2">
                Teks & Baca
              </p>

              <FeatureBtn
                id="acc-btn-dyslexia"
                icon="📖"
                label="Font Ramah Disleksia"
                active={dyslexia}
                onClick={() => setDyslexia((v) => !v)}
                activeColor="#7C3AED"
              />

              <FeatureBtn
                id="acc-btn-reading-guide"
                icon="📏"
                label="Garis Pandu Baca"
                active={readingGuide}
                onClick={() => setReadingGuide((v) => !v)}
                activeColor="#0891B2"
              />

              {/* ── GRUP: Gerak & Animasi ─────────────── */}
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-1 pt-2">
                Gerak & Animasi
              </p>

              <FeatureBtn
                id="acc-btn-no-anim"
                icon="🛑"
                label="Hentikan Animasi"
                active={noAnim}
                onClick={() => setNoAnim((v) => !v)}
                activeColor="#DC6803"
              />

              {/* ── Tombol Reset ──────────────────────── */}
              {anyActive && (
                <button
                  id="acc-btn-reset"
                  type="button"
                  onClick={handleReset}
                  className="
                    w-full flex items-center justify-center gap-2 mt-2 px-3 py-2
                    rounded-xl text-xs font-semibold text-gray-500 border border-dashed
                    border-gray-300 hover:border-red-300 hover:text-red-500 hover:bg-red-50
                    transition-all duration-150
                  "
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                  </svg>
                  Reset ke Default
                </button>
              )}
            </div>

            {/* Footer panel */}
            <div className="px-4 py-2.5 border-t border-gray-50 bg-gray-50/50">
              <p className="text-[10px] text-gray-400 text-center">
                Pengaturan berlaku selama sesi ini aktif.
              </p>
            </div>
          </div>
        )}

        {/* ── TOMBOL UTAMA — FAB bulat biru ────────────── */}
        <button
          id="acc-fab-toggle"
          type="button"
          onClick={() => setIsOpen((v) => !v)}
          aria-label={isOpen ? "Tutup widget aksesibilitas" : "Buka widget aksesibilitas"}
          aria-expanded={isOpen}
          aria-haspopup="dialog"
          className="
            relative w-14 h-14 rounded-full text-white shadow-lg
            flex items-center justify-center
            transition-all duration-200 hover:scale-105 hover:shadow-xl
            focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-300
          "
          style={{ backgroundColor: "#0A58CA" }}
        >
          {/* Ikon aksesibilitas (International Symbol of Access) */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-7 h-7"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            {/* Kepala */}
            <circle cx="12" cy="4" r="2" />
            {/* Badan + kursi roda */}
            <path d="M19 13v-2c-1.54.02-3.09-.75-4.07-1.83l-1.29-1.43c-.17-.19-.38-.34-.61-.45-.01 0-.01-.01-.02-.01H13c-.35-.2-.75-.3-1.19-.26C10.76 7.11 10 8.04 10 9.09V15c0 1.1.9 2 2 2h5v5h2v-5.5c0-1.1-.9-2-2-2h-3v-3.45c1.29 1.07 3.25 1.94 5 1.95zm-6.17 5c-.41 1.16-1.52 2-2.83 2-1.66 0-3-1.34-3-3 0-1.31.84-2.41 2-2.83V12.1c-2.28.46-4 2.48-4 4.9 0 2.76 2.24 5 5 5 2.42 0 4.44-1.72 4.9-4h-2.07z"/>
          </svg>

          {/* Badge merah: indikator fitur aktif */}
          {anyActive && (
            <span
              className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-red-500 border-2 border-white flex items-center justify-center"
              aria-label={`${[fontStep > 0, highContrast, dyslexia, noAnim, readingGuide].filter(Boolean).length} fitur aktif`}
            >
              <span className="text-white text-[9px] font-extrabold leading-none">
                {[fontStep > 0, highContrast, dyslexia, noAnim, readingGuide].filter(Boolean).length}
              </span>
            </span>
          )}
        </button>
      </div>

      {/* ════════════════════════════════════════════════════
          INJEKSI CSS AKSESIBILITAS via <style> tag global
          Semua kelas diterapkan pada <html> root element
          ════════════════════════════════════════════════════ */}
      <style>{`
        /* ── 1. Perbesar Huruf ──────────────────────────── */
        .acc-font-lg body,
        .acc-font-lg p,
        .acc-font-lg li,
        .acc-font-lg span,
        .acc-font-lg a,
        .acc-font-lg button,
        .acc-font-lg label,
        .acc-font-lg td,
        .acc-font-lg th {
          font-size: 1.125rem !important;
          line-height: 1.75rem !important;
        }
        .acc-font-lg h1 { font-size: 2.5rem !important; }
        .acc-font-lg h2 { font-size: 2rem   !important; }
        .acc-font-lg h3 { font-size: 1.5rem !important; }

        .acc-font-xl body,
        .acc-font-xl p,
        .acc-font-xl li,
        .acc-font-xl span,
        .acc-font-xl a,
        .acc-font-xl button,
        .acc-font-xl label,
        .acc-font-xl td,
        .acc-font-xl th {
          font-size: 1.3125rem !important;
          line-height: 2rem !important;
        }
        .acc-font-xl h1 { font-size: 3rem   !important; }
        .acc-font-xl h2 { font-size: 2.25rem !important; }
        .acc-font-xl h3 { font-size: 1.75rem !important; }

        /* ── 2. Kontras Tinggi ──────────────────────────── */
        .acc-high-contrast body {
          background-color: #000000 !important;
          color: #FFFF00 !important;
        }
        .acc-high-contrast main,
        .acc-high-contrast section,
        .acc-high-contrast article,
        .acc-high-contrast div {
          background-color: #000000 !important;
          color: #FFFF00 !important;
          border-color: #FFFF00 !important;
        }
        .acc-high-contrast header,
        .acc-high-contrast nav,
        .acc-high-contrast footer {
          background-color: #111111 !important;
          color: #FFFFFF !important;
          border-color: #FFFF00 !important;
        }
        .acc-high-contrast h1,
        .acc-high-contrast h2,
        .acc-high-contrast h3,
        .acc-high-contrast h4 {
          color: #FFFFFF !important;
        }
        .acc-high-contrast p,
        .acc-high-contrast li,
        .acc-high-contrast span,
        .acc-high-contrast label {
          color: #FFFF00 !important;
        }
        .acc-high-contrast a {
          color: #00FFFF !important;
          text-decoration: underline !important;
        }
        .acc-high-contrast a:hover {
          color: #FFFF00 !important;
        }
        .acc-high-contrast button:not(#acc-fab-toggle):not([id^="acc-btn"]) {
          background-color: #1a1a1a !important;
          color: #FFFFFF !important;
          border: 2px solid #FFFF00 !important;
        }
        .acc-high-contrast img {
          filter: grayscale(50%) contrast(1.2);
        }

        /* ── 3. Font Ramah Disleksia ───────────────────── */
        .acc-dyslexia body,
        .acc-dyslexia p,
        .acc-dyslexia li,
        .acc-dyslexia span,
        .acc-dyslexia a,
        .acc-dyslexia button,
        .acc-dyslexia input,
        .acc-dyslexia textarea,
        .acc-dyslexia select,
        .acc-dyslexia label {
          font-family: 'Arial', 'Helvetica Neue', sans-serif !important;
          letter-spacing: 0.08em !important;
          word-spacing:   0.16em !important;
          line-height:    1.9   !important;
        }
        .acc-dyslexia p,
        .acc-dyslexia li {
          text-decoration-line: none;
          text-underline-offset: 0.25em;
        }

        /* ── 4. Hentikan Animasi ───────────────────────── */
        .acc-no-anim *,
        .acc-no-anim *::before,
        .acc-no-anim *::after {
          animation-duration:        0.001ms !important;
          animation-iteration-count: 1       !important;
          transition-duration:       0.001ms !important;
          scroll-behavior:           auto    !important;
        }

        /* ── 5. Garis Pandu Baca — dikontrol via JS ────── */
        /* (garis ditampilkan via komponen React, bukan CSS) */
      `}</style>
    </>
  );
}
