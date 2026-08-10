import { PrismaClient } from "@prisma/client";

declare global {
  // Use a global `prisma` to avoid creating new PrismaClient instances
  // during hot reloads in development. This is a deliberate pattern
  // and safe here because the global is only used to cache the client.
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

const prisma =
  global.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}

export default prisma;
