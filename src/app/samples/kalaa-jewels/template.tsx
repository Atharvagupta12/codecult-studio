"use client";

import { motion, useReducedMotion } from "motion/react";

/** Kalaa page change: a thin gold line draws across, then the page fades in. */
export default function KalaaTemplate({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <>
      {!reduce && (
        <motion.span
          aria-hidden
          className="pointer-events-none fixed left-0 top-0 z-[65] h-[2px] bg-gradient-to-r from-transparent via-[#F0CF86] to-transparent"
          initial={{ width: "0%", opacity: 1 }}
          animate={{ width: "100%", opacity: 0 }}
          transition={{ width: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }, opacity: { duration: 0.4, delay: 0.7 } }}
        />
      )}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9, ease: "easeOut" }}>
        {children}
      </motion.div>
    </>
  );
}
