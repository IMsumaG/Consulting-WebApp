import { z } from "zod";
import prisma from "@/lib/prisma";
import { fail, ok, parseJson, requireAdmin, ApiAuthError, ApiValidationError } from "@/lib/api";

const courseImageSchema = z.string().trim().refine(
  (value) => value.startsWith("/") || URL.canParse(value),
  "Use a local image path or a valid image URL",
);

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
  imageUrl: courseImageSchema.optional().nullable(),
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

    if (!process.env.DATABASE_URL || !process.env.DATABASE_URL.trim()) {
      return fail(
        "Database is not configured for local development. Add DATABASE_URL and DATABASE_URL_UNPOOLED to .env.local, then run npm run db:generate && npm run db:push.",
        500,
      );
    }

    return fail(error instanceof Error ? error.message : "Unable to create course", 500);
  }
}
