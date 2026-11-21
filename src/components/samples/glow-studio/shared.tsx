"use client";

import { motion, useReducedMotion } from "motion/react";
import { useDemo } from "../shared/DemoProvider";
import { fmtTime, useIndiaNow } from "../shared/indiaTime";
import { useOpenStatus } from "../shared/useOpenStatus";
import { GS, HOURS, dur, inr, type Service } from "./data";

export const SERIF = "[font-family:var(--gs-serif)] font-normal";
export const EASE = [0.16, 1, 0.3, 1] as const;

export function Up({ children, delay = 0, className = "", y = 30 }: { children: React.ReactNode; delay?: number; className?: string; y?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div className={className} initial={reduce ? { opacity: 0 } : { opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "0px 0px -10% 0px" }} transition={{ duration: 0.9, ease: EASE, delay }}>
      {children}
    </motion.div>
  );
}

export function Sparkle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12 0c.6 6.4 3.6 9.6 12 12-8.4 2.4-11.4 5.6-12 12-.6-6.4-3.6-9.6-12-12C8.4 9.6 11.4 6.4 12 0Z" />
    </svg>
  );
}

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className={`${SERIF} flex items-center gap-1.5 text-[26px] leading-none ${light ? "text-white" : ""}`}>
      Glow <span className="italic" style={{ color: light ? GS.rose : GS.berry }}>Studio</span>
      <Sparkle className="mb-3 size-3" />
    </span>
  );
}

export function Eyebrow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.22em] ${className}`} style={{ color: GS.berry }}>
      <Sparkle className="size-3" />
      {children}
    </p>
  );
}

export function OpenBadge({ className = "" }: { className?: string }) {
  const status = useOpenStatus(HOURS);
  const dot = status ? (status.open ? "#2FA36B" : GS.berry) : GS.rose;
  return (
    <span className={`inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1.5 text-[13px] font-medium shadow-[0_6px_20px_-14px_rgba(58,26,46,0.5)] backdrop-blur ${className}`}>
      <span className="relative flex size-2">
        {status?.open && <span className="absolute inline-flex size-full animate-ping rounded-full opacity-70" style={{ background: dot }} />}
        <span className="relative inline-flex size-2 rounded-full" style={{ background: dot }} />
      </span>
      {status ? status.label : "Open 10 am – 8 pm"}
    </span>
  );
}

/** Next bookable slot in India time: today if there's room, otherwise the next open day at 10 am. */
export function useNextSlot() {
  const now = useIndiaNow();
  if (!now) return null;
  const [o, c] = HOURS[now.day];
  const soon = Math.ceil((now.minutes + 60) / 30) * 30;
  if (c > o && soon >= o && soon <= c - 60) return `today, ${fmtTime(soon)}`;
  if (c > o && now.minutes < o) return `today, ${fmtTime(o)}`;
  for (let i = 1; i <= 7; i++) {
    const d = (now.day + i) % 7;
    if (HOURS[d][1] > HOURS[d][0]) return `${i === 1 ? "tomorrow" : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][d]}, ${fmtTime(HOURS[d][0])}`;
  }
  return null;
}

export function useActions() {
  const { explain } = useDemo();
  return {
    book: (items: Service[], total?: number, mins?: number) =>
      explain({
        title: "Appointments land straight on your WhatsApp",
        body: "On your real website, the customer's chosen services, total price and time arrive on your WhatsApp, already typed. You just reply with a slot.",
        message: items.length
          ? `Hi Glow Studio! 💖\nI'd like to book:\n${items.map((s) => `• ${s.name} (${inr(s.price)})`).join("\n")}\nTotal: ${inr(total ?? 0)} · about ${dur(mins ?? 0)}\nAny slot this Saturday?`
          : "Hi Glow Studio! 💖\nI'd like to book an appointment this week. What slots do you have?",
      }),
    call: () => explain({ title: "One tap to call the salon", body: "On your real website, this dials your salon's number straight from the customer's phone." }),
  };
}
