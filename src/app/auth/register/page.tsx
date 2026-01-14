"use client";
import { useRouter } from "next/navigation";
import { useAuth } from '@/hooks/useAuth';
import { useEffect } from "react";
import { useState } from "react";
import Link from "next/link";
import Swal from "sweetalert2";

export default function Register() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        termsAccepted: false
    });

    const [error, setError] = useState("");
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (user) {
            if (user?.role === "PENTADBIR_SYSTEM") {
                router.push("/admin-dashboard");
            } else {
                router.push("/user-dashboard");
            }
        }
    }, [user, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // setLoading(true);
        setError("");

        // Validate confirm password
        if (formData.password !== formData.confirmPassword) {
            Swal.fire({
                icon: "error",
                title: "Ralat!",
                text: "Kata laluan tidak sepadan",
                confirmButtonColor: "#ef4444"
            });
            // setLoading(false);
            return;
        }

        if (!formData.termsAccepted) {
            Swal.fire({
                icon: "error",
                title: "Ralat!",
                text: "Sila terima Terma & Syarat",
                confirmButtonColor: "#ef4444"
            });
            // setLoading(false);
            return;
        }

        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    role: "PEMOHON"
                })
            });

            const data = await res.json(); // Pindah sini untuk debug

            // Tukar success response
            if (res.ok) {
                Swal.fire({
                    icon: "success",
                    title: "Pendaftaran Akaun Pemohon Berjaya!",
                    text: "Sila semak emel untuk sahkan pendaftaran anda.",
                    timer: 2500,
                    showConfirmButton: false,
                }).then(() => {
                    // REDIRECT KE CHECK EMAIL
                    router.push("/auth/check-email");
                });
            } else {
                console.log('Error response:', res.status, data); // ✅ Fixed logging
                Swal.fire({
                    icon: "error",
                    title: "Ralat Pendaftaran!",
                    text: data.error || "Pendaftaran gagal",
                    confirmButtonColor: "#ef4444"
                });
            }
        } catch (err) {
            console.error('Network error:', err); // ✅ Better logging
            Swal.fire({
                icon: "error",
                title: "Ralat!",
                text: "Ralat rangkaian. Sila cuba lagi.",
                confirmButtonColor: "#ef4444"
            });
        }
    };

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-amber-50 p-4">
            <div className="w-full max-w-4xl flex bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/50">

                {/* Left: Branding */}
                <div className="w-2/5 bg-gradient-to-b from-orange-500 to-orange-600 flex flex-col items-center justify-center p-10 text-white relative overflow-hidden">
                    <div className="mb-8 drop-shadow-2xl z-10">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/2/26/Coat_of_arms_of_Malaysia.svg"
                            alt="Jata Negara"
                            className="h-24 w-auto"
                        />
                    </div>
                    <h3 className="text-2xl font-black mb-2 drop-shadow-lg text-center leading-tight">
                        eBANTUANJKM 2.0
                    </h3>
                    <span className="text-xs font-bold uppercase tracking-widest opacity-90">
                        Pendaftaran Akaun Baharu
                    </span>
                    <div className="absolute inset-0 bg-black/10" />
                </div>

                {/* Right: Form */}
                <div className="w-3/5 p-10 flex flex-col justify-center">
                    <h5 className="text-2xl font-black mb-8 text-slate-900 tracking-tight">
                        Daftar Akaun
                    </h5>

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-800 px-6 py-4 rounded-2xl mb-8 text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* MyDigitalID Button */}
                        <button
                            type="button"
                            onClick={() => alert('Redirecting to MyDigitalID Registration...')}
                            className="w-full bg-white border-2 border-slate-200 text-slate-900 py-4 px-6 rounded-2xl font-semibold flex items-center justify-center gap-3 hover:border-orange-400 hover:shadow-xl transition-all duration-200 hover:-translate-y-1"
                        >
                            <img
                                src="https://www.digital-id.my/images/logo/logo_colored.svg"
                                alt="MyDigitalID"
                                className="h-5 w-auto"
                            />
                            Daftar dengan MyDigitalID
                        </button>

                        <div className="flex items-center gap-4 py-4">
                            <div className="flex-1 h-px bg-slate-200"></div>
                            <span className="text-xs font-bold uppercase text-slate-500 px-4">Atau Daftar E-mel</span>
                            <div className="flex-1 h-px bg-slate-200"></div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-600 mb-3">
                                Nama Penuh
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-4 py-4 border border-slate-200 rounded-2xl bg-slate-50 text-black font-medium text-base focus:ring-4 focus:ring-orange-100 focus:border-orange-400 transition-all duration-200 placeholder-slate-400"
                                placeholder="Seperti dalam MyKad"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-600 mb-3">
                                Alamat E-mel
                            </label>
                            <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full px-4 py-4 border border-slate-200 rounded-2xl bg-slate-50 text-black font-medium text-base focus:ring-4 focus:ring-orange-100 focus:border-orange-400 transition-all duration-200 placeholder-slate-400"
                                placeholder="nama@email.com"
                            />
                        </div>


                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-slate-600 mb-3">
                                    Kata Laluan
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        required
                                        minLength={8}
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        className="w-full pr-12 pl-4 py-4 border border-slate-200 rounded-2xl bg-slate-50 text-black font-medium text-base focus:ring-4 focus:ring-orange-100 focus:border-orange-400 transition-all duration-200 placeholder-slate-400"
                                        placeholder="Min. 8 aksara"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                                    >
                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                d={showPassword
                                                    ? "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                    : "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                                                }
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-600 mb-3">
                                    Sahkan Laluan
                                </label>
                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        required
                                        value={formData.confirmPassword}
                                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                        className="w-full pr-12 pl-4 py-4 border border-slate-200 rounded-2xl bg-slate-50 text-black font-medium text-base focus:ring-4 focus:ring-orange-100 focus:border-orange-400 transition-all duration-200 placeholder-slate-400"
                                        placeholder="Ulang kata laluan"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                                    >
                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                d={showConfirmPassword
                                                    ? "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                    : "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                                                }
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>


                        <div className="flex items-start">
                            <input
                                id="termsCheck"
                                type="checkbox"
                                required
                                checked={formData.termsAccepted}
                                onChange={(e) => setFormData({ ...formData, termsAccepted: e.target.checked })}
                                className="h-5 w-5 text-orange-600 focus:ring-orange-500 border-slate-300 rounded mt-1"
                            />
                            <label htmlFor="termsCheck" className="ml-3 text-sm text-slate-600 cursor-pointer select-none">
                                Saya bersetuju dengan{' '}
                                <Link href="/terms" className="text-orange-600 hover:text-orange-700 font-semibold">
                                    Terma & Syarat
                                </Link>
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative w-full bg-slate-900 hover:bg-slate-800 text-white py-5 px-8 rounded-2xl font-bold text-sm uppercase tracking-wide shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden disabled:opacity-50"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-3">
                                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" fill="none" pathLength="1" className="opacity-25" />
                                        <path fill="none" opacity=".9" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Sedang mendaftar...
                                </span>
                            ) : (
                                <>
                                    <svg className="inline-block w-5 h-5 mr-3 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                    </svg>
                                    Daftar Akaun
                                </>
                            )}
                        </button>
                    </form>

                    <div className="text-center mt-10 pt-8 border-t-2 border-slate-100">
                        <p className="text-sm text-slate-600">
                            Sudah mempunyai akaun?{' '}
                            <Link
                                href="/auth/login"
                                className="font-bold text-slate-900 hover:text-orange-600 transition-colors duration-200"
                            >
                                Log Masuk Di Sini
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
