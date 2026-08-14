import type { NextAuthConfig } from "next-auth";
import type { Role } from "@prisma/client";

/**
 * Authentication settings that are safe to load in the request proxy.
 * Keep database access and password verification in auth.ts so they do not
 * become part of the deployment's route-guard bundle.
 */
const authConfig = {
  secret:
    process.env.AUTH_SECRET ||
    process.env.NEXTAUTH_SECRET ||
    "fallback-secret-for-development-only-123456",
  session: { strategy: "jwt" },
  pages: {
    signIn: "/admin/login",
  },
  providers: [],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = ((user as { role?: Role }).role ?? "ADMIN") as Role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = ((token.role as Role | undefined) ?? "ADMIN") as Role;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;

export default authConfig;
