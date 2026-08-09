import Link from "next/link";
import Image from "next/image";
import { PublicShell } from "@/components/public/site-shell";
import { CourseCard, InsightCard, SectionHeading, TestimonialCard } from "@/components/public/blocks";
import { brand, courses, insights, services, testimonials } from "@/lib/site-content";

export default function HomePage() {
  const featuredCourses = courses.filter((course) => course.featured);

  return (
    <PublicShell>
      <section className="relative overflow-hidden bg-brand-navy text-white">
        <div className="pointer-events-none absolute inset-0 opacity-[0.14] paper-grid" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:px-10 lg:py-24">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-3 text-[0.68rem] font-extrabold uppercase tracking-[0.2em] text-[#d4e496]"><span className="h-px w-9 bg-[#d4e496]" />{brand.location}</p>
            <h1 className="display-face mt-7 text-5xl leading-[0.95] tracking-[-0.055em] text-white sm:text-6xl lg:text-8xl">Make better work possible.</h1>
            <p className="mt-8 max-w-xl text-lg leading-8 text-white/70">Merxano gives professionals and organisations the practical confidence to lead, deliver, and make better decisions.</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/training" className="inline-flex items-center gap-3 rounded-full bg-[#d4e496] px-6 py-3.5 text-sm font-extrabold text-brand-navy transition hover:bg-white">Explore training <span>&rarr;</span></Link>
              <Link href="/corporate" className="inline-flex items-center gap-3 rounded-full border border-white/25 px-6 py-3.5 text-sm font-extrabold text-white transition hover:border-white hover:bg-white/10">For your team <span>&rarr;</span></Link>
            </div>
          </div>
          <aside className="relative min-h-[410px] overflow-hidden rounded-[2rem] bg-white text-brand-navy shadow-[0_30px_70px_rgba(0,0,0,0.18)] lg:mt-4">
            <div className="relative h-40 overflow-hidden bg-brand-navy"><Image src="/images/merxano-brand-panel.jpg" alt="Merxano Consulting" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" /></div>
            <div className="flex h-[250px] flex-col justify-between p-7">
              <div className="flex items-start justify-between"><span className="rounded-full bg-[#e2f0df] px-3 py-1.5 text-[0.62rem] font-extrabold uppercase tracking-[0.14em] text-brand-green">Next programme</span><span className="font-mono text-xs text-brand-green">01 / 03</span></div>
              <div className="max-w-xs"><p className="text-[0.68rem] font-extrabold uppercase tracking-[0.17em] text-brand-green">September 2026</p><p className="display-face mt-3 text-3xl leading-[1.02] tracking-[-0.04em]">Project Management Professional</p><div className="mt-5 grid grid-cols-2 gap-4 border-t border-brand-navy/10 pt-4 text-sm"><div><p className="text-slate-500">Format</p><p className="mt-1 font-bold">Hybrid</p></div><div><p className="text-slate-500">Investment</p><p className="mt-1 font-bold">TZS 650,000</p></div></div></div>
              <Link href="/training/project-management-professional" className="inline-flex w-fit items-center gap-2 text-sm font-extrabold text-brand-green transition hover:gap-3">View programme <span>&rarr;</span></Link>
            </div>
          </aside>
        </div>
      </section>

      <section className="relative z-10 mx-auto -mt-1 max-w-7xl px-6 lg:px-10">
        <div className="grid overflow-hidden rounded-b-[1.7rem] bg-white shadow-[0_18px_40px_rgba(17,42,53,0.08)] md:grid-cols-3">
          {services.map((service, index) => (
            <div key={service.title} className="border-b border-brand-navy/10 p-7 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0 sm:p-8">
              <span className="font-mono text-xs font-semibold text-brand-green">0{index + 1}</span>
              <h2 className="display-face mt-5 text-3xl leading-tight tracking-[-0.035em] text-brand-navy">{service.title}</h2>
              <p className="mt-3 max-w-sm text-sm leading-7 text-slate-600">{service.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end"><SectionHeading eyebrow="Featured training" title="Built for the work waiting on Monday" description="Focused learning paths for professionals who want knowledge they can put to use straight away." /><Link href="/training" className="inline-flex items-center gap-2 text-sm font-extrabold text-brand-green hover:text-brand-navy">All programmes <span>&rarr;</span></Link></div>
        <div className="mt-12 grid gap-5 lg:grid-cols-3">{featuredCourses.map((course) => <CourseCard key={course.slug} course={course} href={`/training/${course.slug}`} />)}</div>
      </section>

      <section className="bg-[#dce9ce]">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-[0.84fr_1.16fr] lg:px-10 lg:py-28">
          <div><p className="text-[0.68rem] font-extrabold uppercase tracking-[0.2em] text-brand-green">The Merxano approach</p><h2 className="display-face mt-5 text-5xl leading-[1.02] tracking-[-0.05em] text-brand-navy">Clear thinking, made useful.</h2><p className="mt-5 max-w-sm text-base leading-8 text-slate-600">We stay close to the context, cut through noise, and leave people with a practical way forward.</p></div>
          <div className="grid gap-0 border-t border-brand-navy/20">
            {["Start with the context, not a canned framework.", "Make complex work clear enough to act on.", "Leave teams with tools that stand up after the session."].map((item, index) => <div key={item} className="flex gap-6 border-b border-brand-navy/20 py-6 text-xl leading-8 text-brand-navy"><span className="font-mono text-xs font-bold text-brand-green">0{index + 1}</span><p className="display-face text-2xl leading-tight sm:text-3xl">{item}</p></div>)}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32"><SectionHeading eyebrow="Participant perspectives" title="Learning that changes practice" /><div className="mt-11 grid gap-5 lg:grid-cols-3">{testimonials.map((testimonial) => <TestimonialCard key={testimonial.authorName} testimonial={testimonial} />)}</div></section>

      <section className="border-y border-brand-navy/10 bg-white"><div className="mx-auto grid max-w-7xl gap-10 px-6 py-24 lg:grid-cols-[0.7fr_1.3fr] lg:px-10 lg:py-28"><SectionHeading eyebrow="Insights" title="Ideas for better work" description="Short, useful perspectives on delivery, professional growth, and building more capable organisations." /><div className="grid gap-5">{insights.map((insight) => <Link key={insight.slug} href={`/insights/${insight.slug}`}><InsightCard insight={insight} /></Link>)}</div></div></section>
    </PublicShell>
  );
}
