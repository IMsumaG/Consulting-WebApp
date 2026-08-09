import { Prisma } from "@prisma/client";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { ApiAuthError, ApiValidationError, fail, ok, parseJson, requireAdmin } from "@/lib/api";

const cohortSchema = z.object({
  courseId: z.string().min(1),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  sessionDays: z.string().min(1),
  sessionTimes: z.string().min(1),
  venue: z.string().optional().nullable(),
  onlinePlatform: z.string().optional().nullable(),
  fee: z.union([z.string(), z.number()]),
  currency: z.string().default("TZS"),
  seatsTotal: z.number().int().positive(),
  seatsBooked: z.number().int().min(0).default(0),
  registrationDeadline: z.string().datetime(),
  status: z.enum([
    "OPEN",
    "FEW_SEATS",
    "FULLY_BOOKED",
    "CLOSED",
    "COMING_SOON",
    "POSTPONED",
    "CANCELLED",
    "COMPLETED",
  ]).default("OPEN"),
});

export async function GET() {
  const cohorts = await prisma.cohort.findMany({
    where: {
      status: { notIn: ["CANCELLED"] },
    },
    orderBy: { startDate: "asc" },
    include: { course: true },
  });

  return ok({ cohorts });
}

export async function POST(request: Request) {
  try {
    await requireAdmin();
    const body = await parseJson(request, cohortSchema);
    const cohort = await prisma.cohort.create({
      data: {
        courseId: body.courseId,
        startDate: new Date(body.startDate),
        endDate: new Date(body.endDate),
        sessionDays: body.sessionDays,
        sessionTimes: body.sessionTimes,
        venue: body.venue ?? null,
        onlinePlatform: body.onlinePlatform ?? null,
        fee: new Prisma.Decimal(body.fee),
        currency: body.currency,
        seatsTotal: body.seatsTotal,
        seatsBooked: body.seatsBooked,
        registrationDeadline: new Date(body.registrationDeadline),
        status: body.status,
      },
    });

    return ok({ cohort }, 201);
  } catch (error) {
    if (error instanceof ApiAuthError) {
      return fail(error.message, 401);
    }
    if (error instanceof ApiValidationError) {
      return fail(error.message, 400, error.details);
    }
    return fail("Unable to create cohort", 500);
  }
}
