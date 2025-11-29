import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Middleware function to redirect root path to /store
export function middleware(request: NextRequest) {
  // Only redirect if the path is exactly "/"
  if (request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/store", request.url));
  }

  // Allow all other requests to pass through
  return NextResponse.next();
}

// Match all paths to check them, but only redirect root
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
