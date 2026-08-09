import { NextResponse } from "next/server";
import { auth } from "./auth";

function isAdminHost(hostname: string) {
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

  if ((isAdminRoute || needsAdminRewrite) && !request.auth && !isLoginRoute) {
    const loginUrl = new URL("/admin/login", nextUrl.origin);
    loginUrl.searchParams.set(
      "callbackUrl",
      adminTargetUrl?.pathname ?? nextUrl.pathname + nextUrl.search,
    );
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
