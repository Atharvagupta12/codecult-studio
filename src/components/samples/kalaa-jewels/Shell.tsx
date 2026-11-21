"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";
import { Feature } from "../shared/Feature";
import { ADDRESS, BASE, KJ, MAPS_URL, PAGES } from "./data";
import { kjSans, kjSerif } from "./fonts";
import { Btn, EASE, LABEL, OpenBadge, Ornament, SERIF, useActions } from "./shared";
import { WishlistDrawer, WishlistProvider, useWishlist } from "./wishlist";

export function KalaaShell({ children }: { children: React.ReactNode }) {
  const [menu, setMenu] = useState(false);
  return (
    <WishlistProvider>
      <div className={`${kjSerif.variable} ${kjSans.variable} min-h-screen overflow-x-clip [font-family:var(--kj-sans)] antialiased selection:bg-[#D4A84B] selection:text-[#15110D]`} style={{ background: KJ.bg, color: KJ.cream }}>
        <Nav open={menu} setOpen={setMenu} />
        {children}
        <Footer />
        <StickyVisit hidden={menu} />
        <WishlistDrawer />
      </div>
    </WishlistProvider>
  );
}

export function Logo() {
  return (
    <span className="flex flex-col items-center leading-none">
      <span className={`${SERIF} text-[30px] font-medium tracking-[0.04em]`}>Kalaa</span>
      <span className="mt-1 text-[8px] font-medium uppercase tracking-[0.5em]" style={{ color: KJ.gold }}>
        Jewels · 1998
      </span>
    </span>
  );
}

function WishButton() {
  const { ids, setOpen } = useWishlist();
  return (
    <Feature id="wishlist" label="Wishlist across pages" inline>
      <button type="button" onClick={() => setOpen(true)} aria-label={`Wishlist, ${ids.length} items`} className="relative grid size-11 place-items-center rounded-full border transition-colors hover:border-[#D4A84B]" style={{ borderColor: KJ.line }}>
        <svg viewBox="0 0 24 24" className="size-5">
          <path d="M12 20.5s-7.5-4.6-9.4-9.3C1.2 7.7 3.4 4.5 6.9 4.5c2 0 3.6 1.1 5.1 3 1.5-1.9 3.1-3 5.1-3 3.5 0 5.7 3.2 4.3 6.7-1.9 4.7-9.4 9.3-9.4 9.3Z" fill="none" stroke={KJ.cream} strokeWidth="1.6" />
        </svg>
        <AnimatePresence>
          {ids.length > 0 && (
            <motion.span key={ids.length} initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="absolute -right-1 -top-1 grid size-5 place-items-center rounded-full text-[10px] font-semibold text-[#15110D]" style={{ background: KJ.gold }}>
              {ids.length}
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </Feature>
  );
}

function Nav({ open, setOpen }: { open: boolean; setOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setSolid(y > 40));
  useLayoutEffect(() => () => setOpen(false), [setOpen]);
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-500 ${solid || open ? "border-[#F3E3C3]/10 bg-[#15110D]/85 backdrop-blur-xl" : "border-transparent"}`}>
        <Feature id="pages" label="4-page website" labelPosition="bottom">
          <nav className="mx-auto grid h-20 max-w-[1400px] grid-cols-[1fr_auto_1fr] items-center px-5 sm:px-8">
            <ul className="hidden items-center gap-7 lg:flex">
              {PAGES.slice(1).map((p) => {
                const on = pathname === p.href;
                return (
                  <li key={p.href}>
                    <Link href={p.href} className={`${LABEL} relative py-2 transition-colors ${on ? "text-[#F0CF86]" : "text-[#F3E3C3]/70 hover:text-[#F3E3C3]"}`}>
                      {p.label}
                      {on && <motion.span layoutId="kj-nav" className="absolute -bottom-0.5 left-0 right-0 h-px" style={{ background: KJ.gold }} />}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <button type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen((o) => !o)} className={`${LABEL} flex items-center gap-2 justify-self-start lg:hidden`}>
              <span className="relative block h-2.5 w-5">
                <span className={`absolute left-0 block h-px w-5 bg-current transition-all ${open ? "top-1 rotate-45" : "top-0"}`} />
                <span className={`absolute left-0 block h-px w-5 bg-current transition-all ${open ? "top-1 -rotate-45" : "top-2.5"}`} />
              </span>
              {open ? "Close" : "Menu"}
            </button>
            <Link href={BASE} aria-label="Kalaa Jewels home" className="justify-self-center">
              <Logo />
            </Link>
            <div className="flex items-center gap-3 justify-self-end">
              <span className="hidden xl:inline-flex">
                <OpenBadge />
              </span>
              <WishButton />
              <span className="hidden sm:inline-flex">
                <Btn href={`${BASE}/visit`} className="h-11! px-5!">
                  Book a visit
                </Btn>
              </span>
            </div>
          </nav>
        </Feature>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="fixed inset-0 z-[49] flex flex-col items-center justify-center gap-2 px-6 pb-24 lg:hidden" style={{ background: KJ.bg }}>
            <Ornament className="mb-6 h-3 w-28" />
            {PAGES.map((p, i) => (
              <motion.div key={p.href} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.06, duration: 0.7, ease: EASE }}>
                <Link href={p.href} onClick={() => setOpen(false)} className={`${SERIF} block py-1 text-center text-[48px] italic ${pathname === p.href ? "text-[#F0CF86]" : ""}`}>
                  {p.label}
                </Link>
              </motion.div>
            ))}
            <div className="mt-8">
              <OpenBadge />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Footer() {
  const { call } = useActions();
  return (
    <footer className="border-t px-5 pb-32 pt-20 sm:px-8" style={{ borderColor: KJ.line }}>
      <div className="mx-auto max-w-[1400px] text-center">
        <Ornament className="mx-auto h-3 w-32" />
        <p className={`${SERIF} mx-auto mt-8 max-w-[44rem] text-[clamp(2rem,4vw,3.4rem)] italic leading-tight`}>&ldquo;Jewellery is not bought. It is passed on.&rdquo;</p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Btn href={`${BASE}/visit`}>Book a visit</Btn>
          <Btn onClick={call} variant="line">
            Call the store
          </Btn>
        </div>
        <div className="mt-16 grid gap-10 border-t pt-12 text-[14px] sm:grid-cols-3" style={{ borderColor: KJ.line }}>
          <div>
            <p className={LABEL} style={{ color: KJ.gold }}>
              Showroom
            </p>
            <p className="mt-4 text-[#F3E3C3]/75">{ADDRESS}</p>
            <a href={MAPS_URL} target="_blank" rel="noopener" className="mt-2 inline-block" style={{ color: KJ.gold }}>
              Directions ↗
            </a>
          </div>
          <div>
            <p className={LABEL} style={{ color: KJ.gold }}>
              Hours
            </p>
            <p className="mt-4 text-[#F3E3C3]/75">Tue – Sat · 11 am – 9 pm</p>
            <p className="text-[#F3E3C3]/75">Sunday · 11 am – 8 pm · Monday closed</p>
            <div className="mt-3 flex justify-center">
              <OpenBadge />
            </div>
          </div>
          <div>
            <p className={LABEL} style={{ color: KJ.gold }}>
              Explore
            </p>
            <div className="mt-4 flex flex-col gap-1.5 text-[#F3E3C3]/75">
              {PAGES.map((p) => (
                <Link key={p.href} href={p.href} className="hover:text-[#F0CF86]">
                  {p.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <p className={`${SERIF} mt-16 select-none text-[min(22vw,300px)] font-medium leading-[0.8] tracking-[0.02em] text-[#D4A84B]/15`}>Kalaa</p>
        <div className="mt-8 flex flex-col justify-between gap-2 border-t pt-5 text-[12px] text-[#A39478] sm:flex-row" style={{ borderColor: KJ.line }}>
          <span>© 2026 Kalaa Jewels · BIS hallmarked · GSTIN 23ABCDE1234F1Z5</span>
          <Link href="/" className="hover:text-[#F3E3C3]">
            Website by CodeCult Studio
          </Link>
        </div>
      </div>
    </footer>
  );
}

function StickyVisit({ hidden }: { hidden: boolean }) {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setShow(y > 600));
  const visible = show && !hidden && pathname !== `${BASE}/visit`;
  return (
    <motion.div initial={false} animate={{ y: visible ? 0 : 120, opacity: visible ? 1 : 0 }} transition={{ duration: 0.5, ease: EASE }} className="fixed bottom-[84px] right-4 z-[60] sm:hidden">
      <Feature id="sticky" label="Sticky visit button on phones">
        <Link href={`${BASE}/visit`} className="flex h-12 items-center bg-gradient-to-r from-[#B88A33] via-[#F0CF86] to-[#B88A33] px-5 text-[12px] font-medium uppercase tracking-[0.2em] text-[#15110D] shadow-[0_15px_40px_-10px_rgba(212,168,75,0.6)]">
          Book a visit
        </Link>
      </Feature>
    </motion.div>
  );
}
