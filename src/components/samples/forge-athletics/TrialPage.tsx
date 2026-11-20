"use client";

import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { useDemo } from "../shared/DemoProvider";
import { Feature } from "../shared/Feature";
import { fmtTime, useIndiaNow } from "../shared/indiaTime";
import { COACHES, FG, QUIZ, SUNDAY_SLOTS, TRIAL_SLOTS, isFull } from "./data";
import { Asterisk, Btn, D, EASE, Lines, MONO, OpenBadge, useTodayISO } from "./shared";

const STEPS = ["Goal", "Level", "Time", "Details", "Confirm"];
const GOALS = QUIZ[0].options;
const LEVELS = QUIZ[1].options;
const fmtDate = (d: Date) => d.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" });

export function ForgeTrial() {
  return (
    <main className="px-5 pb-20 pt-32 sm:px-8 sm:pb-28 sm:pt-40">
      <div className="mx-auto max-w-[1480px]">
        <div className="flex items-center justify-between">
          <p className={MONO} style={{ color: FG.heat }}>
            (06) Free trial
          </p>
          <OpenBadge />
        </div>
        <h1 className={`${D} mt-6 text-[clamp(2.2rem,9vw,9.5rem)] leading-[0.88] tracking-[-0.05em]`}>
          <Lines now delay={0.25} lines={["Book your", <span key="b" style={{ color: FG.heat }}>free trial.</span>]} />
        </h1>
        <Booking />
      </div>
    </main>
  );
}

function Booking() {
  const { explain } = useDemo();
  const todayISO = useTodayISO();
  const now = useIndiaNow();
  const [step, setStep] = useState(0);
  const [goal, setGoal] = useState<number | null>(null);
  const [level, setLevel] = useState<number | null>(null);
  const [dayIdx, setDayIdx] = useState(0);
  const [slot, setSlot] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [coach, setCoach] = useState("No preference");
  const [booked, setBooked] = useState(false);

  const days = useMemo(() => {
    if (!todayISO) return [];
    const base = new Date(`${todayISO}T12:00:00`);
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(base);
      d.setDate(base.getDate() + i);
      return d;
    });
  }, [todayISO]);

  const day = days[dayIdx];
  const slots = day ? (day.getDay() === 0 ? SUNDAY_SLOTS : TRIAL_SLOTS) : [];
  const slotState = (s: number) => {
    if (!day) return "open";
    if (dayIdx === 0 && now && s <= now.minutes + 60) return "past";
    if (isFull(day.getDate(), s)) return "full";
    return "open";
  };

  const phoneOk = phone.replace(/\D/g, "").length === 10;
  const canNext = [goal !== null, level !== null, slot !== null, name.trim().length >= 2 && phoneOk, true][step];
  const code = day && slot !== null ? `FRG-${String(day.getDate()).padStart(2, "0")}${String(day.getMonth() + 1).padStart(2, "0")}-${String(slot).padStart(4, "0")}` : "";

  const confirm = () => {
    if (!day || slot === null || goal === null) return;
    explain({
      title: "Trial bookings arrive on your WhatsApp",
      body: "On your real website, the full booking (goal, level, day, time and coach) is sent to your WhatsApp. You confirm with one reply and they get their trial pass.",
      message: `Hi FORGE! ✱\nI've booked a FREE trial.\nName: ${name.trim()}\nGoal: ${GOALS[goal].label}\nLevel: ${level !== null ? LEVELS[level].label : "-"}\nWhen: ${fmtDate(day)}, ${fmtTime(slot)}\nCoach: ${coach}\nBooking: ${code}`,
    });
    setBooked(true);
  };

  const reset = () => {
    setStep(0);
    setGoal(null);
    setLevel(null);
    setSlot(null);
    setDayIdx(0);
    setBooked(false);
  };

  return (
    <Feature id="booking" label="Multi-step free-trial booking" className="mt-12">
      <div className="grid gap-px border lg:grid-cols-[1.25fr_0.75fr]" style={{ background: FG.line, borderColor: FG.line }}>
        {/* Steps */}
        <div className="min-h-[560px] p-5 sm:p-10" style={{ background: FG.bg }}>
          {!booked ? (
            <>
              <ol className="grid grid-cols-5 gap-2">
                {STEPS.map((s, i) => (
                  <li key={s}>
                    <span className="block h-1 overflow-hidden" style={{ background: FG.line }}>
                      <motion.span className="block h-full" style={{ background: FG.heat }} animate={{ width: i <= step ? "100%" : "0%" }} transition={{ duration: 0.5, ease: EASE }} />
                    </span>
                    <span className={`${MONO} mt-2 block truncate text-[10px] sm:text-[11px]`} style={{ color: i === step ? FG.bone : FG.mute }}>
                      0{i + 1} <span className="hidden sm:inline">{s}</span>
                    </span>
                  </li>
                ))}
              </ol>

              <AnimatePresence mode="wait">
                <motion.div key={step} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.4, ease: EASE }} className="mt-10">
                  {step === 0 && (
                    <Choice title="What do you want from training?" options={GOALS} value={goal} onPick={(i) => (setGoal(i), setStep(1))} />
                  )}
                  {step === 1 && (
                    <Choice title="Where are you starting from?" options={LEVELS} value={level} onPick={(i) => (setLevel(i), setStep(2))} />
                  )}
                  {step === 2 && (
                    <div>
                      <h2 className={`${D} text-[clamp(1.8rem,3.4vw,3rem)] leading-[0.95] tracking-[-0.035em]`}>Pick a day & time.</h2>
                      <div className="-mx-5 mt-7 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-7 sm:px-0">
                        {days.map((d, i) => {
                          const on = i === dayIdx;
                          return (
                            <button
                              key={d.toISOString()}
                              type="button"
                              onClick={() => (setDayIdx(i), setSlot(null))}
                              className={`flex min-w-[76px] shrink-0 flex-col items-center gap-1 border py-3 transition-colors ${on ? "border-[#FF4D2E] bg-[#FF4D2E] text-black" : "border-[#EDEAE4]/15 hover:border-[#EDEAE4]/50"}`}
                            >
                              <span className={`${MONO} text-[10px]`}>{i === 0 ? "Today" : d.toLocaleDateString("en-IN", { weekday: "short" })}</span>
                              <span className={`${D} text-[28px] leading-none`}>{d.getDate()}</span>
                              <span className={`${MONO} text-[10px] opacity-70`}>{d.toLocaleDateString("en-IN", { month: "short" })}</span>
                            </button>
                          );
                        })}
                        {!days.length && <span className={MONO}>Loading dates…</span>}
                      </div>
                      <p className={`${MONO} mt-8`} style={{ color: FG.mute }}>
                        {day ? fmtDate(day) : ""} · 60-minute session
                      </p>
                      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
                        {slots.map((s) => {
                          const st = slotState(s);
                          const on = s === slot;
                          return (
                            <button
                              key={s}
                              type="button"
                              disabled={st !== "open"}
                              onClick={() => setSlot(s)}
                              className={`flex h-16 items-center justify-between border px-4 transition-colors disabled:cursor-not-allowed ${on ? "border-[#EDEAE4] bg-[#EDEAE4] text-black" : st === "open" ? "border-[#EDEAE4]/15 hover:border-[#EDEAE4]/60" : "border-[#EDEAE4]/8 text-[#EDEAE4]/30"}`}
                            >
                              <span className={`${D} text-[20px] tracking-[-0.02em] ${st === "full" ? "line-through" : ""}`}>{fmtTime(s)}</span>
                              <span className={`${MONO} text-[10px]`} style={{ color: on ? "#0B0B0B" : st === "open" ? FG.heat : undefined }}>
                                {st === "open" ? (on ? "Selected" : "Open") : st === "full" ? "Full" : "Passed"}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                  {step === 3 && (
                    <div>
                      <h2 className={`${D} text-[clamp(1.8rem,3.4vw,3rem)] leading-[0.95] tracking-[-0.035em]`}>Who&apos;s training?</h2>
                      <div className="mt-8 grid gap-6 sm:grid-cols-2">
                        <Field label="Your name">
                          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Aditi Sharma" autoComplete="name" className="h-14 w-full border-b bg-transparent text-[20px] outline-none placeholder:text-[#EDEAE4]/25 focus:border-[#FF4D2E]" style={{ borderColor: FG.line }} />
                        </Field>
                        <Field label="WhatsApp number">
                          <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="98765 43210" inputMode="tel" autoComplete="tel" className="h-14 w-full border-b bg-transparent text-[20px] outline-none placeholder:text-[#EDEAE4]/25 focus:border-[#FF4D2E]" style={{ borderColor: FG.line }} />
                        </Field>
                      </div>
                      <Field label="Coach preference" className="mt-8">
                        <div className="mt-3 flex flex-wrap gap-2">
                          {["No preference", ...COACHES.map((c) => c.name)].map((c) => (
                            <button key={c} type="button" onClick={() => setCoach(c)} className={`h-11 rounded-full border px-4 text-[14px] transition-colors ${coach === c ? "border-[#FF4D2E] bg-[#FF4D2E] text-black" : "border-[#EDEAE4]/15 hover:border-[#EDEAE4]/50"}`}>
                              {c}
                            </button>
                          ))}
                        </div>
                      </Field>
                      {phone && !phoneOk && <p className="mt-4 text-[13px]" style={{ color: FG.heat }}>Please enter a 10-digit mobile number.</p>}
                    </div>
                  )}
                  {step === 4 && day && slot !== null && goal !== null && level !== null && (
                    <div>
                      <h2 className={`${D} text-[clamp(1.8rem,3.4vw,3rem)] leading-[0.95] tracking-[-0.035em]`}>Looks good, {name.trim().split(" ")[0]}?</h2>
                      <dl className="mt-8 grid gap-px border sm:grid-cols-2" style={{ background: FG.line, borderColor: FG.line }}>
                        {[
                          ["Goal", GOALS[goal].label],
                          ["Level", LEVELS[level].label],
                          ["When", `${fmtDate(day)} · ${fmtTime(slot)}`],
                          ["Coach", coach],
                          ["Name", name.trim()],
                          ["WhatsApp", phone],
                        ].map(([k, v]) => (
                          <div key={k} className="p-4" style={{ background: FG.bg }}>
                            <dt className={MONO} style={{ color: FG.mute }}>
                              {k}
                            </dt>
                            <dd className="mt-1 text-[16px] font-medium">{v}</dd>
                          </div>
                        ))}
                      </dl>
                      <div className="mt-8">
                        <Btn onClick={confirm} cursor="Book" className="w-full sm:w-auto">
                          Confirm on WhatsApp →
                        </Btn>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              <div className="mt-10 flex items-center justify-between border-t pt-6" style={{ borderColor: FG.line }}>
                <button type="button" disabled={step === 0} onClick={() => setStep((s) => s - 1)} className={`${MONO} disabled:opacity-0`} style={{ color: FG.mute }}>
                  ← Back
                </button>
                {step >= 2 && step < 4 && (
                  <Btn onClick={() => setStep((s) => s + 1)} disabled={!canNext} variant="bone" className="h-12!">
                    Continue →
                  </Btn>
                )}
              </div>
            </>
          ) : (
            day && slot !== null && <Pass name={name.trim()} when={`${fmtDate(day)} · ${fmtTime(slot)}`} coach={coach} code={code} onReset={reset} />
          )}
        </div>

        {/* Summary / what to expect */}
        <aside className="p-5 sm:p-10" style={{ background: FG.panel }}>
          <p className={MONO} style={{ color: FG.heat }}>
            What&apos;s included
          </p>
          <ul className="mt-6 flex flex-col">
            {[
              ["60 min", "Coached session in a small group"],
              ["InBody", "Body-composition scan"],
              ["Plan", "Goal chat + program recommendation"],
              ["₹0", "No card, no contract, no pressure"],
            ].map(([k, v]) => (
              <li key={k} className="flex items-baseline gap-4 border-b py-4" style={{ borderColor: FG.line }}>
                <span className={`${D} w-[96px] shrink-0 text-[17px] tracking-[-0.02em]`} style={{ color: FG.heat }}>
                  {k}
                </span>
                <span className="text-[15px]">{v}</span>
              </li>
            ))}
          </ul>
          <p className={`${MONO} mt-10`} style={{ color: FG.mute }}>
            Bring
          </p>
          <p className="mt-3 text-[15px] leading-relaxed" style={{ color: FG.mute }}>
            Training clothes, indoor shoes and water. Towels, lockers and showers are on us. Arrive 10 minutes early.
          </p>
          <div className="mt-10 flex items-center gap-3 border p-4" style={{ borderColor: FG.line }}>
            <Asterisk className="size-6 shrink-0 text-[#FF4D2E]" />
            <p className="text-[14px] leading-snug">
              <b>48 trials</b> booked this month. Evening slots fill first.
            </p>
          </div>
        </aside>
      </div>
    </Feature>
  );
}

function Field({ label, children, className = "" }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <label className={`block ${className}`}>
      <span className={MONO} style={{ color: FG.mute }}>
        {label}
      </span>
      {children}
    </label>
  );
}

function Choice({ title, options, value, onPick }: { title: string; options: readonly { label: string; hint: string }[]; value: number | null; onPick: (i: number) => void }) {
  return (
    <div>
      <h2 className={`${D} text-[clamp(1.8rem,3.4vw,3rem)] leading-[0.95] tracking-[-0.035em]`}>{title}</h2>
      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {options.map((o, i) => {
          const on = i === value;
          return (
            <button
              key={o.label}
              type="button"
              data-cursor="Pick"
              onClick={() => onPick(i)}
              className={`group flex items-center justify-between gap-4 border p-5 text-left transition-colors duration-300 ${on ? "border-[#FF4D2E] bg-[#FF4D2E] text-black" : "border-[#EDEAE4]/15 hover:border-[#EDEAE4] hover:bg-[#EDEAE4] hover:text-black"}`}
            >
              <span>
                <span className={`${D} block text-[22px] tracking-[-0.02em]`}>{o.label}</span>
                <span className="mt-1 block text-[14px] opacity-60">{o.hint}</span>
              </span>
              <span className="text-[20px] transition-transform group-hover:translate-x-1">→</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ───────────────────────── Trial pass ───────────────────────── */

function Pass({ name, when, coach, code, onReset }: { name: string; when: string; coach: string; code: string; onReset: () => void }) {
  const bars = Array.from(code.replace(/\D/g, "") + "73915", (c, i) => 1 + ((Number(c) + i) % 4));
  return (
    <Feature id="trial-pass" label="Digital trial pass">
      <motion.div initial={{ opacity: 0, y: 40, rotate: -2 }} animate={{ opacity: 1, y: 0, rotate: 0 }} transition={{ duration: 0.8, ease: EASE }}>
        <p className={MONO} style={{ color: FG.heat }}>
          ✓ Request sent · we&apos;ll confirm on WhatsApp
        </p>
        <div className="relative mx-auto mt-8 max-w-[520px] overflow-hidden text-black" style={{ background: FG.bone }}>
          <div className="flex items-center justify-between p-6" style={{ background: FG.heat }}>
            <span className={`${D} flex items-center gap-2 text-[24px] tracking-[-0.02em]`}>
              <Asterisk className="size-5" /> Forge
            </span>
            <span className={MONO}>Trial pass</span>
          </div>
          <div className="grid grid-cols-2 gap-5 p-6">
            {[
              ["Athlete", name],
              ["Coach", coach],
              ["When", when],
              ["Booking", code],
            ].map(([k, v]) => (
              <div key={k} className={k === "When" ? "col-span-2" : ""}>
                <p className={`${MONO} text-black/50`}>{k}</p>
                <p className={`${D} mt-1 text-[20px] leading-tight tracking-[-0.02em]`}>{v}</p>
              </div>
            ))}
          </div>
          {/* Perforation */}
          <div className="relative flex items-center">
            <span className="absolute -left-3 size-6 rounded-full" style={{ background: FG.bg }} />
            <span className="mx-5 flex-1 border-t-2 border-dashed border-black/20" />
            <span className="absolute -right-3 size-6 rounded-full" style={{ background: FG.bg }} />
          </div>
          <div className="flex items-end justify-between gap-6 p-6">
            <div className="flex h-14 items-stretch gap-[3px]" aria-hidden>
              {bars.map((w, i) => (
                <span key={i} className="bg-black" style={{ width: w * 2 }} />
              ))}
            </div>
            <p className={`${MONO} text-right text-black/55`}>
              New Palasia
              <br />
              Arrive 10 min early
            </p>
          </div>
        </div>
        <div className="mt-8 flex justify-center">
          <button type="button" onClick={onReset} className={`${MONO} underline-offset-4 hover:underline`} style={{ color: FG.mute }}>
            Book another trial ↺
          </button>
        </div>
      </motion.div>
    </Feature>
  );
}
