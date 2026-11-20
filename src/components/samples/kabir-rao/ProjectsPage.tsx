"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import { Feature } from "../shared/Feature";
import { BASE, KR, PROJECTS, STACK_FILTERS, type Stack } from "./data";
import { ProjectMock } from "./Mock";
import { Comment, EASE, MONO, StackTag, Typed, useActions } from "./shared";

export function PageHead({ cmd, title, accent, sub }: { cmd: string; title: string; accent: string; sub: string }) {
  return (
    <section className="px-5 pb-10 pt-28 sm:px-8 sm:pb-14 sm:pt-36">
      <div className="mx-auto max-w-[1240px]">
        <p className={`${MONO} text-[14px]`} style={{ color: KR.mute }}>
          <span style={{ color: KR.green }}>kabir@dev</span> <span style={{ color: KR.blue }}>~</span> % <Typed text={cmd} speed={45} caret={false} />
        </p>
        <h1 className="mt-6 text-[clamp(2.8rem,7vw,6rem)] font-semibold leading-[0.98] tracking-[-0.05em]">
          <motion.span className="block" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}>
            {title} <span className="bg-gradient-to-r from-[#3FB950] to-[#58A6FF] bg-clip-text text-transparent">{accent}</span>
          </motion.span>
        </h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45, duration: 0.8 }} className="mt-5 max-w-[36rem] text-[17px] leading-relaxed sm:text-[19px]" style={{ color: KR.mute }}>
          {sub}
        </motion.p>
      </div>
    </section>
  );
}

export function KabirProjects() {
  const [stack, setStack] = useState<"All" | Stack>("All");
  const [q, setQ] = useState("");
  const { external } = useActions();
  const list = PROJECTS.filter((p) => (stack === "All" || p.stack.includes(stack)) && `${p.name} ${p.tagline} ${p.stack.join(" ")}`.toLowerCase().includes(q.trim().toLowerCase()));

  return (
    <main>
      <PageHead cmd="ls ~/projects --all" title="Selected" accent="projects." sub="Products I've designed, built and shipped. Click any project for the full case study: the problem, the approach, the code and the results." />
      <section className="px-5 pb-20 sm:px-8 sm:pb-28">
        <div className="mx-auto max-w-[1240px]">
          <Feature id="project-filters" label="Filter by tech stack + search">
            <div className="flex flex-col gap-4 rounded-xl border p-3 sm:flex-row sm:items-center sm:justify-between" style={{ borderColor: KR.line, background: KR.panel }}>
              <div className="-mx-3 flex gap-1.5 overflow-x-auto px-3 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0">
                {STACK_FILTERS.map((s) => {
                  const on = s === stack;
                  return (
                    <button key={s} type="button" onClick={() => setStack(s)} className={`${MONO} relative h-9 shrink-0 rounded-md px-3 text-[13px] transition-colors ${on ? "text-[#0B0F14]" : "text-[#8B949E] hover:text-[#E6EDF3]"}`}>
                      {on && <motion.span layoutId="kr-stack" className="absolute inset-0 rounded-md bg-[#3FB950]" transition={{ type: "spring", stiffness: 420, damping: 36 }} />}
                      <span className="relative">{s}</span>
                    </button>
                  );
                })}
              </div>
              <label className={`${MONO} flex h-10 items-center gap-2 rounded-md border px-3 text-[13px] sm:w-[260px]`} style={{ borderColor: KR.line }}>
                <span style={{ color: KR.green }}>/</span>
                <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="search projects…" className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-white/30" />
              </label>
            </div>
          </Feature>

          <p className={`${MONO} mt-6 text-[13px]`} style={{ color: KR.mute }}>
            {list.length} {list.length === 1 ? "result" : "results"}
          </p>

          <div className="mt-4 grid gap-6 md:grid-cols-2">
            <AnimatePresence mode="popLayout">
              {list.map((p, i) => (
                <motion.article key={p.slug} layout initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.5, ease: EASE, delay: (i % 2) * 0.05 }} className="group flex flex-col rounded-xl border p-3 transition-colors hover:border-[#3FB950]/40 sm:p-4" style={{ borderColor: KR.line, background: KR.panel }}>
                  <Link href={`${BASE}/projects/${p.slug}`} className="block overflow-hidden rounded-[14px]">
                    <div className="transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.02]">
                      <ProjectMock kind={p.kind} accent={p.accent} name={p.name} />
                    </div>
                  </Link>
                  <div className="flex flex-1 flex-col px-1 pb-1 pt-5">
                    <div className="flex items-baseline justify-between gap-3">
                      <h2 className="text-[24px] font-semibold tracking-[-0.03em]">
                        <Link href={`${BASE}/projects/${p.slug}`} className="hover:text-[#3FB950]">
                          {p.name}
                        </Link>
                      </h2>
                      <span className={`${MONO} text-[12px]`} style={{ color: KR.mute }}>
                        {p.year}
                        {p.openSource ? " · OSS" : ""}
                      </span>
                    </div>
                    <p className="mt-1.5 text-[15px] leading-relaxed" style={{ color: KR.mute }}>
                      {p.tagline}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {p.stack.map((s) => (
                        <StackTag key={s} active={s === stack}>
                          {s}
                        </StackTag>
                      ))}
                    </div>
                    <div className={`${MONO} mt-auto flex items-center justify-between gap-3 border-t pt-4 text-[13px]`} style={{ borderColor: KR.line, marginTop: 20 }}>
                      <span style={{ color: p.accent }}>
                        {p.metrics[0][0]} <span style={{ color: KR.mute }}>{p.metrics[0][1]}</span>
                      </span>
                      <span className="flex shrink-0 gap-4">
                        <button type="button" onClick={() => external(p.openSource ? "GitHub repo" : "live site")} className="hover:text-[#3FB950]" style={{ color: KR.mute }}>
                          {p.openSource ? "repo" : "live"} ↗
                        </button>
                        <Link href={`${BASE}/projects/${p.slug}`} className="hover:underline" style={{ color: KR.green }}>
                          case study →
                        </Link>
                      </span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
          {list.length === 0 && (
            <div className={`${MONO} mt-6 rounded-xl border p-10 text-center text-[14px]`} style={{ borderColor: KR.line, color: KR.mute }}>
              <Comment>no projects match &quot;{q}&quot;. try another stack.</Comment>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
