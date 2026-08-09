import prisma from "@/lib/prisma";
import { AdminShell } from "@/components/admin/admin-shell";

export const metadata = {
  title: "Users",
  description: "Manage admin users.",
};

export const dynamic = "force-dynamic";

export default async function AdminUsersPage() {
  const users: Awaited<ReturnType<typeof prisma.adminUser.findMany>> =
    await prisma.adminUser.findMany({
      orderBy: { createdAt: "desc" },
    }).catch(() => []);

  return (
    <AdminShell
      title="Users"
      subtitle="Review admin accounts and prepare room for SUPER_ADMIN controlled access."
      active="/admin/users"
      stats={[
        { label: "Admin users", value: String(users.length) },
        { label: "Roles", value: "ADMIN / SUPER_ADMIN" },
      ]}
    >
      <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-[1.75rem] border border-slate-200/80 bg-white p-6 shadow-[0_18px_50px_rgba(16,32,58,0.06)]">
          <div className="overflow-hidden rounded-[1.25rem] border border-slate-200/80">
            <table className="min-w-full divide-y divide-slate-200 text-sm">
              <thead className="bg-slate-50 text-left text-xs uppercase tracking-[0.18em] text-slate-500">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Role</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="px-4 py-4 font-medium text-brand-navy">{user.name}</td>
                    <td className="px-4 py-4 text-slate-600">{user.email}</td>
                    <td className="px-4 py-4 text-slate-600">{user.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-[1.75rem] border border-slate-200/80 bg-white p-6 shadow-[0_18px_50px_rgba(16,32,58,0.06)]">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-green">
            Add admin
          </p>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            The user-management workflow can be connected to the admin create/delete routes in the next pass.
          </p>
          <div className="mt-6 grid gap-4">
            <input
              placeholder="Name"
              className="h-12 rounded-2xl border border-slate-200 px-4 outline-none focus:border-brand-green focus:ring-4 focus:ring-brand-green/10"
            />
            <input
              placeholder="Email"
              className="h-12 rounded-2xl border border-slate-200 px-4 outline-none focus:border-brand-green focus:ring-4 focus:ring-brand-green/10"
            />
            <input
              placeholder="Temporary password"
              className="h-12 rounded-2xl border border-slate-200 px-4 outline-none focus:border-brand-green focus:ring-4 focus:ring-brand-green/10"
            />
            <button
              type="button"
              className="inline-flex h-11 w-fit items-center rounded-full bg-brand-green px-5 text-sm font-semibold text-white transition hover:bg-brand-green/95"
            >
              Add user
            </button>
          </div>
        </div>
      </section>
    </AdminShell>
  );
}
