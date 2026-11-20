"use client";

import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { WhatsAppIcon } from "@/components/ui/icons";
import { Feature } from "../shared/Feature";
import { BAND, BASE, EVENTS, FLAVOURS, GALLERY, KC, MENU, REVIEWS } from "./data";
import { COND, D, EASE, HAND, HI, Kulhad, OpenBadge, Stars, Sticker, Up, Wave, useOrderAction } from "./shared";

export function KulhadHome() {
  return (
    <main>
      <Hero />
      <FlavourBand />
      <FlavourPicker />
      <Bestsellers />
      <Numbers />
      <ReviewsCarousel />
      <Events />
      <InstaTeaser />
      <CtaBand />
    </main>
  );
}

/* ───────────────────────── Hero ───────────────────────── */

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const order = useOrderAction();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 120]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -80]);
  const rot = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 90]);

  return (
    <section ref={ref} className="relative -mt-[76px] overflow-hidden pt-[76px]" style={{ background: KC.green, color: KC.cream }}>
      {/* dotted texture */}
      <div aria-hidden className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: "radial-gradient(#F7EDDC 1.4px, transparent 1.4px)", backgroundSize: "22px 22px" }} />

      <div className="relative mx-auto grid max-w-[1320px] items-center gap-14 px-5 pb-20 pt-14 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:pb-28 lg:pt-20">
        <div>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE }} className="flex flex-wrap items-center gap-3">
            <Sticker rotate={-3}>
              <Kulhad className="size-4" /> Since 2019 · Indore
            </Sticker>
            <OpenBadge />
          </motion.div>

          <h1 className={`${D} relative mt-8 text-[clamp(3.3rem,8.2vw,7.4rem)] leading-[0.9] tracking-[-0.03em]`}>
            {["Kadak chai,", "zero drama."].map((l, i) => (
              <span key={l} className="block overflow-hidden pb-[0.05em]">
                <motion.span
                  className="block"
                  style={{ color: i === 1 ? KC.marigold : undefined }}
                  initial={{ y: "105%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1, ease: EASE, delay: 0.1 + i * 0.12 }}
                >
                  {l}
                </motion.span>
              </span>
            ))}
            <motion.span
              initial={{ scale: 0, rotate: -40 }}
              animate={{ scale: 1, rotate: 12 }}
              transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.7 }}
              className={`${HI} absolute -top-[4.6rem] right-0 grid size-[78px] place-items-center rounded-full text-[24px] shadow-[0_8px_0_rgba(0,0,0,0.25)] sm:-top-[7.4rem] sm:right-[10%] sm:size-[112px] sm:text-[36px]`}
              style={{ background: KC.pink, color: KC.paper }}
            >
              कड़क
            </motion.span>
          </h1>

          <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: EASE, delay: 0.4 }} className="mt-7 max-w-[30rem] text-[18px] leading-[1.6] text-[#F7EDDC]/75 sm:text-[20px]">
            Kulhad chai, bun maska aur Indore ka sabse best evening adda. Come hungry, leave happy.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: EASE, delay: 0.5 }} className="mt-9 flex flex-wrap gap-3">
            <Link
              href={`${BASE}/menu`}
              className="group inline-flex h-14 items-center gap-3 rounded-full pl-7 pr-2 text-[16px] font-bold shadow-[0_6px_0_rgba(0,0,0,0.25)] transition-transform hover:-translate-y-0.5"
              style={{ background: KC.marigold, color: KC.green }}
            >
              Explore the menu
              <span className="grid size-10 place-items-center rounded-full transition-transform duration-500 group-hover:rotate-45" style={{ background: KC.green, color: KC.marigold }}>
                ↗
              </span>
            </Link>
            <Feature id="whatsapp" label="Order on WhatsApp" inline>
              <button type="button" onClick={order} className="inline-flex h-14 items-center gap-2.5 rounded-full border-2 border-[#F7EDDC]/40 px-6 text-[16px] font-bold transition-colors hover:border-[#F7EDDC]">
                <WhatsAppIcon className="size-5" /> Order ahead
              </button>
            </Feature>
          </motion.div>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="mt-8 flex items-center gap-2 text-[15px] text-[#F7EDDC]/70">
            <Stars /> 4.7 · 1,240 reviews on Google
          </motion.p>
        </div>

        {/* Collage */}
        <div className="relative mx-auto h-[440px] w-full max-w-[540px] sm:h-[560px]">
          <motion.div style={{ y: y1 }} className="absolute right-0 top-0 w-[78%]">
            <motion.div initial={{ opacity: 0, rotate: 0, y: 40 }} animate={{ opacity: 1, rotate: 4, y: 0 }} transition={{ duration: 1.1, ease: EASE, delay: 0.2 }} className="rounded-[10px] bg-[#FFF8EC] p-3 pb-12 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)]">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[4px]">
                <Image src="/images/kulhad-co/hero-pour.jpg" alt="Chai being poured into kulhads" fill priority sizes="(min-width: 1024px) 420px, 75vw" className="object-cover" style={{ objectPosition: "40% 50%" }} />
              </div>
              <span className={`${HAND} absolute bottom-3 right-5 text-[22px] font-bold sm:text-[24px]`} style={{ color: KC.clay }}>
                fresh pour, every 5 mins ☕
              </span>
              <span className="absolute -top-3 left-1/2 h-7 w-24 -translate-x-1/2 rotate-[-3deg] bg-[#F4A83A]/80" />
            </motion.div>
          </motion.div>

          <motion.div style={{ y: y2 }} className="absolute bottom-0 left-0 w-[52%]">
            <motion.div initial={{ opacity: 0, rotate: 0, y: 40 }} animate={{ opacity: 1, rotate: -7, y: 0 }} transition={{ duration: 1.1, ease: EASE, delay: 0.35 }} className="rounded-[10px] bg-[#FFF8EC] p-2.5 pb-10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)]">
              <div className="relative aspect-square overflow-hidden rounded-[4px]">
                <Image src="/images/kulhad-co/samosa.jpg" alt="Samosas" fill sizes="280px" className="object-cover" />
              </div>
              <span className={`${HAND} absolute bottom-2 left-4 text-[21px] font-bold`} style={{ color: KC.green }}>
                samosa = ₹40 only!
              </span>
            </motion.div>
          </motion.div>

          <motion.div style={{ rotate: rot }} className="absolute bottom-[34%] right-[-4%] size-[118px] sm:size-[140px]">
            <div className="relative size-full overflow-hidden rounded-full border-[6px] shadow-xl" style={{ borderColor: KC.marigold }}>
              <Image src="/images/kulhad-co/kulhad-top.jpg" alt="" fill sizes="140px" className="object-cover" />
            </div>
          </motion.div>

          <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.9 }} className="absolute left-[8%] top-[8%]">
            <Sticker bg={KC.cream} fg={KC.clay} rotate={-10} className="text-[16px]">
              ₹20 cutting!
            </Sticker>
          </motion.span>
        </div>
      </div>
      <Wave fill={KC.marigold} />
    </section>
  );
}

/* ───────────────────────── Flavour band ───────────────────────── */

function FlavourBand() {
  const row = (
    <div className="flex shrink-0 items-center">
      {BAND.map((w) => (
        <span key={w} className="flex items-center">
          <span className={`${D} px-6 text-[38px] sm:text-[52px]`}>{w}</span>
          <Kulhad className="size-7 shrink-0" />
        </span>
      ))}
    </div>
  );
  return (
    <div aria-hidden className="-mt-px overflow-hidden pb-5 pt-1" style={{ background: KC.marigold, color: KC.green }}>
      <div className="marquee [animation-duration:32s]">
        {row}
        {row}
      </div>
    </div>
  );
}

/* ───────────────────────── Flavour picker ───────────────────────── */

function FlavourPicker() {
  const [i, setI] = useState(0);
  const f = FLAVOURS[i];
  return (
    <section className="px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-[1320px]">
        <Up className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className={`text-[13px] tracking-[0.1em] ${COND}`} style={{ color: KC.clay }}>
              ☕ Pick your chai
            </p>
            <h2 className={`${D} mt-3 text-[clamp(2.6rem,6vw,5rem)] leading-[0.95] tracking-[-0.02em]`}>
              Aaj kaunsi <span style={{ color: KC.clay }}>chai</span> chalegi?
            </h2>
          </div>
          <p className={`${HAND} max-w-[18rem] text-[24px] font-semibold leading-tight`} style={{ color: KC.green }}>
            tap a flavour, we&apos;ll do the rest ↓
          </p>
        </Up>

        <Feature id="flavours" label="Interactive chai picker" className="mt-10">
          <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
            <div role="tablist" aria-label="Chai flavours" className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-1">
              {FLAVOURS.map((x, k) => (
                <button
                  key={x.id}
                  role="tab"
                  type="button"
                  aria-selected={k === i}
                  onClick={() => setI(k)}
                  className={`flex items-center justify-between gap-3 rounded-[20px] border-2 px-4 py-3.5 text-left transition-all duration-300 ${k === i ? "-translate-y-0.5 shadow-[0_6px_0_rgba(0,0,0,0.2)]" : "border-transparent bg-white/60 hover:bg-white"}`}
                  style={k === i ? { background: x.bg, color: x.fg, borderColor: KC.ink } : undefined}
                >
                  <span>
                    <span className={`${D} block text-[20px] leading-tight sm:text-[22px]`}>{x.name}</span>
                    <span className={`${HI} block text-[14px] opacity-70`}>{x.hindi}</span>
                  </span>
                  <span className="text-[15px] font-bold">₹{x.price}</span>
                </button>
              ))}
            </div>

            <div className="relative min-h-[460px] overflow-hidden rounded-[32px] border-2 sm:min-h-[520px]" style={{ borderColor: KC.ink }}>
              <AnimatePresence initial={false}>
                <motion.div
                  key={f.id}
                  initial={{ clipPath: "circle(0% at 0% 100%)" }}
                  animate={{ clipPath: "circle(150% at 0% 100%)" }}
                  exit={{ opacity: 0.999 }}
                  transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                  className="absolute inset-0 grid sm:grid-cols-[1.1fr_0.9fr]"
                  style={{ background: f.bg, color: f.fg }}
                >
                  <div className="relative z-10 flex flex-col justify-between p-7 sm:p-10">
                    <div>
                      <span className={`${HI} text-[28px] opacity-80 sm:text-[34px]`}>{f.hindi}</span>
                      <h3 className={`${D} mt-1 text-[48px] leading-[0.95] sm:text-[72px]`}>{f.name}</h3>
                      <p className="mt-4 max-w-[22rem] text-[17px] leading-relaxed opacity-85">{f.desc}</p>
                    </div>
                    <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
                      <div>
                        <p className={`text-[12px] tracking-[0.1em] opacity-70 ${COND}`}>Kadak meter</p>
                        <div className="mt-2 flex gap-1.5">
                          {Array.from({ length: 5 }).map((_, k) => (
                            <Kulhad key={k} className={`size-7 transition-opacity ${k < f.kadak ? "opacity-100" : "opacity-20"}`} />
                          ))}
                        </div>
                      </div>
                      <span className={`${D} text-[64px] leading-none`}>₹{f.price}</span>
                    </div>
                  </div>
                  <div className="relative hidden sm:block">
                    <Image src={f.img} alt={f.name} fill sizes="400px" className="object-cover" />
                    <div className="absolute inset-0" style={{ background: `linear-gradient(90deg, ${f.bg} 0%, transparent 35%)` }} />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </Feature>
      </div>
    </section>
  );
}

/* ───────────────────────── Bestsellers ───────────────────────── */

function Bestsellers() {
  const picks = MENU.filter((m) => m.img && m.cat !== "chai" && m.tags?.includes("Bestseller")).concat(MENU.filter((m) => m.name === "Misal Pav" || m.name === "Masala Maggi"));
  return (
    <section className="px-5 pb-20 sm:px-8 sm:pb-28">
      <div className="mx-auto max-w-[1320px]">
        <Up className="flex items-end justify-between gap-4">
          <h2 className={`${D} text-[clamp(2.4rem,5vw,4.2rem)] leading-none tracking-[-0.02em]`}>Chai ke saath?</h2>
          <Link href={`${BASE}/menu`} className="shrink-0 text-[15px] font-bold underline decoration-2 underline-offset-4" style={{ color: KC.clay }}>
            Full menu →
          </Link>
        </Up>
        <div className="-mx-5 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4">
          {picks.slice(0, 4).map((m, k) => (
            <Up key={m.name} delay={k * 0.08} className="w-[72%] shrink-0 snap-center sm:w-auto">
              <article className="group overflow-hidden rounded-[28px] border-2 bg-[#FFF8EC] transition-transform duration-300 hover:-translate-y-1 hover:rotate-[-1deg]" style={{ borderColor: KC.ink }}>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image src={m.img!} alt={m.name} fill sizes="(min-width: 1024px) 25vw, 70vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                  {m.tags?.includes("Spicy") && (
                    <span className="absolute left-3 top-3">
                      <Sticker bg={KC.pink} fg={KC.paper} rotate={-6}>
                        🌶 Spicy
                      </Sticker>
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between gap-3 p-4">
                  <div>
                    <h3 className={`${D} text-[22px] leading-tight`}>{m.name}</h3>
                    <p className="text-[13px] opacity-60">{m.desc}</p>
                  </div>
                  <span className="shrink-0 rounded-full px-3 py-1 text-[15px] font-bold" style={{ background: KC.marigold, color: KC.green }}>
                    ₹{m.price}
                  </span>
                </div>
              </article>
            </Up>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Numbers ───────────────────────── */

function Numbers() {
  return (
    <section style={{ background: KC.clay, color: KC.paper }}>
      <Wave fill={KC.clay} flip />
      <div className="mx-auto grid max-w-[1320px] grid-cols-2 gap-y-10 px-5 py-14 sm:px-8 md:grid-cols-4">
        {[
          ["₹20", "Cutting chai, always"],
          ["12", "Chai flavours"],
          ["1 am", "Closing, every night"],
          ["1,240", "Google reviews"],
        ].map(([k, v], i) => (
          <Up key={v} delay={i * 0.08} className="text-center">
            <p className={`${D} text-[56px] leading-none sm:text-[76px]`}>{k}</p>
            <p className={`mt-2 text-[13px] tracking-[0.08em] opacity-85 ${COND}`}>{v}</p>
          </Up>
        ))}
      </div>
      <Wave fill={KC.cream} />
    </section>
  );
}

/* ───────────────────────── Reviews carousel ───────────────────────── */

function ReviewsCarousel() {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();
  const n = REVIEWS.length;
  useEffect(() => {
    if (reduce) return;
    const t = setTimeout(() => setI((x) => (x + 1) % n), 5000);
    return () => clearTimeout(t);
  }, [i, n, reduce]);
  const r = REVIEWS[i];

  return (
    <section className="px-5 py-20 sm:px-8 sm:py-24">
      <Feature id="reviews" label="Auto-playing reviews carousel" className="mx-auto max-w-[1100px]">
        <div className="relative overflow-hidden rounded-[36px] px-6 py-12 text-center sm:px-16 sm:py-16" style={{ background: KC.green, color: KC.cream }}>
          <span className={`${D} pointer-events-none absolute -left-2 -top-10 text-[220px] leading-none opacity-10`} aria-hidden>
            &ldquo;
          </span>
          <Stars className="text-[22px]" />
          <div className="relative mt-6 min-h-[190px] sm:min-h-[150px]">
            <AnimatePresence mode="wait">
              <motion.figure key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5, ease: EASE }}>
                <blockquote className={`${D} text-[24px] leading-[1.3] sm:text-[34px]`}>&ldquo;{r.text}&rdquo;</blockquote>
                <figcaption className="mt-6 text-[15px] font-semibold" style={{ color: KC.marigold }}>
                  {r.name} <span className="font-normal text-[#F7EDDC]/60">· {r.when} on Google</span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>
          <div className="mt-8 flex items-center justify-center gap-4">
            <button type="button" aria-label="Previous review" onClick={() => setI((x) => (x - 1 + n) % n)} className="grid size-11 place-items-center rounded-full border-2 border-[#F7EDDC]/30 hover:border-[#F7EDDC]">
              ←
            </button>
            <div className="flex gap-1.5">
              {REVIEWS.map((_, k) => (
                <button key={k} type="button" aria-label={`Review ${k + 1}`} onClick={() => setI(k)} className={`h-2 rounded-full transition-all ${k === i ? "w-7" : "w-2 bg-[#F7EDDC]/30"}`} style={k === i ? { background: KC.marigold } : undefined} />
              ))}
            </div>
            <button type="button" aria-label="Next review" onClick={() => setI((x) => (x + 1) % n)} className="grid size-11 place-items-center rounded-full border-2 border-[#F7EDDC]/30 hover:border-[#F7EDDC]">
              →
            </button>
          </div>
        </div>
      </Feature>
    </section>
  );
}

/* ───────────────────────── Events ───────────────────────── */

function Events() {
  return (
    <section className="px-5 pb-20 sm:px-8 sm:pb-28">
      <div className="mx-auto max-w-[1320px]">
        <Up>
          <p className={`text-[13px] tracking-[0.1em] ${COND}`} style={{ color: KC.clay }}>
            🎤 This week at the adda
          </p>
          <h2 className={`${D} mt-3 text-[clamp(2.4rem,5vw,4.2rem)] leading-none tracking-[-0.02em]`}>Chai, music & mehfil.</h2>
        </Up>
        <Feature id="events" label="Weekly events section" className="mt-10">
          <div className="grid gap-4 md:grid-cols-3">
            {EVENTS.map((e, k) => (
              <Up key={e.title} delay={k * 0.1}>
                <article className="group relative h-full overflow-hidden rounded-[28px] border-2 bg-[#FFF8EC] p-6 transition-transform duration-300 hover:-translate-y-1" style={{ borderColor: KC.ink }}>
                  <div className="flex items-start justify-between">
                    <span className={`${D} grid size-16 place-items-center rounded-2xl text-[22px]`} style={{ background: e.color, color: KC.paper }}>
                      {e.day}
                    </span>
                    <span className={`text-[12px] tracking-[0.08em] opacity-60 ${COND}`}>{e.time}</span>
                  </div>
                  <h3 className={`${D} mt-8 text-[30px] leading-tight`}>{e.title}</h3>
                  <p className="mt-2 text-[15px] opacity-70">{e.desc}</p>
                  <span className="absolute -bottom-10 -right-10 size-28 rounded-full opacity-20 transition-transform duration-500 group-hover:scale-150" style={{ background: e.color }} />
                </article>
              </Up>
            ))}
          </div>
        </Feature>
      </div>
    </section>
  );
}

/* ───────────────────────── Instagram teaser ───────────────────────── */

function InstaTeaser() {
  return (
    <section className="overflow-hidden pb-20 sm:pb-28">
      <Up className="mx-auto flex max-w-[1320px] items-end justify-between gap-4 px-5 sm:px-8">
        <h2 className={`${D} text-[clamp(2.2rem,5vw,4rem)] leading-none`}>@kulhad.co.indore</h2>
        <Link href={`${BASE}/adda`} className="shrink-0 text-[15px] font-bold underline decoration-2 underline-offset-4" style={{ color: KC.clay }}>
          See our adda →
        </Link>
      </Up>
      <div className="mt-8 flex gap-4 px-5 sm:px-8">
        {GALLERY.slice(0, 6).map((g, k) => (
          <Up key={g.src} delay={k * 0.06} className={`relative h-[260px] w-[220px] shrink-0 overflow-hidden rounded-[24px] sm:h-[320px] sm:w-[260px] ${k % 2 ? "mt-8" : ""}`}>
            <Image src={g.src} alt={g.alt} fill sizes="260px" className="object-cover transition-transform duration-700 hover:scale-110" />
          </Up>
        ))}
      </div>
    </section>
  );
}

/* ───────────────────────── CTA band ───────────────────────── */

function CtaBand() {
  const order = useOrderAction();
  return (
    <section className="px-3 pb-3 sm:px-5 sm:pb-5">
      <div className="relative overflow-hidden rounded-[36px] px-6 py-16 text-center sm:rounded-[48px] sm:py-24" style={{ background: KC.marigold, color: KC.green }}>
        <span className={`${HI} pointer-events-none absolute -left-6 top-2 text-[140px] leading-none opacity-15 sm:text-[220px]`} aria-hidden>
          चाय
        </span>
        <span className={`${HI} pointer-events-none absolute -right-6 bottom-0 text-[140px] leading-none opacity-15 sm:text-[220px]`} aria-hidden>
          चर्चा
        </span>
        <h2 className={`${D} relative text-[clamp(3rem,9vw,7.5rem)] leading-[0.9] tracking-[-0.03em]`}>Chai pe charcha?</h2>
        <p className="relative mx-auto mt-5 max-w-[30rem] text-[18px] font-medium">Pull up a chair. Or order ahead and skip the queue.</p>
        <div className="relative mt-9 flex flex-wrap justify-center gap-3">
          <button type="button" onClick={order} className="inline-flex h-14 items-center gap-2.5 rounded-full px-7 text-[16px] font-bold shadow-[0_6px_0_rgba(0,0,0,0.25)]" style={{ background: KC.green, color: KC.cream }}>
            <WhatsAppIcon className="size-5" /> Order on WhatsApp
          </button>
          <Link href={`${BASE}/visit`} className="inline-flex h-14 items-center rounded-full border-2 px-7 text-[16px] font-bold" style={{ borderColor: KC.green }}>
            Find the adda →
          </Link>
        </div>
      </div>
    </section>
  );
}
