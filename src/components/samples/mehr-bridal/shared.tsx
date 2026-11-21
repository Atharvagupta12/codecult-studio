"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import Link from "next/link";
import { useRef } from "react";
import { useDemo } from "../shared/DemoProvider";
import { MB } from "./data";

export const SERIF = "[font-family:var(--mb-serif)]";
export const LABEL = "text-[11px] font-medium uppercase tracking-[0.3em]";
export const EASE = [0.16, 1, 0.3, 1] as const;

export function Up({ children, delay = 0, className = "", y = 36 }: { children: React.ReactNode; delay?: number; className?: string; y?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div className={className} initial={reduce ? { opacity: 0 } : { opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "0px 0px -10% 0px" }} transition={{ duration: 1.2, ease: EASE, delay }}>
      {children}
    </motion.div>
  );
}

export function Lines({ lines, className = "", delay = 0, now = false }: { lines: React.ReactNode[]; className?: string; delay?: number; now?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const seen = useInView(ref, { once: true, margin: "0px 0px -8% 0px" });
  const reduce = useReducedMotion();
  const go = now || seen;
  return (
    <span ref={ref} className={`block ${className}`}>
      {lines.map((l, i) => (
        <span key={i} className="block overflow-hidden pb-[0.12em]">
          <motion.span className="block" initial={reduce ? { opacity: 0 } : { y: "110%" }} animate={go ? (reduce ? { opacity: 1 } : { y: 0 }) : undefined} transition={{ duration: 1.3, ease: EASE, delay: delay + i * 0.12 }}>
            {l}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export function Kicker({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`flex items-center gap-3 ${LABEL} ${className}`} style={{ color: MB.rose }}>
      <span className="text-[14px]">✿</span>
      {children}
    </p>
  );
}

/* ── Falling petals (CSS only) ── */
const PETALS = Array.from({ length: 18 }, (_, i) => ({
  left: (i * 53) % 100,
  size: 8 + ((i * 7) % 9),
  dur: 11 + ((i * 13) % 10),
  delay: -((i * 3.7) % 18),
  drift: ((i % 5) - 2) * 45,
}));

export function Petals({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden motion-reduce:hidden ${className}`}>
      {PETALS.map((p, i) => (
        <span
          key={i}
          className="absolute -top-6 [animation:mb-fall_linear_infinite]"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 0.75,
            borderRadius: "70% 0 70% 0",
            background: i % 3 ? "linear-gradient(135deg,#F3B8B0,#C9707A)" : "linear-gradient(135deg,#F7E7DF,#E7B59E)",
            opacity: 0.8,
            animationDuration: `${p.dur}s`,
            animationDelay: `${p.delay}s`,
            ["--drift" as string]: `${p.drift}px`,
          }}
        />
      ))}
    </div>
  );
}

type BtnProps = { children: React.ReactNode; href?: string; onClick?: () => void; variant?: "rose" | "line"; className?: string; cursor?: string; disabled?: boolean };

export function Btn({ children, href, onClick, variant = "rose", className = "", cursor, disabled }: BtnProps) {
  const cls = `group relative inline-flex h-14 items-center justify-center gap-3 overflow-hidden rounded-full px-8 text-[13px] font-medium uppercase tracking-[0.2em] transition-colors duration-500 disabled:pointer-events-none disabled:opacity-40 ${
    variant === "rose" ? "bg-[#E7B59E] text-[#1A0A0E]" : "border border-[#E7B59E]/50 text-[#F7E7DF] hover:text-[#1A0A0E]"
  } ${className}`;
  const inner = (
    <>
      <span className={`absolute inset-0 scale-0 rounded-full transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.6] ${variant === "rose" ? "bg-[#F7E7DF]" : "bg-[#E7B59E]"}`} />
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
    <button type="button" onClick={onClick} disabled={disabled} className={cls} data-cursor={cursor}>
      {inner}
    </button>
  );
}

export function useActions() {
  const { explain } = useDemo();
  return {
    send: (title: string, message: string) =>
      explain({ title, body: "On your real website, this arrives on your WhatsApp with every detail typed out. One reply and the bride is booked.", message }),
    instagram: () => explain({ title: "Opens your Instagram", body: "On your real website, this opens your Instagram so brides can binge your latest looks." }),
  };
}
