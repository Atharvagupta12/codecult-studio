"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import Link from "next/link";
import { useRef } from "react";
import { useDemo } from "../shared/DemoProvider";
import { useOpenStatus } from "../shared/useOpenStatus";
import { HOURS, KJ, inr, priceOf, type Piece } from "./data";

export const SERIF = "[font-family:var(--kj-serif)]";
export const LABEL = "text-[11px] font-medium uppercase tracking-[0.32em]";
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
        <span key={i} className="block overflow-hidden pb-[0.1em]">
          <motion.span className="block" initial={reduce ? { opacity: 0 } : { y: "110%" }} animate={go ? (reduce ? { opacity: 1 } : { y: 0 }) : undefined} transition={{ duration: 1.2, ease: EASE, delay: delay + i * 0.1 }}>
            {l}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/** Small gold ornament used as a divider */
export function Ornament({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 12" className={className} fill="none" aria-hidden>
      <path d="M0 6h48M72 6h48" stroke={KJ.gold} strokeWidth="1" />
      <path d="M60 0l6 6-6 6-6-6 6-6Z" fill={KJ.gold} />
      <circle cx="50" cy="6" r="1.5" fill={KJ.gold} />
      <circle cx="70" cy="6" r="1.5" fill={KJ.gold} />
    </svg>
  );
}

export function Eyebrow({ children, className = "", center = false }: { children: React.ReactNode; className?: string; center?: boolean }) {
  return (
    <div className={`flex flex-col gap-3 ${center ? "items-center" : "items-start"} ${className}`}>
      <p className={LABEL} style={{ color: KJ.gold }}>
        {children}
      </p>
      <Ornament className="h-3 w-24" />
    </div>
  );
}

type BtnProps = { children: React.ReactNode; href?: string; onClick?: () => void; variant?: "gold" | "line"; className?: string; disabled?: boolean };

export function Btn({ children, href, onClick, variant = "gold", className = "", disabled }: BtnProps) {
  const cls = `group relative inline-flex h-14 items-center justify-center gap-3 overflow-hidden px-8 text-[12px] font-medium uppercase tracking-[0.24em] transition-colors duration-500 disabled:pointer-events-none disabled:opacity-40 ${
    variant === "gold" ? "text-[#15110D]" : "border border-[#D4A84B]/50 text-[#F3E3C3] hover:text-[#15110D]"
  } ${className}`;
  const inner = (
    <>
      <span className={`absolute inset-0 ${variant === "gold" ? "bg-gradient-to-r from-[#B88A33] via-[#F0CF86] to-[#B88A33] bg-[length:200%_100%] transition-[background-position] duration-700 group-hover:bg-[position:100%_0]" : "origin-left scale-x-0 bg-[#D4A84B] transition-transform duration-500 group-hover:scale-x-100"}`} />
      <span className="relative flex items-center gap-3">{children}</span>
    </>
  );
  if (href)
    return (
      <Link href={href} className={cls}>
        {inner}
      </Link>
    );
  return (
    <button type="button" onClick={onClick} disabled={disabled} className={cls}>
      {inner}
    </button>
  );
}

/** Moving gold sheen over an image */
export function Shimmer({ className = "" }: { className?: string }) {
  return <span aria-hidden className={`pointer-events-none absolute inset-0 bg-[linear-gradient(110deg,transparent_30%,rgba(240,207,134,0.35)_45%,rgba(255,240,200,0.55)_50%,rgba(240,207,134,0.35)_55%,transparent_70%)] bg-[length:250%_100%] mix-blend-soft-light animate-[kj-sheen_5s_ease-in-out_infinite] motion-reduce:hidden ${className}`} />;
}

export function OpenBadge() {
  const status = useOpenStatus(HOURS);
  const dot = status ? (status.open ? "#7BD88F" : "#E07A5F") : KJ.gold;
  return (
    <span className="inline-flex items-center gap-2 text-[12px] tracking-[0.08em]" style={{ color: KJ.cream }}>
      <span className="relative flex size-2">
        {status?.open && <span className="absolute inline-flex size-full animate-ping rounded-full opacity-70" style={{ background: dot }} />}
        <span className="relative inline-flex size-2 rounded-full" style={{ background: dot }} />
      </span>
      {status ? status.label : "Open 11 am – 9 pm"}
    </span>
  );
}

export function useActions() {
  const { explain } = useDemo();
  return {
    enquire: (p: Piece) =>
      explain({
        title: "Product enquiries straight to your WhatsApp",
        body: "On your real website, the customer's chosen piece, its weight and estimated price arrive on your WhatsApp with a photo link. You reply with availability.",
        message: `Hi Kalaa Jewels! ✨\nI'm interested in the ${p.name} (${p.weight} g, approx. ${inr(priceOf(p))}).\nIs it available to see in store this weekend?`,
      }),
    send: (title: string, message: string) =>
      explain({ title, body: "On your real website, this arrives on your WhatsApp, already typed. One reply and the customer is on their way to your store.", message }),
    call: () => explain({ title: "One tap to call the store", body: "On your real website, this dials your showroom straight from the customer's phone." }),
  };
}
