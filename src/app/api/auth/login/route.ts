// /api/login/auth.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import nodemailer from "nodemailer";
import type { 
  LoginCredentials, 
  LoginResponse, 
  ApiError,
  Role 
} from '@/types/auth';
import type { User } from '@prisma/client';

const JWT_SECRET = process.env.JWT_SECRET || "your-super-secret-key-change-this";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "localhost",
  port: Number(process.env.SMTP_PORT) || 1025,
  secure: false,
  auth: {
    user: process.env.SMTP_USER || "",
    pass: process.env.SMTP_PASS || "",
  },
});

export async function POST(req: NextRequest) {
  try {
    const body: LoginCredentials = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Sila masukkan emel dan kata laluan" },
        { status: 400 }
      );
    }

    const user: User = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json<ApiError>(
        { error: "Emel tidak wujud. Sila daftar akaun baharu." },
        { status: 401 }
      );
    }

    if (!user.email_verified_at) {
    //   const newToken = uuidv4();

    //   await prisma.user.update({
    //     where: { id: user.id },
    //     data: {
    //       emailToken: newToken,
    //       emailTokenExpiry: new Date(Date.now() + 60 * 60 * 1000) // 1 jam
    //     }
    //   });

    //   // Kirim email verification BARU
    //   await transporter.sendMail({
    //     from: `"eBantuan JKM" <${process.env.FROM_EMAIL || 'noreply@ebantuanjkm.test'}>`,
    //     to: user.email,
    //     subject: "Sahkan Pendaftaran eBantuan JKM - Token Baru",
    //     html: `
    //   <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; padding: 20px;">
    //     <h2 style="color: #f97316;">${user.name}, sahkan emel anda!</h2>
    //     <p>Pendaftaran anda masih belum disahkan. Sila klik pautan di bawah:</p>
    //     <a href="${process.env.AUTH_URL || 'http://localhost:3001'}/auth/check-email?token=${newToken}" 
    //        style="background: #f97316; color: white; padding: 16px 32px; text-decoration: none; border-radius: 12px; font-weight: bold; display: inline-block;">
    //       Sahkan Emel Saya
    //     </a>
    //     <p style="margin-top: 24px; font-size: 14px; color: #666;">
    //       Pautan ini tamat tempoh dalam <strong>1 jam</strong>.
    //     </p>
    //     <hr style="margin: 32px 0;">
    //     <p style="color: #666; font-size: 12px;">
    //       eBantuan JKM | Jabatan Kebajikan Masyarakat<br>
    //       Tel: 03-5544 6773
    //     </p>
    //   </div>
    // `
    //   });

      return NextResponse.json({
        emailToken: user.emailToken,
        error: "Sila sahkan emel terlebih dahulu sebelum log masuk",
      } as ApiError, { status: 401 });  // Tambah type
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return NextResponse.json<ApiError>(
        { error: "Kata laluan salah." },
        { status: 401 }
      );
    }

    // ✅ SIMPLE JWT - 24 jam expiry
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    return NextResponse.json<LoginResponse>({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role as Role  // Type assertion
      }
    });

  } catch (error) {
    return NextResponse.json<ApiError>(
      { error: "Ralat sistem. Sila cuba lagi." },
      { status: 500 }
    );
  }
}
