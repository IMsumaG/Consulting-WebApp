import { z } from "zod";
import prisma from "@/lib/prisma";
import { ApiAuthError, ApiValidationError, fail, ok, parseJson, requireAdmin } from "@/lib/api";

const schema = z.object({
  orgName: z.string().min(2).optional(),
  contactPerson: z.string().min(2).optional(),
  email: z.string().email().optional(),
  phone: z.string().min(6).optional(),
  trainingArea: z.string().min(3).optional(),
  participants: z.number().int().positive().optional().nullable(),
  preferredDates: z.string().optional().nullable(),
  location: z.string().optional().nullable(),
  deliveryMode: z.string().optional().nullable(),
  objectives: z.string().min(20).optional(),
  customization: z.string().optional().nullable(),
  status: z.string().optional(),
  notes: z.string().optional().nullable(),
});

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin();
    const { id } = await params;
    const body = await parseJson(request, schema);
    const entry = await prisma.corporateRequest.update({
      where: { id },
      data: {
        ...body,
        participants: body.participants ?? undefined,
        preferredDates: body.preferredDates ?? undefined,
        location: body.location ?? undefined,
        deliveryMode: body.deliveryMode ?? undefined,
        customization: body.customization ?? undefined,
        notes: body.notes ?? undefined,
      },
    });
    return ok({ entry });
  } catch (error) {
    if (error instanceof ApiAuthError) return fail(error.message, 401);
    if (error instanceof ApiValidationError) return fail(error.message, 400, error.details);
    return fail("Unable to update corporate request", 500);
  }
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin();
    const { id } = await params;
    await prisma.corporateRequest.delete({ where: { id } });
    return ok({ deleted: true });
  } catch (error) {
    if (error instanceof ApiAuthError) return fail(error.message, 401);
    return fail("Unable to delete corporate request", 500);
  }
}
