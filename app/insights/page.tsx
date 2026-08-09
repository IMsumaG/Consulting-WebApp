import Link from "next/link";
import { PublicShell } from "@/components/public/site-shell";
import { InsightCard, SectionHeading } from "@/components/public/blocks";
import { insights } from "@/lib/site-content";

export const metadata = {
  title: "Insights",
  description: "Read practical Merxano Consulting insights and updates.",
};

export default function InsightsPage() {
  return (
    <PublicShell>
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <SectionHeading
          eyebrow="Insights"
          title="Short, useful reads for people who like practical ideas"
          description="The blog avoids filler and keeps the focus on business improvement, learning, and delivery."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {insights.map((insight) => (
            <Link key={insight.slug} href={`/insights/${insight.slug}`}>
              <InsightCard insight={insight} />
            </Link>
          ))}
        </div>
      </section>
    </PublicShell>
  );
}
