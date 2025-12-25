// components/user/Header.tsx
"use client";
import Link from "next/link";
import Image from "next/image";  // ← Add ini
import { useAuth } from '@/hooks/useAuth';  // ✅ Path alias

export default function Header() {
    const { user, logout } = useAuth();

    return (
        <header className="bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 text-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-6">
                    <Link href="/user-dashboard" className="flex items-center space-x-3 hover:opacity-90 transition-opacity">
                        <Image
                            src="/images/jata_negara.png"
                            alt="Jata Negara"
                            width={48}
                            height={48}
                            className="h-12 w-auto"
                            priority
                        />
                        <span className="text-2xl font-bold">eBantuan JKM 2.0</span>
                    </Link>
                    <div className="flex items-center space-x-4">
                        <div className="text-right">  {/* ← Stack vertically */}
                            <span className="text-sm font-medium block">
                                {user?.name}
                            </span>
                            <span className="text-xs text-white/80 font-normal">
                                {user?.role}
                            </span>
                        </div>
                        <button
                            onClick={logout}
                            className="bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 text-white text-sm px-4 py-2 rounded-lg font-semibold transition-all duration-200"
                        >
                            Log Keluar
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}
