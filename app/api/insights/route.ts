import { z } from "zod";
import prisma from "@/lib/prisma";
import { ApiAuthError, ApiValidationError, fail, ok, parseJson, requireAdmin } from "@/lib/api";

const insightSchema = z.object({
  title: z.string().min(3),
  slug: z.string().min(3),
  body: z.any(),
  excerpt: z.string().min(20),
  featuredImageUrl: z.string().url().optional().nullable(),
  author: z.string().min(2),
  category: z.string().min(2),
  published: z.boolean().default(false),
  publishedAt: z.string().datetime().optional().nullable(),
  metaTitle: z.string().optional().nullable(),
  metaDescription: z.string().optional().nullable(),
});

export async function GET() {
  const insights = await prisma.insight.findMany({
    where: { published: true },
    orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
  });
  return ok({ insights });
}

export async function POST(request: Request) {
  try {
    await requireAdmin();
    const body = await parseJson(request, insightSchema);
    const insight = await prisma.insight.create({
      data: {
        ...body,
        featuredImageUrl: body.featuredImageUrl ?? null,
        publishedAt: body.publishedAt ? new Date(body.publishedAt) : null,
        metaTitle: body.metaTitle ?? null,
        metaDescription: body.metaDescription ?? null,
      },
    });
    return ok({ insight }, 201);
  } catch (error) {
    if (error instanceof ApiAuthError) return fail(error.message, 401);
    if (error instanceof ApiValidationError) return fail(error.message, 400, error.details);
    return fail("Unable to save insight", 500);
  }
}
