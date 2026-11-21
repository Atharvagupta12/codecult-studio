"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { GST, KJ, inr, priceOf, rateFor, type Piece } from "./data";
import { Btn, LABEL, SERIF, useActions } from "./shared";
import { HeartButton } from "./wishlist";

/** Product quick view with hover-to-zoom and a price breakdown. */
export function QuickView({ piece, onClose }: { piece: Piece | null; onClose: () => void }) {
  const { enquire } = useActions();
  const [zoom, setZoom] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (!piece) return;
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", esc);
      document.documentElement.style.overflow = "";
    };
  }, [piece, onClose]);

  const p = piece;
  const rate = p ? rateFor(p.metal) : 0;
  const metal = p ? Math.round(p.weight * rate) : 0;
  const making = p ? Math.round(metal * p.making) : 0;
  const stones = p?.diamondValue ?? 0;
  const gst = Math.round((metal + making + stones) * GST);

  return (
    <AnimatePresence>
      {p && (
        <motion.div className="fixed inset-0 z-[72] flex items-end justify-center sm:items-center sm:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <button type="button" aria-label="Close" onClick={onClose} className="absolute inset-0 bg-black/75 backdrop-blur-sm" />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={p.name}
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative grid max-h-[92svh] w-full max-w-[1040px] overflow-y-auto border md:grid-cols-[1.05fr_0.95fr]"
            style={{ background: KJ.panel, borderColor: KJ.line }}
            data-lenis-prevent
          >
            <div
              className="relative aspect-square cursor-zoom-in overflow-hidden md:aspect-auto md:min-h-[560px]"
              onPointerMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                setZoom({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
              }}
              onPointerLeave={() => setZoom(null)}
            >
              <Image src={p.img} alt={p.name} fill sizes="(min-width: 768px) 540px, 100vw" className="object-cover transition-transform duration-300" style={{ transform: zoom ? "scale(2)" : "scale(1)", transformOrigin: zoom ? `${zoom.x}% ${zoom.y}%` : "50% 50%" }} />
              <span className={`${LABEL} absolute bottom-4 left-4 bg-black/50 px-3 py-1.5 text-[10px] text-white backdrop-blur`}>{zoom ? "Zoomed 2×" : "Hover to zoom"}</span>
              <HeartButton id={p.id} className="absolute right-4 top-4" />
            </div>
            <div className="flex flex-col p-6 sm:p-9">
              <div className="flex items-start justify-between gap-4">
                <p className={LABEL} style={{ color: KJ.gold }}>
                  {p.collection} · {p.metal}
                </p>
                <button type="button" onClick={onClose} className={`${LABEL} text-[#A39478] hover:text-[#F3E3C3]`}>
                  ✕
                </button>
              </div>
              <h2 className={`${SERIF} mt-3 text-[clamp(2rem,4vw,2.8rem)] font-medium leading-[1.05]`}>{p.name}</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-[#F3E3C3]/75">{p.desc}</p>

              <dl className="mt-6 grid grid-cols-3 gap-px border" style={{ background: KJ.line, borderColor: KJ.line }}>
                {[
                  ["Weight", `${p.weight} g`],
                  ["Purity", p.metal === "22K Gold" ? "22K · 916" : "18K · 750"],
                  ["Hallmark", "BIS HUID"],
                ].map(([k, v]) => (
                  <div key={k} className="p-3" style={{ background: KJ.panel }}>
                    <dt className="text-[10px] uppercase tracking-[0.2em] text-[#A39478]">{k}</dt>
                    <dd className="mt-1 text-[14px]">{v}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-6 flex flex-col gap-2 text-[14px] text-[#F3E3C3]/75">
                <p className="flex justify-between">
                  <span>
                    Gold value ({p.weight} g × {inr(rate)})
                  </span>
                  <span>{inr(metal)}</span>
                </p>
                <p className="flex justify-between">
                  <span>Making charges ({Math.round(p.making * 100)}%)</span>
                  <span>{inr(making)}</span>
                </p>
                {stones > 0 && (
                  <p className="flex justify-between">
                    <span>Diamonds / stones (certified)</span>
                    <span>{inr(stones)}</span>
                  </p>
                )}
                <p className="flex justify-between">
                  <span>GST 3%</span>
                  <span>{inr(gst)}</span>
                </p>
              </div>
              <p className="mt-4 flex items-end justify-between border-t pt-4" style={{ borderColor: KJ.line }}>
                <span className={LABEL}>Estimated price</span>
                <span className={`${SERIF} text-[36px] leading-none`} style={{ color: KJ.goldLight }}>
                  {inr(priceOf(p))}
                </span>
              </p>
              <div className="mt-auto pt-8">
                <Btn className="w-full" onClick={() => enquire(p)}>
                  Enquire on WhatsApp
                </Btn>
                <p className="mt-3 text-center text-[12px] text-[#A39478]">Based on today&apos;s rate. Final price confirmed in store.</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
