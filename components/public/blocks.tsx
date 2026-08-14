import Link from "next/link";
import Image from "next/image";
import type { PublicCourse, InsightArticle, Testimonial } from "@/lib/site-content";

export function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return (
    <div className="max-w-3xl">
      <span className="inline-flex items-center gap-2 rounded-full bg-brand-green/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-brand-green">
        {eyebrow}
      </span>
      <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#0f2d30] sm:text-4xl md:text-5xl md:leading-[1.15]">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-[#0f2d30]/70 sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}

export function StatChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200/70 bg-white/70 p-4 shadow-sm backdrop-blur-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#0f2d30]/60">{label}</p>
      <p className="mt-1 text-xl font-bold text-[#0f2d30]">{value}</p>
    </div>
  );
}

export function CourseCard({ course, href }: { course: PublicCourse; href?: string }) {
  const content = (
    <div className="flex h-full flex-col justify-between">
      <div>
        <div className="relative -mx-6 -mt-6 mb-6 aspect-[16/10] overflow-hidden rounded-t-[24px] bg-slate-100 sm:-mx-8 sm:-mt-8">
          <Image
            src={course.imageUrl}
            alt={`${course.title} training`}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/25 via-transparent to-transparent" />
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="text-xs font-bold uppercase tracking-[0.24em] text-brand-green">
            {course.category}
          </span>
          <span className="rounded-full bg-brand-navy/5 px-3 py-1 text-xs font-semibold text-brand-navy">
            {course.deliveryMode}
          </span>
        </div>
        <h3 className="mt-6 text-xl font-bold tracking-tight text-[#0f2d30] transition duration-300 group-hover:text-brand-green">
          {course.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-[#0f2d30]/70">
          {course.overview}
        </p>
      </div>

      <div className="mt-6 border-t border-slate-100 pt-5">
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div>
            <p className="font-semibold text-[#0f2d30]/50">Duration</p>
            <p className="mt-1 font-bold text-[#0f2d30]">{course.duration}</p>
          </div>
          <div>
            <p className="font-semibold text-[#0f2d30]/50">Investment</p>
            <p className="mt-1 font-bold text-[#0f2d30]">{course.fee}</p>
          </div>
        </div>

        {href ? (
          <div className="mt-6 flex items-center justify-between text-sm font-bold text-brand-green transition group-hover:text-[#246327]">
            <span>Explore Course</span>
            <span className="translate-x-0 transition duration-300 group-hover:translate-x-1">&rarr;</span>
          </div>
        ) : null}
      </div>
    </div>
  );

  const className = "group block h-full rounded-[24px] border border-slate-200/70 bg-white p-6 transition duration-300 premium-shadow hover:-translate-y-1 hover:border-brand-green/20 hover:shadow-[0_16px_50px_-14px_rgba(15,45,48,0.16)] sm:p-8";
  return href ? <Link href={href} className={className}>{content}</Link> : <div className={className}>{content}</div>;
}

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="flex h-full flex-col justify-between rounded-[24px] border border-slate-200/70 bg-white p-6 premium-shadow sm:p-8">
      <div>
        <div className="flex gap-1 text-4xl font-serif leading-none text-brand-green/40">&ldquo;</div>
        <blockquote className="-mt-2 text-sm leading-relaxed text-[#0f2d30]/80">
          {testimonial.message}
        </blockquote>
      </div>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-4">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-green/10 text-xs font-bold text-brand-green">
          {testimonial.authorName.charAt(0)}
        </span>
        <div className="overflow-hidden">
          <p className="truncate text-sm font-bold text-[#0f2d30]">{testimonial.authorName}</p>
          <p className="truncate text-xs text-[#0f2d30]/60">{testimonial.role}, {testimonial.company}</p>
        </div>
      </figcaption>
    </figure>
  );
}

export function InsightCard({ insight }: { insight: InsightArticle }) {
  return (
    <article className="group flex h-full flex-col justify-between rounded-[24px] border border-slate-200/70 bg-white p-6 premium-shadow transition duration-300 hover:-translate-y-1 hover:border-brand-green/20 hover:shadow-[0_16px_50px_-14px_rgba(15,45,48,0.16)]">
      <div>
        <div className="flex items-center justify-between gap-5">
          <span className="text-xs font-bold uppercase tracking-[0.24em] text-brand-green">{insight.category}</span>
          <span className="text-xs text-[#0f2d30]/50">
            {new Date(insight.date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
          </span>
        </div>
        <h3 className="mt-4 text-xl font-bold tracking-tight text-[#0f2d30] transition duration-300 group-hover:text-brand-green">
          {insight.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-[#0f2d30]/70">
          {insight.excerpt}
        </p>
      </div>
      <div className="mt-6 flex items-center justify-between text-sm font-bold text-brand-green transition group-hover:text-[#246327]">
        <span>Read Article</span>
        <span className="translate-x-0 transition duration-300 group-hover:translate-x-1">&rarr;</span>
      </div>
    </article>
  );
}
