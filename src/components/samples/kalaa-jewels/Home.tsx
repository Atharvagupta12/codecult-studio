"use client";

import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Feature } from "../shared/Feature";
import { BASE, COLLECTIONS, IMG, KJ, PIECES, PROMISES, RATES, TESTIMONIALS, TIMELINE, inr, priceOf, type Piece } from "./data";
import { QuickView } from "./QuickView";
import { Btn, EASE, Eyebrow, LABEL, Lines, OpenBadge, Ornament, SERIF, Shimmer, Up } from "./shared";
import { HeartButton } from "./wishlist";

export function KalaaHome() {
  const [open, setOpen] = useState<Piece | null>(null);
  return (
    <main>
      <Hero />
      <RateTicker />
      <Collections />
      <Featured onOpen={setOpen} />
      <Heritage />
      <Promises />
      <Words />
      <QuickView piece={open} onClose={() => setOpen(null)} />
    </main>
  );
}

/* ───────────────────────── Hero ───────────────────────── */

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 120]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -60]);
  return (
    <section ref={ref} className="relative min-h-[100svh] overflow-hidden px-5 pb-16 pt-32 sm:px-8 lg:pt-28">
      <div aria-hidden className="absolute left-1/4 top-1/3 size-[640px] -translate-x-1/2 rounded-full opacity-25 blur-[160px]" style={{ background: KJ.gold }} />
      <div className="relative mx-auto grid min-h-[calc(100svh-12rem)] max-w-[1400px] items-center gap-12 lg:grid-cols-[1fr_1fr]">
        <div className="relative z-10 text-center lg:text-left">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.2 }}>
            <Eyebrow center className="lg:items-start">
              Handcrafted in Indore · Since 1998
            </Eyebrow>
          </motion.div>
          <h1 className={`${SERIF} mt-8 text-[clamp(3.4rem,7.6vw,7.8rem)] font-medium leading-[0.95]`}>
            <Lines now delay={0.3} lines={["Jewellery that", <span key="b" className="italic" style={{ color: KJ.goldLight }}>tells your story.</span>]} />
          </h1>
          <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: EASE, delay: 0.7 }} className="mx-auto mt-7 max-w-[32rem] text-[17px] leading-relaxed text-[#F3E3C3]/75 lg:mx-0">
            Temple gold, kundan and certified diamonds, crafted by hand by three generations of Indore karigars. For every bride, every festival, every story worth keeping.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: EASE, delay: 0.85 }} className="mt-10 flex flex-wrap justify-center gap-3 lg:justify-start">
            <Btn href={`${BASE}/collections`}>Explore collections</Btn>
            <Btn href={`${BASE}/gold-rate`} variant="line">
              Today: 22K {inr(RATES[0].rate)}/g
            </Btn>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.6, ease: EASE, delay: 0.2 }} className="relative mx-auto w-full max-w-[540px]">
          <Feature id="sheen" label="Moving gold-light effect">
            <div className="relative aspect-[4/5] overflow-hidden rounded-t-[999px]">
              <motion.div style={{ y }} className="absolute -inset-y-16 inset-x-0">
                <Image src={IMG.heroModel} alt="Bride wearing Kalaa heritage jewellery" fill priority sizes="(min-width: 1024px) 540px, 92vw" className="object-cover object-[50%_25%]" />
              </motion.div>
              <Shimmer />
              <div className="absolute inset-0 rounded-t-[999px] ring-1 ring-inset ring-[#D4A84B]/40" />
            </div>
          </Feature>
          <span aria-hidden className="absolute -inset-3 -z-10 rounded-t-[999px] border border-[#D4A84B]/25" />
          <motion.div style={{ y: y2 }} className="absolute -left-4 bottom-10 w-[46%] sm:-left-12">
            <div className="relative aspect-square overflow-hidden rounded-full border-[5px]" style={{ borderColor: KJ.bg }}>
              <Image src={IMG.heroNecklace} alt="" fill sizes="240px" className="object-cover" />
              <Shimmer />
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.9, ease: EASE }} className="absolute -right-2 top-[22%] border px-5 py-4 text-center backdrop-blur-md sm:-right-8" style={{ borderColor: `${KJ.gold}55`, background: "rgba(21,17,13,0.7)" }}>
            <p className={`${SERIF} text-[34px] leading-none`} style={{ color: KJ.goldLight }}>
              28
            </p>
            <p className={`${LABEL} mt-1 text-[9px]`}>years of trust</p>
          </motion.div>
        </motion.div>
      </div>
      <div className="relative mx-auto mt-8 flex max-w-[1400px] justify-center lg:justify-start">
        <OpenBadge />
      </div>
    </section>
  );
}

/* ───────────────────────── Gold-rate ticker ───────────────────────── */

function RateTicker() {
  const item = (
    <div className="flex shrink-0 items-center">
      {RATES.map((r) => (
        <span key={r.id} className="flex items-center gap-3 px-8">
          <span className={LABEL}>{r.label}</span>
          <span className={`${SERIF} text-[22px]`} style={{ color: KJ.goldLight }}>
            {inr(r.rate)}/g
          </span>
          <span className="text-[12px]" style={{ color: r.change >= 0 ? "#7BD88F" : "#E07A5F" }}>
            {r.change >= 0 ? "▲" : "▼"} {Math.abs(r.change)}%
          </span>
          <span className="text-[#D4A84B]">✦</span>
        </span>
      ))}
      <span className={`${LABEL} px-8 text-[#A39478]`}>Updated 11:00 am today</span>
    </div>
  );
  return (
    <Feature id="rate-ticker" label="Live gold-rate ticker">
      <Link href={`${BASE}/gold-rate`} className="block overflow-hidden border-y py-4" style={{ borderColor: KJ.line, background: KJ.panel }}>
        <div className="marquee [animation-duration:36s]">
          {item}
          {item}
        </div>
      </Link>
    </Feature>
  );
}

/* ───────────────────────── Collections ───────────────────────── */

function Collections() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-[1400px] px-5 text-center sm:px-8">
        <Up>
          <Eyebrow center>Our collections</Eyebrow>
          <h2 className={`${SERIF} mt-6 text-[clamp(2.6rem,5vw,4.6rem)] font-medium leading-[1]`}>
            Crafted for <span className="italic" style={{ color: KJ.goldLight }}>every moment.</span>
          </h2>
        </Up>
      </div>
      <div className="mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:px-8 xl:mx-auto xl:grid xl:max-w-[1400px] xl:grid-cols-5 xl:overflow-visible">
        {COLLECTIONS.map((c, i) => (
          <Up key={c.id} delay={i * 0.08} className="w-[66%] shrink-0 snap-center sm:w-[40%] xl:w-auto">
            <Link href={`${BASE}/collections#${encodeURIComponent(c.id)}`} className="group block text-center">
              <div className="relative aspect-[3/4.4] overflow-hidden rounded-t-[999px] border" style={{ borderColor: KJ.line }}>
                <Image src={c.img} alt={c.id} fill sizes="(min-width: 1280px) 20vw, 66vw" className="object-cover transition-transform duration-[1600ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#15110D] via-transparent to-transparent opacity-80" />
                <Shimmer className="opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span className={`${LABEL} absolute inset-x-0 bottom-5 text-[10px]`} style={{ color: KJ.goldLight }}>
                  {PIECES.filter((p) => p.collection === c.id).length} pieces
                </span>
              </div>
              <h3 className={`${SERIF} mt-5 text-[26px] font-medium transition-colors group-hover:text-[#F0CF86]`}>{c.id}</h3>
              <p className="mt-1 text-[14px] text-[#A39478]">{c.line}</p>
            </Link>
          </Up>
        ))}
      </div>
    </section>
  );
}

/* ───────────────────────── Featured pieces ───────────────────────── */

export function PieceCard({ p, onOpen, i = 0 }: { p: Piece; onOpen: (p: Piece) => void; i?: number }) {
  return (
    <Up delay={(i % 4) * 0.06}>
      <article className="group">
        <div className="relative aspect-[4/5] overflow-hidden border" style={{ borderColor: KJ.line, background: KJ.panel }}>
          <button type="button" onClick={() => onOpen(p)} className="absolute inset-0" aria-label={`Quick view ${p.name}`}>
            <Image src={p.img} alt={p.name} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-110" />
            <Shimmer className="opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <span className={`${LABEL} absolute inset-x-3 bottom-3 translate-y-2 bg-[#15110D]/80 py-2.5 text-center text-[10px] opacity-0 backdrop-blur transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100`}>Quick view</span>
          </button>
          {p.new && (
            <span className={`${LABEL} absolute left-3 top-3 px-2.5 py-1 text-[9px] text-[#15110D]`} style={{ background: KJ.gold }}>
              New
            </span>
          )}
          <HeartButton id={p.id} className="absolute right-3 top-3" />
        </div>
        <button type="button" onClick={() => onOpen(p)} className="mt-4 block w-full text-left">
          <p className="text-[11px] uppercase tracking-[0.22em] text-[#A39478]">
            {p.metal} · {p.weight} g
          </p>
          <h3 className={`${SERIF} mt-1 text-[21px] font-medium leading-tight transition-colors group-hover:text-[#F0CF86]`}>{p.name}</h3>
          <p className="mt-1 text-[14px]" style={{ color: KJ.gold }}>
            from {inr(priceOf(p))}
          </p>
        </button>
      </article>
    </Up>
  );
}

function Featured({ onOpen }: { onOpen: (p: Piece) => void }) {
  const picks = ["rani-haar", "polki-choker", "solitaire", "floral-jhumka"].map((id) => PIECES.find((p) => p.id === id)!);
  return (
    <section className="px-5 pb-24 sm:px-8 sm:pb-32">
      <div className="mx-auto max-w-[1400px]">
        <Up className="flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
          <div>
            <Eyebrow className="items-center sm:items-start">New this season</Eyebrow>
            <h2 className={`${SERIF} mt-6 text-[clamp(2.4rem,4.6vw,4.2rem)] font-medium leading-[1]`}>
              Pieces we <span className="italic" style={{ color: KJ.goldLight }}>love.</span>
            </h2>
          </div>
          <Btn href={`${BASE}/collections`} variant="line">
            View all {PIECES.length} pieces
          </Btn>
        </Up>
        <Feature id="quick-view" label="Quick view with zoom + price breakdown" className="mt-12">
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">
            {picks.map((p, i) => (
              <PieceCard key={p.id} p={p} onOpen={onOpen} i={i} />
            ))}
          </div>
        </Feature>
      </div>
    </section>
  );
}

/* ───────────────────────── Heritage ───────────────────────── */

function Heritage() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const h = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  return (
    <section className="border-y px-5 py-24 sm:px-8 sm:py-32" style={{ borderColor: KJ.line, background: KJ.panel }}>
      <div className="mx-auto grid max-w-[1400px] gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <Up className="relative lg:sticky lg:top-28 lg:self-start">
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image src={IMG.store} alt="Kalaa Jewels showroom" fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover [filter:sepia(0.55)_brightness(0.7)_contrast(1.1)]" />
            <Shimmer />
          </div>
          <div className="absolute -bottom-6 -right-2 w-[44%] border-[5px] sm:-right-6" style={{ borderColor: KJ.panel }}>
            <div className="relative aspect-square">
              <Image src={IMG.tray} alt="Karigar's tray of gold jewellery" fill sizes="240px" className="object-cover" />
            </div>
          </div>
        </Up>
        <div>
          <Up>
            <Eyebrow>Our story</Eyebrow>
            <h2 className={`${SERIF} mt-6 text-[clamp(2.4rem,4.6vw,4.2rem)] font-medium leading-[1.02]`}>
              Three generations, <span className="italic" style={{ color: KJ.goldLight }}>one craft.</span>
            </h2>
          </Up>
          <Feature id="timeline" label="Heritage timeline" className="mt-12">
            <div ref={ref} className="relative pl-10">
              <span className="absolute bottom-0 left-[7px] top-0 w-px" style={{ background: KJ.line }} />
              <motion.span className="absolute left-[7px] top-0 w-px" style={{ height: h, background: KJ.gold }} />
              <div className="flex flex-col gap-12">
                {TIMELINE.map((t) => (
                  <Up key={t.year}>
                    <div className="relative">
                      <span className="absolute -left-10 top-2 size-[15px] rotate-45 border" style={{ borderColor: KJ.gold, background: KJ.panel }} />
                      <p className={`${SERIF} text-[44px] italic leading-none`} style={{ color: KJ.goldLight }}>
                        {t.year}
                      </p>
                      <h3 className={`${SERIF} mt-2 text-[26px] font-medium`}>{t.title}</h3>
                      <p className="mt-2 max-w-[30rem] text-[15px] leading-relaxed text-[#F3E3C3]/70">{t.text}</p>
                    </div>
                  </Up>
                ))}
              </div>
            </div>
          </Feature>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Promises ───────────────────────── */

function Promises() {
  const icons = ["◈", "↺", "◇", "✧"];
  return (
    <section className="px-5 py-24 sm:px-8 sm:py-28">
      <div className="mx-auto grid max-w-[1400px] gap-px border sm:grid-cols-2 lg:grid-cols-4" style={{ background: KJ.line, borderColor: KJ.line }}>
        {PROMISES.map(([t, d], i) => (
          <Up key={t} delay={i * 0.07}>
            <div className="h-full p-8 text-center" style={{ background: KJ.bg }}>
              <span className="text-[30px]" style={{ color: KJ.gold }}>
                {icons[i]}
              </span>
              <h3 className={`${SERIF} mt-3 text-[26px] font-medium`}>{t}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-[#A39478]">{d}</p>
            </div>
          </Up>
        ))}
      </div>
    </section>
  );
}

/* ───────────────────────── Testimonials ───────────────────────── */

function Words() {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce) return;
    const t = setTimeout(() => setI((v) => (v + 1) % TESTIMONIALS.length), 6500);
    return () => clearTimeout(t);
  }, [i, reduce]);
  const t = TESTIMONIALS[i];
  return (
    <section className="px-5 pb-24 sm:px-8 sm:pb-32">
      <div className="mx-auto grid max-w-[1200px] items-center gap-10 md:grid-cols-[0.55fr_1.45fr] md:gap-16">
        <div className="relative mx-auto aspect-square w-full max-w-[320px] overflow-hidden rounded-full border" style={{ borderColor: `${KJ.gold}66` }}>
          <AnimatePresence initial={false}>
            <motion.div key={t.img} initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.1, ease: EASE }} className="absolute inset-0">
              <Image src={t.img} alt={t.name} fill sizes="320px" className="object-cover" />
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="text-center md:text-left">
          <Ornament className="mx-auto h-3 w-24 md:mx-0" />
          <AnimatePresence mode="wait">
            <motion.figure key={t.name} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.7, ease: EASE }} className="mt-6">
              <blockquote className={`${SERIF} text-[clamp(1.7rem,3.2vw,2.8rem)] italic leading-[1.2]`}>&ldquo;{t.text}&rdquo;</blockquote>
              <figcaption className={`${LABEL} mt-6`} style={{ color: KJ.gold }}>
                — {t.name}
              </figcaption>
            </motion.figure>
          </AnimatePresence>
          <div className="mt-8 flex justify-center gap-2 md:justify-start">
            {TESTIMONIALS.map((x, k) => (
              <button key={x.name} type="button" aria-label={`Show ${x.name}`} onClick={() => setI(k)} className="size-2.5 rotate-45 border transition-colors" style={{ borderColor: KJ.gold, background: k === i ? KJ.gold : "transparent" }} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
