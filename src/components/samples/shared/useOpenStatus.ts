"use client";

import { useSyncExternalStore } from "react";

/** Opening hours per weekday (0 = Sunday), in minutes from midnight, Indian time. */
export type WeekHours = [open: number, close: number][];

export type OpenStatus = { open: boolean; label: string; today: number };

const DAY = 24 * 60;

function nowInIndia() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Kolkata",
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "0";
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  return { day, minutes: Number(get("hour")) * 60 + Number(get("minute")) };
}

export function fmtTime(m: number) {
  const mm = m % DAY;
  if (mm === 0) return "midnight";
  const h = Math.floor(mm / 60);
  const min = mm % 60;
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}${min ? `:${String(min).padStart(2, "0")}` : ""} ${h < 12 ? "am" : "pm"}`;
}

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

function subscribe(cb: () => void) {
  const t = setInterval(cb, 30_000);
  return () => clearInterval(t);
}

/** Live open/closed status. Returns null during server render (shows a neutral fallback). */
export function useOpenStatus(hours: WeekHours): OpenStatus | null {
  const snap = useSyncExternalStore(
    subscribe,
    () => compute(hours),
    () => null,
  );
  if (!snap) return null;
  const [open, label, today] = snap.split("|");
  return { open: open === "1", label, today: Number(today) };
}
