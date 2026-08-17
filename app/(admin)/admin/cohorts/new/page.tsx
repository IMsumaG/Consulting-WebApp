import prisma from "@/lib/prisma";
import { AdminShell } from "@/components/admin/admin-shell";
import { CohortEditor } from "@/components/admin/cohort-editor";

export const dynamic = "force-dynamic";
export const metadata = { title: "Add cohort" };

export default async function NewCohortPage() {
  const courses = await prisma.course.findMany({ select: { id: true, title: true }, orderBy: { title: "asc" } }).catch(() => []);
  return <AdminShell title="Add cohort" subtitle="Set the dates, capacity, pricing, and delivery details for an upcoming training run." active="/admin/cohorts"><CohortEditor courses={courses} /></AdminShell>;
}
