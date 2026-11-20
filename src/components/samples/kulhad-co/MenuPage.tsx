"use client";

import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { WhatsAppIcon } from "@/components/ui/icons";
import { Feature } from "../shared/Feature";
import { CATS, KC, MENU, type Cat, type Tag } from "./data";
import { COND, D, EASE, HAND, HI, Kulhad, Sticker, Up, Wave, useOrderAction } from "./shared";

const TAG_STYLE: Record<Tag, { bg: string; fg: string; label: string }> = {
  Bestseller: { bg: "#F4A83A", fg: "#123526", label: "★ Bestseller" },
  Spicy: { bg: "#E8457E", fg: "#FFF8EC", label: "🌶 Spicy" },
  Jain: { bg: "#1B4936", fg: "#F7EDDC", label: "Jain" },
  New: { bg: "#C4532F", fg: "#FFF8EC", label: "New" },
};

export function KulhadMenu() {
  const [cat, setCat] = useState<Cat | "all">("all");
  const [q, setQ] = useState("");
  const [best, setBest] = useState(false);
  const [jain, setJain] = useState(false);
  const order = useOrderAction();

  const items = useMemo(() => {
    const s = q.trim().toLowerCase();
    return MENU.filter(
      (m) =>
        (cat === "all" || m.cat === cat) &&
        (!best || m.tags?.includes("Bestseller")) &&
        (!jain || m.tags?.includes("Jain")) &&
        (!s || m.name.toLowerCase().includes(s) || m.desc.toLowerCase().includes(s)),
    );
  }, [cat, q, best, jain]);

  const count = (c: Cat | "all") => (c === "all" ? MENU.length : MENU.filter((m) => m.cat === c).length);

  return (
    <main>
      {/* Header */}
      <section className="relative -mt-[76px] overflow-hidden pt-[76px]" style={{ background: KC.green, color: KC.cream }}>
        <div aria-hidden className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: "radial-gradient(#F7EDDC 1.4px, transparent 1.4px)", backgroundSize: "22px 22px" }} />
        <div className="relative mx-auto flex max-w-[1320px] flex-col items-start gap-4 px-5 pb-14 pt-14 sm:px-8 sm:pb-16 sm:pt-20 md:flex-row md:items-end md:justify-between">
          <div>
            <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`${HI} text-[30px]`} style={{ color: KC.marigold }}>
              मेन्यू
            </motion.span>
            <h1 className={`${D} text-[clamp(4rem,12vw,10rem)] leading-[0.85] tracking-[-0.03em]`}>
              <span className="block overflow-hidden pb-[0.05em]">
                <motion.span className="block" initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ duration: 1, ease: EASE }}>
                  The Menu
                </motion.span>
              </span>
            </h1>
          </div>
          <div className="max-w-[24rem]">
            <p className="text-[17px] text-[#F7EDDC]/75">Twelve kinds of chai, hot snacks till 1 am and combos that won&apos;t hurt your pocket.</p>
            <p className={`${HAND} mt-2 text-[22px] font-bold`} style={{ color: KC.marigold }}>
              all prices incl. GST, no hidden charges ✌
            </p>
          </div>
        </div>
        <Wave fill={KC.cream} />
      </section>

      <section className="px-5 pb-20 sm:px-8 sm:pb-28">
        <Feature id="smart-menu" label="Smart menu: search + filters" className="mx-auto max-w-[1320px]">
          {/* Controls */}
          <div className="sticky top-[84px] z-30 -mx-2 rounded-[28px] px-2 py-3" style={{ background: `${KC.cream}F2`, backdropFilter: "blur(12px)" }}>
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
              <label className="relative flex h-12 items-center gap-2 rounded-full border-2 bg-[#FFF8EC] px-4 lg:w-[300px]" style={{ borderColor: KC.ink }}>
                <svg viewBox="0 0 24 24" className="size-5 shrink-0 opacity-60" fill="none" stroke="currentColor" strokeWidth={2}>
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.5-3.5" />
                </svg>
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search samosa, maggi…"
                  className="h-full w-full bg-transparent text-[15px] font-medium outline-none placeholder:opacity-50"
                  aria-label="Search the menu"
                />
                {q && (
                  <button type="button" onClick={() => setQ("")} aria-label="Clear search" className="text-[18px] opacity-60">
                    ×
                  </button>
                )}
              </label>

              <LayoutGroup>
                <div role="tablist" aria-label="Categories" className="-mx-5 flex gap-2 overflow-x-auto px-5 [scrollbar-width:none] sm:mx-0 sm:px-0">
                  {CATS.map((c) => {
                    const active = c.id === cat;
                    return (
                      <button
                        key={c.id}
                        role="tab"
                        type="button"
                        aria-selected={active}
                        onClick={() => setCat(c.id)}
                        className={`relative flex h-12 shrink-0 items-center gap-2 rounded-full border-2 px-4 text-[14px] font-bold transition-colors ${active ? "" : "bg-[#FFF8EC] hover:bg-white"}`}
                        style={{ borderColor: KC.ink, color: active ? KC.cream : KC.ink }}
                      >
                        {active && <motion.span layoutId="kc-cat" className="absolute inset-0 rounded-full" style={{ background: KC.green }} transition={{ type: "spring", stiffness: 420, damping: 34 }} />}
                        <span className="relative">{c.label}</span>
                        <span className="relative text-[11px] opacity-60">{count(c.id)}</span>
                      </button>
                    );
                  })}
                </div>
              </LayoutGroup>

              <div className="flex gap-2 lg:ml-auto">
                <Toggle on={best} onClick={() => setBest((b) => !b)} label="★ Bestsellers" />
                <Toggle on={jain} onClick={() => setJain((b) => !b)} label="Jain" />
              </div>
            </div>
            <p className="mt-3 px-1 text-[13px] font-semibold opacity-60">
              Showing {items.length} of {MENU.length} items
            </p>
          </div>

          {/* Grid */}
          <motion.ul layout className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {items.map((m) => (
                <motion.li
                  key={m.name}
                  layout
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="group flex overflow-hidden rounded-[24px] border-2 bg-[#FFF8EC]"
                  style={{ borderColor: KC.ink }}
                >
                  {m.img ? (
                    <div className="relative w-[34%] shrink-0 overflow-hidden">
                      <Image src={m.img} alt={m.name} fill sizes="160px" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                    </div>
                  ) : (
                    <div className="grid w-[22%] shrink-0 place-items-center" style={{ background: KC.marigold, color: KC.clay }}>
                      <Kulhad className="size-9" />
                    </div>
                  )}
                  <div className="flex min-w-0 flex-1 flex-col justify-between gap-3 p-4">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h3 className={`${D} text-[21px] leading-tight`}>{m.name}</h3>
                        <span className={`${D} shrink-0 text-[22px]`} style={{ color: KC.clay }}>
                          ₹{m.price}
                        </span>
                      </div>
                      <p className="mt-1 text-[14px] opacity-65">{m.desc}</p>
                    </div>
                    {m.tags && (
                      <div className="flex flex-wrap gap-1.5">
                        {m.tags.map((t) => (
                          <span key={t} className={`rounded-full px-2.5 py-0.5 text-[11px] tracking-[0.04em] ${COND}`} style={{ background: TAG_STYLE[t].bg, color: TAG_STYLE[t].fg }}>
                            {TAG_STYLE[t].label}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>

          {items.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 rounded-[28px] border-2 border-dashed p-12 text-center" style={{ borderColor: `${KC.ink}40` }}>
              <p className={`${D} text-[32px]`}>Arre, kuch nahi mila!</p>
              <p className="mt-2 opacity-60">Nothing matches that. Try another search or category.</p>
              <button
                type="button"
                onClick={() => {
                  setQ("");
                  setCat("all");
                  setBest(false);
                  setJain(false);
                }}
                className="mt-5 rounded-full px-5 py-2.5 text-[14px] font-bold"
                style={{ background: KC.green, color: KC.cream }}
              >
                Show everything
              </button>
            </motion.div>
          )}
        </Feature>

        <Up className="mx-auto mt-12 max-w-[1320px]">
          <div className="w-full rounded-[32px] p-8 sm:flex sm:items-center sm:justify-between sm:p-10" style={{ background: KC.green, color: KC.cream }}>
            <div>
              <Sticker rotate={-3}>Skip the queue</Sticker>
              <p className={`${D} mt-4 text-[32px] leading-tight sm:text-[40px]`}>Order ahead on WhatsApp.</p>
            </div>
            <button type="button" onClick={order} className="mt-6 inline-flex h-14 shrink-0 items-center gap-2.5 rounded-full px-7 text-[16px] font-bold sm:mt-0" style={{ background: KC.marigold, color: KC.green }}>
              <WhatsAppIcon className="size-5" /> Send my order
            </button>
          </div>
        </Up>
      </section>
    </main>
  );
}

function Toggle({ on, onClick, label }: { on: boolean; onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onClick}
      className="flex h-12 items-center gap-2 rounded-full border-2 px-4 text-[14px] font-bold transition-colors"
      style={{ borderColor: KC.ink, background: on ? KC.marigold : "#FFF8EC", color: KC.green }}
    >
      <span className={`relative h-5 w-9 rounded-full transition-colors ${on ? "" : "bg-black/15"}`} style={on ? { background: KC.green } : undefined}>
        <span className={`absolute top-0.5 size-4 rounded-full bg-white shadow transition-all ${on ? "left-[18px]" : "left-0.5"}`} />
      </span>
      {label}
    </button>
  );
}
