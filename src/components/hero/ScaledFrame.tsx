"use client";

import { useLayoutEffect, useRef, useState } from "react";

/**
 * Renders children at a fixed "real" size (e.g. 1280×800) and scales them down
 * to fit the container width, so mini previews keep true website proportions.
 */
export function ScaledFrame({
  baseWidth,
  baseHeight,
  className,
  children,
}: {
  baseWidth: number;
  baseHeight: number;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number | null>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setScale(el.clientWidth / baseWidth);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [baseWidth]);

  return (
    <div
      ref={ref}
      className={`relative w-full overflow-hidden ${className ?? ""}`}
      style={{ aspectRatio: `${baseWidth} / ${baseHeight}` }}
    >
      <div
        className="absolute left-0 top-0 origin-top-left"
        style={{
          width: baseWidth,
          height: baseHeight,
          transform: `scale(${scale ?? 0})`,
          visibility: scale ? "visible" : "hidden",
        }}
      >
        {children}
      </div>
    </div>
  );
}
