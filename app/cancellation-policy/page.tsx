import { PublicShell } from "@/components/public/site-shell";

export default function CancellationPolicyPage() {
  return (
    <PublicShell>
      <section className="mx-auto max-w-4xl px-6 py-16 lg:px-10">
        <h1 className="text-4xl font-semibold text-brand-navy">Cancellation Policy</h1>
        <p className="mt-6 text-base leading-8 text-slate-600">
          Course cancellations and rescheduling are handled with clear communication and
          fair notice. Specific terms can be updated in the CMS as the business evolves.
        </p>
      </section>
    </PublicShell>
  );
}
