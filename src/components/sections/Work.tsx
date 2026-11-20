"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { CarouselDots, useCarouselIndex } from "../ui/CarouselDots";
import { NICHES, SAMPLES, TIERS, buildThisMessage, type NicheId, type SampleSite, type Tier } from "@/data/samples";
import { waLink } from "@/lib/site";
import { DesktopPreview } from "../hero/NichePreview";
import { ScaledFrame } from "../hero/ScaledFrame";
import { ArrowIcon, ArrowUpRightIcon, CheckIcon } from "../ui/icons";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";

const EASE = [0.16, 1, 0.3, 1] as const;

export const TIER_STYLE: Record<Tier, { pill: string; dot: string }> = {
  Essential: { pill: "bg-cream text-ink", dot: "#F3EEE6" },
  Signature: { pill: "bg-ember text-ink", dot: "#FF5A1F" },
  Premium: { pill: "bg-gradient-to-r from-[#F3D98B] via-[#E8C46A] to-[#B88A2E] text-ink", dot: "#E8C46A" },
};

export function Work() {
  const [niche, setNiche] = useState<NicheId>("cafe");
  const samples = SAMPLES.filter((s) => s.niche === niche);
  const [trackRef, active] = useCarouselIndex();

  return (
    <section id="work" className="relative scroll-mt-10 px-5 py-16 sm:px-8 sm:py-24">
      {/* Ghost word */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-16 select-none overflow-hidden text-center font-serif text-[22vw] italic leading-none text-cream/[0.025]">
        showcase
      </div>

      <div className="relative mx-auto max-w-[1400px]">
        <SectionHeading
          index="02"
          label="Sample websites"
          title="Pick a website you love."
          italic="We'll make it yours."
          align="split"
          intro={
            <>
              These aren&apos;t templates. Each one is a <span className="text-cream">complete, custom-designed website</span>. Choose the one that
              fits your business, send us your details, and it goes live with your name, logo and photos.
            </>
          }
        />

        {/* Tabs + tier legend */}
        <Reveal className="mt-8 flex flex-col gap-5 sm:mt-12 lg:flex-row lg:items-center lg:justify-between">
          <div role="tablist" aria-label="Business type" className="grid grid-cols-2 gap-2 sm:flex sm:overflow-x-auto sm:pb-1 sm:[scrollbar-width:none]">
            {NICHES.map((n) => {
              const active = n.id === niche;
              return (
                <button
                  key={n.id}
                  role="tab"
                  type="button"
                  aria-selected={active}
                  aria-controls="work-panel"
                  onClick={() => setNiche(n.id)}
                  className={`relative flex shrink-0 items-center justify-center gap-3 rounded-full border px-3 py-3 text-[14px] font-medium transition-colors sm:px-5 sm:text-[15px] ${
                    active ? "border-transparent text-ink" : "border-line text-cream/65 hover:border-cream/25 hover:text-cream"
                  }`}
                >
                  {active && <motion.span layoutId="work-tab" className="absolute inset-0 rounded-full bg-cream" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
                  <span className="relative sm:hidden">{n.short}</span>
                  <span className="relative hidden sm:inline">{n.label}</span>
                  <span className={`relative hidden font-mono text-[10px] sm:inline ${active ? "text-ink/50" : "text-cream/35"}`}>03</span>
                </button>
              );
            })}
          </div>
          <div className="hidden flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-[0.14em] text-cream/50 lg:flex">
            {(Object.keys(TIERS) as Tier[]).map((t) => (
              <span key={t} className="flex items-center gap-2">
                <span className="size-2 rounded-full" style={{ background: TIER_STYLE[t].dot }} />
                {t} <span className="text-cream">{TIERS[t].price}</span>
              </span>
            ))}
          </div>
        </Reveal>

        {/* Cards */}
        <div id="work-panel" role="tabpanel" className="relative mt-6 sm:mt-8">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={niche}
              ref={trackRef}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
              variants={{ show: { transition: { staggerChildren: 0.08 } } }}
              className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none] sm:mx-0 sm:px-0 lg:grid lg:grid-cols-3 lg:gap-5 lg:overflow-visible lg:pb-0"
            >
              {samples.map((s) => (
                <SampleCard key={s.slug} s={s} />
              ))}
            </motion.div>
          </AnimatePresence>
          <CarouselDots
            count={samples.length}
            index={active}
            colors={samples.map((s) => TIER_STYLE[s.tier].dot)}
            hint="Swipe to compare"
            className="mt-2"
          />
        </div>

        <Reveal className="mt-6 flex flex-col items-start justify-between gap-3 rounded-[24px] border border-dashed border-cream/15 p-5 sm:mt-10 sm:flex-row sm:items-center sm:gap-4 sm:p-7">
          <p className="max-w-[40rem] text-[15px] leading-relaxed text-cream/60 sm:text-[16px]">
            Every design is customised with <span className="text-cream">your name, logo, photos, colours and content</span>. Want
            something that isn&apos;t here?
          </p>
          <a href="#custom" className="group inline-flex shrink-0 items-center gap-2 text-[15px] font-semibold text-cream">
            Get a custom website
            <ArrowIcon className="size-4 text-ember transition-transform group-hover:translate-x-1" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

function SampleCard({ s }: { s: SampleSite }) {
  const tier = TIERS[s.tier];
  return (
    <motion.article
      variants={{ hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } } }}
      className="group relative flex w-[86%] shrink-0 snap-center flex-col rounded-[28px] border border-line bg-ink-2 p-2.5 transition-colors duration-500 hover:border-cream/20 sm:w-[60%] lg:w-auto"
    >
      {/* Preview */}
      <div className="relative overflow-hidden rounded-[20px] bg-ink-3">
        <div className="flex items-center gap-2 border-b border-cream/[0.06] px-3.5 py-2.5">
          <span className="flex gap-1">
            <span className="size-2 rounded-full bg-cream/15" />
            <span className="size-2 rounded-full bg-cream/15" />
            <span className="size-2 rounded-full bg-cream/15" />
          </span>
          <span className="mx-auto truncate font-mono text-[10px] text-cream/45">{s.domain}</span>
          <span className="w-6" />
        </div>
        <div className="relative overflow-hidden">
          <div className="transition-transform duration-[1200ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.06]">
            <ScaledFrame baseWidth={1280} baseHeight={800}>
              <DesktopPreview s={s} sizes="(min-width: 1024px) 440px, 86vw" />
            </ScaledFrame>
          </div>
          <span className={`absolute left-3 top-3 rounded-full px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] shadow-lg ${TIER_STYLE[s.tier].pill}`}>
            {s.tier}
          </span>
          {/* Hover veil */}
          <div className="absolute inset-0 grid place-items-center bg-ink/0 opacity-0 transition-all duration-500 group-hover:bg-ink/45 group-hover:opacity-100">
            <span className="inline-flex translate-y-3 items-center gap-2 rounded-full bg-cream px-4 py-2 text-[13px] font-semibold text-ink transition-transform duration-500 group-hover:translate-y-0">
              {s.ready ? "Open live demo" : "Live demo coming soon"}
              <ArrowUpRightIcon className="size-3.5" />
            </span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col px-3 pb-3 pt-5 sm:px-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-[22px] font-medium tracking-[-0.03em]">{s.name}</h3>
            <p className="mt-0.5 text-[14px] text-cream/50">
              {s.kind}
              <span className="sm:hidden"> · {s.style}</span>
            </p>
          </div>
          <span className="hidden shrink-0 rounded-full border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-cream/55 sm:inline-block">{s.style}</span>
        </div>

        <div className="mt-5 flex items-end gap-2 border-t border-line pt-5">
          <span className="font-serif text-[48px] leading-[0.85] tracking-[-0.02em]">{tier.price}</span>
          <span className="pb-1 text-[12px] leading-tight text-cream/45">
            one-time
            <br />
            live in {tier.days} days
          </span>
        </div>

        <ul className="mt-5 grid grid-cols-1 gap-2.5 text-[14px] text-cream/75 sm:grid-cols-2">
          {s.highlights.map((h) => (
            <li key={h} className="flex items-start gap-2">
              <CheckIcon className="mt-[3px] size-3.5 shrink-0 text-ember" />
              {h}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex gap-2 pt-7">
          <a
            href={waLink(buildThisMessage(s))}
            target="_blank"
            rel="noopener"
            className="group/btn relative flex h-12 flex-1 items-center justify-between overflow-hidden rounded-full bg-cream pl-5 pr-1.5 text-[14px] font-semibold text-ink"
          >
            <span className="relative z-10 whitespace-nowrap">Build this for me</span>
            <span className="relative z-10 grid size-9 place-items-center rounded-full bg-ink text-cream transition-transform duration-500 group-hover/btn:-rotate-45">
              <ArrowIcon className="size-4" />
            </span>
            <span className="absolute inset-0 origin-left scale-x-0 bg-ember transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover/btn:scale-x-100" />
          </a>
          {s.ready ? (
            <a
              href={`/samples/${s.slug}`}
              className="grid h-12 place-items-center rounded-full border border-line px-5 text-[14px] font-medium text-cream transition-colors hover:border-cream/40"
            >
              Demo
            </a>
          ) : (
            <span className="hidden h-12 place-items-center rounded-full border border-line px-4 font-mono text-[10px] uppercase tracking-[0.12em] text-cream/35 sm:grid" title="Live demo coming soon">
              Demo soon
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}
