import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import { brand, navigation } from "@/lib/site-content";

function BrandMark() {
  return (
    <Link href="/" className="group flex items-center" aria-label="Merxano Consulting home">
      <Image src="/images/merxano-logo.jpg" alt="Merxano Consulting" width={480} height={340} priority className="h-[4.4rem] w-auto object-contain mix-blend-multiply transition duration-300 group-hover:scale-[1.02]" />
    </Link>
  );
}

function WhatsAppButton({ message }: { message?: string }) {
  const text = encodeURIComponent(message ?? "Hello Merxano Consulting, I'd like to enquire about your services.");
  return (
    <a
      href={`https://wa.me/${brand.whatsapp}?text=${text}`}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-brand-green px-4 py-3 text-sm font-bold text-white shadow-[0_18px_38px_rgba(46,125,50,0.3)] transition duration-300 hover:-translate-y-1 hover:bg-[#246327] sm:px-5"
    >
      <span className="grid h-5 w-5 place-items-center rounded-full bg-white/15 text-xs">W</span>
      <span>Chat with us</span>
    </a>
  );
}

export function PublicShell({ children, message }: { children: ReactNode; message?: string }) {
  return (
    <div className="min-h-screen overflow-hidden bg-[#f4f1ea] text-slate-900">
      <div className="bg-brand-navy text-[0.66rem] font-bold uppercase tracking-[0.14em] text-white/65">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2.5 lg:px-10">
          <span>Dar es Salaam, Tanzania</span>
          <a href={`mailto:${brand.email}`} className="hidden transition hover:text-[#d4e496] sm:block">{brand.email}</a>
        </div>
      </div>
      <header className="sticky top-0 z-40 border-b border-brand-navy/10 bg-[#f4f1ea]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 lg:px-10">
          <BrandMark />
          <nav className="hidden items-center gap-6 xl:flex" aria-label="Main navigation">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href} className="text-[0.73rem] font-extrabold uppercase tracking-[0.09em] text-slate-600 transition hover:text-brand-green">
                {item.label}
              </Link>
            ))}
          </nav>
          <a href={`https://wa.me/${brand.whatsapp}`} className="hidden rounded-full bg-brand-navy px-5 py-3 text-sm font-bold text-white transition hover:bg-brand-green sm:inline-flex">
            Start an enquiry
          </a>
          <details className="relative sm:hidden">
            <summary className="list-none rounded-full border border-brand-navy/20 px-4 py-2.5 text-xs font-extrabold uppercase tracking-[0.12em] text-brand-navy marker:hidden">Menu</summary>
            <div className="absolute right-0 top-[calc(100%+0.75rem)] grid w-56 rounded-2xl border border-brand-navy/10 bg-white p-2 shadow-[0_24px_55px_rgba(17,42,53,0.16)]">
              {navigation.map((item) => (
                <Link key={item.href} href={item.href} className="rounded-xl px-3 py-3 text-sm font-semibold text-slate-700 hover:bg-[#eef3e6] hover:text-brand-green">{item.label}</Link>
              ))}
            </div>
          </details>
        </div>
      </header>
      <main>{children}</main>
      <footer className="mt-14 bg-brand-navy text-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[1.45fr_0.75fr_0.9fr] lg:px-10">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#d4e496]">Merxano Consulting</p>
            <p className="display-face mt-5 max-w-xl text-3xl leading-tight text-white/95">Useful learning for the work that matters.</p>
            <p className="mt-5 max-w-lg text-sm leading-7 text-white/60">Practical training and advisory support for professionals and teams across Tanzania.</p>
          </div>
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-white/40">Explore</p>
            <div className="mt-5 grid gap-3">
              {navigation.slice(1, 6).map((item) => <Link key={item.href} href={item.href} className="text-sm font-medium text-white/75 transition hover:text-[#d4e496]">{item.label}</Link>)}
            </div>
          </div>
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-white/40">Get in touch</p>
            <div className="mt-5 grid gap-3 text-sm text-white/75">
              <span>{brand.location}</span>
              <a href={`mailto:${brand.email}`} className="transition hover:text-[#d4e496]">{brand.email}</a>
              <a href={`tel:${brand.phone}`} className="transition hover:text-[#d4e496]">{brand.phone}</a>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10"><div className="mx-auto flex max-w-7xl justify-between px-6 py-5 text-xs text-white/45 lg:px-10"><span>&copy; {new Date().getFullYear()} Merxano Consulting</span><span>Built for better work</span></div></div>
      </footer>
      <WhatsAppButton message={message} />
    </div>
  );
}
