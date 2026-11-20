"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import { Feature } from "../shared/Feature";
import { AM, CATS, PHOTOS, type Cat } from "./data";
import { Lightbox } from "./Lightbox";
import { PageHead } from "./Shell";
import { EASE, MONO } from "./shared";

export function AaravPortfolio() {
  const [cat, setCat] = useState<"All" | Cat>("All");
  const [open, setOpen] = useState<number | null>(null);
  const list = PHOTOS.filter((p) => cat === "All" || p.cat === cat);

  return (
    <main>
      <PageHead n="02" kicker="Portfolio" title="Every frame," italic="a feeling." sub="A selection from recent weddings, pre-weddings and portraits across India. Tap any photo to view it full screen." />
      <section className="px-3 pb-24 sm:px-10 sm:pb-32">
        <div className="mx-auto max-w-[1500px]">
          <Feature id="filters" label="Gallery filters">
            <div className="-mx-3 flex gap-2 overflow-x-auto px-3 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0">
              {CATS.map((c) => {
                const on = c === cat;
                const n = c === "All" ? PHOTOS.length : PHOTOS.filter((p) => p.cat === c).length;
                return (
                  <button key={c} type="button" onClick={() => setCat(c)} className={`relative h-11 shrink-0 rounded-full px-5 text-[14px] transition-colors ${on ? "text-black" : "border border-white/15 text-[#F2EDE4]/70 hover:text-[#F2EDE4]"}`}>
                    {on && <motion.span layoutId="am-cat" className="absolute inset-0 rounded-full" style={{ background: AM.ivory }} transition={{ type: "spring", stiffness: 420, damping: 36 }} />}
                    <span className="relative">
                      {c} <sup className="text-[10px] opacity-60">{n}</sup>
                    </span>
                  </button>
                );
              })}
            </div>
          </Feature>

          <Feature id="lightbox" label="Full-screen photo viewer" className="mt-8">
            <div className="columns-2 gap-2 sm:gap-4 lg:columns-3">
              <AnimatePresence mode="popLayout">
                {list.map((p, i) => (
                  <motion.button
                    key={p.src}
                    type="button"
                    layout
                    onClick={() => setOpen(i)}
                    data-cursor="View"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.7, ease: EASE, delay: (i % 6) * 0.04 }}
                    className="group relative mb-2 block w-full break-inside-avoid overflow-hidden rounded-[3px] sm:mb-4"
                    aria-label={`View ${p.alt}`}
                  >
                    <div className={`relative ${p.tall ? "aspect-[4/5.4]" : "aspect-[4/3]"}`}>
                      <Image src={p.src} alt={p.alt} fill sizes="(min-width: 1024px) 33vw, 50vw" className="object-cover transition-transform duration-[1500ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.05]" />
                      <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/25" />
                      <span className={`absolute bottom-3 left-3 translate-y-2 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 ${MONO} text-white`}>{p.cat}</span>
                    </div>
                  </motion.button>
                ))}
              </AnimatePresence>
            </div>
          </Feature>
        </div>
      </section>
      <Lightbox photos={list} index={open} onClose={() => setOpen(null)} onIndex={setOpen} />
    </main>
  );
}
