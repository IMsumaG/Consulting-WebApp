import { z } from "zod";
import prisma from "@/lib/prisma";
import { ApiAuthError, ApiValidationError, fail, ok, parseJson, requireAdmin } from "@/lib/api";

const schema = z.object({
  cohortId: z.string().min(1),
});

export async function POST(request: Request) {
  try {
    await requireAdmin();
    const body = await parseJson(request, schema);
    const requests = await prisma.testimonialRequest.findMany({
      where: { cohortId: body.cohortId },
      include: { booking: true },
    });
    return ok({ requests });
  } catch (error) {
    if (error instanceof ApiAuthError) return fail(error.message, 401);
    if (error instanceof ApiValidationError) return fail(error.message, 400, error.details);
    return fail("Unable to trigger testimonial requests", 500);
  }
}
