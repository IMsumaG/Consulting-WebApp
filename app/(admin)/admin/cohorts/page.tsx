import Link from "next/link";
import type { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";
import { AdminShell } from "@/components/admin/admin-shell";

const formatDate = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

export const metadata = {
  title: "Cohorts",
  description: "Manage upcoming training cohorts.",
};

export const dynamic = "force-dynamic";

export default async function AdminCohortsPage() {
  const cohorts: Prisma.CohortGetPayload<{ include: { course: true } }>[] =
    await prisma.cohort.findMany({
      orderBy: { startDate: "asc" },
      include: { course: true },
    }).catch(() => []);

  return (
    <AdminShell
      title="Cohorts"
      subtitle="Track dates, capacity, and the delivery state for each training run."
      active="/admin/cohorts"
      action={{ href: "#", label: "Add cohort" }}
    >
      <section className="rounded-[1.75rem] border border-slate-200/80 bg-white p-6 shadow-[0_18px_50px_rgba(16,32,58,0.06)]">
        <div className="overflow-x-auto rounded-[1.25rem] border border-slate-200/80">
          <table className="min-w-[720px] divide-y divide-slate-200 text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase tracking-[0.18em] text-slate-500">
              <tr>
                <th className="px-4 py-3">Course</th>
                <th className="px-4 py-3">Dates</th>
                <th className="px-4 py-3">Seats</th>
                <th className="px-4 py-3">Fee</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {cohorts.map((cohort) => (
                <tr key={cohort.id}>
                  <td className="px-4 py-4 font-medium text-brand-navy">{cohort.course.title}</td>
                  <td className="px-4 py-4 text-slate-600">
                    {formatDate.format(cohort.startDate)} - {formatDate.format(cohort.endDate)}
                  </td>
                  <td className="px-4 py-4 text-slate-600">
                    {cohort.seatsBooked}/{cohort.seatsTotal}
                  </td>
                  <td className="px-4 py-4 text-slate-600">{cohort.currency} {cohort.fee.toString()}</td>
                  <td className="px-4 py-4">
                    <span className="rounded-full bg-brand-navy/10 px-3 py-1 text-xs font-semibold text-brand-navy">
                      {cohort.status}
                    </span>
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
