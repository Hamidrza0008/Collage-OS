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
  // Redirect to role-appropriate auth portal (/auth/faculty for faculty, /auth/student for student)
  if (isProtectedRoute && !isAuthenticated) {
    const isFacultyRoute = pathname === "/faculty" || pathname.startsWith("/faculty/");
    const targetAuth = isFacultyRoute ? "/auth/faculty" : "/auth/student";
    const authUrl = new URL(targetAuth, request.url);
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
