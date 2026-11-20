import Image from "next/image";
import type { SampleSite } from "@/data/samples";

type Props = { s: SampleSite; priority?: boolean; sizes?: string };

/** Desktop preview, designed at 1280×800 and scaled down by ScaledFrame. */
export function DesktopPreview({ s, priority = false, sizes = "700px" }: Props) {
  const isOverlay = s.layout === "overlay";
  const k = s.size ?? 1;
  const second = (
    <em
      style={{
        fontStyle: s.italicSecondLine ? "italic" : "normal",
        color: s.uppercase || (!isOverlay && s.accent !== s.fg) ? s.accent : undefined,
        opacity: isOverlay && !s.uppercase && !s.italicSecondLine ? 0.55 : 1,
      }}
    >
      {s.headline[1]}
    </em>
  );

  return (
    <div className={`relative h-full w-full overflow-hidden ${s.fontClass}`} style={{ background: s.bg, color: s.fg, fontSynthesis: "none" }}>
      {isOverlay && (
        <>
          <Image src={s.image} alt="" fill sizes={sizes} className="object-cover" style={{ objectPosition: s.imagePosition }} priority={priority} />
          <div className="absolute inset-0" style={{ background: `linear-gradient(90deg, ${s.bg} 8%, ${s.bg}CC 38%, transparent 75%)` }} />
          <div className="absolute inset-0" style={{ background: `linear-gradient(0deg, ${s.bg} 2%, transparent 40%)` }} />
        </>
      )}

      {/* Site nav */}
      <div className="relative z-10 flex items-center justify-between px-16 pt-12">
        <span className={`whitespace-nowrap text-[34px] leading-none ${s.uppercase ? "tracking-wide" : "tracking-tight"}`} style={{ fontWeight: 800 }}>
          {s.name}
        </span>
        <div className="flex items-center gap-12 font-sans text-[19px] font-medium opacity-80">
          {s.nav.map((n) => (
            <span key={n}>{n}</span>
          ))}
          <span className="whitespace-nowrap rounded-full px-7 py-3.5 text-[18px] font-semibold" style={{ background: s.accent, color: s.accentFg }}>
            {s.cta}
          </span>
        </div>
      </div>

      {isOverlay ? (
        <div className="absolute bottom-[150px] left-16 z-10 max-w-[800px]">
          <p className="mb-7 font-sans text-[18px] font-semibold uppercase tracking-[0.2em]" style={{ color: s.accent }}>
            {s.eyebrow}
          </p>
          <h3
            className={s.uppercase ? "uppercase leading-[0.86]" : "leading-[0.94] tracking-[-0.04em]"}
            style={{ fontWeight: s.weight ?? (s.uppercase ? 400 : 800), fontSize: (s.uppercase ? 128 : 112) * k }}
          >
            {s.headline[0]}
            <br />
            {second}
          </h3>
          <div className="mt-10 flex items-center gap-5 font-sans">
            <span className="whitespace-nowrap rounded-full px-9 py-5 text-[20px] font-bold" style={{ background: s.accent, color: s.accentFg }}>
              {s.cta} →
            </span>
            <span className="text-[19px] opacity-70">{s.blurb.split(".")[0]}.</span>
          </div>
        </div>
      ) : (
        <div className="relative z-10 grid grid-cols-[1.05fr_0.95fr] gap-14 px-16 pt-14">
          <div className="flex flex-col justify-center pb-10">
            <p className="mb-7 font-sans text-[17px] font-semibold uppercase tracking-[0.22em]" style={{ color: s.accent, opacity: 0.85 }}>
              {s.eyebrow}
            </p>
            <h3 className="leading-[0.94] tracking-[-0.035em]" style={{ fontWeight: s.weight ?? 600, fontSize: 104 * k }}>
              {s.headline[0]}
              <br />
              {second}
            </h3>
            <p className="mt-8 max-w-[480px] font-sans text-[21px] leading-relaxed opacity-75">{s.blurb}</p>
            <div className="mt-10 flex gap-4 font-sans">
              <span className="whitespace-nowrap rounded-full px-9 py-5 text-[19px] font-bold" style={{ background: s.accent, color: s.accentFg }}>
                {s.cta}
              </span>
              <span className="whitespace-nowrap rounded-full border-2 px-9 py-5 text-[19px] font-bold" style={{ borderColor: s.fg }}>
                WhatsApp us
              </span>
            </div>
          </div>
          <div className="relative h-[600px] overflow-hidden rounded-b-[28px] rounded-t-[300px]">
            <Image src={s.image} alt="" fill sizes={sizes === "700px" ? "400px" : sizes} className="object-cover" style={{ objectPosition: s.imagePosition }} priority={priority} />
          </div>
        </div>
      )}
    </div>
  );
}

/** Mobile preview, designed at 390×844 and scaled down by ScaledFrame. */
export function MobilePreview({ s, priority = false }: Props) {
  const isOverlay = s.layout === "overlay";
  const k = s.size ?? 1;
  const second = (
    <em
      style={{
        fontStyle: s.italicSecondLine ? "italic" : "normal",
        color: s.uppercase || (!isOverlay && s.accent !== s.fg) ? s.accent : undefined,
        opacity: isOverlay && !s.uppercase && !s.italicSecondLine ? 0.55 : 1,
      }}
    >
      {s.headline[1]}
    </em>
  );

  return (
    <div className={`relative h-full w-full overflow-hidden ${s.fontClass}`} style={{ background: s.bg, color: s.fg, fontSynthesis: "none" }}>
      {isOverlay && (
        <>
          <Image src={s.image} alt="" fill sizes="300px" className="object-cover" style={{ objectPosition: s.imagePosition }} priority={priority} />
          <div className="absolute inset-0" style={{ background: `linear-gradient(0deg, ${s.bg} 18%, ${s.bg}99 45%, transparent 75%)` }} />
        </>
      )}

      <div className="relative z-10 flex items-center justify-between px-6 pt-16">
        <span className={`text-[22px] leading-none ${s.uppercase ? "tracking-wide" : "tracking-tight"}`} style={{ fontWeight: 800 }}>
          {s.name}
        </span>
        <span className="flex flex-col gap-[5px]">
          <span className="block h-[2px] w-6" style={{ background: s.fg }} />
          <span className="block h-[2px] w-4 self-end" style={{ background: s.fg }} />
        </span>
      </div>

      {isOverlay ? (
        <div className="absolute inset-x-6 bottom-12 z-10">
          <p className="mb-4 font-sans text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: s.accent }}>
            {s.eyebrow}
          </p>
          <h3
            className={s.uppercase ? "uppercase leading-[0.88]" : "leading-[0.97] tracking-[-0.04em]"}
            style={{ fontWeight: s.weight ?? (s.uppercase ? 400 : 800), fontSize: (s.uppercase ? 68 : 50) * k }}
          >
            {s.headline[0]} {second}
          </h3>
          <span className="mt-7 flex justify-center rounded-full py-4 font-sans text-[15px] font-bold" style={{ background: s.accent, color: s.accentFg }}>
            {s.cta} →
          </span>
        </div>
      ) : (
        <div className="relative z-10 px-6 pt-6">
          <div className="relative h-[330px] overflow-hidden rounded-b-[22px] rounded-t-[180px]">
            <Image src={s.image} alt="" fill sizes="300px" className="object-cover" style={{ objectPosition: s.imagePosition }} priority={priority} />
          </div>
          <p className="mt-7 font-sans text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: s.accent, opacity: 0.85 }}>
            {s.eyebrow}
          </p>
          <h3 className="mt-3 leading-[0.97] tracking-[-0.035em]" style={{ fontWeight: s.weight ?? 600, fontSize: 48 * k }}>
            {s.headline[0]} {second}
          </h3>
          <span className="mt-7 flex justify-center rounded-full py-4 font-sans text-[15px] font-bold" style={{ background: s.accent, color: s.accentFg }}>
            {s.cta}
          </span>
        </div>
      )}
    </div>
  );
}
