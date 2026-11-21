"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import { Feature } from "../shared/Feature";
import { Lightbox } from "../shared/Lightbox";
import { IMG, LOOKS, MB, STYLES, type Style } from "./data";
import { PageHead } from "./Shell";
import { EASE, LABEL } from "./shared";

export function MehrPortfolio() {
  const [style, setStyle] = useState<"All" | Style>("All");
  const [open, setOpen] = useState<number | null>(null);
  const list = LOOKS.filter((l) => style === "All" || l.style === style);
  return (
    <main>
      <PageHead kicker="Portfolio" title="Real brides," italic="real glow." sub="Every look here is unretouched skin, photographed on the day. Filter by style and tap to see each bride up close." img={IMG.mirror} />
      <section className="px-3 pb-24 sm:px-10 sm:pb-32">
        <div className="mx-auto max-w-[1440px]">
          <Feature id="styles" label="Filter looks by style">
            <div className="-mx-3 flex gap-2 overflow-x-auto px-3 pb-1 [scrollbar-width:none] sm:mx-0 sm:justify-center sm:px-0">
              {STYLES.map((s) => {
                const on = s === style;
                return (
                  <button key={s} type="button" onClick={() => setStyle(s)} className={`relative h-11 shrink-0 rounded-full px-5 text-[14px] transition-colors ${on ? "text-[#1A0A0E]" : "border border-[#F7E7DF]/15 text-[#F7E7DF]/70 hover:text-[#F7E7DF]"}`}>
                    {on && <motion.span layoutId="mb-style" className="absolute inset-0 rounded-full" style={{ background: MB.rose }} transition={{ type: "spring", stiffness: 420, damping: 36 }} />}
                    <span className="relative">{s}</span>
                  </button>
                );
              })}
            </div>
          </Feature>
          <Feature id="viewer" label="Full-screen look viewer" className="mt-10">
            <div className="columns-2 gap-2 sm:gap-4 lg:columns-3">
              <AnimatePresence mode="popLayout">
                {list.map((l, i) => (
                  <motion.button
                    key={l.src}
                    type="button"
                    layout
                    data-cursor="View"
                    onClick={() => setOpen(i)}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.7, ease: EASE, delay: (i % 6) * 0.04 }}
                    className="group relative mb-2 block w-full break-inside-avoid overflow-hidden rounded-[16px] sm:mb-4"
                    aria-label={`View ${l.alt}`}
                  >
                    <div className={`relative ${l.tall ? "aspect-[4/5.3]" : "aspect-[4/3.4]"}`}>
                      <Image src={l.src} alt={l.alt} fill sizes="(min-width: 1024px) 33vw, 50vw" className="object-cover transition-transform duration-[1500ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.05]" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1A0A0E]/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                      <span className={`${LABEL} absolute bottom-3 left-3 text-[9px] opacity-0 transition-opacity duration-500 group-hover:opacity-100`} style={{ color: MB.rose }}>
                        {l.style}
                      </span>
                    </div>
                  </motion.button>
                ))}
              </AnimatePresence>
            </div>
          </Feature>
        </div>
      </section>
      <Lightbox photos={list} index={open} onClose={() => setOpen(null)} onIndex={setOpen} accent={MB.rose} />
    </main>
  );
}
