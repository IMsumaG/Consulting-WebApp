import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { AdminShell } from "@/components/admin/admin-shell";
import { InsightEditor } from "@/components/admin/insight-editor";

export const dynamic = "force-dynamic";
export const metadata = { title: "Edit article" };

export default async function EditInsightPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const insight = await prisma.insight.findUnique({ where: { id } }).catch(() => null);
  if (!insight) notFound();
  return <AdminShell title="Edit article" subtitle="Update your article, SEO details, and publication status." active="/admin/insights"><InsightEditor insight={{ id: insight.id, title: insight.title, slug: insight.slug, body: insight.body, excerpt: insight.excerpt, featuredImageUrl: insight.featuredImageUrl, author: insight.author, category: insight.category, published: insight.published, publishedAt: insight.publishedAt?.toISOString() ?? null, metaTitle: insight.metaTitle, metaDescription: insight.metaDescription }} /></AdminShell>;
}
