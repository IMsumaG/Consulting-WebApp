import { z } from "zod";
import prisma from "@/lib/prisma";
import {
  ApiAuthError,
  ApiValidationError,
  checkRateLimit,
  fail,
  getClientIp,
  ok,
  parseJson,
  requireAdmin,
} from "@/lib/api";

const bookingSchema = z.object({
  cohortId: z.string().min(1),
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(6),
  whatsapp: z.string().optional().nullable(),
  country: z.string().min(2),
  city: z.string().min(2),
  organization: z.string().optional().nullable(),
  jobTitle: z.string().optional().nullable(),
  deliveryMode: z.enum(["ONLINE", "PHYSICAL", "HYBRID"]),
  billingName: z.string().optional().nullable(),
  tin: z.string().optional().nullable(),
  paymentMethod: z.string().min(2),
  specialRequirements: z.string().optional().nullable(),
  referralSource: z.string().optional().nullable(),
  privacyConsent: z.literal(true),
  marketingConsent: z.boolean().optional().default(false),
});

export async function GET() {
  try {
    await requireAdmin();
    const bookings = await prisma.individualBooking.findMany({
      orderBy: { createdAt: "desc" },
      include: { cohort: { include: { course: true } } },
    });
    return ok({ bookings });
  } catch (error) {
    if (error instanceof ApiAuthError) {
      return fail(error.message, 401);
    }
    return fail("Unable to load bookings", 500);
  }
}

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    const limit = checkRateLimit(`bookings:${ip}`, 5, 60_000);
    if (!limit.allowed) {
      return fail("Too many booking attempts. Please try again shortly.", 429);
    }

    const body = await parseJson(request, bookingSchema);
    const result = await prisma.$transaction(async (tx) => {
      const cohort = await tx.cohort.findUnique({
        where: { id: body.cohortId },
        include: { course: true },
      });

      if (!cohort) {
        throw new Error("COHORT_NOT_FOUND");
      }

      if (cohort.seatsBooked >= cohort.seatsTotal) {
        throw new Error("COHORT_FULL");
      }

      const booking = await tx.individualBooking.create({
        data: {
          cohortId: cohort.id,
          fullName: body.fullName,
          email: body.email,
          phone: body.phone,
          whatsapp: body.whatsapp ?? null,
          country: body.country,
          city: body.city,
          organization: body.organization ?? null,
          jobTitle: body.jobTitle ?? null,
          deliveryMode: body.deliveryMode,
          billingName: body.billingName ?? null,
          tin: body.tin ?? null,
          paymentMethod: body.paymentMethod,
          specialRequirements: body.specialRequirements ?? null,
          referralSource: body.referralSource ?? null,
          status: "RECEIVED",
        },
      });

      const updatedSeatsBooked = cohort.seatsBooked + 1;
      const nextStatus =
        updatedSeatsBooked >= cohort.seatsTotal
          ? "FULLY_BOOKED"
          : updatedSeatsBooked >= Math.ceil(cohort.seatsTotal * 0.8)
            ? "FEW_SEATS"
            : cohort.status;

      await tx.cohort.update({
        where: { id: cohort.id },
        data: {
          seatsBooked: updatedSeatsBooked,
          status: nextStatus,
        },
      });

      return { booking };
    });

    return ok(
      {
        bookingRef: result.booking.bookingRef,
        booking: result.booking,
      },
      201,
    );
  } catch (error) {
    if (error instanceof ApiValidationError) {
      return fail(error.message, 400, error.details);
    }
    if (error instanceof Error) {
      if (error.message === "COHORT_NOT_FOUND") {
        return fail("Cohort not found", 404);
      }
      if (error.message === "COHORT_FULL") {
        return fail("This cohort is full. Please join the waitlist.", 409, {
          waitlist: true,
        });
      }
    }
    return fail("Unable to create booking", 500);
  }
}
