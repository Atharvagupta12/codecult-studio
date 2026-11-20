"use client";

import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { Feature } from "../shared/Feature";
import { AddButton } from "./cart";
import { BASE, CATS, DISHES, EM, TASTING, inr, type Dish } from "./data";
import { PageHero } from "./Shell";
import { Btn, D, DietMark, LABEL, Label, Up } from "./shared";

type Diet = "all" | "veg" | "nonveg" | "signature";
const DIETS: { id: Diet; label: string }[] = [
  { id: "all", label: "All" },
  { id: "veg", label: "Vegetarian" },
  { id: "nonveg", label: "Non-veg" },
  { id: "signature", label: "Signatures" },
];

export function EmberMenu() {
  const [diet, setDiet] = useState<Diet>("all");
  const [hovered, setHovered] = useState<Dish | null>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 200, damping: 24 });
  const y = useSpring(my, { stiffness: 200, damping: 24 });

  const filtered = useMemo(
    () =>
      DISHES.filter((d) => (diet === "veg" ? d.veg : diet === "nonveg" ? !d.veg : diet === "signature" ? d.tags?.some((t) => t === "Signature" || t === "Chef's special") : true)),
    [diet],
  );

  return (
    <main onPointerMove={(e) => (mx.set(e.clientX), my.set(e.clientY))}>
      <PageHero img="/images/ember/dish-dark.jpg" kicker="The menu" title="Cooked over" italic="charcoal & clay." sub="Seasonal, fire-led and unapologetically Indian. Our menu changes with the market, but the signatures never leave." />

      {/* Tasting */}
      <section className="px-5 py-20 sm:px-8 sm:py-28">
        <Up className="mx-auto max-w-[1440px]">
          <div className="grid overflow-hidden rounded-[6px] border lg:grid-cols-[1fr_1.1fr]" style={{ borderColor: EM.line, background: EM.panel }}>
            <div className="relative min-h-[320px]">
              <Image src="/images/ember/plating-greens.jpg" alt="Tasting course being plated" fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
            </div>
            <div className="p-8 sm:p-12">
              <Label>Chef&apos;s tasting · 7 courses</Label>
              <h2 className={`${D} mt-5 text-[clamp(2.2rem,4vw,3.6rem)] leading-[1.05]`}>
                The Ember <span className="italic text-[#D9A55B]">tasting menu</span>
              </h2>
              <ol className="mt-8 flex flex-col gap-2.5">
                {TASTING.map((t, i) => (
                  <li key={t} className="flex gap-4 text-[15px]">
                    <span className={`${D} w-6 italic`} style={{ color: EM.gold }}>
                      {i + 1}
                    </span>
                    {t}
                  </li>
                ))}
              </ol>
              <div className="mt-10 flex flex-wrap items-center gap-6">
                <Btn href={`${BASE}/reserve`} cursor="Book">
                  Book the tasting
                </Btn>
                <p className="text-[14px]" style={{ color: EM.mute }}>
                  ₹2,950 veg · ₹3,450 non-veg
                </p>
              </div>
            </div>
          </div>
        </Up>
      </section>

      {/* À la carte */}
      <section className="px-5 pb-28 sm:px-8 sm:pb-36">
        <div className="mx-auto max-w-[1440px]">
          <Up className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <Label>À la carte</Label>
              <h2 className={`${D} mt-5 text-[clamp(2.6rem,5vw,4.6rem)] leading-none`}>
                Order by <span className="italic text-[#D9A55B]">the plate.</span>
              </h2>
            </div>
            <Feature id="filters" label="Dietary filters" inline>
              <div role="tablist" aria-label="Filter dishes" className="flex flex-wrap gap-2">
                {DIETS.map((f) => {
                  const active = f.id === diet;
                  return (
                    <button
                      key={f.id}
                      role="tab"
                      type="button"
                      aria-selected={active}
                      onClick={() => setDiet(f.id)}
                      className={`relative h-11 rounded-full border px-5 text-[12px] font-semibold uppercase tracking-[0.18em] transition-colors ${active ? "text-[#0C0907]" : "hover:border-[#D9A55B]"}`}
                      style={{ borderColor: active ? EM.gold : EM.line }}
                    >
                      {active && <motion.span layoutId="em-diet" className="absolute inset-0 rounded-full" style={{ background: EM.gold }} transition={{ type: "spring", stiffness: 400, damping: 34 }} />}
                      <span className="relative">{f.label}</span>
                    </button>
                  );
                })}
              </div>
            </Feature>
          </Up>

          <Feature id="hover-menu" label="Menu with hover dish previews" className="mt-14">
            <div className="grid gap-x-16 gap-y-14 lg:grid-cols-2">
              {CATS.map((c) => {
                const items = filtered.filter((d) => d.cat === c.id);
                if (!items.length) return null;
                return (
                  <Up key={c.id}>
                    <h3 className={`${LABEL} border-b pb-4`} style={{ color: EM.gold, borderColor: EM.line }}>
                      {c.label}
                    </h3>
                    <ul>
                      <AnimatePresence initial={false}>
                        {items.map((d) => (
                          <motion.li
                            key={d.id}
                            layout
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onPointerEnter={() => d.img && setHovered(d)}
                            onPointerLeave={() => setHovered(null)}
                            className="group flex items-start gap-4 border-b py-5"
                            style={{ borderColor: EM.line }}
                          >
                            {d.img && (
                              <span className="relative size-16 shrink-0 overflow-hidden rounded-[4px] lg:hidden">
                                <Image src={d.img} alt="" fill sizes="64px" className="object-cover" />
                              </span>
                            )}
                            <div className="min-w-0 flex-1">
                              <div className="flex items-baseline gap-3">
                                <DietMark veg={d.veg} />
                                <span className={`${D} text-[22px] leading-tight transition-colors group-hover:text-[#D9A55B] sm:text-[24px]`}>{d.name}</span>
                                <span className="mx-1 hidden min-w-6 flex-1 translate-y-[-5px] border-b border-dotted sm:block" style={{ borderColor: "rgba(243,233,220,0.2)" }} />
                                <span className={`${D} ml-auto shrink-0 text-[20px] italic sm:ml-0`} style={{ color: EM.gold }}>
                                  {inr(d.price)}
                                </span>
                              </div>
                              <p className="mt-1 pl-[26px] text-[14px]" style={{ color: EM.mute }}>
                                {d.desc}
                                {d.tags?.map((t) => (
                                  <span key={t} className="ml-2 text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color: t === "Spicy" ? EM.flame : EM.gold }}>
                                    · {t}
                                  </span>
                                ))}
                              </p>
                              <div className="mt-3 pl-[26px] sm:hidden">
                                <AddButton dish={d} compact />
                              </div>
                            </div>
                            <span className="hidden sm:block">
                              <AddButton dish={d} compact />
                            </span>
                          </motion.li>
                        ))}
                      </AnimatePresence>
                    </ul>
                  </Up>
                );
              })}
            </div>
          </Feature>
          <p className="mt-10 text-center text-[13px]" style={{ color: EM.mute }}>
            All prices in INR, exclusive of 5% GST. Please tell us about allergies; our kitchen will happily adapt.
          </p>
        </div>
      </section>

      {/* Floating preview (desktop) */}
      <AnimatePresence>
        {hovered?.img && (
          <motion.div
            key={hovered.id}
            aria-hidden
            className="pointer-events-none fixed left-0 top-0 z-40 hidden lg:block"
            style={{ x, y }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative ml-8 mt-8 h-[260px] w-[210px] overflow-hidden rounded-[6px] shadow-[0_30px_60px_-10px_rgba(0,0,0,0.8)]">
              <Image src={hovered.img} alt="" fill sizes="210px" className="object-cover" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
