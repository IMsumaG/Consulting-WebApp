import { PublicShell } from "@/components/public/site-shell";
import { InquiryForm } from "@/components/public/forms";
import { SectionHeading } from "@/components/public/blocks";

export const metadata = {
  title: "Consulting",
  description: "Consulting and advisory support from Merxano Consulting.",
};

export default function ConsultingPage() {
  return (
    <PublicShell message="Hello, I'd like to request a consulting consultation.">
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <SectionHeading
          eyebrow="Consulting services"
          title="Clearer decisions, better structure, and calmer execution"
          description="Our consulting support is designed to help teams solve the problem in front of them without creating extra noise."
        />
        <div className="mt-10 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="grid gap-4">
            {[
              ["Problem framing", "Get a sharper view of what is really getting in the way."],
              ["Delivery support", "Turn ideas into practical next steps and a realistic plan."],
              ["Advisory support", "Use external perspective to make better decisions, faster."],
            ].map(([title, text]) => (
              <div key={title} className="rounded-[1.5rem] border border-slate-200/80 bg-white p-6 shadow-[0_18px_50px_rgba(16,32,58,0.06)]">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-green">{title}</p>
                <p className="mt-3 text-sm leading-7 text-slate-600">{text}</p>
              </div>
            ))}
          </div>
          <InquiryForm
            endpoint="/api/consulting"
            title="Request consulting support"
            intro="Tell us a little about the challenge and we’ll respond with the right next conversation."
          />
        </div>
      </section>
    </PublicShell>
  );
}
