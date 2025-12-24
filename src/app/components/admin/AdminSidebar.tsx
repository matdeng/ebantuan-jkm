// components/admin/AdminSidebar.tsx
"use client";
import Link from "next/link";
import Image from "next/image";  // ← Add ini
import { usePathname } from "next/navigation";

const navItems = [
    { href: "/admin-dashboard", label: "Dashboard", icon: "📊" },
    { href: "/users", label: "Senarai Pengguna", icon: "👥" },
    { href: "/admin/applications", label: "Permohonan", icon: "📋" },
    { href: "/admin/settings", label: "Tetapan", icon: "⚙️" },
];

export default function AdminSidebar() {
    const pathname = usePathname();

    return (
        <div className="w-64 bg-white border-r shadow-sm">
            <div className="p-2 border-b flex flex-col items-center justify-center">
                {/* Centered Image - Perfect sidebar fit */}
                <Link href="/admin-dashboard" className="hover:opacity-90 transition-opacity">
                    <Image
                        src="/images/jata_negara.png"
                        alt="Jata Negara"
                        width={250}
                        height={250}
                        className="h-32 w-32 object-contain mx-auto"
                        priority
                    />
                </Link>
            </div>
            <nav className="mt-2">
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center px-6 py-4 text-sm font-medium border-l-4 transition-all duration-200 ${pathname === item.href
                                ? "bg-orange-50 border-orange-500 text-orange-700 shadow-sm"
                                : "border-transparent text-slate-600 hover:bg-gray-50 hover:text-slate-900"
                            }`}
                    >
                        <span className="mr-3 w-5 h-5 flex-shrink-0">{item.icon}</span>
                        {item.label}
                    </Link>
                ))}
            </nav>
        </div>
    );
}
