import prisma from "@/lib/prisma";
import { AdminShell } from "@/components/admin/admin-shell";
import { SettingsEditor } from "@/components/admin/settings-editor";

export const metadata = {
  title: "Settings",
  description: "Update company and contact settings.",
};

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const settings = await prisma.siteSettings.findFirst().catch(() => null);

  const initial = settings ?? {
    companyName: "Merxano Consulting",
    email: "training@merxano.co.tz",
    phone: "+255 746 000 000",
    whatsapp: "255746000000",
    address: "Dar es Salaam, Tanzania",
    bankName: "CRDB Bank",
    bankAccountName: "Merxano Consulting",
    bankAccountNumber: "012345678901",
    bankBranch: "Dar es Salaam",
    mobileMoneyName: "M-Pesa",
    mobileMoneyNumber: "+255 746 000 000",
  };

  return (
    <AdminShell
      title="Settings"
      subtitle="Update the public contact details and payment information used across the site."
      active="/admin/settings"
    >
      <SettingsEditor initial={initial} />
    </AdminShell>
  );
}
