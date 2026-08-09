import Link from "next/link";
import { PublicShell } from "@/components/public/site-shell";
import { CourseCard, SectionHeading } from "@/components/public/blocks";
import { courses } from "@/lib/site-content";

export const metadata = {
  title: "Training",
  description: "Browse Merxano Consulting training programmes.",
};

export default function TrainingPage() {
  return (
    <PublicShell>
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <SectionHeading
          eyebrow="Training programmes"
          title="Focused programmes with clear outcomes"
          description="These are the core Merxano programmes currently highlighted on the public site."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {courses.map((course) => (
            <CourseCard key={course.slug} course={course} href={`/training/${course.slug}`} />
          ))}
        </div>
        <div className="mt-12 rounded-[1.75rem] border border-slate-200/80 bg-white p-6 text-sm leading-7 text-slate-600 shadow-[0_18px_50px_rgba(16,32,58,0.06)]">
          Looking for a custom cohort? <Link href="/corporate" className="font-semibold text-brand-green">Request corporate training</Link>.
        </div>
      </section>
    </PublicShell>
  );
}
