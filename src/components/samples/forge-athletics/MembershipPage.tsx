"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import { Feature } from "../shared/Feature";
import { BASE, FAQ, FG, PLANS, PROGRAMS, QUIZ, inr, recommend } from "./data";
import { PageHead } from "./Shell";
import { Asterisk, Btn, D, EASE, Index, Lines, MONO, Up, useActions } from "./shared";

export function ForgeMembership() {
  return (
    <main>
      <PageHead
        n="05"
        kicker="Membership"
        title="Invest in"
        accent="the outcome."
        sub="Every plan includes coaching, programming and re-test days. No joining fee, no lock-in contracts, and your first session is free."
      />
      <Plans />
      <Quiz />
      <Faq />
    </main>
  );
}

/* ───────────────────────── Plans ───────────────────────── */

function Plans() {
  const { join } = useActions();
  return (
    <section className="px-5 pb-20 sm:px-8 sm:pb-28">
      <div className="mx-auto max-w-[1480px]">
        <Feature id="plans" label="Membership plans">
          <div className="grid gap-px border lg:grid-cols-3" style={{ background: FG.line, borderColor: FG.line }}>
            {PLANS.map((p, i) => {
              const pop = "popular" in p && p.popular;
              return (
                <Up key={p.id} delay={i * 0.08}>
                  <article className={`relative flex h-full flex-col p-7 sm:p-10 ${pop ? "text-black" : ""}`} style={{ background: pop ? FG.heat : FG.bg }}>
                    <div className="flex items-center justify-between">
                      <span className={MONO} style={{ color: pop ? "rgba(0,0,0,0.6)" : FG.mute }}>
                        ({String(i + 1).padStart(2, "0")}) {p.line}
                      </span>
                      {pop && <Asterisk className="size-6 animate-[spin_10s_linear_infinite] motion-reduce:animate-none" />}
                    </div>
                    <h2 className={`${D} mt-8 text-[clamp(2.6rem,5vw,4rem)] leading-none tracking-[-0.05em]`}>{p.name}</h2>
                    <p className={`${D} mt-6 text-[44px] leading-none tracking-[-0.04em]`}>
                      {inr(p.price)}
                      <span className={`ml-2 font-sans text-[14px] font-medium normal-case tracking-normal ${pop ? "text-black/60" : "text-[#8C8984]"}`}>/ month</span>
                    </p>
                    <ul className={`mt-8 flex flex-1 flex-col gap-3 border-t pt-6 text-[15px] ${pop ? "border-black/20" : "border-[#EDEAE4]/12"}`}>
                      {p.features.map((f) => (
                        <li key={f} className="flex items-start gap-3">
                          <span className="mt-1 size-2 shrink-0" style={{ background: pop ? "#0B0B0B" : FG.heat }} />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-10">
                      <Btn onClick={() => join(p.name, p.price)} variant={pop ? "bone" : "line"} className="w-full" cursor="Join">
                        Join {p.name} →
                      </Btn>
                    </div>
                  </article>
                </Up>
              );
            })}
          </div>
        </Feature>
        <p className={`${MONO} mt-6 text-center`} style={{ color: FG.mute }}>
          Prices include GST · Pay quarterly and save 10% · Students & couples ask about our rates
        </p>
      </div>
    </section>
  );
}

/* ───────────────────────── Goal quiz ───────────────────────── */

function Quiz() {
  const [answers, setAnswers] = useState<number[]>([]);
  const { join } = useActions();
  const step = answers.length;
  const done = step >= QUIZ.length;
  const rec = done ? recommend(answers) : null;
  const program = rec ? PROGRAMS.find((p) => p.id === rec.program)! : null;
  const plan = rec ? PLANS.find((p) => p.id === rec.plan)! : null;

  return (
    <section id="quiz" className="scroll-mt-24 px-5 pb-20 sm:px-8 sm:pb-28">
      <div className="mx-auto max-w-[1480px]">
        <Feature id="quiz" label="Goal quiz that recommends a program + plan">
          <div className="grid overflow-hidden lg:grid-cols-[0.8fr_1.2fr]" style={{ background: FG.bone, color: "#0B0B0B" }}>
            <div className="flex min-w-0 flex-col justify-between gap-10 p-7 sm:p-12" style={{ background: "#0B0B0B", color: FG.bone }}>
              <div>
                <Index n="✱">30-second quiz</Index>
                <h2 className={`${D} mt-6 text-[clamp(2rem,5vw,4.8rem)] leading-[0.88] tracking-[-0.045em]`}>
                  <Lines lines={["Find your", <span key="b" style={{ color: FG.heat }}>program.</span>]} />
                </h2>
                <p className="mt-5 max-w-[24rem] text-[16px] leading-relaxed" style={{ color: FG.mute }}>
                  Three quick questions. We&apos;ll match you to the right program and plan, the same way our coaches would.
                </p>
              </div>
              <div className="flex gap-2">
                {QUIZ.map((_, i) => (
                  <span key={i} className="h-1 flex-1 overflow-hidden" style={{ background: FG.line }}>
                    <motion.span className="block h-full" style={{ background: FG.heat }} animate={{ width: i < step ? "100%" : "0%" }} transition={{ duration: 0.5, ease: EASE }} />
                  </span>
                ))}
              </div>
            </div>

            <div className="relative min-h-[520px] min-w-0 p-7 sm:p-12">
              <AnimatePresence mode="wait">
                {!done ? (
                  <motion.div key={step} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.45, ease: EASE }}>
                    <div className="flex items-center justify-between">
                      <p className={`${MONO} text-black/50`}>
                        Question {step + 1} of {QUIZ.length}
                      </p>
                      {step > 0 && (
                        <button type="button" onClick={() => setAnswers((a) => a.slice(0, -1))} className={`${MONO} text-black/60 underline-offset-4 hover:underline`}>
                          ← Back
                        </button>
                      )}
                    </div>
                    <h3 className={`${D} mt-4 text-[clamp(1.8rem,3.4vw,3rem)] leading-[0.95] tracking-[-0.035em]`}>{QUIZ[step].q}</h3>
                    <div className="mt-8 grid gap-3 sm:grid-cols-2">
                      {QUIZ[step].options.map((o, i) => (
                        <button
                          key={o.label}
                          type="button"
                          data-cursor="Pick"
                          onClick={() => setAnswers((a) => [...a, i])}
                          className="group flex items-center justify-between gap-4 border border-black/15 p-5 text-left transition-colors duration-300 hover:border-black hover:bg-black hover:text-[#EDEAE4]"
                        >
                          <span>
                            <span className={`${D} block text-[22px] tracking-[-0.02em]`}>{o.label}</span>
                            <span className="mt-1 block text-[14px] opacity-60">{o.hint}</span>
                          </span>
                          <span className="text-[20px] transition-transform duration-300 group-hover:translate-x-1">→</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  program &&
                  plan && (
                    <motion.div key="result" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }} className="flex h-full flex-col">
                      <p className={MONO} style={{ color: FG.heat }}>
                        Your match
                      </p>
                      <div className="mt-5 grid gap-6 sm:grid-cols-[160px_minmax(0,1fr)]">
                        <div className="relative aspect-[4/5] overflow-hidden sm:aspect-auto sm:h-full">
                          <Image src={program.img} alt={program.name} fill sizes="180px" className="object-cover grayscale" />
                        </div>
                        <div>
                          <p className={`${MONO} text-black/50`}>Program</p>
                          <h3 className={`${D} mt-1 text-[clamp(2rem,3.4vw,3.2rem)] leading-none tracking-[-0.05em]`}>{program.name}</h3>
                          <p className="mt-2 text-[16px] text-black/65">{program.desc}</p>
                          <div className="mt-5 flex items-baseline justify-between gap-4 border-t border-black/15 pt-4">
                            <span>
                              <span className={`${MONO} block text-black/50`}>Suggested plan</span>
                              <span className={`${D} text-[26px] tracking-[-0.03em]`}>{plan.name}</span>
                            </span>
                            <span className={`${D} text-[26px] tracking-[-0.03em]`} style={{ color: FG.heat }}>
                              {inr(plan.price)}
                              <span className="font-sans text-[13px] font-medium normal-case text-black/50">/mo</span>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-8 flex flex-wrap gap-3">
                        <Btn href={`${BASE}/trial`} cursor="Book">
                          Book free trial →
                        </Btn>
                        <button type="button" onClick={() => join(plan.name, plan.price, program.name)} className="inline-flex h-14 items-center rounded-full border border-black/25 px-7 text-[13px] font-semibold uppercase tracking-[0.14em] transition-colors hover:bg-black hover:text-[#EDEAE4]">
                          Join {plan.name}
                        </button>
                        <button type="button" onClick={() => setAnswers([])} className={`${MONO} px-3 text-black/55 underline-offset-4 hover:underline`}>
                          Retake ↺
                        </button>
                      </div>
                    </motion.div>
                  )
                )}
              </AnimatePresence>
            </div>
          </div>
        </Feature>
      </div>
    </section>
  );
}

/* ───────────────────────── FAQ ───────────────────────── */

function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section className="px-5 pb-20 sm:px-8 sm:pb-28">
      <div className="mx-auto grid max-w-[1480px] gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <Index n="✱">Questions</Index>
          <h2 className={`${D} mt-6 text-[clamp(2rem,5vw,4.8rem)] leading-[0.9] tracking-[-0.045em]`}>
            <Lines lines={["Good", <span key="b" style={{ color: FG.heat }}>questions.</span>]} />
          </h2>
        </div>
        <div className="border-t" style={{ borderColor: FG.line }}>
          {FAQ.map((f, i) => {
            const on = i === open;
            return (
              <div key={f.q} className="border-b" style={{ borderColor: FG.line }}>
                <button type="button" aria-expanded={on} onClick={() => setOpen(on ? -1 : i)} className="flex w-full items-center justify-between gap-6 py-6 text-left">
                  <span className={`${D} text-[clamp(1.2rem,2vw,1.6rem)] tracking-[-0.02em]`}>{f.q}</span>
                  <span className={`grid size-10 shrink-0 place-items-center rounded-full border text-[20px] transition-all duration-300 ${on ? "rotate-45 border-[#FF4D2E] bg-[#FF4D2E] text-black" : "border-[#EDEAE4]/20"}`}>+</span>
                </button>
                <AnimatePresence initial={false}>
                  {on && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: EASE }} className="overflow-hidden">
                      <p className="max-w-[40rem] pb-6 text-[16px] leading-relaxed" style={{ color: FG.mute }}>
                        {f.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
