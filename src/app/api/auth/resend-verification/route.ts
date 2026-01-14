import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import nodemailer from "nodemailer";
import { v4 as uuidv4 } from "uuid";

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
    const { emailToken } = await req.json();

    const user = await prisma.user.findUnique({ where: { emailToken } });

    if (!user || user.email_verified_at) {
      return NextResponse.json({
        error: "Akaun tidak wujud atau sudah disahkan"
      }, { status: 400 });
    }

    const newToken = uuidv4();  // Generate new token
    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailToken: newToken,
        emailTokenExpiry: new Date(Date.now() + 60 * 60 * 1000)
      }
    });

    // Send email
    await transporter.sendMail({
      from: `"eBantuan JKM" <${process.env.FROM_EMAIL || 'noreply@ebantuanjkm.test'}>`,
      to: user.email,
      subject: "Emel Pengesahan Baru - eBantuan JKM",
      html: `
      <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; padding: 20px;">
        <h2 style="color: #f97316;">Emel Pengesahan Baru ${user.name}!</h2>
        <p>Pautan pengesahan sebelumnya telah tamat tempoh.</p>
        <p>Sila sahkan pendaftaran anda dengan klik pautan baru di bawah:</p>
        
        <a href="${process.env.AUTH_URL || 'http://localhost:3001'}/auth/check-email?token=${newToken}" 
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
      </div>`
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Gagal hantar emel" }, { status: 500 });
  }
}
