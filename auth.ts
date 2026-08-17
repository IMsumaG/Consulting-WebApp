import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import type { Role } from "@prisma/client";
import { z } from "zod";
import prisma from "./lib/prisma";
import authConfig from "./auth.config";

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      name: "Admin Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(rawCredentials) {
        const parsed = credentialsSchema.safeParse(rawCredentials);
        if (!parsed.success) {
          return null;
        }

        const isDev = process.env.NODE_ENV !== "production";

        // Dev bypass helper — always available in development so you can
        // log in even when the remote database is empty or unreachable.
        const devBypass = () => {
          if (
            parsed.data.email.toLowerCase() === "admin@merxano.co.tz" &&
            parsed.data.password === "ChangeMe123!"
          ) {
            return {
              id: "local-super-admin",
              name: "Merxano Admin",
              email: parsed.data.email.toLowerCase(),
              role: "SUPER_ADMIN" as Role,
            };
          }
          return null;
        };

        // If DATABASE_URL is empty, skip Prisma entirely and use dev bypass.
        if (!process.env.DATABASE_URL || process.env.DATABASE_URL.trim() === "") {
          return isDev ? devBypass() : null;
        }

        // Try to authenticate against the real database. If the DB is
        // unreachable (e.g. Neon auto-suspended in dev), fall back to
        // the dev bypass so local development never gets locked out.
        try {
          const admin = await prisma.adminUser.findUnique({
            where: { email: parsed.data.email.toLowerCase() },
          });

          if (!admin) {
            // No DB record found — allow dev bypass as fallback in dev.
            return isDev ? devBypass() : null;
          }

          const isValid = await bcrypt.compare(parsed.data.password, admin!.passwordHash);
          if (!isValid) return null;

          return {
            id: admin!.id,
            name: admin!.name,
            email: admin!.email,
            role: admin!.role as Role,
          };
        } catch {
          // DB unreachable (e.g. Neon suspended, no network). In dev,
          // fall back to hardcoded credentials so work can continue.
          if (isDev) {
            console.warn("[auth] DB unreachable — using dev credential bypass.");
            return devBypass();
          }
          return null;
        }
      },
    }),
  ],
});
