import { prisma } from "@/lib/prisma";
import UsersTable from "./UsersTable"; // client component (table)

export default async function UsersPage() {
  const users = await prisma.user.findMany({
    orderBy: { created_at: "desc" },
  });

  // Map ke shape yang table kamu guna
  const mappedUsers = users.map((u) => ({
    id: u.id,
    name: u.name,
    email: u.email,
    role: u.role,
    created: u.created_at.toISOString().slice(0, 10), // YYYY-MM-DD
  }));

  return (
    <div>
      <h1 className="text-3xl text-black font-bold mb-8">Senarai Pengguna</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <h3 className="text-sm font-semibold mb-2 text-slate-600">
            Jumlah Pengguna
          </h3>
          <p className="text-2xl font-bold text-blue-600">
            {mappedUsers.length}
          </p>
        </div>
      </div>

      <UsersTable initialUsers={mappedUsers} />
    </div>
  );
}
