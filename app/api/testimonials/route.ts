import { z } from "zod";
import prisma from "@/lib/prisma";
import { ApiAuthError, ApiValidationError, checkRateLimit, fail, getClientIp, ok, parseJson, requireAdmin } from "@/lib/api";

const createSchema = z.object({
  authorName: z.string().min(2),
  role: z.string().optional().nullable(),
  company: z.string().optional().nullable(),
  avatarUrl: z.string().url().optional().nullable(),
  message: z.string().min(20),
  approved: z.boolean().default(false),
  featured: z.boolean().default(false),
  source: z.enum(["MANUAL", "FORM_SUBMISSION", "POST_COURSE_EMAIL"]).default("MANUAL"),
  token: z.string().optional().nullable(),
});

export async function GET() {
  const testimonials = await prisma.testimonial.findMany({
    where: { approved: true },
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
  });
  return ok({ testimonials });
}

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    const limit = checkRateLimit(`testimonials:${ip}`, 5, 60_000);
    if (!limit.allowed) return fail("Please wait before trying again.", 429);
    const body = await parseJson(request, createSchema);
    const testimonial = await prisma.testimonial.create({
      data: {
        authorName: body.authorName,
        role: body.role ?? null,
        company: body.company ?? null,
        avatarUrl: body.avatarUrl ?? null,
        message: body.message,
        approved: body.approved,
        featured: body.featured,
        source: body.source,
        token: body.token ?? null,
      },
    });
    return ok({ testimonial }, 201);
  } catch (error) {
    if (error instanceof ApiValidationError) return fail(error.message, 400, error.details);
    return fail("Unable to save testimonial", 500);
  }
}
