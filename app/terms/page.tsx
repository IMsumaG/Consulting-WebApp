import { PublicShell } from "@/components/public/site-shell";

export default function TermsPage() {
  return (
    <PublicShell>
      <section className="mx-auto max-w-4xl px-6 py-16 lg:px-10">
        <h1 className="text-4xl font-semibold text-brand-navy">Terms of Use</h1>
        <p className="mt-6 text-base leading-8 text-slate-600">
          By using the website, you agree to reasonable use of the content, forms, and
          services provided by Merxano Consulting.
        </p>
      </section>
    </PublicShell>
  );
}
