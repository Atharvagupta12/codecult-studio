"use client";

import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { WhatsAppIcon } from "@/components/ui/icons";
import { Feature } from "../shared/Feature";
import { fmtTime, useIndiaNow } from "../shared/indiaTime";
import { BASE, CAT_LABEL, DAYS, IP, PROGRAMS, RESULTS, REVIEWS, TIMETABLE, booked } from "./data";
import { BeforeAfter, Btn, Counter, D, EASE, Kicker, LABEL, OpenBadge, Slam, Up, useActions } from "./shared";

export function IronpeakHome() {
  return (
    <main>
      <Hero />
      <Ticker />
      <Today />
      <Programs />
      <Numbers />
      <Transformation />
      <Reviews />
      <FinalCta />
    </main>
  );
}

/* ───────────────────────── Hero ───────────────────────── */

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { trial } = useActions();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 160]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -80]);

  return (
    <section ref={ref} className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden pt-28">
      <motion.div style={{ y: imgY }} className="absolute inset-0">
        <motion.div initial={{ scale: reduce ? 1 : 1.18 }} animate={{ scale: 1 }} transition={{ duration: 2.4, ease: EASE }} className="absolute inset-0">
          <Image src="/images/ironpeak/hero.jpg" alt="Athlete training at IRONPEAK" fill priority sizes="100vw" className="object-cover object-[65%_30%]" />
        </motion.div>
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/75 to-[#0A0A0A]/10" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
      {/* Scan lines */}
      <div aria-hidden className="absolute inset-0 opacity-[0.07] [background:repeating-linear-gradient(0deg,#fff_0_1px,transparent_1px_4px)]" />

      <motion.div style={{ y: textY }} className="relative mx-auto w-full max-w-[1440px] px-5 sm:px-8">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE, delay: 0.2 }} className="flex flex-wrap items-center gap-4">
          <Kicker>Strength club · Vijay Nagar, Indore</Kicker>
        </motion.div>
        <h1 className={`${D} mt-5 text-[clamp(3.3rem,13vw,12.5rem)] leading-[0.86] tracking-[-0.01em]`}>
          {["Train hard.", "Track harder."].map((l, i) => (
            <span key={l} className="block overflow-hidden">
              <motion.span
                className="block"
                style={{ color: i === 1 ? IP.lime : undefined }}
                initial={{ y: "105%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.3 + i * 0.12 }}
              >
                {l}
              </motion.span>
            </span>
          ))}
        </h1>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: EASE, delay: 0.7 }} className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <p className="max-w-[30rem] text-[17px] leading-relaxed text-white/75 sm:text-[19px]">
            Coached programs, competition-grade equipment and a crew that shows up every single day. Every rep, every PR, tracked.
          </p>
          <div className="flex flex-wrap gap-3">
            <Feature id="trial" label="Free-trial booking on WhatsApp" inline>
              <Btn onClick={trial}>
                <WhatsAppIcon className="size-4" /> Claim free trial
              </Btn>
            </Feature>
            <Btn href={`${BASE}/programs`} variant="ghost">
              View timetable →
            </Btn>
          </div>
        </motion.div>
      </motion.div>

      {/* Stats rail */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1 }} className="relative mt-12 border-t sm:mt-16" style={{ borderColor: IP.line }}>
        <div className="mx-auto grid max-w-[1440px] grid-cols-2 sm:grid-cols-4">
          {[
            [1800, "+", "Active members"],
            [40, "+", "Classes a week"],
            [12, "", "Certified coaches"],
            [6, " yrs", "Building strength"],
          ].map(([n, s, l], i) => (
            <div key={l as string} className={`px-5 py-5 sm:px-8 sm:py-7 ${i % 2 ? "border-l" : ""} ${i > 1 ? "border-t sm:border-t-0" : ""} ${i === 2 ? "sm:border-l" : ""}`} style={{ borderColor: IP.line }}>
              <Counter to={n as number} suffix={s as string} className={`${D} block text-[34px] leading-none sm:text-[48px]`} />
              <span className={`${LABEL} mt-2 block text-white/50`}>{l}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/* ───────────────────────── Ticker ───────────────────────── */

const WORDS = ["No excuses", "Strength", "Conditioning", "Boxing", "Hypertrophy", "Mobility", "Results"];

function Ticker() {
  const row = (outline: boolean) => (
    <div className="flex shrink-0 items-center">
      {WORDS.map((w) => (
        <span key={w} className="flex items-center">
          <span className={`${D} px-6 text-[34px] leading-none sm:text-[52px] ${outline ? "text-transparent [-webkit-text-stroke:1.5px_#E5FF3D]" : ""}`}>{w}</span>
          <span className="size-3 rotate-45" style={{ background: outline ? IP.lime : IP.bg }} />
        </span>
      ))}
    </div>
  );
  return (
    <div aria-hidden className="relative h-[170px] overflow-hidden sm:h-[220px]">
      <div className="absolute inset-x-[-5%] top-1/2 -translate-y-1/2 rotate-[3deg] border-y py-4" style={{ background: IP.panel, borderColor: IP.line }}>
        <div className="marquee [animation-direction:reverse] [animation-duration:44s]">
          {row(true)}
          {row(true)}
        </div>
      </div>
      <div className="absolute inset-x-[-5%] top-1/2 -translate-y-1/2 -rotate-[2deg] py-4 text-black" style={{ background: IP.lime }}>
        <div className="marquee [animation-duration:34s]">
          {row(false)}
          {row(false)}
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── Today's classes ───────────────────────── */

function Today() {
  const now = useIndiaNow();
  const { reserve } = useActions();
  const day = now?.day ?? 1;
  const list = TIMETABLE.filter((s) => s.days.includes(day)).sort((a, b) => a.start - b.start);

  return (
    <section className="py-14 sm:py-20">
      <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-6 px-5 sm:flex-row sm:items-end sm:px-8">
        <Up>
          <Kicker>{now ? `${DAYS[day]} · live` : "Today"}</Kicker>
          <h2 className={`${D} mt-4 text-[clamp(2.8rem,6vw,5.4rem)] leading-[0.9]`}>
            <Slam lines={["Today at", <span key="b" style={{ color: IP.lime }}>Ironpeak</span>]} />
          </h2>
        </Up>
        <Up delay={0.1} className="flex flex-col items-start gap-3 sm:items-end">
          <OpenBadge />
          <Link href={`${BASE}/programs`} className={`${LABEL} text-white/70 underline-offset-4 hover:text-[#E5FF3D] hover:underline`}>
            Full weekly timetable →
          </Link>
        </Up>
      </div>

      <Feature id="today" label="Today's classes, updated live" className="mt-10">
        <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-3 [scrollbar-width:none] sm:px-8 xl:mx-auto xl:max-w-[1440px]">
          {list.map((s, i) => {
            const live = now && now.minutes >= s.start && now.minutes < s.start + s.mins;
            const done = now && now.minutes >= s.start + s.mins;
            const isNext = now && !live && !done && list.findIndex((x) => x.start > now.minutes) === i;
            const b = booked(s, day);
            const full = b >= s.cap;
            return (
              <motion.article
                key={s.id}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: done ? 0.4 : 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: EASE, delay: i * 0.05 }}
                className={`relative flex w-[260px] shrink-0 snap-start flex-col p-5 sm:w-[280px] ${live ? "text-black" : ""}`}
                style={{ background: live ? IP.lime : IP.panel, boxShadow: isNext ? `inset 0 0 0 2px ${IP.lime}` : undefined }}
              >
                <div className="flex items-center justify-between">
                  <span className={`${LABEL} ${live ? "text-black/60" : "text-white/45"}`}>{CAT_LABEL[s.cat]}</span>
                  {live && <span className={`${LABEL} flex items-center gap-1.5`}><span className="size-1.5 animate-pulse rounded-full bg-black" />Live</span>}
                  {isNext && <span className={LABEL} style={{ color: IP.lime }}>Up next</span>}
                  {done && <span className={`${LABEL} text-white/40`}>Done</span>}
                </div>
                <p className={`${D} mt-5 text-[46px] leading-none`}>{fmtTime(s.start)}</p>
                <p className="mt-3 text-[18px] font-bold">{s.name}</p>
                <p className={`text-[14px] ${live ? "text-black/60" : "text-white/55"}`}>
                  Coach {s.coach} · {s.mins} min
                </p>
                <div className="mt-5">
                  <div className={`flex justify-between text-[12px] font-semibold ${live ? "text-black/70" : "text-white/55"}`}>
                    <span>{full ? "Class full" : `${s.cap - b} spots left`}</span>
                    <span>
                      {b}/{s.cap}
                    </span>
                  </div>
                  <div className={`mt-1.5 h-1.5 ${live ? "bg-black/15" : "bg-white/10"}`}>
                    <motion.div initial={{ width: 0 }} whileInView={{ width: `${(b / s.cap) * 100}%` }} viewport={{ once: true }} transition={{ duration: 1.2, ease: EASE, delay: 0.3 }} className="h-full" style={{ background: live ? "#000" : full ? IP.red : IP.lime }} />
                  </div>
                </div>
                {!done && (
                  <button type="button" disabled={full} onClick={() => reserve(s, day)} className={`mt-5 h-11 text-[12px] font-extrabold uppercase tracking-[0.14em] transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${live ? "bg-black text-[#E5FF3D]" : "bg-white/[0.07] hover:bg-[#E5FF3D] hover:text-black"}`}>
                    {full ? "Join waitlist" : "Reserve spot"}
                  </button>
                )}
              </motion.article>
            );
          })}
        </div>
      </Feature>
    </section>
  );
}

/* ───────────────────────── Programs (split hover) ───────────────────────── */

function Programs() {
  const [active, setActive] = useState(0);
  const p = PROGRAMS[active];
  return (
    <section className="px-5 py-14 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-[1440px]">
        <Up className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <Kicker>Programs</Kicker>
            <h2 className={`${D} mt-4 text-[clamp(2.8rem,6vw,5.4rem)] leading-[0.9]`}>
              <Slam lines={["Pick your", <span key="b" style={{ color: IP.lime }}>battle.</span>]} />
            </h2>
          </div>
          <p className="max-w-[26rem] text-[16px] leading-relaxed text-white/60">Five coached programs. One goal: make you measurably stronger every month.</p>
        </Up>

        <Feature id="programs" label="Programs with hover previews" className="mt-10 sm:mt-14">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <ul className="border-t" style={{ borderColor: IP.line }}>
              {PROGRAMS.map((pr, i) => {
                const on = i === active;
                return (
                  <li key={pr.id} className="border-b" style={{ borderColor: IP.line }}>
                    <Link
                      href={`${BASE}/programs#${pr.id}`}
                      onMouseEnter={() => setActive(i)}
                      onFocus={() => setActive(i)}
                      className="group flex items-center gap-4 py-5 sm:gap-6 sm:py-6"
                    >
                      <span className={`${LABEL} w-8 transition-colors ${on ? "text-[#E5FF3D]" : "text-white/35"}`}>{pr.n}</span>
                      <span className="relative size-16 shrink-0 overflow-hidden lg:hidden">
                        <Image src={pr.img} alt="" fill sizes="64px" className="object-cover" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className={`${D} block text-[clamp(2rem,4.6vw,4.4rem)] leading-[0.95] transition-all duration-500 ${on ? "translate-x-2 text-[#E5FF3D]" : "text-white"}`}>{pr.name}</span>
                        <span className="mt-1 block text-[13px] font-semibold uppercase tracking-[0.12em] text-white/45">{pr.tag}</span>
                      </span>
                      <span className={`grid size-12 shrink-0 place-items-center text-[20px] transition-all duration-500 ${on ? "rotate-0 bg-[#E5FF3D] text-black" : "-rotate-45 bg-white/5 text-white/60"}`}>→</span>
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="relative hidden lg:block">
              <div className="sticky top-28 aspect-[4/5] overflow-hidden" style={{ background: IP.panel }}>
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div key={p.id} initial={{ clipPath: "inset(100% 0 0 0)" }} animate={{ clipPath: "inset(0% 0 0 0)" }} exit={{ opacity: 0 }} transition={{ duration: 0.7, ease: EASE }} className="absolute inset-0">
                    <motion.div initial={{ scale: 1.2 }} animate={{ scale: 1 }} transition={{ duration: 1.2, ease: EASE }} className="absolute inset-0">
                      <Image src={p.img} alt={p.name} fill sizes="40vw" className="object-cover" style={{ objectPosition: p.pos ?? "50% 40%" }} />
                    </motion.div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                    <div className="absolute inset-x-8 bottom-8">
                      <p className="max-w-[26rem] text-[16px] leading-relaxed text-white/85">{p.desc}</p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {[`${p.perWeek} a week`, p.level, ...p.goals.slice(0, 2)].map((g) => (
                          <span key={g} className="bg-white/10 px-3 py-1.5 text-[12px] font-bold uppercase tracking-[0.1em] backdrop-blur">
                            {g}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </Feature>
      </div>
    </section>
  );
}

/* ───────────────────────── Numbers ───────────────────────── */

function Numbers() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : -80, reduce ? 0 : 80]);
  return (
    <section ref={ref} className="relative overflow-hidden px-5 py-20 sm:px-8 sm:py-28">
      <motion.div style={{ y }} className="absolute -inset-y-24 inset-x-0">
        <Image src="/images/ironpeak/interior.jpg" alt="" fill sizes="100vw" className="object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-[#0A0A0A]/80" />
      <div className="relative mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-center">
        <Up>
          <Kicker>The floor</Kicker>
          <h2 className={`${D} mt-4 text-[clamp(2.6rem,5.4vw,5rem)] leading-[0.9]`}>
            <Slam lines={["Built for", "serious", <span key="c" style={{ color: IP.lime }}>lifting.</span>]} />
          </h2>
        </Up>
        <div className="grid grid-cols-2 gap-px" style={{ background: IP.line }}>
          {[
            [12000, "", "sq ft training floor"],
            [8, "", "competition racks"],
            [4000, " kg", "of free weights"],
            [24, "", "turf lanes for sleds"],
          ].map(([n, s, l], i) => (
            <Up key={l as string} delay={i * 0.08} className="bg-[#0A0A0A]/85 p-6 backdrop-blur sm:p-9">
              <Counter to={n as number} suffix={s as string} className={`${D} block text-[44px] leading-none sm:text-[72px]`} />
              <span className={`${LABEL} mt-3 block text-white/55`}>{l}</span>
            </Up>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Transformation teaser ───────────────────────── */

function Transformation() {
  const r = RESULTS[0];
  return (
    <section className="px-5 py-14 sm:px-8 sm:py-20">
      <div className="mx-auto grid max-w-[1440px] items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <Up>
          <Feature id="before-after" label="Drag-to-compare transformations">
            <BeforeAfter before={r.before} after={r.after} alt={`${r.name} transformation`} className="aspect-[4/5] sm:aspect-[5/4]" />
          </Feature>
        </Up>
        <Up delay={0.1}>
          <Kicker>Real results · drag to compare</Kicker>
          <h2 className={`${D} mt-4 text-[clamp(2.8rem,6vw,5.4rem)] leading-[0.9]`}>
            <Slam lines={[`${r.weeks} weeks.`, <span key="b" style={{ color: IP.lime }}>No shortcuts.</span>]} />
          </h2>
          <p className="mt-6 max-w-[30rem] text-[17px] italic leading-relaxed text-white/70">&ldquo;{r.quote}&rdquo;</p>
          <p className={`${LABEL} mt-3 text-white/45`}>
            {r.name} · {r.program}
          </p>
          <div className="mt-8 grid grid-cols-3 gap-px" style={{ background: IP.line }}>
            {r.stats.map(([k, v]) => (
              <div key={v} className="p-4" style={{ background: IP.bg }}>
                <p className={`${D} text-[32px] leading-none sm:text-[40px]`} style={{ color: IP.lime }}>
                  {k}
                </p>
                <p className="mt-1.5 text-[12px] font-semibold uppercase tracking-[0.1em] text-white/50">{v}</p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Btn href={`${BASE}/results`} variant="ghost">
              See all results →
            </Btn>
          </div>
        </Up>
      </div>
    </section>
  );
}

/* ───────────────────────── Reviews ───────────────────────── */

function Reviews() {
  return (
    <section className="px-5 pb-14 sm:px-8 sm:pb-20">
      <div className="mx-auto max-w-[1440px]">
        <Up className="flex flex-wrap items-end justify-between gap-4 border-b border-white/10 pb-6">
          <h2 className={`${D} text-[clamp(2.4rem,5vw,4.4rem)] leading-[0.9]`}>
            4.9 <span style={{ color: IP.lime }}>★</span> on Google
          </h2>
          <span className={`${LABEL} text-white/50`}>720+ reviews</span>
        </Up>
        <div className="mt-8 grid gap-3 md:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <Up key={r.name} delay={i * 0.08}>
              <figure className="flex h-full flex-col p-7" style={{ background: IP.panel }}>
                <span className={`${D} text-[64px] leading-[0.6]`} style={{ color: IP.lime }}>
                  &ldquo;
                </span>
                <blockquote className="mt-4 flex-1 text-[17px] leading-relaxed text-white/85">{r.text}</blockquote>
                <figcaption className="mt-6 flex items-center justify-between gap-3 border-t pt-5" style={{ borderColor: IP.line }}>
                  <span className="text-[15px] font-bold">{r.name}</span>
                  <span className={`${LABEL} px-2.5 py-1 text-black`} style={{ background: IP.lime }}>
                    {r.tag}
                  </span>
                </figcaption>
              </figure>
            </Up>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Final CTA ───────────────────────── */

function FinalCta() {
  const { trial } = useActions();
  return (
    <section className="relative overflow-hidden px-5 py-20 sm:px-8 sm:py-28">
      <Image src="/images/ironpeak/bags.jpg" alt="" fill sizes="100vw" className="object-cover opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-transparent to-[#0A0A0A]" />
      <div className="relative mx-auto max-w-[1440px] text-center">
        <Kicker className="justify-center">No contract · no joining fee</Kicker>
        <h2 className={`${D} mt-6 text-[clamp(3.4rem,10vw,9.6rem)] leading-[0.85]`}>
          <Slam lines={["Your first", <span key="b" className="text-transparent [-webkit-text-stroke:2px_#E5FF3D]">session</span>, "is free."]} />
        </h2>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Btn onClick={trial}>
            <WhatsAppIcon className="size-4" /> Claim free trial
          </Btn>
          <Btn href={`${BASE}/plans`} variant="ghost">
            See plans
          </Btn>
        </div>
      </div>
    </section>
  );
}
