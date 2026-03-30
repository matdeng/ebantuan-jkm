"use client";

interface User {
  id: string;
  name: string | null;
  email: string | null;
  role: string;
  created_at: Date;
}

interface Props {
  user: { name: string; role: string };
  totalUsers: number;
  users: User[];
}

export default function AdminDashboardClient({ user, totalUsers, users }: Props) {
  return (
    <div>
      <h1 className="text-3xl text-black font-bold mb-8">Selamat datang, {user.name}!</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-2xl shadow-sm border">
          <h3 className="text-lg text-black font-semibold mb-4">Jumlah Pengguna</h3>
          <p className="text-3xl font-bold text-blue-600">{totalUsers.toLocaleString()}</p>
        </div>
      </div>
      {/* User list table */}
    </div>
  );
}
