"use client";

import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { useEffect, useState } from "react";
import { Feature } from "../shared/Feature";
import { PageHead } from "./CollectionsPage";
import { GST, KJ, RATES, inr, type RateId } from "./data";
import { Btn, EASE, Eyebrow, LABEL, SERIF, Up, useActions } from "./shared";

function Spark({ data, up }: { data: readonly number[]; up: boolean }) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * 100},${30 - ((v - min) / (max - min || 1)) * 26}`).join(" ");
  return (
    <svg viewBox="0 0 100 32" className="h-10 w-full" preserveAspectRatio="none" aria-hidden>
      <motion.polyline points={pts} fill="none" stroke={up ? "#7BD88F" : "#E07A5F"} strokeWidth="1.5" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.4, ease: EASE }} />
    </svg>
  );
}

function Money({ value }: { value: number }) {
  const mv = useMotionValue(value);
  const text = useTransform(mv, (v) => inr(Math.round(v)));
  useEffect(() => {
    const c = animate(mv, value, { duration: 0.5, ease: EASE });
    return () => c.stop();
  }, [value, mv]);
  return <motion.span>{text}</motion.span>;
}

export function KalaaGoldRate() {
  const { send } = useActions();
  const [metal, setMetal] = useState<RateId>("22k");
  const [weight, setWeight] = useState(10);
  const [making, setMaking] = useState(12);
  const r = RATES.find((x) => x.id === metal)!;
  const value = weight * r.rate;
  const mk = (value * making) / 100;
  const gst = (value + mk) * GST;
  const total = value + mk + gst;
  const pct = ((weight - 1) / (100 - 1)) * 100;

  return (
    <main>
      <PageHead kicker="Updated 11:00 am today" title="Today's" italic="gold rate." sub="Live Indore rates for hallmarked gold and silver, plus a calculator so you know exactly what you'll pay. No surprises at the counter." />

      <section className="px-5 pb-20 sm:px-8 sm:pb-28">
        <Feature id="rates" label="Today's gold & silver rates" className="mx-auto max-w-[1400px]">
          <div className="grid gap-px border sm:grid-cols-2 lg:grid-cols-4" style={{ background: KJ.line, borderColor: KJ.line }}>
            {RATES.map((x, i) => {
              const up = x.change >= 0;
              return (
                <Up key={x.id} delay={i * 0.06}>
                  <div className="h-full p-7" style={{ background: x.id === "22k" ? KJ.panel2 : KJ.bg }}>
                    <div className="flex items-center justify-between">
                      <p className={LABEL} style={{ color: KJ.gold }}>
                        {x.label}
                      </p>
                      <span className="text-[12px]" style={{ color: up ? "#7BD88F" : "#E07A5F" }}>
                        {up ? "▲" : "▼"} {Math.abs(x.change)}%
                      </span>
                    </div>
                    <p className={`${SERIF} mt-4 text-[48px] font-medium leading-none`}>{inr(x.rate)}</p>
                    <p className="mt-1 text-[13px] text-[#A39478]">per gram · {x.note}</p>
                    <div className="mt-5">
                      <Spark data={x.week} up={up} />
                      <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-[#A39478]">Last 7 days</p>
                    </div>
                  </div>
                </Up>
              );
            })}
          </div>
        </Feature>
      </section>

      <section className="px-5 pb-24 sm:px-8 sm:pb-32">
        <div className="mx-auto max-w-[1400px]">
          <Up className="text-center">
            <Eyebrow center>Price calculator</Eyebrow>
            <h2 className={`${SERIF} mt-6 text-[clamp(2.4rem,4.6vw,4.2rem)] font-medium leading-[1]`}>
              Know your price <span className="italic" style={{ color: KJ.goldLight }}>before you visit.</span>
            </h2>
          </Up>
          <Feature id="calculator" label="Jewellery price calculator" className="mt-12">
            <div className="grid border lg:grid-cols-[1.2fr_0.8fr]" style={{ borderColor: KJ.line }}>
              <div className="flex flex-col gap-10 p-6 sm:p-10" style={{ background: KJ.panel }}>
                <div>
                  <p className={`${LABEL} text-[10px] text-[#A39478]`}>Metal & purity</p>
                  <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {RATES.map((x) => (
                      <button key={x.id} type="button" onClick={() => setMetal(x.id)} className={`relative h-14 border text-[14px] transition-colors ${x.id === metal ? "border-[#D4A84B] text-[#F0CF86]" : "text-[#F3E3C3]/70 hover:text-[#F3E3C3]"}`} style={{ borderColor: x.id === metal ? KJ.gold : KJ.line }}>
                        {x.id === metal && <motion.span layoutId="kj-metal" className="absolute inset-0 bg-[#D4A84B]/10" />}
                        <span className="relative">{x.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <label className="block">
                  <span className="flex items-baseline justify-between">
                    <span className={`${LABEL} text-[10px] text-[#A39478]`}>Weight</span>
                    <span className={`${SERIF} text-[40px] leading-none`}>
                      {weight} <span className="text-[18px] text-[#A39478]">grams</span>
                    </span>
                  </span>
                  <input
                    type="range"
                    min={1}
                    max={100}
                    value={weight}
                    onChange={(e) => setWeight(Number(e.target.value))}
                    className="mt-4 h-[3px] w-full cursor-pointer appearance-none [&::-moz-range-thumb]:size-5 [&::-moz-range-thumb]:rotate-45 [&::-moz-range-thumb]:rounded-none [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-[#F0CF86] [&::-webkit-slider-thumb]:size-5 [&::-webkit-slider-thumb]:rotate-45 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-[#F0CF86]"
                    style={{ background: `linear-gradient(to right, ${KJ.gold} ${pct}%, rgba(243,227,195,0.15) ${pct}%)` }}
                  />
                  <span className="mt-3 flex flex-wrap gap-2">
                    {[
                      ["Ring", 4],
                      ["Chain", 10],
                      ["Bangle pair", 24],
                      ["Necklace", 40],
                      ["Bridal set", 80],
                    ].map(([l, w]) => (
                      <button key={l} type="button" onClick={() => setWeight(w as number)} className="border px-3 py-1.5 text-[12px] text-[#A39478] transition-colors hover:text-[#F3E3C3]" style={{ borderColor: KJ.line }}>
                        {l} · {w} g
                      </button>
                    ))}
                  </span>
                </label>
                <label className="block">
                  <span className="flex items-baseline justify-between">
                    <span className={`${LABEL} text-[10px] text-[#A39478]`}>Making charges</span>
                    <span className={`${SERIF} text-[32px] leading-none`}>{making}%</span>
                  </span>
                  <input type="range" min={6} max={25} value={making} onChange={(e) => setMaking(Number(e.target.value))} className="mt-4 h-[3px] w-full cursor-pointer appearance-none bg-[#F3E3C3]/15 [&::-webkit-slider-thumb]:size-5 [&::-webkit-slider-thumb]:rotate-45 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-[#F0CF86]" />
                  <span className="mt-2 block text-[12px] text-[#A39478]">Plain gold 6–10% · Handcrafted 12–16% · Kundan & polki 18–25%</span>
                </label>
              </div>

              <div className="flex flex-col justify-between gap-8 p-6 sm:p-10" style={{ background: `linear-gradient(170deg, ${KJ.panel2}, ${KJ.bg})` }}>
                <div>
                  <p className={LABEL} style={{ color: KJ.gold }}>
                    Estimated price
                  </p>
                  <p className={`${SERIF} mt-4 text-[clamp(3rem,5vw,4.4rem)] font-medium leading-none`} style={{ color: KJ.goldLight }}>
                    <Money value={total} />
                  </p>
                  <div className="mt-8 flex flex-col gap-2.5 text-[14px] text-[#F3E3C3]/75">
                    <p className="flex justify-between">
                      <span>
                        {r.label}: {weight} g × {inr(r.rate)}
                      </span>
                      <span>{inr(Math.round(value))}</span>
                    </p>
                    <p className="flex justify-between">
                      <span>Making charges ({making}%)</span>
                      <span>{inr(Math.round(mk))}</span>
                    </p>
                    <p className="flex justify-between">
                      <span>GST (3%)</span>
                      <span>{inr(Math.round(gst))}</span>
                    </p>
                  </div>
                </div>
                <div>
                  <Btn
                    className="w-full"
                    onClick={() => send("Price enquiries straight to your WhatsApp", `Hi Kalaa Jewels! ✨\nI used your price calculator:\n${r.label}, ${weight} g, making ${making}%\nEstimate: ${inr(Math.round(total))}\nCan you show me designs in this budget?`)}
                  >
                    Show me designs in this budget
                  </Btn>
                  <p className="mt-3 text-center text-[12px] text-[#A39478]">Old gold exchange accepted at today&apos;s rate.</p>
                </div>
              </div>
            </div>
          </Feature>
        </div>
      </section>
    </main>
  );
}
