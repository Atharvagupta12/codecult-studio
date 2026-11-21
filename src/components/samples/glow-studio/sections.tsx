"use client";

import { AnimatePresence, animate, motion, useInView, useMotionValue, useTransform } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { WhatsAppIcon } from "@/components/ui/icons";
import { Feature } from "../shared/Feature";
import { fmtTime } from "../shared/indiaTime";
import { useOpenStatus } from "../shared/useOpenStatus";
import { ADDRESS, DAYS, FIRST_VISIT_OFF, GALLERY, GS, HOURS, MAPS_URL, MAP_EMBED, REVIEWS, SERVICES, STYLISTS, TABS, dur, inr, type Tab } from "./data";
import { EASE, Eyebrow, Logo, OpenBadge, SERIF, Sparkle, Up, useActions } from "./shared";

const H2 = `${SERIF} text-[clamp(2.6rem,5.6vw,4.8rem)] leading-[0.98] tracking-[-0.01em]`;

/* ───────────────────────── Visit builder ───────────────────────── */

function Money({ value }: { value: number }) {
  const mv = useMotionValue(value);
  const text = useTransform(mv, (v) => inr(Math.round(v)));
  useEffect(() => {
    const c = animate(mv, value, { duration: 0.5, ease: EASE });
    return () => c.stop();
  }, [value, mv]);
  return <motion.span>{text}</motion.span>;
}

export function VisitBuilder() {
  const [tab, setTab] = useState<Tab>("Hair");
  const [picked, setPicked] = useState<string[]>(["glowfacial"]);
  const { book } = useActions();
  const t = TABS.find((x) => x.id === tab)!;
  const list = SERVICES.filter((s) => s.tab === tab);
  const chosen = SERVICES.filter((s) => picked.includes(s.id));
  const sub = chosen.reduce((n, s) => n + s.price, 0);
  const off = Math.round(sub * FIRST_VISIT_OFF);
  const total = sub - off;
  const mins = chosen.reduce((n, s) => n + s.mins, 0);
  const toggle = (id: string) => setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { amount: 0.15 });

  return (
    <section ref={sectionRef} id="services" className="scroll-mt-20 px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-[1280px]">
        <Up className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <Eyebrow>Services & prices</Eyebrow>
            <h2 className={`${H2} mt-5`}>
              Build your <span className="italic" style={{ color: GS.berry }}>visit.</span>
            </h2>
          </div>
          <p className="max-w-[26rem] text-[16px] leading-relaxed" style={{ color: GS.mute }}>
            Tap the services you&apos;d like. We&apos;ll add up the price and time for you, then book it on WhatsApp in one tap.
          </p>
        </Up>

        <Feature id="visit-builder" label="Build your visit: prices + time add up live" className="mt-10">
          <div className="grid gap-5 lg:grid-cols-[1.35fr_0.65fr]">
            <div className="overflow-hidden rounded-[32px] bg-white shadow-[0_40px_80px_-50px_rgba(58,26,46,0.5)]">
              {/* Tabs */}
              <div role="tablist" aria-label="Service categories" className="flex gap-1 overflow-x-auto border-b p-2 [scrollbar-width:none]" style={{ borderColor: GS.line }}>
                {TABS.map((x) => {
                  const on = x.id === tab;
                  const n = SERVICES.filter((s) => s.tab === x.id && picked.includes(s.id)).length;
                  return (
                    <button key={x.id} role="tab" type="button" aria-selected={on} onClick={() => setTab(x.id)} className={`relative flex h-12 shrink-0 items-center gap-2 rounded-full px-5 text-[15px] font-medium transition-colors ${on ? "text-white" : "hover:text-[#B8445E]"}`}>
                      {on && <motion.span layoutId="gs-tab" className="absolute inset-0 rounded-full" style={{ background: GS.plum }} transition={{ type: "spring", stiffness: 420, damping: 36 }} />}
                      <span className="relative">{x.id}</span>
                      {n > 0 && (
                        <span className="relative grid size-5 place-items-center rounded-full text-[11px] font-bold text-white" style={{ background: GS.berry }}>
                          {n}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
              <div className="grid md:grid-cols-[0.8fr_1.2fr]">
                <div className="relative hidden min-h-[440px] md:block">
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.div key={t.id} initial={{ opacity: 0, scale: 1.06 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.7, ease: EASE }} className="absolute inset-0">
                      <Image src={t.img} alt={t.id} fill sizes="320px" className="object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#3A1A2E]/80 to-transparent" />
                      <p className={`${SERIF} absolute inset-x-6 bottom-6 text-[24px] italic leading-snug text-white`}>{t.line}</p>
                    </motion.div>
                  </AnimatePresence>
                </div>
                <ul className="flex flex-col p-2 sm:p-3">
                  <AnimatePresence mode="popLayout" initial={false}>
                    {list.map((s, i) => {
                      const on = picked.includes(s.id);
                      return (
                        <motion.li key={s.id} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35, delay: i * 0.03 }}>
                          <button type="button" onClick={() => toggle(s.id)} aria-pressed={on} className={`flex w-full items-center gap-4 rounded-[20px] p-3.5 text-left transition-colors sm:p-4 ${on ? "bg-[#F8E6DE]" : "hover:bg-[#FFF8F3]"}`}>
                            <span className="min-w-0 flex-1">
                              <span className="flex flex-wrap items-center gap-2">
                                <span className="text-[16px] font-semibold">{s.name}</span>
                                {s.popular && (
                                  <span className="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] text-white" style={{ background: GS.gold }}>
                                    Popular
                                  </span>
                                )}
                              </span>
                              <span className="mt-0.5 block text-[13px]" style={{ color: GS.mute }}>
                                {s.desc} · {dur(s.mins)}
                              </span>
                            </span>
                            <span className={`${SERIF} shrink-0 text-[20px]`}>{inr(s.price)}</span>
                            <motion.span animate={{ rotate: on ? 45 : 0, backgroundColor: on ? GS.berry : "#FFFFFF" }} className="grid size-9 shrink-0 place-items-center rounded-full border text-[18px]" style={{ borderColor: on ? GS.berry : GS.line, color: on ? "#fff" : GS.plum }}>
                              +
                            </motion.span>
                          </button>
                        </motion.li>
                      );
                    })}
                  </AnimatePresence>
                </ul>
              </div>
            </div>

            {/* Summary */}
            <div className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-[32px] p-6 text-white sm:p-7" style={{ background: `linear-gradient(160deg, ${GS.plum}, #5A2442)` }}>
                <p className="flex items-center justify-between text-[13px] font-semibold uppercase tracking-[0.18em] text-white/60">
                  Your visit <span>{chosen.length} {chosen.length === 1 ? "service" : "services"}</span>
                </p>
                <ul className="mt-5 flex max-h-[220px] flex-col gap-2 overflow-y-auto" data-lenis-prevent>
                  <AnimatePresence initial={false}>
                    {chosen.length === 0 && (
                      <motion.li initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={`${SERIF} py-4 text-[20px] italic text-white/60`}>
                        Tap a service to start ✨
                      </motion.li>
                    )}
                    {chosen.map((s) => (
                      <motion.li key={s.id} layout initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="flex items-center justify-between gap-3 text-[15px]">
                        <span className="flex items-center gap-2">
                          <button type="button" onClick={() => toggle(s.id)} aria-label={`Remove ${s.name}`} className="grid size-5 place-items-center rounded-full bg-white/15 text-[11px]">
                            ✕
                          </button>
                          {s.name}
                        </span>
                        <span className="text-white/75">{inr(s.price)}</span>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
                <div className="mt-5 flex flex-col gap-1.5 border-t border-white/15 pt-4 text-[14px] text-white/70">
                  <p className="flex justify-between">
                    <span>Time needed</span>
                    <span>{mins ? dur(mins) : "—"}</span>
                  </p>
                  <p className="flex justify-between">
                    <span>First-visit 20% off</span>
                    <span className="text-[#EDB4BF]">− {inr(off)}</span>
                  </p>
                </div>
                <p className="mt-4 flex items-end justify-between">
                  <span className="text-[13px] uppercase tracking-[0.16em] text-white/60">Total</span>
                  <span className={`${SERIF} text-[44px] leading-none`}>
                    <Money value={total} />
                  </span>
                </p>
                <button type="button" disabled={!chosen.length} onClick={() => book(chosen, total, mins)} className="mt-6 flex h-14 w-full items-center justify-center gap-2 rounded-full bg-white text-[15px] font-semibold transition-transform hover:-translate-y-0.5 disabled:opacity-40" style={{ color: GS.plum }}>
                  <WhatsAppIcon className="size-5 text-[#1DA851]" /> Book this visit
                </button>
                <p className="mt-3 text-center text-[12px] text-white/50">Pay at the salon · free cancellation</p>
              </div>
            </div>
          </div>
        </Feature>
      </div>

      {/* Phones: floating summary while choosing */}
      <AnimatePresence>
        {inView && chosen.length > 0 && (
          <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }} transition={{ duration: 0.4, ease: EASE }} className="fixed inset-x-3 bottom-[84px] z-[61] lg:hidden">
            <button type="button" onClick={() => book(chosen, total, mins)} className="flex w-full items-center justify-between gap-3 rounded-full py-2 pl-5 pr-2 text-white shadow-[0_20px_40px_-12px_rgba(58,26,46,0.7)]" style={{ background: GS.plum }}>
              <span className="text-left leading-tight">
                <span className="block text-[12px] text-white/65">
                  {chosen.length} {chosen.length === 1 ? "service" : "services"} · {dur(mins)}
                </span>
                <span className={`${SERIF} block text-[20px]`}>{inr(total)}</span>
              </span>
              <span className="flex h-11 items-center gap-2 rounded-full bg-white px-4 text-[14px] font-semibold" style={{ color: GS.plum }}>
                <WhatsAppIcon className="size-4 text-[#1DA851]" /> Book
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ───────────────────────── Before / after ───────────────────────── */

export function BeforeAfter() {
  const [pos, setPos] = useState(50);
  const [drag, setDrag] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const move = (x: number) => {
    const r = ref.current?.getBoundingClientRect();
    if (r) setPos(Math.min(95, Math.max(5, ((x - r.left) / r.width) * 100)));
  };
  return (
    <section id="results" className="scroll-mt-20 px-3 sm:px-5">
      <div className="mx-auto grid max-w-[1360px] items-center gap-10 overflow-hidden rounded-[40px] px-5 py-14 sm:rounded-[52px] sm:px-12 sm:py-20 lg:grid-cols-[0.9fr_1.1fr]" style={{ background: GS.blush }}>
        <Up>
          <Eyebrow>Real results</Eyebrow>
          <h2 className={`${H2} mt-5`}>
            One facial. <span className="italic" style={{ color: GS.berry }}>Real glow.</span>
          </h2>
          <p className="mt-5 max-w-[26rem] text-[17px] leading-relaxed" style={{ color: GS.mute }}>
            Drag the slider to see what one Signature Glow Facial does. No filters, no editing, just healthy, bright skin that photographs beautifully.
          </p>
          <ul className="mt-8 grid grid-cols-3 gap-3">
            {[
              ["60", "minutes"],
              ["7", "step ritual"],
              ["2 wk", "visible glow"],
            ].map(([k, v]) => (
              <li key={v} className="rounded-[20px] bg-white/70 p-4">
                <p className={`${SERIF} text-[32px] leading-none`} style={{ color: GS.berry }}>
                  {k}
                </p>
                <p className="mt-1 text-[12px]" style={{ color: GS.mute }}>
                  {v}
                </p>
              </li>
            ))}
          </ul>
        </Up>
        <Up delay={0.1}>
          <Feature id="before-after" label="Before / after slider">
            <div
              ref={ref}
              className="relative aspect-[4/4.4] cursor-ew-resize select-none overflow-hidden rounded-[32px] [touch-action:pan-y]"
              onPointerDown={(e) => {
                setDrag(true);
                e.currentTarget.setPointerCapture(e.pointerId);
                move(e.clientX);
              }}
              onPointerMove={(e) => drag && move(e.clientX)}
              onPointerUp={() => setDrag(false)}
              onPointerCancel={() => setDrag(false)}
            >
              <Image src="/images/glow-studio/glow-face.jpg" alt="After the glow facial" fill sizes="(min-width: 1024px) 600px, 100vw" className="object-cover saturate-[1.08]" draggable={false} />
              <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
                <Image src="/images/glow-studio/glow-face.jpg" alt="Before the glow facial" fill sizes="(min-width: 1024px) 600px, 100vw" className="object-cover [filter:saturate(0.55)_brightness(0.86)_contrast(0.9)_sepia(0.12)]" draggable={false} />
              </div>
              <span className="absolute left-4 top-4 rounded-full bg-black/45 px-3 py-1 text-[12px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur">Before</span>
              <span className="absolute right-4 top-4 rounded-full px-3 py-1 text-[12px] font-semibold uppercase tracking-[0.14em] text-white" style={{ background: GS.berry }}>
                After
              </span>
              <div className="pointer-events-none absolute inset-y-0 w-[2px] -translate-x-1/2 bg-white" style={{ left: `${pos}%` }}>
                <span className="absolute left-1/2 top-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-[16px] shadow-xl" style={{ color: GS.berry }}>
                  ⟷
                </span>
              </div>
              <input type="range" min={5} max={95} value={pos} onChange={(e) => setPos(Number(e.target.value))} aria-label="Compare before and after" className="sr-only" />
            </div>
          </Feature>
        </Up>
      </div>
    </section>
  );
}

/* ───────────────────────── Stylists ───────────────────────── */

export function Stylists() {
  const { book } = useActions();
  return (
    <section id="stylists" className="scroll-mt-20 px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-[1280px]">
        <Up className="text-center">
          <Eyebrow className="justify-center">Meet the team</Eyebrow>
          <h2 className={`${H2} mt-5`}>
            Artists who <span className="italic" style={{ color: GS.berry }}>listen first.</span>
          </h2>
        </Up>
        <Feature id="stylists" label="Stylist profiles" className="mt-12">
          <div className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0">
            {STYLISTS.map((s, i) => (
              <Up key={s.name} delay={i * 0.1} className={`w-[78%] shrink-0 snap-center sm:w-auto ${i === 1 ? "sm:mt-12" : ""}`}>
                <article className="group">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-[32px]" style={{ background: GS.blush }}>
                    <Image src={s.img} alt={s.name} fill sizes="(min-width: 640px) 33vw, 78vw" className="object-cover transition-transform duration-[1200ms] group-hover:scale-105" style={{ objectPosition: s.pos }} />
                    <span className="absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-white/90 px-4 py-1.5 text-[12px] font-semibold backdrop-blur">
                      ♥ Loves doing: {s.fav}
                    </span>
                  </div>
                  <div className="mt-5 text-center">
                    <h3 className={`${SERIF} text-[28px]`}>{s.name}</h3>
                    <p className="mt-1 text-[15px]" style={{ color: GS.mute }}>
                      {s.role} · {s.years} yrs
                    </p>
                    <button type="button" onClick={() => book([])} className="mt-4 rounded-full border px-5 py-2 text-[14px] font-medium transition-colors hover:bg-[#B8445E] hover:text-white" style={{ borderColor: GS.berry, color: GS.berry }}>
                      Book with {s.name.split(" ")[0]}
                    </button>
                  </div>
                </article>
              </Up>
            ))}
          </div>
        </Feature>
      </div>
    </section>
  );
}

/* ───────────────────────── Reviews ───────────────────────── */

export function Reviews() {
  return (
    <section className="px-5 pb-20 sm:px-8 sm:pb-28">
      <div className="mx-auto max-w-[1280px]">
        <Feature id="reviews" label="Google reviews">
          <div className="grid gap-4 lg:grid-cols-[0.75fr_2fr]">
            <Up>
              <div className="flex h-full flex-col justify-between rounded-[32px] p-8 text-white" style={{ background: GS.berry }}>
                <div>
                  <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-white/70">Loved in Indore</p>
                  <p className={`${SERIF} mt-4 text-[110px] leading-[0.85]`}>4.9</p>
                  <p className="mt-3 text-[22px] tracking-[-0.06em] text-[#FFD48A]">★★★★★</p>
                </div>
                <p className="mt-8 text-[15px] text-white/80">860 reviews on Google</p>
              </div>
            </Up>
            <div className="grid gap-4 sm:grid-cols-2">
              {REVIEWS.map((r, i) => (
                <Up key={r.name} delay={i * 0.07}>
                  <figure className="flex h-full flex-col rounded-[28px] bg-white p-6 shadow-[0_20px_50px_-40px_rgba(58,26,46,0.6)]">
                    <div className="flex items-center justify-between">
                      <span className="text-[14px] tracking-[-0.06em] text-[#E4A13A]">★★★★★</span>
                      <span className="rounded-full px-3 py-1 text-[12px] font-semibold" style={{ background: GS.blush, color: GS.berry }}>
                        {r.tag}
                      </span>
                    </div>
                    <blockquote className={`${SERIF} mt-4 flex-1 text-[19px] italic leading-snug`}>&ldquo;{r.text}&rdquo;</blockquote>
                    <figcaption className="mt-5 flex items-center gap-3 text-[14px]">
                      <span className="grid size-10 place-items-center rounded-full font-semibold text-white" style={{ background: GS.plum }}>
                        {r.name[0]}
                      </span>
                      <span>
                        <b className="block">{r.name}</b>
                        <span className="text-[12px]" style={{ color: GS.mute }}>
                          {r.when} · Google
                        </span>
                      </span>
                    </figcaption>
                  </figure>
                </Up>
              ))}
            </div>
          </div>
        </Feature>
      </div>
    </section>
  );
}

/* ───────────────────────── Gallery ───────────────────────── */

export function Gallery() {
  return (
    <section className="px-5 pb-20 sm:px-8 sm:pb-28">
      <div className="mx-auto max-w-[1280px]">
        <Up className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <Eyebrow>Inside the studio</Eyebrow>
            <h2 className={`${H2} mt-5`}>
              @glowstudio<span className="italic" style={{ color: GS.berry }}>.indore</span>
            </h2>
          </div>
          <span className="inline-flex h-12 w-fit items-center rounded-full bg-white px-5 text-[14px] font-semibold shadow-sm">Follow on Instagram ↗</span>
        </Up>
        <Feature id="gallery" label="Photo gallery" className="mt-10">
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
            {GALLERY.map((g, i) => (
              <Up key={g.src} delay={i * 0.05} className={`group relative overflow-hidden rounded-[24px] ${i % 3 === 0 ? "aspect-[4/5]" : "aspect-square"} ${i === 1 || i === 6 ? "md:translate-y-8" : ""}`}>
                <Image src={g.src} alt={g.alt} fill sizes="(min-width: 768px) 25vw, 50vw" className="object-cover transition-transform duration-[1200ms] group-hover:scale-110" />
                <div className="absolute inset-0 grid place-items-center bg-[#B8445E]/0 text-[30px] text-white opacity-0 transition-all duration-500 group-hover:bg-[#B8445E]/30 group-hover:opacity-100">♥</div>
              </Up>
            ))}
          </div>
        </Feature>
      </div>
    </section>
  );
}

/* ───────────────────────── Visit ───────────────────────── */

const ORDER = [1, 2, 3, 4, 5, 6, 0];

export function Visit() {
  const status = useOpenStatus(HOURS);
  const { call, book } = useActions();
  return (
    <section id="visit" className="scroll-mt-20 px-3 pb-4 sm:px-5">
      <div className="mx-auto grid max-w-[1360px] gap-3 lg:grid-cols-[1fr_1.1fr]">
        <Up>
          <div className="h-full rounded-[40px] p-7 text-white sm:rounded-[52px] sm:p-12" style={{ background: GS.plum }}>
            <p className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.22em] text-[#EDB4BF]">
              <Sparkle className="size-3" /> Visit us
            </p>
            <h2 className={`${SERIF} mt-5 text-[clamp(2.8rem,6vw,5rem)] leading-none`}>
              Come <span className="italic text-[#EDB4BF]">glow.</span>
            </h2>
            <p className="mt-5 text-[16px] text-white/75">{ADDRESS}</p>
            <ul className="mt-7 flex flex-col gap-1">
              {ORDER.map((d) => {
                const today = status?.today === d;
                const closed = HOURS[d][1] <= HOURS[d][0];
                return (
                  <li key={d} className={`flex justify-between rounded-[14px] px-4 py-2.5 text-[15px] ${today ? "bg-white/10 font-semibold" : "text-white/70"}`}>
                    <span>
                      {DAYS[d]} {today && <span className="ml-2 rounded-full bg-[#B8445E] px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] text-white">Today</span>}
                    </span>
                    <span>{closed ? "Closed" : `${fmtTime(HOURS[d][0])} – ${fmtTime(HOURS[d][1])}`}</span>
                  </li>
                );
              })}
            </ul>
            <div className="mt-8 flex flex-wrap gap-2.5">
              <a href={MAPS_URL} target="_blank" rel="noopener" className="flex h-12 items-center rounded-full bg-white px-5 text-[15px] font-semibold" style={{ color: GS.plum }}>
                Directions ↗
              </a>
              <Feature id="call" label="Tap to call" inline>
                <button type="button" onClick={call} className="flex h-12 items-center rounded-full border border-white/25 px-5 text-[15px] font-semibold">
                  Call the salon
                </button>
              </Feature>
              <button type="button" onClick={() => book([])} className="flex h-12 items-center gap-2 rounded-full bg-[#1DA851] px-5 text-[15px] font-semibold">
                <WhatsAppIcon className="size-4" /> WhatsApp
              </button>
            </div>
          </div>
        </Up>
        <Up delay={0.1} className="h-full">
          <Feature id="map" label="Google Maps + directions" className="h-full">
            <div className="relative h-full min-h-[380px] overflow-hidden rounded-[40px] sm:rounded-[52px]" style={{ background: GS.blush }}>
              <iframe title="Glow Studio on Google Maps" src={MAP_EMBED} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="absolute inset-0 h-full w-full border-0 [filter:sepia(0.25)_hue-rotate(-15deg)_saturate(0.8)]" />
              <span className="absolute left-4 top-4">
                <OpenBadge />
              </span>
            </div>
          </Feature>
        </Up>
      </div>
    </section>
  );
}

/* ───────────────────────── Footer ───────────────────────── */

export function Footer() {
  return (
    <footer className="px-3 pb-28 pt-3 sm:px-5 sm:pb-32">
      <div className="mx-auto max-w-[1360px] overflow-hidden rounded-[40px] px-6 pt-12 sm:rounded-[52px] sm:px-12" style={{ background: GS.blush }}>
        <div className="flex flex-col justify-between gap-8 sm:flex-row">
          <div className="max-w-[22rem]">
            <Logo />
            <p className="mt-3 text-[15px]" style={{ color: GS.mute }}>
              Hair · Skin · Makeup · Nails · Bridal. {ADDRESS}
            </p>
          </div>
          <div className="flex gap-12 text-[15px]" style={{ color: GS.mute }}>
            <div className="flex flex-col gap-2">
              <a href="#services">Services</a>
              <a href="#stylists">Stylists</a>
              <a href="#visit">Visit</a>
            </div>
            <div className="flex flex-col gap-2">
              <span>Instagram</span>
              <span>Google</span>
              <span>WhatsApp</span>
            </div>
          </div>
        </div>
        <p className={`${SERIF} mt-10 select-none whitespace-nowrap text-[min(15vw,230px)] leading-[0.85]`}>
          Glow <span className="italic" style={{ color: GS.berry }}>Studio</span>
        </p>
        <div className="-mx-6 mt-6 flex flex-col justify-between gap-1 border-t px-6 py-5 text-[12px] sm:-mx-12 sm:flex-row sm:px-12" style={{ borderColor: GS.line, color: GS.mute }}>
          <span>© 2026 Glow Studio, Indore</span>
          <Link href="/" className="hover:text-[#3A1A2E]">
            Website by CodeCult Studio
          </Link>
        </div>
      </div>
    </footer>
  );
}
