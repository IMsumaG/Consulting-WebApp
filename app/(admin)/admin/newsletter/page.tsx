import prisma from "@/lib/prisma";
import { AdminShell } from "@/components/admin/admin-shell";

export const metadata = {
  title: "Newsletter",
  description: "Manage newsletter subscribers.",
};

export const dynamic = "force-dynamic";

export default async function AdminNewsletterPage() {
  const subscribers: Awaited<ReturnType<typeof prisma.newsletterSub.findMany>> =
    await prisma.newsletterSub.findMany({
      orderBy: { createdAt: "desc" },
    }).catch(() => []);

  const csv =
    "data:text/csv;charset=utf-8," +
    [
      ["Name", "Email", "Interests", "Subscribed"].join(","),
      ...subscribers.map((subscriber) =>
        [
          subscriber.name,
          subscriber.email,
          subscriber.interests.join(" | "),
          new Date(subscriber.createdAt).toISOString(),
        ].join(","),
      ),
    ]
      .map((row) => encodeURIComponent(row))
      .join("%0A");

  return (
    <AdminShell
      title="Newsletter"
      subtitle="Review newsletter subscribers, export the list, and track interest areas."
      active="/admin/newsletter"
      action={{ href: csv, label: "Export CSV" }}
      stats={[
        { label: "Subscribers", value: String(subscribers.length) },
      ]}
    >
      <section className="rounded-[1.75rem] border border-slate-200/80 bg-white p-6 shadow-[0_18px_50px_rgba(16,32,58,0.06)]">
        <div className="overflow-x-auto rounded-[1.25rem] border border-slate-200/80">
          <table className="min-w-[560px] divide-y divide-slate-200 text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase tracking-[0.18em] text-slate-500">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Interests</th>
                <th className="px-4 py-3">Subscribed</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {subscribers.map((subscriber) => (
                <tr key={subscriber.id}>
                  <td className="px-4 py-4 font-medium text-brand-navy">{subscriber.name}</td>
                  <td className="px-4 py-4 text-slate-600">{subscriber.email}</td>
                  <td className="px-4 py-4 text-slate-600">{subscriber.interests.join(", ") || "General"}</td>
                  <td className="px-4 py-4 text-slate-600">
                    {new Date(subscriber.createdAt).toLocaleDateString("en-GB")}
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
