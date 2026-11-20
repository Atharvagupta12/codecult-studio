"use client";

import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Feature } from "../shared/Feature";
import { CATS, EMAIL, PROCESS, PROJECTS, RS, SERVICES, TESTIMONIALS, TOOLS, type Cat, type Project } from "./data";
import { EASE, HAND, Label, SERIF, ScribbleArrow, ScribbleUnderline, Sparkle, Up, useActions } from "./shared";

const H2 = "text-[clamp(2.4rem,5.4vw,4.8rem)] font-semibold leading-[0.98] tracking-[-0.05em]";

/* ───────────────────────── Work ───────────────────────── */

export function Work() {
  const [cat, setCat] = useState<"All" | Cat>("All");
  const [open, setOpen] = useState<Project | null>(null);
  const [hover, setHover] = useState(false);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 350, damping: 30 });
  const y = useSpring(my, { stiffness: 350, damping: 30 });
  const list = PROJECTS.filter((p) => cat === "All" || p.cats.includes(cat));

  return (
    <section id="work" className="scroll-mt-20 px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-[1280px]">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <Up>
            <Label>Selected work · 2023 — 2026</Label>
            <h2 className={`${H2} mt-5`}>
              Brands I&apos;ve helped{" "}
              <span className="relative inline-block">
                <span className={`${SERIF} italic tracking-[-0.02em]`} style={{ color: RS.violet }}>
                  glow up.
                </span>
                <ScribbleUnderline className="-bottom-2 left-0 h-4 w-full" />
              </span>
            </h2>
          </Up>
          <Up delay={0.1}>
            <Feature id="filters" label="Project filters" inline>
              <div role="tablist" aria-label="Filter projects" className="flex flex-wrap gap-2">
                {CATS.map((c) => {
                  const on = c === cat;
                  const n = c === "All" ? PROJECTS.length : PROJECTS.filter((p) => p.cats.includes(c)).length;
                  return (
                    <button key={c} role="tab" type="button" aria-selected={on} onClick={() => setCat(c)} className={`relative h-11 rounded-full px-4 text-[15px] transition-colors ${on ? "text-white" : "border border-[#161616]/15 hover:border-[#161616]/40"}`}>
                      {on && <motion.span layoutId="rs-cat" className="absolute inset-0 rounded-full bg-[#161616]" transition={{ type: "spring", stiffness: 420, damping: 34 }} />}
                      <span className="relative">
                        {c} <sup className="text-[10px] opacity-60">{n}</sup>
                      </span>
                    </button>
                  );
                })}
              </div>
            </Feature>
          </Up>
        </div>

        <Feature id="work" label="Project gallery → click for case studies" className="mt-12">
          <div
            className="grid gap-x-6 gap-y-12 md:grid-cols-2"
            onPointerMove={(e) => {
              mx.set(e.clientX);
              my.set(e.clientY);
            }}
          >
            <AnimatePresence mode="popLayout">
              {list.map((p, i) => (
                <motion.article
                  key={p.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.6, ease: EASE, delay: (i % 2) * 0.06 }}
                  className={i % 2 === 1 && cat === "All" ? "md:translate-y-20" : ""}
                >
                  <button
                    type="button"
                    onClick={() => setOpen(p)}
                    onPointerEnter={() => setHover(true)}
                    onPointerLeave={() => setHover(false)}
                    className="group block w-full text-left md:cursor-none"
                    aria-label={`Open ${p.title} case study`}
                  >
                    <div className="overflow-hidden rounded-[28px] p-3 transition-transform duration-500 group-hover:-rotate-[0.6deg] sm:p-4" style={{ background: p.tint }}>
                      <div className={`relative overflow-hidden rounded-[20px] ${p.span === "tall" ? "aspect-[4/4.6]" : "aspect-[4/3]"}`}>
                        <Image src={p.cover} alt={p.title} fill sizes="(min-width: 768px) 46vw, 92vw" className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.06]" />
                        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[12px] font-medium backdrop-blur">{p.year}</span>
                      </div>
                    </div>
                    <div className="mt-5 flex items-start justify-between gap-4 px-1">
                      <div>
                        <h3 className="text-[26px] font-semibold tracking-[-0.03em] transition-colors group-hover:text-[#6C47FF]">{p.title}</h3>
                        <p className="mt-1 text-[15px]" style={{ color: RS.mute }}>
                          {p.line}
                        </p>
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {p.cats.map((c) => (
                            <span key={c} className="rounded-full border px-2.5 py-0.5 text-[12px]" style={{ borderColor: RS.line }}>
                              {c}
                            </span>
                          ))}
                          <span className="rounded-full px-2.5 py-0.5 text-[12px] font-medium" style={{ background: RS.lilac, color: RS.violet }}>
                            ↗ {p.result}
                          </span>
                        </div>
                      </div>
                      <span className="mt-1 grid size-11 shrink-0 place-items-center rounded-full border text-[18px] transition-all duration-300 group-hover:rotate-45 group-hover:border-[#6C47FF] group-hover:bg-[#6C47FF] group-hover:text-white md:hidden" style={{ borderColor: RS.line }}>
                        ↗
                      </span>
                    </div>
                  </button>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        </Feature>
      </div>

      {/* Cursor label (desktop) */}
      <motion.div aria-hidden className="pointer-events-none fixed left-0 top-0 z-40 hidden md:block" style={{ x, y }}>
        <motion.span
          className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-[#6C47FF] px-5 py-3 text-[14px] font-medium text-white shadow-[0_14px_30px_-10px_rgba(108,71,255,0.8)]"
          animate={{ scale: hover && !open ? 1 : 0, opacity: hover && !open ? 1 : 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 28 }}
        >
          View case study ↗
        </motion.span>
      </motion.div>

      <CaseStudy project={open} onClose={() => setOpen(null)} onNext={(p) => setOpen(p)} />
    </section>
  );
}

/* ───────────────────────── Case study overlay ───────────────────────── */

function CaseStudy({ project, onClose, onNext }: { project: Project | null; onClose: () => void; onNext: (p: Project) => void }) {
  const [copied, setCopied] = useState<string | null>(null);
  useEffect(() => {
    if (!project) return;
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", esc);
      document.documentElement.style.overflow = "";
    };
  }, [project, onClose]);

  const copy = (hex: string) => {
    navigator.clipboard?.writeText(hex).catch(() => {});
    setCopied(hex);
    setTimeout(() => setCopied(null), 1400);
  };

  const idx = project ? PROJECTS.findIndex((p) => p.id === project.id) : 0;
  const next = PROJECTS[(idx + 1) % PROJECTS.length];

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key="case"
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} case study`}
          initial={{ clipPath: "inset(100% 0 0 0 round 32px)" }}
          animate={{ clipPath: "inset(0% 0 0 0 round 0px)" }}
          exit={{ clipPath: "inset(100% 0 0 0 round 32px)" }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[71] overflow-y-auto"
          style={{ background: RS.paper }}
          data-lenis-prevent
        >
          <div className="sticky top-0 z-10 flex items-center justify-between px-5 py-4 backdrop-blur-md sm:px-8" style={{ background: "rgba(250,247,242,0.8)" }}>
            <span className="text-[14px]" style={{ color: RS.mute }}>
              Case study · {String(idx + 1).padStart(2, "0")} / {String(PROJECTS.length).padStart(2, "0")}
            </span>
            <button type="button" onClick={onClose} className="flex h-11 items-center gap-2 rounded-full bg-[#161616] px-5 text-[14px] font-medium text-white">
              Close ✕
            </button>
          </div>

          <motion.div key={project.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE, delay: 0.25 }} className="mx-auto max-w-[1180px] px-5 pb-32 pt-8 sm:px-8">
            <p className="text-[15px]" style={{ color: RS.mute }}>
              {project.client} · {project.year}
            </p>
            <h2 className={`${SERIF} mt-3 text-[clamp(3.4rem,10vw,8.5rem)] italic leading-[0.9] tracking-[-0.03em]`}>{project.title}</h2>
            <p className="mt-5 max-w-[40rem] text-[20px] leading-relaxed sm:text-[24px]">{project.line}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {project.cats.map((c) => (
                <span key={c} className="rounded-full border px-3 py-1 text-[13px]" style={{ borderColor: RS.line }}>
                  {c}
                </span>
              ))}
            </div>

            <div className="mt-10 overflow-hidden rounded-[32px] p-3 sm:p-5" style={{ background: project.tint }}>
              <div className="relative aspect-[16/10] overflow-hidden rounded-[22px]">
                <Image src={project.images[0]} alt={project.title} fill sizes="(min-width: 1180px) 1140px, 100vw" className="object-cover" />
              </div>
            </div>

            <div className="mt-14 grid gap-10 md:grid-cols-2">
              <div>
                <Label>The challenge</Label>
                <p className="mt-4 text-[19px] leading-relaxed">{project.challenge}</p>
              </div>
              <div>
                <Label>What I did</Label>
                <p className="mt-4 text-[19px] leading-relaxed">{project.solution}</p>
              </div>
            </div>

            <div className="mt-14 grid gap-3 sm:grid-cols-3">
              {project.outcomes.map(([k, v]) => (
                <div key={v} className="rounded-[24px] bg-white p-6 shadow-[0_20px_50px_-35px_rgba(22,22,22,0.5)]">
                  <p className={`${SERIF} text-[52px] leading-none`} style={{ color: RS.violet }}>
                    {k}
                  </p>
                  <p className="mt-2 text-[15px]" style={{ color: RS.mute }}>
                    {v}
                  </p>
                </div>
              ))}
            </div>

            {/* Palette */}
            <div className="mt-14">
              <Label>Colour palette · tap to copy</Label>
              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {project.palette.map((hex) => (
                  <button key={hex} type="button" onClick={() => copy(hex)} className="group overflow-hidden rounded-[22px] bg-white text-left shadow-[0_14px_40px_-30px_rgba(22,22,22,0.6)] transition-transform hover:-translate-y-1">
                    <span className="block h-28 border-b" style={{ background: hex, borderColor: RS.line }} />
                    <span className="flex items-center justify-between px-4 py-3 font-mono text-[13px] uppercase">
                      {hex}
                      <span className="text-[11px] opacity-50 group-hover:opacity-100">{copied === hex ? "Copied ✓" : "Copy"}</span>
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {project.images[1] && (
              <div className="mt-14 overflow-hidden rounded-[32px]">
                <div className="relative aspect-[16/10]">
                  <Image src={project.images[1]} alt={`${project.title} detail`} fill sizes="(min-width: 1180px) 1140px, 100vw" className="object-cover" />
                </div>
              </div>
            )}

            <button type="button" onClick={() => onNext(next)} className="group mt-20 flex w-full items-end justify-between gap-6 border-t pt-8 text-left" style={{ borderColor: RS.line }}>
              <span>
                <span className="block text-[14px]" style={{ color: RS.mute }}>
                  Next project
                </span>
                <span className={`${SERIF} mt-2 block text-[clamp(2.6rem,7vw,5.6rem)] italic leading-none transition-colors group-hover:text-[#6C47FF]`}>{next.title}</span>
              </span>
              <span className="grid size-16 shrink-0 place-items-center rounded-full bg-[#161616] text-[24px] text-white transition-transform duration-500 group-hover:rotate-[-45deg] group-hover:bg-[#6C47FF]">→</span>
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ───────────────────────── About ───────────────────────── */

export function About() {
  return (
    <section id="about" className="scroll-mt-20 px-5 pb-20 pt-10 sm:px-8 sm:pb-28 sm:pt-24">
      <div className="mx-auto grid max-w-[1280px] items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <Up className="relative mx-auto w-full max-w-[480px]">
          <div className="relative aspect-[4/5] -rotate-2 overflow-hidden rounded-[32px] shadow-[0_40px_80px_-40px_rgba(22,22,22,0.5)]">
            <Image src="/images/riya-sharma/desk.jpg" alt="Riya's design studio" fill sizes="(min-width: 1024px) 480px, 90vw" className="object-cover" />
          </div>
          <div className="absolute -bottom-8 -right-4 w-[46%] rotate-3 overflow-hidden rounded-[24px] border-[6px] border-white shadow-xl sm:-right-10">
            <div className="relative aspect-square">
              <Image src="/images/riya-sharma/riya.jpg" alt="" fill sizes="220px" className="object-cover object-[58%_25%]" />
            </div>
          </div>
          <span className={`${HAND} absolute -left-3 -top-6 -rotate-6 rounded-full bg-[#FFE9A8] px-4 py-1.5 text-[22px] font-bold shadow-md`}>my happy place ☕</span>
        </Up>

        <div>
          <Up>
            <Label>About me</Label>
            <h2 className={`${H2} mt-5`}>
              Small brands,{" "}
              <span className={`${SERIF} italic tracking-[-0.02em]`} style={{ color: RS.violet }}>
                big personality.
              </span>
            </h2>
          </Up>
          <Up delay={0.1}>
            <p className="mt-7 text-[18px] leading-[1.7]" style={{ color: RS.mute }}>
              I started designing logos for friends&apos; cafés in college. Six years and 40+ brands later, I still get the same thrill when a
              customer picks a product{" "}
              <span className="relative inline-block font-medium text-[#161616]">
                just because it looked good
                <ScribbleUnderline className="-bottom-1.5 left-0 h-3 w-full" color="#FFC93C" />
              </span>
              . I work with founders who care about details: cafés, skincare brands, startups and everything in between.
            </p>
          </Up>
          <Up delay={0.15} className="mt-8">
            <p className="text-[13px] font-medium uppercase tracking-[0.16em]" style={{ color: RS.mute }}>
              Tools I love
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {TOOLS.map((t) => (
                <span key={t} className="rounded-full bg-white px-4 py-2 text-[14px] shadow-[0_6px_20px_-14px_rgba(22,22,22,0.5)]">
                  {t}
                </span>
              ))}
            </div>
          </Up>
          <Up delay={0.2} className="mt-8 grid grid-cols-3 gap-2 sm:gap-3">
            {[
              ["☕", "3 cups of chai a day"],
              ["🎧", "Lo-fi while designing"],
              ["📍", "Indore → everywhere"],
            ].map(([e, t]) => (
              <div key={t} className="rounded-[20px] p-3 text-[13px] font-medium leading-snug sm:p-4 sm:text-[14px]" style={{ background: RS.card }}>
                <span className="text-[22px]">{e}</span>
                <p className="mt-1">{t}</p>
              </div>
            ))}
          </Up>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Services ───────────────────────── */

export function Services() {
  const { contact } = useActions();
  return (
    <section id="services" className="scroll-mt-20 px-5 pb-20 sm:px-8 sm:pb-28">
      <div className="mx-auto max-w-[1280px]">
        <Up className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <Label>Services</Label>
            <h2 className={`${H2} mt-5`}>
              How I can{" "}
              <span className={`${SERIF} italic tracking-[-0.02em]`} style={{ color: RS.violet }}>
                help.
              </span>
            </h2>
          </div>
          <p className="max-w-[24rem] text-[16px] leading-relaxed" style={{ color: RS.mute }}>
            Clear packages, honest prices. Every project includes two rounds of changes and all source files.
          </p>
        </Up>
        <Feature id="services" label="Services with starting prices" className="mt-12">
          <div className="-mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4">
            {SERVICES.map((s, i) => (
              <Up key={s.name} delay={i * 0.07} className="w-[78%] shrink-0 snap-center sm:w-auto">
                <button type="button" onClick={() => contact("", s.name)} className="group flex h-full min-h-[270px] w-full flex-col sm:min-h-[300px] rounded-[28px] p-6 text-left transition-transform duration-500 hover:-translate-y-2 sm:p-7" style={{ background: s.tint }}>
                  <span className="flex items-center justify-between">
                    <span className={`${SERIF} text-[34px] italic leading-none`}>{s.n}</span>
                    <span className="grid size-10 place-items-center rounded-full bg-white/70 transition-all duration-300 group-hover:rotate-45 group-hover:bg-[#161616] group-hover:text-white">↗</span>
                  </span>
                  <span className="mt-auto block pt-14 text-[24px] font-semibold tracking-[-0.03em]">{s.name}</span>
                  <span className="mt-2 block text-[15px] leading-relaxed text-[#161616]/70">{s.desc}</span>
                  <span className="mt-5 block border-t border-[#161616]/10 pt-4 text-[15px] font-semibold">{s.price}</span>
                </button>
              </Up>
            ))}
          </div>
        </Feature>
      </div>
    </section>
  );
}

/* ───────────────────────── Process ───────────────────────── */

export function Process() {
  return (
    <section className="px-5 pb-20 sm:px-8 sm:pb-28">
      <div className="mx-auto max-w-[1280px] rounded-[36px] bg-[#161616] px-6 py-14 text-white sm:rounded-[48px] sm:px-12 sm:py-20">
        <Up className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <p className="flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.16em] text-white/50">
              <Sparkle className="size-3.5 text-[#FFC93C]" /> How we&apos;ll work
            </p>
            <h2 className={`${H2} mt-5`}>
              Simple,{" "}
              <span className={`${SERIF} italic tracking-[-0.02em] text-[#B9A6FF]`}>stress-free</span> process.
            </h2>
          </div>
          <p className="max-w-[22rem] text-[16px] text-white/60">Most identity projects take 3–4 weeks. You&apos;ll always know what&apos;s happening next.</p>
        </Up>
        <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-9 lg:mt-14 lg:grid-cols-4 lg:gap-6">
          {PROCESS.map((p, i) => (
            <Up key={p.n} delay={i * 0.1} className="relative">
              <span className={`${SERIF} block text-[56px] italic leading-none text-[#B9A6FF] sm:text-[80px]`}>{p.n}</span>
              {i < PROCESS.length - 1 && <ScribbleArrow className="absolute right-2 top-6 hidden h-10 w-14 lg:block" color="rgba(255,255,255,0.4)" delay={0.5 + i * 0.2} />}
              <h3 className="mt-3 text-[20px] font-semibold tracking-[-0.03em] sm:mt-4 sm:text-[24px]">{p.name}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-white/60 sm:text-[15px]">{p.text}</p>
            </Up>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Testimonials ───────────────────────── */

export function Testimonials() {
  return (
    <section className="px-5 pb-20 sm:px-8 sm:pb-28">
      <div className="mx-auto max-w-[1280px]">
        <Up className="text-center">
          <Label className="justify-center">Kind words</Label>
          <h2 className={`${H2} mt-5`}>
            Clients say it{" "}
            <span className={`${SERIF} italic tracking-[-0.02em]`} style={{ color: RS.violet }}>
              best.
            </span>
          </h2>
        </Up>
        <Feature id="testimonials" label="Client testimonials" className="mt-14">
          <div className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 pt-2 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0">
            {TESTIMONIALS.map((t, i) => (
              <Up key={t.name} delay={i * 0.1} className="w-[84%] shrink-0 snap-center sm:w-auto">
                <figure className={`flex h-full flex-col rounded-[28px] p-7 transition-transform duration-500 hover:rotate-0 ${i === 0 ? "sm:-rotate-2" : i === 2 ? "sm:rotate-2" : "sm:translate-y-6"}`} style={{ background: t.tint }}>
                  <span className={`${SERIF} text-[72px] leading-[0.6]`} style={{ color: RS.violet }}>
                    &ldquo;
                  </span>
                  <blockquote className="mt-4 flex-1 text-[18px] leading-relaxed">{t.text}</blockquote>
                  <figcaption className="mt-6 flex items-center gap-3">
                    <span className="grid size-11 place-items-center rounded-full bg-[#161616] text-[16px] font-semibold text-white">{t.name[0]}</span>
                    <span>
                      <span className="block font-semibold">{t.name}</span>
                      <span className="block text-[13px] text-[#161616]/60">{t.role}</span>
                    </span>
                  </figcaption>
                </figure>
              </Up>
            ))}
          </div>
        </Feature>
      </div>
    </section>
  );
}

/* ───────────────────────── Contact ───────────────────────── */

const NEEDS = ["Brand identity", "Packaging", "UI / Website", "Social media kit", "Something else"];
const BUDGETS = ["Under ₹15k", "₹15k – ₹30k", "₹30k – ₹60k", "₹60k+"];

function Confetti({ burst }: { burst: number }) {
  return (
    <AnimatePresence>
      {burst > 0 && (
        <span key={burst} aria-hidden className="pointer-events-none absolute left-1/2 top-1/2">
          {Array.from({ length: 14 }, (_, i) => {
            const a = (i / 14) * Math.PI * 2;
            const r = 50 + (i % 3) * 18;
            return (
              <motion.span
                key={i}
                className="absolute size-2 rounded-[2px]"
                style={{ background: [RS.violet, "#FFC93C", "#FF8A65", "#4ADE80"][i % 4] }}
                initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
                animate={{ x: Math.cos(a) * r, y: Math.sin(a) * r, opacity: 0, rotate: 180 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
              />
            );
          })}
        </span>
      )}
    </AnimatePresence>
  );
}

export function Contact() {
  const { contact } = useActions();
  const [name, setName] = useState("");
  const [need, setNeed] = useState(NEEDS[0]);
  const [budget, setBudget] = useState(BUDGETS[1]);
  const [burst, setBurst] = useState(0);
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard?.writeText(EMAIL).catch(() => {});
    setBurst((b) => b + 1);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  const chip = (on: boolean) => `h-11 rounded-full px-4 text-[14px] transition-colors ${on ? "bg-[#6C47FF] text-white" : "border border-[#161616]/15 bg-white hover:border-[#161616]/40"}`;

  return (
    <section id="contact" className="scroll-mt-20 px-3 pb-6 sm:px-5">
      <div className="relative mx-auto max-w-[1360px] overflow-hidden rounded-[36px] px-6 py-16 sm:rounded-[48px] sm:px-12 sm:py-24" style={{ background: RS.lilac }}>
        <Sparkle className="absolute right-10 top-10 size-10 animate-[spin_10s_linear_infinite] text-[#6C47FF] motion-reduce:animate-none" />
        <div className="relative grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <Up>
            <Label>Contact</Label>
            <h2 className="mt-5 text-[clamp(2.8rem,6.4vw,6rem)] font-semibold leading-[0.95] tracking-[-0.055em]">
              Let&apos;s make something people{" "}
              <span className={`${SERIF} italic tracking-[-0.02em]`} style={{ color: RS.violet }}>
                remember.
              </span>
            </h2>
            <p className="mt-6 max-w-[26rem] text-[17px] leading-relaxed" style={{ color: RS.mute }}>
              Tell me a little about your project. I reply to every message within a day.
            </p>
            <Feature id="copy-email" label="Copy email in one tap" inline className="mt-8">
              <button type="button" onClick={copyEmail} className="relative flex items-center gap-3 rounded-full bg-white px-5 py-3 text-[16px] font-medium shadow-[0_10px_30px_-16px_rgba(22,22,22,0.5)] transition-transform hover:-translate-y-0.5">
                ✉ {EMAIL}
                <span className="rounded-full bg-[#161616] px-3 py-1 text-[12px] text-white">{copied ? "Copied! 🎉" : "Copy"}</span>
                <Confetti burst={burst} />
              </button>
            </Feature>
          </Up>

          <Up delay={0.1}>
            <Feature id="contact" label="Contact form that sends to WhatsApp">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  contact(name.trim(), need, budget);
                }}
                className="rounded-[28px] bg-[#FAF7F2] p-6 shadow-[0_40px_80px_-40px_rgba(22,22,22,0.4)] sm:p-8"
              >
                <label className="block">
                  <span className="text-[14px] font-medium">Your name</span>
                  <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Ankit Verma" className="mt-2 h-13 w-full border-b-2 bg-transparent py-3 text-[18px] outline-none placeholder:text-[#161616]/30 focus:border-[#6C47FF]" style={{ borderColor: RS.line }} />
                </label>
                <p className="mt-7 text-[14px] font-medium">I need help with</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {NEEDS.map((n) => (
                    <button key={n} type="button" onClick={() => setNeed(n)} className={chip(n === need)}>
                      {n}
                    </button>
                  ))}
                </div>
                <p className="mt-7 text-[14px] font-medium">Budget</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {BUDGETS.map((b) => (
                    <button key={b} type="button" onClick={() => setBudget(b)} className={chip(b === budget)}>
                      {b}
                    </button>
                  ))}
                </div>
                <button type="submit" className="mt-9 flex h-14 w-full items-center justify-center gap-2 rounded-full bg-[#161616] text-[16px] font-medium text-white transition-colors hover:bg-[#6C47FF]">
                  Send on WhatsApp ↗
                </button>
                <p className={`${HAND} mt-4 text-center text-[20px]`} style={{ color: RS.violet }}>
                  I don&apos;t bite, promise :)
                </p>
              </form>
            </Feature>
          </Up>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Footer ───────────────────────── */

export function Footer() {
  return (
    <footer className="px-5 pb-28 pt-10 sm:px-8 sm:pb-32">
      <div className="mx-auto max-w-[1280px]">
        <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
          <p className="select-none text-[min(30vw,300px)] font-bold leading-[0.8] tracking-[-0.07em]">
            riya<span style={{ color: RS.violet }}>.</span>
          </p>
          <div className="flex gap-10 pb-4 text-[15px]">
            <div className="flex flex-col gap-2" style={{ color: RS.mute }}>
              <a href="#work" className="hover:text-[#161616]">
                Work
              </a>
              <a href="#about" className="hover:text-[#161616]">
                About
              </a>
              <a href="#contact" className="hover:text-[#161616]">
                Contact
              </a>
            </div>
            <div className="flex flex-col gap-2" style={{ color: RS.mute }}>
              <span>Behance ↗</span>
              <span>Dribbble ↗</span>
              <span>Instagram ↗</span>
            </div>
          </div>
        </div>
        <div className="mt-8 flex flex-col justify-between gap-2 border-t pt-5 text-[13px] sm:flex-row" style={{ borderColor: RS.line, color: RS.mute }}>
          <span>© 2026 Riya Sharma · Brand & UI designer, Indore</span>
          <Link href="/" className="hover:text-[#161616]">
            Website by CodeCult Studio
          </Link>
        </div>
      </div>
    </footer>
  );
}
