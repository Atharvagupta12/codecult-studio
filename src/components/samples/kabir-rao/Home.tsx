"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { Feature } from "../shared/Feature";
import { BASE, KR, PHOTO, PROJECTS, TESTIMONIALS } from "./data";
import { ProjectMock } from "./Mock";
import { Btn, Comment, EASE, MONO, OpenToWork, StackTag, Typed, Up, useActions } from "./shared";
import { Terminal } from "./Terminal";

export function KabirHome() {
  return (
    <main>
      <Hero />
      <Stats />
      <Featured />
      <Activity />
      <StackStrip />
      <Words />
      <Cta />
    </main>
  );
}

/* ───────────────────────── Hero ───────────────────────── */

function Hero() {
  const { resume, external } = useActions();
  return (
    <section className="px-5 pb-14 pt-28 sm:px-8 sm:pt-36 lg:pb-20">
      <div className="mx-auto grid max-w-[1240px] items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
        <div>
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }} className="flex flex-wrap items-center gap-3">
            <OpenToWork />
            <Comment>full-stack developer · indore, IN</Comment>
          </motion.div>
          <h1 className="mt-7 text-[clamp(2.8rem,6.6vw,5.8rem)] font-semibold leading-[1] tracking-[-0.05em]">
            {["I build things", "for the web."].map((l, i) => (
              <span key={l} className="block overflow-hidden pb-[0.06em]">
                <motion.span
                  className={`block ${i === 1 ? "bg-gradient-to-r from-[#3FB950] via-[#58A6FF] to-[#BC8CFF] bg-clip-text text-transparent" : ""}`}
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, ease: EASE, delay: 0.1 + i * 0.1 }}
                >
                  {l}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE, delay: 0.35 }} className="mt-6 max-w-[34rem] text-[17px] leading-relaxed sm:text-[19px]" style={{ color: KR.mute }}>
            I&apos;m <span className="text-[#E6EDF3]">Kabir Rao</span>. I turn ideas into fast, reliable products with React, Node and the cloud. 4+ years, 30+ shipped projects, one obsession: <span className="text-[#E6EDF3]">speed.</span>
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE, delay: 0.45 }} className="mt-8 flex flex-wrap gap-3">
            <Btn href={`${BASE}/projects`}>
              View projects <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </Btn>
            <Feature id="resume" label="One-click resume download" inline>
              <Btn onClick={resume} variant="ghost">
                <span className={MONO}>resume.pdf</span> ↓
              </Btn>
            </Feature>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.6 }} className="mt-10 flex items-center gap-4 border-t pt-6" style={{ borderColor: KR.line }}>
            <span className="relative size-12 overflow-hidden rounded-full ring-2 ring-[#3FB950]/50">
              <Image src={PHOTO} alt="Kabir Rao" fill sizes="48px" className="object-cover object-[50%_20%]" />
            </span>
            <span className="text-[14px] leading-tight">
              <span className="block font-medium">Senior Full-stack Engineer</span>
              <span style={{ color: KR.mute }}>@ Finlo · previously Swiftcart</span>
            </span>
            <span className={`${MONO} ml-auto hidden gap-4 text-[13px] sm:flex`} style={{ color: KR.mute }}>
              {["GitHub", "LinkedIn"].map((s) => (
                <button key={s} type="button" onClick={() => external(s)} className="hover:text-[#3FB950]">
                  {s} ↗
                </button>
              ))}
            </span>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 30, rotateX: 8 }} animate={{ opacity: 1, y: 0, rotateX: 0 }} transition={{ duration: 1, ease: EASE, delay: 0.25 }} style={{ perspective: 1200 }}>
          <Feature id="terminal" label="Interactive terminal: type `help`">
            <Terminal />
          </Feature>
        </motion.div>
      </div>
    </section>
  );
}

/* ───────────────────────── Stats ───────────────────────── */

function Stats() {
  return (
    <section className="px-5 sm:px-8">
      <div className="mx-auto grid max-w-[1240px] grid-cols-2 gap-px overflow-hidden rounded-xl border lg:grid-cols-4" style={{ background: KR.line, borderColor: KR.line }}>
        {[
          ["4+", "years shipping", KR.green],
          ["30+", "projects delivered", KR.blue],
          ["1.2k★", "on GitHub", KR.yellow],
          ["100", "Lighthouse score", KR.purple],
        ].map(([k, v, c], i) => (
          <Up key={v} delay={i * 0.06}>
            <div className="h-full p-5 sm:p-7" style={{ background: KR.bg }}>
              <p className={`${MONO} text-[34px] font-semibold leading-none tracking-[-0.03em] sm:text-[44px]`} style={{ color: c }}>
                {k}
              </p>
              <p className={`${MONO} mt-2 text-[12px]`} style={{ color: KR.mute }}>
                {v}
              </p>
            </div>
          </Up>
        ))}
      </div>
    </section>
  );
}

/* ───────────────────────── Featured projects ───────────────────────── */

function TiltMock({ p }: { p: (typeof PROJECTS)[number] }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 });
  return (
    <div
      style={{ perspective: 1400 }}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onPointerLeave={() => (mx.set(0), my.set(0))}
    >
      <motion.div style={{ rotateX: rx, rotateY: ry, boxShadow: `0 40px 100px -40px ${p.accent}66` }} className="rounded-[14px]">
        <ProjectMock kind={p.kind} accent={p.accent} name={p.name} />
      </motion.div>
    </div>
  );
}

function Featured() {
  const list = PROJECTS.filter((p) => p.featured);
  return (
    <section className="px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-[1240px]">
        <Up className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <Comment>featured work</Comment>
            <h2 className="mt-4 text-[clamp(2.2rem,4.6vw,3.8rem)] font-semibold leading-[1.02] tracking-[-0.045em]">
              Things I&apos;ve <span className="text-[#3FB950]">shipped.</span>
            </h2>
          </div>
          <Btn href={`${BASE}/projects`} variant="ghost">
            All {PROJECTS.length} projects →
          </Btn>
        </Up>

        <Feature id="projects" label="Featured projects with live UI previews" className="mt-14">
          <div className="flex flex-col gap-20 sm:gap-28">
            {list.map((p, i) => (
              <div key={p.slug} className={`grid items-center gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:gap-14 ${i % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
                <Up>
                  <Link href={`${BASE}/projects/${p.slug}`} aria-label={`${p.name} case study`}>
                    <TiltMock p={p} />
                  </Link>
                </Up>
                <Up delay={0.1}>
                  <p className={`${MONO} text-[13px]`} style={{ color: p.accent }}>
                    0{i + 1} · {p.year}
                  </p>
                  <h3 className="mt-3 text-[clamp(2rem,3.4vw,2.8rem)] font-semibold tracking-[-0.04em]">{p.name}</h3>
                  <p className="mt-2 text-[17px] leading-relaxed" style={{ color: KR.mute }}>
                    {p.tagline}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {p.stack.map((s) => (
                      <StackTag key={s}>{s}</StackTag>
                    ))}
                  </div>
                  <div className="mt-6 grid grid-cols-3 gap-px overflow-hidden rounded-lg border" style={{ background: KR.line, borderColor: KR.line }}>
                    {p.metrics.map(([k, v]) => (
                      <div key={v} className="p-3" style={{ background: KR.bg }}>
                        <p className={`${MONO} text-[20px] font-semibold`} style={{ color: p.accent }}>
                          {k}
                        </p>
                        <p className="mt-1 text-[11px] leading-snug" style={{ color: KR.mute }}>
                          {v}
                        </p>
                      </div>
                    ))}
                  </div>
                  <Link href={`${BASE}/projects/${p.slug}`} className={`${MONO} group mt-6 inline-flex items-center gap-2 text-[14px]`} style={{ color: p.accent }}>
                    read case study <span className="transition-transform group-hover:translate-x-1">→</span>
                  </Link>
                </Up>
              </div>
            ))}
          </div>
        </Feature>
      </div>
    </section>
  );
}

/* ───────────────────────── GitHub-style activity ───────────────────────── */

const WEEKS = 52;
const level = (w: number, d: number) => {
  const v = Math.sin(w * 0.9 + d * 1.7) + Math.cos(w * 0.37) * 1.2 + (d === 0 || d === 6 ? -0.9 : 0.4) + ((w * 7 + d) % 5 === 0 ? 1 : 0);
  return v < -0.6 ? 0 : v < 0.2 ? 1 : v < 0.9 ? 2 : v < 1.6 ? 3 : 4;
};
const SHADES = ["rgba(230,237,243,0.06)", "#0E4429", "#006D32", "#26A641", "#39D353"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function Activity() {
  return (
    <section className="px-5 pb-20 sm:px-8 sm:pb-28">
      <div className="mx-auto max-w-[1240px]">
        <Feature id="github" label="GitHub-style activity graph">
          <Up>
            <div className="rounded-xl border p-5 sm:p-8" style={{ borderColor: KR.line, background: KR.panel }}>
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                <div>
                  <Comment>git log --since=&quot;1 year ago&quot;</Comment>
                  <p className="mt-3 text-[22px] font-semibold tracking-[-0.02em] sm:text-[26px]">
                    <span className="text-[#3FB950]">1,847</span> contributions in the last year
                  </p>
                </div>
                <p className={`${MONO} text-[12px]`} style={{ color: KR.mute }}>
                  longest streak · <span className="text-[#E6EDF3]">42 days</span>
                </p>
              </div>
              <div className="mt-6 overflow-x-auto pb-1 [scrollbar-width:none]">
                <div className="min-w-[680px]">
                  <div className={`${MONO} mb-2 grid text-[10px]`} style={{ gridTemplateColumns: `repeat(12, 1fr)`, color: KR.mute }}>
                    {MONTHS.map((m) => (
                      <span key={m}>{m}</span>
                    ))}
                  </div>
                  <div className="grid gap-[3px]" style={{ gridTemplateColumns: `repeat(${WEEKS}, 1fr)` }}>
                    {Array.from({ length: WEEKS }, (_, w) => (
                      <motion.div key={w} className="grid gap-[3px]" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: w * 0.015, duration: 0.3 }}>
                        {Array.from({ length: 7 }, (_, d) => (
                          <span key={d} title={`${level(w, d) * 3} contributions`} className="aspect-square rounded-[2px]" style={{ background: SHADES[level(w, d)] }} />
                        ))}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
              <div className={`${MONO} mt-4 flex items-center justify-end gap-1.5 text-[11px]`} style={{ color: KR.mute }}>
                less
                {SHADES.map((s) => (
                  <span key={s} className="size-2.5 rounded-[2px]" style={{ background: s }} />
                ))}
                more
              </div>
            </div>
          </Up>
        </Feature>
      </div>
    </section>
  );
}

/* ───────────────────────── Stack strip ───────────────────────── */

const TECH: [string, string][] = [
  ["React", KR.blue],
  ["Next.js", KR.text],
  ["TypeScript", KR.blue],
  ["Node.js", KR.green],
  ["PostgreSQL", KR.blue],
  ["Redis", KR.orange],
  ["AWS", KR.yellow],
  ["Docker", KR.blue],
  ["React Native", KR.purple],
  ["Tailwind", KR.blue],
  ["Python", KR.yellow],
  ["GraphQL", KR.purple],
];

function StackStrip() {
  const row = (
    <div className="flex shrink-0 items-center gap-3 pr-3">
      {TECH.map(([t, c]) => (
        <span key={t} className={`${MONO} flex items-center gap-2 rounded-lg border px-4 py-2.5 text-[14px]`} style={{ borderColor: KR.line, background: KR.panel }}>
          <span className="size-2 rounded-full" style={{ background: c }} />
          {t}
        </span>
      ))}
    </div>
  );
  return (
    <section aria-label="Tech stack" className="pb-20 sm:pb-28">
      <Up className="mx-auto mb-6 max-w-[1240px] px-5 sm:px-8">
        <Comment>stack i use every day</Comment>
      </Up>
      <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
        <div className="marquee [animation-duration:45s]">
          {row}
          {row}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Testimonials ───────────────────────── */

function Words() {
  return (
    <section className="px-5 pb-20 sm:px-8 sm:pb-28">
      <div className="mx-auto grid max-w-[1240px] gap-4 md:grid-cols-2">
        {TESTIMONIALS.map((t, i) => (
          <Up key={t.name} delay={i * 0.1}>
            <figure className="h-full rounded-xl border p-7 sm:p-9" style={{ borderColor: KR.line, background: KR.panel }}>
              <p className={`${MONO} text-[13px]`} style={{ color: KR.green }}>
                {"/**"}
              </p>
              <blockquote className="mt-2 border-l-2 pl-5 text-[18px] leading-relaxed sm:text-[20px]" style={{ borderColor: KR.line }}>
                {t.text}
              </blockquote>
              <p className={`${MONO} mt-2 text-[13px]`} style={{ color: KR.green }}>
                {" */"}
              </p>
              <figcaption className="mt-5 flex items-center gap-3">
                <span className={`${MONO} grid size-10 place-items-center rounded-lg text-[14px] font-semibold text-[#0B0F14]`} style={{ background: i ? KR.blue : KR.green }}>
                  {t.name[0]}
                </span>
                <span>
                  <span className="block font-medium">{t.name}</span>
                  <span className={`${MONO} block text-[12px]`} style={{ color: KR.mute }}>
                    @{t.role}
                  </span>
                </span>
              </figcaption>
            </figure>
          </Up>
        ))}
      </div>
    </section>
  );
}

/* ───────────────────────── CTA ───────────────────────── */

function Cta() {
  const { hire } = useActions();
  return (
    <section className="px-5 pb-20 sm:px-8 sm:pb-28">
      <Up className="mx-auto max-w-[1240px]">
        <div className="relative overflow-hidden rounded-2xl border p-8 sm:p-14" style={{ borderColor: `${KR.green}44`, background: `radial-gradient(circle at 80% 0%, ${KR.green}22, transparent 55%), ${KR.panel}` }}>
          <p className={`${MONO} text-[14px]`} style={{ color: KR.mute }}>
            <span style={{ color: KR.green }}>$</span> ./start-project.sh
          </p>
          <h2 className="mt-5 text-[clamp(2.4rem,6vw,5rem)] font-semibold leading-[1] tracking-[-0.05em]">
            <Typed text="Have an idea? Let's ship it." speed={40} />
          </h2>
          <p className="mt-5 max-w-[32rem] text-[17px]" style={{ color: KR.mute }}>
            Freelance projects, full-time roles or just a chat about tech. I reply within 24 hours.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Btn onClick={() => hire()}>Message on WhatsApp</Btn>
            <Btn href={`${BASE}/contact`} variant="ghost">
              Book a 15-min call →
            </Btn>
          </div>
        </div>
      </Up>
    </section>
  );
}
