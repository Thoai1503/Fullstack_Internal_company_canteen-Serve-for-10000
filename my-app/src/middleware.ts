import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const role = req.cookies.get("role")?.value;

  console.log("Auth: " + token + " " + role);

  const url = req.nextUrl.pathname;
  if (role?.startsWith("admin") && !url.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  // Chặn vào admin nếu không phải admin
  if (url.startsWith("/admin")) {
    if (!token || role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  // Chặn vào user nếu chưa login
  if (url.startsWith("/profile")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/profile/:path*", "/"],
};
