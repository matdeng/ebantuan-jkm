import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password, role } = await req.json();

    // Check existing user
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "E-mel sudah wujud. Sila guna e-mel lain." },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
    });

    return NextResponse.json(
      { 
        success: true, 
        user: { id: user.id, name: user.name, email: user.email, role: user.role }
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("CREATE USER ERROR:", error);
    return NextResponse.json(
      { error: "Ralat menyimpan pengguna." },
      { status: 500 }
    );
  }
}
