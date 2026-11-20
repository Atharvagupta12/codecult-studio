"use client";

import { motion, useReducedMotion } from "motion/react";
import { usePathname } from "next/navigation";
import { PAGES } from "@/components/samples/aarav-mehta/data";

/** Camera-shutter page change: two blades open from the middle, with a frame label. */
export default function AaravTemplate({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  const pathname = usePathname();
  const page = [...PAGES].reverse().find((p) => pathname.startsWith(p.href)) ?? PAGES[0];
  const blade = { duration: 0.9, ease: [0.76, 0, 0.24, 1] as const, delay: 0.35 };
  return (
    <>
      {!reduce && (
        <div aria-hidden className="pointer-events-none fixed inset-0 z-[65]">
          <motion.div className="absolute inset-x-0 top-0 h-1/2 bg-[#0A0A0A]" initial={{ y: "0%" }} animate={{ y: "-100%" }} transition={blade} />
          <motion.div className="absolute inset-x-0 bottom-0 h-1/2 bg-[#0A0A0A]" initial={{ y: "0%" }} animate={{ y: "100%" }} transition={blade} />
          <motion.p
            className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center text-[11px] uppercase tracking-[0.3em] text-[#D9B97A] [font-family:var(--am-mono)]"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            Frame {page.n} · {page.label}
          </motion.p>
        </div>
      )}
      {children}
    </>
  );
}
