import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { auth } from "@/auth";
import { AdminControls } from "@/components/admin/admin-controls";

const navigation = [
  ["Dashboard", "/admin/dashboard", "Overview"],
  ["Courses", "/admin/courses", "Learning catalogue"],
  ["Cohorts", "/admin/cohorts", "Schedule & capacity"],
  ["Bookings", "/admin/bookings", "Participants & payments"],
  ["Testimonials", "/admin/testimonials", "Participant feedback"],
  ["Insights", "/admin/insights", "Articles & resources"],
  ["Hero", "/admin/hero", "Homepage content"],
  ["Settings", "/admin/settings", "Company information"],
  ["Newsletter", "/admin/newsletter", "Audience list"],
  ["Users", "/admin/users", "Admin access"],
] as const;

type NavigationHref = (typeof navigation)[number][1];

function NavigationLinks({
  active,
  sidebarBadges,
  compact = false,
}: {
  active: string;
  sidebarBadges?: Partial<Record<NavigationHref, string | number>>;
  compact?: boolean;
}) {
  return navigation.map(([label, href, description]) => {
    const isActive = active === href || active.startsWith(`${href}/`);
    const badge = sidebarBadges?.[href];
    return (
      <Link
        key={href}
        href={href}
        title={description}
        className={`rounded-xl px-3 py-2.5 text-sm font-bold transition ${compact ? "text-xs" : ""} ${isActive ? "bg-white text-brand-navy shadow-sm" : "text-white/70 hover:bg-white/10 hover:text-white"}`}
      >
        <span className="flex items-center justify-between gap-3">
          <span>{label}</span>
          {badge !== undefined ? <span className={`rounded-full px-2 py-0.5 text-[10px] font-extrabold ${isActive ? "bg-brand-green/10 text-brand-green" : "bg-white/15 text-white"}`}>{badge}</span> : null}
        </span>
      </Link>
    );
  });
}

export async function AdminShell({
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
  sidebarBadges?: Partial<Record<NavigationHref, string | number>>;
}) {
  const session = await auth();
  const publicSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000/";

  const actionButton = action ? (
    action.href.startsWith("/") ? (
      <Link href={action.href} className="inline-flex h-11 w-full shrink-0 items-center justify-center rounded-full bg-brand-green px-5 text-sm font-extrabold text-white visited:text-white hover:bg-[#246327] hover:text-white sm:w-auto">
        {action.label} <span className="ml-2">&rarr;</span>
      </Link>
    ) : (
      <a href={action.href} className="inline-flex h-11 w-full shrink-0 items-center justify-center rounded-full bg-brand-green px-5 text-sm font-extrabold text-white visited:text-white hover:bg-[#246327] hover:text-white sm:w-auto">
        {action.label} <span className="ml-2">&rarr;</span>
      </a>
    )
  ) : null;

  return (
    <div className="min-h-screen bg-[#f3f7f5] text-slate-900">
      <header className="relative z-50 border-b border-brand-navy/10 bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-3 px-4 py-2.5 sm:gap-5 sm:px-5 sm:py-3 lg:px-8">
          <Link href="/admin/dashboard" className="flex shrink-0 items-center" aria-label="Merxano admin dashboard">
            <Image src="/images/merxano-logo.jpg" alt="Merxano Consulting" width={480} height={340} priority className="h-9 w-auto object-contain mix-blend-multiply sm:h-12" />
          </Link>
          <AdminControls name={session?.user?.name} email={session?.user?.email} publicSiteUrl={publicSiteUrl} />
        </div>
      </header>

      <div className="mx-auto max-w-[1600px] px-4 pt-4 sm:px-5 lg:hidden">
        <details className="group rounded-2xl border border-brand-navy/10 bg-white shadow-[0_10px_30px_rgba(13,27,61,0.05)]">
          <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3.5 text-sm font-extrabold text-brand-navy marker:hidden">
            <span>Admin navigation</span><span className="text-brand-green transition group-open:rotate-180" aria-hidden="true">⌄</span>
          </summary>
          <nav className="grid grid-cols-2 gap-2 border-t border-brand-navy/10 p-3" aria-label="Admin navigation">
            {navigation.map(([label, href]) => {
              const isActive = active === href || active.startsWith(`${href}/`);
              const badge = sidebarBadges?.[href];
              return <Link key={href} href={href} className={`rounded-xl px-3 py-3 text-xs font-extrabold transition ${isActive ? "bg-brand-navy text-white" : "bg-slate-50 text-slate-600 hover:bg-brand-green/10 hover:text-brand-green"}`}><span className="flex items-center justify-between gap-2"><span>{label}</span>{badge !== undefined ? <span className={`rounded-full px-1.5 py-0.5 text-[9px] ${isActive ? "bg-white/15 text-white" : "bg-brand-green/10 text-brand-green"}`}>{badge}</span> : null}</span></Link>;
            })}
          </nav>
        </details>
      </div>

      <div className="mx-auto grid max-w-[1600px] gap-7 px-4 py-5 sm:px-5 sm:py-6 lg:grid-cols-[260px_minmax(0,1fr)] lg:px-8 lg:py-8">
        <aside className="hidden self-start lg:sticky lg:top-6 lg:block">
          <div className="rounded-[1.7rem] bg-brand-navy p-4 text-white shadow-[0_20px_50px_rgba(13,27,61,0.2)]">
            <div className="border-b border-white/15 px-3 pb-4 pt-2">
              <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.2em] text-[#b9dfad]">Merxano workspace</p>
              <p className="mt-2 text-lg font-extrabold tracking-tight">Manage the work behind the work.</p>
            </div>
            <nav className="mt-3 grid gap-1" aria-label="Admin navigation">
              <NavigationLinks active={active} sidebarBadges={sidebarBadges} />
            </nav>
            <a href={publicSiteUrl} target="_blank" rel="noreferrer" className="mt-4 flex items-center justify-between rounded-xl border border-white/15 px-3 py-3 text-xs font-extrabold uppercase tracking-[0.12em] text-[#b9dfad] transition hover:bg-white/10">
              Public site <span aria-hidden="true">&#8599;</span>
            </a>
          </div>
        </aside>

        <main className="min-w-0">
          <section className="relative overflow-hidden rounded-[1.5rem] border border-brand-navy/10 bg-white p-5 shadow-[0_14px_45px_rgba(13,27,61,0.07)] sm:rounded-[1.7rem] sm:p-8">
            <div className="absolute right-0 top-0 h-20 w-20 rounded-bl-[4rem] bg-[#e4f1dd] sm:h-28 sm:w-28 sm:rounded-bl-[5rem]" />
            <div className="relative flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-[0.68rem] font-extrabold uppercase tracking-[0.2em] text-brand-green">Merxano admin</p>
                <h1 className="mt-3 text-3xl font-extrabold tracking-[-0.04em] text-brand-navy sm:text-4xl">{title}</h1>
                <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">{subtitle}</p>
              </div>
              {actionButton}
            </div>
          </section>

          {stats?.length ? <section className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{stats.map((stat) => <div key={stat.label} className="rounded-[1.4rem] border border-brand-navy/10 bg-white p-5 shadow-[0_10px_30px_rgba(13,27,61,0.045)]"><p className="text-[0.65rem] font-extrabold uppercase tracking-[0.18em] text-slate-500">{stat.label}</p><p className="mt-3 text-3xl font-extrabold tracking-[-0.04em] text-brand-navy">{stat.value}</p>{stat.hint ? <p className="mt-2 text-sm leading-6 text-slate-500">{stat.hint}</p> : null}</div>)}</section> : null}

          <div className="mt-5">{children}</div>
        </main>
      </div>
    </div>
  );
}
