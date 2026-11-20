"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Feature } from "../shared/Feature";
import { BASE, FG, PROGRAMS } from "./data";
import { PageHead } from "./Shell";
import { Btn, D, EASE, Lines, MONO, Up } from "./shared";

export function ForgePrograms() {
  return (
    <main>
      <PageHead
        n="02"
        kicker="Programs"
        title="Four paths."
        accent="Pick yours."
        sub="Every program runs in 12-week blocks with a coach, a written plan, nutrition guidance and a re-test day at the end."
        img="/images/forge-athletics/plates-bw.jpg"
      />
      <Explorer />
      <QuizBand />
    </main>
  );
}

/* ───────────────────────── Program explorer (scroll-spy) ───────────────────────── */

function Explorer() {
  const [active, setActive] = useState<string>(PROGRAMS[0].id);

  // Highlight the program currently in view
  useEffect(() => {
    const els = PROGRAMS.map((p) => document.getElementById(p.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.25, 0.5] },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section className="px-5 pb-20 sm:px-8 sm:pb-28">
      <div className="mx-auto grid max-w-[1480px] gap-10 lg:grid-cols-[280px_1fr] lg:gap-16">
        {/* Sticky index */}
        <aside className="hidden lg:block">
          <div className="sticky top-28">
            <p className={MONO} style={{ color: FG.mute }}>
              Index
            </p>
            <ul className="mt-5 border-t" style={{ borderColor: FG.line }}>
              {PROGRAMS.map((p) => {
                const on = p.id === active;
                return (
                  <li key={p.id} className="border-b" style={{ borderColor: FG.line }}>
                    <a href={`#${p.id}`} className="relative flex items-baseline gap-3 py-4 pl-4">
                      {on && <motion.span layoutId="fg-prog" className="absolute inset-y-0 left-0 w-[3px]" style={{ background: FG.heat }} />}
                      <span className={MONO} style={{ color: on ? FG.heat : FG.mute }}>
                        {p.n}
                      </span>
                      <span className={`${D} text-[18px] tracking-[-0.02em] transition-colors ${on ? "" : "text-[#EDEAE4]/45"}`}>{p.name}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
            <div className="mt-8">
              <Btn href={`${BASE}/membership#quiz`} variant="line" className="w-full" cursor="Quiz">
                Not sure? Quiz →
              </Btn>
            </div>
          </div>
        </aside>

        <Feature id="program-detail" label="Program pages with weekly plans">
          <div className="flex flex-col gap-20 sm:gap-28">
            {PROGRAMS.map((p) => (
              <article key={p.id} id={p.id} className="scroll-mt-28">
                <Up>
                  <div className="flex items-baseline justify-between gap-4 border-b pb-4" style={{ borderColor: FG.line }}>
                    <span className={MONO} style={{ color: FG.heat }}>
                      ({p.n}) {p.weeks}-week block
                    </span>
                    <span className="flex gap-1" aria-label={`Intensity ${p.intensity} of 5`}>
                      {[1, 2, 3, 4, 5].map((i) => (
                        <span key={i} className="h-1.5 w-6" style={{ background: i <= p.intensity ? FG.heat : FG.line }} />
                      ))}
                    </span>
                  </div>
                  <h2 className={`${D} mt-6 text-[clamp(1.9rem,6vw,6rem)] leading-[0.86] tracking-[-0.05em]`}>
                    <Lines lines={[p.name]} />
                  </h2>
                  <p className={`${D} mt-3 text-[clamp(1.3rem,2.4vw,2rem)] tracking-[-0.02em]`} style={{ color: FG.heat }}>
                    {p.line}
                  </p>
                </Up>

                <Up delay={0.05} className="relative mt-8 aspect-[16/8] overflow-hidden" >
                  <motion.div initial={{ scale: 1.15 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ duration: 1.6, ease: EASE }} className="absolute inset-0">
                    <Image src={p.img} alt={p.name} fill sizes="(min-width: 1024px) 70vw, 100vw" className="object-cover grayscale" style={{ objectPosition: p.pos ?? "50% 40%" }} />
                  </motion.div>
                </Up>

                <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_1fr]">
                  <Up>
                    <p className="text-[18px] leading-relaxed" style={{ color: FG.mute }}>
                      {p.desc}
                    </p>
                    <dl className="mt-8 grid grid-cols-2 gap-px border" style={{ background: FG.line, borderColor: FG.line }}>
                      {[
                        ["Duration", `${p.weeks} weeks`],
                        ["Sessions", `${p.perWeek} a week`],
                        ["Intensity", `${p.intensity} / 5`],
                        ["Best for", p.forWho],
                      ].map(([k, v]) => (
                        <div key={k} className={`p-4 ${k === "Best for" ? "col-span-2 sm:col-span-1" : ""}`} style={{ background: FG.bg }}>
                          <dt className={MONO} style={{ color: FG.mute }}>
                            {k}
                          </dt>
                          <dd className="mt-1.5 text-[15px] font-medium">{v}</dd>
                        </div>
                      ))}
                    </dl>
                    <ul className="mt-6 flex flex-wrap gap-2">
                      {p.outcomes.map((o) => (
                        <li key={o} className="rounded-full border px-4 py-2 text-[13px] font-medium" style={{ borderColor: FG.line }}>
                          <span style={{ color: FG.heat }}>✱</span> {o}
                        </li>
                      ))}
                    </ul>
                  </Up>
                  <Up delay={0.1}>
                    <p className={MONO} style={{ color: FG.mute }}>
                      A typical week
                    </p>
                    <ol className="mt-4 grid grid-cols-2 gap-px border sm:grid-cols-3" style={{ background: FG.line, borderColor: FG.line }}>
                      {p.week.map(([d, f], i) => {
                        const rest = f === "—";
                        return (
                          <motion.li
                            key={d}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 + i * 0.07 }}
                            className="flex min-h-[110px] flex-col justify-between p-4"
                            style={{ background: rest ? FG.bg : FG.panel }}
                          >
                            <span className={MONO} style={{ color: rest ? FG.mute : FG.heat }}>
                              {d}
                            </span>
                            <span className={`text-[15px] font-medium leading-snug ${rest ? "text-[#EDEAE4]/35" : ""}`}>{rest ? "Rest & recover" : f}</span>
                          </motion.li>
                        );
                      })}
                    </ol>
                    <div className="mt-8 flex flex-wrap gap-3">
                      <Btn href={`${BASE}/trial`} cursor="Book">
                        Try it free →
                      </Btn>
                    </div>
                  </Up>
                </div>
              </article>
            ))}
          </div>
        </Feature>
      </div>
    </section>
  );
}

function QuizBand() {
  return (
    <section className="px-5 pb-20 sm:px-8 sm:pb-28">
      <Up className="mx-auto max-w-[1480px]">
        <div className="flex flex-col justify-between gap-8 p-8 text-black sm:p-14 lg:flex-row lg:items-end" style={{ background: FG.heat }}>
          <div>
            <p className={`${MONO} text-black/60`}>(?) Still deciding</p>
            <h2 className={`${D} mt-5 text-[clamp(2rem,4.6vw,4.4rem)] leading-[0.9] tracking-[-0.045em]`}>
              Three questions.
              <br />
              Your perfect program.
            </h2>
          </div>
          <Btn href={`${BASE}/membership#quiz`} variant="bone" cursor="Quiz" className="shrink-0">
            Take the 30-sec quiz →
          </Btn>
        </div>
      </Up>
    </section>
  );
}
