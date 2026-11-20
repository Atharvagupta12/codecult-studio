"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { TIERS } from "@/data/samples";
import { waLink } from "@/lib/site";
import { WhatsAppIcon } from "./ui/icons";

/**
 * Mobile: a sticky bottom action bar (price + "See designs" + WhatsApp).
 * Desktop: a floating WhatsApp bubble.
 * Both appear after the hero and hide near the final call-to-action.
 */
export function FloatingWhatsApp() {
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => {
    const nearBottom = y + window.innerHeight > document.documentElement.scrollHeight - 1000;
    setShow(y > window.innerHeight * 0.85 && !nearBottom);
  });

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Mobile bar */}
          <motion.div
            key="bar"
            initial={{ y: 110, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 110, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-x-3 bottom-3 z-30 sm:hidden"
            style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
          >
            <div className="flex items-center gap-2 rounded-full border border-cream/10 bg-ink/85 p-1.5 pl-5 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.9)] backdrop-blur-xl">
              <div className="min-w-0 flex-1 leading-tight">
                <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-cream/45">Websites from</p>
                <p className="truncate text-[15px] font-semibold text-cream">
                  <span className="font-serif text-[19px] font-normal">{TIERS.Essential.price}</span>
                  <span className="text-[12px] font-normal text-cream/50"> · live in {TIERS.Essential.days} days</span>
                </p>
              </div>
              <a href="#work" className="flex h-12 items-center rounded-full bg-cream px-4 text-[14px] font-semibold text-ink">
                See designs
              </a>
              <a
                href={waLink()}
                target="_blank"
                rel="noopener"
                aria-label="Chat on WhatsApp"
                className="grid size-12 shrink-0 place-items-center rounded-full bg-wa text-ink"
              >
                <WhatsAppIcon className="size-6" />
              </a>
            </div>
          </motion.div>

          {/* Desktop bubble */}
          <motion.a
            key="bubble"
            href={waLink()}
            target="_blank"
            rel="noopener"
            aria-label="Chat with CodeCult Studio on WhatsApp"
            initial={{ opacity: 0, scale: 0.6, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 20 }}
            transition={{ type: "spring", stiffness: 320, damping: 24 }}
            className="group fixed bottom-7 right-7 z-40 hidden h-14 items-center overflow-hidden rounded-full bg-wa px-4 text-ink shadow-[0_20px_50px_-10px_rgba(37,211,102,0.6)] sm:flex"
          >
            <WhatsAppIcon className="size-6 shrink-0" />
            <span className="max-w-0 whitespace-nowrap text-[15px] font-semibold opacity-0 transition-all duration-500 group-hover:ml-2.5 group-hover:max-w-[160px] group-hover:opacity-100">
              Chat with us
            </span>
          </motion.a>
        </>
      )}
    </AnimatePresence>
  );
}
