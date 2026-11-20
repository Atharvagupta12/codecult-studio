"use client";

import Image from "next/image";
import { Feature } from "../shared/Feature";
import { BASE, COACHES, IP, RESULTS } from "./data";
import { PageHero } from "./Shell";
import { BeforeAfter, Btn, Counter, D, Kicker, LABEL, Slam, Up, useActions } from "./shared";

export function IronpeakResults() {
  return (
    <main>
      <PageHero
        img="/images/ironpeak/flex-red.jpg"
        kicker="Results & coaches"
        title="Real people."
        outline="Real results."
        sub="No filters, no fake promises. Every transformation here was coached, tracked and earned on our floor."
        pos="50% 30%"
      />
      <Stats />
      <Transformations />
      <Coaches />
      <Cta />
    </main>
  );
}

function Stats() {
  return (
    <section className="px-5 sm:px-8">
      <div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-px border lg:grid-cols-4" style={{ background: IP.line, borderColor: IP.line }}>
        {[
          [6, " kg", "average fat loss in 12 weeks"],
          [92, "%", "hit their 90-day goal"],
          [1100, "+", "personal records this year"],
          [300, "+", "documented transformations"],
        ].map(([n, s, l], i) => (
          <Up key={l as string} delay={i * 0.06}>
            <div style={{ background: IP.bg }} className="h-full p-6 sm:p-8">
              <Counter to={n as number} suffix={s as string} className={`${D} block text-[44px] leading-none sm:text-[64px]`} />
              <span className="mt-2 block text-[14px] text-white/55">{l}</span>
            </div>
          </Up>
        ))}
      </div>
    </section>
  );
}

function Transformations() {
  return (
    <section className="px-5 py-14 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-[1440px]">
        <Up>
          <Kicker>Transformations · drag the slider</Kicker>
          <h2 className={`${D} mt-4 text-[clamp(2.8rem,6vw,5.4rem)] leading-[0.9]`}>
            <Slam lines={["Before.", <span key="a" style={{ color: IP.lime }}>After.</span>]} />
          </h2>
        </Up>
        <Feature id="transformations" label="Before / after sliders" className="mt-10 sm:mt-14">
          <div className="flex flex-col gap-14 lg:gap-20">
            {RESULTS.map((r, i) => (
              <div key={r.name} className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-16 ${i % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
                <Up>
                  <BeforeAfter before={r.before} after={r.after} alt={`${r.name} transformation`} className="aspect-[4/5]" />
                </Up>
                <Up delay={0.1}>
                  <p className={`${LABEL} text-white/45`}>{r.program}</p>
                  <h3 className={`${D} mt-3 text-[clamp(2.6rem,5vw,4.4rem)] leading-[0.9]`}>
                    {r.name} · <span style={{ color: IP.lime }}>{r.weeks} weeks</span>
                  </h3>
                  <p className="mt-5 max-w-[30rem] text-[18px] italic leading-relaxed text-white/75">&ldquo;{r.quote}&rdquo;</p>
                  <div className="mt-8 grid grid-cols-3 gap-px" style={{ background: IP.line }}>
                    {r.stats.map(([k, v]) => (
                      <div key={v} className="p-4 sm:p-5" style={{ background: IP.bg }}>
                        <p className={`${D} text-[30px] leading-none sm:text-[44px]`} style={{ color: IP.lime }}>
                          {k}
                        </p>
                        <p className="mt-1.5 text-[12px] font-semibold uppercase tracking-[0.1em] text-white/50">{v}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {["Coach-tracked", "Body scans every month", "Diet plan included"].map((t) => (
                      <span key={t} className="bg-white/5 px-3 py-1.5 text-[12px] font-semibold text-white/70">
                        ✓ {t}
                      </span>
                    ))}
                  </div>
                </Up>
              </div>
            ))}
          </div>
        </Feature>
      </div>
    </section>
  );
}

function Coaches() {
  return (
    <section id="coaches" className="scroll-mt-20 px-5 pb-14 sm:px-8 sm:pb-20">
      <div className="mx-auto max-w-[1440px]">
        <Up className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <Kicker>The coaches</Kicker>
            <h2 className={`${D} mt-4 text-[clamp(2.8rem,6vw,5.4rem)] leading-[0.9]`}>
              <Slam lines={["They've", <span key="b" style={{ color: IP.lime }}>been there.</span>]} />
            </h2>
          </div>
          <p className="max-w-[26rem] text-[16px] leading-relaxed text-white/60">Certified, competing and obsessed with your progress. Every member gets a coach on day one.</p>
        </Up>
        <Feature id="coaches" label="Coach profiles" className="mt-10 sm:mt-14">
          <div className="-mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4">
            {COACHES.map((c, i) => (
              <Up key={c.name} delay={i * 0.08} className="w-[78%] shrink-0 snap-center sm:w-auto">
                <article className="group">
                  <div className="relative aspect-[3/4] overflow-hidden" style={{ background: IP.panel }}>
                    <Image src={c.img} alt={c.name} fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 78vw" className="object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0" style={{ objectPosition: c.pos }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                    <span className={`${LABEL} absolute left-3 top-3 px-2.5 py-1 text-black`} style={{ background: IP.lime }}>
                      {c.years} yrs
                    </span>
                    <div className="absolute inset-x-4 bottom-4">
                      <p className={`${D} text-[34px] leading-none`}>{c.name}</p>
                      <p className="mt-1 text-[13px] font-semibold uppercase tracking-[0.1em]" style={{ color: IP.lime }}>
                        {c.role}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-3 border-x border-b px-4 py-3 text-[13px]" style={{ borderColor: IP.line }}>
                    <span className="text-white/60">{c.spec.join(" · ")}</span>
                  </div>
                  <p className="px-4 py-3 text-[13px] font-bold uppercase tracking-[0.08em]" style={{ background: IP.panel }}>
                    🏆 {c.stat}
                  </p>
                </article>
              </Up>
            ))}
          </div>
        </Feature>
      </div>
    </section>
  );
}

function Cta() {
  const { trial } = useActions();
  return (
    <section className="px-5 pb-14 sm:px-8 sm:pb-20">
      <Up className="mx-auto max-w-[1440px]">
        <div className="flex flex-col items-start justify-between gap-8 p-8 text-black sm:p-12 lg:flex-row lg:items-center" style={{ background: IP.lime }}>
          <h2 className={`${D} text-[clamp(2.6rem,6vw,5.4rem)] leading-[0.9]`}>
            You&apos;re next.
            <br />
            Week one is free.
          </h2>
          <div className="flex flex-wrap gap-3">
            <button type="button" onClick={trial} className="h-14 bg-black px-7 text-[14px] font-extrabold uppercase tracking-[0.12em] text-[#E5FF3D] transition-transform hover:-translate-y-0.5">
              Claim free trial →
            </button>
            <Btn href={`${BASE}/plans`} variant="ghost" className="bg-black/10! text-black! ring-black/30!">
              See plans
            </Btn>
          </div>
        </div>
      </Up>
    </section>
  );
}
