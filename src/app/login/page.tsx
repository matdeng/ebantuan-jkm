"use client";
import { useRouter } from "next/navigation";
import { useAuth } from '@/hooks/useAuth';
import { useEffect } from "react";
import { useState } from "react";
import Swal from "sweetalert2";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      if (user.role === "PENTADBIR_SYSTEM") {
        router.push("/admin-dashboard");
      } else {
        router.push("/user-dashboard");
      }
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. VALIDATE DENGAN CUSTOM API
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (!res.ok || data.error) {
      Swal.fire({
        icon: "error",
        title: "Gagal Log Masuk!",
        text: data.error,
        confirmButtonColor: "#ef4444"
      });
      return;
    }

    // ✅ 2. SAVE JWT
    if (data.token) {
      // Cookie (secure)
      document.cookie = `token=${data.token}; path=/; max-age=86400; SameSite=Strict; Secure`;

      // localStorage backup
      localStorage.setItem("token", data.token);

      Swal.fire({
        icon: "success",
        title: "Berjaya Log Masuk!",
        // text: `Selamat datang, ${data.user.name}!`,
        timer: 1500,
        showConfirmButton: false
      }).then(() => {
        // Role-based redirect
        if (data.user.role === "PENTADBIR_SYSTEM") {
          router.push("/admin-dashboard");
        } else {
          router.push("/user-dashboard");
        }
      });
    }
  };


  if (loading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="w-full max-w-4xl flex bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/50 max-h-[90vh]">

        {/* Left: Branding */}
        <div className="w-2/5 bg-gradient-to-b from-orange-500 to-orange-600 flex flex-col items-center justify-center p-10 text-white relative overflow-hidden">
          <div className="mb-8 drop-shadow-2xl z-10">
            <img
              src="../images/jata_negara.png"
              alt="Jata Negara"
              className="h-32 w-auto"
            />
          </div>
          <h3 className="text-2xl font-black mb-2 drop-shadow-lg text-center leading-tight">
            eBANTUAN JKM 2.0
          </h3>
          <span className="text-xs font-bold uppercase tracking-widest opacity-90">
            Portal Bantuan Kebajikan
          </span>
          <div className="absolute inset-0 bg-black/10" />
        </div>

        {/* Right: Form */}
        <div className="w-3/5 p-12 flex flex-col justify-center">
          <h5 className="text-2xl font-black mb-8 text-slate-900 tracking-tight">
            Log Masuk Akaun
          </h5>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-600 mb-2">
                Alamat E-mel
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-slate-200 text-black rounded-xl bg-slate-50 focus:ring-4 focus:ring-orange-100 focus:border-orange-400 transition-all duration-200 text-sm"
                  placeholder="name@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-600 mb-2">
                Kata Laluan
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.32M9 9v.01" />
                  </svg>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-3 border border-slate-200 text-black rounded-xl bg-slate-50 focus:ring-4 focus:ring-orange-100 focus:border-orange-400 transition-all duration-200 text-sm"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <svg className={`h-5 w-5 ${showPassword ? 'text-slate-600' : 'text-slate-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={showPassword ? "M15 12a3 3 0 11-6 0 3 3 0 016 0z" : "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"} />
                  </svg>
                </button>
              </div>
              <div className="text-right mt-2">
                <Link href="/forgot-password" className="text-xs text-slate-500 hover:text-orange-500 font-semibold">
                  Lupa Kata Laluan?
                </Link>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group relative w-full bg-slate-900 hover:bg-slate-800 text-white py-4 px-6 rounded-xl font-bold text-sm uppercase tracking-wide shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" pathLength="1" className="opacity-25" />
                    <path fill="none" opacity=".75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Memproses...
                </span>
              ) : (
                <>
                  <svg className="inline-block w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14" />
                  </svg>
                  Log Masuk
                </>
              )}
            </button>
          </form>

          <div className="text-center mt-8 pt-6 border-t border-slate-200">
            <p className="text-sm text-slate-600">
              Belum mempunyai akaun?{' '}
              <Link
                href="/register"
                className="font-bold text-slate-900 hover:text-orange-500 transition-colors duration-200"
              >
                Daftar Akaun Baru
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
