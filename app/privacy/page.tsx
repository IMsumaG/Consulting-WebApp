import { PublicShell } from "@/components/public/site-shell";

export default function PrivacyPage() {
  return (
    <PublicShell>
      <section className="mx-auto max-w-4xl px-6 py-16 lg:px-10">
        <h1 className="text-4xl font-semibold text-brand-navy">Privacy Policy</h1>
        <p className="mt-6 text-base leading-8 text-slate-600">
          We only collect the information needed to handle enquiries, bookings, and updates.
          We do not sell your data.
        </p>
      </section>
    </PublicShell>
  );
}
