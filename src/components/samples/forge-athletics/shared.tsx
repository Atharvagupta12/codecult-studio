"use client";

import { motion, useInView, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import Link from "next/link";
import { useRef, useSyncExternalStore } from "react";
import { useDemo } from "../shared/DemoProvider";
import { useOpenStatus } from "../shared/useOpenStatus";
import { FG, HOURS, inr } from "./data";

export const D = "[font-family:var(--fg-display)] font-[800] uppercase";
export const MONO = "[font-family:var(--fg-mono)] text-[11px] uppercase tracking-[0.14em]";
export const EASE = [0.16, 1, 0.3, 1] as const;

/* ── Reveal ── */
export function Up({ children, delay = 0, className = "", y = 40 }: { children: React.ReactNode; delay?: number; className?: string; y?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Lines that rise from behind a mask. `now` animates immediately (heroes), otherwise on scroll. */
export function Lines({ lines, className = "", delay = 0, now = false }: { lines: React.ReactNode[]; className?: string; delay?: number; now?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const seen = useInView(ref, { once: true, margin: "0px 0px -8% 0px" });
  const reduce = useReducedMotion();
  const go = now || seen;
  return (
    <span ref={ref} className={`block ${className}`}>
      {lines.map((l, i) => (
        <span key={i} className="block overflow-hidden pb-[0.04em]">
          <motion.span
            className="block"
            initial={reduce ? { opacity: 0 } : { y: "110%", rotate: 2 }}
            animate={go ? (reduce ? { opacity: 1 } : { y: 0, rotate: 0 }) : undefined}
            transition={{ duration: 1.1, ease: EASE, delay: delay + i * 0.09 }}
            style={{ transformOrigin: "0% 100%" }}
          >
            {l}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/** Small editorial label: (01) — Text */
export function Index({ n, children, className = "" }: { n?: string; children: React.ReactNode; className?: string }) {
  return (
    <p className={`flex items-center gap-3 ${MONO} ${className}`} style={{ color: FG.mute }}>
      {n && <span style={{ color: FG.heat }}>({n})</span>}
      <span className="h-px w-8" style={{ background: FG.line }} />
      {children}
    </p>
  );
}

export function Asterisk({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M10.6 0h2.8l-.4 9.1 7.7-4.9 1.4 2.4L14 10.8l8.1 4.2-1.4 2.4-7.7-4.9.4 9.1h-2.8l.4-9.1-7.7 4.9L1.9 15l8.1-4.2-8.1-4.2 1.4-2.4 7.7 4.9z" />
    </svg>
  );
}

/* ── Buttons ── */
type BtnProps = { children: React.ReactNode; href?: string; onClick?: () => void; variant?: "heat" | "line" | "bone"; className?: string; cursor?: string; disabled?: boolean };

export function Btn({ children, href, onClick, variant = "heat", className = "", cursor, disabled }: BtnProps) {
  const base = `group relative inline-flex h-14 items-center justify-center gap-3 overflow-hidden rounded-full px-7 text-[13px] font-semibold uppercase tracking-[0.14em] transition-colors duration-500 disabled:pointer-events-none disabled:opacity-40 ${className}`;
  const look =
    variant === "heat" ? "bg-[#FF4D2E] text-[#0B0B0B]" : variant === "bone" ? "bg-[#EDEAE4] text-[#0B0B0B]" : "border border-[#EDEAE4]/25 text-[#EDEAE4] hover:text-[#0B0B0B]";
  const fill = variant === "heat" ? "bg-[#EDEAE4]" : variant === "bone" ? "bg-[#FF4D2E]" : "bg-[#EDEAE4]";
  const inner = (
    <>
      <span className={`absolute inset-0 translate-y-full rounded-full transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-y-0 ${fill}`} />
      <span className="relative flex items-center gap-3">{children}</span>
    </>
  );
  if (href)
    return (
      <Link href={href} className={`${base} ${look}`} data-cursor={cursor}>
        {inner}
      </Link>
    );
  return (
    <button type="button" onClick={onClick} disabled={disabled} className={`${base} ${look}`} data-cursor={cursor}>
      {inner}
    </button>
  );
}

/* ── Paragraph that lights up word by word on scroll ── */
export function ScrollText({ text, accent = [], className = "" }: { text: string; accent?: string[]; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 50%"] });
  const words = text.split(" ");
  return (
    <p ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      {words.map((w, i) => (
        <Word key={i} word={w} p={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} accent={accent.includes(w.replace(/[.,]/g, ""))} />
      ))}
    </p>
  );
}

function Word({ word, p, range, accent }: { word: string; p: MotionValue<number>; range: [number, number]; accent: boolean }) {
  const opacity = useTransform(p, range, [0.12, 1]);
  return (
    <motion.span aria-hidden style={{ opacity, color: accent ? FG.heat : undefined }} className="mr-[0.24em] inline-block">
      {word}
    </motion.span>
  );
}

/* ── Status ── */
export function OpenBadge() {
  const status = useOpenStatus(HOURS);
  const dot = status ? (status.open ? "#4ADE80" : FG.heat) : FG.mute;
  return (
    <span className={`inline-flex items-center gap-2 ${MONO}`} style={{ color: FG.bone }}>
      <span className="relative flex size-2">
        {status?.open && <span className="absolute inline-flex size-full animate-ping rounded-full opacity-70" style={{ background: dot }} />}
        <span className="relative inline-flex size-2 rounded-full" style={{ background: dot }} />
      </span>
      {status ? status.label : "Open 6 am – 10 pm"}
    </span>
  );
}

/* ── Today's date in India as YYYY-MM-DD (null during server render) ── */
export function useTodayISO() {
  return useSyncExternalStore(
    () => () => {},
    () => new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata" }).format(new Date()),
    () => null,
  );
}

/* ── Media query (false during server render) ── */
export function useMedia(query: string) {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/* ── Demo actions ── */
export function useActions() {
  const { explain } = useDemo();
  return {
    call: () => explain({ title: "One tap to call the studio", body: "On your real website, this dials your front desk straight from the visitor's phone." }),
    join: (name: string, price: number, program?: string) =>
      explain({
        title: "Membership enquiries land on your WhatsApp",
        body: "On your real website, the chosen plan (and the program the quiz recommended) is sent to your number. You follow up while they're still excited.",
        message: `Hi FORGE! 🔥\nI'd like to join the ${name} membership (${inr(price)}/month)${program ? `\nRecommended program: ${program}` : ""}.\nCan we talk?`,
      }),
    coach: (name: string) =>
      explain({
        title: "Leads choose their coach",
        body: "On your real website, visitors can ask for a specific coach. The request reaches your WhatsApp with the coach's name.",
        message: `Hi FORGE! I'd love to book my free trial with ${name}. When is ${name.split(" ")[0]} available?`,
      }),
  };
}
