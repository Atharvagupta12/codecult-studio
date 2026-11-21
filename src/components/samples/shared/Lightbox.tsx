"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";

/**
 * Full-screen photo viewer with arrows, keyboard and swipe.
 * Shared by the photography/beauty samples; pass `accent` and `labelClass` to match each brand.
 */
export function Lightbox({
  photos,
  index,
  onClose,
  onIndex,
  accent = "#F2EDE4",
  labelClass = "text-[11px] uppercase tracking-[0.18em]",
}: {
  photos: { src: string; alt: string }[];
  index: number | null;
  onClose: () => void;
  onIndex: (i: number) => void;
  accent?: string;
  labelClass?: string;
}) {
  const [dir, setDir] = useState(1);
  const open = index !== null;
  const go = (d: number) => {
    if (index === null) return;
    setDir(d);
    onIndex((index + d + photos.length) % photos.length);
  };

  useEffect(() => {
    if (!open) return;
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", key);
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", key);
      document.documentElement.style.overflow = "";
    };
  });

  const p = index !== null ? photos[index] : null;

  return (
    <AnimatePresence>
      {open && p && (
        <motion.div role="dialog" aria-modal="true" aria-label="Photo viewer" className="fixed inset-0 z-[72] flex flex-col bg-black/95 text-white backdrop-blur" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
          <div className={`flex items-center justify-between px-5 py-4 text-white/60 ${labelClass}`}>
            <span>
              <span style={{ color: accent }}>{String(index! + 1).padStart(2, "0")}</span> / {String(photos.length).padStart(2, "0")}
            </span>
            <span className="hidden sm:block">← → to browse · esc to close</span>
            <button type="button" onClick={onClose} className="rounded-full border border-white/20 px-4 py-2 text-white hover:bg-white/10" data-cursor="Close">
              Close ✕
            </button>
          </div>
          <div className="relative flex-1">
            <AnimatePresence initial={false} custom={dir} mode="popLayout">
              <motion.div
                key={p.src}
                initial={{ opacity: 0, x: dir * 80 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir * -80 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.6}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -60) go(1);
                  else if (info.offset.x > 60) go(-1);
                }}
                className="absolute inset-x-4 inset-y-2 sm:inset-x-20"
                data-cursor="Drag"
              >
                <Image src={p.src} alt={p.alt} fill sizes="100vw" className="pointer-events-none select-none object-contain" draggable={false} />
              </motion.div>
            </AnimatePresence>
            <button type="button" aria-label="Previous photo" onClick={() => go(-1)} className="absolute left-2 top-1/2 hidden size-14 -translate-y-1/2 place-items-center rounded-full border border-white/15 text-[20px] hover:bg-white/10 sm:grid">
              ←
            </button>
            <button type="button" aria-label="Next photo" onClick={() => go(1)} className="absolute right-2 top-1/2 hidden size-14 -translate-y-1/2 place-items-center rounded-full border border-white/15 text-[20px] hover:bg-white/10 sm:grid">
              →
            </button>
          </div>
          <p className="px-5 pb-24 pt-4 text-center text-[14px] text-white/55 sm:pb-28">{p.alt}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
