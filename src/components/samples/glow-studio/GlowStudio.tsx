"use client";

import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef, useState } from "react";
import { WhatsAppIcon } from "@/components/ui/icons";
import { Feature } from "../shared/Feature";
import { GS, OFFERS } from "./data";
import { gsSans, gsSerif } from "./fonts";
import { BeforeAfter, Footer, Gallery, Reviews, Stylists, Visit, VisitBuilder } from "./sections";
import { EASE, Logo, OpenBadge, SERIF, Sparkle, useActions, useNextSlot } from "./shared";

export function GlowStudio() {
  return (
    <div className={`${gsSerif.variable} ${gsSans.variable} min-h-screen overflow-x-clip [font-family:var(--gs-sans)] antialiased selection:bg-[#B8445E] selection:text-white`} style={{ background: GS.cream, color: GS.plum }}>
      <Nav />
      <main>
        <Hero />
        <Offers />
        <VisitBuilder />
        <BeforeAfter />
        <Stylists />
        <Reviews />
        <Gallery />
        <Visit />
      </main>
      <Footer />
      <StickyBook />
    </div>
  );
}

/* ───────────────────────── Nav ───────────────────────── */

function Nav() {
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  const { book } = useActions();
  useMotionValueEvent(scrollY, "change", (y) => setSolid(y > 30));
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
      <nav className={`mx-auto flex max-w-[1280px] items-center justify-between rounded-full py-2 pl-5 pr-2 transition-all duration-500 ${solid ? "bg-white/80 shadow-[0_10px_40px_-18px_rgba(58,26,46,0.35)] ring-1 ring-black/5 backdrop-blur-xl" : ""}`}>
        <a href="#top" aria-label="Glow Studio home">
          <Logo />
        </a>
        <ul className="hidden items-center gap-8 text-[15px] md:flex">
          {[
            ["Services", "#services"],
            ["Glow facial", "#results"],
            ["Stylists", "#stylists"],
            ["Visit", "#visit"],
          ].map(([l, h]) => (
            <li key={h}>
              <a href={h} className="text-[#3A1A2E]/70 transition-colors hover:text-[#B8445E]">
                {l}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <span className="hidden lg:inline-flex">
            <OpenBadge />
          </span>
          <button type="button" onClick={() => book([])} className="flex h-11 items-center gap-2 rounded-full px-5 text-[14px] font-semibold text-white transition-colors hover:bg-[#8E2C45]" style={{ background: GS.berry }}>
            <WhatsAppIcon className="size-4" /> Book now
          </button>
        </div>
      </nav>
    </header>
  );
}

/* ───────────────────────── Hero ───────────────────────── */

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const slot = useNextSlot();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 70]);
  const rot = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 140]);

  const line = (t: React.ReactNode, d: number) => (
    <span className="block overflow-hidden pb-[0.08em]">
      <motion.span className="block" initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 1.1, ease: EASE, delay: d }}>
        {t}
      </motion.span>
    </span>
  );

  return (
    <section id="top" ref={ref} className="relative overflow-hidden px-5 pb-16 pt-28 sm:px-8 sm:pt-36 lg:pb-24" style={{ background: `linear-gradient(180deg, ${GS.blush}, ${GS.cream})` }}>
      <div aria-hidden className="absolute -right-24 top-24 size-[480px] rounded-full opacity-70 blur-[110px]" style={{ background: GS.rose }} />
      <div className="relative mx-auto grid max-w-[1280px] items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE }} className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[0.2em] backdrop-blur" style={{ color: GS.berry }}>
            <Sparkle className="size-3" /> Hair · Skin · Makeup · Nails · Bridal
          </motion.p>
          <h1 className={`${SERIF} mt-7 text-[clamp(3.4rem,8.6vw,8rem)] leading-[0.92] tracking-[-0.02em]`}>
            {line("Book your", 0.1)}
            {line(
              <span className="italic" style={{ color: GS.berry }}>
                glow-up.
              </span>,
              0.22,
            )}
          </h1>
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: EASE, delay: 0.4 }} className="mt-6 max-w-[31rem] text-[18px] leading-relaxed sm:text-[19px]" style={{ color: GS.mute }}>
            Hair, skin and bridal makeup by artists who listen first. Walk in tired, walk out glowing, right here in Old Palasia.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: EASE, delay: 0.5 }} className="mt-8 flex flex-wrap gap-3">
            <a href="#services" className="group inline-flex h-14 items-center gap-3 rounded-full pl-7 pr-2 text-[16px] font-semibold text-white shadow-[0_18px_40px_-16px_rgba(184,68,94,0.8)] transition-transform hover:-translate-y-0.5" style={{ background: GS.berry }}>
              Build your visit
              <span className="grid size-10 place-items-center rounded-full bg-white/20 transition-transform group-hover:rotate-90">↓</span>
            </a>
            <a href="#visit" className="inline-flex h-14 items-center rounded-full border-2 px-7 text-[16px] font-semibold transition-colors hover:bg-white" style={{ borderColor: GS.plum }}>
              Find us
            </a>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.75 }} className="mt-9 flex flex-wrap items-center gap-3">
            <Feature id="open" label="Live open status + next free slot" inline>
              <span className="flex flex-wrap items-center gap-2">
                <OpenBadge />
                <span className="rounded-full px-3 py-1.5 text-[13px] font-medium" style={{ background: "#fff", color: GS.berry }}>
                  Next free slot · {slot ?? "today"}
                </span>
              </span>
            </Feature>
          </motion.div>
          <p className="mt-6 flex items-center gap-2 text-[14px]">
            <span className="tracking-[-0.06em] text-[#E4A13A]">★★★★★</span>
            <b>4.9</b>
            <span style={{ color: GS.mute }}>· 860 Google reviews</span>
          </p>
        </div>

        <motion.div initial={{ opacity: 0, y: 30, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 1.2, ease: EASE, delay: 0.2 }} className="relative mx-auto w-[84%] max-w-[470px] lg:w-full">
          <div className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-[40px] shadow-[0_50px_100px_-40px_rgba(58,26,46,0.6)]">
            <motion.div style={{ y }} className="absolute -inset-y-12 inset-x-0">
              <Image src="/images/glow-studio/hero.jpg" alt="Makeup artist applying blush at Glow Studio" fill priority sizes="(min-width: 1024px) 470px, 84vw" className="object-cover object-[45%_30%]" />
            </motion.div>
          </div>
          {/* Sticker */}
          <motion.div style={{ rotate: rot }} className="absolute -left-8 top-[12%] size-[118px] sm:-left-14 sm:size-[140px]">
            <svg viewBox="0 0 200 200" className="size-full animate-[spin_22s_linear_infinite] motion-reduce:animate-none">
              <circle cx="100" cy="100" r="98" fill={GS.plum} />
              <defs>
                <path id="gs-stamp" d="M100,100 m-72,0 a72,72 0 1,1 144,0 a72,72 0 1,1 -144,0" />
              </defs>
              <text fill={GS.blush} style={{ fontFamily: "var(--gs-sans)", fontSize: 14, fontWeight: 700, letterSpacing: "0.22em" }}>
                <textPath href="#gs-stamp">BRIDAL BOOKINGS OPEN · 2026 – 27 ·</textPath>
              </text>
            </svg>
            <Sparkle className="absolute left-1/2 top-1/2 size-8 -translate-x-1/2 -translate-y-1/2 text-[#EDB4BF]" />
          </motion.div>
          {/* Floating cards */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, ease: EASE, delay: 0.9 }} className="absolute -right-3 bottom-[18%] flex items-center gap-3 rounded-[20px] bg-white p-3 pr-5 shadow-[0_24px_50px_-20px_rgba(58,26,46,0.5)] sm:-right-10">
            <span className="relative size-12 overflow-hidden rounded-full">
              <Image src="/images/glow-studio/glow-face.jpg" alt="" fill sizes="48px" className="object-cover" />
            </span>
            <span className="leading-tight">
              <span className="block text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color: GS.berry }}>
                Bestseller
              </span>
              <span className={`${SERIF} block text-[18px]`}>Signature glow facial</span>
              <span className="text-[12px]" style={{ color: GS.mute }}>
                60 min · ₹1,999
              </span>
            </span>
          </motion.div>
          <Sparkle className="absolute -right-2 top-6 size-7 animate-pulse text-[#C99A5B]" />
        </motion.div>
      </div>
    </section>
  );
}

/* ───────────────────────── Offers ribbon ───────────────────────── */

function Offers() {
  const row = (
    <div className="flex shrink-0 items-center">
      {OFFERS.map((o) => (
        <span key={o} className="flex items-center">
          <span className={`${SERIF} px-8 text-[24px] italic sm:text-[30px]`}>{o}</span>
          <Sparkle className="size-4 shrink-0 text-[#EDB4BF]" />
        </span>
      ))}
    </div>
  );
  return (
    <Feature id="offers" label="Offers banner">
      <div className="overflow-hidden py-4 text-white" style={{ background: GS.plum }}>
        <div className="marquee [animation-duration:40s]">
          {row}
          {row}
        </div>
      </div>
    </Feature>
  );
}

/* ───────────────────────── Sticky mobile ───────────────────────── */

function StickyBook() {
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);
  const { book } = useActions();
  useMotionValueEvent(scrollY, "change", (y) => setShow(y > 700));
  return (
    <motion.div initial={false} animate={{ y: show ? 0 : 120, opacity: show ? 1 : 0 }} transition={{ duration: 0.5, ease: EASE }} className="fixed bottom-[84px] right-4 z-[60] md:hidden">
      <Feature id="sticky" label="Sticky book button on phones">
        <button type="button" onClick={() => book([])} className="flex h-14 items-center gap-2 rounded-full px-6 text-[15px] font-semibold text-white shadow-[0_15px_40px_-10px_rgba(184,68,94,0.8)]" style={{ background: GS.berry }}>
          <WhatsAppIcon className="size-5" /> Book now
        </button>
      </Feature>
    </motion.div>
  );
}
