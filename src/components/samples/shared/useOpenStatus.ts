"use client";

import { useSyncExternalStore } from "react";
import { fmtTime, nowInIndia, subscribeClock } from "./indiaTime";

export { fmtTime };

/** Opening hours per weekday (0 = Sunday), in minutes from midnight, Indian time. */
export type WeekHours = [open: number, close: number][];

export type OpenStatus = { open: boolean; label: string; today: number };

const DAY = 24 * 60;

function compute(hours: WeekHours): string {
  const { day, minutes } = nowInIndia();
  // Still open from yesterday's late-night shift (e.g. open till 1 am)?
  const [, prevClose] = hours[(day + 6) % 7];
  if (prevClose > DAY && minutes < prevClose - DAY) return `1|Open now · till ${fmtTime(prevClose)}|${day}`;
  const [o, c] = hours[day];
  if (minutes >= o && minutes < c) return `1|Open now · till ${fmtTime(c)}|${day}`;
  if (minutes < o) return `0|Closed · opens ${fmtTime(o)}|${day}`;
  const [no] = hours[(day + 1) % 7];
  return `0|Closed · opens ${fmtTime(no)} tomorrow|${day}`;
}

/** Live open/closed status. Returns null during server render (shows a neutral fallback). */
export function useOpenStatus(hours: WeekHours): OpenStatus | null {
  const snap = useSyncExternalStore(
    subscribeClock,
    () => compute(hours),
    () => null,
  );
  if (!snap) return null;
  const [open, label, today] = snap.split("|");
  return { open: open === "1", label, today: Number(today) };
}
