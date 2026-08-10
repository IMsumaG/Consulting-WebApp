import { NextResponse } from "next/server";
import { auth } from "./auth";

function isAdminHost(hostname: string) {
  // Treat localhost (development) as admin host to avoid external redirects
  if (hostname === "localhost" || hostname === "127.0.0.1") return true;
  return hostname.startsWith("admin.");
}

export default auth((request) => {
  const { nextUrl } = request;
  const hostname = nextUrl.hostname;
  const isAdminDomain = isAdminHost(hostname);
  const isAdminRoute = nextUrl.pathname.startsWith("/admin");
  const isLoginRoute = nextUrl.pathname === "/admin/login";
  const needsAdminRewrite = isAdminDomain && !isAdminRoute;
  const adminTargetUrl = needsAdminRewrite
    ? nextUrl.clone()
    : null;

  if (adminTargetUrl) {
    adminTargetUrl.pathname =
      nextUrl.pathname === "/"
        ? "/admin/dashboard"
        : `/admin${nextUrl.pathname.startsWith("/") ? nextUrl.pathname : `/${nextUrl.pathname}`}`;
  }

  // Skip auth checks in development when running on localhost
  const isDev = process.env.NODE_ENV === "development" && (hostname === "localhost" || hostname === "127.0.0.1");
  if (isDev) {
    // Allow free access to admin routes during local development
    return NextResponse.next();
  }

  // Existing auth guard – redirect to login if not authenticated
  if ((isAdminRoute || needsAdminRewrite) && !request.auth && !isLoginRoute) {
    const baseOrigin = (hostname === "localhost" || hostname === "127.0.0.1") ? "http://localhost:3000" : nextUrl.origin;
    const loginUrl = new URL("/admin/login", baseOrigin);
    // Use a path-only callback URL to keep redirects same-origin and
    // avoid cross-origin RSC payload fetches in development.
    const callbackPath = adminTargetUrl
      ? `${adminTargetUrl.pathname}${adminTargetUrl.search}`
      : `${nextUrl.pathname}${nextUrl.search}`;
    loginUrl.searchParams.set("callbackUrl", encodeURIComponent(callbackPath));
    return NextResponse.redirect(loginUrl);
  }

  if (isLoginRoute && request.auth) {
    return NextResponse.redirect(new URL("/admin/dashboard", nextUrl.origin));
  }

  if (adminTargetUrl) {
    return NextResponse.rewrite(adminTargetUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api).*)"],
};
