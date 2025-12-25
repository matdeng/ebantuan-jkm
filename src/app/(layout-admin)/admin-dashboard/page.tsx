"use client";
import { useAuth } from '@/hooks/useAuth';

export default function AdminDashboard() {
  const { user, loading, logout } = useAuth();

  if (!user) return <div>Please login</div>;

  return (
    <div>
      <h1 className="text-3xl text-black font-bold mb-8">Selamat datang, {user.name}!</h1>
      {/* <h1 className="text-3xl text-black font-bold mb-8">Admin Dashboard</h1> */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-2xl shadow-sm border">
          <h3 className="text-lg text-black font-semibold mb-4">Jumlah Pengguna</h3>
          <p className="text-3xl font-bold text-blue-600"></p>
        </div>
        {/* More admin stats */}
      </div>
    </div>
  );
}
