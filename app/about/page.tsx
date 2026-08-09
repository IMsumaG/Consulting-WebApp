import { PublicShell } from "@/components/public/site-shell";
import { SectionHeading } from "@/components/public/blocks";
import { brand } from "@/lib/site-content";

export const metadata = {
  title: "About",
  description: "Learn about Merxano Consulting, our approach, and the work we do in Tanzania.",
};

export default function AboutPage() {
  return (
    <PublicShell>
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <SectionHeading
          eyebrow="About Merxano"
          title="A practical consulting partner for Tanzanian professionals and organisations"
          description="Merxano Consulting exists to make professional learning feel useful, grounded, and easy to act on."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[1.75rem] border border-slate-200/80 bg-white p-8 shadow-[0_18px_50px_rgba(16,32,58,0.06)]">
            <h3 className="text-xl font-semibold text-brand-navy">Background and purpose</h3>
            <p className="mt-4 text-sm leading-8 text-slate-600">
              Merxano was built for the reality of business learning in Tanzania: people want clear examples,
              direct advice, and training that respects their time. That is the standard we keep across the website
              and in the way the CMS is being shaped.
            </p>
            <p className="mt-4 text-sm leading-8 text-slate-600">
              The public site is intentionally simple to navigate, while the administration layer is being designed
              to make updates straightforward for the team behind the brand.
            </p>
          </div>
          <div className="grid gap-4">
            {[
              ["Mission", "Help professionals and organisations deliver better work through better learning."],
              ["Vision", "Be a trusted Tanzania-based brand for practical training and advisory support."],
              ["Values", "Clarity, usefulness, integrity, and thoughtful execution."],
              ["Location", brand.location],
            ].map(([title, text]) => (
              <div key={title} className="rounded-[1.5rem] border border-slate-200/80 bg-white p-6 shadow-[0_18px_50px_rgba(16,32,58,0.06)]">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-green">{title}</p>
                <p className="mt-3 text-sm leading-7 text-slate-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PublicShell>
  );
}
