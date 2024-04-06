import { NextResponse } from "next/server";

const protectedRoutes = [
  '/subscribe',
  '/vscode',
  '/'
];

const authRoutes = [
  '/login'
];

export async function middleware(request) {
  const currentUser = request.cookies.get("session-cookie")?.value;

  if (protectedRoutes.includes(request.nextUrl.pathname) && !currentUser) {
    if (request.nextUrl.pathname === "/vscode") {
      const { searchParams } = new URL(request.url);
      const sessionId = searchParams.get("sessionId");
      const type = searchParams.get("type");
      const folder = searchParams.get("folder");
      return NextResponse.redirect(new URL(`/login?sessionId=${sessionId}&type=${type}&folder=${folder}`, request.url));
    }
    else
      return NextResponse.redirect(new URL('/login', request.url));
  }

  if (authRoutes.includes(request.nextUrl.pathname) && currentUser) {
    return NextResponse.redirect(new URL('/', request.url));
  }
}