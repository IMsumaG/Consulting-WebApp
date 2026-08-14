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

        // In development, when `DATABASE_URL` is not set, avoid
        // initializing Prisma (which fails) and allow the default
        // seeded admin credentials to sign in without a DB seed.
        if (
          process.env.NODE_ENV !== "production" &&
          (!process.env.DATABASE_URL || process.env.DATABASE_URL.trim() === "")
        ) {
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
        }

        const admin = await prisma.adminUser.findUnique({
          where: { email: parsed.data.email.toLowerCase() },
        });

        if (!admin) {
          return null;
        }

        const isValid = await bcrypt.compare(parsed.data.password, admin.passwordHash);
        if (!isValid) {
          return null;
        }

        return {
          id: admin.id,
          name: admin.name,
          email: admin.email,
          role: admin.role as Role,
        };
      },
    }),
  ],
});
