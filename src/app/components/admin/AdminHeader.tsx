// components/admin/AdminHeader.tsx
"use client";
import Link from "next/link";
// import { useSession, signOut } from "next-auth/react";
import { useAuth } from '@/hooks/useAuth';  // ✅ Path alias
import { useState } from "react";


export default function AdminHeader() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, loading, logout } = useAuth();

  if (loading) return <div>Loading...</div>;
//   if (!user) return <div>Please login</div>;

    // const { data: session } = useSession();

    console.log('JWT User:', user); 
    return (
        <header className="bg-white shadow-sm border-b px-6 py-4">
            <div className="flex items-center justify-between">
                {/* Logo */}
                <Link href="/admin/dashboard" className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center">
                        <span className="text-2xl font-bold text-white">A</span>
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-slate-900">Admin Panel</h1>
                        <span className="text-xs text-orange-600 font-semibold uppercase tracking-wider">
                            eBantuan JKM 2.0
                        </span>
                    </div>
                </Link>

                {/* Right side: Notifications + Profile */}
                <div className="flex items-center space-x-4">
                    {/* Notifications */}
                    {/* <button className="relative p-2 text-slate-500 hover:text-slate-900 hover:bg-gray-100 rounded-xl transition">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
                    </button> */}

                    {/* Profile dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-xl transition"
                        >
                            <div className="text-right hidden md:block">
                                <p className="font-semibold text-sm text-slate-900">
                                    {user?.name}
                                </p>
                                <p className="text-xs text-slate-500">PENTADBIR SYSTEM</p>
                            </div>
                            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center text-white font-bold text-lg">
                                {user?.name?.[0]?.toUpperCase()}
                            </div>
                        </button>


                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in slide-in-from-top-2 duration-200">
                                <Link href="/admin/profile" className="flex items-center px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 rounded-xl mx-1">
                                    <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    Profil
                                </Link>
                                <Link href="/admin/settings" className="flex items-center px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 rounded-xl mx-1">
                                    <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                    </svg>
                                    Tetapan
                                </Link>
                                <div className="border-t border-slate-100 my-1"></div>
                                <button
                                    onClick={logout}
                                    className="w-full flex items-center px-4 py-3 text-sm text-red-600 hover:bg-red-50 rounded-xl mx-1 transition"
                                >
                                    <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                    Log Keluar
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}