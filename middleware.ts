import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export default async function middleware(req: NextRequest) {
  const token = await getToken({ 
    req, 
    secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET 
  })
  
  const { nextUrl } = req
  const isLoggedIn = !!token
  const userRole = token?.role as string | undefined

  const pathname = nextUrl.pathname

  // 1. PROTECTED ROUTES (Dashboard - semua role)
  if (pathname.startsWith("/dashboard") && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", nextUrl))
  }

  // 2. LOGIN PAGE - Redirect kalau dah login
  if (pathname === "/login" && isLoggedIn) {
    return NextResponse.redirect(new URL("/dashboard", nextUrl))
  }

  // 3. REGISTER PAGE - Redirect kalau dah login
  if (pathname === "/register" && isLoggedIn) {
    return NextResponse.redirect(new URL("/dashboard", nextUrl))
  }

  // 4. ADMIN ROUTES - Pentadbir System SAHAJA
  if (pathname.startsWith("/admin") && (!isLoggedIn || userRole !== "PENTADBIR_SYSTEM")) {
    return NextResponse.redirect(new URL("/unauthorized", nextUrl))
  }

  // 5. Role-specific dashboards
  if (pathname.startsWith("/pemohon") && (!isLoggedIn || !["PEMOHON"].includes(userRole!))) {
    return NextResponse.redirect(new URL("/unauthorized", nextUrl))
  }

  if (pathname.startsWith("/penyiasat") && (!isLoggedIn || !["PEGAWAI_PENYIASAT"].includes(userRole!))) {
    return NextResponse.redirect(new URL("/unauthorized", nextUrl))
  }

  // Allow access
  return NextResponse.next()
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/pemohon/:path*",
    "/penyiasat/:path*",
    "/login",
    "/register"
  ]
}
