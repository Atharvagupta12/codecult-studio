"use client";

import { motion, useReducedMotion } from "motion/react";

/** IRONPEAK page change: a lime slash wipes across, then the page rises in. */
export default function IronpeakTemplate({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <>
      {!reduce && (
        <motion.div
          aria-hidden
          className="pointer-events-none fixed inset-y-0 left-0 z-[65] w-[140vw] -skew-x-12"
          style={{ background: "#E5FF3D" }}
          initial={{ x: "-10vw" }}
          animate={{ x: "120vw" }}
          transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
        />
      )}
      <motion.div initial={{ opacity: 0, y: reduce ? 0 : 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: reduce ? 0 : 0.2 }}>
        {children}
      </motion.div>
    </>
  );
}
