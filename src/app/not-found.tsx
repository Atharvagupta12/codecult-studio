import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRightIcon, WhatsAppIcon } from "@/components/ui/icons";
import { SAMPLES, TIERS } from "@/data/samples";
import { SITE, waLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Page not found | CodeCult Studio",
  description: "This page doesn't exist, but your business website could. Explore CodeCult Studio's sample websites.",
};

/** One sample per niche, the best "next step" for a lost visitor */
const PICKS = ["ember-bistro", "forge-athletics", "aarav-mehta", "mehr-bridal"].map((slug) => SAMPLES.find((s) => s.slug === slug)!);

/** Branded 404 (Server Component: it ships with every route, so it stays light and animation is CSS-only). */
export default function NotFound() {
  return (
    <main className="relative flex min-h-[100svh] flex-col overflow-hidden px-5 pb-12 pt-8 sm:px-8">
      <div aria-hidden className="pointer-events-none absolute -top-[30%] left-1/2 size-[900px] -translate-x-1/2 rounded-full bg-ember/15 blur-[160px]" />
      <div aria-hidden className="bg-rules pointer-events-none absolute inset-0" />

      {/* Header */}
      <header className="relative mx-auto flex w-full max-w-[1400px] items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5" aria-label="CodeCult Studio home">
          <span className="relative grid size-8 place-items-center overflow-hidden rounded-[9px] bg-ember text-ink">
            <span className="font-serif text-[22px] italic leading-none -translate-y-[1px]">c</span>
            <span className="absolute bottom-[7px] right-[7px] size-[5px] rounded-full bg-ink" />
          </span>
          <span className="text-[17px] font-semibold tracking-[-0.03em]">
            CodeCult <span className="font-serif text-[19px] font-normal italic tracking-normal text-cream/60">Studio</span>
          </span>
        </Link>
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-cream/40">Error 404</span>
      </header>

      {/* Message */}
      <section className="relative mx-auto flex w-full max-w-[1400px] flex-1 flex-col items-center justify-center py-14 text-center">
        <span className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-cream/45">
          <span className="text-ember">(404)</span>
          <span className="h-px w-10 bg-cream/20" />
          Page not found
        </span>

        <h1 className="mt-8 text-[clamp(3.2rem,11vw,10rem)] font-medium leading-[0.86] tracking-[-0.06em]">
          <span className="block">This page</span>
          <span className="block">
            got <span className="font-serif font-normal italic tracking-[-0.02em] text-ember">lost.</span>
          </span>
        </h1>

        <p className="mt-8 max-w-[32rem] text-[17px] leading-[1.6] text-cream/60 sm:text-[18px]">
          The link may be old or mistyped. The good news? Your business website doesn&apos;t have to be. Here&apos;s where you can go instead.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link href="/" className="inline-flex h-14 items-center gap-2 rounded-full bg-cream px-7 text-[15px] font-semibold text-ink transition-transform hover:-translate-y-0.5">
            Back to home
          </Link>
          <Link href="/#work" className="inline-flex h-14 items-center gap-2 rounded-full border border-cream/20 px-7 text-[15px] font-semibold transition-colors hover:border-cream/50">
            See sample websites <ArrowUpRightIcon className="size-4" />
          </Link>
          <a href={waLink()} target="_blank" rel="noopener" className="inline-flex h-14 items-center gap-2 rounded-full bg-wa px-7 text-[15px] font-semibold text-ink transition-transform hover:-translate-y-0.5">
            <WhatsAppIcon className="size-5" /> Chat on WhatsApp
          </a>
        </div>
      </section>

      {/* Sample strip */}
      <section aria-label="Popular sample websites" className="relative mx-auto w-full max-w-[1400px]">
        <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-cream/40">Popular designs</p>
        <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {PICKS.map((s) => (
            <li key={s.slug}>
              <Link href={`/samples/${s.slug}`} className="group block overflow-hidden rounded-[18px] border border-line bg-ink-2 transition-colors hover:border-cream/25">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image src={s.image} alt={`${s.name} sample website`} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" style={{ objectPosition: s.imagePosition }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" />
                  <span className="absolute bottom-3 left-3 rounded-full bg-ink/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-cream/80 backdrop-blur">{s.tier}</span>
                </div>
                <div className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
                  <span className="min-w-0">
                    <span className="block truncate text-[15px] font-semibold">{s.name}</span>
                    <span className="block truncate text-[12px] text-cream/50">{s.kind}</span>
                  </span>
                  <span className="shrink-0 text-[13px] text-cream/70">{TIERS[s.tier].price}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-center text-[13px] text-cream/40">{SITE.location}</p>
      </section>
    </main>
  );
}
