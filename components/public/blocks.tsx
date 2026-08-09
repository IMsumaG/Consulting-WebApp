import Link from "next/link";
import type { PublicCourse, InsightArticle, Testimonial } from "@/lib/site-content";

export function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return (
    <div className="max-w-2xl">
      <p className="text-[0.68rem] font-extrabold uppercase tracking-[0.2em] text-brand-green">{eyebrow}</p>
      <h2 className="display-face mt-4 text-4xl leading-[1.02] tracking-[-0.045em] text-brand-navy sm:text-5xl">{title}</h2>
      {description ? <p className="mt-5 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">{description}</p> : null}
    </div>
  );
}

export function StatChip({ label, value }: { label: string; value: string }) {
  return <div className="border-t border-white/20 pt-4"><p className="text-[0.68rem] font-extrabold uppercase tracking-[0.16em] text-white/45">{label}</p><p className="mt-2 text-sm font-bold leading-6 text-white">{value}</p></div>;
}

export function CourseCard({ course, href }: { course: PublicCourse; href?: string }) {
  const content = (
    <>
      <div className="flex items-start justify-between gap-4">
        <p className="text-[0.68rem] font-extrabold uppercase tracking-[0.16em] text-brand-green">{course.category}</p>
        <span className="rounded-full bg-[#e5efdc] px-3 py-1 text-[0.62rem] font-extrabold tracking-[0.08em] text-brand-navy">{course.deliveryMode}</span>
      </div>
      <h3 className="display-face mt-7 text-3xl leading-[1.05] tracking-[-0.035em] text-brand-navy">{course.title}</h3>
      <p className="mt-4 text-sm leading-7 text-slate-600">{course.overview}</p>
      <div className="mt-7 grid grid-cols-2 gap-x-5 border-t border-brand-navy/10 pt-5 text-sm">
        <div><p className="text-xs font-medium text-slate-500">Duration</p><p className="mt-1 font-bold text-brand-navy">{course.duration}</p></div>
        <div><p className="text-xs font-medium text-slate-500">Investment</p><p className="mt-1 font-bold text-brand-navy">{course.fee}</p></div>
      </div>
      {href ? <span className="mt-7 inline-flex items-center gap-2 text-sm font-extrabold text-brand-green">Explore programme <span className="transition group-hover:translate-x-1">&rarr;</span></span> : null}
    </>
  );
  const className = "group block rounded-[1.6rem] border border-brand-navy/10 bg-white p-7 transition duration-300 hover:-translate-y-1.5 hover:border-brand-green/30 hover:shadow-[0_22px_45px_rgba(17,42,53,0.1)] sm:p-8";
  return href ? <Link href={href} className={className}>{content}</Link> : <div className={className}>{content}</div>;
}

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="rounded-[1.5rem] border border-brand-navy/10 bg-white p-7 shadow-[0_10px_28px_rgba(17,42,53,0.045)]">
      <span className="display-face text-6xl leading-none text-brand-green/50">&ldquo;</span>
      <blockquote className="mt-1 text-base leading-8 text-slate-700">{testimonial.message}</blockquote>
      <figcaption className="mt-7 flex items-center gap-3 border-t border-slate-100 pt-4">
        <span className="grid h-9 w-9 place-items-center rounded-full bg-[#e7efdf] text-xs font-extrabold text-brand-green">{testimonial.authorName.charAt(0)}</span>
        <span><p className="text-sm font-extrabold text-brand-navy">{testimonial.authorName}</p><p className="mt-0.5 text-xs text-slate-500">{testimonial.role}, {testimonial.company}</p></span>
      </figcaption>
    </figure>
  );
}

export function InsightCard({ insight }: { insight: InsightArticle }) {
  return (
    <article className="group rounded-[1.4rem] border border-brand-navy/10 bg-white p-6 transition hover:-translate-y-0.5 hover:border-brand-green/35 hover:shadow-[0_18px_35px_rgba(17,42,53,0.07)]">
      <div className="flex items-center justify-between gap-5"><p className="text-[0.68rem] font-extrabold uppercase tracking-[0.16em] text-brand-green">{insight.category}</p><span className="text-xs font-medium text-slate-400">{new Date(insight.date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</span></div>
      <h3 className="display-face mt-4 text-3xl leading-[1.06] tracking-[-0.035em] text-brand-navy">{insight.title}</h3>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">{insight.excerpt}</p>
      <span className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-brand-green">Read article <span className="transition group-hover:translate-x-1">&rarr;</span></span>
    </article>
  );
}
