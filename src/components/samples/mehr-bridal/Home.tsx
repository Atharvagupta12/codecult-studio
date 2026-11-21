"use client";

import { AnimatePresence, motion, useInView, useReducedMotion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Feature } from "../shared/Feature";
import { BASE, IMG, JOURNEY, MB, SIGNATURES, TESTIMONIALS } from "./data";
import { Btn, EASE, Kicker, LABEL, Lines, Petals, SERIF, Up } from "./shared";

export function MehrHome() {
  return (
    <main>
      <Hero />
      <Ribbon />
      <Signatures />
      <Experience />
      <Artist />
      <Words />
      <Final />
    </main>
  );
}

/* ───────────────────────── Hero ───────────────────────── */

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 140]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.1]);
  return (
    <section ref={ref} className="relative min-h-[100svh] overflow-hidden">
      <motion.div style={{ y, scale }} className="absolute inset-0 lg:left-[38%]">
        <motion.div initial={{ scale: reduce ? 1 : 1.15, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 2.2, ease: EASE }} className="absolute inset-0">
          <Image src={IMG.hero} alt="Bride in a classic red look by Mehr" fill priority sizes="(min-width: 1024px) 62vw, 100vw" className="object-cover object-[50%_25%]" />
        </motion.div>
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#1A0A0E] from-[30%] via-[#1A0A0E]/75 to-[#1A0A0E]/25 lg:bg-gradient-to-r lg:from-[#1A0A0E] lg:from-[38%] lg:via-[#1A0A0E]/50 lg:to-transparent" />
      <Petals />
      <div className="relative mx-auto flex min-h-[100svh] max-w-[1440px] flex-col justify-end px-5 pb-16 pt-28 sm:px-10 lg:justify-center lg:pb-20">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.4 }}>
          <Kicker>Bridal makeup artist · Indore</Kicker>
        </motion.div>
        <h1 className={`${SERIF} mt-6 text-[clamp(3.6rem,9.4vw,9.6rem)] leading-[0.9]`}>
          <Lines now delay={0.5} lines={["Your day,", <span key="b" className="italic" style={{ color: MB.rose }}>your glow.</span>]} />
        </h1>
        <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: EASE, delay: 0.9 }} className="mt-7 max-w-[30rem] text-[17px] leading-relaxed text-[#F7E7DF]/80 sm:text-[19px]">
          Bridal, engagement and reception makeup crafted around you: your skin, your outfit, your story. Only 40 brides a year.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: EASE, delay: 1 }} className="mt-9 flex flex-wrap gap-3">
          <Btn href={`${BASE}/book`} cursor="Book">
            Check my dates
          </Btn>
          <Btn href={`${BASE}/looks`} variant="line" cursor="Quiz">
            Find your look ✿
          </Btn>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.3 }} className="mt-12 flex flex-wrap gap-8 border-t pt-6" style={{ borderColor: MB.line }}>
          {[
            ["600+", "brides"],
            ["11 yrs", "of artistry"],
            ["4.9 ★", "Google rating"],
          ].map(([k, v]) => (
            <p key={v}>
              <span className={`${SERIF} block text-[32px] leading-none`}>{k}</span>
              <span className={`${LABEL} mt-2 block text-[9px] text-[#B7948B]`}>{v}</span>
            </p>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ───────────────────────── Ribbon ───────────────────────── */

function Ribbon() {
  const words = ["Bridal", "Engagement", "Reception", "Sangeet", "Airbrush", "HD", "Destination"];
  const row = (
    <div className="flex shrink-0 items-center">
      {words.map((w) => (
        <span key={w} className="flex items-center">
          <span className={`${SERIF} px-8 text-[30px] italic sm:text-[44px]`}>{w}</span>
          <span style={{ color: MB.rose }}>✿</span>
        </span>
      ))}
    </div>
  );
  return (
    <div aria-hidden className="overflow-hidden border-y py-5" style={{ borderColor: MB.line, background: MB.wine }}>
      <div className="marquee [animation-duration:42s]">
        {row}
        {row}
      </div>
    </div>
  );
}

/* ───────────────────────── Signature looks ───────────────────────── */

function Signatures() {
  return (
    <section className="px-5 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto max-w-[1440px]">
        <Up className="text-center">
          <Kicker className="justify-center">Signature looks</Kicker>
          <h2 className={`${SERIF} mt-6 text-[clamp(2.6rem,5.6vw,5.4rem)] leading-[1]`}>
            Three ways to <span className="italic" style={{ color: MB.rose }}>glow.</span>
          </h2>
        </Up>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {SIGNATURES.map((s, i) => (
            <Up key={s.name} delay={i * 0.12} className={i === 1 ? "md:mt-20" : ""}>
              <Link href={`${BASE}/portfolio`} data-cursor="View" className="group block">
                <div className="relative aspect-[3/4.2] overflow-hidden rounded-t-[999px]">
                  <Image src={s.img} alt={s.name} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-[1800ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A0A0E]/90 via-transparent to-transparent" />
                  <span className={`${LABEL} absolute inset-x-0 bottom-6 text-center text-[10px]`} style={{ color: MB.rose }}>
                    {s.style}
                  </span>
                </div>
                <h3 className={`${SERIF} mt-6 text-center text-[32px] italic`}>{s.name}</h3>
                <p className="mx-auto mt-2 max-w-[20rem] text-center text-[15px] text-[#F7E7DF]/65">{s.line}</p>
              </Link>
            </Up>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── The Mehr experience (scroll story) ───────────────────────── */

function Step({ s, i, onSeen }: { s: (typeof JOURNEY)[number]; i: number; onSeen: (i: number) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { margin: "-45% 0px -45% 0px" });
  useEffect(() => {
    if (seen) onSeen(i);
  }, [seen, i, onSeen]);
  return (
    <div ref={ref} className="flex min-h-[62vh] flex-col justify-center py-10 lg:min-h-[80vh]">
      <p className={`${SERIF} text-[64px] italic leading-none`} style={{ color: MB.rose }}>
        {s.n}
      </p>
      <p className={`${LABEL} mt-4 text-[10px] text-[#B7948B]`}>{s.when}</p>
      <h3 className={`${SERIF} mt-3 text-[clamp(2.4rem,4vw,3.6rem)] leading-[1]`}>{s.title}</h3>
      <p className="mt-4 max-w-[28rem] text-[17px] leading-relaxed text-[#F7E7DF]/70">{s.text}</p>
      <div className="relative mt-8 aspect-[4/3] overflow-hidden rounded-[20px] lg:hidden">
        <Image src={s.img} alt={s.title} fill sizes="100vw" className="object-cover" />
      </div>
    </div>
  );
}

function Experience() {
  const [active, setActive] = useState(0);
  const s = JOURNEY[active];
  return (
    <section className="border-y px-5 sm:px-10" style={{ borderColor: MB.line, background: MB.wine }}>
      <Feature id="experience" label="Scroll story: the Mehr experience">
        <div className="mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div className="relative hidden lg:block">
            <div className="sticky top-0 flex h-screen items-center">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-t-[999px]">
                <AnimatePresence initial={false}>
                  <motion.div key={s.img} initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.1, ease: EASE }} className="absolute inset-0">
                    <Image src={s.img} alt={s.title} fill sizes="45vw" className="object-cover" />
                  </motion.div>
                </AnimatePresence>
                <div className="absolute inset-x-0 bottom-0 flex justify-center gap-2 pb-6">
                  {JOURNEY.map((j, k) => (
                    <span key={j.n} className="h-1 rounded-full transition-all duration-500" style={{ width: k === active ? 36 : 12, background: k === active ? MB.rose : "rgba(247,231,223,0.4)" }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="py-16 lg:py-24">
            <Up>
              <Kicker>The Mehr experience</Kicker>
              <h2 className={`${SERIF} mt-6 text-[clamp(2.6rem,5vw,4.8rem)] leading-[1]`}>
                From hello to <span className="italic" style={{ color: MB.rose }}>happily ever after.</span>
              </h2>
            </Up>
            {JOURNEY.map((j, i) => (
              <Step key={j.n} s={j} i={i} onSeen={setActive} />
            ))}
          </div>
        </div>
      </Feature>
    </section>
  );
}

/* ───────────────────────── Artist ───────────────────────── */

function Artist() {
  return (
    <section className="px-5 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto grid max-w-[1440px] items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
        <Up className="relative mx-auto w-full max-w-[480px]">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[24px]">
            <Image src={IMG.artist} alt="Mehr at work on a bride" fill sizes="(min-width: 1024px) 480px, 90vw" className="object-cover" />
          </div>
          <div className="absolute -bottom-10 -right-4 w-[46%] overflow-hidden rounded-[18px] border-[6px] sm:-right-12" style={{ borderColor: MB.bg }}>
            <div className="relative aspect-square">
              <Image src={IMG.eyes} alt="Eye makeup detail" fill sizes="240px" className="object-cover" />
            </div>
          </div>
        </Up>
        <Up delay={0.1}>
          <Kicker>Meet Mehr</Kicker>
          <p className={`${SERIF} mt-6 text-[clamp(1.8rem,3.4vw,3rem)] leading-[1.25]`}>
            &ldquo;I don&apos;t want you to look like someone else on your wedding day. I want you to look like <em style={{ color: MB.rose }}>you</em>, on your very best day.&rdquo;
          </p>
          <p className="mt-6 text-[16px] leading-relaxed text-[#F7E7DF]/70">
            Mehr Kapoor trained in Mumbai and London and has spent eleven years making brides across India feel beautiful. Her signature: skin that looks like skin, and makeup that lasts from the haldi to the bidaai.
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {["MAC Pro certified", "Huda Beauty Academy", "Airbrush specialist", "Destination weddings"].map((t) => (
              <span key={t} className="rounded-full border px-4 py-2 text-[13px]" style={{ borderColor: MB.line }}>
                {t}
              </span>
            ))}
          </div>
        </Up>
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
    const t = setTimeout(() => setI((v) => (v + 1) % TESTIMONIALS.length), 7000);
    return () => clearTimeout(t);
  }, [i, reduce]);
  const t = TESTIMONIALS[i];
  return (
    <section className="px-5 pb-24 sm:px-10 sm:pb-32">
      <div className="mx-auto max-w-[1100px] text-center">
        <Kicker className="justify-center">Love notes</Kicker>
        <div className="relative mx-auto mt-10 size-28 overflow-hidden rounded-full border-2" style={{ borderColor: MB.rose }}>
          <AnimatePresence initial={false}>
            <motion.div key={t.img} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }} className="absolute inset-0">
              <Image src={t.img} alt={t.name} fill sizes="112px" className="object-cover" />
            </motion.div>
          </AnimatePresence>
        </div>
        <AnimatePresence mode="wait">
          <motion.figure key={t.name} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.8, ease: EASE }} className="mt-8">
            <blockquote className={`${SERIF} text-[clamp(1.8rem,3.8vw,3.4rem)] italic leading-[1.2]`}>&ldquo;{t.text}&rdquo;</blockquote>
            <figcaption className={`${LABEL} mt-6 text-[10px]`} style={{ color: MB.rose }}>
              {t.name}
            </figcaption>
          </motion.figure>
        </AnimatePresence>
        <div className="mt-8 flex justify-center gap-2">
          {TESTIMONIALS.map((x, k) => (
            <button key={x.name} type="button" aria-label={`Show ${x.name}`} onClick={() => setI(k)} className="h-1.5 rounded-full transition-all" style={{ width: k === i ? 36 : 12, background: k === i ? MB.rose : "rgba(247,231,223,0.3)" }} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Final CTA ───────────────────────── */

function Final() {
  return (
    <section className="relative overflow-hidden px-5 py-28 sm:px-10 sm:py-36" style={{ background: MB.wine }}>
      <div className="absolute inset-0 opacity-25">
        <Image src={IMG.mirror} alt="" fill sizes="100vw" className="object-cover" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#2A0E16] via-[#2A0E16]/70 to-[#2A0E16]" />
      <Petals />
      <div className="relative mx-auto max-w-[1100px] text-center">
        <Kicker className="justify-center">2026 – 27 dates filling fast</Kicker>
        <h2 className={`${SERIF} mt-8 text-[clamp(3rem,8vw,7.6rem)] leading-[0.95]`}>
          <Lines lines={["Is your date", <span key="b" className="italic" style={{ color: MB.rose }}>still open?</span>]} />
        </h2>
        <div className="mt-12 flex flex-wrap justify-center gap-3">
          <Btn href={`${BASE}/book`} cursor="Book">
            Check my dates
          </Btn>
          <Btn href={`${BASE}/packages`} variant="line" cursor="Packages">
            See packages
          </Btn>
        </div>
      </div>
    </section>
  );
}
