import { notFound } from "next/navigation";
import { PublicShell } from "@/components/public/site-shell";
import { insights } from "@/lib/site-content";

export async function generateMetadata({ params }: any) {
  const article = insights.find((item) => item.slug === params.slug);
  return {
    title: article?.title ?? "Insight",
    description: article?.excerpt ?? "Merxano insight article",
  };
}

export default function InsightPage({ params }: any) {
  const article = insights.find((item) => item.slug === params.slug);
  if (!article) notFound();

  return (
    <PublicShell>
      <article className="mx-auto max-w-4xl px-6 py-16 lg:px-10">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-green">{article.category}</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-brand-navy">{article.title}</h1>
        <p className="mt-5 text-base leading-8 text-slate-600">{article.excerpt}</p>
        <div className="mt-10 grid gap-4 rounded-[1.75rem] border border-slate-200/80 bg-white p-8 shadow-[0_18px_50px_rgba(16,32,58,0.06)]">
          {article.body.map((paragraph) => (
            <p key={paragraph} className="text-base leading-8 text-slate-600">{paragraph}</p>
          ))}
        </div>
      </article>
    </PublicShell>
  );
}
