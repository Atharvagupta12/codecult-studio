"use client";

import { motion, useReducedMotion } from "motion/react";
import { usePathname } from "next/navigation";

/** kabir.dev page change: a quick terminal "cd" flash, then the page fades up. */
export default function KabirTemplate({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  const pathname = usePathname();
  const path = "~" + pathname.replace("/samples/kabir-rao", "");
  return (
    <>
      {!reduce && (
        <motion.div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[65] grid place-items-center bg-[#0B0F14]"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.45, delay: 0.35, ease: "easeOut" }}
        >
          <span className="text-[15px] text-[#8B949E] [font-family:var(--kr-mono)]">
            <span className="text-[#3FB950]">$</span> cd <span className="text-[#E6EDF3]">{path}</span>
            <span className="ml-1 inline-block h-[1em] w-[0.55em] translate-y-[2px] animate-[kr-blink_1s_steps(1)_infinite] bg-[#3FB950]" />
          </span>
        </motion.div>
      )}
      <motion.div initial={{ opacity: 0, y: reduce ? 0 : 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: reduce ? 0 : 0.3 }}>
        {children}
      </motion.div>
    </>
  );
}
