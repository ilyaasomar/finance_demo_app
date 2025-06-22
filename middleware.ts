import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath = path === "/login" || path === "/register";
  const token = request.cookies.get("token")?.value || "";

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/",
    "/banks/:path*",
    "/categories/:path*",
    "/transactions/:path*",
    "/internal_transfer/:path*",
    "/tasks/:path*",
    "/journal_entry/:path*",
    "/customers/:path*",
    "/suppliers/:path*",
    "/accounts/:path*",
    "/account_receivable/:path*",
    "/account_payable/:path*",
    "/reports/:path*",
    "/users/:path*",

    "/login",
    "/register",
  ],
};
