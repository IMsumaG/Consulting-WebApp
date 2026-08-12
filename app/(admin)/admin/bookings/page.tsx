import prisma from "@/lib/prisma";
import type { Prisma } from "@prisma/client";
import { AdminShell } from "@/components/admin/admin-shell";

export const metadata = {
  title: "Bookings",
  description: "Review participant bookings and payment states.",
};

export const dynamic = "force-dynamic";

export default async function AdminBookingsPage() {
  const bookings: Prisma.IndividualBookingGetPayload<{
    include: { cohort: { include: { course: true } } };
  }>[] =
    await prisma.individualBooking.findMany({
      orderBy: { createdAt: "desc" },
      include: { cohort: { include: { course: true } } },
    }).catch(() => []);

  return (
    <AdminShell
      title="Bookings"
      subtitle="Participant records, payment updates, and booking references live here."
      active="/admin/bookings"
    >
      <section className="rounded-[1.75rem] border border-slate-200/80 bg-white p-6 shadow-[0_18px_50px_rgba(16,32,58,0.06)]">
        <div className="overflow-x-auto rounded-[1.25rem] border border-slate-200/80">
          <table className="min-w-[680px] divide-y divide-slate-200 text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase tracking-[0.18em] text-slate-500">
              <tr>
                <th className="px-4 py-3">Reference</th>
                <th className="px-4 py-3">Participant</th>
                <th className="px-4 py-3">Course</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {bookings.map((booking) => (
                <tr key={booking.id}>
                  <td className="px-4 py-4 font-medium text-brand-navy">{booking.bookingRef}</td>
                  <td className="px-4 py-4 text-slate-600">{booking.fullName}</td>
                  <td className="px-4 py-4 text-slate-600">{booking.cohort.course.title}</td>
                  <td className="px-4 py-4 text-slate-600">{booking.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </AdminShell>
  );
}
