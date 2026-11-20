"use client";

import { AnimatePresence, motion, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Feature } from "../shared/Feature";
import { ADDRESS, BASE, FG, MAPS_URL, PAGES } from "./data";
import { fgBody, fgDisplay, fgMono } from "./fonts";
import { Asterisk, Btn, D, EASE, Lines, MONO, OpenBadge, useActions } from "./shared";

export function ForgeShell({ children }: { children: React.ReactNode }) {
  const [menu, setMenu] = useState(false);
  return (
    <div
      className={`${fgDisplay.variable} ${fgBody.variable} ${fgMono.variable} min-h-screen overflow-x-clip [font-family:var(--fg-body)] antialiased selection:bg-[#FF4D2E] selection:text-black`}
      style={{ background: FG.bg, color: FG.bone }}
    >
      <Nav open={menu} setOpen={setMenu} />
      {children}
      <Footer />
      <StickyTrial hidden={menu} />
      <Cursor />
    </div>
  );
}

/* ───────────────────────── Custom cursor ───────────────────────── */

function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [hover, setHover] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 600, damping: 40, mass: 0.35 });
  const sy = useSpring(y, { stiffness: 600, damping: 40, mass: 0.35 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine) return;
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e: PointerEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>("[data-cursor],a,button");
      setHover(!!el);
      setLabel(el?.dataset.cursor ?? null);
    };
    const first = () => setEnabled(true);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerover", over);
    window.addEventListener("pointermove", first, { once: true });
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      window.removeEventListener("pointermove", first);
    };
  }, [x, y]);

  if (!enabled) return null;
  return (
    <>
      <motion.div aria-hidden className="pointer-events-none fixed left-0 top-0 z-[90] hidden mix-blend-difference md:block" style={{ x: sx, y: sy }}>
        <motion.div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full bg-[#EDEAE4]"
          animate={{ width: label ? 0 : hover ? 56 : 12, height: label ? 0 : hover ? 56 : 12 }}
          transition={{ type: "spring", stiffness: 320, damping: 26 }}
        />
      </motion.div>
      <motion.div aria-hidden className="pointer-events-none fixed left-0 top-0 z-[90] hidden md:block" style={{ x: sx, y: sy }}>
        <AnimatePresence>
          {label && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 24 }}
              className={`absolute grid size-[84px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full text-center text-black ${MONO}`}
              style={{ background: FG.heat }}
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}

/* ───────────────────────── Nav ───────────────────────── */

export function Logo() {
  return (
    <span className="flex items-center gap-2">
      <Asterisk className="size-5 animate-[spin_12s_linear_infinite] text-[#FF4D2E] motion-reduce:animate-none" />
      <span className={`${D} text-[22px] leading-none tracking-[-0.02em]`}>Forge</span>
    </span>
  );
}

function Nav({ open, setOpen }: { open: boolean; setOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setSolid(y > 40);
    setHidden(y > 400 && y > prev);
  });
  useLayoutEffect(() => () => setOpen(false), [setOpen]);
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);
  const links = PAGES.slice(1, 5);

  return (
    <>
      <motion.header
        animate={{ y: hidden && !open ? "-100%" : "0%" }}
        transition={{ duration: 0.5, ease: EASE }}
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${solid && !open ? "bg-[#0B0B0B]/80 backdrop-blur-xl" : ""}`}
      >
        <Feature id="pages" label="6-page website with page transitions" labelPosition="bottom">
          <nav className="mx-auto flex h-[76px] max-w-[1480px] items-center justify-between px-5 sm:px-8">
            <Link href={BASE} aria-label="FORGE home" className={open ? "text-black" : ""}>
              <Logo />
            </Link>
            <ul className="hidden items-center gap-1 lg:flex">
              {links.map((p) => {
                const active = pathname === p.href;
                return (
                  <li key={p.href}>
                    <Link href={p.href} className={`group relative flex items-center gap-1.5 rounded-full px-4 py-2 text-[14px] font-medium transition-colors ${active ? "text-[#EDEAE4]" : "text-[#EDEAE4]/60 hover:text-[#EDEAE4]"}`}>
                      <span className="[font-family:var(--fg-mono)] text-[10px]" style={{ color: active ? FG.heat : undefined }}>
                        {p.n}
                      </span>
                      {p.label}
                      {active && <motion.span layoutId="fg-nav" className="absolute inset-0 -z-10 rounded-full border" style={{ borderColor: FG.line }} />}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="flex items-center gap-3">
              <span className="hidden xl:inline-flex">
                <OpenBadge />
              </span>
              <span className="hidden sm:inline-flex">
                <Btn href={`${BASE}/trial`} className="h-11! px-5!" cursor="Book">
                  Free trial <span className="text-[16px]">→</span>
                </Btn>
              </span>
              <button
                type="button"
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                onClick={() => setOpen((o) => !o)}
                className={`grid size-11 place-items-center rounded-full border transition-colors lg:hidden ${open ? "border-black/30 text-black" : "border-white/20"}`}
              >
                <span className="relative block h-3 w-5">
                  <span className={`absolute left-0 block h-[1.5px] w-5 bg-current transition-all duration-300 ${open ? "top-1.5 rotate-45" : "top-0.5"}`} />
                  <span className={`absolute left-0 block h-[1.5px] w-5 bg-current transition-all duration-300 ${open ? "top-1.5 -rotate-45" : "top-2.5"}`} />
                </span>
              </button>
            </div>
          </nav>
        </Feature>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[49] flex flex-col justify-between px-5 pb-28 pt-24 text-black lg:hidden"
            style={{ background: FG.bone }}
          >
            <ul>
              {PAGES.map((p, i) => {
                const active = pathname === p.href;
                return (
                  <motion.li key={p.href} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 + i * 0.05, duration: 0.7, ease: EASE }} className="border-b border-black/15">
                    <Link href={p.href} onClick={() => setOpen(false)} className="flex items-baseline gap-4 py-2.5">
                      <span className="[font-family:var(--fg-mono)] text-[12px]" style={{ color: FG.heat }}>
                        {p.n}
                      </span>
                      <span className={`${D} text-[40px] leading-[1.05] tracking-[-0.03em] ${active ? "text-[#FF4D2E]" : ""}`}>{p.label}</span>
                    </Link>
                  </motion.li>
                );
              })}
            </ul>
            <div className={`flex items-center justify-between ${MONO} text-black/60`}>
              <span>New Palasia, Indore</span>
              <span>Mon–Sat 6–22</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ───────────────────────── Inner page head ───────────────────────── */

export function PageHead({ n, kicker, title, accent, sub, img, pos = "50% 40%" }: { n: string; kicker: string; title: string; accent: string; sub: string; img?: string; pos?: string }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 100]);
  const clip = useTransform(scrollYProgress, [0, 1], ["inset(0% 0% 0% 0%)", reduce ? "inset(0% 0% 0% 0%)" : "inset(8% 6% 8% 6%)"]);
  return (
    <section ref={ref} className="relative px-5 pb-12 pt-32 sm:px-8 sm:pb-16 sm:pt-40">
      <div className="mx-auto max-w-[1480px]">
        <div className="flex items-center justify-between">
          <p className={`${MONO}`} style={{ color: FG.heat }}>
            ({n}) {kicker}
          </p>
          <OpenBadge />
        </div>
        <h1 className={`${D} mt-6 text-[clamp(2.2rem,10vw,10.5rem)] leading-[0.88] tracking-[-0.045em]`}>
          <Lines now lines={[title, <span key="a" style={{ color: FG.heat }}>{accent}</span>]} delay={0.25} />
        </h1>
        <div className="mt-8 grid gap-8 border-t pt-6 lg:grid-cols-[1fr_1fr]" style={{ borderColor: FG.line }}>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.9 }} className="max-w-[34rem] text-[17px] leading-relaxed sm:text-[19px]" style={{ color: FG.mute }}>
            {sub}
          </motion.p>
        </div>
      </div>
      {img && (
        <motion.div style={{ clipPath: clip }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 1 }} className="relative mx-auto mt-12 h-[42vh] max-w-[1480px] overflow-hidden sm:h-[56vh]">
          <motion.div style={{ y }} className="absolute -inset-y-16 inset-x-0">
            <Image src={img} alt="" fill priority sizes="100vw" className="object-cover grayscale" style={{ objectPosition: pos }} />
          </motion.div>
          <div className="absolute inset-0 bg-[#FF4D2E] mix-blend-multiply opacity-0 transition-opacity duration-700 hover:opacity-40" />
        </motion.div>
      )}
    </section>
  );
}

/* ───────────────────────── Footer ───────────────────────── */

function Footer() {
  const { call } = useActions();
  return (
    <footer className="relative overflow-hidden px-5 pb-32 pt-20 sm:px-8">
      <div className="mx-auto max-w-[1480px]">
        <div className="grid gap-12 border-t pt-12 lg:grid-cols-[1.3fr_1fr_1fr_1fr]" style={{ borderColor: FG.line }}>
          <div>
            <h2 className={`${D} text-[clamp(2.2rem,4vw,3.4rem)] leading-[0.95] tracking-[-0.03em]`}>
              <Lines lines={["Stop scrolling.", <span key="b" style={{ color: FG.heat }}>Start lifting.</span>]} />
            </h2>
            <div className="mt-8 flex flex-wrap gap-3">
              <Btn href={`${BASE}/trial`} cursor="Book">
                Book free trial
              </Btn>
              <Btn onClick={call} variant="line">
                Call us
              </Btn>
            </div>
          </div>
          <FooterCol title="Pages">
            {PAGES.map((p) => (
              <Link key={p.href} href={p.href} className="transition-colors hover:text-[#FF4D2E]">
                {p.label}
              </Link>
            ))}
          </FooterCol>
          <FooterCol title="Hours">
            <span>Mon – Sat · 6 am – 10 pm</span>
            <span>Sunday · 8 am – 12 noon</span>
            <OpenBadge />
          </FooterCol>
          <FooterCol title="Studio">
            <span>{ADDRESS}</span>
            <a href={MAPS_URL} target="_blank" rel="noopener" className="text-[#FF4D2E]">
              Directions ↗
            </a>
            <span>Instagram · YouTube · Strava</span>
          </FooterCol>
        </div>
        <p aria-hidden className={`${D} mt-16 flex select-none items-center justify-between whitespace-nowrap text-[min(16vw,250px)] leading-[0.8] tracking-[-0.06em]`}>
          Forge
          <Asterisk className="size-[0.6em] animate-[spin_16s_linear_infinite] text-[#FF4D2E] motion-reduce:animate-none" />
        </p>
        <div className={`mt-8 flex flex-col justify-between gap-2 border-t pt-5 sm:flex-row ${MONO}`} style={{ borderColor: FG.line, color: FG.mute }}>
          <span>© 2026 Forge Athletics, Indore</span>
          <Link href="/" className="hover:text-[#EDEAE4]">
            Website by CodeCult Studio
          </Link>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className={MONO} style={{ color: FG.heat }}>
        {title}
      </p>
      <div className="mt-5 flex flex-col gap-2.5 text-[15px]" style={{ color: FG.bone }}>
        {children}
      </div>
    </div>
  );
}

/* ───────────────────────── Sticky mobile trial ───────────────────────── */

function StickyTrial({ hidden }: { hidden: boolean }) {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setShow(y > 600));
  const visible = show && !hidden && pathname !== `${BASE}/trial`;
  return (
    <motion.div initial={false} animate={{ y: visible ? 0 : 120, opacity: visible ? 1 : 0 }} transition={{ duration: 0.5, ease: EASE }} className="fixed bottom-[84px] right-4 z-[60] lg:hidden">
      <Feature id="sticky" label="Sticky trial button on phones">
        <Link href={`${BASE}/trial`} className="flex h-14 items-center gap-2 rounded-full px-6 text-[13px] font-semibold uppercase tracking-[0.14em] text-black shadow-[0_15px_40px_-10px_rgba(255,77,46,0.7)]" style={{ background: FG.heat }}>
          Free trial →
        </Link>
      </Feature>
    </motion.div>
  );
}
