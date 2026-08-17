import Link from "next/link";
import prisma from "@/lib/prisma";
import { AdminShell } from "@/components/admin/admin-shell";
import { ResourceActions } from "@/components/admin/resource-actions";

export const metadata = {
  title: "Insights",
  description: "Manage blog and insight articles.",
};

export const dynamic = "force-dynamic";

export default async function AdminInsightsPage() {
  const insights: Awaited<ReturnType<typeof prisma.insight.findMany>> =
    await prisma.insight.findMany({
      orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
    }).catch(() => []);

  return (
    <AdminShell
      title="Insights"
      subtitle="Create, update, and publish the articles shown on the public blog."
      active="/admin/insights"
      action={{ href: "/admin/insights/new", label: "New article" }}
    >
      <section className="rounded-[1.75rem] border border-slate-200/80 bg-white p-6 shadow-[0_18px_50px_rgba(16,32,58,0.06)]">
        <div className="overflow-x-auto rounded-[1.25rem] border border-slate-200/80">
          <table className="min-w-[640px] divide-y divide-slate-200 text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase tracking-[0.18em] text-slate-500">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Published</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {insights.map((insight) => (
                <tr key={insight.id}>
                  <td className="px-4 py-4">
                    <Link href={`/insights/${insight.slug}`} className="font-medium text-brand-navy">
                      {insight.title}
                    </Link>
                  </td>
                  <td className="px-4 py-4 text-slate-600">{insight.category}</td>
                  <td className="px-4 py-4 text-slate-600">
                    <span className="rounded-full bg-brand-green/10 px-3 py-1 text-xs font-semibold text-brand-green">
                      {insight.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right"><ResourceActions editHref={`/admin/insights/${insight.id}/edit`} endpoint={`/api/insights/${insight.id}`} label="article" /></td>
                  <td className="px-4 py-4 text-slate-600">
                    {insight.publishedAt ? new Date(insight.publishedAt).toLocaleDateString("en-GB") : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </AdminShell>
  );
}
