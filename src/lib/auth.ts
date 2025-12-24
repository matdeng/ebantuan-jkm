// src/lib/auth.ts
import NextAuth from "next-auth"
// import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./prisma"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"

export const { handlers, auth, signIn, signOut } = NextAuth({
  // adapter: PrismaAdapter(prisma),  // ✅ DATABASE SESSION
  // session: { strategy: "database" },  // ✅ PENTING
  session: { strategy: "jwt" },  // ✅ JWT - NO DB SESSION
  experimental: {
    skipCsrf: true  // ← Auth.js v5 syntax
  }, providers: [
    Credentials({
      credentials: {
        email: { label: "Email" },
        password: { label: "Password" }
      },

      async authorize(credentials) {
        console.log("AUTH DEBUG:", credentials); // DEBUG

        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string }
        });

        console.log("FOUND USER:", user ? user.email : "NO USER"); // DEBUG

        if (!user || !user.password) return null;

        console.log("RAW PASSWORD FROM DB:", user.password); // DEBUG
        console.log("INPUT PASSWORD:", credentials.password); // DEBUG

        const isValidPassword = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        console.log("BCRYPT RESULT:", isValidPassword); // DEBUG

        if (!isValidPassword) return null;

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
      }

    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        session.user.role = token.role as string
      }
      return session
    }
  },
  pages: {
    signIn: "/login"
  }
})
