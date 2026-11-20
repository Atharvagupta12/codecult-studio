"use client";

import { useEffect, useState } from "react";

/**
 * Tracks which child of a horizontal scroll-snap container is centred.
 * Returns [callbackRef, index]; attach the ref to the scrolling element.
 */
export function useCarouselIndex() {
  const [el, setEl] = useState<HTMLElement | null>(null);
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (!el) return;
    const onScroll = () => {
      const kids = Array.from(el.children) as HTMLElement[];
      const mid = el.scrollLeft + el.clientWidth / 2;
      let best = 0;
      let bestDist = Infinity;
      kids.forEach((k, i) => {
        const d = Math.abs(k.offsetLeft + k.offsetWidth / 2 - mid);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      });
      setIndex(best);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [el]);
  return [setEl, index] as const;
}

/**
 * Horizontal swipe carousel on small screens, regular grid from `lg` up.
 * Pass the desktop grid classes via `gridClass`.
 */
export function SnapCarousel({
  children,
  gridClass,
  colors,
  hint,
  tone = "dark",
  count,
}: {
  children: React.ReactNode;
  gridClass: string;
  colors?: string[];
  hint?: string;
  tone?: "dark" | "light";
  count: number;
}) {
  const [ref, index] = useCarouselIndex();
  return (
    <>
      <div
        ref={ref}
        className={`-mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 [scrollbar-width:none] *:w-[86%] *:shrink-0 *:snap-center sm:-mx-8 sm:px-8 sm:*:w-[60%] lg:mx-0 lg:overflow-visible lg:px-0 lg:pb-0 lg:*:w-auto ${gridClass}`}
      >
        {children}
      </div>
      <CarouselDots count={count} index={index} colors={colors} hint={hint} tone={tone} className="mt-3" />
    </>
  );
}

/** Dots + "swipe" hint shown under mobile carousels (hidden on large screens). */
export function CarouselDots({
  count,
  index,
  colors,
  hint = "Swipe",
  tone = "dark",
  className = "",
}: {
  count: number;
  index: number;
  colors?: string[];
  hint?: string;
  tone?: "dark" | "light";
  className?: string;
}) {
  const idle = tone === "dark" ? "bg-cream/20" : "bg-ink/20";
  return (
    <div className={`flex items-center justify-between lg:hidden ${className}`}>
      <div className="flex items-center gap-1.5">
        {Array.from({ length: count }).map((_, i) => (
          <span
            key={i}
            className={`h-1.5 rounded-full transition-all duration-500 ${i === index ? "w-6" : `w-1.5 ${idle}`}`}
            style={i === index ? { background: colors?.[i] ?? "#FF5A1F" } : undefined}
          />
        ))}
      </div>
      <span className={`font-mono text-[10px] uppercase tracking-[0.16em] ${tone === "dark" ? "text-cream/40" : "text-ink/45"}`}>
        {hint} →
      </span>
    </div>
  );
}
