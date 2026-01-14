import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json();

    const user = await prisma.user.findFirst({
      where: { 
        emailToken: token,
        emailTokenExpiry: { gt: new Date() },
        email_verified_at: null
      }
    });

    if (!user) {
      return NextResponse.json({ success: false, error: "Token tidak sah" }, { status: 400 });
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        email_verified_at: new Date(),
        emailToken: null,
        emailTokenExpiry: null
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
