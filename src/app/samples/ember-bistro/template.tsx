"use client";

import { motion, useReducedMotion } from "motion/react";

/** Curtain transition: a dark panel with the wordmark lifts away on every page. */
export default function EmberTemplate({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <>
      {!reduce && (
        <motion.div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[65] grid place-items-center"
          style={{ background: "#0C0907" }}
          initial={{ y: "0%" }}
          animate={{ y: "-100%" }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.45 }}
        >
          <motion.span
            className="flex items-center gap-3 text-[#F3E9DC] [font-family:var(--em-display)]"
            initial={{ opacity: 0, letterSpacing: "0.2em" }}
            animate={{ opacity: 1, letterSpacing: "0.55em" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="size-2 rounded-full bg-[#E2622B]" />
            <span className="text-[28px] uppercase">Ember</span>
          </motion.span>
          <motion.span className="absolute bottom-0 left-0 h-[2px] bg-[#D9A55B]" initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 0.6, ease: "easeInOut" }} />
        </motion.div>
      )}
      {children}
    </>
  );
}
