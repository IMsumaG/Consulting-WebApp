import { PublicShell } from "@/components/public/site-shell";
import { TestimonialForm } from "@/components/public/forms";
import { SectionHeading } from "@/components/public/blocks";

export default function TestimonialRequestPage({ searchParams }: any) {
  const token = searchParams?.token ?? "";

  return (
    <PublicShell>
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <SectionHeading
          eyebrow="Testimonial request"
          title="Share what the course was like for you"
          description="The form below is designed for participants who received a private invitation link."
        />
        <div className="mt-10">
          {token ? (
            <TestimonialForm token={token} courseTitle="Your Merxano course" />
          ) : (
            <div className="rounded-[1.75rem] border border-slate-200/80 bg-white p-8 shadow-[0_18px_50px_rgba(16,32,58,0.06)]">
              <p className="text-sm leading-7 text-slate-600">
                This page expects a valid invitation token in the URL. If you have been invited,
                open the link that was sent to you.
              </p>
            </div>
          )}
        </div>
      </section>
    </PublicShell>
  );
}
