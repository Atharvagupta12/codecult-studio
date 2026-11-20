import { Reveal, RiseText } from "./Reveal";

/**
 * Editorial section header: "(02) — Sample websites" label, then a two-part
 * title where the second part is set in serif italic.
 */
export function SectionHeading({
  index,
  label,
  title,
  italic,
  intro,
  align = "left",
  tone = "dark",
}: {
  index: string;
  label: string;
  title: string;
  italic?: string;
  intro?: React.ReactNode;
  align?: "left" | "split";
  tone?: "dark" | "light";
}) {
  const muted = tone === "dark" ? "text-cream/45" : "text-ink/55";
  const body = tone === "dark" ? "text-cream/65" : "text-ink/70";
  return (
    <div className={align === "split" ? "grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-end" : "flex flex-col gap-6"}>
      <div className="flex flex-col gap-6">
        <Reveal>
          <span className={`flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] ${muted}`}>
            <span className="text-ember">({index})</span>
            <span className={`h-px w-10 ${tone === "dark" ? "bg-cream/20" : "bg-ink/25"}`} />
            {label}
          </span>
        </Reveal>
        <h2 className="max-w-[18ch] text-[clamp(2.6rem,6vw,5.6rem)] font-medium leading-[0.95] tracking-[-0.045em]">
          <RiseText text={title} />
          {italic && (
            <>
              {" "}
              <RiseText text={italic} delay={0.15} className="block font-serif font-normal italic tracking-[-0.02em]" />
            </>
          )}
        </h2>
      </div>
      {intro && (
        <Reveal delay={0.2} className={`max-w-[30rem] text-[17px] leading-[1.65] ${body}`}>
          {intro}
        </Reveal>
      )}
    </div>
  );
}
