import Link from "next/link";
import type { ReactNode } from "react";

const navigation = [
  ["Dashboard", "/admin/dashboard"],
  ["Courses", "/admin/courses"],
  ["Cohorts", "/admin/cohorts"],
  ["Bookings", "/admin/bookings"],
  ["Testimonials", "/admin/testimonials"],
  ["Insights", "/admin/insights"],
  ["Hero", "/admin/hero"],
  ["Settings", "/admin/settings"],
  ["Newsletter", "/admin/newsletter"],
  ["Users", "/admin/users"],
] as const;

export function AdminShell({
  title,
  subtitle,
  children,
  stats,
  active = "/admin/dashboard",
  action,
  sidebarBadges,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  stats?: Array<{ label: string; value: string; hint?: string }>;
  active?: string;
  action?: { href: string; label: string };
  sidebarBadges?: Partial<Record<(typeof navigation)[number][1], string | number>>;
}) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(26,46,94,0.08),_transparent_30%),linear-gradient(180deg,#f8fbff_0%,#eef3fb_100%)] text-slate-900">
      <div className="mx-auto grid max-w-[1600px] gap-6 px-4 py-4 lg:grid-cols-[280px_minmax(0,1fr)] lg:px-6">
        <aside className="rounded-[2rem] border border-slate-200/80 bg-white/90 p-5 shadow-[0_18px_50px_rgba(16,32,58,0.07)] backdrop-blur">
          <div className="rounded-[1.5rem] bg-brand-navy p-5 text-white">
            <p className="text-xs uppercase tracking-[0.28em] text-white/60">Merxano</p>
            <h1 className="mt-3 text-2xl font-semibold tracking-tight">{title}</h1>
            <p className="mt-2 text-sm leading-7 text-white/74">{subtitle}</p>
          </div>
          <nav className="mt-6 grid gap-2">
            {navigation.map(([label, href]) => {
              const isActive = active === href || active.startsWith(href + "/");
              const badge = sidebarBadges?.[href];
              return (
                <Link
                  key={href}
                  href={href}
                  className={`rounded-2xl px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-brand-navy text-white shadow-[0_14px_32px_rgba(26,46,94,0.16)]"
                      : "bg-slate-50 text-slate-600 hover:bg-brand-navy/5 hover:text-brand-navy"
                  }`}
                >
                  <span className="flex items-center justify-between gap-3">
                    <span>{label}</span>
                    {badge !== undefined ? (
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                          isActive ? "bg-white/15 text-white" : "bg-brand-green/10 text-brand-green"
                        }`}
                      >
                        {badge}
                      </span>
                    ) : null}
                  </span>
                </Link>
              );
            })}
          </nav>
        </aside>

        <main className="grid gap-6">
          <div className="rounded-[2rem] border border-slate-200/80 bg-white/90 p-6 shadow-[0_18px_50px_rgba(16,32,58,0.07)] backdrop-blur">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-green">
                  Admin dashboard
                </p>
                <h2 className="mt-2 text-3xl font-semibold tracking-tight text-brand-navy">
                  {title}
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">{subtitle}</p>
              </div>
              {action ? (
                action.href.startsWith("/") ? (
                  <Link
                    href={action.href}
                    className="inline-flex h-11 items-center rounded-full bg-brand-green px-5 text-sm font-semibold text-white transition hover:bg-brand-green/95"
                  >
                    {action.label}
                  </Link>
                ) : (
                  <a
                    href={action.href}
                    className="inline-flex h-11 items-center rounded-full bg-brand-green px-5 text-sm font-semibold text-white transition hover:bg-brand-green/95"
                  >
                    {action.label}
                  </a>
                )
              ) : null}
            </div>
          </div>

          {stats?.length ? (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-[1.5rem] border border-slate-200/80 bg-white p-5 shadow-[0_18px_50px_rgba(16,32,58,0.06)]"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                    {stat.label}
                  </p>
                  <p className="mt-3 text-3xl font-semibold text-brand-navy">{stat.value}</p>
                  {stat.hint ? (
                    <p className="mt-2 text-sm leading-6 text-slate-500">{stat.hint}</p>
                  ) : null}
                </div>
              ))}
            </div>
          ) : null}

          {children}
        </main>
      </div>
    </div>
  );
}
