import prisma from "@/lib/prisma";
import { AdminShell } from "@/components/admin/admin-shell";

export const metadata = {
  title: "Testimonials",
  description: "Review and publish testimonials.",
};

export const dynamic = "force-dynamic";

export default async function AdminTestimonialsPage() {
  const testimonials: Awaited<ReturnType<typeof prisma.testimonial.findMany>> =
    await prisma.testimonial.findMany({
      orderBy: [{ approved: "asc" }, { createdAt: "desc" }],
    }).catch(() => []);

  const pending = testimonials.filter((item) => !item.approved);
  const approved = testimonials.filter((item) => item.approved);

  return (
    <AdminShell
      title="Testimonials"
      subtitle="Review, approve, and feature testimonials before they appear on the public site."
      active="/admin/testimonials"
      sidebarBadges={{ "/admin/testimonials": pending.length }}
      stats={[
        { label: "Pending", value: String(pending.length) },
        { label: "Approved", value: String(approved.length) },
        { label: "All", value: String(testimonials.length) },
      ]}
    >
      <section className="grid gap-6 xl:grid-cols-3">
        {[
          ["Pending", pending],
          ["Approved", approved],
          ["All", testimonials],
        ].map(([title, items]) => (
          <div
            key={title as string}
            className="rounded-[1.75rem] border border-slate-200/80 bg-white p-6 shadow-[0_18px_50px_rgba(16,32,58,0.06)]"
          >
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-xl font-semibold text-brand-navy">{title as string}</h3>
              <span className="rounded-full bg-brand-green/10 px-3 py-1 text-xs font-semibold text-brand-green">
                {(items as typeof testimonials).length}
              </span>
            </div>
            <div className="mt-5 grid gap-4">
              {(items as typeof testimonials).slice(0, 6).map((testimonial) => (
                <article
                  key={testimonial.id}
                  className="rounded-[1.25rem] border border-slate-200 bg-slate-50 p-4"
                >
                  <p className="font-semibold text-brand-navy">{testimonial.authorName}</p>
                  <p className="mt-1 text-sm text-slate-500">
                    {testimonial.role ?? "Participant"}
                    {testimonial.company ? (
                      <span>
                        {" "}
                        · {testimonial.company}
                      </span>
                    ) : null}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {testimonial.message}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold">
                    <span className="rounded-full bg-brand-navy/10 px-3 py-1 text-brand-navy">
                      {testimonial.source}
                    </span>
                    {testimonial.featured ? (
                      <span className="rounded-full bg-brand-green/10 px-3 py-1 text-brand-green">
                        Featured
                      </span>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          </div>
        ))}
      </section>
    </AdminShell>
  );
}
