// prisma/seeds/seedUsers.ts
import type { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

export async function seedUsers(prisma: PrismaClient) {
  const users = [
    {
      name: "Admin Sistem",
      email: "admin.system@example.com",
      role: "PENTADBIR_SYSTEM" as Role,
    },
    {
      name: "Pemohon Contoh",
      email: "pemohon@example.com",
      role: "PEMOHON" as Role,
    },
    {
      name: "Pembantu Tadbir",
      email: "pembantu.tadbir@example.com",
      role: "PEMBANTU_TADBIR" as Role,
    },
    {
      name: "PKM Daerah",
      email: "pkm.daerah@example.com",
      role: "PEGAWAI_KEBAJIKAN_MASYARAKAT_DAERAH" as Role,
    },
    {
      name: "Pegawai Penyiasat",
      email: "pegawai.penyiasat@example.com",
      role: "PEGAWAI_PENYIASAT" as Role,
    },
  ];

  for (const u of users) {
    await prisma.user.upsert({
      where: { email: u.email },
      update: {},
      create: {
        name: u.name,
        email: u.email,
        role: u.role,
        password: await bcrypt.hash("password", 10),
      },
    });
  }
}
