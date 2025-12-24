"use client";
import { useRouter } from "next/navigation";
import { Role } from '@prisma/client';
import { useState } from "react";
import Swal from "sweetalert2";

export default function NewUser() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: Role,
    });
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("/api/admin/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {
                Swal.fire({
                    icon: "success",
                    title: "Pengguna Berjaya Ditambah!",
                    text: `${formData.name} dah didaftar.`,
                    timer: 2000,
                    showConfirmButton: false,
                }).then(() => {
                    router.push("/users");
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Ralat!",
                    text: data.error || "Sila cuba lagi.",
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Ralat Sistem!",
                text: "Sila cuba lagi.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {/* Header */}
            <div className="mb-8">
                <button
                    onClick={() => router.back()}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all"
                >
                    ← Kembali
                </button>
            </div>

            <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8">
                <h1 className="text-3xl font-black text-slate-900 mb-2">
                    Tambah Pengguna Baru
                </h1>
                <p className="text-slate-600 mb-8">
                    Isi maklumat pengguna baru di bawah.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Nama */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Nama Penuh <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) =>
                                setFormData({ ...formData, name: e.target.value })
                            }
                            className="w-full px-4 py-3 border border-slate-200 rounded-xl text-black focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            placeholder="Ahmad Bin Ali"
                            required 
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Alamat E-mel <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) =>
                                setFormData({ ...formData, email: e.target.value })
                            }
                            className="w-full px-4 py-3 border border-slate-200 rounded-xl text-black focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            placeholder="ahmad@example.com"
                            required 
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Kata Laluan <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="password"
                            value={formData.password}
                            onChange={(e) =>
                                setFormData({ ...formData, password: e.target.value })
                            }
                            className="w-full px-4 py-3 border border-slate-200 text-black rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            placeholder="Minimum 8 aksara"
                            minLength={8}
                            required 
                        />
                    </div>

                    {/* Role */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Peranan <span className="text-red-500">*</span>
                        </label>
                        <select
                            value={formData.role}
                            onChange={(e) =>
                                setFormData({ ...formData, role: e.target.value as Role })
                            }
                            className="w-full px-4 py-3 text-black border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500"
                            required
                        >
                            {Object.values(Role).map((role) => (
                                <option key={role} value={role}>
                                    {role.replace('_', ' ').toUpperCase()}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 uppercase tracking-wide text-sm"
                    >
                        {loading ? "Menyimpan..." : "Tambah Pengguna"}
                    </button>
                </form>
            </div>
        </div>
    );
}
