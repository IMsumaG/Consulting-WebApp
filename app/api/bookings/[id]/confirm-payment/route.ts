import { z } from "zod";
import prisma from "@/lib/prisma";
import { ApiAuthError, ApiValidationError, fail, ok, parseJson, requireAdmin } from "@/lib/api";

const schema = z.object({
  status: z.enum(["PAYMENT_CONFIRMED", "CONFIRMED", "WAITLIST"]),
});

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin();
    const body = await parseJson(request, schema);
    const { id } = await params;
    const booking = await prisma.individualBooking.update({
      where: { id },
      data: { status: body.status },
    });
    return ok({ booking });
  } catch (error) {
    if (error instanceof ApiAuthError) {
      return fail(error.message, 401);
    }
    if (error instanceof ApiValidationError) {
      return fail(error.message, 400, error.details);
    }
    return fail("Unable to confirm payment", 500);
  }
}
