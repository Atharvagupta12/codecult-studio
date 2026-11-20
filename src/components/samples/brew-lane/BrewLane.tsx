"use client";

import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef, useState } from "react";
import { WhatsAppIcon } from "@/components/ui/icons";
import { Feature } from "../shared/Feature";
import { BL } from "./data";
import { blBody, blDisplay } from "./fonts";
import { Footer, Gallery, MenuSection, Reviews, Signatures, Story, Visit } from "./sections";
import { Bean, D, EASE, OpenBadge, SOFT, WONK, useOrderAction } from "./shared";

export function BrewLane() {
  return (
    <div
      className={`${blDisplay.variable} ${blBody.variable} min-h-screen overflow-x-clip [font-family:var(--bl-body)] antialiased`}
      style={{ background: BL.cream, color: BL.espresso }}
    >
      <Nav />
      <main>
        <Hero />
        <Bands />
        <Signatures />
        <MenuSection />
        <Story />
        <Reviews />
        <Gallery />
        <Visit />
      </main>
      <Footer />
      <StickyOrder />
    </div>
  );
}

/* ───────────────────────── Nav ───────────────────────── */

function Nav() {
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  const order = useOrderAction();
  useMotionValueEvent(scrollY, "change", (y) => setSolid(y > 30));

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
      <nav
        className={`mx-auto flex max-w-[1320px] items-center justify-between rounded-full py-2 pl-5 pr-2 transition-all duration-500 ${
          solid ? "bg-[#FBF6EE]/85 shadow-[0_10px_40px_-15px_rgba(34,20,13,0.35)] ring-1 ring-black/5 backdrop-blur-xl" : ""
        }`}
      >
        <a href="#top" className={`${D} ${SOFT} text-[26px] font-[700] leading-none tracking-[-0.03em]`}>
          Brew Lane<span style={{ color: BL.caramel }}>.</span>
        </a>
        <ul className="hidden items-center gap-8 text-[15px] font-medium md:flex">
          {[
            ["Menu", "#menu"],
            ["Our story", "#story"],
            ["Reviews", "#reviews"],
            ["Visit", "#visit"],
          ].map(([l, h]) => (
            <li key={h}>
              <a href={h} className="relative opacity-75 transition-opacity hover:opacity-100">
                {l}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <span className="hidden lg:inline-flex">
            <OpenBadge />
          </span>
          <button
            type="button"
            onClick={order}
            className="flex h-11 items-center gap-2 rounded-full px-4 text-[14px] font-semibold text-[#FBF6EE] transition-transform hover:scale-[1.03] sm:px-5"
            style={{ background: BL.espresso }}
          >
            <WhatsAppIcon className="size-4" />
            <span className="hidden sm:inline">Order on WhatsApp</span>
            <span className="sm:hidden">Order</span>
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
  const order = useOrderAction();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 90]);
  const stampRot = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 120]);
  const smallY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -60]);

  const line = (text: React.ReactNode, delay: number, extra = "") => (
    <span className="block overflow-hidden pb-[0.06em]">
      <motion.span
        className={`block ${extra}`}
        initial={{ y: "105%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1.1, ease: EASE, delay }}
      >
        {text}
      </motion.span>
    </span>
  );

  return (
    <section id="top" ref={ref} className="relative overflow-hidden px-5 pb-16 pt-28 sm:px-8 sm:pt-36 lg:min-h-[100svh] lg:pb-24">
      <div aria-hidden className="absolute -right-40 top-10 size-[620px] rounded-full opacity-60 blur-[120px]" style={{ background: BL.latte }} />

      <div className="relative mx-auto grid max-w-[1320px] items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
        {/* Copy */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="flex items-center gap-2.5 text-[12px] font-semibold uppercase tracking-[0.22em]"
            style={{ color: BL.caramel }}
          >
            <Bean className="size-4" /> Specialty coffee · Vijay Nagar, Indore
          </motion.p>

          <h1 className={`${D} ${SOFT} mt-6 text-[clamp(3.6rem,10vw,9.6rem)] font-[600] leading-[0.86] tracking-[-0.045em]`}>
            {line("Slow coffee,", 0.1)}
            {line(
              <>
                <span className={`${WONK} italic`} style={{ color: BL.caramel }}>
                  fast
                </span>{" "}
                smiles.
              </>,
              0.22,
            )}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.45 }}
            className="mt-7 max-w-[30rem] text-[17px] leading-[1.65] sm:text-[19px]"
            style={{ color: BL.mute }}
          >
            Small-batch roasts, flaky croissants and the comfiest corner seats in the city. Come for one cup, stay for three.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.55 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <a
              href="#menu"
              className="group inline-flex h-14 items-center gap-3 rounded-full pl-7 pr-2 text-[16px] font-semibold text-[#FBF6EE] transition-transform hover:scale-[1.02]"
              style={{ background: BL.espresso }}
            >
              See the menu
              <span className="grid size-10 place-items-center rounded-full transition-transform duration-500 group-hover:rotate-90" style={{ background: BL.caramel }}>
                <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round">
                  <path d="M12 5v14M6 13l6 6 6-6" />
                </svg>
              </span>
            </a>
            <Feature id="whatsapp" label="Order on WhatsApp" inline>
              <button
                type="button"
                onClick={order}
                className="inline-flex h-14 items-center gap-2.5 rounded-full border-2 px-6 text-[16px] font-semibold transition-colors hover:bg-black/5"
                style={{ borderColor: BL.espresso }}
              >
                <WhatsAppIcon className="size-5 text-[#1DA851]" />
                Order on WhatsApp
              </button>
            </Feature>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.75 }}
            className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3"
          >
            <Feature id="open" label="Live open / closed status" inline>
              <OpenBadge />
            </Feature>
            <span className="flex items-center gap-2 text-[14px] font-medium">
              <span className="text-[#E8A33D]">★★★★★</span> 4.8 · 312 Google reviews
            </span>
          </motion.div>
        </div>

        {/* Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.4, ease: EASE, delay: 0.2 }}
          className="relative mx-auto w-full max-w-[520px]"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-b-[36px] rounded-t-[999px] shadow-[0_50px_100px_-30px_rgba(34,20,13,0.55)]">
            <motion.div style={{ y: imgY }} className="absolute -inset-y-16 inset-x-0">
              <Image src="/images/brew-lane/cappuccino.jpg" alt="House cappuccino with latte art" fill priority sizes="(min-width: 1024px) 520px, 90vw" className="object-cover" />
            </motion.div>
          </div>

          {/* Rotating stamp */}
          <motion.div style={{ rotate: stampRot }} className="absolute -left-6 top-10 size-[120px] sm:-left-10 sm:size-[150px]">
            <svg viewBox="0 0 200 200" className="size-full animate-[spin_24s_linear_infinite] motion-reduce:animate-none">
              <circle cx="100" cy="100" r="98" fill={BL.caramel} />
              <defs>
                <path id="bl-stamp" d="M100,100 m-70,0 a70,70 0 1,1 140,0 a70,70 0 1,1 -140,0" />
              </defs>
              <text fill={BL.paper} style={{ fontFamily: "var(--bl-body)", fontSize: 12.5, fontWeight: 700, letterSpacing: "0.16em" }}>
                <textPath href="#bl-stamp">FRESHLY ROASTED · SMALL BATCH · SINCE 2019 ·</textPath>
              </text>
            </svg>
            <span className="absolute inset-0 grid place-items-center text-[#FBF6EE]">
              <Bean className="size-9" />
            </span>
          </motion.div>

          {/* Today's pour card */}
          <motion.div
            style={{ y: smallY }}
            className="absolute -bottom-6 -left-4 flex w-[280px] items-center gap-3 rounded-[22px] bg-[#FBF6EE] p-3 shadow-[0_30px_60px_-20px_rgba(34,20,13,0.45)] sm:-left-14"
          >
            <span className="relative size-14 shrink-0 overflow-hidden rounded-2xl">
              <Image src="/images/brew-lane/pour-over.jpg" alt="" fill sizes="56px" className="object-cover" />
            </span>
            <span className="leading-tight">
              <span className="block text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: BL.caramel }}>
                Today&apos;s pour
              </span>
              <span className={`${D} ${SOFT} block whitespace-nowrap text-[16px] font-[600]`}>Ethiopia Yirgacheffe</span>
              <span className="block text-[12px]" style={{ color: BL.mute }}>
                jasmine · citrus · honey
              </span>
            </span>
          </motion.div>

          {/* Small round croissant */}
          <div className="absolute -right-3 bottom-16 size-[110px] overflow-hidden rounded-full border-[6px] border-[#F4EADB] shadow-xl sm:-right-8 sm:size-[140px]">
            <Image src="/images/brew-lane/croissant.jpg" alt="" fill sizes="140px" className="object-cover" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ───────────────────────── Crossing bands ───────────────────────── */

const BAND = ["Cappuccino", "Cold brew", "Butter croissant", "Pour over", "Burnt cheesecake", "Hazelnut latte", "Flat white"];

function Bands() {
  const row = (
    <div className="flex shrink-0 items-center">
      {BAND.map((w) => (
        <span key={w} className="flex items-center">
          <span className={`${D} ${WONK} px-6 text-[34px] italic sm:text-[46px]`}>{w}</span>
          <Bean className="size-6 shrink-0 opacity-60" />
        </span>
      ))}
    </div>
  );
  return (
    <div aria-hidden className="relative -my-4 h-[150px] overflow-hidden sm:h-[190px]">
      <div className="absolute inset-x-[-5%] top-1/2 -translate-y-1/2 rotate-[3deg] py-3" style={{ background: BL.caramel, color: BL.paper }}>
        <div className="marquee [animation-direction:reverse] [animation-duration:46s]">
          {row}
          {row}
        </div>
      </div>
      <div className="absolute inset-x-[-5%] top-1/2 -translate-y-1/2 -rotate-[2deg] py-3 shadow-2xl" style={{ background: BL.espresso, color: BL.cream }}>
        <div className="marquee [animation-duration:40s]">
          {row}
          {row}
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── Sticky mobile order ───────────────────────── */

function StickyOrder() {
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);
  const order = useOrderAction();
  useMotionValueEvent(scrollY, "change", (y) => setShow(y > 700));
  return (
    <motion.div
      initial={false}
      animate={{ y: show ? 0 : 120, opacity: show ? 1 : 0 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="fixed bottom-[84px] right-4 z-[60] md:hidden"
    >
      <Feature id="sticky" label="Sticky order button" labelPosition="top">
        <button
          type="button"
          onClick={order}
          className="flex h-14 items-center gap-2 rounded-full pl-4 pr-5 text-[15px] font-semibold text-white shadow-[0_15px_40px_-10px_rgba(29,168,81,0.7)]"
          style={{ background: "#1DA851" }}
        >
          <WhatsAppIcon className="size-5" /> Order now
        </button>
      </Feature>
    </motion.div>
  );
}
