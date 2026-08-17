import Link from "next/link";
import type { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";
import { AdminShell } from "@/components/admin/admin-shell";
import { ResourceActions } from "@/components/admin/resource-actions";

export const metadata = {
  title: "Courses",
  description: "Manage Merxano courses.",
};

export const dynamic = "force-dynamic";

export default async function AdminCoursesPage() {
  const courses: Prisma.CourseGetPayload<{
    include: { cohorts: { select: { id: true } } };
  }>[] =
    await prisma.course.findMany({
      orderBy: { createdAt: "desc" },
      include: { cohorts: { select: { id: true } } },
    }).catch(() => []);

  return (
    <AdminShell
      title="Courses"
      subtitle="Create, review, and publish the programmes that appear on the public site."
      active="/admin/courses"
      action={{ href: "/admin/courses/new", label: "Add course" }}
    >
      <section className="rounded-[1.75rem] border border-slate-200/80 bg-white p-6 shadow-[0_18px_50px_rgba(16,32,58,0.06)]">
        <div className="overflow-x-auto rounded-[1.25rem] border border-slate-200/80">
          <table className="min-w-[680px] divide-y divide-slate-200 text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase tracking-[0.18em] text-slate-500">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Mode</th>
                <th className="px-4 py-3">Cohorts</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {courses.map((course) => (
                <tr key={course.id}>
                  <td className="px-4 py-4">
                    <Link href={`/training/${course.slug}`} className="font-medium text-brand-navy">
                      {course.title}
                    </Link>
                  </td>
                  <td className="px-4 py-4 text-slate-600">{course.category}</td>
                  <td className="px-4 py-4 text-slate-600">{course.deliveryMode}</td>
                  <td className="px-4 py-4 text-slate-600">{course.cohorts.length}</td>
                  <td className="px-4 py-4 text-slate-600">
                    <span className="rounded-full bg-brand-green/10 px-3 py-1 text-xs font-semibold text-brand-green">
                      {course.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right"><ResourceActions editHref={`/admin/courses/${course.id}/edit`} endpoint={`/api/courses/${course.id}`} label="course" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </AdminShell>
  );
}
