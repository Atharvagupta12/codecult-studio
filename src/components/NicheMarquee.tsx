import { SparkIcon } from "./ui/icons";

const WORDS = ["Cafés", "Gyms", "Salons", "Jewellery", "Portfolios", "Restaurants", "Makeup artists", "Boutiques", "Studios"];

export function NicheMarquee() {
  const row = (hidden: boolean) => (
    <div aria-hidden={hidden} className="flex shrink-0 items-center">
      {WORDS.map((w, i) => (
        <span key={w} className="flex items-center">
          <span
            className={`px-8 text-[clamp(2.6rem,6vw,5.5rem)] leading-none tracking-[-0.04em] ${
              i % 2 ? "font-serif italic text-cream/90" : "font-medium text-transparent [-webkit-text-stroke:1.2px_rgb(243_238_230/0.55)]"
            }`}
          >
            {w}
          </span>
          <SparkIcon className="size-6 shrink-0 text-ember sm:size-8" />
        </span>
      ))}
    </div>
  );

  return (
    <section aria-label="Businesses we build for" className="relative overflow-hidden border-y border-line py-6 sm:py-10">
      <p className="sr-only">We build websites for {WORDS.join(", ")}.</p>
      <div className="marquee">
        {row(true)}
        {row(true)}
      </div>
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ink to-transparent" />
      <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ink to-transparent" />
    </section>
  );
}
