"use client";

import { motion, useReducedMotion } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Fades + lifts its children in when they scroll into view. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "li" | "span";
}) {
  const reduce = useReducedMotion();
  const M = motion[as];
  return (
    <M
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 1, ease: EASE, delay }}
    >
      {children}
    </M>
  );
}

/** Splits a line into words that rise from behind a mask. */
export function RiseText({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      {words.map((w, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <motion.span
            className="inline-block"
            initial={reduce ? { opacity: 0 } : { y: "105%" }}
            whileInView={reduce ? { opacity: 1 } : { y: 0 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 0.9, ease: EASE, delay: delay + i * 0.05 }}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
