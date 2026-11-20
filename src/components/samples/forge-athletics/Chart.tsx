"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useId, useRef } from "react";
import { FG } from "./data";
import { EASE } from "./shared";

/** Progress chart that draws itself when scrolled into view. */
export function LineChart({ series, unit, className = "" }: { series: number[]; unit: string; className?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const seen = useInView(ref, { once: true, amount: 0.4 });
  const reduce = useReducedMotion();
  const go = seen || reduce;
  const gid = useId().replace(/:/g, "");

  const W = 600;
  const H = 260;
  const P = { l: 44, r: 20, t: 24, b: 34 };
  const min = Math.min(...series);
  const max = Math.max(...series);
  const pad = (max - min) * 0.15 || 1;
  const lo = min - pad;
  const hi = max + pad;
  const x = (i: number) => P.l + (i / (series.length - 1)) * (W - P.l - P.r);
  const y = (v: number) => P.t + (1 - (v - lo) / (hi - lo)) * (H - P.t - P.b);
  const pts = series.map((v, i) => [x(i), y(v)] as const);
  const line = pts.map(([px, py], i) => `${i ? "L" : "M"}${px.toFixed(1)} ${py.toFixed(1)}`).join(" ");
  const area = `${line} L${x(series.length - 1)} ${H - P.b} L${x(0)} ${H - P.b} Z`;
  const ticks = [lo + (hi - lo) * 0.2, lo + (hi - lo) * 0.5, lo + (hi - lo) * 0.8];
  const last = pts[pts.length - 1];
  const fmt = (v: number) => (Number.isInteger(v) ? String(v) : v.toFixed(1));

  return (
    <svg ref={ref} viewBox={`0 0 ${W} ${H}`} className={`w-full overflow-visible ${className}`} role="img" aria-label={`Progress from ${fmt(series[0])}${unit} to ${fmt(series[series.length - 1])}${unit}`}>
      <defs>
        <linearGradient id={`fg-area-${gid}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={FG.heat} stopOpacity="0.35" />
          <stop offset="100%" stopColor={FG.heat} stopOpacity="0" />
        </linearGradient>
      </defs>
      {ticks.map((t) => (
        <g key={t}>
          <line x1={P.l} x2={W - P.r} y1={y(t)} y2={y(t)} stroke={FG.line} strokeDasharray="3 5" />
          <text x={P.l - 10} y={y(t) + 4} textAnchor="end" fill={FG.mute} style={{ fontFamily: "var(--fg-mono)", fontSize: 11 }}>
            {Math.round(t)}
          </text>
        </g>
      ))}
      {series.map((_, i) => (
        <text key={i} x={x(i)} y={H - 10} textAnchor="middle" fill={FG.mute} style={{ fontFamily: "var(--fg-mono)", fontSize: 11 }}>
          W{i * 2}
        </text>
      ))}
      <motion.path d={area} fill={`url(#fg-area-${gid})`} initial={{ opacity: 0 }} animate={{ opacity: go ? 1 : 0 }} transition={{ duration: 1, delay: 1 }} />
      <motion.path d={line} fill="none" stroke={FG.heat} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: go ? 1 : 0 }} transition={{ duration: 1.6, ease: EASE }} />
      {pts.map(([px, py], i) => (
        <motion.circle key={i} cx={px} cy={py} r={i === pts.length - 1 ? 6 : 3.5} fill={i === pts.length - 1 ? FG.heat : FG.bg} stroke={FG.heat} strokeWidth={2} initial={{ scale: 0 }} animate={{ scale: go ? 1 : 0 }} transition={{ delay: 0.2 + (i / pts.length) * 1.4, type: "spring", stiffness: 400, damping: 20 }} style={{ transformOrigin: `${px}px ${py}px` }} />
      ))}
      <motion.g initial={{ opacity: 0, y: 8 }} animate={{ opacity: go ? 1 : 0, y: go ? 0 : 8 }} transition={{ delay: 1.6, duration: 0.5 }}>
        <rect x={last[0] - 86} y={last[1] - 46} width={82} height={30} rx={15} fill={FG.heat} />
        <text x={last[0] - 45} y={last[1] - 26} textAnchor="middle" fill="#0B0B0B" style={{ fontFamily: "var(--fg-mono)", fontSize: 13, fontWeight: 600 }}>
          {fmt(series[series.length - 1])}
          {unit.trim() === "%" ? "%" : ""}
        </text>
      </motion.g>
    </svg>
  );
}
