import { z } from "zod";
import prisma from "@/lib/prisma";
import { fail, ok, parseJson, requireAdmin, ApiAuthError, ApiValidationError } from "@/lib/api";

const updateSchema = z.object({
  title: z.string().min(3).optional(),
  slug: z.string().min(3).optional(),
  category: z.string().min(2).optional(),
  overview: z.string().min(20).optional(),
  objectives: z.array(z.string().min(2)).optional(),
  whoShouldAttend: z.string().min(10).optional(),
  entryRequirements: z.string().optional().nullable(),
  outline: z.array(z.string().min(2)).optional(),
  duration: z.string().min(1).optional(),
  deliveryMode: z.enum(["ONLINE", "PHYSICAL", "HYBRID"]).optional(),
  trainerInfo: z.string().min(10).optional(),
  certInfo: z.string().optional().nullable(),
  imageUrl: z.string().url().optional().nullable(),
  published: z.boolean().optional(),
});

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const course = await prisma.course.findUnique({
    where: { id },
    include: { cohorts: { orderBy: { startDate: "asc" } } },
  });

  if (!course) {
    return fail("Course not found", 404);
  }

  return ok({ course });
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin();
    const { id } = await params;
    const body = await parseJson(request, updateSchema);
    const course = await prisma.course.update({
      where: { id },
      data: {
        ...body,
        entryRequirements: body.entryRequirements ?? undefined,
        certInfo: body.certInfo ?? undefined,
        imageUrl: body.imageUrl ?? undefined,
      },
    });

    return ok({ course });
  } catch (error) {
    if (error instanceof ApiAuthError) {
      return fail(error.message, 401);
    }
    if (error instanceof ApiValidationError) {
      return fail(error.message, 400, error.details);
    }
    return fail("Unable to update course", 500);
  }
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin();
    const { id } = await params;
    await prisma.course.delete({ where: { id } });
    return ok({ deleted: true });
  } catch (error) {
    if (error instanceof ApiAuthError) {
      return fail(error.message, 401);
    }
    return fail("Unable to delete course", 500);
  }
}
