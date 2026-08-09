"use client";

import { useSearchParams, useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { useMemo, useState, useTransition } from "react";
import { signIn } from "next-auth/react";

function LoginField({
  label,
  type,
  name,
  value,
  onChange,
  autoComplete,
}: {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  autoComplete?: string;
}) {
  return (
    <label className="grid gap-2 text-sm font-medium text-slate-700">
      <span>{label}</span>
      <input
        type={type}
        name={name}
        value={value}
        autoComplete={autoComplete}
        onChange={(event) => onChange(event.target.value)}
        className="h-12 rounded-2xl border border-slate-200 bg-white px-4 text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-brand-green focus:ring-4 focus:ring-brand-green/10"
      />
    </label>
  );
}

export function LoginPanel() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = useMemo(
    () => searchParams.get("callbackUrl") ?? "/admin/dashboard",
    [searchParams],
  );
  const [email, setEmail] = useState("admin@merxano.co.tz");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    startTransition(async () => {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl,
      });

      if (result?.error) {
        setError("The email or password is incorrect.");
        return;
      }

      router.push(result?.url ?? callbackUrl);
      router.refresh();
    });
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(26,46,94,0.18),_transparent_36%),radial-gradient(circle_at_bottom_right,_rgba(46,125,94,0.16),_transparent_30%),linear-gradient(135deg,#f7f9fc_0%,#eef3fb_100%)] px-6 py-10 text-slate-900">
      <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-6xl items-center lg:grid-cols-[1.02fr_0.98fr]">
        <section className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/75 p-8 shadow-[0_30px_100px_rgba(16,32,58,0.12)] backdrop-blur-xl sm:p-10 lg:p-12">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-navy via-brand-green to-brand-navy" />
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-green/15 bg-brand-green/10 px-4 py-1 text-sm font-semibold text-brand-green">
            Merxano Admin
          </div>
          <h1 className="mt-6 max-w-xl text-4xl font-semibold tracking-tight text-brand-navy sm:text-5xl">
            Welcome back. Let&apos;s keep the Merxano engine moving.
          </h1>
          <p className="mt-4 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
            Sign in to manage courses, cohorts, enquiries, testimonials, and the
            public content that powers the Merxano Consulting experience.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              ["Courses", "Update programmes and outlines"],
              ["Enquiries", "Track requests and responses"],
              ["Testimonials", "Review and publish feedback"],
            ].map(([title, copy]) => (
              <div key={title} className="rounded-3xl border border-slate-200/80 bg-slate-50/80 p-4">
                <p className="text-sm font-semibold text-slate-900">{title}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">{copy}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="relative mt-8 lg:mt-0 lg:-ml-10">
          <div className="rounded-[2rem] border border-slate-200/60 bg-[#0f1d3a] p-8 text-white shadow-[0_35px_90px_rgba(15,29,58,0.35)] sm:p-10 lg:p-12">
            <div className="max-w-md">
              <p className="text-sm uppercase tracking-[0.3em] text-white/60">Admin login</p>
              <h2 className="mt-4 text-2xl font-semibold sm:text-3xl">
                Secure access for the people who keep the site current.
              </h2>
              <p className="mt-3 text-sm leading-7 text-white/70">
                Use your Merxano admin credentials to access protected routes on
                <span className="font-medium text-white"> merxano.co.tz</span> and the
                admin subdomain when it is connected.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 grid gap-4">
              <LoginField
                label="Email"
                type="email"
                name="email"
                value={email}
                onChange={setEmail}
                autoComplete="email"
              />
              <label className="grid gap-2 text-sm font-medium text-white/80">
                <span>Password</span>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="h-12 rounded-2xl border border-white/10 bg-white/10 px-4 text-white outline-none transition placeholder:text-white/30 focus:border-brand-green focus:ring-4 focus:ring-brand-green/20"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                />
              </label>

              {error ? (
                <p className="rounded-2xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
                  {error}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={isPending}
                className="mt-2 inline-flex h-12 items-center justify-center rounded-2xl bg-brand-green px-5 text-sm font-semibold text-white transition hover:bg-brand-green/90 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isPending ? "Signing in..." : "Sign in"}
              </button>
            </form>

            <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-5 text-sm leading-7 text-white/70">
              Default seed login:
              <span className="mt-2 block font-medium text-white">
                admin@merxano.co.tz / ChangeMe123!
              </span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
