import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import authConfig from "./auth.config";

const { auth } = NextAuth(authConfig);

function isAdminHost(hostname: string) {
  // Treat localhost (development) as the admin host to avoid external redirects.
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
  const adminTargetUrl = needsAdminRewrite ? nextUrl.clone() : null;

  if (adminTargetUrl) {
    adminTargetUrl.pathname =
      nextUrl.pathname === "/"
        ? "/admin/dashboard"
        : `/admin${nextUrl.pathname.startsWith("/") ? nextUrl.pathname : `/${nextUrl.pathname}`}`;
  }

  // Allow local development without a database seed or session.
  const isDev =
    process.env.NODE_ENV === "development" &&
    (hostname === "localhost" || hostname === "127.0.0.1");
  if (isDev) return NextResponse.next();

  if ((isAdminRoute || needsAdminRewrite) && !request.auth && !isLoginRoute) {
    const loginUrl = new URL("/admin/login", nextUrl.origin);
    const callbackPath = adminTargetUrl
      ? `${adminTargetUrl.pathname}${adminTargetUrl.search}`
      : `${nextUrl.pathname}${nextUrl.search}`;
    loginUrl.searchParams.set("callbackUrl", callbackPath);
    return NextResponse.redirect(loginUrl);
  }

  if (isLoginRoute && request.auth) {
    return NextResponse.redirect(new URL("/admin/dashboard", nextUrl.origin));
  }

  if (adminTargetUrl) return NextResponse.rewrite(adminTargetUrl);

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api).*)"],
};
