"use client";

import { motion, useReducedMotion } from "motion/react";

/** Mehr page change: two silk curtains part from the middle, revealing the page. */
export default function MehrTemplate({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  const silk = { duration: 1.1, ease: [0.76, 0, 0.24, 1] as const, delay: 0.3 };
  return (
    <>
      {!reduce && (
        <div aria-hidden className="pointer-events-none fixed inset-0 z-[65]">
          <motion.div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-[#2A0E16] to-[#3B1420]" initial={{ x: "0%" }} animate={{ x: "-100%" }} transition={silk} />
          <motion.div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-[#2A0E16] to-[#3B1420]" initial={{ x: "0%" }} animate={{ x: "100%" }} transition={silk} />
          <motion.span
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[56px] italic text-[#E7B59E] [font-family:var(--mb-serif)]"
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 0, scale: 1.15 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            M
          </motion.span>
        </div>
      )}
      {children}
    </>
  );
}
