import { NextRequest, NextResponse } from "next/server";
import { ZodError, type ZodTypeAny } from "zod";
import { auth } from "@/auth";

type RateState = {
  count: number;
  resetAt: number;
};

const rateState = new Map<string, RateState>();

export function ok<T>(data: T, status = 200) {
  return NextResponse.json({ success: true, data }, { status });
}

export function fail(message: string, status = 400, details?: unknown) {
  return NextResponse.json(
    { success: false, error: message, details },
    { status },
  );
}

export async function parseJson<T extends ZodTypeAny>(request: Request, schema: T) {
  try {
    const body = await request.json();
    return schema.parse(body) as ReturnType<T["parse"]>;
  } catch (error) {
    if (error instanceof ZodError) {
      throw new ApiValidationError("Validation failed", error.flatten());
    }
    throw new ApiValidationError("Invalid JSON payload");
  }
}

export async function requireAdmin() {
  const session = await auth();
  if (!session?.user) {
    throw new ApiAuthError("Unauthorized");
  }
  return session;
}

export function getClientIp(request: Request | NextRequest) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() ?? "unknown";
  }
  return request.headers.get("x-real-ip") ?? "unknown";
}

export function checkRateLimit(key: string, limit = 10, windowMs = 60_000) {
  const now = Date.now();
  const current = rateState.get(key);

  if (!current || current.resetAt <= now) {
    rateState.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1 };
  }

  if (current.count >= limit) {
    return { allowed: false, remaining: 0, resetAt: current.resetAt };
  }

  current.count += 1;
  rateState.set(key, current);
  return { allowed: true, remaining: limit - current.count };
}

export class ApiValidationError extends Error {
  details?: unknown;

  constructor(message: string, details?: unknown) {
    super(message);
    this.details = details;
  }
}

export class ApiAuthError extends Error {}
