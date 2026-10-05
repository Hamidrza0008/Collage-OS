import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const sessionCookie = request.cookies.get("college_os_session")?.value;
  const isAuthenticated = sessionCookie === "true";

  // Root entry experience: redirect directly to Student Auth
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/auth/student", request.url));
  }

  // Protected route prefixes that strictly require an authenticated session
  const protectedPrefixes = [
    "/student",
    "/faculty",
    "/dashboard",
    "/admin",
    "/hod",
    "/principal",
    "/vp",
  ];

  const isProtectedRoute = protectedPrefixes.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );

  // If attempting to access a protected route without an active session:
  // Immediately redirect to /auth/student before any page HTML is rendered.
  if (isProtectedRoute && !isAuthenticated) {
    const authUrl = new URL("/auth/student", request.url);
    // Optionally preserve the attempted destination for post-login redirect
    authUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(authUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match root, protected areas, and any top-level routes
     * Exclude static files, public assets, and Next.js internals
     */
    "/",
    "/student/:path*",
    "/faculty/:path*",
    "/dashboard/:path*",
    "/admin/:path*",
    "/hod/:path*",
    "/principal/:path*",
    "/vp/:path*",
  ],
};
