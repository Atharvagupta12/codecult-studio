"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { WhatsAppIcon } from "@/components/ui/icons";
import { Feature } from "../shared/Feature";
import { fmtTime, useOpenStatus } from "../shared/useOpenStatus";
import { ADDRESS, BL, DAYS, GALLERY, HOURS, MAPS_URL, MAP_EMBED, MENU, REVIEWS, SIGNATURES } from "./data";
import { Bean, D, EASE, SOFT, Stars, WONK, useCallAction, useOrderAction } from "./shared";

function Up({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p className="flex items-center gap-2.5 text-[12px] font-semibold uppercase tracking-[0.22em]" style={{ color: light ? BL.latte : BL.caramel }}>
      <span className="h-px w-8" style={{ background: "currentColor" }} />
      {children}
    </p>
  );
}

/* ───────────────────────── Signatures ───────────────────────── */

export function Signatures() {
  return (
    <section id="signatures" className="px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-[1320px]">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <Up>
            <Eyebrow>Our signatures</Eyebrow>
            <h2 className={`${D} ${SOFT} mt-5 max-w-[14ch] text-[clamp(2.6rem,6vw,5.2rem)] font-[600] leading-[0.95] tracking-[-0.04em]`}>
              The ones everyone{" "}
              <span className={`${WONK} italic`} style={{ color: BL.caramel }}>
                comes back
              </span>{" "}
              for.
            </h2>
          </Up>
          <Up delay={0.1} className="max-w-[24rem] text-[16px] leading-relaxed" >
            <p style={{ color: BL.mute }}>Roasted in small batches every week and pulled by baristas who genuinely care about your cup.</p>
          </Up>
        </div>

        <div className="mt-12 grid gap-5 sm:mt-16 md:grid-cols-3">
          {SIGNATURES.map((s, i) => (
            <Up key={s.n} delay={i * 0.12} className={i === 1 ? "md:mt-16" : ""}>
              <article className="group relative aspect-[3/4] overflow-hidden rounded-[32px] shadow-[0_40px_80px_-40px_rgba(34,20,13,0.6)]">
                <Image src={s.img} alt={s.name} fill sizes="(min-width: 768px) 33vw, 90vw" style={{ objectPosition: s.pos }} className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#22140D] via-[#22140D]/20 to-transparent" />
                <span className={`${D} ${WONK} absolute left-6 top-5 text-[56px] italic leading-none text-[#FBF6EE]/90`}>{s.n}</span>
                <span className="absolute right-5 top-6 rounded-full bg-[#FBF6EE] px-3.5 py-1.5 text-[15px] font-bold" style={{ color: BL.espresso }}>
                  ₹{s.price}
                </span>
                <div className="absolute inset-x-6 bottom-6 text-[#FBF6EE]">
                  <h3 className={`${D} ${SOFT} text-[30px] font-[600] leading-tight tracking-[-0.02em]`}>{s.name}</h3>
                  <p className="mt-2 max-w-[22rem] text-[15px] leading-relaxed text-[#FBF6EE]/75">{s.notes}</p>
                </div>
              </article>
            </Up>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Menu ───────────────────────── */

export function MenuSection() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const a = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 80, reduce ? 0 : -80]);
  const b = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : -60, reduce ? 0 : 100]);

  return (
    <section id="menu" ref={ref} className="relative scroll-mt-20 overflow-hidden px-4 py-20 sm:px-8 sm:py-28" style={{ background: BL.espresso }}>
      {/* Peeking photos */}
      <motion.div style={{ y: a }} className="absolute -left-16 top-24 hidden size-[300px] -rotate-12 overflow-hidden rounded-[36px] shadow-2xl xl:block">
        <Image src="/images/brew-lane/croissant.jpg" alt="" fill sizes="300px" className="object-cover" />
      </motion.div>
      <motion.div style={{ y: b }} className="absolute -right-12 bottom-24 hidden h-[360px] w-[270px] rotate-[8deg] overflow-hidden rounded-[36px] shadow-2xl xl:block">
        <Image src="/images/brew-lane/iced-latte.jpg" alt="" fill sizes="270px" className="object-cover" />
      </motion.div>

      <Up className="relative mx-auto max-w-[1040px]">
        <Feature id="menu" label="Full menu with prices">
          <div className="rounded-[32px] p-3 shadow-[0_60px_120px_-40px_rgba(0,0,0,0.8)] sm:p-4" style={{ background: BL.paper }}>
            <div className="rounded-[24px] border px-5 py-12 sm:px-14 sm:py-16" style={{ borderColor: `${BL.espresso}22` }}>
              <div className="text-center">
                <p className="text-[11px] font-bold uppercase tracking-[0.3em]" style={{ color: BL.caramel }}>
                  Est. 2019 · Vijay Nagar
                </p>
                <h2 className={`${D} ${WONK} mt-3 text-[clamp(3.4rem,9vw,6.5rem)] font-[500] italic leading-none tracking-[-0.03em]`}>The Menu</h2>
                <p className="mt-3 text-[14px]" style={{ color: BL.mute }}>
                  Fresh every morning · prices include taxes
                </p>
              </div>

              <div className="mt-12 grid gap-x-16 gap-y-12 md:grid-cols-2">
                {MENU.map((cat) => (
                  <div key={cat.title}>
                    <h3 className="flex items-center gap-3 text-[12px] font-bold uppercase tracking-[0.24em]" style={{ color: BL.caramel }}>
                      <Bean className="size-3.5" />
                      {cat.title}
                      <span className="h-px flex-1" style={{ background: `${BL.caramel}40` }} />
                    </h3>
                    <ul className="mt-5 flex flex-col gap-5">
                      {cat.items.map((it) => (
                        <li key={it.name}>
                          <div className="flex items-baseline gap-2">
                            <span className={`${D} ${SOFT} text-[20px] font-[600] leading-tight tracking-[-0.01em] sm:text-[22px]`}>{it.name}</span>
                            {it.veg && <VegMark />}
                            {it.fav && (
                              <span className="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#FBF6EE]" style={{ background: BL.caramel }}>
                                ★ Favourite
                              </span>
                            )}
                            <span className="mx-1 min-w-6 flex-1 translate-y-[-4px] border-b-2 border-dotted" style={{ borderColor: `${BL.espresso}30` }} />
                            <span className={`${D} ${SOFT} text-[20px] font-[600] sm:text-[22px]`}>₹{it.price}</span>
                          </div>
                          {it.desc && (
                            <p className="mt-0.5 text-[14px]" style={{ color: BL.mute }}>
                              {it.desc}
                            </p>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <p className="mt-12 border-t pt-6 text-center text-[13px]" style={{ borderColor: `${BL.espresso}15`, color: BL.mute }}>
                Oat or almond milk +₹40 · Extra shot +₹50 · Ask us about today&apos;s single origin
              </p>
            </div>
          </div>
        </Feature>
      </Up>
    </section>
  );
}

function VegMark() {
  return (
    <span title="Vegetarian" className="grid size-3.5 shrink-0 translate-y-[1px] place-items-center rounded-[3px] border-[1.5px] border-[#2E8B4A]">
      <span className="size-1.5 rounded-full bg-[#2E8B4A]" />
    </span>
  );
}

/* ───────────────────────── Story ───────────────────────── */

export function Story() {
  return (
    <section id="story" className="scroll-mt-20 px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto grid max-w-[1320px] items-center gap-14 lg:grid-cols-[1fr_1.05fr]">
        <div>
          <Up>
            <Eyebrow>Our story</Eyebrow>
            <h2 className={`${D} ${SOFT} mt-5 text-[clamp(2.4rem,5vw,4.4rem)] font-[600] leading-[1] tracking-[-0.035em]`}>
              Two friends, one espresso machine and{" "}
              <span className={`${WONK} italic`} style={{ color: BL.caramel }}>
                a lot
              </span>{" "}
              of milk foam.
            </h2>
          </Up>
          <Up delay={0.1}>
            <p className="mt-7 max-w-[32rem] text-[17px] leading-[1.7]" style={{ color: BL.mute }}>
              Brew Lane started in 2019 when two college friends got tired of driving across the city for a decent flat white. Today we roast
              in small batches, bake every morning, and keep the music low enough for good conversation.
            </p>
          </Up>
          <Up delay={0.2} className="mt-10 grid max-w-[30rem] grid-cols-3 gap-4 border-t pt-8" >
            {[
              ["2019", "Opened our doors"],
              ["40", "Cosy seats"],
              ["12", "Single origins"],
            ].map(([k, v]) => (
              <div key={v}>
                <p className={`${D} ${SOFT} text-[44px] font-[600] leading-none tracking-[-0.03em]`}>{k}</p>
                <p className="mt-2 text-[13px]" style={{ color: BL.mute }}>
                  {v}
                </p>
              </div>
            ))}
          </Up>
        </div>

        <Up delay={0.1} className="relative h-[460px] sm:h-[580px]">
          <div className="absolute left-0 top-0 h-[68%] w-[74%] overflow-hidden rounded-[32px] shadow-xl">
            <Image src="/images/brew-lane/interior.jpg" alt="Inside Brew Lane" fill sizes="(min-width: 1024px) 480px, 74vw" className="object-cover" />
          </div>
          <div className="absolute bottom-0 right-0 h-[54%] w-[58%] overflow-hidden rounded-[32px] border-[8px] shadow-2xl" style={{ borderColor: BL.cream }}>
            <Image src="/images/brew-lane/latte-pour.jpg" alt="Barista pouring latte art" fill sizes="(min-width: 1024px) 380px, 58vw" className="object-cover" />
          </div>
          <div className="absolute right-[6%] top-[4%] size-[110px] overflow-hidden rounded-full border-[6px] shadow-xl sm:size-[140px]" style={{ borderColor: BL.cream }}>
            <Image src="/images/brew-lane/beans.jpg" alt="" fill sizes="140px" className="object-cover" />
          </div>
          <span
            className={`${D} ${WONK} absolute bottom-[14%] left-[4%] -rotate-[8deg] rounded-full px-5 py-2.5 text-[20px] italic text-[#FBF6EE] shadow-xl`}
            style={{ background: BL.caramel }}
          >
            since 2019 ♥
          </span>
        </Up>
      </div>
    </section>
  );
}

/* ───────────────────────── Reviews ───────────────────────── */

export function Reviews() {
  return (
    <section id="reviews" className="scroll-mt-20 px-4 sm:px-6">
      <div className="mx-auto max-w-[1400px] overflow-hidden rounded-[36px] px-5 py-20 sm:rounded-[48px] sm:px-12 sm:py-24" style={{ background: BL.roast, color: BL.cream }}>
        <Feature id="reviews" label="Google reviews">
          <div className="grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <Up>
              <Eyebrow light>What Indore says</Eyebrow>
              <p className={`${D} ${SOFT} mt-6 text-[120px] font-[600] leading-[0.8] tracking-[-0.05em] sm:text-[160px]`}>
                4.8
              </p>
              <Stars className="mt-4 block text-[26px]" />
              <p className="mt-3 flex items-center gap-2 text-[15px] text-[#F4EADB]/70">
                <GoogleMark /> 312 reviews on Google
              </p>
            </Up>
            <div className="grid gap-4 sm:grid-cols-2">
              {REVIEWS.map((r, i) => (
                <Up key={r.name} delay={i * 0.12} className={i === 0 ? "sm:col-span-2" : ""}>
                  <figure className="h-full rounded-[28px] p-6 sm:p-7" style={{ background: i === 0 ? BL.cream : "rgba(255,255,255,0.06)", color: i === 0 ? BL.espresso : BL.cream }}>
                    <Stars className="text-[15px]" />
                    <blockquote className={`${D} ${WONK} mt-3 text-[20px] italic leading-[1.4] sm:text-[23px]`}>&ldquo;{r.text}&rdquo;</blockquote>
                    <figcaption className="mt-5 flex items-center gap-3 text-[14px]">
                      <span className="grid size-9 place-items-center rounded-full text-[14px] font-bold text-[#FBF6EE]" style={{ background: BL.caramel }}>
                        {r.name[0]}
                      </span>
                      <span>
                        <span className="block font-semibold">{r.name}</span>
                        <span className="block text-[12px] opacity-60">{r.when} · Google</span>
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

function GoogleMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden>
      <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5a5.6 5.6 0 0 1-2.4 3.6v3h3.9c2.3-2.1 3.5-5.2 3.5-8.8Z" />
      <path fill="#34A853" d="M12 24c3.2 0 6-1.1 7.9-2.9l-3.9-3c-1.1.7-2.4 1.2-4 1.2-3.1 0-5.7-2.1-6.6-4.9H1.4v3.1A12 12 0 0 0 12 24Z" />
      <path fill="#FBBC05" d="M5.4 14.4a7.2 7.2 0 0 1 0-4.7V6.6h-4a12 12 0 0 0 0 10.9l4-3.1Z" />
      <path fill="#EA4335" d="M12 4.8c1.7 0 3.3.6 4.5 1.8l3.4-3.4A12 12 0 0 0 1.4 6.6l4 3.1C6.3 6.9 8.9 4.8 12 4.8Z" />
    </svg>
  );
}

/* ───────────────────────── Gallery ───────────────────────── */

export function Gallery() {
  return (
    <section id="gallery" className="px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-[1320px]">
        <Up className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <Eyebrow>Gallery</Eyebrow>
            <h2 className={`${D} ${WONK} mt-4 text-[clamp(2.4rem,6vw,4.6rem)] font-[500] italic leading-none tracking-[-0.03em]`}>@brewlane.indore</h2>
          </div>
          <span className="inline-flex h-12 w-fit items-center gap-2 rounded-full border-2 px-5 text-[15px] font-semibold" style={{ borderColor: BL.espresso }}>
            Follow on Instagram ↗
          </span>
        </Up>

        <Feature id="gallery" label="Photo gallery" className="mt-10">
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 md:grid-rows-2">
            {GALLERY.map((g, i) => (
              <Up
                key={g.src}
                delay={i * 0.06}
                className={`group relative overflow-hidden rounded-[24px] ${i === 0 ? "col-span-2 row-span-2 aspect-square md:aspect-auto" : "aspect-square"}`}
              >
                <Image src={g.src} alt={g.alt} fill sizes="(min-width: 768px) 25vw, 50vw" className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-110" />
                <div className="absolute inset-0 grid place-items-center bg-[#22140D]/0 text-[28px] text-white opacity-0 transition-all duration-500 group-hover:bg-[#22140D]/35 group-hover:opacity-100">
                  ♥
                </div>
              </Up>
            ))}
          </div>
        </Feature>
      </div>
    </section>
  );
}

/* ───────────────────────── Visit ───────────────────────── */

const ORDER_DAYS = [1, 2, 3, 4, 5, 6, 0];

export function Visit() {
  const status = useOpenStatus(HOURS);
  const order = useOrderAction();
  const call = useCallAction();

  return (
    <section id="visit" className="scroll-mt-20 px-4 pb-6 sm:px-6">
      <div className="mx-auto grid max-w-[1400px] gap-4 lg:grid-cols-[1fr_1.1fr]">
        <Up>
          <div className="h-full rounded-[36px] p-7 sm:rounded-[48px] sm:p-12" style={{ background: BL.espresso, color: BL.cream }}>
            <Eyebrow light>Visit us</Eyebrow>
            <h2 className={`${D} ${SOFT} mt-5 text-[clamp(3rem,7vw,5.6rem)] font-[600] leading-[0.9] tracking-[-0.045em]`}>
              Come say{" "}
              <span className={`${WONK} italic`} style={{ color: BL.latte }}>
                hi.
              </span>
            </h2>
            <p className="mt-6 flex items-start gap-2.5 text-[16px] text-[#F4EADB]/80">
              <svg viewBox="0 0 24 24" className="mt-0.5 size-5 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.8}>
                <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" />
                <circle cx="12" cy="9.5" r="2.5" />
              </svg>
              {ADDRESS}
            </p>

            <ul className="mt-8 flex flex-col">
              {ORDER_DAYS.map((d) => {
                const today = status?.today === d;
                return (
                  <li
                    key={d}
                    className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-[15px] ${today ? "bg-white/10 font-semibold" : "text-[#F4EADB]/70"}`}
                  >
                    <span className="flex items-center gap-2">
                      {DAYS[d]}
                      {today && (
                        <span className="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em]" style={{ background: BL.caramel, color: BL.paper }}>
                          Today
                        </span>
                      )}
                    </span>
                    <span>
                      {fmtTime(HOURS[d][0])} – {fmtTime(HOURS[d][1])}
                    </span>
                  </li>
                );
              })}
            </ul>

            <div className="mt-8 flex flex-wrap gap-2.5">
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener"
                className="flex h-12 items-center gap-2 rounded-full px-5 text-[15px] font-semibold"
                style={{ background: BL.cream, color: BL.espresso }}
              >
                Get directions ↗
              </a>
              <Feature id="call" label="Tap to call" inline>
                <button type="button" onClick={call} className="flex h-12 items-center gap-2 rounded-full border border-white/20 px-5 text-[15px] font-semibold">
                  <svg viewBox="0 0 24 24" className="size-4" fill="currentColor">
                    <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.3 2.2Z" />
                  </svg>
                  Call us
                </button>
              </Feature>
              <button type="button" onClick={order} className="flex h-12 items-center gap-2 rounded-full bg-[#1DA851] px-5 text-[15px] font-semibold text-white">
                <WhatsAppIcon className="size-4" /> WhatsApp
              </button>
            </div>
          </div>
        </Up>

        <Up delay={0.1} className="h-full">
          <Feature id="map" label="Google Maps + directions" className="h-full">
            <div className="relative h-full min-h-[380px] overflow-hidden rounded-[36px] sm:rounded-[48px]" style={{ background: BL.latte }}>
              <iframe
                title="Brew Lane on Google Maps"
                src={MAP_EMBED}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full border-0 [filter:grayscale(0.35)_sepia(0.25)_contrast(1.05)]"
              />
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
    <footer className="px-4 pb-28 pt-4 sm:px-6 sm:pb-32">
      <div className="mx-auto max-w-[1400px] overflow-hidden rounded-[36px] px-6 pt-14 sm:rounded-[48px] sm:px-12" style={{ background: BL.caramel, color: BL.paper }}>
        <div className="flex flex-col justify-between gap-8 text-[15px] sm:flex-row">
          <div className="max-w-[20rem]">
            <p className="font-semibold">Brew Lane Coffee Co.</p>
            <p className="mt-2 text-[#FBF6EE]/80">{ADDRESS}</p>
          </div>
          <div className="flex gap-12">
            <div className="flex flex-col gap-2 text-[#FBF6EE]/85">
              <a href="#menu">Menu</a>
              <a href="#story">Our story</a>
              <a href="#visit">Visit</a>
            </div>
            <div className="flex flex-col gap-2 text-[#FBF6EE]/85">
              <span>Instagram</span>
              <span>Zomato</span>
              <span>Google</span>
            </div>
          </div>
        </div>
        <p className={`${D} ${SOFT} mt-10 select-none whitespace-nowrap text-[min(18vw,290px)] font-[700] leading-[0.78] tracking-[-0.06em]`}>
          Brew Lane.
        </p>
        <div className="-mx-6 flex flex-col justify-between gap-1 border-t border-white/20 px-6 py-5 text-[12px] text-[#FBF6EE]/75 sm:-mx-12 sm:flex-row sm:px-12">
          <span>© 2026 Brew Lane, Indore</span>
          <Link href="/" className="underline-offset-4 hover:underline">
            Website by CodeCult Studio
          </Link>
        </div>
      </div>
    </footer>
  );
}
