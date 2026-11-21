"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState, useSyncExternalStore } from "react";
import { Feature } from "../shared/Feature";
import { COLLECTIONS, KJ, PIECES, priceOf, type Collection, type Metal, type Occasion, type Piece } from "./data";
import { PieceCard } from "./Home";
import { QuickView } from "./QuickView";
import { EASE, Eyebrow, LABEL, Lines, SERIF } from "./shared";

const METALS: ("Any" | Metal)[] = ["Any", "22K Gold", "18K Gold", "Diamond"];
const OCCASIONS: ("Any" | Occasion)[] = ["Any", "Bridal", "Festive", "Everyday", "Gifting"];
const SORTS = ["Featured", "Price: low to high", "Price: high to low", "Weight: light first"] as const;

function useHash() {
  return useSyncExternalStore(
    (cb) => {
      window.addEventListener("hashchange", cb);
      return () => window.removeEventListener("hashchange", cb);
    },
    () => decodeURIComponent(window.location.hash.slice(1)),
    () => "",
  );
}

export function PageHead({ kicker, title, italic, sub }: { kicker: string; title: string; italic: string; sub: string }) {
  return (
    <section className="px-5 pb-12 pt-36 text-center sm:px-8 sm:pt-44">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <Eyebrow center>{kicker}</Eyebrow>
      </motion.div>
      <h1 className={`${SERIF} mt-7 text-[clamp(3rem,7.4vw,7rem)] font-medium leading-[0.95]`}>
        <Lines now delay={0.2} lines={[title, <span key="i" className="italic" style={{ color: KJ.goldLight }}>{italic}</span>]} />
      </h1>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 1 }} className="mx-auto mt-6 max-w-[36rem] text-[17px] leading-relaxed text-[#F3E3C3]/70">
        {sub}
      </motion.p>
    </section>
  );
}

export function KalaaCollections() {
  const hash = useHash();
  const [picked, setPicked] = useState<"All" | Collection | null>(null);
  const [metal, setMetal] = useState<"Any" | Metal>("Any");
  const [occasion, setOccasion] = useState<"Any" | Occasion>("Any");
  const [sort, setSort] = useState<(typeof SORTS)[number]>("Featured");
  const [open, setOpen] = useState<Piece | null>(null);

  const fromHash = COLLECTIONS.some((c) => c.id === hash) ? (hash as Collection) : "All";
  const collection = picked ?? fromHash;

  let list = PIECES.filter((p) => (collection === "All" || p.collection === collection) && (metal === "Any" || p.metal === metal) && (occasion === "Any" || p.occasion === occasion));
  if (sort === "Price: low to high") list = [...list].sort((a, b) => priceOf(a) - priceOf(b));
  if (sort === "Price: high to low") list = [...list].sort((a, b) => priceOf(b) - priceOf(a));
  if (sort === "Weight: light first") list = [...list].sort((a, b) => a.weight - b.weight);

  const chip = (on: boolean) => `relative h-10 shrink-0 px-4 text-[12px] uppercase tracking-[0.18em] transition-colors ${on ? "text-[#15110D]" : "border border-[#F3E3C3]/15 text-[#F3E3C3]/70 hover:text-[#F3E3C3]"}`;

  return (
    <main>
      <PageHead kicker="The catalogue" title="Our" italic="collections." sub="Every piece is BIS hallmarked, weighed in front of you and priced at today's gold rate. Tap any piece for a closer look." />
      <section className="px-5 pb-24 sm:px-8 sm:pb-32">
        <div className="mx-auto max-w-[1400px]">
          <Feature id="filters" label="Filter by collection, metal and occasion">
            <div className="border-y py-5" style={{ borderColor: KJ.line }}>
              <div className="-mx-5 flex gap-2 overflow-x-auto px-5 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0">
                {(["All", ...COLLECTIONS.map((c) => c.id)] as ("All" | Collection)[]).map((c) => {
                  const on = c === collection;
                  return (
                    <button key={c} type="button" onClick={() => setPicked(c)} className={chip(on)}>
                      {on && <motion.span layoutId="kj-col" className="absolute inset-0" style={{ background: KJ.gold }} transition={{ type: "spring", stiffness: 420, damping: 36 }} />}
                      <span className="relative">{c}</span>
                    </button>
                  );
                })}
              </div>
              <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`${LABEL} mr-1 text-[10px] text-[#A39478]`}>Metal</span>
                  {METALS.map((m) => (
                    <button key={m} type="button" onClick={() => setMetal(m)} className={`h-8 px-3 text-[13px] transition-colors ${m === metal ? "text-[#F0CF86] underline decoration-[#D4A84B] underline-offset-[6px]" : "text-[#F3E3C3]/60 hover:text-[#F3E3C3]"}`}>
                      {m}
                    </button>
                  ))}
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <label className="flex items-center gap-2 text-[13px] text-[#A39478]">
                    Occasion
                    <select value={occasion} onChange={(e) => setOccasion(e.target.value as "Any" | Occasion)} className="h-9 border bg-transparent px-2 text-[13px] text-[#F3E3C3] outline-none" style={{ borderColor: KJ.line }}>
                      {OCCASIONS.map((o) => (
                        <option key={o} value={o} className="bg-[#1E1813]">
                          {o}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="flex items-center gap-2 text-[13px] text-[#A39478]">
                    Sort
                    <select value={sort} onChange={(e) => setSort(e.target.value as (typeof SORTS)[number])} className="h-9 border bg-transparent px-2 text-[13px] text-[#F3E3C3] outline-none" style={{ borderColor: KJ.line }}>
                      {SORTS.map((s) => (
                        <option key={s} value={s} className="bg-[#1E1813]">
                          {s}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              </div>
            </div>
          </Feature>

          <p className={`${LABEL} mt-8 text-[10px] text-[#A39478]`}>
            {list.length} {list.length === 1 ? "piece" : "pieces"}
            {collection !== "All" ? ` · ${collection}` : ""}
          </p>

          <Feature id="quick-view" label="Quick view with zoom + price breakdown" className="mt-6">
            <motion.div layout className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">
              <AnimatePresence mode="popLayout">
                {list.map((p, i) => (
                  <motion.div key={p.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.5, ease: EASE }}>
                    <PieceCard p={p} onOpen={setOpen} i={i} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </Feature>
          {list.length === 0 && <p className={`${SERIF} py-20 text-center text-[26px] italic text-[#A39478]`}>No pieces match. Try another metal or occasion.</p>}
        </div>
      </section>
      <QuickView piece={open} onClose={() => setOpen(null)} />
    </main>
  );
}
