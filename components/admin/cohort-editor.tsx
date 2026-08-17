"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type CourseOption = { id: string; title: string };
type CohortInput = {
  id?: string; courseId: string; startDate: string; endDate: string; sessionDays: string;
  sessionTimes: string; venue: string | null; onlinePlatform: string | null; fee: string;
  currency: string; seatsTotal: number; seatsBooked: number; registrationDeadline: string;
  status: "OPEN" | "FEW_SEATS" | "FULLY_BOOKED" | "CLOSED" | "COMING_SOON" | "POSTPONED" | "CANCELLED" | "COMPLETED";
};

const statuses: CohortInput["status"][] = ["OPEN", "FEW_SEATS", "FULLY_BOOKED", "CLOSED", "COMING_SOON", "POSTPONED", "CANCELLED", "COMPLETED"];
const inputClass = "mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-800 outline-none transition focus:border-brand-green focus:ring-4 focus:ring-brand-green/10";
const labelClass = "block text-sm font-extrabold text-brand-navy";

function toIso(value: string) { return new Date(value).toISOString(); }

export function CohortEditor({ cohort, courses }: { cohort?: CohortInput; courses: CourseOption[] }) {
  const router = useRouter();
  const [form, setForm] = useState<CohortInput>(cohort ?? { courseId: courses[0]?.id ?? "", startDate: "", endDate: "", sessionDays: "", sessionTimes: "", venue: "", onlinePlatform: "", fee: "", currency: "TZS", seatsTotal: 20, seatsBooked: 0, registrationDeadline: "", status: "OPEN" });
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  function update<K extends keyof CohortInput>(key: K, value: CohortInput[K]) { setForm((current) => ({ ...current, [key]: value })); }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setIsSaving(true); setError("");
    try {
      const payload = { ...form, startDate: toIso(form.startDate), endDate: toIso(form.endDate), registrationDeadline: toIso(form.registrationDeadline), venue: form.venue || null, onlinePlatform: form.onlinePlatform || null, fee: form.fee, seatsTotal: Number(form.seatsTotal), seatsBooked: Number(form.seatsBooked) };
      const response = await fetch(cohort ? `/api/cohorts/${cohort.id}` : "/api/cohorts", { method: cohort ? "PATCH" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const result = await response.json().catch(() => null);
      if (!response.ok) throw new Error(result?.error ?? "Unable to save the cohort.");
      router.push("/admin/cohorts"); router.refresh();
    } catch (caughtError) { setError(caughtError instanceof Error ? caughtError.message : "Unable to save the cohort."); } finally { setIsSaving(false); }
  }

  if (!courses.length) return <div className="rounded-[1.5rem] border border-amber-200 bg-amber-50 p-6 text-sm leading-6 text-amber-900">Create a course before creating a cohort. A cohort must be assigned to a course.</div>;

  return <form onSubmit={submit} className="space-y-6"><section className="rounded-[1.5rem] border border-slate-200/80 bg-white p-5 shadow-[0_14px_40px_rgba(16,32,58,0.06)] sm:p-7"><div className="grid gap-5 md:grid-cols-2"><label className={labelClass}>Course<select required value={form.courseId} onChange={(event) => update("courseId", event.target.value)} className={inputClass}>{courses.map((course) => <option key={course.id} value={course.id}>{course.title}</option>)}</select></label><label className={labelClass}>Status<select value={form.status} onChange={(event) => update("status", event.target.value as CohortInput["status"])} className={inputClass}>{statuses.map((status) => <option key={status} value={status}>{status.replaceAll("_", " ")}</option>)}</select></label><label className={labelClass}>Start date & time<input required type="datetime-local" value={form.startDate} onChange={(event) => update("startDate", event.target.value)} className={inputClass} /></label><label className={labelClass}>End date & time<input required type="datetime-local" value={form.endDate} onChange={(event) => update("endDate", event.target.value)} className={inputClass} /></label><label className={labelClass}>Registration deadline<input required type="datetime-local" value={form.registrationDeadline} onChange={(event) => update("registrationDeadline", event.target.value)} className={inputClass} /></label><label className={labelClass}>Session days<input required value={form.sessionDays} onChange={(event) => update("sessionDays", event.target.value)} className={inputClass} placeholder="Monday to Friday" /></label><label className={labelClass}>Session times<input required value={form.sessionTimes} onChange={(event) => update("sessionTimes", event.target.value)} className={inputClass} placeholder="09:00–16:00" /></label><label className={labelClass}>Venue<input value={form.venue ?? ""} onChange={(event) => update("venue", event.target.value)} className={inputClass} placeholder="Dar es Salaam" /></label><label className={labelClass}>Online platform <span className="font-medium text-slate-400">(optional)</span><input value={form.onlinePlatform ?? ""} onChange={(event) => update("onlinePlatform", event.target.value)} className={inputClass} placeholder="Zoom / Microsoft Teams" /></label></div></section><section className="rounded-[1.5rem] border border-slate-200/80 bg-white p-5 shadow-[0_14px_40px_rgba(16,32,58,0.06)] sm:p-7"><div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4"><label className={labelClass}>Fee<input required min="0" step="0.01" type="number" value={form.fee} onChange={(event) => update("fee", event.target.value)} className={inputClass} placeholder="450000" /></label><label className={labelClass}>Currency<input required value={form.currency} onChange={(event) => update("currency", event.target.value.toUpperCase())} maxLength={3} className={inputClass} /></label><label className={labelClass}>Total seats<input required min="1" type="number" value={form.seatsTotal} onChange={(event) => update("seatsTotal", Number(event.target.value))} className={inputClass} /></label><label className={labelClass}>Booked seats<input required min="0" type="number" value={form.seatsBooked} onChange={(event) => update("seatsBooked", Number(event.target.value))} className={inputClass} /></label></div></section>{error ? <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</p> : null}<div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end"><button type="button" onClick={() => router.back()} className="rounded-full px-5 py-3 text-sm font-extrabold text-slate-600 hover:bg-white">Cancel</button><button disabled={isSaving} className="rounded-full bg-brand-green px-6 py-3 text-sm font-extrabold text-white transition hover:bg-[#246327] disabled:opacity-60">{isSaving ? "Saving…" : cohort ? "Save changes" : "Create cohort"}</button></div></form>;
}
