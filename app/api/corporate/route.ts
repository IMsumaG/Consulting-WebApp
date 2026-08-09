import { z } from "zod";
import prisma from "@/lib/prisma";
import { ApiAuthError, ApiValidationError, checkRateLimit, fail, getClientIp, ok, parseJson, requireAdmin } from "@/lib/api";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(6).optional().or(z.literal("")),
  subject: z.string().min(3),
  message: z.string().min(20),
});

export async function GET() {
  try {
    await requireAdmin();
    const requests = await prisma.corporateRequest.findMany({ orderBy: { createdAt: "desc" } });
    return ok({ requests });
  } catch (error) {
    if (error instanceof ApiAuthError) return fail(error.message, 401);
    return fail("Unable to load corporate requests", 500);
  }
}

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    const limit = checkRateLimit(`corporate:${ip}`, 4, 60_000);
    if (!limit.allowed) return fail("Please wait before submitting again.", 429);
    const body = await parseJson(request, schema);
    const requestRow = await prisma.corporateRequest.create({
      data: {
        orgName: body.subject,
        contactPerson: body.name,
        email: body.email,
        phone: body.phone || "Not provided",
        trainingArea: body.subject,
        participants: null,
        preferredDates: null,
        location: null,
        deliveryMode: "HYBRID",
        objectives: body.message,
        customization: null,
      },
    });
    return ok({ request: requestRow }, 201);
  } catch (error) {
    if (error instanceof ApiValidationError) return fail(error.message, 400, error.details);
    return fail("Unable to submit corporate request", 500);
  }
}
