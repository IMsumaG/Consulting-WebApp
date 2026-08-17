import { z } from "zod";
import prisma from "@/lib/prisma";
import { fail, ok, parseJson, requireAdmin, ApiAuthError, ApiValidationError } from "@/lib/api";

const courseImageSchema = z.string().trim().refine(
  (value) => value.startsWith("/") || URL.canParse(value),
  "Use a local image path or a valid image URL",
);

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
  imageUrl: courseImageSchema.optional().nullable(),
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

    if (!process.env.DATABASE_URL || !process.env.DATABASE_URL.trim()) {
      return fail(
        "Database is not configured for local development. Add DATABASE_URL and DATABASE_URL_UNPOOLED to .env.local, then run npm run db:generate && npm run db:push.",
        500,
      );
    }

    return fail(error instanceof Error ? error.message : "Unable to update course", 500);
  }
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin();
    const { id } = await params;
    const cohortCount = await prisma.cohort.count({ where: { courseId: id } });
    if (cohortCount > 0) {
      return fail(
        "This course has cohorts. Delete or cancel its cohorts before deleting the course.",
        409,
      );
    }
    await prisma.course.delete({ where: { id } });
    return ok({ deleted: true });
  } catch (error) {
    if (error instanceof ApiAuthError) {
      return fail(error.message, 401);
    }
    return fail("Unable to delete course", 500);
  }
}
