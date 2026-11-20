"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { WhatsAppIcon } from "@/components/ui/icons";
import { Feature } from "../shared/Feature";
import { fmtTime, useIndiaNow } from "../shared/indiaTime";
import { useOpenStatus } from "../shared/useOpenStatus";
import {
  ADDRESS,
  BATCHES,
  CLASSES,
  DAYS,
  DAYS_SHORT,
  DURATIONS,
  FAQ,
  GALLERY,
  HOURS,
  MAPS_URL,
  MAP_EMBED,
  PF,
  PLANS,
  REVIEWS,
  TRAINERS,
  inr,
  type Months,
} from "./data";
import { D, EASE, Eyebrow, Heartbeat, Logo, OpenBadge, PulseLine, Stars, Up, useActions } from "./shared";

const H2 = `${D} font-[800] leading-[0.98] tracking-[-0.05em]`;

/* ───────────────────────── Why Pulse (bento) ───────────────────────── */

export function WhyPulse() {
  return (
    <section className="px-5 py-14 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-[1320px]">
        <Up className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <Eyebrow>Why Pulse</Eyebrow>
            <h2 className={`${H2} mt-5 max-w-[15ch] text-[clamp(2.2rem,4.4vw,3.8rem)]`}>
              A gym that feels like <span style={{ color: PF.blue }}>your</span> gym.
            </h2>
          </div>
          <p className="max-w-[24rem] text-[16px] leading-relaxed" style={{ color: PF.mute }}>
            No loud egos, no confusing machines, no feeling lost. Just good coaching and people who remember your name.
          </p>
        </Up>

        <div className="mt-10 grid gap-3 sm:mt-14 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4 lg:grid-rows-[220px_220px]">
          <Up className="relative min-h-[320px] overflow-hidden rounded-[30px] sm:col-span-2 lg:row-span-2 lg:min-h-0">
            <Image src="/images/pulse-fitness/consult.jpg" alt="Trainer planning a member's diet" fill sizes="(min-width: 1024px) 640px, 100vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1030]/90 via-[#0B1030]/20 to-transparent" />
            <div className="absolute inset-x-6 bottom-6 text-white sm:inset-x-8 sm:bottom-8">
              <span className="rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em]" style={{ background: PF.sun, color: PF.ink }}>
                Included free
              </span>
              <h3 className={`${D} mt-4 text-[26px] font-[800] leading-[1.05] tracking-[-0.04em] sm:text-[34px]`}>Diet plan + fitness check with every membership</h3>
              <p className="mt-2 max-w-[28rem] text-[15px] text-white/75">Your coach measures, plans and adjusts every month. Indian food, real portions, no fad diets.</p>
            </div>
          </Up>

          <Up delay={0.05}>
            <div className="flex h-full min-h-[200px] flex-col justify-between rounded-[30px] p-6 text-white" style={{ background: PF.coral }}>
              <span className="grid size-11 place-items-center rounded-[14px] bg-white/20 text-[20px]">♀</span>
              <div>
                <h3 className={`${D} text-[21px] font-[800] leading-tight tracking-[-0.03em]`}>Ladies-only batches</h3>
                <p className="mt-1 text-[14px] text-white/85">7 – 8 am & 5 – 6 pm, female trainer</p>
              </div>
            </div>
          </Up>

          <Up delay={0.1}>
            <div className="flex h-full min-h-[200px] flex-col justify-between rounded-[30px] p-6 text-white" style={{ background: PF.blue }}>
              <p className={`${D} text-[54px] font-[900] leading-none tracking-[-0.06em]`}>1,200+</p>
              <div>
                <h3 className="text-[16px] font-bold">members & counting</h3>
                <p className="mt-1 text-[14px] text-white/75">60% of them started as total beginners</p>
              </div>
            </div>
          </Up>

          <Up delay={0.15}>
            <div className="flex h-full min-h-[200px] flex-col justify-between rounded-[30px] p-6 text-white" style={{ background: PF.ink }}>
              <OpenBadge dark />
              <div>
                <h3 className={`${D} text-[21px] font-[800] leading-tight tracking-[-0.03em]`}>Open 5 am – 11 pm</h3>
                <p className="mt-1 text-[14px] text-white/65">Train before work, after work, or both.</p>
              </div>
            </div>
          </Up>

          <Up delay={0.2}>
            <div className="flex h-full min-h-[200px] flex-col justify-between rounded-[30px] p-6" style={{ background: PF.sky }}>
              <div className="flex gap-2">
                {["❄", "✦", "⌂"].map((s) => (
                  <span key={s} className="grid size-11 place-items-center rounded-[14px] bg-white text-[18px]" style={{ color: PF.blue }}>
                    {s}
                  </span>
                ))}
              </div>
              <div>
                <h3 className={`${D} text-[21px] font-[800] leading-tight tracking-[-0.03em]`}>Air-conditioned & spotless</h3>
                <p className="mt-1 text-[14px]" style={{ color: PF.mute }}>
                  Lockers, showers and free parking
                </p>
              </div>
            </div>
          </Up>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Classes (expanding cards) ───────────────────────── */

function Level({ n, color = "white" }: { n: number; color?: string }) {
  return (
    <span className="flex items-center gap-1" title={`Intensity ${n} of 3`}>
      {[1, 2, 3].map((i) => (
        <span key={i} className="h-1.5 w-4 rounded-full" style={{ background: color, opacity: i <= n ? 1 : 0.25 }} />
      ))}
    </span>
  );
}

export function Classes() {
  const [active, setActive] = useState(0);
  return (
    <section id="classes" className="scroll-mt-20 py-14 sm:py-20">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
        <Up className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <Eyebrow>Classes</Eyebrow>
            <h2 className={`${H2} mt-5 text-[clamp(2.2rem,4.4vw,3.8rem)]`}>
              Find your <span style={{ color: PF.blue }}>thing.</span>
            </h2>
          </div>
          <p className="max-w-[22rem] text-[16px] leading-relaxed" style={{ color: PF.mute }}>
            All classes are included in the Gym + Classes plan. Try any of them free.
          </p>
        </Up>
      </div>

      {/* Desktop: expanding accordion */}
      <Up className="mx-auto mt-12 hidden h-[520px] max-w-[1320px] gap-3 px-8 lg:flex">
        {CLASSES.map((c, i) => {
          const on = i === active;
          return (
            <motion.article
              key={c.id}
              layout
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              tabIndex={0}
              className="relative cursor-pointer overflow-hidden rounded-[32px] outline-none"
              style={{ flex: on ? 3.2 : 1 }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              <Image src={c.img} alt={c.name} fill sizes="(min-width: 1024px) 700px, 100vw" style={{ objectPosition: c.pos ?? "50% 50%" }} className={`object-cover transition-transform duration-[1200ms] ${on ? "scale-100" : "scale-110"}`} />
              <div className={`absolute inset-0 transition-opacity duration-700 ${on ? "bg-gradient-to-t from-[#0B1030]/90 via-[#0B1030]/10 to-transparent" : "bg-[#0B1030]/45"}`} />
              {!on && (
                <span className={`${D} absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90 whitespace-nowrap text-[24px] font-[800] tracking-[-0.03em] text-white`}>
                  {c.name}
                </span>
              )}
              <span className="absolute left-5 top-5 size-3 rounded-full ring-4 ring-white/30" style={{ background: c.color }} />
              <AnimatePresence>
                {on && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0, transition: { delay: 0.25, duration: 0.6, ease: EASE } }}
                    exit={{ opacity: 0, transition: { duration: 0.15 } }}
                    className="absolute inset-x-8 bottom-8 text-white"
                  >
                    <h3 className={`${D} text-[46px] font-[800] leading-none tracking-[-0.05em]`}>{c.name}</h3>
                    <p className="mt-3 max-w-[26rem] text-[16px] text-white/80">{c.blurb}</p>
                    <div className="mt-5 flex flex-wrap items-center gap-2 text-[13px] font-semibold">
                      <span className="rounded-full bg-white/15 px-3 py-1.5 backdrop-blur">⏱ {c.mins} min</span>
                      <span className="rounded-full bg-white/15 px-3 py-1.5 backdrop-blur">🔥 {c.burn} kcal</span>
                      <span className="flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 backdrop-blur">
                        Intensity <Level n={c.level} color={c.color} />
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.article>
          );
        })}
      </Up>

      {/* Mobile / tablet: swipe cards */}
      <div className="mt-10 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:px-8 lg:hidden">
        {CLASSES.map((c) => (
          <article key={c.id} className="relative aspect-[3/4] w-[78%] shrink-0 snap-center overflow-hidden rounded-[28px] sm:w-[44%]">
            <Image src={c.img} alt={c.name} fill sizes="(min-width: 640px) 44vw, 78vw" style={{ objectPosition: c.pos ?? "50% 50%" }} className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1030]/90 via-[#0B1030]/10 to-transparent" />
            <span className="absolute left-5 top-5 size-3 rounded-full ring-4 ring-white/30" style={{ background: c.color }} />
            <div className="absolute inset-x-5 bottom-5 text-white">
              <h3 className={`${D} text-[30px] font-[800] leading-none tracking-[-0.05em]`}>{c.name}</h3>
              <p className="mt-2 text-[14px] leading-snug text-white/80">{c.blurb}</p>
              <div className="mt-3 flex flex-wrap items-center gap-1.5 text-[12px] font-semibold">
                <span className="rounded-full bg-white/15 px-2.5 py-1">⏱ {c.mins} min</span>
                <span className="rounded-full bg-white/15 px-2.5 py-1">🔥 {c.burn} kcal</span>
                <span className="flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1">
                  <Level n={c.level} color={c.color} />
                </span>
              </div>
            </div>
          </article>
        ))}
        <span className="w-1 shrink-0" />
      </div>
    </section>
  );
}

/* ───────────────────────── Timetable ───────────────────────── */

const DAY_ORDER = [1, 2, 3, 4, 5, 6, 0];

export function Timetable() {
  const now = useIndiaNow();
  const [picked, setPicked] = useState<number | null>(null);
  const { trial } = useActions();
  const day = picked ?? now?.day ?? 1;
  const isToday = now?.day === day;
  const list = BATCHES.filter((b) => b.days.includes(day)).sort((a, b) => a.start - b.start);
  const nextIdx = isToday && now ? list.findIndex((b) => b.start > now.minutes) : -1;
  const cls = (id: string) => CLASSES.find((c) => c.id === id)!;

  return (
    <section id="timings" className="scroll-mt-20 px-5 py-14 sm:px-8 sm:py-20">
      <div className="mx-auto grid max-w-[1320px] gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
        <Up className="lg:sticky lg:top-28 lg:self-start">
          <Eyebrow>Batch timings</Eyebrow>
          <h2 className={`${H2} mt-5 text-[clamp(2.2rem,4.4vw,3.8rem)]`}>
            There&apos;s a batch for <span style={{ color: PF.blue }}>your</span> day.
          </h2>
          <p className="mt-5 max-w-[26rem] text-[16px] leading-relaxed" style={{ color: PF.mute }}>
            The gym floor is open all day. Coached batches run morning and evening, and today&apos;s schedule is shown automatically.
          </p>
          <div className="mt-8 flex flex-col gap-2 text-[14px]">
            {[
              [PF.blue, "Mon – Sat", "5 am – 11 pm"],
              [PF.coral, "Sunday", "6 am – 12 noon"],
            ].map(([c, d, t]) => (
              <p key={d} className="flex items-center gap-3 rounded-[16px] bg-white px-4 py-3 shadow-[0_10px_30px_-20px_rgba(11,16,48,0.4)]">
                <span className="size-2.5 rounded-full" style={{ background: c }} />
                <b className="font-bold">{d}</b>
                <span className="ml-auto" style={{ color: PF.mute }}>
                  {t}
                </span>
              </p>
            ))}
          </div>
        </Up>

        <Up delay={0.1}>
          <Feature id="batches" label="Today's batches, shown automatically">
            <div className="rounded-[32px] bg-white p-3 shadow-[0_40px_80px_-40px_rgba(11,16,48,0.45)] sm:p-5">
              <div role="tablist" aria-label="Pick a day" className="grid grid-cols-7 gap-1 rounded-[22px] p-1" style={{ background: PF.bg }}>
                {DAY_ORDER.map((d) => {
                  const on = d === day;
                  return (
                    <button
                      key={d}
                      role="tab"
                      type="button"
                      aria-selected={on}
                      onClick={() => setPicked(d)}
                      className={`relative h-14 rounded-[18px] text-[13px] font-bold transition-colors sm:h-16 sm:text-[14px] ${on ? "text-white" : "hover:text-[#3A5BFF]"}`}
                    >
                      {on && <motion.span layoutId="pf-day" className="absolute inset-0 rounded-[18px]" style={{ background: PF.blue }} transition={{ type: "spring", stiffness: 420, damping: 34 }} />}
                      <span className="relative flex flex-col items-center leading-tight">
                        {DAYS_SHORT[d]}
                        {now?.day === d && <span className={`mt-0.5 text-[9px] font-bold uppercase tracking-[0.1em] ${on ? "text-white/80" : "text-[#3A5BFF]"}`}>Today</span>}
                      </span>
                    </button>
                  );
                })}
              </div>

              <p className="mt-5 flex items-center justify-between px-2 text-[13px] font-semibold" style={{ color: PF.mute }}>
                <span>
                  {DAYS[day]} · {list.length} coached batches
                </span>
                <span className="hidden sm:inline">Gym floor open all day</span>
              </p>

              <ul className="mt-3 flex flex-col gap-2">
                <AnimatePresence mode="popLayout" initial={false}>
                  {list.map((b, i) => {
                    const c = cls(b.cls);
                    const live = isToday && now && now.minutes >= b.start && now.minutes < b.end;
                    const done = isToday && now && now.minutes >= b.end;
                    const next = i === nextIdx && !live;
                    return (
                      <motion.li
                        key={`${day}-${b.name}-${b.start}`}
                        layout
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: done ? 0.45 : 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.35, delay: i * 0.03 }}
                        className={`flex items-center gap-3 rounded-[20px] p-3 sm:gap-4 sm:p-4 ${live || next ? "ring-2" : ""}`}
                        style={{ background: live ? "#ECFDF3" : PF.bg, ["--tw-ring-color" as string]: live ? "#22C55E" : PF.blue }}
                      >
                        <span className="w-[66px] shrink-0 sm:w-[96px]">
                          <span className={`${D} block whitespace-nowrap text-[14px] font-[800] tracking-[-0.04em] sm:text-[17px]`}>{fmtTime(b.start)}</span>
                          <span className="text-[11px] sm:text-[12px]" style={{ color: PF.mute }}>
                            till {fmtTime(b.end)}
                          </span>
                        </span>
                        <span className="h-10 w-1 shrink-0 rounded-full" style={{ background: c.color }} />
                        <span className="min-w-0 flex-1">
                          <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
                            <span className="text-[15px] font-bold sm:text-[16px]">{b.name}</span>
                            {b.ladies && (
                              <span className="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em] text-white" style={{ background: PF.coral }}>
                                Ladies
                              </span>
                            )}
                            {live && (
                              <span className="flex items-center gap-1 rounded-full bg-[#22C55E] px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em] text-white">
                                <span className="size-1.5 animate-pulse rounded-full bg-white" /> Live now
                              </span>
                            )}
                            {next && (
                              <span className="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em] text-white" style={{ background: PF.blue }}>
                                Up next
                              </span>
                            )}
                          </span>
                          <span className="block truncate text-[13px]" style={{ color: PF.mute }}>
                            with {b.coach} · {c.mins} min
                          </span>
                        </span>
                        {!done && (
                          <button type="button" onClick={trial} className="shrink-0 rounded-[12px] bg-white px-3 py-2 text-[13px] font-bold shadow-sm transition-colors hover:bg-[#3A5BFF] hover:text-white sm:px-4">
                            Book
                          </button>
                        )}
                      </motion.li>
                    );
                  })}
                </AnimatePresence>
              </ul>
            </div>
          </Feature>
        </Up>
      </div>
    </section>
  );
}

/* ───────────────────────── Plans ───────────────────────── */

function Price({ value }: { value: number }) {
  return (
    <span className="relative inline-flex overflow-hidden">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.45, ease: EASE }}
          className="inline-block"
        >
          {inr(value)}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export function Plans() {
  const [months, setMonths] = useState<Months>(3);
  const { join } = useActions();

  return (
    <section id="plans" className="scroll-mt-16 px-3 sm:px-5">
      <div className="relative mx-auto max-w-[1400px] overflow-hidden rounded-[40px] px-5 py-16 text-white sm:rounded-[52px] sm:px-10 sm:py-24" style={{ background: PF.ink }}>
        <div aria-hidden className="absolute -top-40 left-1/2 size-[700px] -translate-x-1/2 rounded-full opacity-40 blur-[140px]" style={{ background: PF.blue }} />
        <PulseLine className="absolute inset-x-0 top-24 h-24 w-full opacity-30" color="#6E86FF" />

        <div className="relative mx-auto max-w-[1180px]">
          <Up className="text-center">
            <Eyebrow light>Membership</Eyebrow>
            <h2 className={`${H2} mx-auto mt-5 max-w-[16ch] text-[clamp(2.2rem,4.4vw,3.8rem)]`}>
              Simple plans. <span className="block" style={{ color: PF.sun }}>No hidden fees.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-[30rem] text-[16px] text-white/65">Pick how long you want to commit. The longer you stay, the less you pay each month.</p>
          </Up>

          <Feature id="plans" label="Plan picker with live prices" className="mt-10">
            <Up delay={0.1} className="flex justify-center">
              <div role="tablist" aria-label="Plan duration" className="relative grid grid-cols-4 gap-1 rounded-[20px] bg-white/10 p-1.5 ring-1 ring-white/10">
                {DURATIONS.map((m) => {
                  const on = m === months;
                  return (
                    <button
                      key={m}
                      role="tab"
                      type="button"
                      aria-selected={on}
                      onClick={() => setMonths(m)}
                      className={`relative h-12 rounded-[15px] px-3 text-[13px] font-bold transition-colors sm:h-14 sm:px-6 sm:text-[15px] ${on ? "text-[#0B1030]" : "text-white/75 hover:text-white"}`}
                    >
                      {on && <motion.span layoutId="pf-months" className="absolute inset-0 rounded-[15px] bg-white" transition={{ type: "spring", stiffness: 420, damping: 34 }} />}
                      <span className="relative whitespace-nowrap">
                        {m} {m === 1 ? "month" : "months"}
                      </span>
                      {m === 12 && (
                        <span className="absolute -right-1 -top-3 rounded-full px-2 py-0.5 text-[10px] font-extrabold" style={{ background: PF.sun, color: PF.ink }}>
                          −33%
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </Up>

            <div className="-mx-5 mt-8 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 pt-2 [scrollbar-width:none] sm:-mx-10 sm:px-10 lg:mx-0 lg:mt-10 lg:grid lg:grid-cols-3 lg:gap-4 lg:overflow-visible lg:px-0 lg:pb-0">
              {PLANS.map((p, i) => {
                const price = p.prices[months];
                const perMonth = Math.round(price / months);
                const save = p.prices[1] * months - price;
                const pop = p.popular;
                return (
                  <Up key={p.id} delay={0.1 + i * 0.08} className="w-[86%] shrink-0 snap-center sm:w-[60%] lg:w-auto">
                    <article
                      className={`relative flex h-full flex-col rounded-[30px] p-6 sm:p-8 ${pop ? "text-white shadow-[0_40px_80px_-30px_rgba(58,91,255,0.9)] lg:-my-4 lg:py-12" : "bg-white/[0.06] ring-1 ring-white/10"}`}
                      style={pop ? { background: `linear-gradient(160deg, ${PF.blue}, ${PF.blueDeep})` } : undefined}
                    >
                      {pop && (
                        <span className="absolute right-6 top-6 rounded-full px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.1em]" style={{ background: PF.sun, color: PF.ink }}>
                          ★ Most loved
                        </span>
                      )}
                      <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-white/60">{p.tagline}</p>
                      <h3 className={`${D} mt-2 text-[26px] font-[800] tracking-[-0.04em]`}>{p.name}</h3>
                      <p className={`${D} mt-6 text-[44px] font-[800] leading-none tracking-[-0.05em] sm:text-[52px]`}>
                        <Price value={price} />
                      </p>
                      <p className="mt-2 flex flex-wrap items-center gap-2 text-[14px] text-white/70">
                        <span>
                          {months === 1 ? "per month" : `for ${months} months · ${inr(perMonth)}/mo`}
                        </span>
                        <AnimatePresence>
                          {save > 0 && (
                            <motion.span
                              key={save}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0 }}
                              className="rounded-full px-2 py-0.5 text-[12px] font-bold"
                              style={{ background: "rgba(43,217,159,0.18)", color: PF.mint }}
                            >
                              Save {inr(save)}
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </p>
                      <ul className="mt-7 flex flex-1 flex-col gap-3 border-t border-white/15 pt-6 text-[15px]">
                        {p.features.map((f) => (
                          <li key={f} className="flex items-start gap-3">
                            <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full text-[11px] font-black" style={{ background: pop ? "white" : PF.blue, color: pop ? PF.blue : "white" }}>
                              ✓
                            </span>
                            <span className="text-white/85">{f}</span>
                          </li>
                        ))}
                      </ul>
                      <button
                        type="button"
                        onClick={() => join(p, months)}
                        className={`mt-8 flex h-14 shrink-0 items-center justify-center gap-2 rounded-[16px] text-[15px] font-bold transition-transform hover:-translate-y-0.5 ${pop ? "bg-white text-[#0B1030]" : "bg-white/10 text-white ring-1 ring-white/20 hover:bg-white hover:text-[#0B1030]"}`}
                      >
                        <WhatsAppIcon className="size-4 text-[#1DA851]" /> Join {p.name}
                      </button>
                    </article>
                  </Up>
                );
              })}
            </div>
          </Feature>

          <p className="mt-10 text-center text-[13px] text-white/55">Prices include GST · One-time joining fee ₹0 this month · Pause your plan when you travel</p>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Trainers ───────────────────────── */

export function Trainers() {
  return (
    <section id="trainers" className="scroll-mt-20 px-5 py-14 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-[1320px]">
        <Up className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <Eyebrow>Trainers</Eyebrow>
            <h2 className={`${H2} mt-5 text-[clamp(2.2rem,4.4vw,3.8rem)]`}>
              Coaches who <span style={{ color: PF.blue }}>actually</span> care.
            </h2>
          </div>
          <p className="max-w-[22rem] text-[16px] leading-relaxed" style={{ color: PF.mute }}>
            Certified, friendly and always on the floor. Ask them anything, even on day one.
          </p>
        </Up>

        <Feature id="trainers" label="Trainer profiles" className="mt-10 sm:mt-14">
          <div className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 sm:pb-0">
            {TRAINERS.map((t, i) => (
              <Up key={t.name} delay={i * 0.1} className="w-[80%] shrink-0 snap-center sm:w-auto">
                <article className="group">
                  <div className="relative aspect-[5/6] overflow-hidden rounded-[30px]" style={{ background: PF.sky }}>
                    <Image src={t.img} alt={t.name} fill sizes="(min-width: 640px) 33vw, 80vw" style={{ objectPosition: t.pos }} className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-105" />
                    <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1.5 text-[12px] font-bold shadow">
                      <span style={{ color: PF.blue }}>{t.years} yrs</span> experience
                    </span>
                    <div className="absolute inset-x-3 bottom-3 translate-y-2 rounded-[22px] bg-white/90 p-4 opacity-0 backdrop-blur-md transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                      <p className={`${D} text-[15px] font-[700] leading-snug tracking-[-0.02em]`}>&ldquo;{t.quote}&rdquo;</p>
                    </div>
                  </div>
                  <h3 className={`${D} mt-5 text-[22px] font-[800] tracking-[-0.04em]`}>{t.name}</h3>
                  <p className="mt-1 text-[15px]" style={{ color: PF.mute }}>
                    {t.role}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {t.certs.map((c) => (
                      <span key={c} className="rounded-full bg-white px-3 py-1 text-[12px] font-semibold shadow-[0_4px_14px_-8px_rgba(11,16,48,0.4)]">
                        ✓ {c}
                      </span>
                    ))}
                  </div>
                </article>
              </Up>
            ))}
          </div>
        </Feature>
      </div>
    </section>
  );
}

/* ───────────────────────── Reviews ───────────────────────── */

const REVIEW_TINTS = [PF.sky, "#FFE9E5", "#FFF3D1", "#DFF8EE"];

export function Reviews() {
  return (
    <section id="reviews" className="scroll-mt-20 px-5 pb-14 sm:px-8 sm:pb-20">
      <div className="mx-auto max-w-[1320px]">
        <Feature id="reviews" label="Google reviews">
          <div className="grid gap-4 lg:grid-cols-[0.8fr_2fr]">
            <Up>
              <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-[32px] p-7 text-white sm:p-9" style={{ background: PF.blue }}>
                <Heartbeat className="absolute -right-10 top-6 h-32 w-64 text-white/10" strokeWidth={2} />
                <div>
                  <p className="text-[13px] font-bold uppercase tracking-[0.14em] text-white/70">Rated by members</p>
                  <p className={`${D} mt-4 text-[96px] font-[900] leading-[0.85] tracking-[-0.07em] sm:text-[120px]`}>4.9</p>
                  <Stars className="mt-3 block text-[24px]" />
                </div>
                <p className="mt-8 flex items-center gap-2 text-[15px] text-white/80">
                  <GoogleMark /> 540 reviews on Google
                </p>
              </div>
            </Up>
            <div className="grid gap-4 sm:grid-cols-2">
              {REVIEWS.map((r, i) => (
                <Up key={r.name} delay={i * 0.08}>
                  <figure className="flex h-full flex-col rounded-[28px] p-6 sm:p-7" style={{ background: REVIEW_TINTS[i] }}>
                    <div className="flex items-center justify-between gap-3">
                      <Stars className="text-[14px]" />
                      <span className="rounded-full bg-white px-3 py-1 text-[12px] font-bold" style={{ color: PF.blue }}>
                        {r.tag}
                      </span>
                    </div>
                    <blockquote className="mt-4 flex-1 text-[16px] font-medium leading-relaxed">&ldquo;{r.text}&rdquo;</blockquote>
                    <figcaption className="mt-5 flex items-center gap-3 text-[14px]">
                      <span className={`${D} grid size-10 place-items-center rounded-full text-[15px] font-[800] text-white`} style={{ background: PF.ink }}>
                        {r.name[0]}
                      </span>
                      <span>
                        <span className="block font-bold">{r.name}</span>
                        <span className="block text-[12px]" style={{ color: PF.mute }}>
                          {r.when} · Google
                        </span>
                      </span>
                    </figcaption>
                  </figure>
                </Up>
              ))}
            </div>
          </div>
        </Feature>
      </div>
    </section>
  );
}

function GoogleMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-4 rounded-full bg-white p-0.5" aria-hidden>
      <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5a5.6 5.6 0 0 1-2.4 3.6v3h3.9c2.3-2.1 3.5-5.2 3.5-8.8Z" />
      <path fill="#34A853" d="M12 24c3.2 0 6-1.1 7.9-2.9l-3.9-3c-1.1.7-2.4 1.2-4 1.2-3.1 0-5.7-2.1-6.6-4.9H1.4v3.1A12 12 0 0 0 12 24Z" />
      <path fill="#FBBC05" d="M5.4 14.4a7.2 7.2 0 0 1 0-4.7V6.6h-4a12 12 0 0 0 0 10.9l4-3.1Z" />
      <path fill="#EA4335" d="M12 4.8c1.7 0 3.3.6 4.5 1.8l3.4-3.4A12 12 0 0 0 1.4 6.6l4 3.1C6.3 6.9 8.9 4.8 12 4.8Z" />
    </svg>
  );
}

/* ───────────────────────── Gallery ───────────────────────── */

export function Gallery() {
  return (
    <section className="px-5 pb-14 sm:px-8 sm:pb-20">
      <div className="mx-auto max-w-[1320px]">
        <Up className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <Eyebrow>Inside Pulse</Eyebrow>
            <h2 className={`${H2} mt-5 text-[clamp(2.1rem,4.6vw,3.8rem)]`}>@pulse.indore</h2>
          </div>
          <span className="inline-flex h-12 w-fit items-center gap-2 rounded-[14px] bg-white px-5 text-[14px] font-bold shadow-[0_8px_24px_-14px_rgba(11,16,48,0.5)]">
            Follow on Instagram ↗
          </span>
        </Up>

        <Feature id="gallery" label="Photo gallery" className="mt-10">
          <div className="grid auto-rows-[150px] grid-cols-2 gap-3 sm:auto-rows-[200px] sm:gap-4 md:grid-cols-4">
            {GALLERY.map((g, i) => (
              <Up
                key={g.src}
                delay={i * 0.05}
                className={`group relative overflow-hidden rounded-[24px] ${i === 0 ? "col-span-2 row-span-2" : i === 3 || i === 4 ? "row-span-2" : ""}`}
              >
                <Image src={g.src} alt={g.alt} fill sizes="(min-width: 768px) 25vw, 50vw" className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-110" />
                <div className="absolute inset-0 bg-[#3A5BFF]/0 transition-colors duration-500 group-hover:bg-[#3A5BFF]/25" />
              </Up>
            ))}
          </div>
        </Feature>
      </div>
    </section>
  );
}

/* ───────────────────────── Free-trial CTA ───────────────────────── */

export function TrialCta() {
  const { trial } = useActions();
  return (
    <section className="px-3 sm:px-5">
      <div className="relative mx-auto max-w-[1400px] overflow-hidden rounded-[40px] px-6 py-14 text-white sm:rounded-[52px] sm:px-14 sm:py-20" style={{ background: PF.blue }}>
        <div aria-hidden className="absolute inset-0 [background-image:radial-gradient(rgba(255,255,255,0.16)_1px,transparent_1px)] [background-size:24px_24px]" />
        <PulseLine className="absolute -bottom-2 left-0 h-28 w-full opacity-40" color="#FFFFFF" />
        <div className="relative grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <Up>
            <h2 className={`${H2} text-[clamp(2.6rem,6.4vw,5.6rem)]`}>
              Your first session
              <br />
              is <span className="rounded-[0.2em] px-[0.15em]" style={{ background: PF.sun, color: PF.ink }}>on us.</span>
            </h2>
            <ol className="mt-8 grid gap-3 sm:grid-cols-3">
              {["Message us on WhatsApp", "Pick a time that suits you", "Train free with a coach"].map((s, i) => (
                <li key={s} className="flex items-center gap-3 rounded-[18px] bg-white/12 p-3 text-[14px] font-semibold ring-1 ring-white/20 backdrop-blur">
                  <span className={`${D} grid size-9 shrink-0 place-items-center rounded-[12px] bg-white text-[15px] font-[800]`} style={{ color: PF.blue }}>
                    {i + 1}
                  </span>
                  {s}
                </li>
              ))}
            </ol>
            <button
              type="button"
              onClick={trial}
              className="mt-8 inline-flex h-[60px] items-center gap-3 rounded-[18px] bg-white pl-6 pr-2 text-[16px] font-bold transition-transform hover:-translate-y-0.5"
              style={{ color: PF.ink }}
            >
              <WhatsAppIcon className="size-5 text-[#1DA851]" />
              Claim my free session
              <span className="grid size-11 place-items-center rounded-[13px] text-white" style={{ background: PF.ink }}>
                →
              </span>
            </button>
          </Up>
          <Up delay={0.15} className="relative mx-auto hidden aspect-square w-full max-w-[400px] lg:block">
            <div className="absolute inset-0 overflow-hidden rounded-full border-[10px] border-white/20">
              <Image src="/images/pulse-fitness/high-five.jpg" alt="Members celebrating" fill sizes="400px" className="object-cover" />
            </div>
            <span className={`${D} absolute -left-6 bottom-10 -rotate-[8deg] rounded-[16px] px-5 py-3 text-[18px] font-[800] shadow-xl`} style={{ background: PF.sun, color: PF.ink }}>
              No joining fee 🎉
            </span>
          </Up>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── FAQ ───────────────────────── */

export function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section className="px-5 py-14 sm:px-8 sm:py-20">
      <div className="mx-auto grid max-w-[1320px] gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <Up>
          <Eyebrow>Questions</Eyebrow>
          <h2 className={`${H2} mt-5 text-[clamp(2.2rem,4.4vw,3.8rem)]`}>
            Asked <span style={{ color: PF.blue }}>a lot.</span>
          </h2>
          <p className="mt-5 max-w-[22rem] text-[16px] leading-relaxed" style={{ color: PF.mute }}>
            Anything else? Message us on WhatsApp. We usually reply within minutes.
          </p>
        </Up>
        <Up delay={0.1}>
          <Feature id="faq" label="FAQ answers common questions">
            <div className="flex flex-col gap-2">
              {FAQ.map((f, i) => {
                const on = i === open;
                return (
                  <div key={f.q} className={`rounded-[22px] transition-colors ${on ? "bg-white shadow-[0_20px_50px_-30px_rgba(11,16,48,0.45)]" : "bg-white/50"}`}>
                    <button type="button" aria-expanded={on} onClick={() => setOpen(on ? -1 : i)} className="flex w-full items-center justify-between gap-4 p-5 text-left text-[16px] font-bold sm:p-6 sm:text-[17px]">
                      {f.q}
                      <span className="grid size-9 shrink-0 place-items-center rounded-[12px] text-[20px] transition-colors duration-300" style={{ background: on ? PF.blue : PF.sky, color: on ? "white" : PF.blue }}>
                        <span className={`transition-transform duration-300 ${on ? "rotate-45" : ""}`}>+</span>
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {on && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: EASE }} className="overflow-hidden">
                          <p className="px-5 pb-6 text-[15px] leading-relaxed sm:px-6" style={{ color: PF.mute }}>
                            {f.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </Feature>
        </Up>
      </div>
    </section>
  );
}

/* ───────────────────────── Visit ───────────────────────── */

export function Visit() {
  const status = useOpenStatus(HOURS);
  const { call, trial } = useActions();
  return (
    <section id="visit" className="scroll-mt-20 px-3 pb-4 sm:px-5">
      <div className="mx-auto grid max-w-[1400px] gap-3 lg:grid-cols-[1fr_1.1fr]">
        <Up>
          <div className="h-full rounded-[40px] bg-white p-7 shadow-[0_30px_60px_-40px_rgba(11,16,48,0.4)] sm:rounded-[52px] sm:p-12">
            <Eyebrow>Visit us</Eyebrow>
            <h2 className={`${H2} mt-5 text-[clamp(2.4rem,5vw,4.2rem)]`}>
              Come <span style={{ color: PF.blue }}>say hi.</span>
            </h2>
            <p className="mt-5 flex items-start gap-2.5 text-[16px]" style={{ color: PF.mute }}>
              <span className="mt-0.5">📍</span>
              {ADDRESS}
            </p>
            <ul className="mt-7 flex flex-col gap-1">
              {DAY_ORDER.map((d) => {
                const today = status?.today === d;
                return (
                  <li key={d} className={`flex items-center justify-between rounded-[14px] px-4 py-2.5 text-[15px] ${today ? "font-bold text-white" : ""}`} style={today ? { background: PF.blue } : undefined}>
                    <span className="flex items-center gap-2">
                      {DAYS[d]}
                      {today && <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em]">Today</span>}
                    </span>
                    <span style={today ? undefined : { color: PF.mute }}>
                      {fmtTime(HOURS[d][0])} – {fmtTime(HOURS[d][1])}
                    </span>
                  </li>
                );
              })}
            </ul>
            <div className="mt-8 flex flex-wrap gap-2.5">
              <a href={MAPS_URL} target="_blank" rel="noopener" className="flex h-12 items-center gap-2 rounded-[14px] px-5 text-[15px] font-bold text-white" style={{ background: PF.ink }}>
                Get directions ↗
              </a>
              <Feature id="call" label="Tap to call" inline>
                <button type="button" onClick={call} className="flex h-12 items-center gap-2 rounded-[14px] px-5 text-[15px] font-bold" style={{ background: PF.sky, color: PF.blue }}>
                  📞 Call us
                </button>
              </Feature>
              <button type="button" onClick={trial} className="flex h-12 items-center gap-2 rounded-[14px] bg-[#1DA851] px-5 text-[15px] font-bold text-white">
                <WhatsAppIcon className="size-4" /> WhatsApp
              </button>
            </div>
          </div>
        </Up>
        <Up delay={0.1} className="h-full">
          <Feature id="map" label="Google Maps + directions" className="h-full">
            <div className="relative h-full min-h-[360px] overflow-hidden rounded-[40px] sm:rounded-[52px]" style={{ background: PF.sky }}>
              <iframe
                title="Pulse on Google Maps"
                src={MAP_EMBED}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full border-0 [filter:saturate(0.6)_hue-rotate(10deg)]"
              />
            </div>
          </Feature>
        </Up>
      </div>
    </section>
  );
}

/* ───────────────────────── Footer ───────────────────────── */

export function Footer() {
  return (
    <footer className="px-3 pb-28 pt-3 sm:px-5 sm:pb-32">
      <div className="relative mx-auto max-w-[1400px] overflow-hidden rounded-[40px] px-6 pt-12 text-white sm:rounded-[52px] sm:px-12 sm:pt-16" style={{ background: PF.ink }}>
        <div className="flex flex-col justify-between gap-8 text-[15px] sm:flex-row">
          <div className="max-w-[22rem]">
            <Logo light />
            <p className="mt-4 text-white/60">{ADDRESS}</p>
          </div>
          <div className="flex gap-12 text-white/75">
            <div className="flex flex-col gap-2">
              <a href="#classes">Classes</a>
              <a href="#timings">Timings</a>
              <a href="#plans">Plans</a>
            </div>
            <div className="flex flex-col gap-2">
              <span>Instagram</span>
              <span>YouTube</span>
              <span>Google</span>
            </div>
          </div>
        </div>
        <p
          className={`${D} mt-8 flex select-none items-center whitespace-nowrap pb-[0.06em] text-[min(25vw,340px)] font-[900] leading-[1] tracking-[-0.08em]`}
          style={{ color: PF.blue }}
        >
          pulse
          <Heartbeat className="ml-[0.06em] hidden h-[0.4em] w-[0.8em] text-[#FFD23F] sm:block" strokeWidth={3} />
        </p>
        <div className="-mx-6 mt-4 flex flex-col justify-between gap-1 border-t border-white/10 px-6 py-5 text-[12px] text-white/55 sm:-mx-12 sm:flex-row sm:px-12">
          <span>© 2026 Pulse Fitness Club, Indore</span>
          <Link href="/" className="underline-offset-4 hover:underline">
            Website by CodeCult Studio
          </Link>
        </div>
      </div>
    </footer>
  );
}
