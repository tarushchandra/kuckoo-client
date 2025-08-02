import { NextRequest, NextResponse } from "next/server";
import { AuthMiddleware } from "./middlewares/auth";

export async function middleware(request: NextRequest) {
  const authMiddleware = new AuthMiddleware(request);
  return await authMiddleware.initialize();
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
};
