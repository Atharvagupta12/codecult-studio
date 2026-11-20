"use client";

import { AnimatePresence, motion, useMotionValue, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";
import { Feature } from "../shared/Feature";
import { fmtTime } from "../shared/useOpenStatus";
import { AddedToast, CartDrawer, CartProvider, useCart } from "./cart";
import { ADDRESS, BASE, DAYS, EM, HOURS, PAGES } from "./data";
import { emBody, emDisplay } from "./fonts";
import { D, EASE, LABEL, OpenBadge, useExplain } from "./shared";

export function EmberShell({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <div className={`${emDisplay.variable} ${emBody.variable} min-h-screen overflow-x-clip [font-family:var(--em-body)] antialiased selection:bg-[#D9A55B] selection:text-[#0C0907]`} style={{ background: EM.bg, color: EM.cream }}>
        <Nav />
        {children}
        <Footer />
        <CartDrawer />
        <AddedToast />
        <Cursor />
      </div>
    </CartProvider>
  );
}

/* ───────────────────────── Custom cursor ───────────────────────── */

function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [hover, setHover] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });

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
    // Enable on first real pointer movement (avoids a stray ring on touch devices)
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
    <motion.div aria-hidden className="pointer-events-none fixed left-0 top-0 z-[90] hidden md:block" style={{ x: sx, y: sy }}>
      <motion.div
        className="-translate-x-1/2 -translate-y-1/2 rounded-full border"
        animate={{ width: label ? 76 : hover ? 46 : 26, height: label ? 76 : hover ? 46 : 26, backgroundColor: label ? EM.gold : "rgba(217,165,91,0)" }}
        transition={{ type: "spring", stiffness: 300, damping: 26 }}
        style={{ borderColor: EM.gold }}
      >
        <AnimatePresence>
          {label && (
            <motion.span initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 grid place-items-center text-[11px] font-bold uppercase tracking-[0.16em] text-[#0C0907]">
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

/* ───────────────────────── Nav ───────────────────────── */

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href={BASE} className={`flex items-center gap-2.5 ${className}`} aria-label="Ember home">
      <span className="relative grid size-2.5 place-items-center">
        <span className="absolute size-2.5 animate-ping rounded-full opacity-50" style={{ background: EM.flame }} />
        <span className="size-2 rounded-full" style={{ background: EM.flame }} />
      </span>
      <span className={`${D} text-[22px] uppercase tracking-[0.34em]`}>Ember</span>
    </Link>
  );
}

function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-[18px]" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 8h14l-1.2 11.2a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8L5 8Z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </svg>
  );
}

function Nav() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const { count, setDrawer } = useCart();
  useMotionValueEvent(scrollY, "change", (y) => setSolid(y > 60));
  useLayoutEffect(() => () => setOpen(false), []);
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${solid ? "border-b bg-[#0C0907]/80 backdrop-blur-xl" : "bg-gradient-to-b from-black/60 to-transparent"}`} style={{ borderColor: EM.line }}>
        <Feature id="pages" label="6-page website" labelPosition="bottom">
          <nav className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-5 sm:px-8">
            <Logo />
            <ul className="hidden items-center gap-8 lg:flex">
              {PAGES.map((p) => {
                const active = pathname === p.href;
                return (
                  <li key={p.href}>
                    <Link href={p.href} className={`relative py-2 text-[12px] font-semibold uppercase tracking-[0.24em] transition-colors ${active ? "" : "text-[#F3E9DC]/60 hover:text-[#F3E9DC]"}`}>
                      {p.label}
                      {active && <motion.span layoutId="em-nav" className="absolute inset-x-0 -bottom-0.5 h-px" style={{ background: EM.gold }} />}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="flex items-center gap-2">
              <button type="button" onClick={() => setDrawer(true)} aria-label={`Your order, ${count} items`} data-cursor="Order" className="relative grid size-11 place-items-center rounded-full border transition-colors hover:border-[#D9A55B]" style={{ borderColor: EM.line }}>
                <CartIcon />
                <AnimatePresence>
                  {count > 0 && (
                    <motion.span key={count} initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -right-1 -top-1 grid size-5 place-items-center rounded-full text-[10px] font-bold" style={{ background: EM.gold, color: EM.bg }}>
                      {count}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
              <Link href={`${BASE}/reserve`} data-cursor="Book" className="hidden h-11 items-center rounded-full px-6 text-[12px] font-semibold uppercase tracking-[0.2em] transition-colors hover:bg-[#F3E9DC] sm:flex" style={{ background: EM.gold, color: EM.bg }}>
                Reserve
              </Link>
              <button type="button" onClick={() => setOpen((o) => !o)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} className="grid size-11 place-items-center rounded-full border lg:hidden" style={{ borderColor: EM.line }}>
                <span className="relative block h-3 w-5">
                  <span className={`absolute left-0 block h-px w-5 bg-current transition-all ${open ? "top-1.5 rotate-45" : "top-0"}`} />
                  <span className={`absolute left-0 block h-px w-5 bg-current transition-all ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
                </span>
              </button>
            </div>
          </nav>
        </Feature>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[49] flex flex-col overflow-y-auto px-6 pb-28 pt-28 lg:hidden"
            style={{ background: EM.bg }}
          >
            <div className="absolute inset-0 opacity-25">
              <Image src="/images/ember/interior-candles.jpg" alt="" fill sizes="100vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-b from-[#0C0907] via-[#0C0907]/70 to-[#0C0907]" />
            </div>
            <ul className="relative flex flex-col">
              {PAGES.map((p, i) => (
                <motion.li key={p.href} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 + i * 0.06, duration: 0.8, ease: EASE }} className="border-b" style={{ borderColor: EM.line }}>
                  <Link href={p.href} onClick={() => setOpen(false)} className={`${D} flex items-baseline justify-between py-3 text-[44px] italic leading-tight`} style={{ color: pathname === p.href ? EM.gold : EM.cream }}>
                    {p.label}
                    <span className={`not-italic ${LABEL}`} style={{ color: EM.mute }}>
                      0{i + 1}
                    </span>
                  </Link>
                </motion.li>
              ))}
            </ul>
            <div className="relative mt-auto pt-10">
              <OpenBadge />
              <p className="mt-2 text-[14px]" style={{ color: EM.mute }}>
                {ADDRESS}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ───────────────────────── Footer ───────────────────────── */

const FOOTER_DAYS = [2, 3, 4, 5, 6, 0, 1];

function Footer() {
  const { call } = useExplain();
  return (
    <footer className="relative overflow-hidden border-t px-5 pb-32 pt-20 sm:px-8" style={{ borderColor: EM.line, background: EM.bg }}>
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className={`${D} mt-6 max-w-[20rem] text-[26px] italic leading-snug`}>A modern Indian kitchen, built around fire.</p>
          </div>
          <div>
            <p className={LABEL} style={{ color: EM.gold }}>
              Find us
            </p>
            <p className="mt-4 text-[15px] leading-relaxed" style={{ color: EM.mute }}>
              {ADDRESS}
            </p>
            <button type="button" onClick={call} className="mt-3 text-[15px] underline underline-offset-4">
              Call the restaurant
            </button>
          </div>
          <div>
            <p className={LABEL} style={{ color: EM.gold }}>
              Hours
            </p>
            <ul className="mt-4 flex flex-col gap-1 text-[14px]" style={{ color: EM.mute }}>
              {FOOTER_DAYS.map((d) => (
                <li key={d} className="flex justify-between gap-4">
                  <span>{DAYS[d].slice(0, 3)}</span>
                  <span>{HOURS[d][0] === HOURS[d][1] ? "Closed" : `${fmtTime(HOURS[d][0])} – ${fmtTime(HOURS[d][1])}`}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className={LABEL} style={{ color: EM.gold }}>
              Explore
            </p>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 text-[15px]" style={{ color: EM.mute }}>
              {PAGES.map((p) => (
                <li key={p.href}>
                  <Link href={p.href} className="hover:text-[#F3E9DC]">
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className={`${D} pointer-events-none mt-16 select-none whitespace-nowrap text-center text-[min(28vw,400px)] italic leading-[0.8]`} style={{ color: "rgba(217,165,91,0.12)" }}>
          Ember
        </p>
        <div className="mt-4 flex flex-col justify-between gap-2 border-t pt-6 text-[12px] sm:flex-row" style={{ borderColor: EM.line, color: EM.mute }}>
          <span>© 2026 Ember Modern Indian, Indore</span>
          <Link href="/" className="hover:text-[#F3E9DC]">
            Website by CodeCult Studio
          </Link>
        </div>
      </div>
    </footer>
  );
}

/** Page header used on inner pages: full-bleed photo, title, subtitle */
export function PageHero({ img, kicker, title, italic, sub }: { img: string; kicker: string; title: string; italic: string; sub?: string }) {
  return (
    <section className="relative flex min-h-[72svh] items-end overflow-hidden px-5 pb-16 pt-32 sm:px-8 sm:pb-20">
      <motion.div className="absolute inset-0" initial={{ scale: 1.15 }} animate={{ scale: 1 }} transition={{ duration: 2.4, ease: EASE }}>
        <Image src={img} alt="" fill priority sizes="100vw" className="object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#0C0907] via-[#0C0907]/55 to-[#0C0907]/30" />
      <div className="relative mx-auto w-full max-w-[1440px]">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1 }} className={`flex items-center gap-3 ${LABEL}`} style={{ color: EM.gold }}>
          <span className="h-px w-8" style={{ background: EM.gold }} />
          {kicker}
        </motion.p>
        <h1 className={`${D} mt-5 text-[clamp(3.2rem,9vw,8.5rem)] leading-[0.92] tracking-[-0.02em]`}>
          <span className="block overflow-hidden pb-[0.06em]">
            <motion.span className="block" initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 1.2, ease: EASE, delay: 0.35 }}>
              {title}
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-[0.1em]">
            <motion.span className="block italic" style={{ color: EM.gold }} initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 1.2, ease: EASE, delay: 0.47 }}>
              {italic}
            </motion.span>
          </span>
        </h1>
        {sub && (
          <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 1, ease: EASE }} className="mt-6 max-w-[34rem] text-[17px] leading-relaxed" style={{ color: EM.mute }}>
            {sub}
          </motion.p>
        )}
      </div>
    </section>
  );
}
