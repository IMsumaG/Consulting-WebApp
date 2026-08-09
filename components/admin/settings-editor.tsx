"use client";

import { useState, useTransition } from "react";

type SettingsData = {
  companyName: string;
  email: string | null;
  phone: string | null;
  whatsapp: string | null;
  address: string | null;
  bankName: string | null;
  bankAccountName: string | null;
  bankAccountNumber: string | null;
  bankBranch: string | null;
  mobileMoneyName: string | null;
  mobileMoneyNumber: string | null;
};

export function SettingsEditor({ initial }: { initial: SettingsData }) {
  const [companyName, setCompanyName] = useState(initial.companyName);
  const [email, setEmail] = useState(initial.email ?? "");
  const [phone, setPhone] = useState(initial.phone ?? "");
  const [whatsapp, setWhatsapp] = useState(initial.whatsapp ?? "");
  const [address, setAddress] = useState(initial.address ?? "");
  const [bankName, setBankName] = useState(initial.bankName ?? "");
  const [bankAccountName, setBankAccountName] = useState(initial.bankAccountName ?? "");
  const [bankAccountNumber, setBankAccountNumber] = useState(initial.bankAccountNumber ?? "");
  const [bankBranch, setBankBranch] = useState(initial.bankBranch ?? "");
  const [mobileMoneyName, setMobileMoneyName] = useState(initial.mobileMoneyName ?? "");
  const [mobileMoneyNumber, setMobileMoneyNumber] = useState(initial.mobileMoneyNumber ?? "");
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();

  const save = () => {
    setError("");
    setSaved(false);
    startTransition(async () => {
      const response = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyName,
          email: email || null,
          phone: phone || null,
          whatsapp: whatsapp || null,
          address: address || null,
          bankName: bankName || null,
          bankAccountName: bankAccountName || null,
          bankAccountNumber: bankAccountNumber || null,
          bankBranch: bankBranch || null,
          mobileMoneyName: mobileMoneyName || null,
          mobileMoneyNumber: mobileMoneyNumber || null,
        }),
      });
      const payload = await response.json();
      if (!response.ok || !payload.success) {
        setError(payload.error ?? "Unable to save settings.");
        return;
      }
      setSaved(true);
    });
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
      <section className="rounded-[1.75rem] border border-slate-200/80 bg-white p-6 shadow-[0_18px_50px_rgba(16,32,58,0.06)]">
        <div className="grid gap-4 md:grid-cols-2">
          {[
            ["Company name", companyName, setCompanyName],
            ["Email", email, setEmail],
            ["Phone", phone, setPhone],
            ["WhatsApp", whatsapp, setWhatsapp],
            ["Address", address, setAddress],
            ["Bank name", bankName, setBankName],
            ["Account name", bankAccountName, setBankAccountName],
            ["Account number", bankAccountNumber, setBankAccountNumber],
            ["Bank branch", bankBranch, setBankBranch],
            ["Mobile money name", mobileMoneyName, setMobileMoneyName],
            ["Mobile money number", mobileMoneyNumber, setMobileMoneyNumber],
          ].map(([label, value, setter]) => (
            <label key={label as string} className="grid gap-2 text-sm font-medium text-slate-700 md:col-span-1">
              {label as string}
              <input
                value={value as string}
                onChange={(event) => (setter as (value: string) => void)(event.target.value)}
                className="h-12 rounded-2xl border border-slate-200 px-4 outline-none focus:border-brand-green focus:ring-4 focus:ring-brand-green/10"
              />
            </label>
          ))}
        </div>
        {error ? (
          <p className="mt-4 rounded-2xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-700">
            {error}
          </p>
        ) : null}
        <button
          type="button"
          onClick={save}
          disabled={pending}
          className="mt-6 inline-flex h-11 w-fit items-center rounded-full bg-brand-green px-5 text-sm font-semibold text-white transition hover:bg-brand-green/95 disabled:opacity-60"
        >
          {pending ? "Saving..." : "Save settings"}
        </button>
        {saved ? <p className="mt-3 text-sm font-medium text-brand-green">Settings saved.</p> : null}
      </section>

      <aside className="rounded-[1.75rem] border border-slate-200/80 bg-white p-6 shadow-[0_18px_50px_rgba(16,32,58,0.06)]">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-green">Public snapshot</p>
        <div className="mt-5 grid gap-4 text-sm leading-7 text-slate-600">
          <p><span className="font-semibold text-slate-900">Company:</span> {companyName}</p>
          <p><span className="font-semibold text-slate-900">Email:</span> {email || "Not set"}</p>
          <p><span className="font-semibold text-slate-900">Phone:</span> {phone || "Not set"}</p>
          <p><span className="font-semibold text-slate-900">Address:</span> {address || "Not set"}</p>
          <p><span className="font-semibold text-slate-900">WhatsApp:</span> {whatsapp || "Not set"}</p>
        </div>
      </aside>
    </div>
  );
}
