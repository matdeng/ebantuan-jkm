// ./src/app/(layout-admin)/admin-dashboard/page.tsx (Server Component - NO "use client")
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import AdminDashboardClient from "./AdminDashboardClient";

export default async function AdminDashboardPage() {
  const session = await auth();  // ✅ Server-side session
  const user = session?.user;

  console.log(user);

  if (!user || user.role !== "PENTADBIR_SYSTEM") {
    return <div>Sila log masuk sebagai pentadbir</div>;
  }

  // ✅ Server-side Prisma query
  const users = await prisma.user.findMany({
    orderBy: { created_at: "asc" },
    select: { id: true, name: true, email: true, role: true, created_at: true }
  });
  const totalUsers = users.length;

  return (
    <AdminDashboardClient 
      user={user}
      totalUsers={totalUsers}
      users={users}
    />
  );
}
