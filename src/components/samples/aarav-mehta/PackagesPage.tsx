"use client";

import { AnimatePresence, animate, motion, useMotionValue, useTransform } from "motion/react";
import { useEffect, useState } from "react";
import { Feature } from "../shared/Feature";
import { ADDONS, AM, BASE, EVENTS, PACKAGES, PRICE, inr } from "./data";
import { PageHead } from "./Shell";
import { Btn, Caption, EASE, MONO, SERIF, Up, useActions } from "./shared";

export function AaravPackages() {
  return (
    <main>
      <PageHead n="05" kicker="Packages" title="Investment," italic="made simple." sub="Three thoughtfully built packages, or build your own below. Travel within Madhya Pradesh is included; elsewhere in India at actual cost." />
      <Packages />
      <Estimator />
      <Faq />
    </main>
  );
}

function Packages() {
  const { enquire } = useActions();
  return (
    <section className="px-5 pb-24 sm:px-10 sm:pb-32">
      <div className="mx-auto max-w-[1500px]">
        <Feature id="packages" label="Wedding packages">
          <div className="grid gap-4 lg:grid-cols-3">
            {PACKAGES.map((p, i) => {
              const pop = "popular" in p && p.popular;
              return (
                <Up key={p.id} delay={i * 0.08}>
                  <article className={`relative flex h-full flex-col rounded-[6px] border p-7 sm:p-10 ${pop ? "border-[#D9B97A]" : ""}`} style={{ borderColor: pop ? AM.gold : AM.line, background: pop ? "linear-gradient(180deg, rgba(217,185,122,0.10), transparent 60%)" : AM.panel }}>
                    {pop && (
                      <span className={`${MONO} absolute right-6 top-6 rounded-full px-3 py-1 text-black`} style={{ background: AM.gold }}>
                        Most loved
                      </span>
                    )}
                    <p className={MONO} style={{ color: AM.mute }}>
                      {p.line}
                    </p>
                    <h2 className={`${SERIF} mt-4 text-[64px] italic leading-none`}>{p.name}</h2>
                    <p className="mt-6 text-[34px] font-medium tracking-[-0.03em]">
                      {inr(p.price)}
                      <span className={`${MONO} ml-2`} style={{ color: AM.mute }}>
                        onwards
                      </span>
                    </p>
                    <ul className="mt-8 flex flex-1 flex-col gap-3 border-t pt-6 text-[15px]" style={{ borderColor: AM.line }}>
                      {p.features.map((f) => (
                        <li key={f} className="flex gap-3 text-[#F2EDE4]/85">
                          <span style={{ color: AM.gold }}>✦</span>
                          {f}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-10">
                      <Btn variant={pop ? "gold" : "line"} className="w-full" cursor="Enquire" onClick={() => enquire(`Hi Aarav! 💛\nWe're interested in the ${p.name} package (${inr(p.price)}).\nCould you check if you're free on our wedding dates?`)}>
                        Enquire about {p.name}
                      </Btn>
                    </div>
                  </article>
                </Up>
              );
            })}
          </div>
        </Feature>
      </div>
    </section>
  );
}

function Total({ value }: { value: number }) {
  const mv = useMotionValue(value);
  const text = useTransform(mv, (v) => inr(Math.round(v / 100) * 100));
  useEffect(() => {
    const c = animate(mv, value, { duration: 0.6, ease: EASE });
    return () => c.stop();
  }, [value, mv]);
  return <motion.span>{text}</motion.span>;
}

function Estimator() {
  const { enquire } = useActions();
  const [days, setDays] = useState(2);
  const [shooters, setShooters] = useState(2);
  const [events, setEvents] = useState<string[]>(["Haldi", "Wedding", "Reception"]);
  const [addons, setAddons] = useState<string[]>(["drone"]);
  const toggle = (list: string[], set: (v: string[]) => void, v: string) => set(list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

  const addonTotal = ADDONS.filter((a) => addons.includes(a.id)).reduce((n, a) => n + a.price, 0);
  const total = days * PRICE.perDay + events.length * PRICE.perEvent + Math.max(0, shooters - 1) * PRICE.extraShooter * days + addonTotal;

  const step = (v: number, set: (n: number) => void, min: number, max: number) => (
    <div className="flex items-center gap-3">
      <button type="button" onClick={() => set(Math.max(min, v - 1))} className="grid size-11 place-items-center rounded-full border border-white/20 text-[18px] hover:bg-white/10" aria-label="Less">
        −
      </button>
      <span className="w-10 text-center text-[28px] font-medium">{v}</span>
      <button type="button" onClick={() => set(Math.min(max, v + 1))} className="grid size-11 place-items-center rounded-full border border-white/20 text-[18px] hover:bg-white/10" aria-label="More">
        +
      </button>
    </div>
  );
  const chip = (on: boolean) => `h-11 rounded-full px-4 text-[14px] transition-colors ${on ? "bg-[#F2EDE4] text-black" : "border border-white/15 text-[#F2EDE4]/70 hover:text-[#F2EDE4]"}`;

  return (
    <section className="px-5 pb-24 sm:px-10 sm:pb-32">
      <div className="mx-auto max-w-[1500px]">
        <Up>
          <Caption>Build your own</Caption>
          <h2 className={`${SERIF} mt-6 text-[clamp(2.6rem,5vw,4.8rem)] italic leading-none`}>Price estimator</h2>
        </Up>
        <Feature id="estimator" label="Live price estimator" className="mt-10">
          <div className="grid overflow-hidden rounded-[6px] border lg:grid-cols-[1.3fr_0.7fr]" style={{ borderColor: AM.line }}>
            <div className="flex flex-col gap-9 p-6 sm:p-10" style={{ background: AM.panel }}>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-[18px]">Days of coverage</p>
                  <p className={MONO} style={{ color: AM.mute }}>
                    {inr(PRICE.perDay)} / day
                  </p>
                </div>
                {step(days, setDays, 1, 5)}
              </div>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-[18px]">Photographers</p>
                  <p className={MONO} style={{ color: AM.mute }}>
                    + {inr(PRICE.extraShooter)} / extra / day
                  </p>
                </div>
                {step(shooters, setShooters, 1, 4)}
              </div>
              <div>
                <p className="text-[18px]">Events</p>
                <p className={MONO} style={{ color: AM.mute }}>
                  {inr(PRICE.perEvent)} each
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {EVENTS.map((e) => (
                    <button key={e} type="button" onClick={() => toggle(events, setEvents, e)} className={chip(events.includes(e))}>
                      {e}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[18px]">Add-ons</p>
                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  {ADDONS.map((a) => {
                    const on = addons.includes(a.id);
                    return (
                      <button key={a.id} type="button" onClick={() => toggle(addons, setAddons, a.id)} className={`flex items-center justify-between rounded-[4px] border px-4 py-3.5 text-left text-[15px] transition-colors ${on ? "border-[#D9B97A] bg-[#D9B97A]/10" : "border-white/12 hover:border-white/30"}`} style={{ borderColor: on ? AM.gold : AM.line }}>
                        <span className="flex items-center gap-3">
                          <span className={`grid size-5 place-items-center rounded-[3px] border text-[12px] ${on ? "border-[#D9B97A] bg-[#D9B97A] text-black" : "border-white/30"}`}>{on ? "✓" : ""}</span>
                          {a.label}
                        </span>
                        <span className={MONO} style={{ color: AM.mute }}>
                          +{inr(a.price)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-between gap-8 p-6 sm:p-10" style={{ background: "linear-gradient(180deg, rgba(217,185,122,0.14), rgba(217,185,122,0.02))" }}>
              <div>
                <p className={MONO} style={{ color: AM.gold }}>
                  Your estimate
                </p>
                <p className="mt-4 text-[clamp(2.8rem,5vw,4.4rem)] font-medium leading-none tracking-[-0.04em]">
                  <Total value={total} />
                </p>
                <ul className="mt-8 flex flex-col gap-2 text-[14px]" style={{ color: AM.mute }}>
                  <li className="flex justify-between">
                    <span>
                      {days} {days === 1 ? "day" : "days"} · {shooters} {shooters === 1 ? "photographer" : "photographers"}
                    </span>
                    <span>{inr(days * PRICE.perDay + Math.max(0, shooters - 1) * PRICE.extraShooter * days)}</span>
                  </li>
                  <li className="flex justify-between">
                    <span>{events.length} events</span>
                    <span>{inr(events.length * PRICE.perEvent)}</span>
                  </li>
                  <AnimatePresence initial={false}>
                    {addonTotal > 0 && (
                      <motion.li initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="flex justify-between">
                        <span>{addons.length} add-ons</span>
                        <span>{inr(addonTotal)}</span>
                      </motion.li>
                    )}
                  </AnimatePresence>
                </ul>
              </div>
              <div>
                <Btn
                  variant="gold"
                  className="w-full"
                  cursor="Send"
                  onClick={() =>
                    enquire(
                      `Hi Aarav! 💛\nOur estimate from your website:\n• ${days} days, ${shooters} photographers\n• Events: ${events.join(", ") || "-"}\n• Add-ons: ${ADDONS.filter((a) => addons.includes(a.id)).map((a) => a.label).join(", ") || "none"}\nEstimate: ${inr(total)}\nAre you free for our dates?`,
                      "Custom quotes straight to your WhatsApp",
                    )
                  }
                >
                  Send this quote on WhatsApp
                </Btn>
                <p className="mt-3 text-center text-[12px]" style={{ color: AM.mute }}>
                  Final quote confirmed after a 20-min call.
                </p>
                <div className="mt-4 text-center">
                  <a href={`${BASE}/book`} className={`${MONO} underline-offset-4 hover:underline`} style={{ color: AM.gold }}>
                    Check my dates first →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Feature>
      </div>
    </section>
  );
}

const QA = [
  ["How far in advance should we book?", "Peak season (Nov – Feb) dates usually go 8–12 months ahead. A 30% advance confirms your date."],
  ["When do we get our photos?", "A sneak peek within 72 hours, the full gallery in 4 weeks and films in 6–8 weeks."],
  ["Do you travel for destination weddings?", "Yes, all over India and abroad. Travel and stay are billed at actual cost."],
  ["Can we customise a package?", "Always. Use the estimator above or message me and I'll build one around your events."],
];

function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section className="px-5 pb-24 sm:px-10 sm:pb-32">
      <div className="mx-auto grid max-w-[1500px] gap-10 border-t pt-14 lg:grid-cols-[0.7fr_1.3fr]" style={{ borderColor: AM.line }}>
        <div>
          <Caption>Questions</Caption>
          <h2 className={`${SERIF} mt-6 text-[clamp(2.4rem,4vw,3.8rem)] italic leading-none`}>Good to know.</h2>
        </div>
        <div>
          {QA.map(([q, a], i) => {
            const on = open === i;
            return (
              <div key={q} className="border-b" style={{ borderColor: AM.line }}>
                <button type="button" aria-expanded={on} onClick={() => setOpen(on ? -1 : i)} className="flex w-full items-center justify-between gap-6 py-6 text-left text-[clamp(1.1rem,1.8vw,1.4rem)]">
                  {q}
                  <span className={`text-[24px] transition-transform duration-500 ${on ? "rotate-45" : ""}`} style={{ color: AM.gold }}>
                    +
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {on && (
                    <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: EASE }} className="overflow-hidden">
                      <span className="block max-w-[40rem] pb-6 text-[16px] leading-relaxed" style={{ color: AM.mute }}>
                        {a}
                      </span>
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
