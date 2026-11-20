"use client";

import { AnimatePresence, motion } from "motion/react";
import { useDemo } from "./DemoProvider";

/**
 * Wraps a part of a sample site. When the visitor turns on "What's included",
 * it gets an outline and a label so owners can see exactly what they pay for.
 */
export function Feature({
  id,
  label,
  children,
  className = "",
  inline = false,
  labelPosition = "top",
}: {
  id: string;
  label: string;
  children: React.ReactNode;
  className?: string;
  inline?: boolean;
  labelPosition?: "top" | "bottom";
}) {
  const { tour } = useDemo();
  const Tag = inline ? "span" : "div";
  return (
    <Tag id={`feature-${id}`} className={`relative scroll-mt-28 ${inline ? "inline-flex" : ""} ${className}`}>
      {children}
      <AnimatePresence>
        {tour && (
          <motion.span
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.3 }}
            aria-hidden
            className="pointer-events-none absolute -inset-2 z-40 rounded-[18px] border-2 border-dashed border-[#FF5A1F] shadow-[0_0_0_4px_rgba(255,90,31,0.12)]"
          >
            <span
              className={`absolute left-3 flex items-center gap-1.5 whitespace-nowrap rounded-full bg-[#FF5A1F] px-2.5 py-1 font-sans text-[11px] font-semibold not-italic leading-none tracking-normal text-[#0A0908] shadow-lg ${
                labelPosition === "top" ? "-top-3.5" : "-bottom-3.5"
              }`}
            >
              <span className="text-[10px]">✦</span>
              {label}
            </span>
          </motion.span>
        )}
      </AnimatePresence>
    </Tag>
  );
}
