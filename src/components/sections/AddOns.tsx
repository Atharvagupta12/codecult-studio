"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { SERVICES } from "@/data/samples";
import { anton, cormorant, fraunces } from "@/lib/fonts";
import { WA, waLink } from "@/lib/site";
import { ArrowUpRightIcon, CheckIcon } from "../ui/icons";
import { Reveal } from "../ui/Reveal";
import { GoogleG } from "./WhatsAppSetup";

export function AddOns() {
  return (
    <section aria-labelledby="addons-title" className="px-5 pb-16 sm:px-8 sm:pb-24">
      <div className="mx-auto max-w-[1400px]">
        <Reveal className="flex flex-col justify-between gap-3 border-t border-line pt-8 sm:flex-row sm:items-end sm:pt-10">
          <h2 id="addons-title" className="text-[clamp(2rem,4vw,3.4rem)] font-medium leading-none tracking-[-0.04em]">
            Add-ons <span className="font-serif font-normal italic text-cream/60">that make it complete.</span>
          </h2>
          <p className="max-w-[24rem] text-[15px] text-cream/50">Add them to any website, or order them on their own.</p>
        </Reveal>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
          <Tile className="md:col-span-2" price={SERVICES.seo} title="SEO setup" text="Titles, descriptions, Google Search Console and a sitemap, so Google understands your business and shows it properly." visual={<SeoVisual />} msg="SEO setup" />
          <Tile price={SERVICES.logo} title="Logo design" text="A logo that looks great on your signboard, Instagram and menu." visual={<LogoVisual />} msg="Logo design" />
          <Tile price={SERVICES.poster} title="Posters & thumbnails" text="Offer posts, festival creatives, menus and YouTube thumbnails." visual={<PosterVisual />} msg="Poster / thumbnail design" />
          <Tile
            className="md:col-span-2"
            price={SERVICES.domain}
            title="Domain setup"
            text="Want us to handle the domain? We'll buy it in your name and connect it to your website. Domain price depends on the name."
            visual={<DomainVisual />}
            msg="Domain setup"
          />
        </div>
      </div>
    </section>
  );
}

function Tile({ className = "", price, title, text, visual, msg }: { className?: string; price: string; title: string; text: string; visual: React.ReactNode; msg: string }) {
  return (
    <Reveal className={className}>
      <a
        href={waLink(WA.addon(msg, price))}
        target="_blank"
        rel="noopener"
        className="group relative flex h-full flex-col overflow-hidden rounded-[22px] border border-line bg-ink-2 transition-colors duration-500 hover:border-cream/20 sm:rounded-[28px]"
      >
        <div className="relative hidden h-[240px] overflow-hidden border-b border-line bg-ink-3/60 sm:block">{visual}</div>
        <div className="flex flex-1 items-end justify-between gap-6 p-4 sm:p-7">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ember sm:text-[11px] sm:tracking-[0.16em]">
              from<span className="hidden sm:inline"> {price}</span>
            </p>
            <p className="mt-1 font-serif text-[34px] leading-none sm:hidden">{price}</p>
            <h3 className="mt-3 text-[17px] font-medium leading-tight tracking-[-0.02em] sm:mt-2 sm:text-[24px] sm:tracking-[-0.03em]">{title}</h3>
            <p className="mt-1.5 line-clamp-3 max-w-[32rem] text-[13px] leading-snug text-cream/55 sm:mt-2 sm:line-clamp-none sm:text-[15px] sm:leading-relaxed">{text}</p>
          </div>
          <span className="hidden size-11 shrink-0 place-items-center rounded-full border border-line text-cream transition-all duration-500 group-hover:rotate-45 group-hover:border-ember group-hover:bg-ember group-hover:text-ink sm:grid">
            <ArrowUpRightIcon className="size-4" />
          </span>
        </div>
      </a>
    </Reveal>
  );
}

/* ── Visuals ── */

function useTyping(text: string, active: boolean, speed = 70) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!active) return;
    if (n >= text.length) {
      const t = setTimeout(() => setN(0), 2600);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setN((x) => x + 1), speed);
    return () => clearTimeout(t);
  }, [active, n, text, speed]);
  return text.slice(0, n);
}

function SeoVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const reduce = useReducedMotion();
  const q = "best café in vijay nagar";
  const typed = useTyping(q, inView && !reduce);
  const shown = reduce ? q : typed;
  const done = shown.length === q.length;
  return (
    <div ref={ref} className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6">
      <div className="flex w-full max-w-[520px] items-center gap-3 rounded-full bg-white px-5 py-3 text-[14px] text-[#202124] shadow-xl">
        <GoogleG className="size-5 shrink-0" />
        <span className="truncate">
          {shown}
          <span className="ml-0.5 inline-block h-4 w-px translate-y-0.5 animate-pulse bg-[#202124]" />
        </span>
      </div>
      <motion.div
        animate={{ opacity: done ? 1 : 0.15, y: done ? 0 : 8 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-[520px] rounded-2xl bg-white p-4 text-left shadow-xl"
      >
        <p className="flex items-center gap-2 text-[11px] text-[#4D5156]">
          <span className="grid size-5 place-items-center rounded-full bg-[#F3E7D6] font-serif text-[9px] italic text-[#2A1A12]">BL</span>
          brewlane.in
        </p>
        <p className="mt-1 text-[16px] text-[#1A0DAB]">Brew Lane · Specialty Coffee in Vijay Nagar, Indore</p>
        <p className="mt-0.5 line-clamp-1 text-[12px] text-[#4D5156]">Small-batch roasts, fresh croissants and cosy seats. Open daily 8 am – 11 pm. See menu…</p>
        <div className="mt-2 flex gap-3 text-[12px] text-[#1A0DAB]">
          <span>Menu</span>
          <span>Our story</span>
          <span>Visit us</span>
        </div>
      </motion.div>
    </div>
  );
}

const LOGOS = [
  { key: "bl", bg: "#F3E7D6", fg: "#2A1A12", node: <span className={`${fraunces.className} text-[42px] italic`} style={{ fontWeight: 800 }}>Brew<span className="text-[#C26A2B]">.</span></span> },
  { key: "ip", bg: "#0B0B0B", fg: "#E5FF3D", node: <span className={`${anton.className} text-[44px] tracking-wide`}>IRONPEAK</span> },
  { key: "kj", bg: "#15110D", fg: "#D4A84B", node: <span className={`${cormorant.className} text-[44px] italic`} style={{ fontWeight: 600 }}>◆ Kalaa</span> },
];

function LogoVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const [i, setI] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => setI((x) => (x + 1) % LOGOS.length), 2200);
    return () => clearTimeout(t);
  }, [inView, i]);
  const l = LOGOS[i];
  return (
    <div ref={ref} className="absolute inset-0 grid place-items-center">
      <motion.div animate={{ backgroundColor: l.bg }} transition={{ duration: 0.6 }} className="grid size-[150px] place-items-center rounded-[36px] shadow-2xl ring-1 ring-cream/15">
        <AnimatePresence mode="wait">
          <motion.div
            key={l.key}
            initial={{ opacity: 0, scale: 0.7, filter: "blur(6px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.2, filter: "blur(6px)" }}
            transition={{ duration: 0.45 }}
            style={{ color: l.fg, fontSynthesis: "none" }}
            className="max-w-[140px] scale-[0.62] whitespace-nowrap text-center"
          >
            {l.node}
          </motion.div>
        </AnimatePresence>
      </motion.div>
      {/* construction guides */}
      <span aria-hidden className="pointer-events-none absolute size-[210px] rounded-full border border-dashed border-cream/10" />
      <span aria-hidden className="pointer-events-none absolute h-px w-[260px] bg-cream/[0.06]" />
      <span aria-hidden className="pointer-events-none absolute h-[260px] w-px bg-cream/[0.06]" />
    </div>
  );
}

function PosterVisual() {
  const posters = [
    { bg: "#FF5A1F", fg: "#0A0908", title: "FLAT 20% OFF", sub: "Diwali special · this week only", rot: -12, x: -100 },
    { bg: "#1E3A2F", fg: "#F2A93B", title: "NEW MENU", sub: "Kulhad chai is back", rot: 0, x: 0 },
    { bg: "#F3EEE6", fg: "#0A0908", title: "GRAND OPENING", sub: "Sunday · 11 am onwards", rot: 12, x: 100 },
  ];
  return (
    <div className="absolute inset-0 grid place-items-center">
      {posters.map((p, i) => (
        <div
          key={p.title}
          className="absolute flex h-[170px] w-[124px] flex-col justify-between rounded-xl p-3 shadow-2xl transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] [transform:translateX(var(--x0))_rotate(var(--r0))] group-hover:[transform:translateX(var(--x))_rotate(var(--r))]"
          style={{
            background: p.bg,
            color: p.fg,
            zIndex: i === 1 ? 2 : 1,
            ["--x0" as string]: `${p.x * 0.7}px`,
            ["--r0" as string]: `${p.rot * 0.7}deg`,
            ["--x" as string]: `${p.x}px`,
            ["--r" as string]: `${p.rot}deg`,
          }}
        >
          <span className="font-mono text-[8px] uppercase tracking-[0.2em] opacity-70">Offer</span>
          <span className={`${anton.className} text-[24px] leading-[0.9]`}>{p.title}</span>
          <span className="text-[9px] leading-tight opacity-80">{p.sub}</span>
        </div>
      ))}
    </div>
  );
}

function DomainVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const reduce = useReducedMotion();
  const name = "yourbusiness";
  const typed = useTyping(name, inView && !reduce, 90);
  const shown = reduce ? name : typed;
  const done = shown.length === name.length;
  return (
    <div ref={ref} className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6">
      <div className="flex w-full max-w-[460px] items-center rounded-2xl border border-cream/15 bg-ink px-5 py-4 font-mono text-[18px]">
        <span className="text-cream/35">https://</span>
        <span className="text-cream">{shown}</span>
        <span className="ml-0.5 inline-block h-5 w-[2px] animate-pulse bg-ember" />
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        {[".in", ".com", ".shop", ".store"].map((ext, i) => (
          <motion.span
            key={ext}
            animate={{ opacity: done ? 1 : 0, y: done ? 0 : 10 }}
            transition={{ duration: 0.4, delay: done ? i * 0.1 : 0 }}
            className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 font-mono text-[13px] ${i === 0 ? "bg-ember text-ink" : "border border-line text-cream/70"}`}
          >
            {shown}
            {ext}
            {i < 2 && <CheckIcon className="size-3" />}
          </motion.span>
        ))}
      </div>
    </div>
  );
}
