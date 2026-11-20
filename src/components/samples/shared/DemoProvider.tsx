"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { SampleSite } from "@/data/samples";

export type Explain = {
  title: string;
  body: string;
  /** Optional mock WhatsApp message shown in the sheet */
  message?: string;
  messageTo?: string;
};

type Ctx = {
  sample: SampleSite;
  tour: boolean;
  setTour: (v: boolean) => void;
  explain: (e: Explain) => void;
  current: Explain | null;
  close: () => void;
};

const DemoCtx = createContext<Ctx | null>(null);

export function DemoProvider({ sample, children }: { sample: SampleSite; children: React.ReactNode }) {
  const [tour, setTour] = useState(false);
  const [current, setCurrent] = useState<Explain | null>(null);
  const explain = useCallback((e: Explain) => setCurrent(e), []);
  const close = useCallback(() => setCurrent(null), []);
  const value = useMemo(() => ({ sample, tour, setTour, explain, current, close }), [sample, tour, explain, current, close]);
  return <DemoCtx.Provider value={value}>{children}</DemoCtx.Provider>;
}

export function useDemo() {
  const c = useContext(DemoCtx);
  if (!c) throw new Error("useDemo must be used inside <DemoProvider>");
  return c;
}
