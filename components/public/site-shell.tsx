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
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-4 right-4 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg transition duration-300 hover:-translate-y-1 hover:bg-[#1ebe5d] hover:shadow-xl sm:bottom-6 sm:right-6"
    >
      {/* WhatsApp SVG icon */}
      <svg viewBox="0 0 32 32" width="28" height="28" fill="white" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.003 2.667C8.64 2.667 2.667 8.64 2.667 16c0 2.347.613 4.64 1.773 6.667L2.667 29.333l6.827-1.747A13.267 13.267 0 0 0 16.003 29.333C23.36 29.333 29.333 23.36 29.333 16S23.36 2.667 16.003 2.667zm0 24c-2.12 0-4.2-.56-6.027-1.627l-.427-.253-4.053 1.04 1.08-3.933-.28-.44A10.587 10.587 0 0 1 4.667 16c0-6.253 5.08-11.333 11.333-11.333S27.333 9.747 27.333 16s-5.08 11.333-11.333 11.333h.003zm6.24-8.48c-.347-.173-2.04-1.007-2.36-1.12-.32-.12-.547-.173-.773.173-.227.347-.88 1.12-1.08 1.347-.2.227-.4.253-.747.08-.347-.173-1.467-.54-2.793-1.72-1.033-.92-1.727-2.053-1.933-2.4-.2-.347-.02-.533.153-.707.16-.16.347-.413.52-.62.173-.207.227-.347.347-.573.12-.227.06-.427-.027-.6-.093-.173-.773-1.867-1.067-2.56-.28-.667-.56-.573-.773-.587-.2-.013-.427-.013-.653-.013-.227 0-.6.087-.907.413-.307.333-1.173 1.147-1.173 2.8 0 1.653 1.2 3.253 1.373 3.48.173.227 2.36 3.6 5.72 5.053.8.347 1.427.553 1.913.707.8.253 1.533.213 2.107.133.64-.093 1.973-.807 2.253-1.587.28-.78.28-1.44.2-1.587-.08-.147-.307-.24-.653-.413z"/>
      </svg>
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
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
            {/* Brand Logo & Wordings - shrink-0 prevents any squishing */}
            <div className="flex shrink-0 items-center">
              <Link href="/" className="flex items-center gap-2.5 group sm:gap-3" aria-label="Merxano Consulting home">
                <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-1 shadow-sm sm:h-12 sm:w-12">
                  <Image src="/images/merxano-logo.jpg" alt="Merxano Logo" width={48} height={48} priority className="object-contain w-full h-full mix-blend-multiply" />
                </div>
                <div className="flex flex-col">
                  <strong className="text-sm font-bold tracking-tight text-[#0f2d30] transition duration-200 group-hover:text-brand-green sm:text-base whitespace-nowrap">
                    Merxano Consulting
                  </strong>
                  <small className="hidden text-[0.55rem] font-semibold uppercase tracking-[0.18em] text-[#0f2d30]/65 sm:block whitespace-nowrap">
                    Professional Advisory &amp; Training
                  </small>
                </div>
              </Link>
            </div>

            {/* Navigation Links - Positioned cleanly between Logo and CTA */}
            <nav className="hidden items-center justify-end gap-1 lg:flex xl:gap-2" aria-label="Public navigation">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-full px-2.5 py-1.5 text-xs font-semibold text-[#0f2d30]/80 transition-all duration-200 hover:bg-brand-green/10 hover:text-brand-green xl:px-3.5 xl:text-[0.82rem]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Right Action (Get Started & Mobile Menu) */}
            <div className="flex shrink-0 items-center gap-2 sm:gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-brand-green px-3.5 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-white shadow-sm transition hover:bg-[#246327] sm:px-4 sm:py-2 sm:text-xs sm:tracking-[0.2em]"
              >
                Get Started
              </Link>
              <details className="relative lg:hidden">
                <summary
                  aria-label="Toggle navigation menu"
                  className="flex h-8 w-8 cursor-pointer list-none items-center justify-center rounded-full border border-slate-200 bg-white text-brand-navy shadow-sm transition hover:border-brand-green/30 hover:bg-slate-50 select-none [&::-webkit-details-marker]:hidden sm:h-9 sm:w-9"
                >
                  {/* 3-line hamburger icon */}
                  <svg
                    className="h-4 w-4 stroke-[#0d1b3d]"
                    viewBox="0 0 24 24"
                    fill="none"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="4" y1="6" x2="20" y2="6" />
                    <line x1="4" y1="12" x2="20" y2="12" />
                    <line x1="4" y1="18" x2="20" y2="18" />
                  </svg>
                </summary>
                <div className="absolute right-0 top-[calc(100%+0.5rem)] z-50 grid w-[min(14rem,calc(100vw-2rem))] rounded-2xl border border-slate-200 bg-white p-2 shadow-xl premium-shadow">
                  <span className="mb-1 border-b border-slate-100 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.24em] text-brand-green">
                    Merxano Portal
                  </span>
                  {navigation.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="rounded-xl px-4 py-2.5 text-sm font-semibold text-[#0f2d30]/85 transition hover:bg-brand-green/10 hover:text-brand-green"
                    >
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
