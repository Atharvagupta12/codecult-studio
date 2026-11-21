"use client";

import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState, useSyncExternalStore } from "react";
import { Feature } from "../shared/Feature";
import { EVENTS, IMG, MB, dayState } from "./data";
import { PageHead } from "./Shell";
import { Btn, EASE, LABEL, Petals, SERIF, useActions } from "./shared";

function useTodayISO() {
  return useSyncExternalStore(
    () => () => {},
    () => new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata" }).format(new Date()),
    () => null,
  );
}

const WEEK = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function MehrBook() {
  return (
    <main>
      <PageHead kicker="Check my dates" title="Is your date" italic="still open?" sub="Pick your wedding date to see my availability instantly. If it's open, I'll hold it for you for 48 hours." img={IMG.hero} />
      <section className="px-3 pb-24 sm:px-10 sm:pb-32">
        <div className="mx-auto max-w-[1300px]">
          <DateCheck />
        </div>
      </section>
    </main>
  );
}

function DateCheck() {
  const { send } = useActions();
  const todayISO = useTodayISO();
  const today = useMemo(() => (todayISO ? new Date(`${todayISO}T12:00:00`) : null), [todayISO]);
  const [offset, setOffset] = useState(1);
  const [picked, setPicked] = useState<Date | null>(null);
  const [events, setEvents] = useState<string[]>(["Wedding"]);
  const [name, setName] = useState("");
  const [venue, setVenue] = useState("");
  const [sent, setSent] = useState(false);

  const month = useMemo(() => {
    if (!today) return null;
    const first = new Date(today.getFullYear(), today.getMonth() + offset, 1, 12);
    return { first, daysIn: new Date(first.getFullYear(), first.getMonth() + 1, 0).getDate(), lead: (first.getDay() + 6) % 7 };
  }, [today, offset]);

  const fmt = (d: Date) => d.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  const state = picked ? dayState(picked.getFullYear(), picked.getMonth(), picked.getDate()) : null;

  return (
    <Feature id="date-check" label="Live date-check booking">
      <div className="grid overflow-hidden rounded-[28px] border lg:grid-cols-[1.1fr_0.9fr]" style={{ borderColor: MB.line }}>
        <div className="p-5 sm:p-10" style={{ background: MB.panel }}>
          <div className="flex items-center justify-between">
            <button type="button" disabled={offset <= 0} onClick={() => setOffset((o) => o - 1)} className="grid size-11 place-items-center rounded-full border disabled:opacity-25" style={{ borderColor: MB.line }} aria-label="Previous month">
              ←
            </button>
            <AnimatePresence mode="wait">
              <motion.p key={offset} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }} className={`${SERIF} text-[30px] italic`}>
                {month ? month.first.toLocaleDateString("en-IN", { month: "long", year: "numeric" }) : "…"}
              </motion.p>
            </AnimatePresence>
            <button type="button" disabled={offset >= 18} onClick={() => setOffset((o) => o + 1)} className="grid size-11 place-items-center rounded-full border disabled:opacity-25" style={{ borderColor: MB.line }} aria-label="Next month">
              →
            </button>
          </div>
          <div className={`mt-6 grid grid-cols-7 gap-1 text-center text-[11px] uppercase tracking-[0.18em] text-[#B7948B]`}>
            {WEEK.map((w) => (
              <span key={w} className="py-2">
                {w}
              </span>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={offset} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.35, ease: EASE }} className="grid grid-cols-7 gap-1">
              {month &&
                Array.from({ length: month.lead + month.daysIn }, (_, k) => {
                  if (k < month.lead) return <span key={k} />;
                  const day = k - month.lead + 1;
                  const date = new Date(month.first.getFullYear(), month.first.getMonth(), day, 12);
                  const past = today ? date < today : false;
                  const st = dayState(date.getFullYear(), date.getMonth(), day);
                  const on = picked?.toDateString() === date.toDateString();
                  const disabled = past || st === "booked";
                  return (
                    <button
                      key={k}
                      type="button"
                      disabled={disabled}
                      onClick={() => {
                        setPicked(date);
                        setSent(false);
                      }}
                      className={`relative flex aspect-square items-center justify-center rounded-full text-[15px] transition-colors sm:text-[17px] ${on ? "bg-[#E7B59E] text-[#1A0A0E]" : disabled ? "text-[#F7E7DF]/20" : "hover:bg-[#F7E7DF]/10"}`}
                      aria-label={`${date.toDateString()}${st === "booked" ? ", booked" : ""}`}
                    >
                      <span className={st === "booked" && !past ? "line-through" : ""}>{day}</span>
                      {!past && st === "few" && !on && <span className="absolute bottom-1 size-1 rounded-full bg-[#E7B59E]" />}
                    </button>
                  );
                })}
            </motion.div>
          </AnimatePresence>
          <div className="mt-6 flex flex-wrap gap-5 text-[11px] uppercase tracking-[0.18em] text-[#B7948B]">
            <span className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-[#F7E7DF]" /> Open
            </span>
            <span className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-[#E7B59E]" /> Last slot
            </span>
            <span className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-[#F7E7DF]/25" /> Booked
            </span>
          </div>
        </div>

        <div className="relative flex min-h-[520px] flex-col overflow-hidden p-5 sm:p-10" style={{ background: `linear-gradient(170deg, ${MB.wine}, ${MB.bg})` }}>
          <Petals className="opacity-40" />
          <AnimatePresence mode="wait">
            {!picked ? (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative flex flex-1 flex-col justify-center">
                <p className={`${SERIF} text-[clamp(2rem,3.4vw,3rem)] italic leading-tight`}>Choose your wedding date.</p>
                <p className="mt-4 text-[16px] text-[#F7E7DF]/70">I take only one bride a day, so every date is first come, first served.</p>
              </motion.div>
            ) : sent ? (
              <motion.div key="sent" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }} className="relative flex flex-1 flex-col justify-center">
                <p className={LABEL} style={{ color: MB.rose }}>
                  ✿ Request sent
                </p>
                <p className={`${SERIF} mt-4 text-[clamp(2.2rem,4vw,3.4rem)] italic leading-tight`}>Your date is held for 48 hours.</p>
                <p className="mt-4 text-[16px] text-[#F7E7DF]/70">{fmt(picked)}. I&apos;ll message you today to plan your trial.</p>
                <button type="button" onClick={() => (setPicked(null), setSent(false))} className={`${LABEL} mt-8 w-fit text-[10px] underline-offset-4 hover:underline`} style={{ color: MB.rose }}>
                  Check another date ↺
                </button>
              </motion.div>
            ) : (
              <motion.div key={picked.toDateString()} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5, ease: EASE }} className="relative flex flex-1 flex-col">
                <p className={LABEL} style={{ color: state === "few" ? MB.rose : "#9BE3B0" }}>
                  {state === "few" ? "● Last slot open" : "● Open"}
                </p>
                <p className={`${SERIF} mt-3 text-[clamp(2rem,3.2vw,2.8rem)] italic leading-tight`}>{fmt(picked)}</p>
                <p className={`${LABEL} mt-8 text-[10px] text-[#B7948B]`}>Which looks?</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {EVENTS.map((e) => {
                    const on = events.includes(e);
                    return (
                      <button key={e} type="button" onClick={() => setEvents(on ? events.filter((x) => x !== e) : [...events, e])} className={`h-10 rounded-full px-4 text-[14px] transition-colors ${on ? "bg-[#E7B59E] text-[#1A0A0E]" : "border text-[#F7E7DF]/75"}`} style={{ borderColor: on ? undefined : MB.line }}>
                        {e}
                      </button>
                    );
                  })}
                </div>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className={`${LABEL} text-[10px] text-[#B7948B]`}>Bride&apos;s name</span>
                    <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Aanya Sharma" className="mt-2 h-12 w-full border-b bg-transparent text-[17px] outline-none placeholder:text-[#F7E7DF]/25 focus:border-[#E7B59E]" style={{ borderColor: MB.line }} />
                  </label>
                  <label className="block">
                    <span className={`${LABEL} text-[10px] text-[#B7948B]`}>Venue / city</span>
                    <input value={venue} onChange={(e) => setVenue(e.target.value)} placeholder="Indore" className="mt-2 h-12 w-full border-b bg-transparent text-[17px] outline-none placeholder:text-[#F7E7DF]/25 focus:border-[#E7B59E]" style={{ borderColor: MB.line }} />
                  </label>
                </div>
                <div className="mt-auto pt-10">
                  <Btn
                    className="w-full"
                    cursor="Hold date"
                    disabled={!events.length}
                    onClick={() => {
                      send(
                        "Date requests straight to your WhatsApp",
                        `Hi Mehr! 💍\nI'd love to book you for my wedding.\nDate: ${fmt(picked)}\nLooks: ${events.join(", ")}\nVenue: ${venue || "Indore"}\nBride: ${name || "Aanya Sharma"}\nPlease hold my date!`,
                      );
                      setSent(true);
                    }}
                  >
                    Hold my date
                  </Btn>
                  <p className="mt-3 text-center text-[12px] text-[#B7948B]">No payment now · 25% advance confirms</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Feature>
  );
}
