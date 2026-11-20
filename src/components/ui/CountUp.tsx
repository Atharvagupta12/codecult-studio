"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const fmt = (n: number) => "₹" + Math.round(n).toLocaleString("en-IN");

/** Counts up to a rupee amount when scrolled into view. */
export function CountUp({ to, className }: { to: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const [val, setVal] = useState(to);

  useEffect(() => {
    if (!inView || reduce) return;
    const c = animate(Math.round(to * 0.6), to, { duration: 1.6, ease: [0.16, 1, 0.3, 1], onUpdate: setVal });
    return () => c.stop();
  }, [inView, reduce, to]);

  return (
    <span ref={ref} className={className}>
      {fmt(val)}
    </span>
  );
}
