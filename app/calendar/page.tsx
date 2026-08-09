import Link from "next/link";
import { PublicShell } from "@/components/public/site-shell";
import { SectionHeading } from "@/components/public/blocks";
import { courses } from "@/lib/site-content";

export const metadata = {
  title: "Calendar",
  description: "Merxano training calendar and upcoming cohort dates.",
};

export default function CalendarPage() {
  return (
    <PublicShell>
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <SectionHeading
          eyebrow="Training calendar"
          title="Upcoming cohorts at a glance"
          description="A calm, card-first calendar view that works well on mobile and desktop."
        />
        <div className="mt-10 grid gap-5">
          {courses.map((course) => (
            <div key={course.cohortId} className="grid gap-4 rounded-[1.75rem] border border-slate-200/80 bg-white p-6 shadow-[0_18px_50px_rgba(16,32,58,0.06)] lg:grid-cols-[1.1fr_0.8fr_0.7fr] lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-green">{course.category}</p>
                <h3 className="mt-2 text-xl font-semibold text-brand-navy">{course.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{course.overview}</p>
              </div>
              <div className="text-sm leading-7 text-slate-600">
                <p><span className="font-semibold text-slate-900">Dates:</span> {course.cohortDates}</p>
                <p><span className="font-semibold text-slate-900">Time:</span> {course.sessionTimes}</p>
                <p><span className="font-semibold text-slate-900">Venue:</span> {course.venue}</p>
              </div>
              <div className="flex flex-wrap gap-3 lg:justify-end">
                <Link href={`/booking/${course.cohortId}`} className="inline-flex h-11 items-center rounded-full bg-brand-green px-5 text-sm font-semibold text-white transition hover:bg-brand-green/95">
                  Book now
                </Link>
                <Link href={`/training/${course.slug}`} className="inline-flex h-11 items-center rounded-full border border-brand-navy/15 bg-white px-5 text-sm font-semibold text-brand-navy transition hover:bg-brand-navy/5">
                  View details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </PublicShell>
  );
}
