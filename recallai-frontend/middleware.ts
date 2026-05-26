import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET, // 🔥 REQUIRED IN PRODUCTION
  });

  const { pathname } = req.nextUrl;

  const publicRoutes = ["/login", "/register"];

  const isPublicRoute = publicRoutes.includes(pathname);

  console.log("PATH:", pathname, "TOKEN:", token); // 🧠 debug (remove later)

  // NOT logged in → block private routes
  if (!token && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Logged in → block login/register
  if (token && isPublicRoute) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}