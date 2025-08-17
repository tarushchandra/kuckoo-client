import { NextRequest, NextResponse } from "next/server";

const PROTECTED_ROUTES = [
  "/home",
  "/search",
  "/messages",
  "/notifications",
  "/bookmarks",
  "/profile",
];
const PUBLIC_ROUTES = ["/", "/sign-in", "/sign-up"];

export const ACCESS_TOKEN_COOKIE = "access_token";
export const REFRESH_TOKEN_COOKIE = "refresh_token";

export class AuthMiddleware {
  private request: NextRequest;
  private pathname: string;
  private accessToken: string | undefined;
  private refreshToken: string | undefined;

  constructor(request: NextRequest) {
    this.request = request;
    this.pathname = request.nextUrl.pathname;
    this.accessToken = request.cookies.get(ACCESS_TOKEN_COOKIE)?.value;
    this.refreshToken = request.cookies.get(REFRESH_TOKEN_COOKIE)?.value;
  }

  private isProtectedRoute(pathname: string): boolean {
    return PROTECTED_ROUTES.some((route) => pathname.startsWith(route));
  }

  private isPublicRoute(pathname: string): boolean {
    return PUBLIC_ROUTES.includes(pathname);
  }

  private redirectTo(path: string): NextResponse {
    return NextResponse.redirect(new URL(path, this.request.url));
  }

  // This method initializes the auth middleware logic
  public async initialize(): Promise<NextResponse> {
    // When no tokens are present
    if (!this.accessToken && !this.refreshToken)
      return this.isProtectedRoute(this.pathname)
        ? this.redirectTo("/sign-in")
        : NextResponse.next();

    // When either of them (access token or refresh token) is present
    return this.isPublicRoute(this.pathname)
      ? this.redirectTo("/home")
      : NextResponse.next();
  }
}
