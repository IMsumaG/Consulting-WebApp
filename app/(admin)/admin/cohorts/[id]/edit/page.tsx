import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { AdminShell } from "@/components/admin/admin-shell";
import { CohortEditor } from "@/components/admin/cohort-editor";

export const dynamic = "force-dynamic";
export const metadata = { title: "Edit cohort" };
const dateForInput = (date: Date) => date.toISOString().slice(0, 16);

export default async function EditCohortPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [cohort, courses] = await Promise.all([prisma.cohort.findUnique({ where: { id } }).catch(() => null), prisma.course.findMany({ select: { id: true, title: true }, orderBy: { title: "asc" } }).catch(() => [])]);
  if (!cohort) notFound();
  return <AdminShell title="Edit cohort" subtitle="Keep dates, capacity, prices, and availability up to date." active="/admin/cohorts"><CohortEditor courses={courses} cohort={{ id: cohort.id, courseId: cohort.courseId, startDate: dateForInput(cohort.startDate), endDate: dateForInput(cohort.endDate), sessionDays: cohort.sessionDays, sessionTimes: cohort.sessionTimes, venue: cohort.venue, onlinePlatform: cohort.onlinePlatform, fee: cohort.fee.toString(), currency: cohort.currency, seatsTotal: cohort.seatsTotal, seatsBooked: cohort.seatsBooked, registrationDeadline: dateForInput(cohort.registrationDeadline), status: cohort.status }} /></AdminShell>;
}
