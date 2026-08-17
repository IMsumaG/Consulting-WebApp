import { AdminShell } from "@/components/admin/admin-shell";
import { CourseEditor } from "@/components/admin/course-editor";

export const metadata = { title: "Add course" };

export default function NewCoursePage() {
  return <AdminShell title="Add course" subtitle="Build a new programme, choose its thumbnail, and decide when it is ready to publish." active="/admin/courses"><CourseEditor /></AdminShell>;
}
