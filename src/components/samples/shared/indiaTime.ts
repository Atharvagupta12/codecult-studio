"use client";

import { useSyncExternalStore } from "react";

const DAY = 24 * 60;

/** Weekday (0 = Sunday) and minutes since midnight, in Indian time. */
export function nowInIndia() {
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

/** 330 → "5:30 am", 1440 → "midnight" */
export function fmtTime(m: number) {
  const mm = m % DAY;
  if (mm === 0) return "midnight";
  const h = Math.floor(mm / 60);
  const min = mm % 60;
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}${min ? `:${String(min).padStart(2, "0")}` : ""} ${h < 12 ? "am" : "pm"}`;
}

/** Re-check the clock every 30 seconds */
export function subscribeClock(cb: () => void) {
  const t = setInterval(cb, 30_000);
  return () => clearInterval(t);
}

/** Current weekday and minutes in India. Null during server render. */
export function useIndiaNow(): { day: number; minutes: number } | null {
  const snap = useSyncExternalStore(
    subscribeClock,
    () => {
      const n = nowInIndia();
      return `${n.day}|${n.minutes}`;
    },
    () => null,
  );
  if (!snap) return null;
  const [day, minutes] = snap.split("|").map(Number);
  return { day, minutes };
}
