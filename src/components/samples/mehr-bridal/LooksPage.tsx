"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import { Feature } from "../shared/Feature";
import { BASE, MB, QUIZ, RESULTS, SIGNATURES, pickLook } from "./data";
import { PageHead } from "./Shell";
import { Btn, EASE, Kicker, LABEL, Petals, SERIF, Up, useActions } from "./shared";

export function MehrLooks() {
  return (
    <main>
      <PageHead kicker="Find your look" title="Which bride" italic="are you?" sub="Answer three quick questions about your skin, outfit and mood. We'll suggest the signature look we'd design for you." />
      <Quiz />
      <Gallery />
    </main>
  );
}

function Quiz() {
  const [answers, setAnswers] = useState<number[]>([]);
  const { send } = useActions();
  const step = answers.length;
  const done = step >= QUIZ.length;
  const r = done ? RESULTS[pickLook(answers)] : null;

  return (
    <section className="px-5 pb-24 sm:px-10 sm:pb-32">
      <div className="mx-auto max-w-[1100px]">
        <Feature id="look-quiz" label="Find-your-look quiz">
          <div className="relative overflow-hidden rounded-[28px] border p-6 sm:p-12" style={{ borderColor: MB.line, background: MB.panel }}>
            <Petals className="opacity-50" />
            <div className="relative flex gap-2">
              {QUIZ.map((_, i) => (
                <span key={i} className="h-1 flex-1 overflow-hidden rounded-full bg-[#F7E7DF]/10">
                  <motion.span className="block h-full rounded-full" style={{ background: MB.rose }} animate={{ width: i < step ? "100%" : "0%" }} transition={{ duration: 0.6, ease: EASE }} />
                </span>
              ))}
            </div>
            <div className="relative min-h-[300px] sm:min-h-[360px]">
              <AnimatePresence mode="wait">
                {!done ? (
                  <motion.div key={step} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.5, ease: EASE }} className="pt-10">
                    <div className="flex items-center justify-between">
                      <p className={`${LABEL} text-[10px] text-[#B7948B]`}>
                        Question {step + 1} of {QUIZ.length}
                      </p>
                      {step > 0 && (
                        <button type="button" onClick={() => setAnswers((a) => a.slice(0, -1))} className={`${LABEL} text-[10px] text-[#B7948B] hover:text-[#F7E7DF]`}>
                          ← Back
                        </button>
                      )}
                    </div>
                    <h2 className={`${SERIF} mt-4 text-[clamp(2.2rem,4.4vw,3.8rem)] italic leading-[1.05]`}>{QUIZ[step].q}</h2>
                    <div className={`mt-10 grid gap-3 ${QUIZ[step].options.length === 4 ? "sm:grid-cols-2" : "sm:grid-cols-3"}`}>
                      {QUIZ[step].options.map((o, i) => (
                        <button
                          key={o.label}
                          type="button"
                          data-cursor="Pick"
                          onClick={() => setAnswers((a) => [...a, i])}
                          className="group flex items-center gap-4 rounded-[20px] border p-5 text-left transition-colors duration-300 hover:border-[#E7B59E] hover:bg-[#E7B59E]/10"
                          style={{ borderColor: MB.line }}
                        >
                          <span className="size-12 shrink-0 rounded-full ring-2 ring-[#F7E7DF]/20 transition-transform duration-300 group-hover:scale-110" style={{ background: o.swatch }} />
                          <span>
                            <span className={`${SERIF} block text-[24px] leading-tight`}>{o.label}</span>
                            <span className="mt-0.5 block text-[14px] text-[#F7E7DF]/60">{o.hint}</span>
                          </span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  r && (
                    <motion.div key="result" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, ease: EASE }} className="grid gap-8 pt-10 md:grid-cols-[0.8fr_1.2fr] md:items-center">
                      <div className="relative mx-auto aspect-[4/5] w-full max-w-[340px] overflow-hidden rounded-t-[999px]">
                        <Image src={r.img} alt={r.name} fill sizes="340px" className="object-cover" />
                      </div>
                      <div>
                        <Kicker>Your look</Kicker>
                        <h2 className={`${SERIF} mt-4 text-[clamp(2.6rem,5vw,4.4rem)] italic leading-none`} style={{ color: MB.rose }}>
                          {r.name}
                        </h2>
                        <dl className="mt-8 flex flex-col gap-4">
                          {[
                            ["Base", r.base],
                            ["Eyes", r.eyes],
                            ["Lips", r.lips],
                          ].map(([k, v]) => (
                            <div key={k} className="flex gap-6 border-b pb-3" style={{ borderColor: MB.line }}>
                              <dt className={`${LABEL} w-14 shrink-0 pt-1 text-[10px] text-[#B7948B]`}>{k}</dt>
                              <dd className="text-[16px]">{v}</dd>
                            </div>
                          ))}
                        </dl>
                        <p className="mt-6 text-[15px] text-[#F7E7DF]/70">
                          We&apos;d suggest the <b className="text-[#F7E7DF]">{r.pack}</b> package for this look.
                        </p>
                        <div className="mt-8 flex flex-wrap gap-3">
                          <Btn cursor="Book" onClick={() => send("Look requests straight to your WhatsApp", `Hi Mehr! 💄\nThe quiz says I'm a "${r.name}" bride.\nI'd love this look for my wedding. Are you free on my date?`)}>
                            I want this look
                          </Btn>
                          <Btn href={`${BASE}/packages`} variant="line">
                            See packages
                          </Btn>
                          <button type="button" onClick={() => setAnswers([])} className={`${LABEL} px-3 text-[10px] text-[#B7948B] hover:text-[#F7E7DF]`}>
                            Retake ↺
                          </button>
                        </div>
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

function Gallery() {
  return (
    <section className="px-5 pb-24 sm:px-10 sm:pb-32">
      <div className="mx-auto max-w-[1440px]">
        <Up className="text-center">
          <Kicker className="justify-center">The signature looks</Kicker>
        </Up>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {SIGNATURES.map((s, i) => (
            <Up key={s.name} delay={i * 0.1}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-[20px]">
                <Image src={s.img} alt={s.name} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A0A0E] via-transparent to-transparent" />
                <div className="absolute inset-x-5 bottom-5">
                  <p className={`${LABEL} text-[9px]`} style={{ color: MB.rose }}>
                    {s.style}
                  </p>
                  <p className={`${SERIF} mt-2 text-[28px] italic`}>{s.name}</p>
                  <p className="mt-1 text-[14px] text-[#F7E7DF]/70">{s.line}</p>
                </div>
              </div>
            </Up>
          ))}
        </div>
      </div>
    </section>
  );
}
