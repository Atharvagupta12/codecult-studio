"use client";

import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { WhatsAppIcon } from "@/components/ui/icons";
import { Feature } from "../shared/Feature";
import { ADDRESS, BASE, IP, MAPS_URL, PAGES } from "./data";
import { ipBody, ipDisplay } from "./fonts";
import { Btn, D, EASE, Kicker, LABEL, Logo, OpenBadge, useActions } from "./shared";

export function IronpeakShell({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div
      className={`${ipDisplay.variable} ${ipBody.variable} min-h-screen overflow-x-clip [font-family:var(--ip-body)] antialiased selection:bg-[#E5FF3D] selection:text-black`}
      style={{ background: IP.bg, color: IP.text }}
    >
      <Nav open={menuOpen} setOpen={setMenuOpen} />
      {children}
      <Footer />
      <StickyTrial hidden={menuOpen} />
    </div>
  );
}

/* ───────────────────────── Nav ───────────────────────── */

function Nav({ open, setOpen }: { open: boolean; setOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  const { trial } = useActions();
  useMotionValueEvent(scrollY, "change", (y) => setSolid(y > 40));
  // Close the menu when this route is hidden (pages stay mounted between visits)
  useLayoutEffect(() => () => setOpen(false), [setOpen]);
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${solid || open ? "bg-[#0A0A0A]/90 backdrop-blur-xl" : ""}`}>
        <Feature id="pages" label="4-page website" labelPosition="bottom">
          <nav className={`mx-auto flex max-w-[1440px] items-center justify-between px-5 transition-all duration-500 sm:px-8 ${solid ? "h-[64px]" : "h-[80px]"}`}>
            <Link href={BASE} aria-label="IRONPEAK home">
              <Logo />
            </Link>

            <ul className="hidden items-center gap-8 md:flex">
              {PAGES.map((p) => {
                const active = pathname === p.href;
                return (
                  <li key={p.href}>
                    <Link href={p.href} className={`relative py-2 text-[13px] font-bold uppercase tracking-[0.16em] transition-colors ${active ? "text-[#E5FF3D]" : "text-white/70 hover:text-white"}`}>
                      {p.label}
                      {active && <motion.span layoutId="ip-nav" className="absolute -bottom-0.5 left-0 right-0 h-[2px]" style={{ background: IP.lime }} />}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center gap-3">
              <span className="hidden lg:inline-flex">
                <OpenBadge />
              </span>
              <Btn onClick={trial} className="hidden! h-11! px-5! text-[12px]! sm:inline-flex!">
                Free trial
              </Btn>
              <button
                type="button"
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                onClick={() => setOpen((o) => !o)}
                className="grid size-11 place-items-center md:hidden"
                style={{ background: IP.lime, color: IP.bg }}
              >
                <span className="relative block h-3 w-5">
                  <span className={`absolute left-0 block h-[2px] w-5 bg-current transition-all ${open ? "top-1.5 rotate-45" : "top-0"}`} />
                  <span className={`absolute left-0 block h-[2px] w-5 bg-current transition-all ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
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
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[49] flex flex-col justify-between px-6 pb-28 pt-28 md:hidden"
            style={{ background: IP.bg }}
          >
            <ul className="flex flex-col">
              {PAGES.map((p, i) => {
                const active = pathname === p.href;
                return (
                  <motion.li key={p.href} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.06, duration: 0.6, ease: EASE }} className="border-b" style={{ borderColor: IP.line }}>
                    <Link href={p.href} onClick={() => setOpen(false)} className={`${D} flex items-center justify-between py-3 text-[56px] leading-[1.05]`} style={{ color: active ? IP.lime : undefined }}>
                      {p.label}
                      <span className="font-sans text-[14px] font-bold tracking-[0.2em] text-white/40">0{i + 1}</span>
                    </Link>
                  </motion.li>
                );
              })}
            </ul>
            <div className="flex flex-col gap-5">
              <OpenBadge />
              <Btn onClick={trial} className="w-full">
                Claim free trial →
              </Btn>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ───────────────────────── Page hero (inner pages) ───────────────────────── */

export function PageHero({ img, kicker, title, outline, sub, pos = "50% 40%" }: { img: string; kicker: string; title: string; outline: string; sub: string; pos?: string }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 120]);
  return (
    <section ref={ref} className="relative flex min-h-[64svh] items-end overflow-hidden px-5 pb-14 pt-32 sm:px-8 sm:pb-20">
      <motion.div style={{ y }} className="absolute -inset-y-20 inset-x-0">
        <Image src={img} alt="" fill priority sizes="100vw" className="object-cover" style={{ objectPosition: pos }} />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/70 to-[#0A0A0A]/40" />
      <div className="relative mx-auto w-full max-w-[1440px]">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }}>
          <Kicker>{kicker}</Kicker>
        </motion.div>
        <h1 className={`${D} mt-5 text-[clamp(3.6rem,11vw,10rem)] leading-[0.86]`}>
          {[title, outline].map((l, i) => (
            <span key={l} className="block overflow-hidden">
              <motion.span
                className={`block ${i === 1 ? "text-transparent [-webkit-text-stroke:2px_#E5FF3D]" : ""}`}
                initial={{ y: "105%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.1 + i * 0.08 }}
              >
                {l}
              </motion.span>
            </span>
          ))}
        </h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.8 }} className="mt-6 max-w-[34rem] text-[17px] leading-relaxed text-white/70">
          {sub}
        </motion.p>
      </div>
    </section>
  );
}

/* ───────────────────────── Footer ───────────────────────── */

function Footer() {
  const { trial, call } = useActions();
  return (
    <footer className="relative overflow-hidden border-t px-5 pb-32 pt-16 sm:px-8" style={{ borderColor: IP.line }}>
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-[22rem] text-[15px] text-white/60">Coached strength & conditioning in Vijay Nagar. Train hard, track harder.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Btn onClick={trial} className="h-12! text-[12px]!">
                <WhatsAppIcon className="size-4" /> Free trial
              </Btn>
              <Btn onClick={call} variant="ghost" className="h-12! text-[12px]!">
                Call
              </Btn>
            </div>
          </div>
          <FooterCol title="Explore">
            {PAGES.map((p) => (
              <Link key={p.href} href={p.href} className="hover:text-[#E5FF3D]">
                {p.label}
              </Link>
            ))}
          </FooterCol>
          <FooterCol title="Hours">
            <span>Mon – Sat · 5 am – 11 pm</span>
            <span>Sunday · 7 am – 1 pm</span>
            <OpenBadge />
          </FooterCol>
          <FooterCol title="Find us">
            <span>{ADDRESS}</span>
            <a href={MAPS_URL} target="_blank" rel="noopener" className="text-[#E5FF3D]">
              Get directions ↗
            </a>
          </FooterCol>
        </div>
        <p className={`${D} mt-14 select-none whitespace-nowrap text-[min(21vw,330px)] leading-[0.8] text-transparent [-webkit-text-stroke:1.5px_rgba(229,255,61,0.5)]`}>Ironpeak</p>
        <div className="mt-6 flex flex-col justify-between gap-1 border-t pt-5 text-[12px] text-white/45 sm:flex-row" style={{ borderColor: IP.line }}>
          <span>© 2026 IRONPEAK Strength Club, Indore</span>
          <Link href="/" className="underline-offset-4 hover:underline">
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
      <p className={`${LABEL} text-white/40`}>{title}</p>
      <div className="mt-4 flex flex-col gap-2.5 text-[15px] text-white/75">{children}</div>
    </div>
  );
}

/* ───────────────────────── Sticky mobile trial ───────────────────────── */

function StickyTrial({ hidden }: { hidden: boolean }) {
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);
  const { trial } = useActions();
  useMotionValueEvent(scrollY, "change", (y) => setShow(y > 700));
  const visible = show && !hidden;
  return (
    <motion.div initial={false} animate={{ y: visible ? 0 : 120, opacity: visible ? 1 : 0 }} transition={{ duration: 0.5, ease: EASE }} className="fixed bottom-[84px] right-4 z-[60] md:hidden">
      <Feature id="sticky" label="Sticky trial button on phones">
        <button type="button" onClick={trial} className="flex h-14 items-center gap-2 px-5 text-[14px] font-extrabold uppercase tracking-[0.1em] text-black shadow-[0_15px_40px_-10px_rgba(229,255,61,0.6)]" style={{ background: IP.lime }}>
          <WhatsAppIcon className="size-5" /> Free trial
        </button>
      </Feature>
    </motion.div>
  );
}
