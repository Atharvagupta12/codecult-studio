"use client";

import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { Feature } from "../shared/Feature";
import { LineChart } from "./Chart";
import { BASE, CASES, COACHES, FG, METHOD, PROGRAMS } from "./data";
import { Asterisk, Btn, D, EASE, Index, Lines, MONO, OpenBadge, ScrollText, Up } from "./shared";

export function ForgeHome() {
  return (
    <main>
      <Hero />
      <Strip />
      <Statement />
      <Method />
      <Programs />
      <Proof />
      <Coaches />
      <FinalCta />
    </main>
  );
}

/* ───────────────────────── Hero ───────────────────────── */

function TrialBadge({ className = "" }: { className?: string }) {
  return (
    <Link href={`${BASE}/trial`} data-cursor="Book" aria-label="Book a free trial" className={`group grid size-[118px] place-items-center sm:size-[150px] ${className}`}>
      <svg viewBox="0 0 200 200" className="absolute size-full animate-[spin_18s_linear_infinite] motion-reduce:animate-none">
        <defs>
          <path id="fg-badge" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <text fill={FG.bone} style={{ fontFamily: "var(--fg-mono)", fontSize: 15, letterSpacing: "0.22em" }}>
          <textPath href="#fg-badge">BOOK A FREE TRIAL · BOOK A FREE TRIAL ·</textPath>
        </text>
      </svg>
      <span className="grid size-14 place-items-center rounded-full text-black transition-transform duration-500 group-hover:scale-110 sm:size-[70px]" style={{ background: FG.heat }}>
        <Asterisk className="size-6 sm:size-7" />
      </span>
    </Link>
  );
}

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 140]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.12]);

  return (
    <section ref={ref} className="relative flex min-h-[100svh] flex-col overflow-hidden px-5 pb-24 pt-28 sm:px-8 sm:pb-28 sm:pt-32">
      <div className="mx-auto flex w-full max-w-[1480px] flex-1 flex-col">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.3 }} className={`grid grid-cols-2 gap-4 border-b pb-4 sm:grid-cols-4 ${MONO}`} style={{ borderColor: FG.line, color: FG.mute }}>
          <span>
            <span style={{ color: FG.heat }}>(Est.)</span> 2019
          </span>
          <span className="text-right sm:text-left">Strength · Conditioning</span>
          <span className="hidden sm:block">Coach-led performance studio</span>
          <span className="hidden text-right sm:block">Indore · 22.72° N</span>
        </motion.div>

        <div className="relative flex-1">
          {/* Portrait */}
          <motion.div
            initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1], delay: 0.5 }}
            className="relative ml-auto mt-8 aspect-[4/5] w-[78%] overflow-hidden sm:absolute sm:right-0 sm:top-8 sm:mt-0 sm:w-[44%] lg:w-[30%]"
          >
            <motion.div style={{ y: imgY, scale }} className="absolute -inset-y-16 inset-x-0">
              <Image src="/images/forge-athletics/squat-bw.jpg" alt="Athlete loading a back squat" fill priority sizes="(min-width: 1024px) 34vw, (min-width: 640px) 44vw, 78vw" className="object-cover grayscale" />
            </motion.div>
            <span className={`absolute left-3 top-3 bg-black/60 px-2.5 py-1.5 backdrop-blur sm:bottom-4 sm:left-4 sm:top-auto ${MONO}`}>Fig. 01 — Back squat, 6 am crew</span>
          </motion.div>

          <h1 className={`${D} relative z-10 -mt-16 text-[clamp(2.9rem,9.2vw,11rem)] leading-[0.86] tracking-[-0.05em] sm:mt-[8vh] lg:mt-[7vh]`}>
            <Lines now delay={0.35} lines={["Built,", <span key="b" style={{ color: FG.heat }}>not bought.</span>]} />
          </h1>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: EASE, delay: 0.9 }} className="relative mt-8 grid items-end gap-8 border-t pt-6 lg:grid-cols-[1.1fr_1fr_auto]" style={{ borderColor: FG.line }}>
          <p className="max-w-[30rem] text-[17px] leading-relaxed sm:text-[19px]" style={{ color: FG.mute }}>
            Coach-led strength training for people who want real, lasting results. Programmed. Tracked. <span style={{ color: FG.bone }}>Proven every 12 weeks.</span>
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Btn href={`${BASE}/trial`} cursor="Book">
              Claim free trial →
            </Btn>
            <Btn href={`${BASE}/membership#quiz`} variant="line" cursor="Quiz">
              30-sec goal quiz
            </Btn>
          </div>
          <div className="hidden items-center gap-6 lg:flex">
            <Feature id="open" label="Live open / closed status" inline>
              <OpenBadge />
            </Feature>
            <TrialBadge className="relative" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ───────────────────────── Strip ───────────────────────── */

function Strip() {
  const words = ["Strength", "Conditioning", "Coaching", "Nutrition", "Re-test day", "Results"];
  const row = (
    <div className="flex shrink-0 items-center">
      {words.map((w) => (
        <span key={w} className="flex items-center">
          <span className={`${D} px-7 text-[30px] tracking-[-0.03em] sm:text-[46px]`}>{w}</span>
          <Asterisk className="size-6 shrink-0 sm:size-8" />
        </span>
      ))}
    </div>
  );
  return (
    <div aria-hidden className="overflow-hidden py-4 text-black sm:py-5" style={{ background: FG.heat }}>
      <div className="marquee [animation-duration:32s]">
        {row}
        {row}
      </div>
    </div>
  );
}

/* ───────────────────────── Statement ───────────────────────── */

function Statement() {
  return (
    <section className="px-5 py-20 sm:px-8 sm:py-32">
      <div className="mx-auto grid max-w-[1480px] gap-8 lg:grid-cols-[0.3fr_1fr]">
        <Index n="01">Manifesto</Index>
        <ScrollText
          text="We don't sell memberships. We coach people. Every session is programmed, every rep is watched, and every twelve weeks we prove it on re-test day."
          accent={["coach", "programmed", "prove"]}
          className={`${D} text-[clamp(1.35rem,4.4vw,4.6rem)] leading-[1.05] tracking-[-0.035em]`}
        />
      </div>
    </section>
  );
}

/* ───────────────────────── The Forge Method (pinned) ───────────────────────── */

function Method() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const bar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  useMotionValueEvent(scrollYProgress, "change", (p) => setActive(Math.min(METHOD.length - 1, Math.floor(p * METHOD.length))));
  const m = METHOD[active];

  return (
    <Feature id="method" label="Scroll story: The Forge Method">
      {/* Desktop: pinned story */}
      <section ref={ref} className="relative hidden h-[420vh] lg:block">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden px-8">
          <div className="mx-auto grid w-full max-w-[1480px] grid-cols-[1fr_1fr] items-center gap-16">
            <div>
              <Index n="02">The Forge Method · 12 weeks</Index>
              <div className="mt-10 flex gap-3">
                {METHOD.map((x, i) => (
                  <span key={x.n} className={`${MONO} flex-1 border-t-2 pt-3 transition-colors duration-500`} style={{ borderColor: i <= active ? FG.heat : FG.line, color: i === active ? FG.bone : FG.mute }}>
                    {x.n} {x.name}
                  </span>
                ))}
              </div>
              <AnimatePresence mode="wait">
                <motion.div key={m.n} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.55, ease: EASE }}>
                  <p className={`${MONO} mt-12`} style={{ color: FG.heat }}>
                    {m.when}
                  </p>
                  <h2 className={`${D} mt-3 text-[clamp(4rem,9vw,9.5rem)] leading-[0.85] tracking-[-0.05em]`}>{m.name}.</h2>
                  <p className="mt-6 max-w-[30rem] text-[19px] leading-relaxed" style={{ color: FG.mute }}>
                    {m.text}
                  </p>
                  <p className="mt-10 flex items-baseline gap-4 border-t pt-5" style={{ borderColor: FG.line }}>
                    <span className={`${D} text-[56px] leading-none tracking-[-0.04em]`} style={{ color: FG.heat }}>
                      {m.stat[0]}
                    </span>
                    <span className={MONO} style={{ color: FG.mute }}>
                      {m.stat[1]}
                    </span>
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="relative h-[78vh] overflow-hidden" style={{ background: FG.panel }}>
              <AnimatePresence initial={false}>
                <motion.div key={m.img} initial={{ clipPath: "inset(100% 0 0 0)" }} animate={{ clipPath: "inset(0% 0 0 0)" }} exit={{ opacity: 0, transition: { delay: 0.5, duration: 0.2 } }} transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }} className="absolute inset-0">
                  <motion.div initial={{ scale: 1.25 }} animate={{ scale: 1 }} transition={{ duration: 1.4, ease: EASE }} className="absolute inset-0">
                    <Image src={m.img} alt={m.name} fill sizes="50vw" className="object-cover grayscale" />
                  </motion.div>
                </motion.div>
              </AnimatePresence>
              <span className={`${D} absolute bottom-4 right-6 text-[160px] leading-none tracking-[-0.06em] text-transparent [-webkit-text-stroke:2px_#FF4D2E]`}>{m.n}</span>
              <div className="absolute inset-y-0 right-0 w-1 bg-white/10">
                <motion.div className="w-full" style={{ height: bar, background: FG.heat }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile: stacked chapters */}
      <section className="px-5 py-14 sm:px-8 lg:hidden">
        <Index n="02">The Forge Method · 12 weeks</Index>
        <div className="mt-8 flex flex-col gap-10">
          {METHOD.map((x) => (
            <Up key={x.n}>
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image src={x.img} alt={x.name} fill sizes="100vw" className="object-cover grayscale" />
                <span className={`${D} absolute bottom-2 right-4 text-[80px] leading-none text-transparent [-webkit-text-stroke:1.5px_#FF4D2E]`}>{x.n}</span>
              </div>
              <p className={`${MONO} mt-5`} style={{ color: FG.heat }}>
                {x.when}
              </p>
              <h3 className={`${D} mt-2 text-[36px] leading-none tracking-[-0.04em] sm:text-[48px]`}>{x.name}.</h3>
              <p className="mt-3 text-[16px] leading-relaxed" style={{ color: FG.mute }}>
                {x.text}
              </p>
              <p className="mt-4 flex items-baseline gap-3">
                <span className={`${D} text-[32px] leading-none`} style={{ color: FG.heat }}>
                  {x.stat[0]}
                </span>
                <span className={MONO} style={{ color: FG.mute }}>
                  {x.stat[1]}
                </span>
              </p>
            </Up>
          ))}
        </div>
      </section>
    </Feature>
  );
}

/* ───────────────────────── Programs ───────────────────────── */

function Intensity({ n }: { n: number }) {
  return (
    <span className="flex gap-1" aria-label={`Intensity ${n} of 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className="h-1 w-5" style={{ background: i <= n ? FG.heat : FG.line }} />
      ))}
    </span>
  );
}

function Programs() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-[1480px] px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <Index n="03">Programs</Index>
            <h2 className={`${D} mt-6 text-[clamp(2rem,6vw,6rem)] leading-[0.9] tracking-[-0.045em]`}>
              <Lines lines={["Four paths.", <span key="b" style={{ color: FG.heat }}>One standard.</span>]} />
            </h2>
          </div>
          <Up>
            <Btn href={`${BASE}/programs`} variant="line" cursor="View">
              All programs →
            </Btn>
          </Up>
        </div>
      </div>
      <div className="mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:px-8 lg:mx-auto lg:grid lg:max-w-[1480px] lg:grid-cols-4 lg:overflow-visible">
        {PROGRAMS.map((p, i) => (
          <Up key={p.id} delay={i * 0.08} className="w-[78%] shrink-0 snap-start sm:w-[46%] lg:w-auto">
            <Link href={`${BASE}/programs#${p.id}`} data-cursor="View" className="group block">
              <div className="relative aspect-[3/4] overflow-hidden" style={{ background: FG.panel }}>
                <Image src={p.img} alt={p.name} fill sizes="(min-width: 1024px) 25vw, 78vw" className="object-cover grayscale transition-transform duration-[1400ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-110" style={{ objectPosition: p.pos ?? "50% 50%" }} />
                <div className="absolute inset-0 bg-[#FF4D2E] opacity-0 mix-blend-multiply transition-opacity duration-700 group-hover:opacity-70" />
                <span className={`${MONO} absolute left-4 top-4 bg-black/60 px-2 py-1 backdrop-blur`}>
                  {p.weeks} wks · {p.perWeek}/wk
                </span>
                <span className={`${D} absolute bottom-3 right-4 text-[64px] leading-none text-white/90`}>{p.n}</span>
              </div>
              <div className="mt-5">
                <Intensity n={p.intensity} />
                <h3 className={`${D} mt-4 text-[20px] leading-none tracking-[-0.03em] transition-colors group-hover:text-[#FF4D2E] sm:text-[24px] xl:text-[28px]`}>{p.name}</h3>
                <p className="mt-2 text-[15px]" style={{ color: FG.mute }}>
                  {p.line}
                </p>
              </div>
            </Link>
          </Up>
        ))}
      </div>
    </section>
  );
}

/* ───────────────────────── Proof (chart) ───────────────────────── */

function Proof() {
  const c = CASES[1];
  return (
    <section className="px-5 pb-20 sm:px-8 sm:pb-28">
      <div className="mx-auto grid max-w-[1480px] gap-10 border-t pt-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20" style={{ borderColor: FG.line }}>
        <div>
          <Index n="04">Proof, not promises</Index>
          <h2 className={`${D} mt-6 text-[clamp(4rem,11vw,11rem)] leading-[0.82] tracking-[-0.06em]`} style={{ color: FG.heat }}>
            <Lines lines={["+32%"]} />
          </h2>
          <p className={`${D} mt-3 text-[clamp(1.4rem,2.4vw,2.2rem)] leading-tight tracking-[-0.02em]`}>Average strength gain in one 12-week block.</p>
          <p className="mt-5 max-w-[28rem] text-[16px] leading-relaxed" style={{ color: FG.mute }}>
            Every member is tested on day one and on re-test day. We publish the numbers because we&apos;re proud of them.
          </p>
          <div className="mt-8">
            <Btn href={`${BASE}/results`} variant="line" cursor="Read">
              See case studies →
            </Btn>
          </div>
        </div>
        <Up delay={0.1}>
          <div className="border p-5 sm:p-8" style={{ borderColor: FG.line, background: FG.panel }}>
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <p className={MONO} style={{ color: FG.mute }}>
                {c.name} · {c.program}
              </p>
              <p className={MONO} style={{ color: FG.heat }}>
                {c.metric}
              </p>
            </div>
            <LineChart series={c.series} unit={c.unit} className="mt-6" />
            <p className={`${D} mt-6 text-[28px] leading-tight tracking-[-0.02em]`}>{c.headline}</p>
            <p className="mt-2 text-[15px] italic leading-relaxed" style={{ color: FG.mute }}>
              &ldquo;{c.quote}&rdquo;
            </p>
          </div>
        </Up>
      </div>
    </section>
  );
}

/* ───────────────────────── Coaches teaser ───────────────────────── */

function Coaches() {
  return (
    <section className="pb-20 sm:pb-28">
      <div className="mx-auto flex max-w-[1480px] flex-col justify-between gap-6 px-5 sm:px-8 lg:flex-row lg:items-end">
        <div>
          <Index n="05">Coaches</Index>
          <h2 className={`${D} mt-6 text-[clamp(2rem,6vw,6rem)] leading-[0.9] tracking-[-0.045em]`}>
            <Lines lines={["Your coach,", <span key="b" style={{ color: FG.heat }}>not a trainer.</span>]} />
          </h2>
        </div>
        <Up>
          <Btn href={`${BASE}/coaches`} variant="line" cursor="Meet">
            Meet the team →
          </Btn>
        </Up>
      </div>
      <div className="mt-12 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:px-8 lg:mx-auto lg:grid lg:max-w-[1480px] lg:grid-cols-4 lg:overflow-visible">
        {COACHES.map((c, i) => (
          <Up key={c.id} delay={i * 0.08} className="w-[70%] shrink-0 snap-start sm:w-[40%] lg:w-auto">
            <Link href={`${BASE}/coaches#${c.id}`} data-cursor="Meet" className="group block">
              <div className="relative aspect-[4/5] overflow-hidden" style={{ background: FG.panel }}>
                <Image src={c.img} alt={c.name} fill sizes="(min-width: 1024px) 25vw, 70vw" className="object-cover grayscale transition-all duration-700 group-hover:scale-105" style={{ objectPosition: c.pos }} />
                <div className="absolute inset-x-0 bottom-0 translate-y-full p-4 transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-y-0" style={{ background: FG.heat }}>
                  <p className="text-[14px] font-medium leading-snug text-black">&ldquo;{c.quote}&rdquo;</p>
                </div>
              </div>
              <p className={`${MONO} mt-4`} style={{ color: FG.heat }}>
                {c.years} yrs coaching
              </p>
              <h3 className={`${D} mt-2 text-[20px] leading-none tracking-[-0.02em] xl:text-[22px]`}>{c.name}</h3>
              <p className="mt-1.5 text-[14px]" style={{ color: FG.mute }}>
                {c.role}
              </p>
            </Link>
          </Up>
        ))}
      </div>
    </section>
  );
}

/* ───────────────────────── Final CTA ───────────────────────── */

function FinalCta() {
  return (
    <section className="relative overflow-hidden px-5 py-24 text-black sm:px-8 sm:py-32" style={{ background: FG.bone }}>
      <div className="mx-auto max-w-[1480px]">
        <p className={MONO} style={{ color: FG.heat }}>
          (06) Your move
        </p>
        <h2 className={`${D} mt-6 text-[clamp(3.2rem,10vw,11rem)] leading-[0.85] tracking-[-0.055em]`}>
          <Lines lines={["Your trial", <span key="b" style={{ color: FG.heat }}>is waiting.</span>]} />
        </h2>
        <div className="mt-12 flex flex-col justify-between gap-8 border-t border-black/15 pt-8 lg:flex-row lg:items-center">
          <p className="max-w-[32rem] text-[17px] leading-relaxed text-black/65">One coached session, a body-composition scan and a goal plan. Free. Pick a slot and we&apos;ll see you on the floor.</p>
          <div className="flex flex-wrap gap-3">
            <Btn href={`${BASE}/trial`} cursor="Book">
              Book my free trial →
            </Btn>
            <Link href={`${BASE}/membership`} data-cursor="Plans" className="inline-flex h-14 items-center rounded-full border border-black/25 px-7 text-[13px] font-semibold uppercase tracking-[0.14em] transition-colors hover:bg-black hover:text-[#EDEAE4]">
              Membership
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
