"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { SERVICES } from "@/data/samples";
import { waLink } from "@/lib/site";
import { ArrowIcon, CheckIcon, WhatsAppIcon } from "../ui/icons";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";

const EASE = [0.16, 1, 0.3, 1] as const;

const GROUPS = [
  {
    title: "WhatsApp Business",
    items: ["Business profile with logo, hours & address", "Product or menu catalogue", "Automatic greeting & away messages", "Quick replies for common questions"],
  },
  {
    title: "Google Business Profile",
    items: ["Listing on Google Search & Maps", "Photos, timings & services added", "Review link + QR poster for your counter", "Map pin so customers find you"],
  },
];

export function WhatsAppSetup() {
  return (
    <section id="services" className="relative scroll-mt-10 overflow-hidden px-5 py-16 sm:px-8 sm:py-24">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/3 size-[700px] -translate-x-1/2 rounded-full bg-wa/[0.07] blur-[140px]" />
      <div className="relative mx-auto max-w-[1400px]">
        <SectionHeading index="04" label="Service 02 · WhatsApp + Google" title="Get found on Google." italic="Get orders on WhatsApp." />

        <div className="mt-10 grid items-center gap-12 sm:mt-14 lg:grid-cols-[1fr_1.05fr] lg:gap-10">
          {/* Copy */}
          <div>
            <Reveal>
              <div className="flex flex-wrap items-end gap-x-4 gap-y-2">
                <span className="font-serif text-[88px] leading-[0.8] tracking-[-0.02em] sm:text-[112px]">{SERVICES.whatsappGoogle}</span>
                <span className="pb-2 text-[14px] leading-tight text-cream/50">
                  one-time setup
                  <br />
                  no tech knowledge needed
                </span>
              </div>
              <p className="mt-7 max-w-[34rem] text-[17px] leading-[1.65] text-cream/65">
                Most customers search Google, then message on WhatsApp. We set up both properly, so when someone looks for{" "}
                <span className="text-cream">&ldquo;café near me&rdquo;</span>, they find you, see your photos and reviews, and reach you in one tap.
              </p>
            </Reveal>

            <div className="mt-10 grid gap-8 sm:grid-cols-2">
              {GROUPS.map((g, gi) => (
                <Reveal key={g.title} delay={0.1 + gi * 0.1}>
                  <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-cream/45">
                    {gi === 0 ? <WhatsAppIcon className="size-4 text-wa" /> : <GoogleG className="size-4" />}
                    {g.title}
                  </p>
                  <ul className="mt-4 flex flex-col gap-3">
                    {g.items.map((it) => (
                      <li key={it} className="flex items-start gap-2.5 text-[15px] text-cream/80">
                        <CheckIcon className="mt-1 size-3.5 shrink-0 text-wa" />
                        {it}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.25} className="mt-12 flex flex-wrap items-center gap-4">
              <a
                href={waLink(`Hi CodeCult Studio! I want the WhatsApp Business + Google profile setup (${SERVICES.whatsappGoogle}).`)}
                target="_blank"
                rel="noopener"
                className="group inline-flex h-14 items-center gap-3 rounded-full bg-wa pl-6 pr-2 text-[16px] font-semibold text-ink transition-transform hover:scale-[1.02]"
              >
                Set this up for me
                <span className="grid size-10 place-items-center rounded-full bg-ink text-wa transition-transform duration-500 group-hover:-rotate-45">
                  <ArrowIcon className="size-4" />
                </span>
              </a>
              <span className="text-[14px] text-cream/45">Works great on its own, or with any website.</span>
            </Reveal>
          </div>

          {/* Visual */}
          <Reveal y={60}>
            <ChatScene />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── The animated scene ───────────────────────── */

type Msg =
  | { id: string; from: "me" | "biz"; text: string; time: string; tag?: string }
  | { id: string; from: "biz"; catalog: true; time: string }
  | { id: string; from: "biz"; typing: true };

const SCRIPT: Msg[] = [
  { id: "a", from: "me", text: "Hi! Are you open today?", time: "10:02" },
  { id: "b", from: "biz", text: "Hi 👋 Welcome to Brew Lane! We're open 8 am – 11 pm today. Here's our menu:", time: "10:02", tag: "Automatic greeting" },
  { id: "c", from: "biz", catalog: true, time: "10:02" },
  { id: "d", from: "me", text: "Can I book a table for 4 at 8 pm?", time: "10:04" },
  { id: "e", from: "biz", typing: true },
  { id: "f", from: "biz", text: "Done! Table for 4 at 8 pm is booked ✅ See you tonight!", time: "10:04", tag: "Quick reply" },
];

function ChatScene() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);

  // Play the conversation while visible; loop after a pause
  useEffect(() => {
    if (!inView || reduce) return;
    const delay = step === 0 ? 500 : step >= SCRIPT.length ? 5000 : SCRIPT[step - 1] && "typing" in SCRIPT[step - 1] ? 1400 : 1300;
    const t = setTimeout(() => setStep((s) => (s >= SCRIPT.length ? 0 : s + 1)), delay);
    return () => clearTimeout(t);
  }, [inView, step, reduce]);

  // Hide the typing bubble once the next message arrives
  const visible = SCRIPT.slice(0, reduce ? SCRIPT.length : step).filter((m, i, arr) => !("typing" in m) || i === arr.length - 1);

  return (
    <div ref={ref} className="relative mx-auto aspect-[1/1.08] w-full max-w-[600px]">
      {/* Phone */}
      <div className="absolute right-0 top-0 w-[62%] sm:right-[2%] sm:w-[54%]">
        <div className="rounded-[2.6rem] bg-[#050505] p-[7px] shadow-[0_60px_120px_-30px_rgba(0,0,0,0.95)] ring-1 ring-cream/15">
          <div className="relative flex aspect-[9/18.5] flex-col overflow-hidden rounded-[2.2rem] bg-[#0B141A]">
            <span className="absolute left-1/2 top-2 z-20 h-[18px] w-[32%] -translate-x-1/2 rounded-full bg-black" />
            {/* Header */}
            <div className="flex items-center gap-2.5 bg-[#202C33] px-3.5 pb-2.5 pt-9">
              <span className="grid size-8 place-items-center rounded-full bg-[#F3E7D6] font-serif text-[13px] italic text-[#2A1A12]">BL</span>
              <div className="min-w-0 flex-1 leading-tight">
                <p className="flex items-center gap-1 text-[13px] font-semibold text-[#E9EDEF]">
                  Brew Lane
                  <span className="grid size-3.5 place-items-center rounded-full bg-wa text-[#0B141A]">
                    <CheckIcon className="size-2.5" />
                  </span>
                </p>
                <p className="text-[10px] text-[#8696A0]">Business account</p>
              </div>
            </div>
            {/* Messages */}
            <div
              className="flex flex-1 flex-col justify-end gap-1.5 overflow-hidden px-2.5 pb-2"
              style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.035) 1px, transparent 1px)", backgroundSize: "14px 14px" }}
            >
              <AnimatePresence initial={false}>
                {visible.map((m) => (
                  <motion.div
                    key={m.id}
                    layout
                    initial={{ opacity: 0, y: 16, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.15 } }}
                    transition={{ duration: 0.45, ease: EASE }}
                    className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}
                  >
                    <Bubble m={m} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            {/* Input */}
            <div className="flex items-center gap-2 px-2.5 pb-4 pt-1">
              <span className="h-8 flex-1 rounded-full bg-[#202C33] px-3 text-[11px] leading-8 text-[#8696A0]">Message</span>
              <span className="grid size-8 place-items-center rounded-full bg-[#00A884] text-[#0B141A]">
                <svg viewBox="0 0 24 24" className="size-4" fill="currentColor">
                  <path d="M12 15a3 3 0 0 0 3-3V6a3 3 0 1 0-6 0v6a3 3 0 0 0 3 3Zm5-3a5 5 0 0 1-10 0H5a7 7 0 0 0 6 6.9V21h2v-2.1a7 7 0 0 0 6-6.9h-2Z" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Google Maps card */}
      <motion.div
        animate={reduce ? undefined : { y: [0, -10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-[4%] left-0 z-10 w-[64%] sm:w-[50%]"
      >
        <div className="overflow-hidden rounded-[22px] bg-white text-[#202124] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.85)]">
          <MiniMap />
          <div className="p-4">
            <p className="text-[17px] font-medium leading-tight">Brew Lane</p>
            <p className="mt-1 flex items-center gap-1 text-[12px] text-[#5F6368]">
              <span className="font-medium text-[#202124]">4.8</span>
              <span className="tracking-[-0.1em] text-[#FBBC04]">★★★★★</span>
              <span>(312)</span>
              <span>· Café</span>
            </p>
            <p className="mt-1 text-[12px]">
              <span className="font-medium text-[#188038]">Open</span>
              <span className="text-[#5F6368]"> · Closes 11 pm · Vijay Nagar</span>
            </p>
            <div className="mt-3 flex gap-1.5">
              {[
                ["Directions", true],
                ["Call", false],
                ["Website", false],
              ].map(([l, primary]) => (
                <span
                  key={l as string}
                  className={`rounded-full px-3 py-1.5 text-[11px] font-medium ${primary ? "bg-[#1A73E8] text-white" : "border border-[#DADCE0] text-[#1A73E8]"}`}
                >
                  {l}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Toast */}
      <motion.div
        animate={reduce ? undefined : { y: [0, 8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        className="absolute left-[2%] top-[16%] z-20 hidden sm:block"
      >
        <div className="flex items-center gap-3 rounded-2xl border border-cream/10 bg-ink/80 py-2.5 pl-2.5 pr-4 shadow-2xl backdrop-blur-xl">
          <span className="grid size-9 place-items-center rounded-xl bg-white">
            <GoogleG className="size-5" />
          </span>
          <span className="leading-tight">
            <span className="block text-[12px] font-semibold text-cream">New 5★ review</span>
            <span className="block text-[11px] text-cream/50">&ldquo;Best cappuccino in town!&rdquo;</span>
          </span>
        </div>
      </motion.div>
    </div>
  );
}

function Bubble({ m }: { m: Msg }) {
  const me = m.from === "me";
  const base = `relative max-w-[86%] rounded-[10px] px-2.5 py-1.5 text-[11.5px] leading-snug text-[#E9EDEF] shadow ${me ? "rounded-tr-[3px] bg-[#005C4B]" : "rounded-tl-[3px] bg-[#202C33]"}`;

  if ("typing" in m) {
    return (
      <div className={`${base} flex gap-1 py-2.5`}>
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="size-1.5 rounded-full bg-[#8696A0]"
            animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
            transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
          />
        ))}
      </div>
    );
  }

  if ("catalog" in m) {
    return (
      <div className={`${base} w-[86%] p-1.5`}>
        <div className="grid grid-cols-2 gap-1">
          {[
            ["/images/landing/wa-croissant.jpg", "Croissant", "₹140"],
            ["/images/landing/wa-latte.jpg", "Cappuccino", "₹180"],
          ].map(([src, name, price]) => (
            <div key={name} className="overflow-hidden rounded-md bg-[#111B21]">
              <div className="relative aspect-square">
                <Image src={src} alt="" fill sizes="120px" className="object-cover" />
              </div>
              <p className="px-1.5 pb-1 pt-1 text-[10px] leading-tight">
                {name}
                <br />
                <span className="text-[#8696A0]">{price}</span>
              </p>
            </div>
          ))}
        </div>
        <p className="mt-1.5 border-t border-white/10 pt-1.5 text-center text-[11px] font-medium text-[#00A884]">View catalogue</p>
      </div>
    );
  }

  return (
    <div className={base}>
      {m.tag && <span className="mb-0.5 block text-[9px] font-semibold uppercase tracking-wide text-[#00A884]">{m.tag}</span>}
      {m.text}
      <span className="ml-2 inline-flex translate-y-0.5 items-center gap-0.5 text-[9px] text-[#8696A0]">
        {m.time}
        {me && <span className="text-[#53BDEB]">✓✓</span>}
      </span>
    </div>
  );
}

function MiniMap() {
  return (
    <div className="relative h-24 overflow-hidden bg-[#E8EAED] sm:h-28">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 300 110" preserveAspectRatio="xMidYMid slice" aria-hidden>
        <rect width="300" height="110" fill="#E8EAED" />
        <path d="M-10 70 Q80 40 160 62 T310 40" stroke="#fff" strokeWidth="10" fill="none" />
        <path d="M120 -10 L150 120" stroke="#fff" strokeWidth="7" fill="none" />
        <path d="M-10 20 L310 30" stroke="#fff" strokeWidth="4" fill="none" />
        <path d="M230 -10 L210 120" stroke="#FDE293" strokeWidth="6" fill="none" />
        <rect x="20" y="78" width="60" height="26" rx="4" fill="#CDE8D2" />
        <rect x="250" y="55" width="40" height="40" rx="4" fill="#CDE8D2" />
      </svg>
      <span className="absolute left-[47%] top-[18%] flex flex-col items-center">
        <svg viewBox="0 0 24 34" className="h-9 w-7 drop-shadow-md">
          <path d="M12 0C5.4 0 0 5.2 0 11.7 0 20.4 12 34 12 34s12-13.6 12-22.3C24 5.2 18.6 0 12 0Z" fill="#EA4335" />
          <circle cx="12" cy="11.5" r="4.5" fill="#A50E0E" />
        </svg>
      </span>
    </div>
  );
}

export function GoogleG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5a5.6 5.6 0 0 1-2.4 3.6v3h3.9c2.3-2.1 3.5-5.2 3.5-8.8Z" />
      <path fill="#34A853" d="M12 24c3.2 0 6-1.1 7.9-2.9l-3.9-3c-1.1.7-2.4 1.2-4 1.2-3.1 0-5.7-2.1-6.6-4.9H1.4v3.1A12 12 0 0 0 12 24Z" />
      <path fill="#FBBC05" d="M5.4 14.4a7.2 7.2 0 0 1 0-4.7V6.6h-4a12 12 0 0 0 0 10.9l4-3.1Z" />
      <path fill="#EA4335" d="M12 4.8c1.7 0 3.3.6 4.5 1.8l3.4-3.4A12 12 0 0 0 1.4 6.6l4 3.1C6.3 6.9 8.9 4.8 12 4.8Z" />
    </svg>
  );
}
