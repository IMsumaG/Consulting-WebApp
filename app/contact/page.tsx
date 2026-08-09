import { PublicShell } from "@/components/public/site-shell";
import { InquiryForm } from "@/components/public/forms";
import { SectionHeading } from "@/components/public/blocks";

export const metadata = {
  title: "Contact",
  description: "Contact Merxano Consulting in Dar es Salaam, Tanzania.",
};

export default function ContactPage() {
  return (
    <PublicShell>
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <SectionHeading
          eyebrow="Contact"
          title="Talk to Merxano"
          description="Whether you need training, consulting, or a custom package, we’d love to hear from you."
        />
        <div className="mt-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[1.75rem] border border-slate-200/80 bg-white p-8 shadow-[0_18px_50px_rgba(16,32,58,0.06)]">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-green">Merxano Consulting</p>
            <div className="mt-5 grid gap-4 text-sm leading-7 text-slate-600">
              <p>Dar es Salaam, Tanzania</p>
              <p>+255 746 000 000</p>
              <p>training@merxano.co.tz</p>
            </div>
            <p className="mt-6 text-sm leading-7 text-slate-600">
              We usually reply with a clear next step rather than a vague “we’ll get back to you”.
            </p>
          </div>
          <InquiryForm endpoint="/api/contact" title="Send a message" intro="A short message is enough. Tell us what you need and we’ll pick it up from there." />
        </div>
      </section>
    </PublicShell>
  );
}
