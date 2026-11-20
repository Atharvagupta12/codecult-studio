"use client";

import { motion, useReducedMotion } from "motion/react";
import { usePathname } from "next/navigation";
import { PAGES } from "@/components/samples/forge-athletics/data";

/** FORGE page change: an orange curtain with the page name sweeps up and away. */
export default function ForgeTemplate({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  const pathname = usePathname();
  const page = PAGES.find((p) => p.href === pathname) ?? PAGES[0];
  return (
    <>
      {!reduce && (
        <motion.div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[65] flex items-end justify-between p-5 text-[#0B0B0B] sm:p-8"
          style={{ background: "#FF4D2E" }}
          initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
          animate={{ clipPath: "inset(0% 0% 100% 0%)" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.4 }}
        >
          <motion.span
            className="text-[clamp(3rem,12vw,11rem)] font-[800] uppercase leading-[0.85] tracking-[-0.05em] [font-family:var(--fg-display)]"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {page.label}
          </motion.span>
          <span className="pb-3 text-[12px] uppercase tracking-[0.16em] [font-family:var(--fg-mono)]">({page.n}) Forge</span>
        </motion.div>
      )}
      {children}
    </>
  );
}
