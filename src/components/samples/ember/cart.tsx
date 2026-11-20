"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useDemo } from "../shared/DemoProvider";
import { BASE, DELIVERY_FEE, DISHES, EM, FREE_DELIVERY_ABOVE, GST, SLOTS, inr, type Dish } from "./data";
import { D, EASE, LABEL } from "./shared";

/* ───────────────────────── State ───────────────────────── */

type Mode = "pickup" | "delivery";
type Details = { name: string; phone: string; address: string; time: string; notes: string };

type CartCtx = {
  qty: Record<string, number>;
  add: (id: string) => void;
  dec: (id: string) => void;
  count: number;
  lines: { dish: Dish; qty: number }[];
  subtotal: number;
  mode: Mode;
  setMode: (m: Mode) => void;
  details: Details;
  setDetails: (d: Partial<Details>) => void;
  drawer: boolean;
  setDrawer: (v: boolean) => void;
  lastAdded: string | null;
};

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [qty, setQty] = useState<Record<string, number>>({});
  const [mode, setMode] = useState<Mode>("delivery");
  const [details, setD] = useState<Details>({ name: "", phone: "", address: "", time: "As soon as possible", notes: "" });
  const [drawer, setDrawer] = useState(false);
  const [lastAdded, setLastAdded] = useState<string | null>(null);

  const add = useCallback((id: string) => {
    setQty((q) => ({ ...q, [id]: (q[id] ?? 0) + 1 }));
    setLastAdded(id);
  }, []);
  const dec = useCallback((id: string) => {
    setQty((q) => {
      const n = (q[id] ?? 0) - 1;
      const next = { ...q };
      if (n <= 0) delete next[id];
      else next[id] = n;
      return next;
    });
  }, []);
  const setDetails = useCallback((d: Partial<Details>) => setD((x) => ({ ...x, ...d })), []);

  // Clear the "added" toast after a moment
  useEffect(() => {
    if (!lastAdded) return;
    const t = setTimeout(() => setLastAdded(null), 2200);
    return () => clearTimeout(t);
  }, [lastAdded, qty]);

  const lines = useMemo(() => DISHES.filter((d) => qty[d.id]).map((dish) => ({ dish, qty: qty[dish.id] })), [qty]);
  const subtotal = lines.reduce((s, l) => s + l.dish.price * l.qty, 0);
  const count = lines.reduce((s, l) => s + l.qty, 0);

  const value = useMemo(
    () => ({ qty, add, dec, count, lines, subtotal, mode, setMode, details, setDetails, drawer, setDrawer, lastAdded }),
    [qty, add, dec, count, lines, subtotal, mode, details, setDetails, drawer, lastAdded],
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used inside <CartProvider>");
  return c;
}

export function totals(subtotal: number, mode: Mode) {
  const gst = subtotal * GST;
  const delivery = mode === "delivery" && subtotal > 0 && subtotal < FREE_DELIVERY_ABOVE ? DELIVERY_FEE : 0;
  return { gst, delivery, total: subtotal + gst + delivery };
}

/* ───────────────────────── Add button ───────────────────────── */

export function AddButton({ dish, compact = false }: { dish: Dish; compact?: boolean }) {
  const { qty, add, dec } = useCart();
  const n = qty[dish.id] ?? 0;
  if (n === 0)
    return (
      <button
        type="button"
        onClick={() => add(dish.id)}
        data-cursor="Add"
        className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border font-semibold uppercase tracking-[0.16em] transition-colors hover:bg-[#D9A55B] hover:text-[#0C0907] ${compact ? "h-9 px-3.5 text-[10px]" : "h-11 px-5 text-[11px]"}`}
        style={{ borderColor: EM.gold, color: EM.gold }}
        aria-label={`Add ${dish.name} to order`}
      >
        + Add
      </button>
    );
  return (
    <span className={`inline-flex shrink-0 items-center rounded-full ${compact ? "h-9" : "h-11"}`} style={{ background: EM.gold, color: EM.bg }}>
      <button type="button" onClick={() => dec(dish.id)} aria-label={`Remove one ${dish.name}`} className={`grid place-items-center text-[18px] font-bold ${compact ? "w-8" : "w-10"}`}>
        −
      </button>
      <span className="min-w-5 text-center text-[14px] font-bold">{n}</span>
      <button type="button" onClick={() => add(dish.id)} aria-label={`Add one more ${dish.name}`} className={`grid place-items-center text-[18px] font-bold ${compact ? "w-8" : "w-10"}`}>
        +
      </button>
    </span>
  );
}

/* ───────────────────────── Order panel (inline + drawer) ───────────────────────── */

function buildMessage(lines: CartCtx["lines"], subtotal: number, mode: Mode, d: Details) {
  const t = totals(subtotal, mode);
  const items = lines.map((l) => `• ${l.qty} × ${l.dish.name} — ${inr(l.dish.price * l.qty)}`).join("\n");
  return [
    "Hi Ember! New order 🔥",
    items,
    "",
    `Subtotal ${inr(subtotal)} · GST ${inr(t.gst)}${mode === "delivery" ? ` · Delivery ${t.delivery ? inr(t.delivery) : "FREE"}` : ""}`,
    `Total: ${inr(t.total)}`,
    "",
    mode === "delivery" ? `Deliver to: ${d.address || "(address)"}` : "Pickup from the restaurant",
    `Name: ${d.name || "(your name)"} · ${d.phone || "(phone)"}`,
    `Time: ${d.time}`,
    d.notes ? `Notes: ${d.notes}` : "",
  ]
    .filter((x, i, a) => !(x === "" && a[i - 1] === ""))
    .join("\n")
    .trim();
}

export function OrderPanel({ onSent }: { onSent?: () => void }) {
  const { lines, subtotal, mode, setMode, details, setDetails, add, dec } = useCart();
  const { explain } = useDemo();
  const t = totals(subtotal, mode);
  const toFree = Math.max(0, FREE_DELIVERY_ABOVE - subtotal);

  function send() {
    explain({
      title: "Orders arrive in your WhatsApp",
      body: "On your real website, the guest taps Send and this exact order lands in your restaurant's WhatsApp, already itemised and totalled. No aggregator commission.",
      message: buildMessage(lines, subtotal, mode, details),
    });
    onSent?.();
  }

  return (
    <div className="flex flex-col gap-6" style={{ color: EM.cream }}>
      <div className="flex items-baseline justify-between">
        <h3 className={`${D} text-[32px] italic`}>Your order</h3>
        <span className={LABEL} style={{ color: EM.mute }}>
          {lines.reduce((s, l) => s + l.qty, 0)} items
        </span>
      </div>

      {lines.length === 0 ? (
        <div className="rounded-2xl border border-dashed p-6 text-center" style={{ borderColor: EM.line }}>
          <p className={`${D} text-[22px] italic`}>Nothing here yet.</p>
          <p className="mt-1 text-[14px]" style={{ color: EM.mute }}>
            Add a few dishes to begin. We suggest the butter chicken.
          </p>
        </div>
      ) : (
        <ul className="flex flex-col divide-y" style={{ borderColor: EM.line }}>
          <AnimatePresence initial={false}>
            {lines.map(({ dish, qty }) => (
              <motion.li
                key={dish.id}
                layout
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="flex items-center gap-3 overflow-hidden py-3"
                style={{ borderColor: EM.line }}
              >
                {dish.img ? (
                  <span className="relative size-12 shrink-0 overflow-hidden rounded-xl">
                    <Image src={dish.img} alt="" fill sizes="48px" className="object-cover" />
                  </span>
                ) : (
                  <span className="grid size-12 shrink-0 place-items-center rounded-xl text-[18px]" style={{ background: EM.panel2, color: EM.gold }}>
                    ✦
                  </span>
                )}
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[14px] font-semibold">{dish.name}</span>
                  <span className="block text-[13px]" style={{ color: EM.mute }}>
                    {inr(dish.price)}
                  </span>
                </span>
                <span className="inline-flex h-9 items-center rounded-full border" style={{ borderColor: EM.line }}>
                  <button type="button" onClick={() => dec(dish.id)} aria-label="Remove one" className="w-8 text-[16px]">
                    −
                  </button>
                  <span className="min-w-4 text-center text-[13px] font-bold">{qty}</span>
                  <button type="button" onClick={() => add(dish.id)} aria-label="Add one" className="w-8 text-[16px]">
                    +
                  </button>
                </span>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      )}

      {/* Mode */}
      <div className="grid grid-cols-2 rounded-full border p-1" style={{ borderColor: EM.line }}>
        {(["delivery", "pickup"] as Mode[]).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            className={`relative h-10 rounded-full text-[12px] font-semibold uppercase tracking-[0.18em] ${mode === m ? "text-[#0C0907]" : ""}`}
          >
            {mode === m && <motion.span layoutId="em-mode" className="absolute inset-0 rounded-full" style={{ background: EM.gold }} transition={{ type: "spring", stiffness: 400, damping: 34 }} />}
            <span className="relative">{m === "delivery" ? "Delivery" : "Pickup"}</span>
          </button>
        ))}
      </div>

      {mode === "delivery" && subtotal > 0 && (
        <div>
          <div className="h-1.5 overflow-hidden rounded-full" style={{ background: EM.panel2 }}>
            <motion.div className="h-full rounded-full" style={{ background: EM.gold }} animate={{ width: `${Math.min(100, (subtotal / FREE_DELIVERY_ABOVE) * 100)}%` }} />
          </div>
          <p className="mt-2 text-[12px]" style={{ color: EM.mute }}>
            {toFree > 0 ? `Add ${inr(toFree)} more for free delivery` : "You've unlocked free delivery ✦"}
          </p>
        </div>
      )}

      {/* Details */}
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Name" value={details.name} onChange={(v) => setDetails({ name: v })} placeholder="Your name" />
        <Field label="Phone" value={details.phone} onChange={(v) => setDetails({ phone: v })} placeholder="10-digit mobile" type="tel" />
        {mode === "delivery" && <Field className="sm:col-span-2" label="Address" value={details.address} onChange={(v) => setDetails({ address: v })} placeholder="Flat, building, area" />}
        <label className="flex flex-col gap-1.5 sm:col-span-2">
          <span className={LABEL} style={{ color: EM.mute }}>
            {mode === "delivery" ? "Deliver" : "Pick up"}
          </span>
          <select
            value={details.time}
            onChange={(e) => setDetails({ time: e.target.value })}
            className="h-12 rounded-xl border bg-transparent px-3 text-[15px] outline-none focus:border-[#D9A55B]"
            style={{ borderColor: EM.line, colorScheme: "dark" }}
          >
            {["As soon as possible", ...SLOTS].map((s) => (
              <option key={s} value={s} style={{ background: EM.panel }}>
                {s}
              </option>
            ))}
          </select>
        </label>
        <Field className="sm:col-span-2" label="Notes for the kitchen" value={details.notes} onChange={(v) => setDetails({ notes: v })} placeholder="Less spicy, no onion, etc." />
      </div>

      {/* Totals */}
      <dl className="flex flex-col gap-2 border-t pt-5 text-[14px]" style={{ borderColor: EM.line }}>
        <Row k="Subtotal" v={inr(subtotal)} />
        <Row k="GST (5%)" v={inr(t.gst)} />
        {mode === "delivery" && <Row k="Delivery" v={subtotal === 0 ? "—" : t.delivery ? inr(t.delivery) : "Free"} />}
        <div className="mt-2 flex items-baseline justify-between">
          <dt className={LABEL} style={{ color: EM.gold }}>
            Total
          </dt>
          <dd className={`${D} text-[34px]`}>{inr(t.total)}</dd>
        </div>
      </dl>

      <button
        type="button"
        disabled={lines.length === 0}
        onClick={send}
        className="flex h-14 items-center justify-center gap-2 rounded-full text-[13px] font-semibold uppercase tracking-[0.2em] transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
        style={{ background: "#25D366", color: "#0C0907" }}
      >
        Send order on WhatsApp
      </button>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between" style={{ color: EM.mute }}>
      <dt>{k}</dt>
      <dd style={{ color: EM.cream }}>{v}</dd>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, type = "text", className = "" }: { label: string; value: string; onChange: (v: string) => void; placeholder: string; type?: string; className?: string }) {
  return (
    <label className={`flex flex-col gap-1.5 ${className}`}>
      <span className={LABEL} style={{ color: EM.mute }}>
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-12 rounded-xl border bg-transparent px-3 text-[15px] outline-none placeholder:text-[#A3968A]/60 focus:border-[#D9A55B]"
        style={{ borderColor: EM.line }}
      />
    </label>
  );
}

/* ───────────────────────── Drawer + floating button ───────────────────────── */

export function CartDrawer() {
  const { drawer, setDrawer } = useCart();
  useEffect(() => {
    if (!drawer) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setDrawer(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [drawer, setDrawer]);

  return (
    <AnimatePresence>
      {drawer && (
        <motion.div className="fixed inset-0 z-[66]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <button type="button" aria-label="Close order" onClick={() => setDrawer(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <motion.aside
            role="dialog"
            aria-label="Your order"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-y-0 right-0 flex w-full max-w-[460px] flex-col overflow-y-auto px-6 pb-28 pt-6"
            style={{ background: EM.panel }}
            data-lenis-prevent
          >
            <div className="mb-4 flex justify-end">
              <button type="button" onClick={() => setDrawer(false)} aria-label="Close" className="grid size-11 place-items-center rounded-full border text-[20px]" style={{ borderColor: EM.line, color: EM.cream }}>
                ×
              </button>
            </div>
            <OrderPanel onSent={() => setDrawer(false)} />
            <Link href={`${BASE}/order`} onClick={() => setDrawer(false)} className={`mt-6 text-center ${LABEL} underline-offset-4 hover:underline`} style={{ color: EM.gold }}>
              Browse the full order menu →
            </Link>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** Small toast when something is added */
export function AddedToast() {
  const { lastAdded, setDrawer, count } = useCart();
  const dish = DISHES.find((d) => d.id === lastAdded);
  return (
    <AnimatePresence>
      {dish && (
        <motion.button
          type="button"
          onClick={() => setDrawer(true)}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed right-4 top-24 z-[64] flex items-center gap-3 rounded-full border py-2 pl-2 pr-5 text-left shadow-2xl backdrop-blur-xl sm:right-6"
          style={{ background: "rgba(21,16,13,0.92)", borderColor: EM.line, color: EM.cream }}
        >
          <span className="grid size-9 place-items-center rounded-full text-[14px] font-bold" style={{ background: EM.gold, color: EM.bg }}>
            {count}
          </span>
          <span className="text-[13px] leading-tight">
            <span className="block font-semibold">{dish.name} added</span>
            <span className="block" style={{ color: EM.gold }}>
              View order →
            </span>
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
