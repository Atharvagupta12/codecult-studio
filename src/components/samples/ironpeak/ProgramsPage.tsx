"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import { Feature } from "../shared/Feature";
import { fmtTime, useIndiaNow } from "../shared/indiaTime";
import { CAT_LABEL, DAYS, DAYS_SHORT, DAY_ORDER, IP, PROGRAMS, TIMETABLE, booked, type Cat } from "./data";
import { PageHero } from "./Shell";
import { Btn, D, EASE, Kicker, LABEL, Slam, Up, useActions } from "./shared";

export function IronpeakPrograms() {
  return (
    <main>
      <PageHero
        img="/images/ironpeak/squad.jpg"
        kicker="Programs & timetable"
        title="Pick your"
        outline="program."
        sub="Five coached programs, 40+ classes a week. Every program comes with a coach, a plan and progress tracking."
      />
      <ProgramStack />
      <Timetable />
    </main>
  );
}

/* ───────────────────────── Stacking program cards ───────────────────────── */

function ProgramStack() {
  const { trial } = useActions();
  return (
    <section className="px-5 py-14 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-[1440px]">
        <Feature id="program-cards" label="Program pages with details">
          <div className="flex flex-col gap-4 lg:gap-0">
            {PROGRAMS.map((p, i) => (
              <article
                key={p.id}
                id={p.id}
                className="scroll-mt-24 lg:sticky lg:mb-10"
                style={{ top: `calc(88px + ${i * 14}px)` }}
              >
                <div className="grid overflow-hidden border lg:h-[520px] lg:grid-cols-[1.1fr_1fr]" style={{ background: IP.panel, borderColor: IP.line }}>
                  <div className="relative min-h-[260px] overflow-hidden">
                    <Image src={p.img} alt={p.name} fill sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover" style={{ objectPosition: p.pos ?? "50% 40%" }} />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#141414]/40" />
                    <span className={`${D} absolute left-5 top-3 text-[88px] leading-none text-transparent [-webkit-text-stroke:2px_#E5FF3D] sm:text-[120px]`}>{p.n}</span>
                  </div>
                  <div className="flex flex-col p-6 sm:p-10">
                    <p className={`${LABEL} text-white/45`}>{p.tag}</p>
                    <h2 className={`${D} mt-3 text-[clamp(2.8rem,5vw,4.6rem)] leading-[0.9]`}>{p.name}</h2>
                    <p className="mt-4 max-w-[32rem] text-[16px] leading-relaxed text-white/70">{p.desc}</p>
                    <div className="mt-6 grid grid-cols-2 gap-px" style={{ background: IP.line }}>
                      {[
                        ["Frequency", `${p.perWeek} a week`],
                        ["Level", p.level],
                      ].map(([k, v]) => (
                        <div key={k} className="p-4" style={{ background: IP.panel }}>
                          <p className={`${LABEL} text-white/40`}>{k}</p>
                          <p className="mt-1 text-[16px] font-bold">{v}</p>
                        </div>
                      ))}
                    </div>
                    <ul className="mt-6 flex flex-wrap gap-2">
                      {p.goals.map((g) => (
                        <li key={g} className="flex items-center gap-2 bg-white/5 px-3 py-2 text-[13px] font-semibold">
                          <span className="size-1.5" style={{ background: IP.lime }} />
                          {g}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto pt-8">
                      <Btn onClick={trial}>Try {p.name} free →</Btn>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Feature>
      </div>
    </section>
  );
}

/* ───────────────────────── Timetable ───────────────────────── */

const FILTERS: ("all" | Cat)[] = ["all", "strength", "muscle", "boxing", "hiit", "athletic"];

function Timetable() {
  const now = useIndiaNow();
  const { reserve } = useActions();
  const [picked, setPicked] = useState<number | null>(null);
  const [cat, setCat] = useState<"all" | Cat>("all");
  const day = picked ?? now?.day ?? 1;
  const isToday = now?.day === day;
  const list = TIMETABLE.filter((s) => s.days.includes(day) && (cat === "all" || s.cat === cat)).sort((a, b) => a.start - b.start);

  return (
    <section id="timetable" className="scroll-mt-20 px-5 pb-14 sm:px-8 sm:pb-20">
      <div className="mx-auto max-w-[1440px]">
        <Up className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <Kicker>Weekly timetable</Kicker>
            <h2 className={`${D} mt-4 text-[clamp(2.8rem,6vw,5.4rem)] leading-[0.9]`}>
              <Slam lines={["Book your", <span key="b" style={{ color: IP.lime }}>spot.</span>]} />
            </h2>
          </div>
          <p className="max-w-[26rem] text-[16px] leading-relaxed text-white/60">Classes are capped so coaches can watch every rep. Reserve your spot on WhatsApp in one tap.</p>
        </Up>

        <Feature id="timetable" label="Weekly timetable with filters" className="mt-10">
          <div className="border p-3 sm:p-5" style={{ borderColor: IP.line, background: IP.panel }}>
            <div role="tablist" aria-label="Day" className="grid grid-cols-7 gap-1">
              {DAY_ORDER.map((d) => {
                const on = d === day;
                return (
                  <button key={d} role="tab" type="button" aria-selected={on} onClick={() => setPicked(d)} className={`relative h-14 text-[13px] font-extrabold uppercase tracking-[0.08em] transition-colors sm:h-16 sm:text-[14px] ${on ? "text-black" : "text-white/60 hover:text-white"}`}>
                    {on && <motion.span layoutId="ip-day" className="absolute inset-0" style={{ background: IP.lime }} transition={{ type: "spring", stiffness: 420, damping: 36 }} />}
                    <span className="relative flex flex-col items-center leading-tight">
                      {DAYS_SHORT[d]}
                      {now?.day === d && <span className={`text-[9px] tracking-[0.14em] ${on ? "text-black/60" : "text-[#E5FF3D]"}`}>Today</span>}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="-mx-3 mt-4 flex gap-2 overflow-x-auto px-3 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0">
              {FILTERS.map((f) => {
                const on = f === cat;
                return (
                  <button key={f} type="button" onClick={() => setCat(f)} className={`h-10 shrink-0 border px-4 text-[12px] font-bold uppercase tracking-[0.12em] transition-colors ${on ? "border-[#E5FF3D] text-[#E5FF3D]" : "border-white/15 text-white/60 hover:text-white"}`}>
                    {f === "all" ? "All classes" : CAT_LABEL[f]}
                  </button>
                );
              })}
            </div>

            <p className={`${LABEL} mt-6 text-white/40`}>
              {DAYS[day]} · {list.length} {list.length === 1 ? "class" : "classes"}
            </p>

            <ul className="mt-3 flex flex-col gap-px" style={{ background: IP.line }}>
              <AnimatePresence mode="popLayout" initial={false}>
                {list.map((s, i) => {
                  const live = isToday && now && now.minutes >= s.start && now.minutes < s.start + s.mins;
                  const done = isToday && now && now.minutes >= s.start + s.mins;
                  const b = booked(s, day);
                  const full = b >= s.cap;
                  return (
                    <motion.li
                      key={`${day}-${s.id}`}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: done ? 0.4 : 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4, ease: EASE, delay: i * 0.03 }}
                      className="grid grid-cols-[72px_1fr_auto] items-center gap-3 p-4 sm:grid-cols-[120px_1fr_160px_140px] sm:gap-6 sm:p-5"
                      style={{ background: IP.bg }}
                    >
                      <span>
                        <span className={`${D} block text-[22px] leading-none sm:text-[30px]`} style={{ color: live ? IP.lime : undefined }}>
                          {fmtTime(s.start)}
                        </span>
                        <span className="text-[12px] text-white/45">{s.mins} min</span>
                      </span>
                      <span className="min-w-0">
                        <span className="flex flex-wrap items-center gap-2">
                          <span className="text-[16px] font-bold sm:text-[18px]">{s.name}</span>
                          {live && (
                            <span className={`${LABEL} flex items-center gap-1.5 px-2 py-0.5 text-black`} style={{ background: IP.lime }}>
                              <span className="size-1.5 animate-pulse rounded-full bg-black" /> Live
                            </span>
                          )}
                        </span>
                        <span className="block text-[13px] text-white/50">
                          {CAT_LABEL[s.cat]} · Coach {s.coach}
                        </span>
                      </span>
                      <span className="hidden sm:block">
                        <span className="flex justify-between text-[12px] font-semibold text-white/55">
                          <span>{full ? "Full" : `${s.cap - b} left`}</span>
                          <span>
                            {b}/{s.cap}
                          </span>
                        </span>
                        <span className="mt-1.5 block h-1 bg-white/10">
                          <span className="block h-full" style={{ width: `${(b / s.cap) * 100}%`, background: full ? IP.red : IP.lime }} />
                        </span>
                      </span>
                      {done ? (
                        <span className={`${LABEL} text-right text-white/35`}>Done</span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => reserve(s, day)}
                          className={`h-11 px-3 text-[11px] font-extrabold uppercase tracking-[0.12em] transition-colors sm:px-4 sm:text-[12px] ${full ? "border border-white/20 text-white/70" : "bg-white/[0.08] hover:bg-[#E5FF3D] hover:text-black"}`}
                        >
                          {full ? "Waitlist" : "Reserve"}
                        </button>
                      )}
                    </motion.li>
                  );
                })}
              </AnimatePresence>
              {list.length === 0 && (
                <li className="p-10 text-center text-[15px] text-white/55" style={{ background: IP.bg }}>
                  No {cat !== "all" ? CAT_LABEL[cat].toLowerCase() : ""} classes on {DAYS[day]}. The gym floor is still open.
                </li>
              )}
            </ul>
          </div>
        </Feature>
      </div>
    </section>
  );
}
