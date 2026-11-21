"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { KJ, PIECES, inr, priceOf } from "./data";
import { Btn, LABEL, SERIF, useActions } from "./shared";

type Ctx = { ids: string[]; toggle: (id: string) => void; has: (id: string) => boolean; open: boolean; setOpen: (v: boolean) => void };
const WishCtx = createContext<Ctx | null>(null);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [ids, setIds] = useState<string[]>(["polki-choker"]);
  const [open, setOpen] = useState(false);
  const toggle = useCallback((id: string) => setIds((l) => (l.includes(id) ? l.filter((x) => x !== id) : [...l, id])), []);
  const has = useCallback((id: string) => ids.includes(id), [ids]);
  const value = useMemo(() => ({ ids, toggle, has, open, setOpen }), [ids, toggle, has, open]);
  return <WishCtx.Provider value={value}>{children}</WishCtx.Provider>;
}

export function useWishlist() {
  const c = useContext(WishCtx);
  if (!c) throw new Error("useWishlist must be inside WishlistProvider");
  return c;
}

export function HeartButton({ id, className = "" }: { id: string; className?: string }) {
  const { has, toggle } = useWishlist();
  const on = has(id);
  return (
    <button
      type="button"
      aria-label={on ? "Remove from wishlist" : "Add to wishlist"}
      aria-pressed={on}
      onClick={(e) => {
        e.stopPropagation();
        toggle(id);
      }}
      className={`grid size-10 place-items-center rounded-full bg-[#15110D]/60 backdrop-blur transition-colors hover:bg-[#15110D]/90 ${className}`}
    >
      <motion.svg viewBox="0 0 24 24" className="size-5" animate={{ scale: on ? [1, 1.35, 1] : 1 }} transition={{ duration: 0.4 }}>
        <path d="M12 20.5s-7.5-4.6-9.4-9.3C1.2 7.7 3.4 4.5 6.9 4.5c2 0 3.6 1.1 5.1 3 1.5-1.9 3.1-3 5.1-3 3.5 0 5.7 3.2 4.3 6.7-1.9 4.7-9.4 9.3-9.4 9.3Z" fill={on ? KJ.gold : "none"} stroke={on ? KJ.gold : KJ.cream} strokeWidth="1.6" />
      </motion.svg>
    </button>
  );
}

export function WishlistDrawer() {
  const { ids, toggle, open, setOpen } = useWishlist();
  const { send } = useActions();
  const items = PIECES.filter((p) => ids.includes(p.id));
  const total = items.reduce((n, p) => n + priceOf(p), 0);

  useEffect(() => {
    if (!open) return;
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", esc);
      document.documentElement.style.overflow = "";
    };
  }, [open, setOpen]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button key="bg" type="button" aria-label="Close wishlist" onClick={() => setOpen(false)} className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
          <motion.aside key="panel" role="dialog" aria-modal="true" aria-label="Wishlist" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }} className="fixed inset-y-0 right-0 z-[71] flex w-full max-w-[460px] flex-col border-l" style={{ background: KJ.panel, borderColor: KJ.line }} data-lenis-prevent>
            <div className="flex items-center justify-between border-b px-6 py-5" style={{ borderColor: KJ.line }}>
              <p className={`${SERIF} text-[30px] italic`}>Your wishlist</p>
              <button type="button" onClick={() => setOpen(false)} className={`${LABEL} text-[#A39478] hover:text-[#F3E3C3]`}>
                Close ✕
              </button>
            </div>
            <ul className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 && <li className={`${SERIF} py-16 text-center text-[24px] italic text-[#A39478]`}>Tap the ♡ on any piece to save it here.</li>}
              <AnimatePresence initial={false}>
                {items.map((p) => (
                  <motion.li key={p.id} layout initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, height: 0 }} className="flex items-center gap-4 border-b py-4" style={{ borderColor: KJ.line }}>
                    <span className="relative size-20 shrink-0 overflow-hidden">
                      <Image src={p.img} alt={p.name} fill sizes="80px" className="object-cover" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className={`${SERIF} block text-[20px] leading-tight`}>{p.name}</span>
                      <span className="mt-1 block text-[13px] text-[#A39478]">
                        {p.metal} · {p.weight} g
                      </span>
                      <span className="mt-1 block text-[14px]" style={{ color: KJ.gold }}>
                        approx. {inr(priceOf(p))}
                      </span>
                    </span>
                    <button type="button" onClick={() => toggle(p.id)} aria-label={`Remove ${p.name}`} className="text-[18px] text-[#A39478] hover:text-[#F3E3C3]">
                      ✕
                    </button>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
            <div className="border-t p-6" style={{ borderColor: KJ.line }}>
              <p className="flex justify-between text-[14px] text-[#A39478]">
                <span>{items.length} pieces · estimated</span>
                <span className={`${SERIF} text-[24px] text-[#F3E3C3]`}>{inr(total)}</span>
              </p>
              <Btn
                className="mt-5 w-full"
                disabled={!items.length}
                onClick={() =>
                  send(
                    "Wishlists arrive on your WhatsApp",
                    `Hi Kalaa Jewels! ✨\nHere's my wishlist:\n${items.map((p) => `• ${p.name} (${p.weight} g)`).join("\n")}\nCan I see these in store?`,
                  )
                }
              >
                Send wishlist on WhatsApp
              </Btn>
              <p className="mt-3 text-center text-[12px] text-[#A39478]">Prices change with today&apos;s gold rate. Final price at the store.</p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
