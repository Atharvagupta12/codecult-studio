"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import { Feature } from "../shared/Feature";
import { ACHIEVEMENTS, DESK, JOBS, KR, SKILLS } from "./data";
import { PageHead } from "./ProjectsPage";
import { Btn, Comment, EASE, MONO, StackTag, Up, useActions } from "./shared";

export function KabirExperience() {
  const { resume } = useActions();
  return (
    <main>
      <PageHead cmd="cat experience.md" title="Where I've" accent="worked." sub="From freelancing in college to leading payments engineering at a fintech. Here's the journey, the skills and the receipts." />
      <Timeline />
      <Skills />
      <section className="px-5 pb-20 sm:px-8 sm:pb-28">
        <div className="mx-auto grid max-w-[1240px] gap-6 lg:grid-cols-[1fr_1fr]">
          <Up>
            <Comment>achievements</Comment>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {ACHIEVEMENTS.map(([k, v]) => (
                <li key={k} className="rounded-xl border p-5" style={{ borderColor: KR.line, background: KR.panel }}>
                  <p className="text-[17px] font-semibold">{k}</p>
                  <p className={`${MONO} mt-1 text-[12px]`} style={{ color: KR.mute }}>
                    {v}
                  </p>
                </li>
              ))}
            </ul>
          </Up>
          <Up delay={0.1}>
            <div className="relative h-full min-h-[300px] overflow-hidden rounded-xl border" style={{ borderColor: KR.line }}>
              <Image src={DESK} alt="Kabir's desk setup" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F14] via-[#0B0F14]/40 to-transparent" />
              <div className="absolute inset-x-6 bottom-6">
                <p className="text-[22px] font-semibold tracking-[-0.02em]">Want the full story?</p>
                <p className="mt-1 text-[15px]" style={{ color: KR.mute }}>
                  2-page resume with projects, references and links.
                </p>
                <div className="mt-4">
                  <Btn onClick={resume}>
                    <span className={MONO}>resume.pdf</span> ↓
                  </Btn>
                </div>
              </div>
            </div>
          </Up>
        </div>
      </section>
    </main>
  );
}

function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const h = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  return (
    <section className="px-5 pb-20 sm:px-8 sm:pb-28">
      <div className="mx-auto max-w-[1240px]">
        <Feature id="timeline" label="Animated career timeline">
          <div ref={ref} className="relative pl-8 sm:pl-12">
            <span className="absolute bottom-2 left-[7px] top-2 w-[2px] sm:left-[11px]" style={{ background: KR.line }} />
            <motion.span className="absolute left-[7px] top-2 w-[2px] sm:left-[11px]" style={{ height: h, background: `linear-gradient(${KR.green}, ${KR.blue})` }} />
            <div className="flex flex-col gap-10">
              {JOBS.map((j, i) => (
                <Up key={j.role}>
                  <div className="relative">
                    <span className="absolute -left-8 top-1.5 grid size-4 place-items-center rounded-full border-2 sm:-left-12 sm:size-6" style={{ borderColor: i === 0 ? KR.green : KR.line, background: KR.bg }}>
                      {i === 0 && <span className="size-1.5 animate-pulse rounded-full bg-[#3FB950] sm:size-2" />}
                    </span>
                    <div className="rounded-xl border p-5 sm:p-7" style={{ borderColor: i === 0 ? `${KR.green}55` : KR.line, background: KR.panel }}>
                      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-baseline">
                        <h2 className="text-[22px] font-semibold tracking-[-0.03em] sm:text-[26px]">{j.role}</h2>
                        <span className={`${MONO} text-[13px]`} style={{ color: i === 0 ? KR.green : KR.mute }}>
                          {j.when}
                        </span>
                      </div>
                      <p className="mt-1 text-[15px]" style={{ color: KR.mute }}>
                        {j.org}
                      </p>
                      <ul className="mt-4 flex flex-col gap-2">
                        {j.points.map((pt) => (
                          <li key={pt} className="flex gap-3 text-[15px] leading-relaxed" style={{ color: "#C9D1D9" }}>
                            <span className={MONO} style={{ color: KR.green }}>
                              ›
                            </span>
                            {pt}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {j.stack.map((s) => (
                          <StackTag key={s}>{s}</StackTag>
                        ))}
                      </div>
                    </div>
                  </div>
                </Up>
              ))}
            </div>
          </div>
        </Feature>
      </div>
    </section>
  );
}

function Skills() {
  const colours = [KR.green, KR.blue, KR.purple];
  return (
    <section className="px-5 pb-20 sm:px-8 sm:pb-28">
      <div className="mx-auto max-w-[1240px]">
        <Up>
          <Comment>skills.json</Comment>
          <h2 className="mt-4 text-[clamp(2.2rem,4.6vw,3.8rem)] font-semibold leading-[1.02] tracking-[-0.045em]">
            What I&apos;m <span className="text-[#58A6FF]">good at.</span>
          </h2>
        </Up>
        <Feature id="skills" label="Skill meters" className="mt-10">
          <div className="grid gap-4 md:grid-cols-3">
            {SKILLS.map((g, gi) => (
              <Up key={g.group} delay={gi * 0.08}>
                <div className="h-full rounded-xl border p-6" style={{ borderColor: KR.line, background: KR.panel }}>
                  <p className={`${MONO} text-[13px]`} style={{ color: colours[gi] }}>
                    &quot;{g.group.toLowerCase()}&quot;: [
                  </p>
                  <ul className="mt-4 flex flex-col gap-4">
                    {g.items.map(([name, v], i) => (
                      <li key={name}>
                        <div className="flex justify-between text-[14px]">
                          <span>{name}</span>
                          <span className={MONO} style={{ color: KR.mute }}>
                            {v}%
                          </span>
                        </div>
                        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.07]">
                          <motion.div className="h-full rounded-full" style={{ background: colours[gi] }} initial={{ width: 0 }} whileInView={{ width: `${v}%` }} viewport={{ once: true }} transition={{ duration: 1.2, ease: EASE, delay: 0.2 + i * 0.1 }} />
                        </div>
                      </li>
                    ))}
                  </ul>
                  <p className={`${MONO} mt-4 text-[13px]`} style={{ color: colours[gi] }}>
                    ]
                  </p>
                </div>
              </Up>
            ))}
          </div>
        </Feature>
      </div>
    </section>
  );
}
