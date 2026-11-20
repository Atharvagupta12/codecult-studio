"use client";

import { ScaledFrame } from "@/components/hero/ScaledFrame";
import type { MockKind } from "./data";

/**
 * Project screenshots, drawn in code. Each one is a believable product UI,
 * rendered at 880×560 and scaled to fit its card.
 */
export function ProjectMock({ kind, accent, name, className = "" }: { kind: MockKind; accent: string; name: string; className?: string }) {
  return (
    <ScaledFrame baseWidth={880} baseHeight={560} className={className}>
      <div className="flex h-full w-full flex-col overflow-hidden rounded-[14px] border border-white/10 bg-[#0D1117] font-[family-name:var(--kr-sans)] text-[#E6EDF3]">
        <div className="flex h-9 shrink-0 items-center gap-2 border-b border-white/10 bg-[#161B22] px-4">
          <span className="size-3 rounded-full bg-[#FF5F57]" />
          <span className="size-3 rounded-full bg-[#FEBC2E]" />
          <span className="size-3 rounded-full bg-[#28C840]" />
          <span className="mx-auto rounded-md bg-white/5 px-24 py-1 font-[family-name:var(--kr-mono)] text-[11px] text-white/45">{name.toLowerCase()}.app</span>
        </div>
        <div className="relative min-h-0 flex-1">
          {kind === "fintech" && <Fintech a={accent} />}
          {kind === "commerce" && <Commerce a={accent} />}
          {kind === "chat" && <Chat a={accent} />}
          {kind === "mobile" && <Mobile a={accent} />}
          {kind === "analytics" && <Analytics a={accent} />}
          {kind === "devtool" && <Devtool a={accent} />}
        </div>
      </div>
    </ScaledFrame>
  );
}

const Bar = ({ w, c = "rgba(255,255,255,0.12)", h = 8 }: { w: number | string; c?: string; h?: number }) => <span className="block rounded-full" style={{ width: w, height: h, background: c }} />;

function Side({ a, items }: { a: string; items: string[] }) {
  return (
    <aside className="flex w-[170px] shrink-0 flex-col gap-1 border-r border-white/10 bg-[#0B0F14] p-4">
      <span className="mb-4 flex items-center gap-2 text-[15px] font-semibold">
        <span className="size-5 rounded-md" style={{ background: a }} /> Paylo
      </span>
      {items.map((it, i) => (
        <span key={it} className="rounded-lg px-3 py-2 text-[12px]" style={{ background: i === 0 ? `${a}22` : undefined, color: i === 0 ? a : "rgba(230,237,243,0.6)" }}>
          {it}
        </span>
      ))}
    </aside>
  );
}

function Fintech({ a }: { a: string }) {
  const bars = [38, 52, 44, 66, 58, 74, 62, 88, 70, 92, 80, 96];
  return (
    <div className="flex h-full">
      <Side a={a} items={["Overview", "Payments", "Invoices", "Reconcile", "Payouts", "Settings"]} />
      <div className="flex-1 p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] text-white/50">Good evening, Sharma Traders</p>
            <p className="text-[20px] font-semibold">Overview</p>
          </div>
          <span className="rounded-lg px-3 py-1.5 text-[11px] font-semibold text-black" style={{ background: a }}>
            + New invoice
          </span>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-3">
          {[
            ["Collected today", "₹4,82,310", "+12.4%"],
            ["Pending", "₹62,900", "18 invoices"],
            ["Auto-matched", "97.2%", "this month"],
          ].map(([k, v, d]) => (
            <div key={k} className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
              <p className="text-[10px] text-white/50">{k}</p>
              <p className="mt-1 text-[18px] font-semibold">{v}</p>
              <p className="text-[10px]" style={{ color: a }}>
                {d}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-3 grid grid-cols-[1.4fr_1fr] gap-3">
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
            <p className="text-[11px] text-white/60">UPI volume · last 12 weeks</p>
            <div className="mt-3 flex h-[150px] items-end gap-2">
              {bars.map((h, i) => (
                <span key={i} className="flex-1 rounded-t-md" style={{ height: `${h}%`, background: i === bars.length - 1 ? a : `${a}55` }} />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-3">
            <p className="text-[11px] text-white/60">Recent payments</p>
            {[
              ["Gupta Stores", "₹12,400", true],
              ["Mehta & Sons", "₹3,250", true],
              ["Rao Pharma", "₹48,000", false],
              ["Blue Café", "₹1,890", true],
            ].map(([n, v, ok]) => (
              <div key={n as string} className="flex items-center justify-between text-[11px]">
                <span className="flex items-center gap-2">
                  <span className="grid size-6 place-items-center rounded-full bg-white/10 text-[10px]">{(n as string)[0]}</span>
                  {n}
                </span>
                <span className="flex items-center gap-2">
                  {v}
                  <span className="rounded px-1.5 py-0.5 text-[9px]" style={{ background: ok ? `${a}22` : "#F2CC6022", color: ok ? a : "#F2CC60" }}>
                    {ok ? "matched" : "review"}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Commerce({ a }: { a: string }) {
  const items = [
    ["Linen Kurta", "₹1,899", "#E7D9C4"],
    ["Indigo Shirt", "₹1,499", "#9FB4D8"],
    ["Block-print Dress", "₹2,299", "#F1B9A3"],
    ["Cotton Co-ord", "₹2,799", "#C9D9B8"],
  ];
  return (
    <div className="h-full bg-[#FAF6F0] text-[#1B1B1B]">
      <div className="flex items-center justify-between border-b border-black/10 px-6 py-3">
        <span className="text-[18px] font-bold tracking-tight">KAAPAS</span>
        <span className="flex gap-5 text-[11px] text-black/60">
          <span>New in</span>
          <span>Women</span>
          <span>Men</span>
          <span>Sale</span>
        </span>
        <span className="rounded-full px-3 py-1 text-[11px] font-semibold text-white" style={{ background: a }}>
          Cart · 2
        </span>
      </div>
      <div className="grid grid-cols-[1fr_1.6fr] gap-5 p-6">
        <div className="flex flex-col justify-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ color: a }}>
            Summer edit
          </p>
          <p className="mt-2 text-[34px] font-bold leading-[1.05] tracking-tight">Breathe easy in handwoven cotton.</p>
          <span className="mt-4 w-fit rounded-full bg-[#1B1B1B] px-4 py-2 text-[11px] font-semibold text-white">Shop the edit →</span>
          <p className="mt-4 text-[10px] text-black/50">⚡ Page loaded in 0.4s</p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {items.map(([n, p, c]) => (
            <div key={n} className="rounded-xl bg-white p-2 shadow-sm">
              <div className="h-[118px] rounded-lg" style={{ background: `linear-gradient(160deg, ${c}, ${c}88)` }}>
                <div className="mx-auto h-full w-1/2 rounded-t-[40px] bg-white/35" />
              </div>
              <div className="mt-2 flex items-center justify-between px-1 text-[11px]">
                <span className="font-semibold">{n}</span>
                <span className="text-black/60">{p}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Chat({ a }: { a: string }) {
  return (
    <div className="flex h-full">
      <aside className="w-[190px] shrink-0 border-r border-white/10 bg-[#0B0F14] p-4">
        <span className="flex items-center gap-2 text-[15px] font-semibold">
          <span className="grid size-6 place-items-center rounded-md text-[12px] text-black" style={{ background: a }}>
            ✚
          </span>
          AskDoc
        </span>
        <p className="mt-5 text-[10px] uppercase tracking-[0.15em] text-white/40">Patients today</p>
        {["Anita Joshi · 54", "Rahul Verma · 38", "Sunita Rao · 61", "Imran Ali · 47"].map((p, i) => (
          <p key={p} className="mt-2 rounded-lg px-2 py-1.5 text-[11px]" style={{ background: i === 0 ? `${a}22` : undefined, color: i === 0 ? a : "rgba(230,237,243,0.6)" }}>
            {p}
          </p>
        ))}
      </aside>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-[12px] text-white/50">Anita Joshi · 54 · Diabetic, hypertension</p>
        <div className="mt-4 flex flex-col gap-3">
          <div className="ml-auto max-w-[70%] rounded-2xl rounded-br-sm bg-white/10 px-4 py-2.5 text-[12px]">What was her last HbA1c and has it improved?</div>
          <div className="max-w-[80%] rounded-2xl rounded-bl-sm border px-4 py-3 text-[12px] leading-relaxed" style={{ borderColor: `${a}55`, background: `${a}14` }}>
            Her last HbA1c was <b>7.1%</b> (12 Oct 2025), down from <b>8.4%</b> in March. The improvement followed the change to metformin 1000 mg.
            <div className="mt-2 flex gap-2">
              {["Lab report p.2", "Prescription 14 Mar"].map((s) => (
                <span key={s} className="rounded-md px-2 py-0.5 text-[10px]" style={{ background: `${a}33`, color: a }}>
                  ↗ {s}
                </span>
              ))}
            </div>
          </div>
          <div className="ml-auto max-w-[70%] rounded-2xl rounded-br-sm bg-white/10 px-4 py-2.5 text-[12px]">Any allergies I should know about?</div>
          <div className="flex items-center gap-1.5 px-2">
            {[0, 1, 2].map((i) => (
              <span key={i} className="size-2 rounded-full" style={{ background: a, opacity: 0.4 + i * 0.25 }} />
            ))}
          </div>
        </div>
        <div className="mt-auto flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-[12px] text-white/40">
          Ask about this patient…
          <span className="ml-auto rounded-md px-2 py-1 text-[10px] font-semibold text-black" style={{ background: a }}>
            Send
          </span>
        </div>
      </div>
    </div>
  );
}

function Mobile({ a }: { a: string }) {
  return (
    <div className="flex h-full items-center justify-center gap-8 bg-[radial-gradient(circle_at_30%_20%,#1B2A3D,#0D1117)]">
      {/* Map */}
      <div className="relative h-[440px] w-[400px] overflow-hidden rounded-2xl border border-white/10 bg-[#0F1A26]">
        <svg viewBox="0 0 400 440" className="absolute inset-0 h-full w-full">
          {[60, 140, 220, 300, 380].map((y) => (
            <path key={y} d={`M0 ${y} Q200 ${y - 40} 400 ${y + 10}`} stroke="rgba(255,255,255,0.06)" strokeWidth="10" fill="none" />
          ))}
          <path d="M40 380 C120 300 160 320 210 230 S320 120 360 60" stroke={a} strokeWidth="4" fill="none" strokeDasharray="8 6" />
          {[
            [70, 340],
            [210, 230],
            [300, 140],
            [150, 120],
            [320, 330],
          ].map(([x, y], i) => (
            <g key={i}>
              <circle cx={x} cy={y} r="14" fill={`${a}33`} />
              <circle cx={x} cy={y} r="6" fill={i === 1 ? "#F2CC60" : a} />
            </g>
          ))}
        </svg>
        <span className="absolute left-3 top-3 rounded-lg bg-black/50 px-2 py-1 text-[11px] backdrop-blur">● 2,014 trucks live</span>
      </div>
      {/* Phone */}
      <div className="h-[460px] w-[230px] rounded-[34px] border-[6px] border-[#2A313C] bg-[#0B0F14] p-3">
        <div className="mx-auto mb-3 h-4 w-20 rounded-full bg-[#2A313C]" />
        <p className="text-[11px] text-white/50">Driver · MP09 GT 4521</p>
        <p className="mt-1 text-[18px] font-semibold">Indore → Bhopal</p>
        <div className="mt-3 rounded-xl p-3 text-black" style={{ background: a }}>
          <p className="text-[10px] font-semibold opacity-70">NEXT STOP</p>
          <p className="text-[14px] font-bold">Dewas warehouse</p>
          <p className="text-[11px]">38 km · ETA 52 min</p>
        </div>
        {[
          ["Speed", "62 km/h"],
          ["Fuel", "74%"],
          ["Network", "Offline ✓ synced"],
        ].map(([k, v]) => (
          <div key={k} className="mt-2 flex justify-between rounded-lg bg-white/5 px-3 py-2 text-[11px]">
            <span className="text-white/50">{k}</span>
            {v}
          </div>
        ))}
        <span className="mt-3 block rounded-xl bg-white/10 py-2.5 text-center text-[12px] font-semibold">Mark delivered</span>
      </div>
    </div>
  );
}

function Analytics({ a }: { a: string }) {
  const pts = [40, 46, 42, 55, 51, 63, 58, 72, 69, 80, 76, 90];
  const d = pts.map((p, i) => `${i ? "L" : "M"}${(i / (pts.length - 1)) * 540} ${200 - p * 2}`).join(" ");
  return (
    <div className="h-full p-5">
      <div className="flex items-center justify-between">
        <p className="text-[18px] font-semibold">Pulseboard</p>
        <span className="flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-[11px]">
          <span className="size-2 animate-pulse rounded-full" style={{ background: a }} /> Live · 1,284 users online
        </span>
      </div>
      <div className="mt-4 grid grid-cols-4 gap-3">
        {[
          ["Events / min", "34.8k"],
          ["Sign-ups", "1,092"],
          ["Activation", "41.6%"],
          ["MRR", "$84.2k"],
        ].map(([k, v]) => (
          <div key={k} className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
            <p className="text-[10px] text-white/50">{k}</p>
            <p className="mt-1 text-[18px] font-semibold">{v}</p>
          </div>
        ))}
      </div>
      <div className="mt-3 grid grid-cols-[1.6fr_1fr] gap-3">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
          <p className="text-[11px] text-white/60">Active users · 24h</p>
          <svg viewBox="0 0 540 210" className="mt-2 h-[200px] w-full">
            <path d={`${d} L540 210 L0 210 Z`} fill={`${a}22`} />
            <path d={d} stroke={a} strokeWidth="3" fill="none" />
          </svg>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
          <p className="text-[11px] text-white/60">Top events</p>
          {[
            ["page_view", 92],
            ["signup_start", 64],
            ["invite_sent", 48],
            ["plan_upgrade", 27],
          ].map(([n, w]) => (
            <div key={n as string} className="mt-3">
              <div className="flex justify-between font-[family-name:var(--kr-mono)] text-[10px]">
                <span>{n}</span>
                <span className="text-white/50">{w}%</span>
              </div>
              <div className="mt-1">
                <Bar w={`${w}%`} c={a} h={6} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Devtool({ a }: { a: string }) {
  return (
    <div className="flex h-full flex-col bg-[#0B0F14] p-6 font-[family-name:var(--kr-mono)] text-[14px] leading-[1.9]">
      <p>
        <span style={{ color: a }}>➜</span> <span className="text-[#58A6FF]">~/code</span> npx snip save debounce --tag react
      </p>
      <p style={{ color: a }}>✓ saved &apos;debounce&apos; (react) · 0.08s</p>
      <p>
        <span style={{ color: a }}>➜</span> <span className="text-[#58A6FF]">~/code</span> snip find deb
      </p>
      <div className="mt-1 rounded-lg border border-white/10 bg-white/[0.03] p-3 text-[13px]">
        {[
          ["debounce.ts", "react", "2 days ago", true],
          ["debounced-search.tsx", "react", "3 weeks ago", false],
          ["deploy-staging.sh", "devops", "1 month ago", false],
        ].map(([f, t, w, on]) => (
          <p key={f as string} className="flex justify-between rounded px-2" style={{ background: on ? `${a}1F` : undefined }}>
            <span>
              {on ? "›" : " "} {f}
            </span>
            <span className="text-white/40">
              {t} · {w}
            </span>
          </p>
        ))}
      </div>
      <p className="mt-2">
        <span style={{ color: a }}>➜</span> <span className="text-[#58A6FF]">~/code</span> snip share debounce
      </p>
      <p className="text-white/70">
        ↗ gist.github.com/kabir/<span style={{ color: a }}>3f9a2c</span> <span className="text-white/40">(copied to clipboard)</span>
      </p>
      <p className="mt-auto flex items-center gap-3 text-[12px] text-white/50">
        <span className="rounded px-2 py-0.5 text-black" style={{ background: a }}>
          ★ 1.2k
        </span>
        github.com/kabirrao/snip · MIT
      </p>
    </div>
  );
}
