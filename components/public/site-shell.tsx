import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import { brand, navigation } from "@/lib/site-content";

function WhatsAppButton({ message }: { message?: string }) {
  const text = encodeURIComponent(message ?? "Hello Merxano Consulting, I'd like to enquire about your services.");
  return (
    <a
      href={`https://wa.me/${brand.whatsapp}?text=${text}`}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-4 right-4 z-50 inline-flex items-center gap-2 rounded-full bg-brand-green px-4 py-3 text-sm font-bold text-white shadow-lg transition duration-300 hover:-translate-y-1 hover:bg-[#246327] hover:shadow-xl sm:bottom-6 sm:right-6 sm:gap-2.5 sm:px-5 sm:py-3.5"
    >
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20 text-xs">W</span>
      <span className="sm:hidden">Chat</span>
      <span className="hidden sm:inline">Chat with us</span>
    </a>
  );
}

export function PublicShell({ children, message }: { children: ReactNode; message?: string }) {
  return (
    <div className="min-h-screen bg-slate-50 text-[#0f2d30] flex flex-col justify-between">
      <div>
        <div className="bg-brand-navy text-[0.7rem] font-bold uppercase tracking-[0.24em] text-white/70">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
            <span>Dar es Salaam, Tanzania</span>
            <a href={`mailto:${brand.email}`} className="hidden transition hover:text-brand-green sm:block">{brand.email}</a>
          </div>
        </div>

        <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6 sm:py-4 lg:grid lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:gap-6 lg:px-8">
            <div className="flex min-w-0 flex-1 items-center pr-1 sm:pr-2 lg:flex-none lg:justify-self-start">
              <Link href="/" className="flex items-center gap-2.5 group sm:gap-3" aria-label="Merxano Consulting home">
                <div className="relative h-11 w-11 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-1 shadow-sm sm:h-12 sm:w-12">
                  <Image src="/images/merxano-logo.jpg" alt="Merxano Logo" width={48} height={48} priority className="object-contain w-full h-full mix-blend-multiply" />
                </div>
                <div className="flex min-w-0 flex-col">
                  <strong className="truncate text-sm font-bold tracking-tight text-[#0f2d30] transition duration-200 group-hover:text-brand-green sm:text-base">
                    Merxano Consulting
                  </strong>
                  <small className="hidden truncate text-[0.5rem] font-semibold uppercase tracking-[0.2em] text-[#0f2d30]/65 sm:block sm:text-[0.55rem]">
                    Professional Advisory &amp; Training
                  </small>
                </div>
              </Link>
            </div>

            <nav className="hidden flex-1 items-center justify-center gap-5 lg:flex lg:flex-none" aria-label="Public navigation">
              {navigation.map((item) => (
                <Link key={item.href} href={item.href} className="text-[0.8rem] font-semibold text-[#0f2d30]/75 transition duration-200 hover:text-brand-green hover:underline decoration-brand-green decoration-2 underline-offset-4">
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex shrink-0 items-center justify-end gap-2 sm:gap-3 lg:justify-self-end">
              <Link href="/contact" className="hidden rounded-full bg-brand-green px-3.5 py-2 text-[0.7rem] font-bold uppercase tracking-[0.24em] text-white visited:text-white hover:bg-[#246327] hover:text-white focus:text-white active:text-white shadow-sm transition sm:inline-flex">
                Get Started
              </Link>
              <details className="relative lg:hidden">
                <summary className="list-none cursor-pointer rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-brand-navy hover:bg-slate-50 select-none">
                  Menu
                </summary>
                <div className="absolute right-0 top-[calc(100%+0.5rem)] z-50 grid w-[min(13rem,calc(100vw-2rem))] rounded-2xl border border-slate-200 bg-white p-2 shadow-xl premium-shadow">
                  <span className="mb-1 border-b border-slate-100 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.24em] text-brand-green">
                    Merxano Portal
                  </span>
                  {navigation.map((item) => (
                    <Link key={item.href} href={item.href} className="rounded-xl px-4 py-2.5 text-sm font-semibold text-[#0f2d30]/85 transition hover:bg-slate-50 hover:text-brand-green">
                      {item.label}
                    </Link>
                  ))}
                </div>
              </details>
            </div>
          </div>
        </header>

        <main>{children}</main>
      </div>

      <footer className="mt-20 border-t border-slate-200/70 bg-gradient-to-br from-white to-slate-50 text-[#0f2d30]">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-6 sm:py-16 md:grid-cols-3 lg:px-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.24em] text-brand-green">Merxano Consulting</span>
            <p className="mt-4 text-2xl font-bold tracking-tight text-[#0f2d30]">Useful learning for the work that matters.</p>
            <p className="mt-4 text-sm leading-relaxed text-[#0f2d30]/70">Practical training and advisory support for professionals and teams across Tanzania.</p>
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.24em] text-[#0f2d30]/50">Quick Links</span>
            <div className="mt-4 grid gap-2.5">
              {navigation.slice(1, 6).map((item) => (
                <Link key={item.href} href={item.href} className="text-sm font-semibold text-[#0f2d30]/75 transition duration-200 hover:text-brand-green">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.24em] text-[#0f2d30]/50">Get in touch</span>
            <div className="mt-4 grid gap-2.5 text-sm font-semibold text-[#0f2d30]/75">
              <span>{brand.location}</span>
              <a href={`mailto:${brand.email}`} className="transition duration-200 hover:text-brand-green">{brand.email}</a>
              <a href={`tel:${brand.phone}`} className="transition duration-200 hover:text-brand-green">{brand.phone}</a>
            </div>
          </div>
        </div>
        <div className="border-t border-slate-100 py-6">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 text-center text-xs text-[#0f2d30]/50 sm:px-6 md:flex-row md:text-left lg:px-8">
            <span>&copy; {new Date().getFullYear()} Merxano Consulting. All rights reserved.</span>
            <span>Made with precision</span>
          </div>
        </div>
      </footer>
      <WhatsAppButton message={message} />
    </div>
  );
}
