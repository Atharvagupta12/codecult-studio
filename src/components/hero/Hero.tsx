"use client";

import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { HERO_NICHES } from "@/data/hero-niches";
import { TIERS, buildThisMessage } from "@/data/samples";
import { waLink } from "@/lib/site";
import { ArrowIcon, CheckIcon, WhatsAppIcon } from "../ui/icons";
import { Magnetic } from "../ui/Magnetic";
import { DesktopPreview, MobilePreview } from "./NichePreview";
import { ScaledFrame } from "./ScaledFrame";

const CYCLE_MS = 4200;
const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const [index, setIndex] = useState(0);
  const [tick, setTick] = useState(0); // restarts the timer + progress bar
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { amount: 0.25 });
  const reduce = useReducedMotion();
  const niche = HERO_NICHES[index];
  const s = niche.sample;

  // Auto-cycle through niches while the hero is visible
  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => setIndex((i) => (i + 1) % HERO_NICHES.length), CYCLE_MS);
    return () => clearTimeout(t);
  }, [index, tick, inView]);

  function pick(i: number) {
    setIndex(i);
    setTick((t) => t + 1);
  }

  // Subtle 3D tilt of the device stack following the cursor
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [7, -7]), { stiffness: 80, damping: 18 });
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [-5, 5]), { stiffness: 80, damping: 18 });
  function onPointerMove(e: React.PointerEvent) {
    if (reduce || e.pointerType !== "mouse") return;
    mx.set(e.clientX / window.innerWidth - 0.5);
    my.set(e.clientY / window.innerHeight - 0.5);
  }

  return (
    <section
      id="top"
      ref={sectionRef}
      onPointerMove={onPointerMove}
      className="relative isolate flex flex-col overflow-hidden pt-24 sm:pt-32 lg:min-h-[100svh]"
    >
      {/* ── Background: niche-coloured glows, editorial rules, vignette ── */}
      <div aria-hidden className="absolute inset-0 -z-10">
        {HERO_NICHES.map((n, i) => (
          <div
            key={n.id}
            className="absolute inset-0 transition-opacity duration-[1400ms] ease-out"
            style={{
              opacity: i === index ? 1 : 0,
              background: `radial-gradient(60% 55% at 78% 45%, ${n.glow}59 0%, transparent 70%), radial-gradient(40% 40% at 10% 100%, ${n.glow}26 0%, transparent 70%)`,
            }}
          />
        ))}
        <div className="bg-rules absolute inset-0" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
      </div>

      <div className="mx-auto grid w-full max-w-[1400px] flex-1 grid-cols-1 items-center gap-10 px-5 sm:gap-14 sm:px-8 lg:grid-cols-[1.08fr_1fr] lg:gap-8">
        {/* ── Left: copy ── */}
        <div className="relative z-10 flex flex-col items-start">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="mb-5 inline-flex items-center gap-2.5 rounded-full sm:mb-7 border border-line bg-cream/[0.04] py-1.5 pl-2 pr-4 font-mono text-[11px] uppercase tracking-[0.14em] text-cream/70 backdrop-blur"
          >
            <span className="relative flex size-2.5 items-center justify-center">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-wa/60" />
              <span className="relative size-1.5 rounded-full bg-wa" />
            </span>
            Taking new projects<span className="hidden sm:inline"> · Indore → All India</span>
          </motion.span>

          <h1 className="text-[clamp(3.4rem,8.6vw,8.4rem)] font-medium leading-[0.9] tracking-[-0.055em]">
            <motion.span
              className="block"
              initial={{ opacity: 0, y: "0.4em" }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.1 }}
            >
              Bring your
            </motion.span>
            <span className="relative block h-[1.02em] overflow-visible">
              <span className="sr-only">business</span>
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={niche.id}
                  aria-hidden
                  className="absolute left-0 top-0 block whitespace-nowrap pr-4 font-serif text-[1.16em] font-normal italic leading-[0.88] tracking-[-0.03em]"
                  style={{ color: niche.tint }}
                >
                  {niche.word.split("").map((ch, i) => (
                    <motion.span
                      key={i}
                      className="inline-block"
                      initial={reduce ? { opacity: 0 } : { y: "0.7em", opacity: 0, filter: "blur(8px)", rotate: 6 }}
                      animate={{ y: 0, opacity: 1, filter: "blur(0px)", rotate: 0 }}
                      exit={reduce ? { opacity: 0 } : { y: "-0.5em", opacity: 0, filter: "blur(8px)" }}
                      transition={{ duration: 0.7, ease: EASE, delay: i * 0.035 }}
                    >
                      {ch}
                    </motion.span>
                  ))}
                </motion.span>
              </AnimatePresence>
            </span>
            <motion.span
              className="block"
              initial={{ opacity: 0, y: "0.4em" }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.2 }}
            >
              online<span className="text-ember">.</span>
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.35 }}
            className="mt-6 max-w-[34rem] text-[16px] leading-[1.6] text-cream/65 sm:mt-8 sm:text-[19px]"
          >
            Stunning websites for local businesses, <span className="text-cream">designed and developed by one studio</span>, so UI/UX
            design costs you <span className="font-serif text-[1.2em] italic text-cream">₹0 extra</span>. Pick a ready design, go live in
            5–7 days.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.45 }}
            className="mt-8 flex w-full items-center gap-3 sm:mt-10 sm:w-auto sm:flex-wrap"
          >
            <Magnetic className="flex-1 sm:flex-none">
              <a
                href="#work"
                className="group relative inline-flex h-14 w-full items-center justify-between gap-3 overflow-hidden rounded-full bg-ember pl-6 pr-2 text-[16px] font-semibold text-ink sm:w-auto sm:pl-7"
              >
                <span className="relative z-10 whitespace-nowrap">
                  <span className="sm:hidden">See designs &amp; prices</span>
                  <span className="hidden sm:inline">See sample websites</span>
                </span>
                <span className="relative z-10 grid size-10 place-items-center rounded-full bg-ink text-cream transition-transform duration-500 group-hover:-rotate-45">
                  <ArrowIcon className="size-4" />
                </span>
                <span className="absolute inset-0 origin-left scale-x-0 bg-cream transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-x-100" />
              </a>
            </Magnetic>
            <a
              href={waLink()}
              target="_blank"
              rel="noopener"
              aria-label="Chat on WhatsApp"
              className="inline-flex size-14 shrink-0 items-center justify-center gap-2.5 rounded-full border border-cream/20 text-[16px] font-medium text-cream transition-colors hover:border-wa hover:bg-wa/10 sm:w-auto sm:px-6"
            >
              <WhatsAppIcon className="size-6 text-wa sm:size-5" />
              <span className="hidden sm:inline">Chat on WhatsApp</span>
            </a>
          </motion.div>
        </div>

        {/* ── Right: device stack ── */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.4, ease: EASE, delay: 0.3 }}
          className="relative mx-auto w-full max-w-[640px] [perspective:1800px]"
        >
          <motion.div style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }} className="relative aspect-[1/1.28] w-full sm:aspect-[1/0.98]">
            {/* Browser window */}
            <div className="absolute right-0 top-[4%] hidden w-[94%] overflow-hidden rounded-[14px] border border-cream/10 bg-ink-3 shadow-[0_40px_120px_-20px_rgba(0,0,0,0.8)] sm:block">
              <div className="flex items-center gap-3 border-b border-cream/[0.07] px-4 py-3">
                <span className="flex gap-1.5">
                  <span className="size-2.5 rounded-full bg-cream/15" />
                  <span className="size-2.5 rounded-full bg-cream/15" />
                  <span className="size-2.5 rounded-full bg-cream/15" />
                </span>
                <span className="mx-auto flex min-w-0 items-center gap-1.5 rounded-md bg-cream/[0.06] px-3 py-1 font-mono text-[11px] text-cream/60">
                  <svg viewBox="0 0 24 24" className="size-3" fill="none" stroke="currentColor" strokeWidth={2.2}>
                    <rect x="5" y="11" width="14" height="10" rx="2" />
                    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                  </svg>
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span key={s.domain} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
                      {s.domain}
                    </motion.span>
                  </AnimatePresence>
                </span>
                <span className="w-[42px]" />
              </div>
              <ScaledFrame baseWidth={1280} baseHeight={800}>
                <AnimatePresence initial={false}>
                  <motion.div
                    key={niche.id}
                    className="absolute inset-0"
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.9, ease: EASE }}
                  >
                    <DesktopPreview s={s} priority={index === 0} />
                  </motion.div>
                </AnimatePresence>
              </ScaledFrame>
            </div>

            {/* Phone */}
            <div
              className="absolute bottom-0 left-[3%] w-[58%] sm:left-auto sm:right-[5%] sm:w-[30%]"
              style={{ transform: "translateZ(60px)" }}
            >
              <div className="rounded-[2.6rem] bg-[#050505] p-[7px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.9)] ring-1 ring-cream/15 sm:rounded-[2.1rem] sm:p-[5px]">
                <div className="relative overflow-hidden rounded-[2.2rem] sm:rounded-[1.75rem]">
                  <span className="absolute left-1/2 top-2 z-20 h-[18px] w-[30%] -translate-x-1/2 rounded-full bg-black" />
                  <ScaledFrame baseWidth={390} baseHeight={844}>
                    <AnimatePresence initial={false}>
                      <motion.div
                        key={niche.id}
                        className="absolute inset-0"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.9, ease: EASE, delay: 0.08 }}
                      >
                        <MobilePreview s={s} priority={index === 0} />
                      </motion.div>
                    </AnimatePresence>
                  </ScaledFrame>
                </div>
              </div>
            </div>

            {/* Floating: UI/UX chip */}
            <motion.div
              animate={reduce ? undefined : { y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-[2%] left-[2%] z-20 sm:left-[6%]"
              style={{ z: 90 }}
            >
              <span className="inline-flex -rotate-[4deg] items-center gap-2 rounded-full bg-cream py-2 pl-2 pr-4 text-[13px] font-semibold text-ink shadow-2xl">
                <span className="grid size-6 place-items-center rounded-full bg-ink text-ember">
                  <CheckIcon className="size-3.5" />
                </span>
                UI/UX design included · ₹0
              </span>
            </motion.div>

            {/* Floating: price card */}
            <motion.div
              animate={reduce ? undefined : { y: [0, 10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute right-0 top-[22%] z-20 w-[min(230px,54%)] sm:bottom-[7%] sm:left-0 sm:right-auto sm:top-auto sm:w-[min(250px,56%)]"
              style={{ z: 120 }}
            >
              <div className="rounded-2xl border border-cream/10 bg-ink/75 p-4 shadow-[0_30px_80px_-10px_rgba(0,0,0,0.8)] backdrop-blur-xl">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={niche.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35, ease: EASE }}
                  >
                    <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-cream/50">
                      <span>{niche.label} sample</span>
                      <span style={{ color: niche.tint }}>{s.tier}</span>
                    </div>
                    <div className="mt-2 flex items-baseline gap-2">
                      <span className="font-serif text-[40px] leading-none">{TIERS[s.tier].price}</span>
                      <span className="text-[12px] text-cream/50">one-time</span>
                    </div>
                    <div className="mt-1 text-[12px] text-cream/55">Live in {TIERS[s.tier].days} days · Free hosting</div>
                    <a
                      href={waLink(buildThisMessage(s))}
                      target="_blank"
                      rel="noopener"
                      className="mt-3.5 flex h-10 items-center justify-between rounded-full bg-cream pl-4 pr-1.5 text-[13px] font-semibold text-ink transition-colors hover:bg-ember"
                    >
                      Build this for me
                      <span className="grid size-7 place-items-center rounded-full bg-ink text-cream">
                        <ArrowIcon className="size-3.5" />
                      </span>
                    </a>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>

          {/* Niche picker */}
          <div className="mt-6 flex flex-col items-center gap-3 sm:mt-10">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-cream/40">Pick your business</span>
            <div role="tablist" aria-label="Business type" className="flex max-w-full gap-0.5 overflow-x-auto rounded-full border border-line bg-ink/40 p-1 backdrop-blur [scrollbar-width:none] sm:gap-1.5 sm:p-1.5">
              {HERO_NICHES.map((n, i) => {
                const active = i === index;
                return (
                  <button
                    key={n.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => pick(i)}
                    className={`relative shrink-0 overflow-hidden rounded-full px-3 py-2 text-[12.5px] font-medium transition-colors sm:px-4 sm:text-[13px] ${
                      active ? "text-ink" : "text-cream/60 hover:text-cream"
                    }`}
                  >
                    {active && (
                      <motion.span layoutId="pill" className="absolute inset-0 rounded-full bg-cream" transition={{ type: "spring", stiffness: 380, damping: 32 }} />
                    )}
                    {active && inView && (
                      <motion.span
                        key={`${index}-${tick}`}
                        className="absolute bottom-0 left-0 h-[2px] origin-left"
                        style={{ background: n.glow, width: "100%" }}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: CYCLE_MS / 1000, ease: "linear" }}
                      />
                    )}
                    <span className="relative">{n.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Bottom proof strip ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.8 }}
        className="mx-auto mt-10 w-full max-w-[1400px] px-5 pb-6 sm:px-8 lg:mt-14"
      >
        <dl className="grid grid-cols-2 border-t border-line pt-3 sm:pt-6 md:grid-cols-4">
          {[
            ["₹0", "UI/UX design fee"],
            ["5–7 days", "From details to live"],
            ["Free", "Hosting, forever"],
            ["1 team", "Design + development"],
          ].map(([k, v], i) => (
            <div key={k} className={`flex flex-col gap-1 py-3 md:px-6 ${i > 0 ? "md:border-l md:border-line" : "md:pl-0"} ${i % 2 ? "pl-5" : ""}`}>
              <dt className="order-2 font-mono text-[11px] uppercase tracking-[0.14em] text-cream/45">{v}</dt>
              <dd className="font-serif text-[26px] leading-none sm:text-[36px]">{k}</dd>
            </div>
          ))}
        </dl>
      </motion.div>
    </section>
  );
}
