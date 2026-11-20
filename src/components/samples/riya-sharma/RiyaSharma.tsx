"use client";

import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef, useState } from "react";
import { Feature } from "../shared/Feature";
import { CLIENTS, RS } from "./data";
import { rsHand, rsSans, rsSerif } from "./fonts";
import { About, Contact, Footer, Process, Services, Testimonials, Work } from "./sections";
import { EASE, HAND, Pill, SERIF, ScribbleArrow, ScribbleCircle, Sparkle, useActions } from "./shared";

export function RiyaSharma() {
  return (
    <div
      className={`${rsSans.variable} ${rsSerif.variable} ${rsHand.variable} min-h-screen overflow-x-clip [font-family:var(--rs-sans)] antialiased selection:bg-[#6C47FF] selection:text-white`}
      style={{ background: RS.paper, color: RS.ink }}
    >
      <Nav />
      <main>
        <Hero />
        <Clients />
        <Work />
        <About />
        <Services />
        <Process />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <StickyTalk />
    </div>
  );
}

/* ───────────────────────── Availability badge ───────────────────────── */

export function Available({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-[13px] font-medium shadow-[0_6px_20px_-12px_rgba(22,22,22,0.4)] ${className}`}>
      <span className="relative flex size-2">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#22C55E] opacity-70" />
        <span className="relative inline-flex size-2 rounded-full bg-[#22C55E]" />
      </span>
      Available for projects · Dec 2026
    </span>
  );
}

/* ───────────────────────── Nav ───────────────────────── */

function Nav() {
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setSolid(y > 30));
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
      <nav className={`mx-auto flex max-w-[1280px] items-center justify-between rounded-full py-2 pl-5 pr-2 transition-all duration-500 ${solid ? "bg-white/80 shadow-[0_10px_40px_-18px_rgba(22,22,22,0.35)] ring-1 ring-black/5 backdrop-blur-xl" : ""}`}>
        <a href="#top" className="text-[26px] font-bold leading-none tracking-[-0.05em]">
          riya<span style={{ color: RS.violet }}>.</span>
        </a>
        <ul className="hidden items-center gap-8 text-[15px] md:flex">
          {[
            ["Work", "#work"],
            ["About", "#about"],
            ["Services", "#services"],
            ["Contact", "#contact"],
          ].map(([l, h]) => (
            <li key={h}>
              <a href={h} className="group relative py-1 text-[#161616]/70 transition-colors hover:text-[#161616]">
                {l}
                <span className="absolute -bottom-0.5 left-0 h-[1.5px] w-0 bg-[#6C47FF] transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>
        <a href="#contact" className="flex h-11 items-center gap-2 rounded-full bg-[#161616] px-5 text-[14px] font-medium text-white transition-colors hover:bg-[#6C47FF]">
          Let&apos;s talk <span className="text-[16px]">↗</span>
        </a>
      </nav>
    </header>
  );
}

/* ───────────────────────── Hero ───────────────────────── */

const STICKERS = [
  { label: "Branding", cls: "bg-[#6C47FF] text-white", pos: "left-[-6%] top-[12%]", rot: -10 },
  { label: "UI / UX", cls: "bg-[#FFE9A8]", pos: "right-[-8%] top-[30%]", rot: 8 },
  { label: "Packaging", cls: "bg-[#FFD9C7]", pos: "left-[-10%] bottom-[24%]", rot: 6 },
  { label: "✦ 40+ brands", cls: "bg-[#CDEFE0]", pos: "right-[-4%] bottom-[10%]", rot: -6 },
];

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 60]);

  const line = (text: React.ReactNode, delay: number) => (
    <span className="block overflow-hidden pb-[0.1em]">
      <motion.span className="block" initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 1, ease: EASE, delay }}>
        {text}
      </motion.span>
    </span>
  );

  return (
    <section id="top" ref={ref} className="relative overflow-hidden px-5 pb-12 pt-28 sm:px-8 sm:pt-36 lg:pb-20">
      <div aria-hidden className="absolute -right-32 top-20 size-[520px] rounded-full opacity-60 blur-[120px]" style={{ background: RS.lilac }} />
      <div aria-hidden className="absolute -left-40 bottom-0 size-[380px] rounded-full opacity-50 blur-[120px]" style={{ background: RS.peach }} />

      <div className="relative mx-auto grid max-w-[1280px] items-center gap-14 lg:grid-cols-[1.25fr_0.75fr] lg:gap-10">
        <div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE }} className="flex flex-wrap items-center gap-3">
            <Available />
          </motion.div>

          <h1 className="mt-7 text-[clamp(3rem,7.6vw,7.4rem)] font-semibold leading-[0.95] tracking-[-0.055em]">
            {line("Design that", 0.1)}
            {line(
              <>
                people{" "}
                <span className="relative ml-[0.08em] inline-block">
                  <span className={`${SERIF} italic tracking-[-0.02em]`} style={{ color: RS.violet }}>
                    remember.
                  </span>
                  <ScribbleCircle className="-inset-x-[6%] -inset-y-[14%] h-[128%] w-[112%]" delay={1} />
                </span>
              </>,
              0.2,
            )}
          </h1>

          <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: EASE, delay: 0.45 }} className="mt-7 max-w-[34rem] text-[18px] leading-[1.6] sm:text-[20px]" style={{ color: RS.mute }}>
            Hi, I&apos;m <b className="font-semibold text-[#161616]">Riya Sharma</b>, a brand & UI designer from Indore. I help small brands look big with identities, packaging and websites people love.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: EASE, delay: 0.55 }} className="mt-9 flex flex-wrap items-center gap-3">
            <Pill href="#work">
              See my work
              <span className="grid size-7 place-items-center rounded-full bg-white/15 transition-transform duration-300 group-hover:translate-y-0.5">↓</span>
            </Pill>
            <Pill href="#contact" dark={false}>
              Start a project
            </Pill>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.8 }} className="mt-12 grid max-w-[30rem] grid-cols-3 gap-4 border-t pt-6" style={{ borderColor: RS.line }}>
            {[
              ["40+", "brands designed"],
              ["6 yrs", "of experience"],
              ["4.9★", "client rating"],
            ].map(([k, v]) => (
              <div key={v}>
                <p className={`${SERIF} text-[40px] leading-none`}>{k}</p>
                <p className="mt-1.5 text-[13px]" style={{ color: RS.mute }}>
                  {v}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Portrait + draggable stickers */}
        <motion.div initial={{ opacity: 0, scale: 0.94, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 1.2, ease: EASE, delay: 0.2 }} className="relative mx-auto w-[78%] max-w-[400px] lg:w-full">
          <div ref={frame} className="absolute -inset-10 sm:-inset-16" />
          <div aria-hidden className="absolute inset-0 translate-x-4 translate-y-4 rounded-[200px_200px_36px_36px]" style={{ background: RS.violet }} />
          <div className="relative aspect-[4/5] overflow-hidden rounded-[200px_200px_36px_36px]" style={{ background: "#D7DED9" }}>
            <motion.div style={{ y: imgY }} className="absolute -inset-y-10 inset-x-0">
              <Image src="/images/riya-sharma/riya.jpg" alt="Riya Sharma, brand designer" fill priority sizes="(min-width: 1024px) 400px, 78vw" className="object-cover object-[58%_30%]" />
            </motion.div>
          </div>

          <Feature id="stickers" label="Playful drag-able stickers" className="absolute! inset-0">
            <div className="absolute inset-0">
              {STICKERS.map((s, i) => (
                <motion.button
                  key={s.label}
                  type="button"
                  drag
                  dragConstraints={frame}
                  dragElastic={0.25}
                  dragMomentum={false}
                  whileDrag={{ scale: 1.1, rotate: 0, zIndex: 20 }}
                  whileHover={{ scale: 1.06 }}
                  initial={{ opacity: 0, scale: 0.5, rotate: s.rot }}
                  animate={{ opacity: 1, scale: 1, rotate: s.rot }}
                  transition={{ type: "spring", stiffness: 300, damping: 18, delay: 0.9 + i * 0.12 }}
                  className={`absolute ${s.pos} cursor-grab touch-none whitespace-nowrap rounded-full px-4 py-2 text-[15px] font-semibold shadow-[0_12px_30px_-12px_rgba(22,22,22,0.5)] active:cursor-grabbing sm:px-5 sm:py-2.5 sm:text-[17px] ${s.cls}`}
                >
                  {s.label}
                </motion.button>
              ))}
            </div>
          </Feature>

          <div className="pointer-events-none absolute -bottom-14 right-[-2%] flex items-end gap-1 sm:-bottom-16">
            <ScribbleArrow className="h-10 w-12 -scale-y-100 rotate-[200deg]" delay={1.6} />
            <span className={`${HAND} -rotate-6 text-[22px] font-medium`} style={{ color: RS.violet }}>
              psst… drag the stickers!
            </span>
          </div>
          <Sparkle className="absolute -left-6 -top-4 size-8 animate-[spin_8s_linear_infinite] text-[#FFC93C] motion-reduce:animate-none" />
        </motion.div>
      </div>
    </section>
  );
}

/* ───────────────────────── Clients ───────────────────────── */

function Clients() {
  const row = (
    <div className="flex shrink-0 items-center">
      {CLIENTS.map((c) => (
        <span key={c.name} className="flex items-center">
          <span className={`px-8 text-[26px] text-[#161616]/55 transition-colors hover:text-[#161616] sm:px-12 sm:text-[32px] ${c.style}`}>{c.name}</span>
          <Sparkle className="size-3 shrink-0 text-[#161616]/25" />
        </span>
      ))}
    </div>
  );
  return (
    <section aria-label="Brands I've worked with" className="border-y py-7" style={{ borderColor: RS.line }}>
      <p className="mb-5 text-center text-[13px] font-medium uppercase tracking-[0.16em]" style={{ color: RS.mute }}>
        Trusted by 40+ brands across India
      </p>
      <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
        <div className="marquee [animation-duration:40s]">
          {row}
          {row}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Sticky mobile CTA ───────────────────────── */

function StickyTalk() {
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);
  const { contact } = useActions();
  useMotionValueEvent(scrollY, "change", (y) => setShow(y > 700));
  return (
    <motion.div initial={false} animate={{ y: show ? 0 : 120, opacity: show ? 1 : 0 }} transition={{ duration: 0.5, ease: EASE }} className="fixed bottom-[84px] right-4 z-[60] md:hidden">
      <Feature id="sticky" label="Sticky contact button on phones">
        <button type="button" onClick={() => contact()} className="flex h-14 items-center gap-2 rounded-full bg-[#6C47FF] px-6 text-[15px] font-medium text-white shadow-[0_15px_40px_-10px_rgba(108,71,255,0.8)]">
          Let&apos;s talk ↗
        </button>
      </Feature>
    </motion.div>
  );
}
