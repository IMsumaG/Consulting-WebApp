"use client";

import { useState, useTransition } from "react";

type HeroData = {
  headline: string;
  subheadline: string;
  ctaText: string;
  ctaLink: string;
  backgroundImageUrl: string | null;
};

export function HeroEditor({ initial }: { initial: HeroData }) {
  const [headline, setHeadline] = useState(initial.headline);
  const [subheadline, setSubheadline] = useState(initial.subheadline);
  const [ctaText, setCtaText] = useState(initial.ctaText);
  const [ctaLink, setCtaLink] = useState(initial.ctaLink);
  const [backgroundImageUrl, setBackgroundImageUrl] = useState(initial.backgroundImageUrl ?? "");
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();

  const save = () => {
    setError("");
    setSaved(false);
    startTransition(async () => {
      const response = await fetch("/api/hero", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          headline,
          subheadline,
          ctaText,
          ctaLink,
          backgroundImageUrl: backgroundImageUrl || null,
        }),
      });
      const payload = await response.json();
      if (!response.ok || !payload.success) {
        setError(payload.error ?? "Unable to save hero section.");
        return;
      }
      setSaved(true);
    });
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
      <section className="rounded-[1.75rem] border border-slate-200/80 bg-white p-6 shadow-[0_18px_50px_rgba(16,32,58,0.06)]">
        <div className="grid gap-4">
          <label className="grid gap-2 text-sm font-medium text-slate-700">
            Headline
            <input
              value={headline}
              onChange={(event) => setHeadline(event.target.value)}
              className="h-12 rounded-2xl border border-slate-200 px-4 outline-none focus:border-brand-green focus:ring-4 focus:ring-brand-green/10"
            />
          </label>
          <label className="grid gap-2 text-sm font-medium text-slate-700">
            Subheadline
            <textarea
              value={subheadline}
              onChange={(event) => setSubheadline(event.target.value)}
              rows={4}
              className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-brand-green focus:ring-4 focus:ring-brand-green/10"
            />
          </label>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-2 text-sm font-medium text-slate-700">
              CTA text
              <input
                value={ctaText}
                onChange={(event) => setCtaText(event.target.value)}
                className="h-12 rounded-2xl border border-slate-200 px-4 outline-none focus:border-brand-green focus:ring-4 focus:ring-brand-green/10"
              />
            </label>
            <label className="grid gap-2 text-sm font-medium text-slate-700">
              CTA link
              <input
                value={ctaLink}
                onChange={(event) => setCtaLink(event.target.value)}
                className="h-12 rounded-2xl border border-slate-200 px-4 outline-none focus:border-brand-green focus:ring-4 focus:ring-brand-green/10"
              />
            </label>
          </div>
          <label className="grid gap-2 text-sm font-medium text-slate-700">
            Background image URL
            <input
              value={backgroundImageUrl}
              onChange={(event) => setBackgroundImageUrl(event.target.value)}
              className="h-12 rounded-2xl border border-slate-200 px-4 outline-none focus:border-brand-green focus:ring-4 focus:ring-brand-green/10"
            />
          </label>
          {error ? (
            <p className="rounded-2xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-700">
              {error}
            </p>
          ) : null}
          <button
            type="button"
            onClick={save}
            disabled={pending}
            className="inline-flex h-11 w-fit items-center rounded-full bg-brand-green px-5 text-sm font-semibold text-white transition hover:bg-brand-green/95 disabled:opacity-60"
          >
            {pending ? "Saving..." : "Save hero"}
          </button>
          {saved ? (
            <p className="text-sm font-medium text-brand-green">Saved successfully.</p>
          ) : null}
        </div>
      </section>

      <aside className="rounded-[1.75rem] border border-slate-200/80 bg-brand-navy p-6 text-white shadow-[0_18px_50px_rgba(16,32,58,0.12)]">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/60">Live preview</p>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight">{headline}</h2>
        <p className="mt-4 text-sm leading-8 text-white/76">{subheadline}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <span className="inline-flex h-11 items-center rounded-full bg-brand-green px-5 text-sm font-semibold text-white">
            {ctaText}
          </span>
          <span className="inline-flex h-11 items-center rounded-full border border-white/15 px-5 text-sm font-semibold text-white/85">
            {ctaLink}
          </span>
        </div>
      </aside>
    </div>
  );
}
