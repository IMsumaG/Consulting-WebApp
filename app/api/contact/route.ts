import { z } from "zod";
import prisma from "@/lib/prisma";
import { ApiValidationError, checkRateLimit, fail, getClientIp, ok, parseJson } from "@/lib/api";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(2),
  message: z.string().min(20),
});

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    const limit = checkRateLimit(`contact:${ip}`, 4, 60_000);
    if (!limit.allowed) return fail("Please wait before submitting again.", 429);
    const body = await parseJson(request, schema);
    const entry = await prisma.corporateRequest.create({
      data: {
        orgName: "General Contact",
        contactPerson: body.name,
        email: body.email,
        phone: "",
        trainingArea: body.subject,
        objectives: body.message,
      },
    });
    return ok({ entry }, 201);
  } catch (error) {
    if (error instanceof ApiValidationError) return fail(error.message, 400, error.details);
    return fail("Unable to submit contact form", 500);
  }
}
