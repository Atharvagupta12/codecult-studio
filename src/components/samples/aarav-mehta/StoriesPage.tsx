"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { Feature } from "../shared/Feature";
import { AM, BASE, STORIES, type Story } from "./data";
import { Lightbox } from "./Lightbox";
import { PageHead } from "./Shell";
import { Btn, Caption, Lines, MONO, SERIF, Up, useActions } from "./shared";

/* ───────────────────────── Index ───────────────────────── */

export function AaravStories() {
  return (
    <main>
      <PageHead n="03" kicker="Stories" title="Love stories," italic="told slowly." sub="Every wedding has a story. Here are a few of my favourites, told the way they deserve: chapter by chapter." />
      <section className="px-5 pb-24 sm:px-10 sm:pb-32">
        <Feature id="stories" label="Wedding story pages">
          <div className="mx-auto flex max-w-[1500px] flex-col gap-20 sm:gap-28">
            {STORIES.map((s, i) => (
              <Up key={s.slug}>
                <Link href={`${BASE}/stories/${s.slug}`} data-cursor="Read story" className={`group grid items-center gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:gap-16 ${i % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[4px]">
                    <Image src={s.cover} alt={s.couple} fill sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover transition-transform duration-[2000ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.05]" style={{ objectPosition: s.coverPos ?? "50% 50%" }} />
                  </div>
                  <div>
                    <p className={MONO} style={{ color: AM.gold }}>
                      Story {String(i + 1).padStart(2, "0")} · {s.place}
                    </p>
                    <h2 className={`${SERIF} mt-4 text-[clamp(3rem,6vw,5.6rem)] italic leading-[0.95] transition-colors group-hover:text-[#D9B97A]`}>{s.couple}</h2>
                    <p className="mt-4 text-[19px] leading-relaxed text-[#F2EDE4]/80">{s.title}</p>
                    <p className="mt-4 text-[15px] leading-relaxed" style={{ color: AM.mute }}>
                      {s.intro.slice(0, 140)}…
                    </p>
                    <p className={`${MONO} mt-8 flex items-center gap-3`}>
                      Read the story <span className="transition-transform duration-500 group-hover:translate-x-2">→</span>
                    </p>
                  </div>
                </Link>
              </Up>
            ))}
          </div>
        </Feature>
      </section>
    </main>
  );
}

/* ───────────────────────── Single story ───────────────────────── */

export function AaravStory({ story: s }: { story: Story }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 180]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.1]);
  const { enquire } = useActions();
  const [open, setOpen] = useState<number | null>(null);
  const all = s.chapters.flatMap((c) => c.images.map((src) => ({ src, alt: `${s.couple} · ${c.title}` })));
  const idx = STORIES.findIndex((x) => x.slug === s.slug);
  const next = STORIES[(idx + 1) % STORIES.length];
  const offsets = s.chapters.map((_, i) => s.chapters.slice(0, i).reduce((n, c) => n + c.images.length, 0));

  return (
    <main>
      <section ref={ref} className="relative h-[100svh] min-h-[620px] overflow-hidden">
        <motion.div style={{ y, scale }} className="absolute inset-0">
          <Image src={s.cover} alt={s.couple} fill priority sizes="100vw" className="object-cover" style={{ objectPosition: s.coverPos ?? "50% 50%" }} />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/40" />
        <div className="absolute inset-x-0 bottom-0 px-5 pb-12 sm:px-10 sm:pb-16">
          <div className="mx-auto max-w-[1500px]">
            <Link href={`${BASE}/stories`} className={`${MONO} hover:text-[#D9B97A]`} style={{ color: AM.mute }}>
              ← All stories
            </Link>
            <p className={`${MONO} mt-6`} style={{ color: AM.gold }}>
              {s.place} · {s.date} · {s.guests}
            </p>
            <h1 className={`${SERIF} mt-4 text-[clamp(3.4rem,11vw,11rem)] italic leading-[0.9]`}>
              <Lines now delay={0.2} lines={[s.couple]} />
            </h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 1 }} className="mt-4 text-[clamp(1.1rem,2vw,1.6rem)] text-[#F2EDE4]/85">
              {s.title}
            </motion.p>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-10 sm:py-28">
        <div className="mx-auto max-w-[1100px]">
          <Up>
            <p className={`${SERIF} text-[clamp(1.6rem,3vw,2.6rem)] leading-[1.3]`}>
              <span className={`${SERIF} float-left mr-3 text-[5.2em] leading-[0.8]`} style={{ color: AM.gold }}>
                {s.intro[0]}
              </span>
              {s.intro.slice(1)}
            </p>
          </Up>
        </div>
      </section>

      <Feature id="story-chapters" label="Magazine-style story chapters">
        <div className="flex flex-col gap-24 px-5 pb-24 sm:gap-32 sm:px-10 sm:pb-32">
          {s.chapters.map((c, ci) => (
            <section key={c.title} className="mx-auto w-full max-w-[1500px]">
              <Up className="flex flex-col justify-between gap-4 border-t pt-6 lg:flex-row lg:items-end">
                <div>
                  <p className={MONO} style={{ color: AM.gold }}>
                    Chapter {String(ci + 1).padStart(2, "0")}
                  </p>
                  <h2 className={`${SERIF} mt-3 text-[clamp(2.6rem,5vw,4.6rem)] italic leading-none`}>{c.title}</h2>
                </div>
                <p className="max-w-[28rem] text-[16px] leading-relaxed" style={{ color: AM.mute }}>
                  {c.text}
                </p>
              </Up>
              <div className={`mt-10 grid gap-3 sm:gap-4 ${ci % 2 ? "md:grid-cols-[0.8fr_1.2fr]" : "md:grid-cols-[1.2fr_0.8fr]"}`}>
                {c.images.map((img, k) => {
                  const at = offsets[ci] + k;
                  const hero = k === 0;
                  return (
                    <Up key={img} delay={k * 0.08} className={hero ? "md:row-span-2" : ""}>
                      <button type="button" onClick={() => setOpen(at)} data-cursor="View" className="group relative block h-full w-full overflow-hidden rounded-[3px]" aria-label="View photo">
                        <div className={`relative h-full ${hero ? "aspect-[4/5] md:aspect-auto md:min-h-[720px]" : "aspect-[4/3]"}`}>
                          <Image src={img} alt={`${s.couple} · ${c.title}`} fill sizes="(min-width: 768px) 60vw, 100vw" className="object-cover transition-transform duration-[1600ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.04]" />
                        </div>
                      </button>
                    </Up>
                  );
                })}
              </div>
              {ci === 0 && (
                <Up className="mx-auto mt-24 max-w-[1100px] text-center sm:mt-32">
                  <blockquote className={`${SERIF} text-[clamp(2rem,4.4vw,4.2rem)] italic leading-[1.1]`}>&ldquo;{s.quote[0]}&rdquo;</blockquote>
                  <p className={`${MONO} mt-6`} style={{ color: AM.gold }}>
                    — {s.quote[1]}
                  </p>
                </Up>
              )}
            </section>
          ))}
        </div>
      </Feature>

      <section className="px-5 pb-24 sm:px-10 sm:pb-32">
        <div className="mx-auto grid max-w-[1500px] gap-12 border-t pt-12 lg:grid-cols-[1fr_1fr]" style={{ borderColor: AM.line }}>
          <div>
            <Caption>The team behind the day</Caption>
            <dl className="mt-6 grid grid-cols-2 gap-6">
              {s.credits.map(([k, v]) => (
                <div key={k}>
                  <dt className={MONO} style={{ color: AM.mute }}>
                    {k}
                  </dt>
                  <dd className="mt-1 text-[16px]">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="flex flex-col items-start justify-end gap-4">
            <p className={`${SERIF} text-[32px] italic leading-tight`}>Want a story like this?</p>
            <Btn variant="gold" cursor="Enquire" onClick={() => enquire(`Hi Aarav! 💛\nWe loved ${s.couple}'s story.\nWe're getting married soon and would love to check your availability.`)}>
              Enquire for your wedding →
            </Btn>
          </div>
        </div>

        <Link href={`${BASE}/stories/${next.slug}`} data-cursor="Next story" className="group relative mx-auto mt-24 block max-w-[1500px] overflow-hidden rounded-[4px]">
          <div className="relative aspect-[21/9] min-h-[260px]">
            <Image src={next.cover} alt={next.couple} fill sizes="100vw" className="object-cover transition-transform duration-[2000ms] group-hover:scale-105" style={{ objectPosition: next.coverPos ?? "50% 50%" }} />
            <div className="absolute inset-0 bg-black/50 transition-colors group-hover:bg-black/35" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <p className={MONO} style={{ color: AM.gold }}>
                Next story
              </p>
              <p className={`${SERIF} mt-3 text-[clamp(2.6rem,7vw,6.4rem)] italic leading-none`}>{next.couple}</p>
            </div>
          </div>
        </Link>
      </section>

      <Lightbox photos={all} index={open} onClose={() => setOpen(null)} onIndex={setOpen} />
    </main>
  );
}

