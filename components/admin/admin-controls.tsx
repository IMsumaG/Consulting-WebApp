"use client";

import { signOut } from "next-auth/react";
import { useState } from "react";

export function AdminControls({
  name,
  email,
  publicSiteUrl,
}: {
  name?: string | null;
  email?: string | null;
  publicSiteUrl: string;
}) {
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    await signOut({ redirect: false, callbackUrl: "/admin/login" });
    window.location.assign("/admin/login");
  };

  return (
    <div className="flex flex-wrap items-center gap-2 sm:justify-end">
      <a
        href={publicSiteUrl}
        target="_blank"
        rel="noreferrer"
        className="inline-flex h-10 items-center gap-2 rounded-full border border-brand-navy/15 bg-white px-4 text-xs font-extrabold uppercase tracking-[0.12em] text-brand-navy transition hover:border-brand-green hover:text-brand-green"
      >
        View website <span aria-hidden="true">↗</span>
      </a>
      <details className="group relative">
        <summary className="flex h-10 cursor-pointer list-none items-center gap-2 rounded-full bg-brand-navy py-1 pl-1 pr-4 text-xs font-bold text-white marker:hidden transition hover:bg-[#15254d]">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-brand-green text-xs font-extrabold">
            {(name ?? "A").trim().charAt(0).toUpperCase()}
          </span>
          <span className="hidden max-w-28 truncate sm:block">{name ?? "Administrator"}</span>
          <span className="text-white/60" aria-hidden="true">⌄</span>
        </summary>
        <div className="absolute right-0 top-[calc(100%+0.6rem)] z-50 w-64 rounded-2xl border border-brand-navy/10 bg-white p-2 shadow-[0_20px_55px_rgba(13,27,61,0.16)]">
          <div className="border-b border-brand-navy/10 px-3 py-3">
            <p className="truncate text-sm font-extrabold text-brand-navy">{name ?? "Administrator"}</p>
            <p className="mt-1 truncate text-xs text-slate-500">{email ?? "Merxano account"}</p>
          </div>
          <button
            type="button"
            onClick={handleSignOut}
            disabled={isSigningOut}
            className="mt-2 flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-sm font-bold text-rose-700 transition hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSigningOut ? "Signing out..." : "Log out"}
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </details>
    </div>
  );
}
