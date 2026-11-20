"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Feature } from "../shared/Feature";
import { COACHES, FG } from "./data";
import { PageHead } from "./Shell";
import { Btn, D, EASE, Index, Lines, MONO, Up, useActions } from "./shared";

type Coach = (typeof COACHES)[number];

export function ForgeCoaches() {
  const [open, setOpen] = useState<Coach | null>(null);
  return (
    <main>
      <PageHead
        n="03"
        kicker="Coaches"
        title="Coached,"
        accent="not counted."
        sub="Small groups, real programming and a coach who knows your numbers. Meet the people who'll get you there."
      />
      <Grid onOpen={setOpen} />
      <HowItWorks />
      <Profile coach={open} onClose={() => setOpen(null)} />
    </main>
  );
}

function Grid({ onOpen }: { onOpen: (c: Coach) => void }) {
  return (
    <section className="px-5 pb-20 sm:px-8 sm:pb-28">
      <div className="mx-auto max-w-[1480px]">
        <Feature id="coach-profiles" label="Coach profiles with full bios">
          <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2">
            {COACHES.map((c, i) => (
              <Up key={c.id} delay={(i % 2) * 0.1} className={i % 2 ? "sm:mt-24" : ""}>
                <article id={c.id} className="group scroll-mt-28">
                  <button type="button" onClick={() => onOpen(c)} data-cursor="Profile" className="block w-full text-left" aria-label={`Open ${c.name}'s profile`}>
                    <div className="relative aspect-[4/5] overflow-hidden" style={{ background: FG.panel }}>
                      <Image src={c.img} alt={c.name} fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover grayscale transition-transform duration-[1400ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-105" style={{ objectPosition: c.pos }} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      <span className={`${MONO} absolute left-4 top-4 bg-black/60 px-2.5 py-1.5 backdrop-blur`}>
                        <span style={{ color: FG.heat }}>({String(i + 1).padStart(2, "0")})</span> {c.years} years coaching
                      </span>
                      <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4">
                        <p className={`${D} text-[clamp(1.6rem,3vw,2.6rem)] leading-none tracking-[-0.03em]`}>
                          <span className="block" style={{ color: FG.heat }}>
                            {c.stat[0]}
                          </span>
                          <span className={`${MONO} mt-2 block normal-case`}>{c.stat[1]}</span>
                        </p>
                        <span className="grid size-12 shrink-0 place-items-center rounded-full text-[20px] text-black transition-transform duration-500 group-hover:rotate-45" style={{ background: FG.bone }}>
                          +
                        </span>
                      </div>
                    </div>
                  </button>
                  <div className="mt-5 flex items-baseline justify-between gap-4">
                    <h2 className={`${D} text-[clamp(2rem,3.6vw,3.2rem)] leading-none tracking-[-0.04em]`}>{c.name}</h2>
                  </div>
                  <p className="mt-2 text-[16px]" style={{ color: FG.mute }}>
                    {c.role}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {c.specs.map((s) => (
                      <li key={s} className="rounded-full border px-3 py-1.5 text-[12px] font-medium" style={{ borderColor: FG.line }}>
                        {s}
                      </li>
                    ))}
                  </ul>
                </article>
              </Up>
            ))}
          </div>
        </Feature>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    ["Match", "Tell us your goal. We pair you with the coach who fits it best."],
    ["Program", "Your coach writes your 12-week block and sets your starting numbers."],
    ["Check in", "Every two weeks: numbers, photos, food. Adjust and go again."],
  ];
  return (
    <section className="px-5 pb-20 sm:px-8 sm:pb-28">
      <div className="mx-auto max-w-[1480px] border-t pt-14" style={{ borderColor: FG.line }}>
        <Index n="✱">How coaching works</Index>
        <div className="mt-10 grid gap-px border sm:grid-cols-3" style={{ background: FG.line, borderColor: FG.line }}>
          {steps.map(([t, d], i) => (
            <Up key={t} delay={i * 0.08}>
              <div className="h-full p-7 sm:p-9" style={{ background: FG.bg }}>
                <span className={`${D} text-[80px] leading-none tracking-[-0.05em] text-transparent [-webkit-text-stroke:1.5px_#FF4D2E]`}>0{i + 1}</span>
                <h3 className={`${D} mt-6 text-[30px] tracking-[-0.03em]`}>{t}</h3>
                <p className="mt-2 text-[16px] leading-relaxed" style={{ color: FG.mute }}>
                  {d}
                </p>
              </div>
            </Up>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Profile drawer ───────────────────────── */

function Profile({ coach, onClose }: { coach: Coach | null; onClose: () => void }) {
  const { coach: book } = useActions();
  useEffect(() => {
    if (!coach) return;
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", esc);
      document.documentElement.style.overflow = "";
    };
  }, [coach, onClose]);

  return (
    <AnimatePresence>
      {coach && (
        <>
          <motion.div key="bg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-sm" />
          <motion.aside
            key="panel"
            role="dialog"
            aria-modal="true"
            aria-label={`${coach.name} profile`}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-y-0 right-0 z-[71] flex w-full max-w-[620px] flex-col overflow-y-auto"
            style={{ background: FG.bone, color: "#0B0B0B" }}
            data-lenis-prevent
          >
            <div className="relative aspect-[4/3] shrink-0 overflow-hidden">
              <Image src={coach.img} alt={coach.name} fill sizes="620px" className="object-cover grayscale" style={{ objectPosition: coach.pos }} />
              <button type="button" onClick={onClose} aria-label="Close profile" className="absolute right-4 top-4 grid size-12 place-items-center rounded-full bg-black text-[22px] text-white">
                ×
              </button>
            </div>
            <div className="flex flex-1 flex-col p-6 sm:p-10">
              <p className={MONO} style={{ color: FG.heat }}>
                {coach.role}
              </p>
              <h2 className={`${D} mt-3 text-[clamp(2.2rem,7vw,4.4rem)] leading-[0.9] tracking-[-0.045em]`}>
                <Lines now delay={0.3} lines={[coach.name]} />
              </h2>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.7, ease: EASE }}>
                <p className="mt-5 text-[17px] leading-relaxed text-black/70">{coach.bio}</p>
                <blockquote className={`${D} mt-8 border-l-4 pl-5 text-[24px] leading-tight tracking-[-0.02em]`} style={{ borderColor: FG.heat }}>
                  &ldquo;{coach.quote}&rdquo;
                </blockquote>
                <div className="mt-8 grid grid-cols-2 gap-px border border-black/10 bg-black/10">
                  <div className="p-4" style={{ background: FG.bone }}>
                    <p className={`${MONO} text-black/50`}>Experience</p>
                    <p className={`${D} mt-1 text-[30px]`}>{coach.years} yrs</p>
                  </div>
                  <div className="p-4" style={{ background: FG.bone }}>
                    <p className={`${MONO} text-black/50`}>{coach.stat[1]}</p>
                    <p className={`${D} mt-1 text-[30px]`} style={{ color: FG.heat }}>
                      {coach.stat[0]}
                    </p>
                  </div>
                </div>
                <p className={`${MONO} mt-8 text-black/50`}>Certifications</p>
                <ul className="mt-3 flex flex-col gap-2">
                  {coach.certs.map((c) => (
                    <li key={c} className="flex items-center gap-3 border-b border-black/10 pb-2 text-[15px] font-medium">
                      <span style={{ color: FG.heat }}>✱</span> {c}
                    </li>
                  ))}
                </ul>
              </motion.div>
              <div className="mt-auto pt-10">
                <Btn onClick={() => book(coach.name)} className="w-full" cursor="Book">
                  Book a trial with {coach.name.split(" ")[0]} →
                </Btn>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
