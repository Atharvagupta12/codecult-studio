"use client";

import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState, useSyncExternalStore } from "react";
import { Feature } from "../shared/Feature";
import { AM, EVENTS, dayState } from "./data";
import { PageHead } from "./Shell";
import { Btn, EASE, MONO, SERIF, useActions } from "./shared";

function useTodayISO() {
  return useSyncExternalStore(
    () => () => {},
    () => new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata" }).format(new Date()),
    () => null,
  );
}

const WEEK = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function AaravBook() {
  return (
    <main>
      <PageHead n="06" kicker="Check my dates" title="Is your date" italic="still free?" sub="Pick your wedding date to check my availability instantly. If it's free, I'll hold it for you for 48 hours while we talk." />
      <section className="px-3 pb-24 sm:px-10 sm:pb-32">
        <div className="mx-auto max-w-[1500px]">
          <DateCheck />
        </div>
      </section>
    </main>
  );
}

function DateCheck() {
  const { enquire } = useActions();
  const todayISO = useTodayISO();
  const today = useMemo(() => (todayISO ? new Date(`${todayISO}T12:00:00`) : null), [todayISO]);
  const [offset, setOffset] = useState(1);
  const [picked, setPicked] = useState<Date | null>(null);
  const [events, setEvents] = useState<string[]>(["Haldi", "Wedding"]);
  const [names, setNames] = useState("");
  const [city, setCity] = useState("");
  const [sent, setSent] = useState(false);

  const month = useMemo(() => {
    if (!today) return null;
    const first = new Date(today.getFullYear(), today.getMonth() + offset, 1, 12);
    const daysIn = new Date(first.getFullYear(), first.getMonth() + 1, 0).getDate();
    const lead = (first.getDay() + 6) % 7;
    return { first, daysIn, lead };
  }, [today, offset]);

  const fmt = (d: Date) => d.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  const state = picked ? dayState(picked.getFullYear(), picked.getMonth(), picked.getDate()) : null;

  const submit = () => {
    if (!picked) return;
    enquire(
      `Hi Aarav! 💍\nWe'd love to book you for our wedding.\nDate: ${fmt(picked)}\nEvents: ${events.join(", ")}\nCity: ${city || "Indore"}\nCouple: ${names || "Riya & Karan"}\nPlease hold the date for us!`,
      "Date requests straight to your WhatsApp",
    );
    setSent(true);
  };

  return (
    <Feature id="date-check" label="Live date-check booking flow">
      <div className="grid overflow-hidden rounded-[6px] border lg:grid-cols-[1.1fr_0.9fr]" style={{ borderColor: AM.line }}>
        {/* Calendar */}
        <div className="p-5 sm:p-10" style={{ background: AM.panel }}>
          <div className="flex items-center justify-between">
            <button type="button" disabled={offset <= 0} onClick={() => setOffset((o) => o - 1)} className="grid size-11 place-items-center rounded-full border border-white/20 disabled:opacity-25" aria-label="Previous month">
              ←
            </button>
            <AnimatePresence mode="wait">
              <motion.p key={offset} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }} className={`${SERIF} text-[34px] italic`}>
                {month ? month.first.toLocaleDateString("en-IN", { month: "long", year: "numeric" }) : "…"}
              </motion.p>
            </AnimatePresence>
            <button type="button" disabled={offset >= 18} onClick={() => setOffset((o) => o + 1)} className="grid size-11 place-items-center rounded-full border border-white/20 disabled:opacity-25" aria-label="Next month">
              →
            </button>
          </div>
          <div className={`mt-6 grid grid-cols-7 gap-1 text-center ${MONO}`} style={{ color: AM.mute }}>
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
                      className={`relative flex aspect-square flex-col items-center justify-center rounded-[4px] text-[15px] transition-colors sm:text-[17px] ${on ? "bg-[#D9B97A] text-black" : disabled ? "text-white/20" : "hover:bg-white/10"}`}
                      aria-label={`${date.toDateString()}${st === "booked" ? ", booked" : ""}`}
                    >
                      <span className={st === "booked" && !past ? "line-through" : ""}>{day}</span>
                      {!past && st !== "free" && <span className={`absolute bottom-1.5 size-1 rounded-full ${on ? "bg-black" : ""}`} style={{ background: on ? undefined : st === "few" ? AM.gold : "rgba(255,255,255,0.25)" }} />}
                    </button>
                  );
                })}
            </motion.div>
          </AnimatePresence>
          <div className={`mt-6 flex flex-wrap gap-5 ${MONO}`} style={{ color: AM.mute }}>
            <span className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-[#F2EDE4]" /> Available
            </span>
            <span className="flex items-center gap-2">
              <span className="size-2 rounded-full" style={{ background: AM.gold }} /> Last slot
            </span>
            <span className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-white/25" /> Booked
            </span>
          </div>
        </div>

        {/* Details */}
        <div className="flex min-h-[520px] flex-col p-5 sm:p-10">
          <AnimatePresence mode="wait">
            {!picked ? (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-1 flex-col justify-center">
                <p className={`${SERIF} text-[clamp(2rem,3.4vw,3rem)] italic leading-tight`}>Pick your wedding date on the calendar.</p>
                <p className="mt-4 text-[16px]" style={{ color: AM.mute }}>
                  Most of next wedding season is already filling up. Dates with a gold dot have just one slot left.
                </p>
              </motion.div>
            ) : sent ? (
              <motion.div key="sent" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.6, ease: EASE }} className="flex flex-1 flex-col justify-center">
                <p className={MONO} style={{ color: AM.gold }}>
                  ✓ Request sent
                </p>
                <p className={`${SERIF} mt-4 text-[clamp(2.2rem,4vw,3.6rem)] italic leading-tight`}>Your date is on hold for 48 hours.</p>
                <p className="mt-4 text-[16px]" style={{ color: AM.mute }}>
                  {fmt(picked)}. I&apos;ll message you on WhatsApp today to plan a quick call.
                </p>
                <button type="button" onClick={() => (setPicked(null), setSent(false))} className={`${MONO} mt-8 w-fit underline-offset-4 hover:underline`} style={{ color: AM.gold }}>
                  Check another date ↺
                </button>
              </motion.div>
            ) : (
              <motion.div key={picked.toDateString()} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5, ease: EASE }} className="flex flex-1 flex-col">
                <p className={MONO} style={{ color: state === "few" ? AM.gold : "#7BD88F" }}>
                  {state === "few" ? "● Last slot available" : "● Available"}
                </p>
                <p className={`${SERIF} mt-3 text-[clamp(2rem,3.4vw,3rem)] italic leading-tight`}>{fmt(picked)}</p>

                <p className={`${MONO} mt-8`} style={{ color: AM.mute }}>
                  Events to cover
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {EVENTS.map((e) => {
                    const on = events.includes(e);
                    return (
                      <button key={e} type="button" onClick={() => setEvents(on ? events.filter((x) => x !== e) : [...events, e])} className={`h-10 rounded-full px-4 text-[14px] transition-colors ${on ? "bg-[#F2EDE4] text-black" : "border border-white/15 text-[#F2EDE4]/70"}`}>
                        {e}
                      </button>
                    );
                  })}
                </div>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className={MONO} style={{ color: AM.mute }}>
                      Your names
                    </span>
                    <input value={names} onChange={(e) => setNames(e.target.value)} placeholder="Riya & Karan" className="mt-2 h-12 w-full border-b bg-transparent text-[17px] outline-none placeholder:text-white/25 focus:border-[#D9B97A]" style={{ borderColor: AM.line }} />
                  </label>
                  <label className="block">
                    <span className={MONO} style={{ color: AM.mute }}>
                      City / venue
                    </span>
                    <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="Indore" className="mt-2 h-12 w-full border-b bg-transparent text-[17px] outline-none placeholder:text-white/25 focus:border-[#D9B97A]" style={{ borderColor: AM.line }} />
                  </label>
                </div>
                <div className="mt-auto pt-10">
                  <Btn variant="gold" className="w-full" cursor="Hold date" onClick={submit} disabled={events.length === 0}>
                    Hold this date on WhatsApp →
                  </Btn>
                  <p className="mt-3 text-center text-[12px]" style={{ color: AM.mute }}>
                    No payment now. A 30% advance confirms the booking.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Feature>
  );
}
