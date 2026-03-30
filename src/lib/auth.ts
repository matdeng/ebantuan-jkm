// src/lib/auth.ts
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import type { Role } from "@/types/auth"

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,

  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return {
            id: "",
            email: "",
            name: "",
            role: "PEMOHON" as Role,
            error: "Sila masukkan emel dan kata laluan",
          }
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        })

        if (!user || !user.email || !user.name || !user.password) {
          return {
            id: "",
            email: "",
            name: "",
            role: "PEMOHON" as Role,
            error: "Emel tidak wujud. Sila daftar akaun baharu.",
          }
        }

        if (!user.email_verified_at) {
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role as Role,
            error: "EMAIL_NOT_VERIFIED",
            emailToken: user.emailToken || undefined,
          }
        }

        const isValidPassword = await bcrypt.compare(
          credentials.password as string,
          user.password
        )

        if (!isValidPassword) {
          return {
            id: "",
            email: "",
            name: "",
            role: "PEMOHON" as Role,
            error: "Kata laluan salah.",
          }
        }

        // ✅ SUCCESS (macam API lama)
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role as Role,
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user

        // simpan error dalam token
        if (user.error) {
          token.error = user.error
          token.emailToken = user.emailToken
        }
      }
      return token
    },

    async session({ session, token }) {
      if (token.user) {
        session.user = token.user as any
      }

      if (token.error) {
        session.error = token.error as any
        session.emailToken = token.emailToken as any
      }

      return session
    },
  },

  pages: {
    error: "/auth/login",
  },
})
