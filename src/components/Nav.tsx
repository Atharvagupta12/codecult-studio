"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useLayoutEffect, useState } from "react";
import { useLenis } from "lenis/react";
import { SITE, waLink } from "@/lib/site";
import { ArrowUpRightIcon, WhatsAppIcon } from "./ui/icons";

const LINKS = [
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#pricing", label: "Pricing" },
  { href: "#about", label: "About" },
  { href: "#faq", label: "FAQ" },
];

export function Logo({ className = "" }: { className?: string }) {
  return (
    <a href="#top" className={`group flex items-center gap-2.5 ${className}`} aria-label="CodeCult Studio home">
      <span className="relative grid size-8 place-items-center overflow-hidden rounded-[9px] bg-ember text-ink">
        <span className="font-serif text-[22px] italic leading-none -translate-y-[1px]">c</span>
        <span className="absolute bottom-[7px] right-[7px] size-[5px] rounded-full bg-ink" />
      </span>
      <span className="text-[17px] font-semibold tracking-[-0.03em]">
        CodeCult <span className="font-serif text-[19px] font-normal italic tracking-normal text-cream/60">Studio</span>
      </span>
    </a>
  );
}

export function Nav() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const lenis = useLenis();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 40);
    setHidden(y > prev && y > 240 && !open);
  });

  // Lock scroll while the mobile menu is open
  useEffect(() => {
    if (open) lenis?.stop();
    else lenis?.start();
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open, lenis]);

  // Close the menu if this route gets hidden by a navigation
  useLayoutEffect(() => () => setOpen(false), []);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: hidden ? -110 : 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4"
      >
        <nav
          aria-label="Main"
          className={`mx-auto flex max-w-[1400px] items-center justify-between rounded-full border py-2 pl-4 pr-2 transition-[background-color,border-color,backdrop-filter] duration-500 ${
            scrolled || open ? "border-line bg-ink/70 backdrop-blur-xl" : "border-transparent bg-transparent"
          }`}
        >
          <Logo />

          <ul className="hidden items-center gap-1 md:flex">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="relative rounded-full px-4 py-2 text-[14px] text-cream/65 transition-colors hover:bg-cream/[0.06] hover:text-cream">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href={waLink()}
              target="_blank"
              rel="noopener"
              className="group hidden h-11 items-center gap-2 rounded-full bg-cream pl-4 pr-1.5 text-[14px] font-semibold text-ink transition-transform hover:scale-[1.03] sm:inline-flex"
            >
              Let&apos;s talk
              <span className="grid size-8 place-items-center rounded-full bg-ink text-wa transition-transform duration-500 group-hover:rotate-[360deg]">
                <WhatsAppIcon className="size-4" />
              </span>
            </a>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="grid size-11 place-items-center rounded-full border border-line md:hidden"
            >
              <span className="relative block h-3 w-5">
                <span className={`absolute left-0 block h-[1.5px] w-5 bg-cream transition-all duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`} />
                <span className={`absolute left-0 block h-[1.5px] bg-cream transition-all duration-300 ${open ? "top-1.5 w-5 -rotate-45" : "top-3 w-3"}`} />
              </span>
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ clipPath: "circle(0% at 92% 4%)" }}
            animate={{ clipPath: "circle(150% at 92% 4%)" }}
            exit={{ clipPath: "circle(0% at 92% 4%)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-between bg-ink-2 px-6 pb-10 pt-28 md:hidden"
          >
            <ul className="flex flex-col gap-1">
              {LINKS.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <a href={l.href} onClick={() => setOpen(false)} className="flex items-baseline gap-4 py-1 font-serif text-[56px] leading-[1.05]">
                    <span className="font-mono text-xs text-mute">0{i + 1}</span>
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }} className="flex flex-col gap-4">
              <a
                href={waLink()}
                target="_blank"
                rel="noopener"
                className="flex h-14 items-center justify-center gap-2 rounded-full bg-wa text-[16px] font-semibold text-ink"
              >
                <WhatsAppIcon className="size-5" /> Chat on WhatsApp
              </a>
              <a href={SITE.instagram} target="_blank" rel="noopener" className="flex items-center justify-center gap-1 text-sm text-mute">
                Instagram {SITE.instagramHandle} <ArrowUpRightIcon className="size-3.5" />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
