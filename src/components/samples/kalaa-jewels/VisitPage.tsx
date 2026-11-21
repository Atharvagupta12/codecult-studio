"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useMemo, useState, useSyncExternalStore } from "react";
import { Feature } from "../shared/Feature";
import { fmtTime } from "../shared/indiaTime";
import { useOpenStatus } from "../shared/useOpenStatus";
import { PageHead } from "./CollectionsPage";
import { ADDRESS, DAYS, HOURS, IMG, KJ, MAPS_URL, MAP_EMBED, PURPOSES, VISIT_SLOTS } from "./data";
import { Btn, EASE, Eyebrow, LABEL, OpenBadge, SERIF, Shimmer, Up, useActions } from "./shared";

function useTodayISO() {
  return useSyncExternalStore(
    () => () => {},
    () => new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata" }).format(new Date()),
    () => null,
  );
}

export function KalaaVisit() {
  return (
    <main>
      <PageHead kicker="Sarafa Bazaar, Indore" title="Visit our" italic="showroom." sub="Book a private appointment and we'll have your favourite pieces ready, chai poured and the bridal lounge set up just for you." />
      <Appointment />
      <Store />
    </main>
  );
}

function Appointment() {
  const { send } = useActions();
  const todayISO = useTodayISO();
  const [purpose, setPurpose] = useState(PURPOSES[0]);
  const [dayIdx, setDayIdx] = useState<number | null>(null);
  const [slot, setSlot] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [guests, setGuests] = useState(2);
  const [done, setDone] = useState(false);

  const days = useMemo(() => {
    if (!todayISO) return [];
    const base = new Date(`${todayISO}T12:00:00`);
    return Array.from({ length: 10 }, (_, i) => {
      const d = new Date(base);
      d.setDate(base.getDate() + i + 1);
      return d;
    });
  }, [todayISO]);
  const day = dayIdx !== null ? days[dayIdx] : null;
  const fmt = (d: Date) => d.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" });

  const confirm = () => {
    if (!day || !slot) return;
    send(
      "Appointments arrive on your WhatsApp",
      `Hi Kalaa Jewels! ✨\nI'd like to book a store appointment.\nFor: ${purpose}\nWhen: ${fmt(day)}, ${slot}\nGuests: ${guests}\nName: ${name.trim() || "Aditi Sharma"}`,
    );
    setDone(true);
  };

  return (
    <section className="px-5 pb-24 sm:px-8 sm:pb-32">
      <div className="mx-auto max-w-[1100px]">
        <Feature id="appointment" label="Book a private store appointment">
          <div className="border p-6 sm:p-10" style={{ borderColor: KJ.line, background: KJ.panel }}>
            <AnimatePresence mode="wait">
              {done && day ? (
                <motion.div key="done" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.6, ease: EASE }} className="py-10 text-center">
                  <Eyebrow center>Appointment requested</Eyebrow>
                  <p className={`${SERIF} mt-6 text-[clamp(2.2rem,4vw,3.4rem)] italic leading-tight`}>We&apos;ll be ready for you.</p>
                  <p className="mx-auto mt-4 max-w-[30rem] text-[16px] text-[#F3E3C3]/75">
                    {fmt(day)} at {slot} · {purpose}. Our team will confirm on WhatsApp within the hour.
                  </p>
                  <button type="button" onClick={() => (setDone(false), setSlot(null), setDayIdx(null))} className={`${LABEL} mt-8 text-[10px] underline-offset-4 hover:underline`} style={{ color: KJ.gold }}>
                    Book another visit
                  </button>
                </motion.div>
              ) : (
                <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <p className={`${LABEL} text-[10px] text-[#A39478]`}>1 · What brings you in?</p>
                  <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {PURPOSES.map((p) => (
                      <button key={p} type="button" onClick={() => setPurpose(p)} className={`min-h-14 border px-3 py-3 text-[14px] transition-colors ${p === purpose ? "border-[#D4A84B] bg-[#D4A84B]/10 text-[#F0CF86]" : "text-[#F3E3C3]/70 hover:text-[#F3E3C3]"}`} style={{ borderColor: p === purpose ? KJ.gold : KJ.line }}>
                        {p}
                      </button>
                    ))}
                  </div>

                  <p className={`${LABEL} mt-10 text-[10px] text-[#A39478]`}>2 · Pick a day</p>
                  <div className="-mx-6 mt-4 flex gap-2 overflow-x-auto px-6 pb-1 [scrollbar-width:none] sm:mx-0 sm:px-0">
                    {days.map((d, i) => {
                      const closed = HOURS[d.getDay()][1] <= HOURS[d.getDay()][0];
                      const on = i === dayIdx;
                      return (
                        <button key={d.toISOString()} type="button" disabled={closed} onClick={() => (setDayIdx(i), setSlot(null))} className={`flex w-[76px] shrink-0 flex-col items-center border py-3 transition-colors disabled:opacity-30 ${on ? "border-[#D4A84B] bg-[#D4A84B] text-[#15110D]" : "hover:border-[#D4A84B]/60"}`} style={{ borderColor: on ? KJ.gold : KJ.line }}>
                          <span className="text-[10px] uppercase tracking-[0.2em]">{d.toLocaleDateString("en-IN", { weekday: "short" })}</span>
                          <span className={`${SERIF} text-[30px] leading-none`}>{d.getDate()}</span>
                          <span className="text-[10px] uppercase tracking-[0.18em] opacity-70">{closed ? "Closed" : d.toLocaleDateString("en-IN", { month: "short" })}</span>
                        </button>
                      );
                    })}
                    {!days.length && <span className="text-[13px] text-[#A39478]">Loading dates…</span>}
                  </div>

                  <AnimatePresence initial={false}>
                    {day && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: EASE }} className="overflow-hidden">
                        <p className={`${LABEL} mt-10 text-[10px] text-[#A39478]`}>3 · Time & details</p>
                        <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-5">
                          {VISIT_SLOTS.map((s) => (
                            <button key={s} type="button" onClick={() => setSlot(s)} className={`h-12 border text-[14px] transition-colors ${s === slot ? "border-[#D4A84B] bg-[#D4A84B] text-[#15110D]" : "text-[#F3E3C3]/75 hover:text-[#F3E3C3]"}`} style={{ borderColor: s === slot ? KJ.gold : KJ.line }}>
                              {s}
                            </button>
                          ))}
                        </div>
                        <div className="mt-6 grid gap-5 sm:grid-cols-[1fr_auto]">
                          <label className="block">
                            <span className="text-[12px] text-[#A39478]">Your name</span>
                            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Aditi Sharma" className="mt-2 h-12 w-full border-b bg-transparent text-[17px] outline-none placeholder:text-[#F3E3C3]/25 focus:border-[#D4A84B]" style={{ borderColor: KJ.line }} />
                          </label>
                          <div>
                            <span className="text-[12px] text-[#A39478]">Guests</span>
                            <div className="mt-2 flex items-center gap-3">
                              <button type="button" onClick={() => setGuests((g) => Math.max(1, g - 1))} className="grid size-10 place-items-center border" style={{ borderColor: KJ.line }} aria-label="Fewer guests">
                                −
                              </button>
                              <span className={`${SERIF} w-6 text-center text-[24px]`}>{guests}</span>
                              <button type="button" onClick={() => setGuests((g) => Math.min(8, g + 1))} className="grid size-10 place-items-center border" style={{ borderColor: KJ.line }} aria-label="More guests">
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t pt-6 sm:flex-row" style={{ borderColor: KJ.line }}>
                    <p className="text-[14px] text-[#A39478]">{day && slot ? `${fmt(day)} · ${slot} · ${purpose}` : "Choose a day and time to continue"}</p>
                    <Btn disabled={!day || !slot} onClick={confirm} className="w-full sm:w-auto">
                      Request appointment
                    </Btn>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Feature>
      </div>
    </section>
  );
}

const ORDER = [1, 2, 3, 4, 5, 6, 0];

function Store() {
  const status = useOpenStatus(HOURS);
  const { call } = useActions();
  return (
    <section className="border-t px-5 py-24 sm:px-8 sm:py-32" style={{ borderColor: KJ.line }}>
      <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-[1fr_1fr]">
        <Up>
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image src={IMG.store} alt="Kalaa Jewels showroom" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover [filter:sepia(0.55)_brightness(0.7)_contrast(1.1)]" />
            <Shimmer />
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image src={IMG.tray} alt="Gold jewellery on a tray" fill sizes="25vw" className="object-cover" />
            </div>
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image src={IMG.purple} alt="Customer trying on jewellery" fill sizes="25vw" className="object-cover object-[50%_25%]" />
            </div>
          </div>
        </Up>
        <Up delay={0.1}>
          <Eyebrow>The showroom</Eyebrow>
          <h2 className={`${SERIF} mt-6 text-[clamp(2.4rem,4.4vw,4rem)] font-medium leading-[1.02]`}>
            A private lounge for <span className="italic" style={{ color: KJ.goldLight }}>every bride.</span>
          </h2>
          <p className="mt-5 text-[16px] leading-relaxed text-[#F3E3C3]/75">{ADDRESS}. Free valet parking on Rajwada side. Bridal appointments get the first-floor lounge, mirrors, chai and all the time you need.</p>
          <ul className="mt-8 flex flex-col">
            {ORDER.map((d) => {
              const today = status?.today === d;
              const closed = HOURS[d][1] <= HOURS[d][0];
              return (
                <li key={d} className={`flex justify-between border-b py-3 text-[15px] ${today ? "text-[#F0CF86]" : "text-[#F3E3C3]/70"}`} style={{ borderColor: KJ.line }}>
                  <span>
                    {DAYS[d]} {today && <span className={`${LABEL} ml-2 text-[9px]`}>· Today</span>}
                  </span>
                  <span>{closed ? "Closed" : `${fmtTime(HOURS[d][0])} – ${fmtTime(HOURS[d][1])}`}</span>
                </li>
              );
            })}
          </ul>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <OpenBadge />
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Btn onClick={call}>Call the store</Btn>
            <a href={MAPS_URL} target="_blank" rel="noopener" className="inline-flex h-14 items-center border px-8 text-[12px] uppercase tracking-[0.24em]" style={{ borderColor: `${KJ.gold}80` }}>
              Directions ↗
            </a>
          </div>
          <Feature id="map" label="Google Maps + directions" className="mt-8">
            <div className="relative h-[260px] overflow-hidden border" style={{ borderColor: KJ.line }}>
              <iframe title="Kalaa Jewels on Google Maps" src={MAP_EMBED} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="absolute inset-0 h-full w-full border-0 [filter:grayscale(0.6)_sepia(0.5)_brightness(0.75)_contrast(1.1)]" />
            </div>
          </Feature>
        </Up>
      </div>
    </section>
  );
}
