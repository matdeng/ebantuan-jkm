// Extend NextAuth types to include custom properties
import { DefaultSession } from "next-auth"
import type { Role } from "./auth"

declare module "next-auth" {
    interface Session {
        user: {
            id: string
            role: Role
            email: string
            name: string
        } & DefaultSession["user"]
        error?: string
        emailToken?: string
    }

    interface User {
        id: string
        role: Role
        email: string
        name: string
        error?: string
        emailToken?: string
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        user?: {
            id: string
            role: Role
            email: string
            name: string
        }
        error?: string
        emailToken?: string
    }
}
