"use client";

import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState, useSyncExternalStore } from "react";
import { Feature } from "../shared/Feature";
import { BUDGETS, EMAIL, KR, PROJECT_TYPES } from "./data";
import { PageHead } from "./ProjectsPage";
import { Btn, Comment, EASE, MONO, Up, useActions } from "./shared";

function useTodayISO() {
  return useSyncExternalStore(
    () => () => {},
    () => new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata" }).format(new Date()),
    () => null,
  );
}

const TIMES = ["11:00 am", "3:00 pm", "6:30 pm"];

export function KabirContact() {
  return (
    <main>
      <PageHead cmd="./contact --now" title="Let's build" accent="something." sub="Freelance project, full-time role or a quick question? Send a message or grab a 15-minute slot. I reply within 24 hours." />
      <section className="px-5 pb-20 sm:px-8 sm:pb-28">
        <div className="mx-auto grid max-w-[1240px] gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <Form />
          <div className="flex flex-col gap-6">
            <Booking />
            <Direct />
          </div>
        </div>
      </section>
    </main>
  );
}

function Form() {
  const { hire } = useActions();
  const [name, setName] = useState("");
  const [type, setType] = useState(PROJECT_TYPES[1]);
  const [budget, setBudget] = useState(BUDGETS[1]);
  const [msg, setMsg] = useState("");
  const field = "w-full rounded-lg border bg-white/[0.03] px-4 py-3 text-[15px] outline-none transition-colors placeholder:text-white/25 focus:border-[#3FB950]";
  const chip = (on: boolean) => `${MONO} h-9 rounded-md border px-3 text-[12px] transition-colors ${on ? "border-[#3FB950] bg-[#3FB950]/10 text-[#3FB950]" : "border-[#E6EDF3]/10 text-[#8B949E] hover:text-[#E6EDF3]"}`;

  return (
    <Up>
      <Feature id="contact-form" label="Contact form that sends to WhatsApp">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            hire(`Hi Kabir! 👋\nI'm ${name.trim() || "Ananya"}.\nLooking for: ${type}\nBudget: ${budget}\n${msg.trim() || "Would love to discuss a project with you."}`);
          }}
          className="rounded-xl border p-6 sm:p-8"
          style={{ borderColor: KR.line, background: KR.panel }}
        >
          <Comment>new message</Comment>
          <div className="mt-6 grid gap-5">
            <label className="block">
              <span className={`${MONO} text-[12px]`} style={{ color: KR.mute }}>
                name
              </span>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ananya Gupta" className={`${field} mt-2`} style={{ borderColor: KR.line }} />
            </label>
            <div>
              <span className={`${MONO} text-[12px]`} style={{ color: KR.mute }}>
                looking for
              </span>
              <div className="mt-2 flex flex-wrap gap-2">
                {PROJECT_TYPES.map((t) => (
                  <button key={t} type="button" onClick={() => setType(t)} className={chip(t === type)}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <span className={`${MONO} text-[12px]`} style={{ color: KR.mute }}>
                budget
              </span>
              <div className="mt-2 flex flex-wrap gap-2">
                {BUDGETS.map((b) => (
                  <button key={b} type="button" onClick={() => setBudget(b)} className={chip(b === budget)}>
                    {b}
                  </button>
                ))}
              </div>
            </div>
            <label className="block">
              <span className={`${MONO} text-[12px]`} style={{ color: KR.mute }}>
                message
              </span>
              <textarea value={msg} onChange={(e) => setMsg(e.target.value)} rows={4} placeholder="Tell me about your idea, timeline and anything else…" className={`${field} mt-2 resize-none`} style={{ borderColor: KR.line }} />
            </label>
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <span className={`${MONO} text-[12px]`} style={{ color: KR.mute }}>
              ⏎ arrives on WhatsApp instantly
            </span>
            <Btn className="w-full sm:w-auto">
              <span className={MONO}>send()</span> →
            </Btn>
          </div>
        </form>
      </Feature>
    </Up>
  );
}

function Booking() {
  const { hire } = useActions();
  const todayISO = useTodayISO();
  const [day, setDay] = useState(0);
  const [time, setTime] = useState<string | null>(null);
  const days = useMemo(() => {
    if (!todayISO) return [];
    const base = new Date(`${todayISO}T12:00:00`);
    const out: Date[] = [];
    for (let i = 1; out.length < 5; i++) {
      const d = new Date(base);
      d.setDate(base.getDate() + i);
      if (d.getDay() !== 0 && d.getDay() !== 6) out.push(d);
    }
    return out;
  }, [todayISO]);
  const d = days[day];
  const booked = (t: string) => d && (d.getDate() + t.length) % 4 === 0;

  return (
    <Up delay={0.1}>
      <Feature id="booking" label="Book a 15-min call">
        <div className="rounded-xl border p-6 sm:p-7" style={{ borderColor: KR.line, background: KR.panel }}>
          <Comment>book a 15-min call</Comment>
          <div className="mt-5 grid grid-cols-5 gap-1.5">
            {days.map((dd, i) => (
              <button key={dd.toISOString()} type="button" onClick={() => (setDay(i), setTime(null))} className={`flex flex-col items-center rounded-lg border py-2.5 transition-colors ${i === day ? "border-[#3FB950] bg-[#3FB950]/10" : "border-[#E6EDF3]/10 hover:border-[#E6EDF3]/30"}`}>
                <span className={`${MONO} text-[10px]`} style={{ color: KR.mute }}>
                  {dd.toLocaleDateString("en-IN", { weekday: "short" })}
                </span>
                <span className="text-[20px] font-semibold" style={{ color: i === day ? KR.green : undefined }}>
                  {dd.getDate()}
                </span>
              </button>
            ))}
            {!days.length && <span className={`${MONO} col-span-5 text-[12px]`}>loading…</span>}
          </div>
          <div className="mt-3 grid grid-cols-3 gap-1.5">
            {TIMES.map((t) => {
              const off = booked(t);
              return (
                <button key={t} type="button" disabled={!!off} onClick={() => setTime(t)} className={`${MONO} h-10 rounded-lg border text-[12px] transition-colors disabled:cursor-not-allowed disabled:line-through disabled:opacity-35 ${time === t ? "border-[#3FB950] bg-[#3FB950] text-[#0B0F14]" : "border-[#E6EDF3]/10 hover:border-[#E6EDF3]/30"}`}>
                  {t}
                </button>
              );
            })}
          </div>
          <AnimatePresence initial={false}>
            {time && d && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: EASE }} className="overflow-hidden">
                <button
                  type="button"
                  onClick={() => hire(`Hi Kabir! 📅\nCan we do a 15-min call on ${d.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" })} at ${time}?`)}
                  className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#3FB950] text-[14px] font-medium text-[#0B0F14]"
                >
                  Confirm {d.toLocaleDateString("en-IN", { day: "numeric", month: "short" })} · {time} →
                </button>
              </motion.div>
            )}
          </AnimatePresence>
          <p className={`${MONO} mt-4 text-[11px]`} style={{ color: KR.mute }}>
            All times IST · Google Meet link sent on confirmation
          </p>
        </div>
      </Feature>
    </Up>
  );
}

function Direct() {
  const { copyEmail, external } = useActions();
  const [copied, setCopied] = useState(false);
  return (
    <Up delay={0.15}>
      <div className="rounded-xl border p-6 sm:p-7" style={{ borderColor: KR.line, background: KR.panel }}>
        <Comment>or reach me directly</Comment>
        <button
          type="button"
          onClick={() => {
            copyEmail();
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
          }}
          className={`${MONO} mt-4 flex w-full items-center justify-between rounded-lg border px-4 py-3 text-[14px] transition-colors hover:border-[#3FB950]/60`}
          style={{ borderColor: KR.line }}
        >
          {EMAIL}
          <span style={{ color: KR.green }}>{copied ? "copied ✓" : "copy"}</span>
        </button>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {["GitHub", "LinkedIn", "X"].map((s) => (
            <button key={s} type="button" onClick={() => external(s)} className={`${MONO} h-10 rounded-lg border text-[12px] transition-colors hover:text-[#3FB950]`} style={{ borderColor: KR.line, color: KR.mute }}>
              {s} ↗
            </button>
          ))}
        </div>
      </div>
    </Up>
  );
}
