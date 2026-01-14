import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import nodeMailer from "nodemailer";
import { v4 as uuidv4 } from "uuid";

const transporter = nodeMailer.createTransport({
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
    const token = uuidv4();
    const emailTokenExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 jam

    // CREATE UNVERIFIED USER
    const user = await prisma.user.create({
      data: {
        name, email, password: hashedPassword, role, emailToken: token, emailTokenExpiry
      }
    });

    // KIRIM VERIFICATION EMAIL (NEW)
    await transporter.sendMail({
      from: `"eBantuan JKM" <${process.env.FROM_EMAIL || 'noreply@ebantuanjkm.test'}>`,
      to: email,
      subject: "Sahkan Pendaftaran eBantuan JKM",
      html: `
        <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #f97316;">Selamat Datang ${name}!</h2>
          <p>Sila sahkan pendaftaran anda dengan klik pautan di bawah:</p>
          <a href="${process.env.AUTH_URL || 'http://localhost:3001'}/auth/check-email?token=${token}" 
             style="background: #f97316; color: white; padding: 16px 32px; text-decoration: none; border-radius: 12px; font-weight: bold; display: inline-block;">
            Sahkan Emel Saya
          </a>
          <p style="margin-top: 24px; font-size: 14px; color: #666;">
            Pautan ini tamat tempoh dalam <strong>1 jam</strong>.
          </p>
          <hr style="margin: 32px 0;">
          <p style="color: #666; font-size: 12px;">
            eBantuan JKM | Jabatan Kebajikan Masyarakat<br>
            Tel: 03-5544 6773
          </p>
        </div>
      `
    });

    return NextResponse.json({
      success: true,
      message: "Pendaftaran berjaya! Sila sahkan emel.",
      // redirect: "auth/check-email",  // Frontend akan auto redirect sini
      user: { id: user.id, name: user.name, email: user.email, role: user.role }
    }, { status: 201 });

  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json({ error: "Ralat pendaftaran" }, { status: 500 });
  }
}
