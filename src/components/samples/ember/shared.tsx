"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import Link from "next/link";
import { useRef, useSyncExternalStore } from "react";
import { useDemo } from "../shared/DemoProvider";
import { useOpenStatus } from "../shared/useOpenStatus";
import { EM, HOURS } from "./data";

/* ── Typography ── */
export const D = "[font-family:var(--em-display)]";
export const LABEL = "text-[11px] font-semibold uppercase tracking-[0.32em]";
export const EASE = [0.16, 1, 0.3, 1] as const;

/* ── Reveal on scroll ── */
export function Up({ children, delay = 0, className = "", y = 40 }: { children: React.ReactNode; delay?: number; className?: string; y?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1.2, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Headline whose words rise from behind a mask */
export function Rise({ text, className = "", delay = 0, inView = false }: { text: string; className?: string; delay?: number; inView?: boolean }) {
  const reduce = useReducedMotion();
  // Observe the visible wrapper: the words themselves start clipped (outside their mask),
  // so observing them directly would never report them as "in view".
  const ref = useRef<HTMLSpanElement>(null);
  const seen = useInView(ref, { once: true, margin: "0px 0px -8% 0px" });
  const go = !inView || seen;
  const words = text.split(" ");
  const hidden = reduce ? { opacity: 0 } : { y: "110%" };
  const shown = reduce ? { opacity: 1 } : { y: 0 };
  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      {words.map((w, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.1em] align-bottom">
          <motion.span
            className="inline-block"
            initial={hidden}
            animate={go ? shown : hidden}
            transition={{ duration: 1.1, ease: EASE, delay: delay + i * 0.06 }}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export function Label({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`flex items-center gap-3 ${LABEL} ${className}`} style={{ color: EM.gold }}>
      <span className="h-px w-8" style={{ background: EM.gold }} />
      {children}
    </p>
  );
}

/* ── Buttons ── */
type BtnProps = { children: React.ReactNode; href?: string; onClick?: () => void; variant?: "gold" | "line"; className?: string; cursor?: string };

export function Btn({ children, href, onClick, variant = "gold", className = "", cursor }: BtnProps) {
  const cls = `group relative inline-flex h-14 items-center justify-center gap-3 overflow-hidden rounded-full px-8 text-[13px] font-semibold uppercase tracking-[0.2em] transition-colors duration-500 ${
    variant === "gold" ? "text-[#0C0907]" : "border text-[#F3E9DC] hover:text-[#0C0907]"
  } ${className}`;
  const style = variant === "gold" ? { background: EM.gold } : { borderColor: "rgba(243,233,220,0.3)" };
  const inner = (
    <>
      <span className={`absolute inset-0 origin-bottom scale-y-0 transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-y-100 ${variant === "gold" ? "bg-[#F3E9DC]" : "bg-[#D9A55B]"}`} />
      <span className="relative flex items-center gap-3">{children}</span>
    </>
  );
  if (href)
    return (
      <Link href={href} className={cls} style={style} data-cursor={cursor}>
        {inner}
      </Link>
    );
  return (
    <button type="button" onClick={onClick} className={cls} style={style} data-cursor={cursor}>
      {inner}
    </button>
  );
}

/* ── Rising embers (CSS-only particles) ── */
const SPARKS = Array.from({ length: 22 }, (_, i) => ({
  left: (i * 37) % 100,
  size: 2 + ((i * 7) % 4),
  dur: 7 + ((i * 13) % 9),
  delay: -((i * 5) % 12),
  drift: ((i % 5) - 2) * 18,
}));

export function Embers({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden motion-reduce:hidden ${className}`}>
      {SPARKS.map((s, i) => (
        <span
          key={i}
          className="absolute bottom-[-10px] rounded-full [animation:em-rise_linear_infinite]"
          style={{
            left: `${s.left}%`,
            width: s.size,
            height: s.size,
            background: i % 3 ? EM.flame : EM.gold,
            boxShadow: `0 0 ${s.size * 4}px ${i % 3 ? EM.flame : EM.gold}`,
            animationDuration: `${s.dur}s`,
            animationDelay: `${s.delay}s`,
            ["--drift" as string]: `${s.drift}px`,
          }}
        />
      ))}
    </div>
  );
}

/* ── Status + marks ── */
export function OpenBadge() {
  const status = useOpenStatus(HOURS);
  const dot = status ? (status.open ? "#4ADE80" : EM.flame) : EM.gold;
  return (
    <span className="inline-flex items-center gap-2 text-[13px] font-medium" style={{ color: EM.cream }}>
      <span className="relative flex size-2">
        {status?.open && <span className="absolute inline-flex size-full animate-ping rounded-full opacity-70" style={{ background: dot }} />}
        <span className="relative inline-flex size-2 rounded-full" style={{ background: dot }} />
      </span>
      {status ? status.label : "Dinner · 7 pm onwards"}
    </span>
  );
}

export function DietMark({ veg }: { veg: boolean }) {
  const c = veg ? "#3FA34D" : "#C2412D";
  return (
    <span title={veg ? "Vegetarian" : "Non-vegetarian"} className="grid size-3.5 shrink-0 place-items-center rounded-[3px] border-[1.5px]" style={{ borderColor: c }}>
      {veg ? <span className="size-1.5 rounded-full" style={{ background: c }} /> : <span className="size-0 border-x-[3.5px] border-b-[6px] border-x-transparent" style={{ borderBottomColor: c }} />}
    </span>
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

/* ── Demo explanations ── */
export function useExplain() {
  const { explain } = useDemo();
  return {
    call: () => explain({ title: "One tap to call", body: "On your real website, this dials your restaurant directly from the guest's phone." }),
    event: (title: string) =>
      explain({
        title: "Event bookings on WhatsApp",
        body: "On your real website, guests reserve event seats in one tap. You get the request on WhatsApp and confirm it.",
        message: `Hi Ember! I'd like 2 seats for "${title}". Please confirm availability.`,
      }),
  };
}
