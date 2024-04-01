import { NextResponse } from "next/server";

const protectedRoutes = [
  '/examples',
  '/subscribe',
  '/vscode',
  '/'
];

const authRoutes = [
  '/login'
];

export async function middleware(request) {
  const currentUser = request.cookies.get("session-cookie")?.value;

  if (protectedRoutes.includes(request.nextUrl.pathname) &&!currentUser) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (authRoutes.includes(request.nextUrl.pathname) && currentUser) {
    return NextResponse.redirect(new URL('/', request.url));
  }
}