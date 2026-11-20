"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { Feature } from "../shared/Feature";
import { BASE, KR, PROJECTS, type Project } from "./data";
import { ProjectMock } from "./Mock";
import { Btn, Comment, EASE, MONO, StackTag, Up, useActions } from "./shared";

/** Very small syntax colouring for the code sample */
function colour(line: string) {
  const parts = line.split(/(\/\/.*$|#.*$|'[^']*'|"[^"]*"|`[^`]*`|\b(?:export|async|function|const|await|return|if|def|for|in|import|from)\b|\b\d[\d_]*\b)/g);
  return parts.map((p, i) => {
    if (!p) return null;
    let c: string | undefined;
    if (/^(\/\/|#)/.test(p)) c = KR.mute;
    else if (/^['"`]/.test(p)) c = "#A5D6FF";
    else if (/^(export|async|function|const|await|return|if|def|for|in|import|from)$/.test(p)) c = "#FF7B72";
    else if (/^\d/.test(p)) c = "#79C0FF";
    return (
      <span key={i} style={{ color: c }}>
        {p}
      </span>
    );
  });
}

export function KabirCaseStudy({ project: p }: { project: Project }) {
  const { external, hire } = useActions();
  const idx = PROJECTS.findIndex((x) => x.slug === p.slug);
  const next = PROJECTS[(idx + 1) % PROJECTS.length];

  return (
    <main className="px-5 pb-20 pt-28 sm:px-8 sm:pb-28 sm:pt-32">
      <article className="mx-auto max-w-[1100px]">
        <Link href={`${BASE}/projects`} className={`${MONO} text-[13px] hover:text-[#3FB950]`} style={{ color: KR.mute }}>
          ← cd ../projects
        </Link>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE }}>
          <p className={`${MONO} mt-8 text-[13px]`} style={{ color: p.accent }}>
            case study · {String(idx + 1).padStart(2, "0")} / {String(PROJECTS.length).padStart(2, "0")}
          </p>
          <h1 className="mt-3 text-[clamp(3rem,9vw,7rem)] font-semibold leading-[0.95] tracking-[-0.055em]">{p.name}</h1>
          <p className="mt-4 max-w-[40rem] text-[19px] leading-relaxed sm:text-[22px]" style={{ color: KR.mute }}>
            {p.tagline}
          </p>
        </motion.div>

        <motion.dl initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.8 }} className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-xl border sm:grid-cols-4" style={{ background: KR.line, borderColor: KR.line }}>
          {[
            ["role", p.role],
            ["timeline", p.timeline],
            ["team", p.team],
            ["year", String(p.year)],
          ].map(([k, v]) => (
            <div key={k} className="p-4" style={{ background: KR.bg }}>
              <dt className={`${MONO} text-[12px]`} style={{ color: KR.mute }}>
                {k}
              </dt>
              <dd className="mt-1 text-[15px] font-medium">{v}</dd>
            </div>
          ))}
        </motion.dl>

        <Feature id="case-study" label="Full case-study pages" className="mt-10">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: EASE, delay: 0.35 }} className="rounded-2xl border p-3 sm:p-5" style={{ borderColor: KR.line, background: `radial-gradient(circle at 50% 0%, ${p.accent}22, transparent 60%), ${KR.panel}` }}>
            <ProjectMock kind={p.kind} accent={p.accent} name={p.name} />
          </motion.div>
        </Feature>

        <div className="mt-8 flex flex-wrap items-center gap-2">
          {p.stack.map((s) => (
            <StackTag key={s}>{s}</StackTag>
          ))}
          <button type="button" onClick={() => external(p.openSource ? "GitHub repo" : "live site")} className={`${MONO} ml-auto text-[13px] hover:underline`} style={{ color: p.accent }}>
            {p.openSource ? "view repo" : "visit live site"} ↗
          </button>
        </div>

        {/* Results */}
        <Up className="mt-16">
          <Comment>results</Comment>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {p.metrics.map(([k, v]) => (
              <div key={v} className="rounded-xl border p-6" style={{ borderColor: KR.line, background: KR.panel }}>
                <p className={`${MONO} text-[40px] font-semibold leading-none tracking-[-0.03em]`} style={{ color: p.accent }}>
                  {k}
                </p>
                <p className="mt-2 text-[14px]" style={{ color: KR.mute }}>
                  {v}
                </p>
              </div>
            ))}
          </div>
        </Up>

        <div className="mt-16 grid gap-12 lg:grid-cols-2">
          <Up>
            <Comment>the problem</Comment>
            <p className="mt-4 text-[19px] leading-relaxed">{p.problem}</p>
          </Up>
          <Up delay={0.1}>
            <Comment>what i built</Comment>
            <ol className="mt-4 flex flex-col gap-4">
              {p.approach.map((a, i) => (
                <li key={a} className="flex gap-4 text-[16px] leading-relaxed">
                  <span className={`${MONO} shrink-0 text-[14px]`} style={{ color: p.accent }}>
                    0{i + 1}
                  </span>
                  <span style={{ color: "#C9D1D9" }}>{a}</span>
                </li>
              ))}
            </ol>
          </Up>
        </div>

        {/* Code */}
        <Up className="mt-16">
          <Comment>a peek at the code</Comment>
          <div className="mt-4 overflow-hidden rounded-xl border" style={{ borderColor: KR.line, background: "#0D1117" }}>
            <div className={`${MONO} flex items-center justify-between border-b px-4 py-2.5 text-[12px]`} style={{ borderColor: KR.line, background: "#161B22", color: KR.mute }}>
              <span>{p.code.file}</span>
              <span>{p.stack[0]}</span>
            </div>
            <pre className={`${MONO} overflow-x-auto p-5 text-[13px] leading-[1.8] sm:text-[14px]`} data-lenis-prevent>
              {p.code.lines.map((l, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="flex">
                  <span className="mr-5 w-5 shrink-0 select-none text-right" style={{ color: "rgba(139,148,158,0.5)" }}>
                    {i + 1}
                  </span>
                  <span className="whitespace-pre text-[#E6EDF3]">{colour(l)}</span>
                </motion.div>
              ))}
            </pre>
          </div>
        </Up>

        {/* Architecture */}
        <Up className="mt-16">
          <Comment>architecture</Comment>
          <div className="mt-5 flex flex-col items-stretch gap-2 sm:flex-row sm:items-center">
            {p.architecture.map((node, i) => (
              <div key={node} className="flex flex-col items-center gap-2 sm:flex-1 sm:flex-row">
                <motion.span
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.5, ease: EASE }}
                  className={`${MONO} w-full rounded-lg border px-3 py-3 text-center text-[12px] sm:flex-1`}
                  style={{ borderColor: i === 0 || i === p.architecture.length - 1 ? `${p.accent}66` : KR.line, background: KR.panel }}
                >
                  {node}
                </motion.span>
                {i < p.architecture.length - 1 && (
                  <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.15 + 0.1 }} className={`${MONO} rotate-90 text-[16px] sm:rotate-0`} style={{ color: p.accent }}>
                    →
                  </motion.span>
                )}
              </div>
            ))}
          </div>
        </Up>

        <div className="mt-16 flex flex-wrap gap-3">
          <Btn onClick={() => hire(`Hi Kabir! 👋\nI read your ${p.name} case study and I need something similar.\nCan we talk this week?`)}>Build something like this →</Btn>
        </div>

        <Link href={`${BASE}/projects/${next.slug}`} className="group mt-20 flex items-end justify-between gap-6 border-t pt-8" style={{ borderColor: KR.line }}>
          <span>
            <span className={`${MONO} block text-[13px]`} style={{ color: KR.mute }}>
              next project
            </span>
            <span className="mt-2 block text-[clamp(2.4rem,6vw,4.4rem)] font-semibold leading-none tracking-[-0.05em] transition-colors group-hover:text-[#3FB950]">{next.name}</span>
          </span>
          <span className="grid size-14 shrink-0 place-items-center rounded-lg border text-[22px] transition-all group-hover:border-[#3FB950] group-hover:bg-[#3FB950] group-hover:text-[#0B0F14]" style={{ borderColor: KR.line }}>
            →
          </span>
        </Link>
      </article>
    </main>
  );
}
