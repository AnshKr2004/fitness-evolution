import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { headers } from 'next/headers'
import jwt from "jsonwebtoken"

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })

  if (!token) {
    return NextResponse.redirect(new URL('/signin', request.url))
  }

  const path = request.nextUrl.pathname

  if (path.startsWith('/admin') && token.role !== 'ADMIN') {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  if (path.startsWith('/trainer') && token.role !== 'TRAINER') {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/trainer/:path*', '/dashboard/:path*'],
}

export async function authMiddleware(request: Request) {
  try {
    const headersList = await headers()
    const authorization = headersList.get("authorization")
    const token = authorization?.split(" ")[1]

    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET!)
    return decoded
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid token" },
      { status: 401 }
    )
  }
}