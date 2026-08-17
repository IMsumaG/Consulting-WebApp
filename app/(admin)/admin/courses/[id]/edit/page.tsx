import { notFound } from "next/navigation";
import type { DeliveryMode, Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";
import { AdminShell } from "@/components/admin/admin-shell";
import { CourseEditor } from "@/components/admin/course-editor";

export const dynamic = "force-dynamic";
export const metadata = { title: "Edit course" };

function stringList(value: Prisma.JsonValue) { return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : []; }

export default async function EditCoursePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const course = await prisma.course.findUnique({ where: { id } }).catch(() => null);
  if (!course) notFound();
  return <AdminShell title="Edit course" subtitle="Update the programme information, thumbnail, and publishing status." active="/admin/courses"><CourseEditor course={{ id: course.id, title: course.title, slug: course.slug, category: course.category, overview: course.overview, objectives: stringList(course.objectives), whoShouldAttend: course.whoShouldAttend, entryRequirements: course.entryRequirements, outline: stringList(course.outline), duration: course.duration, deliveryMode: course.deliveryMode as DeliveryMode, trainerInfo: course.trainerInfo, certInfo: course.certInfo, imageUrl: course.imageUrl, published: course.published }} /></AdminShell>;
}
