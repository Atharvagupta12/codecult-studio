"use client";

import { AnimatePresence, motion, useMotionValue, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";
import { Feature } from "../shared/Feature";
import { AM, BASE, PAGES, SLIDES } from "./data";
import { amMono, amSans, amSerif } from "./fonts";
import { Btn, EASE, Lines, MONO, SERIF, useActions } from "./shared";

export function AaravShell({ children }: { children: React.ReactNode }) {
  const [menu, setMenu] = useState(false);
  return (
    <div className={`${amSans.variable} ${amSerif.variable} ${amMono.variable} min-h-screen overflow-x-clip [font-family:var(--am-sans)] antialiased selection:bg-[#D9B97A] selection:text-black`} style={{ background: AM.bg, color: AM.ivory }}>
      <Nav open={menu} setOpen={setMenu} />
      {children}
      <Footer />
      <StickyBook hidden={menu} />
      <Viewfinder />
    </div>
  );
}

/* ───────────────────────── Viewfinder cursor ───────────────────────── */

function Viewfinder() {
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [hover, setHover] = useState(false);
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
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
  const size = label ? 92 : hover ? 44 : 26;
  return (
    <motion.div aria-hidden className="pointer-events-none fixed left-0 top-0 z-[90] hidden md:block" style={{ x: sx, y: sy }}>
      <motion.div className="relative -translate-x-1/2 -translate-y-1/2" animate={{ width: size, height: size }} transition={{ type: "spring", stiffness: 320, damping: 26 }}>
        {["left-0 top-0 border-l border-t", "right-0 top-0 border-r border-t", "bottom-0 left-0 border-b border-l", "bottom-0 right-0 border-b border-r"].map((c) => (
          <span key={c} className={`absolute size-2.5 ${c}`} style={{ borderColor: label ? AM.gold : AM.ivory }} />
        ))}
        <span className="absolute left-1/2 top-1/2 size-1 -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: label ? AM.gold : AM.ivory }} />
        <AnimatePresence>
          {label && (
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={`absolute inset-x-0 -bottom-6 text-center ${MONO}`} style={{ color: AM.gold }}>
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

/* ───────────────────────── Nav ───────────────────────── */

export function Logo() {
  return (
    <span className="flex flex-col leading-none">
      <span className="text-[20px] font-semibold tracking-[-0.04em] [font-variation-settings:'wdth'_85]">aarav mehta</span>
      <span className={`${MONO} mt-1 text-[9px]`} style={{ color: AM.gold }}>
        photography
      </span>
    </span>
  );
}

function Nav({ open, setOpen }: { open: boolean; setOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  const [hovered, setHovered] = useState(0);
  useMotionValueEvent(scrollY, "change", (y) => setSolid(y > 60));
  useLayoutEffect(() => () => setOpen(false), [setOpen]);
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);
  const isActive = (href: string) => (href === BASE ? pathname === BASE : pathname.startsWith(href));

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${solid && !open ? "bg-gradient-to-b from-black/80 to-transparent backdrop-blur-[2px]" : ""}`}>
        <Feature id="pages" label="6-page website + story pages" labelPosition="bottom">
          <nav className="mx-auto flex h-20 max-w-[1500px] items-center justify-between px-5 sm:px-10">
            <Link href={BASE} aria-label="Aarav Mehta home">
              <Logo />
            </Link>
            <ul className="hidden items-center gap-9 lg:flex">
              {PAGES.slice(1, 5).map((p) => {
                const on = isActive(p.href);
                return (
                  <li key={p.href}>
                    <Link href={p.href} className={`group relative text-[14px] transition-colors ${on ? "text-[#F2EDE4]" : "text-[#F2EDE4]/60 hover:text-[#F2EDE4]"}`}>
                      {p.label}
                      <span className={`absolute -bottom-1.5 left-0 h-px bg-[#D9B97A] transition-all duration-500 ${on ? "w-full" : "w-0 group-hover:w-full"}`} />
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline-flex">
                <Btn href={`${BASE}/book`} variant="gold" className="h-11! px-6!" cursor="Book">
                  Check my dates
                </Btn>
              </span>
              <button type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen((o) => !o)} className="flex h-11 items-center gap-3 rounded-full border border-white/20 px-4 text-[13px] lg:hidden">
                {open ? "Close" : "Menu"}
                <span className="relative block h-2.5 w-5">
                  <span className={`absolute left-0 block h-px w-5 bg-current transition-all duration-300 ${open ? "top-1 rotate-45" : "top-0"}`} />
                  <span className={`absolute left-0 block h-px w-5 bg-current transition-all duration-300 ${open ? "top-1 -rotate-45" : "top-2.5"}`} />
                </span>
              </button>
            </div>
          </nav>
        </Feature>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ clipPath: "inset(0 0 100% 0)" }} animate={{ clipPath: "inset(0 0 0% 0)" }} exit={{ clipPath: "inset(0 0 100% 0)" }} transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }} className="fixed inset-0 z-[49] lg:hidden" style={{ background: AM.bg }}>
            <AnimatePresence mode="popLayout">
              <motion.div key={hovered} initial={{ opacity: 0 }} animate={{ opacity: 0.35 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }} className="absolute inset-0">
                <Image src={SLIDES[hovered % SLIDES.length].img} alt="" fill sizes="100vw" className="object-cover" />
              </motion.div>
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
            <div className="relative flex h-full flex-col justify-end px-6 pb-28 pt-24">
              <ul>
                {PAGES.map((p, i) => (
                  <motion.li key={p.href} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.06, duration: 0.8, ease: EASE }}>
                    <Link href={p.href} onClick={() => setOpen(false)} onPointerEnter={() => setHovered(i)} className="flex items-baseline gap-4 py-1.5">
                      <span className={MONO} style={{ color: AM.gold }}>
                        {p.n}
                      </span>
                      <span className={`${SERIF} text-[46px] italic leading-[1.05] ${isActive(p.href) ? "text-[#D9B97A]" : ""}`}>{p.label}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <p className={`${MONO} mt-8`} style={{ color: AM.mute }}>
                Based in Indore · Shooting across India
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ───────────────────────── Inner page head ───────────────────────── */

export function PageHead({ n, kicker, title, italic, sub }: { n: string; kicker: string; title: string; italic: string; sub: string }) {
  return (
    <section className="px-5 pb-12 pt-36 sm:px-10 sm:pb-16 sm:pt-44">
      <div className="mx-auto max-w-[1500px]">
        <p className={MONO} style={{ color: AM.gold }}>
          ({n}) {kicker}
        </p>
        <h1 className="mt-6 text-[clamp(3rem,9.5vw,9.5rem)] font-medium leading-[0.92] tracking-[-0.045em] [font-variation-settings:'wdth'_80]">
          <Lines now delay={0.2} lines={[title, <span key="i" className={`${SERIF} italic tracking-[-0.02em] [font-variation-settings:normal]`}>{italic}</span>]} />
        </h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 1 }} className="mt-8 max-w-[36rem] text-[17px] leading-relaxed sm:text-[19px]" style={{ color: AM.mute }}>
          {sub}
        </motion.p>
      </div>
    </section>
  );
}

/* ───────────────────────── Footer ───────────────────────── */

function Footer() {
  const { instagram } = useActions();
  return (
    <footer className="relative overflow-hidden border-t px-5 pb-32 pt-20 sm:px-10" style={{ borderColor: AM.line }}>
      <div className="mx-auto max-w-[1500px]">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className={`${SERIF} text-[clamp(2.4rem,5vw,4.2rem)] italic leading-[1.05]`}>Let&apos;s tell your story, beautifully.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Btn href={`${BASE}/book`} variant="gold" cursor="Book">
                Check my dates
              </Btn>
              <Btn onClick={instagram} variant="line" cursor="Follow">
                @aaravmehta.photo
              </Btn>
            </div>
          </div>
          <div>
            <p className={MONO} style={{ color: AM.gold }}>
              Explore
            </p>
            <ul className="mt-5 flex flex-col gap-2.5 text-[15px]">
              {PAGES.map((p) => (
                <li key={p.href}>
                  <Link href={p.href} className="text-[#F2EDE4]/70 transition-colors hover:text-[#F2EDE4]">
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className={MONO} style={{ color: AM.gold }}>
              Studio
            </p>
            <p className="mt-5 text-[15px] leading-relaxed text-[#F2EDE4]/70">
              Studio 4, Treasure Island Road
              <br />
              South Tukoganj, Indore 452001
              <br />
              By appointment only
            </p>
            <p className="mt-4 text-[15px] text-[#F2EDE4]/70">Booking 2026 – 27 weddings now</p>
          </div>
        </div>
        <p aria-hidden className="mt-20 select-none whitespace-nowrap text-[min(14vw,240px)] font-semibold leading-[0.8] tracking-[-0.06em] text-[#F2EDE4]/[0.08] [font-variation-settings:'wdth'_75]">
          aarav mehta
        </p>
        <div className={`mt-8 flex flex-col justify-between gap-2 border-t pt-5 sm:flex-row ${MONO}`} style={{ borderColor: AM.line, color: AM.mute }}>
          <span>© 2026 Aarav Mehta Photography</span>
          <Link href="/" className="hover:text-[#F2EDE4]">
            Website by CodeCult Studio
          </Link>
        </div>
      </div>
    </footer>
  );
}

/* ───────────────────────── Sticky mobile CTA ───────────────────────── */

function StickyBook({ hidden }: { hidden: boolean }) {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setShow(y > 600));
  const visible = show && !hidden && pathname !== `${BASE}/book`;
  return (
    <motion.div initial={false} animate={{ y: visible ? 0 : 120, opacity: visible ? 1 : 0 }} transition={{ duration: 0.5, ease: EASE }} className="fixed bottom-[84px] right-4 z-[60] lg:hidden">
      <Feature id="sticky" label="Sticky date-check button on phones">
        <Link href={`${BASE}/book`} className="flex h-12 items-center gap-2 rounded-full bg-[#D9B97A] px-5 text-[14px] font-medium text-black shadow-[0_15px_40px_-10px_rgba(217,185,122,0.6)]">
          Check my dates →
        </Link>
      </Feature>
    </motion.div>
  );
}
