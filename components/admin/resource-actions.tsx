"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function ResourceActions({
  editHref,
  endpoint,
  label,
}: {
  editHref: string;
  endpoint: string;
  label: string;
}) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");

  async function deleteResource() {
    if (!window.confirm(`Delete this ${label}? This action cannot be undone.`)) return;

    setIsDeleting(true);
    setError("");
    try {
      const response = await fetch(endpoint, { method: "DELETE" });
      const result = await response.json().catch(() => null);
      if (!response.ok) throw new Error(result?.error ?? `Unable to delete ${label}.`);
      router.refresh();
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : `Unable to delete ${label}.`);
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className="flex flex-col items-start gap-2 sm:items-end">
      <div className="flex items-center gap-2">
        <Link
          href={editHref}
          className="rounded-lg border border-brand-navy/15 px-3 py-2 text-xs font-extrabold text-brand-navy transition hover:border-brand-green/40 hover:bg-brand-green/5"
        >
          Edit
        </Link>
        <button
          type="button"
          onClick={deleteResource}
          disabled={isDeleting}
          className="rounded-lg border border-red-200 px-3 py-2 text-xs font-extrabold text-red-700 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isDeleting ? "Deleting…" : "Delete"}
        </button>
      </div>
      {error ? <p className="max-w-44 text-right text-xs font-medium text-red-600">{error}</p> : null}
    </div>
  );
}
