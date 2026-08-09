import prisma from "@/lib/prisma";
import { AdminShell } from "@/components/admin/admin-shell";
import { HeroEditor } from "@/components/admin/hero-editor";

export const metadata = {
  title: "Hero",
  description: "Edit the homepage hero section.",
};

export const dynamic = "force-dynamic";

export default async function AdminHeroPage() {
  const hero = await prisma.heroSection.findFirst().catch(() => null);

  const initial = hero ?? {
    headline: "Empowering Professionals & Organizations to Deliver Excellence",
    subheadline:
      "Merxano Consulting provides practical professional training, advisory support, and business growth solutions.",
    ctaText: "Explore Training",
    ctaLink: "/training",
    backgroundImageUrl: null,
  };

  return (
    <AdminShell
      title="Hero"
      subtitle="Edit the public homepage hero and keep the first impression aligned with the Merxano brand."
      active="/admin/hero"
    >
      <HeroEditor initial={initial} />
    </AdminShell>
  );
}
