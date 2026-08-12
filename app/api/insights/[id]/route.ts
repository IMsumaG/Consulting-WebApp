import { z } from "zod";
import type { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";
import { ApiAuthError, ApiValidationError, fail, ok, parseJson, requireAdmin } from "@/lib/api";

const updateSchema = z.object({
  title: z.string().min(3).optional(),
  slug: z.string().min(3).optional(),
  body: z.unknown().optional(),
  excerpt: z.string().min(20).optional(),
  featuredImageUrl: z.string().url().optional().nullable(),
  author: z.string().min(2).optional(),
  category: z.string().min(2).optional(),
  published: z.boolean().optional(),
  publishedAt: z.string().datetime().optional().nullable(),
  metaTitle: z.string().optional().nullable(),
  metaDescription: z.string().optional().nullable(),
});

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin();
    const { id } = await params;
    const body = await parseJson(request, updateSchema);
    const insight = await prisma.insight.update({
      where: { id },
      data: {
        ...body,
        body: body.body as Prisma.InputJsonValue | undefined,
        featuredImageUrl: body.featuredImageUrl ?? undefined,
        publishedAt: body.publishedAt ? new Date(body.publishedAt) : undefined,
        metaTitle: body.metaTitle ?? undefined,
        metaDescription: body.metaDescription ?? undefined,
      },
    });
    return ok({ insight });
  } catch (error) {
    if (error instanceof ApiAuthError) return fail(error.message, 401);
    if (error instanceof ApiValidationError) return fail(error.message, 400, error.details);
    return fail("Unable to update insight", 500);
  }
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin();
    const { id } = await params;
    await prisma.insight.delete({ where: { id } });
    return ok({ deleted: true });
  } catch (error) {
    if (error instanceof ApiAuthError) return fail(error.message, 401);
    return fail("Unable to delete insight", 500);
  }
}
