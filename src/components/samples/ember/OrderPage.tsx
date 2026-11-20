"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { Feature } from "../shared/Feature";
import { AddButton, OrderPanel, totals, useCart } from "./cart";
import { CATS, DISHES, EM, inr } from "./data";
import { D, DietMark, EASE, LABEL, Label, Up } from "./shared";

export function EmberOrder() {
  const { count, subtotal, mode, setDrawer } = useCart();
  return (
    <main>
      {/* Compact header */}
      <section className="relative overflow-hidden px-5 pb-12 pt-36 sm:px-8 sm:pt-44">
        <div className="absolute inset-0 opacity-30">
          <Image src="/images/ember/torch.jpg" alt="" fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0C0907]/40 to-[#0C0907]" />
        </div>
        <div className="relative mx-auto max-w-[1440px]">
          <Label>Order online</Label>
          <h1 className={`${D} mt-5 text-[clamp(3rem,8vw,7rem)] leading-[0.95]`}>
            Ember, <span className="italic text-[#D9A55B]">at home.</span>
          </h1>
          <p className="mt-5 max-w-[34rem] text-[17px] leading-relaxed" style={{ color: EM.mute }}>
            Delivery across Indore in sealed, heat-retaining packaging. Pickup ready in 25 minutes. Free delivery above ₹1,500.
          </p>
          {/* Category jump links */}
          <nav aria-label="Menu categories" className="-mx-5 mt-10 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:mx-0 sm:px-0">
            {CATS.map((c) => (
              <a key={c.id} href={`#cat-${c.id}`} className="shrink-0 rounded-full border px-4 py-2.5 text-[12px] font-semibold uppercase tracking-[0.16em] transition-colors hover:border-[#D9A55B] hover:text-[#D9A55B]" style={{ borderColor: EM.line }}>
                {c.label}
              </a>
            ))}
          </nav>
        </div>
      </section>

      <section className="px-5 pb-28 sm:px-8 sm:pb-36">
        <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[1fr_420px]">
          {/* Dishes */}
          <div className="flex min-w-0 flex-col gap-16">
            {CATS.map((c) => (
              <div key={c.id} id={`cat-${c.id}`} className="scroll-mt-28">
                <h2 className={`${D} border-b pb-4 text-[30px] italic`} style={{ borderColor: EM.line }}>
                  {c.label}
                </h2>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {DISHES.filter((d) => d.cat === c.id).map((d, i) => (
                    <Up key={d.id} delay={(i % 2) * 0.06} y={24}>
                      <article className="group flex h-full gap-4 rounded-[6px] border p-3 transition-colors hover:border-[#D9A55B]/50" style={{ borderColor: EM.line, background: EM.panel }}>
                        <div className="relative size-[104px] shrink-0 overflow-hidden rounded-[4px]" style={{ background: EM.panel2 }}>
                          {d.img ? (
                            <Image src={d.img} alt={d.name} fill sizes="104px" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                          ) : (
                            <span className={`${D} grid size-full place-items-center text-[34px] italic`} style={{ color: EM.gold }}>
                              E
                            </span>
                          )}
                        </div>
                        <div className="flex min-w-0 flex-1 flex-col justify-between gap-3 py-1">
                          <div>
                            <div className="flex min-w-0 items-center gap-2">
                              <DietMark veg={d.veg} />
                              <h3 className="truncate text-[16px] font-semibold">{d.name}</h3>
                            </div>
                            <p className="mt-1 line-clamp-2 text-[13px]" style={{ color: EM.mute }}>
                              {d.desc}
                            </p>
                          </div>
                          <div className="flex items-center justify-between gap-2">
                            <span className={`${D} text-[20px] italic`} style={{ color: EM.gold }}>
                              {inr(d.price)}
                            </span>
                            <AddButton dish={d} compact />
                          </div>
                        </div>
                      </article>
                    </Up>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Sticky cart (desktop) */}
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <Feature id="cart" label="Order cart → WhatsApp">
                <div className="max-h-[calc(100vh-140px)] overflow-y-auto rounded-[6px] border p-7" style={{ borderColor: EM.line, background: EM.panel }} data-lenis-prevent>
                  <OrderPanel />
                </div>
              </Feature>
            </div>
          </aside>
        </div>
      </section>

      {/* Mobile order bar */}
      <AnimatePresence>
        {count > 0 && (
          <motion.button
            type="button"
            onClick={() => setDrawer(true)}
            initial={{ y: 120 }}
            animate={{ y: 0 }}
            exit={{ y: 120 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="fixed inset-x-3 bottom-[84px] z-[60] flex h-14 items-center justify-between rounded-full px-6 lg:hidden"
            style={{ background: EM.gold, color: EM.bg }}
          >
            <span className={LABEL}>View order · {count}</span>
            <span className={`${D} text-[22px] italic`}>{inr(totals(subtotal, mode).total)}</span>
          </motion.button>
        )}
      </AnimatePresence>
    </main>
  );
}
