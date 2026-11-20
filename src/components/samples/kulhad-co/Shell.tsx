"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";
import { WhatsAppIcon } from "@/components/ui/icons";
import { Feature } from "../shared/Feature";
import { ADDRESS, BASE, KC, PAGES, SPECIAL } from "./data";
import { kcBody, kcDisplay, kcHand, kcHindi } from "./fonts";
import { COND, D, EASE, HI, Kulhad, OpenBadge, useOrderAction } from "./shared";

export function KulhadShell({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${kcDisplay.variable} ${kcBody.variable} ${kcHindi.variable} ${kcHand.variable} min-h-screen overflow-x-clip [font-family:var(--kc-body)] antialiased`}
      style={{ background: KC.cream, color: KC.ink }}
    >
      <SpecialBar />
      <Nav />
      {children}
      <Footer />
      <StickyOrder />
    </div>
  );
}

/* ── Today's special ticker ── */
function SpecialBar() {
  const item = (
    <span className="flex shrink-0 items-center">
      {[SPECIAL, "Open mic every Friday · 8 pm", "Order ahead on WhatsApp, skip the queue", "Free Wi-Fi · power sockets at every table"].map((t) => (
        <span key={t} className="flex items-center gap-3 px-6">
          <span>☀</span>
          {t}
        </span>
      ))}
    </span>
  );
  return (
    <Feature id="special" label="Today's special banner" labelPosition="bottom">
      <div className="relative z-[51] overflow-hidden py-2 text-[13px] font-semibold" style={{ background: KC.marigold, color: KC.green }}>
        <div className="marquee [animation-duration:36s]">
          {item}
          {item}
        </div>
      </div>
    </Feature>
  );
}

/* ── Nav ── */
function Nav() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const order = useOrderAction();
  useMotionValueEvent(scrollY, "change", (y) => setSolid(y > 40));
  useLayoutEffect(() => () => setOpen(false), []);
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-50 px-3 pt-3 sm:px-5">
        <Feature id="pages" label="4-page website">
          <nav
            className={`mx-auto flex max-w-[1320px] items-center justify-between rounded-full py-2 pl-4 pr-2 transition-all duration-500 ${
              solid ? "shadow-[0_14px_40px_-16px_rgba(0,0,0,0.5)]" : ""
            }`}
            style={{ background: KC.green, color: KC.cream }}
          >
            <Link href={BASE} className="flex items-center gap-2">
              <span className="grid size-9 place-items-center rounded-full" style={{ background: KC.marigold, color: KC.clay }}>
                <Kulhad className="size-5" />
              </span>
              <span className={`${D} text-[24px] leading-none tracking-[-0.01em]`}>Kulhad Co.</span>
            </Link>

            <ul className="hidden items-center gap-1 md:flex">
              {PAGES.map((p) => {
                const active = pathname === p.href;
                return (
                  <li key={p.href}>
                    <Link href={p.href} className={`relative block rounded-full px-4 py-2 text-[15px] font-semibold transition-colors ${active ? "" : "opacity-70 hover:opacity-100"}`} style={{ color: active ? KC.green : undefined }}>
                      {active && <motion.span layoutId="kc-nav" className="absolute inset-0 rounded-full" style={{ background: KC.cream }} transition={{ type: "spring", stiffness: 400, damping: 34 }} />}
                      <span className="relative">{p.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={order}
                className="hidden h-11 items-center gap-2 rounded-full px-5 text-[14px] font-bold transition-transform hover:scale-[1.03] sm:flex"
                style={{ background: KC.marigold, color: KC.green }}
              >
                <WhatsAppIcon className="size-4" /> Order on WhatsApp
              </button>
              <button
                type="button"
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                onClick={() => setOpen((o) => !o)}
                className="grid size-11 place-items-center rounded-full md:hidden"
                style={{ background: KC.marigold, color: KC.green }}
              >
                <span className="relative block h-3 w-5">
                  <span className={`absolute left-0 block h-[2px] w-5 rounded bg-current transition-all ${open ? "top-1.5 rotate-45" : "top-0"}`} />
                  <span className={`absolute left-0 block h-[2px] w-5 rounded bg-current transition-all ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
                </span>
              </button>
            </div>
          </nav>
        </Feature>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "circle(0% at 90% 6%)" }}
            animate={{ clipPath: "circle(150% at 90% 6%)" }}
            exit={{ clipPath: "circle(0% at 90% 6%)" }}
            transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[49] flex flex-col justify-between px-6 pb-28 pt-32 md:hidden"
            style={{ background: KC.green, color: KC.cream }}
          >
            <ul className="flex flex-col gap-2">
              {PAGES.map((p, i) => (
                <motion.li key={p.href} initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + i * 0.06, duration: 0.6, ease: EASE }}>
                  <Link href={p.href} onClick={() => setOpen(false)} className={`${D} flex items-baseline gap-3 text-[52px] leading-[1.1]`} style={{ color: pathname === p.href ? KC.marigold : undefined }}>
                    {p.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <div className="flex flex-col gap-4">
              <span className={`${HI} text-[40px]`} style={{ color: KC.marigold }}>
                चाय पे चर्चा
              </span>
              <OpenBadge />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ── Footer ── */
function Footer() {
  return (
    <footer className="relative overflow-hidden px-5 pb-32 pt-16 sm:px-8" style={{ background: KC.green, color: KC.cream }}>
      <div className="mx-auto max-w-[1320px]">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <span className={`${HI} text-[34px] leading-none`} style={{ color: KC.marigold }}>
              चाय पे चर्चा
            </span>
            <p className="mt-3 max-w-[22rem] text-[15px] text-[#F7EDDC]/70">Indore&apos;s favourite chai adda since 2019. Kadak chai, hot snacks and good company.</p>
          </div>
          <FooterCol title="Explore">
            {PAGES.map((p) => (
              <Link key={p.href} href={p.href} className="hover:text-[#F4A83A]">
                {p.label}
              </Link>
            ))}
          </FooterCol>
          <FooterCol title="Hours">
            <span>Every day</span>
            <span>7 am – 1 am</span>
            <span className="text-[#F4A83A]">Poha till noon!</span>
          </FooterCol>
          <FooterCol title="Find us">
            <span>{ADDRESS}</span>
            <span>@kulhad.co.indore</span>
          </FooterCol>
        </div>
        <p className={`${D} mt-14 select-none whitespace-nowrap text-[min(16vw,232px)] leading-[0.8] tracking-[-0.03em]`} style={{ color: KC.marigold }}>
          Kulhad Co.
        </p>
        <div className="mt-6 flex flex-col justify-between gap-1 border-t border-white/15 pt-5 text-[12px] text-[#F7EDDC]/60 sm:flex-row">
          <span>© 2026 Kulhad Co., Indore</span>
          <Link href="/" className="hover:underline">
            Website by CodeCult Studio
          </Link>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2 text-[15px] text-[#F7EDDC]/80">
      <p className={`mb-1 text-[12px] tracking-[0.1em] ${COND}`} style={{ color: KC.marigold }}>
        {title}
      </p>
      {children}
    </div>
  );
}

/* ── Sticky mobile order ── */
function StickyOrder() {
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);
  const order = useOrderAction();
  useMotionValueEvent(scrollY, "change", (y) => setShow(y > 600));
  return (
    <motion.div
      initial={false}
      animate={{ y: show ? 0 : 120, opacity: show ? 1 : 0 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="fixed bottom-[84px] right-4 z-[60] md:hidden"
    >
      <button
        type="button"
        onClick={order}
        className="flex h-14 items-center gap-2 rounded-full pl-4 pr-5 text-[15px] font-bold shadow-[0_15px_40px_-10px_rgba(0,0,0,0.5)]"
        style={{ background: KC.marigold, color: KC.green }}
      >
        <WhatsAppIcon className="size-5" /> Order chai
      </button>
    </motion.div>
  );
}
