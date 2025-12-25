// middleware.ts
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET!);
        console.log(jwt);

    return NextResponse.next();

  } catch {
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

export const config = {
  matcher: ['/admin-dashboard/:path*', '/user-dashboard/:path*']
};
