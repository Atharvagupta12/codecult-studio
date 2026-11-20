"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Feature } from "../shared/Feature";
import { AM, FILMS, PHOTO_FILM } from "./data";
import { PageHead } from "./Shell";
import { Btn, Caption, EASE, MONO, SERIF, Up } from "./shared";

const FRAME_MS = 3600;
type Film = (typeof FILMS)[number];

const toSec = (len: string) => {
  const [m, s] = len.split(":").map(Number);
  return m * 60 + s;
};
const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

function Player({ film }: { film: Film }) {
  const [playing, setPlaying] = useState(false);
  const [t, setT] = useState(0);
  const [sound, setSound] = useState(true);
  const total = film.frames.length * FRAME_MS;
  const last = useRef(0);
  const tRef = useRef(0);
  const seek = (v: number) => {
    tRef.current = v;
    setT(v);
  };

  useEffect(() => {
    if (!playing) return;
    let raf = 0;
    last.current = performance.now();
    const tick = (now: number) => {
      const nv = Math.min(total, tRef.current + (now - last.current));
      last.current = now;
      tRef.current = nv;
      setT(nv);
      if (nv >= total) setPlaying(false);
      else raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing, total]);

  const frame = Math.min(film.frames.length - 1, Math.floor(t / FRAME_MS));
  const line = film.lines[Math.min(film.lines.length - 1, Math.floor((t / total) * film.lines.length))];
  const ended = t >= total;
  const started = t > 0;
  const secs = toSec(film.length);

  const toggle = () => {
    if (ended) seek(0);
    setPlaying((p) => (ended ? true : !p));
  };

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-[4px] bg-black" data-cursor={playing ? "Pause" : "Play"}>
      <AnimatePresence initial={false}>
        <motion.div key={`${film.id}-${frame}`} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.2 }}>
          <motion.div className="absolute inset-0" initial={{ scale: 1.15, x: frame % 2 ? "2%" : "-2%" }} animate={{ scale: playing || started ? 1 : 1.15, x: 0 }} transition={{ duration: FRAME_MS / 1000 + 1.2, ease: "linear" }}>
            <Image src={film.frames[frame]} alt={`${film.couple} film frame`} fill loading={frame === 0 ? "eager" : undefined} sizes="(min-width: 1500px) 1400px, 100vw" className="object-cover" />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Letterbox */}
      <motion.span className="absolute inset-x-0 top-0 bg-black" animate={{ height: started ? "9%" : "0%" }} transition={{ duration: 0.8, ease: EASE }} />
      <motion.span className="absolute inset-x-0 bottom-0 bg-black" animate={{ height: started ? "9%" : "0%" }} transition={{ duration: 0.8, ease: EASE }} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />

      {/* Subtitle */}
      <AnimatePresence mode="wait">
        {started && !ended && (
          <motion.p key={line} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }} className={`${SERIF} absolute inset-x-0 bottom-[16%] px-6 text-center text-[clamp(1.1rem,2.6vw,2.2rem)] italic`}>
            {line}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Title card / play */}
      <AnimatePresence>
        {(!started || ended || !playing) && (
          <motion.button type="button" onClick={toggle} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex flex-col items-center justify-center gap-5 bg-black/30" aria-label={ended ? "Replay film" : "Play film"}>
            <span className="grid size-20 place-items-center rounded-full border border-white/40 bg-white/10 text-[26px] backdrop-blur-md transition-transform hover:scale-110 sm:size-24">{ended ? "↺" : "▶"}</span>
            {!started && (
              <span className="text-center">
                <span className={`${SERIF} block text-[clamp(2rem,5vw,4.4rem)] italic leading-none`}>{film.title}</span>
                <span className={`${MONO} mt-3 block`} style={{ color: AM.gold }}>
                  {film.couple} · {film.length}
                </span>
              </span>
            )}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Controls */}
      <div className={`absolute inset-x-0 bottom-0 flex items-center gap-4 px-4 pb-3 sm:px-6 sm:pb-5 ${MONO}`}>
        <button type="button" onClick={toggle} className="w-6 text-[14px] text-white" aria-label={playing ? "Pause" : "Play"}>
          {playing ? "❚❚" : "▶"}
        </button>
        <span className="text-white/80">
          {fmt((t / total) * secs)} / {film.length}
        </span>
        <button
          type="button"
          className="relative h-1 flex-1 rounded-full bg-white/20"
          aria-label="Seek"
          onClick={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            seek(((e.clientX - r.left) / r.width) * total);
          }}
        >
          <span className="absolute inset-y-0 left-0 rounded-full" style={{ width: `${(t / total) * 100}%`, background: AM.gold }} />
        </button>
        <button type="button" onClick={() => setSound((s) => !s)} className="text-white/80" aria-label={sound ? "Mute" : "Unmute"}>
          {sound ? "♪ on" : "♪ off"}
        </button>
      </div>
    </div>
  );
}

export function AaravFilms() {
  const [active, setActive] = useState(0);
  const playerRef = useRef<HTMLDivElement>(null);
  const film = FILMS[active];
  return (
    <main>
      <PageHead n="04" kicker="Films" title="Wedding films" italic="you'll rewatch." sub="Cinematic films that sound and move like your day felt. Every package includes a highlight film; Platinum adds a full feature film." />
      <section className="px-3 pb-20 sm:px-10 sm:pb-28">
        <div ref={playerRef} className="mx-auto max-w-[1500px] scroll-mt-24">
          <Feature id="film-player" label="Cinematic film player">
            <Player key={film.id} film={film} />
          </Feature>
          <div className="mt-5 flex flex-col justify-between gap-2 px-2 sm:flex-row sm:px-0">
            <p className={`${SERIF} text-[28px] italic`}>
              {film.couple} — {film.title}
            </p>
            <p className={MONO} style={{ color: AM.mute }}>
              Shot on Sony FX3 · Graded in-house · Licensed music
            </p>
          </div>
        </div>
      </section>

      <section className="px-5 pb-24 sm:px-10 sm:pb-32">
        <div className="mx-auto max-w-[1500px]">
          <Caption>More films</Caption>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {FILMS.map((f, i) => (
              <Up key={f.id} delay={i * 0.08}>
                <button
                  type="button"
                  onClick={() => {
                    setActive(i);
                    playerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                  data-cursor="Play"
                  className="group block w-full text-left"
                >
                  <div className="relative aspect-video overflow-hidden rounded-[4px]">
                    <Image src={f.frames[0]} alt={f.title} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-[1600ms] group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black/30" />
                    <span className="absolute left-1/2 top-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/40 bg-white/10 backdrop-blur transition-transform group-hover:scale-110">▶</span>
                    <span className={`${MONO} absolute bottom-3 right-3 rounded bg-black/60 px-2 py-1`}>{f.length}</span>
                    {i === active && <span className={`${MONO} absolute left-3 top-3 rounded px-2 py-1 text-black`} style={{ background: AM.gold }}>Now showing</span>}
                  </div>
                  <p className={`${SERIF} mt-4 text-[26px] italic leading-tight`}>{f.title}</p>
                  <p className={`${MONO} mt-1`} style={{ color: AM.mute }}>
                    {f.couple}
                  </p>
                </button>
              </Up>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-24 sm:px-10 sm:pb-32">
        <div className="mx-auto grid max-w-[1500px] items-center gap-10 border-t pt-14 lg:grid-cols-2" style={{ borderColor: AM.line }}>
          <Up className="relative aspect-[4/3] overflow-hidden rounded-[4px]">
            <Image src={PHOTO_FILM} alt="Cinematographer filming with a gimbal" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </Up>
          <Up delay={0.1}>
            <Caption>How we film</Caption>
            <p className={`${SERIF} mt-6 text-[clamp(1.8rem,3vw,2.8rem)] leading-[1.2]`}>Two cinematographers, no awkward staging. We film the real moments and shape them into a story with music, vows and voices.</p>
            <ul className="mt-8 grid grid-cols-2 gap-4">
              {[
                ["4K", "cinema cameras"],
                ["Drone", "aerial shots"],
                ["30 days", "highlight delivery"],
                ["Reels", "for Instagram"],
              ].map(([k, v]) => (
                <li key={k} className="border-t pt-3" style={{ borderColor: AM.line }}>
                  <p className="text-[26px] font-medium tracking-[-0.03em]">{k}</p>
                  <p className={MONO} style={{ color: AM.mute }}>
                    {v}
                  </p>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Btn href="/samples/aarav-mehta/packages" variant="line" cursor="Pricing">
                Film packages →
              </Btn>
            </div>
          </Up>
        </div>
      </section>
    </main>
  );
}
