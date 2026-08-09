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
  title: "Dashboard",
  description: "Merxano admin dashboard.",
};

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  let courseCount = 0;
  let cohortCount = 0;
  let bookingCount = 0;
  let testimonialCount = 0;
  let insightCount = 0;
  let pendingTestimonials = 0;
  let recentBookings: Prisma.IndividualBookingGetPayload<{
    include: { cohort: { include: { course: true } } };
  }>[] = [];
  let recentCohorts: Prisma.CohortGetPayload<{ include: { course: true } }>[] = [];

  try {
    [
      courseCount,
      cohortCount,
      bookingCount,
      testimonialCount,
      insightCount,
      pendingTestimonials,
      recentBookings,
      recentCohorts,
    ] = await Promise.all([
      prisma.course.count(),
      prisma.cohort.count(),
      prisma.individualBooking.count(),
      prisma.testimonial.count(),
      prisma.insight.count(),
      prisma.testimonial.count({ where: { approved: false } }),
      prisma.individualBooking.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: { cohort: { include: { course: true } } },
      }),
      prisma.cohort.findMany({
        take: 5,
        orderBy: { startDate: "asc" },
        include: { course: true },
      }),
    ]);
  } catch {
    // keep zero-state defaults
  }

  return (
    <AdminShell
      title="Dashboard"
      subtitle="A calm operational overview of Merxano's training, bookings, and content activity."
      action={{ href: "/admin/courses", label: "Manage courses" }}
      stats={[
        { label: "Courses", value: String(courseCount) },
        { label: "Cohorts", value: String(cohortCount) },
        { label: "Bookings", value: String(bookingCount) },
        { label: "Pending testimonials", value: String(pendingTestimonials) },
      ]}
    >
      <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-[1.75rem] border border-slate-200/80 bg-white p-6 shadow-[0_18px_50px_rgba(16,32,58,0.06)]">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-green">
                Recent bookings
              </p>
              <h3 className="mt-2 text-xl font-semibold text-brand-navy">
                Latest participant activity
              </h3>
            </div>
            <Link href="/admin/bookings" className="text-sm font-semibold text-brand-green">
              View all
            </Link>
          </div>
          <div className="mt-6 overflow-hidden rounded-[1.25rem] border border-slate-200/80">
            <table className="min-w-full divide-y divide-slate-200 text-sm">
              <thead className="bg-slate-50 text-left text-xs uppercase tracking-[0.18em] text-slate-500">
                <tr>
                  <th className="px-4 py-3">Participant</th>
                  <th className="px-4 py-3">Course</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {recentBookings.map((booking) => (
                  <tr key={booking.id}>
                    <td className="px-4 py-4 font-medium text-slate-900">{booking.fullName}</td>
                    <td className="px-4 py-4 text-slate-600">{booking.cohort.course.title}</td>
                    <td className="px-4 py-4 text-slate-600">{booking.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid gap-6">
          <div className="rounded-[1.75rem] border border-slate-200/80 bg-[#0f1d3a] p-6 text-white shadow-[0_18px_50px_rgba(16,32,58,0.12)]">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/60">
              Quick focus
            </p>
            <h3 className="mt-3 text-2xl font-semibold">
              Keep the public site calm and the operations clear.
            </h3>
            <p className="mt-4 text-sm leading-7 text-white/76">
              The dashboard highlights activity without drowning the team in clutter. It is meant to feel intentional.
            </p>
          </div>
          <div className="rounded-[1.75rem] border border-slate-200/80 bg-white p-6 shadow-[0_18px_50px_rgba(16,32,58,0.06)]">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-green">
              Upcoming cohorts
            </p>
            <div className="mt-5 grid gap-4">
              {recentCohorts.map((cohort) => (
                <div
                  key={cohort.id}
                  className="rounded-[1.25rem] border border-slate-200 bg-slate-50 px-4 py-4"
                >
                  <p className="font-semibold text-brand-navy">{cohort.course.title}</p>
                  <p className="mt-1 text-sm text-slate-600">
                    {formatDate.format(cohort.startDate)} • {cohort.status}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </AdminShell>
  );
}
