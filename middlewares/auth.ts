import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { verifyRefreshToken } from "@/services/user";

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

  private redirectWithTokenCleanup(path: string): NextResponse {
    const response = this.redirectTo(path);
    response.cookies.delete(ACCESS_TOKEN_COOKIE);
    response.cookies.delete(REFRESH_TOKEN_COOKIE);
    return response;
  }

  private async verifyAccessToken(accessToken: string) {
    try {
      await jwtVerify(
        accessToken,
        new TextEncoder().encode(process.env.JWT_ACCESS_SECRET!)
      );
      return true;
    } catch (error) {
      return false;
    }
  }

  private async verifyRefreshToken(refreshToken: string) {
    try {
      return await verifyRefreshToken(refreshToken);
    } catch (error) {
      throw error;
    }
  }

  // This method parses the Set-Cookie header to extract access and refresh tokens
  private parseSetCookieHeaders(header: string) {
    const result: Record<string, string> = {};

    // Split on commas, but only if not inside a quoted string (to handle edge cases)
    const cookies = header.split(/,(?=\s*\w+=)/);

    for (const cookie of cookies) {
      const parts = cookie.trim().split(";");
      const [keyValue] = parts;
      const [key, value] = keyValue?.split("=") ?? [];

      if (key && value) {
        result[key.trim()] = value.trim();
      }
    }
    return {
      accessToken: result[ACCESS_TOKEN_COOKIE],
      refreshToken: result[REFRESH_TOKEN_COOKIE],
    };
  }

  // This method creates a new request with the attached cookies (new access and refresh tokens)
  private createNewRequestWithAttachedCookies(
    originalRequest: NextRequest,
    tokens: { accessToken: string; refreshToken: string }
  ): NextRequest {
    console.log("🔄 Creating modified request with tokens");

    // Get existing cookies and parse them
    const existingCookieHeader = originalRequest.headers.get("cookie") || "";
    const modifiedCookies = this.updateCookieHeader(
      existingCookieHeader,
      tokens
    );

    // Clone the original request headers
    const modifiedHeaders = new Headers(originalRequest.headers);

    // Set the modified cookie header
    modifiedHeaders.set("cookie", modifiedCookies);

    console.log("🍪 Modified cookie header:", modifiedCookies);

    // Create a new request object with modified headers
    return new Request(originalRequest.url, {
      method: originalRequest.method,
      headers: modifiedHeaders,
      body: originalRequest.body,
    }) as NextRequest;
  }

  // This method updates the cookie header with new access and refresh tokens
  private updateCookieHeader(
    existingCookieHeader: string,
    newTokens: { accessToken: string; refreshToken: string }
  ): string {
    console.log("🍪 Updating cookie header with new tokens");

    // Parse existing cookies into a Map
    const cookieMap = new Map<string, string>();

    if (existingCookieHeader) {
      existingCookieHeader.split(";").forEach((cookie) => {
        const trimmedCookie = cookie.trim();
        const equalIndex = trimmedCookie.indexOf("=");

        if (equalIndex > 0) {
          const name = trimmedCookie.substring(0, equalIndex);
          const value = trimmedCookie.substring(equalIndex + 1);
          cookieMap.set(name, value);
        }
      });
    }

    // Update/add the new tokens (using your cookie names)
    cookieMap.set(ACCESS_TOKEN_COOKIE, newTokens.accessToken);
    cookieMap.set(REFRESH_TOKEN_COOKIE, newTokens.refreshToken);

    // Convert back to cookie header string
    return Array.from(cookieMap.entries())
      .map(([name, value]) => `${name}=${value}`)
      .join("; ");
  }

  // This method initializes the middleware logic
  public async initialize(): Promise<NextResponse> {
    // When no tokens are present
    if (!this.accessToken && !this.refreshToken)
      return this.isProtectedRoute(this.pathname)
        ? this.redirectTo("/sign-in")
        : NextResponse.next();

    // When access token is not present but refresh token is present
    if (!this.accessToken) {
      const { isRefreshTokenValid, setCookieHeader } =
        await this.verifyRefreshToken(this.refreshToken!);
      if (!isRefreshTokenValid)
        return this.redirectWithTokenCleanup("/sign-in");

      // When refresh token is valid, get the new access and refresh tokens
      const tokens = this.parseSetCookieHeaders(setCookieHeader);

      // attach the new tokens to the request. Now, this request will be forwarded to the next handler (server component)
      const modifiedRequest = this.createNewRequestWithAttachedCookies(
        this.request,
        tokens
      );

      // If the current route is public, redirect to home, otherwise continue with the request
      /* Note: The modified request now exists in this middleware execution context.
          Even though we returned early, the modified request context is still available for the "/home" route that gets rendered.
       */
      if (this.isPublicRoute(this.pathname)) {
        const nextResponse = this.redirectTo("/home");
        nextResponse.headers.set("Set-Cookie", setCookieHeader);
        return nextResponse;
      }

      // If the current route is protected, continue with the request
      // Note: The modified request will have the new access and refresh tokens in the cookies
      const nextResponse = NextResponse.next({ request: modifiedRequest });
      nextResponse.headers.set("Set-Cookie", setCookieHeader);
      return nextResponse;
    }

    // When access token is present
    const isTokenValid = await this.verifyAccessToken(this.accessToken);
    // When access token is not valid
    if (!isTokenValid) return this.redirectWithTokenCleanup("/sign-in");
    // When access token is valid
    return this.isPublicRoute(this.pathname)
      ? this.redirectTo("/home")
      : NextResponse.next();
  }
}
