import { z } from "zod";
import prisma from "@/lib/prisma";
import { ApiAuthError, ApiValidationError, fail, ok, parseJson, requireAdmin } from "@/lib/api";

const heroSchema = z.object({
  headline: z.string().min(10),
  subheadline: z.string().min(20),
  ctaText: z.string().min(2),
  ctaLink: z.string().min(1),
  backgroundImageUrl: z.string().optional().nullable(),
});

export async function GET() {
  const hero = await prisma.heroSection.findFirst({ orderBy: { id: "asc" } });
  return ok({ hero });
}

export async function PATCH(request: Request) {
  try {
    await requireAdmin();
    const body = await parseJson(request, heroSchema);
    const existing = await prisma.heroSection.findFirst();
    const hero = existing
      ? await prisma.heroSection.update({
          where: { id: existing.id },
          data: { ...body, backgroundImageUrl: body.backgroundImageUrl ?? null },
        })
      : await prisma.heroSection.create({
          data: { ...body, backgroundImageUrl: body.backgroundImageUrl ?? null },
        });
    return ok({ hero });
  } catch (error) {
    if (error instanceof ApiAuthError) return fail(error.message, 401);
    if (error instanceof ApiValidationError) return fail(error.message, 400, error.details);
    return fail("Unable to update hero section", 500);
  }
}
