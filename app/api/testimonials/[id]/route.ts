import { z } from "zod";
import prisma from "@/lib/prisma";
import { ApiAuthError, ApiValidationError, fail, ok, parseJson, requireAdmin } from "@/lib/api";

const updateSchema = z.object({
  authorName: z.string().min(2).optional(),
  role: z.string().optional().nullable(),
  company: z.string().optional().nullable(),
  avatarUrl: z.string().url().optional().nullable(),
  message: z.string().min(20).optional(),
  approved: z.boolean().optional(),
  featured: z.boolean().optional(),
});

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin();
    const { id } = await params;
    const body = await parseJson(request, updateSchema);
    const testimonial = await prisma.testimonial.update({
      where: { id },
      data: {
        ...body,
        role: body.role ?? undefined,
        company: body.company ?? undefined,
        avatarUrl: body.avatarUrl ?? undefined,
      },
    });
    return ok({ testimonial });
  } catch (error) {
    if (error instanceof ApiAuthError) return fail(error.message, 401);
    if (error instanceof ApiValidationError) return fail(error.message, 400, error.details);
    return fail("Unable to update testimonial", 500);
  }
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin();
    const { id } = await params;
    await prisma.testimonial.delete({ where: { id } });
    return ok({ deleted: true });
  } catch (error) {
    if (error instanceof ApiAuthError) return fail(error.message, 401);
    return fail("Unable to delete testimonial", 500);
  }
}
