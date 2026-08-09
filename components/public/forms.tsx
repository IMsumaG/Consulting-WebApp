"use client";

import type { FormEvent, ReactNode } from "react";
import { useMemo, useState, useTransition } from "react";

function Field({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="grid gap-2 text-sm font-medium text-slate-700">
      <span>
        {label}
        {required ? <span className="ml-1 text-brand-green">*</span> : null}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="h-12 rounded-2xl border border-slate-200 bg-white px-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-brand-green focus:ring-4 focus:ring-brand-green/10"
      />
    </label>
  );
}

function TextArea({
  label,
  name,
  value,
  onChange,
  placeholder,
  required = false,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="grid gap-2 text-sm font-medium text-slate-700">
      <span>
        {label}
        {required ? <span className="ml-1 text-brand-green">*</span> : null}
      </span>
      <textarea
        name={name}
        required={required}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        rows={5}
        className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-brand-green focus:ring-4 focus:ring-brand-green/10"
      />
    </label>
  );
}

function FormShell({
  title,
  intro,
  children,
  submitted,
}: {
  title: string;
  intro: string;
  children: ReactNode;
  submitted: boolean;
}) {
  return (
    <section className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-[0_18px_50px_rgba(16,32,58,0.06)] sm:p-8">
      <div className="max-w-2xl">
        <h3 className="text-2xl font-semibold text-brand-navy">{title}</h3>
        <p className="mt-3 text-sm leading-7 text-slate-600">{intro}</p>
      </div>
      <div className="mt-8">{children}</div>
      {submitted ? (
        <p className="mt-6 rounded-2xl border border-brand-green/20 bg-brand-green/10 px-4 py-3 text-sm text-brand-green">
          Thanks, your submission has been received.
        </p>
      ) : null}
    </section>
  );
}

export function InquiryForm({
  endpoint,
  submitLabel = "Submit request",
  title,
  intro,
}: {
  endpoint: string;
  submitLabel?: string;
  title: string;
  intro: string;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();

  const canSubmit = useMemo(
    () => name && email && message && subject,
    [name, email, message, subject],
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    startTransition(async () => {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, subject, message }),
      });
      const result = await response.json();
      if (!response.ok || !result.success) {
        setError(result.error ?? "Something went wrong.");
        return;
      }
      setSubmitted(true);
    });
  };

  return (
    <FormShell title={title} intro={intro} submitted={submitted}>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Name" name="name" value={name} onChange={setName} required />
          <Field label="Email" name="email" type="email" value={email} onChange={setEmail} required />
          <Field label="Phone" name="phone" value={phone} onChange={setPhone} />
          <Field label="Subject" name="subject" value={subject} onChange={setSubject} required />
        </div>
        <TextArea
          label="Message"
          name="message"
          value={message}
          onChange={setMessage}
          required
        />
        {error ? (
          <p className="rounded-2xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-700">
            {error}
          </p>
        ) : null}
        <button
          type="submit"
          disabled={pending || !canSubmit}
          className="inline-flex h-12 w-fit items-center justify-center rounded-full bg-brand-navy px-6 text-sm font-semibold text-white transition hover:bg-brand-navy/95 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "Sending..." : submitLabel}
        </button>
      </form>
    </FormShell>
  );
}

export function BookingForm({
  endpoint,
  cohortId,
  courseTitle,
  deliveryMode = "HYBRID",
}: {
  endpoint: string;
  cohortId: string;
  courseTitle: string;
  deliveryMode?: "ONLINE" | "PHYSICAL" | "HYBRID";
}) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("Tanzania");
  const [city, setCity] = useState("");
  const [organization, setOrganization] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Bank Transfer");
  const [specialRequirements, setSpecialRequirements] = useState("");
  const [referralSource, setReferralSource] = useState("");
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    startTransition(async () => {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cohortId,
          fullName,
          email,
          phone,
          whatsapp: phone,
          country,
          city,
          organization,
          jobTitle,
          deliveryMode,
          billingName: organization || fullName,
          tin: "",
          paymentMethod,
          specialRequirements,
          referralSource,
          privacyConsent,
          marketingConsent: false,
        }),
      });
      const result = await response.json();
      if (!response.ok || !result.success) {
        setError(result.error ?? "Booking could not be submitted.");
        return;
      }
      setSubmitted(true);
    });
  };

  return (
    <FormShell
      title={`Book your seat: ${courseTitle}`}
      intro="This form captures the essentials we need to reserve your place and respond with the next steps."
      submitted={submitted}
    >
      <form onSubmit={handleSubmit} className="grid gap-4">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Full name" name="fullName" value={fullName} onChange={setFullName} required />
          <Field label="Email" name="email" type="email" value={email} onChange={setEmail} required />
          <Field label="Phone" name="phone" value={phone} onChange={setPhone} required />
          <Field label="Country" name="country" value={country} onChange={setCountry} required />
          <Field label="City" name="city" value={city} onChange={setCity} required />
          <Field label="Organisation" name="organization" value={organization} onChange={setOrganization} />
          <Field label="Job title" name="jobTitle" value={jobTitle} onChange={setJobTitle} />
          <Field label="Payment method" name="paymentMethod" value={paymentMethod} onChange={setPaymentMethod} required />
        </div>
        <TextArea
          label="Special requirements"
          name="specialRequirements"
          value={specialRequirements}
          onChange={setSpecialRequirements}
        />
        <TextArea
          label="Referral source"
          name="referralSource"
          value={referralSource}
          onChange={setReferralSource}
          placeholder="How did you hear about Merxano?"
        />
        <label className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={privacyConsent}
            onChange={(event) => setPrivacyConsent(event.target.checked)}
            className="mt-1 h-4 w-4 rounded border-slate-300 text-brand-green focus:ring-brand-green"
          />
          <span>I agree to the privacy notice and understand that Merxano will use my details to process this booking.</span>
        </label>
        {error ? (
          <p className="rounded-2xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-700">
            {error}
          </p>
        ) : null}
        <button
          type="submit"
          disabled={pending || !privacyConsent}
          className="inline-flex h-12 w-fit items-center justify-center rounded-full bg-brand-green px-6 text-sm font-semibold text-white transition hover:bg-brand-green/95 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "Submitting..." : "Reserve seat"}
        </button>
      </form>
    </FormShell>
  );
}

export function TestimonialForm({
  token,
  courseTitle,
}: {
  token: string;
  courseTitle: string;
}) {
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    startTransition(async () => {
      const response = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          authorName: fullName,
          role,
          company,
          message,
          source: "FORM_SUBMISSION",
          token,
        }),
      });
      const result = await response.json();
      if (!response.ok || !result.success) {
        setError(result.error ?? "Could not submit testimonial.");
        return;
      }
      setSubmitted(true);
    });
  };

  return (
    <FormShell
      title={`Share your experience: ${courseTitle}`}
      intro="A short testimonial helps future participants understand what the course felt like in practice."
      submitted={submitted}
    >
      <form onSubmit={handleSubmit} className="grid gap-4">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Full name" name="fullName" value={fullName} onChange={setFullName} required />
          <Field label="Role" name="role" value={role} onChange={setRole} required />
          <Field label="Company" name="company" value={company} onChange={setCompany} required />
        </div>
        <TextArea
          label="Your testimonial"
          name="message"
          value={message}
          onChange={setMessage}
          required
        />
        {error ? (
          <p className="rounded-2xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-700">
            {error}
          </p>
        ) : null}
        <button
          type="submit"
          disabled={pending}
          className="inline-flex h-12 w-fit items-center justify-center rounded-full bg-brand-navy px-6 text-sm font-semibold text-white transition hover:bg-brand-navy/95 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "Submitting..." : "Submit testimonial"}
        </button>
      </form>
    </FormShell>
  );
}
