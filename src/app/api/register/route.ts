import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password, role } = await req.json();

    // Validate role enum
    const validRoles = [
      "PEMOHON",
      "PENTADBIR_SYSTEM",
      "PEMBANTU_TADBIR",
      "PEGAWAI_KEBAJIKAN_MASYARAKAT_DAERAH",
      "PEGAWAI_PENYIASAT"
    ];

    if (!validRoles.includes(role)) {
      return NextResponse.json({ error: "Role tidak sah" }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return NextResponse.json({ error: "Emel sudah digunakan" }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: { 
        name, 
        email, 
        password: hashedPassword, 
        role 
      }
    });

    return NextResponse.json({ 
      user: { id: user.id, name: user.name, email: user.email, role: user.role }
    }, { status: 201 });

  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json({ error: "Ralat pendaftaran" }, { status: 500 });
  }
}
