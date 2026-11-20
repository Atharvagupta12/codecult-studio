"use client";

import { motion, useReducedMotion } from "motion/react";
import { useDemo } from "../shared/DemoProvider";
import { useOpenStatus } from "../shared/useOpenStatus";
import { HOURS, PF, WA_TRIAL, joinMessage, type Months, type Plan } from "./data";

export const D = "[font-family:var(--pf-display)]";
export const EASE = [0.16, 1, 0.3, 1] as const;

/* ── Reveal on scroll ── */
export function Up({ children, delay = 0, className = "", y = 36 }: { children: React.ReactNode; delay?: number; className?: string; y?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

export function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p
      className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[12px] font-bold uppercase tracking-[0.14em] ${light ? "bg-white/15 text-white" : "bg-white text-[#3A5BFF] shadow-[0_6px_20px_-10px_rgba(58,91,255,0.5)]"}`}
    >
      <Heartbeat className="h-3 w-5" />
      {children}
    </p>
  );
}

/* ── Marks ── */
export function Heartbeat({ className = "", strokeWidth = 2.6 }: { className?: string; strokeWidth?: number }) {
  return (
    <svg viewBox="0 0 40 20" className={className} fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M1 11h9l3-7 5 13 4-9 2 3h15" />
    </svg>
  );
}

/** Animated ECG line that draws itself on a loop */
export function PulseLine({ className = "", color = PF.blue }: { className?: string; color?: string }) {
  const reduce = useReducedMotion();
  const d = "M0 60 H180 L205 60 L222 18 L246 104 L268 34 L284 72 L296 60 H520 L540 60 L556 28 L578 92 L596 60 H800";
  return (
    <svg viewBox="0 0 800 120" preserveAspectRatio="none" className={className} fill="none" aria-hidden>
      <path d={d} stroke={color} strokeOpacity={0.18} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />
      <motion.path
        d={d}
        stroke={color}
        strokeWidth={6}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: reduce ? 1 : 0, pathOffset: 0 }}
        animate={reduce ? { pathLength: 1 } : { pathLength: [0, 0.35, 0.35], pathOffset: [0, 0.65, 1] }}
        transition={reduce ? undefined : { duration: 2.6, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.4 }}
      />
    </svg>
  );
}

export function Stars({ className = "" }: { className?: string }) {
  return <span className={`tracking-[-0.06em] text-[#FFB020] ${className}`}>★★★★★</span>;
}

export function OpenBadge({ dark = false }: { dark?: boolean }) {
  const status = useOpenStatus(HOURS);
  const dot = status ? (status.open ? "#22C55E" : PF.coral) : PF.blue;
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[13px] font-semibold ${dark ? "bg-white/10 text-white ring-1 ring-white/15" : "bg-white text-[#0B1030] shadow-[0_6px_20px_-12px_rgba(11,16,48,0.4)]"}`}
    >
      <span className="relative flex size-2">
        {status?.open && <span className="absolute inline-flex size-full animate-ping rounded-full opacity-70" style={{ background: dot }} />}
        <span className="relative inline-flex size-2 rounded-full" style={{ background: dot }} />
      </span>
      {status ? status.label : "Open daily from 5 am"}
    </span>
  );
}

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className={`${D} flex items-center gap-2 text-[22px] font-[800] leading-none tracking-[-0.04em] ${light ? "text-white" : ""}`}>
      <span className="grid size-9 place-items-center rounded-[11px] text-white" style={{ background: PF.blue }}>
        <Heartbeat className="h-4 w-6" strokeWidth={3.2} />
      </span>
      pulse
    </span>
  );
}

/* ── Demo actions ── */
export function useActions() {
  const { explain } = useDemo();
  return {
    trial: () =>
      explain({
        title: "Free-trial bookings land on your WhatsApp",
        body: "On your real website, this opens WhatsApp with the trial request already typed. You get the lead instantly and reply from your phone.",
        message: WA_TRIAL,
      }),
    join: (plan: Plan, months: Months) =>
      explain({
        title: "New members message you directly",
        body: "On your real website, the visitor's chosen plan and price are sent to your WhatsApp. No forms, no missed leads.",
        message: joinMessage(plan, months),
      }),
    call: () => explain({ title: "One tap to call the front desk", body: "On your real website, this dials your gym's number straight from the visitor's phone." }),
  };
}
