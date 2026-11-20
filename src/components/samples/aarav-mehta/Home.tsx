"use client";

import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Feature } from "../shared/Feature";
import { AM, BASE, FEATURED_IN, PHOTOS, PHOTO_AARAV, SLIDES, STORIES, TESTIMONIALS } from "./data";
import { Btn, Caption, EASE, Lines, MONO, SERIF, Up } from "./shared";

export function AaravHome() {
  return (
    <main>
      <Hero />
      <Intro />
      <Featured />
      <Stories />
      <Moments />
      <Words />
      <Final />
    </main>
  );
}

/* ───────────────────────── Hero slideshow ───────────────────────── */

const SLIDE_MS = 6000;

function Timecode() {
  const [s, setS] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setS((v) => v + 1), 1000);
    return () => clearInterval(t);
  }, []);
  const f = (n: number) => String(n).padStart(2, "0");
  return (
    <span>
      00:{f(Math.floor(s / 60) % 60)}:{f(s % 60)}
    </span>
  );
}

function Hero() {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 160]);

  useEffect(() => {
    if (reduce) return;
    const t = setTimeout(() => setI((v) => (v + 1) % SLIDES.length), SLIDE_MS);
    return () => clearTimeout(t);
  }, [i, reduce]);

  const s = SLIDES[i];
  return (
    <Feature id="hero-slideshow" label="Full-screen story slideshow">
      <section ref={ref} className="relative h-[100svh] min-h-[600px] overflow-hidden bg-black">
        <motion.div style={{ y }} className="absolute inset-0">
          <AnimatePresence initial={false}>
            <motion.div key={s.img} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.6, ease: "easeInOut" }}>
              <motion.div className="absolute inset-0" initial={{ scale: 1.14 }} animate={{ scale: 1 }} transition={{ duration: 7.5, ease: "linear" }}>
                <Image src={s.img} alt={`${s.couple}, ${s.place}`} fill priority={i === 0} sizes="100vw" className="object-cover" style={{ objectPosition: s.pos }} />
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/50" />

        {/* Viewfinder overlay */}
        <div aria-hidden className="pointer-events-none absolute inset-4 sm:inset-8">
          {["left-0 top-16 border-l border-t sm:top-20", "right-0 top-16 border-r border-t sm:top-20", "bottom-0 left-0 border-b border-l", "bottom-0 right-0 border-b border-r"].map((c) => (
            <span key={c} className={`absolute size-6 border-white/60 sm:size-10 ${c}`} />
          ))}
          <span className={`absolute right-3 top-[76px] flex items-center gap-2 sm:right-6 sm:top-[100px] ${MONO}`}>
            <span className="size-2 animate-pulse rounded-full" style={{ background: AM.rec }} /> REC <Timecode />
          </span>
          <span className={`absolute left-3 top-[76px] hidden sm:left-6 sm:top-[100px] sm:block ${MONO}`}>f/1.4 · 1/250 · ISO 400</span>
        </div>

        <div className="absolute inset-x-0 bottom-0 px-5 pb-10 sm:px-10 sm:pb-14">
          <div className="mx-auto flex max-w-[1500px] flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <h1 className="text-[clamp(3.2rem,9vw,9.5rem)] font-medium leading-[0.9] tracking-[-0.045em] [font-variation-settings:'wdth'_80]">
              <Lines now delay={0.3} lines={["I shoot moments,", <span key="b" className={`${SERIF} italic tracking-[-0.02em] [font-variation-settings:normal]`} style={{ color: AM.gold }}>not poses.</span>]} />
            </h1>
            <div className="w-full max-w-[360px]">
              <AnimatePresence mode="wait">
                <motion.div key={s.couple} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.6, ease: EASE }}>
                  <p className={`${SERIF} text-[30px] italic leading-none`}>{s.couple}</p>
                  <p className={`${MONO} mt-2`} style={{ color: AM.mute }}>
                    {s.place}
                  </p>
                </motion.div>
              </AnimatePresence>
              {/* Film-strip progress */}
              <div className="mt-5 flex gap-1.5">
                {SLIDES.map((sl, k) => (
                  <button key={sl.img} type="button" onClick={() => setI(k)} aria-label={`Show ${sl.couple}`} className="relative h-12 flex-1 overflow-hidden rounded-[3px] ring-1 ring-white/20" data-cursor="View">
                    <Image src={sl.img} alt="" fill sizes="80px" className={`object-cover transition-opacity duration-500 ${k === i ? "opacity-100" : "opacity-40"}`} />
                    {k === i && !reduce && <motion.span key={`p-${i}`} className="absolute inset-x-0 bottom-0 h-[3px]" style={{ background: AM.gold }} initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: SLIDE_MS / 1000, ease: "linear" }} />}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Feature>
  );
}

/* ───────────────────────── Intro ───────────────────────── */

function Intro() {
  return (
    <section className="px-5 py-24 sm:px-10 sm:py-36">
      <div className="mx-auto grid max-w-[1500px] items-center gap-14 lg:grid-cols-[1.3fr_0.7fr] lg:gap-24">
        <div>
          <Caption>Hello, I&apos;m Aarav</Caption>
          <Up delay={0.05}>
            <p className={`${SERIF} mt-8 text-[clamp(2rem,4.2vw,4rem)] leading-[1.12]`}>
              I photograph weddings the way they <em style={{ color: AM.gold }}>feel</em>, not just the way they look. The stolen glances, the happy tears, the uncle who
              won&apos;t stop dancing. <em style={{ color: AM.gold }}>That&apos;s</em> your story.
            </p>
          </Up>
          <Up delay={0.15} className="mt-12 grid max-w-[36rem] grid-cols-3 gap-6 border-t pt-8">
            {[
              ["180+", "weddings"],
              ["9 yrs", "behind the lens"],
              ["40", "cities across India"],
            ].map(([k, v]) => (
              <div key={v}>
                <p className="text-[clamp(2rem,3.4vw,3rem)] font-medium leading-none tracking-[-0.04em] [font-variation-settings:'wdth'_80]">{k}</p>
                <p className={`${MONO} mt-2`} style={{ color: AM.mute }}>
                  {v}
                </p>
              </div>
            ))}
          </Up>
        </div>
        <Up delay={0.1} className="relative mx-auto w-full max-w-[440px]">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[4px]">
            <Image src={PHOTO_AARAV} alt="Aarav photographing a couple" fill sizes="(min-width: 1024px) 440px, 90vw" className="object-cover" />
          </div>
          <span className={`${MONO} absolute -bottom-8 left-0`} style={{ color: AM.mute }}>
            Fig. — Aarav at work, Udaipur 2025
          </span>
          <span className={`${SERIF} absolute -right-4 -top-6 rotate-6 rounded-full px-5 py-2 text-[22px] italic text-black sm:-right-10`} style={{ background: AM.gold }}>
            since 2016
          </span>
        </Up>
      </div>
    </section>
  );
}

/* ───────────────────────── Featured in ───────────────────────── */

function Featured() {
  const row = (
    <div className="flex shrink-0 items-center">
      {FEATURED_IN.map((f) => (
        <span key={f} className="flex items-center">
          <span className={`${SERIF} px-10 text-[28px] italic text-[#F2EDE4]/50 sm:text-[36px]`}>{f}</span>
          <span style={{ color: AM.gold }}>✦</span>
        </span>
      ))}
    </div>
  );
  return (
    <section aria-label="Featured in" className="border-y py-8" style={{ borderColor: AM.line }}>
      <p className={`${MONO} mb-5 text-center`} style={{ color: AM.mute }}>
        As featured in
      </p>
      <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_15%,black_85%,transparent)]">
        <div className="marquee [animation-duration:42s]">
          {row}
          {row}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Stories ───────────────────────── */

function StoryCard({ s, big = false, n }: { s: (typeof STORIES)[number]; big?: boolean; n: number }) {
  return (
    <Link href={`${BASE}/stories/${s.slug}`} data-cursor="Read story" className="group relative block overflow-hidden rounded-[4px]">
      <div className={`relative ${big ? "aspect-[4/5] sm:aspect-[21/10]" : "aspect-[4/5]"}`}>
        <Image src={s.cover} alt={s.couple} fill sizes={big ? "100vw" : "(min-width: 768px) 50vw, 100vw"} className="object-cover transition-transform duration-[2000ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.06]" style={{ objectPosition: s.coverPos ?? "50% 50%" }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
        <span className={`absolute left-5 top-5 ${MONO}`}>
          Story {String(n).padStart(2, "0")}
        </span>
        <div className="absolute inset-x-5 bottom-5 sm:inset-x-8 sm:bottom-8">
          <p className={`${MONO}`} style={{ color: AM.gold }}>
            {s.place} · {s.date}
          </p>
          <h3 className={`${SERIF} mt-3 italic leading-[0.95] ${big ? "text-[clamp(2.8rem,7vw,7rem)]" : "text-[clamp(2.4rem,4vw,3.6rem)]"}`}>{s.couple}</h3>
          <p className="mt-2 max-w-[30rem] text-[16px] text-[#F2EDE4]/75">{s.title}</p>
        </div>
      </div>
    </Link>
  );
}

function Stories() {
  return (
    <section className="px-5 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto max-w-[1500px]">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <Caption>Love stories</Caption>
            <h2 className="mt-6 text-[clamp(2.8rem,6vw,6rem)] font-medium leading-[0.95] tracking-[-0.045em] [font-variation-settings:'wdth'_80]">
              <Lines lines={["Recent", <span key="b" className={`${SERIF} italic tracking-[-0.02em] [font-variation-settings:normal]`}>love stories.</span>]} />
            </h2>
          </div>
          <Up>
            <Btn href={`${BASE}/stories`} variant="line" cursor="View all">
              All stories →
            </Btn>
          </Up>
        </div>
        <Feature id="stories" label="Wedding story pages" className="mt-12">
          <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
            <Up className="md:col-span-2">
              <StoryCard s={STORIES[0]} big n={1} />
            </Up>
            {STORIES.slice(1).map((s, i) => (
              <Up key={s.slug} delay={i * 0.1}>
                <StoryCard s={s} n={i + 2} />
              </Up>
            ))}
          </div>
        </Feature>
      </div>
    </section>
  );
}

/* ───────────────────────── Moments (drag gallery) ───────────────────────── */

function Moments() {
  const track = useRef<HTMLDivElement>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const [left, setLeft] = useState(0);
  const picks = PHOTOS.filter((_, i) => i % 2 === 0).slice(0, 10);

  useEffect(() => {
    const measure = () => {
      if (track.current && wrap.current) setLeft(Math.min(0, wrap.current.clientWidth - track.current.scrollWidth));
    };
    // ResizeObserver also fires once right after observe(), giving the initial measurement
    const ro = new ResizeObserver(measure);
    if (wrap.current) ro.observe(wrap.current);
    return () => ro.disconnect();
  }, []);

  return (
    <section className="pb-24 sm:pb-32">
      <div className="mx-auto flex max-w-[1500px] items-end justify-between gap-6 px-5 sm:px-10">
        <div>
          <Caption>Moments</Caption>
          <h2 className={`${SERIF} mt-6 text-[clamp(2.6rem,5vw,4.8rem)] italic leading-none`}>Drag to wander.</h2>
        </div>
        <Btn href={`${BASE}/portfolio`} variant="line" cursor="Gallery" className="hidden sm:inline-flex">
          Full portfolio →
        </Btn>
      </div>
      <Feature id="drag-gallery" label="Drag-to-explore gallery" className="mt-10">
        <div ref={wrap} className="overflow-hidden px-5 sm:px-10">
          <motion.div ref={track} drag="x" dragConstraints={{ left, right: 0 }} dragElastic={0.08} className="flex w-max cursor-grab items-end gap-4 active:cursor-grabbing" data-cursor="Drag">
            {picks.map((p, i) => (
              <motion.div key={p.src} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, ease: EASE, delay: i * 0.05 }} className={`relative shrink-0 overflow-hidden rounded-[4px] ${i % 3 === 0 ? "h-[420px] w-[320px] sm:h-[520px] sm:w-[400px]" : i % 3 === 1 ? "h-[300px] w-[240px] sm:h-[380px] sm:w-[300px]" : "h-[360px] w-[280px] sm:h-[440px] sm:w-[340px]"}`}>
                <Image src={p.src} alt={p.alt} fill sizes="400px" className="pointer-events-none select-none object-cover" draggable={false} />
                <span className={`absolute bottom-3 left-3 ${MONO} text-white/80`}>{String(i + 1).padStart(2, "0")}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Feature>
    </section>
  );
}

/* ───────────────────────── Testimonials ───────────────────────── */

function Words() {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce) return;
    const t = setTimeout(() => setI((v) => (v + 1) % TESTIMONIALS.length), 7000);
    return () => clearTimeout(t);
  }, [i, reduce]);
  const t = TESTIMONIALS[i];
  return (
    <section className="px-5 pb-24 sm:px-10 sm:pb-32">
      <div className="mx-auto grid max-w-[1500px] items-center gap-10 border-t pt-16 lg:grid-cols-[0.6fr_1.4fr] lg:gap-20" style={{ borderColor: AM.line }}>
        <div className="relative mx-auto aspect-[4/5] w-full max-w-[380px] overflow-hidden rounded-[4px]">
          <AnimatePresence initial={false}>
            <motion.div key={t.img} initial={{ opacity: 0, scale: 1.08 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.2, ease: EASE }} className="absolute inset-0">
              <Image src={t.img} alt={t.couple} fill sizes="380px" className="object-cover" />
            </motion.div>
          </AnimatePresence>
        </div>
        <div>
          <Caption>Kind words</Caption>
          <AnimatePresence mode="wait">
            <motion.figure key={t.couple} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.7, ease: EASE }} className="mt-8">
              <blockquote className={`${SERIF} text-[clamp(1.9rem,3.6vw,3.6rem)] italic leading-[1.15]`}>&ldquo;{t.text}&rdquo;</blockquote>
              <figcaption className={`${MONO} mt-8`} style={{ color: AM.gold }}>
                {t.couple} · {t.place}
              </figcaption>
            </motion.figure>
          </AnimatePresence>
          <div className="mt-10 flex gap-2">
            {TESTIMONIALS.map((x, k) => (
              <button key={x.couple} type="button" aria-label={`Show ${x.couple}`} onClick={() => setI(k)} className="h-1 w-12 overflow-hidden rounded-full bg-white/15">
                {k === i && <motion.span key={`t-${i}`} className="block h-full" style={{ background: AM.gold }} initial={{ width: reduce ? "100%" : 0 }} animate={{ width: "100%" }} transition={{ duration: reduce ? 0 : 7, ease: "linear" }} />}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Final CTA ───────────────────────── */

function Final() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : -80, reduce ? 0 : 80]);
  return (
    <section ref={ref} className="relative flex min-h-[80svh] items-center overflow-hidden px-5 py-24 sm:px-10">
      <motion.div style={{ y }} className="absolute -inset-y-24 inset-x-0">
        <Image src="/images/aarav-mehta/hero-woods.jpg" alt="" fill sizes="100vw" className="object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-black/55" />
      <div className="relative mx-auto w-full max-w-[1500px] text-center">
        <Caption className="justify-center">Booking 2026 – 27</Caption>
        <h2 className="mt-8 text-[clamp(3rem,8vw,8.5rem)] font-medium leading-[0.92] tracking-[-0.045em] [font-variation-settings:'wdth'_80]">
          <Lines lines={["Your date might", <span key="b" className={`${SERIF} italic tracking-[-0.02em] [font-variation-settings:normal]`} style={{ color: AM.gold }}>still be free.</span>]} />
        </h2>
        <p className="mx-auto mt-8 max-w-[30rem] text-[17px] text-[#F2EDE4]/75">I take only 30 weddings a year so every couple gets my full attention. Check your date in 10 seconds.</p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Btn href={`${BASE}/book`} variant="gold" cursor="Book">
            Check my dates →
          </Btn>
          <Btn href={`${BASE}/packages`} variant="line" cursor="Pricing">
            See packages
          </Btn>
        </div>
      </div>
    </section>
  );
}
