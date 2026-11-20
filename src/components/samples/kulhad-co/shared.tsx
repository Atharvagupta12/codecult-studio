"use client";

import { motion, useReducedMotion } from "motion/react";
import { useDemo } from "../shared/DemoProvider";
import { useOpenStatus } from "../shared/useOpenStatus";
import { HOURS, KC, WA_MESSAGE } from "./data";

export const D = "[font-family:var(--kc-display)] font-normal";
export const HI = "[font-family:var(--kc-hindi)] font-normal";
export const HAND = "[font-family:var(--kc-hand)]";
/** Condensed, heavy sticker/label style */
export const COND = "[font-variation-settings:'wdth'_75] font-[800] uppercase";
export const EASE = [0.16, 1, 0.3, 1] as const;

export function useOrderAction() {
  const { explain } = useDemo();
  return () =>
    explain({
      title: "Orders come straight to your WhatsApp",
      body: "On your real website, this opens WhatsApp on the customer's phone with their order already typed out. They tap send, you start brewing. No app, no commission.",
      message: WA_MESSAGE,
    });
}

export function useCallAction() {
  const { explain } = useDemo();
  return () =>
    explain({
      title: "One tap to call",
      body: "On your real website, this dials your café straight from the customer's phone. Great for table bookings and bulk orders.",
    });
}

export function Up({ children, delay = 0, className = "", y = 34 }: { children: React.ReactNode; delay?: number; className?: string; y?: number }) {
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

/** Tilted sticker label */
export function Sticker({ children, bg = KC.marigold, fg = KC.green, rotate = -4, className = "" }: { children: React.ReactNode; bg?: string; fg?: string; rotate?: number; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[13px] tracking-[0.04em] shadow-[0_6px_0_rgba(0,0,0,0.18)] ${COND} ${className}`}
      style={{ background: bg, color: fg, rotate: `${rotate}deg` }}
    >
      {children}
    </span>
  );
}

export function OpenBadge({ dark = true }: { dark?: boolean }) {
  const status = useOpenStatus(HOURS);
  const dot = status ? (status.open ? "#4ADE80" : "#F87171") : KC.marigold;
  return (
    <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[13px] font-semibold ${dark ? "bg-white/10 ring-1 ring-white/15" : "bg-black/5 ring-1 ring-black/10"}`}>
      <span className="relative flex size-2">
        {status?.open && <span className="absolute inline-flex size-full animate-ping rounded-full opacity-70" style={{ background: dot }} />}
        <span className="relative inline-flex size-2 rounded-full" style={{ background: dot }} />
      </span>
      {status ? status.label : "Open daily · 7 am – 1 am"}
    </span>
  );
}

export function Kulhad({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden>
      <path d="M5 9h22l-2.6 15.2A3 3 0 0 1 21.4 27H10.6a3 3 0 0 1-3-2.8L5 9Z" fill="currentColor" />
      <path d="M4 9h24" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M12 3.5c-1 1.2 1 2.2 0 3.5M16.5 3c-1 1.2 1 2.2 0 3.5M21 3.5c-1 1.2 1 2.2 0 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function Stars({ className = "" }: { className?: string }) {
  return <span className={`tracking-[-0.06em] text-[#F4A83A] ${className}`}>★★★★★</span>;
}

/** Wavy divider between sections */
export function Wave({ fill, flip = false }: { fill: string; flip?: boolean }) {
  return (
    <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className={`block h-[40px] w-full sm:h-[60px] ${flip ? "rotate-180" : ""}`} aria-hidden>
      <path d="M0 30 C 120 0, 240 60, 360 30 S 600 0, 720 30 960 60, 1080 30 1320 0, 1440 30 V60 H0Z" fill={fill} />
    </svg>
  );
}
