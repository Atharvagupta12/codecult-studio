"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Feature } from "../shared/Feature";
import { COMPARE, FAQ, IP, PLANS, PROGRAMS, inr } from "./data";
import { PageHero } from "./Shell";
import { D, EASE, Kicker, LABEL, Slam, Up, useActions } from "./shared";

export function IronpeakPlans() {
  return (
    <main>
      <PageHero
        img="/images/ironpeak/kettlebells.jpg"
        kicker="Membership"
        title="Invest in"
        outline="yourself."
        sub="Simple monthly plans. No contracts, no joining fee and your first session is always free."
        pos="50% 60%"
      />
      <Bmi />
      <PlanCards />
      <Faq />
    </main>
  );
}

/* ───────────────────────── BMI calculator ───────────────────────── */

const BANDS = [
  { max: 18.5, label: "Underweight", color: "#5AB8FF", program: "muscle", advice: "Build lean muscle with a calorie surplus and structured lifting." },
  { max: 25, label: "Healthy", color: IP.lime, program: "strength", advice: "Great base. Get stronger and keep it that way with coached strength work." },
  { max: 30, label: "Overweight", color: "#FFB13D", program: "hiit", advice: "Conditioning plus strength is the fastest way to drop fat and keep muscle." },
  { max: 60, label: "Obese range", color: IP.red, program: "boxing", advice: "Start with low-impact, fun sessions. Our coaches will build you up safely." },
] as const;

const SCALE_MIN = 15;
const SCALE_MAX = 35;

function Slider({ label, value, min, max, unit, onChange }: { label: string; value: number; min: number; max: number; unit: string; onChange: (v: number) => void }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <label className="block">
      <span className="flex items-baseline justify-between">
        <span className={`${LABEL} text-white/50`}>{label}</span>
        <span className={`${D} text-[40px] leading-none`}>
          {value}
          <span className="ml-1 font-sans text-[14px] font-bold normal-case text-white/50">{unit}</span>
        </span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-4 h-2 w-full cursor-pointer appearance-none [&::-moz-range-thumb]:size-6 [&::-moz-range-thumb]:rounded-none [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-[#E5FF3D] [&::-webkit-slider-thumb]:size-6 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-[#E5FF3D] [&::-webkit-slider-thumb]:shadow-[0_0_0_6px_rgba(229,255,61,0.2)]"
        style={{ background: `linear-gradient(to right, ${IP.lime} ${pct}%, rgba(255,255,255,0.12) ${pct}%)` }}
      />
    </label>
  );
}

function Bmi() {
  const [h, setH] = useState(172);
  const [w, setW] = useState(78);
  const { trial } = useActions();
  const bmi = w / (h / 100) ** 2;
  const band = BANDS.find((b) => bmi < b.max) ?? BANDS[3];
  const prog = PROGRAMS.find((p) => p.id === band.program)!;
  const marker = Math.min(100, Math.max(0, ((bmi - SCALE_MIN) / (SCALE_MAX - SCALE_MIN)) * 100));
  const lo = Math.round(18.5 * (h / 100) ** 2);
  const hi = Math.round(24.9 * (h / 100) ** 2);

  return (
    <section className="px-5 py-14 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-[1440px]">
        <Up>
          <Kicker>Free tool · 10 seconds</Kicker>
          <h2 className={`${D} mt-4 text-[clamp(2.8rem,6vw,5.4rem)] leading-[0.9]`}>
            <Slam lines={["Where do", <span key="b" style={{ color: IP.lime }}>you stand?</span>]} />
          </h2>
        </Up>

        <Feature id="bmi" label="BMI calculator that suggests a program" className="mt-10">
          <div className="grid border lg:grid-cols-2" style={{ borderColor: IP.line }}>
            <div className="flex flex-col gap-10 p-6 sm:p-10" style={{ background: IP.panel }}>
              <Slider label="Height" value={h} min={140} max={205} unit="cm" onChange={setH} />
              <Slider label="Weight" value={w} min={40} max={150} unit="kg" onChange={setW} />
              <p className="text-[14px] text-white/50">
                A healthy weight for {h} cm is roughly{" "}
                <b className="text-white">
                  {lo} – {hi} kg
                </b>
                . BMI is a starting point, not a verdict. Our coaches also check body fat and strength.
              </p>
            </div>

            <div className="flex flex-col p-6 sm:p-10">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className={`${LABEL} text-white/50`}>Your BMI</p>
                  <p className={`${D} mt-2 text-[96px] leading-[0.85] sm:text-[120px]`} style={{ color: band.color }}>
                    {bmi.toFixed(1)}
                  </p>
                </div>
                <AnimatePresence mode="wait">
                  <motion.span key={band.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className={`${LABEL} mb-3 px-3 py-1.5 text-black`} style={{ background: band.color }}>
                    {band.label}
                  </motion.span>
                </AnimatePresence>
              </div>

              {/* Scale */}
              <div className="relative mt-8">
                <div className="flex h-3 overflow-hidden">
                  {[
                    [18.5 - SCALE_MIN, BANDS[0].color],
                    [25 - 18.5, BANDS[1].color],
                    [30 - 25, BANDS[2].color],
                    [SCALE_MAX - 30, BANDS[3].color],
                  ].map(([span, c], i) => (
                    <span key={i} style={{ flex: span as number, background: c as string, opacity: 0.85 }} />
                  ))}
                </div>
                <motion.span className="absolute -top-2 h-7 w-1 bg-white shadow-[0_0_0_3px_#0A0A0A]" animate={{ left: `${marker}%` }} transition={{ type: "spring", stiffness: 300, damping: 30 }} />
                <div className="mt-2 flex justify-between text-[11px] font-semibold text-white/40">
                  <span>15</span>
                  <span>18.5</span>
                  <span>25</span>
                  <span>30</span>
                  <span>35+</span>
                </div>
              </div>

              <div className="mt-8 border-t pt-6" style={{ borderColor: IP.line }}>
                <p className={`${LABEL} text-white/50`}>Recommended for you</p>
                <AnimatePresence mode="wait">
                  <motion.div key={prog.id} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.35, ease: EASE }}>
                    <p className={`${D} mt-2 text-[44px] leading-none`} style={{ color: IP.lime }}>
                      {prog.name}
                    </p>
                    <p className="mt-3 max-w-[28rem] text-[15px] leading-relaxed text-white/70">{band.advice}</p>
                  </motion.div>
                </AnimatePresence>
                <button type="button" onClick={trial} className="mt-6 h-12 bg-white/[0.08] px-6 text-[12px] font-extrabold uppercase tracking-[0.14em] transition-colors hover:bg-[#E5FF3D] hover:text-black">
                  Try {prog.name} free →
                </button>
              </div>
            </div>
          </div>
        </Feature>
      </div>
    </section>
  );
}

/* ───────────────────────── Plans + compare ───────────────────────── */

function Cell({ v, pop }: { v: boolean | string; pop?: boolean }) {
  if (v === true)
    return (
      <span className="grid size-6 place-items-center text-[13px] font-black text-black" style={{ background: IP.lime }}>
        ✓
      </span>
    );
  if (v === false) return <span className="text-white/25">—</span>;
  return <span className={`text-[11px] font-semibold leading-tight sm:text-[13px] ${pop ? "text-white" : "text-white/70"}`}>{v}</span>;
}

function PlanCards() {
  const [yearly, setYearly] = useState(false);
  const { join } = useActions();

  return (
    <section className="px-5 pb-14 sm:px-8 sm:pb-20">
      <div className="mx-auto max-w-[1440px]">
        <Up className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <Kicker>Plans</Kicker>
            <h2 className={`${D} mt-4 text-[clamp(2.8rem,6vw,5.4rem)] leading-[0.9]`}>
              <Slam lines={["Choose your", <span key="b" style={{ color: IP.lime }}>level.</span>]} />
            </h2>
          </div>
          <div role="tablist" aria-label="Billing" className="relative grid w-fit grid-cols-2 border p-1" style={{ borderColor: IP.line }}>
            {[
              [false, "Monthly"],
              [true, "Yearly · 3 months free"],
            ].map(([v, l]) => {
              const on = yearly === v;
              return (
                <button key={l as string} role="tab" type="button" aria-selected={on} onClick={() => setYearly(v as boolean)} className={`relative h-11 px-4 text-[12px] font-extrabold uppercase tracking-[0.1em] sm:px-5 ${on ? "text-black" : "text-white/60"}`}>
                  {on && <motion.span layoutId="ip-bill" className="absolute inset-0" style={{ background: IP.lime }} transition={{ type: "spring", stiffness: 420, damping: 36 }} />}
                  <span className="relative">{l}</span>
                </button>
              );
            })}
          </div>
        </Up>

        <Feature id="compare" label="Plans + comparison table" className="mt-10">
          {/* Cards */}
          <div className="grid gap-px border md:grid-cols-3" style={{ background: IP.line, borderColor: IP.line }}>
            {PLANS.map((p, i) => {
              const pop = "popular" in p && p.popular;
              const monthly = yearly ? Math.round((p.price * 9) / 12) : p.price;
              return (
                <Up key={p.id} delay={i * 0.06}>
                  <div className={`relative flex h-full flex-col p-7 sm:p-9 ${pop ? "text-black" : ""}`} style={{ background: pop ? IP.lime : IP.bg }}>
                    {pop && <span className={`${LABEL} absolute right-5 top-5 bg-black px-2.5 py-1 text-[#E5FF3D]`}>Most popular</span>}
                    <p className={`${LABEL} ${pop ? "text-black/60" : "text-white/45"}`}>{p.tagline}</p>
                    <h3 className={`${D} mt-2 text-[44px] leading-none`}>{p.name}</h3>
                    <p className={`${D} mt-8 flex items-baseline gap-2 text-[64px] leading-none`}>
                      <AnimatePresence mode="popLayout" initial={false}>
                        <motion.span key={monthly} initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -30, opacity: 0 }} transition={{ duration: 0.35, ease: EASE }}>
                          {inr(monthly)}
                        </motion.span>
                      </AnimatePresence>
                      <span className={`font-sans text-[15px] font-bold normal-case ${pop ? "text-black/60" : "text-white/50"}`}>/month</span>
                    </p>
                    <p className={`mt-2 h-5 text-[13px] font-semibold ${pop ? "text-black/70" : "text-white/55"}`}>{yearly ? `${inr(p.price * 9)} billed yearly · save ${inr(p.price * 3)}` : "Billed monthly · cancel anytime"}</p>
                    <button
                      type="button"
                      onClick={() => join(p.name, monthly)}
                      className={`mt-8 h-14 text-[13px] font-extrabold uppercase tracking-[0.14em] transition-transform hover:-translate-y-0.5 ${pop ? "bg-black text-[#E5FF3D]" : "bg-white/[0.08] text-white hover:bg-[#E5FF3D] hover:text-black"}`}
                    >
                      {p.cta} →
                    </button>
                  </div>
                </Up>
              );
            })}
          </div>

          {/* Compare table */}
          <Up className="mt-px">
            <div className="border border-t-0" style={{ borderColor: IP.line }}>
              <table className="w-full table-fixed text-left">
                <thead>
                  <tr className="border-b" style={{ borderColor: IP.line }}>
                    <th className={`${LABEL} w-[37%] p-3 text-[10px] text-white/45 sm:w-auto sm:p-4 sm:px-9 sm:text-[12px]`}>What you get</th>
                    {PLANS.map((p) => (
                      <th key={p.id} className={`${LABEL} w-[21%] p-2 text-center text-[10px] sm:p-4 sm:text-[12px]`} style={{ color: "popular" in p ? IP.lime : undefined }}>
                        {p.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {COMPARE.map((row) => (
                    <tr key={row.label} className="border-b last:border-0" style={{ borderColor: IP.line }}>
                      <td className="p-3 text-[12px] leading-snug text-white/80 sm:p-4 sm:px-9 sm:text-[14px]">{row.label}</td>
                      {row.v.map((v, i) => (
                        <td key={i} className="p-2 text-center sm:p-4" style={{ background: i === 1 ? "rgba(229,255,61,0.04)" : undefined }}>
                          <span className="inline-flex justify-center">
                            <Cell v={v} pop={i === 1} />
                          </span>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Up>
        </Feature>
      </div>
    </section>
  );
}

/* ───────────────────────── FAQ ───────────────────────── */

function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section className="px-5 pb-14 sm:px-8 sm:pb-20">
      <div className="mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <Up>
          <Kicker>FAQ</Kicker>
          <h2 className={`${D} mt-4 text-[clamp(2.8rem,6vw,5.4rem)] leading-[0.9]`}>
            <Slam lines={["Still", <span key="b" style={{ color: IP.lime }}>thinking?</span>]} />
          </h2>
        </Up>
        <Up delay={0.1} className="border-t border-white/10">
          <div>
            {FAQ.map((f, i) => {
              const on = i === open;
              return (
                <div key={f.q} className="border-b border-white/10">
                  <button type="button" aria-expanded={on} onClick={() => setOpen(on ? -1 : i)} className="flex w-full items-center justify-between gap-4 py-6 text-left text-[17px] font-bold sm:text-[19px]">
                    {f.q}
                    <span className={`grid size-10 shrink-0 place-items-center text-[22px] transition-colors ${on ? "bg-[#E5FF3D] text-black" : "bg-white/5"}`}>
                      <span className={`transition-transform duration-300 ${on ? "rotate-45" : ""}`}>+</span>
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {on && (
                      <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: EASE }} className="overflow-hidden pr-14 text-[16px] leading-relaxed text-white/65">
                        <span className="block pb-6">{f.a}</span>
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </Up>
      </div>
    </section>
  );
}
