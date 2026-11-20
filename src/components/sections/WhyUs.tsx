"use client";

import { animate, motion, useInView, useMotionValue, useMotionValueEvent, useReducedMotion, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { getSample } from "@/data/samples";
import { DesktopPreview } from "../hero/NichePreview";
import { ScaledFrame } from "../hero/ScaledFrame";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";
import { CheckIcon } from "../ui/icons";
import { Wireframe } from "./Wireframe";

const sample = getSample("brew-lane");

const COMPARE: [string, string, string][] = [
  ["UI/UX design", "Paid separately", "₹0 extra"],
  ["Development", "Another freelancer", "Same team"],
  ["Who you talk to", "2–3 people", "One WhatsApp chat"],
  ["Your design", "A template", "Made for your brand"],
];

export function WhyUs() {
  return (
    <section id="why" className="relative px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-[1400px]">
        <SectionHeading
          index="01"
          label="Why CodeCult"
          title="Most agencies charge you twice."
          italic="We don't."
          align="split"
          intro={
            <>
              Usually you pay a <span className="text-cream">UI/UX designer</span> to design your website, then a{" "}
              <span className="text-cream">developer</span> to build it. At CodeCult the same team does both, so a fully custom design is
              already in the price.
            </>
          }
        />

        <Reveal className="mx-auto mt-10 max-w-[1180px] sm:mt-14">
          <DesignDevSlider />
        </Reveal>

        <Reveal className="mx-auto mt-4 max-w-[1180px] sm:mt-6">
          <div className="relative overflow-hidden rounded-[24px] border border-line bg-ink-2 sm:rounded-[28px]">
            {/* highlighted CodeCult column */}
            <div aria-hidden className="absolute inset-y-0 right-0 w-[37%] border-l border-ember/40 bg-gradient-to-b from-ember/[0.16] to-ember/[0.04]" />
            <div className="relative grid grid-cols-[1fr_1fr_1.17fr] items-center border-b border-line px-4 py-4 font-mono text-[10px] uppercase tracking-[0.14em] sm:grid-cols-[1.1fr_1fr_1.17fr] sm:px-8 sm:py-5 sm:text-[11px]">
              <span className="text-cream/35">Compare</span>
              <span className="text-cream/40">Usual way</span>
              <span className="pl-3 text-ember sm:pl-6">CodeCult</span>
            </div>
            {COMPARE.map(([label, usual, us]) => (
              <div
                key={label}
                className="relative grid grid-cols-[1fr_1fr_1.17fr] items-center border-b border-line px-4 py-3.5 text-[13px] last:border-0 sm:grid-cols-[1.1fr_1fr_1.17fr] sm:px-8 sm:py-5 sm:text-[16px]"
              >
                <span className="pr-2 text-cream/60">{label}</span>
                <span className="pr-2 text-cream/35 line-through decoration-cream/20">{usual}</span>
                <span className="flex items-center gap-2 pl-3 font-medium text-cream sm:gap-2.5 sm:pl-6">
                  <span className="grid size-4 shrink-0 place-items-center rounded-full bg-ember text-ink sm:size-5">
                    <CheckIcon className="size-2.5 sm:size-3" />
                  </span>
                  {us}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function DesignDevSlider() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();
  const pos = useMotionValue(86); // % from left where the split sits
  const clip = useTransform(pos, (p) => `inset(0 ${100 - p}% 0 0)`);
  const left = useTransform(pos, (p) => `${p}%`);
  const [value, setValue] = useState(86);
  const dragging = useRef(false);
  useMotionValueEvent(pos, "change", (v) => setValue(Math.round(v)));

  // Sweep once on first view to show what it does
  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      pos.set(50);
      return;
    }
    const c = animate(pos, [86, 18, 52], { duration: 2.6, ease: [0.65, 0, 0.35, 1], delay: 0.3 });
    return () => c.stop();
  }, [inView, reduce, pos]);

  function setFromClient(x: number) {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    pos.set(Math.min(97, Math.max(3, ((x - r.left) / r.width) * 100)));
  }

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-[20px] border border-cream/10 bg-ink-3 shadow-[0_60px_140px_-40px_rgba(0,0,0,0.9)] sm:rounded-[28px]">
        {/* Window chrome */}
        <div className="flex items-center gap-3 border-b border-cream/[0.07] px-4 py-3 sm:px-5">
          <span className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-cream/15" />
            <span className="size-2.5 rounded-full bg-cream/15" />
            <span className="size-2.5 rounded-full bg-cream/15" />
          </span>
          <span className="mx-auto font-mono text-[11px] text-cream/50">{sample.domain}</span>
          <span className="w-[42px]" />
        </div>

        <div
          ref={ref}
          className="relative cursor-ew-resize touch-pan-y select-none"
          onPointerDown={(e) => {
            dragging.current = true;
            (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
            setFromClient(e.clientX);
          }}
          onPointerMove={(e) => dragging.current && setFromClient(e.clientX)}
          onPointerUp={() => (dragging.current = false)}
          onPointerCancel={() => (dragging.current = false)}
        >
          <ScaledFrame baseWidth={1280} baseHeight={800}>
            <DesktopPreview s={sample} sizes="(min-width: 1024px) 800px, 100vw" />
          </ScaledFrame>
          <motion.div className="absolute inset-0" style={{ clipPath: clip }}>
            <ScaledFrame baseWidth={1280} baseHeight={800}>
              <Wireframe s={sample} />
            </ScaledFrame>
          </motion.div>

          {/* Labels */}
          <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-ink/85 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-cream backdrop-blur sm:left-5 sm:top-5 sm:text-[11px]">
            <span className="hidden sm:inline">① UI/UX design · </span><span className="sm:hidden">Design · </span><span className="text-ember">₹0</span>
          </span>
          <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-ink/85 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-cream backdrop-blur sm:right-5 sm:top-5 sm:text-[11px]">
            <span className="hidden sm:inline">② Development · </span>Live
          </span>

          {/* Handle */}
          <motion.div className="absolute inset-y-0 w-0" style={{ left }}>
            <span className="absolute inset-y-0 -left-px w-[2px] bg-ember shadow-[0_0_24px_rgba(255,90,31,0.8)]" />
            <button
              type="button"
              role="slider"
              aria-label="Compare design and live website"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={value}
              onKeyDown={(e) => {
                if (e.key === "ArrowLeft") pos.set(Math.max(3, pos.get() - 5));
                if (e.key === "ArrowRight") pos.set(Math.min(97, pos.get() + 5));
              }}
              className="absolute left-1/2 top-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-ember text-ink shadow-[0_10px_30px_rgba(0,0,0,0.5)] sm:size-14"
            >
              <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 6-6 6 6 6M15 6l6 6-6 6" />
              </svg>
            </button>
          </motion.div>
        </div>
      </div>
      <p className="mt-4 text-center font-mono text-[11px] uppercase tracking-[0.18em] text-cream/40">
        ← Drag to watch the design become a live website →
      </p>
    </div>
  );
}
