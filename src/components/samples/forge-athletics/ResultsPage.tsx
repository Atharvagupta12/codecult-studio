"use client";

import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from "motion/react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { Feature } from "../shared/Feature";
import { LineChart } from "./Chart";
import { BASE, CASES, FG } from "./data";
import { PageHead } from "./Shell";
import { Btn, D, EASE, Index, Lines, MONO, Up } from "./shared";

export function ForgeResults() {
  return (
    <main>
      <PageHead
        n="04"
        kicker="Results"
        title="Proof,"
        accent="not promises."
        sub="Every member is tested on day one and again on re-test day. These are real blocks, real numbers and real people."
        img="/images/forge-athletics/track-bw.jpg"
        pos="50% 60%"
      />
      <Numbers />
      <Cases />
      <Retest />
    </main>
  );
}

function Count({ to, suffix = "", decimals = 0 }: { to: number; suffix?: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const seen = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const mv = useMotionValue(reduce ? to : 0);
  const text = useTransform(mv, (v) => v.toFixed(decimals) + suffix);
  useEffect(() => {
    if (!seen || reduce) return;
    const c = animate(mv, to, { duration: 1.8, ease: EASE });
    return () => c.stop();
  }, [seen, reduce, to, mv]);
  return <motion.span ref={ref}>{text}</motion.span>;
}

function Numbers() {
  const items: [number, string, number, string][] = [
    [32, "%", 0, "average strength gain per block"],
    [6.4, " kg", 1, "average fat lost on Lean"],
    [94, "%", 0, "set a PR on re-test day"],
    [87, "%", 0, "renew after their first block"],
  ];
  return (
    <section className="px-5 pb-20 sm:px-8 sm:pb-28">
      <div className="mx-auto grid max-w-[1480px] grid-cols-2 gap-px border lg:grid-cols-4" style={{ background: FG.line, borderColor: FG.line }}>
        {items.map(([n, s, d, l], i) => (
          <Up key={l} delay={i * 0.06}>
            <div className="h-full p-5 sm:p-9" style={{ background: FG.bg }}>
              <p className={`${D} text-[clamp(1.4rem,3.8vw,3.8rem)] leading-none tracking-[-0.05em] whitespace-nowrap`} style={{ color: i === 0 ? FG.heat : undefined }}>
                <Count to={n} suffix={s} decimals={d} />
              </p>
              <p className="mt-3 text-[14px]" style={{ color: FG.mute }}>
                {l}
              </p>
            </div>
          </Up>
        ))}
      </div>
    </section>
  );
}

function Cases() {
  return (
    <section className="px-5 pb-20 sm:px-8 sm:pb-28">
      <div className="mx-auto max-w-[1480px]">
        <Index n="✱">Case studies</Index>
        <Feature id="charts" label="Case studies with animated progress charts" className="mt-10">
          <div className="flex flex-col gap-16 sm:gap-24">
            {CASES.map((c, i) => {
              const first = c.series[0];
              const last = c.series[c.series.length - 1];
              return (
                <article key={c.name} className={`grid items-center gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14 ${i % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
                  <Up>
                    <div className="relative aspect-[4/5] overflow-hidden" style={{ background: FG.panel }}>
                      <motion.div initial={{ scale: 1.2 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ duration: 1.6, ease: EASE }} className="absolute inset-0">
                        <Image src={c.img} alt="" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover grayscale" />
                      </motion.div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                      <div className="absolute inset-x-6 bottom-6">
                        <p className={MONO} style={{ color: FG.heat }}>
                          {c.program}
                        </p>
                        <p className={`${D} mt-2 text-[44px] leading-none tracking-[-0.04em]`}>{c.name}</p>
                      </div>
                    </div>
                  </Up>
                  <Up delay={0.1}>
                    <h2 className={`${D} text-[clamp(2.4rem,5vw,4.6rem)] leading-[0.9] tracking-[-0.045em]`}>
                      <Lines lines={[<span key="h" style={{ color: FG.heat }}>{c.headline}</span>]} />
                    </h2>
                    <p className="mt-5 max-w-[34rem] text-[18px] italic leading-relaxed" style={{ color: FG.mute }}>
                      &ldquo;{c.quote}&rdquo;
                    </p>
                    <div className="mt-8 border p-5 sm:p-7" style={{ borderColor: FG.line, background: FG.panel }}>
                      <div className="flex flex-wrap items-baseline justify-between gap-3">
                        <p className={MONO} style={{ color: FG.mute }}>
                          {c.metric}
                        </p>
                        <p className={MONO}>
                          <span style={{ color: FG.mute }}>Start</span> {first}
                          {c.unit} <span style={{ color: FG.heat }}>→</span> {last}
                          {c.unit}
                        </p>
                      </div>
                      <LineChart series={c.series} unit={c.unit} className="mt-5" />
                    </div>
                  </Up>
                </article>
              );
            })}
          </div>
        </Feature>
      </div>
    </section>
  );
}

function Retest() {
  return (
    <section className="px-5 pb-20 sm:px-8 sm:pb-28">
      <Up className="mx-auto max-w-[1480px]">
        <div className="relative overflow-hidden p-8 sm:p-14" style={{ background: FG.panel }}>
          <Image src="/images/forge-athletics/plates-bw.jpg" alt="" fill sizes="100vw" className="object-cover opacity-20 grayscale" />
          <div className="relative grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <p className={MONO} style={{ color: FG.heat }}>
                Every 12 weeks
              </p>
              <h2 className={`${D} mt-4 text-[clamp(2.6rem,7vw,6.4rem)] leading-[0.86] tracking-[-0.05em]`}>
                <Lines lines={["Re-test day", <span key="b" style={{ color: FG.heat }}>is our report card.</span>]} />
              </h2>
            </div>
            <div>
              <p className="text-[17px] leading-relaxed" style={{ color: FG.mute }}>
                New scan, new lifts, new numbers. Your first block starts with a free trial and a starting test.
              </p>
              <div className="mt-6">
                <Btn href={`${BASE}/trial`} cursor="Book">
                  Start my first block →
                </Btn>
              </div>
            </div>
          </div>
        </div>
      </Up>
    </section>
  );
}
