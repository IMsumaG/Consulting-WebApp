import { AdminShell } from "@/components/admin/admin-shell";
import { InsightEditor } from "@/components/admin/insight-editor";

export const metadata = { title: "New article" };

export default function NewInsightPage() {
  return <AdminShell title="New article" subtitle="Draft a useful resource, prepare its search details, then publish when it is ready." active="/admin/insights"><InsightEditor /></AdminShell>;
}
