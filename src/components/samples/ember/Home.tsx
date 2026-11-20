"use client";

import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Feature } from "../shared/Feature";
import { AddButton } from "./cart";
import { ADDRESS, BASE, EM, EVENTS, REVIEWS, SIGNATURES, TASTING, inr } from "./data";
import { Btn, D, EASE, Embers, LABEL, Label, OpenBadge, Rise, Up, useExplain, useMedia } from "./shared";

export function EmberHome() {
  return (
    <main>
      <Hero />
      <Statement />
      <Signatures />
      <Tasting />
      <Pillars />
      <Reviews />
      <NextEvent />
      <ReserveCta />
    </main>
  );
}

/* ───────────────────────── Hero ───────────────────────── */

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "25%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative flex h-[100svh] min-h-[640px] items-end overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0">
        <motion.div className="absolute inset-0" initial={{ scale: 1.25 }} animate={{ scale: 1.02 }} transition={{ duration: 3.2, ease: EASE }}>
          <Image src="/images/ember/hero-flame.jpg" alt="Flames leaping from a wok in the Ember kitchen" fill priority sizes="100vw" className="object-cover" style={{ objectPosition: "60% 50%" }} />
        </motion.div>
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#0C0907] via-[#0C0907]/40 to-[#0C0907]/50" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0C0907]/80 via-transparent to-transparent" />
      <Embers />

      <motion.div style={{ opacity: fade }} className="relative mx-auto w-full max-w-[1440px] px-5 pb-12 sm:px-8 sm:pb-16">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 1 }} className={`flex items-center gap-3 ${LABEL}`} style={{ color: EM.gold }}>
          <span className="h-px w-8" style={{ background: EM.gold }} />
          Modern Indian · Indore
        </motion.p>
        <h1 className={`${D} mt-6 text-[clamp(3.4rem,10.5vw,10.5rem)] leading-[0.88] tracking-[-0.025em]`}>
          <Rise text="Fire, flavour" delay={0.9} className="block" />
          <Rise text="& slow evenings." delay={1.1} className="block italic text-[#D9A55B]" />
        </h1>

        <div className="mt-10 flex flex-col gap-8 border-t pt-8 lg:flex-row lg:items-end lg:justify-between" style={{ borderColor: EM.line }}>
          <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5, duration: 1, ease: EASE }} className="max-w-[30rem] text-[17px] leading-relaxed" style={{ color: EM.mute }}>
            Charcoal, wood fire and a clay tandoor. A modern Indian kitchen where every plate is finished over open flame.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.65, duration: 1, ease: EASE }} className="flex flex-wrap items-center gap-3">
            <Btn href={`${BASE}/reserve`} cursor="Book">
              Reserve a table
            </Btn>
            <Btn href={`${BASE}/order`} variant="line" cursor="Order">
              Order online
            </Btn>
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.9 }} className="mt-8 flex flex-wrap items-center justify-between gap-4 text-[13px]" style={{ color: EM.mute }}>
          <Feature id="open" label="Live open / closed status" inline>
            <OpenBadge />
          </Feature>
          <span className="hidden sm:inline">{ADDRESS}</span>
          <span className="flex items-center gap-2">
            Scroll
            <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity }} className="inline-block">
              ↓
            </motion.span>
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ───────────────────────── Statement ───────────────────────── */

function Statement() {
  return (
    <section className="relative px-5 py-28 sm:px-8 sm:py-40">
      <div className="mx-auto grid max-w-[1440px] items-center gap-16 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <Label>Our philosophy</Label>
          <h2 className={`${D} mt-8 text-[clamp(2.2rem,4.6vw,4.4rem)] leading-[1.12] tracking-[-0.01em]`}>
            <Rise inView text="Everything tastes better" className="block" />
            <Rise inView text="when it meets fire." delay={0.15} className="block italic text-[#D9A55B]" />
          </h2>
          <Up delay={0.2}>
            <p className="mt-8 max-w-[36rem] text-[17px] leading-[1.8]" style={{ color: EM.mute }}>
              We cook the way India always has, over charcoal, wood and clay, and plate it the way the world eats today. Seasonal produce,
              patient technique and a dining room built for long, slow evenings.
            </p>
          </Up>
        </div>
        <Up delay={0.15} className="relative mx-auto aspect-[4/5] w-full max-w-[460px]">
          <div className="absolute inset-0 overflow-hidden rounded-t-[999px]">
            <Image src="/images/ember/oven.jpg" alt="Wood-fired oven" fill sizes="460px" className="object-cover" />
          </div>
          <div className="absolute -bottom-8 -left-8 size-[160px] overflow-hidden rounded-full border-4 sm:size-[200px]" style={{ borderColor: EM.bg }}>
            <Image src="/images/ember/plating-greens.jpg" alt="" fill sizes="200px" className="object-cover" />
          </div>
        </Up>
      </div>
    </section>
  );
}

/* ───────────────────────── Signatures (pinned horizontal scroll) ───────────────────────── */

function Signatures() {
  const ref = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [dist, setDist] = useState(0);
  const reduce = useReducedMotion();
  const desktop = useMedia("(min-width: 1024px)") && !reduce;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, (p) => -p * dist);

  // Measure how far the track needs to slide
  useEffect(() => {
    const el = track.current;
    if (!el || !desktop) return;
    const ro = new ResizeObserver(() => setDist(Math.max(0, el.scrollWidth - window.innerWidth)));
    ro.observe(el);
    return () => ro.disconnect();
  }, [desktop]);

  return (
    <section ref={ref} className={desktop ? "relative h-[340vh]" : "relative py-10"}>
      <div className={desktop ? "sticky top-0 flex h-screen flex-col justify-center overflow-hidden" : ""}>
        <div className="mx-auto mb-10 flex w-full max-w-[1440px] items-end justify-between gap-6 px-5 sm:px-8">
          <div>
            <Label>The signatures</Label>
            <h2 className={`${D} mt-5 text-[clamp(2.6rem,5vw,4.8rem)] leading-none`}>
              Six plates that <span className="italic text-[#D9A55B]">made our name.</span>
            </h2>
          </div>
          {desktop && (
            <div className="hidden w-[220px] lg:block">
              <div className="h-px w-full" style={{ background: EM.line }}>
                <motion.div className="h-px origin-left" style={{ scaleX: scrollYProgress, background: EM.gold }} />
              </div>
              <p className={`mt-3 text-right ${LABEL}`} style={{ color: EM.mute }}>
                Keep scrolling →
              </p>
            </div>
          )}
        </div>

        <Feature id="signatures" label="Cinematic scroll gallery + add to order">
          <motion.div
            ref={track}
            style={desktop ? { x } : undefined}
            className={`flex gap-5 px-5 sm:px-8 ${desktop ? "w-max" : "snap-x snap-mandatory overflow-x-auto pb-4 [scrollbar-width:none]"}`}
          >
            {SIGNATURES.map((d, i) => (
              <article key={d.id} className="group relative w-[78vw] shrink-0 snap-center sm:w-[46vw] lg:w-[min(26vw,52vh)]" data-cursor="View">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[6px]">
                  <Image src={d.img!} alt={d.name} fill sizes="(min-width: 1024px) 26vw, 78vw" className="object-cover transition-transform duration-[1600ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0C0907] via-transparent to-transparent" />
                  <span className={`${D} absolute left-5 top-4 text-[64px] italic leading-none text-[#F3E9DC]/25`}>0{i + 1}</span>
                  {d.tags?.[0] && (
                    <span className={`absolute right-4 top-5 rounded-full border px-3 py-1 ${LABEL} tracking-[0.2em]`} style={{ borderColor: EM.gold, color: EM.gold }}>
                      {d.tags[0]}
                    </span>
                  )}
                </div>
                <div className="mt-5 flex items-start justify-between gap-4">
                  <div>
                    <h3 className={`${D} text-[26px] leading-tight sm:text-[30px]`}>{d.name}</h3>
                    <p className="mt-1 text-[14px]" style={{ color: EM.mute }}>
                      {d.desc}
                    </p>
                  </div>
                  <span className={`${D} shrink-0 text-[22px] italic`} style={{ color: EM.gold }}>
                    {inr(d.price)}
                  </span>
                </div>
                <div className="mt-4">
                  <AddButton dish={d} />
                </div>
              </article>
            ))}
          </motion.div>
        </Feature>
      </div>
    </section>
  );
}

/* ───────────────────────── Tasting ───────────────────────── */

function Tasting() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : -60, reduce ? 0 : 60]);
  return (
    <section className="px-5 py-28 sm:px-8 sm:py-40">
      <div className="mx-auto grid max-w-[1440px] items-center gap-16 lg:grid-cols-2">
        <div ref={ref} className="relative aspect-[4/5] overflow-hidden rounded-[6px]">
          <motion.div style={{ y }} className="absolute -inset-y-16 inset-x-0">
            <Image src="/images/ember/plating-sauce.jpg" alt="Chef saucing a plate" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </motion.div>
        </div>
        <div>
          <Label>The Ember tasting</Label>
          <h2 className={`${D} mt-6 text-[clamp(2.6rem,5vw,4.6rem)] leading-[1.02]`}>
            <Rise inView text="Seven courses." className="block" />
            <Rise inView text="One long evening." delay={0.12} className="block italic text-[#D9A55B]" />
          </h2>
          <ol className="mt-10 flex flex-col">
            {TASTING.map((c, i) => (
              <Up key={c} delay={i * 0.05}>
                <li className="flex items-baseline gap-5 border-b py-3.5" style={{ borderColor: EM.line }}>
                  <span className={`${D} w-8 text-[15px] italic`} style={{ color: EM.gold }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[16px]">{c}</span>
                </li>
              </Up>
            ))}
          </ol>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <Btn href={`${BASE}/reserve`} cursor="Book">
              Reserve the tasting
            </Btn>
            <p className="text-[14px]" style={{ color: EM.mute }}>
              ₹2,950 veg · ₹3,450 non-veg
              <br />
              per guest, plus taxes
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Pillars ───────────────────────── */

const PILLARS = [
  { img: "/images/ember/firepit.jpg", title: "Cooked over fire", text: "Charcoal sigri, wood oven and a clay tandoor. No shortcuts." },
  { img: "/images/ember/chef-plating.jpg", title: "Plated at the pass", text: "Every dish checked by the chef before it leaves the kitchen." },
  { img: "/images/ember/interior-window.jpg", title: "A chef's table for eight", text: "Thursday nights, a counter seat and a menu that changes weekly." },
];

function Pillars() {
  return (
    <section className="px-5 pb-28 sm:px-8 sm:pb-40">
      <div className="mx-auto grid max-w-[1440px] gap-5 md:grid-cols-3">
        {PILLARS.map((p, i) => (
          <Up key={p.title} delay={i * 0.12} className={i === 1 ? "md:mt-20" : ""}>
            <article className="group" data-cursor="View">
              <div className="relative aspect-[3/4] overflow-hidden rounded-[6px]">
                <Image src={p.img} alt={p.title} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover grayscale-[30%] transition-all duration-[1400ms] group-hover:scale-105 group-hover:grayscale-0" />
              </div>
              <p className={`mt-6 ${LABEL}`} style={{ color: EM.gold }}>
                0{i + 1}
              </p>
              <h3 className={`${D} mt-2 text-[30px] italic`}>{p.title}</h3>
              <p className="mt-2 max-w-[24rem] text-[15px] leading-relaxed" style={{ color: EM.mute }}>
                {p.text}
              </p>
            </article>
          </Up>
        ))}
      </div>
    </section>
  );
}

/* ───────────────────────── Reviews ───────────────────────── */

function Reviews() {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce) return;
    const t = setTimeout(() => setI((x) => (x + 1) % REVIEWS.length), 6500);
    return () => clearTimeout(t);
  }, [i, reduce]);
  const r = REVIEWS[i];
  return (
    <section className="border-y px-5 py-28 sm:px-8 sm:py-36" style={{ borderColor: EM.line, background: EM.panel }}>
      <Feature id="reviews" label="Guest reviews" className="mx-auto max-w-[1100px] text-center">
        <p className={LABEL} style={{ color: EM.gold }}>
          ★ 4.9 · 860 reviews on Google
        </p>
        <div className="relative mt-10 min-h-[240px] sm:min-h-[200px]">
          <AnimatePresence mode="wait">
            <motion.figure key={i} initial={{ opacity: 0, filter: "blur(8px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} exit={{ opacity: 0, filter: "blur(8px)" }} transition={{ duration: 0.8 }}>
              <blockquote className={`${D} text-[clamp(1.7rem,3.6vw,3rem)] italic leading-[1.3]`}>&ldquo;{r.text}&rdquo;</blockquote>
              <figcaption className="mt-8 text-[14px]" style={{ color: EM.mute }}>
                <span className="font-semibold" style={{ color: EM.cream }}>
                  {r.name}
                </span>{" "}
                · {r.meta}
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>
        <div className="mt-8 flex justify-center gap-2">
          {REVIEWS.map((_, k) => (
            <button key={k} type="button" aria-label={`Review ${k + 1}`} onClick={() => setI(k)} className="h-[2px] w-10 overflow-hidden" style={{ background: EM.line }}>
              {k === i && <motion.span className="block h-full" style={{ background: EM.gold }} initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: reduce ? 0 : 6.5, ease: "linear" }} />}
            </button>
          ))}
        </div>
      </Feature>
    </section>
  );
}

/* ───────────────────────── Next event ───────────────────────── */

function NextEvent() {
  const e = EVENTS[0];
  const { event } = useExplain();
  return (
    <section className="px-5 py-28 sm:px-8 sm:py-36">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <Label>Next at Ember</Label>
            <h2 className={`${D} mt-5 text-[clamp(2.4rem,5vw,4.4rem)] leading-none`}>
              Evenings worth <span className="italic text-[#D9A55B]">dressing up for.</span>
            </h2>
          </div>
          <a href={`${BASE}/events`} className={`hidden shrink-0 ${LABEL} underline-offset-8 hover:underline sm:block`} style={{ color: EM.gold }}>
            All events →
          </a>
        </div>
        <Up>
          <article className="group grid overflow-hidden rounded-[6px] border md:grid-cols-[1.2fr_1fr]" style={{ borderColor: EM.line, background: EM.panel }}>
            <div className="relative min-h-[300px] overflow-hidden">
              <Image src={e.img} alt={e.title} fill sizes="(min-width: 768px) 55vw, 100vw" className="object-cover transition-transform duration-[1400ms] group-hover:scale-105" />
            </div>
            <div className="flex flex-col justify-between gap-8 p-8 sm:p-12">
              <div>
                <p className={`${D} text-[72px] italic leading-none`} style={{ color: EM.gold }}>
                  {e.date} <span className="text-[28px]">{e.month}</span>
                </p>
                <p className={`mt-2 ${LABEL}`} style={{ color: EM.mute }}>
                  {e.day} · 7:30 pm
                </p>
                <h3 className={`${D} mt-6 text-[34px] leading-tight`}>{e.title}</h3>
                <p className="mt-3 text-[16px] leading-relaxed" style={{ color: EM.mute }}>
                  {e.desc}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-5">
                <Btn onClick={() => event(e.title)} cursor="Book">
                  Book seats
                </Btn>
                <span className="text-[14px]" style={{ color: EM.mute }}>
                  {e.price}
                </span>
              </div>
            </div>
          </article>
        </Up>
      </div>
    </section>
  );
}

/* ───────────────────────── Reserve CTA ───────────────────────── */

function ReserveCta() {
  return (
    <section className="relative flex min-h-[80svh] items-center justify-center overflow-hidden px-5 py-28 text-center">
      <Image src="/images/ember/interior-candles.jpg" alt="Candle-lit dining room" fill sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-[#0C0907]/70" />
      <Embers className="opacity-60" />
      <div className="relative">
        <Label className="justify-center">Reservations</Label>
        <h2 className={`${D} mt-8 text-[clamp(3rem,9vw,8rem)] leading-[0.92]`}>
          <Rise inView text="Your table" className="block" />
          <Rise inView text="is waiting." delay={0.12} className="block italic text-[#D9A55B]" />
        </h2>
        <div className="mt-12 flex flex-wrap justify-center gap-3">
          <Btn href={`${BASE}/reserve`} cursor="Book">
            Reserve a table
          </Btn>
          <Btn href={`${BASE}/events`} variant="line">
            Private dining
          </Btn>
        </div>
      </div>
    </section>
  );
}
