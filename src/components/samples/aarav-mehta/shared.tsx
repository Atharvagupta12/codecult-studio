"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import Link from "next/link";
import { useRef } from "react";
import { useDemo } from "../shared/DemoProvider";
import { AM } from "./data";

export const SERIF = "[font-family:var(--am-serif)] font-normal";
export const MONO = "[font-family:var(--am-mono)] text-[11px] uppercase tracking-[0.18em]";
export const EASE = [0.16, 1, 0.3, 1] as const;

export function Up({ children, delay = 0, className = "", y = 36 }: { children: React.ReactNode; delay?: number; className?: string; y?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1.1, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Lines that rise from a mask; `now` for heroes, otherwise on scroll */
export function Lines({ lines, className = "", delay = 0, now = false }: { lines: React.ReactNode[]; className?: string; delay?: number; now?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const seen = useInView(ref, { once: true, margin: "0px 0px -8% 0px" });
  const reduce = useReducedMotion();
  const go = now || seen;
  return (
    <span ref={ref} className={`block ${className}`}>
      {lines.map((l, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em]">
          <motion.span className="block" initial={reduce ? { opacity: 0 } : { y: "110%" }} animate={go ? (reduce ? { opacity: 1 } : { y: 0 }) : undefined} transition={{ duration: 1.2, ease: EASE, delay: delay + i * 0.1 }}>
            {l}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export function Caption({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`flex items-center gap-3 ${MONO} ${className}`} style={{ color: AM.mute }}>
      <span className="h-px w-8" style={{ background: AM.gold }} />
      {children}
    </p>
  );
}

type BtnProps = { children: React.ReactNode; href?: string; onClick?: () => void; variant?: "ivory" | "line" | "gold"; className?: string; cursor?: string; type?: "button" | "submit"; disabled?: boolean };

export function Btn({ children, href, onClick, variant = "ivory", className = "", cursor, type = "button", disabled }: BtnProps) {
  const cls = `group relative inline-flex h-14 items-center justify-center gap-3 overflow-hidden rounded-full px-8 text-[14px] font-medium tracking-[0.02em] transition-colors duration-500 disabled:pointer-events-none disabled:opacity-40 ${
    variant === "ivory" ? "bg-[#F2EDE4] text-[#0A0A0A]" : variant === "gold" ? "bg-[#D9B97A] text-[#0A0A0A]" : "border border-[#F2EDE4]/25 text-[#F2EDE4] hover:text-[#0A0A0A]"
  } ${className}`;
  const inner = (
    <>
      <span className={`absolute inset-0 origin-left scale-x-0 rounded-full transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-x-100 ${variant === "line" ? "bg-[#F2EDE4]" : variant === "gold" ? "bg-[#F2EDE4]" : "bg-[#D9B97A]"}`} />
      <span className="relative flex items-center gap-3">{children}</span>
    </>
  );
  if (href)
    return (
      <Link href={href} className={cls} data-cursor={cursor}>
        {inner}
      </Link>
    );
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={cls} data-cursor={cursor}>
      {inner}
    </button>
  );
}

export function useActions() {
  const { explain } = useDemo();
  return {
    enquire: (message: string, title = "Enquiries land straight on your WhatsApp") =>
      explain({
        title,
        body: "On your real website, the couple's details arrive on your WhatsApp, already typed. You reply while they're still dreaming about their day.",
        message,
      }),
    instagram: () => explain({ title: "Opens your Instagram", body: "On your real website, this opens your Instagram profile so couples can see your latest work." }),
  };
}
