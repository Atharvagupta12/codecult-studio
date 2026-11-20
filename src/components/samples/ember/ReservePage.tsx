"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, useSyncExternalStore } from "react";
import { useDemo } from "../shared/DemoProvider";
import { Feature } from "../shared/Feature";
import { BASE, EM, HOURS, OCCASIONS, SLOTS, isFull } from "./data";
import { D, EASE, LABEL, Label } from "./shared";

/** Today's date (Indian time) as YYYY-MM-DD, computed only in the browser. */
function useTodayISO() {
  return useSyncExternalStore(
    () => () => {},
    () => new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata" }).format(new Date()),
    () => null,
  );
}

const fmtDay = (d: Date) => d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" });

export function EmberReserve() {
  const todayISO = useTodayISO();
  const days = useMemo(() => {
    if (!todayISO) return [];
    const base = new Date(`${todayISO}T12:00:00`);
    return Array.from({ length: 14 }, (_, i) => {
      const d = new Date(base);
      d.setDate(base.getDate() + i);
      return d;
    });
  }, [todayISO]);

  const [dayIdx, setDayIdx] = useState<number | null>(null);
  const [slot, setSlot] = useState<number | null>(null);
  const [guests, setGuests] = useState(2);
  const [occasion, setOccasion] = useState(OCCASIONS[0]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [sent, setSent] = useState(false);
  const { explain } = useDemo();

  const day = dayIdx !== null ? days[dayIdx] : null;
  const ready = day && slot !== null;
  const summary = ready ? `Table for ${guests} · ${fmtDay(day)} · ${SLOTS[slot]}${occasion !== OCCASIONS[0] ? ` · ${occasion}` : ""}` : null;

  function request() {
    if (!summary) return;
    explain({
      title: "Bookings land in your WhatsApp",
      body: "On your real website, the guest's booking request reaches your WhatsApp instantly. You confirm with one reply. No booking platform fees.",
      message: `Hi Ember! I'd like to reserve a table.\n${summary}\nName: ${name || "(your name)"} · ${phone || "(phone)"}${notes ? `\nRequests: ${notes}` : ""}`,
    });
    setSent(true);
  }

  return (
    <main className="px-5 pb-28 pt-32 sm:px-8 sm:pb-36 sm:pt-40">
      <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        {/* Left: atmosphere */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Label>Reservations</Label>
          <h1 className={`${D} mt-5 text-[clamp(3rem,7vw,6.4rem)] leading-[0.95]`}>
            Book <span className="italic text-[#D9A55B]">your evening.</span>
          </h1>
          <p className="mt-5 max-w-[30rem] text-[17px] leading-relaxed" style={{ color: EM.mute }}>
            Dinner from 7 pm, Tuesday to Sunday. We hold tables for 15 minutes. For groups larger than eight, our private dining room awaits.
          </p>
          <div className="relative mt-10 hidden aspect-[4/3] overflow-hidden rounded-[6px] lg:block">
            <Image src="/images/ember/interior-dim.jpg" alt="The Ember dining room" fill sizes="45vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0C0907]/80 to-transparent" />
            <p className={`${D} absolute bottom-6 left-6 right-6 text-[24px] italic leading-snug`}>&ldquo;Ask for table 12, by the fire. Thank us later.&rdquo;</p>
          </div>
        </div>

        {/* Right: booking flow */}
        <Feature id="booking" label="Table booking flow" className="min-w-0">
          <div className="rounded-[6px] border p-6 sm:p-10" style={{ borderColor: EM.line, background: EM.panel }}>
            <Step n="01" title="Choose a date">
              <div className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-2 [scrollbar-width:none] sm:-mx-10 sm:px-10">
                {days.length === 0 && <p style={{ color: EM.mute }}>Loading dates…</p>}
                {days.map((d, i) => {
                  const closed = HOURS[d.getDay()][0] === HOURS[d.getDay()][1];
                  const active = dayIdx === i;
                  return (
                    <button
                      key={i}
                      type="button"
                      disabled={closed}
                      onClick={() => (setDayIdx(i), setSlot(null))}
                      className={`flex h-[88px] w-[72px] shrink-0 flex-col items-center justify-center rounded-[6px] border transition-colors disabled:cursor-not-allowed disabled:opacity-30 ${active ? "text-[#0C0907]" : "hover:border-[#D9A55B]"}`}
                      style={{ borderColor: active ? EM.gold : EM.line, background: active ? EM.gold : "transparent" }}
                    >
                      <span className="text-[11px] font-semibold uppercase tracking-[0.16em]">{i === 0 ? "Today" : d.toLocaleDateString("en-IN", { weekday: "short" })}</span>
                      <span className={`${D} text-[30px] leading-none`}>{d.getDate()}</span>
                      <span className="text-[11px] uppercase tracking-[0.12em] opacity-70">{closed ? "Closed" : d.toLocaleDateString("en-IN", { month: "short" })}</span>
                    </button>
                  );
                })}
              </div>
            </Step>

            <Step n="02" title="Pick a time">
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                {SLOTS.map((s, i) => {
                  const full = day ? isFull(day, i) : false;
                  const active = slot === i;
                  return (
                    <button
                      key={s}
                      type="button"
                      disabled={!day || full}
                      onClick={() => setSlot(i)}
                      className={`h-12 rounded-full border text-[14px] font-semibold transition-colors disabled:cursor-not-allowed ${active ? "text-[#0C0907]" : "hover:border-[#D9A55B]"} ${full ? "line-through opacity-35" : !day ? "opacity-35" : ""}`}
                      style={{ borderColor: active ? EM.gold : EM.line, background: active ? EM.gold : "transparent" }}
                    >
                      {full ? "Full" : s}
                    </button>
                  );
                })}
              </div>
              {!day && (
                <p className="mt-3 text-[13px]" style={{ color: EM.mute }}>
                  Choose a date first.
                </p>
              )}
            </Step>

            <Step n="03" title="Guests & occasion">
              <div className="flex flex-wrap items-center gap-5">
                <span className="inline-flex h-12 items-center rounded-full border" style={{ borderColor: EM.line }}>
                  <button type="button" onClick={() => setGuests((g) => Math.max(1, g - 1))} aria-label="Fewer guests" className="w-12 text-[20px]">
                    −
                  </button>
                  <span className={`${D} min-w-12 text-center text-[24px]`}>{guests}</span>
                  <button type="button" onClick={() => setGuests((g) => Math.min(12, g + 1))} aria-label="More guests" className="w-12 text-[20px]">
                    +
                  </button>
                </span>
                <span className="text-[14px]" style={{ color: EM.mute }}>
                  {guests === 1 ? "guest" : "guests"}
                </span>
              </div>
              {guests > 8 && (
                <p className="mt-3 text-[14px]" style={{ color: EM.gold }}>
                  Nine or more? <Link href={`${BASE}/events`} className="underline underline-offset-4">Try our private dining room →</Link>
                </p>
              )}
              <div className="mt-5 flex flex-wrap gap-2">
                {OCCASIONS.map((o) => (
                  <button
                    key={o}
                    type="button"
                    onClick={() => setOccasion(o)}
                    className={`rounded-full border px-4 py-2 text-[13px] transition-colors ${occasion === o ? "text-[#0C0907]" : "hover:border-[#D9A55B]"}`}
                    style={{ borderColor: occasion === o ? EM.gold : EM.line, background: occasion === o ? EM.gold : "transparent" }}
                  >
                    {o}
                  </button>
                ))}
              </div>
            </Step>

            <Step n="04" title="Your details" last>
              <div className="grid gap-3 sm:grid-cols-2">
                <Input label="Name" value={name} onChange={setName} placeholder="Full name" />
                <Input label="Phone" value={phone} onChange={setPhone} placeholder="10-digit mobile" type="tel" />
                <Input className="sm:col-span-2" label="Special requests" value={notes} onChange={setNotes} placeholder="Allergies, a cake, a quiet corner…" />
              </div>
            </Step>

            {/* Summary */}
            <div className="mt-8 rounded-[6px] border p-5" style={{ borderColor: summary ? EM.gold : EM.line }}>
              <p className={LABEL} style={{ color: EM.mute }}>
                Your booking
              </p>
              <p className={`${D} mt-2 text-[22px] italic sm:text-[26px]`}>{summary ?? "Choose a date and time"}</p>
            </div>

            <AnimatePresence mode="wait">
              {sent && summary ? (
                <motion.div key="sent" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE }} className="mt-5 flex items-center gap-4 rounded-[6px] p-5" style={{ background: "rgba(217,165,91,0.12)" }}>
                  <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.2 }} className="grid size-12 shrink-0 place-items-center rounded-full text-[22px]" style={{ background: EM.gold, color: EM.bg }}>
                    ✓
                  </motion.span>
                  <p className="text-[15px]">
                    <span className="font-semibold">Request sent.</span> <span style={{ color: EM.mute }}>We confirm every booking on WhatsApp within 15 minutes.</span>
                  </p>
                </motion.div>
              ) : (
                <motion.button
                  key="btn"
                  type="button"
                  onClick={request}
                  disabled={!summary}
                  className="mt-5 flex h-14 w-full items-center justify-center rounded-full text-[13px] font-semibold uppercase tracking-[0.2em] transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
                  style={{ background: EM.gold, color: EM.bg }}
                  data-cursor="Book"
                >
                  Request booking
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </Feature>
      </div>
    </main>
  );
}

function Step({ n, title, children, last = false }: { n: string; title: string; children: React.ReactNode; last?: boolean }) {
  return (
    <div className={`py-7 first:pt-0 ${last ? "" : "border-b"}`} style={{ borderColor: EM.line }}>
      <p className="mb-4 flex items-baseline gap-3">
        <span className={`${D} text-[15px] italic`} style={{ color: EM.gold }}>
          {n}
        </span>
        <span className="text-[18px] font-semibold">{title}</span>
      </p>
      {children}
    </div>
  );
}

function Input({ label, value, onChange, placeholder, type = "text", className = "" }: { label: string; value: string; onChange: (v: string) => void; placeholder: string; type?: string; className?: string }) {
  return (
    <label className={`flex flex-col gap-1.5 ${className}`}>
      <span className={LABEL} style={{ color: EM.mute }}>
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-12 rounded-xl border bg-transparent px-3 text-[15px] outline-none placeholder:text-[#A3968A]/60 focus:border-[#D9A55B]"
        style={{ borderColor: EM.line }}
      />
    </label>
  );
}
