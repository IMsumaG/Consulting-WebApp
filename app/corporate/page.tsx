import { PublicShell } from "@/components/public/site-shell";
import { InquiryForm } from "@/components/public/forms";
import { SectionHeading } from "@/components/public/blocks";

export const metadata = {
  title: "Corporate Training",
  description: "Corporate training and team upskilling for organisations in Tanzania.",
};

export default function CorporatePage() {
  return (
    <PublicShell message="Hello, I'd like to discuss corporate training for my organisation.">
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <SectionHeading
          eyebrow="Corporate training"
          title="Training built around your team, not the other way around"
          description="We shape sessions around your goals, your context, and the pace your team can actually absorb."
        />
        <div className="mt-10 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="grid gap-4">
            {[
              ["Capability review", "Understand where the gaps are before designing the intervention."],
              ["Tailored delivery", "Select the best mix of workshop, coaching, and practical exercises."],
              ["Outcome focus", "Keep the engagement tied to measurable workplace improvement."],
            ].map(([title, text]) => (
              <div key={title} className="rounded-[1.5rem] border border-slate-200/80 bg-white p-6 shadow-[0_18px_50px_rgba(16,32,58,0.06)]">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-green">{title}</p>
                <p className="mt-3 text-sm leading-7 text-slate-600">{text}</p>
              </div>
            ))}
          </div>
          <InquiryForm
            endpoint="/api/corporate"
            title="Request corporate training"
            intro="Share a few details about your organisation and the area you want to strengthen."
          />
        </div>
      </section>
    </PublicShell>
  );
}
