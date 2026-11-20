"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { Feature } from "../shared/Feature";
import { BASE, EMAIL, KR, PAGES, PROJECTS } from "./data";
import { krMono, krSans } from "./fonts";
import { EASE, MONO, OpenToWork, useActions } from "./shared";

/* ───────────────────────── Command palette context ───────────────────────── */

const CmdCtx = createContext<{ open: () => void }>({ open: () => {} });
export const useCmd = () => useContext(CmdCtx);

export function KabirShell({ children }: { children: React.ReactNode }) {
  const [cmd, setCmd] = useState(false);
  const open = useCallback(() => setCmd(true), []);
  const value = useMemo(() => ({ open }), [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCmd((c) => !c);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <CmdCtx.Provider value={value}>
      <div className={`${krSans.variable} ${krMono.variable} min-h-screen overflow-x-clip [font-family:var(--kr-sans)] antialiased selection:bg-[#3FB950] selection:text-[#0B0F14]`} style={{ background: KR.bg, color: KR.text }}>
        {/* Background grid + glow */}
        <div aria-hidden className="pointer-events-none fixed inset-0 [background-image:linear-gradient(rgba(230,237,243,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(230,237,243,0.035)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_50%_0%,black,transparent_75%)]" />
        <div aria-hidden className="pointer-events-none fixed -top-60 left-1/2 size-[700px] -translate-x-1/2 rounded-full opacity-20 blur-[140px]" style={{ background: KR.green }} />
        <Nav />
        <div className="relative">{children}</div>
        <Footer />
        <StickyHire />
        <Palette open={cmd} onClose={() => setCmd(false)} />
      </div>
    </CmdCtx.Provider>
  );
}

/* ───────────────────────── Nav ───────────────────────── */

export function Logo() {
  return (
    <span className={`${MONO} flex items-center text-[17px] font-semibold tracking-tight`}>
      <span style={{ color: KR.green }}>~/</span>kabir<span style={{ color: KR.mute }}>.dev</span>
      <span className="ml-1 inline-block h-[1.05em] w-[0.55em] animate-[kr-blink_1s_steps(1)_infinite]" style={{ background: KR.green }} />
    </span>
  );
}

function Nav() {
  const pathname = usePathname();
  const { open } = useCmd();
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setSolid(y > 20));
  const isActive = (href: string) => (href === BASE ? pathname === BASE : pathname.startsWith(href));

  return (
    <header className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${solid ? "border-[#E6EDF3]/10 bg-[#0B0F14]/80 backdrop-blur-xl" : "border-transparent"}`}>
      <Feature id="pages" label="4-page portfolio + case-study pages" labelPosition="bottom">
        <nav className="mx-auto flex h-16 max-w-[1240px] items-center justify-between gap-4 px-5 sm:px-8">
          <Link href={BASE} aria-label="kabir.dev home">
            <Logo />
          </Link>
          <ul className="hidden items-center gap-1 md:flex">
            {PAGES.slice(1).map((p) => {
              const on = isActive(p.href);
              return (
                <li key={p.href}>
                  <Link href={p.href} className={`${MONO} relative rounded-md px-3 py-1.5 text-[13px] transition-colors ${on ? "text-[#E6EDF3]" : "text-[#8B949E] hover:text-[#E6EDF3]"}`}>
                    {on && <motion.span layoutId="kr-nav" className="absolute inset-0 rounded-md bg-white/[0.06]" transition={{ type: "spring", stiffness: 420, damping: 36 }} />}
                    <span className="relative">
                      <span style={{ color: on ? KR.green : undefined }}>./</span>
                      {p.label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="flex items-center gap-2">
            <Feature id="cmdk" label="⌘K quick search" inline>
              <button type="button" onClick={open} className={`${MONO} flex h-9 items-center gap-2 rounded-md border px-2.5 text-[12px] transition-colors hover:border-[#3FB950]/60`} style={{ borderColor: KR.line, color: KR.mute }}>
                <span className="hidden sm:inline">Search</span>
                <kbd className="rounded bg-white/10 px-1.5 py-0.5 text-[11px] text-[#E6EDF3]">⌘K</kbd>
              </button>
            </Feature>
            <span className="hidden lg:inline-flex">
              <OpenToWork />
            </span>
          </div>
        </nav>
        {/* Phones: page links as a path bar */}
        <div className={`${MONO} flex gap-1 overflow-x-auto border-t px-4 py-1.5 text-[12px] [scrollbar-width:none] md:hidden`} style={{ borderColor: KR.line }}>
          {PAGES.map((p) => {
            const on = isActive(p.href);
            return (
              <Link key={p.href} href={p.href} className={`shrink-0 rounded-md px-2.5 py-1 ${on ? "bg-white/[0.07] text-[#E6EDF3]" : "text-[#8B949E]"}`}>
                <span style={{ color: on ? KR.green : undefined }}>./</span>
                {p.label}
              </Link>
            );
          })}
        </div>
      </Feature>
    </header>
  );
}

/* ───────────────────────── ⌘K palette ───────────────────────── */

type Item = { group: string; label: string; hint: string; run: () => void };

function Palette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter();
  const { hire, resume, copyEmail } = useActions();
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const items: Item[] = useMemo(
    () => [
      ...PAGES.map((p) => ({ group: "Pages", label: p.label, hint: p.path, run: () => router.push(p.href) })),
      ...PROJECTS.map((p) => ({ group: "Projects", label: p.name, hint: p.tagline, run: () => router.push(`${BASE}/projects/${p.slug}`) })),
      { group: "Actions", label: "Hire Kabir", hint: "Message on WhatsApp", run: () => hire() },
      { group: "Actions", label: "Download resume", hint: "resume.pdf", run: () => resume() },
      { group: "Actions", label: "Copy email", hint: EMAIL, run: () => copyEmail() },
    ],
    [router, hire, resume, copyEmail],
  );

  const list = items.filter((i) => `${i.label} ${i.hint} ${i.group}`.toLowerCase().includes(q.trim().toLowerCase()));
  const active = Math.min(sel, Math.max(0, list.length - 1));

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => inputRef.current?.focus(), 50);
    return () => clearTimeout(t);
  }, [open]);

  const close = () => {
    setQ("");
    setSel(0);
    onClose();
  };
  const choose = (i: Item | undefined) => {
    if (!i) return;
    close();
    i.run();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[75] flex items-start justify-center px-4 pt-[14vh]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <button type="button" aria-label="Close search" onClick={close} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Quick search"
            initial={{ y: -16, scale: 0.97, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: -10, scale: 0.98, opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="relative w-full max-w-[580px] overflow-hidden rounded-xl border shadow-[0_40px_120px_-20px_rgba(0,0,0,0.9)]"
            style={{ background: KR.panel, borderColor: KR.line }}
          >
            <div className="flex items-center gap-3 border-b px-4" style={{ borderColor: KR.line }}>
              <span className={MONO} style={{ color: KR.green }}>
                {">"}
              </span>
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => {
                  setQ(e.target.value);
                  setSel(0);
                }}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown") {
                    e.preventDefault();
                    setSel((s) => Math.min(s + 1, list.length - 1));
                  }
                  if (e.key === "ArrowUp") {
                    e.preventDefault();
                    setSel((s) => Math.max(s - 1, 0));
                  }
                  if (e.key === "Enter") choose(list[active]);
                  if (e.key === "Escape") close();
                }}
                placeholder="Search pages, projects, actions…"
                className={`${MONO} h-14 flex-1 bg-transparent text-[15px] outline-none placeholder:text-white/30`}
              />
              <kbd className={`${MONO} rounded bg-white/10 px-1.5 py-0.5 text-[11px]`} style={{ color: KR.mute }}>
                esc
              </kbd>
            </div>
            <ul className="max-h-[50vh] overflow-y-auto p-2" data-lenis-prevent>
              {list.length === 0 && (
                <li className={`${MONO} px-3 py-8 text-center text-[13px]`} style={{ color: KR.mute }}>
                  No results for &quot;{q}&quot;
                </li>
              )}
              {list.map((it, i) => {
                const showGroup = i === 0 || list[i - 1].group !== it.group;
                const on = i === active;
                return (
                  <li key={`${it.group}-${it.label}`}>
                    {showGroup && (
                      <p className={`${MONO} px-3 pb-1 pt-3 text-[11px] uppercase tracking-[0.12em]`} style={{ color: KR.mute }}>
                        {it.group}
                      </p>
                    )}
                    <button type="button" onMouseEnter={() => setSel(i)} onClick={() => choose(it)} className="flex w-full items-center justify-between gap-4 rounded-lg px-3 py-2.5 text-left" style={{ background: on ? "rgba(63,185,80,0.12)" : undefined }}>
                      <span className="text-[14px] font-medium" style={{ color: on ? KR.green : KR.text }}>
                        {it.label}
                      </span>
                      <span className={`${MONO} truncate text-[12px]`} style={{ color: KR.mute }}>
                        {it.hint}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
            <div className={`${MONO} flex gap-4 border-t px-4 py-2.5 text-[11px]`} style={{ borderColor: KR.line, color: KR.mute }}>
              <span>↑↓ navigate</span>
              <span>↵ open</span>
              <span>⌘K toggle</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ───────────────────────── Footer ───────────────────────── */

function Footer() {
  const { external } = useActions();
  return (
    <footer className="relative border-t px-5 pb-28 pt-14 sm:px-8 sm:pb-32" style={{ borderColor: KR.line }}>
      <div className="mx-auto max-w-[1240px]">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
          <div>
            <p className={`${MONO} text-[clamp(2.4rem,7vw,5.6rem)] font-semibold leading-none tracking-[-0.04em]`}>
              <span style={{ color: KR.green }}>~/</span>kabir<span style={{ color: KR.mute }}>.dev</span>
            </p>
            <p className="mt-4 max-w-[26rem] text-[15px]" style={{ color: KR.mute }}>
              Full-stack developer in Indore. Building fast, reliable products for startups worldwide.
            </p>
          </div>
          <div className={`${MONO} flex flex-wrap gap-x-6 gap-y-2 text-[13px]`}>
            {["GitHub", "LinkedIn", "X / Twitter", "Dev.to"].map((s) => (
              <button key={s} type="button" onClick={() => external(s)} className="transition-colors hover:text-[#3FB950]" style={{ color: KR.mute }}>
                {s} ↗
              </button>
            ))}
          </div>
        </div>
        <div className={`${MONO} mt-10 flex flex-col justify-between gap-2 border-t pt-5 text-[12px] sm:flex-row`} style={{ borderColor: KR.line, color: KR.mute }}>
          <span>© 2026 Kabir Rao · built with Next.js, deployed on the edge ⚡</span>
          <Link href="/" className="hover:text-[#E6EDF3]">
            Website by CodeCult Studio
          </Link>
        </div>
      </div>
    </footer>
  );
}

/* ───────────────────────── Sticky mobile hire ───────────────────────── */

function StickyHire() {
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);
  const { hire } = useActions();
  useMotionValueEvent(scrollY, "change", (y) => setShow(y > 600));
  return (
    <motion.div initial={false} animate={{ y: show ? 0 : 120, opacity: show ? 1 : 0 }} transition={{ duration: 0.5, ease: EASE }} className="fixed bottom-[84px] right-4 z-[60] md:hidden">
      <Feature id="sticky" label="Sticky hire button on phones">
        <button type="button" onClick={() => hire()} className={`${MONO} flex h-12 items-center gap-2 rounded-lg bg-[#3FB950] px-5 text-[14px] font-semibold text-[#0B0F14] shadow-[0_10px_30px_-8px_rgba(63,185,80,0.7)]`}>
          $ hire --me
        </button>
      </Feature>
    </motion.div>
  );
}
