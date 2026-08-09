import Link from "next/link";
import { notFound } from "next/navigation";
import { PublicShell } from "@/components/public/site-shell";
import { SectionHeading, TestimonialCard } from "@/components/public/blocks";
import { courses, testimonials } from "@/lib/site-content";

export async function generateMetadata({ params }: any) {
  const course = courses.find((item) => item.slug === params.slug);
  return {
    title: course?.title ?? "Training",
    description: course?.overview ?? "Merxano training programme details.",
  };
}

export default function CoursePage({ params }: any) {
  const course = courses.find((item) => item.slug === params.slug);
  if (!course) {
    notFound();
  }

  return (
    <PublicShell message={`Hello, I'm interested in ${course.title} starting ${course.cohortDates}. Please assist me with registration.`}>
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-green">{course.category}</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-brand-navy sm:text-5xl">{course.title}</h1>
            <p className="mt-6 text-lg leading-8 text-slate-600">{course.overview}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={`/booking/${course.cohortId}`} className="inline-flex h-12 items-center rounded-full bg-brand-green px-6 text-sm font-semibold text-white transition hover:bg-brand-green/95">
                Book now
              </Link>
              <Link href="/calendar" className="inline-flex h-12 items-center rounded-full border border-brand-navy/15 bg-white px-6 text-sm font-semibold text-brand-navy transition hover:bg-brand-navy/5">
                View calendar
              </Link>
            </div>
          </div>
          <div className="rounded-[1.75rem] border border-slate-200/80 bg-white p-7 shadow-[0_18px_50px_rgba(16,32,58,0.06)]">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-green">Next cohort</p>
            <div className="mt-5 grid gap-4 text-sm text-slate-600">
              <p><span className="font-semibold text-slate-900">Status:</span> {course.cohortLabel}</p>
              <p><span className="font-semibold text-slate-900">Dates:</span> {course.cohortDates}</p>
              <p><span className="font-semibold text-slate-900">Time:</span> {course.sessionTimes}</p>
              <p><span className="font-semibold text-slate-900">Venue:</span> {course.venue}</p>
              <p><span className="font-semibold text-slate-900">Fee:</span> {course.fee}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-8 lg:px-10">
        <SectionHeading
          eyebrow="Testimonials"
          title="What learners say about Merxano-style training"
          description="The section stays empty if there are no testimonials in the CMS later. For now, it gives the page some human texture."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {testimonials.slice(0, 3).map((testimonial) => (
            <TestimonialCard key={testimonial.authorName} testimonial={testimonial} />
          ))}
        </div>
      </section>
    </PublicShell>
  );
}
