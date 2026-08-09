import { z } from "zod";
import prisma from "@/lib/prisma";
import { ApiAuthError, ApiValidationError, checkRateLimit, fail, getClientIp, ok, parseJson, requireAdmin } from "@/lib/api";

const subscribeSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  interests: z.array(z.string().min(2)).default([]),
  consentGiven: z.literal(true),
});

const unsubscribeSchema = z.object({
  email: z.string().email(),
});

export async function GET() {
  try {
    await requireAdmin();
    const subscribers = await prisma.newsletterSub.findMany({ orderBy: { createdAt: "desc" } });
    return ok({ subscribers });
  } catch (error) {
    if (error instanceof ApiAuthError) return fail(error.message, 401);
    return fail("Unable to load newsletter subscribers", 500);
  }
}

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    const limit = checkRateLimit(`newsletter:${ip}`, 5, 60_000);
    if (!limit.allowed) return fail("Please wait before trying again.", 429);
    const body = await parseJson(request, subscribeSchema);
    const subscriber = await prisma.newsletterSub.upsert({
      where: { email: body.email },
      update: {
        name: body.name,
        interests: body.interests,
        consentGiven: true,
        unsubscribed: false,
      },
      create: {
        name: body.name,
        email: body.email,
        interests: body.interests,
        consentGiven: true,
        unsubscribed: false,
      },
    });
    return ok({ subscriber }, 201);
  } catch (error) {
    if (error instanceof ApiValidationError) return fail(error.message, 400, error.details);
    return fail("Unable to subscribe", 500);
  }
}

export async function PATCH(request: Request) {
  try {
    await requireAdmin();
    const body = await parseJson(request, unsubscribeSchema);
    const subscriber = await prisma.newsletterSub.update({
      where: { email: body.email },
      data: { unsubscribed: true },
    });
    return ok({ subscriber });
  } catch (error) {
    if (error instanceof ApiAuthError) return fail(error.message, 401);
    if (error instanceof ApiValidationError) return fail(error.message, 400, error.details);
    return fail("Unable to unsubscribe", 500);
  }
}
