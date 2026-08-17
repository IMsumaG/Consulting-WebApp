"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type CourseInput = {
  id?: string;
  title: string;
  slug: string;
  category: string;
  overview: string;
  objectives: string[];
  whoShouldAttend: string;
  entryRequirements: string | null;
  outline: string[];
  duration: string;
  deliveryMode: "ONLINE" | "PHYSICAL" | "HYBRID";
  trainerInfo: string;
  certInfo: string | null;
  imageUrl: string | null;
  published: boolean;
};

const thumbnailOptions = [
  { value: "/images/courses/project-management.jpg", label: "Project management" },
  { value: "/images/courses/business-analysis.jpg", label: "Business analysis" },
  { value: "/images/courses/agile-scrum.jpg", label: "Agile & Scrum" },
];

const emptyCourse: CourseInput = {
  title: "", slug: "", category: "", overview: "", objectives: [], whoShouldAttend: "",
  entryRequirements: "", outline: [], duration: "", deliveryMode: "PHYSICAL", trainerInfo: "",
  certInfo: "", imageUrl: thumbnailOptions[0].value, published: false,
};

const inputClass = "mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-brand-green focus:ring-4 focus:ring-brand-green/10";
const labelClass = "block text-sm font-extrabold text-brand-navy";

function slugify(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function lines(value: string) {
  return value.split("\n").map((item) => item.trim()).filter(Boolean);
}

export function CourseEditor({ course }: { course?: CourseInput }) {
  const router = useRouter();
  const [form, setForm] = useState<CourseInput>(course ?? emptyCourse);
  const [objectivesText, setObjectivesText] = useState(
    course ? course.objectives.join("\n") : ""
  );
  const [outlineText, setOutlineText] = useState(
    course ? course.outline.join("\n") : ""
  );
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  function update<K extends keyof CourseInput>(key: K, value: CourseInput[K]) {
    setForm((current) => {
      const next = { ...current, [key]: value };
      // Auto-generate slug from title only when slug is still empty
      if (key === "title" && !current.slug) {
        next.slug = slugify(value as string);
      }
      return next;
    });
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    setError("");

    const parsedObjectives = lines(objectivesText);
    const parsedOutline = lines(outlineText);

    if (parsedObjectives.length === 0) {
      setError("Please provide at least one learning objective.");
      setIsSaving(false);
      return;
    }

    if (parsedOutline.length === 0) {
      setError("Please provide at least one course outline topic.");
      setIsSaving(false);
      return;
    }

    const payload = {
      ...form,
      slug: form.slug || slugify(form.title),
      objectives: parsedObjectives,
      outline: parsedOutline,
      entryRequirements: form.entryRequirements || null,
      certInfo: form.certInfo || null,
      imageUrl: form.imageUrl || null,
    };

    try {
      const response = await fetch(course ? `/api/courses/${course.id}` : "/api/courses", {
        method: course ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok) throw new Error(result?.error ?? "Unable to save the course.");
      router.push("/admin/courses");
      router.refresh();
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Unable to save the course.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-6">
      <section className="rounded-[1.5rem] border border-slate-200/80 bg-white p-5 shadow-[0_14px_40px_rgba(16,32,58,0.06)] sm:p-7">
        <div className="grid gap-5 md:grid-cols-2">
          <label className={labelClass}>
            Course title
            <input
              required
              value={form.title}
              onChange={(event) => update("title", event.target.value)}
              className={inputClass}
              placeholder="e.g. Strategic Project Management"
            />
          </label>
          <div>
            <label className={labelClass}>
              URL slug
              <input
                required
                value={form.slug}
                onChange={(event) => update("slug", event.target.value)}
                className={inputClass}
                placeholder="strategic-project-management"
              />
            </label>
            <button
              type="button"
              onClick={() => update("slug", slugify(form.title))}
              className="mt-1 text-xs font-semibold text-brand-green hover:underline"
            >
              ↺ Auto-generate from title
            </button>
          </div>
          <label className={labelClass}>
            Category
            <input
              required
              value={form.category}
              onChange={(event) => update("category", event.target.value)}
              className={inputClass}
              placeholder="Project Management"
            />
          </label>
          <label className={labelClass}>
            Duration
            <input
              required
              value={form.duration}
              onChange={(event) => update("duration", event.target.value)}
              className={inputClass}
              placeholder="5 days"
            />
          </label>
          <label className={labelClass}>
            Delivery mode
            <select
              value={form.deliveryMode}
              onChange={(event) => update("deliveryMode", event.target.value as CourseInput["deliveryMode"])}
              className={inputClass}
            >
              <option value="PHYSICAL">Physical</option>
              <option value="ONLINE">Online</option>
              <option value="HYBRID">Hybrid</option>
            </select>
          </label>
          <label className={`${labelClass} flex items-center gap-3 pt-7`}>
            <input
              type="checkbox"
              checked={form.published}
              onChange={(event) => update("published", event.target.checked)}
              className="h-4 w-4 accent-[#2e7d32]"
            />
            Publish this course
          </label>
        </div>
        <label className={`${labelClass} mt-5`}>
          Overview
          <textarea
            required
            minLength={20}
            value={form.overview}
            onChange={(event) => update("overview", event.target.value)}
            className={`${inputClass} min-h-28 resize-y`}
            placeholder="A concise description of the programme and its outcomes."
          />
        </label>
      </section>

      <section className="rounded-[1.5rem] border border-slate-200/80 bg-white p-5 shadow-[0_14px_40px_rgba(16,32,58,0.06)] sm:p-7">
        <div className="flex flex-col gap-1"><h2 className="text-xl font-extrabold text-brand-navy">Course thumbnail</h2><p className="text-sm text-slate-500">Choose an image from the Merxano library or use a hosted image URL.</p></div>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {thumbnailOptions.map((option) => <button key={option.value} type="button" onClick={() => update("imageUrl", option.value)} className={`overflow-hidden rounded-xl border-2 text-left transition ${form.imageUrl === option.value ? "border-brand-green ring-4 ring-brand-green/10" : "border-transparent hover:border-brand-navy/20"}`}><img src={option.value} alt="" className="h-28 w-full object-cover" /><span className="block px-3 py-2 text-xs font-extrabold text-brand-navy">{option.label}</span></button>)}
        </div>
        <label className={`${labelClass} mt-5`}>Hosted image URL<input value={form.imageUrl ?? ""} onChange={(event) => update("imageUrl", event.target.value)} className={inputClass} placeholder="https://images.unsplash.com/..." /></label>
        <p className="mt-2 text-xs leading-5 text-slate-500">Use one of the supplied images, or a secure URL from Cloudinary or Unsplash. File upload can be connected later when cloud storage is configured.</p>
      </section>

      <section className="rounded-[1.5rem] border border-slate-200/80 bg-white p-5 shadow-[0_14px_40px_rgba(16,32,58,0.06)] sm:p-7">
        <div className="grid gap-5 lg:grid-cols-2">
          <label className={labelClass}>
            Learning objectives <span className="font-medium text-slate-400">(one per line)</span>
            <textarea
              required
              value={objectivesText}
              onChange={(event) => setObjectivesText(event.target.value)}
              className={`${inputClass} min-h-40 resize-y`}
              placeholder={"Plan complex projects\nManage risk and stakeholders"}
            />
          </label>
          <label className={labelClass}>
            Course outline <span className="font-medium text-slate-400">(one per line)</span>
            <textarea
              required
              value={outlineText}
              onChange={(event) => setOutlineText(event.target.value)}
              className={`${inputClass} min-h-40 resize-y`}
              placeholder={"Foundations\nPlanning\nDelivery"}
            />
          </label>
        </div>
        <label className={`${labelClass} mt-5`}>Who should attend<textarea required minLength={10} value={form.whoShouldAttend} onChange={(event) => update("whoShouldAttend", event.target.value)} className={`${inputClass} min-h-24 resize-y`} /></label>
        <div className="mt-5 grid gap-5 lg:grid-cols-2"><label className={labelClass}>Entry requirements<textarea value={form.entryRequirements ?? ""} onChange={(event) => update("entryRequirements", event.target.value)} className={`${inputClass} min-h-24 resize-y`} /></label><label className={labelClass}>Certificate information<textarea value={form.certInfo ?? ""} onChange={(event) => update("certInfo", event.target.value)} className={`${inputClass} min-h-24 resize-y`} /></label></div>
        <label className={`${labelClass} mt-5`}>Trainer information<textarea required minLength={10} value={form.trainerInfo} onChange={(event) => update("trainerInfo", event.target.value)} className={`${inputClass} min-h-24 resize-y`} placeholder="Trainer experience and credentials." /></label>
      </section>
      {error ? <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</p> : null}
      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end"><button type="button" onClick={() => router.back()} className="rounded-full px-5 py-3 text-sm font-extrabold text-slate-600 hover:bg-white">Cancel</button><button disabled={isSaving} className="rounded-full bg-brand-green px-6 py-3 text-sm font-extrabold text-white transition hover:bg-[#246327] disabled:opacity-60">{isSaving ? "Saving…" : course ? "Save changes" : "Create course"}</button></div>
    </form>
  );
}
