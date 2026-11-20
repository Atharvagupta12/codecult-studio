"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useDemo } from "../shared/DemoProvider";
import { EMAIL, KR } from "./data";

export const MONO = "[font-family:var(--kr-mono)]";
export const EASE = [0.16, 1, 0.3, 1] as const;

/* ── Reveal ── */
export function Up({ children, delay = 0, className = "", y = 24 }: { children: React.ReactNode; delay?: number; className?: string; y?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.8, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Section label written like a code comment */
export function Comment({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`${MONO} text-[13px] ${className}`} style={{ color: KR.mute }}>
      <span style={{ color: KR.green }}>{"//"}</span> {children}
    </p>
  );
}

/** Text that types itself when scrolled into view */
export function Typed({ text, className = "", speed = 28, delay = 0, caret = true }: { text: string; className?: string; speed?: number; delay?: number; caret?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const seen = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!seen || reduce) return;
    let i = 0;
    let t: ReturnType<typeof setTimeout>;
    const tick = () => {
      i++;
      setN(i);
      if (i < text.length) t = setTimeout(tick, speed);
    };
    t = setTimeout(tick, delay);
    return () => clearTimeout(t);
  }, [seen, reduce, text, speed, delay]);
  const shown = reduce ? text : text.slice(0, n);
  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden>{shown}</span>
      {caret && <span aria-hidden className="ml-0.5 inline-block w-[0.5em] animate-[kr-blink_1s_steps(1)_infinite] bg-current align-[-0.1em]" style={{ height: "1em", background: KR.green }} />}
    </span>
  );
}

/* ── Buttons ── */
type BtnProps = { children: React.ReactNode; href?: string; onClick?: () => void; variant?: "green" | "ghost"; className?: string };

export function Btn({ children, href, onClick, variant = "green", className = "" }: BtnProps) {
  const cls = `group inline-flex h-12 items-center justify-center gap-2.5 rounded-lg px-5 text-[14px] font-medium transition-all duration-300 ${
    variant === "green"
      ? "bg-[#3FB950] text-[#0B0F14] shadow-[0_0_0_0_rgba(63,185,80,0)] hover:shadow-[0_0_30px_-4px_rgba(63,185,80,0.6)]"
      : "border border-[#E6EDF3]/15 bg-white/[0.03] text-[#E6EDF3] hover:border-[#3FB950]/60 hover:text-[#3FB950]"
  } ${className}`;
  if (href)
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  return (
    <button type="button" onClick={onClick} className={cls}>
      {children}
    </button>
  );
}

export function StackTag({ children, active = false }: { children: React.ReactNode; active?: boolean }) {
  return (
    <span className={`${MONO} rounded-md border px-2 py-0.5 text-[11px]`} style={{ borderColor: active ? KR.green : KR.line, color: active ? KR.green : KR.mute }}>
      {children}
    </span>
  );
}

export function OpenToWork({ className = "" }: { className?: string }) {
  return (
    <span className={`${MONO} inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[12px] ${className}`} style={{ borderColor: `${KR.green}55`, color: KR.green, background: `${KR.green}12` }}>
      <span className="relative flex size-2">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#3FB950] opacity-70" />
        <span className="relative inline-flex size-2 rounded-full bg-[#3FB950]" />
      </span>
      open to work
    </span>
  );
}

/* ── Demo actions ── */
export function useActions() {
  const { explain } = useDemo();
  return {
    resume: () =>
      explain({
        title: "One-click resume download",
        body: "On your real portfolio, this downloads your latest PDF resume instantly. Recruiters love not having to ask for it.",
      }),
    hire: (msg?: string) =>
      explain({
        title: "Leads and recruiters reach you on WhatsApp",
        body: "On your real portfolio, the enquiry arrives on your WhatsApp with everything filled in. Reply in seconds, close faster.",
        message: msg ?? "Hi Kabir! 👋\nI saw your portfolio and I'd love to talk about a project.\nAre you free for a quick call this week?",
      }),
    external: (what: string) =>
      explain({
        title: `Opens ${what}`,
        body: `On your real portfolio, this opens your ${what} in a new tab so visitors can dig deeper into your work.`,
      }),
    copyEmail: () => {
      navigator.clipboard?.writeText(EMAIL).catch(() => {});
    },
  };
}
