/* =========================================================
   HALAMAN LOGIN ADMIN — Kelurahan Parit Mayor
   Desain minimalis elegan dengan centered card layout
   Stack: Next.js (App Router) + Tailwind CSS + useState
   ========================================================= */

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

/* ── Ikon SVG Atoms ─────────────────────────────────────── */
function IconShield() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
    </svg>
  );
}

function IconUser() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
    </svg>
  );
}

function IconLock() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
    </svg>
  );
}

function IconEye({ show, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
      aria-label={show ? "Sembunyikan password" : "Tampilkan password"}
    >
      {show ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </svg>
      )}
    </button>
  );
}

/* ══════════════════════════════════════════════════════════
   KOMPONEN UTAMA — LoginAdminPage
   ══════════════════════════════════════════════════════════ */
export default function LoginAdminPage() {
  const router = useRouter();

  /* ── State Form ──────────────────────────────────────── */
  const [username, setUsername]   = useState("");
  const [password, setPassword]   = useState("");
  const [showPass, setShowPass]   = useState(false);
  const [error, setError]         = useState("");
  const [isLoading, setIsLoading] = useState(false);

  /* ── Handler Submit Login ────────────────────────────── */
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulasi delay autentikasi supaya terasa natural
    await new Promise((res) => setTimeout(res, 800));

    if (username === "admin" && password === "paritmayor123") {
      // Simpan status login ke localStorage
      localStorage.setItem("adminLoggedIn", "true");
      localStorage.setItem("adminLoginTime", new Date().toISOString());
      // Redirect ke dashboard admin
      router.push("/admin");
    } else {
      setError("Kredensial Salah! Username atau password tidak valid.");
      setIsLoading(false);
    }
  };

  /* ── Render ──────────────────────────────────────────── */
  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #052c65 0%, #0A58CA 55%, #0d6efd 100%)",
      }}
    >
      {/* Dekoratif: Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg,#fff,#fff 1px,transparent 1px,transparent 60px),repeating-linear-gradient(90deg,#fff,#fff 1px,transparent 1px,transparent 60px)",
        }}
      />
      {/* Dekoratif: Blur Circles */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-20 blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"
        style={{ backgroundColor: "#198754" }} aria-hidden="true" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-15 blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none"
        style={{ backgroundColor: "#6610f2" }} aria-hidden="true" />

      {/* ── CARD LOGIN ─────────────────────────────────── */}
      <div className="relative w-full max-w-md mx-4">
        <div
          className="rounded-3xl shadow-2xl overflow-hidden"
          style={{ background: "rgba(255,255,255,0.97)" }}
        >
          {/* Header Card — Gradient biru */}
          <div
            className="px-8 pt-10 pb-8 text-center"
            style={{ background: "linear-gradient(135deg, #052c65 0%, #0A58CA 100%)" }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 text-white shadow-lg"
              style={{ backgroundColor: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)" }}>
              <IconShield />
            </div>
            <h1 className="text-white text-2xl font-extrabold mb-1">Area Admin</h1>
            <p className="text-blue-200 text-sm">Portal Resmi Kelurahan Parit Mayor</p>
          </div>

          {/* Body Card — Form Login */}
          <div className="px-8 py-8">
            {/* Notifikasi Error */}
            {error && (
              <div
                id="login-error-msg"
                role="alert"
                className="flex items-center gap-2.5 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl mb-5"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-8-5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 10 5Zm0 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd" />
                </svg>
                <span className="font-semibold">{error}</span>
              </div>
            )}

            <form onSubmit={handleLogin} noValidate>
              {/* Input Username */}
              <div className="mb-5">
                <label htmlFor="login-username" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <IconUser />
                  </div>
                  <input
                    id="login-username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Masukkan username"
                    className="w-full pl-10 pr-4 py-3 text-sm text-gray-900 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none transition-all"
                    onFocus={(e) => {
                      e.target.style.boxShadow = "0 0 0 3px rgba(10,88,202,0.15)";
                      e.target.style.borderColor = "#0A58CA";
                    }}
                    onBlur={(e) => {
                      e.target.style.boxShadow = "";
                      e.target.style.borderColor = "";
                    }}
                  />
                </div>
              </div>

              {/* Input Password */}
              <div className="mb-6">
                <label htmlFor="login-password" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <IconLock />
                  </div>
                  <input
                    id="login-password"
                    name="password"
                    type={showPass ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Masukkan password"
                    className="w-full pl-10 pr-10 py-3 text-sm text-gray-900 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none transition-all"
                    onFocus={(e) => {
                      e.target.style.boxShadow = "0 0 0 3px rgba(10,88,202,0.15)";
                      e.target.style.borderColor = "#0A58CA";
                    }}
                    onBlur={(e) => {
                      e.target.style.boxShadow = "";
                      e.target.style.borderColor = "";
                    }}
                  />
                  <IconEye show={showPass} onClick={() => setShowPass(!showPass)} />
                </div>
              </div>

              {/* Tombol Masuk */}
              <button
                id="btn-login-submit"
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2.5 text-white font-bold text-sm py-3.5 rounded-xl shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
                style={{ background: "linear-gradient(135deg, #198754 0%, #0d6832 100%)" }}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Memverifikasi...
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                    </svg>
                    Masuk ke Dashboard
                  </>
                )}
              </button>
            </form>

            {/* Footer Card */}
            <div className="mt-6 pt-5 border-t border-gray-100 text-center">
              <p className="text-gray-400 text-xs">
                Akses terbatas untuk aparatur kelurahan yang berwenang.
              </p>
              <Link href="/" className="inline-flex items-center gap-1 text-xs mt-2 transition-colors hover:underline" style={{ color: "#0A58CA" }}>
                ← Kembali ke Halaman Publik
              </Link>
            </div>
          </div>
        </div>

        <p className="text-center text-white/50 text-xs mt-4">
          © 2026 Pemerintah Kelurahan Parit Mayor. Sistem Informasi Internal.
        </p>
      </div>
    </div>
  );
}
