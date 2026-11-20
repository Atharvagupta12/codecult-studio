"use client";

import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useDemo } from "../shared/DemoProvider";
import { fmtTime } from "../shared/indiaTime";
import { useOpenStatus } from "../shared/useOpenStatus";
import { DAYS, HOURS, IP, WA_TRIAL, inr, type Slot } from "./data";

export const D = "[font-family:var(--ip-display)] uppercase";
export const EASE = [0.16, 1, 0.3, 1] as const;
export const LABEL = "text-[12px] font-bold uppercase tracking-[0.2em]";

/* ── Reveal ── */
export function Up({ children, delay = 0, className = "", y = 40 }: { children: React.ReactNode; delay?: number; className?: string; y?: number }) {
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

/** Heading lines that slam up from behind a mask when scrolled into view */
export function Slam({ lines, className = "", delay = 0 }: { lines: React.ReactNode[]; className?: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const seen = useInView(ref, { once: true, margin: "0px 0px -8% 0px" });
  const reduce = useReducedMotion();
  return (
    <span ref={ref} className={`block ${className}`}>
      {lines.map((l, i) => (
        <span key={i} className="block overflow-hidden">
          <motion.span
            className="block"
            initial={reduce ? { opacity: 0 } : { y: "105%" }}
            animate={seen ? (reduce ? { opacity: 1 } : { y: 0 }) : undefined}
            transition={{ duration: 0.8, ease: EASE, delay: delay + i * 0.08 }}
          >
            {l}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export function Kicker({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`flex items-center gap-3 ${LABEL} ${className}`} style={{ color: IP.lime }}>
      <span className="size-2" style={{ background: IP.lime }} />
      {children}
    </p>
  );
}

/* ── Buttons ── */
type BtnProps = { children: React.ReactNode; href?: string; onClick?: () => void; variant?: "lime" | "ghost"; className?: string };

export function Btn({ children, href, onClick, variant = "lime", className = "" }: BtnProps) {
  const cls = `group relative inline-flex h-14 items-center justify-center gap-3 overflow-hidden px-7 text-[14px] font-extrabold uppercase tracking-[0.12em] transition-colors [clip-path:polygon(0_0,100%_0,100%_calc(100%-14px),calc(100%-14px)_100%,0_100%)] ${
    variant === "lime" ? "bg-[#E5FF3D] text-[#0A0A0A]" : "bg-white/[0.07] text-white ring-1 ring-inset ring-white/20 hover:text-[#0A0A0A]"
  } ${className}`;
  const inner = (
    <>
      <span className={`absolute inset-0 -translate-x-[101%] transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-0 ${variant === "lime" ? "bg-white" : "bg-[#E5FF3D]"}`} />
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
    <button type="button" onClick={onClick} className={cls}>
      {inner}
    </button>
  );
}

/* ── Logo ── */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2 ${className}`}>
      <svg viewBox="0 0 32 24" className="h-6 w-8" aria-hidden>
        <path d="M0 24 L11 4 L17 14 L21 8 L32 24 Z" fill={IP.lime} />
        <path d="M11 4 L14 9.5 L11 8 L8 9.5 Z" fill="#0A0A0A" />
      </svg>
      <span className={`${D} text-[26px] leading-none tracking-[0.01em]`}>Ironpeak</span>
    </span>
  );
}

/* ── Status ── */
export function OpenBadge() {
  const status = useOpenStatus(HOURS);
  const dot = status ? (status.open ? IP.lime : IP.red) : IP.lime;
  return (
    <span className="inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.08em]">
      <span className="relative flex size-2">
        {status?.open && <span className="absolute inline-flex size-full animate-ping rounded-full opacity-70" style={{ background: dot }} />}
        <span className="relative inline-flex size-2 rounded-full" style={{ background: dot }} />
      </span>
      {status ? status.label : "Open 5 am – 11 pm"}
    </span>
  );
}

/* ── Counter ── */
export function Counter({ to, suffix = "", className = "" }: { to: number; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const seen = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const mv = useMotionValue(reduce ? to : 0);
  const text = useTransform(mv, (v) => Math.round(v).toLocaleString("en-IN") + suffix);
  useEffect(() => {
    if (!seen || reduce) return;
    const c = animate(mv, to, { duration: 1.8, ease: EASE });
    return () => c.stop();
  }, [seen, reduce, to, mv]);
  return (
    <motion.span ref={ref} className={className}>
      {text}
    </motion.span>
  );
}

/* ── Before / after slider ── */
export function BeforeAfter({ before, after, alt, className = "" }: { before: string; after: string; alt: string; className?: string }) {
  const [pos, setPos] = useState(50);
  const [drag, setDrag] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const move = (x: number) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setPos(Math.min(96, Math.max(4, ((x - r.left) / r.width) * 100)));
  };
  return (
    <div
      ref={ref}
      className={`relative cursor-ew-resize select-none overflow-hidden [touch-action:pan-y] ${className}`}
      onPointerDown={(e) => {
        setDrag(true);
        e.currentTarget.setPointerCapture(e.pointerId);
        move(e.clientX);
      }}
      onPointerMove={(e) => drag && move(e.clientX)}
      onPointerUp={() => setDrag(false)}
      onPointerCancel={() => setDrag(false)}
    >
      <Image src={after} alt={`${alt}, after`} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" draggable={false} />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Image src={before} alt={`${alt}, before`} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover grayscale-[0.6] brightness-[0.8]" draggable={false} />
      </div>
      <span className={`${LABEL} absolute left-4 top-4 bg-black/70 px-3 py-1.5 text-white backdrop-blur`}>Before</span>
      <span className={`${LABEL} absolute right-4 top-4 px-3 py-1.5 text-black`} style={{ background: IP.lime }}>
        After
      </span>
      <div className="pointer-events-none absolute inset-y-0 w-[3px] -translate-x-1/2" style={{ left: `${pos}%`, background: IP.lime }}>
        <span className="absolute left-1/2 top-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full text-[18px] font-black text-black shadow-[0_0_0_6px_rgba(229,255,61,0.25)]" style={{ background: IP.lime }}>
          ⟷
        </span>
      </div>
      <input
        type="range"
        min={4}
        max={96}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label="Compare before and after"
        className="sr-only"
      />
    </div>
  );
}

/* ── Demo actions ── */
export function useActions() {
  const { explain } = useDemo();
  return {
    trial: () =>
      explain({
        title: "Trial requests come straight to your WhatsApp",
        body: "On your real website, this opens WhatsApp with the trial request already filled in. You reply, they show up. No forms, no missed leads.",
        message: WA_TRIAL,
      }),
    reserve: (s: Slot, day: number) =>
      explain({
        title: "Class reservations on WhatsApp",
        body: "On your real website, members reserve a spot in one tap. You see exactly which class and time they want.",
        message: `Hi IRONPEAK! 💪\nPlease reserve my spot:\n${s.name} with ${s.coach}\n${DAYS[day]}, ${fmtTime(s.start)}\nName: Aditya`,
      }),
    join: (name: string, price: number) =>
      explain({
        title: "New memberships land on your WhatsApp",
        body: "On your real website, the chosen plan and price are sent to your number. You confirm, collect payment and they start training.",
        message: `Hi IRONPEAK! 🔥\nI'd like to join the ${name} plan (${inr(price)}/month).\nWhen can I start?`,
      }),
    call: () => explain({ title: "One tap to call the front desk", body: "On your real website, this dials your gym straight from the visitor's phone." }),
  };
}
