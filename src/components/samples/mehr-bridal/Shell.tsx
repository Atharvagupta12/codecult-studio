"use client";

import { AnimatePresence, motion, useMotionValue, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";
import { Feature } from "../shared/Feature";
import { BASE, IMG, MB, PAGES } from "./data";
import { mbSans, mbSerif } from "./fonts";
import { Btn, EASE, LABEL, Lines, SERIF, useActions } from "./shared";

export function MehrShell({ children }: { children: React.ReactNode }) {
  const [menu, setMenu] = useState(false);
  return (
    <div className={`${mbSerif.variable} ${mbSans.variable} min-h-screen overflow-x-clip [font-family:var(--mb-sans)] antialiased selection:bg-[#E7B59E] selection:text-[#1A0A0E]`} style={{ background: MB.bg, color: MB.blush }}>
      <Nav open={menu} setOpen={setMenu} />
      {children}
      <Footer />
      <StickyBook hidden={menu} />
      <Cursor />
    </div>
  );
}

/* ── Rose-gold cursor ── */
function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [hover, setHover] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 380, damping: 36, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 380, damping: 36, mass: 0.5 });
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
    <motion.div aria-hidden className="pointer-events-none fixed left-0 top-0 z-[90] hidden md:block" style={{ x: sx, y: sy }}>
      <motion.div
        className="grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border"
        style={{ borderColor: MB.rose }}
        animate={{ width: label ? 88 : hover ? 48 : 30, height: label ? 88 : hover ? 48 : 30, backgroundColor: label ? MB.rose : "rgba(231,181,158,0)" }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
      >
        <AnimatePresence>
          {label && (
            <motion.span initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className={`${SERIF} text-[13px] italic text-[#1A0A0E]`}>
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

/* ── Nav ── */
export function Logo() {
  return (
    <span className="flex items-baseline gap-2">
      <span className={`${SERIF} text-[30px] italic leading-none`}>Mehr</span>
      <span className="text-[9px] font-medium uppercase tracking-[0.35em]" style={{ color: MB.rose }}>
        bridal
      </span>
    </span>
  );
}

function Nav({ open, setOpen }: { open: boolean; setOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setSolid(y > 50));
  useLayoutEffect(() => () => setOpen(false), [setOpen]);
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);
  const isActive = (href: string) => (href === BASE ? pathname === BASE : pathname.startsWith(href));

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${solid && !open ? "bg-[#1A0A0E]/80 backdrop-blur-xl" : ""}`}>
        <Feature id="pages" label="6-page website with silk transitions" labelPosition="bottom">
          <nav className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-5 sm:px-10">
            <Link href={BASE} aria-label="Mehr Bridal home">
              <Logo />
            </Link>
            <ul className="hidden items-center gap-8 lg:flex">
              {PAGES.slice(1, 5).map((p) => {
                const on = isActive(p.href);
                return (
                  <li key={p.href}>
                    <Link href={p.href} className={`group relative text-[14px] transition-colors ${on ? "text-[#E7B59E]" : "text-[#F7E7DF]/70 hover:text-[#F7E7DF]"}`}>
                      {p.label}
                      <span className={`absolute -bottom-1.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-[#E7B59E] transition-opacity ${on ? "opacity-100" : "opacity-0 group-hover:opacity-60"}`} />
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline-flex">
                <Btn href={`${BASE}/book`} className="h-11! px-6!" cursor="Book">
                  Check my dates
                </Btn>
              </span>
              <button type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen((o) => !o)} className="grid size-11 place-items-center rounded-full border border-[#E7B59E]/40 lg:hidden">
                <span className="relative block h-2.5 w-5">
                  <span className={`absolute left-0 block h-px w-5 bg-current transition-all ${open ? "top-1 rotate-45" : "top-0"}`} />
                  <span className={`absolute left-0 block h-px w-5 bg-current transition-all ${open ? "top-1 -rotate-45" : "top-2.5"}`} />
                </span>
              </button>
            </div>
          </nav>
        </Feature>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ clipPath: "circle(0% at 92% 5%)" }} animate={{ clipPath: "circle(160% at 92% 5%)" }} exit={{ clipPath: "circle(0% at 92% 5%)" }} transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }} className="fixed inset-0 z-[49] overflow-hidden lg:hidden" style={{ background: MB.wine }}>
            <div className="absolute inset-0 opacity-25">
              <Image src={IMG.hero} alt="" fill sizes="100vw" className="object-cover" />
            </div>
            <div className="relative flex h-full flex-col justify-end px-6 pb-28">
              {PAGES.map((p, i) => (
                <motion.div key={p.href} initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 + i * 0.06, duration: 0.8, ease: EASE }}>
                  <Link href={p.href} onClick={() => setOpen(false)} className={`${SERIF} block py-1 text-[42px] italic leading-[1.15] ${isActive(p.href) ? "text-[#E7B59E]" : ""}`}>
                    {p.label}
                  </Link>
                </motion.div>
              ))}
              <p className={`${LABEL} mt-8 text-[10px] text-[#B7948B]`}>Bridal makeup artist · Indore & destination</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/** Inner page header */
export function PageHead({ kicker, title, italic, sub, img }: { kicker: string; title: string; italic: string; sub: string; img?: string }) {
  return (
    <section className="relative overflow-hidden px-5 pb-14 pt-36 sm:px-10 sm:pb-20 sm:pt-44">
      {img && (
        <>
          <div className="absolute inset-0 opacity-30">
            <Image src={img} alt="" fill priority sizes="100vw" className="object-cover object-[50%_30%]" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#1A0A0E]/60 via-[#1A0A0E]/80 to-[#1A0A0E]" />
        </>
      )}
      <div className="relative mx-auto max-w-[1440px] text-center">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className={`${LABEL} inline-flex items-center gap-3`} style={{ color: MB.rose }}>
          ✿ {kicker} ✿
        </motion.p>
        <h1 className={`${SERIF} mt-6 text-[clamp(3rem,8.4vw,8.4rem)] leading-[0.95]`}>
          <Lines now delay={0.2} lines={[title, <span key="i" className="italic" style={{ color: MB.rose }}>{italic}</span>]} />
        </h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7, duration: 1 }} className="mx-auto mt-6 max-w-[36rem] text-[17px] leading-relaxed text-[#F7E7DF]/70">
          {sub}
        </motion.p>
      </div>
    </section>
  );
}

/* ── Footer ── */
function Footer() {
  const { instagram } = useActions();
  return (
    <footer className="relative overflow-hidden border-t px-5 pb-32 pt-20 sm:px-10" style={{ borderColor: MB.line }}>
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <p className={`${SERIF} text-[clamp(2.2rem,4.6vw,4rem)] italic leading-[1.05]`}>
              Your day, <span style={{ color: MB.rose }}>your glow.</span>
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Btn href={`${BASE}/book`} cursor="Book">
                Check my dates
              </Btn>
              <Btn onClick={instagram} variant="line" cursor="Follow">
                @mehr.bridal
              </Btn>
            </div>
          </div>
          <div>
            <p className={LABEL} style={{ color: MB.rose }}>
              Explore
            </p>
            <ul className="mt-5 flex flex-col gap-2 text-[15px]">
              {PAGES.map((p) => (
                <li key={p.href}>
                  <Link href={p.href} className="text-[#F7E7DF]/70 hover:text-[#E7B59E]">
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className={LABEL} style={{ color: MB.rose }}>
              Studio
            </p>
            <p className="mt-5 text-[15px] leading-relaxed text-[#F7E7DF]/70">
              Studio Mehr, 2nd floor, Apollo Square
              <br />
              Race Course Road, Indore 452003
              <br />
              By appointment · travels India-wide
            </p>
          </div>
        </div>
        <p aria-hidden className={`${SERIF} mt-16 select-none text-center text-[min(30vw,420px)] italic leading-[0.8] text-[#E7B59E]/10`}>
          Mehr
        </p>
        <div className="mt-6 flex flex-col justify-between gap-2 border-t pt-5 text-[12px] text-[#B7948B] sm:flex-row" style={{ borderColor: MB.line }}>
          <span>© 2026 Mehr Bridal Studio, Indore</span>
          <Link href="/" className="hover:text-[#F7E7DF]">
            Website by CodeCult Studio
          </Link>
        </div>
      </div>
    </footer>
  );
}

function StickyBook({ hidden }: { hidden: boolean }) {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setShow(y > 600));
  const visible = show && !hidden && pathname !== `${BASE}/book`;
  return (
    <motion.div initial={false} animate={{ y: visible ? 0 : 120, opacity: visible ? 1 : 0 }} transition={{ duration: 0.5, ease: EASE }} className="fixed bottom-[84px] right-4 z-[60] sm:hidden">
      <Feature id="sticky" label="Sticky date-check button on phones">
        <Link href={`${BASE}/book`} className="flex h-12 items-center rounded-full bg-[#E7B59E] px-5 text-[13px] font-medium uppercase tracking-[0.16em] text-[#1A0A0E] shadow-[0_15px_40px_-10px_rgba(231,181,158,0.6)]">
          Check my dates
        </Link>
      </Feature>
    </motion.div>
  );
}
