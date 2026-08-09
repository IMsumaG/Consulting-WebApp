import { z } from "zod";
import prisma from "@/lib/prisma";
import { ApiAuthError, ApiValidationError, fail, ok, parseJson, requireAdmin } from "@/lib/api";

const schema = z.object({
  clientName: z.string().min(2).optional(),
  organization: z.string().optional().nullable(),
  email: z.string().email().optional(),
  phone: z.string().min(6).optional(),
  consultingType: z.string().min(2).optional(),
  description: z.string().min(20).optional(),
  preferredDate: z.string().datetime().optional().nullable(),
  preferredContact: z.string().min(2).optional(),
  status: z.string().optional(),
  notes: z.string().optional().nullable(),
});

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin();
    const body = await parseJson(request, schema);
    const { id } = await params;
    const entry = await prisma.consultationRequest.update({
      where: { id },
      data: {
        ...body,
        organization: body.organization ?? undefined,
        preferredDate: body.preferredDate ? new Date(body.preferredDate) : undefined,
        notes: body.notes ?? undefined,
      },
    });
    return ok({ entry });
  } catch (error) {
    if (error instanceof ApiAuthError) return fail(error.message, 401);
    if (error instanceof ApiValidationError) return fail(error.message, 400, error.details);
    return fail("Unable to update consulting request", 500);
  }
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin();
    const { id } = await params;
    await prisma.consultationRequest.delete({ where: { id } });
    return ok({ deleted: true });
  } catch (error) {
    if (error instanceof ApiAuthError) return fail(error.message, 401);
    return fail("Unable to delete consulting request", 500);
  }
}
