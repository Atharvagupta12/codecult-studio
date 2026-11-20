import type { SampleSite } from "@/data/samples";

const BLUE = "#0D99FF";
const PINK = "#F24E8B";

/** A designer's-canvas version of the split-layout preview (1280×800), aligned with DesktopPreview. */
export function Wireframe({ s }: { s: SampleSite }) {
  return (
    <div
      className="relative h-full w-full overflow-hidden text-[#9A9AA0]"
      style={{
        background: "#F4F4F2",
        backgroundImage: "radial-gradient(#D6D6D2 1.2px, transparent 1.2px)",
        backgroundSize: "24px 24px",
      }}
    >
      {/* Nav */}
      <div className="relative flex items-center justify-between px-16 pt-12">
        <Box label="Logo · 34px" className="px-2 py-1">
          <span className={`text-[34px] leading-none tracking-tight text-[#8A8A90] ${s.fontClass}`} style={{ fontWeight: 800 }}>
            {s.name}
          </span>
        </Box>
        <div className="flex items-center gap-12">
          {s.nav.map((n) => (
            <span key={n} className="h-3 w-16 rounded-full bg-[#D9D9D5]" />
          ))}
          <span className="h-[54px] w-[180px] rounded-full border-2 border-dashed border-[#BDBDB8]" />
        </div>
      </div>

      <div className="relative grid grid-cols-[1.05fr_0.95fr] gap-14 px-16 pt-14">
        <div className="relative flex flex-col justify-center pb-10">
          <span className="mb-7 h-3.5 w-[300px] rounded-full bg-[#D9D9D5]" />
          <Box label="Headline · 104 / 0.94" selected>
            <h3 className={`text-[104px] leading-[0.94] tracking-[-0.035em] text-[#7E7E84] ${s.fontClass}`} style={{ fontWeight: s.weight ?? 600 }}>
              {s.headline[0]}
              <br />
              <em style={{ fontStyle: s.italicSecondLine ? "italic" : "normal" }}>{s.headline[1]}</em>
            </h3>
          </Box>
          {/* spacing redline */}
          <div className="relative ml-6 h-8">
            <span className="absolute left-0 top-0 h-full w-px" style={{ background: PINK }} />
            <span className="absolute left-2 top-1/2 -translate-y-1/2 rounded px-1.5 font-mono text-[13px] text-white" style={{ background: PINK }}>
              32
            </span>
          </div>
          <span className="h-3 w-[440px] rounded-full bg-[#D9D9D5]" />
          <span className="mt-3 h-3 w-[380px] rounded-full bg-[#D9D9D5]" />
          <div className="mt-10 flex gap-4">
            <span className="h-[68px] w-[230px] rounded-full bg-[#CFCFCA]" />
            <span className="h-[68px] w-[210px] rounded-full border-2 border-[#CFCFCA]" />
          </div>
        </div>

        {/* Image placeholder */}
        <div className="relative h-[600px] overflow-hidden rounded-b-[28px] rounded-t-[300px] border-2 border-dashed border-[#BDBDB8] bg-[#ECECE8]">
          <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
            <line x1="0" y1="0" x2="100" y2="100" stroke="#CFCFCA" strokeWidth="0.4" />
            <line x1="100" y1="0" x2="0" y2="100" stroke="#CFCFCA" strokeWidth="0.4" />
          </svg>
          <span className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-md bg-white px-3 py-1.5 font-mono text-[14px] text-[#7E7E84] shadow">
            Hero image · 4:5
          </span>
        </div>
      </div>

      {/* Colour palette card */}
      <div className="absolute bottom-10 left-16 flex items-center gap-3 rounded-2xl bg-white p-3 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
        {[s.bg, s.fg, "#C26A2B", "#FFFFFF"].map((c) => (
          <span key={c} className="flex flex-col items-center gap-1.5">
            <span className="size-11 rounded-lg border border-black/10" style={{ background: c }} />
            <span className="font-mono text-[11px] uppercase text-[#7E7E84]">{c.replace("#", "")}</span>
          </span>
        ))}
      </div>

      {/* Designer cursor */}
      <div className="absolute left-[46%] top-[38%] flex items-start">
        <svg width="30" height="30" viewBox="0 0 24 24" className="drop-shadow">
          <path d="M3 2l7 19 2.5-7.5L20 11z" fill="#7B61FF" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
        <span className="mt-6 rounded-full bg-[#7B61FF] px-3 py-1 font-sans text-[14px] font-semibold text-white">Designer</span>
      </div>
    </div>
  );
}

function Box({ children, label, selected, className = "" }: { children: React.ReactNode; label: string; selected?: boolean; className?: string }) {
  return (
    <div className={`relative self-start ${className}`} style={{ outline: `${selected ? 2 : 1.5}px ${selected ? "solid" : "dashed"} ${BLUE}` }}>
      <span className="absolute -top-8 left-0 whitespace-nowrap rounded px-2 py-0.5 font-mono text-[13px] text-white" style={{ background: BLUE }}>
        {label}
      </span>
      {selected &&
        ["-left-[5px] -top-[5px]", "-right-[5px] -top-[5px]", "-left-[5px] -bottom-[5px]", "-right-[5px] -bottom-[5px]"].map((p) => (
          <span key={p} className={`absolute size-[9px] border-2 bg-white ${p}`} style={{ borderColor: BLUE }} />
        ))}
      {children}
    </div>
  );
}
