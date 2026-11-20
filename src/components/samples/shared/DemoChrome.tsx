"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { TIERS, buildThisMessage } from "@/data/samples";
import { waLink } from "@/lib/site";
import { ArrowIcon, CheckIcon, WhatsAppIcon } from "@/components/ui/icons";
import { useDemo } from "./DemoProvider";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * One line in the "What's included" panel.
 * `id` = the <Feature id> to scroll to (omit for things you can't point at, e.g. SEO).
 * `href` = the sample page that feature lives on (multi-page samples).
 */
export type TourItem = { id?: string; label: string; href?: string };

/** CodeCult demo bar, "What's included" tour panel and explainer sheet. */
export function DemoChrome({ tourItems }: { tourItems: TourItem[] }) {
  const { sample, tour, setTour, current, close } = useDemo();
  const tier = TIERS[sample.tier];
  const router = useRouter();
  const pathname = usePathname();

  /** Scroll to a feature; on multi-page samples, open its page first. */
  function goTo(t: TourItem) {
    if (!t.id) return;
    // Previously visited pages can stay in the DOM (hidden), so pick the visible match.
    const find = () =>
      Array.from(document.querySelectorAll<HTMLElement>(`[id="feature-${t.id}"]`)).find((el) => el.offsetParent !== null || el.getClientRects().length > 0);
    const scroll = () => find()?.scrollIntoView({ behavior: "smooth", block: "center" });
    if (t.href && t.href !== pathname) {
      router.push(t.href);
      let tries = 0;
      const wait = setInterval(() => {
        tries++;
        if (find() || tries > 30) {
          clearInterval(wait);
          setTimeout(scroll, 150);
        }
      }, 100);
    } else scroll();
  }

  // Close the sheet with Escape
  useEffect(() => {
    if (!current) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [current, close]);

  return (
    <div className="font-sans">
      {/* ── Tour panel ── */}
      <AnimatePresence>
        {tour && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="fixed inset-x-3 bottom-[88px] z-[70] mx-auto max-h-[calc(100svh-120px)] max-w-[420px] overflow-y-auto rounded-[24px] border border-white/10 bg-[#0A0908]/95 p-5 text-[#F3EEE6] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] backdrop-blur-xl sm:bottom-[96px]"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#FF5A1F]">Included in {sample.tier}</p>
            <p className="mt-1 text-[18px] font-medium leading-snug">
              Everything you see here, for <span className="font-serif text-[22px] italic">{tier.price}</span>
            </p>
            <ul className="mt-4 flex flex-col gap-1">
              {tourItems.map((t) => (
                <li key={t.label}>
                  <button
                    type="button"
                    onClick={() => goTo(t)}
                    disabled={!t.id}
                    className="flex w-full disabled:cursor-default disabled:hover:bg-transparent items-center gap-2.5 rounded-xl px-2 py-1.5 text-left text-[14px] text-[#F3EEE6]/85 transition-colors hover:bg-white/5"
                  >
                    <span className="grid size-5 shrink-0 place-items-center rounded-full bg-[#FF5A1F] text-[#0A0908]">
                      <CheckIcon className="size-3" />
                    </span>
                    {t.label}
                  </button>
                </li>
              ))}
            </ul>
            <p className="mt-3 border-t border-white/10 pt-3 text-[12px] text-[#F3EEE6]/50">
              {tier.pages} · custom UI/UX · free hosting · live in {tier.days} days
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Demo bar ── */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE, delay: 1.2 }}
        className="fixed inset-x-3 bottom-3 z-[70] flex justify-center sm:bottom-5"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="flex w-full max-w-[640px] items-center gap-1.5 rounded-full border border-white/10 bg-[#0A0908]/90 p-1.5 text-[#F3EEE6] shadow-[0_20px_60px_-10px_rgba(0,0,0,0.7)] backdrop-blur-xl">
          <Link
            href="/#work"
            aria-label="Back to CodeCult Studio"
            className="group flex h-11 shrink-0 items-center gap-1.5 rounded-full border border-white/15 pl-3 pr-3 text-[13px] font-semibold text-[#F3EEE6] transition-colors hover:border-white/35 sm:pr-4"
          >
            <svg viewBox="0 0 24 24" className="size-4 transition-transform group-hover:-translate-x-0.5" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M11 6l-6 6 6 6" />
            </svg>
            <span className="grid size-6 place-items-center rounded-full bg-[#FF5A1F] text-[#0A0908]">
              <span className="font-serif text-[15px] italic leading-none">c</span>
            </span>
            <span className="hidden md:inline">CodeCult</span>
          </Link>
          <div className="min-w-0 flex-1 pl-1.5 leading-tight">
            <p className="truncate font-mono text-[9px] uppercase tracking-[0.16em] text-[#F3EEE6]/45">
              <span className="hidden lg:inline">Sample · </span>
              {sample.tier}
            </p>
            <p className="truncate">
              <span className="font-serif text-[20px]">{tier.price}</span>
              <span className="hidden text-[12px] text-[#F3EEE6]/50 sm:inline"> · live in {tier.days} days</span>
            </p>
          </div>
          <button
            type="button"
            onClick={() => setTour(!tour)}
            aria-pressed={tour}
            className={`flex h-11 shrink-0 items-center gap-1.5 rounded-full px-3.5 text-[13px] font-semibold transition-colors sm:px-4 ${
              tour ? "bg-[#F3EEE6] text-[#0A0908]" : "border border-white/15 text-[#F3EEE6] hover:border-white/30"
            }`}
          >
            <span>✦</span>
            <span className="hidden sm:inline">{tour ? "Hide features" : "What's included"}</span>
            <span className="sr-only sm:hidden">Features</span>
          </button>
          <a
            href={waLink(buildThisMessage(sample))}
            target="_blank"
            rel="noopener"
            className="group flex h-11 shrink-0 items-center gap-2 rounded-full bg-[#FF5A1F] pl-4 pr-1.5 text-[13px] font-semibold text-[#0A0908]"
          >
            <span className="hidden sm:inline">Build this for me</span>
            <span className="sm:hidden">Get this</span>
            <span className="grid size-8 place-items-center rounded-full bg-[#0A0908] text-[#F3EEE6] transition-transform duration-500 group-hover:-rotate-45">
              <ArrowIcon className="size-3.5" />
            </span>
          </a>
        </div>
      </motion.div>

      {/* ── Explainer sheet ── */}
      <AnimatePresence>
        {current && (
          <motion.div className="fixed inset-0 z-[80] flex items-end justify-center p-3 sm:items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <button type="button" aria-label="Close" onClick={close} className="absolute inset-0 bg-black/55 backdrop-blur-sm" />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={current.title}
              initial={{ y: 60, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 60, opacity: 0 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="relative w-full max-w-[420px] overflow-hidden rounded-[28px] bg-[#0A0908] p-6 text-[#F3EEE6] shadow-2xl"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#FF5A1F]">Demo · how it works</p>
              <h3 className="mt-2 text-[22px] font-medium leading-tight tracking-[-0.02em]">{current.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-[#F3EEE6]/65">{current.body}</p>

              {current.message && (
                <div className="mt-5 rounded-2xl bg-[#0B141A] p-3">
                  <div className="mb-2 flex items-center gap-2 text-[12px] text-[#8696A0]">
                    <WhatsAppIcon className="size-4 text-[#25D366]" /> To: {current.messageTo ?? sample.name}
                  </div>
                  <div className="ml-auto w-fit max-w-[90%] whitespace-pre-line rounded-[10px] rounded-tr-[3px] bg-[#005C4B] px-3 py-2 text-[13px] leading-snug text-[#E9EDEF]">
                    {current.message}
                    <span className="ml-2 text-[10px] text-[#8696A0]">now ✓✓</span>
                  </div>
                </div>
              )}

              <div className="mt-6 flex gap-2">
                <button type="button" onClick={close} className="h-12 flex-1 rounded-full border border-white/15 text-[14px] font-semibold">
                  Got it
                </button>
                <a
                  href={waLink(buildThisMessage(sample))}
                  target="_blank"
                  rel="noopener"
                  className="flex h-12 flex-[1.4] items-center justify-center gap-2 rounded-full bg-[#FF5A1F] text-[14px] font-semibold text-[#0A0908]"
                >
                  Build this for me <ArrowIcon className="size-4" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
