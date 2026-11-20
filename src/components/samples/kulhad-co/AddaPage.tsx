"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { Feature } from "../shared/Feature";
import { GALLERY, KC } from "./data";
import { COND, D, EASE, HAND, HI, Sticker, Up, Wave } from "./shared";

const TIMELINE = [
  { year: "2019", title: "A tiny stall outside college", text: "One gas stove, two kettles and a lot of hungry students." },
  { year: "2021", title: "Our first real café", text: "Thirty seats, a wall of kulhads and the same old recipe." },
  { year: "2023", title: "Open mic nights begin", text: "Poetry on Fridays turned strangers into regulars." },
  { year: "Today", title: "Indore's favourite adda", text: "Twelve chai flavours, a thousand stories, still ₹20 cutting." },
];

export function KulhadAdda() {
  return (
    <main>
      <section className="relative -mt-[76px] overflow-hidden pt-[76px]" style={{ background: KC.clay, color: KC.paper }}>
        <div aria-hidden className="absolute inset-0 opacity-[0.1]" style={{ backgroundImage: "radial-gradient(#FFF8EC 1.4px, transparent 1.4px)", backgroundSize: "22px 22px" }} />
        <div className="relative mx-auto max-w-[1320px] px-5 pb-16 pt-14 sm:px-8 sm:pt-20">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`${HI} text-[34px]`} style={{ color: KC.marigold }}>
            हमारा अड्डा
          </motion.span>
          <h1 className={`${D} text-[clamp(3.6rem,11vw,9.5rem)] leading-[0.86] tracking-[-0.03em]`}>
            {["Not just a café.", "An adda."].map((l, i) => (
              <span key={l} className="block overflow-hidden pb-[0.05em]">
                <motion.span className="block" style={{ color: i ? KC.marigold : undefined }} initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ duration: 1, ease: EASE, delay: i * 0.12 }}>
                  {l}
                </motion.span>
              </span>
            ))}
          </h1>
        </div>
        <Wave fill={KC.cream} />
      </section>

      {/* Story */}
      <section className="px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto grid max-w-[1320px] items-center gap-14 lg:grid-cols-2">
          <Up className="relative h-[480px] sm:h-[560px]">
            <div className="absolute left-0 top-0 w-[62%] rotate-[-4deg] rounded-[10px] bg-[#FFF8EC] p-3 pb-10 shadow-2xl">
              <div className="relative aspect-[3/4] overflow-hidden rounded-[4px]">
                <Image src="/images/kulhad-co/chaiwala.jpg" alt="Our first chai master" fill sizes="340px" className="object-cover" />
              </div>
              <span className={`${HAND} absolute bottom-2 left-4 text-[22px] font-bold`} style={{ color: KC.clay }}>
                Ramesh bhaiya, 2019 ♥
              </span>
            </div>
            <div className="absolute bottom-0 right-0 w-[58%] rotate-[5deg] rounded-[10px] bg-[#FFF8EC] p-3 pb-10 shadow-2xl">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[4px]">
                <Image src="/images/kulhad-co/interior.jpg" alt="Inside the café today" fill sizes="320px" className="object-cover" />
              </div>
              <span className={`${HAND} absolute bottom-2 left-4 text-[22px] font-bold`} style={{ color: KC.green }}>
                the café today
              </span>
            </div>
          </Up>
          <div>
            <Up>
              <p className={`text-[13px] tracking-[0.1em] ${COND}`} style={{ color: KC.clay }}>
                Our story
              </p>
              <h2 className={`${D} mt-3 text-[clamp(2.4rem,5vw,4.2rem)] leading-[0.98] tracking-[-0.02em]`}>
                It started with one kettle and <span style={{ color: KC.clay }}>a lot of jugaad.</span>
              </h2>
              <p className="mt-6 text-[17px] leading-[1.7] opacity-75">
                Back in 2019, Ramesh bhaiya brewed chai on a single stove outside our college gate. We kept coming back, first for the chai,
                then for the conversations. Today Kulhad Co. is where Indore meets after class, after work and after midnight.
              </p>
            </Up>
            <ol className="mt-10 flex flex-col gap-3">
              {TIMELINE.map((t, i) => (
                <Up key={t.year} delay={i * 0.08}>
                  <li className="flex items-start gap-4 rounded-[22px] border-2 bg-[#FFF8EC] p-4" style={{ borderColor: KC.ink }}>
                    <span className={`${D} grid h-12 min-w-[76px] shrink-0 place-items-center rounded-xl px-2 text-[18px]`} style={{ background: i === 3 ? KC.marigold : KC.green, color: i === 3 ? KC.green : KC.cream }}>
                      {t.year}
                    </span>
                    <span>
                      <span className={`${D} block text-[21px] leading-tight`}>{t.title}</span>
                      <span className="block text-[14px] opacity-65">{t.text}</span>
                    </span>
                  </li>
                </Up>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <Gallery />

      {/* Quote */}
      <section className="px-3 pb-3 sm:px-5 sm:pb-5">
        <div className="rounded-[36px] px-6 py-16 text-center sm:rounded-[48px] sm:py-24" style={{ background: KC.green, color: KC.cream }}>
          <Sticker rotate={-3}>Our only rule</Sticker>
          <p className={`${D} mx-auto mt-6 max-w-[16ch] text-[clamp(2.6rem,7vw,6rem)] leading-[0.95]`}>
            Chai is never <span style={{ color: KC.marigold }}>just chai.</span>
          </p>
        </div>
      </section>
    </main>
  );
}

function Gallery() {
  const [open, setOpen] = useState<number | null>(null);
  const n = GALLERY.length;
  const prev = useCallback(() => setOpen((i) => (i === null ? i : (i - 1 + n) % n)), [n]);
  const next = useCallback(() => setOpen((i) => (i === null ? i : (i + 1) % n)), [n]);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, prev, next]);

  return (
    <section className="px-5 pb-20 sm:px-8 sm:pb-28">
      <div className="mx-auto max-w-[1320px]">
        <Up className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <h2 className={`${D} text-[clamp(2.4rem,5vw,4.2rem)] leading-none tracking-[-0.02em]`}>Life at the adda</h2>
          <p className={`${HAND} text-[24px] font-bold`} style={{ color: KC.clay }}>
            tap any photo to open ↓
          </p>
        </Up>
        <Feature id="gallery" label="Gallery with full-screen viewer" className="mt-10">
          <div className="columns-2 gap-3 sm:gap-4 md:columns-3">
            {GALLERY.map((g, i) => (
              <Up key={g.src} delay={(i % 3) * 0.08} className="mb-3 break-inside-avoid sm:mb-4">
                <button type="button" onClick={() => setOpen(i)} className="group relative block w-full overflow-hidden rounded-[24px]" aria-label={`Open photo: ${g.alt}`}>
                  <div className={`relative w-full ${g.tall ? "aspect-[3/4]" : "aspect-[4/3]"}`}>
                    <Image src={g.src} alt={g.alt} fill sizes="(min-width: 768px) 33vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                  </div>
                  <span className="absolute inset-x-3 bottom-3 translate-y-2 rounded-full bg-black/55 px-3 py-1.5 text-left text-[12px] font-semibold text-white opacity-0 backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    {g.alt}
                  </span>
                </button>
              </Up>
            ))}
          </div>
        </Feature>
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div className="fixed inset-0 z-[75] flex items-center justify-center bg-black/90 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(null)}>
            <motion.div key={open} initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.35, ease: EASE }} className="relative h-[72vh] w-full max-w-[1000px]" onClick={(e) => e.stopPropagation()}>
              <Image src={GALLERY[open].src} alt={GALLERY[open].alt} fill sizes="1000px" className="object-contain" />
            </motion.div>
            <p className="absolute bottom-24 left-1/2 -translate-x-1/2 text-center text-[14px] text-white/80">
              {GALLERY[open].alt} · {open + 1}/{n}
            </p>
            <button type="button" aria-label="Previous photo" onClick={(e) => (e.stopPropagation(), prev())} className="absolute left-3 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-white/15 text-[20px] text-white backdrop-blur hover:bg-white/25">
              ←
            </button>
            <button type="button" aria-label="Next photo" onClick={(e) => (e.stopPropagation(), next())} className="absolute right-3 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-white/15 text-[20px] text-white backdrop-blur hover:bg-white/25">
              →
            </button>
            <button type="button" aria-label="Close" onClick={() => setOpen(null)} className="absolute right-4 top-4 grid size-12 place-items-center rounded-full bg-white/15 text-[22px] text-white backdrop-blur hover:bg-white/25">
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
