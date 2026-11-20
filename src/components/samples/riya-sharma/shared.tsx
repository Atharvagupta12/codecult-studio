"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { useDemo } from "../shared/DemoProvider";
import { RS, WA_MESSAGE } from "./data";

export const SERIF = "[font-family:var(--rs-serif)] font-normal";
export const HAND = "[font-family:var(--rs-hand)]";
export const EASE = [0.16, 1, 0.3, 1] as const;

/* ── Reveal ── */
export function Up({ children, delay = 0, className = "", y = 30 }: { children: React.ReactNode; delay?: number; className?: string; y?: number }) {
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

export function Label({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.16em] ${className}`} style={{ color: RS.mute }}>
      <Sparkle className="size-3.5 text-[#6C47FF]" />
      {children}
    </p>
  );
}

/* ── Hand-drawn scribbles (draw themselves when seen) ── */
function useDraw() {
  const ref = useRef<SVGSVGElement>(null);
  const seen = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  return { ref, go: seen || !!reduce };
}

export function ScribbleCircle({ className = "", color = RS.violet, delay = 0.4 }: { className?: string; color?: string; delay?: number }) {
  const { ref, go } = useDraw();
  return (
    <svg ref={ref} viewBox="0 0 220 90" preserveAspectRatio="none" fill="none" className={`pointer-events-none absolute overflow-visible ${className}`} aria-hidden>
      <motion.path
        d="M118 8C70 4 14 14 8 42c-6 30 64 42 116 40 52-2 92-14 90-38-2-26-58-38-120-32-24 2-46 8-60 16"
        stroke={color}
        strokeWidth={3}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: go ? 1 : 0 }}
        transition={{ duration: 1.2, ease: "easeInOut", delay }}
      />
    </svg>
  );
}

export function ScribbleUnderline({ className = "", color = RS.violet, delay = 0.3 }: { className?: string; color?: string; delay?: number }) {
  const { ref, go } = useDraw();
  return (
    <svg ref={ref} viewBox="0 0 200 20" preserveAspectRatio="none" fill="none" className={`pointer-events-none absolute overflow-visible ${className}`} aria-hidden>
      <motion.path d="M3 14c40-8 90-12 194-6" stroke={color} strokeWidth={4} strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: go ? 1 : 0 }} transition={{ duration: 0.8, ease: "easeOut", delay }} />
    </svg>
  );
}

export function ScribbleArrow({ className = "", color = RS.ink, delay = 0.6, flip = false }: { className?: string; color?: string; delay?: number; flip?: boolean }) {
  const { ref, go } = useDraw();
  return (
    <svg ref={ref} viewBox="0 0 90 70" fill="none" className={`pointer-events-none overflow-visible ${className}`} style={flip ? { transform: "scaleX(-1)" } : undefined} aria-hidden>
      <motion.path d="M6 8c26 0 56 10 66 44" stroke={color} strokeWidth={2.5} strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: go ? 1 : 0 }} transition={{ duration: 0.8, ease: "easeOut", delay }} />
      <motion.path d="M60 44l12 10 6-15" stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: go ? 1 : 0 }} transition={{ duration: 0.3, delay: delay + 0.7 }} />
    </svg>
  );
}

export function Sparkle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12 0c.6 6.4 3.6 9.6 12 12-8.4 2.4-11.4 5.6-12 12-.6-6.4-3.6-9.6-12-12C8.4 9.6 11.4 6.4 12 0Z" />
    </svg>
  );
}

/* ── Buttons ── */
export function Pill({ children, href, onClick, dark = true, className = "" }: { children: React.ReactNode; href?: string; onClick?: () => void; dark?: boolean; className?: string }) {
  const cls = `group inline-flex h-14 items-center gap-3 rounded-full px-7 text-[16px] font-medium transition-all duration-300 hover:-translate-y-0.5 ${
    dark ? "bg-[#161616] text-white hover:bg-[#6C47FF] hover:shadow-[0_16px_30px_-12px_rgba(108,71,255,0.7)]" : "border border-[#161616]/20 bg-white/50 hover:border-[#161616]"
  } ${className}`;
  if (href)
    return (
      <a href={href} className={cls}>
        {children}
      </a>
    );
  return (
    <button type="button" onClick={onClick} className={cls}>
      {children}
    </button>
  );
}

/* ── Demo actions ── */
export function useActions() {
  const { explain } = useDemo();
  return {
    contact: (name = "", need = "Brand identity", budget = "₹15k – ₹30k") =>
      explain({
        title: "Project enquiries straight to your WhatsApp",
        body: "On your real portfolio, the visitor's name, what they need and their budget arrive on your WhatsApp, already typed. You reply while they're still excited.",
        message: WA_MESSAGE(name, need, budget),
      }),
  };
}
