import { Prisma } from "@prisma/client";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { ApiAuthError, ApiValidationError, fail, ok, parseJson, requireAdmin } from "@/lib/api";

const updateSchema = z.object({
  courseId: z.string().optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  sessionDays: z.string().optional(),
  sessionTimes: z.string().optional(),
  venue: z.string().optional().nullable(),
  onlinePlatform: z.string().optional().nullable(),
  fee: z.union([z.string(), z.number()]).optional(),
  currency: z.string().optional(),
  seatsTotal: z.number().int().positive().optional(),
  seatsBooked: z.number().int().min(0).optional(),
  registrationDeadline: z.string().datetime().optional(),
  status: z.enum([
    "OPEN",
    "FEW_SEATS",
    "FULLY_BOOKED",
    "CLOSED",
    "COMING_SOON",
    "POSTPONED",
    "CANCELLED",
    "COMPLETED",
  ]).optional(),
});

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const cohort = await prisma.cohort.findUnique({
    where: { id },
    include: { course: true, bookings: true },
  });

  if (!cohort) {
    return fail("Cohort not found", 404);
  }

  return ok({ cohort });
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin();
    const body = await parseJson(request, updateSchema);
    const { id } = await params;
    const cohort = await prisma.cohort.update({
      where: { id },
      data: {
        ...body,
        startDate: body.startDate ? new Date(body.startDate) : undefined,
        endDate: body.endDate ? new Date(body.endDate) : undefined,
        registrationDeadline: body.registrationDeadline
          ? new Date(body.registrationDeadline)
          : undefined,
        venue: body.venue ?? undefined,
        onlinePlatform: body.onlinePlatform ?? undefined,
        fee: body.fee !== undefined ? new Prisma.Decimal(body.fee) : undefined,
      },
    });

    return ok({ cohort });
  } catch (error) {
    if (error instanceof ApiAuthError) {
      return fail(error.message, 401);
    }
    if (error instanceof ApiValidationError) {
      return fail(error.message, 400, error.details);
    }
    return fail("Unable to update cohort", 500);
  }
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin();
    const { id } = await params;
    await prisma.cohort.delete({ where: { id } });
    return ok({ deleted: true });
  } catch (error) {
    if (error instanceof ApiAuthError) {
      return fail(error.message, 401);
    }
    return fail("Unable to delete cohort", 500);
  }
}
