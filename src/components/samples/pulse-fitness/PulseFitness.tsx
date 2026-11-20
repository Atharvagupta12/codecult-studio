"use client";

import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef, useState } from "react";
import { WhatsAppIcon } from "@/components/ui/icons";
import { Feature } from "../shared/Feature";
import { fmtTime, useIndiaNow } from "../shared/indiaTime";
import { BATCHES, PF } from "./data";
import { pfBody, pfDisplay } from "./fonts";
import { Classes, Faq, Footer, Gallery, Plans, Reviews, Timetable, Trainers, TrialCta, Visit, WhyPulse } from "./sections";
import { D, EASE, Heartbeat, Logo, OpenBadge, PulseLine, Stars, useActions } from "./shared";

export function PulseFitness() {
  return (
    <div
      className={`${pfDisplay.variable} ${pfBody.variable} min-h-screen overflow-x-clip [font-family:var(--pf-body)] antialiased`}
      style={{ background: PF.bg, color: PF.ink }}
    >
      <Nav />
      <main>
        <Hero />
        <ClassBand />
        <WhyPulse />
        <Classes />
        <Timetable />
        <Plans />
        <Trainers />
        <Reviews />
        <Gallery />
        <TrialCta />
        <Faq />
        <Visit />
      </main>
      <Footer />
      <StickyTrial />
    </div>
  );
}

/* ───────────────────────── Nav ───────────────────────── */

const LINKS = [
  ["Classes", "#classes"],
  ["Timings", "#timings"],
  ["Plans", "#plans"],
  ["Trainers", "#trainers"],
  ["Visit", "#visit"],
];

function Nav() {
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  const { trial } = useActions();
  useMotionValueEvent(scrollY, "change", (y) => setSolid(y > 30));

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
      <nav
        className={`mx-auto flex max-w-[1320px] items-center justify-between rounded-[22px] py-2 pl-3 pr-2 transition-all duration-500 ${
          solid ? "bg-white/85 shadow-[0_14px_40px_-18px_rgba(11,16,48,0.35)] ring-1 ring-black/5 backdrop-blur-xl" : ""
        }`}
      >
        <a href="#top" aria-label="Pulse home">
          <Logo />
        </a>
        <ul className="hidden items-center gap-1 text-[14px] font-semibold md:flex">
          {LINKS.map(([l, h]) => (
            <li key={h}>
              <a href={h} className="rounded-full px-4 py-2 transition-colors hover:bg-[#3A5BFF]/10 hover:text-[#3A5BFF]">
                {l}
              </a>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={trial}
          className="group flex h-11 items-center gap-2 rounded-[14px] px-4 text-[14px] font-bold text-white shadow-[0_10px_24px_-10px_rgba(58,91,255,0.9)] transition-transform hover:-translate-y-0.5 sm:px-5"
          style={{ background: PF.blue }}
        >
          <span className="hidden sm:inline">Book free trial</span>
          <span className="sm:hidden">Free trial</span>
          <span className="grid size-6 place-items-center rounded-full bg-white/20 transition-transform group-hover:translate-x-0.5">→</span>
        </button>
      </nav>
    </header>
  );
}

/* ───────────────────────── Hero ───────────────────────── */

function useNextBatch() {
  const now = useIndiaNow();
  if (!now) return null;
  const today = BATCHES.filter((b) => b.days.includes(now.day)).sort((a, b) => a.start - b.start);
  const live = today.find((b) => now.minutes >= b.start && now.minutes < b.end);
  if (live) return { b: live, label: "Live now" };
  const next = today.find((b) => b.start > now.minutes);
  if (next) return { b: next, label: "Next batch today" };
  const tomorrow = BATCHES.filter((b) => b.days.includes((now.day + 1) % 7)).sort((a, b) => a.start - b.start)[0];
  return tomorrow ? { b: tomorrow, label: "First batch tomorrow" } : null;
}

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { trial } = useActions();
  const next = useNextBatch();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 70]);
  const cardY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -80]);
  const stickerRot = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 160]);

  const line = (text: React.ReactNode, delay: number) => (
    <span className="block overflow-hidden pb-[0.08em]">
      <motion.span className="block" initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 1, ease: EASE, delay }}>
        {text}
      </motion.span>
    </span>
  );

  return (
    <section id="top" ref={ref} className="relative overflow-hidden px-5 pb-14 pt-28 sm:px-8 sm:pt-32 lg:pb-24 lg:pt-36">
      {/* Background */}
      <div aria-hidden className="absolute -right-[20%] -top-[30%] size-[900px] rounded-full opacity-70 blur-[140px]" style={{ background: PF.sky }} />
      <div aria-hidden className="absolute -left-40 bottom-0 size-[420px] rounded-full opacity-40 blur-[120px]" style={{ background: "#FFE8A3" }} />
      <div aria-hidden className="absolute inset-0 [background-image:radial-gradient(rgba(58,91,255,0.16)_1px,transparent_1px)] [background-size:26px_26px] [mask-image:linear-gradient(to_bottom,black,transparent_80%)]" />

      <div className="relative mx-auto grid max-w-[1320px] items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8">
        <div className="relative z-10">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE }} className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-[12px] font-bold uppercase tracking-[0.12em] shadow-[0_6px_20px_-12px_rgba(11,16,48,0.4)]" style={{ color: PF.blue }}>
              <Heartbeat className="h-3 w-5" /> Fitness club · Saket Nagar, Indore
            </span>
          </motion.div>

          <h1 className={`${D} mt-6 text-[clamp(3rem,6.6vw,6.4rem)] font-[800] leading-[0.92] tracking-[-0.055em]`}>
            {line("Feel strong.", 0.1)}
            {line(
              <>
                <span style={{ color: PF.blue }}>Every</span> day.
              </>,
              0.2,
            )}
          </h1>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.5 }} className="-ml-1 mt-2 h-10 w-full max-w-[560px] sm:h-14">
            <PulseLine className="size-full" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.4 }}
            className="mt-4 max-w-[30rem] text-[17px] leading-[1.65] sm:text-[19px]"
            style={{ color: PF.mute }}
          >
            Friendly trainers, flexible batches from 5 am, and a bright, spotless gym that actually feels welcoming. Beginners very welcome.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.5 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Feature id="trial" label="Free-trial booking on WhatsApp" inline>
              <button
                type="button"
                onClick={trial}
                className="group inline-flex h-[58px] items-center gap-3 rounded-[18px] pl-6 pr-2 text-[16px] font-bold text-white shadow-[0_18px_40px_-14px_rgba(58,91,255,0.9)] transition-transform hover:-translate-y-0.5"
                style={{ background: PF.blue }}
              >
                <WhatsAppIcon className="size-5" />
                Book your free trial
                <span className="grid size-[42px] place-items-center rounded-[13px] bg-white text-[18px] transition-transform duration-500 group-hover:rotate-[-45deg]" style={{ color: PF.blue }}>
                  →
                </span>
              </button>
            </Feature>
            <a
              href="#plans"
              className="inline-flex h-[58px] items-center rounded-[18px] border-2 bg-white/60 px-6 text-[16px] font-bold backdrop-blur transition-colors hover:bg-white"
              style={{ borderColor: PF.ink }}
            >
              See plans & prices
            </a>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.75 }} className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-3">
                {["friends", "high-five", "dance", "crunch"].map((n) => (
                  <span key={n} className="relative size-10 overflow-hidden rounded-full border-[3px] border-white shadow">
                    <Image src={`/images/pulse-fitness/${n}.jpg`} alt="" fill sizes="40px" className="object-cover" />
                  </span>
                ))}
              </div>
              <p className="text-[13px] leading-tight">
                <span className={`${D} block text-[16px] font-[800]`}>1,200+</span>
                <span style={{ color: PF.mute }}>happy members</span>
              </p>
            </div>
            <div className="h-9 w-px" style={{ background: PF.line }} />
            <p className="text-[13px] leading-tight">
              <Stars className="text-[15px]" />
              <span className="block" style={{ color: PF.mute }}>
                <b className="text-[#0B1030]">4.9</b> · 540 Google reviews
              </span>
            </p>
          </motion.div>
        </div>

        {/* Visual */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, ease: EASE, delay: 0.15 }}
          className="relative mx-auto w-full max-w-[520px] pb-6 lg:pb-0"
        >
          <div aria-hidden className="absolute inset-0 translate-x-4 translate-y-4 rotate-[5deg] rounded-[44px] sm:translate-x-6" style={{ background: PF.blue }} />
          <div className="relative aspect-[4/5] overflow-hidden rounded-[44px] shadow-[0_50px_100px_-40px_rgba(11,16,48,0.6)]">
            <motion.div style={{ y: imgY }} className="absolute -inset-y-12 inset-x-0">
              <Image src="/images/pulse-fitness/hero.jpg" alt="Smiling member fist-bumping after a workout" fill priority sizes="(min-width: 1024px) 520px, 92vw" className="object-cover object-[50%_30%]" />
            </motion.div>
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0B1030]/50 to-transparent" />
          </div>

          {/* Sticker */}
          <motion.div style={{ rotate: stickerRot }} className="absolute -right-3 -top-6 size-[112px] sm:-right-8 sm:size-[136px]">
            <svg viewBox="0 0 200 200" className="size-full animate-[spin_20s_linear_infinite] motion-reduce:animate-none">
              <circle cx="100" cy="100" r="98" fill={PF.sun} />
              <defs>
                <path id="pf-stamp" d="M100,100 m-72,0 a72,72 0 1,1 144,0 a72,72 0 1,1 -144,0" />
              </defs>
              <text fill={PF.ink} style={{ fontFamily: "var(--pf-display)", fontSize: 15, fontWeight: 800, letterSpacing: "0.12em" }}>
                <textPath href="#pf-stamp">FIRST SESSION FREE · NO PRESSURE ·</textPath>
              </text>
            </svg>
            <span className={`${D} absolute inset-0 grid place-items-center text-[22px] font-[900] tracking-[-0.04em] sm:text-[26px]`} style={{ color: PF.ink }}>
              FREE
            </span>
          </motion.div>

          {/* Next batch card */}
          <motion.div
            style={{ y: cardY }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.7 }}
            className="absolute -left-3 top-[14%] w-[230px] rounded-[22px] bg-white p-4 shadow-[0_30px_60px_-25px_rgba(11,16,48,0.5)] sm:-left-12"
          >
            <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em]" style={{ color: next?.label === "Live now" ? "#16A34A" : PF.blue }}>
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full opacity-70" style={{ background: next?.label === "Live now" ? "#22C55E" : PF.blue }} />
                <span className="relative inline-flex size-2 rounded-full" style={{ background: next?.label === "Live now" ? "#22C55E" : PF.blue }} />
              </span>
              {next?.label ?? "Next batch"}
            </p>
            <p className={`${D} mt-2 text-[17px] font-[800] leading-tight tracking-[-0.03em]`}>{next ? next.b.name : "Evening Strength"}</p>
            <p className="mt-1 text-[13px]" style={{ color: PF.mute }}>
              {next ? `${fmtTime(next.b.start)} · with ${next.b.coach}` : "7 pm · with Vikram"}
            </p>
            <div className="mt-3 flex items-center justify-between">
              <span className="rounded-full px-2.5 py-1 text-[11px] font-bold" style={{ background: "#FFF3D1", color: "#9A6A00" }}>
                4 spots left
              </span>
              <span className="text-[12px] font-bold" style={{ color: PF.blue }}>
                Book →
              </span>
            </div>
          </motion.div>

          {/* Burn ring */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.9 }}
            className="absolute -bottom-2 right-2 flex items-center gap-3 rounded-[22px] bg-[#0B1030] p-3 pr-5 text-white shadow-[0_30px_60px_-20px_rgba(11,16,48,0.7)] sm:-right-8 sm:bottom-10"
          >
            <svg viewBox="0 0 48 48" className="size-14 -rotate-90">
              <circle cx="24" cy="24" r="19" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="6" />
              <motion.circle
                cx="24"
                cy="24"
                r="19"
                fill="none"
                stroke={PF.sun}
                strokeWidth="6"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 0.78 }}
                transition={{ duration: 1.8, ease: EASE, delay: 1.1 }}
              />
            </svg>
            <span className="leading-tight">
              <span className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-white/60">Avg. class burn</span>
              <span className={`${D} block text-[22px] font-[800] tracking-[-0.03em]`}>
                486 <span className="text-[13px] font-[500] text-white/60">kcal</span>
              </span>
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* Hero footer */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.9 }}
        className="relative mx-auto mt-14 flex max-w-[1320px] flex-wrap items-center justify-between gap-4 lg:mt-16"
      >
        <Feature id="open" label="Live open / closed status" inline>
          <OpenBadge />
        </Feature>
        <div className="grid w-full grid-cols-3 gap-3 sm:w-auto sm:gap-8">
          {[
            ["8", "certified trainers"],
            ["5 am", "earliest batch"],
            ["6 yrs", "in Saket Nagar"],
          ].map(([k, v]) => (
            <p key={v} className="leading-tight">
              <span className={`${D} block text-[22px] font-[800] tracking-[-0.04em] sm:text-[28px]`}>{k}</span>
              <span className="text-[12px] sm:text-[13px]" style={{ color: PF.mute }}>
                {v}
              </span>
            </p>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/* ───────────────────────── Class band ───────────────────────── */

const BAND = ["Strength", "Zumba", "Power Yoga", "HIIT", "Functional", "Ladies batch", "Cardio", "Personal training"];

function ClassBand() {
  const row = (
    <div className="flex shrink-0 items-center">
      {BAND.map((w, i) => (
        <span key={w} className="flex items-center">
          <span className={`${D} px-6 text-[28px] font-[800] uppercase tracking-[-0.03em] sm:px-8 sm:text-[40px] ${i % 2 ? "text-[#FFD23F]" : ""}`}>{w}</span>
          <Heartbeat className="h-5 w-9 shrink-0 text-[#FFD23F]" strokeWidth={3} />
        </span>
      ))}
    </div>
  );
  return (
    <div aria-hidden className="relative py-6">
      <div className="-rotate-[1.5deg] py-4 text-white shadow-[0_30px_60px_-30px_rgba(58,91,255,0.9)]" style={{ background: PF.blue }}>
        <div className="marquee [animation-duration:38s]">
          {row}
          {row}
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── Sticky mobile trial ───────────────────────── */

function StickyTrial() {
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);
  const { trial } = useActions();
  useMotionValueEvent(scrollY, "change", (y) => setShow(y > 700));
  return (
    <motion.div
      initial={false}
      animate={{ y: show ? 0 : 120, opacity: show ? 1 : 0 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="fixed bottom-[84px] right-4 z-[60] md:hidden"
    >
      <Feature id="sticky" label="Sticky trial button on phones" labelPosition="top">
        <button
          type="button"
          onClick={trial}
          className="flex h-14 items-center gap-2 rounded-[18px] pl-4 pr-5 text-[15px] font-bold text-white shadow-[0_15px_40px_-10px_rgba(58,91,255,0.9)]"
          style={{ background: PF.blue }}
        >
          <WhatsAppIcon className="size-5" /> Free trial
        </button>
      </Feature>
    </motion.div>
  );
}
