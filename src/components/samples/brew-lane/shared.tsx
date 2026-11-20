"use client";

import { useDemo } from "../shared/DemoProvider";
import { useOpenStatus } from "../shared/useOpenStatus";
import { BL, HOURS, WA_ORDER_MESSAGE } from "./data";

export const D = "[font-family:var(--bl-display)]";
export const SOFT = "[font-variation-settings:'SOFT'_100,'WONK'_0]";
export const WONK = "[font-variation-settings:'SOFT'_100,'WONK'_1]";
export const EASE = [0.16, 1, 0.3, 1] as const;

/** Shared "Order on WhatsApp" action for the demo */
export function useOrderAction() {
  const { explain } = useDemo();
  return () =>
    explain({
      title: "Orders land straight in your WhatsApp",
      body: "On your real website, this button opens WhatsApp on the customer's phone with the message already typed. One tap and the order reaches your number. No apps, no commission.",
      message: WA_ORDER_MESSAGE,
    });
}

export function useCallAction() {
  const { explain } = useDemo();
  return () =>
    explain({
      title: "Tap to call your café",
      body: "On your real website, this button dials your café's number straight from the customer's phone. Perfect for quick questions and table bookings.",
    });
}

export function OpenBadge({ tone = "light" }: { tone?: "light" | "dark" }) {
  const status = useOpenStatus(HOURS);
  const dot = status ? (status.open ? "#3BB273" : "#D8553A") : BL.latte;
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[13px] font-medium ${
        tone === "light" ? "bg-white/70 ring-1 ring-black/5" : "bg-white/10 ring-1 ring-white/10"
      }`}
    >
      <span className="relative flex size-2">
        {status?.open && <span className="absolute inline-flex size-full animate-ping rounded-full opacity-60" style={{ background: dot }} />}
        <span className="relative inline-flex size-2 rounded-full" style={{ background: dot }} />
      </span>
      {status ? status.label : "Open daily · 8 am – 11 pm"}
    </span>
  );
}

export function Bean({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M15.5 3.2c3.3 1.4 4.7 5.9 3 10.2-1.7 4.3-5.9 7-9.2 5.6-3.3-1.4-4.7-5.9-3-10.2 1.7-4.3 5.9-7 9.2-5.6Zm-1.2 2.1c-.5 2.7-1.9 4.4-3.6 5.7-1.6 1.2-2.6 2.6-2.8 5 .2.1.4.3.6.4 2.4 1 5.5-1 6.8-4.3 1-2.6.7-5.3-1-6.8Z" />
    </svg>
  );
}

export function Stars({ className = "" }: { className?: string }) {
  return <span className={`tracking-[-0.08em] text-[#E8A33D] ${className}`}>★★★★★</span>;
}
