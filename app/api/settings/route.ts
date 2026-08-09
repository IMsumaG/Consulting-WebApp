import { z } from "zod";
import prisma from "@/lib/prisma";
import { ApiAuthError, ApiValidationError, fail, ok, parseJson, requireAdmin } from "@/lib/api";

const settingsSchema = z.object({
  companyName: z.string().min(2).optional(),
  email: z.string().email().optional().nullable(),
  phone: z.string().optional().nullable(),
  whatsapp: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  linkedIn: z.string().url().optional().nullable(),
  facebook: z.string().url().optional().nullable(),
  instagram: z.string().url().optional().nullable(),
  youtube: z.string().url().optional().nullable(),
  tiktok: z.string().url().optional().nullable(),
  twitter: z.string().url().optional().nullable(),
  bankName: z.string().optional().nullable(),
  bankAccountName: z.string().optional().nullable(),
  bankAccountNumber: z.string().optional().nullable(),
  bankBranch: z.string().optional().nullable(),
  mobileMoneyName: z.string().optional().nullable(),
  mobileMoneyNumber: z.string().optional().nullable(),
  paymentGateway: z.string().optional().nullable(),
});

export async function GET() {
  const settings = await prisma.siteSettings.findFirst({ orderBy: { id: "asc" } });
  return ok({ settings });
}

export async function PATCH(request: Request) {
  try {
    await requireAdmin();
    const body = await parseJson(request, settingsSchema);
    const existing = await prisma.siteSettings.findFirst();
    const settings = existing
      ? await prisma.siteSettings.update({ where: { id: existing.id }, data: body })
      : await prisma.siteSettings.create({ data: body });
    return ok({ settings });
  } catch (error) {
    if (error instanceof ApiAuthError) return fail(error.message, 401);
    if (error instanceof ApiValidationError) return fail(error.message, 400, error.details);
    return fail("Unable to update settings", 500);
  }
}
