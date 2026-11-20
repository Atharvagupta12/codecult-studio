"use client";

import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";

/** Paragraph whose words light up one by one as it scrolls through the viewport. */
export function ScrollWords({ text, className, highlight = [] }: { text: string; className?: string; highlight?: string[] }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] });
  const words = text.split(" ");
  return (
    <p ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      {words.map((w, i) => (
        <Word
          key={i}
          word={w}
          progress={scrollYProgress}
          range={[i / words.length, (i + 1) / words.length]}
          accent={highlight.includes(w.replace(/[.,]/g, ""))}
        />
      ))}
    </p>
  );
}

function Word({ word, progress, range, accent }: { word: string; progress: MotionValue<number>; range: [number, number]; accent: boolean }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <span aria-hidden className="relative mr-[0.25em] inline-block">
      <motion.span style={{ opacity }} className={accent ? "font-serif italic text-ember" : undefined}>
        {word}
      </motion.span>
    </span>
  );
}
