import { z } from "zod";
import prisma from "@/lib/prisma";
import { fail, ok, parseJson, requireAdmin, ApiAuthError, ApiValidationError } from "@/lib/api";

const courseSchema = z.object({
  title: z.string().min(3),
  slug: z.string().min(3),
  category: z.string().min(2),
  overview: z.string().min(20),
  objectives: z.array(z.string().min(2)),
  whoShouldAttend: z.string().min(10),
  entryRequirements: z.string().optional().nullable(),
  outline: z.array(z.string().min(2)),
  duration: z.string().min(1),
  deliveryMode: z.enum(["ONLINE", "PHYSICAL", "HYBRID"]),
  trainerInfo: z.string().min(10),
  certInfo: z.string().optional().nullable(),
  imageUrl: z.string().url().optional().nullable(),
  published: z.boolean().default(false),
});

export async function GET() {
  const courses = await prisma.course.findMany({
    where: { published: true },
    orderBy: [{ createdAt: "desc" }],
    include: { cohorts: true },
  });

  return ok({ courses });
}

export async function POST(request: Request) {
  try {
    await requireAdmin();
    const body = await parseJson(request, courseSchema);
    const course = await prisma.course.create({
      data: {
        ...body,
        objectives: body.objectives,
        outline: body.outline,
        entryRequirements: body.entryRequirements ?? null,
        certInfo: body.certInfo ?? null,
        imageUrl: body.imageUrl ?? null,
        deliveryMode: body.deliveryMode,
      },
    });

    return ok({ course }, 201);
  } catch (error) {
    if (error instanceof ApiAuthError) {
      return fail(error.message, 401);
    }
    if (error instanceof ApiValidationError) {
      return fail(error.message, 400, error.details);
    }
    return fail("Unable to create course", 500);
  }
}
