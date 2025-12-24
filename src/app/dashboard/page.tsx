"use client";  // ADD THIS
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";  // GUNA INI bukannya redirect
import { signOut } from "next-auth/react";
import { useEffect } from "react";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }

    if (status === "authenticated") {
      if (session?.user?.role === "PENTADBIR_SYSTEM") {
        router.push("/admin-dashboard");  // Unik path!
      } else {
        router.push("/user-dashboard");        // User path
      }
    }
  }, [status, session, router]);

  const handleLogout = () => {
    signOut({ callbackUrl: "/login" });
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-3xl mb-4 font-bold text-gray-900">eBantuan JKM Dashboard</h1>
      <div className="bg-white p-6 rounded-xl shadow-sm max-w-2xl mx-auto">
        <p className="text-xl mb-4">
          Selamat datang, <span className="font-semibold text-blue-600">{session.user?.name}</span>
        </p>
        <p className="text-lg mb-6">
          Peranan: <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full font-medium">{session.user?.role}</span>
        </p>
        
        {session.user?.role === "PENTADBIR_SYSTEM" && (
          <div className="bg-green-50 border border-green-200 p-6 rounded-xl mb-6">
            <h3 className="text-2xl font-bold text-green-800 mb-2">Pentadbir System Panel</h3>
            <p className="text-green-700">Akaun pentadbir - akses penuh sistem</p>
          </div>
        )}
        
        <div className="flex space-x-4">
          <a href="/profile" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200">
            Profil
          </a>
          
          {/* FIXED: No CSRF issues */}
          <button 
            onClick={handleLogout}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200"
          >
            Log Keluar
          </button>
        </div>
      </div>
    </div>
  );
}
