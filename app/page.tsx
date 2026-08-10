import Link from "next/link";
import { PublicShell } from "@/components/public/site-shell";
import { CourseCard, InsightCard, SectionHeading, StatChip, TestimonialCard } from "@/components/public/blocks";
import { brand, courses, insights, services, testimonials } from "@/lib/site-content";

export default function HomePage() {
  const featuredCourses = courses.filter((course) => course.featured);

  return (
    <PublicShell>
      <section className="relative overflow-hidden bg-[linear-gradient(135deg,#f7fbf7_0%,#eef6ef_45%,#fdfcf7_100%)] py-24 lg:py-32">
        <div className="hero-glow absolute inset-0" />
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-green/20 bg-white/80 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.24em] text-brand-green shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-green animate-pulse" />
              {brand.location}
            </span>
            <h1 className="mt-6 max-w-3xl text-4xl font-extrabold tracking-tight text-[#0f2d30] sm:text-5xl lg:text-6xl lg:leading-[1.04]">
              Clear strategy. Confident delivery.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#0f2d30]/75">
              Merxano helps professionals and organisations move from ideas to practical results with training, advisory support, and thoughtful execution.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/training" className="inline-flex items-center justify-center rounded-full bg-brand-navy px-8 py-3.5 text-sm font-bold uppercase tracking-[0.24em] text-white shadow-md transition duration-300 hover:-translate-y-0.5 hover:bg-[#15254d]">
                Explore training &rarr;
              </Link>
              <Link href="/corporate" className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-8 py-3.5 text-sm font-bold uppercase tracking-[0.24em] text-[#0f2d30] shadow-sm transition duration-300 hover:-translate-y-0.5 hover:bg-slate-50 hover:text-brand-green">
                For your team
              </Link>
            </div>
            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              <StatChip label="Years of delivery" value="10+" />
              <StatChip label="Programmes" value="20+" />
              <StatChip label="Client satisfaction" value="98%" />
            </div>
          </div>

          <div className="relative z-10">
            <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-brand-green/10 via-transparent to-brand-navy/10 blur-3xl" />
            <div className="relative overflow-hidden rounded-[32px] border border-slate-200/70 bg-white/90 p-7 shadow-[0_30px_90px_-35px_rgba(15,45,48,0.28)] backdrop-blur lg:p-8">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-brand-green/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.24em] text-brand-green">
                  Next cohort
                </span>
                <span className="text-xs font-semibold uppercase tracking-[0.24em] text-[#0f2d30]/50">September 2026</span>
              </div>
              <div className="mt-8 rounded-[24px] bg-[#0f2d30] p-7 text-white">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/60">Featured programme</p>
                <h3 className="mt-3 text-2xl font-bold tracking-tight">Project Management Professional</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/75">A practical pathway for professionals leading delivery, coordinating teams, and strengthening project confidence.</p>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#0f2d30]/50">Format</p>
                  <p className="mt-2 text-sm font-bold text-[#0f2d30]">Hybrid</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#0f2d30]/50">Investment</p>
                  <p className="mt-2 text-sm font-bold text-[#0f2d30]">TZS 650,000</p>
                </div>
              </div>
              <Link href="/training/project-management-professional" className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-brand-green px-5 py-3 text-sm font-bold uppercase tracking-[0.24em] text-white transition duration-300 hover:bg-[#246327]">
                View programme &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto -mt-6 max-w-7xl px-6 lg:px-8">
        <div className="rounded-[32px] border border-slate-200/70 bg-white p-8 shadow-[0_20px_70px_-30px_rgba(15,45,48,0.2)] lg:p-10">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="Our services"
              title="Support built around the work your team needs to do"
              description="From practical training to strategic advisory support, every engagement is designed to move people and organisations forward."
            />
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {services.map((service, index) => (
              <div key={service.title} className="rounded-[24px] border border-slate-200/70 bg-slate-50 p-6 transition duration-300 hover:border-brand-green/20 hover:bg-white">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-green/10 text-sm font-bold text-brand-green">
                  0{index + 1}
                </span>
                <h3 className="mt-6 text-xl font-bold tracking-tight text-[#0f2d30]">{service.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#0f2d30]/70">{service.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[32px] bg-gradient-to-br from-brand-navy to-[#17335d] p-8 text-white shadow-[0_20px_70px_-30px_rgba(13,27,61,0.7)]">
            <span className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-white/80">
              Why teams choose us
            </span>
            <h2 className="mt-6 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Practical support that feels calm, clear, and useful.
            </h2>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                <p className="text-2xl font-bold">90%</p>
                <p className="mt-2 text-sm text-white/70">Clients report stronger team confidence after engagement</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                <p className="text-2xl font-bold">24/7</p>
                <p className="mt-2 text-sm text-white/70">Flexible follow-up and implementation support</p>
              </div>
            </div>
          </div>

          <div className="rounded-[32px] border border-slate-200/70 bg-white p-8 shadow-[0_20px_70px_-30px_rgba(15,45,48,0.14)]">
            <SectionHeading
              eyebrow="Our approach"
              title="Designing learning around your realities"
              description="We balance structure and flexibility so the outcome feels relevant from day one."
            />
            <div className="mt-8 space-y-4">
              {[
                "Start with the context, not a generic framework.",
                "Turn complex issues into practical next steps.",
                "Leave teams with tools they can use immediately."
              ].map((item, index) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl border border-slate-200/70 bg-slate-50 p-4">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-green/10 text-sm font-bold text-brand-green">
                    0{index + 1}
                  </span>
                  <p className="text-sm font-semibold leading-relaxed text-[#0f2d30]">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Featured training"
            title="Built for the work waiting on Monday"
            description="Focused learning paths for professionals who want knowledge they can put to use straight away."
          />
          <Link href="/training" className="inline-flex items-center gap-2 text-sm font-bold text-brand-green transition hover:text-[#246327]">
            All programmes <span>&rarr;</span>
          </Link>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredCourses.map((course) => (
            <CourseCard key={course.slug} course={course} href={`/training/${course.slug}`} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
        <SectionHeading eyebrow="Participant perspectives" title="Learning that changes practice" />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.authorName} testimonial={testimonial} />
          ))}
        </div>
      </section>

      <section className="border-t border-slate-200/70 bg-slate-50/70 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-4">
              <SectionHeading
                eyebrow="Insights"
                title="Ideas for better work"
                description="Short, useful perspectives on delivery, professional growth, and building more capable organisations."
              />
            </div>
            <div className="lg:col-span-8">
              <div className="grid gap-6 sm:grid-cols-2">
                {insights.map((insight) => (
                  <Link key={insight.slug} href={`/insights/${insight.slug}`} className="block h-full">
                    <InsightCard insight={insight} />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </PublicShell>
  );
}

